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

// Seeded pseudo-random for reserved seats (deterministic)
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function isSeatReserved(seatKey) {
  return (hashString(seatKey) % 100) / 100 < 0.25;
}

// Polar → Cartesian. Convention: 0° = top/north, 90° = right/east.
export function getEllipsePoint(cx, cy, rx, ry, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + rx * Math.cos(rad), y: cy + ry * Math.sin(rad) };
}

// ─── CRICKET STADIUM ───────────────────────────────────────────────────────
function generateCricketSeats(cx, cy, stands) {
  const seats = [];
  stands.forEach((stand) => {
    for (let r = 0; r < stand.rows; r++) {
      const rowNum = r + 1;
      const rx     = stand.baseR + r * stand.rowGap;
      const ry     = rx * 0.95; // Slight oval
      const spanDeg =
        stand.endA < stand.startA
          ? stand.endA + 360 - stand.startA
          : stand.endA - stand.startA;
      const arcLen = ((rx + ry) / 2) * (spanDeg * Math.PI) / 180;
      const cols   = Math.max(3, Math.floor(arcLen / stand.seatSpacing));

      for (let c = 0; c < cols; c++) {
        const t        = cols > 1 ? c / (cols - 1) : 0.5;
        const angleDeg = stand.startA + t * spanDeg;
        const pt       = getEllipsePoint(cx, cy, rx, ry, angleDeg);
        const key      = `${stand.id}-R${rowNum}-S${c + 1}`;
        seats.push({
          key, row: rowNum, col: c + 1,
          zone: stand.zone, price: SEAT_PRICES[stand.zone],
          label: `${stand.label} · Row ${rowNum} Seat ${c + 1}`,
          x: pt.x, y: pt.y, angle: angleDeg,
          sectionId: stand.id, sectionLabel: stand.label,
          isReserved: isSeatReserved(key),
        });
      }
    }
  });
  return seats;
}

