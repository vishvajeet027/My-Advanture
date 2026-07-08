/* ===== LOAD TRIPS ===== */
function loadTrips() {
  const trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  const grid = document.getElementById('tripsGrid');
  const emptyState = document.getElementById('emptyState');

  updateStats(trips);

  if (trips.length === 0) {
    if (grid) grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  const gradients = [
    'linear-gradient(135deg,#0abde3,#00d2d3)',
    'linear-gradient(135deg,#6c5ce7,#a29bfe)',
    'linear-gradient(135deg,#fd79a8,#e84393)',
    'linear-gradient(135deg,#00b894,#00cec9)',
    'linear-gradient(135deg,#e17055,#d63031)',
    'linear-gradient(135deg,#fdcb6e,#e67e22)',
  ];

  if (grid) {
    grid.innerHTML = trips.map((trip, i) => {
      const dayCount = trip.days ? trip.days.length : getDayCount(trip.start, trip.end);
      const actCount = trip.days ? trip.days.reduce((sum, d) => sum + (d.activities?.length || 0), 0) : 0;
      const grad = gradients[i % gradients.length];

      return `
        <div class="trip-card" id="trip-${trip.id}">
          <div class="trip-card-header" style="background:${grad}">
            <div>
              <h3>${trip.name}</h3>
              <p><i class="fas fa-map-marker-alt"></i> ${trip.dest}</p>
            </div>
            <span class="trip-type-tag">${trip.type || 'Adventure'}</span>
          </div>
          <div class="trip-card-body">
            <div class="trip-detail-row">
              <i class="fas fa-calendar-alt"></i>
              <span>${formatDate(trip.start)} → ${formatDate(trip.end)}</span>
            </div>
            <div class="trip-detail-row">
              <i class="fas fa-moon"></i>
              <span>${dayCount} day${dayCount !== 1 ? 's' : ''} trip</span>
            </div>
            <div class="trip-detail-row">
              <i class="fas fa-users"></i>
              <span>${trip.travelers || 1} traveler${trip.travelers > 1 ? 's' : ''}</span>
            </div>
            <div class="trip-detail-row">
              <i class="fas fa-tasks"></i>
              <span>${actCount} activit${actCount !== 1 ? 'ies' : 'y'} planned</span>
            </div>
            ${trip.budget ? `
            <div class="trip-detail-row">
              <i class="fas fa-wallet"></i>
              <span>Budget: <strong style="color:var(--primary)">$${Number(trip.budget).toLocaleString()}</strong></span>
            </div>` : ''}
            <div class="trip-detail-row" style="font-size:0.75rem;color:#bbb;">
              <i class="fas fa-save"></i>
              <span>Saved on ${trip.savedAt || 'Unknown'}</span>
            </div>
          </div>
          <div class="trip-card-footer">
            <button class="btn-view" onclick="viewTrip(${trip.id})">
              <i class="fas fa-eye"></i> View Details
            </button>
            <button class="btn-delete" onclick="deleteTrip(${trip.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
}

/* ===== STATS ===== */
function updateStats(trips) {
  const totalTripsEl = document.getElementById('totalTrips');
  const totalDestsEl = document.getElementById('totalDestinations');
  const totalDaysEl = document.getElementById('totalDays');
  const totalBudgetEl = document.getElementById('totalBudget');

  if (totalTripsEl) totalTripsEl.textContent = trips.length;

  const uniqueDests = new Set(trips.map(t => t.dest)).size;
  if (totalDestsEl) totalDestsEl.textContent = uniqueDests;

  const totalDays = trips.reduce((sum, t) => sum + getDayCount(t.start, t.end), 0);
  if (totalDaysEl) totalDaysEl.textContent = totalDays;

  const totalBudget = trips.reduce((sum, t) => sum + (parseFloat(t.budget) || 0), 0);
  if (totalBudgetEl) totalBudgetEl.textContent = '$' + totalBudget.toLocaleString();
}

/* ===== VIEW TRIP MODAL ===== */
function viewTrip(id) {
  const trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  const trip = trips.find(t => t.id === id);
  if (!trip) return;

  document.getElementById('modalTripName').textContent = trip.name;

  const dayCount = getDayCount(trip.start, trip.end);
  const actCount = trip.days ? trip.days.reduce((sum, d) => sum + (d.activities?.length || 0), 0) : 0;

  let daysHTML = '';
  if (trip.days && trip.days.length > 0) {
    daysHTML = trip.days.map(day => {
      const hasActivities = day.activities && day.activities.length > 0;
      const dayTotal = hasActivities ? day.activities.reduce((s, a) => s + (a.cost || 0), 0) : 0;
      return `
        <div class="modal-day-block">
          <h4>
            <span>Day ${day.dayNum} — ${day.date}</span>
            ${dayTotal > 0 ? `<span>$${dayTotal.toLocaleString()}</span>` : ''}
          </h4>
          ${hasActivities ? day.activities.map(act => `
            <div class="modal-activity">
              <span><i class="fas fa-circle" style="color:var(--primary);font-size:0.45rem;margin-right:6px;"></i> ${act.name || 'Unnamed activity'}</span>
              ${act.cost > 0 ? `<strong>$${act.cost.toLocaleString()}</strong>` : '<span style="color:#bbb;">Free</span>'}
            </div>
          `).join('') : '<p style="font-size:0.82rem;color:#aaa;padding:8px 0;">No activities added for this day.</p>'}
        </div>
      `;
    }).join('');
  }

  document.getElementById('modalBody').innerHTML = `
    <div class="modal-info-grid">
      <div class="modal-info-item">
        <label>Package</label>
        <span>${trip.dest}</span>
      </div>
      <div class="modal-info-item">
        <label>Trip Type</label>
        <span>${trip.type || 'Adventure'}</span>
      </div>
      <div class="modal-info-item">
        <label>Dates</label>
        <span>${formatDate(trip.start)} → ${formatDate(trip.end)}</span>
      </div>
      <div class="modal-info-item">
        <label>Duration</label>
        <span>${dayCount} Day${dayCount !== 1 ? 's' : ''}</span>
      </div>
      <div class="modal-info-item">
        <label>Travelers</label>
        <span>${trip.travelers || 1} Person${trip.travelers > 1 ? 's' : ''}</span>
      </div>
      <div class="modal-info-item">
        <label>Budget</label>
        <span>${trip.budget ? '$' + Number(trip.budget).toLocaleString() : 'Not set'}</span>
      </div>
      <div class="modal-info-item">
        <label>Activities</label>
        <span>${actCount} planned</span>
      </div>
      <div class="modal-info-item">
        <label>Saved On</label>
        <span>${trip.savedAt || 'Unknown'}</span>
      </div>
    </div>
    ${trip.notes ? `
      <div style="background:var(--light-bg);border-radius:10px;padding:14px 16px;margin-bottom:20px;">
        <label style="font-size:0.75rem;font-weight:700;color:var(--primary);text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:6px;">Notes</label>
        <p style="font-size:0.88rem;color:#555;line-height:1.6;">${trip.notes}</p>
      </div>
    ` : ''}
    <h4 style="font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:16px;"><i class="fas fa-calendar-check" style="color:var(--primary);margin-right:8px;"></i>Itinerary</h4>
    ${daysHTML || '<p style="color:#aaa;font-size:0.88rem;">No itinerary details saved.</p>'}
  `;

  document.getElementById('tripModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/* ===== CLOSE MODAL ===== */
function closeModal() {
  document.getElementById('tripModal').classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

document.getElementById('tripModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'tripModal') closeModal();
});

/* ===== DELETE TRIP ===== */
function deleteTrip(id) {
  if (!confirm('Delete this trip? This cannot be undone.')) return;
  let trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  trips = trips.filter(t => t.id !== id);
  localStorage.setItem('myAdventureTrips', JSON.stringify(trips));
  showToast('Trip deleted.', 'error');
  loadTrips();
}

/* ===== CLEAR ALL ===== */
function clearAllTrips() {
  if (!confirm('Clear ALL saved trips? This cannot be undone.')) return;
  localStorage.removeItem('myAdventureTrips');
  showToast('All trips cleared.', 'error');
  loadTrips();
}

/* ===== UTILS ===== */
function getDayCount(start, end) {
  if (!start || !end) return 0;
  const s = new Date(start), e = new Date(end);
  return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1);
}

function formatDate(dateStr) {
  if (!dateStr) return 'TBD';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', loadTrips);
