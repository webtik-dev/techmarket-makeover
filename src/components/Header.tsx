import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, User, Heart, GitCompareArrows, Menu, Phone, ChevronDown, MapPin } from "lucide-react";
import { categories } from "@/lib/mock-data";

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      {/* Main red bar */}
      <div className="bg-brand text-white">
        <div className="container-tm grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 py-3 md:gap-6 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display" aria-label="Techmarket">
            <div className="text-2xl font-black tracking-tight leading-none md:text-3xl">TECHMARKET</div>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 md:inline">.bg</span>
          </Link>

          {/* Menu button */}
          <button className="hidden h-11 items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-bold text-white transition-colors hover:bg-white/25 md:inline-flex">
            <Menu className="h-5 w-5" />
            Меню
          </button>
          <button aria-label="Меню" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 md:hidden">
            <Menu className="h-5 w-5" />
          </button>

          {/* Search */}
          <form role="search" className="col-span-4 order-last min-w-0 md:col-span-1 md:order-none">
            <div className="flex h-11 items-center overflow-hidden rounded-full bg-white shadow-sm">
              <input
                type="search"
                placeholder="Търси в 45 000+ продукта…"
                className="min-w-0 flex-1 bg-transparent px-5 text-sm text-ink placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Търси"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-ink-soft mr-1"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <nav className="flex items-center gap-1 md:gap-3">
            <TopAction icon={Phone} label="0700 12 345" hideMobile />
            <TopAction icon={User} label="Вход" hideMobile />
            <div className="hidden items-center gap-1.5 text-xs font-bold uppercase opacity-90 hover:opacity-100 lg:flex">
              BG <ChevronDown className="h-3 w-3" />
            </div>
            <div className="hidden items-center gap-2 border-l border-white/20 pl-3 text-xs font-medium leading-tight lg:flex">
              <MapPin className="h-4 w-4 shrink-0" />
              <div>
                <div className="opacity-70">Моят магазин:</div>
                <div className="font-bold">София Младост</div>
              </div>
            </div>
            <TopAction icon={GitCompareArrows} label="Сравни" hideMobile />
            <TopAction icon={Heart} label="Любими" badge={3} />
            <TopAction icon={ShoppingCart} label="Количка" badge={2} />
          </nav>
        </div>
      </div>

      {/* White nav bar */}
      <div className="border-b border-border bg-background shadow-sm">
        <div className="container-tm flex h-12 items-center gap-1 overflow-x-auto">
          {categories.slice(0, 10).map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="inline-flex h-9 shrink-0 items-center rounded-md px-3 text-sm font-medium text-ink hover:bg-surface-2 hover:text-brand"
            >
              {c.name}
            </Link>
          ))}
          <a href="#" className="ml-auto inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm font-bold text-brand hover:bg-surface-2">
            Промоции
          </a>
        </div>
      </div>
    </header>
  );
}

function TopAction({
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
      className={`relative flex h-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-md px-2 text-white transition-colors hover:bg-white/15 ${hideMobile ? "hidden md:flex" : ""}`}
    >
      <Icon className="h-5 w-5" />
      <span className="hidden text-[10px] font-semibold md:inline">{label}</span>
      {badge !== undefined && (
        <span className="absolute right-0 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-white px-1 text-[10px] font-bold text-brand">
          {badge}
        </span>
      )}
    </button>
  );
}
