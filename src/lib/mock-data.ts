import {
  Laptop, Smartphone, Tv, Headphones, Camera, Gamepad2, Refrigerator,
  WashingMachine, Home, Wrench, Watch, Speaker, Monitor, Tablet, Printer, Coffee,
} from "lucide-react";

export type Category = {
  slug: string;
  name: string;
  icon: typeof Laptop;
  count: number;
  tone: string; // tailwind bg class
};

export const categories: Category[] = [
  { slug: "laptopi", name: "Лаптопи", icon: Laptop, count: 842, tone: "bg-[oklch(0.95_0.04_27)]" },
  { slug: "smartfoni", name: "Смартфони", icon: Smartphone, count: 1245, tone: "bg-[oklch(0.95_0.04_240)]" },
  { slug: "televizori", name: "Телевизори", icon: Tv, count: 312, tone: "bg-[oklch(0.95_0.04_180)]" },
  { slug: "audio", name: "Аудио & Слушалки", icon: Headphones, count: 987, tone: "bg-[oklch(0.95_0.04_60)]" },
  { slug: "foto", name: "Фото & Видео", icon: Camera, count: 421, tone: "bg-[oklch(0.95_0.04_300)]" },
  { slug: "gaming", name: "Гейминг", icon: Gamepad2, count: 673, tone: "bg-[oklch(0.95_0.04_140)]" },
  { slug: "hladilnici", name: "Хладилници", icon: Refrigerator, count: 189, tone: "bg-[oklch(0.95_0.04_210)]" },
  { slug: "peralni", name: "Перални", icon: WashingMachine, count: 156, tone: "bg-[oklch(0.95_0.04_100)]" },
  { slug: "za-doma", name: "За дома", icon: Home, count: 1420, tone: "bg-[oklch(0.95_0.04_40)]" },
  { slug: "instrumenti", name: "Инструменти", icon: Wrench, count: 512, tone: "bg-[oklch(0.95_0.04_20)]" },
  { slug: "smart-watches", name: "Smart часовници", icon: Watch, count: 234, tone: "bg-[oklch(0.95_0.04_320)]" },
  { slug: "kolonki", name: "Тонколони", icon: Speaker, count: 178, tone: "bg-[oklch(0.95_0.04_260)]" },
  { slug: "monitori", name: "Монитори", icon: Monitor, count: 298, tone: "bg-[oklch(0.95_0.04_190)]" },
  { slug: "tableti", name: "Таблети", icon: Tablet, count: 145, tone: "bg-[oklch(0.95_0.04_280)]" },
  { slug: "printeri", name: "Принтери", icon: Printer, count: 87, tone: "bg-[oklch(0.95_0.04_10)]" },
  { slug: "kafemashini", name: "Кафемашини", icon: Coffee, count: 203, tone: "bg-[oklch(0.95_0.04_50)]" },
];

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: string;
  specs: string[];
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  stock: "in" | "low" | "order" | "out";
  badges: ("promo" | "new" | "top" | "free-shipping" | "unpacked")[];
  hue: number;
};

const brands = ["ASUS", "Lenovo", "Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Xiaomi", "Bosch"];
const models = [
  "VivoBook 15 X1504",
  "ThinkPad E14 Gen 5",
  "MacBook Air 13 M3",
  "Galaxy S24 Ultra 256GB",
  "WH-1000XM5 Wireless",
  "OLED C4 55\" 4K",
  "XPS 13 Plus",
  "Pavilion 15 Ryzen 7",
  "Redmi Note 13 Pro",
  "SMS4HCI01E",
  "ROG Strix G16",
  "iPhone 15 Pro 128GB",
  "Bravia X90L 65\"",
  "Buds3 Pro ANC",
  "NanoCell 50\" 4K",
];

function seededRand(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const products: Product[] = Array.from({ length: 24 }, (_, i) => {
  const r = seededRand(i + 1);
  const oldPrice = Math.round((500 + r * 3500) / 10) * 10 + 0.99;
  const discount = 0.05 + seededRand(i + 100) * 0.35;
  const price = Math.round((oldPrice * (1 - discount)) / 10) * 10 + 0.99;
  const stockRoll = seededRand(i + 200);
  const stock: Product["stock"] =
    stockRoll > 0.85 ? "out" : stockRoll > 0.7 ? "low" : stockRoll > 0.55 ? "order" : "in";
  const badges: Product["badges"] = [];
  if (discount > 0.15) badges.push("promo");
  if (seededRand(i + 300) > 0.75) badges.push("new");
  if (seededRand(i + 400) > 0.8) badges.push("top");
  if (price > 800) badges.push("free-shipping");
  if (seededRand(i + 500) > 0.9) badges.push("unpacked");

  return {
    id: `p-${i + 1}`,
    slug: `product-${i + 1}`,
    brand: brands[i % brands.length],
    name: models[i % models.length],
    category: categories[i % categories.length].slug,
    specs: [
      "Intel Core i7-1355U",
      "16GB DDR4 · 512GB SSD",
      '15.6" FHD IPS 144Hz',
    ],
    rating: 3.5 + seededRand(i + 600) * 1.5,
    reviews: Math.floor(seededRand(i + 700) * 480) + 5,
    price,
    oldPrice: discount > 0.05 ? oldPrice : undefined,
    stock,
    badges,
    hue: Math.floor(seededRand(i + 800) * 360),
  };
});

export function productsByCategory(slug: string) {
  return products.filter((_, i) => i % 2 === 0 || products[i].category === slug).slice(0, 12);
}
