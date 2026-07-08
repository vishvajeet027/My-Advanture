/* ================================================================
   MODULE 6 — Landing Page extras
   landing.js — Trending Trips, Testimonials, Newsletter
   ================================================================ */

/* ===== TESTIMONIALS DATA ===== */
const TESTIMONIALS = [
  { name: 'Sarah Mitchell',  role: 'Travel Blogger',      avatar: 'SM', rating: 5, dest: 'Bali, Indonesia',    text: 'MyAdventure made planning our Bali trip so effortless. The day-by-day itinerary builder saved us hours. We had the most magical week of our lives!' },
  { name: 'James Rodriguez',  role: 'Software Engineer',   avatar: 'JR', rating: 5, dest: 'Tokyo, Japan',       text: 'I used the trip planner for a solo Tokyo adventure and it was perfect. The budget tracker kept me on track and the destination cards gave great inspiration.' },
  { name: 'Priya Sharma',     role: 'Marketing Manager',   avatar: 'PS', rating: 5, dest: 'Santorini, Greece',  text: 'Booked our honeymoon through MyAdventure. The interface is beautiful and intuitive. Finding the perfect Santorini itinerary took less than 10 minutes!' },
  { name: 'David Chen',       role: 'Photographer',        avatar: 'DC', rating: 5, dest: 'Machu Picchu, Peru', text: 'As a travel photographer I need reliable planning tools. MyAdventure\'s destination data is comprehensive and the UI is simply stunning. Highly recommend!' },
  { name: 'Emma Williams',    role: 'University Student',  avatar: 'EW', rating: 5, dest: 'Barcelona, Spain',   text: 'Perfect for student budget travel! I planned a 5-day Barcelona trip within my budget. The search and filter features helped me find the most affordable options.' },
  { name: 'Ali Hassan',       role: 'Business Consultant', avatar: 'AH', rating: 5, dest: 'Dubai, UAE',         text: 'Planned a family trip to Dubai with 4 travelers. The multi-traveler budget feature is a lifesaver. Everything was organised and our trip went flawlessly!' },
];

let testimonialIndex = 0;

