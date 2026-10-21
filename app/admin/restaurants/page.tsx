
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiActivity,
  FiBell,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiEye,
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

type RestaurantStatus = "Active" | "Pending" | "Suspended";

type Restaurant = {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  orders: number;
  revenue: string;
  commission: string;
  rating: number;
  status: RestaurantStatus;
  joined: string;
};

const initialRestaurants: Restaurant[] = [
  {
    id: "REST-1001",
    name: "Mama's Kitchen",
    owner: "Adebayo Johnson",
    email: "mama@doorstep.ng",
    phone: "08012345678",
    category: "Nigerian",
    location: "Ikeja, Lagos",
    orders: 428,
    revenue: "₦2.84M",
    commission: "15%",
    rating: 4.8,
    status: "Active",
    joined: "Jan 12, 2026",
  },
  {
    id: "REST-1002",
    name: "Taste of Lagos",
    owner: "Chioma Okafor",
    email: "tasteoflagos@doorstep.ng",
    phone: "08023456789",
    category: "African",
    location: "Yaba, Lagos",
    orders: 316,
    revenue: "₦2.16M",
    commission: "15%",
    rating: 4.7,
    status: "Active",
    joined: "Feb 04, 2026",
  },
  {
    id: "REST-1003",
    name: "Urban Bites",
    owner: "Daniel Williams",
    email: "urbanbites@doorstep.ng",
    phone: "08034567890",
    category: "Fast Food",
    location: "Lekki, Lagos",
    orders: 284,
    revenue: "₦1.92M",
    commission: "12%",
    rating: 4.6,
    status: "Active",
    joined: "Feb 18, 2026",
  },
  {
    id: "REST-1004",
    name: "Motrust Restaurant",
    owner: "Olufemi Oni",
    email: "motrust@doorstep.ng",
    phone: "08045678901",
    category: "Continental",
    location: "Surulere, Lagos",
    orders: 156,
    revenue: "₦984K",
    commission: "15%",
    rating: 4.9,
    status: "Active",
    joined: "Mar 02, 2026",
  },
  {
    id: "REST-1005",
    name: "Green Bowl",
    owner: "Blessing Okafor",
    email: "greenbowl@doorstep.ng",
    phone: "08056789012",
    category: "Healthy Food",
    location: "Victoria Island, Lagos",
    orders: 98,
    revenue: "₦645K",
    commission: "10%",
    rating: 4.5,
    status: "Pending",
    joined: "Mar 11, 2026",
  },
  {
    id: "REST-1006",
    name: "Pepper House",
    owner: "Michael Adeyemi",
    email: "pepperhouse@doorstep.ng",
    phone: "08067890123",
    category: "Nigerian",
    location: "Maryland, Lagos",
    orders: 72,
    revenue: "₦421K",
    commission: "15%",
    rating: 4.3,
    status: "Suspended",
    joined: "Mar 15, 2026",
  },
];

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

const statusOptions = ["All", "Active", "Pending", "Suspended"];

const categoryOptions = [
  "All Categories",
  "Nigerian",
  "African",
  "Fast Food",
  "Continental",
  "Healthy Food",
];

