import React, { useEffect, useState } from "react";
import {
  Building2,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Upload,
  Sparkles,
  MapPin,
  Calendar,
  X,
  Check,
  Percent,
} from "lucide-react";
import { adminApi, ProjectItem, getImageUrl } from "@/lib/api";

const CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Apartment Development",
  "Industrial",
  "Interior Fit-Out",
  "Structural Steel",
];

export function ProjectsTab({ defaultOpenCreate = false }: { defaultOpenCreate?: boolean }) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(defaultOpenCreate);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    title: "",
    tag: "Residential",
    loc: "Delhi NCR",
    year: new Date().getFullYear().toString(),
    progress: 50,
    status: "In Progress",
    isFlagship: false,
    client: "",
    area: "",
    img: "",
    desc: "",
  });

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      tag: "Residential",
      loc: "Delhi NCR",
      year: new Date().getFullYear().toString(),
      progress: 50,
      status: "In Progress",
      isFlagship: false,
      client: "",
      area: "",
      img: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
      desc: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      tag: project.tag,
      loc: project.loc,
      year: project.year,
      progress: project.progress,
      status: project.status,
      isFlagship: project.isFlagship,
      client: project.client || "",
      area: project.area || "",
      img: project.img,
      desc: project.desc || "",
    });
    setIsModalOpen(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await adminApi.uploadImage(file);
      if (res && res.url) {
        setFormData((prev) => ({ ...prev, img: res.url }));
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image. Please check server.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Please enter project title");
      return;
    }

    try {
      setSaving(true);
      if (editingProject) {
        const updated = await adminApi.updateProject(editingProject.id, formData);
        setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? updated : p)));
      } else {
        const created = await adminApi.createProject(formData);
        setProjects((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save project:", err);
      alert("Failed to save project to server.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project: "${title}"?`)) return;

    try {
      await adminApi.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project from server.");
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.loc.toLowerCase().includes(search.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || p.tag.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
            Construction Projects ({projects.length})
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60">
            Create, update, and showcase live ongoing and completed construction milestones
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-gold/20 transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-charcoal/80 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, location, client..."
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-gold text-black shadow-md shadow-gold/20"
                  : "bg-white/5 text-ivory/70 hover:bg-white/10 hover:text-ivory"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center">
          <Building2 className="mx-auto h-12 w-12 text-ivory/20 mb-3" />
          <h3 className="text-sm font-bold text-ivory">No projects found</h3>
          <p className="text-xs text-ivory/50 mt-1">Try refining your search or add a new project.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-charcoal transition-all hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/10"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-black/40">
                <img
                  src={getImageUrl(p.img)}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute("src", "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80");
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/40" />

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-gold uppercase tracking-wider border border-gold/30">
                    {p.tag}
                  </span>
                  {p.isFlagship && (
                    <span className="rounded-lg bg-gold text-black px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      Flagship
                    </span>
                  )}
                </div>

                <div className="absolute right-3 top-3">
                  <span
                    className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase backdrop-blur-md ${
                      p.status === "Completed"
                        ? "bg-emerald-500/80 text-white"
                        : "bg-amber-500/80 text-white"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-bold text-ivory line-clamp-1 group-hover:text-gold transition-colors">
                  {p.title}
                </h3>

                <div className="mt-2 flex items-center gap-3 text-xs text-ivory/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-gold" />
                    {p.loc}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-ivory/40" />
                    {p.year}
                  </span>
                </div>

                {p.desc && (
                  <p className="mt-3 text-xs text-ivory/50 line-clamp-2 leading-relaxed">
                    {p.desc}
                  </p>
                )}

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[11px] font-semibold text-ivory/60">Milestone Progress</span>
                    <span className="font-bold text-gold">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-yellow-500"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center justify-end gap-2 border-t border-white/5 pt-4">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-ivory transition-all hover:bg-gold hover:text-black hover:border-gold"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-semibold text-rose-300 transition-all hover:bg-rose-500 hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gold/30 bg-charcoal p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-ivory">
                    {editingProject ? "Edit Project" : "Add New Project"}
                  </h2>
                  <p className="text-xs text-ivory/50">Configure project details and live progress</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-ivory/60 hover:bg-white/10 hover:text-ivory"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Title & Tag */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Vinod Heights Tower A"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Category Tag
                  </label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  >
                    <option value="Residential" className="bg-charcoal">Residential</option>
                    <option value="Commercial" className="bg-charcoal">Commercial</option>
                    <option value="Apartment Development" className="bg-charcoal">Apartment Development</option>
                    <option value="Industrial" className="bg-charcoal">Industrial</option>
                    <option value="Interior Fit-Out" className="bg-charcoal">Interior Fit-Out</option>
                    <option value="Structural Steel" className="bg-charcoal">Structural Steel</option>
                  </select>
                </div>
              </div>

              {/* Location & Year */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.loc}
                    onChange={(e) => setFormData({ ...formData, loc: e.target.value })}
                    placeholder="e.g. East Delhi, Noida Sector 62"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g. 2026"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Progress Slider & Status */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider flex items-center gap-2">
                    <Percent className="h-4 w-4 text-gold" />
                    Progress Percentage
                  </label>
                  <span className="font-display font-extrabold text-gold text-sm">
                    {formData.progress}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => {
                    const prog = Number(e.target.value);
                    setFormData({
                      ...formData,
                      progress: prog,
                      status: prog >= 100 ? "Completed" : "In Progress",
                    });
                  }}
                  className="w-full accent-yellow-500 cursor-pointer"
                />

                <div className="flex items-center justify-between text-xs text-ivory/60">
                  <span>0% (Planning)</span>
                  <span>50% (Structure)</span>
                  <span>100% (Completed)</span>
                </div>
              </div>

              {/* Image Upload & URL */}
              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Project Image
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={formData.img}
                    onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                    placeholder="Image URL or upload file"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-2.5 text-xs font-semibold text-gold cursor-pointer hover:bg-gold hover:text-black transition-all">
                    <Upload className="h-4 w-4" />
                    <span>{uploadingImage ? "Uploading..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {formData.img && (
                  <div className="mt-3 h-28 w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    <img
                      src={getImageUrl(formData.img)}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Provide luxury architectural highlights and scope..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              {/* Flagship Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="flagship-check"
                  checked={formData.isFlagship}
                  onChange={(e) => setFormData({ ...formData, isFlagship: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 accent-yellow-500 cursor-pointer"
                />
                <label htmlFor="flagship-check" className="text-xs font-semibold text-ivory cursor-pointer">
                  Mark as Flagship Showcase Project (Featured prominently)
                </label>
              </div>

              {/* Submit Buttons */}
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
                  <span>{saving ? "Saving..." : editingProject ? "Update Project" : "Create Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
