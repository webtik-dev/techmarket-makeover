import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Laptop, Gamepad2, Refrigerator, Smartphone, Headphones } from "lucide-react";

type Banner = {
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  bg: string;
  fg: "light" | "dark";
  icon: typeof Laptop;
};

const banners: Banner[] = [
  {
    eyebrow: "Топ седмица",
    title: "Лаптопи —40%",
    sub: "Ограничени количества за професионална работа и учене.",
    cta: "Виж офертите",
    bg: "linear-gradient(135deg, oklch(0.22 0.04 264), oklch(0.14 0.03 264))",
    fg: "light",
    icon: Laptop,
  },
  {
    eyebrow: "Gaming",
    title: "Играй без компромис",
    sub: "Конзоли, монитори и аксесоари с −30%.",
    cta: "Влез в играта",
    bg: "linear-gradient(135deg, oklch(0.55 0.22 27), oklch(0.34 0.16 22))",
    fg: "light",
    icon: Gamepad2,
  },
  {
    eyebrow: "За дома",
    title: "Големи уреди",
    sub: "Хладилници, перални и още с експресна доставка.",
    cta: "Пазарувай",
    bg: "linear-gradient(135deg, oklch(0.96 0.02 220), oklch(0.9 0.04 220))",
    fg: "dark",
    icon: Refrigerator,
  },
  {
    eyebrow: "Ново поколение",
    title: "Смартфони 2026",
    sub: "Флагмани от Apple, Samsung и Google.",
    cta: "Виж моделите",
    bg: "linear-gradient(135deg, oklch(0.28 0.06 260), oklch(0.16 0.04 260))",
    fg: "light",
    icon: Smartphone,
  },
  {
    eyebrow: "Аудио",
    title: "Чуй разликата",
    sub: "Слушалки и колонки с обемен звук.",
    cta: "Разгледай",
    bg: "linear-gradient(135deg, oklch(0.34 0.06 300), oklch(0.2 0.04 300))",
    fg: "light",
    icon: Headphones,
  },
];

export function CategoryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    const id = setInterval(() => emblaApi.scrollNext(), 7000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="container-tm pt-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {banners.map((b, i) => {
            const Icon = b.icon;
            const light = b.fg === "light";
            return (
              <a
                key={i}
                href="#"
                className="group relative flex aspect-[4/5] min-w-0 flex-[0_0_78%] flex-col justify-between overflow-hidden rounded-2xl p-6 transition sm:aspect-[4/5] sm:flex-[0_0_45%] md:aspect-[3/4] md:flex-[0_0_calc((100%-2rem)/3)] md:p-7 lg:flex-[0_0_calc((100%-3rem)/4)]"
                style={{ background: b.bg }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
                      light ? "bg-white/15 text-white backdrop-blur" : "bg-ink/10 text-ink"
                    }`}
                  >
                    {b.eyebrow}
                  </span>
                  <Icon
                    className={`h-8 w-8 ${light ? "text-white/70" : "text-ink/60"}`}
                    strokeWidth={1.5}
                  />
                </div>

                <Icon
                  className={`pointer-events-none absolute -bottom-10 -right-6 h-56 w-56 transition duration-500 group-hover:scale-110 ${
                    light ? "text-white/10" : "text-ink/10"
                  }`}
                  strokeWidth={0.8}
                />

                <div className="relative">
                  <h3 className={`font-display text-[26px] font-black leading-tight md:text-3xl ${light ? "text-white" : "text-ink"}`}>
                    {b.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${light ? "text-white/75" : "text-ink-soft"}`}>
                    {b.sub}
                  </p>
                  <div className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${light ? "text-white" : "text-ink"}`}>
                    {b.cta}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Controls: elongated arrows + dots, centered */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={scrollPrev}
          aria-label="Предишен"
          className="inline-flex h-9 w-14 items-center justify-center rounded-full text-ink-soft transition hover:text-brand"
        >
          <ChevronLeft className="h-6 w-8" strokeWidth={1.75} />
        </button>

        <div className="flex items-center gap-1.5">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Слайд ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === selected ? "w-6 bg-ink" : "w-1.5 bg-ink/20"}`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Следващ"
          className="inline-flex h-9 w-14 items-center justify-center rounded-full text-ink-soft transition hover:text-brand"
        >
          <ChevronRight className="h-6 w-8" strokeWidth={1.75} />
        </button>
      </div>
    </section>
  );
}

