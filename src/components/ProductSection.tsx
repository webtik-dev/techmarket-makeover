import type { Product } from "@/lib/mock-data";
import { ProductCard } from "./ProductCard";

export function ProductSection({
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
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-ink md:text-4xl">
          {title}
        </h2>
        <span className="mt-3 h-1 w-16 rounded-full bg-brand" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
