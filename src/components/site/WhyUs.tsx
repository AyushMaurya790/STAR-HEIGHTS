import { useEffect, useState } from "react";
import { ShieldCheck, Clock3, Award, HardHat } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { Reveal } from "./Reveal";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!shown) return;
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, end]);
  return (
    <div ref={ref} className="font-display text-5xl md:text-6xl font-semibold gold-gradient-text">
      {n}
      {suffix}
    </div>
  );
}

const PILLARS = [
  { icon: ShieldCheck, title: "Trust", desc: "Transparent contracts, audited finances and a 35-year clean track record." },
  { icon: HardHat, title: "Experience", desc: "Two decades of structural engineering across every NCR sub-market." },
  { icon: Clock3, title: "Timely Delivery", desc: "Disciplined milestone tracking with 100% on-time handover history." },
  { icon: Award, title: "Premium Quality", desc: "Specification-grade materials, RERA-aligned QA, and final-finish obsession." },
];

export function WhyUs() {
  return (
    <section id="why" className="relative bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Why Star Heights</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              Built on four
              <span className="gold-gradient-text italic"> non-negotiables</span>.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-px bg-gold/10 overflow-hidden rounded-sm border border-gold/15 md:grid-cols-4">
          {[
            { n: 34, s: "+", l: "Years" },
            { n: 180, s: "+", l: "Projects" },
            { n: 5, s: "M+", l: "Sq.Ft Built" },
            { n: 100, s: "%", l: "On-Time" },
          ].map((c) => (
            <div key={c.l} className="bg-card p-8 text-center">
              <Counter end={c.n} suffix={c.s} />
              <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-foreground/60">{c.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="group h-full rounded-sm border border-foreground/10 bg-card p-7 transition-all hover:border-gold/40">
                <div className="grid h-12 w-12 place-items-center rounded-sm border border-gold/30 text-gold transition-all group-hover:bg-gold group-hover:text-charcoal-deep">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
