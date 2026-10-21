
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  FiActivity,
  FiBell,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiEdit3,
  FiGrid,
  FiImage,
  FiLogOut,
  FiMenu,
  FiPackage,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShoppingBag,
  FiStar,
  FiTag,
  FiTrash2,
  FiTruck,
  FiUsers,
  FiX,
} from "react-icons/fi";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  preparationTime: number;
  orders: number;
  revenue: number;
  image: string;
  available: boolean;
  featured: boolean;
};

const restaurantNames: Record<string, string> = {
  "REST-1001": "Mama's Kitchen",
  "REST-1002": "Taste of Lagos",
  "REST-1003": "Urban Bites",
  "REST-1004": "Motrust Restaurant",
  "REST-1005": "Green Bowl",
  "REST-1006": "Pepper House",
};

const initialMenuItems: MenuItem[] = [
  {
    id: "MENU-001",
    name: "Jollof Rice & Chicken",
    category: "Main Meals",
    description:
      "Smoky Nigerian jollof rice served with grilled chicken and plantain.",
    price: 8300,
    preparationTime: 25,
    orders: 42,
    revenue: 348600,
    image: "jollof-rice.jpg",
    available: true,
    featured: true,
  },
  {
    id: "MENU-002",
    name: "Fried Rice & Chicken",
    category: "Main Meals",
    description:
      "Special fried rice served with seasoned grilled chicken and vegetables.",
    price: 6500,
    preparationTime: 20,
    orders: 31,
    revenue: 201500,
    image: "fried-rice.jpg",
    available: true,
    featured: false,
  },
  {
    id: "MENU-003",
    name: "Pounded Yam & Egusi",
    category: "Main Meals",
    description:
      "Freshly prepared pounded yam served with rich traditional egusi soup.",
    price: 7800,
    preparationTime: 30,
    orders: 24,
    revenue: 187200,
    image: "pounded-yam.jpg",
    available: true,
    featured: true,
  },
  {
    id: "MENU-004",
    name: "Pepper Soup & Plantain",
    category: "Soups",
    description:
      "Spicy Nigerian pepper soup served with sweet fried plantain.",
    price: 5200,
    preparationTime: 20,
    orders: 19,
    revenue: 98800,
    image: "pepper-soup.jpg",
    available: true,
    featured: false,
  },
  {
    id: "MENU-005",
    name: "Beef Suya",
    category: "Grills",
    description:
      "Spicy grilled beef suya served with onions, tomatoes and special seasoning.",
    price: 6000,
    preparationTime: 18,
    orders: 16,
    revenue: 96000,
    image: "beef-suya.jpg",
    available: true,
    featured: false,
  },
  {
    id: "MENU-006",
    name: "Chicken Wings",
    category: "Grills",
    description:
      "Crispy seasoned chicken wings served with a house dipping sauce.",
    price: 5500,
    preparationTime: 22,
    orders: 13,
    revenue: 71500,
    image: "chicken-wings.jpg",
    available: false,
    featured: false,
  },
];

const categories = [
  "All Categories",
  "Main Meals",
  "Soups",
  "Grills",
  "Drinks",
  "Desserts",
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
    icon: FiPackage,
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
    icon: FiActivity,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: FiDollarSign,
  },
  {
    label: "Promotions",
    href: "/admin/promotions",
    icon: FiTag,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: FiSettings,
  },
];

