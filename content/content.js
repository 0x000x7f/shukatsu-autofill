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
  return result;
})();
