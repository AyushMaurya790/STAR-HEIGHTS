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

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-24 lg:px-10">
        {/* Image column */}
        <Reveal className="relative">
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
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/60 via-transparent to-transparent" />

            {/* Bottom black slate with brand line */}
            <div className="absolute inset-x-0 bottom-0 bg-charcoal-deep/85 backdrop-blur px-6 py-4 border-t border-gold/30 flex items-center justify-between">
              <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/70">
                Vinod Heights · Delhi NCR
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold">
                Est. 2002
              </div>
            </div>
          </div>

          {/* Floating years badge */}
          <div className="absolute -bottom-10 -right-4 lg:-right-10 bg-charcoal-deep border border-gold/40 rounded-sm p-6 max-w-[260px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]">
            <div className="flex items-end gap-2">
              <div className="font-display text-6xl font-semibold gold-gradient-text leading-none">23</div>
              <div className="font-display text-2xl text-gold pb-1">+</div>
            </div>
            <div className="mt-3 text-[11px] tracking-[0.22em] uppercase text-ivory/70 leading-relaxed">
              Years building landmarks across Delhi NCR
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-px w-8 bg-gold" />
              <span className="text-[9px] tracking-[0.3em] text-gold">SINCE 2002</span>
            </div>
          </div>
        </Reveal>

        {/* Text column */}
        <div className="flex flex-col items-start justify-start lg:justify-center">
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
            <p className="mt-8 text-foreground/75 leading-relaxed">
              Founded in <span className="text-foreground font-medium">2002</span> by directors{" "}
              <span className="text-foreground font-medium">Mr. Amjad Khan</span> and{" "}
              <span className="text-foreground font-medium">Mr. Afsar Khan</span>, Star Heights brings a rich
              25-year construction legacy — from private residences and commercial landmarks to institutional,
              hospitality and large-scale apartment developments across Delhi NCR.
            </p>
            <p className="mt-5 text-foreground/75 leading-relaxed">
              We operate as a one-stop solution: architects, civil engineers and project managers working as
              a single disciplined unit — delivering turnkey projects on time, on budget, and beyond expectation.
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
