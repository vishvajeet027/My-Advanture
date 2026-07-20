/* ================================================================
   MODULE 7 — Dashboard  (INR ₹)
   ================================================================ */

const INR = n => '₹' + Number(n).toLocaleString('en-IN');

/* ===== SECTION SWITCHING ===== */
function switchSection(name) {
  document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  const section = document.getElementById('section-' + name);
  const link    = document.querySelector(`.sidebar-link[data-section="${name}"]`);
  if (section) section.classList.add('active');
  if (link)    link.classList.add('active');
  if (name === 'expenses')  renderExpensesSection();
  if (name === 'favorites') renderFavorites();
  if (name === 'weather')   renderWeather();
  if (name === 'settings')  loadSettings();
  if (name === 'trips')     renderAllTrips();
}

document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', (e) => { e.preventDefault(); switchSection(link.dataset.section); });
});

/* ===== HELPERS ===== */
function getTrips() {
  const session = typeof AuthSession !== 'undefined' ? AuthSession.get() : null;
  if (typeof MockData !== 'undefined' && MockData.getTripsForSession) {
    return MockData.getTripsForSession(session);
  }
  return Storage.get(STORAGE_KEYS.TRIPS, []);
}
function getExpenses()    { return Storage.get(STORAGE_KEYS.EXPENSES, []); }
function getFavs()        { return Storage.get(STORAGE_KEYS.FAVORITES, []); }
function getWeatherData() { return Storage.get(STORAGE_KEYS.WEATHER, []); }

function fmtDate(d) {
  if (!d) return 'TBD';
  return new Date(d).toLocaleDateString('en-IN', { month:'short', day:'numeric', year:'numeric' });
}
function getDays(start, end) {
  if (!start || !end) return 0;
  return Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000) + 1);
}

const CAT_COLORS = {
  Flights:'#06b6d4', Accommodation:'#8b5cf6', Food:'#10b981',
  Activities:'#f43f5e', Transport:'#ec4899', Shopping:'#f59e0b',
};
const GRADIENTS = [
  'linear-gradient(135deg,#8b5cf6,#a78bfa)', 'linear-gradient(135deg,#06b6d4,#67e8f9)',
  'linear-gradient(135deg,#10b981,#34d399)', 'linear-gradient(135deg,#ec4899,#f472b6)',
  'linear-gradient(135deg,#f59e0b,#fbbf24)', 'linear-gradient(135deg,#f43f5e,#fb7185)',
];

/* ================================================================
   WELCOME CARD
   ================================================================ */
function renderWelcomeCard() {
  const settings = SettingsStorage.getAll();
  const session = typeof AuthSession !== 'undefined' ? AuthSession.get() : null;
  const name = (session && session.name) || settings.userName || 'Traveler';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning,' : hour < 17 ? 'Good afternoon,' : 'Good evening,';
  const el = id => document.getElementById(id);
  if (el('welcomeGreeting')) el('welcomeGreeting').textContent = greeting;
  if (el('welcomeName'))     el('welcomeName').textContent = name.split(' ')[0] + '!';
  const trips   = getTrips();
  const today   = new Date();
  const upcoming = trips.filter(t => t.start && new Date(t.start) >= today).length;
  if (el('upcomingCount')) el('upcomingCount').textContent = upcoming;
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
  if (el('sidebarAvatar')) el('sidebarAvatar').textContent = initials;
  if (el('sidebarName'))   el('sidebarName').textContent   = name;
  if (el('sidebarEmail'))  el('sidebarEmail').textContent  =
    (session && session.email) || settings.userEmail || 'traveler@example.com';

  const sub = el('welcomeSubtext');
  if (sub && session) {
    sub.innerHTML = session.role === 'admin'
      ? `Signed in as <strong>Admin</strong>. Manage catalog data or review <strong>${upcoming}</strong> upcoming traveler trips.`
      : `You have <strong id="upcomingCount">${upcoming}</strong> upcoming trips. Ready for your next adventure?`;
  }

  const newTripBtn = document.querySelector('.sidebar-bottom .btn-primary');
  if (newTripBtn && session) {
    if (session.role === 'admin') {
      newTripBtn.href = 'admin.html';
      newTripBtn.innerHTML = '<i class="fas fa-database"></i> Manage Catalog';
    } else {
      newTripBtn.href = 'trip-planner.html';
      newTripBtn.innerHTML = '<i class="fas fa-plus"></i> New Trip';
    }
  }

  const planBtn = document.querySelector('.welcome-actions .btn-primary');
  if (planBtn && session) {
    if (session.role === 'admin') {
      planBtn.href = 'admin.html';
      planBtn.innerHTML = '<i class="fas fa-database"></i> Manage Catalog';
    } else {
      planBtn.href = 'trip-planner.html';
      planBtn.innerHTML = '<i class="fas fa-plus"></i> Plan Trip';
    }
  }
}

