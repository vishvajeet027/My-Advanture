/* ================================================================
   tripbuilder.js — Day-by-Day Sidebar Trip Builder
   ================================================================ */

const INR = n => '₹' + Number(n).toLocaleString('en-IN');
const MIN_TRIP_DAYS = 1;
const MAX_TRIP_DAYS = 30;
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const TAB_CONFIG = {
  transport: {
    title: 'Flights',
    subtitle: 'Select a flight to your destination',
  },
  hotels: {
    title: 'Hotels',
    subtitle: 'Choose where you want to stay',
  },
  places: {
    title: 'Famous Places',
    subtitle: 'Must-visit spots in your city',
  },
  rentals: {
    title: 'Rent a Bike or Car',
    subtitle: 'Get around on your own schedule',
  },
};

let activeTab = 'transport';
let selectedCity = null;
let selectedCityObj = null;
let selectedTripDays = null;
let tripStartDate = null;
let tripEndDate = null;
let calViewDate = null;
let activeDayIndex = 0;
let tripFlight = null;
let itineraryDays = [];
let applyToAllDays = false;

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function todayStart() {
  return startOfDay(new Date());
}

function toISODate(d) {
  if (!d) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysBetween(a, b) {
  return Math.round((startOfDay(b) - startOfDay(a)) / 86400000) + 1;
}

function addDays(d, n) {
  const x = startOfDay(d);
  x.setDate(x.getDate() + n);
  return x;
}

function formatShortDate(d) {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatChipDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
}

function getActiveDay() {
  return itineraryDays[activeDayIndex] || null;
}

function dayHasPlans(day) {
  if (!day) return false;
  return !!(day.hotel || day.rental || (day.places && day.places.length > 0));
}

function createEmptyDay(dayNum, date) {
  return {
    dayNum,
    date: startOfDay(date),
    hotel: null,
    places: [],
    rental: null,
  };
}

function rebuildItineraryDays(start, end) {
  const prevByIso = {};
  itineraryDays.forEach(d => {
    prevByIso[toISODate(d.date)] = d;
  });

  const count = daysBetween(start, end);
  const next = [];
  for (let i = 0; i < count; i++) {
    const date = addDays(start, i);
    const iso = toISODate(date);
    const prev = prevByIso[iso];
    if (prev) {
      next.push({
        dayNum: i + 1,
        date,
        hotel: prev.hotel,
        places: [...(prev.places || [])],
        rental: prev.rental,
      });
    } else {
      next.push(createEmptyDay(i + 1, date));
    }
  }

  itineraryDays = next;
  if (activeDayIndex >= itineraryDays.length) activeDayIndex = 0;
}

function resetItinerary() {
  itineraryDays = [];
  activeDayIndex = 0;
  tripFlight = null;
  applyToAllDays = false;
  const checkbox = document.getElementById('applyToAllDays');
  if (checkbox) checkbox.checked = false;
}

function initializePage() {
  if (typeof AuthSession !== 'undefined' && AuthSession.isAdmin()) {
    showToast('Admins manage the catalog — travelers create and book trips.', 'error');
    setTimeout(() => { window.location.replace('admin.html'); }, 900);
    return;
  }

  calViewDate = new Date(todayStart().getFullYear(), todayStart().getMonth(), 1);
  populateCities();
  renderCalendar();
  updateDayStrip();
  switchTab('transport', document.querySelector('.sidebar-item[data-tab="transport"]'));
}

function populateCities() {
  const select = document.getElementById('citySelect');
  if (!select) return;

  MOCK_DESTINATIONS.forEach(dest => {
    const option = document.createElement('option');
    option.value = dest.name;
    option.textContent = `${dest.name}, ${dest.country}`;
    option.dataset.id = dest.id;
    option.dataset.country = dest.country;
    option.dataset.image = dest.image;
    option.dataset.desc = dest.desc;
    select.appendChild(option);
  });
}

function onCityChange() {
  const select = document.getElementById('citySelect');
  const option = select.options[select.selectedIndex];
  const daysPicker = document.getElementById('tripDaysPicker');

  if (!option.value) {
    selectedCity = null;
    selectedCityObj = null;
    clearTripDates({ silent: true });
    document.getElementById('cityPreview').classList.add('hidden');
    daysPicker.classList.add('hidden');
    resetItinerary();
    updateSelectionList();
    updateDayStrip();
    showEmptyState();
    return;
  }

  selectedCity = option.value;
  selectedCityObj = MOCK_DESTINATIONS.find(d => d.name === selectedCity);

  document.getElementById('cityPreviewImg').src = option.dataset.image;
  document.getElementById('cityPreviewName').textContent = selectedCity;
  document.getElementById('cityPreviewCountry').textContent = option.dataset.country;
  document.getElementById('cityPreview').classList.remove('hidden');
  daysPicker.classList.remove('hidden');

  resetItinerary();

  if (!tripStartDate && selectedCityObj?.days) {
    const start = todayStart();
    const end = addDays(start, selectedCityObj.days - 1);
    applyDateRange(start, end, { silent: true });
  } else if (tripStartDate && tripEndDate) {
    rebuildItineraryDays(tripStartDate, tripEndDate);
    renderCalendar();
    updateDayStrip();
  } else {
    renderCalendar();
    updateDayStrip();
  }

  updateSelectionList();
  renderContent();
}

function clearTripDates(opts = {}) {
  tripStartDate = null;
  tripEndDate = null;
  selectedTripDays = null;
  resetItinerary();
  updateCalSummary();
  renderCalendar();
  updateDayStrip();
  updateSelectionList();
  if (!opts.silent) {
    renderContent();
    showToast('Dates cleared', 'success');
  }
}

function applyDateRange(start, end, opts = {}) {
  const s = startOfDay(start);
  const e = startOfDay(end);
  const days = daysBetween(s, e);

  if (days < MIN_TRIP_DAYS || days > MAX_TRIP_DAYS) {
    if (!opts.silent) {
      showToast(`Select between ${MIN_TRIP_DAYS} and ${MAX_TRIP_DAYS} days`, 'error');
    }
    return false;
  }

  tripStartDate = s;
  tripEndDate = e;
  selectedTripDays = days;
  calViewDate = new Date(s.getFullYear(), s.getMonth(), 1);
  rebuildItineraryDays(s, e);
  activeDayIndex = 0;
  updateCalSummary();
  renderCalendar();
  updateDayStrip();
  updateSelectionList();
  renderContent();

  if (!opts.silent) {
    showToast(`Trip set: ${formatShortDate(s)} → ${formatShortDate(e)}`, 'success');
  }
  return true;
}

function updateCalSummary() {
  const hint = document.getElementById('tripDaysHint');
  const clearBtn = document.getElementById('calClearBtn');
  const instruction = document.getElementById('calInstruction');

  if (!tripStartDate) {
    if (hint) {
      hint.textContent = 'Pick a date range';
      hint.classList.remove('has-days');
    }
    if (clearBtn) clearBtn.classList.add('hidden');
    if (instruction) instruction.textContent = 'Select start & end dates';
    return;
  }

  if (tripStartDate && !tripEndDate) {
    if (hint) {
      hint.textContent = `Start: ${formatShortDate(tripStartDate)} — pick end date`;
      hint.classList.add('has-days');
    }
    if (clearBtn) clearBtn.classList.remove('hidden');
    if (instruction) instruction.textContent = 'Now select your end date';
    return;
  }

  const nights = Math.max(selectedTripDays - 1, 0);
  if (hint) {
    hint.textContent = `${formatShortDate(tripStartDate)} → ${formatShortDate(tripEndDate)} · ${selectedTripDays} day${selectedTripDays > 1 ? 's' : ''} · ${nights} night${nights !== 1 ? 's' : ''}`;
    hint.classList.add('has-days');
  }
  if (clearBtn) clearBtn.classList.remove('hidden');
  if (instruction) instruction.textContent = 'Change dates anytime';
}

function shiftCalendar(delta) {
  if (!calViewDate) calViewDate = new Date(todayStart().getFullYear(), todayStart().getMonth(), 1);
  const next = new Date(calViewDate.getFullYear(), calViewDate.getMonth() + delta, 1);
  const minMonth = new Date(todayStart().getFullYear(), todayStart().getMonth(), 1);
  if (next < minMonth) return;
  calViewDate = next;
  renderCalendar();
}

function renderCalendar() {
  const grid = document.getElementById('calGrid');
  const label = document.getElementById('calMonthLabel');
  const prevBtn = document.getElementById('calPrev');
  if (!grid || !calViewDate) return;

  const year = calViewDate.getFullYear();
  const month = calViewDate.getMonth();
  if (label) label.textContent = `${MONTH_NAMES[month]} ${year}`;

  const minMonth = new Date(todayStart().getFullYear(), todayStart().getMonth(), 1);
  if (prevBtn) prevBtn.disabled = calViewDate <= minMonth;

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const today = todayStart();

  let html = '';

  for (let i = firstDow - 1; i >= 0; i--) {
    const dayNum = daysInPrev - i;
    const date = new Date(year, month - 1, dayNum);
    html += buildCalDayBtn(date, dayNum, true, today);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    html += buildCalDayBtn(date, d, false, today);
  }

  const totalCells = firstDow + daysInMonth;
  const trailing = (7 - (totalCells % 7)) % 7;
  for (let d = 1; d <= trailing; d++) {
    const date = new Date(year, month + 1, d);
    html += buildCalDayBtn(date, d, true, today);
  }

  grid.innerHTML = html;
}

function buildCalDayBtn(date, label, otherMonth, today) {
  const iso = toISODate(date);
  const ts = startOfDay(date).getTime();
  const isPast = ts < today.getTime();
  const isToday = ts === today.getTime();
  const rangeStart = tripStartDate;
  const rangeEnd = tripEndDate;

  let classes = ['cal-day'];
  if (otherMonth) classes.push('other-month');
  if (isToday) classes.push('today');

  if (rangeStart && ts === rangeStart.getTime()) classes.push('range-start');
  if (rangeEnd && ts === rangeEnd.getTime()) classes.push('range-end');

  if (rangeStart && rangeEnd) {
    if (ts > rangeStart.getTime() && ts < rangeEnd.getTime()) classes.push('in-range');
    if (ts === rangeStart.getTime() && ts !== rangeEnd.getTime()) classes.push('in-range');
    if (ts === rangeEnd.getTime() && ts !== rangeStart.getTime()) classes.push('in-range');
  } else if (rangeStart && !rangeEnd && ts === rangeStart.getTime()) {
    classes.push('range-start', 'range-end');
  }

  const disabled = isPast ? 'disabled' : '';
  return `<button type="button" class="${classes.join(' ')}" data-date="${iso}" ${disabled}
    onclick="onCalDayClick('${iso}')">${label}</button>`;
}

function onCalDayClick(iso) {
  const clicked = startOfDay(new Date(iso + 'T00:00:00'));
  if (clicked < todayStart()) return;

  if (!tripStartDate || (tripStartDate && tripEndDate)) {
    tripStartDate = clicked;
    tripEndDate = null;
    selectedTripDays = null;
    resetItinerary();
    updateCalSummary();
    renderCalendar();
    updateDayStrip();
    updateSelectionList();
    renderContent();
    return;
  }

  if (clicked < tripStartDate) {
    tripStartDate = clicked;
    tripEndDate = null;
    selectedTripDays = null;
    updateCalSummary();
    renderCalendar();
    return;
  }

  const days = daysBetween(tripStartDate, clicked);
  if (days > MAX_TRIP_DAYS) {
    showToast(`Max trip length is ${MAX_TRIP_DAYS} days`, 'error');
    return;
  }

  applyDateRange(tripStartDate, clicked);
}

/* ===== DAY STRIP ===== */
function updateDayStrip() {
  const wrap = document.getElementById('dayStripWrap');
  const strip = document.getElementById('dayStrip');
  if (!wrap || !strip) return;

  if (!selectedTripDays || !itineraryDays.length) {
    wrap.classList.add('hidden');
    strip.innerHTML = '';
    updateApplyAllUI();
    updateDaySelectionBanner();
    return;
  }

  wrap.classList.remove('hidden');
  strip.innerHTML = itineraryDays.map((day, i) => {
    const active = i === activeDayIndex ? ' active' : '';
    const filled = dayHasPlans(day) || (i === 0 && tripFlight) ? ' has-plans' : '';
    const icons = [];
    if (i === 0 && tripFlight) icons.push('<i class="fas fa-plane" title="Flight"></i>');
    if (day.hotel) icons.push('<i class="fas fa-hotel" title="Hotel selected"></i>');
    if (day.places && day.places.length) icons.push('<i class="fas fa-landmark" title="Places selected"></i>');
    if (day.rental) icons.push('<i class="fas fa-motorcycle" title="Rental selected"></i>');

    return `
      <button type="button" class="day-chip${active}${filled}" role="tab"
        aria-selected="${i === activeDayIndex}"
        onclick="selectDay(${i})">
        <span class="day-chip-num">Day ${day.dayNum}</span>
        <span class="day-chip-date">${formatChipDate(day.date)}</span>
        <span class="day-chip-icons">${icons.join('')}</span>
      </button>`;
  }).join('');

  updateApplyAllUI();
  updateDaySelectionBanner();
}

function updateDaySelectionBanner() {
  const banner = document.getElementById('daySelectionBanner');
  if (!banner) return;

  const day = getActiveDay();
  if (!day || !selectedTripDays || activeTab === 'transport') {
    banner.classList.add('hidden');
    banner.innerHTML = '';
    return;
  }

  banner.classList.remove('hidden');
  const bits = [];

  if (activeTab === 'hotels') {
    if (day.hotel) {
      bits.push(`<span class="banner-item"><i class="fas fa-hotel"></i> ${day.hotel.name}</span>`);
    } else {
      bits.push('<span class="banner-empty">No hotel selected for this day yet</span>');
    }
  } else if (activeTab === 'places') {
    if (day.places && day.places.length) {
      day.places.forEach(p => {
        bits.push(`<span class="banner-item"><i class="fas fa-landmark"></i> ${p.name}</span>`);
      });
    } else {
      bits.push('<span class="banner-empty">No places selected for this day yet</span>');
    }
  } else if (activeTab === 'rentals') {
    if (day.rental) {
      bits.push(`<span class="banner-item"><i class="fas fa-motorcycle"></i> ${day.rental.name}</span>`);
    } else {
      bits.push('<span class="banner-empty">No rental selected for this day yet</span>');
    }
  }

  banner.innerHTML = `<strong>Day ${day.dayNum} selection:</strong> ${bits.join('')}`;
}

function sameId(a, b) {
  return Number(a) === Number(b);
}

function escapeAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Card image with interactive fallback when src is missing/broken */
function cardImageHTML(src, alt, icon = 'fa-image') {
  const safeAlt = escapeAttr(alt);
  const safeSrc = escapeAttr(src || '');
  const hasSrc = !!(src && String(src).trim());

  if (!hasSrc) {
    return `
      <div class="trip-card-img-fallback show" aria-hidden="true">
        <div class="fallback-icon"><i class="fas ${icon}"></i></div>
        <div class="fallback-title">${safeAlt || 'No image'}</div>
        <div class="fallback-sub">Photo unavailable</div>
      </div>`;
  }

  return `
    <img src="${safeSrc}" alt="${safeAlt}" loading="lazy"
      onerror="handleCardImageError(this)"/>
    <div class="trip-card-img-fallback" aria-hidden="true">
      <div class="fallback-icon"><i class="fas ${icon}"></i></div>
      <div class="fallback-title">${safeAlt || 'No image'}</div>
      <div class="fallback-sub">Photo unavailable</div>
    </div>`;
}

function handleCardImageError(img) {
  if (!img || img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = '1';
  img.classList.add('is-broken');
  const fallback = img.parentElement?.querySelector('.trip-card-img-fallback');
  if (fallback) fallback.classList.add('show');
}

function selectDay(index) {
  if (index < 0 || index >= itineraryDays.length) return;
  activeDayIndex = index;
  updateDayStrip();
  updateSelectionList();
  updateContentHeader();
  renderContent();
}

function updateContentHeader() {
  const config = TAB_CONFIG[activeTab];
  const titleEl = document.getElementById('contentTitle');
  const subEl = document.getElementById('contentSubtitle');
  if (!titleEl || !subEl) return;

  titleEl.textContent = config.title;

  const day = getActiveDay();
  if (!day || !selectedTripDays) {
    subEl.textContent = config.subtitle;
    updateApplyAllUI();
    return;
  }

  const dayLabel = `Day ${day.dayNum} · ${formatShortDate(day.date)}`;
  if (activeTab === 'transport') {
    subEl.textContent = `${config.subtitle} (applies to whole trip)`;
  } else if (activeTab === 'hotels') {
    subEl.textContent = applyToAllDays
      ? `${dayLabel} — hotel will apply to all ${selectedTripDays} days`
      : `${dayLabel} — choose a hotel for this day`;
  } else if (activeTab === 'places') {
    subEl.textContent = applyToAllDays
      ? `${dayLabel} — places will sync across all days`
      : `${dayLabel} — add places to visit`;
  } else if (activeTab === 'rentals') {
    subEl.textContent = applyToAllDays
      ? `${dayLabel} — rental will apply to all ${selectedTripDays} days`
      : `${dayLabel} — rent a bike or car`;
  } else {
    subEl.textContent = config.subtitle;
  }

  updateApplyAllUI();
}

function updateApplyAllUI() {
  const wrap = document.getElementById('applyAllWrap');
  const checkbox = document.getElementById('applyToAllDays');
  if (!wrap) return;

  // Show under day strip whenever trip has 2+ days
  const show = selectedTripDays > 1 && itineraryDays.length > 1;
  wrap.classList.toggle('hidden', !show);

  if (checkbox) checkbox.checked = applyToAllDays;
}

function onApplyToAllChange() {
  const checkbox = document.getElementById('applyToAllDays');
  applyToAllDays = !!(checkbox && checkbox.checked);
  updateContentHeader();

  if (applyToAllDays) {
    const day = getActiveDay();
    if (day && dayHasPlans(day)) {
      // Sync everything planned on the active day to all days
      applyCurrentDayToAll('all');
    } else {
      showToast('New hotel, places & rental picks will apply to all days', 'success');
    }
  } else {
    showToast('Selections will apply to the active day only', 'success');
  }
}

function applyCurrentDayToAll(category) {
  const day = getActiveDay();
  if (!day || itineraryDays.length < 2) {
    showToast('Select dates with more than one day first', 'error');
    return;
  }

  // Support button clicks: 'hotels' | 'places' | 'rentals' | 'all'
  let target = category;
  if (!target || typeof target === 'object') {
    target = ['hotels', 'places', 'rentals'].includes(activeTab) ? activeTab : 'all';
  }

  if (target === 'hotels' && !day.hotel) {
    showToast('Select a hotel on this day first', 'error');
    return;
  }
  if (target === 'places' && (!day.places || day.places.length === 0)) {
    showToast('Add places on this day first', 'error');
    return;
  }
  if (target === 'rentals' && !day.rental) {
    showToast('Select a rental on this day first', 'error');
    return;
  }
  if (target === 'all' && !dayHasPlans(day)) {
    showToast('Add a hotel, place or rental on this day first', 'error');
    return;
  }

  itineraryDays.forEach((d, i) => {
    if (i === activeDayIndex) return;
    if (target === 'hotels') d.hotel = day.hotel ? { ...day.hotel } : null;
    if (target === 'places') d.places = (day.places || []).map(p => ({ ...p }));
    if (target === 'rentals') d.rental = day.rental ? { ...day.rental } : null;
    if (target === 'all') {
      if (day.hotel) d.hotel = { ...day.hotel };
      if (day.places && day.places.length) d.places = day.places.map(p => ({ ...p }));
      if (day.rental) d.rental = { ...day.rental };
    }
  });

  // One-shot copy only — keep per-day selection mode unless checkbox is already on
  updateDayStrip();
  updateSelectionList();
  updateContentHeader();
  renderContent();

  const label =
    target === 'hotels' ? 'Hotel' :
    target === 'places' ? 'Places' :
    target === 'rentals' ? 'Rental' : 'Day plans';

  showToast(`${label} applied to all ${selectedTripDays} days`, 'success');
}

function switchTab(tab, btn) {
  activeTab = tab;
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
  if (btn) btn.classList.add('active');
  updateContentHeader();

  if (!selectedCity || !selectedTripDays) {
    showEmptyState();
    return;
  }

  renderContent();
}

function showEmptyState() {
  document.getElementById('contentEmpty').classList.remove('hidden');
  document.getElementById('contentGrid').classList.add('hidden');
  document.getElementById('contentCount').textContent = '';
  updateApplyAllUI();
  updateDaySelectionBanner();

  const title = document.getElementById('emptyTitle');
  const message = document.getElementById('emptyMessage');

  if (!selectedCity) {
    title.textContent = 'Select a city first';
    message.textContent = 'Choose your destination from the sidebar to see available options.';
  } else if (!selectedTripDays) {
    title.textContent = 'Select trip dates';
    message.textContent = 'Pick a start and end date on the calendar to build your day-by-day itinerary.';
  }
}

function renderContent() {
  if (!selectedCity || !selectedTripDays || !itineraryDays.length) {
    showEmptyState();
    return;
  }

  document.getElementById('contentEmpty').classList.add('hidden');
  const grid = document.getElementById('contentGrid');
  grid.classList.remove('hidden');
  updateContentHeader();
  updateDaySelectionBanner();

  let html = '';
  let count = 0;

  switch (activeTab) {
    case 'transport':
      html = renderFlights();
      count = MockData.getFlightsToCity(selectedCity).length || MockData.getAllFlights().slice(0, 8).length;
      break;
    case 'hotels':
      html = renderHotels();
      count = getHotelsForCity().length;
      break;
    case 'places':
      html = renderPlaces();
      count = MockData.getPlacesByCity(selectedCity).length;
      break;
    case 'rentals':
      html = renderRentals();
      count = MockData.getAllRentals().length;
      break;
  }

  grid.innerHTML = html;
  document.getElementById('contentCount').textContent =
    count > 0 ? `${count} option${count !== 1 ? 's' : ''}` : 'No results';
}

function getHotelsForCity() {
  let hotels = MockData.getHotelsByCity(selectedCity);
  const allHotels = MockData.getAllHotels();
  if (hotels.length === 0) {
    hotels = allHotels.filter(h =>
      String(h.country || '').toLowerCase() === (selectedCityObj?.country || '').toLowerCase()
    );
  }
  if (hotels.length === 0) {
    hotels = allHotels.slice(0, 6);
  }
  return hotels;
}

function renderFlights() {
  let flights = MockData.getFlightsToCity(selectedCity);
  if (flights.length === 0) flights = MockData.getAllFlights().slice(0, 8);

  return flights.map(f => {
    const isSelected = tripFlight?.id === f.id;
    return `
      <div class="trip-card${isSelected ? ' selected' : ''}" onclick="selectFlight(${f.id})">
        <div class="trip-card-img">
          ${cardImageHTML(f.image, f.airline || f.to, 'fa-plane')}
          <span class="trip-card-badge">${f.airline}</span>
          <span class="trip-card-check"><i class="fas fa-check"></i></span>
        </div>
        <div class="trip-card-body">
          <div class="flight-route-mini">
            <div class="endpoint">
              <div class="code">${f.fromCode}</div>
              <div class="city">${f.from}</div>
            </div>
            <div class="arc">
              <i class="fas fa-plane"></i>
              <div class="duration">${f.duration}</div>
            </div>
            <div class="endpoint">
              <div class="code">${f.toCode}</div>
              <div class="city">${f.to}</div>
            </div>
          </div>
          <div class="trip-card-meta">
            <i class="fas fa-clock"></i> ${f.departure} → ${f.arrival}
            &nbsp;·&nbsp; ${f.flightClass}
          </div>
          <div class="trip-card-footer">
            <span class="trip-card-price">${INR(f.price)} <small>/person</small></span>
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderHotels() {
  const day = getActiveDay();
  const hotels = getHotelsForCity();

  return hotels.map(h => {
    const isSelected = day?.hotel && sameId(day.hotel.id, h.id);
    return `
      <div class="trip-card${isSelected ? ' selected' : ''}" onclick="selectHotel(${h.id})">
        <div class="trip-card-img">
          ${cardImageHTML(h.image, h.name, 'fa-hotel')}
          <span class="trip-card-badge">${h.city}</span>
          <span class="trip-card-check"><i class="fas fa-check"></i></span>
        </div>
        <div class="trip-card-body">
          <div class="trip-card-name">${h.name}</div>
          <div class="trip-card-meta">
            <i class="fas fa-star"></i> ${h.rating} · ${h.country}
            &nbsp;·&nbsp; Day ${day?.dayNum || 1}
          </div>
          <div class="trip-card-desc">${h.desc}</div>
          <div class="trip-card-footer">
            <span class="trip-card-price">${INR(h.price)} <small>/night</small></span>
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderPlaces() {
  const day = getActiveDay();
  const places = MockData.getPlacesByCity(selectedCity);
  if (places.length === 0) {
    return '<div class="content-empty" style="grid-column:1/-1;padding:40px;"><p>No places listed for this city yet.</p></div>';
  }

  return places.map(p => {
    const isSelected = day?.places?.some(x => sameId(x.id, p.id));
    return `
      <div class="trip-card${isSelected ? ' selected' : ''}" onclick="togglePlace(${p.id})">
        <div class="trip-card-img">
          ${cardImageHTML(p.image, p.name, 'fa-landmark')}
          <span class="trip-card-badge">${p.type}</span>
          <span class="trip-card-check"><i class="fas fa-check"></i></span>
        </div>
        <div class="trip-card-body">
          <div class="trip-card-name">${p.name}</div>
          <div class="trip-card-meta">
            <i class="fas fa-star"></i> ${p.rating}
            &nbsp;·&nbsp; Day ${day?.dayNum || 1}
          </div>
          <div class="trip-card-desc">${p.desc}</div>
          <div class="trip-card-footer">
            <span class="trip-card-price">${p.price > 0 ? INR(p.price) : 'Free'} <small>/entry</small></span>
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderRentals() {
  const day = getActiveDay();

  return MockData.getAllRentals().map(r => {
    const isSelected = day?.rental && sameId(day.rental.id, r.id);
    const tagClass = r.type === 'Bike' ? 'bike' : 'car';
    return `
      <div class="trip-card${isSelected ? ' selected' : ''}" onclick="selectRental(${JSON.stringify(r.id)})">
        <div class="trip-card-img">
          ${cardImageHTML(r.image, r.name, 'fa-motorcycle')}
          <span class="trip-card-badge">${r.vehicle}</span>
          <span class="trip-card-check"><i class="fas fa-check"></i></span>
        </div>
        <div class="trip-card-body">
          <span class="rental-type-tag ${tagClass}">${r.type}</span>
          <div class="trip-card-name">${r.name}</div>
          <div class="trip-card-meta">
            <i class="fas fa-star"></i> ${r.rating}
            &nbsp;·&nbsp; Day ${day?.dayNum || 1}
          </div>
          <div class="trip-card-desc">${r.desc}</div>
          <div class="trip-card-footer">
            <span class="trip-card-price">${INR(r.price)} <small>/day</small></span>
          </div>
        </div>
      </div>`;
  }).join('');
}

function selectFlight(id) {
  tripFlight = MockData.getAllFlights().find(f => sameId(f.id, id));
  updateDayStrip();
  updateSelectionList();
  renderContent();
  showToast(`${tripFlight.airline} flight selected for the trip!`, 'success');
}

function selectHotel(id) {
  const day = getActiveDay();
  if (!day) return;
  const hotel = MockData.getAllHotels().find(h => sameId(h.id, id));
  if (!hotel) return;

  // Toggle off if clicking the same hotel again on this day
  if (day.hotel && sameId(day.hotel.id, hotel.id) && !applyToAllDays) {
    day.hotel = null;
    updateDayStrip();
    updateSelectionList();
    renderContent();
    showToast(`Hotel removed from Day ${day.dayNum}`, 'success');
    return;
  }

  const hotelCopy = { ...hotel };

  if (applyToAllDays && itineraryDays.length > 1) {
    itineraryDays.forEach(d => { d.hotel = { ...hotel }; });
    updateDayStrip();
    updateSelectionList();
    renderContent();
    showToast(`${hotel.name} applied to all ${selectedTripDays} days`, 'success');
    return;
  }

  // Per-day only
  day.hotel = hotelCopy;
  updateDayStrip();
  updateSelectionList();
  renderContent();
  showToast(`${hotel.name} selected for Day ${day.dayNum}`, 'success');
}

function togglePlace(id) {
  const day = getActiveDay();
  if (!day) return;

  const places = MockData.getPlacesByCity(selectedCity);
  const place = places.find(p => sameId(p.id, id));
  if (!place) return;
  const idx = day.places.findIndex(p => sameId(p.id, id));
  const removing = idx >= 0;

  if (removing) {
    day.places.splice(idx, 1);
  } else {
    day.places.push({ ...place });
  }

  if (applyToAllDays && itineraryDays.length > 1) {
    itineraryDays.forEach((d, i) => {
      if (i === activeDayIndex) return;
      const pIdx = d.places.findIndex(p => sameId(p.id, id));
      if (removing) {
        if (pIdx >= 0) d.places.splice(pIdx, 1);
      } else if (pIdx < 0) {
        d.places.push({ ...place });
      }
    });
    updateDayStrip();
    updateSelectionList();
    renderContent();
    showToast(
      removing
        ? `${place.name} removed from all days`
        : `${place.name} added to all ${selectedTripDays} days`,
      'success'
    );
    return;
  }

  showToast(
    removing
      ? `${place.name} removed from Day ${day.dayNum}`
      : `${place.name} added to Day ${day.dayNum}`,
    'success'
  );

  updateDayStrip();
  updateSelectionList();
  renderContent();
}

function selectRental(id) {
  const day = getActiveDay();
  if (!day) return;
  const rental = MockData.getAllRentals().find(r => sameId(r.id, id));
  if (!rental) return;

  if (day.rental && sameId(day.rental.id, rental.id) && !applyToAllDays) {
    day.rental = null;
    updateDayStrip();
    updateSelectionList();
    renderContent();
    showToast(`Rental removed from Day ${day.dayNum}`, 'success');
    return;
  }

  if (applyToAllDays && itineraryDays.length > 1) {
    itineraryDays.forEach(d => { d.rental = { ...rental }; });
    updateDayStrip();
    updateSelectionList();
    renderContent();
    showToast(`${rental.name} applied to all ${selectedTripDays} days`, 'success');
    return;
  }

  day.rental = { ...rental };
  updateDayStrip();
  updateSelectionList();
  renderContent();
  showToast(`${rental.name} selected for Day ${day.dayNum}`, 'success');
}

function calcTripBudget() {
  let total = 0;
  if (tripFlight) total += tripFlight.price || 0;
  itineraryDays.forEach(day => {
    if (day.hotel) total += day.hotel.price || 0;
    (day.places || []).forEach(p => { total += p.price || 0; });
    if (day.rental) total += day.rental.price || 0;
  });
  return total;
}

function hasAnyItineraryPlans() {
  if (tripFlight) return true;
  return itineraryDays.some(dayHasPlans);
}

function updateSelectionList() {
  const list = document.getElementById('selectionList');
  if (!list) return;

  if (!selectedCity && !selectedTripDays && !hasAnyItineraryPlans()) {
    list.innerHTML = '<p class="empty-selection">Nothing selected yet</p>';
    return;
  }

  let html = '<div class="itinerary-meta">';
  if (selectedCity) {
    html += `<div class="itinerary-meta-row"><i class="fas fa-map-marker-alt"></i><span>${selectedCity}</span></div>`;
  }
  if (selectedTripDays && tripStartDate && tripEndDate) {
    html += `<div class="itinerary-meta-row"><i class="fas fa-calendar-alt"></i><span>${formatShortDate(tripStartDate)} → ${formatShortDate(tripEndDate)}</span></div>`;
  }
  if (tripFlight) {
    html += `<div class="itinerary-meta-row"><i class="fas fa-plane"></i><span>${tripFlight.fromCode} → ${tripFlight.toCode}</span></div>`;
  }
  html += '</div>';

  if (itineraryDays.length === 0) {
    html += '<p class="empty-selection">Select dates to plan day by day</p>';
    list.innerHTML = html;
    return;
  }

  html += itineraryDays.map((day, i) => {
    const active = i === activeDayIndex ? ' active' : '';
    const items = [];
    if (i === 0 && tripFlight) {
      items.push(`<div class="itinerary-day-item"><i class="fas fa-plane"></i><span>${tripFlight.airline}</span></div>`);
    }
    if (day.hotel) {
      items.push(`<div class="itinerary-day-item"><i class="fas fa-hotel"></i><span>${day.hotel.name}</span></div>`);
    }
    (day.places || []).forEach(p => {
      items.push(`<div class="itinerary-day-item"><i class="fas fa-landmark"></i><span>${p.name}</span></div>`);
    });
    if (day.rental) {
      items.push(`<div class="itinerary-day-item"><i class="fas fa-motorcycle"></i><span>${day.rental.name}</span></div>`);
    }

    return `
      <div class="itinerary-day-block${active}" onclick="selectDay(${i})">
        <h5>Day ${day.dayNum} <small>${formatChipDate(day.date)}</small></h5>
        ${items.length ? items.join('') : '<div class="itinerary-day-empty">Nothing planned yet</div>'}
      </div>`;
  }).join('');

  if (hasAnyItineraryPlans()) {
    html += `<div class="itinerary-budget">Est. budget <span>${INR(calcTripBudget())}</span></div>`;
  }

  list.innerHTML = html;
}

function buildSavedDayActivities(day, index) {
  const activities = [];

  if (index === 0 && tripFlight) {
    activities.push({
      name: `Flight: ${tripFlight.from} → ${tripFlight.to}`,
      type: 'Transport',
      cost: tripFlight.price || 0,
      price: tripFlight.price || 0,
    });
  }

  if (day.hotel) {
    activities.push({
      name: day.hotel.name,
      type: 'Hotel',
      cost: day.hotel.price || 0,
      price: day.hotel.price || 0,
    });
  }

  (day.places || []).forEach(p => {
    activities.push({
      name: p.name,
      type: p.type || 'Place',
      cost: p.price || 0,
      price: p.price || 0,
    });
  });

  if (day.rental) {
    activities.push({
      name: `${day.rental.name} (${day.rental.type})`,
      type: 'Rental',
      cost: day.rental.price || 0,
      price: day.rental.price || 0,
    });
  }

  return activities;
}

function saveTrip() {
  if (typeof AuthSession !== 'undefined' && !AuthSession.guardBooking('create trips')) return;
  if (!selectedCity) {
    showToast('Please select a city first!', 'error');
    return;
  }
  if (!selectedTripDays || !tripStartDate || !tripEndDate || !itineraryDays.length) {
    showToast('Please select trip dates on the calendar!', 'error');
    return;
  }
  if (!hasAnyItineraryPlans()) {
    showToast('Please add at least one item to your itinerary!', 'error');
    return;
  }

  const trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  const startDate = startOfDay(tripStartDate);
  const endDate = startOfDay(tripEndDate);

  const days = itineraryDays.map((day, i) => ({
    dayNum: day.dayNum,
    date: day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    isoDate: toISODate(day.date),
    hotel: day.hotel,
    places: day.places || [],
    rental: day.rental,
    activities: buildSavedDayActivities(day, i),
  }));

  const firstHotel = itineraryDays.find(d => d.hotel)?.hotel || null;
  const firstRental = itineraryDays.find(d => d.rental)?.rental || null;
  const hotelNights = itineraryDays.filter(d => d.hotel).length;
  const rentalDays = itineraryDays.filter(d => d.rental).length;

  const tripData = {
    id: Date.now(),
    userId: (typeof AuthSession !== 'undefined' && AuthSession.get())
      ? AuthSession.get().id
      : null,
    name: `${selectedCity} Adventure`,
    dest: `${selectedCity}, ${selectedCityObj?.country || ''}`,
    type: 'Custom',
    start: toISODate(startDate),
    end: toISODate(endDate),
    tripDays: selectedTripDays,
    nights: Math.max(selectedTripDays - 1, 0),
    budget: calcTripBudget(),
    travelers: 1,
    hotel: firstHotel
      ? { ...firstHotel, nights: hotelNights || 1, total: firstHotel.price * (hotelNights || 1) }
      : null,
    flight: tripFlight,
    rental: firstRental
      ? { ...firstRental, days: rentalDays || 1, total: firstRental.price * (rentalDays || 1) }
      : null,
    days,
    savedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  };

  trips.push(tripData);
  localStorage.setItem('myAdventureTrips', JSON.stringify(trips));

  showToast('Trip saved successfully!', 'success');
  setTimeout(() => {
    window.location.href = 'mytrips.html';
  }, 1500);
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

document.addEventListener('DOMContentLoaded', initializePage);
