
"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiEdit2,
  FiEye,
  FiFilter,
  FiGift,
  FiMoreVertical,
  FiPauseCircle,
  FiPercent,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTag,
  FiTrash2,
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
};

const initialPromotions: Promotion[] = [
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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function PromotionStatusBadge({
  status,
}: {
  status: PromotionStatus;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyles[status]}`}
    >
      {statusIcon[status]}
      {status}
    </span>
  );
}

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] =
    useState<Promotion[]>(initialPromotions);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PromotionStatus>(
    "All"
  );
  const [typeFilter, setTypeFilter] = useState<"All" | PromotionType>("All");

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredPromotions = useMemo(() => {
    const query = search.toLowerCase().trim();

    return promotions.filter((promotion) => {
      const matchesSearch =
        !query ||
        promotion.id.toLowerCase().includes(query) ||
        promotion.code.toLowerCase().includes(query) ||
        promotion.title.toLowerCase().includes(query) ||
        promotion.restaurant.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || promotion.status === statusFilter;

      const matchesType =
        typeFilter === "All" || promotion.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [promotions, search, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const active = promotions.filter(
      (promotion) => promotion.status === "Active"
    ).length;

    const scheduled = promotions.filter(
      (promotion) => promotion.status === "Scheduled"
    ).length;

    const totalUsage = promotions.reduce(
      (sum, promotion) => sum + promotion.usage,
      0
    );

    const totalDiscount = promotions.reduce(
      (sum, promotion) => sum + promotion.totalDiscount,
      0
    );

    return {
      total: promotions.length,
      active,
      scheduled,
      totalUsage,
      totalDiscount,
    };
  }, [promotions]);

  function updateStatus(
    id: string,
    status: PromotionStatus
  ) {
    setPromotions((current) =>
      current.map((promotion) =>
        promotion.id === id
          ? {
              ...promotion,
              status,
            }
          : promotion
      )
    );

    setOpenMenu(null);
  }

  function deletePromotion(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this promotion?"
    );

    if (!confirmed) return;

    setPromotions((current) =>
      current.filter((promotion) => promotion.id !== id)
    );

    setOpenMenu(null);
  }

  function resetPromotions() {
    setPromotions(initialPromotions);
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
  }

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      window.alert(`Promotion code "${code}" copied.`);
    } catch {
      window.alert(`Promotion code: ${code}`);
    }
  }

  return (
    <div className="min-h-screen bg-[#EEF2F1]">
      {/* HEADER */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#003A2B]">
                Marketing
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
                Promotions
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Create and manage discounts, promo codes and special offers
                across the Door-Step platform.
              </p>
            </div>

            <Link
              href="/admin/promotions/create"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#003A2B] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#00513D]"
            >
              <FiPlus />
              Create Promotion
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Promotions
                </p>
                <p className="mt-2 text-3xl font-black text-gray-950">
                  {stats.total}
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 p-3 text-xl text-orange-600">
                <FiGift />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Active Promotions
                </p>
                <p className="mt-2 text-3xl font-black text-gray-950">
                  {stats.active}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-xl text-green-600">
                <FiCheckCircle />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Scheduled
                </p>
                <p className="mt-2 text-3xl font-black text-gray-950">
                  {stats.scheduled}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-xl text-blue-600">
                <FiCalendar />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Discount
                </p>
                <p className="mt-2 text-2xl font-black text-gray-950">
                  {formatCurrency(stats.totalDiscount)}
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-xl text-purple-600">
                <FiPercent />
              </div>
            </div>
          </div>
        </div>

        {/* SUMMARY STRIP */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Total Usage
              </p>

              <p className="mt-2 flex items-center gap-2 text-xl font-black text-gray-950">
                <FiUsers className="text-[#003A2B]" />
                {stats.totalUsage.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Active Reach
              </p>

              <p className="mt-2 flex items-center gap-2 text-xl font-black text-gray-950">
                <FiActivity className="text-[#003A2B]" />
                Customers & Restaurants
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Promotion Engine
              </p>

              <p className="mt-2 text-xl font-black text-gray-950">
                Platform + Restaurant
              </p>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-md">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by code, title, restaurant..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-[#003A2B] focus:bg-white"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <FiFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as "All" | PromotionStatus
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-9 text-sm font-semibold text-gray-700 outline-none focus:border-[#003A2B] sm:w-48"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Paused">Paused</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(
                    event.target.value as "All" | PromotionType
                  )
                }
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-[#003A2B] sm:w-56"
              >
                <option value="All">All Promotion Types</option>
                <option value="Percentage Discount">
                  Percentage Discount
                </option>
                <option value="Fixed Discount">Fixed Discount</option>
                <option value="Free Delivery">Free Delivery</option>
                <option value="Restaurant Promotion">
                  Restaurant Promotion
                </option>
              </select>

              <button
                type="button"
                onClick={resetPromotions}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <FiRefreshCw />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="mt-6 hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Promotion
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Type
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Discount
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Usage
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Duration
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredPromotions.map((promotion) => {
                  const usagePercentage =
                    promotion.usageLimit > 0
                      ? Math.min(
                          100,
                          Math.round(
                            (promotion.usage / promotion.usageLimit) * 100
                          )
                        )
                      : 0;

                  return (
                    <tr
                      key={promotion.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-5">
                        <div className="flex items-start gap-3">
                          <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                            <FiTag />
                          </div>

                          <div>
                            <p className="font-black text-gray-950">
                              {promotion.title}
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                              <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-xs font-bold text-gray-700">
                                {promotion.code}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  copyCode(promotion.code)
                                }
                                className="text-gray-400 transition hover:text-[#003A2B]"
                                title="Copy promotion code"
                              >
                                <FiCopy />
                              </button>
                            </div>

                            <p className="mt-1 text-xs text-gray-500">
                              {promotion.restaurant}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-sm font-semibold text-gray-700">
                          {promotion.type}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {promotion.target}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-lg font-black text-gray-950">
                          {promotion.discount}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Min. {formatCurrency(promotion.minimumOrder)}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <div className="w-36">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-gray-700">
                              {promotion.usage.toLocaleString()}
                            </span>

                            <span className="text-gray-400">
                              {promotion.usageLimit.toLocaleString()}
                            </span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-[#003A2B]"
                              style={{
                                width: `${usagePercentage}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <FiCalendar className="text-gray-400" />
                          <div>
                            <p>{promotion.startDate}</p>
                            <p className="mt-1 text-xs text-gray-400">
                              to {promotion.endDate}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <PromotionStatusBadge status={promotion.status} />
                      </td>

                      <td className="px-5 py-5">
                        <div className="relative flex justify-end">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === promotion.id
                                  ? null
                                  : promotion.id
                              )
                            }
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-950"
                          >
                            <FiMoreVertical />
                          </button>

                          {openMenu === promotion.id && (
                            <div className="absolute right-0 top-11 z-20 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl">
                              <Link
                                href={`/admin/promotions/${promotion.id}`}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                onClick={() => setOpenMenu(null)}
                              >
                                <FiEye />
                                View Details
                              </Link>

                              <Link
                                href={`/admin/promotions/${promotion.id}/edit`}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                onClick={() => setOpenMenu(null)}
                              >
                                <FiEdit2 />
                                Edit Promotion
                              </Link>

                              {promotion.status === "Active" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateStatus(
                                      promotion.id,
                                      "Paused"
                                    )
                                  }
                                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-yellow-700 hover:bg-yellow-50"
                                >
                                  <FiPauseCircle />
                                  Pause
                                </button>
                              )}

                              {promotion.status === "Paused" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateStatus(
                                      promotion.id,
                                      "Active"
                                    )
                                  }
                                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-green-700 hover:bg-green-50"
                                >
                                  <FiCheckCircle />
                                  Activate
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  deletePromotion(promotion.id)
                                }
                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                              >
                                <FiTrash2 />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="mt-6 grid gap-4 lg:hidden">
          {filteredPromotions.map((promotion) => {
            const usagePercentage =
              promotion.usageLimit > 0
                ? Math.min(
                    100,
                    Math.round(
                      (promotion.usage / promotion.usageLimit) * 100
                    )
                  )
                : 0;

            return (
              <div
                key={promotion.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                      <FiTag />
                    </div>

                    <div>
                      <p className="font-black text-gray-950">
                        {promotion.title}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-xs font-bold text-gray-700">
                          {promotion.code}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            copyCode(promotion.code)
                          }
                          className="text-gray-400 hover:text-[#003A2B]"
                        >
                          <FiCopy />
                        </button>
                      </div>
                    </div>
                  </div>

                  <PromotionStatusBadge status={promotion.status} />
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-500">
                  {promotion.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Discount
                    </p>
                    <p className="mt-1 text-xl font-black text-gray-950">
                      {promotion.discount}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Usage
                    </p>
                    <p className="mt-1 text-xl font-black text-gray-950">
                      {promotion.usage.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-gray-600">
                      Usage limit
                    </span>
                    <span className="font-bold text-gray-800">
                      {promotion.usage.toLocaleString()} /{" "}
                      {promotion.usageLimit.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#003A2B]"
                      style={{
                        width: `${usagePercentage}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiCalendar className="text-gray-400" />
                    <span>
                      {promotion.startDate} — {promotion.endDate}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Restaurant:{" "}
                    <span className="font-semibold text-gray-700">
                      {promotion.restaurant}
                    </span>
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Target:{" "}
                    <span className="font-semibold text-gray-700">
                      {promotion.target}
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={`/admin/promotions/${promotion.id}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#003A2B] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#00513D]"
                  >
                    <FiEye />
                    View
                  </Link>

                  <Link
                    href={`/admin/promotions/${promotion.id}/edit`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                  >
                    <FiEdit2 />
                    Edit
                  </Link>
                </div>

                <div className="mt-2 flex gap-2">
                  {promotion.status === "Active" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(promotion.id, "Paused")
                      }
                      className="flex-1 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-bold text-yellow-700"
                    >
                      Pause
                    </button>
                  )}

                  {promotion.status === "Paused" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(promotion.id, "Active")
                      }
                      className="flex-1 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700"
                    >
                      Activate
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      deletePromotion(promotion.id)
                    }
                    className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredPromotions.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <FiTag className="mx-auto text-4xl text-gray-300" />

            <h2 className="mt-4 text-xl font-black text-gray-950">
              No promotions found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={resetPromotions}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#003A2B] px-5 py-3 text-sm font-bold text-white"
            >
              <FiRefreshCw />
              Reset Filters
            </button>
          </div>
        )}

        {/* DEMO NOTICE */}
        <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <FiGift className="mt-0.5 shrink-0 text-xl text-orange-600" />

            <div>
              <p className="font-black text-orange-900">
                Demo promotion data
              </p>

              <p className="mt-1 text-sm leading-6 text-orange-800">
                Promotions are currently stored in local component state.
                Creating, editing, pausing and deleting promotions will be
                connected to the Door-Step backend when the API and database
                are implemented.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
