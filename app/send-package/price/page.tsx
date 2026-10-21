
"use client";

import Link from "next/link";
import {
    FiArrowLeft,
    FiArrowRight,
    FiCheck,
    FiMapPin,
    FiNavigation,
    FiPackage,
    FiTruck,
} from "react-icons/fi";

export default function DeliveryPricePage() {
    const pickup = "Ikeja, Lagos";
    const delivery = "Yaba, Lagos";

    const distance = "12.4 km";
    const vehicle = "Motorcycle";
    const packageSize = "Medium";

    const baseFee = 500;
    const distanceFee = 1200;
    const vehicleFee = 500;
    const serviceFee = 200;

    const total = baseFee + distanceFee + vehicleFee + serviceFee;

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
                        <div className="flex items-center gap-2 text-gray-400">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                                <FiCheck size={16} />
                            </span>

                            <span>Delivery</span>
                        </div>

                        <span className="h-px w-8 bg-[#FF6B35]" />

                        <div className="flex items-center gap-2 text-gray-400">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                                <FiCheck size={16} />
                            </span>

                            <span>Package</span>
                        </div>

                        <span className="h-px w-8 bg-[#FF6B35]" />

                        <div className="flex items-center gap-2 text-gray-400">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                                <FiCheck size={16} />
                            </span>

                            <span>Vehicle</span>
                        </div>

                        <span className="h-px w-8 bg-[#FF6B35]" />

                        <div className="flex items-center gap-2 text-[#151515]">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                                4
                            </span>

                            <span>Price</span>
                        </div>
                    </div>

                    {/* BACK */}
                    <Link
                        href="/send-package/vehicle"
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
                            <FiNavigation size={24} />
                        </div>

                        <p className="text-sm font-bold text-[#FF6B35]">
                            DELIVERY PRICE
                        </p>

                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Here's what your delivery will cost.
                        </h1>

                        <p className="mt-4 text-base leading-7 text-gray-600">
                            We've estimated your delivery price based on the
                            distance, package size and selected vehicle.
                        </p>
                    </div>

                    {/* CONTENT */}
                    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
                        {/* LEFT */}
                        <div className="space-y-6">
                            {/* ROUTE CARD */}
                            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-extrabold">
                                        Delivery route
                                    </h2>

                                    <span className="rounded-full bg-[#FFF0E9] px-3 py-1.5 text-xs font-bold text-[#FF6B35]">
                                        {distance}
                                    </span>
                                </div>

                                <div className="mt-7">
                                    {/* PICKUP */}
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                                                <FiNavigation size={19} />
                                            </div>

                                            <div className="mt-2 h-12 w-px border-l border-dashed border-gray-300" />
                                        </div>

                                        <div className="pt-1">
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                Pickup
                                            </p>

                                            <p className="mt-1 text-sm font-bold">
                                                {pickup}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Rider will collect your package
                                                here.
                                            </p>
                                        </div>
                                    </div>

                                    {/* DELIVERY */}
                                    <div className="flex gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                            <FiMapPin size={19} />
                                        </div>

                                        <div className="pt-1">
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                Delivery
                                            </p>

                                            <p className="mt-1 text-sm font-bold">
                                                {delivery}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Your recipient will receive the
                                                package here.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DELIVERY DETAILS */}
                            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                                <h2 className="text-lg font-extrabold">
                                    Delivery details
                                </h2>

                                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                    {/* VEHICLE */}
                                    <div className="rounded-2xl bg-[#FFF8F3] p-5">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE7DC] text-xl">
                                            🏍️
                                        </div>

                                        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Vehicle
                                        </p>

                                        <p className="mt-1 font-bold">
                                            {vehicle}
                                        </p>
                                    </div>

                                    {/* PACKAGE */}
                                    <div className="rounded-2xl bg-[#FFF8F3] p-5">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE7DC] text-[#FF6B35]">
                                            <FiPackage size={18} />
                                        </div>

                                        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Package
                                        </p>

                                        <p className="mt-1 font-bold">
                                            {packageSize}
                                        </p>
                                    </div>

                                    {/* DISTANCE */}
                                    <div className="rounded-2xl bg-[#FFF8F3] p-5">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE7DC] text-[#FF6B35]">
                                            <FiTruck size={18} />
                                        </div>

                                        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Distance
                                        </p>

                                        <p className="mt-1 font-bold">
                                            {distance}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* PRICE BREAKDOWN MOBILE/DESKTOP */}
                            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8 lg:hidden">
                                <h2 className="text-lg font-extrabold">
                                    Price breakdown
                                </h2>

                                <div className="mt-6 space-y-4">
                                    <PriceRow
                                        label="Base delivery fee"
                                        amount={baseFee}
                                    />

                                    <PriceRow
                                        label={`Distance (${distance})`}
                                        amount={distanceFee}
                                    />

                                    <PriceRow
                                        label="Vehicle fee"
                                        amount={vehicleFee}
                                    />

                                    <PriceRow
                                        label="Door-Step service fee"
                                        amount={serviceFee}
                                    />

                                    <div className="border-t border-black/5 pt-5">
                                        <div className="flex items-center justify-between">
                                            <span className="font-extrabold">
                                                Total
                                            </span>

                                            <span className="text-2xl font-extrabold text-[#FF6B35]">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SUMMARY */}
                        <aside className="h-fit rounded-[2rem] bg-[#151515] p-7 text-white lg:sticky lg:top-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                                💰
                            </div>

                            <h2 className="mt-5 text-xl font-extrabold">
                                Price summary
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-white/50">
                                Your estimated delivery cost is shown below.
                                There are no hidden charges.
                            </p>

                            {/* PRICE */}
                            <div className="mt-7 space-y-4">
                                <PriceRowDark
                                    label="Base delivery fee"
                                    amount={baseFee}
                                />

                                <PriceRowDark
                                    label={`Distance (${distance})`}
                                    amount={distanceFee}
                                />

                                <PriceRowDark
                                    label="Vehicle fee"
                                    amount={vehicleFee}
                                />

                                <PriceRowDark
                                    label="Service fee"
                                    amount={serviceFee}
                                />
                            </div>

                            {/* TOTAL */}
                            <div className="mt-6 border-t border-white/10 pt-6">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                                            Total
                                        </p>

                                        <p className="mt-2 text-3xl font-extrabold text-white">
                                            {formatPrice(total)}
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                                        <FiCheck size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <Link
                                href="/send-package/payment"
                                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#E85625]"
                            >
                                Continue to Payment
                                <FiArrowRight size={18} />
                            </Link>

                            <p className="mt-4 text-center text-xs leading-5 text-white/30">
                                Final amount may change if the delivery
                                details change.
                            </p>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* PRICE ROW */
function PriceRow({
    label,
    amount,
}: {
    label: string;
    amount: number;
}) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-gray-500">{label}</span>

            <span className="font-bold">
                ₦{amount.toLocaleString("en-NG")}
            </span>
        </div>
    );
}

/* DARK PRICE ROW */
function PriceRowDark({
    label,
    amount,
}: {
    label: string;
    amount: number;
}) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-white/50">{label}</span>

            <span className="font-bold">
                ₦{amount.toLocaleString("en-NG")}
            </span>
        </div>
    );
}
