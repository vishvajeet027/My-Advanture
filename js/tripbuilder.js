/* ================================================================
   tripbuilder.js — Trip Builder Functionality
   ================================================================ */

let currentTrip = {
  id: null,
  name: 'My Adventure',
  dest: '',
  destObj: null,
  type: 'Leisure',
  days: 3,
  travelers: 1,
  budget: 0,
  hotel: null,
  days_itinerary: [],
  savedAt: null
};

let selectedActivity = {
  type: null,
  item: null,
  day: null,
  category: null
};

const DINING_OPTIONS = {
  lunch: [
    { name: 'Peppy Dhabba', type: 'Indian Cuisine', price: 1200, icon: '🍛' },
    { name: 'Sakura Sushi', type: 'Japanese', price: 1500, icon: '🍣' },
    { name: 'Pizza Maestro', type: 'Italian', price: 1000, icon: '🍕' },
    { name: 'The Spice Route', type: 'Multi-cuisine', price: 1800, icon: '🍜' },
    { name: 'Mediterranean Bites', type: 'Mediterranean', price: 1600, icon: '🥗' },
    { name: 'Bangkok Street', type: 'Thai', price: 1300, icon: '🍲' },
  ],
  dinner: [
    { name: 'The Reservoir', type: 'Fine Dining', price: 3500, icon: '🍽️' },
    { name: 'Dessato', type: 'Dessert Cafe', price: 800, icon: '🍰' },
    { name: 'Flame Grill House', type: 'Steakhouse', price: 4200, icon: '🥩' },
    { name: 'Moonlight Bistro', type: 'French', price: 3800, icon: '🍷' },
    { name: 'Tandoor Palace', type: 'Indian Fine Dining', price: 3000, icon: '🍛' },
    { name: 'Ocean Pearl', type: 'Seafood', price: 4000, icon: '🦞' },
  ],
  breakfast: [
    { name: 'Morning Brew Cafe', type: 'Cafe', price: 400, icon: '☕' },
    { name: 'Sunrise Bakery', type: 'Bakery', price: 350, icon: '🥐' },
    { name: 'Healthy Oats', type: 'Health Food', price: 500, icon: '🥣' },
    { name: 'Continental Corner', type: 'Breakfast Buffet', price: 800, icon: '🍳' },
  ]
};

const ATTRACTIONS_OPTIONS = [
  { name: 'The War Museum', type: 'Sightseeing', price: 500, icon: '🏛️' },
  { name: 'SunSet Point - The Reservoir', type: 'Scenic', price: 0, icon: '🌅' },
  { name: 'Temple for Morning Darshan', type: 'Religious', price: 300, icon: '🕉️' },
  { name: 'City Walking Tour', type: 'Tour', price: 800, icon: '🚶' },
  { name: 'Beach Paradise', type: 'Beach', price: 400, icon: '🏖️' },
  { name: 'Mountain Trek', type: 'Adventure', price: 1200, icon: '⛰️' },
  { name: 'Art Gallery Exhibition', type: 'Culture', price: 600, icon: '🎨' },
  { name: 'Zoo Safari', type: 'Wildlife', price: 900, icon: '🦁' },
];

const TRANSPORT_OPTIONS = [
  { name: 'Taxi Transfer', type: 'Ground Transport', price: 1500, icon: '🚕' },
  { name: 'Private Car Rental', type: 'Car Rental', price: 3000, icon: '🚗' },
  { name: 'Public Bus Pass', type: 'Public Transport', price: 200, icon: '🚌' },
  { name: 'Airport Transfer', type: 'Shuttle', price: 1000, icon: '🚐' },
  { name: 'Bike Rental', type: 'Two Wheeler', price: 500, icon: '🏍️' },
  { name: 'Scooter Rental', type: 'Two Wheeler', price: 400, icon: '🛴' },
];

const RECREATION_OPTIONS = [
  { name: 'Spa & Wellness', type: 'Wellness', price: 2500, icon: '🧘' },
  { name: 'Water Sports', type: 'Adventure', price: 1800, icon: '🏄' },
  { name: 'Night Club VIP Pass', type: 'Nightlife', price: 3000, icon: '🎉' },
  { name: 'Movie Theater', type: 'Entertainment', price: 400, icon: '🎬' },
  { name: 'Yoga Session', type: 'Wellness', price: 1000, icon: '🧘‍♀️' },
  { name: 'Photography Tour', type: 'Experience', price: 1500, icon: '📸' },
];

const INR = n => '₹' + Number(n).toLocaleString('en-IN');

function initializePage() {
  populateDestinations();
  initializeDays();
  populateHotels();
  populateMealOptions();
  populateAttractions();
  populateTransport();
  populateRecreation();
  setupEventListeners();
}

