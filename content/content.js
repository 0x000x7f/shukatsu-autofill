// scripting.executeScript で field_maps.js とともに注入される
(async () => {
  const result = { filled: 0, skipped: 0, errors: [], platform: null };

  const platformKey = window.JOBHUNT_DETECT_PLATFORM(window.location.hostname);
  if (!platformKey) {
    result.errors.push('対応していないサイトです: ' + window.location.hostname);
    return result;
  }
  const platform = window.JOBHUNT_PLATFORMS[platformKey];
  result.platform = platform.name;
  const MAP = platform.fieldMap;

  const { profile } = await chrome.storage.local.get('profile');
  if (!profile || Object.keys(profile).length === 0) {
    result.errors.push('プロファイル未登録。拡張機能オプションから個人情報を登録してください。');
    return result;
  }

  const fireEvents = (el, types) => {
    for (const t of types) el.dispatchEvent(new Event(t, { bubbles: true }));
  };
  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (!el || value == null || value === '') return false;
    el.value = value; fireEvents(el, ['input', 'change', 'blur']); return true;
  };
  const setSelect = (selector, value) => {
    const el = document.querySelector(selector);
    if (!el || value == null || value === '') return false;
    el.value = value; fireEvents(el, ['change']); return true;
  };
  const setRadio = (selector, value) => {
    if (value == null || value === '') return false;
    const el = document.querySelector(`${selector}[value="${value}"]`);
    if (!el) return false;
    el.checked = true; fireEvents(el, ['change', 'click']); return true;
  };
  const setCheckbox = (selector, checked) => {
    const el = document.querySelector(selector);
    if (!el) return false;
    el.checked = !!checked; fireEvents(el, ['change', 'click']); return true;
  };
  const setSplit = (parts, value, delimiter) => {
    if (!value) return false;
    const tokens = value.split(delimiter);
    let ok = false;
    parts.forEach((part, i) => { if (tokens[i] !== undefined && setText(part.selector, tokens[i])) ok = true; });
    return ok;
  };
  const setEmailSplit = (accountSels, domainSels, emailStr) => {
    if (!emailStr) return false;
    const at = emailStr.indexOf('@');
    if (at < 0) return false;
    const account = emailStr.substring(0, at), domain = emailStr.substring(at + 1);
    let ok = false;
    accountSels.forEach((sel) => { if (setText(sel, account)) ok = true; });
    domainSels.forEach((sel) => { if (setText(sel, domain)) ok = true; });
    return ok;
  };
  const setEmailSingle = (selectors, emailStr) => {
    if (!emailStr) return false;
    let ok = false;
    selectors.forEach((sel) => { if (setText(sel, emailStr)) ok = true; });
    return ok;
  };

  // 応募ページから企業名をベストエフォートで推測する。
  // og:site_name → application-name → og:title → <title> の順に候補を取り、
  // 区切り文字で分割してから「エントリー」「マイページ」等のノイズ語を除去する。
  const detectCompanyName = () => {
    const clean = (s) => (s || '').replace(/[　\s]+/g, ' ').trim();
    const meta = (sel) => clean(document.querySelector(sel)?.getAttribute('content'));
    const raw = meta('meta[property="og:site_name"]')
             || meta('meta[name="application-name"]')
             || meta('meta[property="og:title"]')
             || clean(document.title);
    if (!raw) return '';

    const NOISE = /(エントリー(シート)?|プレエントリー|本エントリー|マイページ|応募(フォーム)?|採用(マイページ|情報|サイト|ページ)?|新卒(採用)?|採用|登録|フォーム|入力|画面|ログイン|会員|個人情報|MyPage|Entry|Login|Recruit(ing|ment)?)/gi;
    const CORP  = /(株式会社|有限会社|合同会社|会社|銀行|証券|信託|ホールディングス|グループ|Inc\.?|Corp\.?|Co\.?,?\s*Ltd\.?|Ltd\.?|Company|Group|Holdings)/i;

    const segments = raw.split(/[|｜:：／/＞>]+|\s[-−–—]\s/).map(clean).filter(Boolean);
    // 会社を表す語を含むセグメントを最優先
    let best = segments.find((s) => CORP.test(s) && clean(s.replace(NOISE, '')).length > 0);
    if (best) return clean(best.replace(NOISE, '')) || best;
    // なければノイズ語を除いて最も長いセグメント
    const remaining = segments
      .map((s) => clean(s.replace(NOISE, '')))
      .filter((s) => s.length >= 2)
      .sort((a, b) => b.length - a.length);
    return remaining[0] || segments[0] || '';
  };

  for (const [key, def] of Object.entries(MAP)) {
    if (def.skipIf && profile[def.skipIf]) { result.skipped++; continue; }
    let value = profile[key];
    if (def.transform) value = def.transform(value);
    let ok = false;
    try {
      switch (def.type) {
        case 'text':       ok = setText(def.selector, value); break;
        case 'select':     ok = setSelect(def.selector, value); break;
        case 'radio':      ok = setRadio(def.selector, value); break;
        case 'checkbox':   ok = setCheckbox(def.selector, value); break;
        case 'split':      ok = setSplit(def.parts, value, def.delimiter); break;
        case 'composite':  ok = setText(def.selector, def.compose(profile)); break;
        case 'email':      ok = setEmailSplit(def.accountSelectors, def.domainSelectors, value); break;
        case 'email_single': ok = setEmailSingle(def.selectors, value); break;
        default: result.errors.push(`${key}: 未知の型 ${def.type}`);
      }
    } catch (e) { result.errors.push(`${key}: ${e.message}`); }
    if (ok) result.filled++; else result.skipped++;
  }

  // 応募企業を記録（同一フォームURLは重複させず日時を更新）
  try {
    const companyName = detectCompanyName();
    result.companyName = companyName;
    const pageKey = location.origin + location.pathname;
    const now = new Date().toISOString();
    const { appliedCompanies = [] } = await chrome.storage.local.get('appliedCompanies');
    const existing = appliedCompanies.find((c) => c.key === pageKey);
    if (existing) {
      existing.date = now;
      // ユーザーが手修正した名前は上書きしない
      if (companyName && !existing.edited) existing.name = companyName;
      result.recorded = 'updated';
    } else {
      appliedCompanies.push({
        id: Date.now(), name: companyName, platform: platform.name,
        url: location.href, key: pageKey, date: now, edited: false,
        status: '応募済み', nextDate: '', memo: '',
      });
      result.recorded = 'added';
    }
    await chrome.storage.local.set({ appliedCompanies });
  } catch (e) {
    result.errors.push('応募企業の記録に失敗: ' + e.message);
  }

  return result;
})();
