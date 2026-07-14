import { SITE, NAV } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-charcoal-deep border-t border-gold/15 pt-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] pb-16">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-full ring-1 ring-gold/40">
                <img src={SITE.logo} alt="Star Heights" className="h-auto w-auto object-cover" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-base font-semibold text-ivory">STAR HEIGHTS</div>
                <div className="text-[10px] tracking-[0.3em] text-gold">CONSTRUCTION CO.</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65">
              A premier Delhi NCR construction house — building residential,
              commercial and apartment developments with precision since 1991.
            </p>
            <div className="mt-6 flex gap-3">
              {[
  {
    icon: Facebook,
    link: "#",
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/starheightsconstructions/",
  },
  {
    icon: Linkedin,
    link: "#",
  },
].map(({ icon: I, link }, i) => (
  <a
    key={i}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Social"
    className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-ivory/75 hover:bg-gold hover:text-charcoal-deep hover:border-gold transition-all"
  >
    <I className="h-4 w-4" />
  </a>
))}
            </div>
          </div>

          <div>
            <div className="eyebrow">Navigate</div>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-sm text-ivory/75 hover:text-gold">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow">Services</div>
            <ul className="mt-5 space-y-3 text-sm text-ivory/75">
              <li>Residential Construction</li>
              <li>Commercial Projects</li>
              <li>Apartment Development</li>
              <li>Turnkey Execution</li>
              <li>Interior Fit-Out</li>
            </ul>
          </div>

          <div>
            <div className="eyebrow">Reach Us</div>
            <ul className="mt-5 space-y-3 text-sm text-ivory/75">
              <li>{SITE.address}</li>
              {SITE.phones.map((p) => <li key={p}>{p}</li>)}
              <li>{SITE.email}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ivory/15 py-7 text-xs text-ivory/55">
          <div>© 2026 All rights reserved by digiwits</div>
          <div className="tracking-[0.2em]">{SITE.region}</div>
          <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-soft">
            BACK TO TOP <ArrowUp className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
