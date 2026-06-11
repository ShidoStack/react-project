import { useState, useCallback, useRef } from 'react';
import Seat from './Seat.jsx';
import SeatLegend from './SeatLegend.jsx';
import {
  seatLayouts,
  getLayoutType,
  getEllipsePoint,
  isSeatReserved,
  SEAT_PRICES,
  ZONE_NAMES,
} from '../../data/seatLayouts.js';

export default function SeatMap({ event, selectedSeats, onSeatToggle }) {
  const [tooltip, setTooltip] = useState(null); // { x, y, label, zoneName, price }
  const tooltipRef = useRef(null);

  const layoutType = getLayoutType(event);
  const layout = seatLayouts[layoutType] || seatLayouts.indoor;

  // Use useCallback so that handler references are stable per render
  const makeEnterHandler = useCallback(
    (data) => (e) => {
      // Read coordinates synchronously from native MouseEvent
      setTooltip({ x: e.clientX, y: e.clientY, ...data });
    },
    []
  );

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  // Track mouse for tooltip position updates
  const handleMouseMove = useCallback((e) => {
    setTooltip((prev) => {
      if (!prev) return null;
      return { ...prev, x: e.clientX, y: e.clientY };
    });
  }, []);

  // ─── ARC PATH HELPER ──────────────────────────────────
  const buildArcPath = (cx, cy, rx, ry, startA, endA) => {
    const p1 = getEllipsePoint(cx, cy, rx, ry, startA);
    const p2 = getEllipsePoint(cx, cy, rx, ry, endA);
    const span = endA - startA;
    const largeArc = span > 180 ? 1 : 0;
    return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${rx.toFixed(1)} ${ry.toFixed(1)} 0 ${largeArc} 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  };

  // ─── ZONE BADGE COLOURS ───────────────────────────────
  const zoneFill = {
    vip: '#fef9c3',
    corporate: '#fef9c3',
    premium: '#eef2ff',
    standard: '#dbeafe',
    economy: '#f1f5f9',
    accessible: '#dcfce7',
  };
  const zoneText = {
    vip: '#854d0e',
    corporate: '#854d0e',
    premium: '#3730a3',
    standard: '#1e40af',
    economy: '#475569',
    accessible: '#166534',
  };
  const zoneStroke = {
    vip: '#fde047',
    corporate: '#fde047',
    premium: 'rgba(99,102,241,.3)',
    standard: 'rgba(59,130,246,.3)',
    economy: '#cbd5e1',
    accessible: '#86efac',
  };

  // ─── CRICKET STADIUM ──────────────────────────────────
  const renderCricketStadium = () => {
    const { cx, cy, width, height, pitch, stands } = layout;

    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto select-none overflow-visible max-w-[680px] lg:max-w-none"
        onMouseMove={handleMouseMove}
      >
        {/* ── PITCH ── */}
        <ellipse cx={cx} cy={cy} rx={pitch.rxOuter} ry={pitch.ryOuter} fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <ellipse cx={cx} cy={cy} rx={pitch.rxInner} ry={pitch.ryInner} fill="#dcfce7" stroke="#4ade80" strokeWidth="1" />
        <rect x={cx - 6} y={cy - 30} width={12} height={60} rx={2} fill="#a3e635" opacity="0.55" />
        <line x1={cx - 5} y1={cy - 26} x2={cx + 5} y2={cy - 26} stroke="#4ade80" strokeWidth="0.8" />
        <line x1={cx - 5} y1={cy + 26} x2={cx + 5} y2={cy + 26} stroke="#4ade80" strokeWidth="0.8" />
        <text x={cx} y={cy - 5} textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="700" letterSpacing="2" fill="#166534" opacity="0.8">CRICKET</text>
        <text x={cx} y={cy + 8} textAnchor="middle" dominantBaseline="middle" fontSize="7" fontWeight="600" letterSpacing="2" fill="#4ade80" opacity="0.8">PITCH</text>

        {/* ── STANDS ── */}
        {stands.map((stand) => {
          const spanDeg = stand.endA - stand.startA;

          return (
            <g key={stand.id}>
              {/* Arc guide */}
              <path
                d={buildArcPath(cx, cy, stand.baseRx - 4, stand.baseRy - 3, stand.startA, stand.endA)}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="0.8"
                strokeDasharray="3,4"
              />

              {/* Rows of seats */}
              {Array.from({ length: stand.rows }, (_, rIdx) => {
                const rowNum = rIdx + 1;
                const rx = stand.baseRx + rIdx * stand.rowGap * 1.12;
                const ry = stand.baseRy + rIdx * stand.rowGap * 0.88;

                // Space seats so they never overlap — driven by actual arc length
                const avgR = (rx + ry) / 2;
                const spanRad = (spanDeg * Math.PI) / 180;
                const arcLen = avgR * spanRad;
                const cols = Math.max(4, Math.floor(arcLen / 14));

                const midA = (stand.startA + stand.endA) / 2;
                const lp = getEllipsePoint(cx, cy, rx + 8, ry + 6, midA);

                return (
                  <g key={rowNum}>
                    <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="6.5" fill="#94a3b8" fontWeight="600">{rowNum}</text>

                    {Array.from({ length: cols }, (_, cIdx) => {
                      const t = cols > 1 ? cIdx / (cols - 1) : 0.5;
                      const angle = stand.startA + t * spanDeg;
                      const pt = getEllipsePoint(cx, cy, rx, ry, angle);
                      const key = `${stand.id}-R${rowNum}-S${cIdx + 1}`;
                      const reserved = isSeatReserved(key);
                      const selected = selectedSeats.some((s) => s.key === key);
                      const seatLabel = `${stand.label} · Row ${rowNum} Seat ${cIdx + 1}`;

                      return (
                        <Seat
                          key={key}
                          seatKey={key}
                          row={rowNum}
                          col={cIdx + 1}
                          zone={stand.zone}
                          price={SEAT_PRICES[stand.zone]}
                          label={seatLabel}
                          isReserved={reserved}
                          isSelected={selected}
                          transform={`translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`}
                          isStadium
                          onClick={() => !reserved && onSeatToggle({ key, label: seatLabel, zone: stand.zone, price: SEAT_PRICES[stand.zone] })}
                          onMouseEnter={makeEnterHandler({ label: seatLabel, zoneName: ZONE_NAMES[stand.zone], price: SEAT_PRICES[stand.zone] })}
                          onMouseLeave={handleMouseLeave}
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Stand label badge */}
              {(() => {
                const midA = (stand.startA + stand.endA) / 2;
                const outerRx = stand.baseRx + stand.rows * stand.rowGap * 1.12 + 22;
                const outerRy = stand.baseRy + stand.rows * stand.rowGap * 0.88 + 18;
                const lp = getEllipsePoint(cx, cy, outerRx, outerRy, midA);
                const tw = stand.label.length * 5 + 14;
                return (
                  <g>
                    <rect x={lp.x - tw / 2} y={lp.y - 8} width={tw} height={16} rx={8}
                      fill={zoneFill[stand.zone] || '#f1f5f9'}
                      stroke={zoneStroke[stand.zone] || '#cbd5e1'}
                      strokeWidth="0.8"
                    />
                    <text x={lp.x} y={lp.y + 0.5} textAnchor="middle" dominantBaseline="middle"
                      fontSize="7" fontWeight="700" letterSpacing="1"
                      fill={zoneText[stand.zone] || '#475569'}
                    >
                      {stand.label}
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })}
      </svg>
    );
  };

  // ─── CONCERT / THEATRE / ARENA ────────────────────────
  const renderStageLayout = () => {
    const { width, height, hasStage, stageLabel, stageWidth, stageHeight, sections } = layout;
    const cx = width / 2;
    const seatW = 14;
    const seatH = 11;
    const seatGap = 4.5;

    return (
      <div className="flex flex-col items-center w-full">
        {/* Stage */}
        {hasStage && (
          <div className="mb-6 flex flex-col items-center">
            <div
              style={{ width: stageWidth, height: stageHeight }}
              className="flex items-center justify-center rounded-t-xl bg-gradient-to-b from-gray-200 to-gray-100 border border-gray-300 text-[10px] font-black uppercase tracking-[0.22em] text-gray-500 shadow-inner relative"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mr-2 text-gray-400">
                <path d="M12 2L2 22h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              {stageLabel}
              {/* Spotlight glow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-amber-100/40 blur-md rounded-full" />
            </div>
            <div
              style={{ width: stageWidth + 30 }}
              className="h-3 rounded-b-full bg-gradient-to-b from-gray-200/40 to-transparent border-x border-gray-100 opacity-50"
            />
          </div>
        )}

        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto select-none overflow-visible"
          onMouseMove={handleMouseMove}
        >
          {sections.map((section) => {
            // Zone stripe dimensions
            const firstY = section.yStart - seatH / 2;
            const lastY = section.yStart + (section.rows.length - 1) * section.yGap + seatH / 2;
            const stripeH = Math.max(0, lastY - firstY);
            const sampleN = section.rows[0]?.count ?? 0;
            const sampleTotalW = sampleN * (seatW + seatGap) - seatGap + section.aisleWidth;
            const stripeX = cx - sampleTotalW / 2 - 22;

            const stripeColor = {
              vip: '#fbbf24', corporate: '#eab308', premium: '#6366f1',
              standard: '#3b82f6', economy: '#94a3b8', accessible: '#10b981',
            }[section.zone] || '#cbd5e1';

            return (
              <g key={section.id}>
                {/* Section label on the left */}
                <text
                  x={stripeX - 6}
                  y={firstY + stripeH / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize="7"
                  fontWeight="700"
                  letterSpacing="1"
                  fill={zoneText[section.zone] || '#64748b'}
                  transform={`rotate(-90, ${stripeX - 6}, ${firstY + stripeH / 2})`}
                >
                  {section.label}
                </text>

                {/* Zone stripe */}
                {stripeH > 0 && (
                  <rect x={stripeX} y={firstY} width={3} height={stripeH} rx={1.5} fill={stripeColor} opacity="0.65" />
                )}

                {section.rows.map((row, rIdx) => {
                  const y = section.yStart + rIdx * section.yGap;
                  const n = row.count;
                  const totalW = n * (seatW + seatGap) - seatGap + section.aisleWidth;
                  const startX = cx - totalW / 2;

                  // Parabolic bow — front rows curve towards stage
                  const curveActive = layoutType === 'concert' || layoutType === 'theatre';
                  const depthFactor = Math.max(0, 7 - (section.yStart / 40 + rIdx));
                  const arcDepth = curveActive ? depthFactor * 1.6 : 0;

                  let currentX = startX;

                  return (
                    <g key={row.label}>
                      {/* Left row label */}
                      <text x={startX - 10} y={y} textAnchor="end" dominantBaseline="middle" fontSize="8" fontWeight="600" fill="#94a3b8">{row.label}</text>

                      {Array.from({ length: n }, (_, sIdx) => {
                        const seatNum = sIdx + 1;
                        // Insert aisle at midpoint
                        if (sIdx === Math.ceil(n / 2) && section.aisleWidth > 0) {
                          currentX += section.aisleWidth;
                        }

                        const t = (seatNum - 0.5) / n;
                        const bow = arcDepth * (1 - Math.pow(2 * t - 1, 2));
                        const sy = y - bow;

                        const seatKey = `${section.id}-${row.label}-${seatNum}`;
                        const seatLabel = `${section.label} · Row ${row.label} Seat ${seatNum}`;
                        const reserved = isSeatReserved(seatKey);
                        const selected = selectedSeats.some((s) => s.key === seatKey);
                        const seatX = currentX;
                        currentX += seatW + seatGap;

                        return (
                          <Seat
                            key={seatKey}
                            seatKey={seatKey}
                            row={row.label}
                            col={seatNum}
                            zone={section.zone}
                            price={SEAT_PRICES[section.zone]}
                            label={seatLabel}
                            isReserved={reserved}
                            isSelected={selected}
                            x={seatX}
                            y={sy}
                            width={seatW}
                            height={seatH}
                            isStadium={false}
                            onClick={() => !reserved && onSeatToggle({ key: seatKey, label: seatLabel, zone: section.zone, price: SEAT_PRICES[section.zone] })}
                            onMouseEnter={makeEnterHandler({ label: seatLabel, zoneName: ZONE_NAMES[section.zone], price: SEAT_PRICES[section.zone] })}
                            onMouseLeave={handleMouseLeave}
                          />
                        );
                      })}

                      {/* Right row label */}
                      <text x={cx + totalW / 2 + 10} y={y} textAnchor="start" dominantBaseline="middle" fontSize="8" fontWeight="600" fill="#94a3b8">{row.label}</text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full min-w-0">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-black tracking-tight text-on-surface">
          {event?.venue || layout.venueName} — Seat Map
        </h2>
        <p className="text-xs text-outline mt-1">
          Click a seat to select · hover to see section & price
        </p>
      </div>

      {/* Interactive SVG area */}
      <div className="w-full flex justify-center bg-gray-50/80 border border-gray-200 rounded-3xl p-6 md:p-10 shadow-inner overflow-x-auto min-h-[480px] relative">
        {layoutType === 'cricket' ? renderCricketStadium() : renderStageLayout()}
      </div>

      {/* Legend */}
      <div className="w-full mt-6">
        <SeatLegend layout={layout} />
      </div>

      {/* Floating tooltip — rendered outside SVG, positioned via fixed CSS */}
      {tooltip && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{ left: tooltip.x + 14, top: tooltip.y - 60 }}
        >
          <div className="bg-[#0f0f0f] text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold shadow-2xl border border-white/10 flex flex-col gap-0.5 min-w-[140px]">
            <span className="text-[9px] text-indigo-300 font-extrabold uppercase tracking-widest">{tooltip.zoneName}</span>
            <span className="text-white/90 font-bold leading-tight text-[11px]">{tooltip.label}</span>
            <span className="text-white font-black text-sm tracking-tight mt-0.5">₹{(tooltip.price || 0).toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
