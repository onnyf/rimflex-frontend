
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiShoppingBag,
} from "react-icons/fi";

type PartnerApplication = {
  ownerName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

  restaurantName: string;
  category: string;
  description: string;

  address: string;
  city: string;
  state: string;

  openingTime: string;
  closingTime: string;

  logoName: string;
  coverName: string;
  documentName: string;

  bankName: string;
  accountName: string;
  accountNumber: string;

  status: string;
  submittedAt: string;
};

export default function PartnerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [application, setApplication] =
    useState<PartnerApplication | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const savedApplication = localStorage.getItem(
        "doorstep_partner_application"
      );

      if (savedApplication) {
        const parsedApplication: PartnerApplication =
          JSON.parse(savedApplication);

        setApplication(parsedApplication);

        setEmail(parsedApplication.email || "");
      }
    } catch (error) {
      console.error(
        "Unable to load partner application:",
        error
      );
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const savedApplication = localStorage.getItem(
        "doorstep_partner_application"
      );

      if (!savedApplication) {
        setError(
          "No restaurant partner application was found. Please register your restaurant first."
        );

        setLoading(false);
        return;
      }

      try {
        const partner: PartnerApplication =
          JSON.parse(savedApplication);

        if (
          partner.email.toLowerCase() !==
          email.trim().toLowerCase()
        ) {
          setError(
            "The email address does not match your partner application."
          );

          setLoading(false);
          return;
        }

        if (partner.password !== password) {
          setError("Incorrect password. Please try again.");

          setLoading(false);
          return;
        }

        if (partner.status !== "Approved") {
          setError(
            `Your restaurant application is currently "${partner.status}". You will be able to access the partner dashboard after approval.`
          );

          setLoading(false);
          return;
        }

        localStorage.setItem(
          "doorstep_partner_authenticated",
          "true"
        );

        localStorage.setItem(
          "doorstep_partner_email",
          partner.email
        );

        router.push("/partner/dashboard");
      } catch (error) {
        console.error("Partner login error:", error);

        setError(
          "Something went wrong while signing you in. Please try again."
        );

        setLoading(false);
      }
    }, 700);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      {/* HEADER */}
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

          <button
            type="button"
            onClick={() => router.push("/partner/register")}
            className="text-sm font-bold text-gray-600 transition hover:text-[#FF6B35]"
          >
            New restaurant?{" "}
            <span className="text-[#FF6B35]">
              Become a partner
            </span>
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto flex min-h-[calc(100vh-81px)] max-w-7xl items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-orange-900/10 lg:grid-cols-2">
          {/* LEFT */}
          <div className="relative hidden overflow-hidden bg-gray-950 p-10 text-white lg:block">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF6B35]/20 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative flex h-full flex-col">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B35] text-2xl">
                <FiShoppingBag />
              </div>

              <p className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                Door-Step Partners
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight">
                Manage your restaurant.
                <span className="block text-[#FF6B35]">
                  Grow your business.
                </span>
              </h1>

              <p className="mt-5 max-w-md leading-7 text-gray-400">
                Manage orders, menus, customers, promotions and
                restaurant earnings from one simple dashboard.
              </p>

              <div className="mt-auto space-y-4 pt-12">
                <Feature
                  title="Manage orders"
                  description="Keep track of incoming and active orders."
                />

                <Feature
                  title="Track earnings"
                  description="Monitor your restaurant performance."
                />

                <Feature
                  title="Reach customers"
                  description="Grow your restaurant with Door-Step."
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-7 sm:p-10 lg:p-12">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-gray-950"
            >
              <FiArrowLeft />
              Back to Door-Step
            </button>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                Partner Portal
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950">
                Welcome back
              </h2>

              <p className="mt-2 leading-6 text-gray-500">
                Sign in to manage your restaurant.
              </p>
            </div>

            {/* APPLICATION STATUS */}
            {application && (
              <div className="mt-7 rounded-2xl border border-orange-100 bg-orange-50 p-4">
                <div className="flex items-start gap-3">
                  <FiShield className="mt-0.5 shrink-0 text-xl text-[#FF6B35]" />

                  <div className="min-w-0">
                    <p className="font-bold text-gray-950">
                      {application.restaurantName}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      Application status:{" "}
                      <span className="font-bold text-[#FF6B35]">
                        {application.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Email Address
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
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-bold text-gray-800">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setError(
                        "Password reset will be connected when we build the backend authentication system."
                      );
                    }}
                    className="text-xs font-bold text-[#FF6B35] hover:text-orange-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
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

              {/* LOGIN */}
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
                    Sign In
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            {/* REGISTER */}
            <div className="mt-8 border-t border-gray-100 pt-7 text-center">
              <p className="text-sm text-gray-500">
                Don&apos;t have a restaurant account?
              </p>

              <button
                type="button"
                onClick={() => router.push("/partner/register")}
                className="mt-2 font-bold text-[#FF6B35] transition hover:text-orange-700"
              >
                Register your restaurant
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
              <FiShield />
              Secure Door-Step Partner Portal
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-[#FF6B35]" />

      <div>
        <p className="font-bold text-white">{title}</p>

        <p className="mt-1 text-sm leading-5 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
