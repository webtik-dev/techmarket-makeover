import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Heart, Menu } from "lucide-react";
import { categories } from "@/lib/mock-data";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md">
      {/* Top utility strip */}
      <div className="hidden border-b border-border/60 bg-background lg:block">
        <div className="container-tm flex h-9 items-center justify-between text-xs text-muted-foreground">
          <div>Безплатна доставка над 200&nbsp;лв. · Експресна доставка до 24ч.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-ink">Магазини</a>
            <a href="#" className="hover:text-ink">Поддръжка</a>
            <a href="#" className="hover:text-ink">Проследи поръчка</a>
            <span className="text-ink/40">|</span>
            <span>BG · лв.</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-border/60">
        <div className="container-tm grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-0.5 font-display" aria-label="Techmarket">
            <span className="text-2xl font-black tracking-tight text-ink md:text-[26px]">techmarket</span>
            <span className="h-2 w-2 rounded-full bg-brand" />
          </Link>

          {/* Search */}
          <form role="search" className="min-w-0">
            <div className="group relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Търси продукт, марка или SKU…"
                className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm text-ink placeholder:text-muted-foreground transition focus:border-ink focus:bg-background focus:outline-none focus:ring-4 focus:ring-ink/5"
              />
            </div>
          </form>

          {/* Actions */}
          <nav className="flex items-center gap-1">
            <IconLink icon={User} label="Профил" />
            <IconLink icon={Heart} label="Любими" badge={3} />
            <Link
              to="/"
              className="ml-1 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white transition hover:bg-brand"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Количка</span>
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-[11px] font-bold">2</span>
            </Link>
          </nav>
        </div>

        {/* Category nav */}
        <div className="container-tm hidden h-12 items-center gap-6 border-t border-border/60 text-sm md:flex">
          <button className="inline-flex items-center gap-2 font-semibold text-ink">
            <Menu className="h-4 w-4" /> Всички категории
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
            {categories.slice(0, 9).map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="inline-flex h-8 shrink-0 items-center rounded-full px-3 text-[13px] font-medium text-ink-soft transition hover:bg-surface-2 hover:text-ink"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <a href="#" className="ml-auto inline-flex items-center gap-1 text-[13px] font-semibold text-brand">
            Промоции
          </a>
        </div>
      </div>
    </header>
  );
}

function IconLink({
  icon: Icon,
  label,
  badge,
}: {
  icon: typeof Menu;
  label: string;
  badge?: number;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-surface-2"
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
      {badge !== undefined && (
        <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
