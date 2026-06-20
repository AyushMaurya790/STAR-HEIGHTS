import { MapPin, Phone, Mail, Send, Clock, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { useState } from "react";

const WARRANTIES = [
  { icon: ShieldCheck, k: "10 Yrs", l: "Construction Warranty" },
  { icon: ShieldCheck, k: "2 Yrs", l: "Repair Warranty" },
  { icon: Clock, k: "1 Yr", l: "General Warranty" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Get In Touch</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-foreground">
              Let's build something
              <br />
              <span className="gold-gradient-text italic">remarkable</span>.
            </h2>
            <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">
              Schedule a consultation with our project advisory team. We respond
              to every enquiry within one business day.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-gold/40 bg-gold/10 text-gold">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/55">Headquarters</div>
                  <div className="mt-1 text-sm text-foreground/90">{SITE.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-gold/40 bg-gold/10 text-gold">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/55">Call</div>
                  {SITE.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block mt-1 text-sm text-foreground/90 hover:text-gold">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-gold/40 bg-gold/10 text-gold">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/55">Email</div>
                  <a href={`mailto:${SITE.email}`} className="block mt-1 text-sm text-foreground/90 hover:text-gold">
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Warranties strip */}
            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-gold/30 bg-gold/30">
              {WARRANTIES.map((w) => (
                <div key={w.l} className="bg-ivory p-4 text-center">
                  <div className="font-display text-lg font-semibold gold-gradient-text">{w.k}</div>
                  <div className="mt-1 text-[9px] tracking-[0.25em] uppercase text-foreground/60">{w.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-sm border border-foreground/10 bg-ivory p-8 lg:p-10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]"
            >
              <h3 className="font-display text-2xl font-semibold text-foreground">Project Enquiry</h3>
              <p className="mt-2 text-sm text-foreground/65">Share a few details and we'll be in touch.</p>

              <div className="mt-8 grid gap-5">
                {[
                  { l: "Full Name", t: "text", p: "John Doe" },
                  { l: "Email", t: "email", p: "john@company.com" },
                  { l: "Phone", t: "tel", p: "+91 98XXX XXXXX" },
                ].map((f) => (
                  <label key={f.l} className="block">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">{f.l}</span>
                    <input
                      required
                      type={f.t}
                      placeholder={f.p}
                      className="mt-2 w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none transition-colors"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">Project Type</span>
                  <select className="mt-2 w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground focus:border-gold focus:outline-none">
                    <option className="bg-ivory">Residential</option>
                    <option className="bg-ivory">Commercial</option>
                    <option className="bg-ivory">Apartment Development</option>
                    <option className="bg-ivory">Industrial</option>
                    <option className="bg-ivory">Renovation / Interior</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">Message</span>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="mt-2 w-full resize-none border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-xs font-medium tracking-[0.25em] text-charcoal-deep transition-all hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_var(--gold)]"
              >
                {sent ? "MESSAGE SENT" : "SEND ENQUIRY"}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>

        {/* Full-width premium map */}
        <Reveal delay={200}>
          <div className="mt-20 relative overflow-hidden rounded-sm border border-gold/30 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.3)]">
            <div className="aspect-[21/9] w-full">
              <iframe
                title="Star Heights HQ"
                src="https://www.google.com/maps?q=D+500+West+Vinod+Nagar+IP+Extension+Delhi+110092&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* Floating address card */}
            <div className="pointer-events-none absolute left-6 bottom-6 lg:left-10 lg:bottom-10 max-w-sm">
              <div className="glass rounded-sm p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-charcoal-deep">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="eyebrow">Visit Our Studio</span>
                </div>
                <div className="mt-4 font-display text-lg font-semibold text-foreground leading-snug">
                  Star Heights HQ
                </div>
                <div className="mt-1 text-xs text-foreground/70 leading-relaxed">{SITE.address}</div>
                <a
                  href="https://www.google.com/maps?q=D+500+West+Vinod+Nagar+IP+Extension+Delhi+110092"
                  target="_blank"
                  rel="noreferrer"
                  className="pointer-events-auto mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-gold border-b border-gold/40 pb-0.5 hover:border-gold"
                >
                  GET DIRECTIONS →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
