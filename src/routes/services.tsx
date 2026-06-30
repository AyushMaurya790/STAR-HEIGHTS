import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Services } from "@/components/site/Services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Construction Services — Residential, Commercial, Industrial, Renovation | Star Heights" },
      {
        name: "description",
        content:
          "Five core practices: residential villas, commercial towers, apartment developments, industrial facilities, renovation & interiors — plus live ongoing builds across Delhi NCR.",
      },
      { property: "og:title", content: "Services — Star Heights Constructions" },
      {
        property: "og:description",
        content:
          "End-to-end construction across five practices, with active project tracking and turnkey delivery.",
      },
      { property: "og:url", content: "https://star-heights-vision.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://star-heights-vision.lovable.app/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell
      eyebrow="What We Do"
      title={<>End-to-end construction, <span className="gold-gradient-text italic">elevated</span>.</>}
      intro="Five core practices, one disciplined delivery model — residential, commercial, apartment, industrial and renovation & interiors. Every Star Heights project moves through the same standard of design rigor, site supervision and finishing quality, with live ongoing builds you can track in real time."
    >
      <Services />
    </PageShell>
  );
}

