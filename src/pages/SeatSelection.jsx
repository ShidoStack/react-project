import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Card from '../components/common/Card.jsx';
import Icon from '../components/common/Icon.jsx';
import { getEventDetail } from '../data/eventDetails.js';

function parsePrice(price) {
  return Number(String(price).replace(/[^\d]/g, '')) || 0;
}

export default function SeatSelection() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const event = getEventDetail(slug);
  const initialTier = searchParams.get('tier');
  const [selectedTier, setSelectedTier] = useState(initialTier || event?.ticketTiers?.[0]?.name || '');
  const [selectedSeats, setSelectedSeats] = useState(['A12', 'A13']);

  const tier = event?.ticketTiers.find((item) => item.name === selectedTier) ?? event?.ticketTiers[0];
  const seatRows = ['A', 'B', 'C', 'D'];
  const total = useMemo(() => parsePrice(tier?.price) * selectedSeats.length, [selectedSeats.length, tier?.price]);

  if (!event) {
    return (
      <main className="px-5 pb-24 pt-40 md:px-10">
        <div className="mx-auto max-w-[760px] rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1a1c1d]">Event not found</h1>
          <Link to="/events" className="btn-primary mt-8 inline-flex rounded-xl px-6 py-3 text-sm font-bold">Explore Events</Link>
        </div>
      </main>
    );
  }

  const toggleSeat = (seat) => {
    setSelectedSeats((current) => (current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]));
  };

  return (
    <main className="px-5 pb-20 pt-32 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <Link to={`/events/${event.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#464555] transition hover:text-[#3730a3]">
          <Icon name="arrow_back" style={{ fontSize: 18 }} /> Back to event details
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <section>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#4f46e5]">Seat Selection</p>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-[#1a1c1d]">{event.title}</h1>
            <p className="mt-3 text-[#464555]">{event.shortDate} · {event.venue}, {event.city}</p>

            <Card className="mt-10 rounded-3xl p-6">
              <div className="rounded-2xl border border-gray-200 bg-[#f9f9fa] p-6 text-center">
                <div className="mx-auto h-10 max-w-xl rounded-t-full bg-[#1a1c1d] text-xs font-extrabold uppercase tracking-[0.2em] text-white flex items-center justify-center">
                  Stage
                </div>
                <div className="mt-10 grid gap-4">
                  {seatRows.map((row) => (
                    <div key={row} className="flex items-center justify-center gap-3">
                      <span className="w-6 text-sm font-extrabold text-[#777587]">{row}</span>
                      {Array.from({ length: 12 }, (_, index) => {
                        const seat = `${row}${index + 1}`;
                        const selected = selectedSeats.includes(seat);
                        const blocked = row === 'D' && index > 7;
                        return (
                          <button
                            key={seat}
                            type="button"
                            disabled={blocked}
                            onClick={() => toggleSeat(seat)}
                            className={`h-9 w-9 rounded-lg border text-xs font-bold transition ${
                              selected
                                ? 'border-[#4f46e5] bg-[#4f46e5] text-white'
                                : blocked
                                  ? 'cursor-not-allowed border-gray-200 bg-gray-200 text-gray-400'
                                  : 'border-gray-200 bg-white text-[#464555] hover:border-[#4f46e5] hover:text-[#4f46e5]'
                            }`}
                            aria-label={`${selected ? 'Deselect' : 'Select'} seat ${seat}`}
                          >
                            {index + 1}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-bold text-[#777587]">
                  <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded bg-white border border-gray-200" /> Available</span>
                  <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded bg-[#4f46e5]" /> Selected</span>
                  <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded bg-gray-200" /> Unavailable</span>
                </div>
              </div>
            </Card>
          </section>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Card className="rounded-3xl p-6">
              <h2 className="text-2xl font-extrabold text-[#1a1c1d]">Booking Summary</h2>
              <label className="mt-6 block">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#777587]">Ticket tier</span>
                <select value={selectedTier} onChange={(event) => setSelectedTier(event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#4f46e5]">
                  {event.ticketTiers.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </select>
              </label>
              <div className="mt-6 rounded-2xl border border-gray-200 bg-[#f9f9fa] p-4">
                <p className="text-sm font-bold text-[#464555]">Selected seats</p>
                <p className="mt-2 text-xl font-extrabold text-[#1a1c1d]">{selectedSeats.length ? selectedSeats.join(', ') : 'None'}</p>
              </div>
              <dl className="mt-6 grid gap-3 border-t border-gray-200 pt-6 text-sm">
                <div className="flex justify-between"><dt className="text-[#777587]">Ticket price</dt><dd className="font-bold text-[#1a1c1d]">{tier?.price}</dd></div>
                <div className="flex justify-between"><dt className="text-[#777587]">Quantity</dt><dd className="font-bold text-[#1a1c1d]">{selectedSeats.length}</dd></div>
                <div className="flex justify-between text-lg"><dt className="font-extrabold text-[#1a1c1d]">Total</dt><dd className="font-extrabold text-[#1a1c1d]">₹{total.toLocaleString('en-IN')}</dd></div>
              </dl>
              <button type="button" disabled={!selectedSeats.length} className="mt-6 w-full rounded-xl bg-[#4f46e5] px-5 py-4 text-base font-extrabold text-white transition hover:bg-[#3730a3] disabled:cursor-not-allowed disabled:bg-gray-300">
                Proceed to Payment
              </button>
              <p className="mt-3 text-center text-xs font-semibold text-[#777587]">Secure checkout · Instant digital delivery</p>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
