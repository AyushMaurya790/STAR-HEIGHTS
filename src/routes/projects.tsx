import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Projects } from "@/components/site/Projects";
import { StatsStrip, CTABand, DEFAULT_STATS } from "@/components/site/MenuExtras";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Star Heights Constructions Co." },
      { name: "description", content: "Featured residential, commercial and apartment landmarks delivered by Star Heights across Delhi NCR." },
      { property: "og:title", content: "Projects — Star Heights" },
      { property: "og:description", content: "Landmarks we've delivered across Delhi NCR." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Featured Portfolio"
      title={<>Landmarks we've <span className="gold-gradient-text italic">delivered</span>.</>}
      intro="A selection of recent residential, commercial and apartment developments — each one engineered with the same precision and finished with the same obsession for detail."
    >
      <StatsStrip stats={DEFAULT_STATS} />
      <Projects bare />
      <CTABand
        eyebrow="Request Portfolio"
        title="See the full portfolio book — 180+ delivered projects."
        sub="A curated PDF of completed residential, commercial and industrial work, sent directly to your inbox."
        ctaLabel="Request portfolio"
      />
    </PageShell>
  );
}
