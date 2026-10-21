
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowUp,
  FiBell,
  FiCalendar,
  FiChevronDown,
  FiDollarSign,
  FiGrid,
  FiMenu,
  FiPackage,
  FiPercent,
  FiTrendingUp,
  FiUser,
  FiX,
} from "react-icons/fi";

type Transaction = {
  id: string;
  orderId: string;
  date: string;
  customer: string;
  grossAmount: number;
  commission: number;
  netAmount: number;
  status: "Paid" | "Pending";
};

const transactions: Transaction[] = [
  {
    id: "TXN-001",
    orderId: "DS-10245",
    date: "Sep 19, 2026",
    customer: "Chinedu Okafor",
    grossAmount: 18500,
    commission: 1850,
    netAmount: 16650,
    status: "Paid",
  },
  {
    id: "TXN-002",
    orderId: "DS-10244",
    date: "Sep 19, 2026",
    customer: "Sarah Johnson",
    grossAmount: 12700,
    commission: 1270,
    netAmount: 11430,
    status: "Paid",
  },
  {
    id: "TXN-003",
    orderId: "DS-10243",
    date: "Sep 18, 2026",
    customer: "David Williams",
    grossAmount: 9500,
    commission: 950,
    netAmount: 8550,
    status: "Paid",
  },
  {
    id: "TXN-004",
    orderId: "DS-10242",
    date: "Sep 18, 2026",
    customer: "Blessing Adeyemi",
    grossAmount: 22400,
    commission: 2240,
    netAmount: 20160,
    status: "Pending",
  },
  {
    id: "TXN-005",
    orderId: "DS-10241",
    date: "Sep 17, 2026",
    customer: "Michael James",
    grossAmount: 15800,
    commission: 1580,
    netAmount: 14220,
    status: "Paid",
  },
  {
    id: "TXN-006",
    orderId: "DS-10240",
    date: "Sep 17, 2026",
    customer: "Grace Samuel",
    grossAmount: 11200,
    commission: 1120,
    netAmount: 10080,
    status: "Pending",
  },
];

const chartData = [
  { day: "Mon", amount: 28500 },
  { day: "Tue", amount: 42000 },
  { day: "Wed", amount: 35600 },
  { day: "Thu", amount: 51800 },
  { day: "Fri", amount: 46500 },
  { day: "Sat", amount: 68200 },
  { day: "Sun", amount: 59200 },
];

const formatCurrency = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

