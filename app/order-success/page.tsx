
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FiCheck,
  FiArrowRight,
  FiMapPin,
  FiClock,
  FiShoppingBag,
  FiPackage,
  FiHome,
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
  status: "confirmed" | "preparing" | "rider-assigned" | "picked-up" | "delivered";
  createdAt: string;
  estimatedDelivery: string;
};

const formatNaira = (amount: number) => {
  return `₦${amount.toLocaleString("en-NG")}`;
};

const paymentLabels: Record<string, string> = {
  card: "Card",
  transfer: "Bank Transfer",
  wallet: "Door-Step Wallet",
  cash: "Cash on Delivery",
};

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<DoorStepOrder | null>(null);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("doorstep_current_order");

      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    } catch (error) {
      console.error("Unable to load order:", error);
    }
  }, []);

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
              We couldn't find a recent Door-Step order on this device.
            </p>

            <Link
              href="/restaurants"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3.5 font-bold text-white transition hover:bg-[#e95b2b]"
            >
              Browse Restaurants
              <FiArrowRight />
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

      {/* SUCCESS HERO */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/20">
                <FiCheck
                  size={34}
                  strokeWidth={3}
                />
              </div>
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-green-600">
              Order Confirmed
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-[#151515] sm:text-4xl">
              Your order has been placed!
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500">
              Thank you for ordering with Door-Step. We've received your
              order and the restaurant is getting everything ready.
            </p>

            {/* ORDER NUMBER */}
            <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm">
              <FiPackage className="text-[#FF6B35]" />

              <span className="text-sm text-gray-500">
                Order number
              </span>

              <span className="text-sm font-black text-[#151515]">
                {order.orderNumber}
              </span>
            </div>
          </div>

          {/* STATUS TIMELINE */}
          <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-black text-[#151515]">
              Order Status
            </h2>

            <div className="mt-7 space-y-7">
              {/* CONFIRMED */}
              <div className="flex gap-4">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                    <FiCheck
                      size={18}
                      strokeWidth={3}
                    />
                  </div>

                  <div className="absolute left-1/2 top-10 h-8 w-px -translate-x-1/2 bg-gray-200" />
                </div>

                <div className="pt-1">
                  <p className="font-bold text-[#151515]">
                    Order confirmed
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Door-Step has received your order.
                  </p>
                </div>
              </div>

              {/* PREPARING */}
              <div className="flex gap-4">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                    <FiShoppingBag size={18} />
                  </div>

                  <div className="absolute left-1/2 top-10 h-8 w-px -translate-x-1/2 bg-gray-200" />
                </div>

                <div className="pt-1">
                  <p className="font-bold text-[#151515]">
                    Restaurant preparing
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    The restaurant is preparing your order.
                  </p>
                </div>
              </div>

              {/* RIDER */}
              <div className="flex gap-4">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <FiPackage size={18} />
                  </div>

                  <div className="absolute left-1/2 top-10 h-8 w-px -translate-x-1/2 bg-gray-200" />
                </div>

                <div className="pt-1">
                  <p className="font-bold text-gray-400">
                    Rider assigned
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    A Door-Step rider will be assigned soon.
                  </p>
                </div>
              </div>

              {/* DELIVERED */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <FiHome size={18} />
                </div>

                <div className="pt-1">
                  <p className="font-bold text-gray-400">
                    Delivered
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Your order will arrive at your delivery address.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DELIVERY INFORMATION */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* ADDRESS */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                <FiMapPin size={20} />
              </div>

              <h3 className="mt-5 font-black text-[#151515]">
                Delivery Address
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {order.address}
              </p>

              {order.landmark && (
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Landmark: {order.landmark}
                </p>
              )}
            </div>

            {/* ESTIMATED TIME */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                <FiClock size={20} />
              </div>

              <h3 className="mt-5 font-black text-[#151515]">
                Estimated Delivery
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your order should arrive in approximately
              </p>

              <p className="mt-1 text-lg font-black text-[#FF6B35]">
                {order.estimatedDelivery}
              </p>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-black text-[#151515]">
                Order Summary
              </h2>

              <span className="rounded-full bg-[#FFF0E9] px-3 py-1 text-xs font-bold text-[#FF6B35]">
                Food Order
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
                      {item.restaurantName || "Restaurant"} ×{" "}
                      {item.quantity}
                    </p>
                  </div>

                  <p className="flex-shrink-0 font-bold text-[#151515]">
                    {formatNaira(item.price * item.quantity)}
                  </p>
                </div>
              ))}

              <div className="border-t border-dashed border-gray-200 pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-semibold text-[#151515]">
                    {formatNaira(order.subtotal)}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-gray-500">
                    Delivery fee
                  </span>

                  <span className="font-semibold text-[#151515]">
                    {formatNaira(order.deliveryFee)}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-gray-500">
                    Service fee
                  </span>

                  <span className="font-semibold text-[#151515]">
                    {formatNaira(order.serviceFee)}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="font-black text-[#151515]">
                    Total
                  </span>

                  <span className="text-2xl font-black text-[#FF6B35]">
                    {formatNaira(order.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="mt-6 rounded-xl bg-[#F7F8F8] p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Payment method
                </span>

                <span className="text-sm font-bold text-[#151515]">
                  {paymentLabels[order.paymentMethod] ||
                    order.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/order-tracking?id=${encodeURIComponent(
                order.orderNumber
              )}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-4 font-bold text-white transition hover:bg-[#e95b2b]"
            >
              Track My Order
              <FiArrowRight />
            </Link>

            <Link
              href="/restaurants"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-4 font-bold text-[#151515] transition hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>

          {/* SUPPORT */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Need help with your order?{" "}
            <Link
              href="/contact"
              className="font-bold text-[#FF6B35] hover:underline"
            >
              Contact Door-Step Support
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
