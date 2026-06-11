export const SEAT_PRICES = {
  vip: 5000,
  corporate: 8000,
  premium: 3000,
  standard: 1500,
  economy: 700,
  accessible: 1000,
};

export const ZONE_NAMES = {
  vip: 'VIP Section',
  corporate: 'Corporate Box',
  premium: 'Premium Section',
  standard: 'Standard Section',
  economy: 'Economy Section',
  accessible: 'Accessible Seating',
};

export const ZONE_CLASSES = {
  vip: 'zp-vip',
  corporate: 'zp-corp',
  premium: 'zp-prem',
  standard: 'zp-std',
  economy: 'zp-eco',
  accessible: 'zp-acc',
};

// Seeded pseudo-random generator for reserved seats
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function isSeatReserved(seatKey) {
  const hash = hashString(seatKey);
  const rand = (hash % 100) / 100;
  return rand < 0.25; // 25% of seats are reserved
}

// Polar to cartesian coordinates helper for curved stadium layouts
export function getEllipsePoint(cx, cy, rx, ry, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180; // -90 offset so 0deg is top/North
  return {
    x: cx + rx * Math.cos(angleRad),
    y: cy + ry * Math.sin(angleRad),
  };
}

export const seatLayouts = {
  // CRICKET STADIUM LAYOUT
  cricket: {
    venueName: 'Wankhede Stadium',
    width: 800,
    height: 760,
    cx: 400,
    cy: 350,
    pitch: {
      cx: 400,
      cy: 350,
      rxOuter: 110,
      ryOuter: 80,
      rxInner: 55,
      ryInner: 40,
      label: 'CRICKET PITCH',
    },
    stands: [
      {
        id: 'PAV',
        label: 'Pavilion End (VIP)',
        zone: 'vip',
        startA: 165,
        endA: 195,
        rows: 4,
        baseRx: 135,
        baseRy: 105,
        rowGap: 16,
      },
      {
        id: 'CORP',
        label: 'Corporate Lounges',
        zone: 'corporate',
        startA: 345,
        endA: 15,
        rows: 3,
        baseRx: 135,
        baseRy: 105,
        rowGap: 16,
      },
      {
        id: 'NSTD',
        label: 'North Stand',
        zone: 'premium',
        startA: 285,
        endA: 345,
        rows: 5,
        baseRx: 145,
        baseRy: 115,
        rowGap: 16,
      },
      {
        id: 'SSTD',
        label: 'South Stand',
        zone: 'premium',
        startA: 105,
        endA: 165,
        rows: 5,
        baseRx: 145,
        baseRy: 115,
        rowGap: 16,
      },
      {
        id: 'ESTD',
        label: 'East Stand',
        zone: 'standard',
        startA: 15,
        endA: 105,
        rows: 5,
        baseRx: 155,
        baseRy: 125,
        rowGap: 16,
      },
      {
        id: 'WSTD',
        label: 'West Stand',
        zone: 'standard',
        startA: 195,
        endA: 285,
        rows: 5,
        baseRx: 155,
        baseRy: 125,
        rowGap: 16,
      },
      // Outer Economy rings
      {
        id: 'EUPP',
        label: 'East Upper (Economy)',
        zone: 'economy',
        startA: 15,
        endA: 105,
        rows: 4,
        baseRx: 245,
        baseRy: 215,
        rowGap: 16,
      },
      {
        id: 'WUPP',
        label: 'West Upper (Economy)',
        zone: 'economy',
        startA: 195,
        endA: 285,
        rows: 4,
        baseRx: 245,
        baseRy: 215,
        rowGap: 16,
      },
      // Dedicated Accessible Deck
      {
        id: 'ACC',
        label: 'Accessible Deck',
        zone: 'accessible',
        startA: 98,
        endA: 102,
        rows: 1,
        baseRx: 120,
        baseRy: 90,
        rowGap: 16,
      },
    ],
  },

  // CONCERT LAYOUT
  concert: {
    venueName: 'DY Patil Stadium',
    width: 800,
    height: 620,
    hasStage: true,
    stageLabel: 'MAIN STAGE',
    stageWidth: 320,
    stageHeight: 40,
    sections: [
      {
        id: 'VIP',
        label: 'VIP Pit (Front)',
        zone: 'vip',
        rows: [
          { label: 'A', count: 12 },
          { label: 'B', count: 14 },
          { label: 'C', count: 14 },
        ],
        yStart: 120,
        yGap: 22,
        aisleWidth: 16,
      },
      {
        id: 'PREM',
        label: 'Premium Floor',
        zone: 'premium',
        rows: [
          { label: 'D', count: 16 },
          { label: 'E', count: 16 },
          { label: 'F', count: 18 },
          { label: 'G', count: 18 },
        ],
        yStart: 210,
        yGap: 22,
        aisleWidth: 20,
      },
      {
        id: 'STD',
        label: 'Standard Seating',
        zone: 'standard',
        rows: [
          { label: 'H', count: 20 },
          { label: 'I', count: 20 },
          { label: 'J', count: 22 },
          { label: 'K', count: 22 },
          { label: 'L', count: 24 },
        ],
        yStart: 320,
        yGap: 22,
        aisleWidth: 24,
      },
      {
        id: 'ECO',
        label: 'Economy Stand (Rear)',
        zone: 'economy',
        rows: [
          { label: 'M', count: 24 },
          { label: 'N', count: 26 },
          { label: 'O', count: 26 },
          { label: 'P', count: 28 },
        ],
        yStart: 450,
        yGap: 22,
        aisleWidth: 28,
      },
      {
        id: 'ACC',
        label: 'Accessible Deck',
        zone: 'accessible',
        rows: [
          { label: 'ACC', count: 4 },
        ],
        yStart: 550,
        yGap: 22,
        aisleWidth: 0,
      },
    ],
  },

  // THEATRE / COMEDY LAYOUT
  theatre: {
    venueName: 'The Royal Theatre',
    width: 600,
    height: 520,
    hasStage: true,
    stageLabel: 'THEATRE STAGE',
    stageWidth: 240,
    stageHeight: 30,
    sections: [
      {
        id: 'VIP',
        label: 'VIP Front Rows',
        zone: 'vip',
        rows: [
          { label: 'A', count: 10 },
          { label: 'B', count: 10 },
        ],
        yStart: 100,
        yGap: 24,
        aisleWidth: 16,
      },
      {
        id: 'PREM',
        label: 'Premium Orchestra',
        zone: 'premium',
        rows: [
          { label: 'C', count: 12 },
          { label: 'D', count: 12 },
          { label: 'E', count: 14 },
        ],
        yStart: 170,
        yGap: 24,
        aisleWidth: 16,
      },
      {
        id: 'STD',
        label: 'Standard Stalls',
        zone: 'standard',
        rows: [
          { label: 'F', count: 14 },
          { label: 'G', count: 14 },
          { label: 'H', count: 16 },
          { label: 'I', count: 16 },
        ],
        yStart: 270,
        yGap: 24,
        aisleWidth: 16,
      },
      {
        id: 'BALC',
        label: 'Balcony (Economy)',
        zone: 'economy',
        rows: [
          { label: 'J', count: 16 },
          { label: 'K', count: 16 },
          { label: 'L', count: 18 },
        ],
        yStart: 395,
        yGap: 24,
        aisleWidth: 18,
      },
      {
        id: 'ACC',
        label: 'Accessible Row',
        zone: 'accessible',
        rows: [
          { label: 'W', count: 2 },
        ],
        yStart: 485,
        yGap: 24,
        aisleWidth: 0,
      },
    ],
  },

  // INDOOR ARENA LAYOUT
  indoor: {
    venueName: 'MehfilX Arena',
    width: 700,
    height: 560,
    hasStage: true,
    stageLabel: 'CENTER ARENA STAGE',
    stageWidth: 180,
    stageHeight: 40,
    sections: [
      {
        id: 'VIP',
        label: 'Arena VIP Floor',
        zone: 'vip',
        rows: [
          { label: 'A', count: 12 },
          { label: 'B', count: 12 },
          { label: 'C', count: 12 },
        ],
        yStart: 120,
        yGap: 22,
        aisleWidth: 16,
      },
      {
        id: 'PREM',
        label: 'Premium Seats',
        zone: 'premium',
        rows: [
          { label: 'D', count: 14 },
          { label: 'E', count: 14 },
          { label: 'F', count: 16 },
        ],
        yStart: 210,
        yGap: 22,
        aisleWidth: 16,
      },
      {
        id: 'STD',
        label: 'Standard Tiers',
        zone: 'standard',
        rows: [
          { label: 'G', count: 16 },
          { label: 'H', count: 16 },
          { label: 'I', count: 18 },
          { label: 'J', count: 18 },
        ],
        yStart: 300,
        yGap: 22,
        aisleWidth: 18,
      },
      {
        id: 'ECO',
        label: 'Economy Tier (Rear)',
        zone: 'economy',
        rows: [
          { label: 'K', count: 18 },
          { label: 'L', count: 20 },
          { label: 'M', count: 20 },
        ],
        yStart: 410,
        yGap: 22,
        aisleWidth: 20,
      },
      {
        id: 'ACC',
        label: 'Accessible Row',
        zone: 'accessible',
        rows: [
          { label: 'A_ACC', count: 2 },
        ],
        yStart: 500,
        yGap: 22,
        aisleWidth: 0,
      },
    ],
  },
};

export function getLayoutType(event) {
  if (!event) return 'indoor';
  const category = (event.category || '').toLowerCase();
  const title = (event.title || '').toLowerCase();
  const venue = (event.venue || '').toLowerCase();

  if (category === 'sports' || venue.includes('stadium') || title.includes('vs') || title.includes('ipl') || title.includes('match') || title.includes('test')) {
    if (venue.includes('stadium') && !title.includes('arijit') && !category.includes('concert')) {
      return 'cricket';
    }
    return 'cricket'; // default sports is cricket stadium
  }

  if (category === 'concert' || category === 'festival' || title.includes('festival') || title.includes('concert') || title.includes('live') || title.includes('tour')) {
    return 'concert';
  }

  if (category === 'comedy' || category === 'theatre' || title.includes('comedy') || title.includes('musical') || title.includes('theatre') || title.includes('factory')) {
    return 'theatre';
  }

  return 'indoor';
}
