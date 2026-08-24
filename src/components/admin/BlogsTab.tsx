import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  User,
  Upload,
  X,
  Check,
  Tag,
} from "lucide-react";
import { adminApi, BlogItem, getImageUrl } from "@/lib/api";

export function BlogsTab() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<BlogItem>>({
    title: "",
    tag: "Construction Insights",
    author: "Star Heights Editorial",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    excerpt: "",
    content: "",
  });

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      tag: "Construction Insights",
      author: "Star Heights Editorial",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      readTime: "4 min read",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      excerpt: "",
      content: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog: BlogItem) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      tag: blog.tag || "Construction Insights",
      author: blog.author || "Star Heights Editorial",
      date: blog.date,
      readTime: blog.readTime || "4 min read",
      img: blog.img,
      excerpt: blog.excerpt,
      content: blog.content || blog.excerpt,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await adminApi.uploadImage(file);
      if (res && res.url) {
        setFormData((prev) => ({ ...prev, img: res.url }));
      }
    } catch (err) {
      console.error("Blog image upload error:", err);
      alert("Failed to upload blog image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt) {
      alert("Please provide title and excerpt.");
      return;
    }

    try {
      setSaving(true);
      if (editingBlog) {
        const updated = await adminApi.updateBlog(editingBlog.id, formData);
        setBlogs((prev) => prev.map((b) => (b.id === editingBlog.id ? updated : b)));
      } else {
        const created = await adminApi.createBlog(formData);
        setBlogs((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save blog:", err);
      alert("Failed to save blog.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete blog post "${title}"?`)) return;

    try {
      await adminApi.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog.");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
            Articles & Insights ({blogs.length})
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60">
            Publish engineering breakthroughs, construction guides, and market updates
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-gold/20 transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Write Article</span>
        </button>
      </div>

      {/* Blogs Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-ivory/20 mb-3" />
          <h3 className="text-sm font-bold text-ivory">No articles published yet</h3>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-charcoal transition-all hover:border-gold/40 hover:shadow-2xl"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-black/40">
                  <img
                    src={getImageUrl(b.img)}
                    alt={b.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute("src", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80");
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/30" />
                  <span className="absolute left-3 top-3 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-gold uppercase border border-gold/30">
                    {b.tag || "Insights"}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-ivory/50 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gold" />
                      {b.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-ivory/40" />
                      {b.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-ivory group-hover:text-gold transition-colors line-clamp-2">
                    {b.title}
                  </h3>

                  <p className="mt-2 text-xs text-ivory/60 line-clamp-3 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-white/5 p-5 pt-3">
                <span className="text-[11px] text-ivory/40 flex items-center gap-1">
                  <User className="h-3 w-3 text-gold" />
                  {b.author || "Editorial"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-ivory hover:bg-gold hover:text-black hover:border-gold transition-all"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(b.id, b.title)}
                    className="inline-flex items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500 hover:text-white transition-all"
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gold/30 bg-charcoal p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-ivory">
                    {editingBlog ? "Edit Article" : "Write New Article"}
                  </h2>
                  <p className="text-xs text-ivory/50">Draft and publish company insights</p>
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
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Modern RCC Framework Innovations"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. Engineering"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Technical Director"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Cover Image URL or File
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={formData.img}
                    onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                    placeholder="Image URL or upload"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-2.5 text-xs font-semibold text-gold cursor-pointer hover:bg-gold hover:text-black transition-all">
                    <Upload className="h-4 w-4" />
                    <span>{uploading ? "Uploading..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Short Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Summary displayed on blog cards..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                  Full Article Body
                </label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write full article body..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
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
                  <span>{saving ? "Saving..." : editingBlog ? "Update Article" : "Publish Article"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