function populateDestinations() {
  const select = document.getElementById('destinationSelect');
  if (!select) return;
  
  select.innerHTML = '<option value="">Select a destination...</option>';
  MOCK_DESTINATIONS.forEach(dest => {
    const option = document.createElement('option');
    option.value = dest.id;
    option.textContent = `${dest.name}, ${dest.country}`;
    option.dataset.name = dest.name;
    option.dataset.country = dest.country;
    option.dataset.desc = dest.desc;
    select.appendChild(option);
  });
}

function updateDestination() {
  const select = document.getElementById('destinationSelect');
  const option = select.options[select.selectedIndex];
  
  if (option.value) {
    currentTrip.dest = `${option.dataset.name}, ${option.dataset.country}`;
    currentTrip.destObj = MOCK_DESTINATIONS.find(d => d.id == option.value);
    
    const destInfo = document.getElementById('destInfo');
    if (destInfo) {
      document.getElementById('destDesc').textContent = option.dataset.desc;
      document.getElementById('destCountry').textContent = `📍 ${option.dataset.country}`;
      destInfo.classList.remove('hidden');
    }
  }
}

function initializeDays() {
  currentTrip.days_itinerary = [];
  for (let i = 0; i < currentTrip.days; i++) {
    currentTrip.days_itinerary.push({
      dayNum: i + 1,
      date: new Date(),
      activities: []
    });
  }
  renderItinerary();
  renderDaySelector();
}

function updateDays() {
  const input = document.getElementById('tripDays');
  let days = parseInt(input.value) || 1;
  if (days < 1) days = 1;
  if (days > 30) days = 30;
  input.value = days;
  currentTrip.days = days;
  initializeDays();
}

function changeDays(delta) {
  const input = document.getElementById('tripDays');
  let newDays = parseInt(input.value) + delta;
  if (newDays < 1) newDays = 1;
  if (newDays > 30) newDays = 30;
  input.value = newDays;
  updateDays();
}

function renderDaySelector() {
  const daySelector = document.getElementById('daySelector');
  if (!daySelector) return;
  
  daySelector.innerHTML = '';
  for (let i = 0; i < currentTrip.days; i++) {
    const btn = document.createElement('button');
    btn.className = 'day-btn' + (i === 0 ? ' selected' : '');
    btn.textContent = `Day ${i + 1}`;
    btn.onclick = () => selectDay(i, btn);
    daySelector.appendChild(btn);
  }
  selectedActivity.day = 0;
}

function selectDay(dayIndex, btn) {
  document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedActivity.day = dayIndex;
}

