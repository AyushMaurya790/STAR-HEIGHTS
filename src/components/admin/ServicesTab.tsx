import React, { useEffect, useState } from "react";
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Check,
  Building,
  Home,
  DraftingCompass,
  HardHat,
  Truck,
  Paintbrush,
  Sparkles,
} from "lucide-react";
import { adminApi, ServiceItem } from "@/lib/api";

const ICON_OPTIONS = [
  "Building",
  "Home",
  "HardHat",
  "DraftingCompass",
  "Truck",
  "Paintbrush",
  "Wrench",
];

export function ServicesTab() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    icon: string;
    desc: string;
    points: string;
    category: string;
  }>({
    title: "",
    icon: "Building",
    desc: "",
    points: "",
    category: "General",
  });

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getServices();
      setServices(data);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      title: "",
      icon: "Building",
      desc: "",
      points: "Structural Integrity, Premium Materials, On-Time Handover",
      category: "General",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      icon: srv.icon || "Building",
      desc: srv.desc,
      points: Array.isArray(srv.points) ? srv.points.join(", ") : "",
      category: srv.category || "General",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.desc) {
      alert("Please fill in service title and description");
      return;
    }

    const payload: Partial<ServiceItem> = {
      title: formData.title,
      icon: formData.icon,
      desc: formData.desc,
      points: formData.points.split(",").map((p) => p.trim()).filter(Boolean),
      category: formData.category,
    };

    try {
      setSaving(true);
      if (editingService) {
        const updated = await adminApi.updateService(editingService.id, payload);
        setServices((prev) => prev.map((s) => (s.id === editingService.id ? updated : s)));
      } else {
        const created = await adminApi.createService(payload);
        setServices((prev) => [...prev, created]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save service:", err);
      alert("Failed to save service.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete service: "${title}"?`)) return;

    try {
      await adminApi.deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete service:", err);
      alert("Failed to delete service.");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
            Service Capabilities ({services.length})
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60">
            Define turnkey construction, architecture engineering, and interior capabilities
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-gold/20 transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center">
          <Wrench className="mx-auto h-12 w-12 text-ivory/20 mb-3" />
          <h3 className="text-sm font-bold text-ivory">No services found</h3>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-charcoal p-6 transition-all hover:border-gold/40 hover:shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold border border-gold/20">
                    <Building className="h-6 w-6" />
                  </div>
                  {srv.category && (
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold text-ivory/70 uppercase">
                      {srv.category}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-bold text-ivory">{srv.title}</h3>
                <p className="mt-2 text-xs text-ivory/60 leading-relaxed">{srv.desc}</p>

                {/* Feature Points */}
                {srv.points && srv.points.length > 0 && (
                  <div className="mt-4 space-y-1.5 border-t border-white/5 pt-4">
                    {srv.points.map((pt, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-ivory/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
                        <span className="line-clamp-1">{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-2 border-t border-white/5 pt-4">
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-ivory hover:bg-gold hover:text-black hover:border-gold transition-all"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(srv.id, srv.title)}
                  className="inline-flex items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl border border-gold/30 bg-charcoal p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-ivory">
                    {editingService ? "Edit Service" : "Add New Service"}
                  </h2>
                  <p className="text-xs text-ivory/50">Configure service offering details</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-ivory/60 hover:bg-white/10 hover:text-ivory"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Turnkey Construction"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Core Construction"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Icon Style
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  >
                    {ICON_OPTIONS.map((ico) => (
                      <option key={ico} value={ico} className="bg-charcoal">
                        {ico}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Comprehensive service description..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Key Feature Points (Comma-Separated)
                </label>
                <input
                  type="text"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                  placeholder="RCC Framework, Grade-A Steel, Milestone Tracking"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
                <p className="text-[11px] text-ivory/40 mt-1">Separate key bullet points with commas</p>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-ivory/80 hover:bg-white/10 hover:text-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-gold/20 hover:scale-105 transition-all disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                  <span>{saving ? "Saving..." : editingService ? "Update Service" : "Create Service"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
