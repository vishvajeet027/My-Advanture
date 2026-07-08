/* ================================================================
   MODULE 5 — Mock Data
   mockdata.js — 20 Destinations, 15 Trips, 50 Expenses,
                 20 Favorites, 10 Weather Objects
   ================================================================ */

/* ===== 20 HOTELS ===== */
const MOCK_HOTELS = [
  { id: 1,  name: 'Grand Seaside Resort',     city: 'Miami',       country: 'USA',        rating: 4.8, price: 280, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', desc: 'Luxurious beachfront resort with stunning ocean views, world-class dining, and premium amenities.', facilities: ['Pool', 'Beach Access', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Parking'] },
  { id: 2,  name: 'Tokyo Imperial Hotel',     city: 'Tokyo',       country: 'Japan',      rating: 4.9, price: 320, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', desc: 'Elegant hotel in the heart of Tokyo with traditional Japanese hospitality and modern comfort.', facilities: ['Restaurant', 'Bar', 'Gym', 'WiFi', 'Conference Room', 'Garden', 'Spa'] },
  { id: 3,  name: 'Paradise Beach Villa',     city: 'Bali',        country: 'Indonesia',  rating: 4.7, price: 195, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', desc: 'Tropical paradise villa with private pool, lush gardens, and authentic Balinese architecture.', facilities: ['Pool', 'Garden', 'Beach Access', 'Restaurant', 'Spa', 'WiFi', 'Airport Shuttle'] },
  { id: 4,  name: 'Alpine Mountain Lodge',    city: 'Interlaken',  country: 'Switzerland',rating: 4.9, price: 380, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', desc: 'Cozy mountain lodge with breathtaking Alpine views, perfect for nature lovers and ski enthusiasts.', facilities: ['Restaurant', 'Bar', 'Ski Storage', 'Fireplace', 'WiFi', 'Parking', 'Sauna'] },
  { id: 5,  name: 'Dubai Skyline Towers',     city: 'Dubai',       country: 'UAE',        rating: 5.0, price: 450, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', desc: 'Ultra-modern luxury hotel in downtown Dubai with panoramic city views and rooftop infinity pool.', facilities: ['Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'WiFi', 'Concierge', 'Parking'] },
  { id: 6,  name: 'Historic Paris Boutique',  city: 'Paris',       country: 'France',     rating: 4.6, price: 240, image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80', desc: 'Charming boutique hotel in a historic Parisian building, steps away from the Eiffel Tower.', facilities: ['Restaurant', 'WiFi', 'Concierge', 'Bar', 'Garden', 'Room Service'] },
  { id: 7,  name: 'Santorini Sunset Suites',  city: 'Santorini',   country: 'Greece',     rating: 4.9, price: 350, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', desc: 'Iconic white-washed cave suites with private terraces overlooking the stunning Aegean caldera.', facilities: ['Pool', 'Restaurant', 'WiFi', 'Spa', 'Jacuzzi', 'Breakfast Included'] },
  { id: 8,  name: 'Amazon Rainforest Lodge',  city: 'Manaus',      country: 'Brazil',     rating: 4.5, price: 175, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', desc: 'Eco-friendly jungle lodge deep in the Amazon with guided nature tours and wildlife encounters.', facilities: ['Restaurant', 'Garden', 'Nature Tours', 'WiFi', 'Bar', 'Library'] },
  { id: 9,  name: 'Manhattan Plaza Hotel',    city: 'New York',    country: 'USA',        rating: 4.7, price: 290, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', desc: 'Prime location hotel in the heart of Manhattan, walking distance to Times Square and Broadway.', facilities: ['Gym', 'Restaurant', 'Bar', 'WiFi', 'Concierge', 'Business Center', 'Parking'] },
  { id: 10, name: 'Maldives Water Bungalow', city: 'Male',        country: 'Maldives',   rating: 5.0, price: 520, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80', desc: 'Exclusive overwater bungalow with direct lagoon access, glass floors, and unparalleled privacy.', facilities: ['Pool', 'Beach Access', 'Spa', 'Restaurant', 'Water Sports', 'WiFi', 'Snorkeling'] },
  { id: 11, name: 'London Heritage Inn',      city: 'London',      country: 'UK',         rating: 4.6, price: 265, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', desc: 'Classic British hotel with Victorian charm, afternoon tea service, and excellent transport links.', facilities: ['Restaurant', 'Bar', 'WiFi', 'Gym', 'Concierge', 'Business Center'] },
  { id: 12, name: 'Safari Desert Camp',       city: 'Nairobi',     country: 'Kenya',      rating: 4.8, price: 220, image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=600&q=80', desc: 'Authentic safari camp with luxury tents, game drives, and unforgettable wildlife experiences.', facilities: ['Restaurant', 'Bar', 'Safari Tours', 'Campfire', 'WiFi', 'Garden'] },
  { id: 13, name: 'Sydney Harbour Hotel',     city: 'Sydney',      country: 'Australia',  rating: 4.7, price: 310, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', desc: 'Modern waterfront hotel with stunning Opera House and Harbour Bridge views from every room.', facilities: ['Pool', 'Gym', 'Restaurant', 'Bar', 'Spa', 'WiFi', 'Parking'] },
  { id: 14, name: 'Kyoto Traditional Ryokan', city: 'Kyoto',       country: 'Japan',      rating: 4.9, price: 280, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80', desc: 'Authentic Japanese inn with tatami rooms, onsen baths, and traditional kaiseki dining.', facilities: ['Onsen Bath', 'Garden', 'Restaurant', 'WiFi', 'Tea Ceremony', 'Spa'] },
  { id: 15, name: 'Barcelona Beach House',    city: 'Barcelona',   country: 'Spain',      rating: 4.5, price: 190, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', desc: 'Modern beachside hotel with rooftop terrace bar, steps from Barceloneta Beach and Las Ramblas.', facilities: ['Pool', 'Beach Access', 'Restaurant', 'Bar', 'WiFi', 'Gym'] },
  { id: 16, name: 'Iceland Northern Lights Lodge', city: 'Reykjavik', country: 'Iceland', rating: 4.8, price: 295, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', desc: 'Remote lodge with glass-roofed rooms designed for optimal aurora viewing and geothermal spa.', facilities: ['Spa', 'Restaurant', 'WiFi', 'Sauna', 'Aurora Tours', 'Fireplace'] },
  { id: 17, name: 'Rome Colosseum Suites',    city: 'Rome',        country: 'Italy',      rating: 4.7, price: 255, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80', desc: 'Elegant suites with Colosseum views, Italian marble bathrooms, and authentic Roman hospitality.', facilities: ['Restaurant', 'Bar', 'WiFi', 'Concierge', 'Breakfast Included', 'Terrace'] },
  { id: 18, name: 'Singapore Marina Bay Hotel', city: 'Singapore', country: 'Singapore',  rating: 5.0, price: 420, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', desc: 'Iconic hotel with rooftop infinity pool, stunning skyline views, and world-class dining options.', facilities: ['Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'WiFi', 'Casino', 'Shopping'] },
  { id: 19, name: 'Morocco Riad Palace',      city: 'Marrakech',   country: 'Morocco',    rating: 4.6, price: 165, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', desc: 'Traditional Moroccan riad with ornate tile work, courtyard fountain, and rooftop terrace.', facilities: ['Pool', 'Garden', 'Restaurant', 'WiFi', 'Hammam', 'Terrace'] },
  { id: 20, name: 'Canadian Mountain Retreat', city: 'Banff',      country: 'Canada',     rating: 4.8, price: 270, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', desc: 'Rustic luxury resort in the Canadian Rockies with hiking trails, hot springs, and mountain views.', facilities: ['Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'WiFi', 'Hiking', 'Parking'] },
];

/* ===== 20 DESTINATIONS ===== */
const MOCK_DESTINATIONS = [
  { id: 1,  name: 'Paris',        country: 'France',       category: 'europe',     days: 7,  price: 2800, rating: 4.9, trending: true,  image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80', desc: 'The city of love, art, and iconic landmarks like the Eiffel Tower.' },
  { id: 2,  name: 'Rome',         country: 'Italy',        category: 'europe',     days: 6,  price: 2200, rating: 4.8, trending: true,  image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&q=80', desc: 'Eternal city filled with ancient history and world-class cuisine.' },
  { id: 3,  name: 'Barcelona',    country: 'Spain',        category: 'europe',     days: 5,  price: 1900, rating: 4.7, trending: false, image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80', desc: 'Vibrant city with stunning Gaudi architecture and beach life.' },
  { id: 4,  name: 'Amsterdam',    country: 'Netherlands',  category: 'europe',     days: 4,  price: 1700, rating: 4.6, trending: false, image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=500&q=80', desc: 'Beautiful canals, world-class museums, and tulip fields.' },
  { id: 5,  name: 'London',       country: 'UK',           category: 'europe',     days: 8,  price: 3500, rating: 4.8, trending: true,  image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80', desc: 'Royal history meets modern culture in this iconic metropolis.' },
  { id: 6,  name: 'Tokyo',        country: 'Japan',        category: 'asia',       days: 10, price: 3800, rating: 4.9, trending: true,  image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80', desc: 'A futuristic metropolis blending deep tradition with innovation.' },
  { id: 7,  name: 'Bali',         country: 'Indonesia',    category: 'asia',       days: 7,  price: 1400, rating: 4.7, trending: true,  image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=500&q=80', desc: 'Tropical paradise with stunning temples, terraces and beaches.' },
  { id: 8,  name: 'Taj Mahal',    country: 'India',        category: 'asia',       days: 5,  price: 990,  rating: 4.8, trending: false, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80', desc: 'One of the world\'s greatest wonders of human achievement.' },
  { id: 9,  name: 'Singapore',    country: 'Singapore',    category: 'asia',       days: 5,  price: 2400, rating: 4.7, trending: false, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&q=80', desc: 'Ultra-modern city with amazing food, gardens, and nightlife.' },
  { id: 10, name: 'Cape Town',    country: 'South Africa', category: 'africa',     days: 8,  price: 2100, rating: 4.8, trending: true,  image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&q=80', desc: 'Stunning Table Mountain, beaches, and incredible safari.' },
  { id: 11, name: 'Marrakech',    country: 'Morocco',      category: 'africa',     days: 5,  price: 1200, rating: 4.6, trending: false, image: 'https://images.unsplash.com/photo-1597212618440-806262de4f2b?w=500&q=80', desc: 'Exotic souks, riads, and doorway to the Sahara desert.' },
  { id: 12, name: 'New York',     country: 'USA',          category: 'americas',   days: 7,  price: 3200, rating: 4.8, trending: true,  image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80', desc: 'The city that never sleeps — iconic skyline and endless energy.' },
  { id: 13, name: 'Machu Picchu', country: 'Peru',         category: 'americas',   days: 6,  price: 2600, rating: 4.9, trending: false, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80', desc: 'Ancient Incan citadel set dramatically in the Andes mountains.' },
  { id: 14, name: 'Dubai',        country: 'UAE',          category: 'middleeast', days: 6,  price: 3100, rating: 4.7, trending: true,  image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&q=80', desc: 'Luxury skyscrapers, desert safaris, and world-record attractions.' },
  { id: 15, name: 'Maldives',     country: 'Maldives',     category: 'asia',       days: 7,  price: 4200, rating: 4.9, trending: true,  image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80', desc: 'Crystal-clear waters and dreamy overwater bungalows.' },
  { id: 16, name: 'Sydney',       country: 'Australia',    category: 'americas',   days: 9,  price: 4000, rating: 4.8, trending: false, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&q=80', desc: 'Opera House, Harbour Bridge, and golden beaches.' },
  { id: 17, name: 'Santorini',    country: 'Greece',       category: 'europe',     days: 5,  price: 2900, rating: 4.9, trending: true,  image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80', desc: 'Iconic white-washed buildings and breathtaking Aegean sunsets.' },
  { id: 18, name: 'Kyoto',        country: 'Japan',        category: 'asia',       days: 6,  price: 2700, rating: 4.8, trending: false, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80', desc: 'Ancient temples, geisha districts, and stunning bamboo groves.' },
  { id: 19, name: 'Rio de Janeiro', country: 'Brazil',     category: 'americas',   days: 7,  price: 2300, rating: 4.6, trending: false, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&q=80', desc: 'Christ the Redeemer, Carnival, and legendary Copacabana beach.' },
  { id: 20, name: 'Istanbul',     country: 'Turkey',       category: 'middleeast', days: 6,  price: 1800, rating: 4.7, trending: true,  image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500&q=80', desc: 'Where East meets West — stunning mosques, bazaars and Bosphorus.' },
];

/* ===== 15 TRIPS ===== */
const MOCK_TRIPS = [
  { id: 101, name: 'Paris Honeymoon',        dest: 'Paris, France',          type: 'Leisure',   start: '2026-08-10', end: '2026-08-17', budget: 5500, travelers: 2, notes: 'Anniversary trip — book La Seine restaurant.', savedAt: 'Jul 1, 2026',  days: [ { dayNum:1, date:'Mon, Aug 10', activities:[{name:'Arrive CDG, check in hotel',cost:0},{name:'Eiffel Tower evening visit',cost:30}] }, { dayNum:2, date:'Tue, Aug 11', activities:[{name:'Louvre Museum',cost:22},{name:'Seine River Cruise',cost:15}] }, { dayNum:3, date:'Wed, Aug 12', activities:[{name:'Versailles Day Trip',cost:40}] } ] },
  { id: 102, name: 'Tokyo Explorer',          dest: 'Tokyo, Japan',           type: 'Adventure', start: '2026-09-05', end: '2026-09-15', budget: 6000, travelers: 1, notes: 'Try Tsukiji market and teamLab Borderless.', savedAt: 'Jun 28, 2026', days: [ { dayNum:1, date:'Sat, Sep 5',  activities:[{name:'Arrival & Shinjuku stroll',cost:0}] }, { dayNum:2, date:'Sun, Sep 6',  activities:[{name:'Senso-ji Temple, Asakusa',cost:0},{name:'Tsukiji outer market',cost:25}] }, { dayNum:3, date:'Mon, Sep 7',  activities:[{name:'teamLab Borderless',cost:32}] } ] },
  { id: 103, name: 'Bali Retreat',            dest: 'Bali, Indonesia',        type: 'Leisure',   start: '2026-07-20', end: '2026-07-27', budget: 2800, travelers: 2, notes: 'Stay at Ubud Rice Terrace villa.', savedAt: 'Jun 25, 2026',           days: [ { dayNum:1, date:'Mon, Jul 20', activities:[{name:'Arrive, rice terrace walk',cost:0}] }, { dayNum:2, date:'Tue, Jul 21', activities:[{name:'Tanah Lot Temple',cost:15},{name:'Cooking class',cost:35}] } ] },
  { id: 104, name: 'European Grand Tour',     dest: 'Full Europe',            type: 'Cultural',  start: '2026-10-01', end: '2026-10-18', budget: 9500, travelers: 2, notes: 'Rome → Florence → Venice → Paris → London.', savedAt: 'Jun 20, 2026',   days: [ { dayNum:1, date:'Thu, Oct 1',  activities:[{name:'Arrive Rome, Colosseum',cost:20}] }, { dayNum:2, date:'Fri, Oct 2',  activities:[{name:'Vatican Museums',cost:25},{name:'Trevi Fountain',cost:0}] } ] },
  { id: 105, name: 'Dubai Luxury Break',      dest: 'Dubai, UAE',             type: 'Leisure',   start: '2026-12-20', end: '2026-12-26', budget: 7000, travelers: 3, notes: 'Burj Khalifa At the Top + desert safari booked.', savedAt: 'Jun 18, 2026',  days: [ { dayNum:1, date:'Sun, Dec 20', activities:[{name:'Arrive, Burj Khalifa',cost:45}] }, { dayNum:2, date:'Mon, Dec 21', activities:[{name:'Dubai Mall & Fountain',cost:0},{name:'Desert Safari',cost:120}] } ] },
  { id: 106, name: 'Maldives Escape',         dest: 'Maldives',               type: 'Leisure',   start: '2027-01-15', end: '2027-01-22', budget: 8500, travelers: 2, notes: 'Overwater bungalow — Veligandu Resort.', savedAt: 'Jun 15, 2026',          days: [ { dayNum:1, date:'Thu, Jan 15', activities:[{name:'Seaplane transfer, check-in',cost:200}] }, { dayNum:2, date:'Fri, Jan 16', activities:[{name:'Snorkelling & coral reef',cost:40}] } ] },
  { id: 107, name: 'Santorini Sunset',        dest: 'Santorini, Greece',      type: 'Leisure',   start: '2026-09-12', end: '2026-09-17', budget: 4200, travelers: 2, notes: 'Watch sunset from Oia — book early!', savedAt: 'Jun 12, 2026',              days: [ { dayNum:1, date:'Sat, Sep 12', activities:[{name:'Arrive Thira, Fira walk',cost:0}] }, { dayNum:2, date:'Sun, Sep 13', activities:[{name:'Oia village & Blue Dome',cost:0},{name:'Catamaran sunset cruise',cost:90}] } ] },
  { id: 108, name: 'Cape Town Safari',        dest: 'Cape Town, South Africa', type: 'Adventure', start: '2026-08-25', end: '2027-09-01', budget: 5200, travelers: 4, notes: 'Table Mountain cable car + Kruger day trip.', savedAt: 'Jun 10, 2026',    days: [ { dayNum:1, date:'Tue, Aug 25', activities:[{name:'Arrive, V&A Waterfront',cost:0}] }, { dayNum:2, date:'Wed, Aug 26', activities:[{name:'Table Mountain Cable Car',cost:35},{name:'Boulders Penguin Colony',cost:15}] } ] },
  { id: 109, name: 'Kyoto Culture Trip',      dest: 'Kyoto, Japan',           type: 'Cultural',  start: '2026-11-10', end: '2026-11-16', budget: 3800, travelers: 1, notes: 'Autumn maple leaves season — Arashiyama bamboo.', savedAt: 'Jun 8, 2026',    days: [ { dayNum:1, date:'Tue, Nov 10', activities:[{name:'Fushimi Inari Shrine',cost:0}] }, { dayNum:2, date:'Wed, Nov 11', activities:[{name:'Arashiyama Bamboo Grove',cost:0},{name:'Tea ceremony',cost:28}] } ] },
  { id: 110, name: 'New York City Break',     dest: 'New York, USA',          type: 'Adventure', start: '2026-11-25', end: '2026-12-02', budget: 4800, travelers: 2, notes: 'Times Square New Year prep, Central Park, MoMA.', savedAt: 'Jun 5, 2026',   days: [ { dayNum:1, date:'Wed, Nov 25', activities:[{name:'Arrive JFK, Times Square',cost:0}] }, { dayNum:2, date:'Thu, Nov 26', activities:[{name:'Central Park walk',cost:0},{name:'MoMA Museum',cost:25}] } ] },
  { id: 111, name: 'Marrakech Adventure',     dest: 'Marrakech, Morocco',     type: 'Adventure', start: '2026-10-15', end: '2026-10-20', budget: 1800, travelers: 2, notes: 'Medina souks, hammam, and Sahara day trip.', savedAt: 'Jun 3, 2026',          days: [ { dayNum:1, date:'Thu, Oct 15', activities:[{name:'Arrive, Djemaa el-Fna',cost:0}] }, { dayNum:2, date:'Fri, Oct 16', activities:[{name:'Medina souk tour',cost:0},{name:'Hammam spa',cost:20}] } ] },
  { id: 112, name: 'Singapore City Sprint',   dest: 'Singapore',              type: 'Business',  start: '2026-08-01', end: '2026-08-06', budget: 3500, travelers: 1, notes: 'Conference on Day 1 & 2. Marina Bay Sands rooftop.', savedAt: 'May 30, 2026', days: [ { dayNum:1, date:'Sat, Aug 1',  activities:[{name:'Arrive, Gardens by the Bay',cost:15}] }, { dayNum:2, date:'Sun, Aug 2',  activities:[{name:'Marina Bay Sands SkyPark',cost:23}] } ] },
  { id: 113, name: 'Istanbul Discovery',      dest: 'Istanbul, Turkey',       type: 'Cultural',  start: '2026-09-20', end: '2026-09-26', budget: 2600, travelers: 2, notes: 'Hagia Sophia, Grand Bazaar and Bosphorus cruise.', savedAt: 'May 28, 2026',   days: [ { dayNum:1, date:'Sun, Sep 20', activities:[{name:'Arrive, Sultanahmet square',cost:0}] }, { dayNum:2, date:'Mon, Sep 21', activities:[{name:'Hagia Sophia & Blue Mosque',cost:0},{name:'Grand Bazaar shopping',cost:50}] } ] },
  { id: 114, name: 'Rio Carnival Prep',       dest: 'Rio de Janeiro, Brazil', type: 'Adventure', start: '2027-02-20', end: '2027-02-27', budget: 3900, travelers: 3, notes: 'Book samba show tickets in advance.', savedAt: 'May 25, 2026',                days: [ { dayNum:1, date:'Fri, Feb 20', activities:[{name:'Arrive, Copacabana beach',cost:0}] }, { dayNum:2, date:'Sat, Feb 21', activities:[{name:'Christ the Redeemer',cost:20},{name:'Sugarloaf Mountain',cost:35}] } ] },
  { id: 115, name: 'Barcelona Weekend',       dest: 'Barcelona, Spain',       type: 'Leisure',   start: '2026-07-10', end: '2026-07-15', budget: 2200, travelers: 2, notes: 'Sagrada Familia tickets must be pre-booked!', savedAt: 'May 20, 2026',          days: [ { dayNum:1, date:'Fri, Jul 10', activities:[{name:'Arrive, La Rambla walk',cost:0}] }, { dayNum:2, date:'Sat, Jul 11', activities:[{name:'Sagrada Familia',cost:26},{name:'Park Güell',cost:10}] } ] },
];

/* ===== 50 EXPENSES ===== */
const MOCK_EXPENSES = [
  /* Paris Honeymoon (tripId: 101) */
  { id: 201, tripId: 101, category: 'Flights',        amount: 1200, desc: 'Return flights CDG',         date: '2026-08-10' },
  { id: 202, tripId: 101, category: 'Accommodation',  amount: 1400, desc: 'Hotel 7 nights',             date: '2026-08-10' },
  { id: 203, tripId: 101, category: 'Food',           amount:  420, desc: 'Restaurants & cafés',        date: '2026-08-11' },
  { id: 204, tripId: 101, category: 'Activities',     amount:  220, desc: 'Eiffel, Louvre, Versailles', date: '2026-08-12' },
  { id: 205, tripId: 101, category: 'Transport',      amount:  180, desc: 'Metro & taxis',              date: '2026-08-10' },
  /* Tokyo Explorer (tripId: 102) */
  { id: 206, tripId: 102, category: 'Flights',        amount: 1500, desc: 'Return flights NRT',         date: '2026-09-05' },
  { id: 207, tripId: 102, category: 'Accommodation',  amount: 1100, desc: 'Capsule & ryokan mix',       date: '2026-09-05' },
  { id: 208, tripId: 102, category: 'Food',           amount:  600, desc: 'Ramen, sushi, izakaya',      date: '2026-09-06' },
  { id: 209, tripId: 102, category: 'Activities',     amount:  320, desc: 'teamLab, temples, day trips',date: '2026-09-07' },
  { id: 210, tripId: 102, category: 'Shopping',       amount:  480, desc: 'Akihabara & Harajuku',       date: '2026-09-09' },
  /* Bali Retreat (tripId: 103) */
  { id: 211, tripId: 103, category: 'Flights',        amount:  800, desc: 'Return flights DPS',         date: '2026-07-20' },
  { id: 212, tripId: 103, category: 'Accommodation',  amount:  700, desc: 'Villa 7 nights',             date: '2026-07-20' },
  { id: 213, tripId: 103, category: 'Food',           amount:  280, desc: 'Warungs and restaurants',    date: '2026-07-21' },
  { id: 214, tripId: 103, category: 'Activities',     amount:  200, desc: 'Temple visits, cooking class',date:'2026-07-22' },
  { id: 215, tripId: 103, category: 'Transport',      amount:  100, desc: 'Scooter rental',             date: '2026-07-20' },
  /* European Grand Tour (tripId: 104) */
  { id: 216, tripId: 104, category: 'Flights',        amount: 2000, desc: 'Flights + Eurail pass',      date: '2026-10-01' },
  { id: 217, tripId: 104, category: 'Accommodation',  amount: 2800, desc: 'Hotels 17 nights',           date: '2026-10-01' },
  { id: 218, tripId: 104, category: 'Food',           amount: 1200, desc: 'Dining across Europe',       date: '2026-10-02' },
  { id: 219, tripId: 104, category: 'Activities',     amount:  650, desc: 'Museums, tours, attractions', date:'2026-10-03' },
  { id: 220, tripId: 104, category: 'Shopping',       amount:  800, desc: 'Souvenirs & fashion',        date: '2026-10-10' },
  /* Dubai Luxury (tripId: 105) */
  { id: 221, tripId: 105, category: 'Flights',        amount: 1800, desc: 'Business class x3',          date: '2026-12-20' },
  { id: 222, tripId: 105, category: 'Accommodation',  amount: 2200, desc: 'Atlantis Palm 6 nights',     date: '2026-12-20' },
  { id: 223, tripId: 105, category: 'Food',           amount:  900, desc: 'Fine dining restaurants',    date: '2026-12-21' },
  { id: 224, tripId: 105, category: 'Activities',     amount:  600, desc: 'Burj Khalifa, desert safari', date:'2026-12-22' },
  { id: 225, tripId: 105, category: 'Shopping',       amount:  900, desc: 'Dubai Mall spree',           date: '2026-12-23' },
  /* Maldives (tripId: 106) */
  { id: 226, tripId: 106, category: 'Flights',        amount: 2000, desc: 'Flights + seaplane transfer', date:'2027-01-15' },
  { id: 227, tripId: 106, category: 'Accommodation',  amount: 4200, desc: 'Overwater bungalow 7n',      date: '2027-01-15' },
  { id: 228, tripId: 106, category: 'Food',           amount:  800, desc: 'All-inclusive dining',       date: '2027-01-16' },
  { id: 229, tripId: 106, category: 'Activities',     amount:  400, desc: 'Diving, snorkelling',        date: '2027-01-17' },
  { id: 230, tripId: 106, category: 'Transport',      amount:  200, desc: 'Speed boat excursions',      date: '2027-01-18' },
  /* Santorini (tripId: 107) */
  { id: 231, tripId: 107, category: 'Flights',        amount:  900, desc: 'Flights to JTR',             date: '2026-09-12' },
  { id: 232, tripId: 107, category: 'Accommodation',  amount: 1500, desc: 'Cave hotel Oia 5 nights',    date: '2026-09-12' },
  { id: 233, tripId: 107, category: 'Food',           amount:  600, desc: 'Greek tavernas & seafood',   date: '2026-09-13' },
  { id: 234, tripId: 107, category: 'Activities',     amount:  250, desc: 'Catamaran cruise, wine tour', date:'2026-09-14' },
  /* Cape Town (tripId: 108) */
  { id: 235, tripId: 108, category: 'Flights',        amount: 3200, desc: 'Flights x4 to CPT',          date: '2026-08-25' },
  { id: 236, tripId: 108, category: 'Accommodation',  amount: 1400, desc: 'Guesthouse 8 nights',        date: '2026-08-25' },
  { id: 237, tripId: 108, category: 'Activities',     amount:  800, desc: 'Safari, cable car, tours',   date: '2026-08-26' },
  { id: 238, tripId: 108, category: 'Food',           amount:  600, desc: 'Restaurants & braai',        date: '2026-08-27' },
  /* Kyoto (tripId: 109) */
  { id: 239, tripId: 109, category: 'Flights',        amount: 1100, desc: 'Tokyo-Kyoto Shinkansen',     date: '2026-11-10' },
  { id: 240, tripId: 109, category: 'Accommodation',  amount:  900, desc: 'Traditional ryokan 6 nights',date: '2026-11-10' },
  { id: 241, tripId: 109, category: 'Food',           amount:  350, desc: 'Kaiseki dinners',            date: '2026-11-11' },
  { id: 242, tripId: 109, category: 'Activities',     amount:  200, desc: 'Tea ceremony, temple entry', date: '2026-11-12' },
  /* New York (tripId: 110) */
  { id: 243, tripId: 110, category: 'Flights',        amount: 1600, desc: 'Return flights JFK x2',      date: '2026-11-25' },
  { id: 244, tripId: 110, category: 'Accommodation',  amount: 1800, desc: 'Manhattan hotel 7 nights',   date: '2026-11-25' },
  { id: 245, tripId: 110, category: 'Food',           amount:  700, desc: 'NYC restaurants & food tours',date:'2026-11-26' },
  { id: 246, tripId: 110, category: 'Activities',     amount:  350, desc: 'MoMA, Broadway, Empire State',date:'2026-11-27' },
  /* Istanbul (tripId: 113) */
  { id: 247, tripId: 113, category: 'Flights',        amount:  700, desc: 'Return flights IST',         date: '2026-09-20' },
  { id: 248, tripId: 113, category: 'Accommodation',  amount:  900, desc: 'Sultanahmet boutique hotel', date: '2026-09-20' },
  { id: 249, tripId: 113, category: 'Food',           amount:  400, desc: 'Mezes & kebabs & baklava',   date: '2026-09-21' },
  { id: 250, tripId: 113, category: 'Shopping',       amount:  350, desc: 'Grand Bazaar finds',         date: '2026-09-22' },
];

/* ===== 20 FAVORITES ===== */
const MOCK_FAVORITES = [
  { id: 1,  name: 'Paris',        country: 'France',       image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80', price: 2800, savedAt: '2026-06-01' },
  { id: 6,  name: 'Tokyo',        country: 'Japan',        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80', price: 3800, savedAt: '2026-06-02' },
  { id: 7,  name: 'Bali',         country: 'Indonesia',    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=500&q=80', price: 1400, savedAt: '2026-06-03' },
  { id: 14, name: 'Dubai',        country: 'UAE',          image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&q=80', price: 3100, savedAt: '2026-06-04' },
  { id: 15, name: 'Maldives',     country: 'Maldives',     image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80', price: 4200, savedAt: '2026-06-05' },
  { id: 17, name: 'Santorini',    country: 'Greece',       image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80', price: 2900, savedAt: '2026-06-06' },
  { id: 5,  name: 'London',       country: 'UK',           image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80', price: 3500, savedAt: '2026-06-07' },
  { id: 10, name: 'Cape Town',    country: 'South Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&q=80', price: 2100, savedAt: '2026-06-08' },
  { id: 18, name: 'Kyoto',        country: 'Japan',        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80', price: 2700, savedAt: '2026-06-09' },
  { id: 12, name: 'New York',     country: 'USA',          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80', price: 3200, savedAt: '2026-06-10' },
  { id: 2,  name: 'Rome',         country: 'Italy',        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&q=80', price: 2200, savedAt: '2026-06-11' },
  { id: 20, name: 'Istanbul',     country: 'Turkey',       image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500&q=80', price: 1800, savedAt: '2026-06-12' },
  { id: 13, name: 'Machu Picchu', country: 'Peru',         image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80', price: 2600, savedAt: '2026-06-13' },
  { id: 3,  name: 'Barcelona',    country: 'Spain',        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80', price: 1900, savedAt: '2026-06-14' },
  { id: 9,  name: 'Singapore',    country: 'Singapore',    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&q=80', price: 2400, savedAt: '2026-06-15' },
  { id: 19, name: 'Rio de Janeiro',country: 'Brazil',      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&q=80', price: 2300, savedAt: '2026-06-16' },
  { id: 4,  name: 'Amsterdam',    country: 'Netherlands',  image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=500&q=80', price: 1700, savedAt: '2026-06-17' },
  { id: 16, name: 'Sydney',       country: 'Australia',    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&q=80', price: 4000, savedAt: '2026-06-18' },
  { id: 8,  name: 'Taj Mahal',    country: 'India',        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80', price: 990,  savedAt: '2026-06-19' },
  { id: 11, name: 'Marrakech',    country: 'Morocco',      image: 'https://images.unsplash.com/photo-1597212618440-806262de4f2b?w=500&q=80', price: 1200, savedAt: '2026-06-20' },
];

/* ===== 10 WEATHER OBJECTS ===== */
const MOCK_WEATHER = [
  { id: 'w1',  city: 'Paris',        country: 'France',       temp: 22, feelsLike: 20, humidity: 65, wind: 14, condition: 'Partly Cloudy', icon: 'fas fa-cloud-sun',        high: 25, low: 16, uvIndex: 5, sunrise: '06:12', sunset: '21:48' },
  { id: 'w2',  city: 'Tokyo',        country: 'Japan',        temp: 28, feelsLike: 31, humidity: 78, wind: 10, condition: 'Humid & Warm',   icon: 'fas fa-sun',              high: 31, low: 24, uvIndex: 8, sunrise: '04:30', sunset: '19:02' },
  { id: 'w3',  city: 'Bali',         country: 'Indonesia',    temp: 30, feelsLike: 34, humidity: 82, wind: 8,  condition: 'Tropical Sun',   icon: 'fas fa-sun',              high: 33, low: 26, uvIndex: 9, sunrise: '06:00', sunset: '18:15' },
  { id: 'w4',  city: 'Dubai',        country: 'UAE',          temp: 38, feelsLike: 42, humidity: 45, wind: 18, condition: 'Sunny & Hot',    icon: 'fas fa-sun',              high: 41, low: 30, uvIndex: 11,sunrise: '05:42', sunset: '19:22' },
  { id: 'w5',  city: 'London',       country: 'UK',           temp: 17, feelsLike: 15, humidity: 72, wind: 22, condition: 'Overcast',       icon: 'fas fa-cloud',            high: 19, low: 13, uvIndex: 3, sunrise: '05:01', sunset: '21:20' },
  { id: 'w6',  city: 'New York',     country: 'USA',          temp: 24, feelsLike: 23, humidity: 58, wind: 16, condition: 'Clear',          icon: 'fas fa-sun',              high: 27, low: 18, uvIndex: 6, sunrise: '05:28', sunset: '20:30' },
  { id: 'w7',  city: 'Santorini',    country: 'Greece',       temp: 27, feelsLike: 28, humidity: 55, wind: 20, condition: 'Sunny',          icon: 'fas fa-sun',              high: 30, low: 22, uvIndex: 8, sunrise: '06:05', sunset: '20:42' },
  { id: 'w8',  city: 'Cape Town',    country: 'South Africa', temp: 15, feelsLike: 13, humidity: 68, wind: 25, condition: 'Windy & Cool',   icon: 'fas fa-wind',             high: 18, low: 11, uvIndex: 4, sunrise: '07:45', sunset: '18:00' },
  { id: 'w9',  city: 'Maldives',     country: 'Maldives',     temp: 29, feelsLike: 32, humidity: 80, wind: 12, condition: 'Sunny Tropical', icon: 'fas fa-sun',              high: 31, low: 27, uvIndex: 10,sunrise: '06:00', sunset: '18:10' },
  { id: 'w10', city: 'Istanbul',     country: 'Turkey',       temp: 25, feelsLike: 24, humidity: 60, wind: 15, condition: 'Mostly Clear',   icon: 'fas fa-cloud-sun',        high: 28, low: 20, uvIndex: 6, sunrise: '05:50', sunset: '20:18' },
];

/* ================================================================
   MockData — read-only helpers
   Trips, expenses and favorites are NOT seeded automatically.
   The app starts empty; users create their own data.
   Weather is always loaded from MOCK_WEATHER (no real API).
   Call MockData.seed(true) manually from Settings if you want
   sample data for demo purposes.
   ================================================================ */
const MockData = {
  /** Manual demo seed — only called explicitly from Settings page */
  seed(force = false) {
    if (!force) return;
    localStorage.setItem(STORAGE_KEYS.TRIPS,     JSON.stringify(MOCK_TRIPS));
    localStorage.setItem(STORAGE_KEYS.EXPENSES,  JSON.stringify(MOCK_EXPENSES));
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(MOCK_FAVORITES));
    localStorage.setItem(STORAGE_KEYS.WEATHER,   JSON.stringify(MOCK_WEATHER));
    console.info('MockData seeded: 15 trips, 50 expenses, 20 favorites, 10 weather objects.');
  },

  getTrendingDestinations() {
    return MOCK_DESTINATIONS.filter(d => d.trending);
  },

  getDestinationById(id) {
    return MOCK_DESTINATIONS.find(d => d.id === id) || null;
  },

  getWeatherByCity(city) {
    return MOCK_WEATHER.find(w => w.city.toLowerCase() === city.toLowerCase()) || MOCK_WEATHER[0];
  },

  getAllDestinations() {
    return MOCK_DESTINATIONS;
  },

  getTopRated(n = 6) {
    return [...MOCK_DESTINATIONS].sort((a, b) => b.rating - a.rating).slice(0, n);
  },

  getAllHotels() {
    return MOCK_HOTELS;
  },

  getHotelById(id) {
    return MOCK_HOTELS.find(h => h.id === id) || null;
  }
};

/* Load weather into localStorage once so weather section always has data */
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem(STORAGE_KEYS.WEATHER)) {
    localStorage.setItem(STORAGE_KEYS.WEATHER, JSON.stringify(MOCK_WEATHER));
  }
});
