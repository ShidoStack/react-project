import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import Card from '../components/common/Card.jsx';
import Icon from '../components/common/Icon.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

/* ── Animated payment portal overlay ──────────────────────────── */
function PaymentPortal({ amount, method, onSuccess, onClose }) {
  const [stage, setStage] = useState('input'); // input → processing → done
  const [upiId, setUpiId] = useState('');
  const [pin, setPin] = useState('');
  const [dots, setDots] = useState('');

  // Simulate animated dots while processing
  useEffect(() => {
    if (stage !== 'processing') return;
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? '' : d + '.')), 480);
    return () => clearInterval(id);
  }, [stage]);

  const submit = (e) => {
    e.preventDefault();
    setStage('processing');
    setTimeout(() => {
      setStage('done');
      setTimeout(onSuccess, 900);
    }, 2000);
  };

  const isUpi = method === 'upi';
  const isCard = method === 'card';
  const isNet = method === 'netbanking';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.72)' }}>
      <div
        className="relative w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white"
        style={{ background: 'linear-gradient(145deg,#13132a,#0d0d1f)' }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-400/30 flex items-center justify-center">
              <Icon name="lock" style={{ fontSize: 16, color: '#818cf8' }} />
            </div>
            <div>
              <p className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-[0.18em]">Secure Payment</p>
              <p className="text-base font-black tracking-tight">₹{amount.toLocaleString('en-IN')}</p>
            </div>
          </div>
          {stage === 'input' && (
            <button onClick={onClose} className="text-white/40 hover:text-white/80 transition text-xl leading-none">&times;</button>
          )}
        </div>

        <div className="px-6 py-7">
          {/* ── INPUT STAGE ── */}
          {stage === 'input' && (
            <form onSubmit={submit} className="space-y-5">
              {isUpi && (
                <>
                  {/* Mock UPI QR */}
                  <div className="flex flex-col items-center gap-3 py-4">
                    <div className="rounded-2xl bg-white p-4 shadow-lg">
                      <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
                        <rect x="1" y="1" width="22" height="22" rx="2" fill="white" stroke="#e2e8f0" strokeWidth="0.5"/>
                        <rect x="3" y="3" width="6" height="6" rx="1" fill="#3730a3"/>
                        <rect x="15" y="3" width="6" height="6" rx="1" fill="#3730a3"/>
                        <rect x="3" y="15" width="6" height="6" rx="1" fill="#3730a3"/>
                        <rect x="4" y="4" width="4" height="4" fill="white" rx="0.5"/>
                        <rect x="16" y="4" width="4" height="4" fill="white" rx="0.5"/>
                        <rect x="4" y="16" width="4" height="4" fill="white" rx="0.5"/>
                        <rect x="5" y="5" width="2" height="2" fill="#3730a3" rx="0.3"/>
                        <rect x="17" y="5" width="2" height="2" fill="#3730a3" rx="0.3"/>
                        <rect x="5" y="17" width="2" height="2" fill="#3730a3" rx="0.3"/>
                        <rect x="10" y="4" width="1.5" height="1.5" fill="#3730a3"/>
                        <rect x="13" y="4" width="1.5" height="1.5" fill="#3730a3"/>
                        <rect x="11" y="7" width="1.5" height="1.5" fill="#3730a3"/>
                        <rect x="13" y="9" width="1.5" height="1.5" fill="#3730a3"/>
                        <rect x="15" y="11" width="1.5" height="1.5" fill="#3730a3"/>
                        <rect x="10" y="10" width="4" height="4" rx="0.5" fill="#3730a3"/>
                        <rect x="10" y="15" width="1.5" height="4" fill="#3730a3"/>
                        <rect x="12" y="17" width="4" height="1.5" fill="#3730a3"/>
                        <rect x="16" y="15" width="1.5" height="1.5" fill="#3730a3"/>
                        <rect x="18" y="13" width="1.5" height="1.5" fill="#3730a3"/>
                      </svg>
                    </div>
                    <p className="text-[10px] text-white/40 font-semibold">Or enter UPI ID manually</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-white/50 mb-2">UPI ID</label>
                    <input
                      type="text"
                      required
                      placeholder="yourname@okaxis"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full rounded-xl bg-white/12 border border-white/20 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-indigo-400 focus:bg-white/15 transition placeholder:text-white/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-white/50 mb-2">UPI PIN</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••"
                      maxLength="6"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="w-full rounded-xl bg-white/12 border border-white/20 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-indigo-400 focus:bg-white/15 transition placeholder:text-white/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                </>
              )}

              {isCard && (
                <>
                  {/* Animated card visual */}
                  <div
                    className="rounded-2xl p-5 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg,#4338ca,#6d28d9,#7c3aed)' }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col gap-0.5">
                        <div className="text-[9px] font-extrabold tracking-[0.2em] text-white/50 uppercase">MEHFILX</div>
                        <div className="text-[9px] font-extrabold tracking-[0.2em] text-white/30 uppercase">Ticketing</div>
                      </div>
                      <svg width="36" height="24" viewBox="0 0 48 32">
                        <circle cx="18" cy="16" r="14" fill="#ef4444" opacity="0.85"/>
                        <circle cx="30" cy="16" r="14" fill="#f97316" opacity="0.85"/>
                        <path d="M24 5.5a14 14 0 0 1 0 21 14 14 0 0 1 0-21z" fill="#fbbf24" opacity="0.5"/>
                      </svg>
                    </div>
                    <p className="text-sm font-mono tracking-[0.15em] text-white/80 mb-4">•••• •••• •••• 4242</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[8px] text-white/40 uppercase tracking-widest">Card Holder</p>
                        <p className="text-xs font-bold text-white">YOUR NAME</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-white/40 uppercase tracking-widest">Expires</p>
                        <p className="text-xs font-bold text-white">MM/YY</p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="4532 •••• •••• ••••"
                    maxLength="19"
                    className="w-full rounded-xl bg-white/12 border border-white/20 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-indigo-400 focus:bg-white/15 transition placeholder:text-white/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength="5"
                      className="rounded-xl bg-white/12 border border-white/20 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-indigo-400 focus:bg-white/15 transition placeholder:text-white/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]"
                    />
                    <input
                      type="password"
                      required
                      placeholder="CVV"
                      maxLength="3"
                      className="rounded-xl bg-white/12 border border-white/20 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-indigo-400 focus:bg-white/15 transition placeholder:text-white/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                </>
              )}

              {isNet && (
                <div className="space-y-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/50 mb-3">Select Your Bank</p>
                  {['HDFC Bank', 'SBI – State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank'].map((bank) => (
                    <label key={bank} className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 cursor-pointer hover:border-indigo-400 transition has-[:checked]:border-indigo-400 has-[:checked]:bg-indigo-600/10">
                      <input type="radio" name="bank" value={bank} required className="accent-indigo-400" />
                      <span className="text-sm font-semibold text-white/80">{bank}</span>
                    </label>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 rounded-xl py-4 text-sm font-extrabold tracking-wide transition-all hover:-translate-y-0.5 active:scale-95"
                style={{ background: 'linear-gradient(135deg,#4338ca,#7c3aed)' }}
              >
                Pay ₹{amount.toLocaleString('en-IN')} Securely
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/25 font-semibold mt-1">
                <Icon name="lock" style={{ fontSize: 11 }} />
                256-bit SSL encrypted · PCI DSS compliant
              </div>
            </form>
          )}

          {/* ── PROCESSING STAGE ── */}
          {stage === 'processing' && (
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-400 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="lock" style={{ fontSize: 22, color: '#818cf8' }} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-extrabold tracking-tight">Processing Payment{dots}</p>
                <p className="text-xs text-white/40 mt-1">Verifying your transaction. Do not close this window.</p>
              </div>
              <div className="w-full bg-white/8 rounded-full h-1.5 overflow-hidden">
                <div className="h-full rounded-full bg-indigo-400 animate-[grow_2s_ease-in-out_forwards]" style={{ width: '70%' }} />
              </div>
            </div>
          )}

          {/* ── DONE STAGE ── */}
          {stage === 'done' && (
            <div className="flex flex-col items-center gap-4 py-10">
              <div className="h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                <Icon name="check_circle" style={{ fontSize: 36, color: '#34d399' }} />
              </div>
              <p className="text-lg font-extrabold text-emerald-300 tracking-tight">Payment Successful!</p>
              <p className="text-xs text-white/40">Redirecting to your ticket…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Checkout page ─────────────────────────────────────────── */
export default function Checkout() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state || {};
  const { selectedSeats = [], event } = stateData;

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [portalOpen, setPortalOpen] = useState(false);

  if (!event || selectedSeats.length === 0) {
    return (
      <main className="px-5 pb-24 pt-40 md:px-10 min-h-[60vh]">
        <EmptyState 
          icon="shopping_cart"
          title="No Active Booking Session"
          message="Please select seats first to proceed to checkout."
          actionLabel="Explore Events"
          onAction={() => window.location.href = '/events'}
        />
      </main>
    );
  }

  const subtotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const serviceFee = Math.round(subtotal * 0.05);
  const taxes = Math.round(subtotal * 0.18);
  const totalPayable = subtotal + serviceFee + taxes;

  const handlePaySuccess = () => {
    setPortalOpen(false);
    navigate(`/events/${slug}/success`, {
      state: {
        selectedSeats,
        event,
        totalPaid: totalPayable,
        bookingId: `MFX-${Math.floor(100000 + Math.random() * 900000)}`,
      },
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-5 md:px-10">
      {/* Payment Portal Overlay */}
      {portalOpen && (
        <PaymentPortal
          amount={totalPayable}
          method={paymentMethod}
          onSuccess={handlePaySuccess}
          onClose={() => setPortalOpen(false)}
        />
      )}

      <div className="mx-auto max-w-[1120px]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
          <Link to="/events" className="hover:text-brand-indigo">Events</Link>
          <Icon name="chevron_right" style={{ fontSize: 14 }} />
          <Link to={`/events/${event.slug}`} className="hover:text-brand-indigo">{event.title}</Link>
          <Icon name="chevron_right" style={{ fontSize: 14 }} />
          <Link to={`/events/${event.slug}/seats`} className="hover:text-brand-indigo">Select Seats</Link>
          <Icon name="chevron_right" style={{ fontSize: 14 }} />
          <span className="text-gray-700">Checkout</span>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-on-surface">Review &amp; Pay</h1>
        <p className="mt-1 text-sm text-outline">Complete your checkout inside 10 minutes to secure your tickets.</p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Event details + Payment method selector */}
          <div className="lg:col-span-7 space-y-8">
            {/* Event card */}
            <Card className="rounded-3xl p-6 border-gray-200">
              <h2 className="text-lg font-extrabold text-on-surface">Event details</h2>
              <div className="mt-4 flex gap-4">
                <img
                  src={event.image || event.heroImage}
                  alt={event.title}
                  className="h-20 w-28 rounded-2xl object-cover border border-gray-200 shadow-sm"
                />
                <div>
                  <h3 className="text-base font-extrabold text-on-surface leading-snug">{event.title}</h3>
                  <p className="mt-1 text-xs text-outline flex items-center gap-1.5">
                    <Icon name="location_on" style={{ fontSize: 14 }} />
                    {event.venue}, {event.city}
                  </p>
                  <p className="mt-1.5 text-xs font-bold text-indigo-600 flex items-center gap-1.5">
                    <Icon name="calendar_today" style={{ fontSize: 14 }} />
                    {event.date} · {event.time}
                  </p>
                </div>
              </div>
            </Card>

            {/* Payment method chooser */}
            <Card className="rounded-3xl p-6 border-gray-200">
              <h2 className="text-lg font-extrabold text-on-surface">Payment method</h2>
              <p className="mt-1 text-xs text-outline">Choose your preferred way to pay securely.</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { id: 'upi', icon: 'qr_code_2', label: 'UPI / GPay' },
                  { id: 'card', icon: 'credit_card', label: 'Card' },
                  { id: 'netbanking', icon: 'account_balance', label: 'Net Banking' },
                ].map(({ id, icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border py-4 text-xs font-bold transition ${
                      paymentMethod === id
                        ? 'border-brand-indigo bg-indigo-50/30 text-brand-indigo'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-brand-indigo hover:text-brand-indigo'
                    }`}
                  >
                    <Icon name={icon} style={{ fontSize: 24 }} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Security badges */}
              <div className="mt-6 flex items-center gap-4 py-3 px-4 bg-gray-50 rounded-xl border border-gray-100">
                <Icon name="verified_user" style={{ fontSize: 20, color: '#10b981' }} />
                <div>
                  <p className="text-xs font-extrabold text-gray-700">100% Secure Payment</p>
                  <p className="text-[10px] text-gray-400">256-bit SSL encrypted · PCI DSS Compliant · RBI Regulated</p>
                </div>
              </div>

              {/* Open portal CTA */}
              <button
                type="button"
                onClick={() => setPortalOpen(true)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-extrabold text-white shadow-md transition-all hover:bg-zinc-800 hover:-translate-y-0.5"
              >
                <Icon name="lock" style={{ fontSize: 16 }} />
                Pay Securely ₹{totalPayable.toLocaleString('en-IN')}
              </button>
            </Card>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-3xl p-6 border-gray-200">
              <h2 className="text-lg font-extrabold text-on-surface">Selected tickets</h2>
              <div className="mt-4 max-h-[220px] overflow-y-auto divide-y divide-gray-100 pr-2">
                {selectedSeats.map((s) => (
                  <div key={s.key} className="flex justify-between py-3">
                    <div>
                      <div className="text-xs font-bold text-on-surface">{s.label}</div>
                      <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{s.zone}</div>
                    </div>
                    <div className="text-xs font-black text-on-surface">₹{s.price.toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-6 pt-5 space-y-3 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span className="font-semibold">Subtotal ({selectedSeats.length} ticket{selectedSeats.length > 1 ? 's' : ''})</span>
                  <span className="font-bold text-on-surface">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Service Fee (5%)</span>
                  <span className="font-bold text-on-surface">₹{serviceFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">GST Taxes (18%)</span>
                  <span className="font-bold text-on-surface">₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-gray-200 my-4 pt-4 flex items-end justify-between">
                  <span className="text-sm font-extrabold text-on-surface">Grand Total</span>
                  <span className="text-xl font-black text-brand-indigo">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
