import { Package } from "lucide-react";

export function ProductImage({ hue, name }: { hue: number; name: string }) {
  const bg = `linear-gradient(135deg, oklch(0.96 0.03 ${hue}) 0%, oklch(0.88 0.05 ${(hue + 40) % 360}) 100%)`;
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: bg }}
      aria-label={name}
    >
      <Package
        className="h-24 w-24 text-ink/25 transition-transform duration-500 group-hover:scale-110"
        strokeWidth={1.2}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/40" />
    </div>
  );
}
