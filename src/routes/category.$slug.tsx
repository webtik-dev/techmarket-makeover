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
          {/* Filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <div className="rounded-xl bg-card p-5 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-ink">
                    <SlidersHorizontal className="h-4 w-4" /> Филтри
                  </div>
                  <button className="text-xs font-semibold text-brand hover:underline">Изчисти</button>
                </div>

                {/* Applied chips */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {["ASUS", "16 GB", "В наличност"].map(chip => (
                    <span key={chip} className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">
                      {chip} <X className="h-3 w-3 cursor-pointer" />
                    </span>
                  ))}
                </div>

                {/* Price */}
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
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div>
            {/* Toolbar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-3 shadow-card">
              <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-bold text-brand-foreground lg:hidden">
                <SlidersHorizontal className="h-4 w-4" /> Филтри
              </button>
              <div className="text-sm text-muted-foreground">
                Намерени <span className="font-bold text-ink">{items.length}</span> продукта
              </div>
              <div className="flex items-center gap-2 text-sm">
                <label className="text-muted-foreground">Сортирай:</label>
                <button className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 font-semibold text-ink hover:border-brand">
                  Най-популярни <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="ml-auto flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
                <button aria-label="Grid" className="grid h-8 w-8 place-items-center rounded-md bg-brand text-brand-foreground"><Grid3x3 className="h-4 w-4" /></button>
                <button aria-label="List" className="grid h-8 w-8 place-items-center rounded-md text-ink hover:text-brand"><List className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
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
      </main>
      <Footer />
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
