/* ================================================================
   destinations.js — Premium Version
   ================================================================ */

const urlParams = new URLSearchParams(window.location.search);
const viewMode = urlParams.get('view') || 'packages';

const destinations = [
  { id: 1, name: 'Bali Bliss', country: 'Indonesia', category: 'beach', days: 7, price: 1299, rating: 4.9, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=600&q=80', desc: 'Tropical paradise with rice terraces, temples, and pristine beaches. Includes yoga retreat and cooking class.', includes: ['Return Flights', '5-Star Resort', 'Daily Breakfast', 'Island Tours', 'Spa Session'] },
  { id: 2, name: 'Paris Romance', country: 'France', category: 'cultural', days: 5, price: 1899, rating: 4.8, badge: 'Popular', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', desc: 'City of love with Eiffel Tower views, world-class cuisine, and Louvre museum entry included.', includes: ['Flights', '4-Star Hotel', 'Breakfast', 'Eiffel Tower Skip-Line', 'Seine River Cruise'] },
  { id: 3, name: 'Maldives Escape', country: 'Maldives', category: 'luxury', days: 6, price: 3499, rating: 5.0, badge: 'Luxury', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', desc: 'Overwater bungalow experience with crystal-clear lagoons, private beach, and sunset dining.', includes: ['Business Class Flights', 'Overwater Villa', 'All Meals', 'Snorkelling', 'Water Sports'] },
  { id: 4, name: 'Tokyo Explorer', country: 'Japan', category: 'cultural', days: 8, price: 2199, rating: 4.9, badge: 'Top Rated', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', desc: 'Neon lights, ancient shrines, ramen alleys, and cherry blossoms. A city like no other.', includes: ['Flights', 'Boutique Hotel', 'Breakfast', 'JR Rail Pass', 'Tea Ceremony'] },
  { id: 5, name: 'Kenya Safari Adventure', country: 'Kenya', category: 'adventure', days: 9, price: 2899, rating: 4.9, badge: 'Adventure', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', desc: 'Witness the Great Migration, Big Five game drives, and majestic Maasai Mara sunsets.', includes: ['Flights', 'Safari Lodge', 'Full Board', 'Game Drives', 'Maasai Village Visit'] },
  { id: 6, name: 'Greek Islands Hop', country: 'Greece', category: 'beach', days: 10, price: 2499, rating: 4.8, badge: 'Popular', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', desc: 'Santorini sunsets, Mykonos beaches, and authentic Greek mezze along the Aegean coast.', includes: ['Flights', 'Island Ferries', 'Hotels', 'Breakfast', 'Boat Tour'] },
  { id: 7, name: 'Dubai Glamour', country: 'UAE', category: 'luxury', days: 5, price: 1799, rating: 4.7, badge: 'Luxury', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80', desc: 'Burj Khalifa, desert dunes, gold souk, and Michelin-star dining in the city of the future.', includes: ['Flights', '5-Star Hotel', 'Breakfast', 'Burj Khalifa', 'Desert Safari'] },
  { id: 8, name: 'Himalayan Trek', country: 'Nepal', category: 'adventure', days: 12, price: 1599, rating: 4.9, badge: 'Adventure', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80', desc: 'Trek through the roof of the world, visit monasteries, and experience true mountain hospitality.', includes: ['Flights', 'Teahouse Stays', 'All Meals', 'Trekking Guide', 'Permits'] },
  { id: 9, name: 'Rome & Amalfi Coast', country: 'Italy', category: 'cultural', days: 8, price: 2299, rating: 4.8, badge: 'Top Rated', image: 'https://images.unsplash.com/photo-1552832230-c0197dd291d3?w=600&q=80', desc: 'Colosseum, Vatican, and the breathtaking cliffside villages of the Amalfi Coast.', includes: ['Flights', 'Boutique Hotels', 'Breakfast', 'Colosseum Tour', 'Boat Ride'] },
  { id: 10, name: 'Thailand Budget Tour', country: 'Thailand', category: 'budget', days: 10, price: 899, rating: 4.6, badge: 'Budget', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', desc: 'Street food, floating markets, golden temples, and full moon beach parties on a shoestring.', includes: ['Flights', 'Guesthouses', 'Breakfast', 'Temple Tours', 'Ferry Passes'] }
];

let activeTag = 'all';
let filteredData = [...destinations];
let selectedPkg = null;

const TAG_COLORS = {
  budget: '#00b894', luxury: '#6c5ce7', adventure: '#e17055',
  beach: '#0abde3', cultural: '#fdcb6e'
};

/* ── RENDER PACKAGES (PREMIUM CARDS) ── */
function renderCards(data) {
  const grid = document.getElementById('destinationsGrid');
  const noRes = document.getElementById('noResults');
  const countEl = document.getElementById('resultsCount');
  if (!grid) return;

  if (data.length === 0) {
    grid.innerHTML = '';
    noRes.classList.remove('hidden');
    if (countEl) countEl.innerHTML = 'Showing <strong>0</strong> experiences';
    return;
  }

  noRes.classList.add('hidden');
  if (countEl) countEl.innerHTML = `Showing <strong>${data.length}</strong> experiences`;

  grid.innerHTML = data.map(d => `
    <a href="#" class="premium-card hover-lift reveal-on-scroll is-visible" onclick="event.preventDefault(); openPkgModal(${d.id})">
      <div class="premium-card-img" style="background-image:url('${d.image}')"></div>
      <div class="premium-card-gradient"></div>
      <div class="premium-card-glow"></div>
      <span class="premium-card-badge">${d.badge}</span>
      <div class="premium-card-icon" style="top:20px;left:auto;right:20px;font-size:0.9rem;width:auto;border-radius:20px;padding:5px 10px;">
        <i class="fas fa-star" style="color:var(--accent-primary)"></i> ${d.rating}
      </div>
      <div class="premium-card-content">
        <div class="premium-card-title">${d.name}</div>
        <div class="premium-card-desc" style="display:flex; justify-content:space-between; margin-bottom:5px;">
           <span><i class="fas fa-map-marker-alt"></i> ${d.country}</span>
           <span><i class="fas fa-clock"></i> ${d.days} Days</span>
        </div>
        <div class="premium-card-desc" style="opacity:1; transform:none; font-size:1.1rem; font-weight:700; color:#fff;">
          ₹${d.price.toLocaleString('en-IN')} <span style="font-size:0.8rem; font-weight:400; color:var(--text-secondary)">/ person</span>
        </div>
        <div class="premium-card-cta">View Itinerary <i class="fas fa-arrow-right"></i></div>
      </div>
    </a>`).join('');
}

/* ── FILTER BY TAG ── */
function filterByTag(btn, tag) {
  document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  activeTag = tag;
  filterDestinations();
}

/* ── SEARCH + SORT ── */
function filterDestinations() {
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const sort = document.getElementById('sortSelect')?.value || 'default';

  let data = destinations.filter(d => {
    const matchTag = activeTag === 'all' || d.category === activeTag;
    const matchSearch = d.name.toLowerCase().includes(query) || d.country.toLowerCase().includes(query);
    return matchTag && matchSearch;
  });

  if (sort === 'price-low') data.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') data.sort((a, b) => b.price - a.price);
  else if (sort === 'days') data.sort((a, b) => a.days - b.days);
  else if (sort === 'name') data.sort((a, b) => a.name.localeCompare(b.name));

  filteredData = data;
  renderCards(data);
}

/* ── MODALS (PREMIUM STYLING INJECTED) ── */
function renderPackageItinerary(pkg) {
  const plan = getPackageItinerary(pkg);
  return plan.map((day, i) => {
    return `
      <div style="background:var(--glass-bg); border:1px solid var(--glass-border); padding:20px; border-radius:16px; margin-bottom:15px;">
        <h4 style="color:var(--accent-primary); margin-bottom:10px;">Day ${i+1}: ${day.stay || 'Exploration'}</h4>
        <div style="margin-bottom:10px;">
          ${day.places.map(p => `<span style="background:rgba(255,255,255,0.1); padding:4px 10px; border-radius:12px; font-size:0.85rem; margin-right:5px; display:inline-block; margin-bottom:5px;"><i class="fas fa-map-pin"></i> ${p}</span>`).join('')}
        </div>
        <ul style="list-style:none; padding:0; color:var(--text-secondary); font-size:0.95rem;">
          ${day.activities.map(a => `<li style="margin-bottom:5px;"><i class="fas fa-check" style="color:var(--accent-secondary); margin-right:8px;"></i>${a}</li>`).join('')}
        </ul>
      </div>`;
  }).join('');
}

function openPkgModal(id) {
  selectedPkg = destinations.find(d => d.id === id);
  if (!selectedPkg) return;
  const p = selectedPkg;

  document.getElementById('pkgModalTitle').textContent = p.name;
  document.getElementById('pkgModalBody').innerHTML = `
    <div style="position:relative; height:300px; border-radius:0 0 24px 24px; overflow:hidden;">
      <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; filter:brightness(0.7);"/>
      <div style="position:absolute; bottom:30px; left:30px;">
        <span style="background:rgba(0,0,0,0.6); backdrop-filter:blur(10px); padding:8px 16px; border-radius:20px; border:1px solid rgba(255,255,255,0.2); color:#fff; margin-right:10px;">
          <i class="fas fa-map-marker-alt"></i> ${p.country}
        </span>
        <span style="background:rgba(0,0,0,0.6); backdrop-filter:blur(10px); padding:8px 16px; border-radius:20px; border:1px solid rgba(255,255,255,0.2); color:#fff;">
          <i class="fas fa-clock"></i> ${p.days} Days
        </span>
      </div>
    </div>
    <div style="padding:40px;">
      <p style="font-size:1.1rem; color:var(--text-secondary); margin-bottom:30px; line-height:1.8;">${p.desc}</p>
      
      <h3 style="margin-bottom:20px; font-family:var(--font-heading);">What's Included</h3>
      <div style="display:flex; flex-wrap:wrap; gap:15px; margin-bottom:40px;">
        ${p.includes.map(i => `<div style="background:var(--glass-bg); border:1px solid var(--glass-border); padding:10px 20px; border-radius:12px; font-weight:500;"><i class="fas fa-check" style="color:var(--accent-primary); margin-right:8px;"></i>${i}</div>`).join('')}
      </div>

      <h3 style="margin-bottom:20px; font-family:var(--font-heading);">Itinerary</h3>
      <div>${renderPackageItinerary(p)}</div>
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:30px; border-top:1px solid var(--glass-border);">
        <div>
          <div style="color:var(--text-secondary); font-size:0.9rem;">Price per person</div>
          <div style="font-size:2rem; font-weight:700; color:#fff;">₹${p.price.toLocaleString('en-IN')}</div>
        </div>
        <button class="magnetic-btn" onclick="bookPackage()" style="background:var(--accent-primary); color:var(--bg-main); border:none; padding:15px 40px; border-radius:30px; font-weight:700; font-size:1.1rem; cursor:pointer; font-family:var(--font-body);">
          Book Experience
        </button>
      </div>
    </div>`;

  document.getElementById('pkgModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePkgModal() {
  document.getElementById('pkgModal').classList.add('hidden');
  document.body.style.overflow = '';
}

function handleModalClick(e) {
  if (e.target.id === 'pkgModal') closePkgModal();
  if (e.target.id === 'hotelModal') closeHotelModal();
}

function bookPackage() {
  if (typeof AuthSession !== 'undefined' && !AuthSession.guardBooking('book packages')) return;
  closePkgModal();
  if (selectedPkg) {
    showToast(`🎉 ${selectedPkg.name} booked successfully! Check My Bookings.`, 'success');
  }
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

/* ── HOTELS VIEW ── */
function initHotelsView() {
  document.title = 'Stays - Premium Travel';
  const title = document.getElementById('pageTitle');
  const desc = document.getElementById('pageDesc');
  if(title) title.textContent = 'Luxury Stays';
  if(desc) desc.textContent = 'Exclusive accommodations for your ultimate comfort.';
  
  // Swap filter
  const filterSection = document.querySelector('.filter-section');
  if (filterSection) {
    filterSection.innerHTML = `
      <div class="search-input-wrap">
        <i class="fas fa-search"></i>
        <input type="text" id="hotelSearchInput" placeholder="Search hotels, cities..." oninput="filterHotels()"/>
      </div>
      <div class="filter-tags" id="hotelFacilityFilter">
        <button class="tag active" onclick="filterHotelsByFacility(this,'all')">All</button>
        <button class="tag" onclick="filterHotelsByFacility(this,'Pool')"><i class="fas fa-swimming-pool"></i> Pool</button>
        <button class="tag" onclick="filterHotelsByFacility(this,'Spa')"><i class="fas fa-spa"></i> Spa</button>
        <button class="tag" onclick="filterHotelsByFacility(this,'Gym')"><i class="fas fa-dumbbell"></i> Gym</button>
      </div>
      <select id="hotelSortSelect" onchange="filterHotels()" class="sort-select">
        <option value="default">Sort By</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>`;
  }

  const hotels = MockData ? MockData.getAllHotels() : [];
  renderHotelCards(hotels);
}

let activeHotelFacility = 'all';
let selectedHotel = null;

function renderHotelCards(data) {
  const grid = document.getElementById('destinationsGrid');
  const countEl = document.getElementById('resultsCount');
  if (!grid) return;

  if (countEl) countEl.innerHTML = `Showing <strong>${data.length}</strong> stays`;

  grid.innerHTML = data.map(h => `
    <a href="#" class="premium-card hover-lift reveal-on-scroll is-visible" onclick="event.preventDefault(); openHotelModal(${h.id})">
      <div class="premium-card-img" style="background-image:url('${h.image}')"></div>
      <div class="premium-card-gradient"></div>
      <div class="premium-card-glow"></div>
      <div class="premium-card-icon" style="top:20px;left:auto;right:20px;font-size:0.9rem;width:auto;border-radius:20px;padding:5px 10px;">
        <i class="fas fa-star" style="color:var(--accent-primary)"></i> ${h.rating}
      </div>
      <div class="premium-card-content">
        <div class="premium-card-title">${h.name}</div>
        <div class="premium-card-desc" style="display:flex; justify-content:space-between; margin-bottom:5px;">
           <span><i class="fas fa-map-marker-alt"></i> ${h.city}, ${h.country}</span>
        </div>
        <div class="premium-card-desc" style="opacity:1; transform:none; font-size:1.1rem; font-weight:700; color:#fff;">
          ₹${h.price.toLocaleString('en-IN')} <span style="font-size:0.8rem; font-weight:400; color:var(--text-secondary)">/ night</span>
        </div>
        <div class="premium-card-cta">View Stay <i class="fas fa-arrow-right"></i></div>
      </div>
    </a>`).join('');
}

function filterHotelsByFacility(btn, facility) {
  document.querySelectorAll('#hotelFacilityFilter .tag').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  activeHotelFacility = facility;
  filterHotels();
}

function filterHotels() {
  const query = (document.getElementById('hotelSearchInput')?.value || '').toLowerCase();
  const sort = document.getElementById('hotelSortSelect')?.value || 'default';
  
  if(!MockData) return;
  let data = MockData.getAllHotels().filter(h => {
    const matchFacility = activeHotelFacility === 'all' || h.facilities.includes(activeHotelFacility);
    const matchSearch = h.name.toLowerCase().includes(query) || h.city.toLowerCase().includes(query);
    return matchFacility && matchSearch;
  });

  if (sort === 'price-low') data.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') data.sort((a, b) => b.price - a.price);

  renderHotelCards(data);
}

function openHotelModal(id) {
  selectedHotel = MockData.getAllHotels().find(h => String(h.id) === String(id));
  if (!selectedHotel) return;
  const h = selectedHotel;

  document.getElementById('hotelModalTitle').textContent = h.name;
  document.getElementById('hotelModalBody').innerHTML = `
    <div style="position:relative; height:300px; border-radius:0 0 24px 24px; overflow:hidden;">
      <img src="${h.image}" alt="${h.name}" style="width:100%; height:100%; object-fit:cover; filter:brightness(0.7);"/>
      <div style="position:absolute; bottom:30px; left:30px;">
        <span style="background:rgba(0,0,0,0.6); backdrop-filter:blur(10px); padding:8px 16px; border-radius:20px; border:1px solid rgba(255,255,255,0.2); color:#fff; margin-right:10px;">
          <i class="fas fa-map-marker-alt"></i> ${h.city}, ${h.country}
        </span>
      </div>
    </div>
    <div style="padding:40px;">
      <p style="font-size:1.1rem; color:var(--text-secondary); margin-bottom:30px; line-height:1.8;">${h.desc}</p>
      
      <h3 style="margin-bottom:20px; font-family:var(--font-heading);">Facilities</h3>
      <div style="display:flex; flex-wrap:wrap; gap:15px; margin-bottom:40px;">
        ${h.facilities.map(f => `<div style="background:var(--glass-bg); border:1px solid var(--glass-border); padding:10px 20px; border-radius:12px; font-weight:500;"><i class="fas fa-check" style="color:var(--accent-secondary); margin-right:8px;"></i>${f}</div>`).join('')}
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:30px; border-top:1px solid var(--glass-border);">
        <div>
          <div style="color:var(--text-secondary); font-size:0.9rem;">Price per night</div>
          <div style="font-size:2rem; font-weight:700; color:#fff;">₹${h.price.toLocaleString('en-IN')}</div>
        </div>
        <button class="magnetic-btn" onclick="bookHotel()" style="background:var(--accent-primary); color:var(--bg-main); border:none; padding:15px 40px; border-radius:30px; font-weight:700; font-size:1.1rem; cursor:pointer; font-family:var(--font-body);">
          Reserve Stay
        </button>
      </div>
    </div>`;

  document.getElementById('hotelModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeHotelModal() {
  document.getElementById('hotelModal').classList.add('hidden');
  document.body.style.overflow = '';
}

function bookHotel() {
  if (typeof AuthSession !== 'undefined' && !AuthSession.guardBooking('book hotels')) return;
  closeHotelModal();
  if (selectedHotel) {
    showToast(`🏨 ${selectedHotel.name} reserved successfully!`, 'success');
  }
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  if (viewMode === 'hotels') {
    initHotelsView();
  } else {
    renderCards(destinations);
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePkgModal(); closeHotelModal(); }
  });
});
