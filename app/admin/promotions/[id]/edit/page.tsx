
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiCheck,
  FiChevronDown,
  FiEye,
  FiGift,
  FiSave,
  FiX,
} from "react-icons/fi";
import { useEffect, useMemo, useState, type FormEvent } from "react";

type PromotionType = "Percentage" | "Fixed Discount" | "Free Delivery";

type PromotionStatus = "Active" | "Scheduled" | "Paused" | "Expired";

type Promotion = {
  id: string;
  title: string;
  description: string;
  code: string;
  type: PromotionType;
  discount: number;
  minOrder: number;
  usageLimit: number;
  restaurant: string;
  audience: string;
  startDate: string;
  endDate: string;
  status: PromotionStatus;
};

const promotions: Promotion[] = [
  {
    id: "PROMO-1001",
    title: "Welcome to Door-Step",
    description: "20% off your first Door-Step order.",
    code: "WELCOME20",
    type: "Percentage",
    discount: 20,
    minOrder: 5000,
    usageLimit: 1000,
    restaurant: "All Restaurants",
    audience: "New Customers",
    startDate: "2026-09-01",
    endDate: "2026-10-31",
    status: "Active",
  },
  {
    id: "PROMO-1002",
    title: "Free Delivery Weekend",
    description: "Enjoy free delivery on qualifying orders.",
    code: "FREEDELIVERY",
    type: "Free Delivery",
    discount: 0,
    minOrder: 8000,
    usageLimit: 1500,
    restaurant: "All Restaurants",
    audience: "All Customers",
    startDate: "2026-09-12",
    endDate: "2026-09-30",
    status: "Active",
  },
  {
    id: "PROMO-1003",
    title: "Chicken Republic Special",
    description: "Special discount on Chicken Republic orders.",
    code: "CHICKEN15",
    type: "Percentage",
    discount: 15,
    minOrder: 7000,
    usageLimit: 500,
    restaurant: "Chicken Republic",
    audience: "All Customers",
    startDate: "2026-09-05",
    endDate: "2026-09-25",
    status: "Active",
  },
  {
    id: "PROMO-1004",
    title: "Save ₦500",
    description: "Get ₦500 off qualifying orders.",
    code: "SAVE500",
    type: "Fixed Discount",
    discount: 500,
    minOrder: 5000,
    usageLimit: 1000,
    restaurant: "All Restaurants",
    audience: "Returning Customers",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    status: "Scheduled",
  },
  {
    id: "PROMO-1005",
    title: "New Month Offer",
    description: "Start the new month with a special Door-Step discount.",
    code: "NEWMONTH",
    type: "Percentage",
    discount: 10,
    minOrder: 5000,
    usageLimit: 1000,
    restaurant: "All Restaurants",
    audience: "All Customers",
    startDate: "2026-10-01",
    endDate: "2026-10-15",
    status: "Scheduled",
  },
  {
    id: "PROMO-1006",
    title: "First Order Bonus",
    description: "Get ₦1,000 off your first order.",
    code: "FIRSTORDER",
    type: "Fixed Discount",
    discount: 1000,
    minOrder: 5000,
    usageLimit: 500,
    restaurant: "All Restaurants",
    audience: "New Customers",
    startDate: "2026-08-01",
    endDate: "2026-09-30",
    status: "Paused",
  },
  {
    id: "PROMO-1007",
    title: "Lunch Time Deal",
    description: "Enjoy a special lunchtime discount.",
    code: "LUNCH10",
    type: "Percentage",
    discount: 10,
    minOrder: 4000,
    usageLimit: 1000,
    restaurant: "Selected Restaurants",
    audience: "All Customers",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    status: "Expired",
  },
  {
    id: "PROMO-1008",
    title: "Bukka Hut Discount",
    description: "Save on selected Bukka Hut meals.",
    code: "BUKKAHUT20",
    type: "Percentage",
    discount: 20,
    minOrder: 5000,
    usageLimit: 600,
    restaurant: "Bukka Hut",
    audience: "All Customers",
    startDate: "2026-07-15",
    endDate: "2026-08-15",
    status: "Expired",
  },
];

function formatCurrency(value: number) {
  return `₦${value.toLocaleString()}`;
}

