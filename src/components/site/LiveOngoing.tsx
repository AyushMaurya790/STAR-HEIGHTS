import { Reveal } from "./Reveal";
import { MapPin, Calendar, ArrowUpRight, Radio } from "lucide-react";
import residentialImg from "@/assets/project-residential.jpg";
import commercialImg from "@/assets/project-commercial.jpg";
import apartmentImg from "@/assets/project-apartment.jpg";

const LIVE = [
  {
    img: residentialImg,
    name: "Vinod Heights Residences",
    type: "Residential",
    loc: "East Delhi",
    start: "Mar 2024",
    handover: "Q4 2025",
    progress: 72,
    stage: "Interior Finishing",
  },
  {
    img: commercialImg,
    name: "Noida Corporate Spire",
    type: "Commercial",
    loc: "Noida Sector 62",
    start: "Aug 2024",
    handover: "Q2 2026",
    progress: 45,
    stage: "Structural / MEP",
  },
  {
    img: apartmentImg,
    name: "Faridabad Skyline Towers",
    type: "Apartment Development",
    loc: "Faridabad",
    start: "Jan 2025",
    handover: "Q3 2026",
    progress: 28,
    stage: "Foundation & RCC",
  },
];

export function LiveOngoing() {
  return (
    <section id="live-ongoing" className="relative bg-charcoal-deep py-28 lg:py-36 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">Live Ongoing</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-ivory">
              Active sites,
              <br />
              <span className="gold-gradient-text italic">rising now</span>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-ivory/70 leading-relaxed lg:text-right">
              Real progress, real timelines. Track the developments Star Heights
              is delivering across Delhi NCR — each one moving on schedule,
              under the same standard of craft and supervision.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LIVE.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <article className="group relative h-full overflow-hidden rounded-sm border border-gold/20 bg-charcoal-deep/60 backdrop-blur transition-all duration-500 hover:border-gold hover:-translate-y-2 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/30 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-charcoal-deep/80 backdrop-blur border border-gold/40 px-3 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                    </span>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-gold">Live</span>
                  </div>
                  <div className="absolute top-4 right-4 rounded-full bg-gold/95 px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase text-charcoal-deep">
                    {p.type}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-ivory leading-snug">{p.name}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ivory/65">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      {p.loc}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gold" />
                      {p.start} → {p.handover}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase mb-2">
                      <span className="text-ivory/55">{p.stage}</span>
                      <span className="text-gold font-medium">{p.progress}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-ivory/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold transition-all duration-1000"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  <a
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1 transition-all hover:gap-3 hover:border-gold"
                  >
                    Site Walkthrough
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA back to consultation */}
        <Reveal delay={200}>
          <div className="mt-16 relative overflow-hidden rounded-sm border border-gold/30 bg-ivory/[0.03] p-8 md:p-12 grid gap-6 md:grid-cols-[1.4fr_auto] md:items-center">
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-8 bg-gold" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Next Step</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-ivory leading-tight">
                Considering a build of your own?
                <span className="block gold-gradient-text italic">Let's design the brief together.</span>
              </h3>
            </div>
            <a
              href="/contact"
              className="relative inline-flex items-center gap-3 self-start md:self-center rounded-full bg-gold px-7 py-3.5 text-xs font-medium tracking-[0.25em] text-charcoal-deep transition-all duration-500 hover:gap-5 hover:shadow-[0_15px_40px_-10px_var(--gold)]"
            >
              <Radio className="h-4 w-4" />
              BOOK CONSULTATION
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 hover:rotate-45" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
