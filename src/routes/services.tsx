import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Services } from "@/components/site/Services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Star Heights Constructions Co." },
      { name: "description", content: "Residential, commercial and apartment development services across Delhi NCR — turnkey, on-time, premium." },
      { property: "og:title", content: "Services — Star Heights" },
      { property: "og:description", content: "End-to-end construction services, elevated." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell
      eyebrow="What We Do"
      title={<>End-to-end construction, <span className="gold-gradient-text italic">elevated</span>.</>}
      intro="Three core practices, one disciplined delivery model. Every Star Heights project moves through the same standard of design rigor, site supervision and finishing quality."
    >
      <Services />
    </PageShell>
  );
}
