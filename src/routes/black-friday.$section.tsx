import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlackFridayPage } from "@/components/BlackFridayPage";
import { bfHead, categorySections } from "@/lib/black-friday";

export const Route = createFileRoute("/black-friday/$section")({
  loader: ({ params }) => {
    const section = categorySections.find((s) => s.slug === params.section);
    if (!section) throw notFound();
    return { section };
  },
  head: ({ loaderData }) =>
    loaderData ? bfHead(loaderData.section) : { meta: [{ title: "Страницата не е намерена | Techmarket" }, { name: "robots", content: "noindex" }] },
  component: SectionPage,
});

function SectionPage() {
  const { section } = Route.useLoaderData();
  return <BlackFridayPage section={section} />;
}
