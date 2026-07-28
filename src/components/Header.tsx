import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, User, Heart, Menu, Phone, ChevronDown } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/mock-data";
import logoAsset from "@/assets/techmarket-logo.svg.asset.json";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background shadow-sm">
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
            <AllCategoriesMenu />
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

// Fake subcategory data per category for the mega menu
const subcatsFor = (slug: string): string[] => {
  const map: Record<string, string[]> = {
    laptopi: ["Ултрабуци", "Гейминг лаптопи", "Бизнес лаптопи", "Chromebook", "Аксесоари", "Раници и чанти"],
    smartfoni: ["Apple iPhone", "Samsung Galaxy", "Xiaomi", "Google Pixel", "Кейсове", "Протектори"],
    televizori: ["OLED", "QLED", "4K UHD", "Smart TV", "Стойки", "Проектори"],
    audio: ["Слушалки", "True Wireless", "Тонколони", "Саундбарове", "Микрофони", "Аксесоари"],
    foto: ["DSLR", "Безогледални", "Обективи", "Екшън камери", "Дронове", "Статив"],
    gaming: ["Конзоли PS5", "Xbox", "Nintendo", "Гейминг столове", "Контролери", "Игри"],
  };
  return map[slug] ?? ["Разгледай всички", "Промоции", "Нови", "Топ продажби", "Аксесоари", "Марки"];
};

function AllCategoriesMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(categories[0]?.slug ?? "");

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="inline-flex h-full items-center gap-2 rounded-t-lg bg-ink px-5 font-bold text-white">
        <Menu className="h-4 w-4" /> ВСИЧКИ КАТЕГОРИИ
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-[880px] max-w-[92vw] overflow-hidden rounded-b-xl rounded-tr-xl border border-border bg-background shadow-pop">
          <div className="grid grid-cols-[280px_1fr]">
            {/* Category list */}
            <ul className="max-h-[520px] overflow-y-auto border-r border-border bg-surface py-2">
              {categories.map((c) => {
                const Icon = c.icon;
                const isActive = c.slug === active;
                return (
                  <li key={c.slug}>
                    <Link
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      onMouseEnter={() => setActive(c.slug)}
                      className={`flex items-center justify-between gap-3 px-4 py-2.5 text-[13px] font-semibold transition ${
                        isActive
                          ? "bg-background text-brand"
                          : "text-ink hover:bg-background hover:text-brand"
                      }`}
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                        {c.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{c.count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Subcategory panel */}
            <div className="p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-display text-lg font-bold text-ink">
                  {categories.find((c) => c.slug === active)?.name}
                </h3>
                <Link
                  to="/category/$slug"
                  params={{ slug: active }}
                  className="text-[12px] font-bold text-brand hover:underline"
                >
                  Виж всички →
                </Link>
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                {subcatsFor(active).map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="block rounded-md py-1.5 text-[13px] text-ink-soft transition hover:text-brand"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
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
