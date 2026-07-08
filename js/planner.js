/* ================================================================
   planner.js — Flights Browse, Cards & Modal  (INR ₹)
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
  'Malaysia Airlines':  { bg: '#003087', text: '#c8102e' },
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
    <div class="flight-card" onclick="openFlightModal(${f.id})">
      <div class="flight-card-img">
        <img src="${f.image}" alt="${f.to}" loading="lazy"/>
        <div class="flight-card-img-overlay"></div>
        <span class="flight-weather-badge"><i class="fas fa-cloud-sun"></i> ${f.weather}</span>
        <span class="flight-class-badge ${isBiz ? 'biz' : 'eco'}">
          <i class="fas fa-${isBiz ? 'star' : 'chair'}"></i> ${f.flightClass}
        </span>
        <div class="flight-dest-label">
          <span class="flight-dest-city">${f.to}</span>
          <span class="flight-dest-country">${f.toCountry}</span>
        </div>
      </div>

      <div class="flight-airline-strip" style="background:${style.bg};color:${style.text};">
        <i class="fas fa-plane"></i>
        <span>${f.airline}</span>
        <span class="flight-number">FL-${String(f.id).padStart(3,'0')}</span>
      </div>

      <div class="flight-card-body">
        <div class="flight-route-row">
          <div class="flight-endpoint">
            <div class="flight-time">${f.departure}</div>
            <div class="flight-code">${f.fromCode}</div>
            <div class="flight-city">${f.from}</div>
          </div>
          <div class="flight-arc">
            <div class="flight-arc-duration">${f.duration}</div>
            <div class="flight-arc-line">
              <span class="arc-dot left"></span>
              <svg class="arc-svg" viewBox="0 0 120 30" preserveAspectRatio="none">
                <path d="M4,28 Q60,-8 116,28" fill="none" stroke="#0abde3" stroke-width="1.5" stroke-dasharray="4 3"/>
              </svg>
              <i class="fas fa-plane arc-plane"></i>
              <span class="arc-dot right"></span>
            </div>
            <div class="flight-arc-label">${f.sameDay ? 'Same Day' : 'Next Day'}</div>
          </div>
          <div class="flight-endpoint right">
            <div class="flight-time">${f.arrival}</div>
            <div class="flight-code">${f.toCode}</div>
            <div class="flight-city">${f.to}</div>
          </div>
        </div>

        <div class="flight-card-footer">
          <div class="flight-meta">
            <span class="flight-pax"><i class="fas fa-user"></i> ${f.passengers} Pax</span>
            <span class="flight-stops"><i class="fas fa-circle" style="font-size:0.4rem"></i> Direct</span>
          </div>
          <div class="flight-price-wrap">
            <span class="flight-price-amount">${INR(f.price)}</span>
            <span class="flight-price-label">/ person</span>
          </div>
        </div>
        <button class="btn-card flight-book-btn"
                onclick="event.stopPropagation(); openFlightModal(${f.id})">
          <i class="fas fa-ticket-alt"></i> View &amp; Book
        </button>
      </div>
    </div>`;
  }).join('');

  document.querySelectorAll('.flight-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 60);
  });
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

  let data = MOCK_FLIGHTS.filter(f => {
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
  selectedFlight   = MOCK_FLIGHTS.find(f => f.id === id);
  if (!selectedFlight) return;
  const f = selectedFlight;
  flightPassengers = f.passengers;

  const style = getAirlineStyle(f.airline);
  const isBiz = f.flightClass === 'Business';

  document.getElementById('flightModalRoute').innerHTML = `
    <span>${f.fromCode}</span>
    <i class="fas fa-long-arrow-alt-right" style="margin:0 10px;opacity:0.7;"></i>
    <span>${f.toCode}</span>
    <span style="margin-left:14px;font-size:0.75rem;opacity:0.75;font-weight:400;">${f.airline}</span>`;

  document.getElementById('flightModalBody').innerHTML = `
    <div class="fmd-hero">
      <img src="${f.image}" alt="${f.to}"/>
      <div class="fmd-hero-overlay">
        <div class="fmd-hero-text">
          <div class="fmd-hero-city">${f.to.toUpperCase()}</div>
          <div class="fmd-hero-country">${f.toCountry}</div>
        </div>
        <div class="fmd-hero-weather"><i class="fas fa-cloud-sun"></i> ${f.weather}</div>
      </div>
    </div>

    <div class="fmd-route-strip" style="background:${style.bg};">
      <div class="fmd-route-from">
        <div class="fmd-route-city">${f.from.toUpperCase()}</div>
        <div class="fmd-route-country">${f.fromCountry}</div>
      </div>
      <div class="fmd-route-center">
        <i class="fas fa-circle fmd-dot" style="color:${style.text};opacity:0.5;font-size:0.55rem;"></i>
        <div class="fmd-route-line">
          <svg viewBox="0 0 180 24" preserveAspectRatio="none">
            <path d="M4,20 Q90,-10 176,20" fill="none" stroke="rgba(255,255,255,0.55)"
                  stroke-width="1.5" stroke-dasharray="5 4"/>
          </svg>
          <i class="fas fa-plane fmd-plane-icon"></i>
        </div>
        <i class="fas fa-circle fmd-dot" style="color:${style.text};opacity:0.5;font-size:0.55rem;"></i>
      </div>
      <div class="fmd-route-to">
        <div class="fmd-route-city">${f.to.toUpperCase()}</div>
        <div class="fmd-route-country">${f.toCountry}</div>
      </div>
    </div>

    <div class="fmd-times-row">
      <div class="fmd-time-block">
        <div class="fmd-time-label"><i class="fas fa-plane-departure"></i> Departure</div>
        <div class="fmd-time-value">${f.departure}</div>
        <div class="fmd-time-sub">${f.from} · ${f.fromCode}</div>
      </div>
      <div class="fmd-time-divider">
        <div class="fmd-duration-pill"><i class="fas fa-clock"></i> ${f.duration}</div>
        <div class="fmd-direct-badge">Direct</div>
      </div>
      <div class="fmd-time-block right">
        <div class="fmd-time-label"><i class="fas fa-plane-arrival"></i> Arrival</div>
        <div class="fmd-time-value">${f.arrival}${!f.sameDay ? '<sup class="fmd-next-day">+1</sup>' : ''}</div>
        <div class="fmd-time-sub">${f.to} · ${f.toCode}</div>
      </div>
    </div>

    <div class="fmd-time-note">
      <i class="fas fa-info-circle"></i>
      Flight time: ${f.duration}, ${f.sameDay ? 'same day arrival' : 'next day arrival'}
    </div>

    <div class="fmd-details-grid">
      <div class="fmd-detail-item">
        <div class="fmd-detail-label">Class</div>
        <div class="fmd-detail-value ${isBiz ? 'biz-text' : ''}">
          <i class="fas fa-${isBiz ? 'star' : 'chair'}"></i> ${f.flightClass}
        </div>
      </div>
      <div class="fmd-detail-item">
        <div class="fmd-detail-label">Airline</div>
        <div class="fmd-detail-value">
          <span class="fmd-airline-chip" style="background:${style.bg};color:${style.text};">${f.airline}</span>
        </div>
      </div>
      <div class="fmd-detail-item">
        <div class="fmd-detail-label">Flight No.</div>
        <div class="fmd-detail-value">FL-${String(f.id).padStart(3,'0')}</div>
      </div>
      <div class="fmd-detail-item">
        <div class="fmd-detail-label">Destination Weather</div>
        <div class="fmd-detail-value"><i class="fas fa-thermometer-half" style="color:#0abde3;"></i> ${f.weather}</div>
      </div>
    </div>

    <div class="fmd-booking-row">
      <div class="fmd-passenger-block">
        <div class="fmd-passenger-label">Passengers</div>
        <div class="fmd-passenger-ctrl">
          <button class="fmd-pax-btn" onclick="changePax(-1)"><i class="fas fa-minus"></i></button>
          <span class="fmd-pax-count" id="fmdPaxCount">${flightPassengers}</span>
          <button class="fmd-pax-btn" onclick="changePax(1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div class="fmd-price-block">
        <div class="fmd-price-label">Total Price</div>
        <div class="fmd-price-value" id="fmdTotalPrice">${INR(f.price * flightPassengers)}</div>
        <div class="fmd-price-per">${INR(f.price)} / person</div>
      </div>
    </div>

    <button class="fmd-book-btn" onclick="bookFlight()">
      <i class="fas fa-check-circle"></i> BOOK THIS FLIGHT
    </button>`;

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

function bookFlight() {
  closeFlightModal();
  if (selectedFlight) {
    showToast(
      `✈️ ${selectedFlight.from} → ${selectedFlight.to} booked for ${flightPassengers} pax · ${INR(selectedFlight.price * flightPassengers)}`,
      'success'
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderFlightCards(MOCK_FLIGHTS);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFlightModal(); });
});
