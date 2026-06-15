import type { ReactNode } from "react";
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
  return (
    <main className="bg-charcoal-deep text-foreground">
      <Header />
      <section className="relative pt-40 pb-16 lg:pt-48 lg:pb-24 bg-charcoal-deep overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          {eyebrow && (
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
          )}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] max-w-4xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-8 max-w-2xl text-base md:text-lg text-foreground/65 leading-relaxed">
              {intro}
            </p>
          )}
        </div>
      </section>
      {children}
      <Footer />
    </main>
  );
}
