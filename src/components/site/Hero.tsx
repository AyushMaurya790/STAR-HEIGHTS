import heroImg from "@/assets/hero.jpg";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Star Heights flagship tower under construction at golden hour"
          className="h-full w-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/85 via-charcoal-deep/55 to-charcoal-deep" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,oklch(0.16_0.005_250)_70%)]" />
      </div>

      {/* Decorative gold grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-20 pt-40 lg:px-10 lg:pb-28">
        <div className="max-w-4xl animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-gold" />
            <span className="eyebrow">Since 2002 · Delhi NCR</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] font-semibold text-foreground">
            Crafting <span className="gold-gradient-text italic">heights</span>
            <br /> that define
            <br /> tomorrow's skyline.
          </h1>

          <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-foreground/70">
            A premier construction house delivering residential, commercial and
            apartment developments across Delhi NCR — engineered with precision,
            built with integrity.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-medium tracking-[0.2em] text-charcoal-deep transition-all hover:scale-[1.03] hover:shadow-[0_20px_60px_-15px_var(--gold)]"
            >
              EXPLORE PROJECTS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/25 px-7 py-4 text-sm font-medium tracking-[0.2em] text-foreground transition-all hover:border-gold hover:text-gold"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              OUR STORY
            </a>
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/15 bg-charcoal/40 backdrop-blur-md md:grid-cols-4">
          {[
            ["23+", "Years of Legacy"],
            ["180+", "Projects Delivered"],
            ["5M+", "Sq.Ft Constructed"],
            ["100%", "On-Time Delivery"],
          ].map(([n, l]) => (
            <div key={l} className="bg-charcoal/60 p-6 text-center">
              <div className="font-display text-3xl md:text-4xl font-semibold gold-gradient-text">
                {n}
              </div>
              <div className="mt-1 text-[10px] tracking-[0.25em] uppercase text-foreground/60">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40">
        <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
        <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