// ─── CONCERT / INDOOR ──────────────────────────────────────────────────────
//
// Arc centre is at cy=0 (at the very top of the canvas, behind the stage).
// Curved seats at angles 124°→236° all land BELOW the stage — they face upward
// toward the stage like a real horseshoe bowl.
//
//  Angle reference (0°=top, 90°=right, 180°=bottom, 270°=left):
//   • Right bowl : 124°→158°   (lower-right of canvas)
//   • Rear bowl  : 158°→202°   (bottom-centre of canvas)
//   • Left bowl  : 202°→236°   (lower-left of canvas)
//
//  Flat floor sections (absolute y coordinates, not arc-relative):
//   • VIP Pit     rows A–D  : y = 82–133
//   • Premium Floor rows E–K: y = 154–262
//
function generateConcertSeats(cx, cy, sections) {
  const seats = [];
  const PITCH  = 17; // seatW(13) + seatGap(4)

  // Helper — push one flat horizontal row of seats split by a centre aisle
  function pushRow({ rowLabel, y, count, aisleW, zone, sectionId, sectionLabel }) {
    const half   = count / 2;
    const blockW = half * PITCH - 4;          // width of one block
    const startX = cx - blockW - aisleW / 2;  // left edge of left block

    for (let c = 0; c < count; c++) {
      const isRight    = c >= half;
      const posInBlock = isRight ? c - half : c;
      const x = isRight
        ? cx + aisleW / 2 + posInBlock * PITCH + 6.5
        : startX + posInBlock * PITCH + 6.5;
      const key = `${sectionId}-${rowLabel}-${c + 1}`;
      seats.push({
        key, row: rowLabel, col: c + 1,
        zone, price: SEAT_PRICES[zone],
        label: `${sectionLabel} · Row ${rowLabel} Seat ${c + 1}`,
        x, y, angle: 0,
        sectionId, sectionLabel,
        isReserved: isSeatReserved(key),
      });
    }
  }

  // ── VIP PIT — 4 rows × 16 seats ──
  ['A', 'B', 'C', 'D'].forEach((row, i) =>
    pushRow({ rowLabel: row, y: 82 + i * 17, count: 16, aisleW: 22,
              zone: 'vip', sectionId: 'VIP_FLOOR', sectionLabel: 'VIP Pit' })
  );

  // ── PREMIUM FLOOR — 7 rows × 24 seats ──
  ['E', 'F', 'G', 'H', 'I', 'J', 'K'].forEach((row, i) =>
    pushRow({ rowLabel: row, y: 154 + i * 17, count: 24, aisleW: 22,
              zone: 'premium', sectionId: 'PREM_FLOOR', sectionLabel: 'Premium Floor' })
  );

  // ── ACCESSIBLE — 4 seats flanking first Premium row ──
  [{ x: 200, y: 154 }, { x: 217, y: 154 }, { x: 683, y: 154 }, { x: 700, y: 154 }]
    .forEach(({ x, y }, idx) => {
      const key = `ACC-${idx + 1}`;
      seats.push({
        key, row: 'E', col: idx + 1,
        zone: 'accessible', price: SEAT_PRICES.accessible,
        label: `Accessible · Seat ${idx + 1}`,
        x, y, angle: 0,
        sectionId: 'ACC_FLOOR', sectionLabel: 'Accessible',
        isReserved: isSeatReserved(key),
      });
    });

  // ── CURVED BOWL STANDS — iterate only sections that have arc data ──
  sections
    .filter((s) => s.startA !== undefined)
    .forEach((stand) => {
      for (let r = 0; r < stand.rows; r++) {
        const rowNum  = r + 1;
        const rx      = stand.baseR + r * stand.rowGap;
        // Use circular arcs (ry = rx) — cy=0 is already off-canvas so no squish needed
        const spanDeg = stand.endA - stand.startA;
        const arcLen  = rx * (spanDeg * Math.PI) / 180;
        const cols    = Math.max(3, Math.floor(arcLen / stand.seatSpacing));

        for (let c = 0; c < cols; c++) {
          const t        = cols > 1 ? c / (cols - 1) : 0.5;
          const angleDeg = stand.startA + t * spanDeg;
          const pt       = getEllipsePoint(cx, cy, rx, rx, angleDeg);
          const key      = `${stand.id}-R${rowNum}-S${c + 1}`;
          seats.push({
            key, row: rowNum, col: c + 1,
            zone: stand.zone, price: SEAT_PRICES[stand.zone],
            label: `${stand.label} · Row ${rowNum} Seat ${c + 1}`,
            x: pt.x, y: pt.y, angle: angleDeg,
            sectionId: stand.id, sectionLabel: stand.label,
            isReserved: isSeatReserved(key),
          });
        }
      }
    });

  return seats;
}

// ─── THEATRE ──────────────────────────────────────────────────────────────
// Stage at bottom. Arc centre (cy=565) is below stage. Seats fan upward (north).
function generateTheatreSeats(cx, cy, sections) {
  const seats = [];
  sections.forEach((sec) => {
    for (let r = 0; r < sec.rows; r++) {
      const rowNum    = r + 1;
      const rowLetter = sec.rowStartLetter
        ? String.fromCharCode(sec.rowStartLetter.charCodeAt(0) + r)
        : `R${rowNum}`;
      const rx      = sec.baseR + r * sec.rowGap;
      const spanDeg = sec.endA < sec.startA
        ? sec.endA + 360 - sec.startA
        : sec.endA - sec.startA;
      const arcLen  = rx * (spanDeg * Math.PI) / 180;
      const cols    = Math.max(2, Math.floor(arcLen / sec.seatSpacing));

      for (let c = 0; c < cols; c++) {
        const t        = cols > 1 ? c / (cols - 1) : 0.5;
        const angleDeg = sec.startA + t * spanDeg;
        const pt       = getEllipsePoint(cx, cy, rx, rx, angleDeg);
        const key      = `${sec.id}-${rowLetter}-${c + 1}`;
        seats.push({
          key, row: rowLetter, col: c + 1,
          zone: sec.zone, price: SEAT_PRICES[sec.zone],
          label: `${sec.label} · Row ${rowLetter} Seat ${c + 1}`,
          x: pt.x, y: pt.y, angle: angleDeg,
          sectionId: sec.id, sectionLabel: sec.label,
          isReserved: isSeatReserved(key),
        });
      }
    }
  });
  return seats;
}

