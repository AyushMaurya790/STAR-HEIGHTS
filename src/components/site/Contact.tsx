import { MapPin, Phone, Mail, Send } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { useState } from "react";

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
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              Let's build something
              <br />
              <span className="gold-gradient-text italic">remarkable</span>.
            </h2>
            <p className="mt-6 text-foreground/65 leading-relaxed max-w-md">
              Schedule a consultation with our project advisory team. We respond
              to every enquiry within one business day.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-gold/30 text-gold">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/50">Headquarters</div>
                  <div className="mt-1 text-sm text-foreground/85">{SITE.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-gold/30 text-gold">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/50">Call</div>
                  {SITE.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block mt-1 text-sm text-foreground/85 hover:text-gold">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-gold/30 text-gold">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/50">Email</div>
                  <a href={`mailto:${SITE.email}`} className="block mt-1 text-sm text-foreground/85 hover:text-gold">
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-sm border border-gold/15 aspect-[16/9]">
              <iframe
                title="Star Heights HQ"
                src="https://www.google.com/maps?q=West+Vinod+Nagar+IP+Extension+Delhi&output=embed"
                className="h-full w-full grayscale contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-sm border border-gold/20 bg-card p-8 lg:p-10"
            >
              <h3 className="font-display text-2xl font-semibold">Project Enquiry</h3>
              <p className="mt-2 text-sm text-foreground/60">Share a few details and we'll be in touch.</p>

              <div className="mt-8 grid gap-5">
                {[
                  { l: "Full Name", t: "text", p: "John Doe" },
                  { l: "Email", t: "email", p: "john@company.com" },
                  { l: "Phone", t: "tel", p: "+91 98XXX XXXXX" },
                ].map((f) => (
                  <label key={f.l} className="block">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/55">{f.l}</span>
                    <input
                      required
                      type={f.t}
                      placeholder={f.p}
                      className="mt-2 w-full border-0 border-b border-foreground/15 bg-transparent py-3 text-foreground placeholder:text-foreground/30 focus:border-gold focus:outline-none transition-colors"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/55">Project Type</span>
                  <select className="mt-2 w-full border-0 border-b border-foreground/15 bg-transparent py-3 text-foreground focus:border-gold focus:outline-none">
                    <option className="bg-card">Residential</option>
                    <option className="bg-card">Commercial</option>
                    <option className="bg-card">Apartment Development</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/55">Message</span>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="mt-2 w-full resize-none border-0 border-b border-foreground/15 bg-transparent py-3 text-foreground placeholder:text-foreground/30 focus:border-gold focus:outline-none"
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
      </div>
    </section>
  );
}
