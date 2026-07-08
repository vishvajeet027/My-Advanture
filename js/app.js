/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
// If the navbar already has 'scrolled' on page load (no hero behind it), keep it always scrolled
const navbarAlwaysScrolled = navbar && navbar.classList.contains('scrolled');
window.addEventListener('scroll', () => {
  if (!navbar || navbarAlwaysScrolled) return;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) closeMenu();
  });
}

/* ===== HERO SLIDER ===== */
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
let sliderInterval;

function goToSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function startSlider() {
  sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

if (slides.length > 0) {
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(sliderInterval); goToSlide(currentSlide - 1); startSlider(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(sliderInterval); goToSlide(currentSlide + 1); startSlider(); });
  startSlider();
}

/* ===== DESTINATION CARD SLIDER CONTROLS ===== */
const destCards = document.getElementById('destCards');
const destPrev = document.getElementById('destPrev');
const destNext = document.getElementById('destNext');
if (destCards && destNext) {
  destNext.addEventListener('click', () => { destCards.scrollBy({ left: 250, behavior: 'smooth' }); });
}
if (destCards && destPrev) {
  destPrev.addEventListener('click', () => { destCards.scrollBy({ left: -250, behavior: 'smooth' }); });
}

/* ===== SERVICE CARD TOGGLE ===== */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.service-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

/* ===== FLIGHT SEARCH ===== */
function searchFlights() {
  showToast('Searching available flights...', 'success');
}

/* ===== TOAST UTILITY ===== */
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = 'toast show ' + type;
  setTimeout(() => { toast.className = 'toast'; }, 3000);
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const revealElements = document.querySelectorAll('.dest-card, .service-card, .review-card, .stat-item, .trip-card, .dest-grid-card, .hotel-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

/* ===== NEWSLETTER ===== */
document.querySelectorAll('.newsletter-form button').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    if (input && input.value.includes('@')) {
      showToast('Subscribed successfully! Thank you.', 'success');
      input.value = '';
    } else {
      showToast('Please enter a valid email address.', 'error');
    }
  });
});

/* ===== SESSION-AWARE NAVBAR ===== */
(function updateNavForSession() {
  const SESSION_KEY = 'myAdventureSession';
  let session = null;
  try { session = JSON.parse(localStorage.getItem(SESSION_KEY)); } catch {}
  if (!session) return;

  // Replace Login + Sign up with avatar + name + logout
  const actions = document.querySelector('.nav-actions');
  if (!actions) return;

  const loginBtn  = actions.querySelector('.btn-login');
  const signupBtn = actions.querySelector('.btn-signup');
  if (!loginBtn && !signupBtn) return;

  const initials = session.avatar || (session.name || 'U').substring(0, 2).toUpperCase();
  const html = `
    <div class="nav-user">
      <div class="nav-user-avatar">${initials}</div>
      <span class="nav-user-name">${(session.name || '').split(' ')[0]}</span>
      <button class="nav-user-logout" onclick="logoutUser()" title="Logout" aria-label="Logout">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>`;

  if (loginBtn)  loginBtn.outerHTML  = html;
  if (signupBtn) signupBtn.remove();
})();

function logoutUser() {
  localStorage.removeItem('myAdventureSession');
  window.location.href = 'login.html';
}
