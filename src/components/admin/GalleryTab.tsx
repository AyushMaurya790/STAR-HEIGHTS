import React, { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Sparkles,
  X,
  Check,
  Eye,
  Filter,
} from "lucide-react";
import { adminApi, GalleryItem, getImageUrl } from "@/lib/api";

const CATEGORIES = [
  "All",
  "Exterior",
  "Interior",
  "Structural",
  "Under Construction",
  "Commercial",
  "Residential",
];

export function GalleryTab() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Lightbox
  const [previewImage, setPreviewImage] = useState<GalleryItem | null>(null);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    title: "",
    category: "Exterior",
    project: "Star Heights Architecture",
    aspect: "landscape",
    img: "",
    featured: false,
  });

  const loadGallery = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getGallery();
      setGallery(data);
    } catch (err) {
      console.error("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Exterior",
      project: "Star Heights Architecture",
      aspect: "landscape",
      img: "",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      project: item.project || "Star Heights Architecture",
      aspect: item.aspect || "landscape",
      img: item.img,
      featured: Boolean(item.featured),
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await adminApi.uploadImage(file);
      if (res && res.url) {
        setFormData((prev) => ({ ...prev, img: res.url }));
      }
    } catch (err) {
      console.error("Gallery upload error:", err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.img) {
      alert("Please provide an image URL or upload an image file.");
      return;
    }

    try {
      setSaving(true);
      if (editingItem) {
        const updated = await adminApi.updateGallery(editingItem.id, formData);
        setGallery((prev) => prev.map((g) => (g.id === editingItem.id ? updated : g)));
      } else {
        const created = await adminApi.createGallery(formData);
        setGallery((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save gallery item:", err);
      alert("Failed to save gallery photo.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete photo "${title}"?`)) return;

    try {
      await adminApi.deleteGallery(id);
      setGallery((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error("Failed to delete gallery item:", err);
      alert("Failed to delete photo.");
    }
  };

  const filteredGallery = gallery.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
            Architecture Gallery ({gallery.length})
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60">
            Manage high-definition site architectural photography and project captures
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-gold/20 transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-charcoal/80 p-3 backdrop-blur-xl">
        <Filter className="h-4 w-4 text-gold mx-2" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-gold text-black shadow-md shadow-gold/20"
                : "bg-white/5 text-ivory/70 hover:bg-white/10 hover:text-ivory"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      ) : filteredGallery.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-ivory/20 mb-3" />
          <h3 className="text-sm font-bold text-ivory">No photos found</h3>
          <p className="text-xs text-ivory/50 mt-1">Upload a photo to populate the gallery.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-charcoal transition-all hover:border-gold/50 hover:shadow-2xl"
            >
              {/* Photo */}
              <div className="relative h-60 w-full overflow-hidden bg-black/40">
                <img
                  src={getImageUrl(item.img)}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute("src", "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80");
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/30" />

                {/* Badges */}
                <div className="absolute left-3 top-3 flex gap-2">
                  <span className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-gold uppercase border border-gold/30">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="rounded-lg bg-gold text-black px-2 py-0.5 text-[9px] font-extrabold uppercase">
                      Featured
                    </span>
                  )}
                </div>

                {/* Quick Preview Icon */}
                <button
                  onClick={() => setPreviewImage(item)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-ivory/80 opacity-0 group-hover:opacity-100 transition-all hover:bg-gold hover:text-black"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>

              {/* Info & Actions */}
              <div className="p-4">
                <h3 className="text-xs font-bold text-ivory truncate">{item.title}</h3>
                <p className="text-[11px] text-ivory/50 truncate mt-0.5">{item.project}</p>

                <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/5 pt-3">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-ivory hover:bg-gold hover:text-black hover:border-gold transition-all"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-300 hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Preview */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl border border-gold/40">
            <img
              src={getImageUrl(previewImage.img)}
              alt={previewImage.title}
              className="max-h-[80vh] w-auto object-contain rounded-2xl"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-center">
              <h3 className="font-display text-lg font-bold text-ivory">{previewImage.title}</h3>
              <p className="text-xs text-gold mt-1">{previewImage.category} • {previewImage.project}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl border border-gold/30 bg-charcoal p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-ivory">
                    {editingItem ? "Edit Photo" : "Add Gallery Photo"}
                  </h2>
                  <p className="text-xs text-ivory/50">Upload site photography to live gallery</p>
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
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Structural Steel Framing"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  >
                    <option value="Exterior" className="bg-charcoal">Exterior</option>
                    <option value="Interior" className="bg-charcoal">Interior</option>
                    <option value="Structural" className="bg-charcoal">Structural</option>
                    <option value="Under Construction" className="bg-charcoal">Under Construction</option>
                    <option value="Commercial" className="bg-charcoal">Commercial</option>
                    <option value="Residential" className="bg-charcoal">Residential</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Aspect Ratio
                  </label>
                  <select
                    value={formData.aspect}
                    onChange={(e) => setFormData({ ...formData, aspect: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  >
                    <option value="landscape" className="bg-charcoal">Landscape (16:9)</option>
                    <option value="portrait" className="bg-charcoal">Portrait (4:5)</option>
                    <option value="wide" className="bg-charcoal">Wide (21:9)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Associated Project / Location
                </label>
                <input
                  type="text"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  placeholder="e.g. Gurugram Logistics Center"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Image File or URL *
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    required
                    value={formData.img}
                    onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                    placeholder="/uploads/gallery-01.jpg or https://"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-2.5 text-xs font-semibold text-gold cursor-pointer hover:bg-gold hover:text-black transition-all">
                    <Upload className="h-4 w-4" />
                    <span>{uploading ? "Uploading..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {formData.img && (
                  <div className="mt-3 h-32 w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    <img
                      src={getImageUrl(formData.img)}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 accent-yellow-500 cursor-pointer"
                />
                <label htmlFor="featured-check" className="text-xs font-semibold text-ivory cursor-pointer">
                  Feature prominently on Home / Gallery banner
                </label>
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
                  <span>{saving ? "Saving..." : editingItem ? "Update Photo" : "Add to Gallery"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
