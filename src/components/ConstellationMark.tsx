interface Props {
  size?: number;
  variant?: 'ink' | 'cream';
}

export default function ConstellationMark({ size = 28, variant = 'ink' }: Props) {
  const fill = variant === 'ink' ? '#0d0d0d' : '#f4f1ea';
  const stroke = fill;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <circle cx="6" cy="22" r="2" fill={fill} />
      <circle cx="14" cy="14" r="2.2" fill={fill} />
      {/* Fourth star (top-right) is always accent red */}
      <circle cx="22" cy="6" r="2" fill="#b8341e" />
      <circle cx="22" cy="20" r="1.5" fill={fill} />
      <circle cx="6" cy="8" r="1.5" fill={fill} />
      <line x1="6" y1="22" x2="14" y2="14" stroke={stroke} strokeWidth="0.6" />
      <line x1="14" y1="14" x2="22" y2="6" stroke={stroke} strokeWidth="0.6" />
      <line x1="14" y1="14" x2="22" y2="20" stroke={stroke} strokeWidth="0.6" />
      <line x1="14" y1="14" x2="6" y2="8" stroke={stroke} strokeWidth="0.6" />
    </svg>
  );
}
