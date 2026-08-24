import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Image as ImageIcon,
  Wrench,
  BookOpen,
  MessageSquare,
  Award,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Sparkles,
  Lock,
  User,
  Eye,
  EyeOff,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Globe,
  Radio,
} from "lucide-react";

import { DashboardTab } from "@/components/admin/DashboardTab";
import { ProjectsTab } from "@/components/admin/ProjectsTab";
import { GalleryTab } from "@/components/admin/GalleryTab";
import { ServicesTab } from "@/components/admin/ServicesTab";
import { BlogsTab } from "@/components/admin/BlogsTab";
import { ContactsTab } from "@/components/admin/ContactsTab";
import { WhyUsTab } from "@/components/admin/WhyUsTab";

export const Route = createFileRoute("/admin")({
  component: AdminWorkspace,
});

const STATIC_USER = "admin";
const STATIC_PASS = "admin@1234";
const AUTH_KEY = "starheights_admin_auth";

type AdminTab =
  | "dashboard"
  | "projects"
  | "gallery"
  | "services"
  | "blogs"
  | "contacts"
  | "whyus";

function AdminWorkspace() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const isAuth =
      localStorage.getItem(AUTH_KEY) === "true" ||
      sessionStorage.getItem(AUTH_KEY) === "true";
    setIsAuthenticated(isAuth);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === STATIC_USER && password === STATIC_PASS) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid credentials. Please enter username: admin / password: admin@1234");
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to sign out of the Admin Suite?")) {
      localStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(AUTH_KEY);
      setIsAuthenticated(false);
      setUsername("");
      setPassword("");
    }
  };

  // -------------------------------------------------------------
  // 1. UN-AUTHENTICATED: LUXURY LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal-deep text-ivory flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gold/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yellow-500/10 blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-md rounded-3xl border border-gold/30 bg-charcoal/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl animate-fadeIn">
          {/* Logo Brand */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-gold to-yellow-500 flex items-center justify-center text-black font-black text-2xl shadow-xl shadow-gold/30 mb-4">
              SH
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ivory">
              Star Heights Portal
            </h1>
            <p className="text-xs sm:text-sm text-ivory/60 mt-1">
              Sign in to manage projects, gallery, services & leads
            </p>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div className="mb-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300 animate-fadeIn">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-ivory/80 mb-1.5 block">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-3 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-ivory/80 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 py-3 text-xs text-ivory focus:border-gold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-ivory"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-500 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-gold/20 hover:scale-[1.02] transition-all"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Sign In to Admin</span>
              </button>
            </div>
          </form>

          {/* Footer Demo Helper */}
          <div className="mt-6 text-center border-t border-white/5 pt-4">
            <p className="text-[11px] text-ivory/50">
              Default Credentials:{" "}
              <span className="text-gold font-mono font-bold">admin</span> /{" "}
              <span className="text-gold font-mono font-bold">admin@1234</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED: FULL REACT ADMIN WORKSPACE
  // -------------------------------------------------------------
  const NAV_ITEMS: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "dashboard", label: "Executive Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "projects", label: "Projects Portfolio", icon: <Building2 className="h-4 w-4" />, badge: "25" },
    { id: "gallery", label: "Architecture Gallery", icon: <ImageIcon className="h-4 w-4" />, badge: "27" },
    { id: "services", label: "Capabilities & Services", icon: <Wrench className="h-4 w-4" /> },
    { id: "blogs", label: "Articles & Insights", icon: <BookOpen className="h-4 w-4" /> },
    { id: "contacts", label: "Client Inquiries (CRM)", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "whyus", label: "Why Us & Counters", icon: <Award className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-charcoal-deep text-ivory flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden animate-fadeIn"
        />
      )}

      {/* Luxury Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-white/10 bg-charcoal p-6 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-gold to-yellow-500 font-black text-black text-lg shadow-lg shadow-gold/20 group-hover:scale-105 transition-all">
                SH
              </div>
              <div>
                <h2 className="font-display text-base font-bold text-ivory leading-none">
                  Star Heights
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold mt-1 block">
                  Admin Control Suite
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden rounded-lg p-1.5 text-ivory/60 hover:bg-white/10 hover:text-ivory"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-gold to-yellow-500 text-black font-bold shadow-lg shadow-gold/20"
                      : "text-ivory/70 hover:bg-white/5 hover:text-ivory"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive ? "bg-black/20 text-black" : "bg-white/10 text-ivory/80"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 pt-6 space-y-4">
          {/* Live Status Badge */}
          <div className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-emerald-300">Live API 5002</span>
            </div>
            <Radio className="h-3.5 w-3.5 text-emerald-400" />
          </div>

          {/* Sign Out */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 py-3 text-xs font-bold uppercase tracking-wider text-rose-300 hover:bg-rose-500 hover:text-white transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-charcoal/60 px-6 sm:px-10 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-ivory lg:hidden hover:bg-white/10"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-ivory capitalize">
                  {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
                </h2>
                <span className="hidden sm:inline-block rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold text-gold border border-gold/20">
                  React Native
                </span>
              </div>
              <p className="text-[11px] text-ivory/50 hidden sm:block">
                Star Heights Luxury Architecture & Construction Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-ivory/80 hover:bg-white/10 hover:text-ivory transition-all"
            >
              <Globe className="h-3.5 w-3.5 text-gold" />
              <span className="hidden sm:inline">View Public Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/40 transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Tab View Container */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {activeTab === "dashboard" && (
            <DashboardTab
              onNavigateTab={(tab) => setActiveTab(tab as AdminTab)}
              onNewProject={() => setActiveTab("projects")}
            />
          )}
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "gallery" && <GalleryTab />}
          {activeTab === "services" && <ServicesTab />}
          {activeTab === "blogs" && <BlogsTab />}
          {activeTab === "contacts" && <ContactsTab />}
          {activeTab === "whyus" && <WhyUsTab />}
        </main>
      </div>
    </div>
  );
}