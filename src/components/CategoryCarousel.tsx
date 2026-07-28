import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight, Laptop, Gamepad2, Refrigerator, Smartphone, Headphones } from "lucide-react";

type Banner = {
  eyebrow: string;
  title: string;
  cta: string;
  bg: string;
  icon: typeof Laptop;
  accent: string;
};

const banners: Banner[] = [
  {
    eyebrow: "Топ седмица",
    title: "Лаптопи с до −40%",
    cta: "Разгледай офертите",
    bg: "linear-gradient(135deg, oklch(0.28 0.05 264) 0%, oklch(0.18 0.03 264) 100%)",
    icon: Laptop,
    accent: "oklch(0.55 0.22 27)",
  },
  {
    eyebrow: "Gaming зона",
    title: "Гейминг с −30%",
    cta: "Влез в играта",
    bg: "linear-gradient(135deg, oklch(0.45 0.19 27) 0%, oklch(0.28 0.14 20) 100%)",
    icon: Gamepad2,
    accent: "oklch(0.85 0.16 90)",
  },
  {
    eyebrow: "Уреди за дома",
    title: "Големи уреди",
    cta: "Пазарувай сега",
    bg: "linear-gradient(135deg, oklch(0.94 0.02 220) 0%, oklch(0.85 0.04 220) 100%)",
    icon: Refrigerator,
    accent: "oklch(0.55 0.22 27)",
  },
  {
    eyebrow: "Ново поколение",
    title: "Смартфони 2026",
    cta: "Виж моделите",
    bg: "linear-gradient(135deg, oklch(0.25 0.06 260) 0%, oklch(0.15 0.04 260) 100%)",
    icon: Smartphone,
    accent: "oklch(0.75 0.15 240)",
  },
  {
    eyebrow: "Аудио свят",
    title: "Слушалки & звук",
    cta: "Чуй разликата",
    bg: "linear-gradient(135deg, oklch(0.32 0.06 300) 0%, oklch(0.2 0.04 300) 100%)",
    icon: Headphones,
    accent: "oklch(0.78 0.15 320)",
  },
];

export function CategoryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, dragFree: false });
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
    const id = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="container-tm pt-6">
      <div className="relative">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex gap-4">
            {banners.map((b, i) => {
              const Icon = b.icon;
              const isDark = i !== 2;
              return (
                <a
                  key={i}
                  href="#"
                  className="relative flex aspect-[4/3] min-w-0 flex-[0_0_85%] flex-col justify-end overflow-hidden rounded-2xl p-6 shadow-card transition-transform hover:-translate-y-0.5 md:aspect-[16/10] md:flex-[0_0_calc((100%-2rem)/3)] md:p-8 lg:aspect-[16/9] lg:flex-[0_0_calc((100%-3rem)/4)]"
                  style={{ background: b.bg }}
                >
                  <Icon
                    className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 opacity-15 md:-right-10 md:-top-10 md:h-64 md:w-64"
                    style={{ color: b.accent }}
                    strokeWidth={1}
                  />
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${isDark ? "from-black/40" : "from-white/60"} to-transparent`} />
                  <div className="relative">
                    <div
                      className="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: b.accent, color: isDark ? "white" : "oklch(0.19 0.03 264)" }}
                    >
                      {b.eyebrow}
                    </div>
                    <h3 className={`mt-3 font-display text-2xl font-black leading-tight md:text-3xl ${isDark ? "text-white" : "text-ink"}`}>
                      {b.title}
                    </h3>
                    <div className={`mt-3 inline-flex items-center gap-1 text-sm font-bold ${isDark ? "text-white" : "text-ink"}`}>
                      {b.cta} <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={scrollPrev}
          aria-label="Предишен"
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 grid-cols-1 place-items-center rounded-full bg-white/95 shadow-pop hover:bg-white md:grid md:h-11 md:w-11"
        >
          <ChevronLeft className="h-5 w-5 text-ink" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Следващ"
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 grid-cols-1 place-items-center rounded-full bg-white/95 shadow-pop hover:bg-white md:grid md:h-11 md:w-11"
        >
          <ChevronRight className="h-5 w-5 text-ink" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {snaps.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Слайд ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === selected ? "w-6 bg-brand" : "w-1.5 bg-ink/25"}`}
          />
        ))}
      </div>
    </section>
  );
}
