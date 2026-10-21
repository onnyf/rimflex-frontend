
"use client";

import { useState } from "react";
import Link from "next/link";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCreditCard,
  FiLock,
  FiMapPin,
  FiNavigation,
  FiPackage,
  FiShield,
  FiTruck,
  FiUser,
} from "react-icons/fi";



const paymentMethods = [
    {
        id: "card",
        name: "Card",
        description: "Pay securely with your debit or credit card.",
        icon: <FiCreditCard size={20} />,
    },
    {
        id: "transfer",
        name: "Bank Transfer",
        description: "Pay directly from your bank account.",
        icon: <span className="text-lg">🏦</span>,
    },
    {
        id: "wallet",
        name: "Door-Step Wallet",
        description: "Use your available Door-Step wallet balance.",
        icon: <span className="text-lg">💳</span>,
    },
];

export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState("card");

    const total = 2400;

    const formatPrice = (amount: number) =>
        `₦${amount.toLocaleString("en-NG")}`;

    return (
        <main className="min-h-screen bg-[#FFF8F3] text-[#151515]">
            {/* HEADER */}
            <header className="border-b border-black/5 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
                    {/* LOGO */}
                    <Link
                        href="/"
                        className="text-2xl font-extrabold tracking-tight"
                    >
                        Door<span className="text-[#FF6B35]">-Step</span>
                    </Link>

                    {/* PROGRESS */}
                    <div className="hidden items-center gap-3 text-sm font-semibold sm:flex">
                        <ProgressStep number={<FiCheck size={15} />} label="Delivery" complete />
                        <ProgressLine active />

                        <ProgressStep number={<FiCheck size={15} />} label="Package" complete />
                        <ProgressLine active />

                        <ProgressStep number={<FiCheck size={15} />} label="Vehicle" complete />
                        <ProgressLine active />

                        <ProgressStep number={<FiCheck size={15} />} label="Price" complete />
                        <ProgressLine active />

                        <ProgressStep number="5" label="Payment" active />
                    </div>

                    {/* BACK */}
                    <Link
                        href="/send-package/price"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
                    >
                        <FiArrowLeft size={17} />
                        Back
                    </Link>
                </div>
            </header>

            {/* PAGE */}
            <section className="px-5 py-10 lg:px-8 lg:py-14">
                <div className="mx-auto max-w-7xl">
                    {/* TITLE */}
                    <div className="max-w-3xl">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFE7DC] text-[#FF6B35]">
                            <FiCreditCard size={24} />
                        </div>

                        <p className="text-sm font-bold text-[#FF6B35]">
                            SECURE PAYMENT
                        </p>

                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
                            How would you like to pay?
                        </h1>

                        <p className="mt-4 text-base leading-7 text-gray-600">
                            Choose your preferred payment method to complete
                            your Door-Step delivery request.
                        </p>
                    </div>

                    {/* CONTENT */}
                    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
                        {/* LEFT */}
                        <div className="space-y-6">
                            {/* PAYMENT METHODS */}
                            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-extrabold">
                                        Payment method
                                    </h2>

                                    <div className="flex items-center gap-2 text-xs font-semibold text-green-600">
                                        <FiLock size={14} />
                                        Secure
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    {paymentMethods.map((method) => {
                                        const selected =
                                            paymentMethod === method.id;

                                        return (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() =>
                                                    setPaymentMethod(method.id)
                                                }
                                                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${selected
                                                        ? "border-[#FF6B35] bg-[#FFF8F3]"
                                                        : "border-black/10 bg-white hover:border-black/20"
                                                    }`}
                                            >
                                                {/* ICON */}
                                                <div
                                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${selected
                                                            ? "bg-[#FFE7DC] text-[#FF6B35]"
                                                            : "bg-gray-100 text-gray-500"
                                                        }`}
                                                >
                                                    {method.icon}
                                                </div>

                                                {/* DETAILS */}
                                                <div className="flex-1">
                                                    <p className="font-bold">
                                                        {method.name}
                                                    </p>

                                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                                        {method.description}
                                                    </p>
                                                </div>

                                                {/* RADIO */}
                                                <div
                                                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selected
                                                            ? "border-[#FF6B35]"
                                                            : "border-gray-300"
                                                        }`}
                                                >
                                                    {selected && (
                                                        <div className="h-2.5 w-2.5 rounded-full bg-[#FF6B35]" />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* CARD PAYMENT PREVIEW */}
                            {paymentMethod === "card" && (
                                <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-extrabold">
                                                Card payment
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Your card details will be securely
                                                handled by our payment provider.
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-[#FFF8F3] px-3 py-2 text-xs font-bold text-[#FF6B35]">
                                            Paystack
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <label className="mb-2 block text-xs font-bold text-gray-500">
                                                Card number
                                            </label>

                                            <div className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3">
                                                <FiCreditCard
                                                    size={17}
                                                    className="text-gray-400"
                                                />

                                                <input
                                                    type="text"
                                                    placeholder="0000 0000 0000 0000"
                                                    className="w-full bg-transparent text-sm outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-xs font-bold text-gray-500">
                                                Expiry date
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="MM / YY"
                                                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#FF6B35]"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-xs font-bold text-gray-500">
                                                CVV
                                            </label>

                                            <input
                                                type="password"
                                                placeholder="•••"
                                                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#FF6B35]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TRANSFER */}
                            {paymentMethod === "transfer" && (
                                <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] text-xl">
                                            🏦
                                        </div>

                                        <div>
                                            <h2 className="font-extrabold">
                                                Bank transfer
                                            </h2>

                                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                                When you continue, you'll receive
                                                payment instructions and a
                                                unique transfer reference.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* WALLET */}
                            {paymentMethod === "wallet" && (
                                <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] text-xl">
                                            💳
                                        </div>

                                        <div>
                                            <h2 className="font-extrabold">
                                                Door-Step Wallet
                                            </h2>

                                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                                Your wallet balance will be
                                                checked before the payment is
                                                processed.
                                            </p>

                                            <div className="mt-4 rounded-xl bg-gray-50 p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">
                                                        Available balance
                                                    </span>

                                                    <span className="font-extrabold">
                                                        ₦0
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECURITY */}
                            <div className="flex gap-4 rounded-2xl border border-green-100 bg-green-50 p-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-600">
                                    <FiShield size={19} />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-green-800">
                                        Your payment is protected
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-green-700/70">
                                        Door-Step does not store your complete
                                        card details. Payments are processed
                                        securely through our payment provider.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ORDER SUMMARY */}
                        <aside className="h-fit rounded-[2rem] bg-[#151515] p-7 text-white lg:sticky lg:top-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                                📦
                            </div>

                            <h2 className="mt-5 text-xl font-extrabold">
                                Order summary
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-white/50">
                                Review your delivery before making payment.
                            </p>

                            {/* ROUTE */}
                            <div className="mt-7 space-y-4">
                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#FF6B35]">
                                        <FiNavigation size={16} />
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                                            Pickup
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            Ikeja, Lagos
                                        </p>
                                    </div>
                                </div>

                                <div className="ml-4 h-4 border-l border-dashed border-white/10" />

                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-400">
                                        <FiMapPin size={16} />
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                                            Delivery
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            Yaba, Lagos
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* DETAILS */}
                            <div className="mt-7 grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-white/5 p-3">
                                    <p className="text-[10px] uppercase tracking-wide text-white/30">
                                        Vehicle
                                    </p>

                                    <p className="mt-1 text-xs font-bold">
                                        Motorcycle
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white/5 p-3">
                                    <p className="text-[10px] uppercase tracking-wide text-white/30">
                                        Distance
                                    </p>

                                    <p className="mt-1 text-xs font-bold">
                                        12.4 km
                                    </p>
                                </div>
                            </div>

                            {/* PRICE */}
                            <div className="mt-7 border-t border-white/10 pt-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/50">
                                        Delivery total
                                    </span>

                                    <span className="text-2xl font-extrabold">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            {/* PAY */}
                            <Link
                                href="/send-package/confirmation"
                                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#E85625]"
                            >
                                Pay {formatPrice(total)}
                                <FiArrowRight size={18} />
                            </Link>

                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/30">
                                <FiLock size={13} />
                                Secure payment
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* PROGRESS STEP */
function ProgressStep({
    number,
    label,
    active = false,
    complete = false,
}: {
    number: React.ReactNode;
    label: string;
    active?: boolean;
    complete?: boolean;
}) {
    return (
        <div
            className={`flex items-center gap-2 ${active ? "text-[#151515]" : "text-gray-400"
                }`}
        >
            <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${active || complete
                        ? "bg-[#FF6B35] text-white"
                        : "bg-gray-100"
                    }`}
            >
                {number}
            </span>

            <span>{label}</span>
        </div>
    );
}

/* PROGRESS LINE */
function ProgressLine({ active = false }: { active?: boolean }) {
    return (
        <span
            className={`h-px w-8 ${active ? "bg-[#FF6B35]" : "bg-gray-200"
                }`}
        />
    );
}
