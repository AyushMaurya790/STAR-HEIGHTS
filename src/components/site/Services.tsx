import { Home, Building2, Building, Factory, Paintbrush, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const SERVICES = [
  {
    icon: Home,
    title: "Residential Construction",
    desc: "Bespoke villas, premium homes and independent residences built to exacting standards of comfort, finish and structural integrity.",
    points: ["Custom Villas", "Independent Floors", "Luxury Interiors"],
  },
  {
    icon: Building2,
    title: "Commercial Projects",
    desc: "Corporate towers, retail and mixed-use developments engineered for performance, brand presence and long-term value.",
    points: ["Corporate Towers", "Retail & Showrooms", "Mixed-Use"],
  },
  {
    icon: Building,
    title: "Apartment Development",
    desc: "Large-scale apartment communities with thoughtful planning, premium amenities and turnkey execution from blueprint to handover.",
    points: ["Group Housing", "Premium Amenities", "Turnkey Delivery"],
  },
  {
    icon: Factory,
    title: "Industrial Construction",
    desc: "Warehouses, factories and institutional facilities — built to industrial-grade specifications, safety norms and operational scale.",
    points: ["Warehouses", "Factory Sheds", "Institutional"],
  },
  {
    icon: Paintbrush,
    title: "Renovation & Interiors",
    desc: "Full-scope renovation, interior fit-outs and bespoke modernization that transform existing spaces into modern, refined environments.",
    points: ["Modern Interiors", "Space Modernization", "Premium Fit-Out"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 lg:py-40 bg-cream">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end mb-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">What We Do</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              End-to-end construction,
              <br />
              <span className="gold-gradient-text italic">elevated</span>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-foreground/70 leading-relaxed lg:text-right">
              Five core practices, one disciplined delivery model. Every Star
              Heights project moves through the same standard of design rigor,
              site supervision and finishing quality — from residential villas
              to industrial-scale facilities.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <article className="group relative h-full overflow-hidden rounded-sm border border-foreground/10 bg-ivory p-8 transition-all duration-500 hover:border-gold/50 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)]">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-sm border border-gold/40 bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-charcoal-deep group-hover:rotate-6">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                    {s.desc}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs tracking-wider text-foreground/75">
                        <span className="h-px w-4 bg-gold" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-5">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/45">
                      0{i + 1} / 0{SERVICES.length}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-gold transition-transform group-hover:rotate-45" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
