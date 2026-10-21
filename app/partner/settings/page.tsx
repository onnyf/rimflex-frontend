
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiClock,
  FiGrid,
  FiLock,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiPackage,
  FiPercent,
  FiPhone,
  FiSave,
  FiSettings,
  FiShoppingBag,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

export default function RestaurantSettingsPage() {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [saved, setSaved] = useState(false);

  const [restaurantName, setRestaurantName] =
    useState("Mama's Kitchen");

  const [email, setEmail] =
    useState("mamaskitchen@example.com");

  const [phone, setPhone] =
    useState("08012345678");

  const [address, setAddress] =
    useState("12 Allen Avenue, Ikeja, Lagos");

  const [description, setDescription] = useState(
    "Authentic Nigerian meals prepared fresh every day."
  );

  const [deliveryFee, setDeliveryFee] = useState("1500");

  const [deliveryRadius, setDeliveryRadius] = useState("10");

  const [openingTime, setOpeningTime] = useState("08:00");

  const [closingTime, setClosingTime] = useState("22:00");

  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    promotions: true,
    earnings: false,
  });

  const handleSaveProfile = (event: FormEvent) => {
    event.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleSaveDelivery = (event: FormEvent) => {
    event.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleSaveNotifications = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/partner/dashboard",
      icon: <FiGrid />,
    },
    {
      name: "Orders",
      href: "/partner/orders",
      icon: <FiPackage />,
    },
    {
      name: "Menu",
      href: "/partner/menu",
      icon: <FiShoppingBag />,
    },
    {
      name: "Earnings",
      href: "/partner/earnings",
      icon: <FiPercent />,
    },
    {
      name: "Customers",
      href: "/partner/customers",
      icon: <FiUsers />,
    },
    {
      name: "Promotions",
      href: "/partner/promotions",
      icon: <FiPercent />,
    },
    {
      name: "Settings",
      href: "/partner/settings",
      icon: <FiSettings />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F6]">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col bg-[#151515] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* LOGO */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div>
            <h1 className="text-2xl font-black text-white">
              Door<span className="text-[#FF6B35]">-Step</span>
            </h1>

            <p className="mt-0.5 text-xs text-gray-500">
              Restaurant Partner
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* RESTAURANT STATUS */}
        <div className="border-t border-white/10 p-4">
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  Restaurant Status
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {isOnline ? "Accepting orders" : "Not accepting orders"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className={`relative h-6 w-11 rounded-full transition ${
                  isOnline ? "bg-[#FF6B35]" : "bg-gray-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    isOnline ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35] font-bold text-white">
              MK
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                Mama&apos;s Kitchen
              </p>

              <p className="truncate text-xs text-gray-500">
                Restaurant Owner
              </p>
            </div>

            <button
              type="button"
              className="text-gray-500 transition hover:text-white"
            >
              <FiLogOut />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-[270px]">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 lg:hidden"
            >
              <FiMenu className="text-2xl" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-gray-950">
                Restaurant Settings
              </h2>

              <p className="text-sm text-gray-500">
                Manage your restaurant account and preferences.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
          >
            <FiBell className="text-xl" />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#FF6B35]" />
          </button>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          {/* SAVE MESSAGE */}
          {saved && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
              Your changes have been saved successfully.
            </div>
          )}

          {/* PAGE INTRO */}
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
              Account Management
            </p>

            <h1 className="mt-2 text-3xl font-black text-gray-950">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl text-gray-500">
              Update your restaurant information, delivery preferences,
              notifications and account security.
            </p>
          </div>

          <div className="space-y-6">
            {/* RESTAURANT PROFILE */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B35]">
                  <FiUser />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-950">
                    Restaurant Profile
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Keep your restaurant information up to date.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSaveProfile}
                className="grid gap-6 md:grid-cols-2"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Restaurant Name
                  </label>

                  <input
                    value={restaurantName}
                    onChange={(event) =>
                      setRestaurantName(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>

                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Restaurant Address
                  </label>

                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Restaurant Description
                  </label>

                  <textarea
                    rows={4}
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >
                    <FiSave />
                    Save Profile
                  </button>
                </div>
              </form>
            </section>

            {/* BUSINESS HOURS */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B35]">
                  <FiClock />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-950">
                    Business Hours
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Set the hours customers can place orders.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="mb-3 text-sm font-semibold text-gray-700">
                    Opening Time
                  </p>

                  <input
                    type="time"
                    value={openingTime}
                    onChange={(event) =>
                      setOpeningTime(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="mb-3 text-sm font-semibold text-gray-700">
                    Closing Time
                  </p>

                  <input
                    type="time"
                    value={closingTime}
                    onChange={(event) =>
                      setClosingTime(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#FF6B35]"
                  />
                </div>
              </div>
            </section>

            {/* DELIVERY SETTINGS */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B35]">
                  <FiPackage />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-950">
                    Delivery Settings
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Configure how delivery works for your restaurant.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSaveDelivery}
                className="grid gap-6 md:grid-cols-2"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Default Delivery Fee (₦)
                  </label>

                  <input
                    type="number"
                    value={deliveryFee}
                    onChange={(event) =>
                      setDeliveryFee(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Delivery Radius (km)
                  </label>

                  <input
                    type="number"
                    value={deliveryRadius}
                    onChange={(event) =>
                      setDeliveryRadius(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="md:col-span-2 rounded-2xl bg-orange-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-950">
                        Accept Door-Step Delivery
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        Allow Door-Step riders to deliver orders from your
                        restaurant.
                      </p>
                    </div>

                    <div className="h-6 w-11 rounded-full bg-[#FF6B35] p-1">
                      <div className="ml-auto h-4 w-4 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >
                    <FiSave />
                    Save Delivery Settings
                  </button>
                </div>
              </form>
            </section>

            {/* NOTIFICATIONS */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B35]">
                  <FiBell />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-950">
                    Notifications
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Choose the notifications you want to receive.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "newOrders" as const,
                    title: "New Orders",
                    description:
                      "Get notified whenever a customer places a new order.",
                  },
                  {
                    key: "orderUpdates" as const,
                    title: "Order Updates",
                    description:
                      "Receive updates about order status and delivery.",
                  },
                  {
                    key: "promotions" as const,
                    title: "Promotions",
                    description:
                      "Receive information about Door-Step promotions.",
                  },
                  {
                    key: "earnings" as const,
                    title: "Earnings",
                    description:
                      "Get weekly and monthly earnings summaries.",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-5 rounded-2xl border border-gray-100 p-5"
                  >
                    <div>
                      <p className="font-semibold text-gray-950">
                        {item.title}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setNotifications((current) => ({
                          ...current,
                          [item.key]: !current[item.key],
                        }))
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                        notifications[item.key]
                          ? "bg-[#FF6B35]"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          notifications[item.key]
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleSaveNotifications}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  <FiSave />
                  Save Notifications
                </button>
              </div>
            </section>

            {/* BANK & PAYOUT */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B35]">
                  <FiShoppingBag />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-950">
                    Bank & Payout
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage the bank account used for restaurant payouts.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Bank Name
                  </label>

                  <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#FF6B35]">
                    <option>Choose Bank</option>
                    <option>GTBank</option>
                    <option>Access Bank</option>
                    <option>First Bank</option>
                    <option>UBA</option>
                    <option>Zenith Bank</option>
                    <option>Moniepoint</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Account Number
                  </label>

                  <input
                    type="text"
                    placeholder="Enter account number"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="md:col-span-2 rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm font-semibold text-gray-950">
                    Payout Schedule
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Restaurant payouts are processed according to the
                    Door-Step payout schedule.
                  </p>
                </div>
              </div>
            </section>

            {/* SECURITY */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B35]">
                  <FiLock />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-950">
                    Security
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your password and account security.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-gray-200 p-5 text-left transition hover:border-[#FF6B35]"
                >
                  <div>
                    <p className="font-semibold text-gray-950">
                      Change Password
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Update your restaurant account password.
                    </p>
                  </div>

                  <FiChevronDown className="text-gray-400" />
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-red-100 bg-red-50 p-5 text-left transition hover:border-red-300"
                >
                  <div>
                    <p className="font-semibold text-red-700">
                      Deactivate Restaurant
                    </p>

                    <p className="mt-1 text-sm text-red-500">
                      Temporarily disable your restaurant account.
                    </p>
                  </div>

                  <FiSettings className="text-red-500" />
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
