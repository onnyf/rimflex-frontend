
"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FiActivity,
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiEdit2,
  FiExternalLink,
  FiGift,
  FiPercent,
  FiPauseCircle,
  FiTag,
  FiTrendingUp,
  FiUsers,
  FiXCircle,
} from "react-icons/fi";

type PromotionStatus = "Active" | "Scheduled" | "Expired" | "Paused";

type PromotionType =
  | "Percentage Discount"
  | "Fixed Discount"
  | "Free Delivery"
  | "Restaurant Promotion";

type Promotion = {
  id: string;
  code: string;
  title: string;
  description: string;
  type: PromotionType;
  status: PromotionStatus;
  discount: string;
  restaurant: string;
  target: string;
  startDate: string;
  endDate: string;
  usage: number;
  usageLimit: number;
  minimumOrder: number;
  totalDiscount: number;
  createdBy: string;
  createdDate: string;
};

const promotions: Promotion[] = [
  {
    id: "PROMO-1001",
    code: "WELCOME20",
    title: "Welcome to Door-Step",
    description: "20% off your first food delivery order.",
    type: "Percentage Discount",
    status: "Active",
    discount: "20%",
    restaurant: "All Restaurants",
    target: "New Customers",
    startDate: "Sep 01, 2026",
    endDate: "Oct 31, 2026",
    usage: 428,
    usageLimit: 1000,
    minimumOrder: 5000,
    totalDiscount: 856000,
    createdBy: "Admin",
    createdDate: "Aug 28, 2026",
  },
  {
    id: "PROMO-1002",
    code: "FREEDELIVERY",
    title: "Free Delivery Weekend",
    description: "Enjoy free delivery on selected weekend orders.",
    type: "Free Delivery",
    status: "Active",
    discount: "Free Delivery",
    restaurant: "All Restaurants",
    target: "All Customers",
    startDate: "Sep 12, 2026",
    endDate: "Sep 30, 2026",
    usage: 692,
    usageLimit: 1500,
    minimumOrder: 8000,
    totalDiscount: 1107200,
    createdBy: "Admin",
    createdDate: "Sep 05, 2026",
  },
  {
    id: "PROMO-1003",
    code: "CHICKEN15",
    title: "Chicken Republic Special",
    description: "15% discount on orders from Chicken Republic.",
    type: "Restaurant Promotion",
    status: "Active",
    discount: "15%",
    restaurant: "Chicken Republic",
    target: "All Customers",
    startDate: "Sep 05, 2026",
    endDate: "Sep 25, 2026",
    usage: 183,
    usageLimit: 500,
    minimumOrder: 7000,
    totalDiscount: 274500,
    createdBy: "Chicken Republic",
    createdDate: "Sep 02, 2026",
  },
  {
    id: "PROMO-1004",
    code: "SAVE500",
    title: "Save ₦500",
    description: "Get ₦500 off qualifying food orders.",
    type: "Fixed Discount",
    status: "Scheduled",
    discount: "₦500",
    restaurant: "All Restaurants",
    target: "Returning Customers",
    startDate: "Oct 01, 2026",
    endDate: "Oct 31, 2026",
    usage: 0,
    usageLimit: 2000,
    minimumOrder: 10000,
    totalDiscount: 0,
    createdBy: "Admin",
    createdDate: "Sep 15, 2026",
  },
  {
    id: "PROMO-1005",
    code: "NEWMONTH",
    title: "New Month Offer",
    description: "10% off selected orders for the new month.",
    type: "Percentage Discount",
    status: "Scheduled",
    discount: "10%",
    restaurant: "All Restaurants",
    target: "All Customers",
    startDate: "Oct 01, 2026",
    endDate: "Oct 15, 2026",
    usage: 0,
    usageLimit: 1000,
    minimumOrder: 5000,
    totalDiscount: 0,
    createdBy: "Admin",
    createdDate: "Sep 14, 2026",
  },
  {
    id: "PROMO-1006",
    code: "FIRSTORDER",
    title: "First Order Bonus",
    description: "₦1,000 discount for first-time customers.",
    type: "Fixed Discount",
    status: "Paused",
    discount: "₦1,000",
    restaurant: "All Restaurants",
    target: "New Customers",
    startDate: "Aug 01, 2026",
    endDate: "Sep 30, 2026",
    usage: 241,
    usageLimit: 500,
    minimumOrder: 6000,
    totalDiscount: 241000,
    createdBy: "Admin",
    createdDate: "Jul 28, 2026",
  },
  {
    id: "PROMO-1007",
    code: "LUNCH10",
    title: "Lunch Time Deal",
    description: "10% off lunch orders from selected restaurants.",
    type: "Percentage Discount",
    status: "Expired",
    discount: "10%",
    restaurant: "Selected Restaurants",
    target: "All Customers",
    startDate: "Aug 01, 2026",
    endDate: "Aug 31, 2026",
    usage: 811,
    usageLimit: 1000,
    minimumOrder: 5000,
    totalDiscount: 405500,
    createdBy: "Admin",
    createdDate: "Jul 27, 2026",
  },
  {
    id: "PROMO-1008",
    code: "BUKKAHUT20",
    title: "Bukka Hut Discount",
    description: "20% off orders from Bukka Hut.",
    type: "Restaurant Promotion",
    status: "Expired",
    discount: "20%",
    restaurant: "Bukka Hut",
    target: "All Customers",
    startDate: "Jul 15, 2026",
    endDate: "Aug 15, 2026",
    usage: 356,
    usageLimit: 600,
    minimumOrder: 6000,
    totalDiscount: 427200,
    createdBy: "Bukka Hut",
    createdDate: "Jul 10, 2026",
  },
];