// ─── CRICKET STANDS ───────────────────────────────────────────────────────
const cricketStandsConfig = [
  // Inner ring — VIP, Corporate, Premium (baseR 160)
  { id: 'PAV',      label: 'Pavilion End (VIP)',     zone: 'vip',       startA: 165, endA: 195, baseR: 160, rows: 5, rowGap: 18, seatSpacing: 14 },
  { id: 'CORP',     label: 'Corporate Suites L1',    zone: 'corporate', startA: 345, endA: 15,  baseR: 160, rows: 4, rowGap: 18, seatSpacing: 14 },
  { id: 'ESTD_L',   label: 'East Stand Lower',       zone: 'premium',   startA: 15,  endA: 105, baseR: 160, rows: 5, rowGap: 18, seatSpacing: 14 },
  { id: 'SSTD_L',   label: 'South Stand Lower',      zone: 'premium',   startA: 105, endA: 165, baseR: 160, rows: 5, rowGap: 18, seatSpacing: 14 },
  { id: 'WSTD_L',   label: 'West Stand Lower',       zone: 'premium',   startA: 195, endA: 285, baseR: 160, rows: 5, rowGap: 18, seatSpacing: 14 },
  { id: 'NSTD_L',   label: 'North Stand Lower',      zone: 'premium',   startA: 285, endA: 345, baseR: 160, rows: 5, rowGap: 18, seatSpacing: 14 },
  { id: 'ACC',      label: 'Accessible Deck',        zone: 'accessible',startA: 98,  endA: 102, baseR: 150, rows: 1, rowGap: 18, seatSpacing: 18 },
  // Outer ring — Standard, Economy, Corporate Upper (baseR 270)
  { id: 'CORP_UPP', label: 'Presidential Suites L3', zone: 'corporate', startA: 345, endA: 15,  baseR: 270, rows: 4, rowGap: 18, seatSpacing: 13.5 },
  { id: 'ESTD_U',   label: 'East Upper Tier',        zone: 'standard',  startA: 15,  endA: 105, baseR: 270, rows: 6, rowGap: 18, seatSpacing: 13.5 },
  { id: 'WSTD_U',   label: 'West Upper Tier',        zone: 'standard',  startA: 195, endA: 285, baseR: 270, rows: 6, rowGap: 18, seatSpacing: 13.5 },
  { id: 'NSTD_U',   label: 'North Upper Tier',       zone: 'economy',   startA: 285, endA: 345, baseR: 270, rows: 6, rowGap: 18, seatSpacing: 13.5 },
  { id: 'SSTD_U',   label: 'South Upper Tier',       zone: 'economy',   startA: 105, endA: 165, baseR: 270, rows: 6, rowGap: 18, seatSpacing: 13.5 },
];

