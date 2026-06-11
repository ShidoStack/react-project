import { events, eventImages } from './events.js';

const venueImage = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=85';
const crowdImage = 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85';

const commonVenue = {
  image: venueImage,
  stats: [
    ['55,000', 'Capacity'],
    ['2 km', 'From nearest transit'],
    ['4,000+', 'Parking Spots'],
  ],
  amenities: ['Wheelchair Access', 'Food Court', 'Bag Check', 'Shuttle Service', 'Secure Entry', 'Premium Lounges'],
};

const ticketTierPresets = {
  concert: [
    { name: 'Economy', price: '₹1,499', status: 'Available', features: ['General standing area', 'Access to food stalls'], unavailable: ['Reserved seating', 'Backstage access'] },
    { name: 'Standard', price: '₹2,499', status: 'Selling fast', features: ['Reserved seating (Tier B)', 'Priority entry lane', 'Digital souvenir booklet'], unavailable: ['Backstage access'] },
    { name: 'Premium', price: '₹4,999', status: 'Only 48 left', popular: true, features: ['Pit standing area', 'Premium lounge access', 'Complimentary drinks', 'Printed merch pack'] },
    { name: 'VIP', price: '₹9,999', status: 'Only 12 left', features: ['Front row reserved', 'Backstage access pass', 'Artist meet & greet', 'Signed memorabilia'] },
  ],
  intimate: [
    { name: 'Balcony', price: '₹799', status: 'Available', features: ['Reserved balcony seat', 'Standard entry'] },
    { name: 'Front Row', price: '₹1,299', status: 'Selling fast', popular: true, features: ['Closest section', 'Priority entry', 'Meet-and-greet raffle'] },
    { name: 'Table for Two', price: '₹2,999', status: 'Only 10 left', features: ['Premium table seating', 'Two mocktails', 'Dedicated host'] },
  ],
  festival: [
    { name: 'Day Pass', price: '₹2,499', status: 'Available', features: ['Single-day access', 'Food village entry'] },
    { name: 'Weekend Pass', price: '₹4,999', status: 'Selling fast', popular: true, features: ['Two-day access', 'Priority entry', 'Merch voucher'] },
    { name: 'Artist Lounge', price: '₹8,999', status: 'Only 24 left', features: ['Lounge deck', 'Premium F&B', 'Dedicated viewing area'] },
  ],
};

const similarEvents = [
  {
    badge: 'New Show',
    category: 'Indie Pop',
    title: 'Prateek Kuhad — Cold Mess Live',
    venue: 'Jio World Garden, Mumbai',
    date: 'Jul 12',
    price: '₹1,599',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85',
  },
  {
    badge: 'MehfilX Pick',
    category: 'Music Festival',
    title: 'NH7 Weekender Pune 2025',
    venue: 'Mahalakshmi Race Course, Pune',
    date: 'Oct 11–12',
    price: '₹3,999',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=85',
  },
  {
    badge: 'Selling Fast',
    category: 'Stand-up Comedy',
    title: 'Zakir Khan — Haq Se Single',
    venue: 'JW Convention Centre, Mumbai',
    date: 'Jul 18',
    price: '₹1,299',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1000&q=85',
  },
];

