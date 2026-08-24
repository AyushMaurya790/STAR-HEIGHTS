import { useState } from "react";
import { Send, X, Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { clientApi } from "@/lib/api";

interface PopupFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PopupForm({ open, onOpenChange }: PopupFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Residential",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      <DialogContent className="max-w-xl border border-gold/30 bg-ivory p-0 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.35)] sm:rounded-sm overflow-hidden">
        {/* Gold top accent */}
        <div className="h-1 w-full bg-gold" />

        <div className="p-8 lg:p-10">
          <DialogHeader className="text-left mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold" />
              <span className="eyebrow text-[10px] tracking-[0.3em]">Project Enquiry</span>
            </div>
            <DialogTitle className="font-display text-3xl font-semibold text-foreground leading-tight">
              Let's build something{" "}
              <span className="gold-gradient-text italic">remarkable</span>.
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-foreground/65 leading-relaxed">
              Share a few details about your project and our advisory team will respond within one business day.
            </DialogDescription>
          </DialogHeader>

          {sent ? (
            <div className="py-12 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold mb-6">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-display text-xl font-semibold text-foreground">
                Enquiry Received
              </h4>
              <p className="mt-2 text-sm text-foreground/65">
                Thank you. Our team will reach out to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-rose-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 font-semibold">
                    Full Name *
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 font-semibold">
                    Email *
                  </span>
                  <input
                    required
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none transition-colors"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 font-semibold">
                    Phone
                  </span>
                  <input
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 font-semibold">
                    Project Type
                  </span>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="mt-2 w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground focus:border-gold focus:outline-none"
                  >
                    <option className="bg-ivory">Residential</option>
                    <option className="bg-ivory">Commercial</option>
                    <option className="bg-ivory">Apartment Development</option>
                    <option className="bg-ivory">Industrial</option>
                    <option className="bg-ivory">Renovation / Interior</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 font-semibold">
                  Message
                </span>
                <textarea
                  rows={3}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 w-full resize-none border-0 border-b border-foreground/20 bg-transparent py-3 text-foreground placeholder:text-foreground/35 focus:border-gold focus:outline-none"
                />
              </label>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-medium tracking-[0.25em] text-charcoal-deep transition-all hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_var(--gold)] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND ENQUIRY
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Close button override — match theme */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-foreground/70 transition-all hover:border-gold hover:text-gold"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
