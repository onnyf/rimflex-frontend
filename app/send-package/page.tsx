
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FiArrowLeft,
    FiArrowRight,
    FiMapPin,
    FiNavigation,
    FiPackage,
    FiUser,
    FiPhone,
} from "react-icons/fi";

export default function SendPackagePage() {
    const [pickup, setPickup] = useState("");
    const [delivery, setDelivery] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientPhone, setRecipientPhone] = useState("");

    const canContinue =
        pickup.trim() &&
        delivery.trim() &&
        recipientName.trim() &&
        recipientPhone.trim();

    return (
        <main className="min-h-screen bg-[#FFF8F3] text-[#151515]">
            {/* HEADER */}
            <header className="border-b border-black/5 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
                    <Link
                        href="/"
                        className="text-2xl font-extrabold tracking-tight"
                    >
                        Door<span className="text-[#FF6B35]">-Step</span>
                    </Link>

                    <div className="hidden items-center gap-3 text-sm font-semibold text-gray-500 sm:flex">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                            1
                        </span>

                        <span className="text-[#151515]">
                            Delivery details
                        </span>

                        <span className="h-px w-8 bg-gray-200" />

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            2
                        </span>

                        <span>Package</span>

                        <span className="h-px w-8 bg-gray-200" />

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            3
                        </span>

                        <span>Confirm</span>
                    </div>

                    <Link
                        href="/"
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
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFE7DC] text-[#FF6B35]">
                            <FiPackage size={24} />
                        </div>

                        <p className="text-sm font-bold text-[#FF6B35]">
                            SEND A PACKAGE
                        </p>

                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Where should we deliver it?
                        </h1>

                        <p className="mt-4 text-base leading-7 text-gray-600">
                            Tell us where the package is being picked up and where it needs
                            to go. A Door-Step rider will handle the delivery.
                        </p>
                    </div>

                    {/* CONTENT */}
                    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
                        {/* FORM */}
                        <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                            {/* PICKUP */}
                            <div>
                                <label className="mb-2 block text-sm font-bold">
                                    Pickup location
                                </label>

                                <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-[#FF6B35]">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                        <FiNavigation size={18} />
                                    </div>

                                    <input
                                        type="text"
                                        value={pickup}
                                        onChange={(e) => setPickup(e.target.value)}
                                        placeholder="Where should the rider pick up?"
                                        className="w-full bg-transparent py-2 text-sm outline-none"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="mt-2 flex items-center gap-2 text-xs font-bold text-[#FF6B35]"
                                >
                                    <FiMapPin size={14} />
                                    Use my current location
                                </button>
                            </div>

                            {/* DELIVERY */}
                            <div className="mt-7">
                                <label className="mb-2 block text-sm font-bold">
                                    Delivery location
                                </label>

                                <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-[#FF6B35]">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                        <FiMapPin size={18} />
                                    </div>

                                    <input
                                        type="text"
                                        value={delivery}
                                        onChange={(e) => setDelivery(e.target.value)}
                                        placeholder="Where should we deliver?"
                                        className="w-full bg-transparent py-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* RECIPIENT */}
                            <div className="mt-7">
                                <p className="mb-4 text-sm font-bold">
                                    Recipient details
                                </p>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-xs font-semibold text-gray-500">
                                            Recipient name
                                        </label>

                                        <div className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 focus-within:border-[#FF6B35]">
                                            <FiUser
                                                size={17}
                                                className="text-gray-400"
                                            />

                                            <input
                                                type="text"
                                                value={recipientName}
                                                onChange={(e) =>
                                                    setRecipientName(e.target.value)
                                                }
                                                placeholder="Full name"
                                                className="w-full bg-transparent text-sm outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-semibold text-gray-500">
                                            Phone number
                                        </label>

                                        <div className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 focus-within:border-[#FF6B35]">
                                            <FiPhone
                                                size={17}
                                                className="text-gray-400"
                                            />

                                            <input
                                                type="tel"
                                                value={recipientPhone}
                                                onChange={(e) =>
                                                    setRecipientPhone(e.target.value)
                                                }
                                                placeholder="0800 000 0000"
                                                className="w-full bg-transparent text-sm outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>




{/* CONTINUE */}

<Link
    href="/send-package/details"
    className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#E85625]"
>
    Continue
    <FiArrowRight size={18} />
</Link>






                        </div>

                        {/* SUMMARY */}
                        <aside className="h-fit rounded-[2rem] bg-[#151515] p-7 text-white lg:sticky lg:top-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                                📦
                            </div>

                            <h2 className="mt-5 text-xl font-extrabold">
                                Send with Door-Step
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-white/50">
                                A rider will pick up your package and deliver it safely to
                                your recipient.
                            </p>

                            <div className="mt-7 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#FF6B35]" />

                                    <div>
                                        <p className="text-xs text-white/40">
                                            PICKUP
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {pickup || "Pickup location"}
                                        </p>
                                    </div>
                                </div>

                                <div className="ml-1 h-7 w-px bg-white/10" />

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-green-400" />

                                    <div>
                                        <p className="text-xs text-white/40">
                                            DELIVERY
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {delivery || "Delivery location"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-white/10 pt-5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white/50">
                                        Delivery fee
                                    </span>

                                    <span className="font-bold">
                                        Calculated next
                                    </span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}
