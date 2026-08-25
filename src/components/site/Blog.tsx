import { ArrowUpRight, Calendar, Clock, User, Link2, X, Share2, Sparkles, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";
import projCommercial from "@/assets/project-commercial.jpg";
import projResidential from "@/assets/project-residential.jpg";
import projApartment from "@/assets/project-apartment.jpg";
import { useEffect, useState } from "react";
import { clientApi, getImageUrl, type BlogItem } from "@/lib/api";

const DEFAULT_POSTS = [
  {
    id: "post-1",
    img: projCommercial,
    tag: "Industry Insights",
    date: "May 28, 2026",
    title: "Delhi NCR Real Estate Outlook 2026: Where Smart Capital Is Moving",
    readTime: "5 min read",
    author: "Star Heights Research",
    excerpt:
      "From Noida's commercial corridors to Gurugram's luxury enclaves — a deep dive into the trends shaping investor decisions this year.",
    content:
      "From Noida's commercial corridors to Gurugram's luxury enclaves, the commercial and premium residential landscape is witnessing unprecedented structural capital inflows. Engineering resilience and green certifications have become defining criteria for institutional investors.",
  },
  {
    id: "post-2",
    img: projResidential,
    tag: "Design & Architecture",
    date: "Apr 12, 2026",
    title: "Inside Modern Luxury: Materials That Define a Star Heights Home",
    readTime: "4 min read",
    author: "Architectural Studio",
    excerpt:
      "Italian marble, German engineering, handcrafted joinery — the details that elevate a residence from built to bespoke.",
    content:
      "Italian marble, German engineering, handcrafted joinery — the details that elevate a residence from built to bespoke. Our turnkey procurement network guarantees structural durability backed by our 10-year comprehensive warranty.",
  },
  {
    id: "post-3",
    img: projApartment,
    tag: "Sustainability",
    date: "Mar 03, 2026",
    readTime: "6 min read",
    author: "Sustainability Lead",
    title: "Building Green: How We're Engineering Net-Zero Apartments",
    excerpt:
      "Inside our approach to energy-efficient envelopes, water recycling and smart-grid ready high-rise communities.",
    content:
      "Inside our approach to energy-efficient envelopes, water recycling and smart-grid ready high-rise communities. Zero discharge rainwater harvesting and solar integrations provide long-term energy savings for multi-family residential towers.",
  },
];

export function Blog({ showAll = false }: { showAll?: boolean }) {
  const [posts, setPosts] = useState<any[]>(DEFAULT_POSTS);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  useEffect(() => {
    clientApi.getBlogs().then((data) => {
      if (data && data.length > 0) {
        const published = data.filter((b) => b.status !== "Draft");
        setPosts(published.length > 0 ? published : data);
      }
    });
  }, []);

  const displayPosts = showAll ? posts : posts.slice(0, 3);

  return (
    <section id="blog" className="relative bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Journal & Insights</span>
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((p) => (
            <article
              key={p.id || p.title}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/15 bg-card backdrop-blur-sm transition-all duration-500 hover:border-gold/50 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-deep/20">
                  <img
                    src={getImageUrl(p.img)}
                    alt={p.metaTitle || p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-charcoal-deep/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-charcoal-deep/80 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-gold backdrop-blur">
                    {(p.tag || "Insights").toUpperCase()}
                  </span>
                  {p.readTime && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-medium text-ivory/90 backdrop-blur">
                      <Clock className="h-3 w-3 text-gold" />
                      {p.readTime}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-[11px] tracking-wider text-foreground/55 pb-3 border-b border-foreground/10">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-gold" />
                      {p.date || "Recent"}
                    </span>
                    {p.author && (
                      <span className="inline-flex items-center gap-1.5 text-foreground/70 truncate max-w-[130px]">
                        <User className="h-3.5 w-3.5 text-gold/70" />
                        {p.author}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-foreground group-hover:text-gold transition-colors line-clamp-2">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-foreground/70 line-clamp-3">
                    {p.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(p)}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gold hover:gap-3 transition-all cursor-pointer"
                >
                  <span>READ FULL ARTICLE</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* FULL ARTICLE MODAL DIALOG */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gold/30 bg-ivory p-6 sm:p-10 shadow-2xl text-foreground">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 grid h-9 w-9 place-items-center rounded-full border border-foreground/20 text-foreground/70 hover:border-gold hover:text-gold transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header info */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full bg-gold/15 border border-gold/40 px-3 py-1 text-[10px] font-bold text-gold uppercase tracking-widest">
                {selectedArticle.tag || "Insights"}
              </span>
              {selectedArticle.readTime && (
                <span className="inline-flex items-center gap-1 text-xs text-foreground/60">
                  <Clock className="h-3 w-3 text-gold" />
                  {selectedArticle.readTime}
                </span>
              )}
              <span className="text-foreground/40">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-foreground/60">
                <Calendar className="h-3 w-3 text-gold" />
                {selectedArticle.date}
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="font-display text-2xl sm:text-4xl font-bold leading-tight text-foreground">
              {selectedArticle.h1 || selectedArticle.title}
            </h1>

            {selectedArticle.author && (
              <p className="mt-2 text-xs text-foreground/60 italic">
                Authored by {selectedArticle.author}
              </p>
            )}

            {/* Cover Image */}
            <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-gold/20 shadow-md">
              <img
                src={getImageUrl(selectedArticle.img)}
                alt={selectedArticle.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content Body */}
            {selectedArticle.content && selectedArticle.content.includes("<") ? (
              <div
                className="mt-8 text-sm sm:text-base leading-relaxed text-foreground/85 border-t border-foreground/10 pt-6 prose prose-gold max-w-none space-y-3"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
            ) : (
              <div className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-foreground/85 whitespace-pre-line border-t border-foreground/10 pt-6">
                {selectedArticle.content || selectedArticle.excerpt}
              </div>
            )}

            {/* Close footer button */}
            <div className="mt-8 pt-4 border-t border-foreground/10 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="rounded-full bg-charcoal-deep px-6 py-2.5 text-xs font-bold tracking-widest text-ivory hover:bg-gold hover:text-black transition-all"
              >
                CLOSE ARTICLE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
