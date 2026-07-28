const brands = ["ASUS", "Lenovo", "Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Xiaomi", "Bosch", "Philips", "Acer"];

export function BrandsStrip() {
  return (
    <section className="container-tm py-12">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-xl font-black text-ink md:text-2xl">Водещи марки</h2>
        <a href="#" className="text-sm font-semibold text-ink-soft hover:text-brand">Всички марки</a>
      </div>
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
        {brands.map((b) => (
          <a
            key={b}
            href="#"
            className="grid h-16 place-items-center bg-background font-display text-sm font-bold tracking-wide text-ink/50 transition hover:bg-surface hover:text-ink"
          >
            {b}
          </a>
        ))}
      </div>
    </section>
  );
}
