export default function FilterChips({ items, activeItem, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`filter-chip ${activeItem === item ? 'filter-chip-active' : ''}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
