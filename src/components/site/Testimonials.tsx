import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

const ITEMS = [
  {
    quote:
      "Star Heights delivered our corporate tower three weeks ahead of schedule with finishing quality that exceeded our specifications. Rare to find this discipline in NCR.",
    name: "Rohan Mehta",
    role: "Managing Director, Mehta Group",
  },
  {
    quote:
      "From the first blueprint to the handover walk-through, every milestone was met. Our family villa is everything we imagined and structurally flawless.",
    name: "Anjali & Vikram Sharma",
    role: "Homeowners, Vinod Nagar",
  },
  {
    quote:
      "Their turnkey execution on our 14-storey apartment project was textbook. Transparent reporting, premium materials, zero post-handover issues.",
    name: "Sandeep Khurana",
    role: "Developer, Skyline Estates",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % ITEMS.length), 6500);
    return () => clearInterval(id);
  }, []);
  const item = ITEMS[i];

  return (
    <section className="relative bg-ivory py-28 lg:py-40 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-10 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Client Voices</span>
            <span className="h-px w-10 bg-gold" />
          </div>
        </Reveal>

        <Quote className="mx-auto h-12 w-12 text-gold/40" />

        <div key={i} className="animate-fade-in">
          <blockquote className="mt-8 font-display text-2xl md:text-3xl lg:text-4xl leading-[1.3] text-foreground/90">
            "{item.quote}"
          </blockquote>
          <div className="mt-10">
            <div className="font-display text-lg gold-gradient-text">{item.name}</div>
            <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-foreground/60">
              {item.role}
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            aria-label="Previous"
            onClick={() => setI((x) => (x - 1 + ITEMS.length) % ITEMS.length)}
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-charcoal-deep transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {ITEMS.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-gold" : "w-1.5 bg-foreground/30"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Next"
            onClick={() => setI((x) => (x + 1) % ITEMS.length)}
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-charcoal-deep transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
