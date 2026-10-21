
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiClock,
  FiCopy,
  FiGift,
  FiPercent,
  FiSearch,
  FiTruck,
  FiX,
} from "react-icons/fi";

type PromotionType = "percentage" | "fixed" | "free_delivery";

type Promotion = {
  id: string;
  code: string;
  title: string;
  description: string;
  type: PromotionType;
  value: number;
  minimumOrder: number;
  maximumDiscount?: number;
  expiresAt: string;
  category: string;
  isNew?: boolean;
};

const PROMOTIONS_KEY = "doorstep_saved_promotions";

const promotions: Promotion[] = [
  {
    id: "welcome20",
    code: "WELCOME20",
    title: "20% Off Your Order",
    description:
      "Enjoy 20% off your food order and discover something delicious today.",
    type: "percentage",
    value: 20,
    minimumOrder: 5000,
    maximumDiscount: 5000,
    expiresAt: "2026-10-15",
    category: "Food",
    isNew: true,
  },
  {
    id: "food1500",
    code: "FOOD1500",
    title: "₦1,500 Off",
    description:
      "Get ₦1,500 off when you spend at least ₦10,000 on food.",
    type: "fixed",
    value: 1500,
    minimumOrder: 10000,
    expiresAt: "2026-10-20",
    category: "Food",
  },
  {
    id: "freedelivery",
    code: "FREEDRIVE",
    title: "Free Delivery",
    description:
      "Enjoy free delivery on eligible food orders.",
    type: "free_delivery",
    value: 0,
    minimumOrder: 7000,
    expiresAt: "2026-10-25",
    category: "Delivery",
    isNew: true,
  },
  {
    id: "weekend10",
    code: "WEEKEND10",
    title: "10% Weekend Discount",
    description:
      "Save 10% on your weekend food orders.",
    type: "percentage",
    value: 10,
    minimumOrder: 3000,
    maximumDiscount: 3000,
    expiresAt: "2026-11-01",
    category: "Weekend",
  },
  {
    id: "save2500",
    code: "SAVE2500",
    title: "Save ₦2,500",
    description:
      "Get ₦2,500 off qualifying orders.",
    type: "fixed",
    value: 2500,
    minimumOrder: 15000,
    expiresAt: "2026-11-10",
    category: "Food",
  },
  {
    id: "delivery500",
    code: "DELIVERY500",
    title: "₦500 Delivery Discount",
    description:
      "Save ₦500 from your delivery fee.",
    type: "free_delivery",
    value: 500,
    minimumOrder: 5000,
    expiresAt: "2026-11-15",
    category: "Delivery",
  },
];

const formatCurrency = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

