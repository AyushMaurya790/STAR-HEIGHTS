import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Blog } from "@/components/site/Blog";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Star Heights Constructions Co. — Premium Builders Delhi NCR" },
      {
        name: "description",
        content:
          "Star Heights Constructions Co. — premier residential, commercial and apartment developers in Delhi NCR since 2002. Precision-built, on-time, turnkey.",
      },
      { property: "og:title", content: "Star Heights Constructions Co." },
      { property: "og:description", content: "Premium construction & development across Delhi NCR since 2002." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-charcoal-deep text-foreground">
      <Header />
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyUs />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
