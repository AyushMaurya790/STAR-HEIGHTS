import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { NAV, SITE } from "@/lib/site";

interface Props {
  open: boolean;
  onClose: () => void;
  onConsult: () => void;
}

export function FullscreenMenu({ open, onClose, onConsult }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in">
      <div className="absolute inset-0 bg-charcoal-deep/97 backdrop-blur-2xl" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(212,175,55,0.6) 0, transparent 40%), radial-gradient(circle at 80% 80%, rgba(212,175,55,0.4) 0, transparent 45%)",
        }}
      />

      <div className="relative h-full w-full overflow-y-auto">
        <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 py-6 lg:px-10 lg:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-full ring-1 ring-gold/40">
                <img src={SITE.logo} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-display text-[15px] font-semibold tracking-wide text-foreground">
                  STAR HEIGHTS
                </span>
                <span className="text-[10px] tracking-[0.3em] text-gold/90">CONSTRUCTION CO.</span>
              </div>
            </div>
            <button
              aria-label="Close menu"
              onClick={onClose}
              className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 text-gold transition-all hover:bg-gold hover:text-charcoal-deep hover:rotate-90"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-12 grid flex-1 gap-12 lg:mt-20 lg:grid-cols-[1.4fr_1fr]">
            <nav className="flex flex-col">
              <span className="mb-6 text-[10px] tracking-[0.4em] text-gold/70">EXPLORE</span>
              <ul className="flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <li key={n.to} className="overflow-hidden">
                    <Link
                      to={n.to}
                      onClick={onClose}
                      activeOptions={{ exact: true }}
                      className="group flex items-center justify-between border-b border-white/5 py-4 transition-all hover:border-gold/30 hover:pl-3"
                      style={{ animation: `fade-in 0.5s ease-out ${i * 60}ms both` }}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[11px] text-gold/60">
                          0{i + 1}
                        </span>
                        <span className="font-display text-3xl tracking-tight text-foreground transition-colors group-hover:text-gold lg:text-5xl">
                          {n.label}
                        </span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-foreground/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <aside className="flex flex-col gap-8">
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
                <span className="text-[10px] tracking-[0.4em] text-gold/70">SPEAK WITH A</span>
                <h3 className="mt-2 font-display text-3xl text-foreground">Consultant</h3>
                <p className="mt-3 text-sm text-foreground/70">
                  Get expert guidance on your next project. Schedule a free consultation
                  with our team today.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onConsult();
                  }}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-medium tracking-[0.2em] text-charcoal-deep transition-all hover:scale-[1.02]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  BOOK A CONSULTATION
                </button>
              </div>

              <div className="space-y-4 text-sm text-foreground/75">
                <span className="text-[10px] tracking-[0.4em] text-gold/70">CONTACT</span>
                <a href={`tel:${SITE.phones[0]}`} className="flex items-start gap-3 hover:text-gold">
                  <Phone className="mt-0.5 h-4 w-4 text-gold/80" />
                  <span>{SITE.phones.join(" · ")}</span>
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 hover:text-gold">
                  <Mail className="mt-0.5 h-4 w-4 text-gold/80" />
                  <span>{SITE.email}</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-gold/80" />
                  <span>{SITE.address}</span>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/5 pt-6 text-[11px] tracking-[0.2em] text-foreground/40 sm:flex-row">
            <span>EST. {SITE.established}</span>
            <span>{SITE.region}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
