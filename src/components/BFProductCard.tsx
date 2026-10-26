import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { ProductImage } from "./ProductImage";
import tbiLogo from "@/assets/tbi-bank.svg.asset.json";

const fmt = (n: number) => n.toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function BFProductCard({ product }: { product: Product; campaign?: boolean }) {
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const out = product.stock === "out";
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-3 transition hover:border-brand/60">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="relative block aspect-square overflow-hidden rounded-xl">
        <ProductImage hue={product.hue} name={product.name} />
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {discount > 0 && <span className="rounded-md bg-brand px-2 py-0.5 text-[11px] font-black text-brand-foreground">−{discount}%</span>}
          <span className="rounded-md bg-background px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-ink">
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" />Black Month
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 px-1 pt-4">
        <div className="flex items-start justify-between gap-2">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="line-clamp-2 min-h-[2.5rem] text-[14px] font-semibold leading-snug text-ink hover:text-brand">
            {product.name}
          </Link>
          <Link to="/favorites" aria-label="Любими" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-ink-soft hover:border-brand hover:text-brand">
            <Heart className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-auto flex items-baseline justify-between">
          <span className="font-display text-[22px] font-black text-brand">{fmt(product.price)} <span className="text-sm">€</span></span>
          {product.oldPrice && <span className="text-sm text-muted-foreground line-through">{fmt(product.oldPrice)} €</span>}
        </div>
        <div className="flex h-10 items-center justify-center gap-2 rounded-full border border-brand/70 text-[13px] font-bold text-brand">
          <span className="rounded bg-ink px-1.5 py-0.5"><img src={tbiLogo.url} alt="TBI Bank" className="h-3.5 w-auto" /></span>
          на изплащане
        </div>
        {out ? (
          <button disabled className="h-11 rounded-full bg-surface-2 text-[13px] font-bold text-muted-foreground">Изчерпан</button>
        ) : (
          <Link to="/cart" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand text-[13px] font-bold text-brand-foreground shadow-brand transition hover:opacity-90">
            Купи <ShoppingCart className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
