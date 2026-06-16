import aboutImg from "@/assets/about.jpg";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative bg-ivory py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-24 lg:px-10">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={aboutImg}
              alt="Luxury architectural lobby interior"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </div>
          <div className="absolute -bottom-8 -right-4 lg:-right-10 glass rounded-sm p-6 max-w-[240px]">
            <div className="font-display text-5xl font-semibold gold-gradient-text">23</div>
            <div className="mt-1 text-xs tracking-[0.2em] uppercase text-foreground/70">
              Years building landmarks across Delhi NCR
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">About the Company</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              A legacy of <span className="gold-gradient-text italic">precision</span>,
              built one structure at a time.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 text-foreground/70 leading-relaxed">
              Founded in 2002, Star Heights Constructions Company has spent over
              two decades shaping the architectural identity of Delhi NCR. From
              private residences to commercial landmarks and large-scale
              apartment developments, we bring an uncompromising standard of
              quality, transparency, and craftsmanship to every project we touch.
            </p>
            <p className="mt-5 text-foreground/70 leading-relaxed">
              Headquartered in West Vinod Nagar, our team of architects,
              engineers, and project managers operate as a single, disciplined
              unit — delivering turnkey projects on time, on budget, and beyond
              expectation.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 grid grid-cols-2 gap-px bg-gold/10 overflow-hidden rounded-sm border border-gold/15">
              {[
                ["Est.", "2002"],
                ["HQ", "Delhi NCR"],
                ["Region", "Pan-NCR"],
                ["Focus", "Turnkey"],
              ].map(([k, v]) => (
                <div key={k} className="bg-card p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">{k}</div>
                  <div className="mt-1 font-display text-xl text-gold">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
