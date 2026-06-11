import { useState, useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Card from '../components/common/Card.jsx';
import Icon from '../components/common/Icon.jsx';

/* ── Realistic ticket QR code ─────────────────────────────────── */
function TicketQR({ bookingId }) {
  // Simple deterministic pattern based on bookingId string
  const seed = bookingId ? bookingId.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : 42;
  const cells = [];
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      // Corners are always solid finder patterns
      const isCorner =
        (r < 3 && c < 3) ||
        (r < 3 && c > 3) ||
        (r > 3 && c < 3);
      const filled = isCorner ? true : ((seed * (r + 1) * (c + 1) * 7) % 13) < 6;
      if (filled) cells.push({ r, c });
    }
  }
  return (
    <svg width="72" height="72" viewBox="0 0 9 9">
      <rect width="9" height="9" fill="white" />
      {/* Finder squares */}
      {[[0, 0], [6, 0], [0, 6]].map(([cx, cy]) => (
        <g key={`${cx}${cy}`}>
          <rect x={cx} y={cy} width="3" height="3" rx="0.3" fill="#1a1c1d" />
          <rect x={cx + 0.5} y={cy + 0.5} width="2" height="2" fill="white" />
          <rect x={cx + 1} y={cy + 1} width="1" height="1" rx="0.15" fill="#1a1c1d" />
        </g>
      ))}
      {/* Data cells */}
      {cells.filter(({ r, c }) => !(r < 3 && c < 3) && !(r < 3 && c >= 6) && !(r >= 6 && c < 3)).map(({ r, c }) => (
        <rect key={`${r}${c}`} x={c + 0.12} y={r + 0.12} width="0.76" height="0.76" rx="0.12" fill="#1a1c1d" />
      ))}
    </svg>
  );
}

/* ── Barcode strip ───────────────────────────────────────────── */
function Barcode({ bookingId }) {
  const seed = bookingId ? bookingId.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : 42;
  const bars = Array.from({ length: 48 }, (_, i) => {
    const thick = ((seed * (i + 3) * 17) % 7) < 2;
    return thick ? 3.5 : 1.5;
  });
  let x = 0;
  const paths = [];
  bars.forEach((w, i) => {
    if (i % 2 === 0) paths.push({ x, w }); // dark bars
    x += w + 1.5;
  });
  const totalW = x;
  return (
    <svg width="160" height="40" viewBox={`0 0 ${totalW} 30`} preserveAspectRatio="xMidYMid meet">
      {paths.map(({ x: bx, w }, i) => (
        <rect key={i} x={bx} y={0} width={w} height={30} fill="#1a1c1d" rx="0.5" />
      ))}
    </svg>
  );
}

/* ── Success toast banner ─────────────────────────────────────── */
function SuccessToast({ onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className={`fixed top-6 left-1/2 z-[200] -translate-x-1/2 transition-all duration-400 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl border border-emerald-400/30 text-white text-sm font-bold"
        style={{ background: 'linear-gradient(135deg,#065f46,#047857)' }}
      >
        <div className="h-7 w-7 rounded-full bg-emerald-400/20 flex items-center justify-center">
          <Icon name="check_circle" style={{ fontSize: 18, color: '#34d399' }} />
        </div>
        <span>🎉 Seat booked successfully! Your ticket is ready.</span>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
export default function BookingSuccess() {
  const location = useLocation();
  const stateData = location.state || {};
  const { selectedSeats = [], event, totalPaid = 0, bookingId } = stateData;

  const [toastDone, setToastDone] = useState(false);

  if (!event || selectedSeats.length === 0) {
    return <Navigate to="/events" replace />;
  }

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-5 md:px-10">
      {/* Success Toast */}
      {!toastDone && <SuccessToast onDone={() => setToastDone(true)} />}

      <div className="mx-auto max-w-[640px]">
        {/* Top success icon */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200/60 shadow-md flex items-center justify-center mb-5">
            <Icon name="check_circle" style={{ fontSize: 36, color: '#10b981' }} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Booking Confirmed!</h1>
          <p className="mt-2 text-sm text-outline">
            Your seats are locked in. A confirmation email & SMS has been sent.
          </p>
        </div>

        {/* ── TICKET CARD ── */}
        <Card className="mt-10 rounded-3xl overflow-hidden shadow-xl border-0 relative">
          {/* Top color bar */}
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

          <div className="p-6 md:p-8">
            {/* Header: Booking ID + status */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Confirmation ID</p>
                <h2 className="text-xl font-black text-on-surface mt-0.5 tracking-tight">{bookingId}</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 border border-emerald-200/60">
                ✓ Paid
              </span>
            </div>

            <div className="mt-5 border-t border-dashed border-gray-200" />

            {/* Event info */}
            <div className="mt-5 flex gap-4 items-start">
              <img
                src={event.image || event.heroImage}
                alt={event.title}
                className="h-16 w-20 rounded-xl object-cover shadow-sm border border-gray-100 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400">Event</p>
                <h3 className="text-base font-extrabold text-on-surface leading-snug mt-0.5">{event.title}</h3>
                <p className="mt-1 text-[11px] text-outline flex items-center gap-1">
                  <Icon name="location_on" style={{ fontSize: 12 }} />
                  {event.venue}, {event.city}
                </p>
                <p className="mt-0.5 text-[11px] font-bold text-indigo-600 flex items-center gap-1">
                  <Icon name="calendar_today" style={{ fontSize: 12 }} />
                  {event.date} · {event.time}
                </p>
              </div>
            </div>

            {/* Seats */}
            <div className="mt-5">
              <p className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Booked Seats</p>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((s) => (
                  <span
                    key={s.key}
                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-[11px] font-bold text-indigo-700"
                  >
                    <Icon name="event_seat" style={{ fontSize: 11 }} />
                    {s.label.split('·')[1]?.trim() || s.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Amount + QR + Barcode section — ticket punch style */}
            <div className="mt-6 -mx-6 md:-mx-8">
              <div className="border-t-2 border-dashed border-gray-200 relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-surface border border-gray-200" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-surface border border-gray-200" />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Amount paid */}
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400">Amount Paid</p>
                <p className="text-2xl font-black text-brand-indigo mt-0.5">₹{totalPaid.toLocaleString('en-IN')}</p>
              </div>

              {/* QR + Barcode combo */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                  <TicketQR bookingId={bookingId} />
                  <div className="border-t border-gray-100 pt-2 w-full flex justify-center">
                    <Barcode bookingId={bookingId} />
                  </div>
                  <p className="text-[8px] font-extrabold tracking-[0.25em] text-gray-400 uppercase mt-0.5">ENTRY PASS · SCAN AT GATE</p>
                </div>
              </div>
            </div>

            {/* Footer branding */}
            <div className="mt-5 text-center">
              <p className="text-[9px] font-extrabold tracking-[0.3em] text-gray-300 uppercase">MehfilX Ticketing · Verified Booking</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold shadow-md"
          >
            <Icon name="picture_as_pdf" style={{ fontSize: 18 }} />
            Download as PDF
          </button>
          <Link
            to="/events"
            className="btn-secondary flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold border-gray-200"
          >
            Explore More Events
          </Link>
        </div>
      </div>
    </div>
  );
}
