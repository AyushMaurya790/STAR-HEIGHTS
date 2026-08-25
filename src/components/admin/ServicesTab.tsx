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
  Search,
  Globe,
  Share2,
  ChevronDown,
  ChevronUp,
  Monitor,
  Smartphone,
  Tag,
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
  "Sparkles",
];

export function ServicesTab() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(true);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    h1: string;
    slug: string;
    icon: string;
    desc: string;
    points: string;
    category: string;
    // SEO
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  }>({
    title: "",
    h1: "",
    slug: "",
    icon: "Building",
    desc: "",
    points: "",
    category: "General",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
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

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      title: val,
      h1: prev.h1 || val,
      slug: prev.slug ? prev.slug : autoSlug,
      metaTitle: prev.metaTitle || (val ? `${val} | Star Heights Constructions` : ""),
      ogTitle: prev.ogTitle || val,
    }));
  };

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      title: "",
      h1: "",
      slug: "",
      icon: "Building",
      desc: "",
      points: "Structural Integrity, Premium Materials, Turnkey Handover",
      category: "General",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      canonicalUrl: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
    });
    setSeoExpanded(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      h1: srv.h1 || srv.title,
      slug:
        srv.slug ||
        srv.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      icon: srv.icon || "Building",
      desc: srv.desc,
      points: Array.isArray(srv.points) ? srv.points.join(", ") : "",
      category: srv.category || "General",
      metaTitle: srv.metaTitle || `${srv.title} | Star Heights Constructions`,
      metaDescription: srv.metaDescription || srv.desc,
      keywords: srv.keywords || "",
      canonicalUrl: srv.canonicalUrl || "",
      ogTitle: srv.ogTitle || srv.title,
      ogDescription: srv.ogDescription || srv.desc,
      ogImage: srv.ogImage || "",
    });
    setSeoExpanded(true);
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
      h1: formData.h1 || formData.title,
      slug:
        formData.slug ||
        formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      icon: formData.icon,
      desc: formData.desc,
      points: formData.points.split(",").map((p) => p.trim()).filter(Boolean),
      category: formData.category,
      // SEO
      metaTitle: formData.metaTitle || formData.title,
      metaDescription: formData.metaDescription || formData.desc,
      keywords: formData.keywords,
      canonicalUrl: formData.canonicalUrl,
      ogTitle: formData.ogTitle || formData.title,
      ogDescription: formData.ogDescription || formData.desc,
      ogImage: formData.ogImage,
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
      {/* Header & Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
            Capabilities & Services ({services.length})
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60">
            Manage practice capabilities with dedicated in-page SEO meta, custom slugs, and live Google preview
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-gold to-yellow-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-gold/20 hover:scale-105 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-3xl border border-white/5 bg-white/[0.02]">
          <p className="text-sm text-ivory/40">Loading capabilities...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
          <Wrench className="h-10 w-10 text-gold/40 mb-3" />
          <p className="text-sm font-semibold text-ivory">No services found</p>
          <p className="text-xs text-ivory/50 mt-1 max-w-sm">
            Click "Add New Service" to create a practice capability with automated SEO meta and search slugs.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-gold/40 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-gold/5"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold border border-gold/30 group-hover:scale-110 transition-transform">
                    <Building className="h-6 w-6" />
                  </div>
                  <div className="flex flex-wrap gap-1 items-center justify-end">
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-ivory/80 uppercase">
                      {srv.category || "General"}
                    </span>
                    {srv.slug && (
                      <span className="rounded-full bg-black/60 border border-white/15 px-2 py-0.5 text-[9px] font-mono text-gold/80">
                        /{srv.slug}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-ivory group-hover:text-gold transition-colors">
                  {srv.title}
                </h3>
                {srv.h1 && srv.h1 !== srv.title && (
                  <p className="mt-1 text-[11px] font-mono text-gold/70 truncate">H1: {srv.h1}</p>
                )}
                <p className="mt-2 text-xs leading-relaxed text-ivory/60 line-clamp-3">
                  {srv.desc}
                </p>

                {/* Key Points */}
                {srv.points && srv.points.length > 0 && (
                  <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                    {srv.points.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-ivory/80">
                        <CheckCircle2 className="h-3 w-3 text-gold shrink-0" />
                        <span className="truncate">{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Meta Indicators */}
              <div className="mt-5 border-t border-white/5 pt-3 flex items-center justify-between text-[10px] text-ivory/50">
                <span className="truncate max-w-[130px]">
                  {srv.metaTitle ? "SEO Configured" : "Auto Meta"}
                </span>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-ivory/70 uppercase">
                    Active
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/5 pt-3">
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-ivory/80 hover:border-gold/40 hover:bg-gold/10 hover:text-gold transition-all"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Edit & SEO</span>
                </button>
                <button
                  onClick={() => handleDelete(srv.id, srv.title)}
                  className="rounded-xl border border-white/10 bg-white/5 p-1.5 text-ivory/60 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Service Modal with In-Service SEO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-gold/30 bg-charcoal p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 sticky top-0 bg-charcoal/95 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10 text-gold border border-gold/30">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-ivory">
                    {editingService ? "Edit Service & SEO Meta" : "Add Service & Configure SEO"}
                  </h2>
                  <p className="text-xs text-ivory/50">
                    Define practice capabilities, key deliverables, and search meta tags
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-ivory/60 hover:bg-white/10 hover:text-ivory"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* SECTION 1: CORE SERVICE DETAILS */}
              <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
                  <Wrench className="h-4 w-4" />
                  <span>1. Service Core Capabilities</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Residential Construction"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Custom H1 Heading</span>
                      <span className="text-[10px] text-gold/80 font-normal">Primary SEO Heading</span>
                    </label>
                    <input
                      type="text"
                      value={formData.h1}
                      onChange={(e) => setFormData({ ...formData, h1: e.target.value })}
                      placeholder="e.g. Bespoke Villa & Independent Home Construction"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                      Icon Name
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-charcoal px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                    >
                      {ICON_OPTIONS.map((ico) => (
                        <option key={ico} value={ico}>
                          {ico}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                      Category Tag
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Turnkey, Premium, Civil"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Service Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.desc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        desc: e.target.value,
                        metaDescription: formData.metaDescription || e.target.value.slice(0, 155),
                      })
                    }
                    placeholder="Bespoke villas, premium homes and independent residences built to exacting standards..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Key Practice Points / Highlights (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                    placeholder="Custom Villas, Independent Floors, Luxury Interiors"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* SECTION 2: IN-SERVICE SEO, SLUG & SOCIAL META */}
              <div className="rounded-2xl border border-gold/30 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 shadow-lg">
                <button
                  type="button"
                  onClick={() => setSeoExpanded(!seoExpanded)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/20 text-gold">
                      <Search className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-gold uppercase tracking-wider">
                        2. SEO Meta Tags, Slug & Social Sharing
                      </h4>
                      <p className="text-[10px] text-ivory/50">
                        Custom URL anchor slug, Google SERP meta & canonical source
                      </p>
                    </div>
                  </div>
                  {seoExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gold" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gold" />
                  )}
                </button>

                {seoExpanded && (
                  <div className="mt-5 space-y-5 border-t border-white/10 pt-5">
                    {/* Slug & Canonical */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Service URL Slug *</span>
                          <span className="text-[10px] text-ivory/40">/services#{formData.slug || "custom-slug"}</span>
                        </label>
                        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-1">
                          <span className="text-[11px] text-gold/70 font-mono">/services#</span>
                          <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                slug: e.target.value
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/(^-|-$)/g, ""),
                              })
                            }
                            placeholder="residential-construction"
                            className="flex-1 bg-transparent py-1.5 text-xs text-ivory focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Canonical URL</span>
                          <span className="text-[10px] text-ivory/40">rel="canonical"</span>
                        </label>
                        <input
                          type="url"
                          value={formData.canonicalUrl}
                          onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                          placeholder="https://starheights.in/services"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    {/* Meta Title & Description */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-ivory uppercase tracking-wider">
                            SEO Meta Title Tag
                          </label>
                          <span
                            className={`text-[10px] font-mono ${
                              (formData.metaTitle?.length || 0) > 60 ? "text-amber-400" : "text-emerald-400"
                            }`}
                          >
                            {formData.metaTitle?.length || 0} / 60 chars
                          </span>
                        </div>
                        <input
                          type="text"
                          value={formData.metaTitle}
                          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                          placeholder="e.g. Residential Construction Services in Delhi NCR | Star Heights"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-ivory uppercase tracking-wider">
                            SEO Meta Description Tag
                          </label>
                          <span
                            className={`text-[10px] font-mono ${
                              (formData.metaDescription?.length || 0) > 160 ? "text-amber-400" : "text-emerald-400"
                            }`}
                          >
                            {formData.metaDescription?.length || 0} / 160 chars
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          value={formData.metaDescription}
                          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                          placeholder="Compelling 150-160 character description designed for Google ranking..."
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Focus Keywords */}
                    <div>
                      <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                        Focus Keywords & Tags
                      </label>
                      <input
                        type="text"
                        value={formData.keywords}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                        placeholder="villa construction, turnkey builder, Delhi NCR"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                      />
                    </div>

                    {/* OpenGraph Social Meta */}
                    <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-white/5 bg-black/20 p-4">
                      <div>
                        <label className="text-[10px] font-bold text-ivory/70 uppercase tracking-wider mb-1 block">
                          OG Social Title
                        </label>
                        <input
                          type="text"
                          value={formData.ogTitle}
                          onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                          placeholder={formData.title || "Service Title"}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-ivory/70 uppercase tracking-wider mb-1 block">
                          OG Social Image URL
                        </label>
                        <input
                          type="text"
                          value={formData.ogImage}
                          onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* LIVE GOOGLE SERP PREVIEW */}
                    <div className="rounded-xl border border-white/10 bg-[#1f1f1f] p-4 sm:p-5 text-left font-sans">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Search className="h-3.5 w-3.5 text-gold" />
                          <span className="text-[11px] font-bold uppercase tracking-wider text-ivory/80">
                            Live Google Search Preview
                          </span>
                        </div>
                        <div className="flex items-center gap-1 rounded-lg bg-black/40 p-0.5">
                          <button
                            type="button"
                            onClick={() => setPreviewDevice("desktop")}
                            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                              previewDevice === "desktop" ? "bg-gold text-black font-bold" : "text-ivory/60"
                            }`}
                          >
                            <Monitor className="h-3 w-3" />
                            Desktop
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewDevice("mobile")}
                            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                              previewDevice === "mobile" ? "bg-gold text-black font-bold" : "text-ivory/60"
                            }`}
                          >
                            <Smartphone className="h-3 w-3" />
                            Mobile
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-[#bdc1c6]">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold text-[10px] font-bold">
                            SH
                          </div>
                          <div className="truncate text-[12px]">
                            https://starheights.in › services ›{" "}
                            <span className="text-[#8ab4f8]">{formData.slug || "residential-construction"}</span>
                          </div>
                        </div>

                        <h4 className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer line-clamp-1 leading-snug">
                          {formData.metaTitle || formData.title || "Star Heights Capability"}
                        </h4>

                        <p className="text-xs text-[#bdc1c6] line-clamp-2 leading-relaxed">
                          {formData.metaDescription ||
                            formData.desc ||
                            "Star Heights Construction Company provides industry-leading turnkey solutions with 35+ years of engineering excellence."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4 sticky bottom-0 bg-charcoal/95 backdrop-blur-sm">
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
                  <span>{saving ? "Saving..." : editingService ? "Update Service & SEO" : "Create Service & SEO"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
