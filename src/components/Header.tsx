import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, User, Heart, Menu, Phone, MapPin, ChevronDown, Truck, Package } from "lucide-react";
import { categories } from "@/lib/mock-data";
import logoAsset from "@/assets/techmarket-logo.svg.asset.json";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background shadow-sm">
      {/* Top utility strip */}
      <div className="hidden bg-brand text-white lg:block">
        <div className="container-tm flex h-8 items-center justify-between text-[12px]">
          <div className="flex items-center gap-5">
            <a href="#" className="inline-flex items-center gap-1.5 hover:opacity-80"><MapPin className="h-3.5 w-3.5" /> Магазини</a>
            <a href="#" className="inline-flex items-center gap-1.5 hover:opacity-80"><Truck className="h-3.5 w-3.5" /> Доставка</a>
            <a href="#" className="inline-flex items-center gap-1.5 hover:opacity-80"><Package className="h-3.5 w-3.5" /> Проследи поръчка</a>
            <a href="#" className="hover:opacity-80">Помощен център</a>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:opacity-80">Бизнес клиенти</a>
            <a href="#" className="hover:opacity-80">Промоции</a>
            <span className="inline-flex items-center gap-1">BG · EUR <ChevronDown className="h-3 w-3" /></span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-border">
        <div className="container-tm grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="block" aria-label="Techmarket">
            <img src={logoAsset.url} alt="Techmarket" className="h-9 w-auto md:h-11" />
          </Link>

          {/* Search */}
          <form role="search" className="min-w-0">
            <div className="group relative flex items-center overflow-hidden rounded-full border-2 border-brand bg-background">
              <input
                type="search"
                placeholder="Търси продукт, марка или SKU…"
                className="h-11 w-full min-w-0 bg-transparent pl-5 pr-2 text-sm text-ink placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Търси"
                className="grid h-11 w-14 shrink-0 place-items-center bg-brand text-white transition hover:bg-brand-dark"
              >
                <Search className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </form>

          {/* Actions */}
          <nav className="flex items-center gap-1 md:gap-2">
            <a href="tel:070012345" className="hidden md:inline-flex flex-col items-start pr-3 text-ink border-r border-border">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Обади се</span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-brand">
                <Phone className="h-3.5 w-3.5" /> 0700 12 345
              </span>
            </a>
            <IconAction icon={User} label="Профил" />
            <IconAction icon={Heart} label="Любими" badge={3} />
            <Link
              to="/"
              className="ml-1 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-4 text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={2} />
              <div className="hidden flex-col items-start leading-tight sm:flex">
                <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">Количка</span>
                <span className="text-sm font-bold">129,90 €</span>
              </div>
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-[11px] font-black text-brand">2</span>
            </Link>
          </nav>
        </div>

        {/* Category nav */}
        <div className="border-t border-border bg-surface">
          <div className="container-tm hidden h-12 items-center gap-1 text-sm md:flex">
            <button className="inline-flex h-full items-center gap-2 bg-ink px-5 font-bold text-white">
              <Menu className="h-4 w-4" /> ВСИЧКИ КАТЕГОРИИ
            </button>
            <div className="flex min-w-0 flex-1 items-center gap-0 overflow-x-auto">
              {categories.slice(0, 9).map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="inline-flex h-12 shrink-0 items-center px-3.5 text-[13px] font-semibold text-ink transition hover:text-brand"
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <a href="#" className="inline-flex h-8 shrink-0 items-center gap-1 rounded-full bg-brand/10 px-3 text-[13px] font-bold text-brand">
              ● ПРОМОЦИИ
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconAction({
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
      className="relative flex h-12 w-14 flex-col items-center justify-center gap-0.5 rounded-lg text-ink transition hover:bg-surface"
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
      <span className="text-[10px] font-medium">{label}</span>
      {badge !== undefined && (
        <span className="absolute right-1.5 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
