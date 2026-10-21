
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import {
  FiArrowLeft,
  FiBell,
  FiCheck,
  FiEye,
  FiMapPin,
  FiMenu,
  FiPackage,
  FiPhone,
  FiSearch,
  FiShoppingBag,
  FiTruck,
  FiUser,
  FiX,
} from "react-icons/fi";

type OrderStatus =
  | "New"
  | "Preparing"
  | "Ready"
  | "Out for delivery"
  | "Completed"
  | "Cancelled";

type Order = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  status: OrderStatus;
  time: string;
  payment: "Paid" | "Cash on Delivery";
  rider?: string;
};

const initialOrders: Order[] = [
  {
    id: "DS-10842",
    customer: "Adewale Johnson",
    phone: "0803 456 7890",
    address: "Allen Avenue, Ikeja, Lagos",
    items: [
      {
        name: "Jollof Rice & Chicken",
        quantity: 1,
        price: 4500,
      },
      {
        name: "Fried Plantain",
        quantity: 2,
        price: 1800,
      },
    ],
    subtotal: 8100,
    deliveryFee: 1200,
    serviceFee: 405,
    total: 9705,
    status: "New",
    time: "2 mins ago",
    payment: "Paid",
  },
  {
    id: "DS-10839",
    customer: "Blessing Okafor",
    phone: "0812 345 6789",
    address: "Yaba, Lagos",
    items: [
      {
        name: "Fried Rice & Chicken",
        quantity: 1,
        price: 5000,
      },
      {
        name: "Chapman",
        quantity: 1,
        price: 2000,
      },
    ],
    subtotal: 7000,
    deliveryFee: 1000,
    serviceFee: 350,
    total: 8350,
    status: "Preparing",
    time: "8 mins ago",
    payment: "Paid",
  },
  {
    id: "DS-10834",
    customer: "Daniel Williams",
    phone: "0806 789 1234",
    address: "Surulere, Lagos",
    items: [
      {
        name: "Pounded Yam & Egusi",
        quantity: 1,
        price: 5500,
      },
    ],
    subtotal: 5500,
    deliveryFee: 1500,
    serviceFee: 275,
    total: 7275,
    status: "Ready",
    time: "15 mins ago",
    payment: "Paid",
    rider: "Michael Adeyemi",
  },
  {
    id: "DS-10827",
    customer: "Sarah Ibrahim",
    phone: "0814 222 3344",
    address: "Maryland, Lagos",
    items: [
      {
        name: "Jollof Rice & Chicken",
        quantity: 1,
        price: 4500,
      },
      {
        name: "Pepper Soup",
        quantity: 1,
        price: 3500,
      },
    ],
    subtotal: 8000,
    deliveryFee: 1100,
    serviceFee: 400,
    total: 9500,
    status: "Out for delivery",
    time: "24 mins ago",
    payment: "Paid",
    rider: "David Okoro",
  },
  {
    id: "DS-10819",
    customer: "Michael Adeyemi",
    phone: "0805 111 2233",
    address: "Ikeja GRA, Lagos",
    items: [
      {
        name: "Pepper Soup",
        quantity: 1,
        price: 3500,
      },
      {
        name: "Fried Plantain",
        quantity: 1,
        price: 1800,
      },
    ],
    subtotal: 5300,
    deliveryFee: 1200,
    serviceFee: 265,
    total: 6765,
    status: "Completed",
    time: "52 mins ago",
    payment: "Paid",
    rider: "Michael Adeyemi",
  },
  {
    id: "DS-10811",
    customer: "Chidinma Eze",
    phone: "0807 555 6677",
    address: "Ogba, Lagos",
    items: [
      {
        name: "Fried Rice & Chicken",
        quantity: 2,
        price: 5000,
      },
    ],
    subtotal: 10000,
    deliveryFee: 1200,
    serviceFee: 500,
    total: 11700,
    status: "Cancelled",
    time: "1 hour ago",
    payment: "Paid",
  },
];

