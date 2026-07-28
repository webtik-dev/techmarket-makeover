import { Link } from "@tanstack/react-router";
import { Heart, GitCompareArrows, Star, Truck, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { ProductImage } from "./ProductImage";

const stockText: Record<Product["stock"], { text: string; cls: string }> = {
  in: { text: "В наличност", cls: "text-success" },
  low: { text: "Последни бройки", cls: "text-warning" },
  order: { text: "По заявка", cls: "text-muted-foreground" },
  out: { text: "Няма наличност", cls: "text-destructive" },
};

function formatPrice(n: number) {
  return n.toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const stars = Math.round(product.rating);
  const s = stockText[product.stock];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-brand/50 hover:shadow-pop">
      {/* Top-left promo pill (Technopolis-style) */}
      {(product.badges.includes("promo") || discount > 0) && (
        <div className="absolute left-3 top-3 z-10">
          <span className="inline-flex items-center rounded-md bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-foreground">
            От брошурата
          </span>
        </div>
      )}

      {/* Quick actions */}
      <div className="absolute right-2 top-2 z-10 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <button
          type="button"
          aria-label="Добави в любими"
          className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-card hover:text-brand"
        >
          <Heart className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Сравни"
          className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-card hover:text-brand"
        >
          <GitCompareArrows className="h-4 w-4" />
        </button>
      </div>

      {/* Image */}
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block aspect-square w-full overflow-hidden bg-white"
      >
        <ProductImage hue={product.hue} name={product.name} />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 min-h-[2.75rem] text-[13px] font-medium text-ink hover:text-brand"
        >
          {product.brand} {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex" aria-label={`Оценка ${product.rating.toFixed(1)}`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < stars ? "fill-warning text-warning" : "text-border"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">(от {product.reviews} ревюта)</span>
        </div>

        {/* Options link (Technopolis-style) */}
        <a href="#" className="inline-flex items-center gap-0.5 text-xs font-semibold text-brand hover:underline">
          Виж опции за взимане и доставка <ChevronRight className="h-3 w-3" />
        </a>

        {product.badges.includes("free-shipping") && (
          <div className="flex items-center gap-1 text-[11px] font-medium text-success">
            <Truck className="h-3 w-3" /> Безплатна доставка
          </div>
        )}

        <div className={`mt-1 text-[11px] font-semibold ${s.cls}`}>{s.text}</div>

        {/* Price block */}
        <div className="mt-auto pt-3">
          <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Цена:</div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <div className="font-display text-2xl font-black text-ink leading-none">
              {formatPrice(product.price)} <span className="text-base">лв.</span>
            </div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)} лв.
              </div>
            )}
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            {(product.price / 1.95583).toFixed(2)} €
          </div>

          <button
            type="button"
            disabled={product.stock === "out"}
            className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full bg-brand px-4 text-xs font-bold uppercase tracking-wide text-brand-foreground transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            Купи
          </button>
        </div>
      </div>
    </article>
  );
}
