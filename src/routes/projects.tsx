import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Projects } from "@/components/site/Projects";
import { LiveOngoing } from "@/components/site/LiveOngoing";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Live Ongoing Builds — Star Heights Constructions" },
      {
        name: "description",
        content:
          "Explore Star Heights' delivered landmarks and live ongoing construction projects across Delhi NCR — residential, commercial, apartment developments with real timelines and progress.",
      },
      { property: "og:title", content: "Projects & Live Ongoing — Star Heights" },
      {
        property: "og:description",
        content:
          "Featured portfolio plus active construction sites across Delhi NCR, with stage and timeline tracking.",
      },
      { property: "og:url", content: "https://star-heights-vision.lovable.app/projects" },
    ],
    links: [{ rel: "canonical", href: "https://star-heights-vision.lovable.app/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Featured Portfolio & Live Sites"
      title={
        <>
          Landmarks we've <span className="gold-gradient-text italic">delivered</span> — and the ones rising now.
        </>
      }
      intro="A selection of recent residential, commercial and apartment developments — paired with live ongoing builds across Delhi NCR, each engineered with the same precision and finished with the same obsession for detail."
    >
      <Projects />
      <LiveOngoing />
    </PageShell>
  );
}
