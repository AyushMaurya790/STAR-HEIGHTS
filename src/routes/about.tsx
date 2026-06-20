import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { About } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { StatsStrip, CTABand, DEFAULT_STATS } from "@/components/site/MenuExtras";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Star Heights Constructions Co." },
      { name: "description", content: "Since 2002, Star Heights has shaped the architectural identity of Delhi NCR with precision, transparency and craftsmanship." },
      { property: "og:title", content: "About Star Heights Constructions Co." },
      { property: "og:description", content: "Two decades of building landmarks across Delhi NCR." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="About the Company"
      title={<>A legacy of <span className="gold-gradient-text italic">precision</span>, built one structure at a time.</>}
      intro="Founded in 2002, Star Heights Constructions Company has spent over two decades shaping the architectural identity of Delhi NCR — bringing an uncompromising standard of quality, transparency and craftsmanship to every project."
    >
      <StatsStrip stats={DEFAULT_STATS} />
      <About noHeader />
      <WhyUs bare />
      <CTABand
        title="Partner with a studio that's delivered for two decades."
        sub="From first sketch to final handover — discover how Star Heights can shape your next landmark."
      />
    </PageShell>
  );
}
