
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { registerCustomer } from "@/lib/auth-api";

export default function SignupPage() {
  const router = useRouter();


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || firstName;

    try {
      await registerCustomer({
        firstName,
        lastName,
        email: email.trim(),
        phone: phone.trim(),
        password,
      });

      sessionStorage.setItem(
        "rimflex_pending_verification_email",
        email.trim().toLowerCase()
      );

      router.push("/verify");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="relative hidden min-h-screen overflow-hidden bg-[#151515] lg:flex">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
              alt="Door-Step delivery"
              className="h-full w-full object-cover opacity-50"
            />

            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 text-2xl font-black text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-lg">
                D
              </span>
              Door-Step
            </Link>

            <div className="max-w-lg text-white">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF9B78]">
                Everything delivered
              </p>

              <h1 className="text-4xl font-black leading-tight xl:text-5xl">
                Your everyday delivery partner.
              </h1>

              <p className="mt-5 text-base leading-7 text-white/70">
                Order food, send packages, shop for essentials or deliver your
                products to customers with Door-Step.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Food", "Packages", "Shopping", "Business"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-white/40">
              Â© {new Date().getFullYear()} Door-Step
            </p>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="min-h-screen overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
            <div className="w-full max-w-md">
              {/* MOBILE LOGO */}
              <div className="mb-8 lg:hidden">
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
              <div className="mb-7">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF0E9] text-[#FF6B35]">
                  <FiUser size={21} />
                </div>

                <p className="text-sm font-bold uppercase tracking-wider text-[#FF6B35]">
                  Create account
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#151515]">
                  Join Door-Step
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Create your account and start using Door-Step.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* FULL NAME */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-sm font-semibold text-[#151515]"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <FiUser
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-[#151515]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <FiMail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10"
                    />
                  </div>
                </div>

                {/* PHONE NUMBER */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-semibold text-[#151515]"
                  >
                    Phone number
                  </label>

                  <div className="relative">
                    <FiPhone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="0800 000 0000"
                      className="block w-full appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-[#151515] outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-semibold text-[#151515]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <FiLock
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Create a password"
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

                {/* CONFIRM PASSWORD */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-sm font-semibold text-[#151515]"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <FiLock
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Confirm your password"
                      className="block w-full appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm text-[#151515] outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#151515]"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* TERMS */}
                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setAcceptedTerms(!acceptedTerms)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                      acceptedTerms
                        ? "border-[#FF6B35] bg-[#FF6B35] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {acceptedTerms && <FiCheck size={13} />}
                  </button>

                  <span className="text-xs leading-5 text-gray-500">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-[#FF6B35] hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-[#FF6B35] hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {/* ERROR */}
                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#E85625]"
                >
                  Create account
                  <FiArrowRight size={18} />
                </button>
              </form>

              {/* LOGIN */}
              <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#FF6B35] hover:underline"
                >
                  Login
                </Link>
              </p>

              {/* SECURITY */}
              <div className="mt-6 flex items-center justify-center gap-2 pb-2 text-xs text-gray-400">
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
