import { Truck, RotateCcw, ShieldCheck, HeadphonesIcon, CreditCard, Store } from "lucide-react";

const items = [
  { icon: Truck, title: "Бърза доставка", text: "Експресна доставка до 24 часа в цяла България." },
  { icon: RotateCcw, title: "14 дни връщане", text: "Пълно право на връщане без обяснения." },
  { icon: ShieldCheck, title: "Официална гаранция", text: "Всички продукти с гаранция от вносителя." },
  { icon: HeadphonesIcon, title: "Консултация", text: "Експертен съвет от нашите специалисти." },
  { icon: CreditCard, title: "Сигурни плащания", text: "Плащане с карта, PayPal или наложен платеж." },
  { icon: Store, title: "Физически магазини", text: "Вземи от магазин или получи безплатно." },
];

export function Benefits() {
  return (
    <section className="bg-surface">
      <div className="container-tm py-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.title} className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-card">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-ink">{it.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{it.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