function renderItinerary() {
  const container = document.getElementById('itineraryContainer');
  if (!container) return;
  
  container.innerHTML = '';
  currentTrip.days_itinerary.forEach((day, index) => {
    const dayEl = document.createElement('div');
    dayEl.className = 'itinerary-day';
    
    const activitiesHtml = day.activities.length > 0 ? `
      <div class="itinerary-activities" id="activities-${index}">
        ${day.activities.map((activity, actIndex) => `
          <div class="activity-item">
            <i class="fas fa-check-circle"></i>
            <div class="activity-item-details">
              <div class="activity-item-name">${activity.name}</div>
              <div style="font-size:0.75rem;color:#999;margin-top:2px;">${activity.type}</div>
            </div>
            <div style="text-align:right;">
              <div class="activity-item-cost">${INR(activity.price || 0)}</div>
              <button style="margin-top:4px;padding:4px 8px;background:none;border:1px solid #e5e5e5;border-radius:4px;font-size:0.7rem;cursor:pointer;color:#999;" onclick="removeActivity(${index}, ${actIndex})">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    ` : `
      <div class="itinerary-activities" id="activities-${index}">
        <div style="text-align:center;padding:12px;color:#999;font-size:0.85rem;">No activities yet</div>
      </div>
    `;
    
    dayEl.innerHTML = `
      <div class="itinerary-day-header">
        <div class="itinerary-day-title">
          Day ${day.dayNum}
          <small>${getDateString(day.dayNum)}</small>
        </div>
      </div>
      ${activitiesHtml}
    `;
    container.appendChild(dayEl);
  });
}

function getDateString(dayNum) {
  const date = new Date();
  date.setDate(date.getDate() + dayNum - 1);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

function removeActivity(dayIndex, actIndex) {
  currentTrip.days_itinerary[dayIndex].activities.splice(actIndex, 1);
  renderItinerary();
  showToast('Activity removed', 'success');
}

function populateHotels() {
  const selector = document.getElementById('hotelSelector');
  if (!selector) return;
  
  selector.innerHTML = '';
  MOCK_HOTELS.forEach(hotel => {
    const hotelEl = document.createElement('div');
    hotelEl.className = 'hotel-option';
    hotelEl.onclick = () => selectHotel(hotelEl, hotel);
    hotelEl.innerHTML = `
      <img src="${hotel.image}" alt="${hotel.name}"/>
      <div class="hotel-option-info">
        <div class="hotel-option-name">${hotel.name}</div>
        <div class="hotel-option-rating">
          <i class="fas fa-star"></i> ${hotel.rating} · ${hotel.city}
        </div>
        <div class="hotel-option-price">${INR(hotel.price)}/night</div>
      </div>
    `;
    selector.appendChild(hotelEl);
  });
}

function selectHotel(el, hotel) {
  document.querySelectorAll('.hotel-option').forEach(h => h.classList.remove('selected'));
  el.classList.add('selected');
  currentTrip.hotel = hotel;
  showToast(`${hotel.name} selected!`, 'success');
}

function populateMealOptions() {
  renderMealOptions('lunch');
}

function switchMealType(btn, mealType) {
  document.querySelectorAll('.meal-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMealOptions(mealType);
}

function renderMealOptions(mealType) {
  const container = document.getElementById('mealOptions');
  if (!container) return;
  
  container.innerHTML = '';
  const options = DINING_OPTIONS[mealType] || [];
  options.forEach(meal => {
    const el = document.createElement('div');
    el.className = 'meal-option';
    el.innerHTML = `
      <div class="meal-option-name">${meal.icon} ${meal.name}</div>
      <div class="meal-option-type">${meal.type}</div>
      <div class="meal-option-price">${INR(meal.price)}</div>
    `;
    el.onclick = () => selectActivityItem(el, meal, 'dining');
    container.appendChild(el);
  });
}

function populateAttractions() {
  const container = document.getElementById('attractionsList');
  if (!container) return;
  
  container.innerHTML = '';
  ATTRACTIONS_OPTIONS.forEach(attraction => {
    const el = document.createElement('div');
    el.className = 'attraction-option';
    el.innerHTML = `
      <div class="attraction-name">${attraction.icon} ${attraction.name}</div>
      <div class="attraction-type">${attraction.type}</div>
      <div style="margin-top:8px;font-size:0.9rem;color:var(--primary);font-weight:700;">
        ${attraction.price > 0 ? INR(attraction.price) : 'Free'}
      </div>
    `;
    el.onclick = () => selectActivityItem(el, attraction, 'sightseeing');
    container.appendChild(el);
  });
}

function populateTransport() {
  const container = document.getElementById('transportList');
  if (!container) return;
  
  container.innerHTML = '';
  TRANSPORT_OPTIONS.forEach(transport => {
    const el = document.createElement('div');
    el.className = 'transport-option';
    el.innerHTML = `
      <div class="transport-name">${transport.icon} ${transport.name}</div>
      <div class="transport-type">${transport.type}</div>
      <div class="transport-price">${INR(transport.price)}</div>
    `;
    el.onclick = () => selectActivityItem(el, transport, 'transport');
    container.appendChild(el);
  });
}

function populateRecreation() {
  const container = document.getElementById('recreationList');
  if (!container) return;
  
  container.innerHTML = '';
  RECREATION_OPTIONS.forEach(recreation => {
    const el = document.createElement('div');
    el.className = 'recreation-option';
    el.innerHTML = `
      <div class="recreation-name">${recreation.icon} ${recreation.name}</div>
      <div class="recreation-type">${recreation.type}</div>
      <div style="margin-top:8px;font-size:0.9rem;color:var(--primary);font-weight:700;">
        ${INR(recreation.price)}
      </div>
    `;
    el.onclick = () => selectActivityItem(el, recreation, 'recreation');
    container.appendChild(el);
  });
}

function selectActivityItem(el, item, type) {
  document.querySelectorAll('.meal-option, .attraction-option, .transport-option, .recreation-option').forEach(e => {
    e.classList.remove('selected');
  });
  el.classList.add('selected');
  selectedActivity.item = item;
  selectedActivity.type = type;
  showToast(`${item.name} selected!`, 'success');
}

function switchActivityTab(btn, tabName) {
  document.querySelectorAll('.activity-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.activity-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(`${tabName}-tab`).classList.add('active');
}

function addSelectedActivity() {
  if (!selectedActivity.item) {
    showToast('Please select an activity!', 'error');
    return;
  }
  
  if (selectedActivity.day === null) {
    showToast('Please select a day!', 'error');
    return;
  }
  
  const activity = {
    name: selectedActivity.item.name,
    type: selectedActivity.item.type || selectedActivity.type,
    price: selectedActivity.item.price || 0
  };
  
  currentTrip.days_itinerary[selectedActivity.day].activities.push(activity);
  renderItinerary();
  showToast(`Added to Day ${selectedActivity.day + 1}!`, 'success');
}

function selectTripType(btn, type) {
  document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentTrip.type = type;
}

function updateBudget() {
  const input = document.getElementById('tripBudget');
  currentTrip.budget = parseInt(input.value) || 0;
}

function updateTravelers() {
  const input = document.getElementById('tripTravelers');
  currentTrip.travelers = parseInt(input.value) || 1;
}

function setupEventListeners() {
  const tripNameInput = document.getElementById('tripName');
  if (tripNameInput) {
    tripNameInput.addEventListener('input', (e) => {
      currentTrip.name = e.target.value;
    });
  }
}

function saveTrip() {
  if (!currentTrip.dest) {
    showToast('Please select a destination!', 'error');
    return;
  }
  if (!currentTrip.hotel) {
    showToast('Please select a hotel!', 'error');
    return;
  }
  if (currentTrip.days_itinerary.every(d => d.activities.length === 0)) {
    showToast('Please add at least one activity!', 'error');
    return;
  }
  showPreview();
}

function showPreview() {
  const modal = document.getElementById('previewModal');
  const previewBody = document.getElementById('previewBody');
  const totalCost = calculateTotalCost();
  const gradients = [
    'linear-gradient(135deg,#0abde3,#00d2d3)',
    'linear-gradient(135deg,#6c5ce7,#a29bfe)',
    'linear-gradient(135deg,#fd79a8,#e84393)',
    'linear-gradient(135deg,#00b894,#00cec9)',
  ];
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];
  
  const html = `
    <div class="preview-trip-header">
      <div class="preview-trip-gradient" style="background:${gradient};"></div>
      <div class="preview-trip-details">
        <h3>${currentTrip.name}</h3>
        <p><i class="fas fa-map-marker-alt"></i> ${currentTrip.dest}</p>
        <p><i class="fas fa-hotel"></i> ${currentTrip.hotel.name}</p>
      </div>
    </div>
    
    <div class="preview-trip-stats">
      <div class="preview-stat">
        <strong>${currentTrip.days}</strong>
        <small>Days</small>
      </div>
      <div class="preview-stat">
        <strong>${currentTrip.travelers}</strong>
        <small>Travelers</small>
      </div>
      <div class="preview-stat">
        <strong>${INR(currentTrip.budget)}</strong>
        <small>Budget</small>
      </div>
      <div class="preview-stat">
        <strong>${INR(totalCost)}</strong>
        <small>Est. Cost</small>
      </div>
    </div>
    
    <div class="preview-days">
      <h3 style="margin-bottom:20px;color:var(--dark);">Itinerary</h3>
      ${currentTrip.days_itinerary.map((day) => `
        <div class="preview-day">
          <div class="preview-day-header">Day ${day.dayNum} · ${getDateString(day.dayNum)}</div>
          <div class="preview-activities">
            ${day.activities.length > 0 ? day.activities.map(act => `
              <div class="preview-activity">
                <i class="fas fa-check-circle"></i>
                <div>
                  <strong style="color:#333;">${act.name}</strong>
                  <div style="font-size:0.8rem;color:#999;margin-top:2px;">${act.type} · ${INR(act.price)}</div>
                </div>
              </div>
            `).join('') : '<div style="color:#999;font-size:0.9rem;padding:12px;">No activities</div>'}
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  previewBody.innerHTML = html;
  modal.classList.remove('hidden');
}

function calculateTotalCost() {
  let total = 0;
  if (currentTrip.hotel) {
    total += currentTrip.hotel.price * currentTrip.days;
  }
  currentTrip.days_itinerary.forEach(day => {
    day.activities.forEach(activity => {
      total += activity.price || 0;
    });
  });
  return total;
}

function closePreviewModal() {
  document.getElementById('previewModal').classList.add('hidden');
}

function handlePreviewModalClick(e) {
  if (e.target.id === 'previewModal') {
    closePreviewModal();
  }
}

function confirmSaveTrip() {
  const trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  
  const tripData = {
    id: Date.now(),
    name: currentTrip.name,
    dest: currentTrip.dest,
    type: currentTrip.type,
    start: new Date().toISOString().split('T')[0],
    end: new Date(Date.now() + currentTrip.days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    budget: currentTrip.budget,
    travelers: currentTrip.travelers,
    hotel: currentTrip.hotel,
    days: currentTrip.days_itinerary.map((day, idx) => ({
      dayNum: idx + 1,
      date: getDateString(idx + 1),
      activities: day.activities
    })),
    savedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  };
  
  trips.push(tripData);
  localStorage.setItem('myAdventureTrips', JSON.stringify(trips));
  
  closePreviewModal();
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
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', initializePage);
