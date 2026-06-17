import { SEAT_PRICES, ZONE_NAMES } from '../../data/seatLayouts.js';

// Custom Seat Swatch component to perfectly match the PixiJS canvas seat rendering
function SeatSwatch({ cushion, stroke, nub, showCross }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-5 h-5 select-none" style={{ minWidth: '20px' }}>
      {/* Back nub */}
      <div
        className="w-3 h-0.75 rounded-t-[1px] opacity-65"
        style={{ backgroundColor: nub }}
      />
      {/* Cushion */}
      <div
        className="w-4.5 h-3.5 rounded-[2px] border flex items-center justify-center -mt-[1px]"
        style={{
          backgroundColor: cushion,
          borderColor: stroke,
        }}
      >
        {showCross && (
          <span className="text-[10px] font-black text-gray-900 leading-none -mt-[1px]">×</span>
        )}
      </div>
    </div>
  );
}

const ZONE_COLORS = {
  vip: {
    available: { cushion: '#9333ea', stroke: '#7e22ce', nub: '#cbd5e1' },
    reserved: { cushion: '#c4b5fd', stroke: '#a78bfa', nub: '#e5e7eb' },
  },
  premium: {
    available: { cushion: '#4f46e5', stroke: '#4338ca', nub: '#cbd5e1' },
    reserved: { cushion: '#bfdbfe', stroke: '#93c5fd', nub: '#e5e7eb' },
  },
  standard: {
    available: { cushion: '#06b6d4', stroke: '#0891b2', nub: '#cbd5e1' },
    reserved: { cushion: '#b2ebf2', stroke: '#67e8f9', nub: '#e5e7eb' },
  },
  economy: {
    available: { cushion: '#f59e0b', stroke: '#d97706', nub: '#cbd5e1' },
    reserved: { cushion: '#fde68a', stroke: '#fcd34d', nub: '#e5e7eb' },
  },
  accessible: {
    available: { cushion: '#22c55e', stroke: '#16a34a', nub: '#cbd5e1' },
    reserved: { cushion: '#bbf7d0', stroke: '#86efac', nub: '#e5e7eb' },
  },
  corporate: {
    available: { cushion: '#f59e0b', stroke: '#d97706', nub: '#cbd5e1' },
    reserved: { cushion: '#fde68a', stroke: '#fcd34d', nub: '#e5e7eb' },
  },
};

export default function SeatLegend({ layout }) {
  if (!layout) return null;

  // Determine which zones are present in the current layout to show them in the legend
  const activeZones = new Set();
  if (layout.stands) {
    layout.stands.forEach((s) => activeZones.add(s.zone));
  } else if (layout.sections) {
    layout.sections.forEach((s) => activeZones.add(s.zone));
  }

  const zonesToShow = Array.from(activeZones).sort((a, b) => {
    // Sort corporate/vip first, then premium, standard, economy, accessible
    const order = { corporate: 1, vip: 2, premium: 3, standard: 4, economy: 5, accessible: 6 };
    return (order[a] || 99) - (order[b] || 99);
  });

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Seat Status Swatches */}
      <div className="flex items-center gap-6 flex-wrap justify-between border-b border-gray-100 pb-4">
        <div className="text-xs font-extrabold uppercase tracking-wider text-gray-400 select-none">
          Status Guide
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-on-surface-variant">
            <div className="flex -space-x-2">
              <SeatSwatch cushion="#9333ea" stroke="#7e22ce" nub="#cbd5e1" />
              <SeatSwatch cushion="#4f46e5" stroke="#4338ca" nub="#cbd5e1" />
              <SeatSwatch cushion="#06b6d4" stroke="#0891b2" nub="#cbd5e1" />
              <SeatSwatch cushion="#f59e0b" stroke="#d97706" nub="#cbd5e1" />
            </div>
            <span>Available (by category)</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-semibold text-on-surface-variant">
            <div className="flex -space-x-2">
              <SeatSwatch cushion="#c4b5fd" stroke="#a78bfa" nub="#e5e7eb" />
              <SeatSwatch cushion="#bfdbfe" stroke="#93c5fd" nub="#e5e7eb" />
              <SeatSwatch cushion="#b2ebf2" stroke="#67e8f9" nub="#e5e7eb" />
              <SeatSwatch cushion="#fde68a" stroke="#fcd34d" nub="#e5e7eb" />
            </div>
            <span>Reserved</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
            <SeatSwatch cushion="#16a34a" stroke="#14532d" nub="#a7f3d0" />
            <span>Selected</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
            <SeatSwatch cushion="#64748b" stroke="#475569" nub="#94a3b8" showCross={true} />
            <span>Unavailable / Blocked</span>
          </div>
        </div>
      </div>

      {/* Pricing Zones Info */}
      <div className="flex flex-col gap-3">
        <div className="text-xs font-extrabold uppercase tracking-wider text-gray-400 select-none">
          Categories & Pricing
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {zonesToShow.map((zone) => {
            const zoneName = ZONE_NAMES[zone] || zone;
            const price = SEAT_PRICES[zone] || 0;
            const colors = ZONE_COLORS[zone] || ZONE_COLORS.standard;

            // Inline styling helpers for zones to look extremely cohesive and match Tailwind custom layer
            let bgStyle = 'bg-gray-150/50 text-gray-700 border-gray-250/50';
            if (zone === 'vip') bgStyle = 'bg-purple-50 text-purple-700 border-purple-200';
            if (zone === 'corporate') bgStyle = 'bg-amber-50 text-amber-800 border-amber-200';
            if (zone === 'premium') bgStyle = 'bg-indigo-50 text-brand-indigo border-indigo-200/50';
            if (zone === 'standard') bgStyle = 'bg-cyan-50 text-cyan-700 border-cyan-200';
            if (zone === 'economy') bgStyle = 'bg-orange-50/70 text-orange-700 border-orange-200/60';
            if (zone === 'accessible') bgStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';

            return (
              <div key={zone} className="flex items-center justify-between p-2.5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Real seat swatches for Available and Reserved next to each zone */}
                  <div className="flex items-center gap-1 select-none flex-shrink-0">
                    <SeatSwatch cushion={colors.available.cushion} stroke={colors.available.stroke} nub={colors.available.nub} />
                    <span className="text-[10px] text-gray-300 font-bold">/</span>
                    <SeatSwatch cushion={colors.reserved.cushion} stroke={colors.reserved.stroke} nub={colors.reserved.nub} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-on-surface-variant font-bold text-xs truncate">{zoneName}</span>
                    <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">Avail / Reserved</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${bgStyle} select-none`}>
                    {zone === 'corporate' ? 'BOX' : zone.toUpperCase()}
                  </span>
                  <span className="font-extrabold text-on-surface text-xs select-all">₹{price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

