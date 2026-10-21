
"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiActivity,
  FiBell,
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiPackage,
  FiPercent,
  FiSearch,
  FiSettings,
  FiShoppingBag,
  FiTruck,
  FiUserCheck,
  FiUsers,
  FiX,
} from "react-icons/fi";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: FiGrid,
  },
  {
    label: "Restaurants",
    href: "/admin/restaurants",
    icon: FiShoppingBag,
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: FiClock,
  },
  {
    label: "Riders",
    href: "/admin/riders",
    icon: FiTruck,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: FiUsers,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: FiPackage,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: FiDollarSign,
  },
  {
    label: "Promotions",
    href: "/admin/promotions",
    icon: FiPercent,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: FiSettings,
  },
];

const recentOrders = [
  {
    id: "#DS-10842",
    customer: "Adewale Johnson",
    restaurant: "Mama's Kitchen",
    amount: "₦8,300",
    status: "Preparing",
    time: "5 mins ago",
  },
  {
    id: "#DS-10839",
    customer: "Blessing Okafor",
    restaurant: "Chicken Republic",
    amount: "₦6,500",
    status: "Ready",
    time: "12 mins ago",
  },
  {
    id: "#DS-10834",
    customer: "Daniel Williams",
    restaurant: "The Food Place",
    amount: "₦7,800",
    status: "Out for delivery",
    time: "21 mins ago",
  },
  {
    id: "#DS-10827",
    customer: "Sarah Ibrahim",
    restaurant: "Mama's Kitchen",
    amount: "₦5,900",
    status: "Completed",
    time: "38 mins ago",
  },
  {
    id: "#DS-10819",
    customer: "Michael Adeyemi",
    restaurant: "Taste Hub",
    amount: "₦5,200",
    status: "Completed",
    time: "52 mins ago",
  },
];

const applications = [
  {
    restaurant: "Mama's Kitchen",
    owner: "Adebayo Johnson",
    location: "Ikeja, Lagos",
    category: "Nigerian",
    status: "Pending Review",
  },
  {
    restaurant: "Taste of Lagos",
    owner: "Chioma Okafor",
    location: "Yaba, Lagos",
    category: "African",
    status: "Under Review",
  },
  {
    restaurant: "Urban Bites",
    owner: "Daniel Williams",
    location: "Lekki, Lagos",
    category: "Fast Food",
    status: "Pending Review",
  },
];

