
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FiArrowLeft,
    FiArrowRight,
    FiCheck,
    FiInfo,
    FiZap,
} from "react-icons/fi";

const vehicles = [
    {
        id: "bicycle",
        name: "Bicycle",
        icon: "🚲",
        description:
            "Affordable and ideal for small packages and short-distance deliveries.",
        capacity: "Up to 5 kg",
        distance: "Short distance",
        price: "From ₦1,000",
    },
    {
        id: "scooter",
        name: "Electric Scooter",
        icon: "🛴",
        description:
            "Fast and convenient for small to medium packages within the city.",
        capacity: "Up to 10 kg",
        distance: "Short to medium",
        price: "From ₦1,500",
    },
    {
        id: "motorcycle",
        name: "Motorcycle",
        icon: "🏍️",
        description:
            "Our flexible option for heavier packages and longer-distance deliveries.",
        capacity: "Up to 20 kg",
        distance: "Short to long",
        price: "From ₦2,000",
    },
];

export default function VehicleSelectionPage() {
    const [selectedVehicle, setSelectedVehicle] = useState("motorcycle");

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

                        <div className="flex items-center gap-2 text-[#151515]">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                                3
                            </span>
                            <span>Vehicle</span>
                        </div>

                        <span className="h-px w-8 bg-gray-200" />

                        <div className="flex items-center gap-2 text-gray-400">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                4
                            </span>
                            <span>Confirm</span>
                        </div>
                    </div>

                    {/* BACK */}
                    <Link
                        href="/send-package/details"
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
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFE7DC] text-2xl">
                            🚚
                        </div>

                        <p className="text-sm font-bold text-[#FF6B35]">
                            STEP 3 · VEHICLE
                        </p>

                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
                            How should we deliver it?
                        </h1>

                        <p className="mt-4 text-base leading-7 text-gray-600">
                            Choose the delivery vehicle that best suits your package.
                            We'll match your request with an available Door-Step rider.
                        </p>
                    </div>

                    {/* CONTENT */}
                    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
                        {/* VEHICLE OPTIONS */}
                        <div>
                            <div className="grid gap-5 md:grid-cols-3">
                                {vehicles.map((vehicle) => {
                                    const selected =
                                        selectedVehicle === vehicle.id;

                                    return (
                                        <button
                                            key={vehicle.id}
                                            type="button"
                                            onClick={() =>
                                                setSelectedVehicle(vehicle.id)
                                            }
                                            className={`relative rounded-[2rem] bg-white p-6 text-left transition ${
                                                selected
                                                    ? "ring-2 ring-[#FF6B35] shadow-lg shadow-orange-100"
                                                    : "ring-1 ring-black/5 hover:-translate-y-1 hover:shadow-md"
                                            }`}
                                        >
                                            {/* SELECTED */}
                                            {selected && (
                                                <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                                                    <FiCheck size={15} />
                                                </div>
                                            )}

                                            {/* ICON */}
                                            <div
                                                className={`flex h-16 w-16 items-center justify-center rounded-2xl text-4xl ${
                                                    selected
                                                        ? "bg-[#FFE7DC]"
                                                        : "bg-[#FFF8F3]"
                                                }`}
                                            >
                                                {vehicle.icon}
                                            </div>

                                            {/* NAME */}
                                            <h2 className="mt-6 text-xl font-extrabold">
                                                {vehicle.name}
                                            </h2>

                                            {/* DESCRIPTION */}
                                            <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
                                                {vehicle.description}
                                            </p>

                                            {/* DETAILS */}
                                            <div className="mt-6 space-y-3 border-t border-black/5 pt-5">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">
                                                        Capacity
                                                    </span>

                                                    <span className="font-bold">
                                                        {vehicle.capacity}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">
                                                        Distance
                                                    </span>

                                                    <span className="font-bold">
                                                        {vehicle.distance}
                                                    </span>
                                                </div>
                                            </div>

                                            <div
                                                className={`mt-5 rounded-xl px-4 py-3 text-sm font-bold ${
                                                    selected
                                                        ? "bg-[#FFF0E9] text-[#FF6B35]"
                                                        : "bg-gray-50 text-gray-700"
                                                }`}
                                            >
                                                {vehicle.price}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* INFORMATION */}
                            <div className="mt-6 flex gap-3 rounded-2xl border border-orange-100 bg-[#FFF4ED] p-5">
                                <div className="mt-0.5 shrink-0 text-[#FF6B35]">
                                    <FiInfo size={19} />
                                </div>

                                <div>
                                    <p className="text-sm font-bold">
                                        Vehicle matching
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Vehicle availability depends on your pickup
                                        location, package size, delivery distance and
                                        available riders. Door-Step may recommend a
                                        different vehicle when necessary.
                                    </p>
                                </div>
                            </div>

                            {/* CONTINUE */}
                            <Link
                                href="/send-package/price"
                                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#E85625]"
                            >
                                Continue with{" "}
                                {vehicles.find(
                                    (vehicle) =>
                                        vehicle.id === selectedVehicle
                                )?.name || "Vehicle"}
                                <FiArrowRight size={18} />
                            </Link>
                        </div>

                        {/* SUMMARY */}
                        <aside className="h-fit rounded-[2rem] bg-[#151515] p-7 text-white lg:sticky lg:top-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                                🚚
                            </div>

                            <h2 className="mt-5 text-xl font-extrabold">
                                Your delivery
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-white/50">
                                We'll use your selected vehicle to match you with
                                an available Door-Step rider.
                            </p>

                            {/* SELECTED VEHICLE */}
                            <div className="mt-7 rounded-2xl bg-white/10 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                                    Selected vehicle
                                </p>

                                <div className="mt-3 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                                        {
                                            vehicles.find(
                                                (vehicle) =>
                                                    vehicle.id ===
                                                    selectedVehicle
                                            )?.icon
                                        }
                                    </div>

                                    <div>
                                        <p className="font-bold">
                                            {
                                                vehicles.find(
                                                    (vehicle) =>
                                                        vehicle.id ===
                                                        selectedVehicle
                                                )?.name
                                            }
                                        </p>

                                        <p className="mt-1 text-xs text-white/40">
                                            {
                                                vehicles.find(
                                                    (vehicle) =>
                                                        vehicle.id ===
                                                        selectedVehicle
                                                )?.capacity
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* DELIVERY BENEFITS */}
                            <div className="mt-7 space-y-5">
                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#FF6B35]">
                                        <FiZap size={17} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold">
                                            Fast matching
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-white/40">
                                            We'll look for an available rider near
                                            your pickup location.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-400">
                                        <FiCheck size={17} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold">
                                            Safe delivery
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-white/40">
                                            Your package is handled by a Door-Step
                                            delivery partner.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* PRICE */}
                            <div className="mt-8 border-t border-white/10 pt-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/50">
                                        Estimated starting fee
                                    </span>

                                    <span className="font-extrabold">
                                        {
                                            vehicles.find(
                                                (vehicle) =>
                                                    vehicle.id ===
                                                    selectedVehicle
                                            )?.price
                                        }
                                    </span>
                                </div>

                                <p className="mt-2 text-xs leading-5 text-white/30">
                                    Final delivery price will be calculated
                                    based on distance, package details and
                                    selected vehicle.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}
