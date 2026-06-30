import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { About } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Star Heights — 35+ Years of Construction Excellence in Delhi NCR" },
      {
        name: "description",
        content:
          "Founded in 1991 by Mr. Amjad Khan and Mr. Afsar Khan, Star Heights has delivered premium residential, commercial, institutional and hospitality projects across Delhi NCR for over 35 years.",
      },
      { property: "og:title", content: "About Star Heights — Building Trust Since 1991" },
      {
        property: "og:description",
        content:
          "35+ year construction legacy across Delhi NCR. Architects, civil engineers and project managers under one roof.",
      },
      { property: "og:url", content: "https://star-heights-vision.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://star-heights-vision.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="About the Company"
      title={<>A legacy of <span className="gold-gradient-text italic">precision</span>, built one structure at a time.</>}
      intro="Founded in 1991 by Mr. Amjad Khan and Mr. Afsar Khan, Star Heights Constructions Company has spent 35+ years shaping the architectural identity of Delhi NCR — bringing an uncompromising standard of quality, transparency and craftsmanship to every project."
    >
      <About noHeader />
      <WhyUs />
    </PageShell>
  );
}

