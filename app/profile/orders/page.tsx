
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiRefreshCw,
  FiShoppingBag,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type OrderItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  restaurantName?: string;
  restaurantId?: string;
  description?: string;
};

type Order = {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  address: string;
  landmark?: string;
  phone: string;
  deliveryNote?: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  estimatedDelivery?: string;
};

type OrderTab = "active" | "completed" | "cancelled";

const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const getStatusLabel = (status: string) => {
  switch (status) {
    case "confirmed":
      return "Order Confirmed";

    case "preparing":
      return "Preparing";

    case "picked_up":
      return "Picked Up";

    case "on_the_way":
      return "On the Way";

    case "delivered":
      return "Delivered";

    case "cancelled":
      return "Cancelled";

    default:
      return "Processing";
  }
};

const getStatusClasses = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-50 text-green-700 border-green-200";

    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";

    case "on_the_way":
    case "picked_up":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "preparing":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";

    default:
      return "bg-orange-50 text-orange-700 border-orange-200";
  }
};

const isActiveStatus = (status: string) => {
  return [
    "confirmed",
    "preparing",
    "picked_up",
    "on_the_way",
  ].includes(status);
};

function OrdersPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<OrderTab>("active");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("doorstep_current_order");

      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder) as Order;
        setOrder(parsedOrder);
      }
    } catch (error) {
      console.error("Failed to load order:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const restaurantName = useMemo(() => {
    if (!order?.items?.length) {
      return "Door-Step Order";
    }

    return (
      order.items.find((item) => item.restaurantName)?.restaurantName ||
      "Door-Step Restaurant"
    );
  }, [order]);

  const totalItems = useMemo(() => {
    if (!order?.items) {
      return 0;
    }

    return order.items.reduce((total, item) => total + item.quantity, 0);
  }, [order]);

  const formattedDate = useMemo(() => {
    if (!order?.createdAt) {
      return "";
    }

    try {
      return new Date(order.createdAt).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  }, [order]);

  const formattedTime = useMemo(() => {
    if (!order?.createdAt) {
      return "";
    }

    try {
      return new Date(order.createdAt).toLocaleTimeString("en-NG", {
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }, [order]);

  const handleReorder = () => {
    if (!order) {
      return;
    }

    localStorage.setItem(
      "doorstep_reorder_items",
      JSON.stringify(order.items)
    );

    alert(
      "Your previous items have been saved for reorder. We can connect this to the cart when the backend is ready."
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F3]">
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-48 rounded-lg bg-gray-200" />
            <div className="h-5 w-72 rounded-lg bg-gray-200" />

            <div className="h-14 rounded-2xl bg-gray-200" />

            <div className="h-80 rounded-3xl bg-gray-200" />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const showOrder =
    order &&
    ((activeTab === "active" && isActiveStatus(order.status)) ||
      (activeTab === "completed" && order.status === "delivered") ||
      (activeTab === "cancelled" && order.status === "cancelled"));

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to Profile
          </Link>

          <div className="mt-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
              My Account
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
              My Orders
            </h1>

            <p className="mt-3 max-w-2xl text-gray-600">
              View your Door-Step orders, track active deliveries and reorder
              your favourite meals.
            </p>
          </div>
        </motion.div>

        {/* TABS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 flex overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm"
        >
          {[
            {
              id: "active" as OrderTab,
              label: "Active Orders",
              icon: <FiTruck />,
            },
            {
              id: "completed" as OrderTab,
              label: "Completed",
              icon: <FiCheckCircle />,
            },
            {
              id: "cancelled" as OrderTab,
              label: "Cancelled",
              icon: <FiXCircle />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex min-w-fit flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                activeTab === tab.id
                  ? "bg-[#FF6B35] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* ORDER */}
        {showOrder && order ? (
          <motion.section
            key={order.orderNumber}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            {/* ORDER CARD */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              {/* TOP */}
              <div className="border-b border-gray-100 p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-black text-gray-950">
                        {restaurantName}
                      </h2>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      Order #{order.orderNumber}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-sm text-gray-500">Total</p>

                    <p className="mt-1 text-2xl font-black text-gray-950">
                      {formatNaira(order.total)}
                    </p>
                  </div>
                </div>

                {/* ORDER META */}
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#FF6B35] shadow-sm">
                      <FiCalendar />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Order Date</p>
                      <p className="mt-1 text-sm font-bold text-gray-900">
                        {formattedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#FF6B35] shadow-sm">
                      <FiClock />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Order Time</p>
                      <p className="mt-1 text-sm font-bold text-gray-900">
                        {formattedTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#FF6B35] shadow-sm">
                      <FiShoppingBag />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Items</p>
                      <p className="mt-1 text-sm font-bold text-gray-900">
                        {totalItems}{" "}
                        {totalItems === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ITEMS */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-950">
                    Order Items
                  </h3>

                  <span className="text-sm text-gray-500">
                    {totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="mt-5 divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <div
                      key={`${item.id}`}
                      className="flex gap-4 py-5 first:pt-0 last:pb-0"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-400">
                            <FiPackage className="text-2xl" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div>
                            <h4 className="font-bold text-gray-950">
                              {item.name}
                            </h4>

                            {item.description && (
                              <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <p className="font-black text-gray-950">
                            {formatNaira(item.price * item.quantity)}
                          </p>
                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                          {formatNaira(item.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DELIVERY INFORMATION */}
              <div className="border-t border-gray-100 bg-gray-50 p-6 sm:p-8">
                <h3 className="text-lg font-black text-gray-950">
                  Delivery Information
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#FF6B35] shadow-sm">
                      <FiMapPin />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Delivery Address
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {order.address}
                      </p>

                      {order.landmark && (
                        <p className="mt-1 text-sm text-gray-500">
                          Landmark: {order.landmark}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#FF6B35] shadow-sm">
                      <FiPhone />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Phone
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {order.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {order.deliveryNote && (
                  <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Delivery Note
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {order.deliveryNote}
                    </p>
                  </div>
                )}
              </div>

              {/* TOTAL */}
              <div className="border-t border-gray-100 p-6 sm:p-8">
                <div className="ml-auto max-w-md space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatNaira(order.subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span>{formatNaira(order.deliveryFee)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Service Fee</span>
                    <span>{formatNaira(order.serviceFee)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="font-black text-gray-950">
                        Total
                      </span>

                      <span className="text-xl font-black text-gray-950">
                        {formatNaira(order.total)}
                      </span>
                    </div>
                  </div>

                  <p className="pt-1 text-right text-xs text-gray-500">
                    Payment:{" "}
                    <span className="font-semibold capitalize">
                      {order.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="border-t border-gray-100 bg-white p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  {activeTab === "active" && (
                    <Link
                      href={`/order-tracking?id=${encodeURIComponent(
                        order.orderNumber
                      )}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#e85b29]"
                    >
                      <FiTruck />
                      Track Order
                      <FiArrowRight />
                    </Link>
                  )}

                  {activeTab === "completed" && (
                    <button
                      type="button"
                      onClick={handleReorder}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#e85b29]"
                    >
                      <FiRefreshCw />
                      Reorder
                    </button>
                  )}

                  <Link
                    href="/restaurants"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 text-sm font-bold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                  >
                    <FiShoppingBag />
                    Order Something Else
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          /* EMPTY STATE */
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm sm:px-10"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-[#FF6B35]">
              {activeTab === "active" && (
                <FiTruck className="text-3xl" />
              )}

              {activeTab === "completed" && (
                <FiCheckCircle className="text-3xl" />
              )}

              {activeTab === "cancelled" && (
                <FiXCircle className="text-3xl" />
              )}
            </div>

            <h2 className="mt-6 text-2xl font-black text-gray-950">
              {activeTab === "active" && "No active orders"}
              {activeTab === "completed" && "No completed orders"}
              {activeTab === "cancelled" && "No cancelled orders"}
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
              {activeTab === "active" &&
                "You don't have any active Door-Step deliveries right now. Start an order and we'll deliver it to you."}

              {activeTab === "completed" &&
                "Your completed orders will appear here after you receive your meals."}

              {activeTab === "cancelled" &&
                "Cancelled orders will appear here when an order is cancelled."}
            </p>

            <Link
              href="/restaurants"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 font-bold text-white transition hover:bg-[#e85b29]"
            >
              Browse Restaurants
              <FiArrowRight />
            </Link>
          </motion.section>
        )}

        {/* QUICK LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Link
            href="/restaurants"
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF6B35]">
                <FiShoppingBag />
              </div>

              <FiArrowRight className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#FF6B35]" />
            </div>

            <h3 className="mt-4 font-black text-gray-950">
              Order Food
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Browse restaurants and discover meals.
            </p>
          </Link>

          <Link
            href="/send-package"
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF6B35]">
                <FiPackage />
              </div>

              <FiArrowRight className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#FF6B35]" />
            </div>

            <h3 className="mt-4 font-black text-gray-950">
              Send a Package
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Send packages anywhere with Door-Step.
            </p>
          </Link>

          <Link
            href="/profile"
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF6B35]">
                <FiArrowLeft />
              </div>

              <FiArrowRight className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#FF6B35]" />
            </div>

            <h3 className="mt-4 font-black text-gray-950">
              My Profile
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Manage your account and personal information.
            </p>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default OrdersPage;
