/* ================================================================
   auth.js — Login, Signup, Forgot Password logic
   Uses localStorage via Storage (storage.js)
   ================================================================ */

const AUTH_KEY    = 'myAdventureUsers';
const SESSION_KEY = 'myAdventureSession';

/* ================================================================
   BACKGROUND SLIDER
   ================================================================ */
let bgIndex = 0;
const bgSlides = document.querySelectorAll('.auth-slide');
const bgDots   = document.querySelectorAll('.auth-dot');

function cycleBg() {
  bgSlides[bgIndex].classList.remove('active');
  bgDots[bgIndex].classList.remove('active');
  bgIndex = (bgIndex + 1) % bgSlides.length;
  bgSlides[bgIndex].classList.add('active');
  bgDots[bgIndex].classList.add('active');
}
setInterval(cycleBg, 5000);

bgDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    bgSlides[bgIndex].classList.remove('active');
    bgDots[bgIndex].classList.remove('active');
    bgIndex = i;
    bgSlides[bgIndex].classList.add('active');
    bgDots[bgIndex].classList.add('active');
  });
});

/* ================================================================
   PANEL SWITCHING
   ================================================================ */
function showPanel(id) {
  document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showForgot() {
  showPanel('forgotPanel');
}

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
  const err   = document.getElementById(errId);
  if (field) field.classList.add('error');
  if (err)   err.textContent = msg;
}

function clearErrors(...errIds) {
  errIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
  document.querySelectorAll('.input-wrap input').forEach(i => i.classList.remove('error', 'success'));
}

function setLoading(btnId, loading) {
  const btn    = document.getElementById(btnId);
  if (!btn) return;
  const text   = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  btn.disabled = loading;
  if (text)   text.classList.toggle('hidden', loading);
  if (loader) loader.classList.toggle('hidden', !loading);
}

/* ================================================================
   PASSWORD TOGGLE
   ================================================================ */
function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon  = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

/* ================================================================
   PASSWORD STRENGTH
   ================================================================ */
function checkStrength(val) {
  const fill  = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  if (!fill || !label) return;

  let score = 0;
  if (val.length >= 8)               score++;
  if (/[A-Z]/.test(val))             score++;
  if (/[0-9]/.test(val))             score++;
  if (/[^A-Za-z0-9]/.test(val))      score++;

  const levels = [
    { pct: '0%',   bg: 'transparent',                     text: '',           color: 'transparent' },
    { pct: '25%',  bg: '#e74c3c',                         text: 'Weak',       color: '#e74c3c' },
    { pct: '50%',  bg: '#e67e22',                         text: 'Fair',       color: '#e67e22' },
    { pct: '75%',  bg: '#f1c40f',                         text: 'Good',       color: '#f1c40f' },
    { pct: '100%', bg: 'linear-gradient(90deg,#0abde3,#00b894)', text: 'Strong', color: '#00b894' },
  ];

  const lvl = val.length === 0 ? 0 : score;
  fill.style.width      = levels[lvl].pct;
  fill.style.background = levels[lvl].bg;
  label.textContent     = levels[lvl].text;
  label.style.color     = levels[lvl].color;
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
    id:        user.id,
    name:      user.firstName + ' ' + user.lastName,
    firstName: user.firstName,
    lastName:  user.lastName,
    email:     user.email,
    avatar:    (user.firstName[0] + user.lastName[0]).toUpperCase(),
    loginAt:   new Date().toISOString(),
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
  document.getElementById('successTitle').textContent = 'Welcome, ' + name.split(' ')[0] + '!';
  document.getElementById('successMsg').textContent   = 'You\'re signed in. Redirecting...';

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

  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  let valid = true;

  if (!email || !email.includes('@')) {
    setError('loginEmail', 'loginEmailErr', 'Please enter a valid email address.');
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
    const user  = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      setLoading('loginBtn', false);
      setError('loginEmail', 'loginEmailErr', 'No account found with this email.');
      return;
    }

    if (user.password !== btoa(pass)) {
      setLoading('loginBtn', false);
      setError('loginPass', 'loginPassErr', 'Incorrect password. Please try again.');
      return;
    }

    // Remember me
    if (document.getElementById('rememberMe')?.checked) {
      localStorage.setItem('myAdventureRemember', email);
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

  const first   = document.getElementById('signupFirst').value.trim();
  const last    = document.getElementById('signupLast').value.trim();
  const email   = document.getElementById('signupEmail').value.trim();
  const pass    = document.getElementById('signupPass').value;
  const confirm = document.getElementById('signupConfirm').value;
  const terms   = document.getElementById('termsCheck').checked;
  let valid = true;

  if (!first) {
    setError('signupFirst', 'signupFirstErr', 'First name is required.');
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
      id:        Date.now(),
      firstName: first,
      lastName:  last || '',
      email:     email,
      password:  btoa(pass),           // base64 — demo only, not real security
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
    id:        Date.now(),
    firstName: 'Google',
    lastName:  'User',
    email:     'google.user@gmail.com',
    password:  '',
    provider:  'google',
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
  const remembered = localStorage.getItem('myAdventureRemember');
  if (remembered) {
    const emailInput = document.getElementById('loginEmail');
    const remChk     = document.getElementById('rememberMe');
    if (emailInput) emailInput.value = remembered;
    if (remChk)     remChk.checked = true;
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
