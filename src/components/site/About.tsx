import aboutImg from "@/assets/about.jpg";
import { Reveal } from "./Reveal";
import { CheckCircle2, Compass, Layers, Ruler } from "lucide-react";

const SIGNATURES = [
  { icon: Compass, label: "Architectural Rigor" },
  { icon: Ruler, label: "Engineering Discipline" },
  { icon: Layers, label: "Material Integrity" },
];

const COMMITMENTS = [
  "10-year construction warranty",
  "Transparent, audited estimates",
  "Top-brand materials throughout",
  "On-time, on-spec handover",
];

export function About({ noHeader = false }: { noHeader?: boolean }) {
  return (
    <section id="about" className="relative bg-ivory py-28 lg:py-40 overflow-hidden">
      {/* faint architectural grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--charcoal-deep) 1px, transparent 1px), linear-gradient(90deg, var(--charcoal-deep) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* gold corner accents */}
      <div className="pointer-events-none absolute top-10 left-10 h-20 w-20 border-l-2 border-t-2 border-gold/30" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-20 w-20 border-r-2 border-b-2 border-gold/30" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20 lg:px-10">
        {/* Image column */}
        <Reveal className="relative lg:sticky lg:top-28">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-sm">
            {/* Black offset frame */}
            <div className="pointer-events-none absolute -bottom-4 -left-4 h-full w-full rounded-sm bg-charcoal-deep -z-10" />
            <img
              src={aboutImg}
              alt="Luxury architectural lobby interior"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-charcoal-deep/10 to-transparent" />

            {/* Bottom black slate with brand line */}
            <div className="absolute inset-x-0 bottom-0 bg-charcoal-deep/90 backdrop-blur px-5 py-3 border-t border-gold/30 flex items-center justify-between">
              <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/70">
                Vinod Heights · Delhi NCR
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold">
                Est. 2002
              </div>
            </div>

            {/* Floating years badge — pinned to image, top-right */}
            <div className="absolute top-5 right-5 bg-charcoal-deep/95 backdrop-blur border border-gold/40 rounded-sm px-5 py-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
              <div className="flex items-end gap-1.5">
                <div className="font-display text-4xl font-semibold gold-gradient-text leading-none">23</div>
                <div className="font-display text-xl text-gold pb-0.5">+</div>
              </div>
              <div className="mt-2 text-[9px] tracking-[0.25em] uppercase text-ivory/70 leading-tight max-w-[110px]">
                Years of Legacy
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text column */}
        <div className="flex flex-col items-start">
          {!noHeader && (
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-gold" />
                <span className="eyebrow">About the Company</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-foreground">
                A legacy of <span className="gold-gradient-text italic">precision</span>,
                built one structure at a time.
              </h2>
            </Reveal>
          )}

          <Reveal delay={noHeader ? 0 : 120}>
            <p className="mt-8 text-foreground/75 leading-relaxed text-justify">
              Founded in <span className="text-foreground font-medium">1991</span> by visionary directors{" "}
              <span className="text-foreground font-medium">Mr. Amjad Khan</span> and{" "}
              <span className="text-foreground font-medium">Mr. Afsar Khan</span>, Star Heights has built a
              distinguished construction legacy spanning over 35 years. From premium private residences and
              commercial landmarks to institutional facilities, hospitality projects, and large-scale
              residential developments across Delhi NCR, we have consistently delivered excellence at every
              stage of construction.
            </p>
            <p className="mt-5 text-foreground/75 leading-relaxed text-justify">
              As a comprehensive construction partner, Star Heights brings together architects, civil
              engineers, and project management experts under one roof. Our integrated approach ensures
              seamless execution, superior quality, timely delivery, and cost-effective solutions —
              transforming ideas into enduring structures that exceed expectations.
            </p>
            <p className="mt-6 font-display text-lg italic gold-gradient-text">
              Building trust. Delivering quality. Creating landmarks since 1991.
            </p>
          </Reveal>

          {/* Signature pillars */}
          <Reveal delay={180}>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {SIGNATURES.map((s) => (
                <div
                  key={s.label}
                  className="group rounded-sm border border-foreground/10 bg-card p-4 text-center transition-all hover:border-gold/50 hover:-translate-y-1 hover:bg-charcoal-deep"
                >
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-sm border border-gold/40 bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal-deep">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className="mt-3 text-[10px] tracking-[0.22em] uppercase text-foreground/70 group-hover:text-ivory/80 transition-colors">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Dark commitments band */}
          <Reveal delay={240}>
            <div className="mt-8 rounded-sm border border-gold/30 bg-charcoal-deep p-6 lg:p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-gold" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
                  Our Commitment
                </span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {COMMITMENTS.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-ivory/85">
                    <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Quick facts grid */}
          <Reveal delay={300}>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-px bg-gold/40 overflow-hidden rounded-sm border border-gold/30">
              {[
                ["Est.", "2002"],
                ["HQ", "Delhi NCR"],
                ["Region", "Pan-NCR"],
                ["Focus", "Turnkey"],
              ].map(([k, v]) => (
                <div key={k} className="bg-ivory p-5 transition-colors hover:bg-charcoal-deep group">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/55 group-hover:text-ivory/60 transition-colors">
                    {k}
                  </div>
                  <div className="mt-1 font-display text-xl gold-gradient-text">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
