import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Building2, CalendarCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

type Stat = { k: string; l: string; icon?: LucideIcon };

export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative bg-background py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-px overflow-hidden rounded-sm border border-foreground/10 bg-foreground/10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 80}>
              <div className="group relative h-full bg-ivory p-8 transition-colors hover:bg-charcoal-deep">
                <div className="flex items-start justify-between">
                  <div className="font-display text-4xl md:text-5xl font-semibold text-foreground transition-colors group-hover:text-gold">
                    {s.k}
                  </div>
                  {s.icon && (
                    <s.icon className="h-5 w-5 text-gold/70 transition-transform group-hover:rotate-12" />
                  )}
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-foreground/55 transition-colors group-hover:text-ivory/70">
                  {s.l}
                </div>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessBand({
  title,
  steps,
}: {
  title: string;
  steps: { n: string; t: string; d: string }[];
}) {
  return (
    <section className="relative bg-ivory py-24 lg:py-32 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--charcoal-deep) 1px, transparent 1px), linear-gradient(90deg, var(--charcoal-deep) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">The Process</span>
          </div>
          <h3 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1] max-w-3xl">
            {title}
          </h3>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="group relative h-full rounded-sm border border-foreground/10 bg-card p-7 transition-all hover:border-gold/50 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold gold-gradient-text">
                    {s.n}
                  </span>
                  <span className="h-px w-12 bg-gold/40 transition-all group-hover:w-20 group-hover:bg-gold" />
                </div>
                <h4 className="mt-6 font-display text-xl font-semibold">{s.t}</h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTABand({
  eyebrow = "Next Step",
  title,
  sub,
  ctaLabel = "Schedule a consultation",
  ctaTo = "/contact",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  ctaLabel?: string;
  ctaTo?: string;
}) {
  return (
    <section className="relative bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="relative overflow-hidden rounded-sm bg-charcoal-deep text-ivory">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div
            className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(closest-side, var(--gold), transparent)" }}
          />
          <div className="relative grid gap-10 p-10 md:p-14 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-gold">{eyebrow}</span>
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] max-w-2xl">
                {title}
              </h3>
              {sub && (
                <p className="mt-5 max-w-xl text-ivory/70 leading-relaxed">{sub}</p>
              )}
            </div>
            <div className="flex lg:justify-end">
              <Link
                to={ctaTo}
                className="group inline-flex items-center gap-3 rounded-sm bg-gold px-7 py-4 text-sm font-medium uppercase tracking-[0.2em] text-charcoal-deep transition-all hover:bg-ivory"
              >
                {ctaLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const DEFAULT_STATS: Stat[] = [
  { k: "23+", l: "Years of Legacy", icon: Award },
  { k: "180+", l: "Projects Delivered", icon: Building2 },
  { k: "5M+", l: "Sq.Ft Constructed", icon: Sparkles },
  { k: "100%", l: "On-Time Handover", icon: CalendarCheck },
];
