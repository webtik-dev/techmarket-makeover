import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, SlidersHorizontal, X, Zap, Wrench, Laptop, Dumbbell, Bike, LayoutGrid } from "lucide-react";
import { BFProductCard as ProductCard } from "@/components/BFProductCard";
import {
  type BFSection, type SortKey, CAMPAIGN_END, bfProducts, categorySections, discountOf, sections, sortProducts,
} from "@/lib/black-friday";

const icons: Record<string, typeof Laptop> = {
  "": LayoutGrid, "mashini-instrumenti": Wrench, tehnika: Laptop, "fitnes-uredi": Dumbbell, "sportni-stoki": Bike,
};

const PAGE = 30;
const discountSteps = [10, 20, 30, 40];
const priceRanges = [
  { label: "До 100 €", min: 0, max: 100 },
  { label: "100 – 300 €", min: 100, max: 300 },
  { label: "300 – 700 €", min: 300, max: 700 },
  { label: "Над 700 €", min: 700, max: Infinity },
];

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!CAMPAIGN_END || now === null) return <div className="h-[52px]" />;
  const diff = new Date(CAMPAIGN_END).getTime() - now;
  if (diff <= 0) return null;
  const parts = [
    [Math.floor(diff / 864e5), "дни"],
    [Math.floor(diff / 36e5) % 24, "часа"],
    [Math.floor(diff / 6e4) % 60, "мин"],
    [Math.floor(diff / 1e3) % 60, "сек"],
  ] as const;
  return (
    <div className="flex gap-2" aria-label="Оставащо време до края на кампанията">
      {parts.map(([v, l]) => (
        <div key={l} className="min-w-[52px] rounded-lg border border-border bg-card px-2.5 py-1.5 text-center backdrop-blur">
          <div className="font-display text-xl font-bold tabular-nums text-ink">{String(v).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-widest text-ink-soft">{l}</div>
        </div>
      ))}
    </div>
  );
}

