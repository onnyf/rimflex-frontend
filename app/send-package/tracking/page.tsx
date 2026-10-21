
"use client";

import Link from "next/link";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiClock,
  FiMapPin,
  FiMessageCircle,
  FiNavigation,
  FiPackage,
  FiPhone,
  FiShield,
  FiTruck,
  FiUser,
} from "react-icons/fi";



const formatPrice = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

const statusSteps = [
  {
    title: "Rider assigned",
    description: "A Door-Step rider has been assigned to your delivery.",
    completed: true,
  },
  {
    title: "Heading to pickup",
    description: "Your rider is on the way to collect your package.",
    completed: true,
  },
  {
    title: "Package picked up",
    description: "Your package will be collected from the pickup location.",
    completed: false,
  },
  {
    title: "On the way",
    description: "Your package is travelling to the recipient.",
    completed: false,
  },
  {
    title: "Delivered",
    description: "Package delivered successfully.",
    completed: false,
  },
];

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#151515]">
      {/* HEADER */}
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-[#FF6B35]"
          >
            Door-Step
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* PAGE HEADER */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <Link
            href="/send-package/confirmation"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft size={17} />
            Back to delivery details
          </Link>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#FF6B35]">
                Live delivery
              </p>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Track your package
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Order #DS-2026-10482
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
              Rider assigned
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-7 lg:grid-cols-[1.4fr_0.8fr]">
          {/* LEFT */}
          <div className="space-y-7">
            {/* MAP */}
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
              <div className="relative h-[390px] overflow-hidden bg-[#E8E4DE]">
                {/* Decorative map background */}
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute left-[8%] top-[12%] h-px w-[80%] rotate-[18deg] bg-gray-400" />
                  <div className="absolute left-[15%] top-[45%] h-px w-[75%] -rotate-[12deg] bg-gray-400" />
                  <div className="absolute left-[2%] top-[72%] h-px w-[95%] rotate-[7deg] bg-gray-400" />

                  <div className="absolute left-[20%] top-0 h-full w-px rotate-[20deg] bg-gray-400" />
                  <div className="absolute left-[60%] top-0 h-full w-px -rotate-[12deg] bg-gray-400" />
                  <div className="absolute left-[82%] top-0 h-full w-px rotate-[18deg] bg-gray-400" />
                </div>

                {/* Map labels */}
                <span className="absolute left-[12%] top-[22%] text-xs font-bold text-gray-500">
                  Ikeja
                </span>

                <span className="absolute left-[43%] top-[38%] text-xs font-bold text-gray-500">
                  Maryland
                </span>

                <span className="absolute right-[12%] top-[68%] text-xs font-bold text-gray-500">
                  Yaba
                </span>

                {/* Route */}
                <div className="absolute left-[18%] top-[25%] h-[2px] w-[58%] rotate-[25deg] bg-[#FF6B35]" />

                {/* Pickup */}
                <div className="absolute left-[14%] top-[19%] flex flex-col items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-[#151515] text-white shadow-lg">
                    <FiMapPin size={19} />
                  </div>

                  <div className="mt-2 rounded-lg bg-white px-3 py-1.5 text-xs font-bold shadow-md">
                    Pickup
                  </div>
                </div>

                {/* Rider */}
                <div className="absolute left-[48%] top-[42%] flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#FF6B35] text-white shadow-xl">
                    <FiTruck size={23} />
                  </div>

                  <div className="mt-2 rounded-lg bg-[#151515] px-3 py-1.5 text-xs font-bold text-white shadow-md">
                    Your rider
                  </div>
                </div>

                {/* Delivery */}
                <div className="absolute right-[12%] bottom-[18%] flex flex-col items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-green-600 text-white shadow-lg">
                    <FiMapPin size={19} />
                  </div>

                  <div className="mt-2 rounded-lg bg-white px-3 py-1.5 text-xs font-bold shadow-md">
                    Delivery
                  </div>
                </div>

                {/* Map notice */}
                <div className="absolute bottom-4 left-1/2 w-[90%] max-w-md -translate-x-1/2 rounded-2xl border border-black/5 bg-white/95 p-4 text-center shadow-lg backdrop-blur">
                  <p className="text-sm font-bold">
                    Your rider is heading to the pickup location
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Live location tracking will update as your delivery
                    progresses.
                  </p>
                </div>
              </div>
            </div>

            {/* DELIVERY STATUS */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black">Delivery status</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Follow your package every step of the way.
                  </p>
                </div>

                <div className="hidden rounded-xl bg-orange-50 p-3 text-[#FF6B35] sm:block">
                  <FiPackage size={23} />
                </div>
              </div>

              <div className="space-y-0">
                {statusSteps.map((step, index) => {
                  const isLast = index === statusSteps.length - 1;

                  return (
                    <div key={step.title} className="flex gap-4">
                      {/* ICON + LINE */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                            step.completed
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {step.completed ? (
                            <FiCheck size={18} />
                          ) : (
                            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                          )}
                        </div>

                        {!isLast && (
                          <div
                            className={`my-1 h-12 w-[2px] ${
                              step.completed
                                ? "bg-green-200"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>

                      {/* TEXT */}
                      <div className="pb-6">
                        <h3
                          className={`text-sm font-bold ${
                            step.completed
                              ? "text-[#151515]"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h3>

                        <p className="mt-1 max-w-lg text-xs leading-5 text-gray-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ROUTE */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-xl font-black">Delivery route</h2>

              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#151515] text-white">
                    <FiMapPin size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Pickup
                    </p>
                    <p className="mt-1 font-bold">Ikeja, Lagos</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Package collection point
                    </p>
                  </div>
                </div>

                <div className="ml-4 h-7 border-l-2 border-dashed border-gray-200" />

                <div className="flex gap-4">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                    <FiMapPin size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Delivery
                    </p>
                    <p className="mt-1 font-bold">Yaba, Lagos</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Delivery to Adewale Johnson
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">
            {/* ETA */}
            <div className="rounded-3xl bg-[#151515] p-6 text-white shadow-sm sm:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">
                    Estimated arrival
                  </p>

                  <h2 className="mt-3 text-3xl font-black">25–35 min</h2>

                  <p className="mt-2 text-sm text-white/60">
                    Your rider is currently heading to pickup.
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-3">
                  <FiClock size={22} />
                </div>
              </div>
            </div>

            {/* RIDER */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black">Your rider</h2>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                  Online
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-[#FF6B35]">
                  <FiUser size={28} />
                </div>

                <div>
                  <h3 className="font-black">Michael Adeyemi</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Motorcycle rider
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-xs font-bold text-gray-600">
                    <span className="text-yellow-500">★</span>
                    4.9
                    <span className="font-normal text-gray-400">
                      · 328 deliveries
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                >
                  <FiPhone size={17} />
                  Call
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#E85625]"
                >
                  <FiMessageCircle size={17} />
                  Chat
                </button>
              </div>
            </div>

            {/* DELIVERY INFO */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-xl font-black">Delivery information</h2>

              <div className="mt-6 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Package
                    </p>
                    <p className="mt-1 text-sm font-bold">Medium</p>
                  </div>

                  <FiPackage className="text-gray-400" size={19} />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Vehicle
                    </p>
                    <p className="mt-1 text-sm font-bold">Motorcycle</p>
                  </div>

                  <FiTruck className="text-gray-400" size={19} />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Distance
                    </p>
                    <p className="mt-1 text-sm font-bold">12.4 km</p>
                  </div>

                  <FiNavigation className="text-gray-400" size={19} />
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Delivery fee
                    </span>

                    <span className="font-black">
                      {formatPrice(2400)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SAFETY */}
            <div className="rounded-3xl border border-green-100 bg-green-50 p-6">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-600">
                  <FiShield size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-black text-green-900">
                    Door-Step protected
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-green-800/70">
                    Your delivery is being handled through Door-Step's
                    delivery network.
                  </p>
                </div>
              </div>
            </div>

            {/* SUPPORT */}
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
            >
              Need help?
              <FiArrowRight size={17} />
            </Link>
          </aside>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 text-center sm:px-8">
          <p className="text-sm text-gray-500">
            Want to send another package?
          </p>

          <Link
            href="/send-package"
            className="mt-3 inline-flex items-center gap-2 font-bold text-[#FF6B35] transition hover:text-[#E85625]"
          >
            Create another delivery
            <FiArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
