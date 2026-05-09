interface Props {
  number: string;
  label: string;
  className?: string;
}

export default function Eyebrow({ number, label, className = '' }: Props) {
  return (
    <div
      className={`font-mono text-[12px] font-medium tracking-[0.08em] uppercase text-warm flex items-center gap-3 mb-6 ${className}`}
    >
      <span className="w-6 h-px bg-accent" aria-hidden="true" />
      {number} · {label}
    </div>
  );
}
