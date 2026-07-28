import { Truck, ShieldCheck, HeadphonesIcon, RotateCcw } from "lucide-react";

const items = [
  { icon: Truck, title: "Безплатна доставка", text: "За поръчки над 200 лв." },
  { icon: ShieldCheck, title: "Официална гаранция", text: "24 месеца от вносителя." },
  { icon: HeadphonesIcon, title: "Технически съпорт", text: "Експерти всеки ден 9–21ч." },
  { icon: RotateCcw, title: "14 дни връщане", text: "Без обяснения, без риск." },
];

export function Benefits() {
  return (
    <section className="container-tm py-10">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-4">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="flex items-start gap-4 bg-background p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface text-ink">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="text-[13px] font-semibold text-ink">{it.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{it.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
