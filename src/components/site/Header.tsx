import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/15 bg-charcoal-deep/80 backdrop-blur-xl py-3"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 lg:px-10">
        <a href="#home" className="flex items-center gap-3 group min-w-0">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/40">
            <img src={SITE.logo} alt="Star Heights" className="h-full w-full object-cover" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight min-w-0">
            <span className="font-display text-[15px] font-semibold tracking-wide text-foreground truncate">
              STAR HEIGHTS
            </span>
            <span className="text-[10px] tracking-[0.3em] text-gold/90">CONSTRUCTION CO.</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative px-4 py-2 text-sm text-foreground/80 hover:text-gold transition-colors after:absolute after:left-1/2 after:bottom-1 after:h-px after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all hover:after:w-6"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-medium tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-charcoal-deep hover:scale-105"
          >
            <Phone className="h-3.5 w-3.5" />
            CONSULT
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gold/15 bg-charcoal-deep/95 backdrop-blur-xl animate-fade-in">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm tracking-wide text-foreground/85 hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
