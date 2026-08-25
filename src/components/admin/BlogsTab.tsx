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
  Search,
  Globe,
  Share2,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Monitor,
  Heading1,
  Heading2,
  Heading3,
  List,
  Quote,
  FileText,
  Copy,
} from "lucide-react";
import { adminApi, BlogItem, getImageUrl } from "@/lib/api";
import { RichTextEditor } from "./RichTextEditor";

export function BlogsTab() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(true);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  // Form State
  const [formData, setFormData] = useState<Partial<BlogItem>>({
    title: "",
    h1: "",
    slug: "",
    tag: "Construction Insights",
    author: "Star Heights Editorial",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    readTime: "4 min read",
    status: "Published",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    excerpt: "",
    content: "",
    // SEO
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
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

  const calculateReadTime = (text?: string) => {
    if (!text || text.trim().length === 0) return "2 min read";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const getWordCount = (text?: string) => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

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
      metaTitle: prev.metaTitle || (val ? `${val} | Star Heights Insights` : ""),
      ogTitle: prev.ogTitle || val,
    }));
  };

  const handleContentChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      content: val,
      readTime: calculateReadTime(val),
      excerpt: prev.excerpt || val.slice(0, 150),
      metaDescription: prev.metaDescription || val.slice(0, 155),
    }));
  };

  const insertFormatting = (snippet: string) => {
    setFormData((prev) => ({
      ...prev,
      content: (prev.content ? prev.content + "\n\n" : "") + snippet,
    }));
  };

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      h1: "",
      slug: "",
      tag: "Construction Insights",
      author: "Star Heights Editorial",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      readTime: "4 min read",
      status: "Published",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      excerpt: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      canonicalUrl: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      socialLinks: {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
      },
    });
    setSeoExpanded(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog: BlogItem) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      h1: blog.h1 || blog.title,
      slug:
        blog.slug ||
        blog.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      tag: blog.tag || "Construction Insights",
      author: blog.author || "Star Heights Editorial",
      date: blog.date,
      readTime: blog.readTime || calculateReadTime(blog.content || blog.excerpt),
      status: blog.status || "Published",
      img: blog.img,
      excerpt: blog.excerpt,
      content: blog.content || blog.excerpt,
      metaTitle: blog.metaTitle || `${blog.title} | Star Heights Insights`,
      metaDescription: blog.metaDescription || blog.excerpt,
      keywords: blog.keywords || "",
      canonicalUrl: blog.canonicalUrl || "",
      ogTitle: blog.ogTitle || blog.title,
      ogDescription: blog.ogDescription || blog.excerpt,
      ogImage: blog.ogImage || blog.img,
      socialLinks: blog.socialLinks || {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
      },
    });
    setSeoExpanded(true);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await adminApi.uploadImage(file);
      if (res && res.url) {
        setFormData((prev) => ({
          ...prev,
          img: res.url,
          ogImage: prev.ogImage || res.url,
        }));
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
            Publish engineering breakthroughs, construction guides with built-in SEO, H1 headings, and custom URL slugs
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-gold to-yellow-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-gold/20 hover:scale-105 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Grid of Articles */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-3xl border border-white/5 bg-white/[0.02]">
          <p className="text-sm text-ivory/40">Loading articles & insights...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
          <BookOpen className="h-10 w-10 text-gold/40 mb-3" />
          <p className="text-sm font-semibold text-ivory">No articles published yet</p>
          <p className="text-xs text-ivory/50 mt-1 max-w-sm">
            Click "Write New Article" to draft insights with automated SEO meta tags and slugs.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all hover:border-gold/40 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-gold/5"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={getImageUrl(b.img)}
                  alt={b.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-gold/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">
                    {b.tag}
                  </span>
                  {b.slug && (
                    <span className="rounded-full bg-black/70 backdrop-blur-md border border-white/20 px-2 py-0.5 text-[9px] font-mono text-ivory/80">
                      /{b.slug}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-ivory/75">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-gold" />
                    {b.date}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-gold">
                    <Clock className="h-3 w-3" />
                    {b.readTime || "4 min read"}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-display text-base font-bold text-ivory line-clamp-2 group-hover:text-gold transition-colors">
                    {b.title}
                  </h3>
                  {b.h1 && b.h1 !== b.title && (
                    <p className="mt-1 text-[11px] font-mono text-gold/80 truncate">
                      H1: {b.h1}
                    </p>
                  )}
                  <p className="mt-2 text-xs leading-relaxed text-ivory/60 line-clamp-2">
                    {b.excerpt}
                  </p>
                </div>

                {/* Meta Indicators */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-ivory/50">
                  <span className="truncate max-w-[140px]">By {b.author || "Editorial"}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-ivory/70 uppercase">
                      SEO Ready
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/5 pt-3">
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-ivory/80 hover:border-gold/40 hover:bg-gold/10 hover:text-gold transition-all"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit & SEO</span>
                  </button>
                  <button
                    onClick={() => handleDelete(b.id, b.title)}
                    className="rounded-xl border border-white/10 bg-white/5 p-1.5 text-ivory/60 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Article Modal with In-Post SEO and Blog Content Suite */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-gold/30 bg-charcoal p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 sticky top-0 bg-charcoal/95 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10 text-gold border border-gold/30">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-ivory">
                    {editingBlog ? "Edit Article & SEO Meta" : "Write Article & Configure SEO"}
                  </h2>
                  <p className="text-xs text-ivory/50">Draft full article content with automated search tags, custom slugs and live SERP preview</p>
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
              {/* SECTION 1: PRIMARY ARTICLE CONTENT & DETAILS */}
              <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gold">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>1. Article Core Details</span>
                  </div>
                  <span className="text-[10px] text-ivory/50 font-normal">
                    Words: {getWordCount(formData.content)} | {calculateReadTime(formData.content)}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Modern RCC Framework Innovations in Delhi NCR"
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
                      placeholder="Custom H1 if different from title"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                      Category Tag
                    </label>
                    <input
                      type="text"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      placeholder="e.g. Engineering, Architecture, Sustainability"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="e.g. Chief Structural Engineer"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Read Time</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            readTime: calculateReadTime(formData.content || formData.excerpt),
                          })
                        }
                        className="text-[10px] text-gold hover:underline cursor-pointer"
                      >
                        Auto Calculate
                      </button>
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

                {/* Short Excerpt */}
                <div>
                  <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                    Short Excerpt (Card Summary) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short overview shown in lists and search snippet fallback..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* SECTION 2: RICH BLOG CONTENT EDITOR (ALL FORMATTING FEATURES) */}
              <div className="space-y-2">
                <RichTextEditor
                  value={formData.content || ""}
                  onChange={(html) => handleContentChange(html)}
                  placeholder="Start writing your blog post..."
                  minHeight="320px"
                />
              </div>

              {/* SECTION 3: IN-POST SEO & SOCIAL META (UNDER THE POST) */}
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
                        3. SEO Meta Tags, URL Slug & Social Sharing
                      </h4>
                      <p className="text-[10px] text-ivory/50">
                        Custom URL path, Google SERP meta tags, canonical URL & social cards
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
                          <span>Article URL Slug *</span>
                          <span className="text-[10px] text-ivory/40">/blog/{formData.slug || "custom-slug"}</span>
                        </label>
                        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-1">
                          <span className="text-[11px] text-gold/70 font-mono">/blog/</span>
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
                            placeholder="modern-rcc-framework"
                            className="flex-1 bg-transparent py-1.5 text-xs text-ivory focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Canonical / Primary Source Link</span>
                          <span className="text-[10px] text-ivory/40">rel="canonical"</span>
                        </label>
                        <input
                          type="url"
                          value={formData.canonicalUrl}
                          onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                          placeholder="https://starheights.in/blog/your-slug"
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
                          placeholder="e.g. Modern RCC Frameworks | Star Heights Construction Insights"
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
                          placeholder="Compelling 150-160 character description designed to maximize Google CTR..."
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Keywords */}
                    <div>
                      <label className="text-xs font-bold text-ivory uppercase tracking-wider mb-1.5 block">
                        Focus Keywords & Tags
                      </label>
                      <input
                        type="text"
                        value={formData.keywords}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                        placeholder="RCC frame, villa construction, structural integrity, Delhi NCR"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                      />
                    </div>

                    {/* Social Media Links & Profiles */}
                    <div className="space-y-3 rounded-xl border border-white/5 bg-black/20 p-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-ivory uppercase tracking-wider">
                        <Share2 className="h-4 w-4 text-gold" />
                        <span>Social Media Channels & External Links</span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="text-[10px] font-bold text-ivory/70 uppercase tracking-wider mb-1 block">
                            Instagram Profile / Post URL
                          </label>
                          <input
                            type="url"
                            value={formData.socialLinks?.instagram || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                              })
                            }
                            placeholder="https://instagram.com/starheights..."
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none font-mono text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-ivory/70 uppercase tracking-wider mb-1 block">
                            LinkedIn Profile / Company URL
                          </label>
                          <input
                            type="url"
                            value={formData.socialLinks?.linkedin || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                              })
                            }
                            placeholder="https://linkedin.com/company/starheights..."
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none font-mono text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-ivory/70 uppercase tracking-wider mb-1 block">
                            Twitter / X Share Profile
                          </label>
                          <input
                            type="url"
                            value={formData.socialLinks?.twitter || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                              })
                            }
                            placeholder="https://x.com/starheights..."
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none font-mono text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-ivory/70 uppercase tracking-wider mb-1 block">
                            Facebook Page URL
                          </label>
                          <input
                            type="url"
                            value={formData.socialLinks?.facebook || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                              })
                            }
                            placeholder="https://facebook.com/starheights..."
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none font-mono text-[11px]"
                          />
                        </div>
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
                            https://starheights.in › blog ›{" "}
                            <span className="text-[#8ab4f8]">{formData.slug || "modern-rcc-framework"}</span>
                          </div>
                        </div>

                        <h4 className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer line-clamp-1 leading-snug">
                          {formData.metaTitle || formData.title || "Star Heights Construction Insights"}
                        </h4>

                        <p className="text-xs text-[#bdc1c6] line-clamp-2 leading-relaxed">
                          <span className="text-[#9aa0a6]">{formData.date} — </span>
                          {formData.metaDescription ||
                            formData.excerpt ||
                            "Discover architectural insights, engineering breakthroughs and turnkey construction solutions by Star Heights."}
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
                  <span>{saving ? "Saving..." : editingBlog ? "Update Article & SEO" : "Publish Article & SEO"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
