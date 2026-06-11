import { useEffect, useMemo, useRef } from 'react';

export default function InfiniteRail({ title, items, renderItem, ariaLabel }) {
  const scrollerRef = useRef(null);
  const rafRef = useRef();
  const pausedRef = useRef(false);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const loopedItems = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const setMiddle = () => {
      scroller.scrollLeft = scroller.scrollWidth / 3;
    };

    const frame = () => {
      if (!pausedRef.current && !dragRef.current.active) {
        scroller.scrollLeft += 0.45;
        const segment = scroller.scrollWidth / 3;
        if (scroller.scrollLeft >= segment * 2) scroller.scrollLeft -= segment;
        if (scroller.scrollLeft <= 0) scroller.scrollLeft += segment;
      }
      rafRef.current = requestAnimationFrame(frame);
    };

    setMiddle();
    rafRef.current = requestAnimationFrame(frame);
    window.addEventListener('resize', setMiddle);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', setMiddle);
    };
  }, [items.length]);

  const rebalance = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const segment = scroller.scrollWidth / 3;
    if (scroller.scrollLeft >= segment * 2) scroller.scrollLeft -= segment;
    if (scroller.scrollLeft <= segment * 0.15) scroller.scrollLeft += segment;
  };

  return (
    <section className="border-y border-gray-200 bg-[#f3f3f4] py-12">
      <div className="mx-auto mb-6 flex max-w-[1280px] items-center justify-between px-5 md:px-10">
        <h2 className="text-xl font-extrabold tracking-tight text-[#1a1c1d]">{title}</h2>
        <span className="hidden text-xs font-semibold text-[#464555] sm:block">Drag or scroll horizontally</span>
      </div>
      <div
        ref={scrollerRef}
        className="infinite-rail"
        aria-label={ariaLabel}
        role="region"
        tabIndex={0}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        onFocus={() => {
          pausedRef.current = true;
        }}
        onBlur={() => {
          pausedRef.current = false;
        }}
        onWheel={(event) => {
          if (!scrollerRef.current) return;
          event.preventDefault();
          scrollerRef.current.scrollLeft += event.deltaY + event.deltaX;
          rebalance();
        }}
        onPointerDown={(event) => {
          const scroller = scrollerRef.current;
          if (!scroller) return;
          dragRef.current = { active: true, startX: event.clientX, scrollLeft: scroller.scrollLeft };
          pausedRef.current = true;
          scroller.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const scroller = scrollerRef.current;
          if (!scroller || !dragRef.current.active) return;
          const delta = event.clientX - dragRef.current.startX;
          scroller.scrollLeft = dragRef.current.scrollLeft - delta;
          rebalance();
        }}
        onPointerUp={(event) => {
          const scroller = scrollerRef.current;
          dragRef.current.active = false;
          pausedRef.current = false;
          scroller?.releasePointerCapture(event.pointerId);
        }}
      >
        <div className="flex gap-5 px-5 md:px-10">
          {loopedItems.map((item, index) => renderItem(item, `${item.id}-${index}`))}
        </div>
      </div>
    </section>
  );
}
