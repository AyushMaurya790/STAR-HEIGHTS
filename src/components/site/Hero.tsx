import { useEffect, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import slide2 from "@/assets/project-commercial.jpg";
import slide3 from "@/assets/project-residential.jpg";
import slide4 from "@/assets/project-apartment.jpg";
import { ArrowRight, Play } from "lucide-react";

const SLIDES = [
  {
    img: heroImg,
    eyebrow: "Since 2002 · Delhi NCR",
    title: (
      <>
        Crafting <span className="gold-gradient-text italic">heights</span>
        <br /> that define
        <br /> tomorrow's skyline.
      </>
    ),
    sub: "A premier construction house delivering residential, commercial and apartment developments across Delhi NCR — engineered with precision, built with integrity.",
  },
  {
    img: slide2,
    eyebrow: "Commercial Excellence",
    title: (
      <>
        Building <span className="gold-gradient-text italic">landmarks</span>
        <br /> for visionary
        <br /> enterprises.
      </>
    ),
    sub: "Iconic commercial towers, corporate parks and retail destinations — designed to elevate brands and inspire cities.",
  },
  {
    img: slide3,
    eyebrow: "Luxury Residences",
    title: (
      <>
        Homes that <span className="gold-gradient-text italic">redefine</span>
        <br /> modern luxury
        <br /> living.
      </>
    ),
    sub: "Bespoke residential developments crafted with timeless architecture, premium finishes and uncompromising quality.",
  },
  {
    img: slide4,
    eyebrow: "Premium Apartments",
    title: (
      <>
        Smart living, <span className="gold-gradient-text italic">refined</span>
        <br /> for the next
        <br /> generation.
      </>
    ),
    sub: "Thoughtfully planned apartments combining cutting-edge amenities with serene, sustainable communities.",
  },
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.img}
              alt=""
              className={`h-full w-full object-cover ${idx === i ? "animate-ken-burns" : ""}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/85 via-charcoal-deep/55 to-charcoal-deep" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,oklch(0.16_0.005_250)_70%)]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-20 pt-40 lg:px-10 lg:pb-28">
        <div key={i} className="max-w-4xl animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-gold" />
            <span className="eyebrow">{SLIDES[i].eyebrow}</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] font-semibold text-foreground">
            {SLIDES[i].title}
          </h1>

          <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-foreground/70">
            {SLIDES[i].sub}
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

        {/* Slide indicators */}
        <div className="mt-12 flex items-center gap-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                idx === i ? "w-12 bg-gold" : "w-6 bg-foreground/25 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Bottom stat strip */}
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/15 bg-charcoal/40 backdrop-blur-md md:grid-cols-4">
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
