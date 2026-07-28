const brands = ["ASUS", "Lenovo", "Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Xiaomi", "Bosch", "Philips", "Acer"];

export function BrandsStrip() {
  return (
    <section className="container-tm py-10">
      <h2 className="mb-6 text-center font-display text-2xl font-black text-ink">Водещи марки</h2>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6 lg:grid-cols-12">
        {brands.map((b) => (
          <a
            key={b}
            href="#"
            className="grid h-16 place-items-center rounded-xl border border-border bg-card font-display text-lg font-black text-ink/60 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand"
          >
            {b}
          </a>
        ))}
      </div>
    </section>
  );
}
