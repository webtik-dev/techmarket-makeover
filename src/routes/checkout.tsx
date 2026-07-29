import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, MapPin, Truck, CreditCard, Package, Wallet, Building2, Lock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Поръчка — Techmarket.bg" },
      { name: "description", content: "Завърши поръчката си бързо и сигурно." },
      { property: "og:title", content: "Поръчка — Techmarket.bg" },
      { property: "og:description", content: "Завърши поръчката си бързо и сигурно." },
    ],
  }),
  component: CheckoutPage,
});

const BGN_PER_EUR = 1.95583;
const fmtEUR = (n: number) => (n / BGN_PER_EUR).toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const items = [
  { id: 1, name: "Apple iPhone 15 Pro 256GB Natural Titanium", price: 2399, qty: 1, hue: 220 },
  { id: 2, name: "Sony WH-1000XM5 Wireless", price: 649.9, qty: 1, hue: 30 },
  { id: 3, name: "Samsung Galaxy Watch7 44mm LTE", price: 599, qty: 2, hue: 190 },
];

const steps = ["Контакт", "Доставка", "Плащане"] as const;

function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState("courier");
  const [payment, setPayment] = useState("card");

  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const shippingCost = shipping === "office" ? 3.5 : shipping === "pickup" ? 0 : 5.9;
  const total = subtotal + shippingCost;

  return (
    <>
      <Header />
      <main className="bg-surface/40">
        <div className="container-tm py-6 md:py-10">
          <nav className="mb-4 flex items-center gap-2 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Начало</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-brand">Количка</Link>
            <span>/</span>
            <span className="text-ink">Поръчка</span>
          </nav>

          <h1 className="mb-6 font-display text-2xl font-black text-ink md:mb-8 md:text-3xl">Завърши поръчката</h1>

          {/* Stepper */}
          <ol className="mb-8 flex items-center gap-2 md:gap-4">
            {steps.map((label, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li key={label} className="flex flex-1 items-center gap-2 md:gap-3">
                  <button
                    type="button"
                    onClick={() => i <= step && setStep(i)}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-bold transition md:h-9 md:w-9 ${
                      done
                        ? "bg-success text-white"
                        : active
                        ? "bg-brand text-white shadow-brand"
                        : "bg-surface text-muted-foreground"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : i + 1}
                  </button>
                  <span className={`hidden text-[13px] font-semibold sm:inline ${active ? "text-ink" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                  {i < steps.length - 1 && (
                    <span className={`h-px flex-1 ${done ? "bg-success" : "bg-border"}`} />
                  )}
                </li>
              );
            })}
          </ol>

          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <section className="space-y-4">
              {step === 0 && <ContactStep />}
              {step === 1 && <ShippingStep value={shipping} onChange={setShipping} />}
              {step === 2 && <PaymentStep value={payment} onChange={setPayment} />}

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="h-11 rounded-full border border-border px-5 text-[13px] font-bold text-ink transition hover:border-brand hover:text-brand disabled:opacity-40"
                >
                  Назад
                </button>
                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="h-11 rounded-full bg-brand px-6 text-[13px] font-bold text-white shadow-brand transition hover:bg-brand-dark"
                  >
                    Продължи
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-[13px] font-bold text-white shadow-brand transition hover:bg-brand-dark"
                  >
                    <Lock className="h-4 w-4" /> Плати {fmtEUR(total)} €
                  </button>
                )}
              </div>
            </section>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-2xl bg-background shadow-pop">
                <div className="border-b border-border p-5">
                  <h2 className="font-display text-lg font-black text-ink">Твоята поръчка</h2>
                </div>
                <ul className="max-h-[260px] divide-y divide-border overflow-y-auto">
                  {items.map((it) => (
                    <li key={it.id} className="flex items-start gap-3 p-4">
                      <div
                        className="relative h-14 w-14 shrink-0 rounded-lg"
                        style={{ background: `linear-gradient(135deg, oklch(0.96 0.04 ${it.hue}), oklch(0.88 0.07 ${it.hue}))` }}
                      >
                        <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1.5 text-[10px] font-bold text-white">
                          {it.qty}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="line-clamp-2 text-[12px] font-medium text-ink">{it.name}</div>
                        <div className="mt-1 text-[13px] font-bold text-ink">{fmtEUR(it.price * it.qty)} €</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 border-t border-border p-5 text-[13px]">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Междинна сума</span><span className="font-semibold text-ink">{fmtEUR(subtotal)} €</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Доставка</span>
                    <span className="font-semibold text-ink">{shippingCost === 0 ? "Безплатна" : `${fmtEUR(shippingCost)} €`}</span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between border-t border-border bg-surface/50 p-5">
                  <span className="text-[13px] font-semibold text-ink">Общо</span>
                  <div className="text-right">
                    <div className="font-display text-2xl font-black text-ink">{fmtEUR(total)} €</div>
                    <div className="text-[11px] text-muted-foreground">{total.toFixed(2)} лв. с ДДС</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-border px-5 py-3 text-[11px] text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" /> Сигурно плащане с SSL криптиране
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Card({ title, icon: Icon, children }: { title: string; icon: typeof Check; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-background p-5 shadow-card md:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-brand">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="font-display text-lg font-black text-ink">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold text-ink-soft">{label}</span>
      <input
        {...rest}
        className="h-11 w-full rounded-xl bg-surface px-4 text-[13px] text-ink placeholder:text-muted-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </label>
  );
}

function ContactStep() {
  return (
    <Card title="Контактна информация" icon={MapPin}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Име" placeholder="Иван" />
        <Field label="Фамилия" placeholder="Иванов" />
        <Field label="Имейл" type="email" placeholder="ivan@example.com" />
        <Field label="Телефон" placeholder="+359 88 888 8888" />
        <div className="sm:col-span-2"><Field label="Град" placeholder="София" /></div>
        <div className="sm:col-span-2"><Field label="Адрес" placeholder="ул. „Витоша" 15, ап. 4" /></div>
      </div>
    </Card>
  );
}

function ShippingStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const opts = [
    { id: "courier", icon: Truck, label: "Куриер до адрес", note: "1–2 работни дни", price: "5,90 лв." },
    { id: "office", icon: Package, label: "До офис на куриер", note: "1–2 работни дни", price: "3,50 лв." },
    { id: "pickup", icon: Building2, label: "Вземи от магазин", note: "Готово за 2 часа", price: "Безплатно" },
  ];
  return (
    <Card title="Доставка" icon={Truck}>
      <div className="space-y-3">
        {opts.map((o) => (
          <RadioRow key={o.id} checked={value === o.id} onSelect={() => onChange(o.id)} icon={o.icon} label={o.label} note={o.note} right={o.price} />
        ))}
      </div>
    </Card>
  );
}

function PaymentStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const opts = [
    { id: "card", icon: CreditCard, label: "Кредитна / дебитна карта", note: "Visa, Mastercard, Maestro" },
    { id: "cod", icon: Wallet, label: "Наложен платеж", note: "Плащане при доставка" },
    { id: "bank", icon: Building2, label: "Банков превод", note: "Плащане по IBAN" },
  ];
  return (
    <Card title="Начин на плащане" icon={CreditCard}>
      <div className="space-y-3">
        {opts.map((o) => (
          <RadioRow key={o.id} checked={value === o.id} onSelect={() => onChange(o.id)} icon={o.icon} label={o.label} note={o.note} />
        ))}
      </div>

      {value === "card" && (
        <div className="mt-5 grid gap-4 rounded-xl border border-dashed border-border p-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><Field label="Номер на карта" placeholder="1234 5678 9012 3456" /></div>
          <Field label="Валидна до" placeholder="MM/YY" />
          <Field label="CVC" placeholder="123" />
        </div>
      )}
    </Card>
  );
}

function RadioRow({
  checked,
  onSelect,
  icon: Icon,
  label,
  note,
  right,
}: {
  checked: boolean;
  onSelect: () => void;
  icon: typeof Check;
  label: string;
  note: string;
  right?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
        checked ? "border-brand bg-brand/5" : "border-border hover:border-ink/30"
      }`}
    >
      <span className={`grid h-10 w-10 place-items-center rounded-full ${checked ? "bg-brand text-white" : "bg-surface text-ink"}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-bold text-ink">{label}</span>
        <span className="block text-[12px] text-muted-foreground">{note}</span>
      </span>
      {right && <span className="text-[12px] font-bold text-ink">{right}</span>}
      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${checked ? "border-brand bg-brand" : "border-border"}`}>
        {checked && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </button>
  );
}
