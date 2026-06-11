import Icon from '../common/Icon.jsx';

function Field({ label, placeholder, icon }) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1 border-b border-gray-100 px-4 py-3 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <span className="text-[11px] font-bold text-on-surface">{label}</span>
      <span className="flex items-center gap-2">
        <Icon name={icon} className="text-outline" style={{ fontSize: 16 }} />
        <input className="w-full bg-transparent text-sm outline-none placeholder:text-outline" placeholder={placeholder} />
      </span>
    </label>
  );
}

export default function EventSearch() {
  return (
    <div className="mt-8 max-w-4xl rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col md:flex-row">
        <Field label="What" placeholder="Search for events, artists..." icon="search" />
        <Field label="Where" placeholder="City or venue" icon="location_on" />
        <Field label="When" placeholder="Add dates" icon="calendar_today" />
        <div className="p-2 md:p-3">
          <button type="button" className="flex h-12 w-full items-center justify-center rounded-xl bg-brand-indigo text-white transition hover:bg-[#312e81] md:w-14" aria-label="Search events">
            <Icon name="search" />
          </button>
        </div>
      </div>
    </div>
  );
}
