import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { useIsMobile } from "@/hooks/use-mobile";



const reviews = [
  {
    name: "Радостин",
    date: "17.06.2026",
    rating: 5,
    title: "Отличен продукт и бърза доставка",
    text: "Телевизорът има добро качество на картината и ясен звук. Работи бързо и е лесен за настройка. Подходящ е за филми и YouTube на добра цена.",
    product: "METZ Телевизор 40MTF6000Z 40\" FullHD, LED TV, черен",
    productHue: 220,
  },
  {
    name: "Петьо Еремиев",
    date: "17.06.2026",
    rating: 5,
    title: "Много удобна и лесна за ползване",
    text: "Добре се чува и бързо се свързва с телефона. Батерията издържа цял ден при активно ползване. Препоръчвам за всеки, който търси качествен продукт.",
    product: "HAMA Блутут слушалка „My Voice Advanced\", черен",
    productHue: 260,
  },
  {
    name: "Мария Петрова",
    date: "15.06.2026",
    rating: 5,
    title: "Професионално обслужване",
    text: "Изключително бърза доставка и професионално обслужване. Лаптопът пристигна на следващия ден, добре опакован. Определено ще пазарувам отново!",
    product: "Лаптоп ASUS TUF Gaming",
    productHue: 30,
  },
  {
    name: "Георги Иванов",
    date: "12.06.2026",
    rating: 5,
    title: "Голямо разнообразие и добри цени",
    text: "Много добри цени и голямо разнообразие от продукти. Консултантът беше изключително отзивчив и ми помогна да избера правилния монитор.",
    product: "Монитор Samsung Odyssey",
    productHue: 200,
  },
];

const AVERAGE_RATING = 5.0;

function stringToHue(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Avatar({ name }: { name: string }) {
  const hue = stringToHue(name);
  const bg = `radial-gradient(120% 90% at 30% 20%, oklch(0.95 0.04 ${hue}) 0%, oklch(0.88 0.06 ${hue}) 100%)`;
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black text-ink/70"
      style={{ background: bg }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

export function Reviews() {
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 1 : 2;
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(reviews.length / itemsPerPage));
  const safePage = Math.min(page, totalPages - 1);

  const canPrev = safePage > 0;
  const canNext = safePage < totalPages - 1;

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));


  return (
    <section className="container-tm py-10">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
          Отзиви от клиенти
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Обща оценка от реални ревюта за продукти в магазина.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="font-display text-5xl font-black leading-none text-ink md:text-6xl">
            {AVERAGE_RATING.toFixed(1).replace(".", ",")}
          </span>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-warning text-warning"
                  aria-hidden
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({reviews.length} отзива)
            </span>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(calc(-${safePage * 100}% - ${safePage} * 1rem))` }}
          >
            {reviews.map((r) => (
              <article
                key={r.name + r.date}
                className="w-full shrink-0 rounded-2xl border border-border bg-surface p-5 transition hover:bg-card hover:shadow-pop md:w-[calc(50%-0.5rem)] md:p-6"
              >

                {/* Stars */}
                <div className="mb-4 flex items-center gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-warning text-warning"
                      aria-hidden
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} />
                    <span className="text-sm font-semibold text-ink">
                      {r.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>

                {/* Review title */}
                <h3 className="mb-2 text-base font-bold leading-snug text-ink">
                  {r.title}
                </h3>

                {/* Review text */}
                <p className="mb-4 text-sm leading-relaxed text-ink/80 line-clamp-4">
                  {r.text}
                </p>

                {/* Product info */}
                <div className="border-t border-border/60 pt-4">
                  <p className="mb-3 text-xs text-muted-foreground">
                    Продукт: <span className="text-ink">{r.product}</span>
                  </p>
                  <div className="h-20 w-20 overflow-hidden rounded-xl bg-surface">
                    <ProductImage hue={r.productHue} name={r.product} compact />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          aria-label="Предишни отзиви"
          className="absolute -left-3 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-pop transition hover:bg-brand-dark disabled:pointer-events-none disabled:opacity-40 md:-left-4 md:h-9 md:w-9"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          aria-label="Следващи отзиви"
          className="absolute -right-3 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-pop transition hover:bg-brand-dark disabled:pointer-events-none disabled:opacity-40 md:-right-4 md:h-9 md:w-9"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Отиди на страница ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === safePage ? "bg-brand" : "bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

