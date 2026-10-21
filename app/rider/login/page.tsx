
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiTruck,
} from "react-icons/fi";

type RiderApplication = {
  id?: string;
  status?: string;

  account?: {
    email?: string;
    phone?: string;
    password?: string;
  };

  email?: string;
  phone?: string;
  password?: string;

  personal?: {
    fullName?: string;
    name?: string;
  };

  name?: string;
  fullName?: string;
};

function RiderLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /*
   * Remember the page the rider was trying to access.
   *
   * Example:
   * /rider/login?redirect=/rider/profile
   *
   * After successful login:
   * /rider/profile
   */
  const requestedRedirect = searchParams.get("redirect");

  /*
   * Only allow internal Door-Step routes.
   *
   * This prevents a redirect such as:
   * https://example.com
   */
  const getSafeRedirect = () => {
    if (
      requestedRedirect &&
      requestedRedirect.startsWith("/") &&
      !requestedRedirect.startsWith("//")
    ) {
      return requestedRedirect;
    }

    return "/rider/dashboard";
  };

  const [loginType, setLoginType] =
    useState<"phone" | "email">("phone");

  const [identifier, setIdentifier] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const normalizeEmail = (value: string) => {
    return value.trim().toLowerCase();
  };

  const normalizePhone = (value: string) => {
    return value.replace(/\s+/g, "").trim();
  };

  const getApplicationValue = (
    application: RiderApplication,
    field: "email" | "phone" | "password"
  ) => {
    return (
      application.account?.[field] ||
      application[field] ||
      ""
    );
  };

  const getRiderName = (
    application: RiderApplication
  ) => {
    return (
      application.personal?.fullName ||
      application.personal?.name ||
      application.fullName ||
      application.name ||
      "Door-Step Rider"
    );
  };

  const handleLogin = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const savedApplication =
        localStorage.getItem(
          "doorstep_rider_application"
        );

      if (!savedApplication) {
        setError(
          "No rider application was found on this device. Please register as a rider first."
        );

        setLoading(false);
        return;
      }

      let application: RiderApplication;

      try {
        application = JSON.parse(
          savedApplication
        );
      } catch {
        setError(
          "Your rider account data is corrupted. Please register again."
        );

        setLoading(false);
        return;
      }

      const savedEmail =
        getApplicationValue(
          application,
          "email"
        );

      const savedPhone =
        getApplicationValue(
          application,
          "phone"
        );

      const savedPassword =
        getApplicationValue(
          application,
          "password"
        );

      const savedStatus = String(
        application.status || ""
      )
        .trim()
        .toLowerCase();

      const enteredIdentifier =
        loginType === "email"
          ? normalizeEmail(identifier)
          : normalizePhone(identifier);

      const storedIdentifier =
        loginType === "email"
          ? normalizeEmail(savedEmail)
          : normalizePhone(savedPhone);

      if (!enteredIdentifier) {
        setError(
          `Please enter your ${
            loginType === "email"
              ? "email address"
              : "phone number"
          }.`
        );

        setLoading(false);
        return;
      }

      if (!password.trim()) {
        setError(
          "Please enter your password."
        );

        setLoading(false);
        return;
      }

      if (!storedIdentifier) {
        setError(
          `No ${
            loginType === "email"
              ? "email address"
              : "phone number"
          } is saved in your rider application.`
        );

        setLoading(false);
        return;
      }

      if (
        enteredIdentifier !==
        storedIdentifier
      ) {
        setError(
          `The ${
            loginType === "email"
              ? "email address"
              : "phone number"
          } does not match your rider application.`
        );

        setLoading(false);
        return;
      }

      if (!savedPassword) {
        setError(
          "No password was found for this rider account. Please register again."
        );

        setLoading(false);
        return;
      }

      if (password !== savedPassword) {
        setError(
          "Incorrect password. Please try again."
        );

        setLoading(false);
        return;
      }

      /*
       * Only APPROVED riders can enter
       * the rider portal.
       */
      if (savedStatus !== "approved") {
        if (
          savedStatus === "pending" ||
          savedStatus === "pending review" ||
          savedStatus === "under review" ||
          savedStatus === "review"
        ) {
          setError(
            "Your rider application is still under review. Please wait for admin approval."
          );
        } else if (
          savedStatus === "rejected"
        ) {
          setError(
            "Your rider application was rejected. Please contact Door-Step support."
          );
        } else if (
          savedStatus === "suspended"
        ) {
          setError(
            "Your rider account is suspended. Please contact Door-Step support."
          );
        } else if (
          savedStatus === "restricted"
        ) {
          setError(
            "Your rider account is currently restricted because of a compliance issue."
          );
        } else {
          setError(
            `Your rider account is not approved yet. Current status: ${
              application.status ||
              "Unknown"
            }.`
          );
        }

        setLoading(false);
        return;
      }

      /*
       * Clear any old rider session.
       */
      localStorage.removeItem(
        "doorstep_rider_authenticated"
      );

      localStorage.removeItem(
        "doorstep_rider_id"
      );

      localStorage.removeItem(
        "doorstep_rider_name"
      );

      localStorage.removeItem(
        "doorstep_rider_email"
      );

      localStorage.removeItem(
        "doorstep_rider_phone"
      );

      /*
       * Create fresh rider session.
       */
      localStorage.setItem(
        "doorstep_rider_authenticated",
        "true"
      );

      localStorage.setItem(
        "doorstep_rider_id",
        application.id ||
          `RID-${Date.now()}`
      );

      localStorage.setItem(
        "doorstep_rider_name",
        getRiderName(application)
      );

      localStorage.setItem(
        "doorstep_rider_email",
        savedEmail
      );

      localStorage.setItem(
        "doorstep_rider_phone",
        savedPhone
      );

      setSuccess(
        "Login successful. Redirecting..."
      );

      /*
       * Return rider to the page they
       * originally logged out from.
       */
      setTimeout(() => {
        router.replace(
          getSafeRedirect()
        );
      }, 300);
    } catch (loginError) {
      console.error(
        "Rider login error:",
        loginError
      );

      setError(
        "Something went wrong while logging in. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md items-center justify-center">
        <div className="w-full">

          {/* BACK */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to Door-Step
          </Link>

          {/* CARD */}
          <div className="rounded-3xl border border-orange-100 bg-white p-7 shadow-xl sm:p-9">

            {/* ICON */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
              <FiTruck className="text-3xl text-[#FF6B35]" />
            </div>

            <div className="mt-6 text-center">
              <h1 className="text-3xl font-black text-gray-950">
                Rider Login
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Sign in to manage your deliveries and earnings.
              </p>
            </div>

            {/* LOGIN TYPE */}
            <div className="mt-8 grid grid-cols-2 rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginType("phone");
                  setIdentifier("");
                  setError("");
                }}
                className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
                  loginType === "phone"
                    ? "bg-white text-[#FF6B35] shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Phone
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginType("email");
                  setIdentifier("");
                  setError("");
                }}
                className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
                  loginType === "email"
                    ? "bg-white text-[#FF6B35] shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Email
              </button>
            </div>

            <form
              onSubmit={handleLogin}
              className="mt-6 space-y-5"
            >
              {/* PHONE / EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  {loginType === "phone"
                    ? "Phone Number"
                    : "Email Address"}
                </label>

                <div className="relative">
                  {loginType === "phone" ? (
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  ) : (
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  )}

                  <input
                    type={
                      loginType === "phone"
                        ? "tel"
                        : "email"
                    }
                    value={identifier}
                    onChange={(event) =>
                      setIdentifier(
                        event.target.value
                      )
                    }
                    placeholder={
                      loginType === "phone"
                        ? "08012345678"
                        : "rider@example.com"
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white focus:ring-2 focus:ring-orange-100"
                    autoComplete={
                      loginType === "phone"
                        ? "tel"
                        : "email"
                    }
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
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white focus:ring-2 focus:ring-orange-100"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#FF6B35]"
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
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
                  {error}
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold leading-6 text-green-700">
                  {success}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#FF6B35] px-5 py-3.5 font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : "Sign In"}
              </button>
            </form>

            {/* REGISTER */}
            <div className="mt-7 border-t border-gray-100 pt-6 text-center">
              <p className="text-sm text-gray-500">
                Don't have a rider account?
              </p>

              <Link
                href="/rider/register"
                className="mt-2 inline-flex font-bold text-[#FF6B35] transition hover:text-orange-700"
              >
                Register as a Rider
              </Link>
            </div>

            {/* DEMO INFORMATION */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4 text-xs leading-5 text-gray-500">
              <p className="font-bold text-gray-700">
                Demo login requirement
              </p>

              <p className="mt-1">
                The rider application must exist on this
                browser and its status must be{" "}
                <strong>Approved</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function RiderLoginPage() {
  return (
    <Suspense fallback={null}>
      <RiderLoginContent />
    </Suspense>
  );
}