const detailOverrides = {
  'arijit-singh-aashiqui-tour': {
    title: 'Arijit Singh Aashiqui Tour',
    subtitle: "India's most beloved voice returns — one unforgettable night",
    heroImage: eventImages.concert,
    quote: 'There are concerts you attend, and then there are nights that redefine what music can feel like in a room full of strangers.',
    description: [
      'Arijit Singh brings the Aashiqui Tour to Mumbai for one exclusive night at DY Patil Stadium. After two sold-out international legs spanning Dubai, London, and New York, this homecoming show is widely considered to be the most intimate setting of the tour.',
      "Across an expected two-and-a-half-hour set, Arijit will perform tracks spanning his entire career. The production features a 42-piece live orchestra, custom lighting, and a stage that extends deep into the audience.",
      'This is not a playback concert. Every note performed live. Every song earned.',
    ],
    lineup: [
      {
        name: 'Arijit Singh',
        role: 'Bollywood · Playback · Indie',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85',
        description: 'Six-time Filmfare Award winner. The most-streamed artist in India. His voice has defined a generation of Hindi cinema.',
      },
      {
        name: 'Shalmali Kholgade',
        role: 'Indie Pop · Playback',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85',
        description: 'Known for her effortless range and stage magnetism. Opening with a 30-minute set before the main act.',
      },
      {
        name: 'Tanishk Bagchi',
        role: 'Music Director · Producer',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=85',
        description: 'Music director and close collaborator. Will perform a live DJ set and co-produce key tracks of the evening.',
      },
    ],
  },
  'laugh-factory-special': {
    quote: 'The best comedy nights feel precise, intimate, and just a little dangerous.',
    ticketPreset: 'intimate',
    lineup: [
      { name: 'Kanan Gill', role: 'Headliner', image: eventImages.comedy, description: 'A sharply observed headline set built from new material and crowd-tested favourites.' },
      { name: 'Aditi Mittal', role: 'Featured Act', image: eventImages.theatre, description: 'Fast, warm, and fearless stand-up from one of India’s defining comedy voices.' },
      { name: 'Rahul Subramanian', role: 'Closer', image: eventImages.comedy, description: 'A closing set of deadpan stories, workplace absurdity, and perfectly timed callbacks.' },
    ],
  },
  'blue-note-jazz-evening': {
    quote: 'A room, a rhythm section, and the kind of silence that makes every note matter.',
    ticketPreset: 'intimate',
    lineup: [
      { name: 'The Blue Note Quartet', role: 'Jazz Ensemble', image: eventImages.jazz, description: 'A tight four-piece ensemble moving through standards, soul, and late-night improvisation.' },
      { name: 'Maya Iyer', role: 'Guest Vocalist', image: eventImages.culture, description: 'Warm vocal textures and a short set of reimagined Hindi film classics.' },
    ],
  },
  'twilight-indie-festival': {
    subtitle: 'A golden-hour festival where indie sound meets stadium-scale production',
    quote: 'Prepare for an immersive night under the stars where world-class indie artists collide with breathtaking stadium acoustics.',
    ticketPreset: 'festival',
    lineup: [
      { name: 'Arijit Singh', role: 'Headliner', image: eventImages.concert, description: 'A headline set blending cinematic ballads with modern indie arrangements.' },
      { name: 'The Avalanche', role: 'Special Guest', image: eventImages.festival, description: 'Atmospheric indie rock built for dusk, lights, and a singing crowd.' },
    ],
  },
  'modern-masters-exhibition': {
    quote: 'A quiet, exacting collection for people who like their evenings slow, visual, and beautifully edited.',
    ticketPreset: 'intimate',
    lineup: [
      { name: 'City Art Gallery', role: 'Curated Exhibition', image: eventImages.classical, description: 'A guided sequence of contemporary works, installations, and artist notes.' },
      { name: 'Meera Sethi', role: 'Guest Curator', image: eventImages.culture, description: 'A short opening walkthrough on collecting, context, and contemporary Indian form.' },
    ],
  },
  'hamilton-the-musical': {
    quote: 'A limited-run theatre night where language, rhythm, and staging move at full velocity.',
    lineup: [
      { name: 'Hamilton Touring Cast', role: 'Principal Cast', image: eventImages.theatre, description: 'The acclaimed touring cast brings the full production to Mumbai for a limited run.' },
      { name: 'Live Pit Orchestra', role: 'Orchestra', image: eventImages.classical, description: 'A live ensemble supporting every transition, cue, and lyrical turn.' },
    ],
  },
  'sufi-mehfil-under-the-stars': {
    quote: 'A candlelit courtyard, qawwali voices, and poetry carried into the night air.',
    ticketPreset: 'intimate',
    lineup: [
      { name: 'Nizami Brothers', role: 'Qawwali Ensemble', image: eventImages.culture, description: 'Traditional qawwali, poetry, and devotional compositions in an intimate courtyard setting.' },
      { name: 'Amaan Ali', role: 'Poetry Host', image: eventImages.jazz, description: 'A spoken-word interlude connecting the musical sets with contemporary verse.' },
    ],
  },
  'basement-live-sessions': {
    quote: 'Small rooms make honest music louder.',
    ticketPreset: 'intimate',
    lineup: [
      { name: 'House Band Sessions', role: 'Live Band', image: eventImages.indie, description: 'New independent artists in a close-room format built for discovery.' },
      { name: 'Open Mic Selects', role: 'Support Acts', image: eventImages.comedy, description: 'Three short support sets selected from the MehfilX emerging artist program.' },
    ],
  },
};