// ─── CONCERT SECTIONS ─────────────────────────────────────────────────────
// Arc centre: cx=450, cy=0 (at top, above stage at stageY=25).
// Angles 124°→236° place ALL curved seats below the stage, facing upward = facing the performer.
//
//  At cy=0 and baseR=380, angle 128°:
//    x = 450 + 380·cos(38°) = 749   (right side, well outside flat floor x<660)
//    y = 380·sin(38°)        = 234   (below Premium floor which ends at y≈262)
//
// Zone-only entries (no startA) are read by SeatLegend but draw no arc badge.
const concertSectionsConfig = [
  // ── Zone-info only (flat floor zones for legend) ──
  { id: 'VIP_FLOOR',  label: 'VIP Pit',       zone: 'vip' },
  { id: 'PREM_FLOOR', label: 'Premium Floor', zone: 'premium' },
  { id: 'ACC_FLOOR',  label: 'Accessible',    zone: 'accessible' },

  // ── Standard Lower Bowl — angles 128°→232°, baseR=380 ──
  { id: 'R_LOW',    label: 'Right Stand (Lower)', zone: 'standard',
    startA: 128, endA: 160, baseR: 380, rows: 4, rowGap: 16, seatSpacing: 14 },
  { id: 'REAR_LOW', label: 'Rear Stand (Lower)',  zone: 'standard',
    startA: 160, endA: 200, baseR: 380, rows: 4, rowGap: 16, seatSpacing: 14 },
  { id: 'L_LOW',    label: 'Left Stand (Lower)',  zone: 'standard',
    startA: 200, endA: 232, baseR: 380, rows: 4, rowGap: 16, seatSpacing: 14 },

  // ── Economy Upper Bowl — angles 124°→236°, baseR=456 ──
  { id: 'R_UPP',    label: 'Right Stand (Upper)', zone: 'economy',
    startA: 124, endA: 160, baseR: 456, rows: 4, rowGap: 16, seatSpacing: 14 },
  { id: 'REAR_UPP', label: 'Rear Stand (Upper)',  zone: 'economy',
    startA: 160, endA: 200, baseR: 456, rows: 4, rowGap: 16, seatSpacing: 14 },
  { id: 'L_UPP',    label: 'Left Stand (Upper)',  zone: 'economy',
    startA: 200, endA: 236, baseR: 456, rows: 4, rowGap: 16, seatSpacing: 14 },
];

// ─── THEATRE SECTIONS ─────────────────────────────────────────────────────
// Stage at bottom (stageY=530, cy=565). Seats fan upward.
// 0° = directly up from cy. Fan from -66° (upper-left) → 66° (upper-right).
// At angle 0° from cy=565: y = 565 - baseR (above centre = above stage). ✓
const theatreSectionsConfig = [
  // VIP — innermost arc, rows A–E
  { id: 'VIP_L',  label: 'VIP Stalls (Left)',       zone: 'vip',       startA: -50, endA: -5, baseR: 100, rows: 5, rowGap: 18, seatSpacing: 14, rowStartLetter: 'A' },
  { id: 'VIP_C',  label: 'VIP Stalls (Centre)',     zone: 'vip',       startA: -5, endA: 5, baseR: 100, rows: 5, rowGap: 18, seatSpacing: 14, rowStartLetter: 'A' },
  { id: 'VIP_R',  label: 'VIP Stalls (Right)',      zone: 'vip',       startA: 5, endA: 50, baseR: 100, rows: 5, rowGap: 18, seatSpacing: 14, rowStartLetter: 'A' },
  // Premium — rows F–K
  { id: 'PREM_L', label: 'Premium Stalls (Left)',   zone: 'premium',   startA: -53, endA: -5, baseR: 210, rows: 6, rowGap: 18, seatSpacing: 14, rowStartLetter: 'F' },
  { id: 'PREM_C', label: 'Premium Stalls (Centre)', zone: 'premium',   startA: -5, endA: 5, baseR: 210, rows: 6, rowGap: 18, seatSpacing: 14, rowStartLetter: 'F' },
  { id: 'PREM_R', label: 'Premium Stalls (Right)',  zone: 'premium',   startA: 5, endA: 53, baseR: 210, rows: 6, rowGap: 18, seatSpacing: 14, rowStartLetter: 'F' },
  // Standard — rows L–Q
  { id: 'STD_L',  label: 'Standard Stalls (Left)',  zone: 'standard',  startA: -57, endA: -5, baseR: 330, rows: 6, rowGap: 18, seatSpacing: 14, rowStartLetter: 'L' },
  { id: 'STD_C',  label: 'Standard Stalls (Centre)',zone: 'standard',  startA: -5, endA: 5, baseR: 330, rows: 6, rowGap: 18, seatSpacing: 14, rowStartLetter: 'L' },
  { id: 'STD_R',  label: 'Standard Stalls (Right)', zone: 'standard',  startA: 5, endA: 57, baseR: 330, rows: 6, rowGap: 18, seatSpacing: 14, rowStartLetter: 'L' },
  // Balcony — rows R–V
  { id: 'BALC_L', label: 'Balcony (Left)',          zone: 'economy',   startA: -61, endA: -5, baseR: 450, rows: 5, rowGap: 18, seatSpacing: 13,  rowStartLetter: 'R' },
  { id: 'BALC_C', label: 'Balcony (Centre)',        zone: 'economy',   startA: -5, endA: 5, baseR: 450, rows: 5, rowGap: 18, seatSpacing: 13,  rowStartLetter: 'R' },
  { id: 'BALC_R', label: 'Balcony (Right)',         zone: 'economy',   startA: 5, endA: 61, baseR: 450, rows: 5, rowGap: 18, seatSpacing: 13,  rowStartLetter: 'R' },
  // Accessible — front row centre
  { id: 'ACC',    label: 'Accessible Front Row',    zone: 'accessible',startA: -7, endA: 7, baseR: 75,  rows: 1, rowGap: 18, seatSpacing: 18, rowStartLetter: 'W' },
];

