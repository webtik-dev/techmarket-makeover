import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Minus, Plus, Trash2, Tag, ShieldCheck, Truck, ArrowRight, X } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Количка — Techmarket.bg" },
      { name: "description", content: "Прегледай продуктите в количката и премини към поръчка." },
      { property: "og:title", content: "Количка — Techmarket.bg" },
      { property: "og:description", content: "Прегледай продуктите в количката и премини към поръчка." },
    ],
  }),
  component: CartPage,
});

const BGN_PER_EUR = 1.95583;
const fmtEUR = (n: number) => (n / BGN_PER_EUR).toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Item = { id: number; name: string; variant: string; price: number; oldPrice?: number; qty: number; hue: number; stock: string };

const initialItems: Item[] = [
  { id: 1, name: "Apple iPhone 15 Pro 256GB", variant: "Natural Titanium", price: 2399, oldPrice: 2599, qty: 1, hue: 220, stock: "В наличност" },
  { id: 2, name: "Sony WH-1000XM5 Wireless Noise Cancelling", variant: "Черен", price: 649.9, qty: 1, hue: 30, stock: "В наличност" },
  { id: 3, name: "Samsung Galaxy Watch7 44mm LTE", variant: "Silver", price: 599, oldPrice: 699, qty: 2, hue: 190, stock: "Последни бройки" },
];

function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState<null | { code: string; pct: number }>(null);

  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const oldSubtotal = items.reduce((a, i) => a + (i.oldPrice ?? i.price) * i.qty, 0);
  const savings = oldSubtotal - subtotal;
  const discount = promoApplied ? subtotal * (promoApplied.pct / 100) : 0;
  const shipping = subtotal - discount > 100 ? 0 : 5.9;
  const total = subtotal - discount + shipping;

  const setQty = (id: number, q: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, q) } : i)));
  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <>
      <Header />
      <main className="bg-surface/40">
        <div className="container-tm py-6 md:py-10">
          <nav className="mb-4 flex items-center gap-2 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Начало</Link>
            <span>/</span>
            <span className="text-ink">Количка</span>
          </nav>

          <div className="mb-6 flex items-end justify-between md:mb-8">
            <h1 className="font-display text-2xl font-black text-ink md:text-3xl">
              Твоята количка <span className="text-muted-foreground font-medium">({items.length})</span>
            </h1>
            <Link to="/" className="hidden text-[13px] font-semibold text-brand hover:underline md:inline">
              ← Продължи пазаруването
            </Link>
          </div>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              {/* Items */}
              <section className="rounded-2xl bg-background shadow-card">
                <ul className="divide-y divide-border">
                  {items.map((it) => (
                    <li key={it.id} className="flex gap-3 p-4 md:gap-5 md:p-5">
                      <div
                        className="h-24 w-24 shrink-0 rounded-xl md:h-28 md:w-28"
                        style={{ background: `linear-gradient(135deg, oklch(0.96 0.04 ${it.hue}), oklch(0.88 0.07 ${it.hue}))` }}
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="line-clamp-2 text-[14px] font-semibold text-ink md:text-[15px]">{it.name}</h3>
                            <div className="mt-1 text-[12px] text-muted-foreground">{it.variant}</div>
                            <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-success">
                              <span className="h-1.5 w-1.5 rounded-full bg-success" /> {it.stock}
                            </div>
                          </div>
                          <button
                            onClick={() => remove(it.id)}
                            aria-label="Премахни"
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-surface hover:text-brand"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-end justify-between gap-3">
                          <div className="inline-flex items-center rounded-full border border-border bg-background">
                            <button
                              onClick={() => setQty(it.id, it.qty - 1)}
                              aria-label="Намали"
                              className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:text-brand"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-[13px] font-bold">{it.qty}</span>
                            <button
                              onClick={() => setQty(it.id, it.qty + 1)}
                              aria-label="Увеличи"
                              className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:text-brand"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="text-right">
                            {it.oldPrice && (
                              <div className="text-[11px] text-muted-foreground line-through">
                                {fmtEUR(it.oldPrice * it.qty)} €
                              </div>
                            )}
                            <div className="font-display text-lg font-black text-ink md:text-xl">
                              {fmtEUR(it.price * it.qty)} €
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {(it.price * it.qty).toFixed(2)} лв.
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Summary */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="overflow-hidden rounded-2xl bg-background shadow-pop">
                  <div className="border-b border-border p-5">
                    <h2 className="font-display text-lg font-black text-ink">Обобщение</h2>
                  </div>

                  <div className="space-y-3 p-5 text-[13px]">
                    <Row label="Междинна сума" value={`${fmtEUR(subtotal)} €`} />
                    {savings > 0 && (
                      <Row label="Твоята отстъпка" value={`− ${fmtEUR(savings)} €`} accent />
                    )}
                    {promoApplied && (
                      <Row label={`Промо (${promoApplied.code})`} value={`− ${fmtEUR(discount)} €`} accent />
                    )}
                    <Row
                      label="Доставка"
                      value={shipping === 0 ? "Безплатна" : `${fmtEUR(shipping)} €`}
                    />
                  </div>

                  {/* Promo */}
                  <div className="border-t border-border p-5">
                    {promoApplied ? (
                      <div className="flex items-center justify-between rounded-lg bg-success/10 px-3 py-2 text-[12px] font-semibold text-success">
                        <span className="inline-flex items-center gap-2">
                          <Tag className="h-3.5 w-3.5" /> {promoApplied.code} приложен
                        </span>
                        <button onClick={() => setPromoApplied(null)} aria-label="Премахни промо">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (promo.trim()) setPromoApplied({ code: promo.trim().toUpperCase(), pct: 10 });
                        }}
                        className="flex items-center gap-2"
                      >
                        <div className="relative flex-1">
                          <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                          <input
                            value={promo}
                            onChange={(e) => setPromo(e.target.value)}
                            placeholder="Промо код"
                            className="h-10 w-full rounded-full bg-surface pl-9 pr-3 text-[13px] text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/30"
                          />
                        </div>
                        <button className="h-10 rounded-full border border-border px-4 text-[12px] font-bold text-ink transition hover:border-brand hover:text-brand">
                          Приложи
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Total */}
                  <div className="space-y-4 border-t border-border bg-surface/50 p-5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[13px] font-semibold text-ink">Общо</span>
                      <div className="text-right">
                        <div className="font-display text-2xl font-black text-ink">{fmtEUR(total)} €</div>
                        <div className="text-[11px] text-muted-foreground">{total.toFixed(2)} лв. с ДДС</div>
                      </div>
                    </div>

                    <Link
                      to="/checkout"
                      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-[14px] font-bold text-white shadow-brand transition hover:bg-brand-dark"
                    >
                      Продължи към поръчка
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Доставка 24ч.</span>
                      <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Гаранция 2 г.</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-semibold ${accent ? "text-brand" : "text-ink"}`}>{value}</span>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="rounded-2xl bg-background p-16 text-center shadow-card">
      <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-surface">
        <Trash2 className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="font-display text-xl font-black text-ink">Количката е празна</h2>
      <p className="mt-2 text-[13px] text-muted-foreground">Открий любимите си продукти и започни да пазаруваш.</p>
      <Link to="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-[13px] font-bold text-white hover:bg-brand-dark">
        Разгледай продукти
      </Link>
    </div>
  );
}
