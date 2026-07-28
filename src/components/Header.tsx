import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, User, Heart, GitCompareArrows, Menu, Phone, MapPin, Zap } from "lucide-react";
import { categories } from "@/lib/mock-data";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top bar */}
      <div className="hidden bg-ink text-white md:block">
        <div className="container-tm flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Доставка в цяла България</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-brand" /> Експресна доставка до 24ч.</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-brand">Магазини</a>
            <a href="#" className="hover:text-brand">Помощ</a>
            <a href="#" className="inline-flex items-center gap-1.5 hover:text-brand">
              <Phone className="h-3.5 w-3.5" /> 0700 12 345
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-tm grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 md:gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand text-brand-foreground shadow-brand">
            <span className="text-lg font-black">T</span>
          </div>
          <div className="hidden leading-none sm:block">
            <div className="text-xl font-black tracking-tight text-ink">TECHMARKET</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">.bg</div>
          </div>
        </Link>

        {/* Search */}
        <form role="search" className="relative min-w-0">
          <div className="flex h-11 items-center overflow-hidden rounded-xl border-2 border-ink/10 bg-surface transition-colors focus-within:border-brand">
            <input
              type="search"
              placeholder="Търси измежду 45 000+ продукта…"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-ink placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="grid h-full w-12 shrink-0 place-items-center bg-brand text-brand-foreground transition-colors hover:bg-brand-dark"
              aria-label="Търси"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Actions */}
        <nav className="flex items-center gap-1 md:gap-2">
          <IconAction icon={User} label="Профил" />
          <IconAction icon={Heart} label="Любими" badge={3} />
          <IconAction icon={GitCompareArrows} label="Сравнение" hideMobile />
          <Link
            to="/"
            className="ml-1 flex h-11 items-center gap-2 rounded-xl bg-ink px-3 text-white transition-colors hover:bg-brand"
            aria-label="Количка"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold">2</span>
            </div>
            <div className="hidden text-left leading-tight md:block">
              <div className="text-[10px] uppercase opacity-70">Количка</div>
              <div className="text-xs font-bold">1 249,00 лв.</div>
            </div>
          </Link>
        </nav>
      </div>

      {/* Categories row */}
      <div className="border-t border-border bg-surface">
        <div className="container-tm flex h-12 items-center gap-1 overflow-x-auto">
          <button
            type="button"
            className="mr-2 inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-bold text-brand-foreground shadow-brand hover:bg-brand-dark"
          >
            <Menu className="h-4 w-4" />
            Всички категории
          </button>
          {categories.slice(0, 9).map(c => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="inline-flex h-9 shrink-0 items-center rounded-lg px-3 text-sm font-medium text-ink hover:bg-white hover:text-brand"
            >
              {c.name}
            </Link>
          ))}
          <a href="#" className="ml-auto inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-bold text-brand hover:bg-white">
            <Zap className="h-4 w-4" /> Промоции
          </a>
        </div>
      </div>
    </header>
  );
}

function IconAction({
  icon: Icon,
  label,
  badge,
  hideMobile,
}: {
  icon: typeof Menu;
  label: string;
  badge?: number;
  hideMobile?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`relative grid h-11 w-11 place-items-center rounded-xl text-ink hover:bg-surface hover:text-brand ${hideMobile ? "hidden md:grid" : ""}`}
    >
      <Icon className="h-5 w-5" />
      {badge && (
        <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground">
          {badge}
        </span>
      )}
    </button>
  );
}
