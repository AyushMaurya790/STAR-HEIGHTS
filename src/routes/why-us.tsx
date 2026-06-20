import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { CTABand } from "@/components/site/MenuExtras";

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [
      { title: "Why Star Heights — Trust, Experience, Delivery, Quality" },
      { name: "description", content: "Four non-negotiables — trust, experience, on-time delivery and premium quality — built over 23 years across Delhi NCR." },
      { property: "og:title", content: "Why Star Heights" },
      { property: "og:description", content: "Built on four non-negotiables." },
    ],
  }),
  component: WhyPage,
});

function WhyPage() {
  return (
    <PageShell
      eyebrow="Why Star Heights"
      title={<>Built on four <span className="gold-gradient-text italic">non-negotiables</span>.</>}
      intro="Trust, experience, timely delivery, premium quality. The same four principles that have guided every project we've signed since 2002."
    >
      <WhyUs bare />
      <Testimonials />
      <CTABand
        title="Two decades of clean delivery — and we're just getting started."
        sub="Talk to our advisory team and see if Star Heights is the right partner for your next build."
      />
    </PageShell>
  );
}
