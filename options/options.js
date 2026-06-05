const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '木渎県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府',
  '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県',
  '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県',
  '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

const FIELD_IDS = [
  'lastNameKanji', 'firstNameKanji', 'lastNameKana', 'firstNameKana',
  'lastNameRoma', 'firstNameRoma',
  'birthYear', 'birthMonth', 'birthDay',
  'postalCode', 'prefecture', 'addressCity', 'addressStreet', 'addressBuilding',
  'homePhone', 'mobilePhone',
  'vacationPostalCode', 'vacationPrefecture',
  'vacationAddressCity', 'vacationAddressStreet', 'vacationAddressBuilding', 'vacationPhone',
  'labName', 'clubName',
  'graduationYear', 'graduationMonth', 'graduationStatus',
  'email', 'mobileEmail',
];

function addOption(select, value, label) {
  const opt = document.createElement('option');
  opt.value = value; opt.textContent = label; select.appendChild(opt);
}

function populateSelects() {
  const blank = (s) => addOption(s, '', '-▼-');
  const ybirth = document.getElementById('birthYear');
  blank(ybirth);
  const currentYear = new Date().getFullYear();
  for (let y = 1990; y <= currentYear; y++) addOption(ybirth, String(y), String(y));
  const mbirth = document.getElementById('birthMonth');
  blank(mbirth);
  for (let m = 1; m <= 12; m++) addOption(mbirth, String(m), String(m).padStart(2, '0'));
  const dbirth = document.getElementById('birthDay');
  blank(dbirth);
  for (let d = 1; d <= 31; d++) addOption(dbirth, String(d), String(d).padStart(2, '0'));
  for (const id of ['prefecture', 'vacationPrefecture']) {
    const sel = document.getElementById(id); blank(sel);
    for (const name of PREFECTURES) addOption(sel, name, name);
  }
  const syear = document.getElementById('graduationYear');
  blank(syear);
  for (let y = 2010; y <= 2030; y++) addOption(syear, String(y), String(y));
  const smonth = document.getElementById('graduationMonth');
  blank(smonth);
  for (let m = 1; m <= 12; m++) addOption(smonth, String(m), String(m).padStart(2, '0'));
}

function toggleVacationFields() {
  const checked = document.getElementById('sameAsHome').checked;
  document.getElementById('vacationFields').classList.toggle('hidden', checked);
}

function loadProfile() {
  chrome.storage.local.get('profile', (data) => {
    const profile = data.profile || {};
    for (const id of FIELD_IDS) {
      const el = document.getElementById(id);
      if (el && profile[id] !== undefined) el.value = profile[id];
    }
    if (profile.gender) {
      const radio = document.querySelector(`input[name="gender"][value="${profile.gender}"]`);
      if (radio) radio.checked = true;
    }
    document.getElementById('sameAsHome').checked = !!profile.sameAsHome;
    toggleVacationFields();
  });
}

function collectProfile() {
  const profile = {};
  for (const id of FIELD_IDS) {
    const el = document.getElementById(id);
    if (el) profile[id] = el.value.trim();
  }
  const genderEl = document.querySelector('input[name="gender"]:checked');
  profile.gender = genderEl ? genderEl.value : '';
  profile.sameAsHome = document.getElementById('sameAsHome').checked;
  return profile;
}

function showStatus(message, isError = false) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.classList.toggle('error', isError);
  if (!isError) setTimeout(() => { status.textContent = ''; }, 3000);
}

function saveProfile(e) {
  e.preventDefault();
  const profile = collectProfile();
  chrome.storage.local.set({ profile }, () => {
    if (chrome.runtime.lastError) showStatus('保存に失敗しました: ' + chrome.runtime.lastError.message, true);
    else showStatus('✓ 保存しました');
  });
}

function clearProfile() {
  if (!confirm('登録済みの個人情報をすべて削除します。よろしいですか？')) return;
  chrome.storage.local.remove('profile', () => {
    document.getElementById('profileForm').reset();
    toggleVacationFields();
    showStatus('✓ 削除しました');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateSelects();
  loadProfile();
  document.getElementById('profileForm').addEventListener('submit', saveProfile);
  document.getElementById('clearBtn').addEventListener('click', clearProfile);
  document.getElementById('sameAsHome').addEventListener('change', toggleVacationFields);
});
