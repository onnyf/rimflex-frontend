
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(false);
    setError(
      "Administrator login is temporarily unavailable while secure authentication is being configured."
    );
  };
  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      {/* TOP BAR */}
      <header className="border-b border-orange-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-xl font-black text-white">
              D
            </div>

            <span className="text-xl font-black tracking-tight text-gray-950">
              Door<span className="text-[#FF6B35]">-Step</span>
            </span>
          </button>

          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
            <FiShield className="text-[#FF6B35]" />
            Admin Portal
          </div>
        </div>
      </header>

      {/* LOGIN */}
      <div className="mx-auto flex min-h-[calc(100vh-81px)] max-w-6xl items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-orange-900/10 lg:grid-cols-2">
          {/* LEFT */}
          <div className="relative hidden overflow-hidden bg-gray-950 p-10 text-white lg:block">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF6B35]/20 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative flex h-full flex-col">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B35] text-2xl">
                <FiShield />
              </div>

              <p className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                Door-Step Administration
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight">
                Everything your platform needs.
                <span className="block text-[#FF6B35]">
                  In one place.
                </span>
              </h1>

              <p className="mt-5 max-w-md leading-7 text-gray-400">
                Manage restaurants, riders, customers, orders,
                payments and platform operations from the Door-Step
                admin dashboard.
              </p>

              <div className="mt-auto grid grid-cols-2 gap-3 pt-12">
                <AdminFeature label="Restaurants" />
                <AdminFeature label="Riders" />
                <AdminFeature label="Customers" />
                <AdminFeature label="Orders" />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-7 sm:p-10 lg:p-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                Administrator
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950">
                Admin Login
              </h2>

              <p className="mt-2 leading-6 text-gray-500">
                Sign in to manage the Door-Step platform.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Admin Email
                </label>

                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder="admin@doorstep.ng"
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Password
                </label>

                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={
                      showPassword ? "text" : "password"
                    }
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-600">
                  {error}
                </div>
              )}

              {/* DEMO CREDENTIALS */}
              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
                  Demo credentials
                </p>

                <div className="mt-3 space-y-1 text-sm">
                  <p className="text-gray-600">
                    Email:{" "}
                    <span className="font-bold text-gray-950">
                      admin@doorstep.ng
                    </span>
                  </p>

                  <p className="text-gray-600">
                    Password:{" "}
                    <span className="font-bold text-gray-950">
                      admin123
                    </span>
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In to Admin
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
              <FiShield />
              Secure Door-Step Administration Portal
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function AdminFeature({
  label,
}: {
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-bold text-white">
        {label}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        Manage
      </p>
    </div>
  );
}
