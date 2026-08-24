import { Home, Building2, Building, Factory, Paintbrush, ArrowUpRight, Radio, ShieldCheck, Ruler, Compass, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import heroBanner from "@/assets/live-projects/hero-banner.png";
import { useEffect, useState } from "react";
import { clientApi, type ServiceItem } from "@/lib/api";

const ICON_MAP: Record<string, any> = {
  Home,
  Building2,
  Building,
  Factory,
  Paintbrush,
  ShieldCheck,
  Ruler,
  Compass,
  Sparkles,
};

const DEFAULT_SERVICES = [
  {
    icon: "Home",
    title: "Residential Construction",
    desc: "Bespoke villas, premium homes and independent residences built to exacting standards of comfort, finish and structural integrity.",
    points: ["Custom Villas", "Independent Floors", "Luxury Interiors"],
  },
  {
    icon: "Building2",
    title: "Commercial Projects",
    desc: "Corporate towers, retail and mixed-use developments engineered for performance, brand presence and long-term value.",
    points: ["Corporate Towers", "Retail & Showrooms", "Mixed-Use"],
  },
  {
    icon: "Building",
    title: "Apartment Development",
    desc: "Large-scale apartment communities with thoughtful planning, premium amenities and turnkey execution from blueprint to handover.",
    points: ["Group Housing", "Premium Amenities", "Turnkey Delivery"],
  },
  {
    icon: "Factory",
    title: "Industrial Construction",
    desc: "Warehouses, factories and institutional facilities — engineered to industrial-grade specifications, safety norms and operational scale.",
    points: ["Warehouses & Sheds", "Factories", "Institutional"],
  },
  {
    icon: "Paintbrush",
    title: "Renovation & Interiors",
    desc: "Full-scope renovation, bespoke interior fit-outs and modernization that transform existing spaces into refined, contemporary environments.",
    points: ["Modern Interiors", "Space Modernization", "Premium Fit-Out"],
  },
];

export function Services() {
  const [services, setServices] = useState<any[]>(DEFAULT_SERVICES);

  useEffect(() => {
    clientApi.getServices().then((data) => {
      if (data && data.length > 0) {
        const sorted = [...data]
          .filter((s) => s.status !== "Inactive")
          .sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
        setServices(sorted.length > 0 ? sorted : data);
      }
    });
  }, []);

  return (
    <section id="services" className="relative py-28 lg:py-40 bg-cream overflow-hidden">
      
      {/* Floating gold orb */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-charcoal-deep/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end mb-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">What We Do</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-foreground">
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
          {services.map((s, i) => {
            const IconComponent = typeof s.icon === "string" ? (ICON_MAP[s.icon] || Building2) : (s.icon || Building2);
            return (
              <Reveal key={s.id || s.title} delay={i * 90}>
                <article className="group relative h-full overflow-hidden rounded-sm border border-foreground/10 bg-ivory p-8 transition-all duration-700 hover:border-gold/50 hover:-translate-y-2 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)]">
                  {/* Sliding black overlay from bottom */}
                  <div className="absolute inset-0 bg-charcoal-deep translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0" />

                  {/* Gold sweep line at top */}
                  <div className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                  {/* Gold sweep line at bottom */}
                  <div className="absolute bottom-0 right-0 h-px w-0 bg-gold transition-all duration-700 delay-100 group-hover:w-full" />

                  {/* Corner accents */}
                  <div className="pointer-events-none absolute top-3 right-3 h-5 w-5 border-r border-t border-gold/0 transition-colors duration-500 group-hover:border-gold/60" />
                  <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-l border-b border-gold/0 transition-colors duration-500 group-hover:border-gold/60" />

                  {/* Big watermark number */}
                  <div className="pointer-events-none absolute -top-6 -right-2 font-display text-[8rem] leading-none font-bold text-foreground/[0.04] transition-all duration-700 group-hover:text-gold/15 group-hover:-translate-y-2">
                    0{i + 1}
                  </div>

                  <div className="relative">
                    {/* Icon block with depth */}
                    <div className="relative h-16 w-16">
                      <div className="absolute inset-0 rounded-sm bg-charcoal-deep translate-x-1.5 translate-y-1.5 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-gold/30" />
                      <div className="relative grid h-16 w-16 place-items-center rounded-sm border border-gold/40 bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-charcoal-deep group-hover:border-gold group-hover:rotate-[-8deg] group-hover:scale-110">
                        <IconComponent className="h-7 w-7 transition-transform duration-500" strokeWidth={1.6} />
                      </div>
                    </div>

                    <h3 className="mt-7 font-display text-2xl font-semibold text-foreground transition-colors duration-500 group-hover:text-ivory">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/65 transition-colors duration-500 group-hover:text-ivory/75">
                      {s.desc}
                    </p>
                    <ul className="mt-6 space-y-2">
                      {(s.points || []).map((p: string) => (
                        <li
                          key={p}
                          className="flex items-center gap-2 text-xs tracking-wider text-foreground/75 transition-colors duration-500 group-hover:text-ivory/85"
                        >
                          <span className="h-px w-4 bg-gold transition-all duration-500 group-hover:w-6" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-5 transition-colors duration-500 group-hover:border-gold/30">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/45 transition-colors duration-500 group-hover:text-gold">
                        0{i + 1} / 0{services.length}
                      </span>
                      {/* CTA chip */}
                      <a href="#contact" className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-3 py-1 text-[10px] tracking-[0.25em] text-foreground/60 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal-deep group-hover:gap-2.5">
                        ENQUIRE
                        <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:rotate-45" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}

          {/* Black "Live Ongoing Projects" CTA tile */}
          <Reveal delay={services.length * 90}>
            <div className="group relative h-full min-h-[360px] overflow-hidden rounded-sm bg-charcoal-deep border border-gold/30 p-8 flex flex-col justify-between transition-all duration-500 hover:border-gold hover:-translate-y-2 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]">

              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl transition-all duration-700 group-hover:bg-gold/25" />

              <div className="relative">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
                    </span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Live Now</span>
                  </div>
                  
                </div>
                <h3 className="font-display text-3xl font-semibold text-ivory leading-tight">
                  Watch our sites <span className="gold-gradient-text italic">rise</span> in real time.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">
                  Track progress on active Star Heights builds across Delhi NCR — floor by floor,
                  finish by finish.
                </p>

                {/* Mini gallery of ongoing projects */}
                <div className="mt-6 overflow-hidden rounded-xl border border-gold/20">
  <a href="/projects" className="block">
    <img
      src={heroBanner}
      alt="Live Construction Progress"
      className="w-full h-auto object-contain"
    />
  </a>
</div>
              </div>

              <a
                href="/projects"
                className="relative mt-6 inline-flex items-center gap-3 self-start rounded-full bg-gold px-6 py-3 text-xs font-medium tracking-[0.25em] text-charcoal-deep transition-all duration-500 group-hover:gap-5 group-hover:shadow-[0_15px_40px_-10px_var(--gold)]"
              >
                <Radio className="h-4 w-4" />
                VIEW LIVE PROJECTS
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </div>


          </Reveal>
        </div>
      </div>
    </section>
  );
}