function buildSchedule(event) {
  return [
    { time: event.time === '11:00 AM' ? '10:30 AM' : '6:30 PM', icon: 'door_open', title: 'Gates Open', description: 'Entry begins. All ticket tiers may enter. Merch counters and food court open. Bag check available at Gate C.' },
    { time: event.time === '11:00 AM' ? '11:00 AM' : '7:00 PM', icon: 'music_note', title: 'Opening Experience', description: 'A curated warm-up set, host welcome, or guided walkthrough designed by the organizer.', badge: '30 min' },
    { time: event.time, icon: 'star', title: `${event.title} Begins`, description: 'The main experience starts. Follow venue staff instructions for entry lanes, seating, and premium access.', badge: "Tonight's highlight", active: true },
    { time: event.time === '11:00 AM' ? '5:00 PM' : '10:30 PM', icon: 'dark_mode', title: 'Close & Exit', description: 'Encore, final walkthrough, or closing announcements. Shuttle and parking support remains active after the event.' },
  ];
}

function buildDefaultDetail(event) {
  const preset = event.category === 'Festival' ? 'festival' : event.category === 'Comedy' || event.category === 'Music' || event.category === 'Exhibition' ? 'intimate' : 'concert';

  return {
    ...event,
    eyebrow: 'Tickets available · Booking open',
    subtitle: `${event.category} experience at ${event.venue}`,
    genre: event.category,
    age: 'Ages 13+',
    date: event.date.includes('Multiple') || event.date.includes('Until') ? event.date : `${event.date}, 2025`,
    shortDate: event.date,
    doors: event.time === '11:00 AM' ? '10:30 AM' : '6:30 PM',
    show: event.time,
    location: `${event.venue}, ${event.city}`,
    price: `₹${event.price.toLocaleString('en-IN')}`,
    ticketsLeft: event.badge?.match(/\d+/)?.[0] ?? 312,
    heroImage: event.image,
    crowdImage,
    quote: 'A premium live experience designed with sharp curation, atmospheric production, and a room full of people ready to remember it.',
    description: [
      `${event.title} brings a carefully produced ${event.category.toLowerCase()} experience to ${event.city}, hosted at ${event.venue}. Expect thoughtful pacing, premium venue operations, and a night shaped for discovery.`,
      event.description,
      'Organizer details include timing, access rules, venue notes, ticket tiers, and support information so guests can book with confidence.',
    ],
    lineup: [
      { name: event.title, role: event.category, image: event.image, description: event.description },
      { name: 'MehfilX Live Crew', role: 'Production', image: crowdImage, description: 'Venue operations, live production, crowd flow, and guest experience support.' },
    ],
    schedule: buildSchedule(event),
    venue: event.venue,
    venueImage: commonVenue.image,
    venueStats: commonVenue.stats,
    amenities: commonVenue.amenities,
    ticketTiers: ticketTierPresets[preset],
    similarEvents,
  };
}

export const eventDetails = events.map((event) => {
  const override = detailOverrides[event.slug] ?? {};
  const ticketPreset = override.ticketPreset;
  return {
    ...buildDefaultDetail(event),
    ...override,
    ticketTiers: ticketPreset ? ticketTierPresets[ticketPreset] : override.ticketTiers ?? buildDefaultDetail(event).ticketTiers,
  };
});

export function getEventDetail(slug) {
  return eventDetails.find((event) => event.slug === slug);
}