const statusStyles: Record<string, string> = {
  Preparing: "bg-orange-50 text-orange-600",
  Ready: "bg-blue-50 text-blue-600",
  "Out for delivery": "bg-purple-50 text-purple-600",
  Completed: "bg-green-50 text-green-600",
  "Pending Review": "bg-orange-50 text-orange-600",
  "Under Review": "bg-blue-50 text-blue-600",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const adminEmail = useMemo(() => {
    if (typeof window === "undefined") {
      return "admin@doorstep.ng";
    }

    return (
      localStorage.getItem("doorstep_admin_email") ||
      "admin@doorstep.ng"
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(
      "doorstep_admin_authenticated"
    );

    localStorage.removeItem("doorstep_admin_email");

    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F6F7F8]">
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
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col bg-gray-950 text-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* LOGO */}
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-xl font-black">
              D
            </div>

            <span className="text-xl font-black tracking-tight">
              Door<span className="text-[#FF6B35]">-Step</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <FiX />
          </button>
        </div>

        {/* ADMIN PROFILE */}
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6B35] font-black">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                Administrator
              </p>

              <p className="truncate text-xs text-gray-500">
                {adminEmail}
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Main Menu
          </p>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href;

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => {
                    router.push(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#FF6B35] text-white shadow-lg shadow-orange-500/10"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="text-lg" />

                  <span>{item.label}</span>

                  {item.label === "Applications" && (
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-black ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#FF6B35] text-white"
                      }`}
                    >
                      8
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <FiLogOut className="text-lg" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:pl-[270px]">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur sm:px-7">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-gray-200 p-2.5 text-gray-600 lg:hidden"
            >
              <FiMenu />
            </button>

            <div>
              <p className="text-xs font-semibold text-gray-400">
                Admin Portal
              </p>

              <h1 className="text-lg font-black text-gray-950">
                Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="hidden w-64 items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 md:flex">
              <FiSearch className="text-gray-400" />

              <input
                type="text"
                placeholder="Search platform..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            {/* NOTIFICATIONS */}
            <button
              type="button"
              className="relative rounded-xl border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50"
            >
              <FiBell />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B35]" />
            </button>

            {/* PROFILE */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((previous) => !previous)
                }
                className="flex items-center gap-2 rounded-xl border border-gray-200 p-2 transition hover:bg-gray-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-950 text-sm font-black text-white">
                  A
                </div>

                <FiChevronDown className="hidden text-gray-400 sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-gray-100 px-3 py-3">
                    <p className="text-sm font-bold text-gray-950">
                      Administrator
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-400">
                      {adminEmail}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      router.push("/admin/settings")
                    }
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    <FiSettings />
                    Settings
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"
                  >
                    <FiLogOut />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-5 sm:p-7">
          {/* WELCOME */}
          <div className="mb-7">
            <p className="text-sm font-semibold text-gray-500">
              Welcome back, Administrator 👋
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              Here&apos;s what&apos;s happening on Door-Step.
            </h2>
          </div>

          {/* STATS */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value="₦8.42M"
              change="+18.5%"
              icon={<FiDollarSign />}
              description="vs last month"
            />

            <StatCard
              title="Total Orders"
              value="1,284"
              change="+12.4%"
              icon={<FiPackage />}
              description="this month"
            />

            <StatCard
              title="Restaurants"
              value="184"
              change="+8.2%"
              icon={<FiShoppingBag />}
              description="active partners"
            />

            <StatCard
              title="Active Riders"
              value="96"
              change="+14.7%"
              icon={<FiTruck />}
              description="currently active"
            />
          </section>

          {/* SECOND ROW */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            {/* REVENUE */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-bold text-gray-500">
                    Revenue Overview
                  </p>

                  <h3 className="mt-1 text-2xl font-black text-gray-950">
                    ₦2.84M
                  </h3>
                </div>

                <select className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 outline-none">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>

              {/* CHART */}
              <div className="mt-8">
                <div className="flex h-64 items-end gap-2 sm:gap-4">
                  {[
                    42,
                    55,
                    48,
                    72,
                    62,
                    82,
                    68,
                    92,
                    76,
                    86,
                    70,
                    96,
                  ].map((height, index) => (
                    <div
                      key={index}
                      className="flex h-full flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-lg bg-[#FF6B35] transition hover:bg-orange-500"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex justify-between text-xs font-semibold text-gray-400">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            {/* PLATFORM SUMMARY */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-500">
                    Platform Summary
                  </p>

                  <h3 className="mt-1 text-xl font-black text-gray-950">
                    Today
                  </h3>
                </div>

                <FiActivity className="text-2xl text-[#FF6B35]" />
              </div>

              <div className="mt-6 space-y-4">
                <SummaryRow
                  label="Orders"
                  value="186"
                  percentage="82%"
                />

                <SummaryRow
                  label="Completed"
                  value="142"
                  percentage="76%"
                />

                <SummaryRow
                  label="In Progress"
                  value="31"
                  percentage="17%"
                />

                <SummaryRow
                  label="Cancelled"
                  value="13"
                  percentage="7%"
                />
              </div>
            </div>
          </section>

          {/* LOWER CONTENT */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            {/* RECENT ORDERS */}
            <div className="rounded-2xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <p className="text-sm font-bold text-gray-500">
                    Recent Orders
                  </p>

                  <h3 className="mt-1 text-xl font-black text-gray-950">
                    Latest activity
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/admin/orders")}
                  className="text-sm font-bold text-[#FF6B35] hover:text-orange-700"
                >
                  View all
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-400">
                      <th className="px-6 py-4 font-bold">
                        Order
                      </th>

                      <th className="px-6 py-4 font-bold">
                        Customer
                      </th>

                      <th className="px-6 py-4 font-bold">
                        Restaurant
                      </th>

                      <th className="px-6 py-4 font-bold">
                        Amount
                      </th>

                      <th className="px-6 py-4 font-bold">
                        Status
                      </th>

                      <th className="px-6 py-4 font-bold">
                        Time
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="px-6 py-4 text-sm font-black text-gray-950">
                          {order.id}
                        </td>

                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                          {order.customer}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {order.restaurant}
                        </td>

                        <td className="px-6 py-4 text-sm font-bold text-gray-950">
                          {order.amount}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                              statusStyles[order.status] ||
                              "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-xs font-semibold text-gray-400">
                          {order.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* APPLICATIONS */}
            <div className="rounded-2xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <p className="text-sm font-bold text-gray-500">
                    Partner Applications
                  </p>

                  <h3 className="mt-1 text-xl font-black text-gray-950">
                    Needs attention
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/admin/applications")
                  }
                  className="text-sm font-bold text-[#FF6B35] hover:text-orange-700"
                >
                  View all
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {applications.map((application) => (
                  <button
                    key={application.restaurant}
                    type="button"
                    onClick={() =>
                      router.push("/admin/applications")
                    }
                    className="w-full px-6 py-5 text-left transition hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-bold text-gray-950">
                          {application.restaurant}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {application.owner}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {application.location}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          statusStyles[
                            application.status
                          ] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="mt-6 rounded-2xl bg-gray-950 p-6 text-white sm:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                  Platform Control
                </p>

                <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                  Manage your Door-Step ecosystem.
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                  Review partners, monitor riders, manage customers
                  and keep track of every order on the platform.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    router.push("/admin/applications")
                  }
                  className="rounded-full bg-[#FF6B35] px-6 py-3 font-bold text-white transition hover:bg-orange-600"
                >
                  Review Applications
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/admin/orders")
                  }
                  className="rounded-full border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/5"
                >
                  View Orders
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
  description,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl text-[#FF6B35]">
          {icon}
        </div>

        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm font-semibold text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-gray-950">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-600">
          {label}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-gray-950">
            {value}
          </span>

          <span className="text-xs font-bold text-gray-400">
            {percentage}
          </span>
        </div>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[#FF6B35]"
          style={{
            width: percentage,
          }}
        />
      </div>
    </div>
  );
}
