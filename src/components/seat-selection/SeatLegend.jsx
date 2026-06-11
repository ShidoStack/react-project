import { SEAT_PRICES, ZONE_NAMES, ZONE_CLASSES } from '../../data/seatLayouts.js';

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
    <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Seat Status Swatches */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
          <div className="h-4.5 w-4.5 rounded-[4px] border border-[#94A3B8] bg-[#CBD5E1]" />
          Available
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
          <div className="h-4.5 w-4.5 rounded-[4px] border border-[#4F46E5] bg-[#6366F1] shadow-[0_0_5px_rgba(99,102,241,0.35)]" />
          Selected
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
          <div className="h-4.5 w-4.5 rounded-[4px] border border-[#FCA5A5] bg-[#FECACA]" />
          Reserved
        </div>
      </div>

      <div className="hidden h-5 w-px bg-gray-200 md:block" />

      {/* Pricing Zones Info */}
      <div className="flex flex-wrap items-center gap-4">
        {zonesToShow.map((zone) => {
          const zoneClass = ZONE_CLASSES[zone] || 'zp-std';
          const zoneName = ZONE_NAMES[zone] || zone;
          const price = SEAT_PRICES[zone] || 0;

          // Inline styling helpers for zones to look extremely cohesive and match Tailwind custom layer
          let bgStyle = 'bg-gray-100 text-gray-700 border-gray-200';
          if (zone === 'vip') bgStyle = 'bg-amber-50 text-amber-800 border-amber-200';
          if (zone === 'corporate') bgStyle = 'bg-yellow-50 text-yellow-800 border-yellow-200';
          if (zone === 'premium') bgStyle = 'bg-indigo-50 text-brand-indigo border-indigo-200/50';
          if (zone === 'standard') bgStyle = 'bg-blue-50 text-blue-800 border-blue-200';
          if (zone === 'economy') bgStyle = 'bg-slate-100 text-slate-600 border-slate-200';
          if (zone === 'accessible') bgStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';

          return (
            <div key={zone} className="flex items-center gap-2 text-xs font-medium">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${bgStyle}`}>
                {zone === 'corporate' ? 'BOX' : zone.toUpperCase()}
              </span>
              <span className="text-on-surface-variant font-semibold">{zoneName}</span>
              <span className="text-gray-400">·</span>
              <span className="font-bold text-on-surface">₹{price.toLocaleString('en-IN')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
