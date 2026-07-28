import { ArrowRight, Zap, Percent, Sparkles } from "lucide-react";

export function PromoBlock() {
  return (
    <section className="container-tm grid gap-4 py-6 lg:grid-cols-3">
      {/* Main promo */}
      <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand to-brand-dark p-8 text-white shadow-brand lg:col-span-2 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-black/20 blur-3xl" />

        <div className="relative flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
            <Zap className="h-3.5 w-3.5" /> Само тази седмица
          </div>
          <h2 className="max-w-lg font-display text-4xl font-black leading-tight md:text-6xl">
            −40% на лаптопи и монитори
          </h2>
          <p className="max-w-md text-sm text-white/85 md:text-base">
            Открий най-добрите оферти на водещи марки. Ограничени количества, безплатна доставка над 200 лв.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-brand shadow-lg transition-transform hover:scale-[1.02]"
            >
              Разгледай офертите <ArrowRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-4 text-xs font-medium text-white/80">
              <div><div className="text-2xl font-black text-white">03</div><div>дни</div></div>
              <div><div className="text-2xl font-black text-white">18</div><div>часа</div></div>
              <div><div className="text-2xl font-black text-white">42</div><div>мин.</div></div>
            </div>
          </div>
        </div>
      </article>

      {/* Side promos */}
      <div className="grid gap-4">
        <article className="relative overflow-hidden rounded-2xl bg-ink p-6 text-white">
          <Sparkles className="absolute right-4 top-4 h-6 w-6 text-brand" />
          <div className="text-xs font-bold uppercase tracking-wider text-brand">Ново</div>
          <h3 className="mt-2 font-display text-2xl font-black">iPhone 16 Pro</h3>
          <p className="mt-1 text-sm text-white/70">Резервирай сега и получи безплатни AirPods.</p>
          <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand hover:gap-2 transition-all">
            Виж повече <ArrowRight className="h-4 w-4" />
          </a>
        </article>
        <article className="relative overflow-hidden rounded-2xl bg-warning/20 p-6">
          <Percent className="absolute right-4 top-4 h-6 w-6 text-ink" />
          <div className="text-xs font-bold uppercase tracking-wider text-ink/70">Разпродажба</div>
          <h3 className="mt-2 font-display text-2xl font-black text-ink">Стоки на топ цени</h3>
          <p className="mt-1 text-sm text-ink/70">Разопаковани и последни бройки с до −60%.</p>
          <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-ink hover:text-brand">
            Разгледай <ArrowRight className="h-4 w-4" />
          </a>
        </article>
      </div>
    </section>
  );
}
