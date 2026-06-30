import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Blog } from "@/components/site/Blog";
import { Reels } from "@/components/site/Reels";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Star Heights Constructions — Premium Builders Delhi NCR Since 1991" },
      {
        name: "description",
        content:
          "Star Heights Constructions Co. — premium residential, commercial, apartment, industrial and renovation builders across Delhi NCR since 1991. Turnkey delivery, 10-year warranty, live ongoing projects.",
      },
      { property: "og:title", content: "Star Heights Constructions Co. — Building Landmarks Since 1991" },
      {
        property: "og:description",
        content:
          "35+ years of premium construction across Delhi NCR. Explore our services, live ongoing projects and consult our team.",
      },
      { property: "og:url", content: "https://star-heights-vision.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://star-heights-vision.lovable.app/" }],
  }),

  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyUs />
      <Testimonials />
      <Blog />
      <Reels />
      <Contact />
      <Footer />
    </main>
  );
}
