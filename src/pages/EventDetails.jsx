import { createContext, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/common/Card.jsx';
import Icon from '../components/common/Icon.jsx';
import ImageWithSkeleton from '../components/common/ImageWithSkeleton.jsx';
import { getEventDetail } from '../data/eventDetails.js';

const EventDetailContext = createContext(null);

function useEventDetail() {
  return useContext(EventDetailContext);
}

function DetailLabel({ children }) {
  return <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.22em] text-[#4f46e5]">{children}</p>;
}

function Hero() {
  const eventDetail = useEventDetail();

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-black pt-20 text-white">
      <ImageWithSkeleton src={eventDetail.heroImage} alt={eventDetail.title} className="absolute inset-0 h-full w-full object-cover opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/15" />
      <div className="relative mx-auto flex min-h-[680px] max-w-[1280px] items-end px-5 pb-20 md:px-10">
        <div className="max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-white/80">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-green-500/15">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            </span>
            {eventDetail.eyebrow}
          </div>
          <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
            {eventDetail.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl font-medium leading-8 text-white/78 md:text-2xl">{eventDetail.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-5 text-sm font-semibold text-white/80">
            <span className="inline-flex items-center gap-2"><Icon name="calendar_today" style={{ fontSize: 18 }} /> {eventDetail.date}</span>
            <span className="inline-flex items-center gap-2"><Icon name="schedule" style={{ fontSize: 18 }} /> Doors {eventDetail.doors} · Show {eventDetail.show}</span>
            <span className="inline-flex items-center gap-2"><Icon name="location_on" style={{ fontSize: 18 }} /> {eventDetail.venue}, {eventDetail.city}</span>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <span className="rounded-full border border-green-400/30 bg-green-500/20 px-4 py-2 text-sm font-bold text-green-100">• {eventDetail.ticketsLeft} Tickets Left</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white/80">{eventDetail.category}</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white/80">{eventDetail.genre}</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white/80">{eventDetail.age}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingPanel() {
  const eventDetail = useEventDetail();

  return (
    <aside className="sticky top-28 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <ImageWithSkeleton src={eventDetail.crowdImage} alt="Concert audience" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-extrabold text-[#1a1c1d]">{eventDetail.title}</h2>
        <p className="mt-1 text-sm text-[#777587]">{eventDetail.shortDate} · {eventDetail.venue}</p>
        <div className="mt-5 flex items-end gap-2">
          <span className="text-4xl font-extrabold tracking-tight text-[#1a1c1d]">{eventDetail.price}</span>
          <span className="pb-1 text-sm font-semibold text-[#777587]">onwards</span>
        </div>
        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-[#464555]">
          <span className="mr-2 text-red-500">•</span>Only {eventDetail.ticketsLeft} tickets remaining across all tiers
        </div>
        <div className="mt-5 grid grid-cols-4 gap-2">
          {['Days', 'Hrs', 'Min', 'Sec'].map((unit) => (
            <div key={unit} className="rounded-xl border border-gray-200 bg-[#f9f9fa] py-3 text-center">
              <div className="text-2xl font-extrabold text-[#1a1c1d]">00</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777587]">{unit}</div>
            </div>
          ))}
        </div>
        <Link to={`/events/${eventDetail.slug}/seats`} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4f46e5] px-5 py-4 text-base font-extrabold text-white shadow-[0_12px_30px_rgba(79,70,229,0.25)] transition hover:-translate-y-0.5 hover:bg-[#3730a3]">
          <Icon name="arrow_forward" /> Book Tickets Now
        </Link>
        <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-base font-extrabold text-red-500 transition hover:bg-red-100">
          <Icon name="favorite" /> Saved to Wishlist
        </button>
        <dl className="mt-6 grid gap-3 border-t border-gray-200 pt-5 text-sm text-[#464555]">
          <div className="flex gap-3"><Icon name="location_on" className="text-[#777587]" style={{ fontSize: 18 }} /><span><strong className="text-[#1a1c1d]">{eventDetail.venue}</strong> · {eventDetail.city}</span></div>
          <div className="flex gap-3"><Icon name="schedule" className="text-[#777587]" style={{ fontSize: 18 }} /><span>Doors <strong className="text-[#1a1c1d]">{eventDetail.doors}</strong> · Show <strong className="text-[#1a1c1d]">{eventDetail.show}</strong></span></div>
          <div className="flex gap-3"><Icon name="calendar_today" className="text-[#777587]" style={{ fontSize: 18 }} /><span><strong className="text-[#1a1c1d]">{eventDetail.shortDate}</strong> · Saturday</span></div>
          <div className="flex gap-3"><Icon name="hexagon" className="text-[#777587]" style={{ fontSize: 18 }} /><span>Presented by <strong className="text-[#1a1c1d]">MehfilX Live</strong></span></div>
        </dl>
      </div>
      <div className="flex items-center gap-2 border-t border-gray-200 px-6 py-4 text-xs font-bold text-[#777587]">
        Share
        {['X', 'W', 'link'].map((item) => (
          <button key={item} type="button" className="grid h-9 min-w-9 place-items-center rounded-lg border border-gray-200 bg-[#f9f9fa] px-3 text-[#464555] transition hover:border-[#3730a3] hover:text-[#3730a3]">
            {item === 'link' ? <Icon name="link" style={{ fontSize: 16 }} /> : item}
          </button>
        ))}
      </div>
    </aside>
  );
}

function AboutSection() {
  const eventDetail = useEventDetail();

  return (
    <section className="border-b border-gray-200 pb-20">
      <DetailLabel>About The Event</DetailLabel>
      <blockquote className="border-l-4 border-[#4f46e5] pl-7 text-3xl font-extrabold leading-snug tracking-tight text-[#1a1c1d] md:text-4xl">
        "{eventDetail.quote}"
      </blockquote>
      <div className="mt-10 space-y-7 text-lg leading-9 text-[#464555]">
        {eventDetail.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function LineupSection() {
  const eventDetail = useEventDetail();

  return (
    <section className="border-b border-gray-200 py-20">
      <DetailLabel>Artist Lineup</DetailLabel>
      <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-[#1a1c1d]">Performing tonight</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {eventDetail.lineup.map((artist) => (
          <Card key={artist.name} className="group overflow-hidden rounded-2xl">
            <div className="relative h-44 overflow-hidden bg-gray-200">
              <ImageWithSkeleton src={artist.image} alt={artist.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-extrabold text-[#1a1c1d]">{artist.name}</h3>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.18em] text-[#4f46e5]">{artist.role}</p>
              <p className="mt-4 text-sm leading-6 text-[#464555]">{artist.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ScheduleSection() {
  const eventDetail = useEventDetail();

  return (
    <section className="border-b border-gray-200 py-20">
      <DetailLabel>Event Schedule</DetailLabel>
      <h2 className="mb-10 text-4xl font-extrabold tracking-tight text-[#1a1c1d]">How the night unfolds</h2>
      <div className="space-y-9">
        {eventDetail.schedule.map((item) => (
          <div key={item.title} className="grid grid-cols-[52px_1fr] gap-5">
            <div className="relative flex justify-center">
              <span className={`z-10 grid h-12 w-12 place-items-center rounded-full border-2 bg-white ${item.active ? 'border-[#4f46e5] text-[#4f46e5] shadow-[0_0_0_6px_rgba(79,70,229,0.08)]' : 'border-gray-200 text-[#777587]'}`}>
                <Icon name={item.icon} style={{ fontSize: 22 }} />
              </span>
              <span className="absolute top-12 h-[calc(100%+36px)] w-px bg-gray-200 last:hidden" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-[#4f46e5]">{item.time}</p>
              <h3 className="mt-1 text-xl font-extrabold text-[#1a1c1d]">{item.title}</h3>
              <p className="mt-2 max-w-3xl text-base leading-7 text-[#777587]">{item.description}</p>
              {item.badge && <span className="mt-3 inline-flex rounded-full border border-gray-200 bg-[#f9f9fa] px-3 py-1 text-xs font-bold text-[#777587]">{item.badge}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VenueSection() {
  const eventDetail = useEventDetail();

  return (
    <section className="border-b border-gray-200 py-20">
      <DetailLabel>Venue Information</DetailLabel>
      <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-[#1a1c1d]">{eventDetail.venue}</h2>
      <Card className="overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="relative h-80 overflow-hidden">
          <ImageWithSkeleton src={eventDetail.venueImage} alt={eventDetail.venue} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="p-7">
          <h3 className="text-2xl font-extrabold text-[#1a1c1d]">{eventDetail.venue}</h3>
          <p className="mt-2 flex items-center gap-2 text-base text-[#777587]"><Icon name="location_on" style={{ fontSize: 18 }} /> {eventDetail.location}</p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {eventDetail.venueStats.map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-gray-200 bg-[#f9f9fa] p-5">
                <div className="text-3xl font-extrabold text-[#1a1c1d]">{value}</div>
                <div className="mt-1 text-xs font-extrabold uppercase tracking-[0.18em] text-[#777587]">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {eventDetail.amenities.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-[#464555]">
                <Icon name="check_circle" style={{ fontSize: 17 }} /> {item}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}

function TicketTiers() {
  const eventDetail = useEventDetail();

  return (
    <section id="ticket-tiers" className="py-20">
      <DetailLabel>Ticket Tiers</DetailLabel>
      <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-[#1a1c1d]">Choose your experience</h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {eventDetail.ticketTiers.map((tier) => (
          <Card key={tier.name} className={`relative flex min-h-[360px] flex-col rounded-3xl p-6 ${tier.popular ? 'border-[#4f46e5] bg-[#eef0ff] ring-2 ring-[#4f46e5]' : ''}`}>
            {tier.popular && <span className="absolute right-6 top-0 rounded-b-lg bg-[#4f46e5] px-5 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-white">Most Popular</span>}
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#aaa6a3]">{tier.name}</p>
            <div className="mt-5 text-4xl font-extrabold tracking-tight text-[#1a1c1d]">{tier.price}</div>
            <p className="mt-1 text-sm text-[#aaa6a3]">per person</p>
            <ul className="mt-6 grid gap-3 text-sm text-[#464555]">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2"><Icon name="check_circle" className="text-green-500" style={{ fontSize: 18 }} /> {feature}</li>
              ))}
              {(tier.unavailable ?? []).map((feature) => (
                <li key={feature} className="flex gap-2 text-[#aaa6a3]"><Icon name="cancel" style={{ fontSize: 18 }} /> {feature}</li>
              ))}
            </ul>
            <p className={`mt-auto pt-6 text-sm font-extrabold ${tier.status.includes('Only') ? 'text-red-500' : tier.status.includes('Selling') ? 'text-orange-500' : 'text-green-600'}`}>• {tier.status}</p>
            <Link to={`/events/${eventDetail.slug}/seats?tier=${encodeURIComponent(tier.name)}`} className={`mt-5 rounded-xl px-5 py-3 text-center text-sm font-extrabold transition ${tier.popular ? 'bg-[#4f46e5] text-white hover:bg-[#3730a3]' : 'border border-gray-200 bg-[#f9f9fa] text-[#464555] hover:border-[#3730a3] hover:text-[#3730a3]'}`}>
              Select {tier.name}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}

function SimilarEvents() {
  const eventDetail = useEventDetail();

  return (
    <section className="border-t border-gray-200 px-5 py-20 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <DetailLabel>Similar Events</DetailLabel>
        <h2 className="mb-10 text-4xl font-extrabold tracking-tight text-[#1a1c1d]">You might also love</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {eventDetail.similarEvents.map((event) => (
            <Card key={event.title} className="group overflow-hidden rounded-3xl">
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <ImageWithSkeleton src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-[#4f46e5] px-3 py-1 text-xs font-bold text-white">{event.badge}</span>
              </div>
              <div className="p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#4f46e5]">{event.category}</p>
                <h3 className="mt-2 text-xl font-extrabold text-[#1a1c1d]">{event.title}</h3>
                <p className="mt-2 text-sm text-[#777587]">{event.venue} · {event.date}</p>
                <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4 text-sm font-extrabold">
                  <span className="inline-flex items-center gap-2 text-[#464555]"><Icon name="calendar_today" style={{ fontSize: 17 }} /> {event.date}</span>
                  <span className="text-[#1a1c1d]">{event.price}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}



export default function EventDetails() {
  const { slug } = useParams();
  const eventDetail = getEventDetail(slug);

  if (!eventDetail) {
    return (
      <main className="px-5 pb-24 pt-40 md:px-10">
        <div className="mx-auto max-w-[760px] rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#4f46e5]">Event not found</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1a1c1d]">This event is not available</h1>
          <p className="mt-4 text-[#464555]">Browse current MehfilX experiences and choose another live event.</p>
          <Link to="/events" className="btn-primary mt-8 inline-flex rounded-xl px-6 py-3 text-sm font-bold">Explore Events</Link>
        </div>
      </main>
    );
  }

  return (
    <EventDetailContext.Provider value={eventDetail}>
      <main className="bg-white">
        <Hero />
        <section className="px-5 md:px-10">
          <div className="mx-auto grid max-w-[1280px] gap-12 py-20 lg:grid-cols-[1fr_420px]">
            <div>
              <AboutSection />
              <LineupSection />
              <ScheduleSection />
              <VenueSection />
              <TicketTiers />
            </div>
            <div className="hidden lg:block">
              <BookingPanel />
            </div>
          </div>
        </section>
        <SimilarEvents />
        <Link to="/events" className="sr-only">Back to events</Link>
      </main>
    </EventDetailContext.Provider>
  );
}
