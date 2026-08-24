import heroBanner from "@/assets/live-projects/hero-banner.png";
import { Reveal } from "./Reveal";
import { Building2, HardHat, MapPin, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { clientApi, getImageUrl, type ProjectItem } from "@/lib/api";
import live01 from "@/assets/live-projects/live-01.jpg";
import live02 from "@/assets/live-projects/live-02.jpg";
import live03 from "@/assets/live-projects/live-03.jpg";
import live04 from "@/assets/live-projects/live-04.jpg";
import live05 from "@/assets/live-projects/live-05.jpg";
import live06 from "@/assets/live-projects/live-06.jpg";
import live07 from "@/assets/live-projects/live-07.jpg";
import live08 from "@/assets/live-projects/live-08.jpg";
import live09 from "@/assets/live-projects/live-09.jpg";
import live10 from "@/assets/live-projects/live-10.jpg";
import live11 from "@/assets/live-projects/live-11.jpg";
import live12 from "@/assets/live-projects/live-12.jpg";
import live13 from "@/assets/live-projects/live-13.jpg";
import live14 from "@/assets/live-projects/live-14.jpg";
import live15 from "@/assets/live-projects/live-15.jpg";
import live16 from "@/assets/live-projects/live-16.jpg";
import live17 from "@/assets/live-projects/live-17.jpg";
import live18 from "@/assets/live-projects/live-18.jpg";
import live19 from "@/assets/live-projects/live-19.jpg";
import live20 from "@/assets/live-projects/live-20.jpg";
import live21 from "@/assets/live-projects/live-21.jpg";
import live22 from "@/assets/live-projects/live-22.jpg";
import live23 from "@/assets/live-projects/live-23.jpg";
import live24 from "@/assets/live-projects/live-24.jpg";

const DEFAULT_LIVE = [
  { img: live01, name: "Vinod Heights Tower A", tag: "Residential", progress: 72, loc: "East Delhi" },
  { img: live02, name: "Corporate Spire Core Structure", tag: "Commercial", progress: 45, loc: "Noida Sector 62" },
  { img: live03, name: "Skyline Towers Foundation & Basement", tag: "Apartment Development", progress: 28, loc: "Faridabad" },
  { img: live04, name: "Logistics Hub Pre-Engineered Shed A", tag: "Industrial", progress: 85, loc: "Gurugram IMT Manesar" },
  { img: live05, name: "Executive Suite Architectural Renovation", tag: "Renovation / Interior", progress: 90, loc: "South Delhi" },
  { img: live06, name: "Structural 8th Floor Slab Casting", tag: "Residential", progress: 60, loc: "East Delhi" },
  { img: live07, name: "Glazing & Double-Skin Facade Mount", tag: "Commercial", progress: 50, loc: "Noida Sector 62" },
  { img: live08, name: "Basement Raft Concreting & Waterproofing", tag: "Residential", progress: 35, loc: "Greater Noida" },
  { img: live09, name: "Tower Crane Superstructure Assembly", tag: "Apartment Development", progress: 65, loc: "Faridabad" },
  { img: live10, name: "Industrial Warehouse Heavy Column Erection", tag: "Industrial", progress: 80, loc: "Manesar" },
  { img: live11, name: "Luxury Penthouse Double Height Framing", tag: "Renovation / Interior", progress: 75, loc: "South Delhi" },
  { img: live12, name: "Podium Deck Slab Casting & Reinforcement", tag: "Apartment Development", progress: 40, loc: "Ghaziabad" },
  { img: live13, name: "Facade Stone Cladding & Insulation Mount", tag: "Commercial", progress: 55, loc: "Noida Sector 132" },
  { img: live14, name: "Heavy Industrial Laser-Screed Flooring", tag: "Industrial", progress: 92, loc: "Gurugram" },
  { img: live15, name: "Independent Villa Brick Masonry & Plastering", tag: "Residential", progress: 68, loc: "East Delhi" },
  { img: live16, name: "Central HVAC Ducting & Firefighting Lines", tag: "Commercial", progress: 60, loc: "Noida Sector 62" },
  { img: live17, name: "High-Rise Shear Wall Formwork Shuttering", tag: "Apartment Development", progress: 52, loc: "Faridabad" },
  { img: live18, name: "Grand Entrance Arch & Boundary Wall Masonry", tag: "Residential", progress: 82, loc: "Greater Noida West" },
  { img: live19, name: "Structural Steel Roof Truss Placement", tag: "Industrial", progress: 88, loc: "Manesar" },
  { img: live20, name: "Imported Marble Flooring & Wall Paneling", tag: "Renovation / Interior", progress: 95, loc: "South Delhi" },
  { img: live21, name: "Multi-Level Basement Drainage & Sump Network", tag: "Commercial", progress: 48, loc: "Noida Sector 62" },
  { img: live22, name: "Terrace Infinity Pool Waterproofing & Tiling", tag: "Apartment Development", progress: 70, loc: "Faridabad" },
  { img: live23, name: "Pre-Cast Concrete Boundary & Security Hub", tag: "Industrial", progress: 90, loc: "Gurugram IMT" },
  { img: live24, name: "Final Exterior Paint, Glazing & Handover Prep", tag: "Residential", progress: 98, loc: "East Delhi" },
];

export function LiveOngoing() {
  const [items, setItems] = useState<any[]>(DEFAULT_LIVE);

  useEffect(() => {
    clientApi.getProjects().then((data) => {
      if (data && data.length > 0) {
        const mapped = data.map((p) => ({
          img: p.img,
          name: p.title,
          tag: p.tag || "Live Build",
          progress: p.progress !== undefined ? p.progress : 50,
          loc: p.loc,
        }));
        setItems(mapped);
      }
    });
  }, []);

  return (
    <section
      id="live-ongoing"
      className="relative bg-charcoal-deep overflow-hidden pt-24 pb-32"
    >
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-gold/5 blur-[180px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-[220px]" />

      <Reveal>
        <div className="w-full overflow-hidden">
          <img
            src={heroBanner}
            alt="Live Projects Hero Banner"
            className="block w-full h-auto"
          />
        </div>
      </Reveal>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mt-24 mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[2px] w-20 rounded-full bg-gradient-to-r from-gold via-gold/70 to-transparent"></span>
            <span className="text-[12px] uppercase tracking-[0.45em] text-gold font-bold">
              Live Project Gallery
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-ivory">
            Active Construction Updates
          </h2>

          <div className="mt-6 mb-6 h-[3px] w-28 rounded-full bg-gradient-to-r from-gold via-gold/60 to-transparent"></div>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ivory/65">
            Explore real construction progress through our latest on-site
            photographs, showcasing every phase from foundation to finishing.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.name || i} delay={i * 90}>
              <article className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-gold/15 bg-charcoal-deep transition-all duration-700 hover:-translate-y-3 hover:border-gold/70 hover:shadow-[0_35px_90px_rgba(212,160,23,0.22)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute top-5 left-5 z-20">
                    <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-yellow-400 px-4 py-2 backdrop-blur-md shadow-[0_15px_35px_rgba(212,160,23,0.55)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_20px_45px_rgba(212,160,23,0.7)]">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"></span>
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                        {p.progress !== undefined ? `${p.progress}%` : "LIVE"}
                      </span>
                    </div>
                  </div>

                  <img
                    src={getImageUrl(p.img)}
                    alt={p.name}
                    className="h-full w-full object-cover transition-all duration-[1800ms] ease-out group-hover:scale-110 group-hover:brightness-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-700"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-all duration-500">
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold block mb-1">
                      {p.tag || "Active Site"}
                    </span>
                    <h4 className="font-display text-lg font-semibold text-ivory leading-tight line-clamp-2">
                      {p.name}
                    </h4>
                    {p.loc && (
                      <p className="text-xs text-ivory/70 mt-1 flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-gold" /> {p.loc}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="rounded-[32px] border border-gold/20 bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden">

  <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-10 lg:p-14">

    <div>

      <div className="text-gold text-sm uppercase tracking-[0.35em] font-semibold">
        WANT TO SEE MORE?
      </div>

      <h3 className="mt-4 font-display text-4xl md:text-5xl text-ivory">
        Schedule A Site Visit
      </h3>

      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ivory/65">
        Get in touch with us for live construction updates, project walkthroughs and personalized consultations.
      </p>

    </div>

          <a
            href="/contact"
            className="rounded-xl bg-gold px-10 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(212,160,23,0.4)]"
          >
            CONTACT US →
          </a>
        </div>
      </div>
    </div>
  </section>
);
}
