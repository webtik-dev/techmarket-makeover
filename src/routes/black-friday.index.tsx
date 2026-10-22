import { createFileRoute } from "@tanstack/react-router";
import { BlackFridayPage } from "@/components/BlackFridayPage";
import { bfHead, sections } from "@/lib/black-friday";

export const Route = createFileRoute("/black-friday/")({
  head: () => bfHead(sections[0]),
  component: () => <BlackFridayPage section={sections[0]} />,
});
