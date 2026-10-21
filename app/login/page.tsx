
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithBackend } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      await loginWithBackend(email.trim(), password);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to log in. Please try again."
      );
      return;
    }
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="relative hidden min-h-screen overflow-hidden bg-[#151515] lg:flex">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=85"
              alt="Door-Step delivery rider"
              className="h-full w-full object-cover opacity-40"
            />

            <div className="absolute inset-0 bg-black/65" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* LOGO */}
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 text-2xl font-black text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-lg">
                D
              </span>

              Door-Step
            </Link>

            {/* CONTENT */}
            <div className="max-w-lg text-white">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF9B78]">
                Welcome back
              </p>

              <h1 className="text-4xl font-black leading-tight xl:text-5xl">
                Everything you need, delivered.
              </h1>

              <p className="mt-5 text-base leading-7 text-white/70">
                Order food, send packages, shop for essentials or manage your
                business deliveries from one Door-Step account.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl">🍔</p>
                  <p className="mt-2 text-sm font-bold">Food delivery</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl">📦</p>
                  <p className="mt-2 text-sm font-bold">Package delivery</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl">🛒</p>
                  <p className="mt-2 text-sm font-bold">Shop & deliver</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl">🏪</p>
                  <p className="mt-2 text-sm font-bold">Business delivery</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Door-Step
            </p>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="min-h-screen overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
            <div className="w-full max-w-md">
              {/* MOBILE LOGO */}
              <div className="mb-10 lg:hidden">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-2xl font-black text-[#151515]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-lg text-white">
                    D
                  </span>

                  Door-Step
                </Link>
              </div>

              {/* HEADER */}
              <div className="mb-8">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF0E9] text-[#FF6B35]">
                  <FiLock size={21} />
                </div>

                <p className="text-sm font-bold uppercase tracking-wider text-[#FF6B35]">
                  Welcome back
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#151515]">
                  Login to Door-Step
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enter your account details to continue.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#151515]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <FiMail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      className="block w-full appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-[#151515] outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-[#151515]"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#FF6B35] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <FiLock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your password"
                      className="block w-full appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm text-[#151515] outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#151515]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* REMEMBER ME */}
                <label className="flex cursor-pointer items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
                      rememberMe
                        ? "border-[#FF6B35] bg-[#FF6B35] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {rememberMe && (
                      <span className="text-xs font-black">✓</span>
                    )}
                  </button>

                  <span className="text-sm text-gray-500">
                    Remember me
                  </span>
                </label>

                {/* ERROR */}
                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-600">
                    {error}
                  </div>
                )}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#E85625]"
                >
                  Login
                  <FiArrowRight size={18} />
                </button>
              </form>

              {/* SIGNUP */}
              <p className="mt-8 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-[#FF6B35] hover:underline"
                >
                  Create an account
                </Link>
              </p>

              {/* SECURITY */}
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
                <FiLock size={13} />
                Your information is protected
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
