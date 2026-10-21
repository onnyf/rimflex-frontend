
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiPackage,
  FiCamera,
  FiInfo,
  FiCheck,
} from "react-icons/fi";

const packageSizes = [
  {
    id: "small",
    title: "Small",
    description: "Documents, envelopes or small items",
    weight: "Up to 2kg",
    icon: "📄",
  },
  {
    id: "medium",
    title: "Medium",
    description: "Clothes, shoes or small boxes",
    weight: "Up to 5kg",
    icon: "📦",
  },
  {
    id: "large",
    title: "Large",
    description: "Larger boxes or multiple items",
    weight: "Up to 10kg",
    icon: "🛍️",
  },
];

export default function PackageDetailsPage() {
  const [packageSize, setPackageSize] = useState("medium");
  const [description, setDescription] = useState("");
  const [packageValue, setPackageValue] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [declaredSafe, setDeclaredSafe] = useState(false);

  const canContinue =
    packageSize &&
    description.trim() &&
    packageValue.trim() &&
    declaredSafe;

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#151515]">
      {/* HEADER */}
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight"
          >
            Door<span className="text-[#FF6B35]">-Step</span>
          </Link>

          {/* PROGRESS */}
          <div className="hidden items-center gap-3 text-sm font-semibold sm:flex">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FiCheck size={15} />
              </span>

              <span className="text-gray-500">
                Delivery
              </span>
            </div>

            <span className="h-px w-8 bg-[#FF6B35]" />

            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                2
              </span>

              <span>
                Package
              </span>
            </div>

            <span className="h-px w-8 bg-gray-200" />

            <div className="flex items-center gap-2 text-gray-400">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                3
              </span>

              <span>Confirm</span>
            </div>
          </div>

          <Link
            href="/send-package"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft size={17} />
            Back
          </Link>
        </div>
      </header>

      {/* PAGE */}
      <section className="px-5 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          {/* TITLE */}
          <div className="max-w-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFE7DC] text-[#FF6B35]">
              <FiPackage size={24} />
            </div>

            <p className="text-sm font-bold text-[#FF6B35]">
              STEP 2 OF 3
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
              Tell us about your package
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Give us a few details about what you're sending so we can match
              you with the right rider and vehicle.
            </p>
          </div>

          {/* CONTENT */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* FORM */}
            <div className="space-y-7 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
              {/* PACKAGE SIZE */}
              <div>
                <div className="mb-4">
                  <label className="text-sm font-bold">
                    Package size
                  </label>

                  <p className="mt-1 text-xs text-gray-500">
                    Choose the option that best describes your package.
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {packageSizes.map((size) => {
                    const selected = packageSize === size.id;

                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setPackageSize(size.id)}
                        className={`relative rounded-2xl border p-5 text-left transition ${
                          selected
                            ? "border-[#FF6B35] bg-[#FFF8F3] ring-2 ring-[#FF6B35]/10"
                            : "border-black/10 hover:border-[#FF6B35]/40"
                        }`}
                      >
                        {selected && (
                          <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                            <FiCheck size={13} />
                          </span>
                        )}

                        <span className="text-3xl">
                          {size.icon}
                        </span>

                        <h3 className="mt-4 text-sm font-extrabold">
                          {size.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {size.description}
                        </p>

                        <p className="mt-3 text-xs font-bold text-[#FF6B35]">
                          {size.weight}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-bold"
                >
                  What are you sending?
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: Black sneakers and two shirts"
                  rows={4}
                  maxLength={300}
                  className="w-full resize-none rounded-2xl border border-black/10 px-4 py-4 text-sm outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10"
                />

                <div className="mt-2 flex justify-end text-xs text-gray-400">
                  {description.length}/300
                </div>
              </div>

              {/* VALUE */}
              <div>
                <label
                  htmlFor="packageValue"
                  className="mb-2 block text-sm font-bold"
                >
                  Estimated package value
                </label>

                <p className="mb-3 text-xs text-gray-500">
                  This helps us understand the value of the item being
                  transported.
                </p>

                <div className="flex items-center rounded-2xl border border-black/10 px-4 py-3 transition focus-within:border-[#FF6B35]">
                  <span className="mr-3 text-sm font-bold text-gray-500">
                    ₦
                  </span>

                  <input
                    id="packageValue"
                    type="number"
                    min="0"
                    value={packageValue}
                    onChange={(e) => setPackageValue(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              {/* PHOTO */}
              <div>
                <div className="mb-3">
                  <label className="text-sm font-bold">
                    Add a package photo
                  </label>

                  <p className="mt-1 text-xs text-gray-500">
                    Optional. A photo can help the rider identify the package.
                  </p>
                </div>

                <label
                  htmlFor="packagePhoto"
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-black/15 bg-[#FFF8F3] p-5 transition hover:border-[#FF6B35] hover:bg-[#FFF0E9]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#FF6B35] shadow-sm">
                    <FiCamera size={20} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold">
                      {photoName || "Upload package photo"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      JPG, PNG or WEBP
                    </p>
                  </div>

                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-bold shadow-sm">
                    Browse
                  </span>
                </label>

                <input
                  id="packagePhoto"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setPhotoName(file.name);
                    }
                  }}
                />
              </div>

              {/* SAFETY DECLARATION */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600">
                    <FiInfo size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold">
                      Package declaration
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-gray-600">
                      For everyone's safety, Door-Step does not permit
                      dangerous, illegal, explosive, or otherwise restricted
                      items.
                    </p>
                  </div>
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={declaredSafe}
                    onChange={(e) =>
                      setDeclaredSafe(e.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 accent-[#FF6B35]"
                  />

                  <span className="text-xs font-semibold leading-5 text-gray-700">
                    I confirm that this package contains only permitted items
                    and that the information provided is accurate.
                  </span>
                </label>
              </div>

              {/* CONTINUE */}
              <Link
                href="/send-package/vehicle"
                className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold transition ${
                  canContinue
                    ? "bg-[#FF6B35] text-white hover:bg-[#E85625]"
                    : "pointer-events-none bg-gray-200 text-gray-400"
                }`}
              >
                Continue
                <FiArrowRight size={18} />
              </Link>
            </div>

            {/* SUMMARY */}
            <aside className="h-fit rounded-[2rem] bg-[#151515] p-7 text-white lg:sticky lg:top-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                📦
              </div>

              <h2 className="mt-5 text-xl font-extrabold">
                Package summary
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Your package information will be used to determine the right
                vehicle and delivery price.
              </p>

              <div className="mt-7 space-y-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                    PACKAGE SIZE
                  </p>

                  <p className="mt-1 text-sm font-semibold capitalize">
                    {packageSize}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                    DESCRIPTION
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {description || "Not provided yet"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                    ESTIMATED VALUE
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {packageValue
                      ? `₦${Number(packageValue).toLocaleString()}`
                      : "Not provided yet"}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-green-400">
                    ✓
                  </span>

                  <p className="text-xs leading-5 text-white/50">
                    Your package information is kept private and used only for
                    completing your delivery.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