const getDaysRemaining = (date: string) => {
  const today = new Date();
  const expiry = new Date(date);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  return Math.ceil(
    (expiry.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );
};

const getPromotionIcon = (type: PromotionType) => {
  if (type === "percentage") {
    return <FiPercent />;
  }

  if (type === "free_delivery") {
    return <FiTruck />;
  }

  return <FiGift />;
};

const getPromotionValue = (promotion: Promotion) => {
  if (promotion.type === "percentage") {
    return `${promotion.value}% OFF`;
  }

  if (promotion.type === "fixed") {
    return `${formatCurrency(promotion.value)} OFF`;
  }

  if (promotion.value > 0) {
    return `${formatCurrency(promotion.value)} OFF DELIVERY`;
  }

  return "FREE DELIVERY";
};

export default function PromotionsPage() {
  const [savedCodes, setSavedCodes] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROMOTIONS_KEY);

      if (saved) {
        setSavedCodes(JSON.parse(saved));
      }
    } catch {
      setSavedCodes([]);
    }
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(promotions.map((promotion) => promotion.category))
      ),
    ];
  }, []);

  const filteredPromotions = useMemo(() => {
    return promotions.filter((promotion) => {
      const matchesCategory =
        activeCategory === "All" ||
        promotion.category === activeCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        promotion.title.toLowerCase().includes(searchText) ||
        promotion.description.toLowerCase().includes(searchText) ||
        promotion.code.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const savePromotion = (code: string) => {
    setSavedCodes((current) => {
      const updated = current.includes(code)
        ? current
        : [...current, code];

      localStorage.setItem(
        PROMOTIONS_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const removePromotion = (code: string) => {
    setSavedCodes((current) => {
      const updated = current.filter(
        (savedCode) => savedCode !== code
      );

      localStorage.setItem(
        PROMOTIONS_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode("");
      }, 2000);
    } catch {
      setCopiedCode("");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to Profile
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-[#FF6B35]">
                  <FiGift />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF6B35]">
                    Door-Step Deals
                  </p>

                  <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                    Promotions & Coupons
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-gray-600">
                Save money on your favourite meals, delivery and
                other Door-Step services with our available offers.
              </p>
            </div>

            <Link
              href="/restaurants"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Explore Restaurants
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* SEARCH */}
        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search promotions or coupon codes..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* CATEGORIES */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-[#FF6B35] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* SAVED PROMOTIONS */}
        {savedCodes.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-3xl border border-orange-100 bg-orange-50 p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-950">
                  My Saved Coupons
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Your saved promotions are ready to use at
                  checkout.
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#FF6B35]">
                {savedCodes.length}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {savedCodes.map((code) => (
                <div
                  key={code}
                  className="flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-3 py-2"
                >
                  <span className="font-mono text-sm font-bold text-gray-900">
                    {code}
                  </span>

                  <button
                    type="button"
                    onClick={() => copyCode(code)}
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#FF6B35]"
                    aria-label={`Copy ${code}`}
                  >
                    {copiedCode === code ? (
                      <FiCheck className="text-green-600" />
                    ) : (
                      <FiCopy />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => removePromotion(code)}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    aria-label={`Remove ${code}`}
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* PROMOTION GRID */}
        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#FF6B35]">
              Available offers
            </p>

            <h2 className="mt-1 text-2xl font-black text-gray-950">
              Save more on Door-Step
            </h2>
          </div>

          <p className="hidden text-sm text-gray-500 sm:block">
            {filteredPromotions.length} offer
            {filteredPromotions.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredPromotions.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <FiGift className="mx-auto text-4xl text-gray-300" />

            <h3 className="mt-4 text-xl font-black text-gray-950">
              No promotions found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Try another search or select a different promotion
              category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 rounded-full bg-gray-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-[#FF6B35]"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {filteredPromotions.map((promotion) => {
              const daysRemaining = getDaysRemaining(
                promotion.expiresAt
              );

              const isSaved = savedCodes.includes(
                promotion.code
              );

              const isExpiringSoon =
                daysRemaining >= 0 && daysRemaining <= 7;

              return (
                <motion.article
                  key={promotion.id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 25,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-xl">
                  {/* OFFER HEADER */}
                  <div className="relative bg-gray-950 p-6 text-white">
                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#FF6B35]/20 blur-2xl" />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B35] text-xl">
                        {getPromotionIcon(
                          promotion.type
                        )}
                      </div>

                      {promotion.isNew && (
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-orange-300">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="relative mt-6 text-3xl font-black tracking-tight">
                      {getPromotionValue(promotion)}
                    </p>

                    <p className="relative mt-1 text-sm text-gray-400">
                      {promotion.title}
                    </p>
                  </div>

                  {/* OFFER BODY */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-black text-gray-950">
                      {promotion.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {promotion.description}
                    </p>

                    {/* CODE */}
                    <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                          Coupon Code
                        </p>

                        <p className="mt-1 font-mono text-sm font-black tracking-wide text-gray-950">
                          {promotion.code}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          copyCode(promotion.code)
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-gray-700 shadow-sm transition hover:text-[#FF6B35]"
                      >
                        {copiedCode === promotion.code ? (
                          <>
                            <FiCheck className="text-green-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <FiCopy />
                            Copy
                          </>
                        )}
                      </button>
                    </div>

                    {/* CONDITIONS */}
                    <div className="mt-5 space-y-3 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-gray-500">
                          Minimum order
                        </span>

                        <span className="font-bold text-gray-900">
                          {formatCurrency(
                            promotion.minimumOrder
                          )}
                        </span>
                      </div>

                      {promotion.maximumDiscount && (
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-gray-500">
                            Maximum discount
                          </span>

                          <span className="font-bold text-gray-900">
                            {formatCurrency(
                              promotion.maximumDiscount
                            )}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-gray-500">
                          <FiClock />
                          Expires
                        </span>

                        <span
                          className={`font-bold ${
                            isExpiringSoon
                              ? "text-red-500"
                              : "text-gray-900"
                          }`}
                        >
                          {new Date(
                            promotion.expiresAt
                          ).toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {isExpiringSoon && daysRemaining >= 0 && (
                      <div className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-center text-xs font-bold text-red-600">
                        {daysRemaining === 0
                          ? "Expires today"
                          : `Expires in ${daysRemaining} day${
                              daysRemaining === 1
                                ? ""
                                : "s"
                            }`}
                      </div>
                    )}

                    {/* ACTION */}
                    <button
                      type="button"
                      onClick={() => {
                        if (isSaved) {
                          removePromotion(
                            promotion.code
                          );
                        } else {
                          savePromotion(
                            promotion.code
                          );
                        }
                      }}
                    className={`mt-auto flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold transition ${
                        isSaved
                          ? "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-[#FF6B35] text-white hover:bg-orange-600"
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <FiCheck />
                          Saved to My Coupons
                        </>
                      ) : (
                        <>
                          Save Coupon
                          <FiArrowRight />
                        </>
                      )}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}

        {/* INFO */}
        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-xl text-gray-700">
              <FiGift />
            </div>

            <div>
              <h3 className="font-black text-gray-950">
                How promotions work
              </h3>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                <li>
                  • Save a promotion so you can quickly find it
                  later.
                </li>

                <li>
                  • Copy the coupon code and enter it during
                  checkout.
                </li>

                <li>
                  • Each promotion has its own minimum order,
                  discount and expiry conditions.
                </li>

                <li>
                  • Some promotions may only apply to selected
                  restaurants or services.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
