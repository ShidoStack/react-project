import { useMemo, useState } from 'react';
import EventCard from '../components/events/EventCard.jsx';
import FilterChips from '../components/common/FilterChips.jsx';
import Icon from '../components/common/Icon.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { events } from '../data/events.js';

export default function EventDiscovery() {
  const [category, setCategory] = useState('All');
  const [city, setCity] = useState('All Cities');
  const [sort, setSort] = useState('Featured');

  const categories = useMemo(() => ['All', ...new Set(events.map(e => e.category))], []);
  const cities = useMemo(() => ['All Cities', ...new Set(events.map(e => e.city))], []);

  const filteredEvents = useMemo(() => {
    const matches = events.filter((event) => {
      const categoryMatch = category === 'All' || event.category === category;
      const cityMatch = city === 'All Cities' || event.city === city;
      return categoryMatch && cityMatch;
    });

    return [...matches].sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      if (sort === 'Date') return new Date(a.date) - new Date(b.date);
      if (sort === 'Name A-Z') return a.title.localeCompare(b.title);
      return a.id - b.id; // Featured
    });
  }, [category, city, sort]);

  return (
    <main className="min-h-screen pt-24 pb-20">
      <section className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="text-center md:text-left mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">Explore Experiences</h1>
          <p className="mt-3 text-lg text-outline">Discover live events curated just for you.</p>
        </div>

        {/* Search & Filters */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm mb-10 space-y-5">
          <div className="flex w-full items-center gap-2 pb-2">
            <Icon name="category" className="text-brand-indigo" style={{ fontSize: 20 }} />
            <span className="text-sm font-bold text-on-surface">Browse by Category</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1 overflow-x-auto pb-2 -mb-2 no-scrollbar">
              <FilterChips items={categories} activeItem={category} onChange={setCategory} />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <label className="flex items-center gap-2 rounded-lg border border-gray-200 bg-surface px-3 py-2 text-xs font-semibold">
                <Icon name="location_on" className="text-outline" style={{ fontSize: 16 }} />
                <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent outline-none cursor-pointer">
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>

              <label className="flex items-center gap-2 rounded-lg border border-gray-200 bg-surface px-3 py-2 text-xs font-semibold">
                <Icon name="sort" className="text-outline" style={{ fontSize: 16 }} />
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent outline-none cursor-pointer">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Date</option>
                  <option>Name A-Z</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-on-surface">
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </h2>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="search_off"
            title="No events found"
            message="We couldn't find any experiences matching your current filters. Try adjusting your search or clearing the filters."
            actionLabel="Clear all filters"
            onAction={() => { setCategory('All'); setCity('All Cities'); }}
          />
        )}
      </section>
    </main>
  );
}
