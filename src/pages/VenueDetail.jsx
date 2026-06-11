import { useParams, Link, Navigate } from 'react-router-dom';
import { venues } from '../data/venues.js';
import { events } from '../data/events.js';
import Icon from '../components/common/Icon.jsx';
import Card from '../components/common/Card.jsx';
import ImageWithSkeleton from '../components/common/ImageWithSkeleton.jsx';

/* ── Mini event card ─────────────────────────────────────────── */
function VenueEventCard({ event }) {
  const isLive = event.badge === 'Selling Fast' || event.badge === 'Trending';

  return (
    <Link to={`/events/${event.slug}`} className="block group">
      <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-gray-200">
        <div className="relative h-44 overflow-hidden bg-gray-100">
          <ImageWithSkeleton
            src={event.image}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          {/* Live / badge indicator */}
          {isLive && (
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Live
            </span>
          )}
          {event.badge && !isLive && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-brand-indigo shadow-sm backdrop-blur-sm">
              {event.badge}
            </span>
          )}
          {/* Category pill */}
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            {event.category}
          </span>
        </div>

        <div className="p-5">
          <h3 className="text-sm font-extrabold text-on-surface leading-snug line-clamp-2 group-hover:text-brand-indigo transition-colors">
            {event.title}
          </h3>
          <p className="mt-2 text-[11px] text-outline line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="mt-4 flex items-center gap-4 text-[11px] text-on-surface-variant">
            <span className="flex items-center gap-1">
              <Icon name="calendar_today" style={{ fontSize: 13 }} />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="schedule" style={{ fontSize: 13 }} />
              {event.time}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-lg font-black text-brand-indigo">₹{event.price}</span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-brand-indigo group-hover:gap-2 transition-all">
              Book Now
              <Icon name="arrow_forward" style={{ fontSize: 14 }} />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

/* ── Main venue detail page ──────────────────────────────────── */
export default function VenueDetail() {
  const { id } = useParams();
  const venue = venues.find((v) => v.id === Number(id));

  if (!venue) return <Navigate to="/venues" replace />;

  // Get all events at this venue
  const venueEvents = events.filter((e) => e.venueId === venue.id);

  // Separate into "live / selling fast" vs "upcoming"
  const liveEvents = venueEvents.filter(
    (e) => e.badge === 'Selling Fast' || e.badge === 'Trending'
  );
  const upcomingEvents = venueEvents.filter(
    (e) => e.badge !== 'Selling Fast' && e.badge !== 'Trending'
  );

  return (
    <main className="min-h-screen pt-20">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative h-[340px] md:h-[420px] overflow-hidden">
        <img
          src={venue.image}
          alt={venue.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 md:px-10">
          <div className="mx-auto max-w-[1280px]">
            {/* Breadcrumbs */}
            <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold text-white/60">
              <Link to="/venues" className="hover:text-white transition">Venues</Link>
              <Icon name="chevron_right" style={{ fontSize: 13 }} />
              <span className="text-white">{venue.name}</span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              {venue.name}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/70">
              <Icon name="location_on" style={{ fontSize: 16 }} />
              {venue.location}
            </p>

            {/* Quick stats pills */}
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
                <Icon name="groups" style={{ fontSize: 15 }} />
                {venue.capacity} Capacity
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
                <Icon name="star" style={{ fontSize: 15, color: '#fbbf24' }} />
                {venue.rating} Rating
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
                <Icon name="category" style={{ fontSize: 15 }} />
                {venue.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/70 border border-indigo-400/40 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
                <Icon name="event" style={{ fontSize: 15 }} />
                {venueEvents.length} Events
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Venue tags bar ──────────────────────────────────── */}
      <section className="border-b border-gray-200 bg-white px-5 py-4 md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mr-2">Tags</span>
          {venue.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── Events at this venue ────────────────────────────── */}
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-16">
        {venueEvents.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-14 text-center shadow-sm">
            <Icon name="event_busy" style={{ fontSize: 48, color: '#c4b5fd' }} />
            <h2 className="mt-4 text-xl font-extrabold text-on-surface">No events scheduled yet</h2>
            <p className="mt-2 text-sm text-outline">
              Check back soon — new events at {venue.name} are added regularly.
            </p>
            <Link
              to="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-indigo px-6 py-3 text-xs font-bold text-white transition hover:bg-[#312e81] hover:-translate-y-0.5"
            >
              Browse All Events
            </Link>
          </div>
        ) : (
          <>
            {/* Live / Trending Events */}
            {liveEvents.length > 0 && (
              <section className="mb-14">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200/60 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-red-600">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    Live & Trending
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">{liveEvents.length} event{liveEvents.length > 1 ? 's' : ''}</span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {liveEvents.map((event) => (
                    <VenueEventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <section>
                <div className="mb-6 flex items-center gap-3">
                  <h2 className="text-xl font-extrabold text-on-surface">Upcoming Events</h2>
                  <span className="text-xs text-gray-400 font-semibold">({upcomingEvents.length})</span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((event) => (
                    <VenueEventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* ── Back to venues CTA ─────────────────────────────── */}
      <section className="border-t border-gray-200 bg-white px-5 py-10 md:px-10">
        <div className="mx-auto max-w-[1280px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-on-surface">Discover more venues</h3>
            <p className="mt-1 text-xs text-outline">Explore our curated collection of premium event spaces.</p>
          </div>
          <Link
            to="/venues"
            className="flex items-center gap-2 rounded-xl bg-brand-indigo px-6 py-3 text-xs font-bold text-white transition hover:bg-[#312e81] hover:-translate-y-0.5"
          >
            <Icon name="arrow_back" style={{ fontSize: 16 }} />
            All Venues
          </Link>
        </div>
      </section>
    </main>
  );
}
