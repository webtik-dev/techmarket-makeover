import { Link } from "@tanstack/react-router";
import { Heart, Star, ShoppingCart, GitCompareArrows, Truck } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { ProductImage } from "./ProductImage";
import tbiLogo from "@/assets/tbi-bank.svg.asset.json";


const stockText: Record<Product["stock"], { text: string; dot: string }> = {
  in: { text: "В наличност", dot: "bg-success" },
  low: { text: "Последни бройки", dot: "bg-warning" },
  order: { text: "По заявка", dot: "bg-muted-foreground" },
  out: { text: "Изчерпан", dot: "bg-destructive" },
};

const BGN_PER_EUR = 1.95583;

function formatEUR(n: number) {
  return n.toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const s = stockText[product.stock];

  const priceEur = product.price / BGN_PER_EUR;
  const oldEur = product.oldPrice ? product.oldPrice / BGN_PER_EUR : null;

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
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-brand px-2.5 py-1 text-[11px] font-black leading-none text-white shadow-brand">
            −{discount}%
          </span>
        )}
        {product.badges.includes("new") && discount === 0 && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold leading-none text-white">
            Ново
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 px-1 pt-4">
        <div className="flex items-center justify-between text-[11px] font-medium">
          <span className="inline-flex items-center gap-1.5 text-ink-soft">
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
            {s.text}
          </span>
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

        {/* Price EUR primary, BGN secondary */}
        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <div className="font-display text-[22px] font-black leading-none text-brand">
              {formatEUR(priceEur)}
              <span className="ml-0.5 text-sm font-bold">€</span>
            </div>
            {oldEur && (
              <div className="text-xs text-muted-foreground line-through">
                {formatEUR(oldEur)} €
              </div>
            )}
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            {product.price.toFixed(2)} лв.
          </div>

          {/* Perks — single row, side-by-side */}
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-warning/10 px-1.5 py-1 text-[10px] font-semibold text-ink whitespace-nowrap">
              <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-warning text-[8px] font-black text-white">
                0%
              </span>
              <img src={tbiLogo.url} alt="TBI Bank" className="h-3 w-auto shrink-0 object-contain" />
              <span>лизинг</span>
            </span>
            {product.price >= 200 && (
              <span className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-success/10 px-1.5 py-1 text-[10px] font-semibold text-ink whitespace-nowrap">
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-white">
                  <Truck className="h-2.5 w-2.5" strokeWidth={2.5} />
                </span>
                <span>Безплатна доставка</span>
              </span>
            )}
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            disabled={product.stock === "out"}
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-4 text-[13px] font-bold text-white shadow-brand transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-muted-foreground disabled:shadow-none"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2.2} />
            Купи
          </button>


          {/* Secondary actions */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-label="Добави в любими"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-surface text-[12px] font-semibold text-ink-soft transition hover:bg-brand/10 hover:text-brand"
            >
              <Heart className="h-3.5 w-3.5" strokeWidth={2} />
              Любими
            </button>
            <button
              type="button"
              aria-label="Сравни"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-surface text-[12px] font-semibold text-ink-soft transition hover:bg-brand/10 hover:text-brand"
            >
              <GitCompareArrows className="h-3.5 w-3.5" strokeWidth={2} />
              Сравни
            </button>
          </div>

        </div>
      </div>
    </article>
  );
}
