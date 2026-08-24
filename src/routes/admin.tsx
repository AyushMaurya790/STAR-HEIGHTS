import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Lock, User, ArrowRight, LogOut, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const STATIC_USER = "admin";
const STATIC_PASS = "admin@1234";
const AUTH_KEY = "starheights_admin_auth";

function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

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
      setErrorMsg("Invalid credentials. Please use username: admin / password: admin@1234");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal-deep text-ivory flex flex-col justify-between p-6 md:p-12">
        <div className="mx-auto max-w-4xl w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-gold/20">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-gold to-yellow-500 flex items-center justify-center text-black font-black text-2xl shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                SH
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-ivory flex items-center gap-2">
                  Admin Control Center
                  <ShieldCheck className="h-6 w-6 text-gold" />
                </h1>
                <p className="text-xs md:text-sm text-ivory/60">
                  Signed in as <span className="text-gold font-semibold">Administrator (admin)</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-rose-300 transition-all hover:bg-rose-500 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>

          {/* Quick Access Card */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-gold/30 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 h-36 w-36 rounded-full bg-gold/10 blur-3xl group-hover:bg-gold/20 transition-all" />
              <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                <Sparkles className="h-4 w-4" /> Full Control Suite
              </div>
              <h2 className="font-display text-2xl font-bold text-ivory mb-2">
                Star Heights Admin Dashboard
              </h2>
              <p className="text-sm text-ivory/70 leading-relaxed mb-6">
                Manage Services, Projects, 27 Gallery Photos, Blog Articles, Why-Us Pillars, and Client Inquiries from the unified control suite.
              </p>
              <a
                href="http://localhost:5050"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-500 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:scale-105 shadow-lg shadow-gold/20"
              >
                <span>Launch Admin Suite (Port 5050)</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-3xl border border-gold/20 bg-charcoal p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-ivory mb-3">
                  Quick Website Management
                </h3>
                <ul className="space-y-3 text-xs text-ivory/75">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
                    <span>24 Live Projects & Flagship developments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
                    <span>27 High-Resolution Gallery site updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
                    <span>Direct CRM synchronization for contact leads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
                    <span>Dynamic REST API integration on port 5001</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-ivory/10 flex items-center justify-between text-xs text-ivory/50">
                <span>Session: Active</span>
                <span className="text-gold">Role: Superadmin</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl w-full pt-8 text-center text-xs text-ivory/40">
          Star Heights Construction Co. © 2026 Admin Suite
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-deep px-4 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gold/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gold/15 blur-[140px]" />

      <div className="w-full max-w-md rounded-3xl border border-gold/30 bg-charcoal/90 p-8 shadow-2xl backdrop-blur-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-gold to-yellow-400 text-black font-black text-2xl shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            SH
          </div>
          <h1 className="font-display text-2xl font-bold text-ivory">
            Admin Authentication
          </h1>
          <p className="mt-1 text-xs tracking-wider uppercase text-gold">
            Star Heights Construction Co.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-center text-xs font-semibold text-rose-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/70" />
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-gold/20 bg-charcoal-deep/80 pl-10 pr-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/70" />
              <input
                type="password"
                required
                placeholder="admin@1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gold/20 bg-charcoal-deep/80 pl-10 pr-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[11px] text-ivory/50">Static Credentials:</span>
            <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
              admin / admin@1234
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-yellow-500 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:scale-[1.02] shadow-lg shadow-gold/20"
          >
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}