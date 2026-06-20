"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem("admin_token");
    if (token === "shahid_admin_authenticated") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple credentials check (admin / admin123)
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("admin_token", "shahid_admin_authenticated");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password. Please use admin / admin123.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-section-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-3xl border border-border-custom/50 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="font-headline-xl text-3xl font-black text-primary tracking-tighter hover:opacity-85">
            Shahid Khan
          </Link>
          <h2 className="text-xl font-bold text-text-main mt-2">CMS Admin Login</h2>
          <p className="text-sm text-text-muted">Enter credentials to manage portfolio settings</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold flex items-center gap-2 border border-red-100">
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-text-main">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-3 rounded-xl border border-border-custom/50 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 font-medium text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-text-main">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-border-custom/50 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 font-medium text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                Logging in...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">login</span>
                Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