/* ================================================================
   KPI STATS
   ================================================================ */
function renderKPIs() {
  const trips    = getTrips();
  const expenses = getExpenses();
  const favs     = getFavs();
  const totalBudget   = trips.reduce((s,t) => s + (parseFloat(t.budget)||0), 0);
  const totalDays     = trips.reduce((s,t) => s + getDays(t.start, t.end), 0);
  const uniqueDests   = new Set(trips.map(t => t.dest)).size;
  const totalExpenses = expenses.reduce((s,e) => s + (e.amount||0), 0);
  const set = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  set('kpiTrips',    trips.length);
  set('kpiDests',    uniqueDests);
  set('kpiDays',     totalDays);
  set('kpiBudget',   INR(totalBudget));
  set('kpiFavs',     favs.length);
  set('kpiExpenses', INR(totalExpenses));
}

/* ================================================================
   BAR CHART — Budget per Trip
   ================================================================ */
function renderBudgetChart() {
  const el = document.getElementById('budgetChart');
  if (!el) return;
  const trips = getTrips().slice(0,6);
  if (!trips.length) { el.innerHTML='<p style="color:#aaa;font-size:0.85rem;text-align:center;padding:20px 0;">No trips yet.</p>'; return; }
  const max = Math.max(...trips.map(t => parseFloat(t.budget)||0), 1);
  el.innerHTML = trips.map((t,i) => {
    const pct   = Math.max(4, Math.round(((parseFloat(t.budget)||0)/max)*100));
    const label = t.dest.split(',')[0];
    return `<div class="bar-item">
      <div class="bar-fill" style="height:${pct}%;background:${GRADIENTS[i]}">
        <div class="bar-tooltip">${INR(t.budget||0)}</div>
      </div>
      <span class="bar-label">${label}</span>
    </div>`;
  }).join('');
}

/* ================================================================
   DONUT CHART — Expenses by Category
   ================================================================ */
