import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getEventDetail } from '../data/eventDetails.js';
import EventSummary from '../components/seat-selection/EventSummary.jsx';
import SeatMap from '../components/seat-selection/SeatMap.jsx';
import BookingSidebar from '../components/seat-selection/BookingSidebar.jsx';
import Icon from '../components/common/Icon.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

export default function SeatSelection() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const event = getEventDetail(slug);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [toast, setToast] = useState({ message: '', icon: '', visible: false });

  // Handle preset selected tier from EventDetails page search parameters if any
  const preSelectedTier = searchParams.get('tier');

  // Trigger brief toast alerts
  const showToast = (message, icon) => {
    setToast({ message, icon, visible: true });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  if (!event) {
    return (
      <main className="px-5 pb-24 pt-40 md:px-10 min-h-[60vh]">
        <EmptyState 
          icon="event_busy"
          title="Event Not Found"
          message="The event you are looking for does not exist or has expired."
          actionLabel="Explore Events"
          onAction={() => window.location.href = '/events'}
        />
      </main>
    );
  }

  // Toggle seat selection
  const handleSeatToggle = (seat) => {
    setSelectedSeats((current) => {
      const exists = current.some((s) => s.key === seat.key);
      if (exists) {
        showToast('Seat removed from selection', 'close');
        return current.filter((s) => s.key !== seat.key);
      } else {
        showToast(`${seat.label.split('·')[1]?.trim() || seat.label} selected`, 'check');
        return [...current, seat];
      }
    });
  };

  // Remove a specific seat by key
  const handleRemoveSeat = (key) => {
    setSelectedSeats((current) => current.filter((s) => s.key !== key));
    showToast('Seat removed', 'close');
  };

  // Clear all selections
  const handleClearAll = () => {
    setSelectedSeats([]);
    showToast('All selections cleared', 'delete_sweep');
  };

  // Proceed to Checkout/Payment page
  const handleProceed = () => {
    if (selectedSeats.length === 0) return;
    navigate(`/events/${slug}/checkout`, {
      state: {
        selectedSeats,
        event,
      },
    });
  };

  const grandTotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const serviceFee = Math.round(grandTotal * 0.05);
  const taxes = Math.round(grandTotal * 0.18);
  const totalPayable = grandTotal + serviceFee + taxes;

  return (
    <div className="min-h-screen pt-16 pb-24 lg:pb-0">
      {/* Event Header Summary Info */}
      <EventSummary event={event} />

      <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-10">
        {/* Main Grid: 70% Map, 30% Sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Seat Map Area */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <SeatMap
              event={event}
              selectedSeats={selectedSeats}
              onSeatToggle={handleSeatToggle}
            />
          </div>

          {/* Sticky Booking Sidebar (Large Screens) */}
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] lg:self-start">
            <div className="h-full rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
              <BookingSidebar
                selectedSeats={selectedSeats}
                onRemoveSeat={handleRemoveSeat}
                onClearAll={handleClearAll}
                onProceed={handleProceed}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Payment Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-filter backdrop-blur-md px-5 py-4 shadow-lg lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
            </p>
            <p className="text-xl font-black text-brand-indigo tracking-tight">
              ₹{totalPayable.toLocaleString('en-IN')}
            </p>
          </div>
          <button
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
            className="flex items-center gap-1.5 rounded-xl bg-brand-indigo px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#312e81] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
          >
            <Icon name="credit_card" style={{ fontSize: 16 }} />
            Book Now
          </button>
        </div>
      </div>

      {/* Custom Floating Toast Alert */}
      {toast.visible && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 transform rounded-2xl bg-[#0a0a0a] text-white px-5 py-3.5 text-xs font-bold shadow-2xl flex items-center gap-2.5 border border-white/10 opacity-95 transition duration-300">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-indigo-500/20 text-indigo-400">
            <Icon name={toast.icon} style={{ fontSize: 14 }} />
          </span>
          {toast.message}
        </div>
      )}
    </div>
  );
}
