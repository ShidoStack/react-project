import { Link } from 'react-router-dom';
import Icon from '../common/Icon.jsx';
import ImageWithSkeleton from '../common/ImageWithSkeleton.jsx';

export default function EventHeroCard({ event, wide = false }) {
  return (
    <article className={`group relative min-h-[360px] overflow-hidden rounded-sm bg-black text-white shadow-sm ${wide ? 'md:col-span-2' : ''}`}>
      <Link to={`/events/${event.slug}`} className="absolute inset-0 z-10" aria-label={`View details for ${event.title}`} />
      <ImageWithSkeleton src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
      <div className="relative flex h-full min-h-[360px] flex-col justify-end p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-sm bg-brand-indigo px-2 py-1 text-[11px] font-bold">{event.category}</span>
          {event.badge && <span className="text-xs font-semibold">{event.badge}</span>}
        </div>
        <h2 className="max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">{event.title}</h2>
        <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-white/90">{event.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
          <span className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1"><Icon name="calendar_today" style={{ fontSize: 15 }} /> {event.date} · {event.time}</span>
            <span className="inline-flex items-center gap-1"><Icon name="location_on" style={{ fontSize: 15 }} /> {event.venue}</span>
          </span>
          <span className="text-base font-extrabold">From ${event.price}</span>
        </div>
      </div>
    </article>
  );
}
