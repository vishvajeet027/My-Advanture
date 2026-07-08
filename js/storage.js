/* ================================================================
   MODULE 4 — LocalStorage System
   storage.js — Storage Utility, CRUD Helper, Theme & Settings
   ================================================================ */

/* ===== STORAGE UTILITY ===== */
const Storage = {
  /** Get a parsed value from localStorage */
  get(key, fallback = null) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? JSON.parse(val) : fallback;
    } catch (e) {
      console.warn(`Storage.get error for key "${key}":`, e);
      return fallback;
    }
  },

  /** Set a value in localStorage as JSON */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`Storage.set error for key "${key}":`, e);
      return false;
    }
  },

  /** Remove a key from localStorage */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },

  /** Check if a key exists */
  has(key) {
    return localStorage.getItem(key) !== null;
  },

  /** Clear all app-related keys */
  clearAll() {
    const appKeys = Object.values(STORAGE_KEYS);
    appKeys.forEach(k => localStorage.removeItem(k));
  },

  /** Get total storage usage in KB */
  usage() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += (localStorage[key].length + key.length) * 2;
      }
    }
    return (total / 1024).toFixed(2);
  }
};

/* ===== STORAGE KEYS CONSTANTS ===== */
const STORAGE_KEYS = {
  TRIPS:        'myAdventureTrips',
  FAVORITES:    'myAdventureFavorites',
  EXPENSES:     'myAdventureExpenses',
  SETTINGS:     'myAdventureSettings',
  THEME:        'myAdventureTheme',
  NEWSLETTER:   'myAdventureNewsletter',
  WEATHER:      'myAdventureWeather',
  USER:         'myAdventureUser',
};

/* ================================================================
   CRUD HELPER — generic list operations
   ================================================================ */
const CRUDHelper = {
  /** Get all items for a key */
  getAll(key) {
    return Storage.get(key, []);
  },

  /** Get single item by id */
  getById(key, id) {
    const items = this.getAll(key);
    return items.find(item => item.id === id) || null;
  },

  /** Add a new item (auto-assigns id + createdAt) */
  add(key, item) {
    const items = this.getAll(key);
    const newItem = {
      ...item,
      id: item.id || Date.now(),
      createdAt: item.createdAt || new Date().toISOString()
    };
    items.unshift(newItem);
    Storage.set(key, items);
    return newItem;
  },

  /** Update an existing item by id */
  update(key, id, updates) {
    const items = this.getAll(key);
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString() };
    Storage.set(key, items);
    return items[idx];
  },

  /** Delete an item by id */
  delete(key, id) {
    const items = this.getAll(key);
    const filtered = items.filter(i => i.id !== id);
    Storage.set(key, filtered);
    return filtered.length < items.length;
  },

  /** Count items */
  count(key) {
    return this.getAll(key).length;
  },

  /** Find items matching a predicate */
  filter(key, predicate) {
    return this.getAll(key).filter(predicate);
  },

  /** Clear all items for a key */
  clear(key) {
    Storage.set(key, []);
  }
};

/* ================================================================
   THEME STORAGE
   ================================================================ */
const ThemeStorage = {
  THEMES: ['light', 'dark'],
  DEFAULT: 'light',

  /** Get current theme */
  get() {
    return Storage.get(STORAGE_KEYS.THEME, this.DEFAULT);
  },

  /** Set theme and apply to <body> */
  set(theme) {
    if (!this.THEMES.includes(theme)) theme = this.DEFAULT;
    Storage.set(STORAGE_KEYS.THEME, theme);
    this.apply(theme);
  },

  /** Apply theme to document */
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    const critical = document.getElementById('theme-critical');
    if (theme === 'dark') {
      if (!critical) {
        const style = document.createElement('style');
        style.id = 'theme-critical';
        style.textContent =
          'html[data-theme="dark"],html[data-theme="dark"] body{background:#1e2130;color:#ccc;color-scheme:dark}';
        document.head.appendChild(style);
      }
    } else if (critical) {
      critical.remove();
    }
    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  },

  /** Toggle between light and dark */
  toggle() {
    const current = this.get();
    const next = current === 'light' ? 'dark' : 'light';
    this.set(next);
    return next;
  },

  /** Apply stored theme on page load */
  init() {
    this.apply(this.get());
  }
};