function renderDonutChart() {
  const svgEl    = document.getElementById('donutSvg');
  const legendEl = document.getElementById('donutLegend');
  if (!svgEl) return;
  const expenses = getExpenses();
  if (!expenses.length) { svgEl.innerHTML='<text x="100" y="108" text-anchor="middle" font-size="12" fill="#aaa">No data</text>'; return; }
  const cats  = {};
  expenses.forEach(e => { cats[e.category] = (cats[e.category]||0) + (e.amount||0); });
  const total = Object.values(cats).reduce((s,v)=>s+v,0);
  const cx=100, cy=100, r=70, strokeW=28;
  const circum = 2*Math.PI*r;
  let offset=0, svgPaths='', legendHTML='';
  Object.entries(cats).forEach(([cat,val]) => {
    const pct  = val/total;
    const dash = pct*circum;
    const color = CAT_COLORS[cat]||'#aaa';
    svgPaths += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeW}"
      stroke-dasharray="${dash} ${circum-dash}" stroke-dashoffset="${-offset}"
      transform="rotate(-90 ${cx} ${cy})"/>`;
    offset += dash;
    legendHTML += `<div class="legend-item">
      <span class="legend-dot" style="background:${color}"></span>
      <span class="legend-name">${cat}</span>
      <span class="legend-val">${INR(val)}</span>
    </div>`;
  });
  svgPaths += `<text x="${cx}" y="${cy-6}" text-anchor="middle" font-size="11" fill="#888">Total</text>
    <text x="${cx}" y="${cy+12}" text-anchor="middle" font-size="13" font-weight="700" fill="#333">${INR(total)}</text>`;
  svgEl.innerHTML = svgPaths;
  if (legendEl) legendEl.innerHTML = legendHTML;
}

/* ================================================================
   TYPE CHART
   ================================================================ */
function renderTypeChart() {
  const el = document.getElementById('typeChart');
  if (!el) return;
  const trips = getTrips();
  if (!trips.length) { el.innerHTML='<p style="color:#aaa;font-size:0.85rem;">No data yet.</p>'; return; }
  const types={};
  trips.forEach(t => { const tp=t.type||'Adventure'; types[tp]=(types[tp]||0)+1; });
  const max = Math.max(...Object.values(types));
  const typeColorMap = { Leisure:'#0abde3', Adventure:'#e17055', Cultural:'#6c5ce7', Business:'#636e72' };
  el.innerHTML = Object.entries(types).map(([type,count]) => `
    <div class="type-bar-item">
      <div class="type-bar-label"><span>${type}</span><span>${count} trip${count>1?'s':''}</span></div>
      <div class="type-bar-track">
        <div class="type-bar-fill" style="width:${Math.round((count/max)*100)}%;background:${typeColorMap[type]||'#0abde3'}"></div>
      </div>
    </div>`).join('');
}

/* ================================================================
   RECENT TRIPS
   ================================================================ */
function renderRecentTrips() {
  const el = document.getElementById('recentTripsList');
  if (!el) return;
  const trips = getTrips().slice(0,5);
  if (!trips.length) {
    el.innerHTML='<p style="color:#aaa;text-align:center;padding:24px 0;font-size:0.88rem;">No trips saved yet. <a href="flights.html" style="color:var(--primary)">Plan one now!</a></p>';
    return;
  }
  el.innerHTML = trips.map((t,i) => `
    <div class="recent-trip-row" onclick="window.location.href='my-bookings.html'">
      <div class="rtr-icon" style="background:${GRADIENTS[i%GRADIENTS.length]}"><i class="fas fa-map-marker-alt"></i></div>
      <div class="rtr-info">
        <strong>${t.name}</strong>
        <span>${t.dest} &bull; ${getDays(t.start,t.end)} days &bull; ${t.travelers} traveler${t.travelers>1?'s':''}</span>
      </div>
      <div class="rtr-meta">
        <strong>${t.budget ? INR(t.budget) : '—'}</strong>
        <span>${fmtDate(t.start)}</span>
      </div>
      <span class="rtr-badge">${t.type||'Trip'}</span>
    </div>`).join('');
}

/* ================================================================
   ALL TRIPS
   ================================================================ */
function renderAllTrips() {
  const el = document.getElementById('dashTripsGrid');
  if (!el) return;
  const trips = getTrips();
  if (!trips.length) {
    el.innerHTML='<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-suitcase-rolling"></i></div><h3>No trips yet</h3><p>Start planning your next adventure!</p><a href="flights.html" class="btn-primary"><i class="fas fa-plus"></i> Plan a Trip</a></div>';
    return;
  }
  el.innerHTML = trips.map((t,i) => {
    const days = getDays(t.start,t.end);
    const acts = t.days ? t.days.reduce((s,d)=>s+(d.activities?.length||0),0) : 0;
    return `
      <div class="trip-card">
        <div class="trip-card-header" style="background:${GRADIENTS[i%GRADIENTS.length]}">
          <div><h3>${t.name}</h3><p><i class="fas fa-map-marker-alt"></i> ${t.dest}</p></div>
          <span class="trip-type-tag">${t.type||'Trip'}</span>
        </div>
        <div class="trip-card-body">
          <div class="trip-detail-row"><i class="fas fa-calendar-alt"></i><span>${fmtDate(t.start)} → ${fmtDate(t.end)}</span></div>
          <div class="trip-detail-row"><i class="fas fa-moon"></i><span>${days} days</span></div>
          <div class="trip-detail-row"><i class="fas fa-users"></i><span>${t.travelers} traveler${t.travelers>1?'s':''}</span></div>
          <div class="trip-detail-row"><i class="fas fa-tasks"></i><span>${acts} activities</span></div>
          ${t.budget ? `<div class="trip-detail-row"><i class="fas fa-wallet"></i><span>Budget: <strong style="color:var(--primary)">${INR(t.budget)}</strong></span></div>` : ''}
        </div>
        <div class="trip-card-footer">
          <button class="btn-view" onclick="window.location.href='my-bookings.html'"><i class="fas fa-eye"></i> View</button>
        </div>
      </div>`;
  }).join('');
}

/* ================================================================
   EXPENSES SECTION
   ================================================================ */
function renderExpensesSection() {
  const trips    = getTrips();
  const expenses = getExpenses();
  const tripFilter = document.getElementById('expenseTripFilter');
  if (tripFilter && tripFilter.options.length <= 1) {
    trips.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id; opt.textContent = t.name;
      tripFilter.appendChild(opt);
    });
  }
  const total = expenses.reduce((s,e)=>s+(e.amount||0),0);
  const cats  = {};
  expenses.forEach(e => { cats[e.category]=(cats[e.category]||0)+(e.amount||0); });
  const badgesEl = document.getElementById('expenseSummaryBadges');
  if (badgesEl) {
    badgesEl.innerHTML = `<span class="summary-badge">Total: ${INR(total)}</span>` +
      Object.entries(cats).map(([c,v])=>`<span class="summary-badge">${c}: ${INR(v)}</span>`).join('');
  }
  renderExpensesTable();
}

function renderExpensesTable() {
  const trips   = getTrips();
  const tripMap = {};
  trips.forEach(t => { tripMap[t.id]=t.name; });
  let expenses = getExpenses();
  const tripVal = document.getElementById('expenseTripFilter')?.value;
  const catVal  = document.getElementById('expenseCatFilter')?.value;
  if (tripVal && tripVal!=='all') expenses = expenses.filter(e=>String(e.tripId)===String(tripVal));
  if (catVal  && catVal !=='all') expenses = expenses.filter(e=>e.category===catVal);
  const tbody = document.getElementById('expenseTableBody');
  if (!tbody) return;
  if (!expenses.length) {
    tbody.innerHTML='<tr><td colspan="5" style="text-align:center;color:#aaa;padding:28px;">No expenses found.</td></tr>';
  } else {
    tbody.innerHTML = expenses.map(e => {
      const color = CAT_COLORS[e.category]||'#aaa';
      return `<tr>
        <td><strong>${tripMap[e.tripId]||'Unknown'}</strong></td>
        <td><span class="cat-badge" style="background:${color}22;color:${color}">${e.category}</span></td>
        <td>${e.desc}</td>
        <td>${fmtDate(e.date)}</td>
        <td><strong>${INR(e.amount)}</strong></td>
      </tr>`;
    }).join('');
  }
  const total = expenses.reduce((s,e)=>s+(e.amount||0),0);
  const countEl = document.getElementById('expenseCount');
  const totalEl = document.getElementById('expenseTotal');
  if (countEl) countEl.textContent = expenses.length;
  if (totalEl) totalEl.textContent = INR(total);
}

/* ================================================================
   FAVORITES
   ================================================================ */
function renderFavorites() {
  const el = document.getElementById('dashFavGrid');
  if (!el) return;
  const favs = getFavs();
  if (!favs.length) {
    el.innerHTML='<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-heart"></i></div><h3>No favorites yet</h3><p>Explore packages and save your favorites.</p><a href="explore.html" class="btn-primary"><i class="fas fa-compass"></i> Explore</a></div>';
    return;
  }
  el.innerHTML = favs.map(f => `
    <div class="dest-grid-card" onclick="window.location.href='explore.html'">
      <div class="card-img-wrap">
        <img src="${f.image}" alt="${f.name}" loading="lazy"/>
        <span class="card-category"><i class="fas fa-heart"></i> Saved</span>
        <span class="card-rating"><i class="fas fa-star"></i> Fav</span>
      </div>
      <div class="card-body">
        <h3>${f.name}</h3>
        <p class="card-country"><i class="fas fa-map-marker-alt"></i> ${f.country}</p>
        <div class="card-footer-row">
          <span class="card-days"><i class="fas fa-calendar"></i> Saved ${fmtDate(f.savedAt)}</span>
          <span class="card-price">${INR(f.price)} <span>/ person</span></span>
        </div>
      </div>
    </div>`).join('');
}

/* ================================================================
   WEATHER CARDS
   ================================================================ */
function renderWeather() {
  const el = document.getElementById('weatherGrid');
  if (!el) return;
  const weather = getWeatherData();
  if (!weather.length) { el.innerHTML='<p style="color:#aaa;">No weather data available.</p>'; return; }
  el.innerHTML = weather.map(w => `
    <div class="weather-card">
      <div class="weather-city">
        <div><h4>${w.city}</h4><p>${w.country}</p></div>
        <div class="weather-icon-temp">
          <i class="${w.icon}" style="color:${w.temp>30?'#e17055':w.temp<18?'#74b9ff':'var(--primary)'}"></i>
          <div class="weather-temp">${w.temp}<sup>°C</sup></div>
        </div>
      </div>
      <p class="weather-condition"><i class="fas fa-info-circle" style="color:var(--primary);margin-right:5px;"></i>${w.condition}</p>
      <div class="weather-details">
        <div class="weather-detail"><label>Humidity</label><span>${w.humidity}%</span></div>
        <div class="weather-detail"><label>Wind</label><span>${w.wind} km/h</span></div>
        <div class="weather-detail"><label>Feels Like</label><span>${w.feelsLike}°C</span></div>
        <div class="weather-detail"><label>UV Index</label><span>${w.uvIndex}</span></div>
      </div>
      <div class="weather-hl">
        <span>Sunrise <strong>${w.sunrise}</strong></span>
        <span>H: <strong>${w.high}°</strong> / L: <strong>${w.low}°</strong></span>
        <span>Sunset <strong>${w.sunset}</strong></span>
      </div>
    </div>`).join('');
}

/* ================================================================
   SETTINGS
   ================================================================ */
function loadSettings() {
  const s = SettingsStorage.getAll();
  const set = (id,val) => { const el=document.getElementById(id); if(el) el.value=val; };
  set('settingName',      s.userName);
  set('settingEmail',     s.userEmail);
  set('settingCurrency',  s.currency);
  set('settingTravelers', s.defaultTravelers);
  const themeChk = document.getElementById('themeCheckbox');
  if (themeChk) themeChk.checked = ThemeStorage.get()==='dark';
  const storageEl = document.getElementById('storageInfo');
  if (storageEl) storageEl.innerHTML=`<i class="fas fa-hdd" style="color:var(--primary);margin-right:6px;"></i>Storage used: <strong>${Storage.usage()} KB</strong>`;
}

function saveProfile() {
  const name  = document.getElementById('settingName')?.value.trim();
  const email = document.getElementById('settingEmail')?.value.trim();
  SettingsStorage.set({ userName:name, userEmail:email });
  renderWelcomeCard();
  showToast('Profile saved!','success');
}
function savePreferences() {
  const currency  = document.getElementById('settingCurrency')?.value;
  const travelers = parseInt(document.getElementById('settingTravelers')?.value)||2;
  SettingsStorage.set({ currency, defaultTravelers:travelers });
  showToast('Preferences saved!','success');
}
function toggleThemeFromSettings() {
  ThemeStorage.toggle();
  const themeChk = document.getElementById('themeCheckbox');
  if (themeChk) themeChk.checked = ThemeStorage.get()==='dark';
}
function reseedData() {
  if (typeof AuthSession !== 'undefined' && !AuthSession.isAdmin()) {
    showToast('Only admins can re-seed mock data.', 'error');
    return;
  }
  if (!confirm('This will overwrite all trips, expenses, favorites and catalog data with samples. Continue?')) return;
  MockData.seed(true);
  showToast('Mock data re-seeded!', 'success');
  setTimeout(() => location.reload(), 1200);
}
function clearAppData() {
  if (typeof AuthSession !== 'undefined' && !AuthSession.isAdmin()) {
    showToast('Only admins can clear app data.', 'error');
    return;
  }
  if (!confirm('Clear ALL app data? This cannot be undone.')) return;
  Storage.clearAll();
  localStorage.setItem('myAdventureDataCleared', '1');
  showToast('All data cleared.', 'error');
  setTimeout(() => location.reload(), 1200);
}

document.addEventListener('DOMContentLoaded', () => {
  renderWelcomeCard();
  renderKPIs();
  renderBudgetChart();
  renderDonutChart();
  renderTypeChart();
  renderRecentTrips();
});
