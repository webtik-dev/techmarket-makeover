import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { User, Package, Heart, MapPin, CreditCard, Bell, LogOut, ChevronRight, Star, Check, Truck, Clock } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Моят профил — Techmarket.bg" },
      { name: "description", content: "Управлявай поръчките, адресите и предпочитанията си." },
      { property: "og:title", content: "Моят профил — Techmarket.bg" },
      { property: "og:description", content: "Управлявай поръчките, адресите и предпочитанията си." },
    ],
  }),
  component: ProfilePage,
});

const BGN_PER_EUR = 1.95583;
const fmtEUR = (n: number) => (n / BGN_PER_EUR).toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const tabs = [
  { id: "overview", label: "Преглед", icon: User },
  { id: "orders", label: "Поръчки", icon: Package, badge: 3 },
  { id: "favorites", label: "Любими", icon: Heart, badge: 12 },
  { id: "addresses", label: "Адреси", icon: MapPin },
  { id: "payment", label: "Плащания", icon: CreditCard },
  { id: "notifications", label: "Известия", icon: Bell },
] as const;

const orders = [
  { id: "TM-2026-0842", date: "24 юли 2026", status: "delivered", total: 2399, items: 1, hue: 220 },
  { id: "TM-2026-0791", date: "12 юли 2026", status: "shipped", total: 649.9, items: 1, hue: 30 },
  { id: "TM-2026-0736", date: "3 юли 2026", status: "processing", total: 1198, items: 2, hue: 190 },
];

const statusMap = {
  delivered: { label: "Доставена", icon: Check, cls: "bg-success/10 text-success" },
  shipped: { label: "Изпратена", icon: Truck, cls: "bg-brand/10 text-brand" },
  processing: { label: "Обработва се", icon: Clock, cls: "bg-warning/15 text-warning" },
} as const;

