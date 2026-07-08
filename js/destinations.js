/* ================================================================
   destinations.js — 20 Travel Packages
   ================================================================ */

const destinations = [
  { id:1,  name:'Bali Bliss',            country:'Indonesia',     category:'beach',     days:7,  price:1299, rating:4.9, badge:'Best Seller', image:'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=600&q=80', desc:'Tropical paradise with rice terraces, temples, and pristine beaches. Includes yoga retreat and cooking class.', includes:['Return Flights','5-Star Resort','Daily Breakfast','Island Tours','Spa Session'] },
  { id:2,  name:'Paris Romance',          country:'France',        category:'cultural',  days:5,  price:1899, rating:4.8, badge:'Popular',     image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', desc:'City of love with Eiffel Tower views, world-class cuisine, and Louvre museum entry included.', includes:['Flights','4-Star Hotel','Breakfast','Eiffel Tower Skip-Line','Seine River Cruise'] },
  { id:3,  name:'Maldives Escape',        country:'Maldives',      category:'luxury',    days:6,  price:3499, rating:5.0, badge:'Luxury',      image:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', desc:'Overwater bungalow experience with crystal-clear lagoons, private beach, and sunset dining.', includes:['Business Class Flights','Overwater Villa','All Meals','Snorkelling','Water Sports'] },
  { id:4,  name:'Tokyo Explorer',         country:'Japan',         category:'cultural',  days:8,  price:2199, rating:4.9, badge:'Top Rated',   image:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', desc:'Neon lights, ancient shrines, ramen alleys, and cherry blossoms. A city like no other.', includes:['Flights','Boutique Hotel','Breakfast','JR Rail Pass','Tea Ceremony'] },
  { id:5,  name:'Kenya Safari Adventure', country:'Kenya',         category:'adventure', days:9,  price:2899, rating:4.9, badge:'Adventure',   image:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', desc:'Witness the Great Migration, Big Five game drives, and majestic Maasai Mara sunsets.', includes:['Flights','Safari Lodge','Full Board','Game Drives','Maasai Village Visit'] },
  { id:6,  name:'Greek Islands Hop',      country:'Greece',        category:'beach',     days:10, price:2499, rating:4.8, badge:'Popular',     image:'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', desc:'Santorini sunsets, Mykonos beaches, and authentic Greek mezze along the Aegean coast.', includes:['Flights','Island Ferries','Hotels','Breakfast','Boat Tour'] },
  { id:7,  name:'Dubai Glamour',          country:'UAE',           category:'luxury',    days:5,  price:1799, rating:4.7, badge:'Luxury',      image:'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80', desc:'Burj Khalifa, desert dunes, gold souk, and Michelin-star dining in the city of the future.', includes:['Flights','5-Star Hotel','Breakfast','Burj Khalifa','Desert Safari'] },
  { id:8,  name:'Himalayan Trek',         country:'Nepal',         category:'adventure', days:12, price:1599, rating:4.9, badge:'Adventure',   image:'https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80', desc:'Trek through the roof of the world, visit monasteries, and experience true mountain hospitality.', includes:['Flights','Teahouse Stays','All Meals','Trekking Guide','Permits'] },
  { id:9,  name:'Rome & Amalfi Coast',    country:'Italy',         category:'cultural',  days:8,  price:2299, rating:4.8, badge:'Top Rated',   image:'https://images.unsplash.com/photo-1552832230-c0197dd291d3?w=600&q=80', desc:'Colosseum, Vatican, and the breathtaking cliffside villages of the Amalfi Coast.', includes:['Flights','Boutique Hotels','Breakfast','Colosseum Tour','Boat Ride'] },
  { id:10, name:'Thailand Budget Tour',   country:'Thailand',      category:'budget',    days:10, price:899,  rating:4.6, badge:'Budget',      image:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', desc:'Street food, floating markets, golden temples, and full moon beach parties on a shoestring.', includes:['Flights','Guesthouses','Breakfast','Temple Tours','Ferry Passes'] },
  { id:11, name:'New York City Buzz',     country:'USA',           category:'cultural',  days:6,  price:1999, rating:4.7, badge:'City Break',  image:'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80', desc:'Times Square, Central Park, Broadway show, and the best pizza slice of your life.', includes:['Flights','Manhattan Hotel','Breakfast','Broadway Ticket','NY Pass'] },
  { id:12, name:'Patagonia Wild Trek',    country:'Argentina',     category:'adventure', days:11, price:2699, rating:4.9, badge:'Wild',        image:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', desc:'End-of-the-world glaciers, turquoise lakes, condors, and jaw-dropping Torres del Paine.', includes:['Flights','Eco-Lodges','Full Board','Park Fees','Trekking Guide'] },
  { id:13, name:'Phuket Beach Getaway',   country:'Thailand',      category:'beach',     days:7,  price:1099, rating:4.7, badge:'Beach',       image:'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&q=80', desc:'Turquoise water, longtail boats, night markets, and world-famous Phi Phi islands.', includes:['Flights','Beachfront Resort','Breakfast','Island Hopping','Kayaking'] },
  { id:14, name:'Moroccan Desert Trail',  country:'Morocco',       category:'adventure', days:8,  price:1399, rating:4.8, badge:'Adventure',   image:'https://images.unsplash.com/photo-1597212618440-806262de4f2b?w=600&q=80', desc:'Sahara camel ride, riads of Marrakech, blue city of Chefchaouen, and mint tea rituals.', includes:['Flights','Riads & Camp','Breakfast','Sahara Night','Guided Medina Tour'] },
  { id:15, name:'Sydney & Great Barrier', country:'Australia',     category:'luxury',    days:10, price:3199, rating:4.8, badge:'Premium',     image:'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80', desc:'Opera House, Bondi Beach, and the world\'s biggest coral reef right at your fins.', includes:['Business Class','5-Star Hotels','Breakfast','Reef Dive','Bridge Climb'] },
  { id:16, name:'Rajasthan Royal Tour',   country:'India',         category:'cultural',  days:9,  price:999,  rating:4.7, badge:'Heritage',    image:'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80', desc:'Jaipur palaces, Jaisalmer forts, camel safaris, and vibrant bazaars of the Pink City.', includes:['Flights','Heritage Hotels','Breakfast','Palace Tours','Camel Safari'] },
  { id:17, name:'Iceland Aurora Hunt',    country:'Iceland',       category:'adventure', days:7,  price:2799, rating:4.9, badge:'Bucket List', image:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', desc:'Northern Lights, geysers, waterfalls, the Blue Lagoon, and puffin spotting on black beaches.', includes:['Flights','Guesthouses','Breakfast','Northern Lights Tour','Golden Circle'] },
  { id:18, name:'Barcelona & Ibiza',      country:'Spain',         category:'beach',     days:8,  price:1699, rating:4.8, badge:'Party & Culture', image:'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80', desc:'Gaudí masterpieces by day, Ibiza sunset clubs by night, and tapas all day long.', includes:['Flights','City Hotel + Beach Club','Breakfast','Sagrada Familia','Ferry to Ibiza'] },
  { id:19, name:'Peru & Machu Picchu',    country:'Peru',          category:'adventure', days:10, price:2499, rating:4.9, badge:'Wonder',      image:'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80', desc:'Inca Trail, ancient citadel at dawn, Amazon jungle, and the floating islands of Titicaca.', includes:['Flights','Hotels & Lodge','Breakfast','Inca Trail Permit','Guided Tours'] },
  { id:20, name:'Budget Europe Blitz',    country:'Multi-Country', category:'budget',    days:14, price:1299, rating:4.6, badge:'Budget',      image:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80', desc:'Hit 6 countries in 2 weeks — Paris, Amsterdam, Berlin, Prague, Vienna, and Budapest by rail.', includes:['Flights','Hostels','Breakfast','Eurail Pass','City Walking Tours'] },
];

let activeTag = 'all';
let filteredData = [...destinations];
let selectedPkg = null;

const TAG_COLORS = {
  budget: '#00b894', luxury: '#6c5ce7', adventure: '#e17055',
  beach: '#0abde3',  cultural: '#fdcb6e'
};

/* ── RENDER CARDS ── */
function renderCards(data) {
  const grid    = document.getElementById('destinationsGrid');
  const noRes   = document.getElementById('noResults');
  const countEl = document.getElementById('resultsCount');
  if (!grid) return;

  if (data.length === 0) {
    grid.innerHTML = '';
    noRes.classList.remove('hidden');
    if (countEl) countEl.innerHTML = 'Showing <strong>0</strong> packages';
    return;
  }

  noRes.classList.add('hidden');
  if (countEl) countEl.innerHTML = `Showing <strong>${data.length}</strong> packages`;

  grid.innerHTML = data.map(d => `
    <div class="dest-grid-card" onclick="openPkgModal(${d.id})">
      <div class="card-img-wrap">
        <img src="${d.image}" alt="${d.name}" loading="lazy"/>
        <span class="card-category" style="background:${TAG_COLORS[d.category]||'#0abde3'};color:#fff;">${d.badge}</span>
        <span class="card-rating"><i class="fas fa-star"></i> ${d.rating}</span>
      </div>
      <div class="card-body">
        <h3>${d.name}</h3>
        <p class="card-country"><i class="fas fa-map-marker-alt"></i> ${d.country}</p>
        <p style="font-size:0.82rem;color:#777;line-height:1.5;">${d.desc.substring(0,85)}...</p>
        <div class="card-footer-row">
          <span class="card-days"><i class="fas fa-moon"></i> ${d.days} Days</span>
          <span class="card-price">$${d.price.toLocaleString()} <span>/ person</span></span>
        </div>
        <button class="btn-card" onclick="event.stopPropagation(); openPkgModal(${d.id})">
          <i class="fas fa-eye"></i> View Package
        </button>
      </div>
    </div>`).join('');
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
  const sort  = document.getElementById('sortSelect')?.value || 'default';

  let data = destinations.filter(d => {
    const matchTag    = activeTag === 'all' || d.category === activeTag;
    const matchSearch = d.name.toLowerCase().includes(query) || d.country.toLowerCase().includes(query);
    return matchTag && matchSearch;
  });

  if (sort === 'price-low')  data.sort((a,b) => a.price - b.price);
  else if (sort === 'price-high') data.sort((a,b) => b.price - a.price);
  else if (sort === 'days')  data.sort((a,b) => a.days - b.days);
  else if (sort === 'name')  data.sort((a,b) => a.name.localeCompare(b.name));

  filteredData = data;
  renderCards(data);
}

/* ── MODAL ── */
function openPkgModal(id) {
  selectedPkg = destinations.find(d => d.id === id);
  if (!selectedPkg) return;
  const p = selectedPkg;
  const color = TAG_COLORS[p.category] || '#0abde3';

  document.getElementById('pkgModalTitle').textContent = p.name;
  document.getElementById('pkgModalBody').innerHTML = `
    <div style="position:relative;height:220px;overflow:hidden;border-radius:12px;margin-bottom:20px;">
      <img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;"/>
      <span style="position:absolute;bottom:12px;left:12px;background:${color};color:#fff;padding:4px 12px;border-radius:12px;font-size:0.72rem;font-weight:700;">${p.badge}</span>
    </div>
    <p style="font-size:0.88rem;color:#555;line-height:1.7;margin-bottom:16px;">${p.desc}</p>
    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px;">
      <span style="background:#f0f8ff;color:#0abde3;padding:6px 14px;border-radius:10px;font-size:0.8rem;font-weight:600;"><i class="fas fa-map-marker-alt"></i> ${p.country}</span>
      <span style="background:#f0f8ff;color:#0abde3;padding:6px 14px;border-radius:10px;font-size:0.8rem;font-weight:600;"><i class="fas fa-moon"></i> ${p.days} Days</span>
      <span style="background:#fffbf0;color:#e17055;padding:6px 14px;border-radius:10px;font-size:0.8rem;font-weight:600;"><i class="fas fa-star" style="color:#fdcb6e"></i> ${p.rating} Rating</span>
      <span style="background:#f0fff4;color:#00b894;padding:6px 14px;border-radius:10px;font-size:0.8rem;font-weight:600;"><i class="fas fa-tag"></i> ${p.category.charAt(0).toUpperCase()+p.category.slice(1)}</span>
    </div>
    <h4 style="font-size:0.9rem;font-weight:700;color:#333;margin-bottom:10px;"><i class="fas fa-check-circle" style="color:#00b894;margin-right:6px;"></i>What's Included</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:20px;">
      ${p.includes.map(i => `<div style="display:flex;align-items:center;gap:7px;font-size:0.82rem;color:#555;"><i class="fas fa-check" style="color:#00b894;font-size:0.7rem;"></i>${i}</div>`).join('')}
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #eee;padding-top:16px;">
      <div>
        <div style="font-size:0.75rem;color:#aaa;">From</div>
        <div style="font-size:1.8rem;font-weight:800;color:#0abde3;">$${p.price.toLocaleString()}<span style="font-size:0.85rem;font-weight:500;color:#aaa;"> / person</span></div>
      </div>
      <button onclick="bookPackage()" style="padding:12px 28px;border-radius:12px;background:linear-gradient(135deg,#0abde3,#00d2d3);border:none;color:#fff;font-size:0.9rem;font-weight:700;font-family:Poppins,sans-serif;cursor:pointer;display:flex;align-items:center;gap:8px;">
        <i class="fas fa-check-circle"></i> Book Now
      </button>
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
}

function bookPackage() {
  closePkgModal();
  if (selectedPkg) showToast('🎉 ' + selectedPkg.name + ' booked! Check My Trips.', 'success');
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderCards(destinations);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePkgModal(); });
});
