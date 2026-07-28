import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const columns = [
  {
    title: "Обслужване",
    links: ["Контакти", "Магазини", "Помощен център", "Често задавани въпроси", "Рекламации"],
  },
  {
    title: "Поръчки и доставка",
    links: ["Начини на плащане", "Доставка", "Проследяване", "Гаранция", "Връщане на стока"],
  },
  {
    title: "За Techmarket",
    links: ["За нас", "Кариери", "Партньори", "Блог", "Промоции"],
  },
  {
    title: "Категории",
    links: ["Лаптопи", "Смартфони", "Телевизори", "Аудио", "Гейминг"],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-ink text-white">
      <div className="container-tm py-14">
        {/* Newsletter */}
        <div className="mb-12 grid gap-6 rounded-2xl bg-gradient-to-r from-brand to-brand-dark p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <h3 className="text-2xl font-black">Абонирай се и получи −10%</h3>
            <p className="mt-1 text-sm text-white/85">Промоции, ексклузивни оферти и новини първи в твоя имейл.</p>
          </div>
          <form className="flex w-full gap-2 md:w-auto">
            <input
              type="email"
              placeholder="Твоят имейл адрес"
              className="h-12 min-w-0 flex-1 rounded-lg bg-white px-4 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white md:w-80"
            />
            <button className="h-12 shrink-0 rounded-lg bg-ink px-5 text-sm font-bold text-white hover:bg-ink-soft">
              Абонирай се
            </button>
          </form>
        </div>

        {/* Columns */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-white">
                <span className="text-lg font-black">T</span>
              </div>
              <div className="font-display text-xl font-black">TECHMARKET</div>
            </div>
            <p className="text-sm text-white/70">
              Твоят технологичен магазин с над 45 000 продукта, експресна доставка и гаранция на всяка покупка.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand" /> 0700 12 345</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand" /> office@techmarket.bg</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> София, ул. Технологична 1</li>
            </ul>
          </div>

          {columns.map(col => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{col.title}</h4>
              <ul className="space-y-2.5 text-sm text-white/70">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="hover:text-brand">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <div className="text-xs text-white/60">© 2026 Techmarket.bg · Всички права запазени</div>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Youtube].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-brand">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/50">
            {["Visa", "Mastercard", "Borica", "PayPal", "Наложен платеж"].map(p => (
              <span key={p} className="rounded border border-white/15 px-2 py-1">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
