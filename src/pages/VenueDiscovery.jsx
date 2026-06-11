import { useState } from 'react';
import FilterChips from '../components/common/FilterChips.jsx';
import Icon from '../components/common/Icon.jsx';
import InfiniteRail from '../components/common/InfiniteRail.jsx';
import VenueCard from '../components/venues/VenueCard.jsx';
import { venues } from '../data/venues.js';

export default function VenueDiscovery() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const types = ['All', 'Arena', 'Concert Hall', 'Club', 'Open-air'];
  const filteredVenues = venues.filter((venue) => {
    const queryMatch = `${venue.name} ${venue.location} ${venue.city} ${venue.category}`.toLowerCase().includes(query.toLowerCase());
    const typeMatch = type === 'All' || venue.category.toLowerCase().includes(type.toLowerCase()) || venue.tags.join(' ').toLowerCase().includes(type.toLowerCase());
    return queryMatch && typeMatch;
  });

  return (
    <main className="pt-20">
      <section className="mx-auto max-w-[1280px] px-5 pb-12 pt-14 text-center md:px-10 md:pt-20">
        <h1 className="text-5xl font-extrabold tracking-tight text-[#1a1c1d] md:text-6xl">Explore Iconic Venues</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#464555]">
          From heritage amphitheatres to intimate underground clubs, discover the spaces where memories are made.
        </p>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left shadow-sm md:flex-row">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-100 bg-[#f9f9fa] px-3 py-3">
            <Icon name="search" className="text-[#777587]" style={{ fontSize: 17 }} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-xs outline-none placeholder:text-[#777587]" placeholder="Venue Name, City, Capacity..." />
          </label>
          <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-lg border border-gray-200 bg-white px-3 py-3 text-xs font-bold outline-none focus:border-[#3730a3]">
            {types.map((item) => <option key={item}>{item}</option>)}
          </select>
          <button type="button" className="rounded-lg border border-gray-200 bg-white px-3 py-3 text-xs font-bold transition hover:border-[#3730a3] hover:text-[#3730a3]">Amenities</button>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-10 md:px-10">
        <h2 className="mb-7 text-xl font-extrabold text-[#1a1c1d]">Venue Listings</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {venues.slice(0, 2).map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

      <InfiniteRail
        title="Horizontal Infinite Venue Showcase"
        items={venues}
        ariaLabel="Infinite venue showcase"
        renderItem={(venue, key) => <VenueCard key={key} venue={venue} marquee />}
      />

      <section className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#1a1c1d]">Venue Categories</h2>
            <p className="mt-2 text-sm text-[#464555]">Premium spaces for concerts, comedy, theatre, festivals, and live culture.</p>
          </div>
          <FilterChips items={types} activeItem={type} onChange={setType} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[#f3f3f4] px-5 py-20 text-center md:px-10">
        <Icon name="storefront" className="text-[#3730a3]" style={{ fontSize: 28 }} />
        <h2 className="mt-4 text-xl font-extrabold text-[#1a1c1d]">Venue Details Preview</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#464555]">
          See capacity, ratings, event volume, location, and venue personality before choosing the right space.
        </p>
        <button type="button" className="mt-7 rounded-lg bg-[#3730a3] px-6 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#312e81]">
          List Your Venue
        </button>
      </section>
    </main>
  );
}
