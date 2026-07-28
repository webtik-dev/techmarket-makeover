import { Link } from "@tanstack/react-router";
import { Heart, GitCompareArrows, ShoppingCart, Star, Truck } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils";

const stockLabel = {
  in: { text: "В наличност", cls: "text-success" },
  low: { text: "Последни бройки", cls: "text-warning" },
  order: { text: "По заявка", cls: "text-muted-foreground" },
  out: { text: "Няма наличност", cls: "text-destructive" },
} as const;

const badgeStyles: Record<string, string> = {
  promo: "bg-brand text-brand-foreground",
  new: "bg-ink text-white",
  top: "bg-warning text-ink",
  "free-shipping": "bg-success/15 text-success",
  unpacked: "bg-surface-2 text-ink border border-border",
};
const badgeText: Record<string, string> = {
  promo: "Промо",
  new: "Ново",
  top: "Топ",
  "free-shipping": "Безпл. доставка",
  unpacked: "Разопакован",
};

function formatBGN(n: number) {
  return n.toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " лв.";
}
function toEUR(n: number) {
  return (n / 1.95583).toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

export function ProductCard({ product }: { product: Product }) {
  const s = stockLabel[product.stock];
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-pop">
      {/* Badges */}
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {discount > 0 && (
          <span className="inline-flex items-center rounded-md bg-brand px-2 py-1 text-xs font-bold text-brand-foreground shadow-brand">
            −{discount}%
          </span>
        )}
        {product.badges.filter(b => b !== "promo" && b !== "free-shipping").slice(0, 2).map(b => (
          <span key={b} className={cn("inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold", badgeStyles[b])}>
            {badgeText[b]}
          </span>
        ))}
      </div>

      {/* Quick actions */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <button
          type="button"
          aria-label="Добави в любими"
          className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-card backdrop-blur hover:bg-white hover:text-brand"
        >
          <Heart className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Сравни"
          className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-card backdrop-blur hover:bg-white hover:text-brand"
        >
          <GitCompareArrows className="h-4 w-4" />
        </button>
      </div>

      {/* Image */}
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block aspect-square w-full overflow-hidden bg-surface"
      >
        <ProductImage hue={product.hue} name={product.name} />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wide text-muted-foreground">{product.brand}</span>
          <span className={cn("font-semibold", s.cls)}>{s.text}</span>
        </div>

        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-ink hover:text-brand"
        >
          {product.name}
        </Link>

        <ul className="line-clamp-2 min-h-[2rem] text-xs text-muted-foreground">
          {product.specs.slice(0, 3).map((s, i) => (
            <li key={i} className="inline">
              {s}
              {i < 2 && <span className="mx-1">·</span>}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="font-semibold text-ink">{product.rating.toFixed(1)}</span>
          <span>({product.reviews})</span>
        </div>

        {product.badges.includes("free-shipping") && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-success">
            <Truck className="h-3.5 w-3.5" />
            Безплатна доставка
          </div>
        )}

        <div className="mt-auto pt-2">
          {product.oldPrice && (
            <div className="text-xs text-muted-foreground line-through">{formatBGN(product.oldPrice)}</div>
          )}
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-2xl font-bold text-price leading-none">{formatBGN(product.price)}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{toEUR(product.price)}</div>
            </div>
            <button
              type="button"
              aria-label={`Добави ${product.name} в количката`}
              disabled={product.stock === "out"}
              className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-brand px-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">В количката</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
