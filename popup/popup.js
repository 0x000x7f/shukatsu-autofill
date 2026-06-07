const PLATFORMS = {
  iwebs: {
    name: 'i-webs.jp 系',
    pattern: /(^|\.)i-webs\.jp$|(^|\.)i-web\.jpn\.com$|^www\.mypage\.bk\.mufg\.jp$|^www\.recruit\.sony\.co\.jp$|^working\.nri\.co\.jp$|^mypage\.smbc-recruitment\.jp$/,
  },
  axol: { name: 'axol.jp 系', pattern: /(^|\.)axol\.jp$/ },
  e2r:  { name: 'e2r.jp 系',  pattern: /^(www\.)?e2r\.jp$/ },
  snar: { name: 'snar.jp 系', pattern: /(^|\.)snar\.jp$/ },
};

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

function detectPlatform(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    for (const [key, def] of Object.entries(PLATFORMS)) {
      if (def.pattern.test(u.hostname)) return { key, ...def };
    }
  } catch { /* ignore */ }
  return null;
}

const ICON_CHECK = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const ICON_X     = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const ICON_INFO  = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

function setStatus(main, sub, cls) {
  const el     = document.getElementById('targetStatus');
  const icon   = document.getElementById('statusIcon');
  const mainEl = document.getElementById('statusMain');
  const subEl  = document.getElementById('statusSub');
  el.className = 'status' + (cls ? ' ' + cls : '');
  icon.innerHTML = cls === 'ok' ? ICON_CHECK : cls === 'ng' ? ICON_X : ICON_INFO;
  mainEl.textContent = main;
  subEl.textContent  = sub || '';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderResult(result) {
  const box = document.getElementById('result');
  box.classList.remove('hidden');
  const errors = result.errors && result.errors.length
    ? `<div class="errors">⚠ ${result.errors.map(escapeHtml).join('<br>')}</div>` : '';
  const platform = result.platform
    ? `<div class="platform">プラットフォーム: ${escapeHtml(result.platform)}</div>` : '';
  const company = result.companyName
    ? `<div class="company">📝 応募企業として記録: ${escapeHtml(result.companyName)}</div>`
    : (result.recorded ? `<div class="company">📝 応募企業として記録しました（企業名は設定ページで編集できます）</div>` : '');
  box.innerHTML = `
    ${platform}
    <div><span class="filled">${result.filled}</span> 項目を入力</div>
    <div><span class="skipped">${result.skipped}</span> 項目をスキップ</div>
    ${company}
    ${errors}
  `;
}

async function runAutoFill() {
  const tab = await getActiveTab();
  const platform = detectPlatform(tab.url);
  if (!platform) {
    setStatus('対象外のページです', 'i-webs.jp / axol.jp / snar.jp 等で使用してください', 'ng');
    return;
  }
  document.getElementById('fillBtn').disabled = true;
  setStatus('自動入力中...', '', '');
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content/field_maps.js', 'content/content.js'],
    });
    const last = results[results.length - 1];
    const result = last.result || { filled: 0, skipped: 0, errors: ['実行結果を取得できませんでした'] };
    renderResult(result);
    setStatus(
      result.errors.length ? '完了（一部エラー）' : '自動入力が完了しました',
      result.errors.length ? '' : `${result.filled} 項目を入力`,
      result.errors.length ? 'ng' : 'ok'
    );
  } catch (e) {
    setStatus('エラーが発生しました', e.message, 'ng');
  } finally {
    document.getElementById('fillBtn').disabled = false;
  }
}

async function init() {
  const tab = await getActiveTab();
  const platform = detectPlatform(tab.url);
  if (platform) {
    setStatus('対象ページを検出', platform.name, 'ok');
    document.getElementById('fillBtn').disabled = false;
  } else {
    setStatus('対象外のページです', 'i-webs.jp / axol.jp / snar.jp 等で使用してください', 'ng');
  }
  document.getElementById('fillBtn').addEventListener('click', runAutoFill);
  document.getElementById('openOptions').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
}

document.addEventListener('DOMContentLoaded', init);
