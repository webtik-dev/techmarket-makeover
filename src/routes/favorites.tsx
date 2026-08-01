import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/mock-data";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Любими продукти — Techmarket.bg" },
      { name: "description", content: "Всички продукти, които си запазил като любими в Techmarket.bg." },
      { property: "og:title", content: "Любими продукти — Techmarket.bg" },
      { property: "og:description", content: "Всички продукти, които си запазил като любими в Techmarket.bg." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const items = products.slice(0, 3);

  return (
    <>
      <Header />
      <main className="bg-surface/40">
        <div className="container-tm py-6 md:py-10">
          <nav className="mb-4 flex items-center gap-2 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Начало</Link>
            <span>/</span>
            <span className="text-ink">Любими</span>
          </nav>

          <div className="mb-6 flex items-end justify-between md:mb-8">
            <h1 className="font-display text-2xl font-black text-ink md:text-3xl">
              Любими <span className="font-medium text-muted-foreground">({items.length})</span>
            </h1>
            <Link to="/" className="hidden text-[13px] font-semibold text-brand hover:underline md:inline">
              ← Продължи пазаруването
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl bg-background p-16 text-center shadow-card">
              <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-surface">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="font-display text-xl font-black text-ink">Нямаш любими продукти</h2>
              <p className="mt-2 text-[13px] text-muted-foreground">Натисни сърцето върху продукт, за да го запазиш тук.</p>
              <Link to="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-[13px] font-bold text-white hover:bg-brand-dark">
                Разгледай продукти
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
