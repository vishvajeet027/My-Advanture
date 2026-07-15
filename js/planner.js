/* ================================================================
   planner.js — Flights Browse, Cards & Modal  (Premium Edition)
   ================================================================ */

let activeFlightClass = 'all';
let selectedFlight    = null;
let flightPassengers  = 1;

const INR = n => '₹' + Number(n).toLocaleString('en-IN');

/* ── AIRLINE COLORS ── */
const AIRLINE_COLORS = {
  'Air France':         { bg: '#002395', text: '#fff' },
  'British Airways':    { bg: '#075aaa', text: '#fff' },
  'Emirates':           { bg: '#c8102e', text: '#fff' },
  'Qantas':             { bg: '#ee0000', text: '#fff' },
  'Singapore Airlines': { bg: '#041e42', text: '#f5a623' },
  'Vueling':            { bg: '#f7c900', text: '#333' },
  'KLM':                { bg: '#009dd9', text: '#fff' }, 
  'Thai Airways':       { bg: '#4b0082', text: '#f7c900' },
  'Air India':          { bg: '#e31837', text: '#fff' },
  'Kenya Airways':      { bg: '#006633', text: '#fff' },
  'Air Canada':         { bg: '#f00000', text: '#fff' },
  'Cathay Pacific':     { bg: '#005f5f', text: '#fff' },
  'Lufthansa':          { bg: '#05164d', text: '#f9b60e' },
  'LATAM':              { bg: '#e91b2e', text: '#fff' },
  'United Airlines':    { bg: '#003087', text: '#fff' },
  'Aeroflot':           { bg: '#cc0000', text: '#fff' },
  'Swiss':              { bg: '#d20a11', text: '#fff' },
  'Malaysia Airlines':  { bg: '#003087', text: '#c8102e'},
  'American Airlines':  { bg: '#00508f', text: '#fff' },
  'Korean Air':         { bg: '#00256c', text: '#fff' },
};

function getAirlineStyle(airline) {
  return AIRLINE_COLORS[airline] || { bg: '#0abde3', text: '#fff' };
}

function durationToMinutes(dur) {
  const h = parseInt(dur.match(/(\d+)h/)?.[1]   || 0);
  const m = parseInt(dur.match(/(\d+)min/)?.[1] || 0);
  return h * 60 + m;
}

