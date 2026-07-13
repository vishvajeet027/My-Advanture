/* ================================================================
   tripbuilder.js — Sidebar Trip Builder
   ================================================================ */

const INR = n => '₹' + Number(n).toLocaleString('en-IN');

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

const tripSelections = {
  flight: null,
  hotel: null,
  places: [],
  rental: null,
};

function initializePage() {
  populateCities();
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

  if (!option.value) {
    selectedCity = null;
    selectedCityObj = null;
    document.getElementById('cityPreview').classList.add('hidden');
    showEmptyState();
    return;
  }

  selectedCity = option.value;
  selectedCityObj = MOCK_DESTINATIONS.find(d => d.name === selectedCity);

  document.getElementById('cityPreviewImg').src = option.dataset.image;
  document.getElementById('cityPreviewName').textContent = selectedCity;
  document.getElementById('cityPreviewCountry').textContent = option.dataset.country;
  document.getElementById('cityPreview').classList.remove('hidden');

  tripSelections.flight = null;
  tripSelections.hotel = null;
  tripSelections.places = [];
  tripSelections.rental = null;
  updateSelectionList();
  renderContent();
}

function switchTab(tab, btn) {
  activeTab = tab;
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const config = TAB_CONFIG[tab];
  document.getElementById('contentTitle').textContent = config.title;
  document.getElementById('contentSubtitle').textContent = config.subtitle;

  if (!selectedCity) {
    showEmptyState();
    return;
  }

  renderContent();
}

function showEmptyState() {
  document.getElementById('contentEmpty').classList.remove('hidden');
  document.getElementById('contentGrid').classList.add('hidden');
  document.getElementById('contentCount').textContent = '';
}

function renderContent() {
  if (!selectedCity) {
    showEmptyState();
    return;
  }

  document.getElementById('contentEmpty').classList.add('hidden');
  const grid = document.getElementById('contentGrid');
  grid.classList.remove('hidden');

  let html = '';
  let count = 0;

  switch (activeTab) {
    case 'transport':
      html = renderFlights();
      count = MockData.getFlightsToCity(selectedCity).length;
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
      count = MOCK_RENTALS.length;
      break;
  }

  grid.innerHTML = html;
  document.getElementById('contentCount').textContent =
    count > 0 ? `${count} option${count !== 1 ? 's' : ''}` : 'No results';
}

function getHotelsForCity() {
  let hotels = MockData.getHotelsByCity(selectedCity);
  if (hotels.length === 0) {
    hotels = MOCK_HOTELS.filter(h =>
      h.country.toLowerCase() === (selectedCityObj?.country || '').toLowerCase()
    );
  }
  if (hotels.length === 0) {
    hotels = MOCK_HOTELS.slice(0, 6);
  }
  return hotels;
}

