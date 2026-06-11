export default function Seat({
  seatKey,
  row,
  col,
  zone,
  price,
  label,
  isReserved,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
  transform,
  x,
  y,
  width = 14,
  height = 11,
  nubHeight = 2.5,
  rx = 2.5,
  isStadium = false,
}) {
  // Guard against NaN/undefined values that crash SVG rendering
  const safeX = Number(x) || 0;
  const safeY = Number(y) || 0;
  const safeW = Number(width) || 14;
  const safeH = Number(height) || 11;
  const safeNub = Number(nubHeight) || 2.5;

  if (isStadium) {
    return (
      <g transform={transform}>
        {/* Back-of-seat nub */}
        <rect
          x="-3.5"
          y="-6.5"
          width="7"
          height="3"
          rx="1.5"
          fill={isReserved ? '#FECACA' : '#CBD5E1'}
          opacity="0.6"
          style={{ pointerEvents: 'none' }}
        />
        {/* Seat cushion — events bound directly via native ref-less props */}
        <rect
          x="-5"
          y="-4"
          width="10"
          height="8"
          rx="2"
          className={`sv-seat ${isReserved ? 'res' : isSelected ? 'sel' : 'avail'}`}
          onClick={!isReserved ? onClick : undefined}
          onMouseEnter={!isReserved ? onMouseEnter : undefined}
          onMouseLeave={!isReserved ? onMouseLeave : undefined}
        />
      </g>
    );
  }

  // Flat concert / theatre / arena layout
  return (
    <g>
      {/* Back-of-seat nub */}
      <rect
        x={safeX}
        y={safeY - safeH / 2 - safeNub}
        width={safeW}
        height={safeNub}
        rx="1.5"
        fill={isReserved ? '#FECACA' : '#CBD5E1'}
        opacity="0.55"
        style={{ pointerEvents: 'none' }}
      />
      {/* Seat cushion */}
      <rect
        x={safeX}
        y={safeY - safeH / 2}
        width={safeW}
        height={safeH}
        rx={rx}
        className={`cs-seat ${isReserved ? 'res' : isSelected ? 'sel' : 'avail'}`}
        onClick={!isReserved ? onClick : undefined}
        onMouseEnter={!isReserved ? onMouseEnter : undefined}
        onMouseLeave={!isReserved ? onMouseLeave : undefined}
      />
    </g>
  );
}
