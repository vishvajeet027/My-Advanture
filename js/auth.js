/* ================================================================
   auth.js — Login, Signup, Forgot Password logic
   Uses localStorage via Storage (storage.js)
   ================================================================ */

const AUTH_KEY = 'myAdventureUsers';
const SESSION_KEY = 'myAdventureSession';

/* Dummy demo accounts — select on login to autofill credentials */
const DEMO_USERS = {
  admin: {
    id: 'demo-admin',
    firstName: 'Admin',
    lastName: 'User',
    username: 'admin',
    email: 'admin@myadventure.com',
    password: 'Admin@123',
    role: 'admin',
  },
  tourist: {
    id: 'demo-tourist',
    firstName: 'Local',
    lastName: 'Tourist',
    username: 'tourist',
    email: 'tourist@myadventure.com',
    password: 'Tourist@123',
    role: 'tourist',
  },
};

/** Ensure demo Admin + Tourist accounts exist in localStorage */
function ensureDemoUsers() {
  const users = getUsers();
  let changed = false;

  Object.values(DEMO_USERS).forEach(demo => {
    const existing = users.find(u => u.email.toLowerCase() === demo.email.toLowerCase());
    if (!existing) {
      users.push({
        id: demo.id,
        firstName: demo.firstName,
        lastName: demo.lastName,
        username: demo.username,
        email: demo.email,
        password: btoa(demo.password),
        role: demo.role,
        createdAt: new Date().toISOString(),
      });
      changed = true;
    } else {
      if (!existing.role) existing.role = demo.role;
      if (!existing.username) existing.username = demo.username;
      existing.password = btoa(demo.password);
      changed = true;
    }
  });

  if (changed) saveUsers(users);
}

/** Autofill login fields for selected demo role */
function selectDemoRole(role) {
  const demo = DEMO_USERS[role];
  if (!demo) return;

  ensureDemoUsers();

  const userInput = document.getElementById('loginEmail');
  const passInput = document.getElementById('loginPass');
  if (userInput) userInput.value = demo.username;
  if (passInput) passInput.value = demo.password;

  clearErrors('loginEmailErr', 'loginPassErr');
  document.querySelectorAll('.demo-login-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });
}

/* ================================================================
   PANEL SWITCHING
   ================================================================ */
function showPanel(id) {
  document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(id);
  if (panel) panel.classList.add('active');

  // Reset forgot success view when leaving
  if (id === 'loginPanel') {
    const form = document.getElementById('forgotForm');
    const success = document.getElementById('forgotSuccess');
    if (form) form.classList.remove('hidden');
    if (success) success.classList.add('hidden');
  }
}

function switchAuthMode(panelId) {
  showPanel(panelId);
}

function showForgot() {
  showPanel('forgotPanel');
}

/* ================================================================
   VISUAL SLIDER
   ================================================================ */
let bgIndex = 0;
let bgSlides = [];
let bgDots = [];

const VISUAL_LOCATIONS = [
  'Swiss Alps, Switzerland',
  'Rocky Mountains',
  'Peak Wilderness',
  'Cappadocia, Turkey',
];

function syncVisualSlides() {
  bgSlides = Array.from(document.querySelectorAll('.auth-slide'));
  bgDots = Array.from(document.querySelectorAll('.auth-dot'));
}

function updateVisualLocation() {
  const el = document.getElementById('visualLocationName');
  if (el) el.textContent = VISUAL_LOCATIONS[bgIndex] || VISUAL_LOCATIONS[0];
}

function goToVisual(index) {
  if (!bgSlides.length) syncVisualSlides();
  if (!bgSlides.length) return;

  bgSlides[bgIndex]?.classList.remove('active');
  bgDots[bgIndex]?.classList.remove('active');
  bgIndex = (index + bgSlides.length) % bgSlides.length;
  bgSlides[bgIndex]?.classList.add('active');
  bgDots[bgIndex]?.classList.add('active');
  updateVisualLocation();
}

function nextVisual() { goToVisual(bgIndex + 1); }
function prevVisual() { goToVisual(bgIndex - 1); }

function cycleBg() { nextVisual(); }

document.addEventListener('DOMContentLoaded', () => {
  syncVisualSlides();
  updateVisualLocation();
  bgDots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToVisual(i));
  });
});

setInterval(cycleBg, 5500);

/* ================================================================
   TOAST
   ================================================================ */
function toast(msg, type = '') {
  const el = document.getElementById('authToast');
  el.textContent = msg;
  el.className = 'auth-toast show ' + type;
  setTimeout(() => { el.className = 'auth-toast'; }, 3500);
}

