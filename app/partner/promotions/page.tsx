
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FormEvent, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiCopy,
  FiEdit2,
  FiGrid,
  FiMenu,
  FiPackage,
  FiPercent,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiTag,
  FiTrash2,
  FiTrendingUp,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

type Promotion = {
  id: string;
  name: string;
  code: string;
  type: "Percentage" | "Fixed Amount" | "Free Delivery";
  value: number;
  minimumOrder: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  used: number;
  status: "Active" | "Scheduled" | "Expired";
};

const initialPromotions: Promotion[] = [
  {
    id: "PROMO-001",
    name: "Weekend Special",
    code: "WEEKEND20",
    type: "Percentage",
    value: 20,
    minimumOrder: 10000,
    startDate: "Sep 19, 2026",
    endDate: "Sep 20, 2026",
    usageLimit: 100,
    used: 42,
    status: "Active",
  },
  {
    id: "PROMO-002",
    name: "New Customer Offer",
    code: "WELCOME10",
    type: "Percentage",
    value: 10,
    minimumOrder: 5000,
    startDate: "Sep 01, 2026",
    endDate: "Sep 30, 2026",
    usageLimit: 200,
    used: 87,
    status: "Active",
  },
  {
    id: "PROMO-003",
    name: "Lunch Discount",
    code: "LUNCH1500",
    type: "Fixed Amount",
    value: 1500,
    minimumOrder: 8000,
    startDate: "Sep 22, 2026",
    endDate: "Oct 05, 2026",
    usageLimit: 150,
    used: 0,
    status: "Scheduled",
  },
  {
    id: "PROMO-004",
    name: "Free Delivery Weekend",
    code: "FREEDELIVERY",
    type: "Free Delivery",
    value: 0,
    minimumOrder: 12000,
    startDate: "Aug 22, 2026",
    endDate: "Aug 24, 2026",
    usageLimit: 100,
    used: 100,
    status: "Expired",
  },
];

const formatCurrency = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

