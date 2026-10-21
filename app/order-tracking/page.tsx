
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FiArrowLeft,
  FiPhone,
  FiMessageCircle,
  FiMapPin,
  FiNavigation,
  FiClock,
  FiCheckCircle,
  FiPackage,
  FiShoppingBag,
  FiHome,
  FiUser,
  FiStar,
} from "react-icons/fi";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  restaurantId?: string;
  restaurantName?: string;
};

type DoorStepOrder = {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  address: string;
  landmark: string;
  phone: string;
  deliveryNote: string;
  paymentMethod: string;
  status:
    | "confirmed"
    | "preparing"
    | "rider-assigned"
    | "picked-up"
    | "delivered";
  createdAt: string;
  estimatedDelivery: string;
};

const statuses = [
  "confirmed",
  "preparing",
  "rider-assigned",
  "picked-up",
  "delivered",
] as const;

type OrderStatus = (typeof statuses)[number];

const formatNaira = (amount: number) => {
  return `₦${amount.toLocaleString("en-NG")}`;
};

function OrderTrackingContent() {
  const searchParams = useSearchParams();

  const orderId =
    searchParams.get("id") || "DS-2026-10842";

  const [order, setOrder] =
    useState<DoorStepOrder | null>(null);

  const [currentStatus, setCurrentStatus] =
    useState<OrderStatus>("confirmed");

  useEffect(() => {
    try {
      const savedOrder =
        localStorage.getItem("doorstep_current_order");

      if (savedOrder) {
        const parsedOrder: DoorStepOrder =
          JSON.parse(savedOrder);

        setOrder(parsedOrder);

        if (parsedOrder.orderNumber === orderId) {
          setCurrentStatus(
            parsedOrder.status || "confirmed"
          );
        }
      }
    } catch (error) {
      console.error(
        "Unable to load order:",
        error
      );
    }
  }, [orderId]);

  /*
   * Demo status progression.
   *
   * This is only for the frontend prototype.
   * Later, the backend will update the order status.
   */
  useEffect(() => {
    if (!order) return;

    const progression: OrderStatus[] = [
      "confirmed",
      "preparing",
      "rider-assigned",
      "picked-up",
      "delivered",
    ];

    const currentIndex =
      progression.indexOf(currentStatus);

    if (
      currentIndex === -1 ||
      currentIndex >= progression.length - 1
    ) {
      return;
    }

    const timer = setTimeout(() => {
      const nextStatus =
        progression[currentIndex + 1];

      setCurrentStatus(nextStatus);

      const updatedOrder = {
        ...order,
        status: nextStatus,
      };

      localStorage.setItem(
        "doorstep_current_order",
        JSON.stringify(updatedOrder)
      );

      setOrder(updatedOrder);
    }, 15000);

    return () => clearTimeout(timer);
  }, [currentStatus, order]);

  const getStatusIndex = () => {
    return statuses.indexOf(currentStatus);
  };

  const statusIndex = getStatusIndex();

  const isCompleted = (status: OrderStatus) => {
    return statuses.indexOf(status) < statusIndex;
  };

  const isCurrent = (status: OrderStatus) => {
    return status === currentStatus;
  };

  const restaurantName =
    order?.items?.[0]?.restaurantName ||
    "Your Restaurant";

  if (!order) {
    return (
      <main className="min-h-screen bg-[#FFF8F3]">
        <Navbar />

        <section className="flex min-h-[70vh] items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0E9]">
              <FiPackage
                size={32}
                className="text-[#FF6B35]"
              />
            </div>

            <h1 className="mt-6 text-2xl font-black text-[#151515]">
              Order not found
            </h1>

            <p className="mt-3 leading-7 text-gray-500">
              We couldn't find this Door-Step order.
              Please return to your orders and try again.
            </p>

            <Link
              href="/profile"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3.5 font-bold text-white transition hover:bg-[#e95b2b]"
            >
              Back to My Orders
              <FiArrowLeft />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to My Orders
          </Link>

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-[#FF6B35]">
                Order Tracking
              </p>

              <h1 className="mt-1 text-2xl font-black text-[#151515] sm:text-3xl">
                {order.orderNumber}
              </h1>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                currentStatus === "delivered"
                  ? "bg-green-50 text-green-700"
                  : "bg-orange-50 text-[#FF6B35]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  currentStatus === "delivered"
                    ? "bg-green-500"
                    : "bg-[#FF6B35]"
                }`}
              />

              {currentStatus === "delivered"
                ? "Delivered"
                : "Order in progress"}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* MAP */}
            <div className="relative h-[430px] overflow-hidden rounded-3xl bg-[#E9E6DF] shadow-sm">
              {/* Fake map */}
              <div className="absolute inset-0 opacity-70">
                <div className="absolute left-[8%] top-[18%] h-px w-[90%] rotate-12 bg-white" />

                <div className="absolute left-[5%] top-[42%] h-px w-[95%] -rotate-6 bg-white" />

                <div className="absolute left-[15%] top-[67%] h-px w-[85%] rotate-[18deg] bg-white" />

                <div className="absolute left-[25%] top-0 h-[120%] w-px rotate-[18deg] bg-white" />

                <div className="absolute left-[58%] top-0 h-[120%] w-px -rotate-[24deg] bg-white" />

                <div className="absolute left-[82%] top-0 h-[120%] w-px rotate-[12deg] bg-white" />
              </div>

              {/* ROUTE */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 800 430"
                preserveAspectRatio="none"
              >
                <path
                  d="M140 335 C230 290, 260 205, 355 230 C450 255, 475 135, 650 105"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="14 10"
                />
              </svg>

              {/* RESTAURANT */}
              <div className="absolute left-[14%] top-[70%]">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                      <FiShoppingBag size={17} />
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#151515] shadow-md">
                    {restaurantName}
                  </div>
                </div>
              </div>

              {/* RIDER */}
              {statusIndex >= 2 &&
                currentStatus !== "delivered" && (
                  <div className="absolute left-[58%] top-[37%]">
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#151515] text-white shadow-xl">
                        <FiNavigation size={20} />
                      </div>

                      <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <span className="h-2 w-2 rounded-full bg-white" />
                      </div>

                      <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#151515] px-3 py-2 text-xs font-bold text-white shadow-md">
                        Rider is here
                      </div>
                    </div>
                  </div>
                )}

              {/* DESTINATION */}
              <div className="absolute right-[12%] top-[20%]">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white">
                      <FiMapPin size={18} />
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#151515] shadow-md">
                    Delivery location
                  </div>
                </div>
              </div>

              {/* MAP LABEL */}
              <div className="absolute left-4 top-4 rounded-xl bg-white px-4 py-3 shadow-md">
                <p className="text-xs font-semibold text-gray-500">
                  Live delivery
                </p>

                <p className="mt-1 font-black text-[#151515]">
                  {currentStatus === "delivered"
                    ? "Order delivered"
                    : currentStatus === "confirmed"
                    ? "Order confirmed"
                    : currentStatus === "preparing"
                    ? "Restaurant is preparing"
                    : currentStatus === "rider-assigned"
                    ? "Rider assigned"
                    : "Rider is on the way"}
                </p>
              </div>

              {/* ETA */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                    <FiClock />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Estimated arrival
                    </p>

                    <p className="font-black text-[#151515]">
                      {currentStatus === "delivered"
                        ? "Delivered"
                        : order.estimatedDelivery}
                    </p>
                  </div>
                </div>

                <div className="hidden text-right sm:block">
                  <p className="text-xs text-gray-500">
                    Distance remaining
                  </p>

                  <p className="font-black text-[#151515]">
                    {currentStatus === "delivered"
                      ? "0 km"
                      : "4.2 km"}
                  </p>
                </div>
              </div>
            </div>

            {/* RIDER */}
            {statusIndex >= 2 &&
              currentStatus !== "delivered" && (
                <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#151515] text-xl font-black text-white">
                        MA
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Your rider
                        </p>

                        <h2 className="mt-1 text-lg font-black text-[#151515]">
                          Michael Adeyemi
                        </h2>

                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                          <FiStar className="fill-yellow-400 text-yellow-400" />

                          <span className="font-bold text-[#151515]">
                            4.9
                          </span>

                          <span>•</span>

                          <span>328 deliveries</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        aria-label="Call rider"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-[#151515] transition hover:border-[#FF6B35] hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
                      >
                        <FiPhone size={18} />
                      </button>

                      <button
                        type="button"
                        aria-label="Message rider"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-[#151515] transition hover:border-[#FF6B35] hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
                      >
                        <FiMessageCircle size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#F7F8F8] p-4">
                      <p className="text-xs text-gray-500">
                        Vehicle
                      </p>

                      <p className="mt-1 font-bold text-[#151515]">
                        Motorcycle
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F7F8F8] p-4">
                      <p className="text-xs text-gray-500">
                        Plate number
                      </p>

                      <p className="mt-1 font-bold text-[#151515]">
                        KJA 482 AB
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {/* DELIVERY ADDRESS */}
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                  <FiMapPin size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Delivering to
                  </p>

                  <h2 className="mt-1 font-black text-[#151515]">
                    Delivery Address
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {order.address}
                  </p>

                  {order.landmark && (
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      Landmark: {order.landmark}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-[#151515]">
                  Your Order
                </h2>

                <span className="text-sm font-bold text-[#FF6B35]">
                  {order.items.length}{" "}
                  {order.items.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={`${item.restaurantId || "restaurant"}-${item.id}`}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-bold text-[#151515]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.restaurantName ||
                          restaurantName}{" "}
                        × {item.quantity}
                      </p>
                    </div>

                    <p className="flex-shrink-0 font-bold text-[#151515]">
                      {formatNaira(
                        item.price * item.quantity
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-dashed border-gray-200 pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    {formatNaira(order.subtotal)}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-gray-500">
                    Delivery fee
                  </span>

                  <span className="font-semibold">
                    {formatNaira(order.deliveryFee)}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-gray-500">
                    Service fee
                  </span>

                  <span className="font-semibold">
                    {formatNaira(order.serviceFee)}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="font-black">
                    Total
                  </span>

                  <span className="text-xl font-black text-[#FF6B35]">
                    {formatNaira(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-xl font-black text-[#151515]">
                Delivery Progress
              </h2>

              <div className="mt-7 space-y-7">
                {/* CONFIRMED */}
                <div className="flex gap-4">
                  <div className="relative">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isCompleted("confirmed") ||
                        isCurrent("confirmed")
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <FiCheckCircle size={19} />
                    </div>

                    <div
                      className={`absolute left-1/2 top-10 h-10 w-px -translate-x-1/2 ${
                        statusIndex > 0
                          ? "bg-green-300"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>

                  <div className="pt-1">
                    <p className="font-bold text-[#151515]">
                      Order confirmed
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Your order has been confirmed.
                    </p>

                    <p
                      className={`mt-2 text-xs font-semibold ${
                        isCurrent("confirmed")
                          ? "text-[#FF6B35]"
                          : "text-green-600"
                      }`}
                    >
                      {isCurrent("confirmed")
                        ? "Current status"
                        : "Completed"}
                    </p>
                  </div>
                </div>

                {/* PREPARING */}
                <div className="flex gap-4">
                  <div className="relative">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isCompleted("preparing") ||
                        isCurrent("preparing")
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <FiShoppingBag size={18} />
                    </div>

                    <div
                      className={`absolute left-1/2 top-10 h-10 w-px -translate-x-1/2 ${
                        statusIndex > 1
                          ? "bg-green-300"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>

                  <div className="pt-1">
                    <p className="font-bold text-[#151515]">
                      Restaurant preparing
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {restaurantName} is preparing your food.
                    </p>

                    <p
                      className={`mt-2 text-xs font-semibold ${
                        isCurrent("preparing")
                          ? "text-[#FF6B35]"
                          : statusIndex > 1
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {isCurrent("preparing")
                        ? "Current status"
                        : statusIndex > 1
                        ? "Completed"
                        : "Waiting"}
                    </p>
                  </div>
                </div>

                {/* RIDER ASSIGNED */}
                <div className="flex gap-4">
                  <div className="relative">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isCompleted("rider-assigned") ||
                        isCurrent("rider-assigned")
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <FiUser size={18} />
                    </div>

                    <div
                      className={`absolute left-1/2 top-10 h-10 w-px -translate-x-1/2 ${
                        statusIndex > 2
                          ? "bg-green-300"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>

                  <div className="pt-1">
                    <p className="font-bold text-[#151515]">
                      Rider assigned
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      A Door-Step rider has been assigned to your
                      order.
                    </p>

                    <p
                      className={`mt-2 text-xs font-semibold ${
                        isCurrent("rider-assigned")
                          ? "text-[#FF6B35]"
                          : statusIndex > 2
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {isCurrent("rider-assigned")
                        ? "Current status"
                        : statusIndex > 2
                        ? "Completed"
                        : "Waiting"}
                    </p>
                  </div>
                </div>

                {/* PICKED UP */}
                <div className="flex gap-4">
                  <div className="relative">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isCompleted("picked-up") ||
                        isCurrent("picked-up")
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <FiPackage size={18} />
                    </div>

                    <div
                      className={`absolute left-1/2 top-10 h-10 w-px -translate-x-1/2 ${
                        statusIndex > 3
                          ? "bg-green-300"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>

                  <div className="pt-1">
                    <p className="font-bold text-[#151515]">
                      Rider picked up order
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Your rider has picked up your order and is
                      heading to you.
                    </p>

                    <p
                      className={`mt-2 text-xs font-semibold ${
                        isCurrent("picked-up")
                          ? "text-[#FF6B35]"
                          : statusIndex > 3
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {isCurrent("picked-up")
                        ? "Current status"
                        : statusIndex > 3
                        ? "Completed"
                        : "Waiting"}
                    </p>
                  </div>
                </div>

                {/* DELIVERED */}
                <div className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      isCurrent("delivered")
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <FiHome size={18} />
                  </div>

                  <div className="pt-1">
                    <p
                      className={`font-bold ${
                        isCurrent("delivered")
                          ? "text-[#151515]"
                          : "text-gray-400"
                      }`}
                    >
                      Delivered
                    </p>

                    <p
                      className={`mt-1 text-xs leading-5 ${
                        isCurrent("delivered")
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      Your order has been delivered.
                    </p>

                    <p
                      className={`mt-2 text-xs font-semibold ${
                        isCurrent("delivered")
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {isCurrent("delivered")
                        ? "Completed"
                        : "Waiting"}
                    </p>
                  </div>
                </div>
              </div>

              {/* SUPPORT */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-[#151515] transition hover:border-[#FF6B35] hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
                >
                  <FiMessageCircle />
                  Need help with this order?
                </Link>
              </div>
            </div>

            {/* QUICK INFO */}
            <div className="mt-5 rounded-3xl bg-[#151515] p-6 text-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <FiUser />
                </div>

                <div>
                  <p className="text-xs text-white/50">
                    Delivery support
                  </p>

                  <p className="mt-1 font-bold">
                    Door-Step Support
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/60">
                If there is any problem with your delivery, our
                support team is ready to help.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={null}>
      <OrderTrackingContent />
    </Suspense>
  );
}
