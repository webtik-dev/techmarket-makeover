import { Linkedin, Facebook, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import logoAsset from "@/assets/techmarket-logo.svg.asset.json";
import visa from "@/assets/visa.png.asset.json";
import mastercard from "@/assets/mastercard.png.asset.json";
import maestro from "@/assets/maestro.png.asset.json";
import applePay from "@/assets/apple-pay.png.asset.json";
import googlePay from "@/assets/google-pay.png.asset.json";

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

const payments = [
  { src: visa.url, alt: "Visa" },
  { src: mastercard.url, alt: "Mastercard" },
  { src: maestro.url, alt: "Maestro" },
  { src: applePay.url, alt: "Apple Pay" },
  { src: googlePay.url, alt: "Google Pay" },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-surface text-ink">
      {/* Newsletter */}
      <div className="border-b border-border">
        <div className="container-tm grid gap-8 py-12 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
          <div>
            <h3 className="font-display text-3xl font-black leading-tight md:text-4xl">
              Абонирай се <span className="text-brand">и спести 10%</span>
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Първи научавай за оферти, нови продукти и ексклузивни намаления.
            </p>
          </div>
          <form className="flex h-14 items-center overflow-hidden rounded-full bg-white pl-6 shadow-card ring-1 ring-border">
            <input
              type="email"
              placeholder="Твоят имейл адрес"
              className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-soft focus:outline-none"
            />
            <button
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-dark"
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
          <img src={logoAsset.url} alt="Techmarket" className="h-10 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Над 45 000 продукта, експресна доставка и официална гаранция за твоите технологични нужди.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink/80">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-brand" /> 0700 12 345</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-brand" /> office@techmarket.bg</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-brand" /> София, ул. Технологична 1</li>
          </ul>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">{col.title}</h4>
            <ul className="space-y-3 text-sm text-ink/80">
              {col.links.map((l) => (
                <li key={l}><a href="#" className="transition hover:text-brand">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="container-tm flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center">
          <div className="text-xs text-ink-soft">© 2026 Techmarket.bg · Всички права запазени</div>
          <div className="flex items-center gap-2">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Linkedin, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink-soft transition hover:border-brand hover:text-brand"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {payments.map((p) => (
              <span
                key={p.alt}
                className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-white px-2"
              >
                <img src={p.src} alt={p.alt} className="h-4 w-auto object-contain" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