const statusStyles: Record<PromotionStatus, string> = {
  Active: "bg-green-50 text-green-700 border-green-200",
  Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  Expired: "bg-gray-100 text-gray-600 border-gray-200",
  Paused: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

const statusIcon: Record<PromotionStatus, ReactNode> = {
  Active: <FiCheckCircle />,
  Scheduled: <FiClock />,
  Expired: <FiXCircle />,
  Paused: <FiPauseCircle />,
};

const activity = [
  {
    date: "Sep 18, 2026",
    time: "10:42 AM",
    title: "Promotion used",
    description:
      "Customer John Okafor used this promotion on order ORD-10001.",
  },
  {
    date: "Sep 18, 2026",
    time: "09:18 AM",
    title: "Promotion used",
    description:
      "Customer Sarah Williams used this promotion on an eligible order.",
  },
  {
    date: "Sep 17, 2026",
    time: "06:34 PM",
    title: "Promotion used",
    description:
      "Customer Aisha Ibrahim used this promotion successfully.",
  },
  {
    date: "Aug 28, 2026",
    time: "02:15 PM",
    title: "Promotion created",
    description:
      "Promotion was created by the Door-Step administrator.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatusBadge({
  status,
}: {
  status: PromotionStatus;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyles[status]}`}
    >
      {statusIcon[status]}
      {status}
    </span>
  );
}

export default function PromotionDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const promotion = useMemo(
    () => promotions.find((item) => item.id === id),
    [id]
  );

  const [status, setStatus] = useState<PromotionStatus>(
    promotion?.status ?? "Active"
  );

  if (!promotion) {
    return (
      <div className="min-h-screen bg-[#EEF2F1] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <FiTag className="mx-auto text-5xl text-gray-300" />

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-red-600">
            Promotion Not Found
          </p>

          <h1 className="mt-3 text-3xl font-black text-gray-950">
            We could not find this promotion
          </h1>

          <p className="mt-3 text-gray-500">
            The promotion ID{" "}
            <span className="font-mono font-bold text-gray-700">
              {id}
            </span>{" "}
            does not exist in the current demo data.
          </p>

          <Link
            href="/admin/promotions"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#003A2B] px-5 py-3 font-bold text-white transition hover:bg-[#00513D]"
          >
            <FiArrowLeft />
            Back to Promotions
          </Link>
        </div>
      </div>
    );
  }

  const usagePercentage =
    promotion.usageLimit > 0
      ? Math.min(
          100,
          Math.round(
            (promotion.usage / promotion.usageLimit) * 100
          )
        )
      : 0;

  const remainingUses = Math.max(
    0,
    promotion.usageLimit - promotion.usage
  );

  async function copyCode() {
    if (!promotion) return;

    try {
      await navigator.clipboard.writeText(promotion.code);
      window.alert(`Promotion code "${promotion.code}" copied.`);
    } catch {
      window.alert(`Promotion code: ${promotion.code}`);
    }
  }

  function toggleStatus() {
    if (status === "Active") {
      setStatus("Paused");
      return;
    }

    if (status === "Paused") {
      setStatus("Active");
    }
  }

  return (
    <div className="min-h-screen bg-[#EEF2F1]">
      {/* HEADER */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/promotions"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
              >
                <FiArrowLeft />
              </Link>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#003A2B]">
                  Promotion Details
                </p>

                <h1 className="mt-1 text-2xl font-black text-gray-950">
                  {promotion.title}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/admin/promotions/${promotion.id}/edit`}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                <FiEdit2 />
                Edit
              </Link>

              {(status === "Active" || status === "Paused") && (
                <button
                  type="button"
                  onClick={toggleStatus}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                    status === "Active"
                      ? "border border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                      : "bg-[#003A2B] text-white hover:bg-[#00513D]"
                  }`}
                >
                  {status === "Active" ? (
                    <>
                      <FiPauseCircle />
                      Pause Promotion
                    </>
                  ) : (
                    <>
                      <FiCheckCircle />
                      Activate Promotion
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {/* HERO CARD */}
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-[#003A2B] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/10 p-4 text-3xl text-orange-400">
                  <FiGift />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-black text-white sm:text-3xl">
                      {promotion.title}
                    </h2>

                    <StatusBadge status={status} />
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-200">
                    {promotion.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={copyCode}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-mono text-sm font-black text-[#003A2B] transition hover:bg-gray-100"
                    >
                      <FiCopy />
                      {promotion.code}
                    </button>

                    <span className="text-sm text-gray-300">
                      {promotion.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:min-w-[230px]">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Discount
                </p>

                <p className="mt-2 text-4xl font-black text-white">
                  {promotion.discount}
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  Minimum order:{" "}
                  <span className="font-bold text-white">
                    {formatCurrency(promotion.minimumOrder)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Promotion ID
              </p>
              <p className="mt-2 font-mono font-bold text-gray-900">
                {promotion.id}
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Restaurant
              </p>
              <p className="mt-2 font-bold text-gray-900">
                {promotion.restaurant}
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Target Audience
              </p>
              <p className="mt-2 font-bold text-gray-900">
                {promotion.target}
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Created By
              </p>
              <p className="mt-2 font-bold text-gray-900">
                {promotion.createdBy}
              </p>
            </div>
          </div>
        </section>

        {/* STAT CARDS */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Usage
                </p>
                <p className="mt-2 text-3xl font-black text-gray-950">
                  {promotion.usage.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-xl text-blue-600">
                <FiUsers />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              {remainingUses.toLocaleString()} uses remaining
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Usage Rate
                </p>
                <p className="mt-2 text-3xl font-black text-gray-950">
                  {usagePercentage}%
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 p-3 text-xl text-orange-600">
                <FiTrendingUp />
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-orange-500"
                style={{
                  width: `${usagePercentage}%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Discount
                </p>
                <p className="mt-2 text-2xl font-black text-gray-950">
                  {formatCurrency(promotion.totalDiscount)}
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-xl text-purple-600">
                <FiPercent />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Value given to customers
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Usage Limit
                </p>
                <p className="mt-2 text-3xl font-black text-gray-950">
                  {promotion.usageLimit.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-xl text-green-600">
                <FiActivity />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Maximum promotion uses
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* PROMOTION INFORMATION */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <h2 className="text-lg font-black text-gray-950">
                  Promotion Information
                </h2>
              </div>

              <div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2">
                <InfoItem
                  label="Promotion Code"
                  value={promotion.code}
                  icon={<FiTag />}
                  copy
                  onCopy={copyCode}
                />

                <InfoItem
                  label="Promotion Type"
                  value={promotion.type}
                  icon={<FiGift />}
                />

                <InfoItem
                  label="Discount"
                  value={promotion.discount}
                  icon={<FiPercent />}
                />

                <InfoItem
                  label="Minimum Order"
                  value={formatCurrency(promotion.minimumOrder)}
                  icon={<FiActivity />}
                />

                <InfoItem
                  label="Target Audience"
                  value={promotion.target}
                  icon={<FiUsers />}
                />

                <InfoItem
                  label="Restaurant"
                  value={promotion.restaurant}
                  icon={<FiExternalLink />}
                />
              </div>
            </section>

            {/* DURATION */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <h2 className="text-lg font-black text-gray-950">
                  Promotion Duration
                </h2>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-green-50 p-3 text-green-600">
                      <FiCalendar />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Start Date
                      </p>

                      <p className="mt-1 font-black text-gray-950">
                        {promotion.startDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-red-50 p-3 text-red-600">
                      <FiCalendar />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        End Date
                      </p>

                      <p className="mt-1 font-black text-gray-950">
                        {promotion.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ACTIVITY */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-gray-950">
                      Recent Activity
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Recent activity related to this promotion.
                    </p>
                  </div>

                  <FiActivity className="text-xl text-[#003A2B]" />
                </div>
              </div>

              <div className="p-5">
                <div className="relative">
                  <div className="absolute bottom-4 left-3 top-4 w-px bg-gray-200" />

                  <div className="space-y-7">
                    {activity.map((item, index) => (
                      <div
                        key={`${item.date}-${index}`}
                        className="relative flex gap-4"
                      >
                        <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#003A2B] text-xs text-white">
                          <FiCheckCircle />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-gray-950">
                              {item.title}
                            </p>

                            <span className="text-xs text-gray-400">
                              {item.date} · {item.time}
                            </span>
                          </div>

                          <p className="mt-1 text-sm leading-6 text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* USAGE */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <h2 className="text-lg font-black text-gray-950">
                  Usage Overview
                </h2>
              </div>

              <div className="p-5">
                <div className="text-center">
                  <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-orange-100">
                    <div>
                      <p className="text-3xl font-black text-gray-950">
                        {usagePercentage}%
                      </p>
                      <p className="text-xs font-semibold text-gray-400">
                        used
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <UsageRow
                    label="Used"
                    value={promotion.usage.toLocaleString()}
                  />

                  <UsageRow
                    label="Remaining"
                    value={remainingUses.toLocaleString()}
                  />

                  <UsageRow
                    label="Maximum"
                    value={promotion.usageLimit.toLocaleString()}
                  />
                </div>
              </div>
            </section>

            {/* CREATION */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <h2 className="text-lg font-black text-gray-950">
                  Record Information
                </h2>
              </div>

              <div className="space-y-5 p-5">
                <InfoItem
                  label="Created By"
                  value={promotion.createdBy}
                  icon={<FiUsers />}
                />

                <InfoItem
                  label="Created Date"
                  value={promotion.createdDate}
                  icon={<FiCalendar />}
                />

                <InfoItem
                  label="Current Status"
                  value={status}
                  icon={statusIcon[status]}
                />
              </div>
            </section>

            {/* QUICK ACTIONS */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <h2 className="text-lg font-black text-gray-950">
                  Quick Actions
                </h2>
              </div>

              <div className="space-y-3 p-5">
                <Link
                  href={`/admin/promotions/${promotion.id}/edit`}
                  className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <FiEdit2 />
                    Edit Promotion
                  </span>

                  <span>→</span>
                </Link>

                <Link
                  href="/admin/promotions"
                  className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <FiArrowLeft />
                    All Promotions
                  </span>

                  <span>→</span>
                </Link>

                <button
                  type="button"
                  onClick={copyCode}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <FiCopy />
                    Copy Promo Code
                  </span>

                  <span>→</span>
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* DEMO NOTICE */}
        <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <FiGift className="mt-0.5 shrink-0 text-xl text-orange-600" />

            <div>
              <p className="font-black text-orange-900">
                Demo promotion details
              </p>

              <p className="mt-1 text-sm leading-6 text-orange-800">
                This page currently uses demo promotion data. Status changes
                only affect the current page until the Door-Step backend is
                connected.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoItem({
  label,
  value,
  icon,
  copy = false,
  onCopy,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  copy?: boolean;
  onCopy?: () => void;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-3">
        <div className="text-lg text-[#003A2B]">{icon}</div>

        <p className="min-w-0 break-words font-bold text-gray-900">
          {value}
        </p>

        {copy && onCopy && (
          <button
            type="button"
            onClick={onCopy}
            className="ml-auto shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#003A2B]"
            title="Copy"
          >
            <FiCopy />
          </button>
        )}
      </div>
    </div>
  );
}

function UsageRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm font-semibold text-gray-500">
        {label}
      </span>

      <span className="font-black text-gray-950">{value}</span>
    </div>
  );
}
