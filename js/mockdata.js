/* ================================================================
   MODULE 5 — Mock Data
   mockdata.js — 20 Destinations, 15 Trips, 50 Expenses,
                 20 Favorites, 10 Weather Objects
   ================================================================ */

/* ===== 20 FLIGHTS ===== */
const MOCK_FLIGHTS = [
  { id: 1,  from: 'Paris',        fromCode: 'CDG', fromCountry: 'France',       to: 'San Francisco', toCode: 'SFO', toCountry: 'USA',         departure: '10:40', arrival: '12:55', duration: '11h 15min', airline: 'Air France',         flightClass: 'Economy',  price: 45567,  passengers: 2, sameDay: false, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80', weather: '+17°C' },
  { id: 2,  from: 'New York',     fromCode: 'JFK', fromCountry: 'USA',          to: 'London',        toCode: 'LHR', toCountry: 'UK',          departure: '22:15', arrival: '10:30', duration: '7h 15min',  airline: 'British Airways',    flightClass: 'Business', price: 156870, passengers: 1, sameDay: false, image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&q=80', weather: '+12°C' },
  { id: 3,  from: 'Dubai',        fromCode: 'DXB', fromCountry: 'UAE',          to: 'Tokyo',         toCode: 'NRT', toCountry: 'Japan',       departure: '03:20', arrival: '17:45', duration: '9h 25min',  airline: 'Emirates',           flightClass: 'Economy',  price: 56855,  passengers: 2, sameDay: true,  image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', weather: '+28°C' },
  { id: 4,  from: 'Sydney',       fromCode: 'SYD', fromCountry: 'Australia',    to: 'Singapore',     toCode: 'SIN', toCountry: 'Singapore',   departure: '08:00', arrival: '14:20', duration: '8h 20min',  airline: 'Qantas',             flightClass: 'Economy',  price: 34860,  passengers: 2, sameDay: true,  image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', weather: '+30°C' },
  { id: 5,  from: 'Los Angeles',  fromCode: 'LAX', fromCountry: 'USA',          to: 'Bali',          toCode: 'DPS', toCountry: 'Indonesia',   departure: '00:45', arrival: '09:15', duration: '17h 30min', airline: 'Singapore Airlines', flightClass: 'Economy',  price: 59760,  passengers: 1, sameDay: false, image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=600&q=80', weather: '+31°C' },
  { id: 6,  from: 'Rome',         fromCode: 'FCO', fromCountry: 'Italy',        to: 'Barcelona',     toCode: 'BCN', toCountry: 'Spain',       departure: '14:30', arrival: '16:25', duration: '1h 55min',  airline: 'Vueling',            flightClass: 'Economy',  price: 7387,   passengers: 2, sameDay: true,  image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80', weather: '+22°C' },
  { id: 7,  from: 'Amsterdam',    fromCode: 'AMS', fromCountry: 'Netherlands',  to: 'Istanbul',      toCode: 'IST', toCountry: 'Turkey',      departure: '06:50', arrival: '11:40', duration: '3h 50min',  airline: 'KLM',                flightClass: 'Business', price: 64740,  passengers: 1, sameDay: true,  image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80', weather: '+24°C' },
  { id: 8,  from: 'Bangkok',      fromCode: 'BKK', fromCountry: 'Thailand',     to: 'Maldives',      toCode: 'MLE', toCountry: 'Maldives',    departure: '19:10', arrival: '21:05', duration: '3h 55min',  airline: 'Thai Airways',       flightClass: 'Economy',  price: 25730,  passengers: 2, sameDay: true,  image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', weather: '+29°C' },
  { id: 9,  from: 'Mumbai',       fromCode: 'BOM', fromCountry: 'India',        to: 'Dubai',         toCode: 'DXB', toCountry: 'UAE',         departure: '15:20', arrival: '17:15', duration: '2h 55min',  airline: 'Air India',          flightClass: 'Economy',  price: 14525,  passengers: 3, sameDay: true,  image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80', weather: '+38°C' },
  { id: 10, from: 'Cape Town',    fromCode: 'CPT', fromCountry: 'South Africa', to: 'Nairobi',       toCode: 'NBO', toCountry: 'Kenya',       departure: '11:00', arrival: '16:35', duration: '5h 35min',  airline: 'Kenya Airways',      flightClass: 'Economy',  price: 23240,  passengers: 2, sameDay: true,  image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&q=80', weather: '+18°C' },
  { id: 11, from: 'Toronto',      fromCode: 'YYZ', fromCountry: 'Canada',       to: 'Mexico City',   toCode: 'MEX', toCountry: 'Mexico',      departure: '07:15', arrival: '12:40', duration: '5h 25min',  airline: 'Air Canada',         flightClass: 'Economy',  price: 24485,  passengers: 1, sameDay: true,  image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80', weather: '+20°C' },
  { id: 12, from: 'Hong Kong',    fromCode: 'HKG', fromCountry: 'Hong Kong',    to: 'Seoul',         toCode: 'ICN', toCountry: 'South Korea', departure: '13:30', arrival: '17:50', duration: '3h 20min',  airline: 'Cathay Pacific',     flightClass: 'Business', price: 53950,  passengers: 1, sameDay: true,  image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80', weather: '+15°C' },
  { id: 13, from: 'Berlin',       fromCode: 'BER', fromCountry: 'Germany',      to: 'Athens',        toCode: 'ATH', toCountry: 'Greece',      departure: '09:45', arrival: '13:35', duration: '2h 50min',  airline: 'Lufthansa',          flightClass: 'Economy',  price: 11620,  passengers: 2, sameDay: true,  image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80', weather: '+26°C' },
  { id: 14, from: 'Rio de Janeiro',fromCode: 'GIG', fromCountry: 'Brazil',      to: 'Buenos Aires',  toCode: 'EZE', toCountry: 'Argentina',   departure: '16:20', arrival: '19:45', duration: '3h 25min',  airline: 'LATAM',              flightClass: 'Economy',  price: 18260,  passengers: 2, sameDay: true,  image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&q=80', weather: '+22°C' },
  { id: 15, from: 'San Francisco', fromCode: 'SFO', fromCountry: 'USA',         to: 'Honolulu',      toCode: 'HNL', toCountry: 'Hawaii',      departure: '18:00', arrival: '21:15', duration: '5h 15min',  airline: 'United Airlines',    flightClass: 'Economy',  price: 31955,  passengers: 2, sameDay: true,  image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=600&q=80', weather: '+27°C' },
  { id: 16, from: 'Moscow',       fromCode: 'SVO', fromCountry: 'Russia',       to: 'Beijing',       toCode: 'PEK', toCountry: 'China',       departure: '01:35', arrival: '13:20', duration: '7h 45min',  airline: 'Aeroflot',           flightClass: 'Economy',  price: 32370,  passengers: 1, sameDay: true,  image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80', weather: '+10°C' },
  { id: 17, from: 'Zurich',       fromCode: 'ZRH', fromCountry: 'Switzerland',  to: 'Vienna',        toCode: 'VIE', toCountry: 'Austria',     departure: '12:10', arrival: '13:25', duration: '1h 15min',  airline: 'Swiss',              flightClass: 'Business', price: 26560,  passengers: 1, sameDay: true,  image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=80', weather: '+14°C' },
  { id: 18, from: 'Kuala Lumpur', fromCode: 'KUL', fromCountry: 'Malaysia',     to: 'Sydney',        toCode: 'SYD', toCountry: 'Australia',   departure: '21:30', arrival: '08:45', duration: '8h 15min',  airline: 'Malaysia Airlines',  flightClass: 'Economy',  price: 38180,  passengers: 2, sameDay: false, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80', weather: '+24°C' },
  { id: 19, from: 'Chicago',      fromCode: 'ORD', fromCountry: 'USA',          to: 'Miami',         toCode: 'MIA', toCountry: 'USA',         departure: '10:05', arrival: '14:20', duration: '3h 15min',  airline: 'American Airlines',  flightClass: 'Economy',  price: 14940,  passengers: 1, sameDay: true,  image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=600&q=80', weather: '+28°C' },
  { id: 20, from: 'Seoul',        fromCode: 'ICN', fromCountry: 'South Korea',  to: 'Los Angeles',   toCode: 'LAX', toCountry: 'USA',         departure: '12:50', arrival: '08:35', duration: '11h 45min', airline: 'Korean Air',         flightClass: 'Business', price: 136950, passengers: 1, sameDay: false, image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&q=80', weather: '+20°C' },
];

/* ===== 20 HOTELS ===== */
const MOCK_HOTELS = [
  { id: 1,  name: 'Grand Seaside Resort',          city: 'Miami',      country: 'USA',         rating: 4.8, price: 23240, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', desc: 'Luxurious beachfront resort with stunning ocean views, world-class dining, and premium amenities.', facilities: ['Pool', 'Beach Access', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Parking'] },
  { id: 2,  name: 'Tokyo Imperial Hotel',          city: 'Tokyo',      country: 'Japan',        rating: 4.9, price: 26560, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', desc: 'Elegant hotel in the heart of Tokyo with traditional Japanese hospitality and modern comfort.', facilities: ['Restaurant', 'Bar', 'Gym', 'WiFi', 'Conference Room', 'Garden', 'Spa'] },
  { id: 3,  name: 'Paradise Beach Villa',          city: 'Bali',       country: 'Indonesia',    rating: 4.7, price: 16185, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', desc: 'Tropical paradise villa with private pool, lush gardens, and authentic Balinese architecture.', facilities: ['Pool', 'Garden', 'Beach Access', 'Restaurant', 'Spa', 'WiFi', 'Airport Shuttle'] },
  { id: 4,  name: 'Alpine Mountain Lodge',         city: 'Interlaken', country: 'Switzerland',  rating: 4.9, price: 31540, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', desc: 'Cozy mountain lodge with breathtaking Alpine views, perfect for nature lovers and ski enthusiasts.', facilities: ['Restaurant', 'Bar', 'Ski Storage', 'Fireplace', 'WiFi', 'Parking', 'Sauna'] },
  { id: 5,  name: 'Dubai Skyline Towers',          city: 'Dubai',      country: 'UAE',          rating: 5.0, price: 37350, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', desc: 'Ultra-modern luxury hotel in downtown Dubai with panoramic city views and rooftop infinity pool.', facilities: ['Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'WiFi', 'Concierge', 'Parking'] },
  { id: 6,  name: 'Historic Paris Boutique',       city: 'Paris',      country: 'France',       rating: 4.6, price: 19920, image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80', desc: 'Charming boutique hotel in a historic Parisian building, steps away from the Eiffel Tower.', facilities: ['Restaurant', 'WiFi', 'Concierge', 'Bar', 'Garden', 'Room Service'] },
  { id: 7,  name: 'Santorini Sunset Suites',       city: 'Santorini',  country: 'Greece',       rating: 4.9, price: 29050, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', desc: 'Iconic white-washed cave suites with private terraces overlooking the stunning Aegean caldera.', facilities: ['Pool', 'Restaurant', 'WiFi', 'Spa', 'Jacuzzi', 'Breakfast Included'] },
  { id: 8,  name: 'Amazon Rainforest Lodge',       city: 'Manaus',     country: 'Brazil',       rating: 4.5, price: 14525, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', desc: 'Eco-friendly jungle lodge deep in the Amazon with guided nature tours and wildlife encounters.', facilities: ['Restaurant', 'Garden', 'Nature Tours', 'WiFi', 'Bar', 'Library'] },
  { id: 9,  name: 'Manhattan Plaza Hotel',         city: 'New York',   country: 'USA',          rating: 4.7, price: 24070, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', desc: 'Prime location hotel in the heart of Manhattan, walking distance to Times Square and Broadway.', facilities: ['Gym', 'Restaurant', 'Bar', 'WiFi', 'Concierge', 'Business Center', 'Parking'] },
  { id: 10, name: 'Maldives Water Bungalow',       city: 'Male',       country: 'Maldives',     rating: 5.0, price: 43160, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80', desc: 'Exclusive overwater bungalow with direct lagoon access, glass floors, and unparalleled privacy.', facilities: ['Pool', 'Beach Access', 'Spa', 'Restaurant', 'Water Sports', 'WiFi', 'Snorkeling'] },
  { id: 11, name: 'London Heritage Inn',           city: 'London',     country: 'UK',           rating: 4.6, price: 21995, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', desc: 'Classic British hotel with Victorian charm, afternoon tea service, and excellent transport links.', facilities: ['Restaurant', 'Bar', 'WiFi', 'Gym', 'Concierge', 'Business Center'] },
  { id: 12, name: 'Safari Desert Camp',            city: 'Nairobi',    country: 'Kenya',        rating: 4.8, price: 18260, image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=600&q=80', desc: 'Authentic safari camp with luxury tents, game drives, and unforgettable wildlife experiences.', facilities: ['Restaurant', 'Bar', 'Safari Tours', 'Campfire', 'WiFi', 'Garden'] },
  { id: 13, name: 'Sydney Harbour Hotel',          city: 'Sydney',     country: 'Australia',    rating: 4.7, price: 25730, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', desc: 'Modern waterfront hotel with stunning Opera House and Harbour Bridge views from every room.', facilities: ['Pool', 'Gym', 'Restaurant', 'Bar', 'Spa', 'WiFi', 'Parking'] },
  { id: 14, name: 'Kyoto Traditional Ryokan',      city: 'Kyoto',      country: 'Japan',        rating: 4.9, price: 23240, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80', desc: 'Authentic Japanese inn with tatami rooms, onsen baths, and traditional kaiseki dining.', facilities: ['Onsen Bath', 'Garden', 'Restaurant', 'WiFi', 'Tea Ceremony', 'Spa'] },
  { id: 15, name: 'Barcelona Beach House',         city: 'Barcelona',  country: 'Spain',        rating: 4.5, price: 15770, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', desc: 'Modern beachside hotel with rooftop terrace bar, steps from Barceloneta Beach and Las Ramblas.', facilities: ['Pool', 'Beach Access', 'Restaurant', 'Bar', 'WiFi', 'Gym'] },
  { id: 16, name: 'Iceland Northern Lights Lodge', city: 'Reykjavik',  country: 'Iceland',      rating: 4.8, price: 24485, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', desc: 'Remote lodge with glass-roofed rooms designed for optimal aurora viewing and geothermal spa.', facilities: ['Spa', 'Restaurant', 'WiFi', 'Sauna', 'Aurora Tours', 'Fireplace'] },
  { id: 17, name: 'Rome Colosseum Suites',         city: 'Rome',       country: 'Italy',        rating: 4.7, price: 21165, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80', desc: 'Elegant suites with Colosseum views, Italian marble bathrooms, and authentic Roman hospitality.', facilities: ['Restaurant', 'Bar', 'WiFi', 'Concierge', 'Breakfast Included', 'Terrace'] },
  { id: 18, name: 'Singapore Marina Bay Hotel',    city: 'Singapore',  country: 'Singapore',    rating: 5.0, price: 34860, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', desc: 'Iconic hotel with rooftop infinity pool, stunning skyline views, and world-class dining options.', facilities: ['Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'WiFi', 'Casino', 'Shopping'] },
  { id: 19, name: 'Morocco Riad Palace',           city: 'Marrakech',  country: 'Morocco',      rating: 4.6, price: 13695, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', desc: 'Traditional Moroccan riad with ornate tile work, courtyard fountain, and rooftop terrace.', facilities: ['Pool', 'Garden', 'Restaurant', 'WiFi', 'Hammam', 'Terrace'] },
  { id: 20, name: 'Canadian Mountain Retreat',     city: 'Banff',      country: 'Canada',       rating: 4.8, price: 22410, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', desc: 'Rustic luxury resort in the Canadian Rockies with hiking trails, hot springs, and mountain views.', facilities: ['Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'WiFi', 'Hiking', 'Parking'] },
];

/* ===== CITY FAMOUS PLACES ===== */
const MOCK_CITY_PLACES = {
  Paris: [
    { id: 1, name: 'Eiffel Tower', type: 'Landmark', rating: 4.9, price: 2490, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80', desc: 'Iconic iron lattice tower with panoramic city views.' },
    { id: 2, name: 'Louvre Museum', type: 'Museum', rating: 4.8, price: 1826, image: 'https://images.unsplash.com/photo-1549144511-f099eac38c67?w=600&q=80', desc: 'World\'s largest art museum — home to the Mona Lisa.' },
    { id: 3, name: 'Notre-Dame Cathedral', type: 'Heritage', rating: 4.7, price: 0, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', desc: 'Gothic masterpiece on the Île de la Cité.' },
    { id: 4, name: 'Montmartre & Sacré-Cœur', type: 'Scenic', rating: 4.8, price: 0, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', desc: 'Artists\' quarter with hilltop basilica and city views.' },
  ],
  Rome: [
    { id: 1, name: 'Colosseum', type: 'Landmark', rating: 4.9, price: 1660, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80', desc: 'Ancient amphitheatre — symbol of Imperial Rome.' },
    { id: 2, name: 'Vatican Museums', type: 'Museum', rating: 4.8, price: 2075, image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80', desc: 'Sistine Chapel and priceless Renaissance art.' },
    { id: 3, name: 'Trevi Fountain', type: 'Landmark', rating: 4.7, price: 0, image: 'https://images.unsplash.com/photo-1529260830195-0031076ff735?w=600&q=80', desc: 'Baroque fountain — toss a coin for good luck.' },
    { id: 4, name: 'Roman Forum', type: 'Heritage', rating: 4.6, price: 1245, image: 'https://images.unsplash.com/photo-1525874685865-d9ffeb975113?w=600&q=80', desc: 'Ruins of ancient Rome\'s political and social heart.' },
  ],
  Barcelona: [
    { id: 1, name: 'Sagrada Familia', type: 'Landmark', rating: 4.9, price: 2158, image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80', desc: 'Gaudí\'s unfinished basilica — a UNESCO wonder.' },
    { id: 2, name: 'Park Güell', type: 'Park', rating: 4.7, price: 830, image: 'https://images.unsplash.com/photo-1583422409519-3200b89e7af4?w=600&q=80', desc: 'Whimsical mosaic park with Mediterranean views.' },
    { id: 3, name: 'La Rambla', type: 'Street', rating: 4.5, price: 0, image: 'https://images.unsplash.com/photo-1583422409519-3200b89e7af4?w=600&q=80', desc: 'Vibrant tree-lined boulevard in the heart of the city.' },
    { id: 4, name: 'Barceloneta Beach', type: 'Beach', rating: 4.6, price: 0, image: 'https://images.unsplash.com/photo-1558642452-9d2ab7c1f266?w=600&q=80', desc: 'Golden sand beach steps from the city centre.' },
  ],
  Amsterdam: [
    { id: 1, name: 'Anne Frank House', type: 'Museum', rating: 4.8, price: 1245, image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=600&q=80', desc: 'Moving museum in the secret annex where Anne Frank hid.' },
    { id: 2, name: 'Van Gogh Museum', type: 'Museum', rating: 4.9, price: 2075, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', desc: 'Largest collection of Van Gogh paintings in the world.' },
    { id: 3, name: 'Canal Cruise', type: 'Experience', rating: 4.7, price: 1660, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96fdad6?w=600&q=80', desc: 'Scenic boat ride through UNESCO-listed canals.' },
    { id: 4, name: 'Rijksmuseum', type: 'Museum', rating: 4.8, price: 2075, image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80', desc: 'Dutch Golden Age masterpieces including Rembrandt.' },
  ],
  London: [
    { id: 1, name: 'Big Ben & Westminster', type: 'Landmark', rating: 4.8, price: 0, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80', desc: 'Iconic clock tower and Houses of Parliament.' },
    { id: 2, name: 'British Museum', type: 'Museum', rating: 4.7, price: 0, image: 'https://images.unsplash.com/photo-1529655683829-aba272195f69?w=600&q=80', desc: 'World-class collection spanning human history.' },
    { id: 3, name: 'Tower of London', type: 'Heritage', rating: 4.6, price: 2490, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80', desc: 'Historic castle and home of the Crown Jewels.' },
    { id: 4, name: 'London Eye', type: 'Experience', rating: 4.5, price: 2324, image: 'https://images.unsplash.com/photo-1529655683829-aba272195f69?w=600&q=80', desc: 'Giant observation wheel on the South Bank.' },
  ],
  Tokyo: [
    { id: 1, name: 'Senso-ji Temple', type: 'Temple', rating: 4.8, price: 0, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', desc: 'Tokyo\'s oldest temple in historic Asakusa.' },
    { id: 2, name: 'Shibuya Crossing', type: 'Landmark', rating: 4.7, price: 0, image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80', desc: 'World\'s busiest pedestrian scramble intersection.' },
    { id: 3, name: 'teamLab Planets', type: 'Experience', rating: 4.9, price: 2656, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', desc: 'Immersive digital art museum experience.' },
    { id: 4, name: 'Meiji Shrine', type: 'Shrine', rating: 4.8, price: 0, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', desc: 'Serene Shinto shrine surrounded by forest.' },
  ],
  Bali: [
    { id: 1, name: 'Tanah Lot Temple', type: 'Temple', rating: 4.8, price: 1245, image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=600&q=80', desc: 'Sea temple perched on a rock — stunning at sunset.' },
    { id: 2, name: 'Tegallalang Rice Terraces', type: 'Scenic', rating: 4.7, price: 415, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', desc: 'Lush green terraces in Ubud countryside.' },
    { id: 3, name: 'Uluwatu Temple', type: 'Temple', rating: 4.8, price: 830, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80', desc: 'Clifftop temple with Kecak fire dance performances.' },
    { id: 4, name: 'Sacred Monkey Forest', type: 'Nature', rating: 4.6, price: 580, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', desc: 'Ubud sanctuary home to hundreds of macaques.' },
  ],
  'Taj Mahal': [
    { id: 1, name: 'Taj Mahal', type: 'Landmark', rating: 4.9, price: 1245, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80', desc: 'White marble mausoleum — one of the Seven Wonders.' },
    { id: 2, name: 'Agra Fort', type: 'Heritage', rating: 4.7, price: 580, image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80', desc: 'Mughal red sandstone fortress overlooking the Yamuna.' },
    { id: 3, name: 'Mehtab Bagh', type: 'Garden', rating: 4.6, price: 250, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80', desc: 'Moonlight garden with Taj Mahal river views.' },
    { id: 4, name: 'Fatehpur Sikri', type: 'Heritage', rating: 4.5, price: 580, image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80', desc: 'Abandoned Mughal city — UNESCO World Heritage Site.' },
  ],
  Singapore: [
    { id: 1, name: 'Marina Bay Sands', type: 'Landmark', rating: 4.8, price: 1909, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', desc: 'Iconic rooftop infinity pool and skyline views.' },
    { id: 2, name: 'Gardens by the Bay', type: 'Nature', rating: 4.9, price: 1245, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', desc: 'Supertree Grove and climate-controlled domes.' },
    { id: 3, name: 'Sentosa Island', type: 'Resort', rating: 4.6, price: 1660, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80', desc: 'Beach resort island with Universal Studios.' },
    { id: 4, name: 'Chinatown Heritage Centre', type: 'Museum', rating: 4.5, price: 830, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', desc: 'Living museum of Singapore\'s immigrant history.' },
  ],
  'Cape Town': [
    { id: 1, name: 'Table Mountain', type: 'Nature', rating: 4.9, price: 2905, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80', desc: 'Cable car to flat-topped mountain with 360° views.' },
    { id: 2, name: 'Cape of Good Hope', type: 'Scenic', rating: 4.7, price: 1660, image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&q=80', desc: 'Dramatic cliffs at Africa\'s southwestern tip.' },
    { id: 3, name: 'V&A Waterfront', type: 'Entertainment', rating: 4.6, price: 0, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80', desc: 'Harbourfront shopping, dining and entertainment hub.' },
    { id: 4, name: 'Boulders Beach Penguins', type: 'Wildlife', rating: 4.8, price: 1245, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80', desc: 'Colony of African penguins on a sheltered beach.' },
  ],
  Marrakech: [
    { id: 1, name: 'Jemaa el-Fnaa', type: 'Market', rating: 4.7, price: 0, image: 'https://images.unsplash.com/photo-1597212618440-806262de4f2b?w=600&q=80', desc: 'Bustling square with food stalls, performers and souks.' },
    { id: 2, name: 'Bahia Palace', type: 'Heritage', rating: 4.6, price: 580, image: 'https://images.unsplash.com/photo-1597212618440-806262de4f2b?w=600&q=80', desc: '19th-century palace with ornate courtyards and tiles.' },
    { id: 3, name: 'Majorelle Garden', type: 'Garden', rating: 4.8, price: 830, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', desc: 'Vibrant blue garden designed by Yves Saint Laurent.' },
    { id: 4, name: 'Sahara Desert Trip', type: 'Adventure', rating: 4.9, price: 9960, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80', desc: 'Overnight camel trek and desert camp under the stars.' },
  ],
  'New York': [
    { id: 1, name: 'Statue of Liberty', type: 'Landmark', rating: 4.8, price: 2075, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80', desc: 'Symbol of freedom on Liberty Island.' },
    { id: 2, name: 'Central Park', type: 'Park', rating: 4.9, price: 0, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80', desc: '843-acre urban oasis in the heart of Manhattan.' },
    { id: 3, name: 'Times Square', type: 'Landmark', rating: 4.5, price: 0, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80', desc: 'Neon-lit crossroads — the city that never sleeps.' },
    { id: 4, name: 'Empire State Building', type: 'Landmark', rating: 4.7, price: 2490, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80', desc: 'Art Deco skyscraper with iconic observation decks.' },
  ],
  'Machu Picchu': [
    { id: 1, name: 'Machu Picchu Citadel', type: 'Heritage', rating: 4.9, price: 4150, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80', desc: 'Incan citadel set high in the Andes mountains.' },
    { id: 2, name: 'Huayna Picchu', type: 'Adventure', rating: 4.8, price: 2490, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80', desc: 'Steep hike to the peak overlooking the ruins.' },
    { id: 3, name: 'Sacred Valley', type: 'Scenic', rating: 4.7, price: 3320, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80', desc: 'Inca ruins and Andean villages between Cusco and Machu Picchu.' },
    { id: 4, name: 'Inca Trail', type: 'Adventure', rating: 4.9, price: 12450, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80', desc: 'Classic 4-day trek through cloud forest to the citadel.' },
  ],
  Dubai: [
    { id: 1, name: 'Burj Khalifa', type: 'Landmark', rating: 4.9, price: 3735, image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80', desc: 'World\'s tallest building — At the Top observation deck.' },
    { id: 2, name: 'Desert Safari', type: 'Adventure', rating: 4.8, price: 9960, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80', desc: 'Dune bashing, camel rides and Bedouin camp dinner.' },
    { id: 3, name: 'Dubai Mall & Fountain', type: 'Entertainment', rating: 4.7, price: 0, image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80', desc: 'Massive mall with dancing fountain show at Burj Lake.' },
    { id: 4, name: 'Palm Jumeirah', type: 'Landmark', rating: 4.6, price: 0, image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80', desc: 'Man-made palm-shaped island with luxury resorts.' },
  ],
  Maldives: [
    { id: 1, name: 'Snorkelling House Reef', type: 'Water Sports', rating: 4.9, price: 3320, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', desc: 'Crystal-clear lagoon teeming with tropical fish.' },
    { id: 2, name: 'Sandbank Picnic', type: 'Experience', rating: 4.8, price: 7470, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', desc: 'Private sandbank escape in the Indian Ocean.' },
    { id: 3, name: 'Dolphin Sunset Cruise', type: 'Experience', rating: 4.7, price: 4980, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', desc: 'Evening boat ride to spot spinner dolphins.' },
    { id: 4, name: 'Underwater Restaurant', type: 'Dining', rating: 4.8, price: 16600, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80', desc: 'Dine surrounded by marine life below the surface.' },
  ],
  Sydney: [
    { id: 1, name: 'Sydney Opera House', type: 'Landmark', rating: 4.9, price: 2075, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80', desc: 'Architectural icon on Bennelong Point harbour.' },
    { id: 2, name: 'Harbour Bridge Climb', type: 'Adventure', rating: 4.8, price: 12450, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80', desc: 'Guided climb to the summit of the coathanger bridge.' },
    { id: 3, name: 'Bondi Beach', type: 'Beach', rating: 4.7, price: 0, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80', desc: 'World-famous surf beach and coastal walk.' },
    { id: 4, name: 'Taronga Zoo', type: 'Wildlife', rating: 4.6, price: 3320, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80', desc: 'Harbour-side zoo with native Australian animals.' },
  ],
  Santorini: [
    { id: 1, name: 'Oia Sunset Viewpoint', type: 'Scenic', rating: 4.9, price: 0, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', desc: 'World-famous sunset over the caldera and blue domes.' },
    { id: 2, name: 'Red Beach', type: 'Beach', rating: 4.6, price: 0, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', desc: 'Dramatic volcanic red sand beach near Akrotiri.' },
    { id: 3, name: 'Akrotiri Ruins', type: 'Heritage', rating: 4.7, price: 1245, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', desc: 'Bronze Age Minoan settlement preserved by volcanic ash.' },
    { id: 4, name: 'Catamaran Cruise', type: 'Experience', rating: 4.8, price: 7470, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', desc: 'Sail the caldera with swim stops and onboard BBQ.' },
  ],
  Kyoto: [
    { id: 1, name: 'Fushimi Inari Shrine', type: 'Shrine', rating: 4.9, price: 0, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', desc: 'Thousands of vermillion torii gates up the mountain.' },
    { id: 2, name: 'Arashiyama Bamboo Grove', type: 'Nature', rating: 4.8, price: 0, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', desc: 'Towering bamboo forest path in western Kyoto.' },
    { id: 3, name: 'Kinkaku-ji (Golden Pavilion)', type: 'Temple', rating: 4.7, price: 415, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', desc: 'Zen temple covered in gold leaf beside a mirror pond.' },
    { id: 4, name: 'Gion District', type: 'Culture', rating: 4.6, price: 0, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', desc: 'Historic geisha quarter with traditional teahouses.' },
  ],
  'Rio de Janeiro': [
    { id: 1, name: 'Christ the Redeemer', type: 'Landmark', rating: 4.9, price: 1660, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80', desc: 'Art Deco statue atop Corcovado mountain.' },
    { id: 2, name: 'Sugarloaf Mountain', type: 'Scenic', rating: 4.8, price: 2905, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80', desc: 'Cable car to granite peak with panoramic bay views.' },
    { id: 3, name: 'Copacabana Beach', type: 'Beach', rating: 4.7, price: 0, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80', desc: 'Legendary 4 km crescent beach with black-and-white promenade.' },
    { id: 4, name: 'Selarón Steps', type: 'Landmark', rating: 4.6, price: 0, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80', desc: 'Colourful mosaic tile staircase in Santa Teresa.' },
  ],
  Istanbul: [
    { id: 1, name: 'Hagia Sophia', type: 'Heritage', rating: 4.9, price: 830, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80', desc: 'Byzantine masterpiece turned mosque with massive dome.' },
    { id: 2, name: 'Blue Mosque', type: 'Mosque', rating: 4.8, price: 0, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80', desc: 'Ottoman mosque famed for its six minarets and blue tiles.' },
    { id: 3, name: 'Grand Bazaar', type: 'Market', rating: 4.7, price: 0, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80', desc: 'One of the world\'s oldest and largest covered markets.' },
    { id: 4, name: 'Bosphorus Cruise', type: 'Experience', rating: 4.8, price: 1660, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80', desc: 'Boat tour along the strait dividing Europe and Asia.' },
  ],
};

/* ===== RENTAL OPTIONS (Bike & Car) ===== */
const MOCK_RENTALS = [
  { id: 1, name: 'City Scooter', type: 'Bike', vehicle: '125cc Scooter', price: 800, rating: 4.5, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', desc: 'Perfect for city exploring — helmet included.' },
  { id: 2, name: 'Mountain Bike', type: 'Bike', vehicle: 'MTB', price: 600, rating: 4.6, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80', desc: 'Trail-ready bike for parks and countryside rides.' },
  { id: 3, name: 'Electric Bike', type: 'Bike', vehicle: 'E-Bike', price: 1200, rating: 4.8, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80', desc: 'Effortless sightseeing with pedal-assist technology.' },
  { id: 4, name: 'Economy Car', type: 'Car', vehicle: 'Hatchback', price: 2500, rating: 4.4, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80', desc: 'Fuel-efficient compact car for 4 passengers.' },
  { id: 5, name: 'SUV Rental', type: 'Car', vehicle: 'SUV', price: 4500, rating: 4.7, image: 'https://images.unsplash.com/photo-1519641471654-76ecead37a40?w=600&q=80', desc: 'Spacious SUV for family trips and long drives.' },
  { id: 6, name: 'Convertible', type: 'Car', vehicle: 'Convertible', price: 6500, rating: 4.9, image: 'https://images.unsplash.com/photo-1494976388531-d105849445bf?w=600&q=80', desc: 'Open-top luxury drive along coastal roads.' },
];

/* ===== 20 DESTINATIONS ===== */
const MOCK_DESTINATIONS = [
  { id: 1,  name: 'Paris',          country: 'France',       category: 'europe',     days: 7,  price: 232400, rating: 4.9, trending: true,  image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80', desc: 'The city of love, art, and iconic landmarks like the Eiffel Tower.' },
  { id: 2,  name: 'Rome',           country: 'Italy',        category: 'europe',     days: 6,  price: 182600, rating: 4.8, trending: true,  image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&q=80', desc: 'Eternal city filled with ancient history and world-class cuisine.' },
  { id: 3,  name: 'Barcelona',      country: 'Spain',        category: 'europe',     days: 5,  price: 157700, rating: 4.7, trending: false, image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80', desc: 'Vibrant city with stunning Gaudi architecture and beach life.' },
  { id: 4,  name: 'Amsterdam',      country: 'Netherlands',  category: 'europe',     days: 4,  price: 141100, rating: 4.6, trending: false, image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=500&q=80', desc: 'Beautiful canals, world-class museums, and tulip fields.' },
  { id: 5,  name: 'London',         country: 'UK',           category: 'europe',     days: 8,  price: 290500, rating: 4.8, trending: true,  image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80', desc: 'Royal history meets modern culture in this iconic metropolis.' },
  { id: 6,  name: 'Tokyo',          country: 'Japan',        category: 'asia',       days: 10, price: 315400, rating: 4.9, trending: true,  image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80', desc: 'A futuristic metropolis blending deep tradition with innovation.' },
  { id: 7,  name: 'Bali',           country: 'Indonesia',    category: 'asia',       days: 7,  price: 116200, rating: 4.7, trending: true,  image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=500&q=80', desc: 'Tropical paradise with stunning temples, terraces and beaches.' },
  { id: 8,  name: 'Taj Mahal',      country: 'India',        category: 'asia',       days: 5,  price: 82170,  rating: 4.8, trending: false, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80', desc: 'One of the world\'s greatest wonders of human achievement.' },
  { id: 9,  name: 'Singapore',      country: 'Singapore',    category: 'asia',       days: 5,  price: 199200, rating: 4.7, trending: false, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&q=80', desc: 'Ultra-modern city with amazing food, gardens, and nightlife.' },
  { id: 10, name: 'Cape Town',      country: 'South Africa', category: 'africa',     days: 8,  price: 174300, rating: 4.8, trending: true,  image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&q=80', desc: 'Stunning Table Mountain, beaches, and incredible safari.' },
  { id: 11, name: 'Marrakech',      country: 'Morocco',      category: 'africa',     days: 5,  price: 99600,  rating: 4.6, trending: false, image: 'https://images.unsplash.com/photo-1597212618440-806262de4f2b?w=500&q=80', desc: 'Exotic souks, riads, and doorway to the Sahara desert.' },
  { id: 12, name: 'New York',       country: 'USA',          category: 'americas',   days: 7,  price: 265600, rating: 4.8, trending: true,  image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80', desc: 'The city that never sleeps — iconic skyline and endless energy.' },
  { id: 13, name: 'Machu Picchu',   country: 'Peru',         category: 'americas',   days: 6,  price: 215800, rating: 4.9, trending: false, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80', desc: 'Ancient Incan citadel set dramatically in the Andes mountains.' },
  { id: 14, name: 'Dubai',          country: 'UAE',          category: 'middleeast', days: 6,  price: 257300, rating: 4.7, trending: true,  image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&q=80', desc: 'Luxury skyscrapers, desert safaris, and world-record attractions.' },
  { id: 15, name: 'Maldives',       country: 'Maldives',     category: 'asia',       days: 7,  price: 348600, rating: 4.9, trending: true,  image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80', desc: 'Crystal-clear waters and dreamy overwater bungalows.' },
  { id: 16, name: 'Sydney',         country: 'Australia',    category: 'americas',   days: 9,  price: 332000, rating: 4.8, trending: false, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&q=80', desc: 'Opera House, Harbour Bridge, and golden beaches.' },
  { id: 17, name: 'Santorini',      country: 'Greece',       category: 'europe',     days: 5,  price: 240700, rating: 4.9, trending: true,  image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80', desc: 'Iconic white-washed buildings and breathtaking Aegean sunsets.' },
  { id: 18, name: 'Kyoto',          country: 'Japan',        category: 'asia',       days: 6,  price: 224100, rating: 4.8, trending: false, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80', desc: 'Ancient temples, geisha districts, and stunning bamboo groves.' },
  { id: 19, name: 'Rio de Janeiro', country: 'Brazil',       category: 'americas',   days: 7,  price: 190900, rating: 4.6, trending: false, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&q=80', desc: 'Christ the Redeemer, Carnival, and legendary Copacabana beach.' },
  { id: 20, name: 'Istanbul',       country: 'Turkey',       category: 'middleeast', days: 6,  price: 149400, rating: 4.7, trending: true,  image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500&q=80', desc: 'Where East meets West — stunning mosques, bazaars and Bosphorus.' },
];

/* ===== 15 TRIPS ===== */
const MOCK_TRIPS = [
  { id: 101, name: 'Paris Honeymoon',        dest: 'Paris, France',          type: 'Leisure',   start: '2026-08-10', end: '2026-08-17', budget: 456500,  travelers: 2, notes: 'Anniversary trip — book La Seine restaurant.', savedAt: 'Jul 1, 2026',  days: [ { dayNum:1, date:'Mon, Aug 10', activities:[{name:'Arrive CDG, check in hotel',cost:0},{name:'Eiffel Tower evening visit',cost:2490}] }, { dayNum:2, date:'Tue, Aug 11', activities:[{name:'Louvre Museum',cost:1826},{name:'Seine River Cruise',cost:1245}] }, { dayNum:3, date:'Wed, Aug 12', activities:[{name:'Versailles Day Trip',cost:3320}] } ] },
  { id: 102, name: 'Tokyo Explorer',          dest: 'Tokyo, Japan',           type: 'Adventure', start: '2026-09-05', end: '2026-09-15', budget: 498000,  travelers: 1, notes: 'Try Tsukiji market and teamLab Borderless.', savedAt: 'Jun 28, 2026', days: [ { dayNum:1, date:'Sat, Sep 5',  activities:[{name:'Arrival & Shinjuku stroll',cost:0}] }, { dayNum:2, date:'Sun, Sep 6',  activities:[{name:'Senso-ji Temple, Asakusa',cost:0},{name:'Tsukiji outer market',cost:2075}] }, { dayNum:3, date:'Mon, Sep 7',  activities:[{name:'teamLab Borderless',cost:2656}] } ] },
  { id: 103, name: 'Bali Retreat',            dest: 'Bali, Indonesia',        type: 'Leisure',   start: '2026-07-20', end: '2026-07-27', budget: 232400,  travelers: 2, notes: 'Stay at Ubud Rice Terrace villa.', savedAt: 'Jun 25, 2026',           days: [ { dayNum:1, date:'Mon, Jul 20', activities:[{name:'Arrive, rice terrace walk',cost:0}] }, { dayNum:2, date:'Tue, Jul 21', activities:[{name:'Tanah Lot Temple',cost:1245},{name:'Cooking class',cost:2905}] } ] },
  { id: 104, name: 'European Grand Tour',     dest: 'Full Europe',            type: 'Cultural',  start: '2026-10-01', end: '2026-10-18', budget: 788500,  travelers: 2, notes: 'Rome → Florence → Venice → Paris → London.', savedAt: 'Jun 20, 2026',   days: [ { dayNum:1, date:'Thu, Oct 1',  activities:[{name:'Arrive Rome, Colosseum',cost:1660}] }, { dayNum:2, date:'Fri, Oct 2',  activities:[{name:'Vatican Museums',cost:2075},{name:'Trevi Fountain',cost:0}] } ] },
  { id: 105, name: 'Dubai Luxury Break',      dest: 'Dubai, UAE',             type: 'Leisure',   start: '2026-12-20', end: '2026-12-26', budget: 581000,  travelers: 3, notes: 'Burj Khalifa At the Top + desert safari booked.', savedAt: 'Jun 18, 2026',  days: [ { dayNum:1, date:'Sun, Dec 20', activities:[{name:'Arrive, Burj Khalifa',cost:3735}] }, { dayNum:2, date:'Mon, Dec 21', activities:[{name:'Dubai Mall & Fountain',cost:0},{name:'Desert Safari',cost:9960}] } ] },
  { id: 106, name: 'Maldives Escape',         dest: 'Maldives',               type: 'Leisure',   start: '2027-01-15', end: '2027-01-22', budget: 705500,  travelers: 2, notes: 'Overwater bungalow — Veligandu Resort.', savedAt: 'Jun 15, 2026',          days: [ { dayNum:1, date:'Thu, Jan 15', activities:[{name:'Seaplane transfer, check-in',cost:16600}] }, { dayNum:2, date:'Fri, Jan 16', activities:[{name:'Snorkelling & coral reef',cost:3320}] } ] },
  { id: 107, name: 'Santorini Sunset',        dest: 'Santorini, Greece',      type: 'Leisure',   start: '2026-09-12', end: '2026-09-17', budget: 348600,  travelers: 2, notes: 'Watch sunset from Oia — book early!', savedAt: 'Jun 12, 2026',              days: [ { dayNum:1, date:'Sat, Sep 12', activities:[{name:'Arrive Thira, Fira walk',cost:0}] }, { dayNum:2, date:'Sun, Sep 13', activities:[{name:'Oia village & Blue Dome',cost:0},{name:'Catamaran sunset cruise',cost:7470}] } ] },
  { id: 108, name: 'Cape Town Safari',        dest: 'Cape Town, South Africa', type: 'Adventure', start: '2026-08-25', end: '2027-09-01', budget: 431600,  travelers: 4, notes: 'Table Mountain cable car + Kruger day trip.', savedAt: 'Jun 10, 2026',    days: [ { dayNum:1, date:'Tue, Aug 25', activities:[{name:'Arrive, V&A Waterfront',cost:0}] }, { dayNum:2, date:'Wed, Aug 26', activities:[{name:'Table Mountain Cable Car',cost:2905},{name:'Boulders Penguin Colony',cost:1245}] } ] },
  { id: 109, name: 'Kyoto Culture Trip',      dest: 'Kyoto, Japan',           type: 'Cultural',  start: '2026-11-10', end: '2026-11-16', budget: 315400,  travelers: 1, notes: 'Autumn maple leaves season — Arashiyama bamboo.', savedAt: 'Jun 8, 2026',    days: [ { dayNum:1, date:'Tue, Nov 10', activities:[{name:'Fushimi Inari Shrine',cost:0}] }, { dayNum:2, date:'Wed, Nov 11', activities:[{name:'Arashiyama Bamboo Grove',cost:0},{name:'Tea ceremony',cost:2324}] } ] },
  { id: 110, name: 'New York City Break',     dest: 'New York, USA',          type: 'Adventure', start: '2026-11-25', end: '2026-12-02', budget: 398400,  travelers: 2, notes: 'Times Square New Year prep, Central Park, MoMA.', savedAt: 'Jun 5, 2026',   days: [ { dayNum:1, date:'Wed, Nov 25', activities:[{name:'Arrive JFK, Times Square',cost:0}] }, { dayNum:2, date:'Thu, Nov 26', activities:[{name:'Central Park walk',cost:0},{name:'MoMA Museum',cost:2075}] } ] },
  { id: 111, name: 'Marrakech Adventure',     dest: 'Marrakech, Morocco',     type: 'Adventure', start: '2026-10-15', end: '2026-10-20', budget: 149400,  travelers: 2, notes: 'Medina souks, hammam, and Sahara day trip.', savedAt: 'Jun 3, 2026',          days: [ { dayNum:1, date:'Thu, Oct 15', activities:[{name:'Arrive, Djemaa el-Fna',cost:0}] }, { dayNum:2, date:'Fri, Oct 16', activities:[{name:'Medina souk tour',cost:0},{name:'Hammam spa',cost:1660}] } ] },
  { id: 112, name: 'Singapore City Sprint',   dest: 'Singapore',              type: 'Business',  start: '2026-08-01', end: '2026-08-06', budget: 290500,  travelers: 1, notes: 'Conference on Day 1 & 2. Marina Bay Sands rooftop.', savedAt: 'May 30, 2026', days: [ { dayNum:1, date:'Sat, Aug 1',  activities:[{name:'Arrive, Gardens by the Bay',cost:1245}] }, { dayNum:2, date:'Sun, Aug 2',  activities:[{name:'Marina Bay Sands SkyPark',cost:1909}] } ] },
  { id: 113, name: 'Istanbul Discovery',      dest: 'Istanbul, Turkey',       type: 'Cultural',  start: '2026-09-20', end: '2026-09-26', budget: 215800,  travelers: 2, notes: 'Hagia Sophia, Grand Bazaar and Bosphorus cruise.', savedAt: 'May 28, 2026',   days: [ { dayNum:1, date:'Sun, Sep 20', activities:[{name:'Arrive, Sultanahmet square',cost:0}] }, { dayNum:2, date:'Mon, Sep 21', activities:[{name:'Hagia Sophia & Blue Mosque',cost:0},{name:'Grand Bazaar shopping',cost:4150}] } ] },
  { id: 114, name: 'Rio Carnival Prep',       dest: 'Rio de Janeiro, Brazil', type: 'Adventure', start: '2027-02-20', end: '2027-02-27', budget: 323700,  travelers: 3, notes: 'Book samba show tickets in advance.', savedAt: 'May 25, 2026',                days: [ { dayNum:1, date:'Fri, Feb 20', activities:[{name:'Arrive, Copacabana beach',cost:0}] }, { dayNum:2, date:'Sat, Feb 21', activities:[{name:'Christ the Redeemer',cost:1660},{name:'Sugarloaf Mountain',cost:2905}] } ] },
  { id: 115, name: 'Barcelona Weekend',       dest: 'Barcelona, Spain',       type: 'Leisure',   start: '2026-07-10', end: '2026-07-15', budget: 182600,  travelers: 2, notes: 'Sagrada Familia tickets must be pre-booked!', savedAt: 'May 20, 2026',          days: [ { dayNum:1, date:'Fri, Jul 10', activities:[{name:'Arrive, La Rambla walk',cost:0}] }, { dayNum:2, date:'Sat, Jul 11', activities:[{name:'Sagrada Familia',cost:2158},{name:'Park Güell',cost:830}] } ] },
];

/* ===== 50 EXPENSES ===== */
const MOCK_EXPENSES = [
  /* Paris Honeymoon (tripId: 101) */
  { id: 201, tripId: 101, category: 'Flights',        amount: 99600,  desc: 'Return flights CDG',          date: '2026-08-10' },
  { id: 202, tripId: 101, category: 'Accommodation',  amount: 116200, desc: 'Hotel 7 nights',              date: '2026-08-10' },
  { id: 203, tripId: 101, category: 'Food',           amount: 34860,  desc: 'Restaurants & cafés',         date: '2026-08-11' },
  { id: 204, tripId: 101, category: 'Activities',     amount: 18260,  desc: 'Eiffel, Louvre, Versailles',  date: '2026-08-12' },
  { id: 205, tripId: 101, category: 'Transport',      amount: 14940,  desc: 'Metro & taxis',               date: '2026-08-10' },
  /* Tokyo Explorer (tripId: 102) */
  { id: 206, tripId: 102, category: 'Flights',        amount: 124500, desc: 'Return flights NRT',          date: '2026-09-05' },
  { id: 207, tripId: 102, category: 'Accommodation',  amount: 91300,  desc: 'Capsule & ryokan mix',        date: '2026-09-05' },
  { id: 208, tripId: 102, category: 'Food',           amount: 49800,  desc: 'Ramen, sushi, izakaya',       date: '2026-09-06' },
  { id: 209, tripId: 102, category: 'Activities',     amount: 26560,  desc: 'teamLab, temples, day trips', date: '2026-09-07' },
  { id: 210, tripId: 102, category: 'Shopping',       amount: 39840,  desc: 'Akihabara & Harajuku',        date: '2026-09-09' },
  /* Bali Retreat (tripId: 103) */
  { id: 211, tripId: 103, category: 'Flights',        amount: 66400,  desc: 'Return flights DPS',          date: '2026-07-20' },
  { id: 212, tripId: 103, category: 'Accommodation',  amount: 58100,  desc: 'Villa 7 nights',              date: '2026-07-20' },
  { id: 213, tripId: 103, category: 'Food',           amount: 23240,  desc: 'Warungs and restaurants',     date: '2026-07-21' },
  { id: 214, tripId: 103, category: 'Activities',     amount: 16600,  desc: 'Temple visits, cooking class',date: '2026-07-22' },
  { id: 215, tripId: 103, category: 'Transport',      amount: 8300,   desc: 'Scooter rental',              date: '2026-07-20' },
  /* European Grand Tour (tripId: 104) */
  { id: 216, tripId: 104, category: 'Flights',        amount: 166000, desc: 'Flights + Eurail pass',       date: '2026-10-01' },
  { id: 217, tripId: 104, category: 'Accommodation',  amount: 232400, desc: 'Hotels 17 nights',            date: '2026-10-01' },
  { id: 218, tripId: 104, category: 'Food',           amount: 99600,  desc: 'Dining across Europe',        date: '2026-10-02' },
  { id: 219, tripId: 104, category: 'Activities',     amount: 53950,  desc: 'Museums, tours, attractions', date: '2026-10-03' },
  { id: 220, tripId: 104, category: 'Shopping',       amount: 66400,  desc: 'Souvenirs & fashion',         date: '2026-10-10' },
  /* Dubai Luxury (tripId: 105) */
  { id: 221, tripId: 105, category: 'Flights',        amount: 149400, desc: 'Business class x3',           date: '2026-12-20' },
  { id: 222, tripId: 105, category: 'Accommodation',  amount: 182600, desc: 'Atlantis Palm 6 nights',      date: '2026-12-20' },
  { id: 223, tripId: 105, category: 'Food',           amount: 74700,  desc: 'Fine dining restaurants',     date: '2026-12-21' },
  { id: 224, tripId: 105, category: 'Activities',     amount: 49800,  desc: 'Burj Khalifa, desert safari', date: '2026-12-22' },
  { id: 225, tripId: 105, category: 'Shopping',       amount: 74700,  desc: 'Dubai Mall spree',            date: '2026-12-23' },
  /* Maldives (tripId: 106) */
  { id: 226, tripId: 106, category: 'Flights',        amount: 166000, desc: 'Flights + seaplane transfer', date: '2027-01-15' },
  { id: 227, tripId: 106, category: 'Accommodation',  amount: 348600, desc: 'Overwater bungalow 7n',       date: '2027-01-15' },
  { id: 228, tripId: 106, category: 'Food',           amount: 66400,  desc: 'All-inclusive dining',        date: '2027-01-16' },
  { id: 229, tripId: 106, category: 'Activities',     amount: 33200,  desc: 'Diving, snorkelling',         date: '2027-01-17' },
  { id: 230, tripId: 106, category: 'Transport',      amount: 16600,  desc: 'Speed boat excursions',       date: '2027-01-18' },
  /* Santorini (tripId: 107) */
  { id: 231, tripId: 107, category: 'Flights',        amount: 74700,  desc: 'Flights to JTR',              date: '2026-09-12' },
  { id: 232, tripId: 107, category: 'Accommodation',  amount: 124500, desc: 'Cave hotel Oia 5 nights',     date: '2026-09-12' },
  { id: 233, tripId: 107, category: 'Food',           amount: 49800,  desc: 'Greek tavernas & seafood',    date: '2026-09-13' },
  { id: 234, tripId: 107, category: 'Activities',     amount: 20750,  desc: 'Catamaran cruise, wine tour', date: '2026-09-14' },
  /* Cape Town (tripId: 108) */
  { id: 235, tripId: 108, category: 'Flights',        amount: 265600, desc: 'Flights x4 to CPT',           date: '2026-08-25' },
  { id: 236, tripId: 108, category: 'Accommodation',  amount: 116200, desc: 'Guesthouse 8 nights',         date: '2026-08-25' },
  { id: 237, tripId: 108, category: 'Activities',     amount: 66400,  desc: 'Safari, cable car, tours',    date: '2026-08-26' },
  { id: 238, tripId: 108, category: 'Food',           amount: 49800,  desc: 'Restaurants & braai',         date: '2026-08-27' },
  /* Kyoto (tripId: 109) */
  { id: 239, tripId: 109, category: 'Flights',        amount: 91300,  desc: 'Tokyo-Kyoto Shinkansen',      date: '2026-11-10' },
  { id: 240, tripId: 109, category: 'Accommodation',  amount: 74700,  desc: 'Traditional ryokan 6 nights', date: '2026-11-10' },
  { id: 241, tripId: 109, category: 'Food',           amount: 29050,  desc: 'Kaiseki dinners',             date: '2026-11-11' },
  { id: 242, tripId: 109, category: 'Activities',     amount: 16600,  desc: 'Tea ceremony, temple entry',  date: '2026-11-12' },
  /* New York (tripId: 110) */
  { id: 243, tripId: 110, category: 'Flights',        amount: 132800, desc: 'Return flights JFK x2',       date: '2026-11-25' },
  { id: 244, tripId: 110, category: 'Accommodation',  amount: 149400, desc: 'Manhattan hotel 7 nights',    date: '2026-11-25' },
  { id: 245, tripId: 110, category: 'Food',           amount: 58100,  desc: 'NYC restaurants & food tours',date: '2026-11-26' },
  { id: 246, tripId: 110, category: 'Activities',     amount: 29050,  desc: 'MoMA, Broadway, Empire State',date: '2026-11-27' },
  /* Istanbul (tripId: 113) */
  { id: 247, tripId: 113, category: 'Flights',        amount: 58100,  desc: 'Return flights IST',          date: '2026-09-20' },
  { id: 248, tripId: 113, category: 'Accommodation',  amount: 74700,  desc: 'Sultanahmet boutique hotel',  date: '2026-09-20' },
  { id: 249, tripId: 113, category: 'Food',           amount: 33200,  desc: 'Mezes & kebabs & baklava',    date: '2026-09-21' },
  { id: 250, tripId: 113, category: 'Shopping',       amount: 29050,  desc: 'Grand Bazaar finds',          date: '2026-09-22' },
];

/* ===== 20 FAVORITES ===== */
const MOCK_FAVORITES = [
  { id: 1,  name: 'Paris',          country: 'France',       image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80', price: 232400, savedAt: '2026-06-01' },
  { id: 6,  name: 'Tokyo',          country: 'Japan',        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80', price: 315400, savedAt: '2026-06-02' },
  { id: 7,  name: 'Bali',           country: 'Indonesia',    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=500&q=80', price: 116200, savedAt: '2026-06-03' },
  { id: 14, name: 'Dubai',          country: 'UAE',          image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&q=80', price: 257300, savedAt: '2026-06-04' },
  { id: 15, name: 'Maldives',       country: 'Maldives',     image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80', price: 348600, savedAt: '2026-06-05' },
  { id: 17, name: 'Santorini',      country: 'Greece',       image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80', price: 240700, savedAt: '2026-06-06' },
  { id: 5,  name: 'London',         country: 'UK',           image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80', price: 290500, savedAt: '2026-06-07' },
  { id: 10, name: 'Cape Town',      country: 'South Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&q=80', price: 174300, savedAt: '2026-06-08' },
  { id: 18, name: 'Kyoto',          country: 'Japan',        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80', price: 224100, savedAt: '2026-06-09' },
  { id: 12, name: 'New York',       country: 'USA',          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80', price: 265600, savedAt: '2026-06-10' },
  { id: 2,  name: 'Rome',           country: 'Italy',        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&q=80', price: 182600, savedAt: '2026-06-11' },
  { id: 20, name: 'Istanbul',       country: 'Turkey',       image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500&q=80', price: 149400, savedAt: '2026-06-12' },
  { id: 13, name: 'Machu Picchu',   country: 'Peru',         image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80', price: 215800, savedAt: '2026-06-13' },
  { id: 3,  name: 'Barcelona',      country: 'Spain',        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80', price: 157700, savedAt: '2026-06-14' },
  { id: 9,  name: 'Singapore',      country: 'Singapore',    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&q=80', price: 199200, savedAt: '2026-06-15' },
  { id: 19, name: 'Rio de Janeiro', country: 'Brazil',       image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&q=80', price: 190900, savedAt: '2026-06-16' },
  { id: 4,  name: 'Amsterdam',      country: 'Netherlands',  image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=500&q=80', price: 141100, savedAt: '2026-06-17' },
  { id: 16, name: 'Sydney',         country: 'Australia',    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&q=80', price: 332000, savedAt: '2026-06-18' },
  { id: 8,  name: 'Taj Mahal',      country: 'India',        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80', price: 82170,  savedAt: '2026-06-19' },
  { id: 11, name: 'Marrakech',      country: 'Morocco',      image: 'https://images.unsplash.com/photo-1597212618440-806262de4f2b?w=500&q=80', price: 99600,  savedAt: '2026-06-20' },
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
  },

  getAllFlights() {
    return MOCK_FLIGHTS;
  },

  getFlightById(id) {
    return MOCK_FLIGHTS.find(f => f.id === id) || null;
  },

  getPlacesByCity(city) {
    return MOCK_CITY_PLACES[city] || [];
  },

  getHotelsByCity(city) {
    const aliases = { 'Taj Mahal': 'Agra', Maldives: 'Male', 'Machu Picchu': 'Cusco' };
    const hotelCity = aliases[city] || city;
    return MOCK_HOTELS.filter(h => h.city.toLowerCase() === hotelCity.toLowerCase());
  },

  getFlightsToCity(city) {
    const aliases = { 'Taj Mahal': 'Delhi', Maldives: 'Maldives', 'Machu Picchu': 'Lima', 'Rio de Janeiro': 'Rio' };
    const target = (aliases[city] || city).toLowerCase();
    return MOCK_FLIGHTS.filter(f =>
      f.to.toLowerCase().includes(target) ||
      f.toCountry.toLowerCase().includes(target)
    );
  },

  getAllRentals() {
    return MOCK_RENTALS;
  }
};

/* Load weather into localStorage once so weather section always has data */
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem(STORAGE_KEYS.WEATHER)) {
    localStorage.setItem(STORAGE_KEYS.WEATHER, JSON.stringify(MOCK_WEATHER));
  }
});
