import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { ProductImage } from "./ProductImage";

const stockText: Record<Product["stock"], { text: string; dot: string }> = {
  in: { text: "В наличност", dot: "bg-success" },
  low: { text: "Последни бройки", dot: "bg-warning" },
  order: { text: "По заявка", dot: "bg-muted-foreground" },
  out: { text: "Изчерпан", dot: "bg-destructive" },
};

function formatPrice(n: number) {
  return n.toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const s = stockText[product.stock];

  return (
    <article className="group relative flex h-full flex-col rounded-2xl bg-card p-3 transition duration-200 hover:shadow-pop">
      {/* Image */}
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square w-full overflow-hidden rounded-xl bg-surface"
      >
        <ProductImage hue={product.hue} name={product.name} />

        {discount > 0 && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-brand px-2 py-1 text-[11px] font-bold leading-none text-white">
            −{discount}%
          </span>
        )}
        {product.badges.includes("new") && discount === 0 && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-ink px-2 py-1 text-[11px] font-semibold leading-none text-white">
            Ново
          </span>
        )}

        <button
          type="button"
          aria-label="Добави в любими"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-ink shadow-card backdrop-blur transition hover:bg-white hover:text-brand"
        >
          <Heart className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 px-1 pt-4">
        <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
          <span className="uppercase tracking-wider">{product.brand}</span>
          <span className="inline-flex items-center gap-1 text-ink-soft">
            <Star className="h-3 w-3 fill-warning text-warning" />
            {product.rating.toFixed(1)}
            <span className="text-muted-foreground">({product.reviews})</span>
          </span>
        </div>

        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 min-h-[2.5rem] text-[14px] font-semibold leading-snug text-ink hover:text-brand"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-1.5 text-[11px] font-medium text-ink-soft">
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
          {s.text}
        </div>

        {/* Price */}
        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <div className="font-display text-[22px] font-black leading-none text-ink">
              {formatPrice(product.price)}
              <span className="ml-0.5 text-sm font-bold">лв.</span>
            </div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            {(product.price / 1.95583).toFixed(2)} €
          </div>

          <button
            type="button"
            disabled={product.stock === "out"}
            className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition hover:bg-brand disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-muted-foreground"
          >
            Добави в количката
          </button>
        </div>
      </div>
    </article>
  );
}
