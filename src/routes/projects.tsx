import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
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
    <>
      <Header />
      <LiveOngoing />
      <Footer />
    </>
  );
}
