import { Link } from 'react-router-dom';
import { useState } from 'react';
import EventCard from '../components/events/EventCard.jsx';
import Icon from '../components/common/Icon.jsx';
import { events, landingTickets, marqueeArtists } from '../data/events.js';

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-32 md:px-10">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-2/3 opacity-10 mix-blend-luminosity">
        <img src={landingTickets.background} alt="" aria-hidden="true" className="h-full w-full rounded-bl-[100px] object-cover" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-6 lg:grid-cols-12">
        <div className="flex flex-col items-start lg:col-span-6">
          <div className="glass-panel mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 shadow-sm">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#3730a3]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#464555]">The premium event platform</span>
          </div>
          <h1 className="mb-8 max-w-3xl text-[56px] font-bold leading-[1.05] tracking-tight text-[#1a1c1d] md:text-[80px]">
            Every Great Night <br />Starts With A <span className="text-[#3730a3]">Mehfil</span>
          </h1>
          <p className="mb-4 max-w-xl text-lg font-medium leading-relaxed text-[#464555]">
            Discover and book the experiences you'll talk about tomorrow.
          </p>
          <p className="mb-12 max-w-xl text-base leading-relaxed text-[#464555]">
            Curated events, verified tickets, and seamless entry for the modern cultural connoisseur.
          </p>
          <div className="flex w-full flex-col gap-5 sm:w-auto sm:flex-row">
            <Link to="/events" className="btn-primary flex items-center justify-center gap-2 rounded-full px-10 py-5 text-lg font-bold">
              Explore Upcoming Events
              <Icon name="arrow_forward" style={{ fontSize: 24 }} />
            </Link>
            <Link to="/venues" className="btn-secondary flex items-center justify-center gap-2 rounded-full px-10 py-5 text-lg font-bold">
              View Venues
            </Link>
          </div>
        </div>
        <div className="relative mt-16 hidden h-[700px] items-center justify-center lg:col-span-6 lg:mt-0 lg:flex">
          <img src={landingTickets.ticket1} alt="Comedy ticket" className="absolute z-10 w-[400px] -translate-x-16 translate-y-12 -rotate-12 rounded-[2rem] object-contain shadow-2xl transition-all duration-500 ease-out hover:z-30 hover:rotate-0" />
          <img src={landingTickets.ticket2} alt="Jazz ticket" className="absolute z-20 w-[420px] translate-x-12 -translate-y-8 rotate-6 rounded-[2rem] object-contain shadow-2xl transition-all duration-500 ease-out hover:z-30 hover:rotate-0" />
        </div>
      </div>
    </section>
  );
}

