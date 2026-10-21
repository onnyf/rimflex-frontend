
"use client";

import Link from "next/link";
import {
    FiArrowLeft,
    FiCheck,
    FiClock,
    FiHome,
    FiMapPin,
    FiNavigation,
    FiPackage,
    FiPhone,
    FiTruck,
} from "react-icons/fi";

export default function ConfirmationPage() {
    const orderNumber = "DS-2026-10482";

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

                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
                    >
                        <FiHome size={17} />
                        Home
                    </Link>
                </div>
            </header>

            {/* PAGE */}
            <section className="px-5 py-10 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-5xl">
                    {/* SUCCESS */}
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                                <FiCheck size={28} strokeWidth={3} />
                            </div>
                        </div>

                        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-green-600">
                            Payment successful
                        </p>

                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Your delivery is booked!
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600">
                            We've received your delivery request. We're now
                            looking for an available Door-Step rider near your
                            pickup location.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm ring-1 ring-black/5">
                            <FiPackage
                                size={16}
                                className="text-[#FF6B35]"
                            />
                            Order #{orderNumber}
                        </div>
                    </div>

                    {/* STATUS */}
                    <div className="mt-10 rounded-[2rem] bg-[#151515] p-6 text-white md:p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
                                    Current status
                                </p>

                                <h2 className="mt-2 text-2xl font-extrabold">
                                    Finding a rider
                                </h2>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                                    We're matching your delivery with an
                                    available rider. You'll be notified as soon
                                    as a rider accepts your request.
                                </p>
                            </div>

                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FF6B35]/10 text-[#FF6B35]">
                                <FiTruck size={28} />
                            </div>
                        </div>

                        {/* STATUS STEPS */}
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            <StatusStep
                                active
                                number="1"
                                title="Finding rider"
                                description="Searching nearby"
                            />

                            <StatusStep
                                number="2"
                                title="Rider pickup"
                                description="Waiting for rider"
                            />

                            <StatusStep
                                number="3"
                                title="Delivered"
                                description="Not started"
                            />
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
                        {/* DELIVERY DETAILS */}
                        <div className="space-y-6">
                            {/* ROUTE */}
                            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-extrabold">
                                        Delivery details
                                    </h2>

                                    <span className="rounded-full bg-[#FFF0E9] px-3 py-1.5 text-xs font-bold text-[#FF6B35]">
                                        12.4 km
                                    </span>
                                </div>

                                <div className="mt-7">
                                    {/* PICKUP */}
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                                <FiNavigation size={19} />
                                            </div>

                                            <div className="h-14 border-l border-dashed border-gray-300" />
                                        </div>

                                        <div className="pt-1">
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                Pickup
                                            </p>

                                            <p className="mt-1 font-bold">
                                                Ikeja, Lagos
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Rider will collect the package
                                                from this location.
                                            </p>
                                        </div>
                                    </div>

                                    {/* DELIVERY */}
                                    <div className="flex gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                            <FiMapPin size={19} />
                                        </div>

                                        <div className="pt-1">
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                Delivery
                                            </p>

                                            <p className="mt-1 font-bold">
                                                Yaba, Lagos
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Your recipient will receive
                                                the package here.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RECIPIENT */}
                            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                                <h2 className="text-lg font-extrabold">
                                    Recipient
                                </h2>

                                <div className="mt-5 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF0E9] text-[#FF6B35]">
                                        <span className="text-lg font-extrabold">
                                            A
                                        </span>
                                    </div>

                                    <div>
                                        <p className="font-bold">
                                            Adewale Johnson
                                        </p>

                                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                            <FiPhone size={14} />
                                            0800 000 0000
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PACKAGE */}
                            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-extrabold">
                                        Package
                                    </h2>

                                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                                        Medium
                                    </span>
                                </div>

                                <div className="mt-5 flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] text-xl">
                                        📦
                                    </div>

                                    <div>
                                        <p className="font-bold">
                                            Package ready for pickup
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-gray-500">
                                            Documents and clothing
                                        </p>

                                        <p className="mt-3 text-xs font-semibold text-gray-400">
                                            Declared value: ₦50,000
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SUMMARY */}
                        <aside className="h-fit rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 lg:sticky lg:top-6">
                            <h2 className="text-lg font-extrabold">
                                Payment summary
                            </h2>

                            <div className="mt-6 space-y-4">
                                <SummaryRow
                                    label="Base delivery fee"
                                    value="₦500"
                                />

                                <SummaryRow
                                    label="Distance fee"
                                    value="₦1,200"
                                />

                                <SummaryRow
                                    label="Vehicle fee"
                                    value="₦500"
                                />

                                <SummaryRow
                                    label="Service fee"
                                    value="₦200"
                                />
                            </div>

                            <div className="mt-6 border-t border-black/5 pt-5">
                                <div className="flex items-center justify-between">
                                    <span className="font-extrabold">
                                        Total paid
                                    </span>

                                    <span className="text-2xl font-extrabold text-[#FF6B35]">
                                        ₦2,400
                                    </span>
                                </div>

                                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-green-600">
                                    <FiCheck size={14} />
                                    Payment successful
                                </div>
                            </div>

                            {/* TRACK BUTTON */}
                            <Link
                                href="/send-package/tracking"
                                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#151515] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#FF6B35]"
                            >
                                Track delivery
                                <FiNavigation size={17} />
                            </Link>

                            <Link
                                href="/"
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 px-5 py-4 text-sm font-bold text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                            >
                                <FiHome size={17} />
                                Back to home
                            </Link>
                        </aside>
                    </div>

                    {/* HELP */}
                    <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-black/5 sm:flex-row sm:text-left">
                        <div>
                            <p className="text-sm font-bold">
                                Need help with your delivery?
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Our support team is available to help.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="rounded-xl bg-[#FFF0E9] px-5 py-3 text-sm font-bold text-[#FF6B35] transition hover:bg-[#FFE7DC]"
                        >
                            Contact Support
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* STATUS STEP */
function StatusStep({
    number,
    title,
    description,
    active = false,
}: {
    number: string;
    title: string;
    description: string;
    active?: boolean;
}) {
    return (
        <div
            className={`rounded-2xl p-4 ${
                active ? "bg-white/10" : "bg-white/5"
            }`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                        active
                            ? "bg-[#FF6B35] text-white"
                            : "bg-white/10 text-white/40"
                    }`}
                >
                    {active ? <FiCheck size={16} /> : number}
                </div>

                <div>
                    <p
                        className={`text-sm font-bold ${
                            active ? "text-white" : "text-white/40"
                        }`}
                    >
                        {title}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* SUMMARY ROW */
function SummaryRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-gray-500">{label}</span>

            <span className="font-bold">{value}</span>
        </div>
    );
}
