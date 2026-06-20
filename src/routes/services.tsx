import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Services } from "@/components/site/Services";
import { StatsStrip, ProcessBand, CTABand, DEFAULT_STATS } from "@/components/site/MenuExtras";

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
      intro="Five core practices, one disciplined delivery model. Every Star Heights project moves through the same standard of design rigor, site supervision and finishing quality."
    >
      <StatsStrip stats={DEFAULT_STATS} />
      <Services bare />
      <ProcessBand
        title="A disciplined four-stage delivery — from first sketch to final handover."
        steps={[
          { n: "01", t: "Discovery", d: "Brief, site survey and feasibility report with a transparent cost band." },
          { n: "02", t: "Design", d: "Architectural drawings, MEP coordination and material sampling locked before mobilization." },
          { n: "03", t: "Build", d: "Daily site supervision, milestone tracking and weekly client reporting." },
          { n: "04", t: "Handover", d: "Snag-free finish, warranty pack and a dedicated post-handover concierge." },
        ]}
      />
      <CTABand
        title="Ready to scope your next project?"
        sub="Share your brief. Our advisory team will respond with a feasibility note within one business day."
      />
    </PageShell>
  );
}
