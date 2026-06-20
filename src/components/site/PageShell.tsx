import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({
  title,
  eyebrow,
  intro,
  children,
}: {
  title: ReactNode;
  eyebrow?: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const crumb = pathname.replace(/^\//, "").replace(/-/g, " ") || "home";

  return (
    <main className="bg-background text-foreground">
      <Header />

      {/* Cinematic hero */}
      <section className="relative pt-36 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-charcoal-deep text-ivory">
        {/* Layered backgrounds */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)",
          }}
        />
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(closest-side, var(--gold), transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(closest-side, var(--gold-soft), transparent)" }}
        />
        {/* Diagonal frame line */}
        <div className="pointer-events-none absolute inset-y-0 right-[8%] w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden lg:block" />
        <div className="pointer-events-none absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-10 text-xs uppercase tracking-[0.22em] text-ivory/55">
            <Link to="/" className="inline-flex items-center gap-1.5 hover:text-gold transition-colors">
              <Home className="h-3 w-3" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-gold/60" />
            <span className="text-ivory/85">{crumb}</span>
          </nav>

          {eyebrow && (
            <div className="flex items-center gap-3 mb-7 animate-fade-in">
              <span className="h-px w-12 bg-gold" />
              <span className="text-xs uppercase tracking-[0.32em] text-gold font-medium">
                {eyebrow}
              </span>
              <span className="h-px w-6 bg-gold/40" />
            </div>
          )}

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-semibold leading-[1.02] max-w-5xl tracking-tight">
            {title}
          </h1>

          {intro && (
            <div className="mt-10 flex items-start gap-5 max-w-2xl">
              <span className="mt-3 h-px w-10 shrink-0 bg-gold/50" />
              <p className="text-base md:text-lg text-ivory/70 leading-relaxed">
                {intro}
              </p>
            </div>
          )}

          {/* Decorative corner ticks */}
          <div className="mt-16 flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] text-ivory/40">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              Est. 2002
            </span>
            <span className="h-px flex-1 bg-ivory/10 max-w-[240px]" />
            <span>Delhi NCR</span>
          </div>
        </div>

        {/* Bottom transition into cream content */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Section divider band */}
      <div className="relative bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 -mt-6 relative z-10">
          <div className="h-12 rounded-sm border border-gold/25 bg-ivory/80 backdrop-blur-sm shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] flex items-center justify-between px-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/55">
              Star Heights · Constructions Co.
            </span>
            <span className="hidden sm:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-foreground/55">
              <span className="h-1 w-1 rounded-full bg-gold" />
              Premium Build Studio
            </span>
          </div>
        </div>
      </div>

      {children}
      <Footer />
    </main>
  );
}