/* ================================================================
   FIELD HELPERS
   ================================================================ */
function setError(fieldId, errId, msg) {
  const field = document.getElementById(fieldId);
  const err = document.getElementById(errId);
  const wrap = field?.closest?.('.auth-field')?.querySelector('.input-wrap') || field?.querySelector?.('.input-wrap');
  if (wrap) wrap.classList.add('error');
  if (field && field.classList) field.classList.add('error');
  if (err) err.textContent = msg;
}

function clearErrors(...errIds) {
  errIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
  document.querySelectorAll('.input-wrap').forEach(w => w.classList.remove('error'));
  document.querySelectorAll('.input-wrap input').forEach(i => i.classList.remove('error', 'success'));
}

function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  const text = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  btn.disabled = loading;
  if (text) text.classList.toggle('hidden', loading);
  if (loader) loader.classList.toggle('hidden', !loading);
}

/* ================================================================
   PASSWORD TOGGLE
   ================================================================ */
function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn?.querySelector('i');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.className = 'fas fa-eye';
  } else {
    input.type = 'password';
    if (icon) icon.className = 'fas fa-eye-slash';
  }
}

/* ================================================================
   PASSWORD STRENGTH
   ================================================================ */
function checkStrength(val) {
  const fill = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  if (!fill || !label) return;

  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = [
    { pct: '0%', bg: 'transparent', text: '', color: 'transparent' },
    { pct: '25%', bg: '#e74c3c', text: 'Weak', color: '#e74c3c' },
    { pct: '50%', bg: '#e67e22', text: 'Fair', color: '#e67e22' },
    { pct: '75%', bg: '#f1c40f', text: 'Good', color: '#f1c40f' },
    { pct: '100%', bg: 'linear-gradient(90deg,#0abde3,#00b894)', text: 'Strong', color: '#00b894' },
  ];

  const lvl = val.length === 0 ? 0 : score;
  fill.style.width = levels[lvl].pct;
  fill.style.background = levels[lvl].bg;
  label.textContent = levels[lvl].text;
  label.style.color = levels[lvl].color;
}

/* ================================================================
   USER STORAGE HELPERS
   ================================================================ */
function getUsers() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]'); }
  catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(users));
}

function createSession(user) {
  const session = {
    id: user.id,
    name: user.firstName + ' ' + user.lastName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role || 'tourist',
    avatar: ((user.firstName[0] || 'U') + (user.lastName[0] || '')).toUpperCase(),
    loginAt: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  // Also push name into SettingsStorage if available
  if (typeof SettingsStorage !== 'undefined') {
    SettingsStorage.set({ userName: session.name, userEmail: session.email });
  }
  return session;
}

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch { return null; }
}

/* ================================================================
   REDIRECT AFTER LOGIN
   ================================================================ */
function redirectToDashboard(name) {
  showPanel('successPanel');
  const session = getSession();
  const roleLabel = session && session.role === 'admin' ? 'Admin' : 'Tourist';
  document.getElementById('successTitle').textContent = 'Welcome, ' + name.split(' ')[0] + '!';
  document.getElementById('successMsg').textContent =
    `Signed in as ${roleLabel}. Redirecting...`;

  // animate progress bar
  setTimeout(() => {
    document.getElementById('redirectFill').style.width = '100%';
  }, 80);

  // redirect to home hub after 2.6s
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 2700);
}

/* ================================================================
   HANDLE LOGIN
   ================================================================ */
function handleLogin(e) {
  e.preventDefault();
  clearErrors('loginEmailErr', 'loginPassErr');

  const loginId = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value;
  let valid = true;

  if (!loginId) {
    setError('loginEmail', 'loginEmailErr', 'Please enter your username or email.');
    valid = false;
  }
  if (!pass) {
    setError('loginPass', 'loginPassErr', 'Please enter your password.');
    valid = false;
  }
  if (!valid) return;

  setLoading('loginBtn', true);

  // Simulate network delay
  setTimeout(() => {
    const users = getUsers();
    const key = loginId.toLowerCase();
    const user = users.find(u =>
      (u.email && u.email.toLowerCase() === key) ||
      (u.username && u.username.toLowerCase() === key) ||
      (u.firstName && u.firstName.toLowerCase() === key)
    );

    if (!user) {
      setLoading('loginBtn', false);
      setError('loginEmail', 'loginEmailErr', 'No account found with this username.');
      return;
    }

    if (user.password !== btoa(pass)) {
      setLoading('loginBtn', false);
      setError('loginPass', 'loginPassErr', 'Incorrect password. Please try again.');
      return;
    }

    // Remember me
    if (document.getElementById('rememberMe')?.checked) {
      localStorage.setItem('myAdventureRemember', user.username || user.email);
    }

    createSession(user);
    setLoading('loginBtn', false);
    redirectToDashboard(user.firstName + ' ' + user.lastName);
  }, 900);
}

