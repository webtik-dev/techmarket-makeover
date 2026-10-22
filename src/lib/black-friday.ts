import type { Product } from "@/lib/mock-data";

export type BFSection = {
  slug: string; // "" = hub page
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  subcats: string[];
  brands: string[];
  seo: { h2: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const SITE = "https://techmarket-makeover.lovable.app";

/** Campaign end — countdown is only shown when a real deadline is set. */
export const CAMPAIGN_END: string | null = "2026-11-30T23:59:59+02:00";

const commonFaq = [
  { q: "Кога започва Black Friday 2026 в Techmarket?", a: "Кампанията стартира в началото на ноември и продължава през целия месец като Black Month. Точните дати са посочени в банера в горната част на страницата." },
  { q: "Как се изчислява намалението?", a: "Процентът се изчислява спрямо най-ниската цена на продукта през последните 30 дни преди промоцията, съгласно Закона за защита на потребителите." },
  { q: "Мога ли да купя на лизинг?", a: "Да — повечето продукти над 150 € са достъпни на изплащане чрез TBI Bank с онлайн одобрение." },
  { q: "Мога ли да върна продукт, купен на Black Friday?", a: "Да, имате 14 дни право на връщане, както при всяка друга покупка." },
];

export const sections: BFSection[] = [
  {
    slug: "", name: "Всички оферти",
    title: "Black Friday 2026 – Големи намаления | Techmarket",
    description: "Black Friday 2026 в Techmarket.bg: намаления до −50% на техника, машини и инструменти, фитнес уреди и спортни стоки. Експресна доставка и лизинг.",
    h1: "Black Friday 2026",
    intro: "Най-големите намаления на годината — техника, инструменти, фитнес и спорт на едно място.",
    subcats: ["Лаптопи", "Телевизори", "Акумулаторни инструменти", "Бягащи пътеки", "Велосипеди"],
    brands: ["Bosch", "Makita", "Samsung", "LG", "Lenovo", "Kettler", "Xiaomi"],
    seo: [
      { h2: "Black Friday в Techmarket.bg", text: "Всяка година през ноември подбираме хиляди продукти с реални намаления. Цените, които виждате, са проверени спрямо най-ниската цена за последните 30 дни, така че отстъпката е истинска." },
      { h2: "Как да изберете най-добрата оферта", text: "Използвайте филтрите по марка, подкатегория, цена и размер на отстъпката. Сортирайте по „Най-голямо намаление“, за да видите най-изгодните предложения първи." },
    ],
    faq: commonFaq,
  },
  {
    slug: "mashini-instrumenti", name: "Машини и инструменти",
    title: "Black Friday Машини и инструменти | Techmarket",
    description: "Black Friday оферти за акумулаторни и електрически инструменти, градинска техника и машини от Bosch, Makita, DeWalt и Einhell.",
    h1: "Black Friday Машини и инструменти",
    intro: "Професионални и хоби инструменти с намаления за сезона.",
    subcats: ["Акумулаторни инструменти", "Бормашини", "Ъглошлайфи", "Компресори", "Градинска техника"],
    brands: ["Bosch", "Makita", "DeWalt", "Einhell", "Metabo"],
    seo: [{ h2: "Инструменти на Black Friday цени", text: "Акумулаторните системи са сред най-търсените продукти през ноември. Изберете комплект с батерия и зарядно, за да спестите повече." }],
    faq: [{ q: "Включени ли са батерии в комплектите?", a: "В описанието на всеки продукт е посочено дали е „соло“ или комплект с батерия и зарядно." }, ...commonFaq.slice(1)],
  },
  {
    slug: "tehnika", name: "Техника",
    title: "Black Friday Техника и електроника | Techmarket",
    description: "Black Friday намаления на лаптопи, смартфони, телевизори и аудио техника от Apple, Samsung, Lenovo, LG и Sony.",
    h1: "Black Friday Техника и електроника",
    intro: "Лаптопи, смартфони, телевизори и аудио с реални отстъпки.",
    subcats: ["Лаптопи", "Смартфони", "Телевизори", "Слушалки", "Монитори"],
    brands: ["Apple", "Samsung", "Lenovo", "LG", "Sony", "ASUS"],
    seo: [{ h2: "Електроника на Black Friday", text: "Телевизорите и лаптопите традиционно имат най-големи намаления. Сравнете модели с бутона „Сравни“ преди покупка." }],
    faq: commonFaq,
  },
  {
    slug: "fitnes-uredi", name: "Фитнес уреди",
    title: "Black Friday Фитнес уреди | Techmarket",
    description: "Black Friday оферти за бягащи пътеки, велоергометри, гребни машини и тежести за домашен фитнес.",
    h1: "Black Friday Фитнес уреди",
    intro: "Домашен фитнес с намаления — пътеки, велоергометри и още.",
    subcats: ["Бягащи пътеки", "Велоергометри", "Гребни машини", "Тежести и дъмбели", "Пейки"],
    brands: ["Kettler", "inSPORTline", "Spokey", "Xiaomi"],
    seo: [{ h2: "Фитнес у дома", text: "Ноември е идеалното време да оборудвате домашния си фитнес преди зимата. Обърнете внимание на максималното тегло на потребителя." }],
    faq: commonFaq,
  },
  {
    slug: "sportni-stoki", name: "Спортни стоки",
    title: "Black Friday Спортни стоки | Techmarket",
    description: "Black Friday намаления на велосипеди, тротинетки, къмпинг и зимни спортни стоки.",
    h1: "Black Friday Спортни стоки",
    intro: "Велосипеди, тротинетки и екипировка за активен сезон.",
    subcats: ["Велосипеди", "Тротинетки", "Къмпинг", "Зимни спортове", "Топки"],
    brands: ["Xiaomi", "Spokey", "Head", "Nils"],
    seo: [{ h2: "Спорт на Black Friday", text: "Електрическите тротинетки и велосипедите са сред топ продуктите на кампанията. Проверете наличността преди поръчка." }],
    faq: commonFaq,
  },
];

export const categorySections = sections.filter((s) => s.slug);

export type BFProduct = Product & { section: string; subcat: string; popularity: number };

function rnd(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const names: Record<string, string[]> = {
  "mashini-instrumenti": ["Акумулаторен винтоверт 18V", "Ъглошлайф 125mm 1100W", "Компресор 50L", "Перфоратор SDS-plus", "Тример за трева"],
  tehnika: ["Лаптоп 15.6\" Ryzen 7", "Смартфон 256GB", "OLED TV 55\" 4K", "Безжични слушалки ANC", "Монитор 27\" QHD"],
  "fitnes-uredi": ["Бягаща пътека 2.5HP", "Велоергометър магнитен", "Гребна машина", "Регулируеми дъмбели 24kg", "Регулируема пейка"],
  "sportni-stoki": ["Планински велосипед 29\"", "Електрическа тротинетка", "Палатка 4-местна", "Ски обувки", "Футболна топка"],
};

export const bfProducts: BFProduct[] = categorySections.flatMap((s, si) =>
  Array.from({ length: 12 }, (_, i) => {
    const seed = si * 100 + i + 1;
    const oldPrice = Math.round(80 + rnd(seed) * 1500) + 0.99;
    const disc = 0.1 + rnd(seed + 7) * 0.4;
    const price = Math.round(oldPrice * (1 - disc)) + 0.99;
    const st = rnd(seed + 13);
    const stock: Product["stock"] = st > 0.8 ? "low" : "in";
    const subIdx = i % s.subcats.length;
    return {
      id: `bf-${s.slug}-${i}`,
      slug: `product-${(seed % 24) + 1}`,
      brand: s.brands[i % s.brands.length],
      name: `${s.brands[i % s.brands.length]} ${names[s.slug][subIdx]}`,
      category: s.slug,
      specs: [],
      rating: 4 + rnd(seed + 3),
      reviews: Math.floor(rnd(seed + 4) * 300) + 3,
      price,
      oldPrice,
      stock,
      badges: ["promo", ...(price > 400 ? (["free-shipping"] as const) : [])],
      hue: Math.floor(rnd(seed + 5) * 360),
      section: s.slug,
      subcat: s.subcats[subIdx],
      popularity: rnd(seed + 9),
    } satisfies BFProduct;
  }),
);

export const discountOf = (p: Product) =>
  p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

export type SortKey = "popular" | "price-asc" | "price-desc" | "discount";

export function sortProducts(list: BFProduct[], key: SortKey) {
  const a = [...list];
  if (key === "price-asc") a.sort((x, y) => x.price - y.price);
  else if (key === "price-desc") a.sort((x, y) => y.price - x.price);
  else if (key === "discount") a.sort((x, y) => discountOf(y) - discountOf(x));
  else a.sort((x, y) => y.popularity - x.popularity);
  return a;
}

export function bfHead(section: BFSection) {
  const url = `${SITE}/black-friday/${section.slug ? section.slug + "/" : ""}`;
  const crumbs = [
    { name: "Начало", url: `${SITE}/` },
    { name: "Black Friday", url: `${SITE}/black-friday/` },
    ...(section.slug ? [{ name: section.name, url }] : []),
  ];
  return {
    meta: [
      { title: section.title },
      { name: "description", content: section.description },
      { property: "og:title", content: section.title },
      { property: "og:description", content: section.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
      }),
    }],
  };
}