/* ===== RENDER TRENDING TRIPS ===== */
function renderTrendingTrips() {
  const grid = document.getElementById('trendingGrid');
  if (!grid) return;

  const trips = Storage.get(STORAGE_KEYS.TRIPS, []).slice(0, 6);

  if (trips.length === 0) {
    grid.innerHTML = `
      <div class="trending-empty" style="grid-column:1/-1;text-align:center;padding:60px 20px;">
        <i class="fas fa-suitcase-rolling" style="font-size:3rem;color:#ccc;display:block;margin-bottom:16px;"></i>
        <h4 style="font-size:1.1rem;font-weight:700;color:#aaa;margin-bottom:8px;">No trips planned yet</h4>
        <p style="color:#bbb;font-size:0.88rem;margin-bottom:20px;">Create your first trip and it will appear here.</p>
        <a href="planner.html" class="btn-primary" style="display:inline-flex;">
          <i class="fas fa-plus"></i> Plan Your First Trip
        </a>
      </div>`;
    return;
  }

  const gradients = [
    'linear-gradient(135deg,#0abde3,#00d2d3)',
    'linear-gradient(135deg,#6c5ce7,#a29bfe)',
    'linear-gradient(135deg,#fd79a8,#e84393)',
    'linear-gradient(135deg,#00b894,#00cec9)',
    'linear-gradient(135deg,#e17055,#d63031)',
    'linear-gradient(135deg,#fdcb6e,#e67e22)',
  ];

  const destImages = {};
  if (typeof MockData !== 'undefined') {
    MockData.getAllDestinations().forEach(d => { destImages[d.name] = d.image; });
  }

  grid.innerHTML = trips.map((trip, i) => {
    const days = trip.days ? trip.days.length : 0;
    const activities = trip.days ? trip.days.reduce((s, d) => s + (d.activities?.length || 0), 0) : 0;
    const destName = trip.dest.split(',')[0].trim();
    const img = destImages[destName] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80';

    return `
      <div class="trending-card" onclick="window.location.href='mytrips.html'">
        <div class="trending-img-wrap">
          <img src="${img}" alt="${trip.dest}" loading="lazy"/>
          <div class="trending-overlay" style="background:${gradients[i]}88"></div>
          <span class="trending-type-badge">${trip.type}</span>
          <span class="trending-days-badge"><i class="fas fa-moon"></i> ${days} days</span>
        </div>
        <div class="trending-body">
          <h4>${trip.name}</h4>
          <p class="trending-dest"><i class="fas fa-map-marker-alt"></i> ${trip.dest}</p>
          <div class="trending-meta">
            <span><i class="fas fa-calendar-alt"></i> ${formatTripDate(trip.start)}</span>
            <span><i class="fas fa-users"></i> ${trip.travelers} traveler${trip.travelers > 1 ? 's' : ''}</span>
          </div>
          <div class="trending-footer">
            <span class="trending-activities"><i class="fas fa-tasks"></i> ${activities} activities</span>
            <span class="trending-budget">${trip.budget ? '$' + Number(trip.budget).toLocaleString() : 'No budget'}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function formatTripDate(dateStr) {
  if (!dateStr) return 'TBD';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ===== RENDER TESTIMONIALS ===== */
function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dotsEl = document.getElementById('testimonialsDots');
  if (!track) return;

  track.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-card ${i === 0 ? 'active' : ''}" data-index="${i}">
      <div class="testimonial-stars">
        ${'<i class="fas fa-star"></i>'.repeat(t.rating)}
      </div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-dest">
        <i class="fas fa-map-marker-alt"></i> Travelled to <strong>${t.dest}</strong>
      </div>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.avatar}</div>
        <div>
          <strong>${t.name}</strong>
          <span>${t.role}</span>
        </div>
      </div>
    </div>
  `).join('');

  if (dotsEl) {
    dotsEl.innerHTML = TESTIMONIALS.map((_, i) =>
      `<span class="dot ${i === 0 ? 'active' : ''}" onclick="goToTestimonial(${i})"></span>`
    ).join('');
  }

  // wire arrow buttons
  const prev = document.getElementById('testPrev');
  const next = document.getElementById('testNext');
  if (prev) prev.addEventListener('click', () => goToTestimonial(testimonialIndex - 1));
  if (next) next.addEventListener('click', () => goToTestimonial(testimonialIndex + 1));

  // auto-rotate every 5s
  setInterval(() => goToTestimonial(testimonialIndex + 1), 5000);
}

function goToTestimonial(index) {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots  = document.querySelectorAll('#testimonialsDots .dot');
  testimonialIndex = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
  cards.forEach((c, i) => c.classList.toggle('active', i === testimonialIndex));
  dots.forEach((d, i)  => d.classList.toggle('active', i === testimonialIndex));
}

/* ===== NEWSLETTER SUBMIT ===== */
function submitNewsletter() {
  const name  = document.getElementById('nlName')?.value.trim();
  const email = document.getElementById('nlEmail')?.value.trim();

  if (!name)  { showToast('Please enter your name.', 'error');  return; }
  if (!email || !email.includes('@')) { showToast('Please enter a valid email.', 'error'); return; }

  const interests = [...document.querySelectorAll('.interest-tag input:checked')].map(i => i.value);

  // Save via Storage if available
  if (typeof Storage !== 'undefined' && typeof STORAGE_KEYS !== 'undefined') {
    Storage.set(STORAGE_KEYS.NEWSLETTER, { name, email, interests, subscribedAt: new Date().toISOString() });
  }

  // Show success state
  document.getElementById('nlForm').classList.add('hidden');
  const success = document.getElementById('nlSuccess');
  document.getElementById('nlSuccessMsg').textContent = `Welcome, ${name}! We'll send great deals to ${email}.`;
  success.classList.remove('hidden');
  showToast('Subscribed successfully!', 'success');
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderTrendingTrips();
  renderTestimonials();

  // Check if already subscribed
  if (typeof Storage !== 'undefined' && typeof STORAGE_KEYS !== 'undefined') {
    const sub = Storage.get(STORAGE_KEYS.NEWSLETTER);
    if (sub && sub.email) {
      const form = document.getElementById('nlForm');
      const success = document.getElementById('nlSuccess');
      const msg = document.getElementById('nlSuccessMsg');
      if (form && success && msg) {
        form.classList.add('hidden');
        msg.textContent = `Welcome back, ${sub.name}! You're already subscribed.`;
        success.classList.remove('hidden');
      }
    }
  }
});
