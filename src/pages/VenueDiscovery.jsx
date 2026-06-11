import { useState } from 'react';
import FilterChips from '../components/common/FilterChips.jsx';
import Icon from '../components/common/Icon.jsx';
import InfiniteRail from '../components/common/InfiniteRail.jsx';
import VenueCard from '../components/venues/VenueCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { venues } from '../data/venues.js';

export default function VenueDiscovery() {
  const [type, setType] = useState('All');
  const types = ['All', 'Arena', 'Concert Hall', 'Club', 'Open-air'];
  const filteredVenues = venues.filter((venue) => {
    const typeMatch = type === 'All' || venue.category.toLowerCase().includes(type.toLowerCase()) || venue.tags.join(' ').toLowerCase().includes(type.toLowerCase());
    return typeMatch;
  });

  return (
    <main className="pt-20">
      <section className="mx-auto max-w-[1280px] px-5 mb-4 md:px-10">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">Explore Iconic Venues</h1>
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
            <h2 className="text-xl font-extrabold text-on-surface">Venue Categories</h2>
            <p className="mt-2 text-sm text-on-surface-variant">Premium spaces for concerts, comedy, theatre, festivals, and live culture.</p>
          </div>
          <FilterChips items={types} activeItem={type} onChange={setType} />
        </div>
        {filteredVenues.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="storefront"
            title="No venues found"
            message="We couldn't find any venues matching your current filters. Try adjusting your search."
            actionLabel="Clear filters"
            onAction={() => { setType('All'); }}
          />
        )}
      </section>


    </main>
  );
}
