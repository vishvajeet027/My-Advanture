/* ===== PLANNER STATE ===== */
let tripDays = [];
let totalBudget = 0;

/* ===== GENERATE DAYS FROM DATE RANGE ===== */
function generateDays() {
  const name = document.getElementById('tripName').value.trim();
  const dest = document.getElementById('tripDestination').value;
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  const budget = parseFloat(document.getElementById('tripBudget').value) || 0;

  if (!name) { showToast('Please enter a trip name.', 'error'); return; }
  if (!dest) { showToast('Please select a destination.', 'error'); return; }
  if (!start || !end) { showToast('Please select start and end dates.', 'error'); return; }
  if (new Date(end) < new Date(start)) { showToast('End date must be after start date.', 'error'); return; }

  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  totalBudget = budget;
  tripDays = [];

  for (let i = 0; i < diff; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    tripDays.push({
      dayNum: i + 1,
      date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      activities: []
    });
  }

  renderItinerary();
  document.getElementById('itineraryEmpty').classList.add('hidden');

  const badge = document.getElementById('tripDuration');
  badge.textContent = `${diff} Day${diff > 1 ? 's' : ''}`;
  badge.classList.remove('hidden');

  if (budget > 0) {
    document.getElementById('budgetTracker').classList.remove('hidden');
    document.getElementById('budgetTotal').textContent = '$' + budget.toLocaleString();
    updateBudget();
  }

  document.getElementById('saveSection').classList.remove('hidden');
  showToast(`${diff}-day itinerary generated for ${dest}!`, 'success');
}

/* ===== RENDER ITINERARY ===== */
function renderItinerary() {
  const container = document.getElementById('itineraryDays');
  container.innerHTML = tripDays.map((day, dayIndex) => `
    <div class="day-block" id="day-${dayIndex}">
      <div class="day-header" onclick="toggleDay(${dayIndex})">
        <h4><i class="fas fa-calendar-day"></i> Day ${day.dayNum}</h4>
        <span class="day-date">${day.date}</span>
      </div>
      <div class="day-body" id="day-body-${dayIndex}">
        <div class="activity-list" id="activities-${dayIndex}">
          ${day.activities.map((act, actIndex) => renderActivity(dayIndex, actIndex, act)).join('')}
        </div>
        <button class="btn-add-activity" onclick="addActivity(${dayIndex})">
          <i class="fas fa-plus"></i> Add Activity
        </button>
      </div>
    </div>
  `).join('');
}

function renderActivity(dayIndex, actIndex, act) {
  return `
    <div class="activity-item" id="act-${dayIndex}-${actIndex}">
      <i class="fas fa-circle" style="color:var(--primary);font-size:0.5rem;flex-shrink:0;"></i>
      <input type="text" placeholder="Activity description..."
        value="${act.name || ''}"
        oninput="updateActivity(${dayIndex}, ${actIndex}, 'name', this.value)"/>
      <span style="font-size:0.75rem;color:#aaa;flex-shrink:0;">$</span>
      <input type="number" class="activity-cost" placeholder="0"
        value="${act.cost || ''}"
        oninput="updateActivity(${dayIndex}, ${actIndex}, 'cost', this.value)"/>
      <button class="btn-remove-activity" onclick="removeActivity(${dayIndex}, ${actIndex})">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
}

/* ===== DAY ACTIONS ===== */
function toggleDay(dayIndex) {
  const body = document.getElementById(`day-body-${dayIndex}`);
  if (body) {
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
  }
}

function addActivity(dayIndex) {
  tripDays[dayIndex].activities.push({ name: '', cost: 0 });
  const list = document.getElementById(`activities-${dayIndex}`);
  const actIndex = tripDays[dayIndex].activities.length - 1;
  const div = document.createElement('div');
  div.innerHTML = renderActivity(dayIndex, actIndex, { name: '', cost: 0 });
  list.appendChild(div.firstElementChild);
  updateBudget();
}

function removeActivity(dayIndex, actIndex) {
  tripDays[dayIndex].activities.splice(actIndex, 1);
  const item = document.getElementById(`act-${dayIndex}-${actIndex}`);
  if (item) item.remove();
  updateBudget();
}

function updateActivity(dayIndex, actIndex, field, value) {
  if (!tripDays[dayIndex] || !tripDays[dayIndex].activities[actIndex]) return;
  tripDays[dayIndex].activities[actIndex][field] = field === 'cost' ? parseFloat(value) || 0 : value;
  if (field === 'cost') updateBudget();
}

/* ===== BUDGET TRACKER ===== */
function updateBudget() {
  if (totalBudget <= 0) return;
  let spent = 0;
  tripDays.forEach(day => {
    day.activities.forEach(act => { spent += act.cost || 0; });
  });
  const pct = Math.min((spent / totalBudget) * 100, 100);
  const fill = document.getElementById('budgetFill');
  const pctEl = document.getElementById('budgetPercent');
  const spentEl = document.getElementById('budgetSpent');
  const remEl = document.getElementById('budgetRemaining');

  if (fill) {
    fill.style.width = pct + '%';
    fill.style.background = pct > 90 ? 'linear-gradient(135deg,#e74c3c,#c0392b)' : 'linear-gradient(135deg,#0abde3,#00d2d3)';
  }
  if (pctEl) pctEl.textContent = Math.round(pct) + '%';
  if (spentEl) spentEl.textContent = '$' + spent.toLocaleString();
  if (remEl) remEl.textContent = '$' + Math.max(0, totalBudget - spent).toLocaleString();
}

/* ===== SAVE TRIP ===== */
function saveTrip() {
  const name = document.getElementById('tripName').value.trim();
  const dest = document.getElementById('tripDestination').value;
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  const budget = parseFloat(document.getElementById('tripBudget').value) || 0;
  const travelers = parseInt(document.getElementById('tripTravelers').value) || 1;
  const notes = document.getElementById('tripNotes').value;
  const type = document.querySelector('input[name="tripType"]:checked')?.value || 'Adventure';

  if (!name || !dest || tripDays.length === 0) {
    showToast('Please generate the itinerary first!', 'error');
    return;
  }

  const trip = {
    id: Date.now(),
    name, dest, start, end, budget, travelers, notes, type,
    days: JSON.parse(JSON.stringify(tripDays)),
    savedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  };

  const trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  trips.unshift(trip);
  localStorage.setItem('myAdventureTrips', JSON.stringify(trips));

  showToast(`"${name}" saved successfully!`, 'success');
  setTimeout(() => { window.location.href = 'mytrips.html'; }, 1500);
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  const startInput = document.getElementById('startDate');
  const endInput = document.getElementById('endDate');
  if (startInput) { startInput.min = today; startInput.value = today; }
  if (endInput) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    endInput.min = today;
    endInput.value = nextWeek.toISOString().split('T')[0];
  }

  // Pre-fill destination from URL
  const params = new URLSearchParams(window.location.search);
  const dest = params.get('dest');
  if (dest) {
    const sel = document.getElementById('tripDestination');
    if (sel) {
      for (let opt of sel.options) {
        if (opt.value.toLowerCase().includes(dest.toLowerCase())) {
          sel.value = opt.value; break;
        }
      }
    }
  }
});
