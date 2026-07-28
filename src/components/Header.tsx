import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, User, Heart, ChevronDown, GitCompareArrows, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/mock-data";
import logoAsset from "@/assets/techmarket-logo.svg.asset.json";
import faviAsset from "@/assets/favi.svg.asset.json";

const mockCart = [
  { id: 1, name: "Apple iPhone 15 Pro 256GB Natural Titanium", price: 2399.0, qty: 1, hue: 220 },
  { id: 2, name: "Sony WH-1000XM5 Wireless Noise Cancelling", price: 649.9, qty: 1, hue: 30 },
];
const BGN_PER_EUR = 1.95583;
const fmtEUR = (n: number) => (n / BGN_PER_EUR).toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function Header() {
  const cartCount = mockCart.reduce((a, i) => a + i.qty, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-tm flex h-16 items-center gap-4 md:gap-6">
        {/* Logo */}
        <Link to="/" className="shrink-0" aria-label="Techmarket">
          <img src={logoAsset.url} alt="Techmarket" className="h-8 w-auto" />
        </Link>

        {/* Menu (categories) */}
        <MenuDropdown />

        {/* Search — takes remaining width */}
        <form role="search" className="hidden min-w-0 flex-1 md:block">
          <label className="group relative flex h-10 items-center rounded-full bg-surface transition focus-within:bg-background focus-within:ring-2 focus-within:ring-brand/30">
            <Search className="ml-4 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2} />
            <input
              type="search"
              placeholder="Търсете сред 32 047 продукти.."
              className="h-full w-full min-w-0 bg-transparent px-3 text-[13px] text-ink placeholder:text-muted-foreground focus:outline-none"
            />
          </label>
        </form>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <IconAction icon={User} label="Профил" />
          <IconAction icon={Heart} label="Любими" badge={3} />
          <IconAction icon={GitCompareArrows} label="Сравни" badge={2} />
          <CartButton count={cartCount} items={mockCart} />
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

function MenuDropdown() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(categories[0]?.slug ?? "");

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-label="Меню"
        className={`group relative z-50 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-medium transition ${
          open
            ? "bg-brand text-white rounded-b-none pb-3 -mb-1"
            : "text-ink hover:bg-brand hover:text-white"
        }`}
      >
        <span aria-hidden className="inline-flex h-5 w-5 flex-col items-start justify-center gap-[4px]">
          <span className={`block h-[2px] w-5 rounded-full ${open ? "bg-white" : "bg-current"}`} />
          <span className={`block h-[2px] w-3 rounded-full ${open ? "bg-white" : "bg-current"}`} />
          <span className={`block h-[2px] w-5 rounded-full ${open ? "bg-white" : "bg-current"}`} />
        </span>
        <span className="hidden sm:inline italic">Меню</span>
        <ChevronDown className={`hidden h-3.5 w-3.5 transition sm:inline ${open ? "rotate-180" : "opacity-60"}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 w-[760px] max-w-[92vw]">
          <div className="overflow-hidden rounded-xl rounded-tl-none border border-brand bg-background shadow-pop">
            <div className="grid grid-cols-[300px_1fr]">
              <ul className="max-h-[520px] overflow-y-auto bg-brand py-2">
                {categories.map((c) => {
                  const Icon = c.icon;
                  const isActive = c.slug === active;
                  return (
                    <li key={c.slug}>
                      <Link
                        to="/category/$slug"
                        params={{ slug: c.slug }}
                        onMouseEnter={() => setActive(c.slug)}
                        className={`flex items-center gap-3 px-5 py-2.5 text-[13px] transition ${
                          isActive ? "bg-brand-dark text-white font-semibold" : "text-white/85 hover:bg-brand-dark hover:text-white"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                        <span className="truncate">{c.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="relative overflow-hidden p-6">
                <img
                  src={faviAsset.url}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute bottom-4 right-4 h-28 w-28 opacity-[0.06]"
                />
                <div className="relative z-10">
                  <Link
                    to="/category/$slug"
                    params={{ slug: active }}
                    className="mb-4 block font-display text-[20px] font-semibold text-ink transition hover:text-brand"
                  >
                    {categories.find((c) => c.slug === active)?.name}
                  </Link>
                  <ul className="space-y-2">
                    {subcatsFor(active).map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[13px] text-ink-soft">
                        <span aria-hidden className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-ink-soft" />
                        <a href="#" className="transition hover:text-brand">
                          {s}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function CartButton({ count, items }: { count: number; items: typeof mockCart }) {
  const [open, setOpen] = useState(false);
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="Количка"
        className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:text-brand"
      >
        <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.75} />
        {count > 0 && (
          <span className="absolute right-0 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 w-[360px] pt-3">
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-pop">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="text-[13px] font-semibold text-ink">
                Количка <span className="text-muted-foreground">({count})</span>
              </div>
              <Link to="/" className="text-[12px] font-semibold text-brand hover:underline">
                Виж всички →
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                Количката е празна
              </div>
            ) : (
              <>
                <ul className="max-h-[320px] overflow-y-auto divide-y divide-border">
                  {items.map((it) => (
                    <li key={it.id} className="flex items-start gap-3 px-4 py-3">
                      <div
                        className="h-14 w-14 shrink-0 rounded-lg"
                        style={{ background: `linear-gradient(135deg, oklch(0.95 0.04 ${it.hue}), oklch(0.88 0.06 ${it.hue}))` }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="line-clamp-2 text-[12px] font-medium leading-snug text-ink">
                          {it.name}
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="text-[11px] text-muted-foreground">Кол.: {it.qty}</div>
                          <div className="text-[13px] font-bold text-brand">{fmtEUR(it.price)} €</div>
                        </div>
                      </div>
                      <button aria-label="Премахни" className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-surface hover:text-brand">
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border px-4 py-3">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="text-[12px] text-muted-foreground">Междинна сума</span>
                    <div className="text-right">
                      <div className="font-display text-lg font-black text-ink">{fmtEUR(subtotal)} €</div>
                      <div className="text-[11px] text-muted-foreground">{subtotal.toFixed(2)} лв.</div>
                    </div>
                  </div>
                  <Link to="/" className="inline-flex h-10 w-full items-center justify-center rounded-full bg-brand px-4 text-[13px] font-bold text-white transition hover:bg-brand-dark">
                    Към количката
                  </Link>
                </div>
              </>
            )}
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
  icon: typeof X;
  label: string;
  badge?: number;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:text-brand"
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      {badge !== undefined && (
        <span className="absolute right-0 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