/* ================================================================
   SETTINGS STORAGE
   ================================================================ */
const DEFAULT_SETTINGS = {
  currency:       'USD',
  language:       'en',
  distanceUnit:   'km',
  dateFormat:     'MM/DD/YYYY',
  notifications:  true,
  autoSave:       true,
  defaultTravelers: 2,
  userName:       'Traveler',
  userEmail:      '',
};

const SettingsStorage = {
  /** Get all settings (merged with defaults) */
  getAll() {
    const saved = Storage.get(STORAGE_KEYS.SETTINGS, {});
    return { ...DEFAULT_SETTINGS, ...saved };
  },

  /** Get a single setting value */
  get(key) {
    return this.getAll()[key] ?? DEFAULT_SETTINGS[key];
  },

  /** Update one or more settings */
  set(updates) {
    const current = this.getAll();
    const merged = { ...current, ...updates };
    Storage.set(STORAGE_KEYS.SETTINGS, merged);
    return merged;
  },

  /** Reset to defaults */
  reset() {
    Storage.set(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  },

  /** Currency symbol helper */
  currencySymbol() {
    const map = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', INR: '₹', AED: 'د.إ' };
    return map[this.get('currency')] || '$';
  }
};

/* ================================================================
   FAVORITES STORAGE (convenience wrapper)
   ================================================================ */
const FavoritesStorage = {
  getAll() {
    return CRUDHelper.getAll(STORAGE_KEYS.FAVORITES);
  },

  add(destination) {
    if (this.isFavorite(destination.id)) return false;
    CRUDHelper.add(STORAGE_KEYS.FAVORITES, destination);
    return true;
  },

  remove(id) {
    return CRUDHelper.delete(STORAGE_KEYS.FAVORITES, id);
  },

  toggle(destination) {
    if (this.isFavorite(destination.id)) {
      this.remove(destination.id);
      return false;
    } else {
      this.add(destination);
      return true;
    }
  },

  isFavorite(id) {
    return this.getAll().some(f => f.id === id);
  },

  count() {
    return this.getAll().length;
  }
};

/* ================================================================
   EXPENSES STORAGE (convenience wrapper)
   ================================================================ */
const ExpensesStorage = {
  getAll() {
    return CRUDHelper.getAll(STORAGE_KEYS.EXPENSES);
  },

  getByTrip(tripId) {
    return CRUDHelper.filter(STORAGE_KEYS.EXPENSES, e => e.tripId === tripId);
  },

  add(expense) {
    return CRUDHelper.add(STORAGE_KEYS.EXPENSES, expense);
  },

  update(id, updates) {
    return CRUDHelper.update(STORAGE_KEYS.EXPENSES, id, updates);
  },

  delete(id) {
    return CRUDHelper.delete(STORAGE_KEYS.EXPENSES, id);
  },

  totalByTrip(tripId) {
    return this.getByTrip(tripId).reduce((s, e) => s + (e.amount || 0), 0);
  },

  totalAll() {
    return this.getAll().reduce((s, e) => s + (e.amount || 0), 0);
  },

  byCategory(tripId) {
    const expenses = tripId ? this.getByTrip(tripId) : this.getAll();
    return expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + (e.amount || 0);
      return acc;
    }, {});
  }
};

/* ================================================================
   MIGRATION — clears old auto-seeded data from previous versions.
   Bumping APP_VERSION wipes trips/expenses/favorites so the app
   starts clean. Weather is always kept (it's not user data).
   ================================================================ */
const APP_VERSION = '2.0';

document.addEventListener('DOMContentLoaded', () => {
  ThemeStorage.init();

  // If the stored version doesn't match, wipe seeded collections
  const storedVersion = localStorage.getItem('myAdventureVersion');
  if (storedVersion !== APP_VERSION) {
    localStorage.removeItem(STORAGE_KEYS.TRIPS);
    localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.NEWSLETTER);
    localStorage.setItem('myAdventureVersion', APP_VERSION);
    console.info('App updated to v' + APP_VERSION + '. Data reset to empty state.');
  }
});
