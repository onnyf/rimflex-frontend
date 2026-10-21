
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiGift,
  FiInfo,
  FiPercent,
  FiSave,
  FiTag,
  FiUsers,
} from "react-icons/fi";

type PromotionType =
  | "Percentage Discount"
  | "Fixed Discount"
  | "Free Delivery"
  | "Restaurant Promotion";

type TargetAudience =
  | "All Customers"
  | "New Customers"
  | "Returning Customers";

export default function CreatePromotionPage() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const [type, setType] =
    useState<PromotionType>("Percentage Discount");

  const [discountValue, setDiscountValue] = useState("");

  const [restaurant, setRestaurant] =
    useState("All Restaurants");

  const [targetAudience, setTargetAudience] =
    useState<TargetAudience>("All Customers");

  const [minimumOrder, setMinimumOrder] = useState("");
  const [usageLimit, setUsageLimit] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [active, setActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const discountLabel = useMemo(() => {
    switch (type) {
      case "Percentage Discount":
      case "Restaurant Promotion":
        return "Discount Percentage";

      case "Fixed Discount":
        return "Discount Amount";

      case "Free Delivery":
        return "Delivery Discount";

      default:
        return "Discount";
    }
  }, [type]);

  const discountPreview = useMemo(() => {
    if (type === "Free Delivery") {
      return "Free Delivery";
    }

    if (!discountValue) {
      return "—";
    }

    if (
      type === "Percentage Discount" ||
      type === "Restaurant Promotion"
    ) {
      return `${discountValue}%`;
    }

    return `₦${Number(discountValue).toLocaleString("en-NG")}`;
  }, [discountValue, type]);

  function generateCode() {
    const random = Math.floor(1000 + Math.random() * 9000);

    const prefix =
      type === "Free Delivery"
        ? "FREE"
        : type === "Fixed Discount"
          ? "SAVE"
          : "DOORSTEP";

    setCode(`${prefix}${random}`);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      window.alert("Please enter a promotion title.");
      return;
    }

    if (!code.trim()) {
      window.alert("Please enter a promotion code.");
      return;
    }

    if (type !== "Free Delivery" && !discountValue) {
      window.alert("Please enter the discount value.");
      return;
    }

    if (!startDate || !endDate) {
      window.alert("Please select the promotion start and end dates.");
      return;
    }

    if (endDate < startDate) {
      window.alert("The end date cannot be before the start date.");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);

      window.alert(
        "Promotion created successfully. Backend integration will save this promotion permanently."
      );
    }, 700);
  }

  return (
    <div className="min-h-screen bg-[#EEF2F1]">
      {/* HEADER */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/promotions"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
            >
              <FiArrowLeft />
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#003A2B]">
                Marketing
              </p>

              <h1 className="mt-1 text-2xl font-black text-gray-950">
                Create Promotion
              </h1>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 xl:grid-cols-[1.6fr_0.8fr]"
        >
          {/* LEFT */}
          <div className="space-y-6">
            {/* BASIC INFORMATION */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                    <FiGift />
                  </div>

                  <div>
                    <h2 className="font-black text-gray-950">
                      Basic Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Enter the basic details for your promotion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Promotion Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(event) =>
                      setTitle(event.target.value)
                    }
                    placeholder="e.g. Welcome to Door-Step"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#003A2B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    rows={4}
                    placeholder="Describe what customers will receive..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#003A2B] focus:bg-white"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Promotion Code
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={code}
                        onChange={(event) =>
                          setCode(
                            event.target.value
                              .toUpperCase()
                              .replace(/\s/g, "")
                          )
                        }
                        placeholder="WELCOME20"
                        className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm font-bold text-gray-900 outline-none transition placeholder:font-sans placeholder:font-normal placeholder:text-gray-400 focus:border-[#003A2B] focus:bg-white"
                      />

                      <button
                        type="button"
                        onClick={generateCode}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-[#003A2B] transition hover:bg-gray-50"
                      >
                        Generate
                      </button>
                    </div>
                  </div>

                  <SelectField
                    label="Promotion Type"
                    value={type}
                    onChange={(value) =>
                      setType(value as PromotionType)
                    }
                    options={[
                      "Percentage Discount",
                      "Fixed Discount",
                      "Free Delivery",
                      "Restaurant Promotion",
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* DISCOUNT SETTINGS */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                    <FiPercent />
                  </div>

                  <div>
                    <h2 className="font-black text-gray-950">
                      Discount Settings
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Configure the value and conditions of the offer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    {discountLabel}
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={discountValue}
                      onChange={(event) =>
                        setDiscountValue(event.target.value)
                      }
                      disabled={type === "Free Delivery"}
                      placeholder={
                        type === "Free Delivery"
                          ? "Not required"
                          : type === "Fixed Discount"
                            ? "e.g. 500"
                            : "e.g. 20"
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#003A2B] focus:bg-white disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                    {type !== "Fixed Discount" &&
                      type !== "Free Delivery" && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                          %
                        </span>
                      )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Minimum Order Amount
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                      ₦
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={minimumOrder}
                      onChange={(event) =>
                        setMinimumOrder(event.target.value)
                      }
                      placeholder="e.g. 5000"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#003A2B] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Usage Limit
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={usageLimit}
                    onChange={(event) =>
                      setUsageLimit(event.target.value)
                    }
                    placeholder="e.g. 1000"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#003A2B] focus:bg-white"
                  />
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <FiInfo className="mt-0.5 shrink-0 text-[#003A2B]" />

                    <p className="text-xs leading-5 text-gray-500">
                      Set a usage limit to control how many customers
                      can redeem this promotion. Leave the limit for
                      backend configuration if unlimited promotions are
                      supported later.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* AUDIENCE */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <FiUsers />
                  </div>

                  <div>
                    <h2 className="font-black text-gray-950">
                      Audience & Restaurant
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Decide who can use this promotion and where.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 md:grid-cols-2">
                <SelectField
                  label="Restaurant"
                  value={restaurant}
                  onChange={setRestaurant}
                  options={[
                    "All Restaurants",
                    "Chicken Republic",
                    "Bukka Hut",
                    "The Place",
                    "KFC",
                    "Selected Restaurants",
                  ]}
                />

                <SelectField
                  label="Target Audience"
                  value={targetAudience}
                  onChange={(value) =>
                    setTargetAudience(value as TargetAudience)
                  }
                  options={[
                    "All Customers",
                    "New Customers",
                    "Returning Customers",
                  ]}
                />
              </div>
            </section>

            {/* SCHEDULE */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-green-50 p-3 text-green-600">
                    <FiCalendar />
                  </div>

                  <div>
                    <h2 className="font-black text-gray-950">
                      Promotion Schedule
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Set when the promotion should become available.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) =>
                      setStartDate(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-[#003A2B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    End Date
                  </label>

                  <input
                    type="date"
                    value={endDate}
                    min={startDate || undefined}
                    onChange={(event) =>
                      setEndDate(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-[#003A2B] focus:bg-white"
                  />
                </div>
              </div>
            </section>

            {/* STATUS */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-black text-gray-950">
                      Promotion Status
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Control whether the promotion is immediately
                      available.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActive((value) => !value)}
                    className={`relative h-7 w-12 rounded-full transition ${
                      active ? "bg-[#003A2B]" : "bg-gray-300"
                    }`}
                    aria-label="Toggle promotion status"
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                        active ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div
                  className={`mt-4 rounded-xl p-4 ${
                    active
                      ? "bg-green-50 text-green-800"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {active ? (
                      <FiCheckCircle />
                    ) : (
                      <FiInfo />
                    )}

                    <p className="text-sm font-semibold">
                      {active
                        ? "Promotion will be active when its start date is reached."
                        : "Promotion will be created as inactive and must be activated later."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ACTIONS */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/admin/promotions"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#003A2B] px-6 py-3 font-bold text-white transition hover:bg-[#00513D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSave />
                {submitting ? "Creating..." : "Create Promotion"}
              </button>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <aside className="xl:sticky xl:top-6 xl:self-start">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#003A2B] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                  Customer Preview
                </p>

                <h2 className="mt-2 text-2xl font-black text-white">
                  Promotion Preview
                </h2>

                <p className="mt-2 text-sm text-gray-300">
                  This is how the promotion could appear to a customer.
                </p>
              </div>

              <div className="p-5">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                      <FiGift />
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      {active ? "Available" : "Inactive"}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#003A2B]">
                    Door-Step Promotion
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-gray-950">
                    {title || "Promotion Title"}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {description ||
                      "Your promotion description will appear here."}
                  </p>

                  <div className="mt-5 rounded-xl bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Offer
                    </p>

                    <p className="mt-1 text-3xl font-black text-[#003A2B]">
                      {discountPreview}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-400">
                        Promo Code
                      </p>

                      <p className="mt-1 font-mono font-black text-gray-900">
                        {code || "PROMOCODE"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#003A2B] p-3 text-white">
                      <FiTag />
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FiCalendar />
                      <span>
                        {startDate || "Start date"} —{" "}
                        {endDate || "End date"}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      Minimum order:{" "}
                      <span className="font-bold text-gray-700">
                        {minimumOrder
                          ? `₦${Number(
                              minimumOrder
                            ).toLocaleString("en-NG")}`
                          : "Not set"}
                      </span>
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Available to:{" "}
                      <span className="font-bold text-gray-700">
                        {targetAudience}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <FiInfo className="mt-0.5 shrink-0 text-blue-600" />

                    <p className="text-xs leading-5 text-blue-800">
                      This preview is for the admin dashboard. The
                      customer-facing promotion component will be
                      connected later to the backend promotion API.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-[#003A2B] focus:bg-white"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
