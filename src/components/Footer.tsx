import { Instagram, Youtube, Facebook, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const columns = [
  {
    title: "Обслужване",
    links: ["Контакти", "Магазини", "Помощен център", "ЧЗВ", "Рекламации"],
  },
  {
    title: "Поръчки",
    links: ["Начини на плащане", "Доставка", "Проследяване", "Гаранция", "Връщане"],
  },
  {
    title: "За Techmarket",
    links: ["За нас", "Кариери", "Партньори", "Блог", "Промоции"],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-tm grid gap-8 py-12 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
          <div>
            <h3 className="font-display text-3xl font-black leading-tight md:text-4xl">
              Абонирай се <span className="text-brand">и спести 10%</span>
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Първи научавай за оферти, нови продукти и ексклузивни намаления.
            </p>
          </div>
          <form className="flex h-14 items-center overflow-hidden rounded-full bg-white/10 pl-6 backdrop-blur">
            <input
              type="email"
              placeholder="Твоят имейл адрес"
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
            <button
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-white hover:text-ink"
              aria-label="Абонирай се"
            >
              Абонирай се <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Columns */}
      <div className="container-tm grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-baseline gap-0.5 font-display">
            <span className="text-2xl font-black">techmarket</span>
            <span className="h-2 w-2 rounded-full bg-brand" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Над 45 000 продукта, експресна доставка и официална гаранция за твоите технологични нужди.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-brand" /> 0700 12 345</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-brand" /> office@techmarket.bg</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-brand" /> София, ул. Технологична 1</li>
          </ul>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/50">{col.title}</h4>
            <ul className="space-y-3 text-sm text-white/75">
              {col.links.map((l) => (
                <li key={l}><a href="#" className="transition hover:text-brand">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-tm flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center">
          <div className="text-xs text-white/50">© 2026 Techmarket.bg · Всички права запазени</div>
          <div className="flex items-center gap-2">
            {[Facebook, Instagram, Youtube].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-brand hover:text-brand">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
            {["Visa", "Mastercard", "Borica", "PayPal"].map((p) => (
              <span key={p} className="rounded-md border border-white/10 px-2 py-1">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
