import { MapPin, Phone, Mail, Send, Clock, ShieldCheck, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { useState, useEffect } from "react";
import { clientApi } from "@/lib/api";

const WARRANTIES = [
  { icon: ShieldCheck, k: "10 Yrs", l: "Construction Warranty" },
  { icon: ShieldCheck, k: "2 Yrs", l: "Repair Warranty" },
  { icon: Clock, k: "1 Yr", l: "General Warranty" },
];

const CONTACT_PROJECT_TYPES = [
  "Residential Construction",
  "Commercial Projects",
  "Apartment Development",
  "Industrial Construction",
  "Renovation & Interiors",
  "General Architecture & Turnkey Enquiry",
];

function normalizeServiceType(raw?: string): string {
  if (!raw) return "Residential Construction";
  const lower = raw.toLowerCase();
  if (lower.includes("residen")) return "Residential Construction";
  if (lower.includes("commerc")) return "Commercial Projects";
  if (lower.includes("apart")) return "Apartment Development";
  if (lower.includes("indust")) return "Industrial Construction";
  if (lower.includes("renov") || lower.includes("interior")) return "Renovation & Interiors";
  return raw;
}

export function Contact({ defaultProjectType }: { defaultProjectType?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: normalizeServiceType(defaultProjectType),
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service") || params.get("type");
      if (serviceParam) {
        const resolved = normalizeServiceType(serviceParam);
        setFormData((prev) => ({
          ...prev,
          projectType: resolved,
          message: prev.message || `I am interested in consulting regarding ${serviceParam}.`,
        }));
      } else if (defaultProjectType) {
        setFormData((prev) => ({
          ...prev,
          projectType: normalizeServiceType(defaultProjectType),
        }));
      }
    }
  }, [defaultProjectType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await clientApi.submitContact(formData);
      setSent(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "Residential",
        message: "",
      });
      setTimeout(() => setSent(false), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
  id="contact"
  className="relative overflow-hidden py-28 lg:py-40"
  style={{
    background:
      "radial-gradient(circle at top, #3a3a3a 0%, #262626 45%, #1a1a1a 100%)",
  }}
>
  {/* Premium Background */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">

  {/* Golden Grid */}
  <div
    className="absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(212,175,55,.18) 1px, transparent 1px),
        linear-gradient(90deg, rgba(212,175,55,.18) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px",
    }}
  />

  {/* Left Building */}
  <svg
    className="absolute bottom-0 left-0 w-[420px] opacity-[0.08]"
    viewBox="0 0 420 260"
    fill="none"
  >
    <path
      d="M20 260V120H80V60H150V150H220V90H300V180H380V260"
      stroke="#D4AF37"
      strokeWidth="2"
    />
  </svg>

  {/* Right Building */}
  <svg
    className="absolute bottom-0 right-0 w-[500px] opacity-[0.08]"
    viewBox="0 0 500 260"
    fill="none"
  >
    <path
      d="M20 260V150H90V80H170V170H240V60H320V140H390V200H470V260"
      stroke="#D4AF37"
      strokeWidth="2"
    />
  </svg>

  <span className="absolute top-20 left-[15%] text-gold opacity-25">✦</span>
  <span className="absolute top-36 right-[18%] text-gold opacity-25">✧</span>
  <span className="absolute bottom-44 left-[35%] text-gold opacity-20">✦</span>

</div>
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Get In Touch</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
              Let's build something
              <br />
              <span className="gold-gradient-text italic">remarkable</span>.
            </h2>
            <p className="mt-6 text-white/75 leading-relaxed max-w-md">
              Schedule a consultation with our project advisory team. We respond
              to every enquiry within one business day.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-gold/70 bg-gradient-to-br from-gold/20 to-transparent text-gold shadow-[0_0_18px_rgba(212,175,55,0.18)] backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] hover:border-gold hover:scale-110">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white font-semibold">Headquarters</div>
                  <div className="mt-1 text-sm text-white/85">{SITE.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-gold/70 bg-gradient-to-br from-gold/20 to-transparent text-gold shadow-[0_0_18px_rgba(212,175,55,0.18)] backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] hover:border-gold hover:scale-110">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white font-semibold">Call</div>
                  {SITE.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block mt-1 text-sm text-white/85 hover:text-gold">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-gold/70 bg-gradient-to-br from-gold/20 to-transparent text-gold shadow-[0_0_18px_rgba(212,175,55,0.18)] backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] hover:border-gold hover:scale-110">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white font-semibold">Email</div>
                  <a href={`mailto:${SITE.email}`} className="block mt-1 text-sm text-white/85 hover:text-gold">
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
              onSubmit={handleSubmit}
              className="rounded-sm border border-foreground/10 bg-ivory p-8 lg:p-10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]"
            >
              <h3 className="font-display text-2xl font-semibold bg-gradient-to-r from-[#C98600] via-[#E0A51A] to-[#F3C857] bg-clip-text text-transparent">
                Project Enquiry
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Share a few details and we'll be in touch.
              </p>

              {sent && (
                <div className="mt-6 flex items-center gap-3 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-xs font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span>Thank you! Your enquiry has been received. Our advisory team will contact you within 24 hours.</span>
                </div>
              )}

              {errorMsg && (
                <div className="mt-6 rounded-lg bg-rose-50 border border-rose-200 p-4 text-rose-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="mt-8 grid gap-5">
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-black/70 font-semibold">Full Name *</span>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none transition-colors"
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-black/70 font-semibold">Email *</span>
                    <input
                      required
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-black/70 font-semibold">Phone</span>
                    <input
                      type="tel"
                      placeholder="+91 98XXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2 w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none transition-colors"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-black/70 font-semibold">
                    Practice / Service
                  </span>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="mt-2 w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground focus:border-gold focus:outline-none text-xs sm:text-sm"
                  >
                    {CONTACT_PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-ivory text-black">
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-black/70 font-semibold">Message</span>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 w-full resize-none border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-xs font-medium tracking-[0.25em] text-charcoal-deep transition-all hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_var(--gold)] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    SENDING...
                  </>
                ) : sent ? (
                  "MESSAGE SENT"
                ) : (
                  <>
                    SEND ENQUIRY
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>

        {/* Full-width premium map */}
        <Reveal delay={200}>
          <div
  className="relative mt-20 overflow-hidden border-y border-gold/20 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.3)]"
  style={{
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
  }}
>
            <div className="h-[650px] w-full">
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