function ArtistMarquee() {
  return (
    <section className="relative overflow-hidden border-t border-gray-200 py-12">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#f9f9fa] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#f9f9fa] to-transparent" />
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
        {[0, 1].map((groupIdx) => (
          <div key={groupIdx} className="flex shrink-0 items-center gap-12">
            {marqueeArtists.map((artist, idx) => (
              <span key={`${groupIdx}-${idx}`} className="flex items-center gap-12">
                <span className="text-2xl font-bold uppercase tracking-widest text-[#464555]/40">{artist}</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7c4d8]/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedEvents() {
  return (
    <section className="px-5 py-24 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#3730a3]">Featured Events</span>
            <h2 className="text-4xl font-bold tracking-tight text-[#1a1c1d] md:text-5xl">Experiences selling out fast</h2>
          </div>
          <Link to="/events" className="hidden items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-[#1a1c1d] transition-colors hover:border-[#3730a3] hover:text-[#3730a3] md:inline-flex">
            View all events <Icon name="arrow_forward" style={{ fontSize: 18 }} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {events.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const categories = [
    { icon: 'mic', label: 'Concerts', count: '1,240 events' },
    { icon: 'theater_comedy', label: 'Stand-Up Comedy', count: '860 events' },
    { icon: 'music_note', label: 'Festivals', count: '340 events', active: true },
    { icon: 'piano', label: 'Jazz & Blues', count: '420 events' },
    { icon: 'queue_music', label: 'Classical', count: '280 events' },
    { icon: 'electric_bolt', label: 'Rock & Metal', count: '510 events' },
  ];

  return (
    <section className="border-y border-gray-200 bg-[#f3f3f4] px-5 py-24 md:px-10">
      <div className="mx-auto max-w-[1280px] text-center">
        <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-[#3730a3]">Discover By Category</span>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1c1d] md:text-5xl">Find your kind of night</h2>
        <p className="mx-auto mb-16 max-w-2xl text-lg text-[#464555]">
          From intimate jazz sessions to stadium-scale spectacles, every mood has a mehfil.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((cat) => (
            <Link key={cat.label} to="/events" className={`hover-lift flex h-40 w-40 flex-col items-center justify-center rounded-3xl bg-white p-6 ${cat.active ? 'border border-[#3730a3] shadow-md ring-1 ring-[#3730a3]' : 'border border-gray-200'}`}>
              <Icon name={cat.icon} className={`mb-4 ${cat.active ? 'text-[#3730a3]' : 'text-[#464555]'}`} style={{ fontSize: 36 }} />
              <span className="text-center text-base font-bold leading-tight text-[#1a1c1d]">{cat.label}</span>
              <span className="mt-1 text-xs text-[#464555]">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyMehfilX() {
  const reasons = [
    ['search', 'Discover, curated not cluttered', 'Our editorial team hand-picks events across genres and cities. No algorithmic noise, just great nights.'],
    ['bolt', 'Book in under 60 seconds', 'Streamlined checkout with UPI, cards, and wallets. Your ticket arrives instantly.'],
    ['confirmation_number', 'Verified tickets, zero fakes', 'Every ticket is verified, with dynamic QR technology designed for trusted entry.'],
    ['sync', 'Flexible with your plans', 'Transfer or exchange tickets up to 24 hours before an event when life changes.'],
  ];

  return (
    <section className="border-b border-gray-200 bg-[#f3f3f4] px-5 py-24 md:px-10">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="relative flex flex-col gap-5">
          <div className="bg-grid-pattern pointer-events-none absolute inset-0 rounded-3xl opacity-60" />
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                <Icon name="star" className="text-amber-400" style={{ fontSize: 16 }} /> Rated 4.9 by 210K users
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3730a3]/20 bg-[#3730a3]/5 px-3 py-1.5 text-xs font-semibold text-[#3730a3]">
                <Icon name="bolt" style={{ fontSize: 16 }} /> Instant confirmation
              </span>
            </div>
            <div className="mb-5 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5">
              <Icon name="search" className="text-[#777587]" style={{ fontSize: 16 }} />
              <span className="text-sm text-[#777587]">Search events, venues, artists...</span>
            </div>
            <div className="flex flex-col gap-2">
              {events.slice(0, 4).map((event) => (
                <div key={event.id} className="flex items-center justify-between rounded-2xl px-3 py-2 transition-colors hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-800">
                      <Icon name={event.category === 'Comedy' ? 'theater_comedy' : 'music_note'} className="text-white" style={{ fontSize: 18 }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a1c1d]">{event.title}</p>
                      <p className="text-xs text-[#464555]">{event.date} · {event.venue}</p>
                    </div>
                  </div>
                  <button className="rounded-full bg-[#3730a3] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-indigo-800">Book</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-[#3730a3]">Why MehfilX</span>
          <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[#1a1c1d] md:text-5xl">
            Built for people who<br />live for live
          </h2>
          <p className="mb-10 text-lg text-[#464555]">
            We obsessed over every detail, from discovering hidden gems to the moment you scan your ticket at the door.
          </p>
          <div className="flex flex-col divide-y divide-gray-200">
            {reasons.map(([icon, title, desc]) => (
              <div key={title} className="flex items-start gap-4 py-5">
                <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gray-100 bg-gray-100">
                  <Icon name={icon} className="text-[#464555]" style={{ fontSize: 20 }} />
                </div>
                <div>
                  <p className="mb-1 font-bold text-[#1a1c1d]">{title}</p>
                  <p className="text-sm leading-relaxed text-[#464555]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ['01', 'search', 'Discover events near you', 'Browse curated events by genre, city, date, or mood.'],
    ['02', 'event_seat', 'Choose your spot', 'Pick seats from a clear venue map and compare pricing.'],
    ['03', 'bolt', 'Pay and confirm instantly', 'One-tap checkout with instant ticket delivery.'],
    ['04', 'confirmation_number', 'Scan and enjoy', 'Show your digital ticket and walk in smoothly.'],
  ];

  return (
    <section className="bg-[#f9f9fa] px-5 py-32 md:px-10">
      <div className="mx-auto mb-20 max-w-[1280px] text-center">
        <h2 className="mx-auto mb-6 max-w-2xl text-4xl font-bold tracking-tight text-[#1a1c1d] md:text-5xl">From discovery to door<br />in minutes</h2>
        <p className="mx-auto max-w-2xl text-lg text-[#464555]">We removed every friction point between you and a great night out.</p>
      </div>
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white md:grid-cols-4">
          {steps.map(([num, icon, title, desc], i) => (
            <div key={num} className={`p-10 ${i < steps.length - 1 ? 'border-b border-gray-200 md:border-b-0 md:border-r' : ''}`}>
              <div className="mb-8 flex items-center gap-4">
                <span className="text-sm font-bold text-[#3730a3]">{num}</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-full border border-gray-100 bg-[#eeeeef]">
                <Icon name={icon} className="text-[#1a1c1d]" style={{ fontSize: 24 }} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#1a1c1d]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#464555]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureHighlights() {
  const features = [
    ['map', 'Interactive venue maps', 'Every seat is visible before you commit.'],
    ['smartphone', 'Offline tickets', 'Your QR ticket works even when the signal does not.'],
    ['notifications', 'Smart alerts', 'Know when a date, seat, or favourite artist opens up.'],
    ['group', 'Group booking', 'Coordinate with friends and split costs with less friction.'],
    ['sync', 'Flexible resale', 'List eligible tickets on the verified marketplace.'],
    ['star', 'Verified reviews', 'Reviews come from real attendees with actual tickets.'],
  ];

  return (
    <section className="border-t border-gray-200 bg-[#f9f9fa] px-5 py-32 md:px-10">
      <div className="mx-auto mb-20 max-w-[1280px] text-center">
        <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-[#3730a3]">Feature Showcase</span>
        <h2 className="mx-auto mb-6 max-w-2xl text-4xl font-bold tracking-tight text-[#1a1c1d] md:text-5xl">Every detail, considered</h2>
        <p className="mx-auto max-w-2xl text-lg text-[#464555]">Purpose-built for live entertainment, not adapted from generic commerce.</p>
      </div>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map(([icon, title, desc]) => (
          <div key={title} className="hover-lift rounded-[2rem] border border-gray-200 bg-white p-8">
            <div className="mb-6 grid h-12 w-12 place-items-center rounded-full border border-gray-200 bg-[#eeeeef]">
              <Icon name={icon} className="text-[#1a1c1d]" style={{ fontSize: 24 }} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-[#1a1c1d]">{title}</h3>
            <p className="text-sm leading-relaxed text-[#464555]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FutureRoadmap() {
  const items = [
    ['Q1 2025', 'Verified Resale Marketplace', 'Peer-to-peer ticket transfers with verification and fraud protection.', 'Shipped'],
    ['Q2 2025', 'Group Booking & Split Pay', 'Coordinate with friends and split the bill without leaving the app.', 'Shipped'],
    ['Q3 2025', 'AI-Powered Recommendations', 'Personalized event discovery that learns your taste.', 'In Progress'],
    ['Q4 2025', 'Venue & Artist Backstage Pass', 'Premium subscribers get exclusive access and pre-sales.', 'Coming soon'],
  ];

  return (
    <section className="border-t border-gray-200 bg-[#f9f9fa] px-5 py-32 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-20 max-w-2xl">
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-[#3730a3]">What's Next</span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-[#1a1c1d] md:text-5xl">Building towards the<br />best night ever</h2>
          <p className="text-lg text-[#464555]">A peek at what we're shipping, because great products are never finished.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {items.map(([quarter, title, desc, badge]) => (
            <div key={quarter}>
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-full border border-gray-200 bg-[#f3f3f4]">
                <Icon name={badge === 'In Progress' ? 'bolt' : 'check'} className={badge === 'In Progress' ? 'text-[#3730a3]' : 'text-green-500'} style={{ fontSize: 24 }} />
              </div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#464555]">{quarter}</span>
              <h3 className="mb-3 text-sm font-bold text-[#1a1c1d]">{title}</h3>
              <p className="mb-4 text-xs leading-relaxed text-[#464555]">{desc}</p>
              <span className="inline-flex rounded-full bg-[#eeeeef] px-3 py-1 text-xs font-medium text-[#464555]">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterCTA() {
  const [email, setEmail] = useState('');

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] px-5 py-20 text-white md:px-10 md:py-24">
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center text-center">
        <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-[#3730a3]">Get Early Access</span>
        <h2 className="mx-auto mb-6 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl">Your next favourite memory<br />is waiting</h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-gray-400">
          Join 80,000+ music lovers and comedy fans already on MehfilX. Drop your email, we'll take it from here.
        </p>
        <div className="mx-auto mb-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" className="flex-1 rounded-full border border-gray-800 bg-gray-900 px-5 py-3.5 text-sm font-medium text-white transition placeholder:text-gray-500 focus:border-[#3730a3] focus:outline-none focus:ring-1 focus:ring-[#3730a3]" />
          <button className="flex items-center justify-center gap-2 rounded-full bg-[#3730a3] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-indigo-600">
            Get notified <Icon name="arrow_forward" style={{ fontSize: 18 }} />
          </button>
        </div>
        <p className="text-xs text-gray-600">No spam, ever. Unsubscribe in one click.</p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none" style={{ zIndex: -2 }} />
      <div className="blob-shape top-[-200px] left-[-200px] h-[600px] w-[600px] rounded-full bg-[#c3c0ff]" />
      <div className="blob-shape right-[-100px] top-[20%] h-[500px] w-[500px] rounded-full bg-[#e2e2e3]" />
      <div className="blob-shape bottom-[10%] left-[-300px] h-[800px] w-[800px] rounded-full bg-[#3730a3]/10" />
      <HeroSection />
      <ArtistMarquee />
      <FeaturedEvents />
      <Categories />
      <WhyMehfilX />
      <HowItWorks />
      <FeatureHighlights />
      <FutureRoadmap />
      <NewsletterCTA />
    </>
  );
}
