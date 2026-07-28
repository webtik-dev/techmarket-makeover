export function ProductImage({ hue, name }: { hue: number; name: string }) {
  const bg = `radial-gradient(120% 90% at 30% 20%, oklch(0.99 0.01 ${hue}) 0%, oklch(0.94 0.03 ${hue}) 45%, oklch(0.88 0.05 ${(hue + 30) % 360}) 100%)`;
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: bg }}
      aria-label={name}
    >
      <span
        className="font-display text-6xl font-black tracking-tight text-ink/15 transition-transform duration-500 group-hover:scale-105 md:text-7xl"
        aria-hidden
      >
        {initials}
      </span>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/40" />
    </div>
  );
}
