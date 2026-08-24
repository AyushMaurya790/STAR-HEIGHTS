import React, { useEffect, useState } from "react";
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Save,
  ShieldCheck,
  Zap,
  TrendingUp,
  X,
  Check,
  Sparkles,
} from "lucide-react";
import { adminApi, WhyUsData, StatCounter, PillarItem } from "@/lib/api";

export function WhyUsTab() {
  const [whyUs, setWhyUs] = useState<WhyUsData>({ counters: [], pillars: [] });
  const [loading, setLoading] = useState(true);
  const [savingCounters, setSavingCounters] = useState(false);

  // Counters State
  const [counters, setCounters] = useState<StatCounter[]>([]);

  // Pillar Modal
  const [isPillarModalOpen, setIsPillarModalOpen] = useState(false);
  const [editingPillar, setEditingPillar] = useState<PillarItem | null>(null);
  const [pillarForm, setPillarForm] = useState<Partial<PillarItem>>({
    title: "",
    desc: "",
    icon: "ShieldCheck",
  });
  const [savingPillar, setSavingPillar] = useState(false);

  const loadWhyUs = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getWhyUs();
      if (data) {
        setWhyUs(data);
        setCounters(
          data.counters && data.counters.length > 0
            ? data.counters
            : [
                { value: 25, suffix: "+", label: "Completed Milestones" },
                { value: 150, suffix: "+", label: "Corporate Clients" },
                { value: 12, suffix: "+", label: "Years in Construction" },
                { value: 45, suffix: "+", label: "Architects & Engineers" },
              ]
        );
      }
    } catch (err) {
      console.error("Failed to load why-us data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWhyUs();
  }, []);

  const handleSaveCounters = async () => {
    try {
      setSavingCounters(true);
      const updated = await adminApi.updateCounters(counters);
      setCounters(updated);
      alert("Homepage stat counters updated successfully!");
    } catch (err) {
      console.error("Failed to update counters:", err);
      alert("Failed to update counters.");
    } finally {
      setSavingCounters(false);
    }
  };

  const handleOpenPillarModal = (pillar?: PillarItem) => {
    if (pillar) {
      setEditingPillar(pillar);
      setPillarForm({
        title: pillar.title,
        desc: pillar.desc,
        icon: pillar.icon || "ShieldCheck",
      });
    } else {
      setEditingPillar(null);
      setPillarForm({
        title: "",
        desc: "",
        icon: "ShieldCheck",
      });
    }
    setIsPillarModalOpen(true);
  };

  const handleSavePillar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pillarForm.title || !pillarForm.desc) {
      alert("Please fill title and description");
      return;
    }

    try {
      setSavingPillar(true);
      if (editingPillar) {
        const updated = await adminApi.updatePillar(editingPillar.id, pillarForm);
        setWhyUs((prev) => ({
          ...prev,
          pillars: prev.pillars.map((p) => (p.id === editingPillar.id ? updated : p)),
        }));
      } else {
        const created = await adminApi.createPillar(pillarForm);
        setWhyUs((prev) => ({
          ...prev,
          pillars: [...prev.pillars, created],
        }));
      }
      setIsPillarModalOpen(false);
    } catch (err) {
      console.error("Failed to save pillar:", err);
      alert("Failed to save pillar.");
    } finally {
      setSavingPillar(false);
    }
  };

  const handleDeletePillar = async (id: string, title: string) => {
    if (!confirm(`Delete pillar: "${title}"?`)) return;

    try {
      await adminApi.deletePillar(id);
      setWhyUs((prev) => ({
        ...prev,
        pillars: prev.pillars.filter((p) => p.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete pillar:", err);
      alert("Failed to delete pillar.");
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Bar */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
          Trust Pillars & Homepage Counters
        </h1>
        <p className="text-xs sm:text-sm text-ivory/60">
          Configure live quantitative achievements and core architectural pillars
        </p>
      </div>

      {/* 1. Live Counters Section */}
      <div className="rounded-3xl border border-gold/30 bg-charcoal p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-ivory">
                Homepage Stat Counters
              </h2>
              <p className="text-xs text-ivory/50">Displayed in hero highlights and Why-Us page</p>
            </div>
          </div>

          <button
            onClick={handleSaveCounters}
            disabled={savingCounters}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-gold/20 hover:scale-105 transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{savingCounters ? "Saving..." : "Save Counters"}</span>
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {counters.map((c, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3"
            >
              <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
                Counter #{index + 1}
              </span>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] font-semibold text-ivory/50 block mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    value={c.value}
                    onChange={(e) => {
                      const updated = [...counters];
                      updated[index].value = Number(e.target.value);
                      setCounters(updated);
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-ivory focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="w-16">
                  <label className="text-[10px] font-semibold text-ivory/50 block mb-1">
                    Suffix
                  </label>
                  <input
                    type="text"
                    value={c.suffix}
                    onChange={(e) => {
                      const updated = [...counters];
                      updated[index].suffix = e.target.value;
                      setCounters(updated);
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-gold focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-ivory/50 block mb-1">
                  Metric Label
                </label>
                <input
                  type="text"
                  value={c.label}
                  onChange={(e) => {
                    const updated = [...counters];
                    updated[index].label = e.target.value;
                    setCounters(updated);
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Company Pillars Section */}
      <div className="rounded-3xl border border-white/10 bg-charcoal p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-ivory">
                Why Us Trust Pillars ({whyUs.pillars?.length || 0})
              </h2>
              <p className="text-xs text-ivory/50">Core architectural commitments and value propositions</p>
            </div>
          </div>

          <button
            onClick={() => handleOpenPillarModal()}
            className="inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-black transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Add Pillar</span>
          </button>
        </div>

        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        ) : whyUs.pillars?.length === 0 ? (
          <div className="text-center py-8 text-xs text-ivory/40">No pillars defined yet.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.pillars.map((p) => (
              <div
                key={p.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-gold/30 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold mb-3">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-ivory">{p.title}</h3>
                  <p className="mt-2 text-xs text-ivory/60 leading-relaxed">{p.desc}</p>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/5 pt-3">
                  <button
                    onClick={() => handleOpenPillarModal(p)}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-ivory hover:bg-gold hover:text-black transition-all"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeletePillar(p.id, p.title)}
                    className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-300 hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pillar Modal */}
      {isPillarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl border border-gold/30 bg-charcoal p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="font-display text-base font-bold text-ivory">
                {editingPillar ? "Edit Pillar" : "Add Trust Pillar"}
              </h3>
              <button
                onClick={() => setIsPillarModalOpen(false)}
                className="text-ivory/60 hover:text-ivory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSavePillar} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Pillar Title *
                </label>
                <input
                  type="text"
                  required
                  value={pillarForm.title}
                  onChange={(e) => setPillarForm({ ...pillarForm, title: e.target.value })}
                  placeholder="e.g. Uncompromising Quality"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={pillarForm.desc}
                  onChange={(e) => setPillarForm({ ...pillarForm, desc: e.target.value })}
                  placeholder="Explain why this pillar sets Star Heights apart..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsPillarModalOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-ivory/80 hover:bg-white/10 hover:text-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPillar}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-gold to-yellow-500 px-5 py-2 text-xs font-bold uppercase text-black hover:scale-105 transition-all disabled:opacity-50"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>{savingPillar ? "Saving..." : "Save Pillar"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
