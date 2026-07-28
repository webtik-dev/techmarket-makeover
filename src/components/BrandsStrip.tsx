const brands = ["ASUS", "Lenovo", "Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Xiaomi", "Bosch", "Philips", "Acer"];

export function BrandsStrip() {
  return (
    <section className="container-tm py-12">
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-ink md:text-4xl">
          Водещи марки
        </h2>
        <span className="mt-3 h-1 w-16 rounded-full bg-brand" />
      </div>
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
        {brands.map((b) => (
          <a
            key={b}
            href="#"
            className="grid h-16 place-items-center bg-background font-display text-sm font-bold tracking-wide text-ink/50 transition hover:bg-surface hover:text-brand"
          >
            {b}
          </a>
        ))}
      </div>
    </section>
  );
}
