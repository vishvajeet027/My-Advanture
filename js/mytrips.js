/* ================================================================
   mytrips.js  (INR ₹)
   ================================================================ */

const INR = n => '₹' + Number(n).toLocaleString('en-IN');

const GRADIENTS = [
  'linear-gradient(135deg,#0abde3,#00d2d3)',
  'linear-gradient(135deg,#6c5ce7,#a29bfe)',
  'linear-gradient(135deg,#fd79a8,#e84393)',
  'linear-gradient(135deg,#00b894,#00cec9)',
  'linear-gradient(135deg,#e17055,#d63031)',
  'linear-gradient(135deg,#fdcb6e,#e67e22)',
];

/* ===== LOAD TRIPS ===== */
function loadTrips() {
  const session = typeof AuthSession !== 'undefined' ? AuthSession.get() : null;
  const trips = (typeof MockData !== 'undefined' && MockData.getTripsForSession)
    ? MockData.getTripsForSession(session)
    : JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  const grid       = document.getElementById('tripsGrid');
  const emptyState = document.getElementById('emptyState');
  updateStats(trips);
  if (trips.length === 0) {
    if (grid) grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }
  if (emptyState) emptyState.classList.add('hidden');
  if (grid) {
    grid.innerHTML = trips.map((trip, i) => {
      const dayCount = trip.days ? trip.days.length : getDayCount(trip.start, trip.end);
      const actCount = trip.days ? trip.days.reduce((sum, d) => sum + (d.activities?.length || 0), 0) : 0;
      const grad     = GRADIENTS[i % GRADIENTS.length];
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
            <div class="trip-detail-row"><i class="fas fa-calendar-alt"></i><span>${formatDate(trip.start)} → ${formatDate(trip.end)}</span></div>
            <div class="trip-detail-row"><i class="fas fa-moon"></i><span>${dayCount} day${dayCount !== 1 ? 's' : ''} trip</span></div>
            <div class="trip-detail-row"><i class="fas fa-users"></i><span>${trip.travelers || 1} traveler${trip.travelers > 1 ? 's' : ''}</span></div>
            <div class="trip-detail-row"><i class="fas fa-tasks"></i><span>${actCount} activit${actCount !== 1 ? 'ies' : 'y'} planned</span></div>
            ${trip.budget ? `<div class="trip-detail-row"><i class="fas fa-wallet"></i><span>Budget: <strong style="color:var(--primary)">${INR(trip.budget)}</strong></span></div>` : ''}
            <div class="trip-detail-row" style="font-size:0.75rem;color:#bbb;"><i class="fas fa-save"></i><span>Saved on ${trip.savedAt || 'Unknown'}</span></div>
          </div>
          <div class="trip-card-footer">
            <button class="btn-view" onclick="viewTrip(${trip.id})"><i class="fas fa-eye"></i> View Details</button>
            <button class="btn-delete" onclick="deleteTrip(${trip.id})"><i class="fas fa-trash"></i></button>
          </div>
        </div>`;
    }).join('');
  }
}

/* ===== STATS ===== */
function updateStats(trips) {
  const totalBudget = trips.reduce((sum, t) => sum + (parseFloat(t.budget) || 0), 0);
  const totalDays   = trips.reduce((sum, t) => sum + getDayCount(t.start, t.end), 0);
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('totalTrips',        trips.length);
  set('totalDestinations', new Set(trips.map(t => t.dest)).size);
  set('totalDays',         totalDays);
  set('totalBudget',       INR(totalBudget));
}

/* ===== VIEW TRIP MODAL ===== */
function viewTrip(id) {
  const trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  const trip  = trips.find(t => t.id === id);
  if (!trip) return;
  document.getElementById('modalTripName').textContent = trip.name;
  const dayCount = getDayCount(trip.start, trip.end);
  const actCount = trip.days ? trip.days.reduce((sum, d) => sum + (d.activities?.length || 0), 0) : 0;
  let daysHTML = '';
  if (trip.days && trip.days.length > 0) {
    daysHTML = trip.days.map(day => {
      const hasActs  = day.activities && day.activities.length > 0;
      const dayTotal = hasActs ? day.activities.reduce((s, a) => s + (a.cost || a.price || 0), 0) : 0;
      return `
        <div class="modal-day-block">
          <h4>
            <span>Day ${day.dayNum} — ${day.date}</span>
            ${dayTotal > 0 ? `<span>${INR(dayTotal)}</span>` : ''}
          </h4>
          ${hasActs ? day.activities.map(act => {
            const amount = act.cost || act.price || 0;
            return `
            <div class="modal-activity">
              <span><i class="fas fa-circle" style="color:var(--primary);font-size:0.45rem;margin-right:6px;"></i> ${act.name || 'Unnamed activity'}</span>
              ${amount > 0 ? `<strong>${INR(amount)}</strong>` : '<span style="color:#bbb;">Free</span>'}
            </div>`;
          }).join('') : '<p style="font-size:0.82rem;color:#aaa;padding:8px 0;">No activities added for this day.</p>'}
        </div>`;
    }).join('');
  }
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-info-grid">
      <div class="modal-info-item"><label>Package</label><span>${trip.dest}</span></div>
      <div class="modal-info-item"><label>Trip Type</label><span>${trip.type || 'Adventure'}</span></div>
      <div class="modal-info-item"><label>Dates</label><span>${formatDate(trip.start)} → ${formatDate(trip.end)}</span></div>
      <div class="modal-info-item"><label>Duration</label><span>${dayCount} Day${dayCount !== 1 ? 's' : ''}</span></div>
      <div class="modal-info-item"><label>Travelers</label><span>${trip.travelers || 1} Person${trip.travelers > 1 ? 's' : ''}</span></div>
      <div class="modal-info-item"><label>Budget</label><span>${trip.budget ? INR(trip.budget) : 'Not set'}</span></div>
      <div class="modal-info-item"><label>Activities</label><span>${actCount} planned</span></div>
      <div class="modal-info-item"><label>Saved On</label><span>${trip.savedAt || 'Unknown'}</span></div>
    </div>
    ${trip.notes ? `<div style="background:var(--light-bg);border-radius:10px;padding:14px 16px;margin-bottom:20px;">
      <label style="font-size:0.75rem;font-weight:700;color:var(--primary);text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:6px;">Notes</label>
      <p style="font-size:0.88rem;color:#555;line-height:1.6;">${trip.notes}</p>
    </div>` : ''}
    <h4 style="font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:16px;"><i class="fas fa-calendar-check" style="color:var(--primary);margin-right:8px;"></i>Itinerary</h4>
    ${daysHTML || '<p style="color:#aaa;font-size:0.88rem;">No itinerary details saved.</p>'}`;
  document.getElementById('tripModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('tripModal').classList.add('hidden');
  document.body.style.overflow = '';
}

let pendingDeleteId = null;
let pendingClearAll = false;

function openDeleteModal({ id = null, clearAll = false, name = '', dest = '' } = {}) {
  pendingDeleteId = id;
  pendingClearAll = clearAll;

  const title = document.getElementById('deleteModalTitle');
  const message = document.getElementById('deleteModalMessage');
  const preview = document.getElementById('deleteTripPreview');
  const confirmBtn = document.getElementById('confirmDeleteBtn');

  if (clearAll) {
    title.textContent = 'Clear All Trips?';
    message.textContent = 'This will permanently remove every saved itinerary. This action cannot be undone.';
    preview.classList.add('hidden');
    confirmBtn.innerHTML = '<i class="fas fa-trash"></i> Yes, Clear All';
  } else {
    title.textContent = 'Delete Trip?';
    message.textContent = 'This action cannot be undone. Your itinerary and all saved details will be permanently removed.';
    preview.classList.remove('hidden');
    document.getElementById('deleteTripName').textContent = name || 'This trip';
    document.getElementById('deleteTripDest').textContent = dest || 'Saved itinerary';
    confirmBtn.innerHTML = '<i class="fas fa-trash"></i> Yes, Delete';
  }

  confirmBtn.classList.remove('is-loading');
  document.getElementById('deleteModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDeleteModal() {
  document.getElementById('deleteModal').classList.add('hidden');
  document.body.style.overflow = '';
  pendingDeleteId = null;
  pendingClearAll = false;
  const confirmBtn = document.getElementById('confirmDeleteBtn');
  if (confirmBtn) confirmBtn.classList.remove('is-loading');
}

function deleteTrip(id) {
  const session = typeof AuthSession !== 'undefined' ? AuthSession.get() : null;
  const trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  const trip = trips.find(t => String(t.id) === String(id));
  if (!trip) return;
  if (session && session.role !== 'admin' && trip.userId && trip.userId !== session.id) {
    showToast('You can only delete your own trips.', 'error');
    return;
  }
  openDeleteModal({ id: trip.id, name: trip.name, dest: trip.dest });
}

function confirmDeleteTrip() {
  const confirmBtn = document.getElementById('confirmDeleteBtn');
  if (confirmBtn) {
    confirmBtn.classList.add('is-loading');
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
  }

  setTimeout(() => {
    const session = typeof AuthSession !== 'undefined' ? AuthSession.get() : null;
    if (pendingClearAll) {
      if (session && session.role === 'admin') {
        localStorage.removeItem('myAdventureTrips');
      } else if (session) {
        let trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
        trips = trips.filter(t => t.userId && t.userId !== session.id);
        localStorage.setItem('myAdventureTrips', JSON.stringify(trips));
      } else {
        localStorage.removeItem('myAdventureTrips');
      }
      showToast('All trips cleared.', 'error');
    } else if (pendingDeleteId != null) {
      let trips = JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
      trips = trips.filter(t => String(t.id) !== String(pendingDeleteId));
      localStorage.setItem('myAdventureTrips', JSON.stringify(trips));
      showToast('Trip deleted.', 'error');
    }

    closeDeleteModal();
    loadTrips();
  }, 280);
}

function clearAllTrips() {
  const session = typeof AuthSession !== 'undefined' ? AuthSession.get() : null;
  const trips = (typeof MockData !== 'undefined' && MockData.getTripsForSession)
    ? MockData.getTripsForSession(session)
    : JSON.parse(localStorage.getItem('myAdventureTrips') || '[]');
  if (trips.length === 0) {
    showToast('No trips to clear.', 'info');
    return;
  }
  openDeleteModal({ clearAll: true });
}

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!document.getElementById('deleteModal')?.classList.contains('hidden')) {
    closeDeleteModal();
    return;
  }
  closeModal();
});

document.getElementById('tripModal')?.addEventListener('click', e => {
  if (e.target.id === 'tripModal') closeModal();
});

document.getElementById('deleteModal')?.addEventListener('click', e => {
  if (e.target.id === 'deleteModal') closeDeleteModal();
});

function getDayCount(start, end) {
  if (!start || !end) return 0;
  return Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000) + 1);
}
function formatDate(d) {
  if (!d) return 'TBD';
  return new Date(d).toLocaleDateString('en-IN', { month:'short', day:'numeric', year:'numeric' });
}

document.addEventListener('DOMContentLoaded', () => {
  const session = typeof AuthSession !== 'undefined' ? AuthSession.get() : null;
  const heroH1 = document.querySelector('.page-hero-content h1');
  const heroP = document.querySelector('.page-hero-content p');
  if (session && session.role === 'admin') {
    if (heroH1) heroH1.textContent = 'All Trips';
    if (heroP) heroP.textContent = 'Review every traveler itinerary saved in MyAdventure';
  }
  loadTrips();
});