function getStatusClasses(status: RestaurantStatus) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Suspended":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export default function AdminRestaurantsPage() {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const [restaurants, setRestaurants] =
    useState<Restaurant[]>(initialRestaurants);

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const authenticated =
      localStorage.getItem("doorstep_admin_authenticated");

    if (authenticated !== "true") {
      router.replace("/admin/login");
    }
  }, [router]);

  const adminEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("doorstep_admin_email") ||
        "admin@doorstep.ng"
      : "admin@doorstep.ng";

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        restaurant.name.toLowerCase().includes(searchValue) ||
        restaurant.owner.toLowerCase().includes(searchValue) ||
        restaurant.location.toLowerCase().includes(searchValue) ||
        restaurant.category.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        restaurant.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All Categories" ||
        restaurant.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [restaurants, search, statusFilter, categoryFilter]);

  const stats = useMemo(() => {
    return {
      total: restaurants.length,
      active: restaurants.filter(
        (restaurant) => restaurant.status === "Active",
      ).length,
      pending: restaurants.filter(
        (restaurant) => restaurant.status === "Pending",
      ).length,
      suspended: restaurants.filter(
        (restaurant) => restaurant.status === "Suspended",
      ).length,
    };
  }, [restaurants]);

  const handleStatusChange = (
    restaurant: Restaurant,
    status: RestaurantStatus,
  ) => {
    setRestaurants((current) =>
      current.map((item) =>
        item.id === restaurant.id
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );

    setSelectedRestaurant({
      ...restaurant,
      status,
    });

    setSuccessMessage(
      `${restaurant.name} is now ${status.toLowerCase()}.`,
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem("doorstep_admin_authenticated");
    localStorage.removeItem("doorstep_admin_email");

    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#EEF2F1] text-gray-900">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col bg-[#003A2B] text-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <a
            href="/admin/dashboard"
            className="text-2xl font-black tracking-tight"
          >
            Door<span className="text-[#FF6B35]">-Step</span>
          </a>

          <button
            type="button"
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="px-5 py-6">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-white/40">
            Main Menu
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href === "/admin/restaurants" &&
                  pathname.startsWith("/admin/restaurants/"));

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#FF6B35] text-white shadow-lg shadow-orange-950/20"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-white/40">
              Platform
            </p>

            <p className="mt-2 text-sm font-semibold text-white">
              Door-Step Admin
            </p>

            <p className="mt-1 truncate text-xs text-white/50">
              {adminEmail}
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:pl-[268px]">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl border border-gray-200 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={21} />
            </button>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Platform Management
              </p>

              <h1 className="text-lg font-black text-gray-950 md:text-xl">
                Restaurants
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              className="relative rounded-xl border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50"
            >
              <FiBell size={19} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B35]" />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((current) => !current)}
                className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 transition hover:bg-gray-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#003A2B] text-sm font-black text-white">
                  AD
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-bold text-gray-900">
                    Door-Step Admin
                  </p>

                  <p className="max-w-[160px] truncate text-xs text-gray-400">
                    {adminEmail}
                  </p>
                </div>

                <FiChevronDown
                  className={`hidden text-gray-400 transition sm:block ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                  <a
                    href="/admin/settings"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <FiSettings />
                    Admin Settings
                  </a>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="px-4 py-6 md:px-8 md:py-8">
          {/* SUCCESS MESSAGE */}
          {successMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
              <FiCheck />
              {successMessage}
            </div>
          )}

          {/* PAGE HEADER */}
          <section className="mb-8">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                  Marketplace Control
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                  Restaurant Management
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-gray-500">
                  Manage restaurants on the Door-Step platform, monitor their
                  performance, control account status and review important
                  restaurant information.
                </p>
              </div>

              <a
                href="/admin/applications"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#003A2B] px-5 py-3 font-bold text-white transition hover:bg-[#00513C]"
              >
                <FiClock />
                Review Applications
              </a>
            </div>
          </section>

          {/* STATS */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Restaurants"
              value={stats.total}
              description="Registered restaurants"
              icon={<FiShoppingBag />}
            />

            <StatCard
              title="Active"
              value={stats.active}
              description="Currently visible"
              icon={<FiActivity />}
            />

            <StatCard
              title="Pending"
              value={stats.pending}
              description="Awaiting approval"
              icon={<FiClock />}
            />

            <StatCard
              title="Suspended"
              value={stats.suspended}
              description="Currently restricted"
              icon={<FiUserCheck />}
            />
          </section>

          {/* FILTERS */}
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search restaurant, owner, location..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-[#FF6B35]"
                >
                  {statusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>

                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-[#FF6B35]"
                >
                  {categoryOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* RESTAURANT TABLE */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center md:px-6">
              <div>
                <h3 className="text-lg font-black text-gray-950">
                  All Restaurants
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Showing {filteredRestaurants.length} of{" "}
                  {restaurants.length} restaurants
                </p>
              </div>

              <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-500">
                Platform Control
              </div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Restaurant
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Location
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Orders
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Revenue
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Commission
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRestaurants.map((restaurant) => (
                    <tr
                      key={restaurant.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] font-black text-[#FF6B35]">
                            {restaurant.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-bold text-gray-950">
                              {restaurant.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {restaurant.owner}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-gray-700">
                          {restaurant.location}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {restaurant.category}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-900">
                          {restaurant.orders}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Total orders
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-900">
                          {restaurant.revenue}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Gross sales
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                          {restaurant.commission}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                            restaurant.status,
                          )}`}
                        >
                          {restaurant.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedRestaurant(restaurant)
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                        >
                          <FiEye />
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="divide-y divide-gray-100 lg:hidden">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] font-black text-[#FF6B35]">
                        {restaurant.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-bold text-gray-950">
                          {restaurant.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {restaurant.owner}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                        restaurant.status,
                      )}`}
                    >
                      {restaurant.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <InfoBox
                      label="Location"
                      value={restaurant.location}
                    />

                    <InfoBox
                      label="Category"
                      value={restaurant.category}
                    />

                    <InfoBox
                      label="Orders"
                      value={String(restaurant.orders)}
                    />

                    <InfoBox
                      label="Revenue"
                      value={restaurant.revenue}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedRestaurant(restaurant)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  >
                    <FiEye />
                    Manage Restaurant
                  </button>
                </div>
              ))}
            </div>

            {filteredRestaurants.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                  <FiSearch size={22} />
                </div>

                <h3 className="mt-4 font-black text-gray-950">
                  No restaurants found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* RESTAURANT MANAGEMENT MODAL */}
      {selectedRestaurant && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5 md:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0E9] font-black text-[#FF6B35]">
                  {selectedRestaurant.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h3 className="font-black text-gray-950">
                    {selectedRestaurant.name}
                  </h3>

                  <p className="text-xs text-gray-400">
                    {selectedRestaurant.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRestaurant(null)}
                className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6 md:p-7">
              {/* STATUS */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Restaurant Status
                    </p>

                    <p className="mt-2 text-lg font-black text-gray-950">
                      {selectedRestaurant.status}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full border px-4 py-2 text-sm font-bold ${getStatusClasses(
                      selectedRestaurant.status,
                    )}`}
                  >
                    {selectedRestaurant.status}
                  </span>
                </div>
              </div>

              {/* INFORMATION */}
              <div>
                <h4 className="text-base font-black text-gray-950">
                  Restaurant Information
                </h4>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <DetailItem
                    label="Owner"
                    value={selectedRestaurant.owner}
                  />

                  <DetailItem
                    label="Category"
                    value={selectedRestaurant.category}
                  />

                  <DetailItem
                    label="Email"
                    value={selectedRestaurant.email}
                  />

                  <DetailItem
                    label="Phone"
                    value={selectedRestaurant.phone}
                  />

                  <DetailItem
                    label="Location"
                    value={selectedRestaurant.location}
                  />

                  <DetailItem
                    label="Joined"
                    value={selectedRestaurant.joined}
                  />
                </div>
              </div>

              {/* PERFORMANCE */}
              <div>
                <h4 className="text-base font-black text-gray-950">
                  Restaurant Performance
                </h4>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <MetricBox
                    label="Orders"
                    value={String(selectedRestaurant.orders)}
                  />

                  <MetricBox
                    label="Revenue"
                    value={selectedRestaurant.revenue}
                  />

                  <MetricBox
                    label="Rating"
                    value={`${selectedRestaurant.rating}/5`}
                  />
                </div>
              </div>

              {/* ADMIN ACTIONS */}
              <div>
                <h4 className="text-base font-black text-gray-950">
                  Door-Step Controls
                </h4>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  These actions are controlled by the Door-Step platform
                  administrator.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        selectedRestaurant,
                        "Active",
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                  >
                    <FiCheck />
                    Activate Restaurant
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        selectedRestaurant,
                        "Suspended",
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                  >
                    <FiX />
                    Suspend Restaurant
                  </button>

                  <a
                    href={`/admin/restaurants/${selectedRestaurant.id}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  >
                    <FiEye />
                    Open Full Details
                  </a>

                  <a
                    href="/admin/orders"
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  >
                    <FiPackage />
                    View Orders
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-black tracking-tight text-gray-950">
            {value}
          </p>

          <p className="mt-2 text-xs font-medium text-gray-400">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

function MetricBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-gray-950">
        {value}
      </p>
    </div>
  );
}
