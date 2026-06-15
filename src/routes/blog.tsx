import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Blog } from "@/components/site/Blog";
import { Reels } from "@/components/site/Reels";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Insights from the Field | Star Heights" },
      { name: "description", content: "Industry insights, design notes and sustainability stories from the Star Heights construction team." },
      { property: "og:title", content: "Star Heights Journal" },
      { property: "og:description", content: "Insights from the field — real estate, design and engineering." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <PageShell
      eyebrow="Journal"
      title={<>Insights from the <span className="gold-gradient-text italic">field</span>.</>}
      intro="Market outlooks, architectural deep-dives and sustainability notes — written by the team behind the builds."
    >
      <Blog showAll />
      <Reels />
    </PageShell>
  );
}
