import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryCarousel } from "@/components/CategoryCarousel";
import { Benefits } from "@/components/Benefits";
import { ProductSection } from "@/components/ProductSection";
import { BrandsStrip } from "@/components/BrandsStrip";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Techmarket.bg — Лаптопи, смартфони и техника на топ цени" },
      { name: "description", content: "Пазарувай онлайн от 45 000+ продукта. Експресна доставка, гаранция и лесни връщания." },
      { property: "og:title", content: "Techmarket.bg — Лаптопи, смартфони и техника на топ цени" },
      { property: "og:description", content: "Пазарувай онлайн от 45 000+ продукта. Експресна доставка, гаранция и лесни връщания." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <CategoryCarousel />
        <Benefits />
        <ProductSection title="Актуални предложения" products={products.slice(0, 10)} accent />
        <ProductSection title="Най-продавани" products={products.slice(10, 20)} />
        <BrandsStrip />
        <ProductSection title="Нови продукти" products={products.slice(4, 14)} />
      </main>
      <Footer />
    </>
  );
}