function renderFlights() {
  let flights = MockData.getFlightsToCity(selectedCity);
  if (flights.length === 0) flights = MOCK_FLIGHTS.slice(0, 8);

  return flights.map(f => {
    const isSelected = tripSelections.flight?.id === f.id;
    return `
      <div class="trip-card${isSelected ? ' selected' : ''}" onclick="selectFlight(${f.id})">
        <div class="trip-card-img">
          <img src="${f.image}" alt="${f.to}" loading="lazy"/>
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
  const hotels = getHotelsForCity();

  return hotels.map(h => {
    const isSelected = tripSelections.hotel?.id === h.id;
    return `
      <div class="trip-card${isSelected ? ' selected' : ''}" onclick="selectHotel(${h.id})">
        <div class="trip-card-img">
          <img src="${h.image}" alt="${h.name}" loading="lazy"/>
          <span class="trip-card-badge">${h.city}</span>
          <span class="trip-card-check"><i class="fas fa-check"></i></span>
        </div>
        <div class="trip-card-body">
          <div class="trip-card-name">${h.name}</div>
          <div class="trip-card-meta">
            <i class="fas fa-star"></i> ${h.rating} · ${h.country}
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
  const places = MockData.getPlacesByCity(selectedCity);
  if (places.length === 0) {
    return '<div class="content-empty" style="grid-column:1/-1;padding:40px;"><p>No places listed for this city yet.</p></div>';
  }

  return places.map(p => {
    const isSelected = tripSelections.places.some(x => x.id === p.id);
    return `
      <div class="trip-card${isSelected ? ' selected' : ''}" onclick="togglePlace(${p.id})">
        <div class="trip-card-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy"/>
          <span class="trip-card-badge">${p.type}</span>
          <span class="trip-card-check"><i class="fas fa-check"></i></span>
        </div>
        <div class="trip-card-body">
          <div class="trip-card-name">${p.name}</div>
          <div class="trip-card-meta">
            <i class="fas fa-star"></i> ${p.rating}
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
  return MOCK_RENTALS.map(r => {
    const isSelected = tripSelections.rental?.id === r.id;
    const tagClass = r.type === 'Bike' ? 'bike' : 'car';
    return `
      <div class="trip-card${isSelected ? ' selected' : ''}" onclick="selectRental(${r.id})">
        <div class="trip-card-img">
          <img src="${r.image}" alt="${r.name}" loading="lazy"/>
          <span class="trip-card-badge">${r.vehicle}</span>
          <span class="trip-card-check"><i class="fas fa-check"></i></span>
        </div>
        <div class="trip-card-body">
          <span class="rental-type-tag ${tagClass}">${r.type}</span>
          <div class="trip-card-name">${r.name}</div>
          <div class="trip-card-meta">
            <i class="fas fa-star"></i> ${r.rating}
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
  tripSelections.flight = MOCK_FLIGHTS.find(f => f.id === id);
  updateSelectionList();
  renderContent();
  showToast(`${tripSelections.flight.airline} flight selected!`, 'success');
}

function selectHotel(id) {
  tripSelections.hotel = MOCK_HOTELS.find(h => h.id === id);
  updateSelectionList();
  renderContent();
  showToast(`${tripSelections.hotel.name} selected!`, 'success');
}

function togglePlace(id) {
  const places = MockData.getPlacesByCity(selectedCity);
  const place = places.find(p => p.id === id);
  const idx = tripSelections.places.findIndex(p => p.id === id);

  if (idx >= 0) {
    tripSelections.places.splice(idx, 1);
    showToast(`${place.name} removed`, 'success');
  } else {
    tripSelections.places.push(place);
    showToast(`${place.name} added!`, 'success');
  }

  updateSelectionList();
  renderContent();
}

function selectRental(id) {
  tripSelections.rental = MOCK_RENTALS.find(r => r.id === id);
  updateSelectionList();
  renderContent();
  showToast(`${tripSelections.rental.name} selected!`, 'success');
}

function updateSelectionList() {
  const list = document.getElementById('selectionList');
  const items = [];

  if (selectedCity) {
    items.push({ icon: 'fa-map-marker-alt', text: selectedCity });
  }
  if (tripSelections.flight) {
    items.push({ icon: 'fa-plane', text: `${tripSelections.flight.fromCode} → ${tripSelections.flight.toCode}` });
  }
  if (tripSelections.hotel) {
    items.push({ icon: 'fa-hotel', text: tripSelections.hotel.name });
  }
  tripSelections.places.forEach(p => {
    items.push({ icon: 'fa-landmark', text: p.name });
  });
  if (tripSelections.rental) {
    items.push({ icon: 'fa-motorcycle', text: `${tripSelections.rental.name} (${tripSelections.rental.type})` });
  }

  if (items.length === 0) {
    list.innerHTML = '<li class="empty-selection">Nothing selected yet</li>';
    return;
  }

  list.innerHTML = items.map(item =>
    `<li><i class="fas ${item.icon}"></i> ${item.text}</li>`
  ).join('');
}

function saveTrip() {
  if (!selectedCity) {
    showToast('Please select a city first!', 'error');
    return;
  }
  if (!tripSelections.flight && !tripSelections.hotel && tripSelections.places.length === 0 && !tripSelections.rental) {
    showToast('Please select at least one option!', 'error');
    return;
  }

  const trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  const activities = [];

  if (tripSelections.flight) {
    activities.push({
      name: `Flight: ${tripSelections.flight.from} → ${tripSelections.flight.to}`,
      type: 'Transport',
      price: tripSelections.flight.price,
    });
  }
  if (tripSelections.hotel) {
    activities.push({
      name: tripSelections.hotel.name,
      type: 'Hotel',
      price: tripSelections.hotel.price,
    });
  }
  tripSelections.places.forEach(p => {
    activities.push({ name: p.name, type: p.type, price: p.price || 0 });
  });
  if (tripSelections.rental) {
    activities.push({
      name: `${tripSelections.rental.name} (${tripSelections.rental.type})`,
      type: 'Rental',
      price: tripSelections.rental.price,
    });
  }

  const tripData = {
    id: Date.now(),
    name: `${selectedCity} Adventure`,
    dest: `${selectedCity}, ${selectedCityObj?.country || ''}`,
    type: 'Custom',
    start: new Date().toISOString().split('T')[0],
    end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    budget: activities.reduce((sum, a) => sum + (a.price || 0), 0),
    travelers: 1,
    hotel: tripSelections.hotel,
    flight: tripSelections.flight,
    rental: tripSelections.rental,
    days: [{
      dayNum: 1,
      date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      activities,
    }],
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
