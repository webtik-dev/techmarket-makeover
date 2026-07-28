import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, SlidersHorizontal, Grid3x3, List, ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { categories, productsByCategory } from "@/lib/mock-data";


export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const cat = categories.find(c => c.slug === params.slug);
    const name = cat?.name ?? "Категория";
    return {
      meta: [
        { title: `${name} — Techmarket.bg` },
        { name: "description", content: `Разгледай ${name.toLowerCase()} на топ цени с експресна доставка и официална гаранция.` },
        { property: "og:title", content: `${name} — Techmarket.bg` },
        { property: "og:description", content: `Купи ${name.toLowerCase()} онлайн от Techmarket.bg.` },
      ],
    };
  },
  component: CategoryPage,
});

const filterGroups = [
  { title: "Производител", options: ["ASUS", "Lenovo", "Apple", "Samsung", "Dell", "HP", "Sony", "LG"] },
  { title: "Процесор", options: ["Intel Core i3", "Intel Core i5", "Intel Core i7", "AMD Ryzen 5", "AMD Ryzen 7", "Apple M3"] },
  { title: "RAM памет", options: ["8 GB", "16 GB", "32 GB", "64 GB"] },
  { title: "Наличност", options: ["В наличност", "По заявка", "Промоция"] },
];

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = categories.find(c => c.slug === slug) ?? categories[0];
  const items = productsByCategory(slug);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [filtersOpen]);


  return (
    <>
      <Header />
      <main className="bg-surface pb-16">
        {/* Breadcrumbs */}
        <div className="container-tm pt-5">
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-brand">Начало</Link>
            <ChevronRight className="h-3 w-3" />
            <a href="#" className="hover:text-brand">Всички категории</a>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-ink">{cat.name}</span>
          </nav>
        </div>

        {/* Layout */}
        <div className="container-tm mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filters (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <div className="rounded-xl bg-card p-5 shadow-card">
                <FiltersHeader />
                <FiltersBody />
              </div>
            </div>
          </aside>


          {/* Product grid */}
          <div className="min-w-0">
            {/* Toolbar */}
            <div className="mb-4 grid grid-cols-[1fr_auto] items-center gap-2 rounded-xl bg-card p-2.5 shadow-card sm:flex sm:flex-wrap sm:gap-3 sm:p-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-3 text-sm font-bold text-brand-foreground sm:px-4 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Филтри
              </button>
              <div className="text-xs text-muted-foreground sm:text-sm">
                <span className="font-bold text-ink">{items.length}</span> продукта
              </div>
              <div className="col-span-2 flex items-center gap-2 text-xs sm:col-auto sm:text-sm">
                <label className="hidden text-muted-foreground sm:inline">Сортирай:</label>
                <button className="inline-flex h-10 flex-1 items-center justify-between gap-1.5 rounded-lg border border-border bg-surface px-3 font-semibold text-ink hover:border-brand sm:flex-none">
                  Най-популярни <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="ml-auto hidden items-center gap-1 rounded-lg border border-border bg-surface p-1 sm:flex">
                <button aria-label="Grid" className="grid h-8 w-8 place-items-center rounded-md bg-brand text-brand-foreground"><Grid3x3 className="h-4 w-4" /></button>
                <button aria-label="List" className="grid h-8 w-8 place-items-center rounded-md text-ink hover:text-brand"><List className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
              {items.map(p => <ProductCard key={p.id} product={p} />)}
            </div>


            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((n, i) => (
                <button
                  key={n}
                  className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold ${
                    i === 0 ? "bg-brand text-brand-foreground shadow-brand" : "bg-card text-ink hover:bg-surface-2"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="ml-2 inline-flex h-10 items-center gap-1 rounded-lg bg-card px-4 text-sm font-semibold text-ink hover:bg-surface-2">
                Следваща <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Category description */}
            <div className="mt-8 rounded-2xl bg-card p-6 shadow-card md:p-8">
              <h2 className="font-display text-xl font-black text-ink md:text-2xl">{cat.name}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Разгледай нашата селекция от {cat.name.toLowerCase()} на водещи марки. Официална гаранция,
                експресна доставка и професионална консултация от екипа на Techmarket.bg.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden ${filtersOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-hidden={!filtersOpen}
        >
          <div
            onClick={() => setFiltersOpen(false)}
            className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${filtersOpen ? "opacity-100" : "opacity-0"}`}
          />
          <aside
            className={`absolute inset-y-0 left-0 flex w-[92%] max-w-md flex-col bg-background shadow-pop transition-transform duration-300 ${
              filtersOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2 font-bold text-ink">
                <SlidersHorizontal className="h-4 w-4" /> Филтри
              </div>
              <button
                type="button"
                aria-label="Затвори"
                onClick={() => setFiltersOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-ink-soft hover:bg-surface hover:text-brand"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FiltersBody />
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-border p-3">
              <button className="h-11 rounded-lg bg-surface text-sm font-semibold text-ink hover:bg-surface-2">Изчисти</button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="h-11 rounded-lg bg-brand text-sm font-bold text-white hover:bg-brand-dark"
              >
                Покажи {items.length}
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FiltersHeader() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-ink">
          <SlidersHorizontal className="h-4 w-4" /> Филтри
        </div>
        <button className="text-xs font-semibold text-brand hover:underline">Изчисти</button>
      </div>
    </>
  );
}

function FiltersBody() {
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {["ASUS", "16 GB", "В наличност"].map(chip => (
          <span key={chip} className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">
            {chip} <X className="h-3 w-3 cursor-pointer" />
          </span>
        ))}
      </div>

      <FilterBlock title="Цена">
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="от" className="h-10 rounded-lg border border-border bg-surface px-3 text-sm focus:border-brand focus:outline-none" />
          <input type="number" placeholder="до" className="h-10 rounded-lg border border-border bg-surface px-3 text-sm focus:border-brand focus:outline-none" />
        </div>
        <button className="mt-2 h-9 w-full rounded-lg bg-ink text-xs font-bold text-white hover:bg-brand">Приложи</button>
      </FilterBlock>

      {filterGroups.map(g => (
        <FilterBlock key={g.title} title={g.title}>
          <ul className="space-y-2 text-sm">
            {g.options.map(o => (
              <li key={o}>
                <label className="flex cursor-pointer items-center gap-2.5 text-ink hover:text-brand">
                  <input type="checkbox" className="h-4 w-4 accent-[color:var(--brand)]" />
                  <span>{o}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{Math.floor(Math.random() * 80) + 5}</span>
                </label>
              </li>
            ))}
          </ul>
        </FilterBlock>
      ))}
    </>
  );
}


function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border py-4 first:border-t-0 first:pt-0">
      <div className="mb-3 flex items-center justify-between font-bold text-ink">
        <span className="text-sm">{title}</span>
        <ChevronDown className="h-4 w-4" />
      </div>
      {children}
    </div>
  );
}
