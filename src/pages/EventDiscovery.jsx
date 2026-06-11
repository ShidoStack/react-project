import { useMemo, useState } from 'react';
import EventCard from '../components/events/EventCard.jsx';
import EventHeroCard from '../components/events/EventHeroCard.jsx';
import EventSearch from '../components/events/EventSearch.jsx';
import FilterChips from '../components/common/FilterChips.jsx';
import Icon from '../components/common/Icon.jsx';
import InfiniteRail from '../components/common/InfiniteRail.jsx';
import { events } from '../data/events.js';

function TrendingSearches() {
  const items = ['Arijit Singh', 'Stand-up Comedy', 'Jazz Festivals', 'Art Exhibitions'];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-bold text-[#1a1c1d]">Trending:</span>
      {items.map((item) => (
        <button key={item} type="button" className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-[#1a1c1d] transition hover:-translate-y-0.5 hover:border-[#3730a3] hover:text-[#3730a3]">
          {item}
        </button>
      ))}
    </div>
  );
}

export default function EventDiscovery() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Featured');
  const categories = ['All', 'Concert', 'Comedy', 'Festival', 'Theatre', 'Cultural'];

  const filteredEvents = useMemo(() => {
    const matches = events.filter((event) => {
      const queryMatch = `${event.title} ${event.venue} ${event.city} ${event.category}`.toLowerCase().includes(query.toLowerCase());
      const categoryMatch = category === 'All' || event.category.toLowerCase().includes(category.toLowerCase());
      return queryMatch && categoryMatch;
    });
    return [...matches].sort((a, b) => (sort === 'Price: Low to High' ? a.price - b.price : a.id - b.id));
  }, [category, query, sort]);

  return (
    <main className="pt-20">
      <section className="mx-auto max-w-[1280px] px-5 pb-12 pt-14 md:px-10 md:pt-20">
        <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-[#1a1c1d] md:text-6xl">Explore Experiences</h1>
        <EventSearch />
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TrendingSearches />
          <label className="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold md:w-auto">
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent outline-none">
              <option>Featured</option>
              <option>Price: Low to High</option>
            </select>
          </label>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-10 md:px-10">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#1a1c1d]">Recommendations</h2>
          <div className="hidden gap-2 md:flex">
            <button className="icon-button" type="button" aria-label="Previous featured events"><Icon name="arrow_back" style={{ fontSize: 18 }} /></button>
            <button className="icon-button" type="button" aria-label="Next featured events"><Icon name="arrow_forward" style={{ fontSize: 18 }} /></button>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <EventHeroCard event={events[0]} wide />
          <EventHeroCard event={events[1]} />
        </div>
      </section>

      <InfiniteRail
        title="Auto-Scrolling Event Showcase"
        items={events}
        ariaLabel="Infinite event showcase"
        renderItem={(event, key) => (
          <div key={key} className="w-[300px] shrink-0 md:w-[360px]">
            <EventCard event={event} />
          </div>
        )}
      />

      <section className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#1a1c1d]">Discovery Content</h2>
            <p className="mt-2 text-sm text-[#464555]">Curated live experiences across music, comedy, culture, and theatre.</p>
          </div>
          <FilterChips items={categories} activeItem={category} onChange={setCategory} />
        </div>
        <label className="mb-5 flex max-w-md items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <Icon name="search" className="text-[#777587]" style={{ fontSize: 17 }} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-[#777587]" placeholder="Search cards by event, city, venue..." />
        </label>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
}
