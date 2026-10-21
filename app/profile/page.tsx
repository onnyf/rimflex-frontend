
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import {
    FiArrowRight,
    FiCheckCircle,
    FiClock,
    FiEdit3,
    FiHeart,
    FiLogOut,
    FiMapPin,
    FiPackage,
    FiPhone,
    FiSettings,
    FiShoppingBag,
    FiUser,
    FiChevronRight,
} from "react-icons/fi";

type Order = {
    orderNumber: string;
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
        restaurantId: string;
        restaurantName: string;
    }[];
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
    estimatedDelivery: string;
};

const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString("en-NG")}`;
};

const formatPaymentMethod = (method: string) => {
    const methods: Record<string, string> = {
        card: "Card",
        transfer: "Bank Transfer",
        wallet: "Door-Step Wallet",
        cash: "Cash on Delivery",
    };

    return methods[method] || method;
};

export default function ProfilePage() {
    const router = useRouter();

    const { user, isAuthenticated, isLoading } = useAuth();

    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem("doorstep_current_order");

        if (savedOrder) {
            try {
                setOrder(JSON.parse(savedOrder));
            } catch (error) {
                console.error("Unable to load saved order:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        /*
         * Use the same authentication storage
         * that your AuthContext currently uses.
         *
         * These keys are also safe for the current
         * frontend prototype.
         */
        localStorage.removeItem("doorstep_authenticated");
        localStorage.removeItem("doorstep_user");
        localStorage.removeItem("doorstep_current_order");

        router.push("/login");
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#FFF8F3]">
                <Navbar />

                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#FF6B35]/20 border-t-[#FF6B35]" />

                        <p className="mt-4 text-sm font-medium text-gray-500">
                            Loading your profile...
                        </p>
                    </div>
                </div>

                <Footer />
            </main>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <main className="min-h-screen bg-[#FFF8F3]">
                <Navbar />

                <section className="flex min-h-[65vh] items-center justify-center px-4 py-16">
                    <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0E9]">
                            <FiUser
                                size={32}
                                className="text-[#FF6B35]"
                            />
                        </div>

                        <h1 className="mt-6 text-2xl font-black text-[#151515]">
                            Login required
                        </h1>

                        <p className="mt-3 leading-7 text-gray-500">
                            Please login to access your Door-Step account.
                        </p>

                        <Link
                            href="/login"
                            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3.5 font-bold text-white transition hover:bg-[#e95b2b]"
                        >
                            Login
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

            {/* Header */}
            <section className="border-b border-black/5 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">
                        My Account
                    </p>

                    <div className="mt-2 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-[#151515] sm:text-4xl">
                                Welcome, {user.fullName?.split(" ")[0] || "there"} 👋
                            </h1>

                            <p className="mt-2 text-gray-500">
                                Manage your Door-Step account and orders.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    </div>
                </div>
            </section>

            {/* Main */}
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                    {/* LEFT */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
                        >
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF6B35] text-2xl font-black text-white shadow-lg shadow-[#FF6B35]/20">
                                        {user.fullName
                                            ?.charAt(0)
                                            .toUpperCase() || "U"}
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Customer
                                        </p>

                                        <h2 className="mt-1 text-xl font-black text-[#151515]">
                                            {user.fullName}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href="/profile/edit"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-[#151515] transition hover:border-[#FF6B35] hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
                                >
                                    <FiEdit3 />
                                    Edit Profile
                                </Link>
                            </div>

                            <div className="mt-7 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-[#F7F8F8] p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#FF6B35]">
                                            <FiPhone />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Phone number
                                            </p>

                                            <p className="mt-1 text-sm font-bold text-[#151515]">
                                                {user.phone || "Not provided"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-[#F7F8F8] p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#FF6B35]">
                                            <FiUser />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Account
                                            </p>

                                            <p className="mt-1 text-sm font-bold text-[#151515]">
                                                Verified customer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Active Order */}
                        {order && (
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
                            >
                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                                <FiPackage size={20} />
                                            </div>

                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                    Recent Order
                                                </p>

                                                <h2 className="mt-1 text-lg font-black text-[#151515]">
                                                    {order.orderNumber}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>

                                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold capitalize text-green-700">
                                        <span className="h-2 w-2 rounded-full bg-green-500" />
                                        {order.status}
                                    </span>
                                </div>

                                <div className="mt-6 rounded-2xl bg-[#F7F8F8] p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[#FF6B35]">
                                            <FiShoppingBag />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-[#151515]">
                                                {order.items.length}{" "}
                                                {order.items.length === 1
                                                    ? "item"
                                                    : "items"}
                                            </p>

                                            <p className="mt-1 truncate text-sm text-gray-500">
                                                {order.items
                                                    .map((item) => item.name)
                                                    .join(", ")}
                                            </p>

                                            <p className="mt-2 text-sm font-black text-[#FF6B35]">
                                                {formatNaira(order.total)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <FiMapPin className="mt-0.5 flex-shrink-0 text-[#FF6B35]" />

                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Delivering to
                                            </p>

                                            <p className="mt-1 text-sm font-semibold leading-5 text-[#151515]">
                                                {order.address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <FiClock className="mt-0.5 flex-shrink-0 text-[#FF6B35]" />

                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Estimated delivery
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-[#151515]">
                                                {order.estimatedDelivery}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/order-tracking?id=${order.orderNumber}`}
                                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-4 font-bold text-white transition hover:bg-[#e95b2b]"
                                >
                                    Track This Order
                                    <FiArrowRight />
                                </Link>
                            </motion.div>
                        )}

                        {/* Account Options */}
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
                        >
                            <h2 className="text-lg font-black text-[#151515]">
                                Account
                            </h2>

                            <div className="mt-5 divide-y divide-gray-100">
                                <Link
                                    href="/profile/orders"
                                    className="flex items-center justify-between py-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                            <FiPackage />
                                        </div>

                                        <div>
                                            <p className="font-bold text-[#151515]">
                                                My Orders
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                View your order history
                                            </p>
                                        </div>
                                    </div>

                                    <FiChevronRight className="text-gray-400" />
                                </Link>

                                <Link
                                    href="/profile/addresses"
                                    className="flex items-center justify-between py-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                            <FiMapPin />
                                        </div>

                                        <div>
                                            <p className="font-bold text-[#151515]">
                                                Saved Addresses
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Manage your delivery addresses
                                            </p>
                                        </div>
                                    </div>

                                    <FiChevronRight className="text-gray-400" />
                                </Link>

                                <Link
                                    href="/profile/favourites"
                                    className="flex items-center justify-between py-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                            <FiHeart />
                                        </div>

                                        <div>
                                            <p className="font-bold text-[#151515]">
                                                Favourite Restaurants
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Restaurants you've saved
                                            </p>
                                        </div>
                                    </div>

                                    <FiChevronRight className="text-gray-400" />
                                </Link>

                                <Link
                                    href="/profile/settings"
                                    className="flex items-center justify-between py-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                            <FiSettings />
                                        </div>

                                        <div>
                                            <p className="font-bold text-[#151515]">
                                                Account Settings
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Password, notifications and preferences
                                            </p>
                                        </div>
                                    </div>

                                    <FiChevronRight className="text-gray-400" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT */}
                    <aside className="space-y-6">
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="rounded-3xl bg-white p-6 shadow-sm sm:p-7"
                        >
                            <h2 className="text-lg font-black text-[#151515]">
                                Quick Actions
                            </h2>

                            <div className="mt-5 space-y-3">
                                <Link
                                    href="/restaurants"
                                    className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition hover:border-[#FF6B35] hover:bg-[#FFF8F3]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                            <FiShoppingBag />
                                        </div>

                                        <span className="text-sm font-bold text-[#151515]">
                                            Order Food
                                        </span>
                                    </div>

                                    <FiArrowRight className="text-gray-400" />
                                </Link>

                                <Link
                                    href="/send-package"
                                    className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition hover:border-[#FF6B35] hover:bg-[#FFF8F3]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                            <FiPackage />
                                        </div>

                                        <span className="text-sm font-bold text-[#151515]">
                                            Send a Package
                                        </span>
                                    </div>

                                    <FiArrowRight className="text-gray-400" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Delivery Address */}
                        {order && (
                            <motion.div
                                initial={{ opacity: 0, x: 25 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.25 }}
                                className="rounded-3xl bg-[#151515] p-6 text-white shadow-sm sm:p-7"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                                        <FiMapPin />
                                    </div>

                                    <div>
                                        <p className="text-xs text-white/50">
                                            Current delivery address
                                        </p>

                                        <p className="mt-1 font-bold">
                                            {order.address}
                                        </p>
                                    </div>
                                </div>

                                {order.landmark && (
                                    <p className="mt-4 text-sm leading-6 text-white/60">
                                        Landmark: {order.landmark}
                                    </p>
                                )}

                                <div className="mt-5 flex items-center gap-2 text-sm text-white/60">
                                    <FiPhone />
                                    {order.phone}
                                </div>
                            </motion.div>
                        )}

                        {/* Help */}
                        <motion.div
                            initial={{ opacity: 0, x: 25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="rounded-3xl border border-[#FF6B35]/20 bg-[#FFF0E9] p-6 sm:p-7"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#FF6B35]">
                                <FiCheckCircle />
                            </div>

                            <h2 className="mt-5 font-black text-[#151515]">
                                Need help?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Our support team is available if you have any
                                questions about your account or delivery.
                            </p>

                            <Link
                                href="/contact"
                                className="mt-5 inline-flex items-center gap-2 font-bold text-[#FF6B35] hover:underline"
                            >
                                Contact Support
                                <FiArrowRight />
                            </Link>
                        </motion.div>
                    </aside>
                </div>
            </section>

            <Footer />
        </main>
    );
}
