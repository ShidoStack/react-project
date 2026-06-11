import { Link } from 'react-router-dom';
import Card from '../common/Card.jsx';
import Icon from '../common/Icon.jsx';
import ImageWithSkeleton from '../common/ImageWithSkeleton.jsx';

export default function EventCard({ event }) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden">
      <Link to={`/events/${event.slug}`} className="absolute inset-0 z-10" aria-label={`View details for ${event.title}`} />
      <div className="relative h-52 overflow-hidden bg-gray-200">
        <ImageWithSkeleton src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <button type="button" className="absolute right-4 top-4 z-20 grid h-8 w-8 place-items-center rounded-lg bg-white/90 text-[#464555] shadow-sm backdrop-blur transition hover:text-[#3730a3]" aria-label={`Save ${event.title}`}>
          <Icon name="bookmark" style={{ fontSize: 18 }} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-sm bg-[#e2dfff] px-2 py-1 text-[11px] font-bold text-[#3730a3]">{event.category}</span>
          {event.badge && <span className="text-[11px] font-semibold text-[#ba1a1a]">{event.badge}</span>}
        </div>
        <h3 className="text-base font-extrabold leading-6 text-[#1a1c1d]">{event.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#464555]">{event.description}</p>
        <dl className="mt-auto grid gap-2 border-t border-gray-100 pt-4 text-xs text-[#464555]">
          <div className="flex justify-between gap-4">
            <dt>{event.date} · {event.time}</dt>
            <dd className="font-extrabold text-[#1a1c1d]">${event.price}</dd>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="location_on" style={{ fontSize: 15 }} />
            <span>{event.venue}, {event.city}</span>
          </div>
        </dl>
        <Link to={`/events/${event.slug}`} className="relative z-20 mt-4 rounded-lg border border-gray-200 px-4 py-2 text-center text-xs font-bold text-[#1a1c1d] transition hover:border-[#3730a3] hover:bg-[#3730a3] hover:text-white">
          View Details
        </Link>
      </div>
    </Card>
  );
}
