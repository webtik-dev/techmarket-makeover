import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { ProductCard } from "./ProductCard";

export function ProductSection({
  eyebrow,
  title,
  products,
}: {
  eyebrow?: string;
  title: string;
  products: Product[];
  accent?: boolean;
}) {
  return (
    <section className="container-tm py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-1 font-display text-2xl font-black text-ink md:text-3xl">{title}</h2>
        </div>
        <a href="#" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-ink hover:text-brand">
          Виж всички <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
