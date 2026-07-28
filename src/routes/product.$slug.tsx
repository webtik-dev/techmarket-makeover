import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Star, Heart, GitCompareArrows, ShoppingCart, Truck, ShieldCheck, RotateCcw, Package } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const p = products.find(x => x.slug === params.slug);
    return {
      meta: [
        { title: `${p?.brand ?? ""} ${p?.name ?? "Продукт"} — Techmarket.bg` },
        { name: "description", content: `Купи ${p?.brand} ${p?.name} на топ цена с експресна доставка и гаранция.` },
        { property: "og:title", content: `${p?.brand} ${p?.name}` },
        { property: "og:description", content: `Купи от Techmarket.bg.` },
      ],
    };
  },
  loader: ({ params }) => {
    const p = products.find(x => x.slug === params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const related = products.filter(p => p.id !== product.id).slice(0, 5);

  return (
    <>
      <Header />
      <main className="bg-surface pb-16">
        <div className="container-tm pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-brand">Начало</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-brand">Лаптопи</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate font-semibold text-ink">{product.name}</span>
          </nav>
        </div>

        <div className="container-tm mt-4 grid gap-4 md:gap-6 lg:grid-cols-[1fr_400px]">
          {/* Gallery + info */}
          <div className="grid gap-4 rounded-2xl bg-card p-4 shadow-card md:grid-cols-[100px_1fr] md:gap-6 md:p-8">
            <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
              {[0, 1, 2, 3].map(i => (
                <button key={i} className="aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2 border-border hover:border-brand sm:w-20 md:w-full">
                  <ProductImage hue={(product.hue + i * 30) % 360} name={product.name} />
                </button>
              ))}
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-surface">
                <ProductImage hue={product.hue} name={product.name} />
              </div>
            </div>
          </div>


          {/* Sticky buy panel */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-card p-6 shadow-card">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">{product.brand}</div>
              <h1 className="mt-1 font-display text-2xl font-black text-ink md:text-3xl">{product.name}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-bold text-ink">{product.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({product.reviews})</span>
                </div>
                <span className="text-muted-foreground">SKU: TM-{product.id.toUpperCase()}</span>
              </div>

              <ul className="mt-4 space-y-1.5 text-sm text-ink">
                {product.specs.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" /> {s}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl bg-surface p-4">
                {product.oldPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">
                      {(product.oldPrice / 1.95583).toFixed(2)} €
                    </span>
                    <span className="inline-flex items-center rounded-md bg-brand px-2 py-0.5 text-xs font-bold text-brand-foreground">
                      −{discount}%
                    </span>
                  </div>
                )}
                <div className="mt-1 font-display text-4xl font-black text-price leading-none">
                  {(product.price / 1.95583).toFixed(2)} €
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {product.price.toFixed(2)} лв. · Или на 12 вноски от {(product.price / 12 / 1.95583).toFixed(2)} €
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <div className="flex h-12 items-center rounded-lg border border-border bg-surface">
                  <button className="grid h-full w-10 place-items-center text-lg font-bold text-ink hover:text-brand">−</button>
                  <input value={1} readOnly className="h-full w-10 bg-transparent text-center text-sm font-bold" />
                  <button className="grid h-full w-10 place-items-center text-lg font-bold text-ink hover:text-brand">+</button>
                </div>
                <button className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-bold text-brand-foreground shadow-brand hover:bg-brand-dark">
                  <ShoppingCart className="h-4 w-4" /> В количката
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface text-sm font-semibold text-ink hover:border-brand hover:text-brand">
                  <Heart className="h-4 w-4" /> Любими
                </button>
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface text-sm font-semibold text-ink hover:border-brand hover:text-brand">
                  <GitCompareArrows className="h-4 w-4" /> Сравни
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-4 shadow-card">
              <InfoRow icon={Truck} title="Експресна доставка" text="Утре, 30.07 · Безплатно над 200 лв." />
              <InfoRow icon={ShieldCheck} title="Официална гаранция" text="24 месеца от вносителя." />
              <InfoRow icon={RotateCcw} title="14 дни връщане" text="Без обяснения, лесно и бързо." />
              <InfoRow icon={Package} title="Вземи от магазин" text="Свободно в над 20 града в България." last />
            </div>
          </aside>
        </div>

        {/* Related */}
        <section className="container-tm mt-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <h2 className="font-display text-3xl font-black uppercase tracking-tight text-ink md:text-4xl">Подобни продукти</h2>
            <span className="mt-3 h-1 w-16 rounded-full bg-brand" />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function InfoRow({ icon: Icon, title, text, last }: { icon: typeof Truck; title: string; text: string; last?: boolean }) {
  return (
    <div className={`flex items-start gap-3 py-3 ${!last ? "border-b border-border" : ""}`}>
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-bold text-ink">{title}</div>
        <div className="text-xs text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}
