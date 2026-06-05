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

function setStatus(message, cls) {
  const el = document.getElementById('targetStatus');
  el.textContent = message;
  el.className = 'status' + (cls ? ' ' + cls : '');
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
  box.innerHTML = `
    ${platform}
    <div><span class="filled">${result.filled}</span> 項目を入力</div>
    <div><span class="skipped">${result.skipped}</span> 項目をスキップ</div>
    ${errors}
  `;
}

async function runAutoFill() {
  const tab = await getActiveTab();
  const platform = detectPlatform(tab.url);
  if (!platform) { setStatus('対象外のページです', 'ng'); return; }
  document.getElementById('fillBtn').disabled = true;
  setStatus('自動入力中...', '');
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content/field_maps.js', 'content/content.js'],
    });
    const last = results[results.length - 1];
    const result = last.result || { filled: 0, skipped: 0, errors: ['実行結果を取得できませんでした'] };
    renderResult(result);
    setStatus(result.errors.length ? '完了（一部エラー）' : '✓ 完了', result.errors.length ? 'ng' : 'ok');
  } catch (e) {
    setStatus('エラー: ' + e.message, 'ng');
  } finally {
    document.getElementById('fillBtn').disabled = false;
  }
}

async function init() {
  const tab = await getActiveTab();
  const platform = detectPlatform(tab.url);
  if (platform) {
    setStatus(`✓ 対象ページを検出: ${platform.name}`, 'ok');
    document.getElementById('fillBtn').disabled = false;
  } else {
    setStatus('対象外のページです（i-webs.jp / axol.jp / e2r.jp 等で使用してください）', 'ng');
  }
  document.getElementById('fillBtn').addEventListener('click', runAutoFill);
  document.getElementById('openOptions').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
}

document.addEventListener('DOMContentLoaded', init);
