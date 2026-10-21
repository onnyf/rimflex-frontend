
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  FiActivity,
  FiArrowLeft,
  FiBell,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiEdit3,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiPackage,
  FiPercent,
  FiSave,
  FiSettings,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiUser,
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
  address: string;
  city: string;
  state: string;
  orders: number;
  revenue: string;
  commission: string;
  rating: number;
  status: RestaurantStatus;
  joined: string;
  openingTime: string;
  closingTime: string;
  deliveryRadius: string;
  deliveryFee: string;
  description: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
};

const restaurants: Restaurant[] = [
  {
    id: "REST-1001",
    name: "Mama's Kitchen",
    owner: "Adebayo Johnson",
    email: "mama@doorstep.ng",
    phone: "08012345678",
    category: "Nigerian",
    location: "Ikeja, Lagos",
    address: "12 Allen Avenue",
    city: "Ikeja",
    state: "Lagos",
    orders: 428,
    revenue: "₦2.84M",
    commission: "15%",
    rating: 4.8,
    status: "Active",
    joined: "Jan 12, 2026",
    openingTime: "08:00",
    closingTime: "22:00",
    deliveryRadius: "8 km",
    deliveryFee: "₦1,500",
    description:
      "A Nigerian restaurant serving delicious local meals and family favourites.",
    bankName: "GTBank",
    accountName: "Mama's Kitchen Ltd",
    accountNumber: "1234567890",
  },
  {
    id: "REST-1002",
    name: "Taste of Lagos",
    owner: "Chioma Okafor",
    email: "tasteoflagos@doorstep.ng",
    phone: "08023456789",
    category: "African",
    location: "Yaba, Lagos",
    address: "25 Herbert Macaulay Way",
    city: "Yaba",
    state: "Lagos",
    orders: 316,
    revenue: "₦2.16M",
    commission: "15%",
    rating: 4.7,
    status: "Active",
    joined: "Feb 04, 2026",
    openingTime: "09:00",
    closingTime: "21:30",
    deliveryRadius: "7 km",
    deliveryFee: "₦1,200",
    description:
      "Authentic African meals prepared fresh for customers across Lagos.",
    bankName: "Access Bank",
    accountName: "Taste of Lagos",
    accountNumber: "2345678901",
  },
  {
    id: "REST-1003",
    name: "Urban Bites",
    owner: "Daniel Williams",
    email: "urbanbites@doorstep.ng",
    phone: "08034567890",
    category: "Fast Food",
    location: "Lekki, Lagos",
    address: "8 Admiralty Way",
    city: "Lekki",
    state: "Lagos",
    orders: 284,
    revenue: "₦1.92M",
    commission: "12%",
    rating: 4.6,
    status: "Active",
    joined: "Feb 18, 2026",
    openingTime: "10:00",
    closingTime: "23:00",
    deliveryRadius: "10 km",
    deliveryFee: "₦1,800",
    description:
      "Modern fast food restaurant serving burgers, fries, chicken and more.",
    bankName: "First Bank",
    accountName: "Urban Bites",
    accountNumber: "3456789012",
  },
  {
    id: "REST-1004",
    name: "Motrust Restaurant",
    owner: "Olufemi Oni",
    email: "motrust@doorstep.ng",
    phone: "08045678901",
    category: "Continental",
    location: "Surulere, Lagos",
    address: "44 Adeniran Ogunsanya Street",
    city: "Surulere",
    state: "Lagos",
    orders: 156,
    revenue: "₦984K",
    commission: "15%",
    rating: 4.9,
    status: "Active",
    joined: "Mar 02, 2026",
    openingTime: "08:00",
    closingTime: "22:00",
    deliveryRadius: "8 km",
    deliveryFee: "₦1,500",
    description:
      "A modern restaurant offering continental meals and selected local dishes.",
    bankName: "UBA",
    accountName: "Motrust Restaurant",
    accountNumber: "4567890123",
  },
  {
    id: "REST-1005",
    name: "Green Bowl",
    owner: "Blessing Okafor",
    email: "greenbowl@doorstep.ng",
    phone: "08056789012",
    category: "Healthy Food",
    location: "Victoria Island, Lagos",
    address: "15 Ahmadu Bello Way",
    city: "Victoria Island",
    state: "Lagos",
    orders: 98,
    revenue: "₦645K",
    commission: "10%",
    rating: 4.5,
    status: "Pending",
    joined: "Mar 11, 2026",
    openingTime: "08:00",
    closingTime: "20:00",
    deliveryRadius: "6 km",
    deliveryFee: "₦1,300",
    description:
      "Healthy meals, smoothies and nutritious food options.",
    bankName: "Zenith Bank",
    accountName: "Green Bowl",
    accountNumber: "5678901234",
  },
  {
    id: "REST-1006",
    name: "Pepper House",
    owner: "Michael Adeyemi",
    email: "pepperhouse@doorstep.ng",
    phone: "08067890123",
    category: "Nigerian",
    location: "Maryland, Lagos",
    address: "7 Mobolaji Bank Anthony Way",
    city: "Maryland",
    state: "Lagos",
    orders: 72,
    revenue: "₦421K",
    commission: "15%",
    rating: 4.3,
    status: "Suspended",
    joined: "Mar 15, 2026",
    openingTime: "09:00",
    closingTime: "21:00",
    deliveryRadius: "5 km",
    deliveryFee: "₦1,200",
    description:
      "Traditional Nigerian dishes prepared with fresh ingredients.",
    bankName: "Sterling Bank",
    accountName: "Pepper House",
    accountNumber: "6789012345",
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

function maskAccountNumber(accountNumber: string) {
  return `••••••${accountNumber.slice(-4)}`;
}

export default function AdminRestaurantDetailsPage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const restaurantId = String(params.id);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const restaurant = useMemo(
    () => restaurants.find((item) => item.id === restaurantId),
    [restaurantId],
  );

  const [form, setForm] = useState<Restaurant | null>(restaurant || null);

  useEffect(() => {
    const authenticated =
      localStorage.getItem("doorstep_admin_authenticated");

    if (authenticated !== "true") {
      router.replace("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    if (restaurant) {
      setForm(restaurant);
    }
  }, [restaurant]);

  const adminEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("doorstep_admin_email") ||
        "admin@doorstep.ng"
      : "admin@doorstep.ng";

  const handleLogout = () => {
    localStorage.removeItem("doorstep_admin_authenticated");
    localStorage.removeItem("doorstep_admin_email");

    router.push("/admin/login");
  };

  const updateForm = (
    field: keyof Restaurant,
    value: string | number,
  ) => {
    setForm((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current,
    );
  };

  const handleSave = () => {
    setEditMode(false);
    setSuccessMessage(
      "Restaurant information has been updated successfully.",
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  const handleStatus = (status: RestaurantStatus) => {
    setForm((current) =>
      current
        ? {
            ...current,
            status,
          }
        : current,
    );

    setSuccessMessage(
      `${restaurant?.name || "Restaurant"} has been ${status.toLowerCase()}.`,
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  if (!restaurant || !form) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEF2F1] px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <FiShoppingBag size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-black text-gray-950">
            Restaurant Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            The restaurant you are looking for does not exist.
          </p>

          <a
            href="/admin/restaurants"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#003A2B] px-5 py-3 font-bold text-white"
          >
            <FiArrowLeft />
            Back to Restaurants
          </a>
        </div>
      </div>
    );
  }

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
                Restaurant Management
              </p>

              <h1 className="text-lg font-black text-gray-950 md:text-xl">
                {form.name}
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
                onClick={() =>
                  setProfileOpen((current) => !current)
                }
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
          {/* SUCCESS */}
          {successMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
              <FiCheck />
              {successMessage}
            </div>
          )}

          {/* BACK */}
          <a
            href="/admin/restaurants"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to Restaurants
          </a>

          {/* HERO */}
          <section className="mt-5 rounded-3xl bg-[#003A2B] p-6 text-white shadow-sm md:p-8">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl font-black text-[#FF6B35]">
                  {form.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-black md:text-3xl">
                      {form.name}
                    </h2>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        form.status === "Active"
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : form.status === "Pending"
                            ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                            : "border-red-400/30 bg-red-400/10 text-red-300"
                      }`}
                    >
                      {form.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-white/60">
                    {form.category} • {form.location} • {form.id}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setEditMode((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  <FiEdit3 />
                  {editMode ? "Cancel Editing" : "Edit Restaurant"}
                </button>

                {form.status === "Active" ? (
                  <button
                    type="button"
                    onClick={() => handleStatus("Suspended")}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600"
                  >
                    <FiX />
                    Suspend
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStatus("Active")}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                  >
                    <FiCheck />
                    Activate
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* PERFORMANCE */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Total Orders"
              value={String(form.orders)}
              icon={<FiPackage />}
            />

            <MetricCard
              label="Gross Revenue"
              value={form.revenue}
              icon={<FiDollarSign />}
            />

            <MetricCard
              label="Commission"
              value={form.commission}
              icon={<FiPercent />}
            />

            <MetricCard
              label="Customer Rating"
              value={`${form.rating}/5`}
              icon={<FiStar />}
            />
          </section>

          {/* EDIT MODE */}
          {editMode && (
            <section className="mt-6 rounded-3xl border border-[#FF6B35]/20 bg-white p-6 shadow-sm md:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
                    Admin Editing
                  </p>

                  <h3 className="mt-1 text-xl font-black text-gray-950">
                    Edit Restaurant Information
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Door-Step Admin can correct or update restaurant
                    information from this panel.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e95a27]"
                >
                  <FiSave />
                  Save Changes
                </button>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <FormField
                  label="Restaurant Name"
                  value={form.name}
                  onChange={(value) => updateForm("name", value)}
                />

                <FormField
                  label="Owner Name"
                  value={form.owner}
                  onChange={(value) => updateForm("owner", value)}
                />

                <FormField
                  label="Email"
                  value={form.email}
                  onChange={(value) => updateForm("email", value)}
                />

                <FormField
                  label="Phone"
                  value={form.phone}
                  onChange={(value) => updateForm("phone", value)}
                />

                <FormField
                  label="Category"
                  value={form.category}
                  onChange={(value) => updateForm("category", value)}
                />

                <FormField
                  label="Address"
                  value={form.address}
                  onChange={(value) => updateForm("address", value)}
                />

                <FormField
                  label="City"
                  value={form.city}
                  onChange={(value) => updateForm("city", value)}
                />

                <FormField
                  label="State"
                  value={form.state}
                  onChange={(value) => updateForm("state", value)}
                />

                <FormField
                  label="Opening Time"
                  type="time"
                  value={form.openingTime}
                  onChange={(value) =>
                    updateForm("openingTime", value)
                  }
                />

                <FormField
                  label="Closing Time"
                  type="time"
                  value={form.closingTime}
                  onChange={(value) =>
                    updateForm("closingTime", value)
                  }
                />

                <FormField
                  label="Delivery Radius"
                  value={form.deliveryRadius}
                  onChange={(value) =>
                    updateForm("deliveryRadius", value)
                  }
                />

                <FormField
                  label="Delivery Fee"
                  value={form.deliveryFee}
                  onChange={(value) =>
                    updateForm("deliveryFee", value)
                  }
                />

                <FormField
                  label="Commission"
                  value={form.commission}
                  onChange={(value) =>
                    updateForm("commission", value)
                  }
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-bold text-gray-700">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateForm(
                      "description",
                      event.target.value,
                    )
                  }
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
                />
              </div>
            </section>
          )}

          {/* MAIN GRID */}
          <section className="mt-6 grid gap-6 xl:grid-cols-3">
            {/* RESTAURANT PROFILE */}
            <div className="xl:col-span-2 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
              <SectionHeader
                icon={<FiShoppingBag />}
                title="Restaurant Profile"
                description="Business information and restaurant details."
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailCard
                  label="Restaurant Name"
                  value={form.name}
                />

                <DetailCard
                  label="Owner"
                  value={form.owner}
                />

                <DetailCard
                  label="Category"
                  value={form.category}
                />

                <DetailCard
                  label="Phone"
                  value={form.phone}
                />

                <DetailCard
                  label="Email"
                  value={form.email}
                />

                <DetailCard
                  label="Joined Door-Step"
                  value={form.joined}
                />
              </div>

              <div className="mt-4 rounded-2xl bg-gray-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Description
                </p>

                <p className="mt-2 text-sm leading-7 text-gray-600">
                  {form.description}
                </p>
              </div>
            </div>

            {/* ACCOUNT STATUS */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
              <SectionHeader
                icon={<FiActivity />}
                title="Platform Status"
                description="Door-Step account control."
              />

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Current Status
                </p>

                <div
                  className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-bold ${getStatusClasses(
                    form.status,
                  )}`}
                >
                  {form.status}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {form.status !== "Active" && (
                  <button
                    type="button"
                    onClick={() => handleStatus("Active")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                  >
                    <FiCheck />
                    Activate Restaurant
                  </button>
                )}

                {form.status !== "Suspended" && (
                  <button
                    type="button"
                    onClick={() => handleStatus("Suspended")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700"
                  >
                    <FiX />
                    Suspend Restaurant
                  </button>
                )}
              </div>

              <div className="mt-6 rounded-2xl bg-amber-50 p-4">
                <p className="text-sm font-bold text-amber-800">
                  Admin Control
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-700">
                  Suspended restaurants should not receive new customer
                  orders until they are reactivated.
                </p>
              </div>
            </div>
          </section>

          {/* LOCATION + HOURS */}
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
              <SectionHeader
                icon={<FiTruck />}
                title="Location & Delivery"
                description="Restaurant location and delivery configuration."
              />

              <div className="mt-6 space-y-4">
                <DetailCard
                  label="Address"
                  value={form.address}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailCard
                    label="City"
                    value={form.city}
                  />

                  <DetailCard
                    label="State"
                    value={form.state}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailCard
                    label="Delivery Radius"
                    value={form.deliveryRadius}
                  />

                  <DetailCard
                    label="Delivery Fee"
                    value={form.deliveryFee}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
              <SectionHeader
                icon={<FiClock />}
                title="Business Hours"
                description="Restaurant operating schedule."
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailCard
                  label="Opening Time"
                  value={form.openingTime}
                />

                <DetailCard
                  label="Closing Time"
                  value={form.closingTime}
                />
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <FiClock />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-800">
                    Operating Window
                  </p>

                  <p className="mt-1 text-xs text-emerald-700">
                    {form.openingTime} - {form.closingTime}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PAYOUT */}
          <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
            <SectionHeader
              icon={<FiDollarSign />}
              title="Bank & Payout Information"
              description="Restaurant payout information visible to Door-Step Admin."
            />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <DetailCard
                label="Bank"
                value={form.bankName}
              />

              <DetailCard
                label="Account Name"
                value={form.accountName}
              />

              <DetailCard
                label="Account Number"
                value={maskAccountNumber(form.accountNumber)}
              />
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
              <FiDollarSign className="mt-0.5 text-gray-500" />

              <p className="text-xs leading-5 text-gray-500">
                Payout information is controlled and verified by Door-Step
                Admin before restaurant withdrawals are processed.
              </p>
            </div>
          </section>

          {/* MANAGEMENT SHORTCUTS */}
          <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
            <SectionHeader
              icon={<FiSettings />}
              title="Restaurant Management"
              description="Quick access to other platform controls."
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <ManagementLink
                href="/admin/orders"
                icon={<FiPackage />}
                title="Orders"
                description="View restaurant orders"
              />

              <ManagementLink
                href="/admin/payments"
                icon={<FiDollarSign />}
                title="Payments"
                description="Manage restaurant payouts"
              />

              <ManagementLink
                href="/admin/promotions"
                icon={<FiPercent />}
                title="Promotions"
                description="Manage campaigns"
              />

              <ManagementLink
                href="/admin/settings"
                icon={<FiSettings />}
                title="Platform Settings"
                description="System configuration"
              />
            </div>
          </section>

          {/* DOCUMENTS */}
          <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
            <SectionHeader
              icon={<FiFileText />}
              title="Restaurant Verification"
              description="Business documents and compliance information."
            />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <DocumentCard
                title="Business Registration"
                status="Verified"
              />

              <DocumentCard
                title="Restaurant Information"
                status="Verified"
              />

              <DocumentCard
                title="Payout Information"
                status="Verified"
              />
            </div>
          </section>

          {/* DANGER ZONE */}
          <section className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-6 md:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <FiX />
              </div>

              <div>
                <h3 className="font-black text-red-900">
                  Danger Zone
                </h3>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-red-700">
                  These actions affect the restaurant's access to the
                  Door-Step marketplace. Use them carefully.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => handleStatus("Suspended")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                <FiX />
                Suspend Restaurant
              </button>

              <button
                type="button"
                onClick={() => {
                  setSuccessMessage(
                    "Restaurant account deletion requires additional confirmation.",
                  );

                  setTimeout(() => {
                    setSuccessMessage("");
                  }, 2500);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Delete Restaurant
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-black tracking-tight text-gray-950">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
        {icon}
      </div>

      <div>
        <h3 className="font-black text-gray-950">{title}</h3>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
      />
    </div>
  );
}

function ManagementLink({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-gray-200 p-4 transition hover:-translate-y-0.5 hover:border-[#FF6B35] hover:shadow-sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition group-hover:bg-[#FFF0E9] group-hover:text-[#FF6B35]">
        {icon}
      </div>

      <p className="mt-4 font-black text-gray-950">{title}</p>

      <p className="mt-1 text-xs leading-5 text-gray-500">
        {description}
      </p>
    </a>
  );
}

function DocumentCard({
  title,
  status,
}: {
  title: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
          <FiFileText />
        </div>

        <div>
          <p className="text-sm font-bold text-gray-800">
            {title}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Document checked
          </p>
        </div>
      </div>

      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
        <FiCheck />
        {status}
      </span>
    </div>
  );
}
