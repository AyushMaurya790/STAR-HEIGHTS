import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Contact } from "@/components/site/Contact";
import { StatsStrip, DEFAULT_STATS } from "@/components/site/MenuExtras";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Star Heights Constructions Co." },
      { name: "description", content: "Schedule a consultation with the Star Heights project advisory team. We respond to every enquiry within one business day." },
      { property: "og:title", content: "Contact Star Heights" },
      { property: "og:description", content: "Let's build something remarkable." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell
      eyebrow="Get In Touch"
      title={<>Let's build something <span className="gold-gradient-text italic">remarkable</span>.</>}
      intro="Tell us about your project — residential, commercial or apartment development — and our advisory team will be in touch within one business day."
    >
      <StatsStrip stats={DEFAULT_STATS} />
      <Contact bare />
    </PageShell>
  );
}
