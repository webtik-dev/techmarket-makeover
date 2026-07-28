import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Мария Петрова",
    location: "София",
    rating: 5,
    text: "Изключително бърза доставка и професионално обслужване. Лаптопът пристигна на следващия ден, добре опакован. Определено ще пазарувам отново!",
    product: "Лаптоп ASUS TUF Gaming",
  },
  {
    name: "Георги Иванов",
    location: "Пловдив",
    rating: 5,
    text: "Много добри цени и голямо разнообразие от продукти. Консултантът беше изключително отзивчив и ми помогна да избера правилния монитор.",
    product: "Монитор Samsung Odyssey",
  },
  {
    name: "Николай Димитров",
    location: "Варна",
    rating: 5,
    text: "Поръчвам от Techmarket от години. Винаги оригинални продукти, коректна гаранция и безпроблемно връщане при нужда. Препоръчвам!",
    product: "Телевизор METZ QLED",
  },
  {
    name: "Стефка Колева",
    location: "Бургас",
    rating: 5,
    text: "Възползвах се от лизинга през TBI Bank — процесът беше бърз и лесен. Телефонът е точно както е описан, много съм доволна.",
    product: "Samsung Galaxy S25",
  },
];

export function Reviews() {
  return (
    <section className="container-tm py-10">
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-[28px]">
          Какво казват нашите клиенти
        </h2>
        <p className="mt-2 text-sm text-ink/60">
          Над 12 000 доволни клиенти всеки месец
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r) => (
          <article
            key={r.name}
            className="relative flex flex-col rounded-2xl bg-surface p-5 transition hover:bg-white hover:shadow-md"
          >
            <Quote className="absolute right-4 top-4 h-6 w-6 text-brand/15" aria-hidden />

            <div className="mb-3 flex items-center gap-1">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" aria-hidden />
              ))}
            </div>

            <p className="mb-4 flex-1 text-sm leading-relaxed text-ink/80">
              "{r.text}"
            </p>

            <div className="border-t border-border/60 pt-3">
              <div className="text-sm font-semibold text-ink">{r.name}</div>
              <div className="text-xs text-ink/50">{r.location}</div>
              <div className="mt-1 text-xs text-brand">{r.product}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
