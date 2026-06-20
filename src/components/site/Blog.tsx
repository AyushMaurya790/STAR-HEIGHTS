import { ArrowUpRight, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import projCommercial from "@/assets/project-commercial.jpg";
import projResidential from "@/assets/project-residential.jpg";
import projApartment from "@/assets/project-apartment.jpg";

const POSTS = [
  {
    img: projCommercial,
    tag: "Industry Insights",
    date: "May 28, 2026",
    title: "Delhi NCR Real Estate Outlook 2026: Where Smart Capital Is Moving",
    excerpt:
      "From Noida's commercial corridors to Gurugram's luxury enclaves — a deep dive into the trends shaping investor decisions this year.",
  },
  {
    img: projResidential,
    tag: "Design & Architecture",
    date: "Apr 12, 2026",
    title: "Inside Modern Luxury: Materials That Define a Star Heights Home",
    excerpt:
      "Italian marble, German engineering, handcrafted joinery — the details that elevate a residence from built to bespoke.",
  },
  {
    img: projApartment,
    tag: "Sustainability",
    date: "Mar 03, 2026",
    title: "Building Green: How We're Engineering Net-Zero Apartments",
    excerpt:
      "Inside our approach to energy-efficient envelopes, water recycling and smart-grid ready high-rise communities.",
  },
];

export function Blog({ showAll = false, bare = false }: { showAll?: boolean; bare?: boolean }) {
  return (
    <section id="blog" className="relative bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {!bare && (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Journal</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] max-w-2xl">
              Insights from the <span className="gold-gradient-text italic">field</span>.
            </h2>
          </div>
          {!showAll && (
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] text-gold hover:text-foreground transition-colors"
            >
              VIEW ALL ARTICLES
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-gold/10 bg-card backdrop-blur-sm transition-all hover:border-gold/40 hover:-translate-y-1"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/30 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-charcoal-deep/70 px-3 py-1 text-[10px] tracking-[0.2em] text-gold backdrop-blur">
                  {p.tag.toUpperCase()}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-foreground/50">
                  <Calendar className="h-3 w-3" />
                  {p.date.toUpperCase()}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-foreground group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{p.excerpt}</p>
                <Link
                  to="/blog"
                  className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.25em] text-gold"
                >
                  READ MORE
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