function formatCurrency(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export default function AdminRestaurantMenuPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const restaurantId = String(params.id);
  const restaurantName =
    restaurantNames[restaurantId] || "Restaurant";

  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Main Meals",
    description: "",
    price: "",
    preparationTime: "20",
    image: "",
    available: true,
    featured: false,
  });

  useEffect(() => {
    const authenticated = localStorage.getItem(
      "doorstep_admin_authenticated",
    );

    if (authenticated !== "true") {
      router.replace("/admin/login");
    }
  }, [router]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All Categories" ||
        item.category === categoryFilter;

      const matchesAvailability =
        availabilityFilter === "All" ||
        (availabilityFilter === "Available" && item.available) ||
        (availabilityFilter === "Unavailable" && !item.available);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  }, [
    menuItems,
    search,
    categoryFilter,
    availabilityFilter,
  ]);

  const totalItems = menuItems.length;
  const availableItems = menuItems.filter(
    (item) => item.available,
  ).length;
  const featuredItems = menuItems.filter(
    (item) => item.featured,
  ).length;
  const totalRevenue = menuItems.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  function showSuccess(message: string) {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  }

  function openAddModal() {
    setEditingItem(null);

    setForm({
      name: "",
      category: "Main Meals",
      description: "",
      price: "",
      preparationTime: "20",
      image: "",
      available: true,
      featured: false,
    });

    setModalOpen(true);
  }

  function openEditModal(item: MenuItem) {
    setEditingItem(item);

    setForm({
      name: item.name,
      category: item.category,
      description: item.description,
      price: String(item.price),
      preparationTime: String(item.preparationTime),
      image: item.image,
      available: item.available,
      featured: item.featured,
    });

    setModalOpen(true);
  }

  function handleSaveItem() {
    if (!form.name.trim() || !form.price.trim()) {
      return;
    }

    const price = Number(form.price);
    const preparationTime = Number(form.preparationTime);

    if (editingItem) {
      setMenuItems((current) =>
        current.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: form.name,
                category: form.category,
                description: form.description,
                price,
                preparationTime,
                image: form.image || "food-image.jpg",
                available: form.available,
                featured: form.featured,
              }
            : item,
        ),
      );

      showSuccess("Menu item updated successfully.");
    } else {
      const newItem: MenuItem = {
        id: `MENU-${Date.now()}`,
        name: form.name,
        category: form.category,
        description: form.description,
        price,
        preparationTime,
        orders: 0,
        revenue: 0,
        image: form.image || "food-image.jpg",
        available: form.available,
        featured: form.featured,
      };

      setMenuItems((current) => [newItem, ...current]);

      showSuccess("New menu item added successfully.");
    }

    setModalOpen(false);
  }

  function toggleAvailability(id: string) {
    setMenuItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              available: !item.available,
            }
          : item,
      ),
    );

    showSuccess("Availability updated.");
  }

  function toggleFeatured(id: string) {
    setMenuItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              featured: !item.featured,
            }
          : item,
      ),
    );

    showSuccess("Featured status updated.");
  }

  function confirmDelete(item: MenuItem) {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  }

  function deleteItem() {
    if (!itemToDelete) return;

    setMenuItems((current) =>
      current.filter((item) => item.id !== itemToDelete.id),
    );

    setDeleteModalOpen(false);
    setItemToDelete(null);

    showSuccess("Menu item deleted successfully.");
  }

  function handleLogout() {
    localStorage.removeItem("doorstep_admin_authenticated");
    localStorage.removeItem("doorstep_admin_email");

    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-gray-900">
      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col bg-[#003A2B] text-white transition-transform duration-300 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/admin/dashboard"
            className="text-2xl font-black tracking-tight"
          >
            Door<span className="text-[#FF6B35]">-Step</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="px-5 pt-7">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
            Platform Management
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              const active =
                item.href === "/admin/restaurants"
                  ? pathname.startsWith("/admin/restaurants")
                  : pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#FF6B35] text-white shadow-lg shadow-orange-950/20"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35] font-bold">
                A
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold">
                  Door-Step Admin
                </p>

                <p className="truncate text-xs text-white/45">
                  Platform Administrator
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <FiLogOut />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:pl-[270px]">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-xl border border-gray-200 p-2.5 lg:hidden"
            >
              <FiMenu size={20} />
            </button>

            <div>
              <p className="text-xs font-semibold text-gray-400">
                Restaurant Management
              </p>

              <h1 className="text-lg font-black text-gray-950">
                Menu Management
              </h1>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-50"
            >
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-gray-900">
                  Admin
                </p>

                <p className="text-xs text-gray-400">
                  Platform Admin
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003A2B] font-bold text-white">
                A
              </div>

              <FiChevronDown className="text-gray-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 w-52 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-gray-50"
                >
                  <FiGrid />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <FiLogOut />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="p-5 md:p-8">
          {/* SUCCESS MESSAGE */}
          {successMessage && (
            <div className="fixed right-5 top-24 z-[70] flex max-w-sm items-center gap-3 rounded-2xl bg-[#003A2B] px-5 py-4 text-sm font-semibold text-white shadow-2xl">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
                <FiCheck />
              </div>

              {successMessage}
            </div>
          )}

          {/* BREADCRUMB */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
            <Link
              href="/admin/restaurants"
              className="font-semibold text-gray-400 hover:text-[#FF6B35]"
            >
              Restaurants
            </Link>

            <span className="text-gray-300">/</span>

            <Link
              href={`/admin/restaurants/${restaurantId}`}
              className="font-semibold text-gray-400 hover:text-[#FF6B35]"
            >
              {restaurantName}
            </Link>

            <span className="text-gray-300">/</span>

            <span className="font-semibold text-gray-900">
              Menu
            </span>
          </div>

          {/* PAGE HEADER */}
          <section className="mb-8 rounded-3xl bg-[#003A2B] p-6 text-white shadow-sm md:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                    ADMIN CONTROL
                  </span>

                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-300">
                    Platform Managed
                  </span>
                </div>

                <h2 className="text-2xl font-black md:text-3xl">
                  {restaurantName}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                  Manage this restaurant&apos;s complete menu,
                  pricing, availability, featured products and
                  performance from the Door-Step platform.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/admin/restaurants/${restaurantId}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold transition hover:bg-white/10"
                >
                  Restaurant Details
                </Link>

                <button
                  onClick={openAddModal}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e85b2b]"
                >
                  <FiPlus />
                  Add Menu Item
                </button>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<FiPackage />}
              title="Total Items"
              value={String(totalItems)}
              description="Menu products"
            />

            <StatCard
              icon={<FiCheck />}
              title="Available"
              value={String(availableItems)}
              description="Currently orderable"
              green
            />

            <StatCard
              icon={<FiStar />}
              title="Featured"
              value={String(featuredItems)}
              description="Featured products"
            />

            <StatCard
              icon={<FiDollarSign />}
              title="Menu Revenue"
              value={formatCurrency(totalRevenue)}
              description="Demo item revenue"
            />
          </section>

          {/* PLATFORM CONTROL NOTICE */}
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-orange-100 bg-orange-50 p-5 md:flex-row md:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35] text-white">
              <FiActivity size={20} />
            </div>

            <div>
              <p className="font-bold text-gray-950">
                Door-Step Platform Control
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Changes made here are administrator controls.
                They can override restaurant-level menu settings
                when required for platform operations.
              </p>
            </div>
          </div>

          {/* FILTERS */}
          <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative flex-1 xl:max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search menu items..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                >
                  {categories.map((category) => (
                    <option key={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  value={availabilityFilter}
                  onChange={(event) =>
                    setAvailabilityFilter(event.target.value)
                  }
                  className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                >
                  <option value="All">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">
                    Unavailable
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* MENU TABLE */}
          <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between md:px-6">
              <div>
                <h3 className="font-black text-gray-950">
                  Menu Items
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {filteredItems.length} item
                  {filteredItems.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <button
                onClick={openAddModal}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#e85b2b]"
              >
                <FiPlus />
                Add Item
              </button>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Product
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Category
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Price
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Prep Time
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Orders
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Revenue
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#FFF3EC] text-[#FF6B35]">
                            <FiImage size={22} />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="truncate font-bold text-gray-950">
                                {item.name}
                              </p>

                              {item.featured && (
                                <FiStar
                                  className="shrink-0 fill-[#FF6B35] text-[#FF6B35]"
                                  size={14}
                                />
                              )}
                            </div>

                            <p className="mt-1 max-w-[250px] truncate text-xs text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-5">
                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-4 py-5 font-black text-gray-950">
                        {formatCurrency(item.price)}
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <FiClock />
                          {item.preparationTime} mins
                        </div>
                      </td>

                      <td className="px-4 py-5 font-semibold text-gray-700">
                        {item.orders}
                      </td>

                      <td className="px-4 py-5 font-bold text-gray-950">
                        {formatCurrency(item.revenue)}
                      </td>

                      <td className="px-4 py-5">
                        <button
                          onClick={() =>
                            toggleAvailability(item.id)
                          }
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                            item.available
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {item.available
                            ? "Available"
                            : "Unavailable"}
                        </button>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              toggleFeatured(item.id)
                            }
                            title={
                              item.featured
                                ? "Remove Featured"
                                : "Mark Featured"
                            }
                            className={`rounded-lg p-2.5 transition ${
                              item.featured
                                ? "bg-orange-50 text-[#FF6B35]"
                                : "bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-[#FF6B35]"
                            }`}
                          >
                            <FiStar
                              size={16}
                              className={
                                item.featured
                                  ? "fill-current"
                                  : ""
                              }
                            />
                          </button>

                          <button
                            onClick={() =>
                              openEditModal(item)
                            }
                            title="Edit Item"
                            className="rounded-lg bg-gray-100 p-2.5 text-gray-500 transition hover:bg-[#003A2B] hover:text-white"
                          >
                            <FiEdit3 size={16} />
                          </button>

                          <button
                            onClick={() =>
                              confirmDelete(item)
                            }
                            title="Delete Item"
                            className="rounded-lg bg-gray-100 p-2.5 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="divide-y divide-gray-100 lg:hidden">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5"
                >
                  <div className="flex gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#FFF3EC] text-[#FF6B35]">
                      <FiImage size={24} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-gray-950">
                              {item.name}
                            </h4>

                            {item.featured && (
                              <FiStar
                                size={14}
                                className="fill-[#FF6B35] text-[#FF6B35]"
                              />
                            )}
                          </div>

                          <p className="mt-1 text-xs text-gray-400">
                            {item.category}
                          </p>
                        </div>

                        <p className="font-black text-gray-950">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-gray-500">
                        {item.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-600">
                          <FiClock />
                          {item.preparationTime} mins
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-600">
                          {item.orders} orders
                        </span>

                        <span
                          className={`rounded-full px-3 py-1.5 font-bold ${
                            item.available
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {item.available
                            ? "Available"
                            : "Unavailable"}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-gray-400">
                            Revenue
                          </p>

                          <p className="mt-1 font-black text-gray-950">
                            {formatCurrency(item.revenue)}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              toggleAvailability(item.id)
                            }
                            className="rounded-lg bg-gray-100 p-2.5 text-gray-600"
                          >
                            <FiCheck size={16} />
                          </button>

                          <button
                            onClick={() =>
                              toggleFeatured(item.id)
                            }
                            className={`rounded-lg p-2.5 ${
                              item.featured
                                ? "bg-orange-50 text-[#FF6B35]"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            <FiStar
                              size={16}
                              className={
                                item.featured
                                  ? "fill-current"
                                  : ""
                              }
                            />
                          </button>

                          <button
                            onClick={() =>
                              openEditModal(item)
                            }
                            className="rounded-lg bg-gray-100 p-2.5 text-gray-600"
                          >
                            <FiEdit3 size={16} />
                          </button>

                          <button
                            onClick={() =>
                              confirmDelete(item)
                            }
                            className="rounded-lg bg-gray-100 p-2.5 text-red-500"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <EmptyState />
              )}
            </div>

            {filteredItems.length === 0 && (
              <div className="hidden p-12 lg:block">
                <EmptyState />
              </div>
            )}
          </section>
        </main>
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FF6B35]">
                  Menu Management
                </p>

                <h2 className="mt-1 text-xl font-black text-gray-950">
                  {editingItem
                    ? "Edit Menu Item"
                    : "Add Menu Item"}
                </h2>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl bg-gray-100 p-2.5 text-gray-500 hover:bg-gray-200"
              >
                <FiX />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Product Name"
                  value={form.name}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      name: value,
                    })
                  }
                  placeholder="e.g. Jollof Rice & Chicken"
                />

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Category
                  </label>

                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        category: event.target.value,
                      })
                    }
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#FF6B35]"
                  >
                    {categories
                      .filter(
                        (category) =>
                          category !== "All Categories",
                      )
                      .map((category) => (
                        <option key={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Price (₦)"
                  type="number"
                  value={form.price}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      price: value,
                    })
                  }
                  placeholder="8300"
                />

                <InputField
                  label="Preparation Time (minutes)"
                  type="number"
                  value={form.preparationTime}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      preparationTime: value,
                    })
                  }
                  placeholder="20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Describe this menu item..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Food Image
                </label>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#FF6B35]">
                    <FiImage />
                  </div>

                  <input
                    value={form.image}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        image: event.target.value,
                      })
                    }
                    placeholder="e.g. jollof-rice.jpg"
                    className="h-12 flex-1 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  For now, enter the image filename. Real image
                  upload/storage will be connected when the
                  backend is added.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 p-4">
                  <div>
                    <p className="font-bold text-gray-900">
                      Available
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Customers can order this item
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        available: event.target.checked,
                      })
                    }
                    className="h-5 w-5 accent-[#FF6B35]"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 p-4">
                  <div>
                    <p className="font-bold text-gray-900">
                      Featured
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Highlight this item on the platform
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        featured: event.target.checked,
                      })
                    }
                    className="h-5 w-5 accent-[#FF6B35]"
                  />
                </label>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveItem}
                  disabled={!form.name.trim() || !form.price.trim()}
                  className="rounded-xl bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#e85b2b] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {editingItem
                    ? "Save Changes"
                    : "Add Menu Item"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FiTrash2 size={21} />
            </div>

            <h2 className="mt-5 text-xl font-black text-gray-950">
              Delete Menu Item?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              You are about to delete{" "}
              <strong className="text-gray-900">
                {itemToDelete.name}
              </strong>
              . This action will remove the item from this
              restaurant&apos;s admin menu.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setItemToDelete(null);
                }}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={deleteItem}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  description,
  green = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  green?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            green
              ? "bg-green-50 text-green-600"
              : "bg-orange-50 text-[#FF6B35]"
          }`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-5 text-sm font-semibold text-gray-400">
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

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#FF6B35]"
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
        <FiPackage size={24} />
      </div>

      <h3 className="mt-4 font-black text-gray-950">
        No menu items found
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
        Try changing your search or filters, or add a new
        menu item.
      </p>
    </div>
  );
}