function ProfilePage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("overview");

  return (
    <>
      <Header />
      <main className="bg-surface/40">
        <div className="container-tm py-6 md:py-10">
          <nav className="mb-4 flex items-center gap-2 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Начало</Link>
            <span>/</span>
            <span className="text-ink">Моят профил</span>
          </nav>

          {/* Hero */}
          <div className="mb-6 overflow-hidden rounded-2xl bg-background shadow-card md:mb-8">
            <div className="relative h-24 bg-gradient-to-br from-brand to-brand-dark md:h-32" />
            <div className="relative px-5 pb-5 md:px-8 md:pb-6">
              <div className="-mt-10 flex flex-col gap-4 md:-mt-12 md:flex-row md:items-end md:justify-between">
                <div className="flex items-end gap-4">
                  <div className="grid h-20 w-20 place-items-center rounded-2xl bg-background text-ink shadow-pop ring-4 ring-background md:h-24 md:w-24">
                    <span className="font-display text-2xl font-black md:text-3xl">ИИ</span>
                  </div>
                  <div className="pb-1">
                    <h1 className="font-display text-xl font-black text-ink md:text-2xl">Иван Иванов</h1>
                    <p className="text-[12px] text-muted-foreground">ivan.ivanov@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1.5 text-[11px] font-bold text-warning">
                    <Star className="h-3 w-3 fill-current" /> Gold клиент
                  </span>
                  <button className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-[12px] font-semibold text-ink transition hover:border-brand hover:text-brand">
                    <LogOut className="h-3.5 w-3.5" /> Изход
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <aside>
              <nav className="overflow-x-auto rounded-2xl bg-background p-2 shadow-card">
                <ul className="flex gap-1 lg:flex-col">
                  {tabs.map((t) => {
                    const active = tab === t.id;
                    const Icon = t.icon;
                    return (
                      <li key={t.id} className="shrink-0 lg:shrink">
                        <button
                          onClick={() => setTab(t.id)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition ${
                            active ? "bg-brand text-white shadow-brand" : "text-ink hover:bg-surface"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                          <span className="flex-1 whitespace-nowrap">{t.label}</span>
                          {t.badge !== undefined && (
                            <span className={`hidden grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-bold lg:grid ${
                              active ? "bg-white/20 text-white" : "bg-surface text-ink"
                            }`}>
                              {t.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* Content */}
            <section className="space-y-6">
              {tab === "overview" && <Overview onGoto={setTab} />}
              {tab === "orders" && <Orders />}
              {tab === "favorites" && <Favorites />}
              {tab === "addresses" && <Addresses />}
              {tab === "payment" && <Payments />}
              {tab === "notifications" && <Notifications />}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-background p-5 shadow-card md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-black text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-background p-5 shadow-card">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-2xl font-black text-ink">{value}</div>
      {sub && <div className="mt-1 text-[12px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Overview({ onGoto }: { onGoto: (id: (typeof tabs)[number]["id"]) => void }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Поръчки" value="14" sub="Общо направени" />
        <StatCard label="Спестени" value={`${fmtEUR(482)} €`} sub="Тази година" />
        <StatCard label="Бонус точки" value="1 240" sub="≈ 12,40 лв. отстъпка" />
      </div>

      <Panel title="Последна поръчка" action={
        <button onClick={() => onGoto("orders")} className="text-[12px] font-semibold text-brand hover:underline">
          Всички →
        </button>
      }>
        <OrderRow o={orders[0]} />
      </Panel>

      <Panel title="Лични данни">
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoField label="Име" value="Иван Иванов" />
          <InfoField label="Имейл" value="ivan.ivanov@example.com" />
          <InfoField label="Телефон" value="+359 88 888 8888" />
          <InfoField label="Дата на раждане" value="15.03.1990" />
        </div>
        <button className="mt-5 inline-flex h-10 items-center rounded-full bg-ink px-5 text-[12px] font-bold text-white transition hover:bg-brand">
          Редактирай профил
        </button>
      </Panel>
    </>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-[13px] font-semibold text-ink">{value}</div>
    </div>
  );
}

function OrderRow({ o }: { o: (typeof orders)[number] }) {
  const s = statusMap[o.status as keyof typeof statusMap];
  const SIcon = s.icon;
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border p-4">
      <div
        className="h-14 w-14 shrink-0 rounded-xl"
        style={{ background: `linear-gradient(135deg, oklch(0.96 0.04 ${o.hue}), oklch(0.88 0.07 ${o.hue}))` }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-ink">#{o.id}</span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${s.cls}`}>
            <SIcon className="h-3 w-3" /> {s.label}
          </span>
        </div>
        <div className="mt-1 text-[12px] text-muted-foreground">{o.date} · {o.items} продукт{o.items > 1 ? "а" : ""}</div>
      </div>
      <div className="text-right">
        <div className="font-display text-base font-black text-ink">{fmtEUR(o.total)} €</div>
        <div className="text-[11px] text-muted-foreground">{o.total.toFixed(2)} лв.</div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </div>
  );
}

function Orders() {
  return (
    <Panel title="Моите поръчки">
      <div className="space-y-3">
        {orders.map((o) => <OrderRow key={o.id} o={o} />)}
      </div>
    </Panel>
  );
}

function Favorites() {
  const favs = [
    { name: "MacBook Air M3 13″ 8GB 256GB", price: 2199, hue: 260 },
    { name: "Dyson V15 Detect Absolute", price: 1499, hue: 340 },
    { name: "LG OLED evo C4 55″", price: 2799, hue: 200 },
    { name: "Bose QuietComfort Ultra", price: 799, hue: 50 },
  ];
  return (
    <Panel title="Любими продукти">
      <div className="grid gap-4 sm:grid-cols-2">
        {favs.map((p) => (
          <div key={p.name} className="flex items-center gap-3 rounded-xl border border-border p-3">
            <div
              className="h-16 w-16 shrink-0 rounded-lg"
              style={{ background: `linear-gradient(135deg, oklch(0.96 0.04 ${p.hue}), oklch(0.88 0.07 ${p.hue}))` }}
            />
            <div className="min-w-0 flex-1">
              <div className="line-clamp-2 text-[13px] font-semibold text-ink">{p.name}</div>
              <div className="mt-1 text-[13px] font-bold text-brand">{fmtEUR(p.price)} €</div>
            </div>
            <button className="h-8 rounded-full bg-brand px-3 text-[11px] font-bold text-white hover:bg-brand-dark">
              Купи
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Addresses() {
  const addrs = [
    { label: "Домашен", primary: true, name: "Иван Иванов", line: "ул. „Витоша“ 15, ап. 4, София 1000" },
    { label: "Офис", primary: false, name: "Иван Иванов", line: "бул. „Цариградско шосе“ 111, София 1784" },
  ];
  return (
    <Panel title="Адреси за доставка" action={
      <button className="inline-flex h-9 items-center rounded-full bg-brand px-4 text-[12px] font-bold text-white hover:bg-brand-dark">
        + Нов адрес
      </button>
    }>
      <div className="grid gap-4 sm:grid-cols-2">
        {addrs.map((a) => (
          <div key={a.label} className={`rounded-xl border p-4 ${a.primary ? "border-brand bg-brand/5" : "border-border"}`}>
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink">
                <MapPin className="h-3.5 w-3.5 text-brand" /> {a.label}
              </span>
              {a.primary && <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">Основен</span>}
            </div>
            <div className="text-[13px] font-semibold text-ink">{a.name}</div>
            <div className="text-[12px] text-muted-foreground">{a.line}</div>
            <div className="mt-3 flex gap-2">
              <button className="text-[12px] font-semibold text-brand hover:underline">Редактирай</button>
              <span className="text-muted-foreground">·</span>
              <button className="text-[12px] font-semibold text-muted-foreground hover:text-brand">Изтрий</button>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Payments() {
  return (
    <Panel title="Запазени карти" action={
      <button className="inline-flex h-9 items-center rounded-full bg-brand px-4 text-[12px] font-bold text-white hover:bg-brand-dark">
        + Добави карта
      </button>
    }>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink to-ink/80 p-5 text-white">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-brand/40 blur-2xl" />
          <div className="relative">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider opacity-80">Visa Debit</span>
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold">Основна</span>
            </div>
            <div className="font-display text-lg tracking-widest">•••• •••• •••• 4242</div>
            <div className="mt-3 flex items-center justify-between text-[11px] opacity-80">
              <span>ИВАН ИВАНОВ</span>
              <span>12/28</span>
            </div>
          </div>
        </div>
        <button className="grid place-items-center rounded-2xl border-2 border-dashed border-border p-5 text-[13px] font-semibold text-muted-foreground transition hover:border-brand hover:text-brand">
          + Добави нова карта
        </button>
      </div>
    </Panel>
  );
}

function Notifications() {
  const rows = [
    { label: "Имейл известия за поръчки", on: true },
    { label: "SMS за статус на доставка", on: true },
    { label: "Промоции и намаления", on: false },
    { label: "Newsletter (седмичен)", on: false },
  ];
  return (
    <Panel title="Известия">
      <ul className="divide-y divide-border">
        {rows.map((r) => <Toggle key={r.label} label={r.label} initial={r.on} />)}
      </ul>
    </Panel>
  );
}

function Toggle({ label, initial }: { label: string; initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <li className="flex items-center justify-between py-3.5">
      <span className="text-[13px] font-semibold text-ink">{label}</span>
      <button
        onClick={() => setOn(!on)}
        aria-pressed={on}
        className={`relative h-6 w-11 rounded-full transition ${on ? "bg-brand" : "bg-border"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </li>
  );
}
