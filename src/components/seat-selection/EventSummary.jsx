import { Link } from 'react-router-dom';
import Icon from '../common/Icon.jsx';

export default function EventSummary({ event }) {
  if (!event) return null;

  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 bg-white px-5 py-4 md:px-10 lg:flex-row lg:items-center lg:justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <Link
          to={`/events/${event.slug}`}
          className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-brand-indigo hover:text-brand-indigo focus:outline-none focus:ring-2 focus:ring-brand-indigo"
          title="Back to Event Details"
        >
          <Icon name="arrow_back" style={{ fontSize: 20 }} />
        </Link>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-indigo border border-indigo-100/50">
              {event.category}
            </span>
            <h1 className="text-xl font-extrabold tracking-tight text-on-surface md:text-2xl">
              {event.title}
            </h1>
          </div>
          <p className="mt-1 text-xs text-outline flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-on-surface-variant">{event.venue}</span>
            <span className="text-gray-300">·</span>
            <span>{event.location || `${event.venue}, ${event.city}`}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6 border-t border-gray-100 pt-3 lg:border-t-0 lg:pt-0">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-outline">Date & Time</p>
          <p className="mt-0.5 text-sm font-bold text-on-surface">
            {event.date.includes('2025') ? event.date : `${event.date}, 2025`} · {event.time}
          </p>
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-outline">Starting Price</p>
          <p className="mt-0.5 text-base font-black text-brand-indigo">
            ₹{event.price.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
}
