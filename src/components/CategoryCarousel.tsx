import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { categories } from "@/lib/mock-data";

export function CategoryCarousel() {
  return (
    <section className="container-tm py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Разгледай магазина</p>
          <h2 className="mt-1 text-3xl font-black text-ink md:text-4xl">Пазарувай по категория</h2>
        </div>
        <a href="#" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-ink hover:text-brand md:inline-flex">
          Всички категории <ChevronRight className="h-4 w-4" />
        </a>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:thin]">
        <ul className="flex gap-3 md:grid md:grid-cols-4 md:gap-4 lg:grid-cols-8">
          {categories.slice(0, 16).map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.slug} className="w-[140px] shrink-0 md:w-auto">
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="group flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-pop"
                >
                  <div className={`grid h-16 w-16 place-items-center rounded-2xl ${c.tone} transition-transform group-hover:scale-110`}>
                    <Icon className="h-8 w-8 text-ink" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="line-clamp-2 text-sm font-bold text-ink group-hover:text-brand">{c.name}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{c.count} продукта</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
