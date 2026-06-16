import { Play, Instagram, Heart, MessageCircle } from "lucide-react";
import r1 from "@/assets/project-commercial.jpg";
import r2 from "@/assets/project-residential.jpg";
import r3 from "@/assets/project-apartment.jpg";
import r4 from "@/assets/hero.jpg";
import r5 from "@/assets/about.jpg";

const REELS = [
  { img: r1, title: "Inside the Noida Corporate Spire", likes: "12.4K", comments: "284" },
  { img: r2, title: "Vinod Heights — Penthouse Reveal", likes: "9.1K", comments: "176" },
  { img: r3, title: "Faridabad Skyline Drone Tour", likes: "21.8K", comments: "512" },
  { img: r4, title: "Foundation to Finish in 60s", likes: "34.2K", comments: "901" },
  { img: r5, title: "Italian Marble Lobby Walkthrough", likes: "7.6K", comments: "143" },
  { img: r1, title: "Site Visit · Day 412", likes: "5.3K", comments: "98" },
  { img: r3, title: "Sky Deck Sunset Reel", likes: "18.7K", comments: "402" },
  { img: r2, title: "Material Mood Board", likes: "4.9K", comments: "67" },
];

// Duplicate the list so the marquee can loop seamlessly.
const TRACK = [...REELS, ...REELS];

export function Reels() {
  return (
    <section id="reels" className="relative bg-cream py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">@starheights · Reels</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] max-w-2xl">
              Behind the build,{" "}
              <span className="gold-gradient-text italic">on Instagram</span>.
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs tracking-[0.25em] text-gold hover:bg-gold hover:text-charcoal-deep transition-all"
          >
            <Instagram className="h-4 w-4" />
            FOLLOW @STARHEIGHTS
          </a>
        </div>
      </div>

      {/* Edge fade masks */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-charcoal to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-charcoal to-transparent" />

        <div
          className="group flex w-max gap-5 animate-marquee px-5 lg:px-10"
          style={{ animationDuration: "55s" }}
        >
          {TRACK.map((r, i) => (
            <article
              key={i}
              className="relative h-[460px] w-[260px] shrink-0 overflow-hidden rounded-2xl border border-gold/15 bg-charcoal-deep shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:-translate-y-2 hover:border-gold/50"
            >
              <img
                src={r.img}
                alt={r.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/20 to-transparent" />

              {/* Top row */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal-deep/70 px-2.5 py-1 text-[10px] tracking-[0.2em] text-gold backdrop-blur border border-gold/30">
                  <Instagram className="h-3 w-3" /> REEL
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-charcoal-deep">
                  <Play className="h-4 w-4 fill-current" />
                </span>
              </div>

              {/* Bottom info */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-base font-semibold text-foreground leading-snug">
                  {r.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-[11px] text-foreground/75">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-gold" /> {r.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5 text-gold" /> {r.comments}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
