
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { verifyCustomerEmail, resendCustomerEmailOtp } from "@/lib/auth-api";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiLock,
  FiRefreshCw,
} from "react-icons/fi";


export default function VerifyPage() {
  const router = useRouter();
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);
  const [emailReady, setEmailReady] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Retrieve the email saved after successful registration.
  useEffect(() => {
    const pendingEmail = sessionStorage.getItem(
      "rimflex_pending_verification_email"
    );

    if (!pendingEmail) {
      router.replace("/signup");
      return;
    }

    setVerificationEmail(pendingEmail);
    setEmailReady(true);
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, "");

    if (!numericValue) {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = numericValue.slice(-1);

    setOtp(updatedOtp);
    setError("");

    // Move to next input
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const pastedText = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedText) return;

    const newOtp = ["", "", "", "", "", ""];

    pastedText.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedText.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    if (!verificationEmail || verifying) return;

    setError("");
    setVerifying(true);

    try {
      await verifyCustomerEmail({
        email: verificationEmail,
        code: enteredOtp,
      });

      sessionStorage.removeItem("rimflex_pending_verification_email");
      setVerified(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again."
      );
    } finally {
      setVerifying(false);
    }
  };
  const handleResend = async () => {
    if (!verificationEmail || resending || countdown > 0) return;

    setError("");
    setResending(true);

    try {
      await resendCustomerEmailOtp({
        email: verificationEmail,
      });

      setCountdown(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not request a new code. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  const maskedEmail = verificationEmail
    ? verificationEmail.replace(/^(.{1,2}).*(@.*)$/, "$1***$2")
    : "your email address";

  if (!emailReady || !verificationEmail) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F3]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF6B35]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading your account...
          </p>
        </div>
      </main>
    );
  }

  if (verified) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F3] px-5 py-10">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl shadow-black/5 sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <FiCheckCircle size={42} className="text-green-500" />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-[#FF6B35]">
            Account verified
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#151515]">
            You're all set!
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Your Door-Step account has been successfully verified.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#E85625]"
          >
            Continue to login
            <FiArrowRight size={18} />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="relative hidden min-h-screen overflow-hidden bg-[#151515] lg:flex">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
              alt="Secure Door-Step account"
              className="h-full w-full object-cover opacity-40"
            />

            <div className="absolute inset-0 bg-black/65" />
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
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B35]">
                <FiLock size={25} />
              </div>

              <h1 className="text-4xl font-black leading-tight xl:text-5xl">
                One more step.
              </h1>

              <p className="mt-5 text-base leading-7 text-white/70">
                Verify your email address to keep your Door-Step account secure
                and ready for deliveries.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm">
                    1
                  </div>
                  <span className="text-sm text-white/70">
                    Create your account
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B35] text-sm font-bold">
                    2
                  </div>
                  <span className="text-sm font-semibold text-white">
                    Verify your account
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm">
                    3
                  </div>
                  <span className="text-sm text-white/70">
                    Start using Door-Step
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Door-Step
            </p>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
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
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0E9] text-[#FF6B35]">
                <FiLock size={24} />
              </div>

              <p className="text-sm font-bold uppercase tracking-wider text-[#FF6B35]">
                Verification
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#151515]">
                Verify your account
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                Enter the 6-digit verification code sent to{" "}
                <span className="font-semibold text-[#151515]">
                  {maskedEmail}
                </span>
              </p>
            </div>

            {/* OTP */}
            <div className="mt-9">
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(event) =>
                      handleChange(index, event.target.value)
                    }
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={handlePaste}
                    className="h-14 w-11 rounded-xl border border-gray-200 bg-white text-center text-xl font-black text-[#151515] outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 sm:h-16 sm:w-14"
                    aria-label={`Verification digit ${index + 1}`}
                  />
                ))}
              </div>

              {/* ERROR */}
              {error && (
                <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* VERIFY BUTTON */}
              <button
                type="button"
                onClick={handleVerify}
                disabled={otp.join("").length !== 6 || verifying}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold transition ${
                  otp.join("").length === 6
                    ? "bg-[#FF6B35] text-white hover:bg-[#E85625]"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                }`}
              >
                {verifying ? "Verifying..." : "Verify account"}
                <FiArrowRight size={18} />
              </button>

              {/* RESEND */}
              <div className="mt-6 text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-500">
                    Didn't receive the code?{" "}
                    <span className="font-semibold text-[#151515]">
                      Resend in {countdown}s
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B35] hover:underline"
                  >
                    <FiRefreshCw size={15} />
                    {resending ? "Sending..." : "Resend verification code"}
                  </button>
                )}
              </div>

              {/* BACK */}
              <Link
                href="/signup"
                className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#151515]"
              >
                <FiArrowLeft size={16} />
                Back to signup
              </Link>
            </div>

            {/* SECURITY */}
            <div className="mt-10 flex items-center justify-center gap-2 text-xs text-gray-400">
              <FiLock size={13} />
              Your verification is secure
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