export default function EarningsPage() {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("This Week");

  const grossSales = 284500;
  const commission = 28450;
  const netEarnings = grossSales - commission;
  const pendingPayout = 32400;
  const paidOut = 212650;

  const maxChartValue = Math.max(
    ...chartData.map((item) => item.amount)
  );

  const filteredTransactions = useMemo(() => {
    if (dateFilter === "Today") {
      return transactions.filter((item) => item.date.includes("Sep 19"));
    }

    if (dateFilter === "Yesterday") {
      return transactions.filter((item) => item.date.includes("Sep 18"));
    }

    return transactions;
  }, [dateFilter]);

  return (
    <div className="min-h-screen bg-[#F5F7F6] text-[#151515]">
      {/* Mobile overlay */}
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
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
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

        {/* Navigation */}
        <div className="px-4 py-6">
          <div className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
            Main Menu
          </div>

          <nav className="space-y-1">
            {/* Dashboard */}
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

            {/* Orders */}
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

            {/* Menu */}
            <Link
              href="/partner/menu"
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                pathname === "/partner/menu"
                  ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FiMenu className="text-lg" />
              Menu
            </Link>

            {/* Earnings */}
            <Link
              href="/partner/earnings"
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                pathname === "/partner/earnings"
                  ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FiDollarSign className="text-lg" />
              Earnings
            </Link>

            {/* Customers */}
            <a
              href="/partner/customers"
              className={`relative z-10 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                pathname === "/partner/customers"
                  ? "bg-[#FF6B35] text-white shadow-lg shadow-orange-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FiUser className="text-lg" />
              Customers
            </a>

            {/* Promotions */}
            <a
              href="/partner/promotions"
              className={`relative z-10 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                pathname === "/partner/promotions"
                  ? "bg-[#FF6B35] text-white shadow-lg shadow-orange-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FiTrendingUp className="text-lg" />
              Promotions
            </a>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mt-auto border-t border-white/10 p-4">
          {/* Settings */}
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

          {/* Restaurant profile */}
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

      {/* MAIN AREA */}
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
                Earnings
              </h1>

              <p className="hidden text-sm text-gray-500 sm:block">
                Track your restaurant revenue and payouts.
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
          {/* PAGE TOP */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Link
                href="/partner/dashboard"
                className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#FF6B35]"
              >
                <FiArrowLeft />
                Back to Dashboard
              </Link>

              <h2 className="text-2xl font-black text-gray-950 sm:text-3xl">
                Financial Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monitor sales, commissions and restaurant payouts.
              </p>
            </div>

            {/* DATE FILTER */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="h-11 appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-10 text-sm font-semibold text-gray-700 outline-none transition focus:border-[#FF6B35]"
              >
                <option>This Week</option>
                <option>Today</option>
                <option>Yesterday</option>
                <option>This Month</option>
              </select>

              <FiCalendar className="pointer-events-none absolute left-3 top-3.5 text-gray-400" />
              <FiChevronDown className="pointer-events-none absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Gross Sales
                  </p>

                  <p className="mt-2 text-2xl font-black text-gray-950">
                    {formatCurrency(grossSales)}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF6B35]">
                  <FiTrendingUp className="text-xl" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-600">
                <FiArrowUp />
                12.5%

                <span className="font-normal text-gray-400">
                  vs last week
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Door-Step Commission
                  </p>

                  <p className="mt-2 text-2xl font-black text-gray-950">
                    {formatCurrency(commission)}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <FiPercent className="text-xl" />
                </div>
              </div>

              <div className="mt-4 text-xs font-medium text-gray-400">
                10% platform commission
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Net Earnings
                  </p>

                  <p className="mt-2 text-2xl font-black text-gray-950">
                    {formatCurrency(netEarnings)}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <FiDollarSign className="text-xl" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-600">
                <FiArrowUp />
                9.8%

                <span className="font-normal text-gray-400">
                  vs last week
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Pending Payout
                  </p>

                  <p className="mt-2 text-2xl font-black text-gray-950">
                    {formatCurrency(pendingPayout)}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                  <FiCalendar className="text-xl" />
                </div>
              </div>

              <div className="mt-4 text-xs font-medium text-gray-400">
                Next payout: Monday
              </div>
            </div>
          </div>

          {/* CHART + PAYOUT CARD */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
            {/* REVENUE CHART */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-black text-gray-950">
                    Revenue Overview
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Your sales performance for the current week.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
                  September 14 - 20
                </div>
              </div>

              <div className="mt-8">
                <div className="flex h-[280px] items-end gap-2 border-b border-gray-100 px-2 sm:gap-4">
                  {chartData.map((item) => {
                    const height = Math.max(
                      (item.amount / maxChartValue) * 100,
                      8
                    );

                    return (
                      <div
                        key={item.day}
                        className="group flex h-full flex-1 flex-col items-center justify-end"
                      >
                        <div className="relative flex h-full w-full items-end justify-center">
                          <div
                            className="w-full max-w-[44px] rounded-t-xl bg-[#FF6B35] transition-all duration-300 group-hover:bg-[#e85a27]"
                            style={{
                              height: `${height}%`,
                            }}
                          >
                            <div className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-950 px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                              {formatCurrency(item.amount)}
                            </div>
                          </div>
                        </div>

                        <span className="mt-3 text-xs font-semibold text-gray-400">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* PAYOUT SUMMARY */}
            <section className="rounded-2xl bg-[#151515] p-6 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Payout Summary
                  </p>

                  <h3 className="mt-2 text-3xl font-black">
                    {formatCurrency(paidOut)}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Paid out this month
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B35]">
                  <FiDollarSign className="text-xl" />
                </div>
              </div>

              <div className="my-7 h-px bg-white/10" />

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Pending payout
                  </span>

                  <span className="font-bold text-white">
                    {formatCurrency(pendingPayout)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Next payout
                  </span>

                  <span className="font-bold text-white">
                    Monday
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Payout method
                  </span>

                  <span className="font-bold text-white">
                    Bank Transfer
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 w-full rounded-xl bg-[#FF6B35] px-5 py-3 font-bold text-white transition hover:bg-[#e85a27]"
              >
                View Payout History
              </button>
            </section>
          </div>

          {/* TRANSACTIONS */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-lg font-black text-gray-950">
                  Transaction History
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Recent restaurant earnings from Door-Step orders.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
              >
                <FiArrowDown />
                Export
              </button>
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Order
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Gross
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Commission
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Net
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-gray-950">
                          {transaction.orderId}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {transaction.id}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-gray-700">
                        {transaction.customer}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-500">
                        {transaction.date}
                      </td>

                      <td className="px-6 py-5 text-sm font-semibold text-gray-700">
                        {formatCurrency(transaction.grossAmount)}
                      </td>

                      <td className="px-6 py-5 text-sm font-semibold text-red-500">
                        -{formatCurrency(transaction.commission)}
                      </td>

                      <td className="px-6 py-5 text-sm font-black text-gray-950">
                        {formatCurrency(transaction.netAmount)}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${
                            transaction.status === "Paid"
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile transactions */}
            <div className="divide-y divide-gray-100 md:hidden">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black text-gray-950">
                        {transaction.orderId}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {transaction.customer}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        transaction.status === "Paid"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Gross</p>

                      <p className="mt-1 text-sm font-bold text-gray-800">
                        {formatCurrency(transaction.grossAmount)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Commission
                      </p>

                      <p className="mt-1 text-sm font-bold text-red-500">
                        -{formatCurrency(transaction.commission)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Net earnings
                      </p>

                      <p className="mt-1 text-sm font-black text-gray-950">
                        {formatCurrency(transaction.netAmount)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Date</p>

                      <p className="mt-1 text-sm font-medium text-gray-600">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="p-10 text-center">
                <p className="font-semibold text-gray-700">
                  No transactions found.
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Try selecting another date range.
                </p>
              </div>
            )}
          </section>

          {/* BANK ACCOUNT */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FF6B35]">
                  Payout Account
                </p>

                <h3 className="mt-2 text-lg font-black text-gray-950">
                  First Bank of Nigeria
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Mama&apos;s Kitchen •••• 4821
                </p>
              </div>

              <button
                type="button"
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
              >
                Manage Payout Account
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
