/* ================================================================
   session.js — Shared auth / role helpers (load on every app page)
   ================================================================ */

const SESSION_KEY = 'myAdventureSession';

const AuthSession = {
  get() {
    try {
      const s = JSON.parse(localStorage.getItem(SESSION_KEY));
      return s && s.id ? s : null;
    } catch {
      return null;
    }
  },

  clear() {
    localStorage.removeItem(SESSION_KEY);
  },

  role() {
    const s = this.get();
    return (s && s.role) || 'tourist';
  },

  isAdmin() {
    return this.role() === 'admin';
  },

  isTourist() {
    return this.role() === 'tourist';
  },

  /** Travelers book packages/hotels/flights/trips; admins manage catalog only. */
  canBook() {
    return !this.isAdmin();
  },

  /**
   * Block booking actions for admin. Returns true if booking is allowed.
   * Shows a toast when blocked.
   */
  guardBooking(actionLabel = 'book') {
    if (this.canBook()) return true;
    const msg = `Admins cannot ${actionLabel}. Switch to a Traveler account to book trips.`;
    if (typeof showToast === 'function') showToast(msg, 'error');
    else alert(msg);
    return false;
  },

  /** Redirect to login if not signed in. Returns session or null. */
  requireAuth() {
    const s = this.get();
    if (!s) {
      window.location.replace('login.html');
      return null;
    }
    return s;
  },

  /** Require a specific role; otherwise send user to home. */
  requireRole(role) {
    const s = this.requireAuth();
    if (!s) return null;
    if (s.role !== role) {
      window.location.replace('home.html');
      return null;
    }
    return s;
  },

  requireAdmin() {
    return this.requireRole('admin');
  },
};

function logoutUser() {
  AuthSession.clear();
  window.location.href = 'login.html';
}

/** Rebuild top nav links based on role (Dashboard / Catalog / Trips…). */
function applyRoleBasedNav() {
  const session = AuthSession.get();
  if (!session) return;

  const nav = document.getElementById('navLinks');
  if (!nav) return;

  const isAdmin = session.role === 'admin';

  const links = isAdmin
    ? [
        { href: 'dashboard.html', label: 'Dashboard' },
        { href: 'admin.html', label: 'Manage Catalog' },
        { href: 'package.html', label: 'Packages' },
        { href: 'package.html?view=hotels', label: 'Hotels' },
        { href: 'flights.html', label: 'Flights' },
        { href: 'my-bookings.html', label: 'All Trips' },
      ]
    : [
        { href: 'dashboard.html', label: 'Dashboard' },
        { href: 'package.html', label: 'Packages' },
        { href: 'package.html?view=hotels', label: 'Hotels' },
        { href: 'flights.html', label: 'Flights' },
        { href: 'my-bookings.html', label: 'Bookings' },
        { href: 'trip-planner.html', label: 'Create Trip', highlight: true, icon: 'fas fa-pencil-alt' },
      ];

  nav.innerHTML = links.map(l => {
    const currentFile = (window.location.pathname.split('/').pop() || '').toLowerCase();
    const linkFile = l.href.split('?')[0].toLowerCase();
    const currentView = new URLSearchParams(window.location.search).get('view');
    const linkView = l.href.includes('view=') ? new URLSearchParams(l.href.split('?')[1] || '').get('view') : null;
    let active = currentFile === linkFile;
    if (linkFile === 'package.html') {
      active = currentFile === 'package.html' && currentView === linkView;
    }
    const cls = [
      active ? 'active' : '',
      l.highlight ? 'nav-highlight' : '',
    ].filter(Boolean).join(' ');
    const icon = l.icon ? `<i class="${l.icon}"></i> ` : '';
    return `<li><a href="${l.href}" class="${cls}">${icon}${l.label}</a></li>`;
  }).join('');
}

/** Mark admin-only blocks; hide tourist-only if admin, etc. */
function applyRoleVisibility() {
  const isAdmin = AuthSession.isAdmin();
  document.querySelectorAll('[data-role="admin"]').forEach(el => {
    el.hidden = !isAdmin;
    el.style.display = isAdmin ? '' : 'none';
  });
  document.querySelectorAll('[data-role="tourist"]').forEach(el => {
    el.hidden = isAdmin;
    el.style.display = isAdmin ? 'none' : '';
  });
  document.body.setAttribute('data-user-role', AuthSession.role());
}

document.addEventListener('DOMContentLoaded', () => {
  // Pages that include session.js expect a logged-in user (except login)
  const page = (window.location.pathname.split('/').pop() || '').toLowerCase();
  if (page && page !== 'login.html' && page !== 'index.html' && page !== '') {
    if (!AuthSession.requireAuth()) return;
    applyRoleBasedNav();
    applyRoleVisibility();
  }
});

function isAdminUser() {
  return typeof AuthSession !== 'undefined' && AuthSession.isAdmin();
}

/** UI block shown instead of Book buttons for admin users */
function adminBookNotice(label = 'Booking') {
  return `
    <div class="admin-book-notice">
      <i class="fas fa-user-shield"></i>
      <div>
        <strong>${label} is for travelers</strong>
        <span>Admins manage the catalog — switch to a Traveler account to book.</span>
      </div>
      <a href="admin.html" class="btn-outline admin-book-link"><i class="fas fa-database"></i> Manage Catalog</a>
    </div>`;
}