const tabs: { label: string; value: "All" | OrderStatus }[] = [
  { label: "All Orders", value: "All" },
  { label: "New", value: "New" },
  { label: "Preparing", value: "Preparing" },
  { label: "Ready", value: "Ready" },
  { label: "Out for Delivery", value: "Out for delivery" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

function statusClass(status: OrderStatus) {
  switch (status) {
    case "New":
      return "bg-orange-50 text-orange-700";

    case "Preparing":
      return "bg-yellow-50 text-yellow-700";

    case "Ready":
      return "bg-blue-50 text-blue-700";

    case "Out for delivery":
      return "bg-purple-50 text-purple-700";

    case "Completed":
      return "bg-green-50 text-green-700";

    case "Cancelled":
      return "bg-red-50 text-red-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

export default function RestaurantOrdersPage() {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] =
    useState<"All" | OrderStatus>("All");
  const [search, setSearch] = useState("");
  const [orders, setOrders] =
    useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab =
        activeTab === "All" || order.status === activeTab;

      const searchText = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchText) ||
        order.customer.toLowerCase().includes(searchText) ||
        order.address.toLowerCase().includes(searchText);

      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, search]);

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus
  ) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order
      )
    );

    setSelectedOrder((currentOrder) =>
      currentOrder?.id === orderId
        ? {
            ...currentOrder,
            status,
          }
        : currentOrder
    );
  };

  const getPrimaryAction = (order: Order) => {
    switch (order.status) {
      case "New":
        return {
          label: "Accept Order",
          nextStatus: "Preparing" as OrderStatus,
          icon: <FiCheck />,
        };

      case "Preparing":
        return {
          label: "Mark Ready",
          nextStatus: "Ready" as OrderStatus,
          icon: <FiPackage />,
        };

      case "Ready":
        return {
          label: "Hand to Rider",
          nextStatus: "Out for delivery" as OrderStatus,
          icon: <FiTruck />,
        };

      case "Out for delivery":
        return {
          label: "Mark Completed",
          nextStatus: "Completed" as OrderStatus,
          icon: <FiCheck />,
        };

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F7] text-[#151515]">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[270px] transform bg-[#151515] text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* LOGO */}
          <div className="flex h-[82px] items-center justify-between border-b border-white/10 px-6">
            <Link
              href="/partner/dashboard"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-xl font-black">
                D
              </div>

              <div>
                <p className="text-lg font-black">
                  Door-Step
                </p>

                <p className="text-[11px] text-gray-400">
                  Restaurant Partner
                </p>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/10 lg:hidden"
            >
              <FiX />
            </button>
          </div>

          {/* RESTAURANT */}
          <div className="border-b border-white/10 px-5 py-5">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6B35] font-black">
                M
              </div>

              <div>
                <p className="text-sm font-bold">
                  Mama&apos;s Kitchen
                </p>

                <p className="text-xs text-gray-400">
                  Ikeja, Lagos
                </p>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
              Overview
            </p>

            <div className="space-y-1">
              {/* DASHBOARD */}
              <Link
                href="/partner/dashboard"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  pathname === "/partner/dashboard"
                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                    : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FiPackage />
                Dashboard
              </Link>

              {/* ORDERS */}
              <Link
                href="/partner/orders"
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                  pathname === "/partner/orders"
                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                    : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <FiShoppingBag />
                  Orders
                </span>

                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">
                  2
                </span>
              </Link>

              {/* MENU */}
              <Link
                href="/partner/menu"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                <FiPackage />
                Menu
              </Link>

              {/* EARNINGS */}
              <Link
                href="/partner/earnings"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                <span>₦</span>
                Earnings
              </Link>
            </div>

            <p className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
              Manage
            </p>

            <div className="space-y-1">
              {/* CUSTOMERS */}
              <Link
                href="/partner/customers"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                <FiUser />
                Customers
              </Link>

              {/* PROMOTIONS */}
              <Link
                href="/partner/promotions"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Promotions
              </Link>

              {/* SETTINGS */}
              <Link
                href="/partner/settings"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Settings
              </Link>
            </div>
          </nav>

          {/* SIGN OUT */}
          <div className="border-t border-white/10 p-4">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-300 hover:bg-white/5">
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:pl-[270px]">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-[82px] items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-gray-200 p-2.5 lg:hidden"
            >
              <FiMenu />
            </button>

            <div>
              <p className="text-sm text-gray-500">
                Restaurant Partner
              </p>

              <h1 className="text-xl font-black md:text-2xl">
                Orders
              </h1>
            </div>
          </div>

          <button className="relative rounded-xl border border-gray-200 p-3">
            <FiBell />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B35]" />
          </button>
        </header>

        <main className="px-5 py-7 md:px-8 md:py-9">
          {/* PAGE HEADER */}
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <Link
                href="/partner/dashboard"
                className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#FF6B35]"
              >
                <FiArrowLeft />
                Back to Dashboard
              </Link>

              <h2 className="text-3xl font-black tracking-tight">
                Manage Orders
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Accept, prepare and manage customer orders from
                one place.
              </p>
            </div>
          </div>

          {/* ORDER STATS */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              {
                label: "New",
                value: orders.filter(
                  (o) => o.status === "New"
                ).length,
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
              {
                label: "Preparing",
                value: orders.filter(
                  (o) => o.status === "Preparing"
                ).length,
                color: "text-yellow-600",
                bg: "bg-yellow-50",
              },
              {
                label: "Ready",
                value: orders.filter(
                  (o) => o.status === "Ready"
                ).length,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Out for Delivery",
                value: orders.filter(
                  (o) => o.status === "Out for delivery"
                ).length,
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                label: "Completed",
                value: orders.filter(
                  (o) => o.status === "Completed"
                ).length,
                color: "text-green-600",
                bg: "bg-green-50",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                >
                  <FiShoppingBag />
                </div>

                <p className="text-sm text-gray-500">
                  {stat.label}
                </p>

                <p className="mt-1 text-2xl font-black">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* SEARCH + FILTER */}
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative w-full xl:max-w-sm">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search order or customer..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      activeTab === tab.value
                        ? "bg-[#151515] text-white"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ORDERS */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <FiPackage className="text-2xl" />
                </div>

                <h3 className="mt-5 text-xl font-black">
                  No orders found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or order filter.
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const primaryAction =
                  getPrimaryAction(order);

                return (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
                  >
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                      {/* ORDER INFO */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-black">
                            #{order.id}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>

                          <span className="text-xs text-gray-400">
                            {order.time}
                          </span>
                        </div>

                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 text-[#FF6B35]">
                              <FiUser />
                            </div>

                            <div>
                              <p className="text-xs text-gray-400">
                                Customer
                              </p>

                              <p className="mt-1 text-sm font-bold">
                                {order.customer}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-500">
                                {order.phone}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 text-[#FF6B35]">
                              <FiMapPin />
                            </div>

                            <div>
                              <p className="text-xs text-gray-400">
                                Delivery Address
                              </p>

                              <p className="mt-1 text-sm font-bold">
                                {order.address}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 text-[#FF6B35]">
                              <FiPackage />
                            </div>

                            <div>
                              <p className="text-xs text-gray-400">
                                Items
                              </p>

                              <p className="mt-1 text-sm font-bold">
                                {order.items.reduce(
                                  (total, item) =>
                                    total + item.quantity,
                                  0
                                )}{" "}
                                item(s)
                              </p>

                              <p className="mt-0.5 text-xs text-gray-500">
                                {order.items[0].name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AMOUNT + ACTIONS */}
                      <div className="border-t border-gray-100 pt-5 xl:min-w-[260px] xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
                        <div className="flex items-center justify-between xl:block">
                          <div>
                            <p className="text-xs text-gray-400">
                              Customer Total
                            </p>

                            <p className="mt-1 text-2xl font-black">
                              {formatCurrency(order.total)}
                            </p>

                            <p className="mt-1 text-xs font-semibold text-green-600">
                              {order.payment}
                            </p>
                          </div>

                          {order.rider && (
                            <div className="text-right xl:mt-3 xl:text-left">
                              <p className="text-xs text-gray-400">
                                Rider
                              </p>

                              <p className="mt-1 text-xs font-bold">
                                {order.rider}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              setSelectedOrder(order)
                            }
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-bold transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                          >
                            <FiEye />
                            Details
                          </button>

                          {primaryAction && (
                            <button
                              onClick={() =>
                                updateOrderStatus(
                                  order.id,
                                  primaryAction.nextStatus
                                )
                              }
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-3 py-2.5 text-sm font-bold text-white transition hover:bg-[#e85c2c]"
                            >
                              {primaryAction.icon}

                              <span className="hidden sm:inline">
                                {primaryAction.label}
                              </span>
                            </button>
                          )}

                          {order.status === "New" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(
                                  order.id,
                                  "Cancelled"
                                )
                              }
                              className="rounded-xl border border-red-200 px-3 py-2.5 text-red-600 transition hover:bg-red-50"
                              title="Reject order"
                            >
                              <FiX />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Order Details
                </p>

                <h2 className="mt-1 text-xl font-black">
                  #{selectedOrder.id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-gray-100 p-2.5 transition hover:bg-gray-200"
              >
                <FiX />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* STATUS */}
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                <div>
                  <p className="text-xs text-gray-400">
                    Current Status
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {selectedOrder.status}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusClass(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              {/* CUSTOMER */}
              <div>
                <h3 className="mb-4 text-sm font-black">
                  Customer Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-xs text-gray-400">
                      Customer
                    </p>

                    <p className="mt-1 font-bold">
                      {selectedOrder.customer}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-xs text-gray-400">
                      Phone
                    </p>

                    <a
                      href={`tel:${selectedOrder.phone}`}
                      className="mt-1 inline-flex items-center gap-2 font-bold text-[#FF6B35]"
                    >
                      <FiPhone />
                      {selectedOrder.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-400">
                    Delivery Address
                  </p>

                  <p className="mt-1 flex items-center gap-2 font-bold">
                    <FiMapPin className="text-[#FF6B35]" />
                    {selectedOrder.address}
                  </p>
                </div>
              </div>

              {/* ITEMS */}
              <div>
                <h3 className="mb-4 text-sm font-black">
                  Order Items
                </h3>

                <div className="overflow-hidden rounded-2xl border border-gray-100">
                  {selectedOrder.items.map(
                    (item, index) => (
                      <div
                        key={`${item.name}-${index}`}
                        className="flex items-center justify-between border-b border-gray-100 p-4 last:border-0"
                      >
                        <div>
                          <p className="text-sm font-bold">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            ₦{item.price.toLocaleString()} ×{" "}
                            {item.quantity}
                          </p>
                        </div>

                        <p className="text-sm font-black">
                          ₦
                          {(
                            item.price * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* SUMMARY */}
              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      {formatCurrency(
                        selectedOrder.subtotal
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Delivery fee
                    </span>

                    <span className="font-semibold">
                      {formatCurrency(
                        selectedOrder.deliveryFee
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Service fee
                    </span>

                    <span className="font-semibold">
                      {formatCurrency(
                        selectedOrder.serviceFee
                      )}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-black">
                        Total
                      </span>

                      <span className="text-lg font-black">
                        {formatCurrency(
                          selectedOrder.total
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION */}
              {getPrimaryAction(selectedOrder) && (
                <button
                  onClick={() => {
                    const action =
                      getPrimaryAction(selectedOrder);

                    if (!action) return;

                    updateOrderStatus(
                      selectedOrder.id,
                      action.nextStatus
                    );
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3.5 font-bold text-white transition hover:bg-[#e85c2c]"
                >
                  {getPrimaryAction(selectedOrder)?.icon}

                  {getPrimaryAction(selectedOrder)?.label}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
