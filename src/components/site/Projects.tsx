import residential from "@/assets/project-residential.jpg";
import commercial from "@/assets/project-commercial.jpg";
import apartment from "@/assets/project-apartment.jpg";
import { Reveal } from "./Reveal";
import { MapPin } from "lucide-react";

const PROJECTS = [
  { img: residential, title: "Vinod Heights Residences", tag: "Residential", loc: "East Delhi", year: "2024" },
  { img: commercial, title: "Noida Corporate Spire", tag: "Commercial", loc: "Noida Sector 62", year: "2023" },
  { img: apartment, title: "Faridabad Skyline Towers", tag: "Apartment Development", loc: "Faridabad", year: "2025" },
];

export function Projects() {
  return (
    <section id="projects" className="relative bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Featured Portfolio</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              Landmarks we've
              <br />
              <span className="gold-gradient-text italic">delivered</span>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <a href="#contact" className="text-xs tracking-[0.3em] text-gold border-b border-gold/40 pb-1 hover:border-gold">
              REQUEST FULL PORTFOLIO →
            </a>
          </Reveal>
        </div>

        {/* Large featured */}
        <Reveal>
          <a href="#contact" className="group relative block overflow-hidden rounded-sm">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={PROJECTS[0].img}
                alt={PROJECTS[0].title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/40 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] tracking-[0.3em] text-gold border border-gold/30">
                  FLAGSHIP
                </span>
                <span className="text-[10px] tracking-[0.3em] text-ivory/70">{PROJECTS[0].tag.toUpperCase()}</span>
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-semibold max-w-3xl">
                {PROJECTS[0].title}
              </h3>
              <div className="mt-4 flex items-center gap-5 text-sm text-ivory/80">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" />{PROJECTS[0].loc}</span>
                <span>{PROJECTS[0].year}</span>
              </div>
            </div>
          </a>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {PROJECTS.slice(1).map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <a href="#contact" className="group relative block overflow-hidden rounded-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <span className="text-[10px] tracking-[0.3em] text-gold">{p.tag.toUpperCase()}</span>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold">{p.title}</h3>
                  <div className="mt-3 flex items-center gap-4 text-xs text-ivory/75">
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-gold" />{p.loc}</span>
                    <span>{p.year}</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
