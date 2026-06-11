import Icon from '../common/Icon.jsx';
import { ZONE_CLASSES, ZONE_NAMES } from '../../data/seatLayouts.js';

export default function BookingSidebar({ selectedSeats, onRemoveSeat, onClearAll, onProceed }) {
  const n = selectedSeats.length;

  // Real-time calculations
  const subtotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const serviceFee = Math.round(subtotal * 0.05);
  const taxes = Math.round(subtotal * 0.18); // 18% GST
  const grandTotal = subtotal + serviceFee + taxes;

  return (
    <aside className="flex h-full flex-col overflow-hidden bg-white border-l border-gray-200 shadow-sm">
      {/* Sidebar Header */}
      <div className="border-b border-gray-100 px-6 py-5">
        <h2 className="text-lg font-extrabold text-on-surface tracking-tight">Booking Summary</h2>
        <p className="mt-1 text-xs text-outline">
          {n ? `${n} seat${n > 1 ? 's' : ''} selected` : 'No seats selected'}
        </p>
      </div>

      {/* Selected Seats Scroll List */}
      <div className="flex-1 overflow-y-auto">
        {n === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gray-50 border border-gray-200/50 text-xl shadow-inner">
              🎟️
            </div>
            <p className="text-sm font-bold text-on-surface">No Seats Selected</p>
            <p className="mt-2 max-w-[200px] text-xs leading-relaxed text-outline">
              Tap any available seat on the venue map to add it to your order.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {selectedSeats.map((s) => {
              let bgStyle = 'bg-gray-100 text-gray-700 border-gray-200';
              if (s.zone === 'vip') bgStyle = 'bg-amber-50 text-amber-800 border-amber-200';
              if (s.zone === 'corporate') bgStyle = 'bg-yellow-50 text-yellow-800 border-yellow-200';
              if (s.zone === 'premium') bgStyle = 'bg-indigo-50 text-brand-indigo border-indigo-200/50';
              if (s.zone === 'standard') bgStyle = 'bg-blue-50 text-blue-800 border-blue-200';
              if (s.zone === 'economy') bgStyle = 'bg-slate-100 text-slate-600 border-slate-200';
              if (s.zone === 'accessible') bgStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';

              return (
                <div key={s.key} className="flex items-center justify-between px-6 py-3.5 transition hover:bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-indigo animate-pulse" />
                    <div>
                      <div className="text-xs font-bold text-on-surface">{s.label}</div>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span className={`inline-flex rounded-full border px-1.5 py-0.2 text-[8px] font-extrabold uppercase tracking-wider ${bgStyle}`}>
                          {ZONE_NAMES[s.zone] || s.zone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-black text-on-surface">
                      ₹{s.price.toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => onRemoveSeat(s.key)}
                      className="grid h-6 w-6 place-items-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                      title="Remove Seat"
                    >
                      <Icon name="close" style={{ fontSize: 16 }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Calculations & Action Buttons */}
      <div className="border-t border-gray-150 bg-gray-50/50 px-6 py-5">
        <div className="space-y-2.5 text-xs text-on-surface-variant">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Tickets Subtotal</span>
            <span className="font-bold text-on-surface">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Service Fee (5%)</span>
            <span className="font-bold text-on-surface">₹{serviceFee.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">GST Taxes (18%)</span>
            <span className="font-bold text-on-surface">₹{taxes.toLocaleString('en-IN')}</span>
          </div>
          <div className="my-3 h-px bg-gray-200" />
          <div className="flex items-end justify-between">
            <span className="text-sm font-extrabold text-on-surface">Grand Total</span>
            <span className="text-2xl font-black leading-none text-brand-indigo tracking-tight">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <button
          onClick={onProceed}
          disabled={n === 0}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-indigo py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#312e81] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
        >
          <Icon name="credit_card" style={{ fontSize: 18 }} />
          Proceed to Pay
        </button>

        <button
          onClick={onClearAll}
          disabled={n === 0}
          className="mt-2.5 w-full rounded-xl border border-gray-200 bg-white py-2 text-xs font-semibold text-on-surface-variant transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear Selection
        </button>
      </div>
    </aside>
  );
}