export default function PromotionsPage() {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingPromotion, setEditingPromotion] =
    useState<Promotion | null>(null);

  const [promotions, setPromotions] =
    useState<Promotion[]>(initialPromotions);

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "Percentage" as Promotion["type"],
    value: "",
    minimumOrder: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
  });

  const filteredPromotions = useMemo(() => {
    const query = search.toLowerCase().trim();

    return promotions.filter((promotion) => {
      const matchesSearch =
        !query ||
        promotion.name.toLowerCase().includes(query) ||
        promotion.code.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || promotion.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [promotions, search, statusFilter]);

  const activePromotions = promotions.filter(
    (promotion) => promotion.status === "Active"
  ).length;

  const scheduledPromotions = promotions.filter(
    (promotion) => promotion.status === "Scheduled"
  ).length;

  const totalRedemptions = promotions.reduce(
    (total, promotion) => total + promotion.used,
    0
  );

  const openCreateModal = () => {
    setEditingPromotion(null);

    setForm({
      name: "",
      code: "",
      type: "Percentage",
      value: "",
      minimumOrder: "",
      startDate: "",
      endDate: "",
      usageLimit: "",
    });

    setShowModal(true);
  };

  const openEditModal = (promotion: Promotion) => {
    setEditingPromotion(promotion);

    setForm({
      name: promotion.name,
      code: promotion.code,
      type: promotion.type,
      value:
        promotion.type === "Free Delivery"
          ? ""
          : String(promotion.value),
      minimumOrder: String(promotion.minimumOrder),
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      usageLimit: String(promotion.usageLimit),
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPromotion(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.code.trim() ||
      !form.startDate ||
      !form.endDate
    ) {
      return;
    }

    const numericValue = Number(form.value || 0);
    const minimumOrder = Number(form.minimumOrder || 0);
    const usageLimit = Number(form.usageLimit || 0);

    if (editingPromotion) {
      setPromotions((current) =>
        current.map((promotion) =>
          promotion.id === editingPromotion.id
            ? {
                ...promotion,
                name: form.name.trim(),
                code: form.code.trim().toUpperCase(),
                type: form.type,
                value: numericValue,
                minimumOrder,
                startDate: form.startDate,
                endDate: form.endDate,
                usageLimit,
              }
            : promotion
        )
      );
    } else {
      const newPromotion: Promotion = {
        id: `PROMO-${Date.now()}`,
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        type: form.type,
        value: numericValue,
        minimumOrder,
        startDate: form.startDate,
        endDate: form.endDate,
        usageLimit,
        used: 0,
        status: "Scheduled",
      };

      setPromotions((current) => [newPromotion, ...current]);
    }

    closeModal();
  };

  const deletePromotion = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this promotion?"
    );

    if (!confirmed) return;

    setPromotions((current) =>
      current.filter((promotion) => promotion.id !== id)
    );
  };

  const togglePromotion = (id: string) => {
    setPromotions((current) =>
      current.map((promotion) => {
        if (promotion.id !== id) return promotion;

        return {
          ...promotion,
          status:
            promotion.status === "Active"
              ? "Scheduled"
              : "Active",
        };
      })
    );
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard may not be available in some browsers.
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6] text-[#151515]">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col bg-[#151515] text-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <div>
            <p className="text-xl font-black tracking-tight">
              Door<span className="text-[#FF6B35]">-Step</span>
            </p>

            <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Restaurant Partner
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <FiX />
          </button>
        </div>

        <div className="px-4 py-6">
          <div className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
            Main Menu
          </div>

          <nav className="space-y-1">
            {/* DASHBOARD */}
            <Link
              href="/partner/dashboard"
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                pathname === "/partner/dashboard"
                  ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FiGrid className="text-lg" />
              Dashboard
            </Link>

            {/* ORDERS */}
            <Link
              href="/partner/orders"
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                pathname === "/partner/orders"
                  ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FiPackage className="text-lg" />
              Orders
            </Link>

            {/* MENU */}
            <Link
              href="/partner/menu"
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                pathname === "/partner/menu"
                  ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FiShoppingBag className="text-lg" />
              Menu
            </Link>

            {/* EARNINGS */}
            <Link
              href="/partner/earnings"
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                pathname === "/partner/earnings"
                  ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FiTrendingUp className="text-lg" />
              Earnings
            </Link>

            {/* CUSTOMERS */}
            <Link
              href="/partner/customers"
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                pathname === "/partner/customers"
                  ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FiUsers className="text-lg" />
              Customers
            </Link>

            {/* PROMOTIONS */}
            <Link
              href="/partner/promotions"
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                pathname === "/partner/promotions"
                  ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FiTrendingUp className="text-lg" />
              Promotions
            </Link>
          </nav>
        </div>

        {/* BOTTOM */}
        <div className="mt-auto border-t border-white/10 p-4">
          {/* SETTINGS */}
          <Link
            href="/partner/settings"
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
              pathname === "/partner/settings"
                ? "bg-[#FF6B35] text-white shadow-lg shadow-orange-500/10"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <FiUser className="text-lg" />
            Settings
          </Link>

          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35] font-bold">
              MK
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">
                Mama&apos;s Kitchen
              </p>

              <p className="truncate text-xs text-gray-500">
                Restaurant Partner
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:ml-[270px]">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-gray-200 p-2.5 text-gray-700 hover:bg-gray-50 lg:hidden"
            >
              <FiMenu />
            </button>

            <div>
              <h1 className="text-xl font-black text-gray-950 sm:text-2xl">
                Promotions
              </h1>

              <p className="hidden text-sm text-gray-500 sm:block">
                Create offers that bring more customers to your restaurant.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="relative rounded-xl border border-gray-200 p-3 text-gray-600 transition hover:bg-gray-50"
          >
            <FiBell className="text-lg" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B35]" />
          </button>
        </header>

        <main className="p-5 sm:p-8">
          {/* PAGE INTRO */}
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Link
                href="/partner/dashboard"
                className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#FF6B35]"
              >
                <FiArrowLeft />
                Back to Dashboard
              </Link>

              <h2 className="text-2xl font-black text-gray-950 sm:text-3xl">
                Promotions & Offers
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage discounts, promo codes and special restaurant offers.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3 font-bold text-white shadow-lg shadow-orange-500/10 transition hover:bg-[#e85a27]"
            >
              <FiPlus />
              Create Promotion
            </button>
          </div>

          {/* STATS */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Promotions
                  </p>

                  <p className="mt-2 text-3xl font-black text-gray-950">
                    {activePromotions}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <FiCheck className="text-xl" />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Currently available to customers
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Scheduled
                  </p>

                  <p className="mt-2 text-3xl font-black text-gray-950">
                    {scheduledPromotions}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiClock className="text-xl" />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Upcoming campaigns
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Redemptions
                  </p>

                  <p className="mt-2 text-3xl font-black text-gray-950">
                    {totalRedemptions}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF6B35]">
                  <FiTag className="text-xl" />
                </div>
              </div>

              <p className="mt-4 text-xs font-semibold text-green-600">
                +18.4% this month
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Campaign Orders
                  </p>

                  <p className="mt-2 text-3xl font-black text-gray-950">
                    128
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <FiBarChart2 className="text-xl" />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Orders generated by promotions
              </p>
            </div>
          </div>

          {/* SEARCH + FILTER */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <FiSearch className="absolute left-4 top-3.5 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search promotions or promo codes..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {["All", "Active", "Scheduled", "Expired"].map(
                  (status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        statusFilter === status
                          ? "bg-[#FF6B35] text-white"
                          : "border border-gray-200 bg-white text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35]"
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>
          </section>

          {/* PROMOTIONS */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-lg font-black text-gray-950">
                Your Promotions
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Manage all your current and previous campaigns.
              </p>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Promotion
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Discount
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Duration
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Usage
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPromotions.map((promotion) => {
                    const usagePercentage =
                      promotion.usageLimit > 0
                        ? Math.min(
                            (promotion.used /
                              promotion.usageLimit) *
                              100,
                            100
                          )
                        : 0;

                    return (
                      <tr
                        key={promotion.id}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                      >
                        <td className="px-6 py-5">
                          <p className="font-bold text-gray-950">
                            {promotion.name}
                          </p>

                          <button
                            type="button"
                            onClick={() => copyCode(promotion.code)}
                            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-orange-50 px-2.5 py-1.5 text-xs font-bold text-[#FF6B35]"
                          >
                            <FiCopy />
                            {promotion.code}
                          </button>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm font-black text-gray-950">
                            {promotion.type === "Percentage"
                              ? `${promotion.value}% OFF`
                              : promotion.type === "Fixed Amount"
                                ? `${formatCurrency(
                                    promotion.value
                                  )} OFF`
                                : "FREE DELIVERY"}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Min. order{" "}
                            {formatCurrency(
                              promotion.minimumOrder
                            )}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm font-medium text-gray-700">
                            {promotion.startDate}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            to {promotion.endDate}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <div className="w-32">
                            <div className="flex justify-between text-xs">
                              <span className="font-bold text-gray-700">
                                {promotion.used}
                              </span>

                              <span className="text-gray-400">
                                {promotion.usageLimit}
                              </span>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full rounded-full bg-[#FF6B35]"
                                style={{
                                  width: `${usagePercentage}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                              promotion.status === "Active"
                                ? "bg-green-50 text-green-700"
                                : promotion.status === "Scheduled"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {promotion.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(promotion)
                              }
                              className="rounded-lg border border-gray-200 p-2.5 text-gray-500 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                              title="Edit promotion"
                            >
                              <FiEdit2 />
                            </button>

                            {promotion.status !== "Expired" && (
                              <button
                                type="button"
                                onClick={() =>
                                  togglePromotion(promotion.id)
                                }
                                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                              >
                                {promotion.status === "Active"
                                  ? "Pause"
                                  : "Activate"}
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                deletePromotion(promotion.id)
                              }
                              className="rounded-lg border border-red-100 p-2.5 text-red-500 transition hover:bg-red-50"
                              title="Delete promotion"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="divide-y divide-gray-100 md:hidden">
              {filteredPromotions.map((promotion) => {
                const usagePercentage =
                  promotion.usageLimit > 0
                    ? Math.min(
                        (promotion.used /
                          promotion.usageLimit) *
                          100,
                        100
                      )
                    : 0;

                return (
                  <div key={promotion.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-black text-gray-950">
                          {promotion.name}
                        </p>

                        <button
                          type="button"
                          onClick={() => copyCode(promotion.code)}
                          className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-orange-50 px-2.5 py-1.5 text-xs font-bold text-[#FF6B35]"
                        >
                          <FiCopy />
                          {promotion.code}
                        </button>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          promotion.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : promotion.status === "Scheduled"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {promotion.status}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400">
                          Discount
                        </p>

                        <p className="mt-1 text-sm font-black text-gray-950">
                          {promotion.type === "Percentage"
                            ? `${promotion.value}% OFF`
                            : promotion.type === "Fixed Amount"
                              ? `${formatCurrency(
                                  promotion.value
                                )} OFF`
                              : "FREE DELIVERY"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Minimum Order
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-700">
                          {formatCurrency(
                            promotion.minimumOrder
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Starts
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-600">
                          {promotion.startDate}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Ends
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-600">
                          {promotion.endDate}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-gray-700">
                          {promotion.used} redemptions
                        </span>

                        <span className="text-gray-400">
                          {promotion.usageLimit} limit
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#FF6B35]"
                          style={{
                            width: `${usagePercentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(promotion)}
                        className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-bold text-gray-700"
                      >
                        Edit
                      </button>

                      {promotion.status !== "Expired" && (
                        <button
                          type="button"
                          onClick={() =>
                            togglePromotion(promotion.id)
                          }
                          className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-bold text-gray-700"
                        >
                          {promotion.status === "Active"
                            ? "Pause"
                            : "Activate"}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          deletePromotion(promotion.id)
                        }
                        className="rounded-xl border border-red-100 px-3 py-2.5 text-red-500"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredPromotions.length === 0 && (
              <div className="p-12 text-center">
                <FiTag className="mx-auto text-4xl text-gray-300" />

                <p className="mt-4 font-bold text-gray-700">
                  No promotions found
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Try another search or create a new promotion.
                </p>
              </div>
            )}
          </section>

          {/* CAMPAIGN PERFORMANCE */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FF6B35]">
                Performance
              </p>

              <h3 className="mt-2 text-xl font-black text-gray-950">
                Promotion Performance
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                See how your promotional campaigns are contributing to sales.
              </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#FF6B35]">
                    <FiUsers />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Customers Reached
                    </p>

                    <p className="mt-1 text-xl font-black text-gray-950">
                      1,842
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <FiTrendingUp />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Promotion Revenue
                    </p>

                    <p className="mt-1 text-xl font-black text-gray-950">
                      ₦486,500
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <FiBarChart2 />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Conversion Rate
                    </p>

                    <p className="mt-1 text-xl font-black text-gray-950">
                      12.8%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FF6B35]">
                  Promotion
                </p>

                <h3 className="mt-1 text-2xl font-black text-gray-950">
                  {editingPromotion
                    ? "Edit Promotion"
                    : "Create Promotion"}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl bg-gray-100 p-2.5 text-gray-500 transition hover:bg-gray-200"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* NAME */}
                <div className="sm:col-span-2">
                  <label className="text-sm font-bold text-gray-700">
                    Promotion Name
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="e.g. Weekend Special"
                    className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#FF6B35]"
                    required
                  />
                </div>

                {/* CODE */}
                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Promo Code
                  </label>

                  <input
                    type="text"
                    value={form.code}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        code: event.target.value
                          .toUpperCase()
                          .replace(/\s/g, ""),
                      })
                    }
                    placeholder="WEEKEND20"
                    className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm uppercase outline-none focus:border-[#FF6B35]"
                    required
                  />
                </div>

                {/* TYPE */}
                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Discount Type
                  </label>

                  <div className="relative">
                    <select
                      value={form.type}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          type: event.target
                            .value as Promotion["type"],
                        })
                      }
                      className="mt-2 h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none focus:border-[#FF6B35]"
                    >
                      <option>Percentage</option>
                      <option>Fixed Amount</option>
                      <option>Free Delivery</option>
                    </select>

                    <FiChevronDown className="pointer-events-none absolute right-4 top-6 text-gray-400" />
                  </div>
                </div>

                {/* VALUE */}
                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Discount Value
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={form.value}
                      disabled={form.type === "Free Delivery"}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          value: event.target.value,
                        })
                      }
                      placeholder={
                        form.type === "Percentage"
                          ? "20"
                          : "1500"
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-sm outline-none focus:border-[#FF6B35] disabled:bg-gray-100"
                    />

                    <span className="absolute right-4 top-5 text-xs font-bold text-gray-400">
                      {form.type === "Percentage"
                        ? "%"
                        : form.type === "Free Delivery"
                          ? ""
                          : "₦"}
                    </span>
                  </div>
                </div>

                {/* MINIMUM ORDER */}
                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Minimum Order
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-4 text-sm font-bold text-gray-400">
                      ₦
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={form.minimumOrder}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          minimumOrder: event.target.value,
                        })
                      }
                      placeholder="10000"
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-[#FF6B35]"
                    />
                  </div>
                </div>

                {/* START */}
                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        startDate: event.target.value,
                      })
                    }
                    className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#FF6B35]"
                    required
                  />
                </div>

                {/* END */}
                <div>
                  <label className="text-sm font-bold text-gray-700">
                    End Date
                  </label>

                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        endDate: event.target.value,
                      })
                    }
                    className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#FF6B35]"
                    required
                  />
                </div>

                {/* LIMIT */}
                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Usage Limit
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={form.usageLimit}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        usageLimit: event.target.value,
                      })
                    }
                    placeholder="100"
                    className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#FF6B35]"
                  />
                </div>
              </div>

              {/* PREVIEW */}
              <div className="mt-6 rounded-2xl border border-dashed border-orange-200 bg-orange-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FF6B35]">
                  Customer Preview
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B35] text-white">
                    <FiPercent />
                  </div>

                  <div>
                    <p className="font-black text-gray-950">
                      {form.name || "Your Promotion"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {form.type === "Percentage"
                        ? `${form.value || "0"}% off`
                        : form.type === "Fixed Amount"
                          ? `${formatCurrency(
                              Number(form.value || 0)
                            )} off`
                          : "Free delivery"}

                      {Number(form.minimumOrder || 0) > 0 &&
                        ` on orders above ${formatCurrency(
                          Number(form.minimumOrder)
                        )}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#FF6B35] px-6 py-3 font-bold text-white transition hover:bg-[#e85a27]"
                >
                  {editingPromotion
                    ? "Save Changes"
                    : "Create Promotion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
