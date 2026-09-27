type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 24, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="50" cy="50" r="46" className="fill-zinc-950 dark:fill-white" />
      <rect
        x="28"
        y="28"
        width="44"
        height="44"
        rx="6"
        className="fill-white dark:fill-zinc-950"
        transform="rotate(45 50 50)"
      />
    </svg>
  );
}
