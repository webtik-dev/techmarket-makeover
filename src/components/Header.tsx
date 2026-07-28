import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, User, Heart, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/mock-data";
import logoAsset from "@/assets/techmarket-logo.svg.asset.json";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-tm flex h-16 items-center gap-6">
        {/* Logo */}
        <Link to="/" className="shrink-0" aria-label="Techmarket">
          <img src={logoAsset.url} alt="Techmarket" className="h-8 w-auto" />
        </Link>

        {/* Primary nav */}
        <nav className="hidden items-center gap-1 text-[13px] font-medium text-ink lg:flex">
          <AllCategoriesMenu />
          {categories.slice(0, 5).map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="rounded-full px-3 py-2 transition hover:bg-surface hover:text-brand"
            >
              {c.name}
            </Link>
          ))}
          <a href="#" className="rounded-full px-3 py-2 font-semibold text-brand transition hover:bg-brand/10">
            Промоции
          </a>
        </nav>

        {/* Search */}
        <form role="search" className="ml-auto hidden min-w-0 flex-1 max-w-md md:block">
          <label className="group relative flex h-10 items-center rounded-full bg-surface transition focus-within:bg-background focus-within:ring-2 focus-within:ring-brand/30">
            <Search className="ml-3.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2} />
            <input
              type="search"
              placeholder="Търсене…"
              className="h-full w-full min-w-0 bg-transparent px-3 text-[13px] text-ink placeholder:text-muted-foreground focus:outline-none"
            />
          </label>
        </form>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <IconAction icon={User} label="Профил" />
          <IconAction icon={Heart} label="Любими" badge={3} />
          <Link
            to="/"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-3.5 text-[13px] font-semibold text-white transition hover:bg-brand"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            <span className="hidden sm:inline">129,90 €</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-[10px] font-bold text-white">2</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

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
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold text-ink transition hover:bg-surface hover:text-brand">
        <Menu className="h-4 w-4" strokeWidth={2} />
        Категории
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-[820px] max-w-[92vw] pt-3">
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-pop">
            <div className="grid grid-cols-[260px_1fr]">
              <ul className="max-h-[480px] overflow-y-auto border-r border-border py-2">
                {categories.map((c) => {
                  const Icon = c.icon;
                  const isActive = c.slug === active;
                  return (
                    <li key={c.slug}>
                      <Link
                        to="/category/$slug"
                        params={{ slug: c.slug }}
                        onMouseEnter={() => setActive(c.slug)}
                        className={`flex items-center justify-between gap-3 px-4 py-2 text-[13px] font-medium transition ${
                          isActive
                            ? "bg-surface text-brand"
                            : "text-ink hover:bg-surface hover:text-brand"
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

              <div className="p-6">
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {categories.find((c) => c.slug === active)?.name}
                  </h3>
                  <Link
                    to="/category/$slug"
                    params={{ slug: active }}
                    className="text-[12px] font-semibold text-brand hover:underline"
                  >
                    Виж всички →
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
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
      className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-surface hover:text-brand"
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      {badge !== undefined && (
        <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