/* ================================================================
   HANDLE SIGNUP
   ================================================================ */
function handleSignup(e) {
  e.preventDefault();
  clearErrors('signupFirstErr', 'signupEmailErr', 'signupPassErr', 'signupConfirmErr');

  const first = document.getElementById('signupFirst').value.trim();
  const last = (document.getElementById('signupLast')?.value || '').trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pass = document.getElementById('signupPass').value;
  const confirmEl = document.getElementById('signupConfirm');
  if (confirmEl) confirmEl.value = pass;
  const confirm = pass;
  const termsEl = document.getElementById('termsCheck');
  const terms = termsEl ? termsEl.checked : true;
  let valid = true;

  if (!first) {
    setError('signupFirst', 'signupFirstErr', 'Username is required.');
    valid = false;
  }
  if (!email || !email.includes('@')) {
    setError('signupEmail', 'signupEmailErr', 'Please enter a valid email.');
    valid = false;
  }
  if (pass.length < 6) {
    setError('signupPass', 'signupPassErr', 'Password must be at least 6 characters.');
    valid = false;
  }
  if (pass !== confirm) {
    setError('signupConfirm', 'signupConfirmErr', 'Passwords do not match.');
    valid = false;
  }
  if (!terms) {
    toast('Please accept the Terms of Service to continue.', 'error');
    valid = false;
  }
  if (!valid) return;

  setLoading('signupBtn', true);

  setTimeout(() => {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setLoading('signupBtn', false);
      setError('signupEmail', 'signupEmailErr', 'An account with this email already exists.');
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName: first,
      lastName: last || '',
      username: first.toLowerCase().replace(/\s+/g, '_'),
      email: email,
      password: btoa(pass),           // base64 — demo only, not real security
      role: 'tourist',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveUsers(users);

    createSession(newUser);
    setLoading('signupBtn', false);
    redirectToDashboard(first + ' ' + last);
  }, 900);
}

/* ================================================================
   HANDLE FORGOT PASSWORD
   ================================================================ */
function handleForgot(e) {
  e.preventDefault();
  clearErrors('forgotEmailErr');

  const email = document.getElementById('forgotEmail').value.trim();
  if (!email || !email.includes('@')) {
    setError('forgotEmail', 'forgotEmailErr', 'Please enter a valid email address.');
    return;
  }

  const btn = document.querySelector('#forgotForm .btn-auth');
  if (btn) {
    btn.disabled = true;
    btn.querySelector('.btn-text').classList.add('hidden');
    btn.querySelector('.btn-loader').classList.remove('hidden');
  }

  setTimeout(() => {
    document.getElementById('forgotForm').classList.add('hidden');
    const success = document.getElementById('forgotSuccess');
    document.getElementById('forgotSuccessMsg').textContent =
      `We've sent a password reset link to ${email}. Check your inbox.`;
    success.classList.remove('hidden');
  }, 1000);
}

/* ================================================================
   GOOGLE LOGIN (mock)
   ================================================================ */
function handleGoogleLogin() {
  toast('Google Sign-In is not connected in this demo.', '');

  // For demo: create a mock Google user
  const mockGoogleUser = {
    id: Date.now(),
    firstName: 'Google',
    lastName: 'User',
    email: 'google.user@gmail.com',
    password: '',
    provider: 'google',
    createdAt: new Date().toISOString(),
  };

  const users = getUsers();
  const existing = users.find(u => u.email === mockGoogleUser.email);
  if (!existing) { users.push(mockGoogleUser); saveUsers(users); }

  createSession(existing || mockGoogleUser);

  setTimeout(() => redirectToDashboard('Google User'), 1200);
}

/* ================================================================
   AUTO-FILL REMEMBERED EMAIL
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  ensureDemoUsers();

  const remembered = localStorage.getItem('myAdventureRemember');
  if (remembered) {
    const emailInput = document.getElementById('loginEmail');
    const remChk = document.getElementById('rememberMe');
    if (emailInput) emailInput.value = remembered;
    if (remChk) remChk.checked = true;
  }

  // If already logged in, go straight to home hub
  const session = getSession();
  if (session) {
    window.location.replace('home.html');
  }
});

/* ================================================================
   ENTER KEY on inputs
   ================================================================ */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const active = document.querySelector('.auth-panel.active');
  if (!active) return;
  const form = active.querySelector('form');
  if (form) form.requestSubmit();
});