export function BlackFridayPage({ section }: { section: BFSection }) {
  const pool = useMemo(
    () => (section.slug ? bfProducts.filter((p) => p.section === section.slug) : bfProducts),
    [section.slug],
  );
  const brands = useMemo(() => [...new Set(pool.map((p) => p.brand))], [pool]);
  const subcats = useMemo(() => [...new Set(pool.map((p) => p.subcat))], [pool]);

  const [sel, setSel] = useState<{ brands: string[]; subcats: string[]; price: number | null; disc: number }>({
    brands: [], subcats: [], price: null, disc: 0,
  });
  const [sort, setSort] = useState<SortKey>("popular");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => { setSel({ brands: [], subcats: [], price: null, disc: 0 }); setPage(1); }, [section.slug]);
  useEffect(() => { setPage(1); }, [sel, sort]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const filtered = useMemo(() => {
    const r = sel.price !== null ? priceRanges[sel.price] : null;
    return sortProducts(
      pool.filter((p) =>
        (!sel.brands.length || sel.brands.includes(p.brand)) &&
        (!sel.subcats.length || sel.subcats.includes(p.subcat)) &&
        (!r || (p.price >= r.min && p.price < r.max)) &&
        discountOf(p) >= sel.disc,
      ),
      sort,
    );
  }, [pool, sel, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const visible = filtered.slice((page - 1) * PAGE, page * PAGE);
  const toggle = (k: "brands" | "subcats", v: string) =>
    setSel((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));
  const activeCount = sel.brands.length + sel.subcats.length + (sel.price !== null ? 1 : 0) + (sel.disc ? 1 : 0);


  const filters = (
    <div className="space-y-6">
      <FilterGroup title="Подкатегория">
        {subcats.map((s) => <Check key={s} label={s} checked={sel.subcats.includes(s)} onChange={() => toggle("subcats", s)} />)}
      </FilterGroup>
      <FilterGroup title="Марка">
        {brands.map((b) => <Check key={b} label={b} checked={sel.brands.includes(b)} onChange={() => toggle("brands", b)} />)}
      </FilterGroup>
      <FilterGroup title="Цена">
        {priceRanges.map((r, i) => (
          <Check key={r.label} radio label={r.label} checked={sel.price === i}
            onChange={() => setSel((s) => ({ ...s, price: s.price === i ? null : i }))} />
        ))}
      </FilterGroup>
      <FilterGroup title="Намаление">
        <div className="flex flex-wrap gap-2">
          {discountSteps.map((d) => (
            <button key={d} type="button"
              onClick={() => setSel((s) => ({ ...s, disc: s.disc === d ? 0 : d }))}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${sel.disc === d ? "bg-brand text-brand-foreground" : "bg-surface text-ink hover:bg-surface-2"}`}>
              {d}%+
            </button>
          ))}
        </div>
      </FilterGroup>
      {activeCount > 0 && (
        <button type="button" onClick={() => setSel({ brands: [], subcats: [], price: null, disc: 0 })}
          className="text-sm font-semibold text-brand hover:underline">Изчисти филтрите</button>
      )}
    </div>
  );

  return (
    <>
      <main className="theme-bf min-h-screen pb-16">
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
          <Link to="/" className="absolute left-4 top-4 z-10 inline-flex h-10 items-center gap-2 rounded-full bg-brand px-4 text-sm font-bold text-brand-foreground transition hover:opacity-90 md:left-6">
            <ArrowLeft className="h-4 w-4" /> Начало
          </Link>
          <div className="container-tm relative flex flex-col items-center gap-4 pb-8 pt-20 text-center md:pt-12">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
              <Zap className="h-3 w-3" /> Black Month 2026
            </div>
            <h1 className="font-display text-3xl font-black uppercase tracking-tight text-ink md:text-5xl">{section.h1}</h1>
            <p className="max-w-xl text-sm text-ink-soft">{section.intro}</p>
            <Countdown />
          </div>
        </section>

        {/* Listing */}

        <nav aria-label="Black Friday категории" className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-md">
          <div className="container-tm flex gap-2 overflow-x-auto py-3 md:justify-center">
            {sections.map((s) => {
              const Icon = icons[s.slug];
              const active = s.slug === section.slug;
              const cls = `inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "bg-brand text-brand-foreground" : "bg-surface-2 text-ink hover:text-brand"}`;
              return s.slug ? (
                <Link key={s.slug} to="/black-friday/$section" params={{ section: s.slug }} className={cls}>
                  <Icon className="h-4 w-4" /> {s.name}
                </Link>
              ) : (
                <Link key="all" to="/black-friday" className={cls}><Icon className="h-4 w-4" /> {s.name}</Link>
              );
            })}
          </div>
        </nav>

        <section id="offers" className="container-tm mt-6 grid scroll-mt-32 gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-20 rounded-xl bg-card p-5 shadow-card">{filters}</div>
          </aside>
          <div className="min-w-0">
            <h2 className="sr-only">Всички Black Friday оферти</h2>
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-card p-2.5 shadow-card">
              <button type="button" onClick={() => setOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-3 text-sm font-bold text-brand-foreground lg:hidden">
                <SlidersHorizontal className="h-4 w-4" /> Филтри{activeCount ? ` (${activeCount})` : ""}
              </button>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                <b className="text-ink">{filtered.length}</b> оферти
              </span>
              <label className="relative ml-auto">
                <span className="sr-only">Сортиране</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-10 appearance-none rounded-lg bg-surface pl-3 pr-9 text-sm font-semibold text-ink outline-none">
                  <option value="popular">Популярност</option>
                  <option value="discount">Най-голямо намаление</option>
                  <option value="price-asc">Цена: възходяща</option>
                  <option value="price-desc">Цена: низходяща</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </label>
            </div>

            {visible.length ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
                {visible.map((p) => <ProductCard key={p.id} product={p} campaign />)}
              </div>
            ) : (
              <div className="rounded-xl bg-card p-10 text-center text-muted-foreground">Няма оферти по избраните филтри.</div>
            )}

            {page < pages && (
              <div className="mt-8 flex justify-center">
                <button type="button" onClick={() => setPage((p) => p + 1)}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-8 text-sm font-bold text-brand-foreground shadow-brand transition hover:opacity-90">
                  Зареди още продукти
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SEO + FAQ + links */}
        <section className="container-tm mt-14 grid gap-6 text-[13px] lg:grid-cols-2">
          <div className="rounded-2xl bg-card p-6 shadow-card md:p-8">
            {section.seo.map((s) => (
              <div key={s.h2} className="mb-5 last:mb-0">
                <h2 className="font-display text-xl font-black text-ink">{s.h2}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            ))}
            <p className="mt-5 text-xs text-muted-foreground">
              Отстъпките са изчислени спрямо най-ниската цена през последните 30 дни преди намалението.
            </p>
            <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-ink">Още Black Friday категории</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {categorySections.filter((s) => s.slug !== section.slug).map((s) => (
                <Link key={s.slug} to="/black-friday/$section" params={{ section: s.slug }}
                  className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:text-brand">
                  Black Friday {s.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-card md:p-8">
            <h2 className="font-display text-xl font-black text-ink">Често задавани въпроси</h2>
            <div className="mt-4 divide-y divide-border">
              {section.faq.map((f) => (
                <details key={f.q} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink">
                    <h3>{f.q}</h3>
                    <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {open && (
        <div className="theme-bf fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-background/70" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-background">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-display text-lg font-black text-ink">Филтри</span>
              <button type="button" aria-label="Затвори" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{filters}</div>
            <div className="border-t border-border p-4">
              <button type="button" onClick={() => setOpen(false)}
                className="h-12 w-full rounded-full bg-brand text-sm font-bold text-brand-foreground">
                Покажи {filtered.length} оферти
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-xs font-bold uppercase tracking-wider text-ink">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({ label, checked, onChange, radio }: { label: string; checked: boolean; onChange: () => void; radio?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft hover:text-ink">
      <input type={radio ? "radio" : "checkbox"} checked={checked} onChange={onChange}
        className="h-4 w-4 accent-[var(--brand)]" />
      {label}
    </label>
  );
}
