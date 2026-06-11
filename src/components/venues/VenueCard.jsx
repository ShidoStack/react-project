import { Link } from 'react-router-dom';
import Card from '../common/Card.jsx';
import Icon from '../common/Icon.jsx';
import ImageWithSkeleton from '../common/ImageWithSkeleton.jsx';

export default function VenueCard({ venue, marquee = false }) {
  return (
    <Link to={`/venues/${venue.id}`} className="block">
      <Card className={`group flex h-full flex-col overflow-hidden ${marquee ? 'w-[300px] shrink-0 md:w-[380px]' : ''}`}>
        <div className="relative h-56 overflow-hidden bg-gray-200">
          <ImageWithSkeleton src={venue.image} alt={venue.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-brand-indigo shadow-sm">{venue.capacity} Capacity</span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-1 flex items-start justify-between gap-4">
            <h3 className="text-base font-extrabold text-on-surface">{venue.name}</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-on-surface">
              <Icon name="star" className="text-amber-600" style={{ fontSize: 14 }} /> {venue.rating}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">{venue.location} · {venue.category}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {venue.tags.map((tag) => (
              <span key={tag} className="rounded-sm bg-gray-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">{tag}</span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-on-surface-variant">
            <span>{venue.events} upcoming events</span>
            <span className="font-bold text-brand-indigo transition group-hover:text-[#312e81]">
              View Venue →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