function timeToNumber(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

/* ================================================================
   RENDER CARDS
   ================================================================ */
function renderFlightCards(data) {
  const grid    = document.getElementById('flightsGrid');
  const noRes   = document.getElementById('flightNoResults');
  const countEl = document.getElementById('flightResultsCount');
  if (!grid) return;

  if (data.length === 0) {
    grid.innerHTML = '';
    noRes.classList.remove('hidden');
    if (countEl) countEl.innerHTML = 'Showing <strong>0</strong> flights';
    return;
  }

  noRes.classList.add('hidden');
  if (countEl) countEl.innerHTML = `Showing <strong>${data.length}</strong> flight${data.length !== 1 ? 's' : ''}`;

  grid.innerHTML = data.map(f => {
    const style = getAirlineStyle(f.airline);
    const isBiz = f.flightClass === 'Business';
    return `
    <a href="#" class="premium-card hover-lift reveal-on-scroll is-visible" onclick="event.preventDefault(); openFlightModal(${f.id})" style="height:350px;">
      <div class="premium-card-img" style="background-image:url('${f.image}')"></div>
      <div class="premium-card-gradient"></div>
      <div class="premium-card-glow"></div>
      <span class="premium-card-badge" style="background:${style.bg};color:${style.text};border:none;"><i class="fas fa-plane"></i> ${f.airline}</span>
      <div class="premium-card-icon" style="top:20px;left:auto;right:20px;font-size:0.8rem;width:auto;border-radius:20px;padding:5px 10px;border-color:var(--glass-border);color:var(--accent-primary);">
        <i class="fas fa-${isBiz ? 'star' : 'chair'}"></i> ${f.flightClass}
      </div>
      <div class="premium-card-content">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:10px;">
            <div style="text-align:left;">
                <div style="font-size:1.8rem;font-weight:700;font-family:var(--font-heading);">${f.fromCode}</div>
                <div style="color:var(--text-secondary);font-size:0.85rem;">${f.departure}</div>
            </div>
            <div style="flex:1;text-align:center;padding:0 15px;position:relative;margin-bottom:15px;">
                <div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:5px;">${f.duration}</div>
                <div style="height:1px;background:var(--glass-border);position:relative;">
                    <i class="fas fa-plane" style="position:absolute;top:-7px;left:50%;transform:translateX(-50%);color:var(--accent-primary);font-size:0.8rem;"></i>
                </div>
            </div>
            <div style="text-align:right;">
                <div style="font-size:1.8rem;font-weight:700;font-family:var(--font-heading);">${f.toCode}</div>
                <div style="color:var(--text-secondary);font-size:0.85rem;">${f.arrival}</div>
            </div>
        </div>
        <div class="premium-card-desc" style="opacity:1; transform:none; font-size:1.1rem; font-weight:700; color:#fff; border-top:1px solid var(--glass-border); padding-top:15px; display:flex; justify-content:space-between;">
          <span>${INR(f.price)} <span style="font-size:0.8rem; font-weight:400; color:var(--text-secondary)">/ person</span></span>
          <span style="font-size:0.85rem;font-weight:400;color:var(--text-secondary)"><i class="fas fa-cloud-sun"></i> ${f.weather}</span>
        </div>
      </div>
    </a>`;
  }).join('');
}

/* ================================================================
   FILTER & SORT
   ================================================================ */
function filterFlightsByClass(btn, cls) {
  document.querySelectorAll('#flightClassFilter .tag').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  activeFlightClass = cls;
  filterFlights();
}

function filterFlights() {
  const query = (document.getElementById('flightSearchInput')?.value || '').toLowerCase();
  const sort  = document.getElementById('flightSortSelect')?.value || 'default';

  if(!MockData) return;
  let data = MockData.getAllFlights().filter(f => {
    const matchClass  = activeFlightClass === 'all' || f.flightClass === activeFlightClass;
    const matchSearch = f.from.toLowerCase().includes(query) ||
                        f.to.toLowerCase().includes(query)   ||
                        f.fromCountry.toLowerCase().includes(query) ||
                        f.toCountry.toLowerCase().includes(query)   ||
                        f.airline.toLowerCase().includes(query)     ||
                        f.fromCode.toLowerCase().includes(query)    ||
                        f.toCode.toLowerCase().includes(query);
    return matchClass && matchSearch;
  });

  if (sort === 'price-low')       data.sort((a,b) => a.price - b.price);
  else if (sort === 'price-high') data.sort((a,b) => b.price - a.price);
  else if (sort === 'duration')   data.sort((a,b) => durationToMinutes(a.duration) - durationToMinutes(b.duration));
  else if (sort === 'departure')  data.sort((a,b) => timeToNumber(a.departure)     - timeToNumber(b.departure));

  renderFlightCards(data);
}

/* ================================================================
   MODAL — OPEN
   ================================================================ */
function openFlightModal(id) {
  selectedFlight   = MockData.getAllFlights().find(f => String(f.id) === String(id));
  if (!selectedFlight) return;
  const f = selectedFlight;
  flightPassengers = f.passengers;

  const style = getAirlineStyle(f.airline);
  const isBiz = f.flightClass === 'Business';

  document.getElementById('flightModalRoute').innerHTML = `
    <span>${f.fromCode}</span>
    <i class="fas fa-long-arrow-alt-right" style="margin:0 10px;opacity:0.7;"></i>
    <span>${f.toCode}</span>
    <span style="margin-left:14px;font-size:0.75rem;opacity:0.75;font-weight:400;color:var(--text-secondary)">${f.airline}</span>`;

  document.getElementById('flightModalBody').innerHTML = `
    <div style="position:relative; height:200px; border-radius:0 0 24px 24px; overflow:hidden;">
      <img src="${f.image}" alt="${f.to}" style="width:100%; height:100%; object-fit:cover; filter:brightness(0.6);"/>
      <div style="position:absolute; bottom:20px; left:20px; right:20px; display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
            <div style="font-size:2rem;font-weight:700;color:#fff;line-height:1;">${f.to.toUpperCase()}</div>
            <div style="color:var(--text-secondary);">${f.toCountry}</div>
        </div>
        <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(10px);padding:5px 15px;border-radius:20px;font-size:0.85rem;">
            <i class="fas fa-cloud-sun"></i> ${f.weather}
        </div>
      </div>
    </div>

    <div style="padding:40px;">
      <div style="display:flex; justify-content:space-between; align-items:center; background:var(--glass-bg); border:1px solid var(--glass-border); padding:30px; border-radius:24px; margin-bottom:30px;">
          <div style="text-align:center;">
              <div style="font-size:2.5rem;font-family:var(--font-heading);font-weight:700;color:var(--accent-primary);">${f.fromCode}</div>
              <div style="font-size:1.1rem;margin-bottom:5px;">${f.departure}</div>
              <div style="font-size:0.8rem;color:var(--text-secondary);">${f.from}</div>
          </div>
          <div style="flex:1;text-align:center;padding:0 30px;">
              <div style="background:rgba(255,255,255,0.05);border-radius:20px;padding:5px 10px;font-size:0.8rem;display:inline-block;margin-bottom:10px;">
                  <i class="fas fa-clock" style="color:var(--accent-primary);"></i> ${f.duration}
              </div>
              <div style="height:2px;background:linear-gradient(90deg,transparent,var(--accent-primary),transparent);position:relative;">
                  <i class="fas fa-plane" style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);color:var(--accent-primary);"></i>
              </div>
              <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:10px;">Direct Flight</div>
          </div>
          <div style="text-align:center;">
              <div style="font-size:2.5rem;font-family:var(--font-heading);font-weight:700;color:var(--accent-primary);">${f.toCode}</div>
              <div style="font-size:1.1rem;margin-bottom:5px;">${f.arrival} ${!f.sameDay ? '<sup style="color:var(--accent-secondary)">+1</sup>' : ''}</div>
              <div style="font-size:0.8rem;color:var(--text-secondary);">${f.to}</div>
          </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:40px;">
          <div style="background:var(--glass-bg);border:1px solid var(--glass-border);padding:20px;border-radius:16px;">
              <div style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:5px;">Class</div>
              <div style="font-weight:600;"><i class="fas fa-${isBiz ? 'star' : 'chair'}" style="color:${isBiz ? 'var(--accent-secondary)' : 'var(--text-secondary)'};margin-right:5px;"></i> ${f.flightClass}</div>
          </div>
          <div style="background:var(--glass-bg);border:1px solid var(--glass-border);padding:20px;border-radius:16px;">
              <div style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:5px;">Airline &amp; Flight No.</div>
              <div style="font-weight:600;">
                <span style="background:${style.bg};color:${style.text};padding:2px 8px;border-radius:4px;font-size:0.8rem;margin-right:8px;">${f.airline}</span>
                FL-${String(f.id).padStart(3,'0')}
              </div>
          </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--glass-border); padding-top:30px;">
        <div>
          <div style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:5px;">Passengers</div>
          <div style="display:flex;align-items:center;gap:15px;background:var(--glass-bg);border:1px solid var(--glass-border);padding:5px 15px;border-radius:20px;">
              <button onclick="changePax(-1)" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;"><i class="fas fa-minus"></i></button>
              <span id="fmdPaxCount" style="font-weight:700;width:20px;text-align:center;">${flightPassengers}</span>
              <button onclick="changePax(1)" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="color:var(--text-secondary); font-size:0.9rem;">Total Price</div>
          <div style="font-size:2rem; font-weight:700; color:#fff;" id="fmdTotalPrice">${INR(f.price * flightPassengers)}</div>
        </div>
      </div>

      <div style="margin-top:30px;text-align:right;">
          <button class="magnetic-btn" onclick="bookFlight()" style="background:var(--accent-primary); color:var(--bg-main); border:none; padding:15px 40px; border-radius:30px; font-weight:700; font-size:1.1rem; cursor:pointer; font-family:var(--font-body); width:100%;">
            Confirm Reservation
          </button>
      </div>
    </div>`;

  document.getElementById('flightModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function changePax(delta) {
  flightPassengers = Math.max(1, Math.min(9, flightPassengers + delta));
  const countEl = document.getElementById('fmdPaxCount');
  const priceEl = document.getElementById('fmdTotalPrice');
  if (countEl) countEl.textContent = flightPassengers;
  if (priceEl && selectedFlight) priceEl.textContent = INR(selectedFlight.price * flightPassengers);
}

function closeFlightModal() {
  document.getElementById('flightModal').classList.add('hidden');
  document.body.style.overflow = '';
}

function handleFlightModalClick(e) {
  if (e.target.id === 'flightModal') closeFlightModal();
}

function showToast(msg, type) {
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  t.style.animation = 'slideInRight 0.5s forwards';
  setTimeout(() => {
    t.style.display = 'none';
  }, 3000);
}

function bookFlight() {
  if (typeof AuthSession !== 'undefined' && !AuthSession.guardBooking('book flights')) return;
  closeFlightModal();
  if (selectedFlight) {
    showToast(`✈️ First Class Reservation confirmed to ${selectedFlight.to}!`, 'success');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if(MockData) renderFlightCards(MockData.getAllFlights());
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFlightModal(); });
});