function EditPromotionPage() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const promotion = useMemo(
    () => promotions.find((item) => item.id === id),
    [id]
  );

  const [form, setForm] = useState<Promotion | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (promotion) {
      setForm({ ...promotion });
    }
  }, [promotion]);

  if (!promotion) {
    return (
      <main className="min-h-screen bg-[#EEF2F1] p-6 lg:p-8">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FiX className="text-2xl" />
            </div>

            <h1 className="mt-6 text-2xl font-black text-gray-950">
              Promotion Not Found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              The promotion you are trying to edit does not exist in the
              current demo data.
            </p>

            <Link
              href="/admin/promotions"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#003A2B] px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              <FiArrowLeft />
              Back to Promotions
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!form) {
    return null;
  }

  function updateField<K extends keyof Promotion>(
    field: K,
    value: Promotion[K]
  ) {
    setForm((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form) return;

    const promotionTitle = form.title;
    const promotionId = form.id;

    setSaving(true);

    setTimeout(() => {
      setSaving(false);

      alert(
        `Promotion "${promotionTitle}" has been updated successfully in this demo.`
      );

      router.push(`/admin/promotions/${promotionId}`);
    }, 700);
  }

  const discountLabel =
    form.type === "Percentage"
      ? "Discount Percentage"
      : form.type === "Fixed Discount"
        ? "Discount Amount"
        : "Discount";

  return (
    <main className="min-h-screen bg-[#EEF2F1] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href={`/admin/promotions/${form.id}`}
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#003A2B]"
            >
              <FiArrowLeft />
              Back to Promotion
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <FiGift className="text-xl" />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                  Edit Promotion
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Update {form.title} · {form.id}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/promotions/${form.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-gray-300"
            >
              <FiEye />
              View Promotion
            </Link>

            <button
              type="button"
              onClick={() => router.push("/admin/promotions")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            {/* LEFT */}
            <div className="space-y-6">
              {/* BASIC INFORMATION */}
              <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7">
                  <h2 className="text-xl font-black text-gray-950">
                    Basic Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update the main details customers will see.
                  </p>
                </div>

                <div className="grid gap-5">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Promotion Title
                    </label>

                    <input
                      type="text"
                      value={form.title}
                      onChange={(event) =>
                        updateField("title", event.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[#003A2B] focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Description
                    </label>

                    <textarea
                      value={form.description}
                      onChange={(event) =>
                        updateField("description", event.target.value)
                      }
                      rows={4}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#003A2B] focus:bg-white"
                      required
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Promo Code
                      </label>

                      <input
                        type="text"
                        value={form.code}
                        onChange={(event) =>
                          updateField(
                            "code",
                            event.target.value.toUpperCase()
                          )
                        }
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm font-bold uppercase outline-none transition focus:border-[#003A2B] focus:bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Promotion Type
                      </label>

                      <div className="relative">
                        <select
                          value={form.type}
                          onChange={(event) =>
                            updateField(
                              "type",
                              event.target.value as PromotionType
                            )
                          }
                          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[#003A2B] focus:bg-white"
                        >
                          <option value="Percentage">Percentage</option>
                          <option value="Fixed Discount">
                            Fixed Discount
                          </option>
                          <option value="Free Delivery">Free Delivery</option>
                        </select>

                        <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* DISCOUNT SETTINGS */}
              <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7">
                  <h2 className="text-xl font-black text-gray-950">
                    Discount Settings
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Control how customers qualify for this promotion.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      {discountLabel}
                    </label>

                    <div className="relative">
                      {form.type === "Fixed Discount" && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                          ₦
                        </span>
                      )}

                      <input
                        type="number"
                        min="0"
                        max={form.type === "Percentage" ? 100 : undefined}
                        disabled={form.type === "Free Delivery"}
                        value={form.type === "Free Delivery" ? 0 : form.discount}
                        onChange={(event) =>
                          updateField(
                            "discount",
                            Number(event.target.value)
                          )
                        }
                        className={`w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#003A2B] focus:bg-white ${
                          form.type === "Fixed Discount" ? "pl-8" : ""
                        }`}
                      />

                      {form.type === "Percentage" && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                          %
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Minimum Order
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                        ₦
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={form.minOrder}
                        onChange={(event) =>
                          updateField("minOrder", Number(event.target.value))
                        }
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-8 pr-4 text-sm font-bold outline-none transition focus:border-[#003A2B] focus:bg-white"
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
                      value={form.usageLimit}
                      onChange={(event) =>
                        updateField(
                          "usageLimit",
                          Number(event.target.value)
                        )
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#003A2B] focus:bg-white"
                    />
                  </div>
                </div>
              </section>

              {/* AUDIENCE */}
              <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7">
                  <h2 className="text-xl font-black text-gray-950">
                    Audience & Restaurant
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Choose who can use this promotion and where it applies.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Restaurant
                    </label>

                    <div className="relative">
                      <select
                        value={form.restaurant}
                        onChange={(event) =>
                          updateField("restaurant", event.target.value)
                        }
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[#003A2B] focus:bg-white"
                      >
                        <option>All Restaurants</option>
                        <option>Chicken Republic</option>
                        <option>Bukka Hut</option>
                        <option>The Place</option>
                        <option>Selected Restaurants</option>
                      </select>

                      <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Customer Audience
                    </label>

                    <div className="relative">
                      <select
                        value={form.audience}
                        onChange={(event) =>
                          updateField("audience", event.target.value)
                        }
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[#003A2B] focus:bg-white"
                      >
                        <option>All Customers</option>
                        <option>New Customers</option>
                        <option>Returning Customers</option>
                      </select>

                      <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
              </section>

              {/* SCHEDULE */}
              <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7">
                  <h2 className="text-xl font-black text-gray-950">
                    Promotion Schedule
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Set when the promotion should become available.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Start Date
                    </label>

                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(event) =>
                        updateField("startDate", event.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[#003A2B] focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      End Date
                    </label>

                    <input
                      type="date"
                      value={form.endDate}
                      min={form.startDate}
                      onChange={(event) =>
                        updateField("endDate", event.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[#003A2B] focus:bg-white"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* STATUS */}
              <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-black text-gray-950">
                      Promotion Status
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Turn the promotion on or pause it. Paused promotions
                      cannot be used by customers.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "status",
                        form.status === "Active" ? "Paused" : "Active"
                      )
                    }
                    className={`relative h-7 w-14 shrink-0 rounded-full transition ${
                      form.status === "Active"
                        ? "bg-[#003A2B]"
                        : "bg-gray-300"
                    }`}
                    aria-label="Toggle promotion status"
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                        form.status === "Active"
                          ? "left-8"
                          : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      form.status === "Active"
                        ? "bg-emerald-500"
                        : "bg-gray-400"
                    }`}
                  />

                  <span className="text-sm font-bold text-gray-700">
                    {form.status === "Active"
                      ? "Promotion is active"
                      : "Promotion is paused"}
                  </span>
                </div>
              </section>
            </div>

            {/* RIGHT PREVIEW */}
            <aside className="xl:sticky xl:top-6 xl:h-fit">
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="bg-[#003A2B] p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                        Live Preview
                      </p>

                      <h2 className="mt-2 text-xl font-black">
                        Customer View
                      </h2>
                    </div>

                    <FiGift className="text-2xl text-orange-400" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
                          {form.code}
                        </p>

                        <h3 className="mt-2 text-xl font-black text-gray-950">
                          {form.title || "Promotion Title"}
                        </h3>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                        <FiGift />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {form.description || "Promotion description"}
                    </p>

                    <div className="mt-5 rounded-xl bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Offer
                      </p>

                      <p className="mt-1 text-2xl font-black text-[#003A2B]">
                        {form.type === "Percentage"
                          ? `${form.discount}% OFF`
                          : form.type === "Fixed Discount"
                            ? `${formatCurrency(form.discount)} OFF`
                            : "FREE DELIVERY"}
                      </p>
                    </div>

                    <div className="mt-4 space-y-2 text-xs text-gray-500">
                      <div className="flex justify-between gap-4">
                        <span>Minimum order</span>
                        <span className="font-bold text-gray-700">
                          {formatCurrency(form.minOrder)}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Restaurant</span>
                        <span className="text-right font-bold text-gray-700">
                          {form.restaurant}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Audience</span>
                        <span className="text-right font-bold text-gray-700">
                          {form.audience}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-700">
                        Status
                      </p>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          form.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {form.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <span>Valid from</span>
                      <span className="font-bold text-gray-700">
                        {form.startDate}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span>Valid until</span>
                      <span className="font-bold text-gray-700">
                        {form.endDate}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span>Usage limit</span>
                      <span className="font-bold text-gray-700">
                        {form.usageLimit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* SAVE BAR */}
          <div className="mt-6 flex flex-col-reverse gap-3 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FiCheck className="text-emerald-600" />
              Changes are ready to be saved.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  router.push(`/admin/promotions/${form.id}`)
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#003A2B] px-7 py-3 text-sm font-bold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSave />

                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>

        {/* DEMO NOTICE */}
        <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-4">
          <p className="text-sm leading-6 text-orange-800">
            <strong>Demo mode:</strong> Changes are currently simulated in
            the browser and are not yet connected to the Door-Step backend.
            When we connect the API/database, this form will save the
            promotion permanently.
          </p>
        </div>
      </div>
    </main>
  );
}

export default EditPromotionPage;
