import { useState, useEffect } from "react";
import { Send, X, Loader2, CheckCircle2, Sparkles, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { clientApi } from "@/lib/api";

const SERVICE_PROJECT_TYPES = [
  "Residential Construction",
  "Commercial Projects",
  "Apartment Development",
  "Industrial Construction",
  "Renovation & Interiors",
  "General Architecture & Turnkey Enquiry",
];

// Helper to normalize any incoming service title to valid project type option
function mapToProjectType(serviceTitle?: string): string {
  if (!serviceTitle) return "Residential Construction";
  const lower = serviceTitle.toLowerCase();
  if (lower.includes("residen")) return "Residential Construction";
  if (lower.includes("commerc")) return "Commercial Projects";
  if (lower.includes("apart")) return "Apartment Development";
  if (lower.includes("indust")) return "Industrial Construction";
  if (lower.includes("renov") || lower.includes("interior")) return "Renovation & Interiors";
  return serviceTitle;
}

interface PopupFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialServiceTitle?: string;
  initialProjectType?: string;
}

export function PopupForm({
  open,
  onOpenChange,
  initialServiceTitle,
  initialProjectType,
}: PopupFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Residential Construction",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Auto-sync initial service / project type when dialog opens or props change
  useEffect(() => {
    if (open) {
      const selectedType = initialProjectType || mapToProjectType(initialServiceTitle);
      setFormData((prev) => ({
        ...prev,
        projectType: selectedType,
        message:
          prev.message ||
          (initialServiceTitle
            ? `I would like to enquire about ${initialServiceTitle} with Star Heights.`
            : ""),
      }));
      setSent(false);
      setErrorMsg("");
    }
  }, [open, initialServiceTitle, initialProjectType]);

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
        projectType: initialProjectType || mapToProjectType(initialServiceTitle),
        message: "",
      });
      setTimeout(() => {
        setSent(false);
        onOpenChange(false);
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border border-gold/30 bg-ivory p-0 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.35)] sm:rounded-sm overflow-hidden animate-fadeIn">
        {/* Gold top accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-gold via-yellow-500 to-gold" />

        <div className="p-8 lg:p-10">
          <DialogHeader className="text-left mb-6">
            {initialServiceTitle ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-[10px] font-bold tracking-widest text-gold uppercase mb-3">
                <Sparkles className="h-3 w-3" />
                <span>Service: {initialServiceTitle}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-8 bg-gold" />
                <span className="eyebrow text-[10px] tracking-[0.3em]">Project Enquiry</span>
              </div>
            )}

            <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
              {initialServiceTitle ? (
                <>
                  Enquire about{" "}
                  <span className="gold-gradient-text italic">{initialServiceTitle}</span>
                </>
              ) : (
                <>
                  Let's build something{" "}
                  <span className="gold-gradient-text italic">remarkable</span>.
                </>
              )}
            </DialogTitle>
            <DialogDescription className="mt-2 text-xs sm:text-sm text-foreground/65 leading-relaxed">
              {initialServiceTitle
                ? `Share your requirements for ${initialServiceTitle} and our principal engineers will contact you with feasibility and BOQ estimates.`
                : "Share a few details about your project and our advisory team will respond within one business day."}
            </DialogDescription>
          </DialogHeader>

          {sent ? (
            <div className="py-10 text-center animate-fadeIn">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold mb-5 shadow-lg shadow-gold/20">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-display text-xl font-semibold text-foreground">
                Enquiry Received for {initialServiceTitle || formData.projectType}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-foreground/65 max-w-sm mx-auto">
                Thank you! Our advisory team will reach out to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {errorMsg && (
                <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-rose-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/70 font-bold">
                    Full Name *
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 w-full border-0 border-b border-foreground/20 bg-transparent py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/70 font-bold">
                    Email Address *
                  </span>
                  <input
                    required
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1.5 w-full border-0 border-b border-foreground/20 bg-transparent py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none transition-colors"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/70 font-bold">
                    Phone Number *
                  </span>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1.5 w-full border-0 border-b border-foreground/20 bg-transparent py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/70 font-bold">
                    Practice / Service *
                  </span>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="mt-1.5 w-full border-0 border-b border-foreground/20 bg-transparent py-2.5 text-xs sm:text-sm text-foreground focus:border-gold focus:outline-none"
                  >
                    {SERVICE_PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-ivory text-black py-1">
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/70 font-bold">
                  Project Details / Message
                </span>
                <textarea
                  rows={3}
                  placeholder={`Tell us about your ${
                    initialServiceTitle || "project"
                  } (location, approximate area, timeline)...`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1.5 w-full resize-none border-0 border-b border-foreground/20 bg-transparent py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none leading-relaxed"
                />
              </label>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-3.5 text-xs font-bold tracking-[0.25em] text-charcoal-deep transition-all hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_var(--gold)] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      <span>SUBMIT SERVICE ENQUIRY</span>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Close button override */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-foreground/70 transition-all hover:border-gold hover:text-gold hover:scale-105"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
