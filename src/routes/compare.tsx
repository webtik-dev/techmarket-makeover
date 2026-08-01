import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductImage } from "@/components/ProductImage";
import { products } from "@/lib/mock-data";
import { GitCompareArrows, ShoppingCart, Star, X } from "lucide-react";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Сравнение на продукти — Techmarket.bg" },
      { name: "description", content: "Сравни характеристики, цени и оценки на избрани продукти от Techmarket.bg." },
      { property: "og:title", content: "Сравнение на продукти — Techmarket.bg" },
      { property: "og:description", content: "Сравни характеристики, цени и оценки на избрани продукти от Techmarket.bg." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePage,
});

const BGN_PER_EUR = 1.95583;
const fmtEUR = (n: number) => n.toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const stockLabel: Record<string, string> = {
  in: "В наличност",
  low: "Последни бройки",
  order: "По заявка",
  out: "Изчерпан",
};

function ComparePage() {
  const items = products.slice(0, 2);
  const rows = [
    { label: "Марка", get: (p: (typeof products)[number]) => p.brand },
    { label: "Категория", get: (p: (typeof products)[number]) => p.category },
    { label: "Процесор", get: (p: (typeof products)[number]) => p.specs[0] },
    { label: "Памет", get: (p: (typeof products)[number]) => p.specs[1] },
    { label: "Дисплей", get: (p: (typeof products)[number]) => p.specs[2] },
    { label: "Наличност", get: (p: (typeof products)[number]) => stockLabel[p.stock] },
  ];

  return (
    <>
      <Header />
      <main className="bg-surface/40">
        <div className="container-tm py-6 md:py-10">
          <nav className="mb-4 flex items-center gap-2 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Начало</Link>
            <span>/</span>
            <span className="text-ink">Сравни</span>
          </nav>

          <h1 className="mb-6 font-display text-2xl font-black text-ink md:mb-8 md:text-3xl">
            Сравнение <span className="font-medium text-muted-foreground">({items.length})</span>
          </h1>

          {items.length === 0 ? (
            <div className="rounded-2xl bg-background p-16 text-center shadow-card">
              <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-surface">
                <GitCompareArrows className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="font-display text-xl font-black text-ink">Списъкът за сравнение е празен</h2>
              <p className="mt-2 text-[13px] text-muted-foreground">Добави поне два продукта, за да ги сравниш.</p>
              <Link to="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-[13px] font-bold text-white hover:bg-brand-dark">
                Разгледай продукти
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl bg-background shadow-card">
              <table className="w-full min-w-[640px] border-collapse text-[13px]">
                <thead>
                  <tr>
                    <th className="w-40 p-4 text-left align-bottom text-[12px] font-semibold text-muted-foreground">
                      Продукт
                    </th>
                    {items.map((p) => (
                      <th key={p.id} className="p-4 text-left align-bottom">
                        <div className="relative">
                          <button
                            aria-label="Премахни от сравнение"
                            className="absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-surface hover:text-brand"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <Link
                            to="/product/$slug"
                            params={{ slug: p.slug }}
                            className="block aspect-square w-28 overflow-hidden rounded-xl bg-surface"
                          >
                            <ProductImage hue={p.hue} name={p.name} />
                          </Link>
                          <Link
                            to="/product/$slug"
                            params={{ slug: p.slug }}
                            className="mt-3 block max-w-[220px] text-[14px] font-semibold text-ink transition hover:text-brand"
                          >
                            {p.brand} {p.name}
                          </Link>
                          <div className="mt-1 inline-flex items-center gap-1 text-[12px] text-muted-foreground">
                            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                            {p.rating.toFixed(1)} ({p.reviews})
                          </div>
                          <div className="mt-2 font-display text-xl font-black text-ink">{fmtEUR(p.price)} €</div>
                          <div className="text-[11px] text-muted-foreground">
                            {(p.price * BGN_PER_EUR).toFixed(2)} лв.
                          </div>
                          <Link
                            to="/cart"
                            className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brand px-5 text-[12px] font-bold text-white transition hover:bg-brand-dark"
                          >
                            <ShoppingCart className="h-4 w-4" /> Купи
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-t border-border">
                      <td className="p-4 text-[12px] font-semibold text-muted-foreground">{r.label}</td>
                      {items.map((p) => (
                        <td key={p.id} className="p-4 text-ink">{r.get(p)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