// ─── SEAT LAYOUTS EXPORT ──────────────────────────────────────────────────
export const seatLayouts = {
  cricket: {
    venueName: 'Wankhede Stadium',
    width: 1000, height: 1000,
    cx: 500, cy: 500,
    pitch: { cx: 500, cy: 500, rxOuter: 110, ryOuter: 92, rxInner: 55, ryInner: 46 },
    stands: cricketStandsConfig,
    seats: generateCricketSeats(500, 500, cricketStandsConfig),
  },

  concert: {
    venueName: 'DY Patil Stadium Arena',
    // Canvas dimensions. Curved seats reach y_max ≈ 456+3×16 = 504. Add margin → 560.
    width: 900, height: 560,
    cx: 450,
    cy: 0,           // Arc centre at the very top — arcs fan downward (facing stage)
    hasStage: true,
    stageLabel: 'MAIN STAGE',
    stageWidth: 360, stageHeight: 40,
    stageX: 270, stageY: 25,
    // sections used by: SeatLegend (zone names) + SeatMap (arc badge labels)
    sections: concertSectionsConfig,
    seats: generateConcertSeats(450, 0, concertSectionsConfig),
  },

  theatre: {
    venueName: 'The Royal Theatre',
    width: 900, height: 660,
    cx: 450, cy: 565,
    hasStage: true,
    stageLabel: 'THEATRE STAGE',
    stageWidth: 280, stageHeight: 40,
    stageX: 310, stageY: 530,
    sections: theatreSectionsConfig,
    seats: generateTheatreSeats(450, 565, theatreSectionsConfig),
  },

  indoor: {
    venueName: 'MehfilX Arena',
    width: 900, height: 560,
    cx: 450, cy: 0,
    hasStage: true,
    stageLabel: 'CENTER ARENA STAGE',
    stageWidth: 280, stageHeight: 40,
    stageX: 310, stageY: 25,
    sections: concertSectionsConfig,
    seats: generateConcertSeats(450, 0, concertSectionsConfig),
  },
};

// ─── LAYOUT TYPE RESOLVER ─────────────────────────────────────────────────
export function getLayoutType(event) {
  if (!event) return 'indoor';
  const cat   = (event.category || '').toLowerCase();
  const title = (event.title   || '').toLowerCase();
  const venue = (event.venue   || '').toLowerCase();

  if (cat.includes('concert') || cat.includes('festival') || cat.includes('music') ||
      title.includes('festival') || title.includes('concert') || title.includes('live') ||
      title.includes('tour')     || title.includes('singh')   || title.includes('kuhad'))
    return 'concert';

  if (cat.includes('sports')  || cat.includes('cricket') || venue.includes('stadium') ||
      title.includes('vs')    || title.includes('ipl')   || title.includes('match')   ||
      title.includes('test'))
    return 'cricket';

  if (cat.includes('comedy')  || cat.includes('theatre') || title.includes('comedy')  ||
      title.includes('musical')|| title.includes('theatre')|| title.includes('factory')||
      title.includes('gill')  || title.includes('khan'))
    return 'theatre';

  return 'indoor';
}
