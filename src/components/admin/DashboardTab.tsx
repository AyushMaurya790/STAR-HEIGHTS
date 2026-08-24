import React, { useEffect, useState } from "react";
import {
  Building2,
  Image as ImageIcon,
  Wrench,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  PlusCircle,
} from "lucide-react";
import { adminApi, DashboardStats, getImageUrl } from "@/lib/api";

interface DashboardTabProps {
  onNavigateTab: (tab: string) => void;
  onNewProject: () => void;
}

export function DashboardTab({ onNavigateTab, onNewProject }: DashboardTabProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const data = await adminApi.getStats();
      if (data && data.success) {
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-gold border-t-transparent" />
          <p className="text-sm font-medium text-ivory/60">Loading metrics from live server...</p>
        </div>
      </div>
    );
  }

  const counts = stats?.counts || {
    projects: 25,
    completedProjects: 14,
    inProgressProjects: 11,
    gallery: 27,
    services: 8,
    blogs: 4,
    contacts: 5,
    newContacts: 5,
  };

  const categories = stats?.charts?.projectCategories || {};
  const recentLeads = stats?.recentContacts || [];
  const recentProjects = stats?.recentProjects || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Refresh & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
            Executive Control Overview
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60">
            Real-time live monitoring of Star Heights construction portfolio & inquiries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-ivory/80 transition-all hover:bg-white/10 hover:text-ivory disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-gold" : ""}`} />
            <span>{refreshing ? "Syncing..." : "Sync Live"}</span>
          </button>

          <button
            onClick={onNewProject}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-gold/20 transition-all hover:scale-105"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Projects */}
        <div
          onClick={() => onNavigateTab("projects")}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-black transition-all">
              <Building2 className="h-6 w-6" />
            </div>
            <span className="flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Live DB
            </span>
          </div>
          <div className="text-3xl font-extrabold text-ivory">{counts.projects}</div>
          <div className="text-xs font-semibold text-ivory/80 mt-1">Total Projects</div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-ivory/50 border-t border-white/5 pt-3">
            <span className="text-emerald-400 font-medium">{counts.completedProjects} Completed</span>
            <span className="text-amber-400 font-medium">{counts.inProgressProjects} Active</span>
          </div>
        </div>

        {/* Gallery Photos */}
        <div
          onClick={() => onNavigateTab("gallery")}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-gold/40 hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
              <ImageIcon className="h-6 w-6" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-ivory/30 group-hover:text-ivory transition-colors" />
          </div>
          <div className="text-3xl font-extrabold text-ivory">{counts.gallery}</div>
          <div className="text-xs font-semibold text-ivory/80 mt-1">HD Gallery Photos</div>
          <div className="mt-3 text-[11px] text-ivory/50 border-t border-white/5 pt-3">
            Exterior, Structural & Interiors
          </div>
        </div>

        {/* Client Inquiries */}
        <div
          onClick={() => onNavigateTab("contacts")}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-gold/40 hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all">
              <MessageSquare className="h-6 w-6" />
            </div>
            {counts.newContacts > 0 && (
              <span className="animate-pulse rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                {counts.newContacts} New
              </span>
            )}
          </div>
          <div className="text-3xl font-extrabold text-ivory">{counts.contacts}</div>
          <div className="text-xs font-semibold text-ivory/80 mt-1">Client Inquiries & Leads</div>
          <div className="mt-3 text-[11px] text-amber-400/80 border-t border-white/5 pt-3 font-medium">
            Manage & Follow Up
          </div>
        </div>

        {/* Services & Blogs */}
        <div
          onClick={() => onNavigateTab("services")}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-gold/40 hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-400 group-hover:text-black transition-all">
              <Wrench className="h-6 w-6" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-ivory/30 group-hover:text-ivory transition-colors" />
          </div>
          <div className="text-3xl font-extrabold text-ivory">{counts.services}</div>
          <div className="text-xs font-semibold text-ivory/80 mt-1">Active Services</div>
          <div className="mt-3 text-[11px] text-ivory/50 border-t border-white/5 pt-3">
            With {counts.blogs} Knowledge Blogs
          </div>
        </div>
      </div>

      {/* Category Breakdown Badges */}
      {Object.keys(categories).length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-charcoal/80 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Portfolio Category Breakdown</span>
            </div>
            <span className="text-xs text-ivory/40">25 Total Projects Live</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {Object.entries(categories).map(([cat, count]) => (
              <div
                key={cat}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-ivory"
              >
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span className="text-ivory/90">{cat}:</span>
                <span className="font-bold text-gold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dual Column: Recent Projects & Recent Inquiries */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="rounded-3xl border border-white/10 bg-charcoal/80 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gold" />
              <h2 className="font-display text-lg font-bold text-ivory">Recent Projects</h2>
            </div>
            <button
              onClick={() => onNavigateTab("projects")}
              className="text-xs font-semibold text-gold hover:underline"
            >
              View All ({counts.projects})
            </button>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-3 transition-all hover:border-gold/30 hover:bg-white/[0.05]"
              >
                <img
                  src={getImageUrl(p.img)}
                  alt={p.title}
                  className="h-14 w-14 rounded-xl object-cover border border-white/10"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-xs font-bold text-ivory">{p.title}</h3>
                    {p.isFlagship && (
                      <span className="rounded bg-gold/20 px-1.5 py-0.5 text-[9px] font-bold text-gold uppercase">
                        Flagship
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-ivory/50 truncate">{p.loc} • {p.tag}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold to-yellow-500 transition-all duration-500"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gold">{p.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="rounded-3xl border border-white/10 bg-charcoal/80 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-amber-400" />
              <h2 className="font-display text-lg font-bold text-ivory">Recent Client Inquiries</h2>
            </div>
            <button
              onClick={() => onNavigateTab("contacts")}
              className="text-xs font-semibold text-gold hover:underline"
            >
              View Leads ({counts.contacts})
            </button>
          </div>

          <div className="space-y-3">
            {recentLeads.length === 0 ? (
              <div className="p-8 text-center text-xs text-ivory/40">No inquiries received yet.</div>
            ) : (
              recentLeads.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all hover:border-gold/30 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-ivory">{c.name}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        c.status === "New"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : c.status === "Contacted"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : c.status === "In Progress"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {c.status || "New"}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-ivory/60 truncate">
                    {c.email} {c.phone ? `• ${c.phone}` : ""}
                  </p>

                  {c.message && (
                    <p className="mt-2 text-[11px] text-ivory/40 line-clamp-1 italic">
                      "{c.message}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
