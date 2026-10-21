
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiClock,
  FiFilter,
  FiMapPin,
  FiSearch,
  FiStar,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating?: number;
  deliveryTime?: string;
  deliveryFee?: number;
  image?: string;
  estimatedPrepMinutes?: number | null;
  offer?: string;
  isOpen: boolean;
  tags: string[];
};

type ApiRestaurant = {
  id: string;
  name: string;
  description: string | null;
  city: string;
  state: string;
  coverImageUrl: string | null;
  logoUrl: string | null;
  estimatedPrepMinutes: number | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  isActive: boolean;
  isOpen: boolean;
};
const restaurants: Restaurant[] = [
  {
    id: "chicken-republic",
    name: "Chicken Republic",
    cuisine: "Chicken • Fast Food",
    rating: 4.8,
    deliveryTime: "20–30 min",
    deliveryFee: 800,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
    offer: "20% OFF",
    isOpen: true,
    tags: ["Fast Food", "Chicken"],
  },
  {
    id: "bukka-hut",
    name: "Bukka Hut",
    cuisine: "African • Nigerian",
    rating: 4.7,
    deliveryTime: "25–35 min",
    deliveryFee: 700,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
    offer: "Free delivery",
    isOpen: true,
    tags: ["African Food", "Nigerian"],
  },
  {
    id: "the-place",
    name: "The Place",
    cuisine: "African • Continental",
    rating: 4.6,
    deliveryTime: "30–40 min",
    deliveryFee: 900,
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85",
    offer: "15% OFF",
    isOpen: true,
    tags: ["African Food", "Continental"],
  },
  {
    id: "dominos-pizza",
    name: "Domino's Pizza",
    cuisine: "Pizza • Fast Food",
    rating: 4.7,
    deliveryTime: "25–35 min",
    deliveryFee: 850,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=85",
    offer: "Buy 1 Get 1",
    isOpen: true,
    tags: ["Pizza", "Fast Food"],
  },
  {
    id: "sweet-sensation",
    name: "Sweet Sensation",
    cuisine: "African • Fast Food",
    rating: 4.5,
    deliveryTime: "25–40 min",
    deliveryFee: 750,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85",
    isOpen: true,
    tags: ["African Food", "Fast Food"],
  },
  {
    id: "kilimanjaro",
    name: "Kilimanjaro",
    cuisine: "African • Continental",
    rating: 4.4,
    deliveryTime: "30–45 min",
    deliveryFee: 950,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85",
    offer: "10% OFF",
    isOpen: false,
    tags: ["African Food", "Continental"],
  },
  {
    id: "shawarma-house",
    name: "Shawarma House",
    cuisine: "Shawarma • Fast Food",
    rating: 4.6,
    deliveryTime: "20–30 min",
    deliveryFee: 650,
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1000&q=85",
    offer: "Free delivery",
    isOpen: true,
    tags: ["Fast Food", "Chicken"],
  },
  {
    id: "lagos-grill",
    name: "Lagos Grill",
    cuisine: "Nigerian • Grill",
    rating: 4.7,
    deliveryTime: "30–40 min",
    deliveryFee: 800,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85",
    offer: "15% OFF",
    isOpen: true,
    tags: ["Nigerian", "African Food"],
  },
];

const categories = [
  "All",
  "Fast Food",
  "African Food",
  "Pizza",
  "Chicken",
  "Nigerian",
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function RestaurantsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openOnly, setOpenOnly] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [apiRestaurants, setApiRestaurants] = useState<ApiRestaurant[]>([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [restaurantsError, setRestaurantsError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRestaurants() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_RESTAURANT_API_URL;

        if (!apiUrl) {
          throw new Error("Restaurant API URL is not configured.");
        }

        const response = await fetch(`${apiUrl}/restaurants/public`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load restaurants.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid restaurant API response.");
        }

        const approvedRestaurants = data.filter(
          (restaurant): restaurant is ApiRestaurant =>
            restaurant !== null &&
            typeof restaurant === "object" &&
            typeof restaurant.id === "string" &&
            typeof restaurant.name === "string" &&
            restaurant.status === "APPROVED" &&
            restaurant.isActive === true
        );

        setApiRestaurants(approvedRestaurants);
        setRestaurantsError(null);
      } catch (error) {
        if (controller.signal.aborted) return;

        setRestaurantsError(
          error instanceof Error ? error.message : "Unable to load restaurants."
        );
      } finally {
        if (!controller.signal.aborted) {
          setRestaurantsLoading(false);
        }
      }
    }

    loadRestaurants();

    return () => controller.abort();
  }, []);

  const liveRestaurants = useMemo<Restaurant[]>(() => {
    return apiRestaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name,
      cuisine: [restaurant.city, restaurant.state]
        .filter(Boolean)
        .join(", "),
      image: restaurant.coverImageUrl || restaurant.logoUrl || undefined,
      isOpen: restaurant.isOpen,
      tags: [],
      estimatedPrepMinutes: restaurant.estimatedPrepMinutes,
    }));
  }, [apiRestaurants]);
  const filteredRestaurants = useMemo(() => {
    return liveRestaurants.filter((restaurant) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        restaurant.name.toLowerCase().includes(searchValue) ||
        restaurant.cuisine.toLowerCase().includes(searchValue) ||
        restaurant.tags.some((tag) =>
          tag.toLowerCase().includes(searchValue)
        );

      const matchesCategory =
        activeCategory === "All" ||
        restaurant.tags.includes(activeCategory);

      const matchesOpen =
        !openOnly || restaurant.isOpen;

      const matchesFast =
        !fastDelivery ||
        (restaurant.deliveryTime ? parseInt(restaurant.deliveryTime.split("–")[0], 10) <= 25 : false);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesOpen &&
        matchesFast
      );
    });
  }, [
    search,
    activeCategory,
    openOnly,
    fastDelivery,
    liveRestaurants,
  ]);

  return (
    <main className="min-h-screen bg-[#FFF8F3] pb-16">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <section className="bg-[#151515]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-white"
          >
            <FiArrowLeft />
            Back Home
          </Link>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
              Door-Step Restaurants
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Find something delicious.
            </h1>

            <p className="mt-4 max-w-2xl text-gray-400">
              Discover restaurants near you, compare delivery times and order
              your favourite meals.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="mt-8 flex flex-col gap-3 md:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-5 py-4">
              <FiSearch className="text-xl text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search restaurants, food or cuisine..."
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-900"
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/15"
            >
              <FiFilter />
              Filters
            </button>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FILTERS
      ========================================================= */}
      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  activeCategory === category
                    ? "bg-[#FF6B35] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#FF6B35]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {showFilters && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              className="mt-5 flex flex-wrap gap-3 border-t border-gray-100 pt-5"
            >
              <button
                type="button"
                onClick={() => setOpenOnly(!openOnly)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  openOnly
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-600"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Open now
              </button>

              <button
                type="button"
                onClick={() => setFastDelivery(!fastDelivery)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  fastDelivery
                    ? "border-orange-300 bg-orange-50 text-[#FF6B35]"
                    : "border-gray-200 bg-white text-gray-600"
                }`}
              >
                <FiTruck />
                Fast delivery
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* =========================================================
          RESTAURANT RESULTS
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-500">
              {filteredRestaurants.length} restaurants available
            </p>

            <h2 className="mt-1 text-2xl font-black text-gray-950">
              Restaurants near you
            </h2>
          </div>
        </div>

        {filteredRestaurants.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredRestaurants.map((restaurant) => (
              <motion.article
                key={restaurant.id}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                }}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl"
              >
                <Link href={`/restaurants/${restaurant.id}`}>
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={restaurant.image || "/images/restaurant-placeholder.svg"}
                      alt={restaurant.name}
                      className={`h-56 w-full object-cover transition duration-500 group-hover:scale-105 ${
                        !restaurant.isOpen
                          ? "grayscale-[25%]"
                          : ""
                      }`}
                    />

                    {restaurant.offer && restaurant.isOpen && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#FF6B35] px-3 py-1.5 text-xs font-black text-white shadow-lg">
                        {restaurant.offer}
                      </span>
                    )}

                    {!restaurant.isOpen && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="rounded-full bg-gray-950/90 px-4 py-2 text-sm font-bold text-white">
                          Currently Closed
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-black text-gray-900 shadow-lg">
                      <FiStar className="fill-yellow-400 text-yellow-400" />
                      {restaurant.rating}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black text-gray-950">
                          {restaurant.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {restaurant.cuisine}
                        </p>
                      </div>

                      <FiArrowLeft className="rotate-180 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#FF6B35]" />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FiClock />
                        {restaurant.deliveryTime}
                      </span>

                      <span>
                        {restaurant.deliveryFee != null ? `₦${restaurant.deliveryFee.toLocaleString()} delivery` : "Delivery fee not available"}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          restaurant.isOpen
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />

                      <span
                        className={`text-xs font-bold ${
                          restaurant.isOpen
                            ? "text-green-700"
                            : "text-gray-500"
                        }`}
                      >
                        {restaurant.isOpen
                          ? "Open now"
                          : "Closed"}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-10 rounded-3xl border border-dashed border-orange-200 bg-white px-6 py-16 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-2xl text-[#FF6B35]">
              <FiSearch />
            </div>

            <h3 className="mt-5 text-xl font-black text-gray-950">
              {restaurantsLoading
                ? "Loading restaurants..."
                : restaurantsError
                ? "Unable to load restaurants"
                : liveRestaurants.length === 0
                ? "No restaurants available yet"
                : "No restaurants found"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {restaurantsLoading
                ? "Please wait while we check available restaurants."
                : restaurantsError
                ? "We could not connect to the restaurant service. Please try again shortly."
                : liveRestaurants.length === 0
                ? "Our restaurant partners are being prepared. Please check back soon."
                : "Try a different restaurant name, food type or category."}
            </p>

            {!restaurantsLoading && !restaurantsError && liveRestaurants.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
                setOpenOnly(false);
                setFastDelivery(false);
              }}
              className="mt-6 rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Clear Filters
            </button>
            )}
          </motion.div>
        )}
      </section>

      {/* =========================================================
          DELIVERY PROMO
      ========================================================= */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-[#151515] p-7 sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B35]/10 text-xl text-[#FF6B35]">
                <FiTruck />
              </div>

              <h3 className="mt-5 text-2xl font-black text-white">
                Fast delivery to your doorstep
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Door-Step connects your order with nearby riders so you can
                spend less time waiting.
              </p>
            </div>

            <div className="rounded-3xl bg-orange-50 p-7 sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl text-[#FF6B35] shadow-sm">
                <FiMapPin />
              </div>

              <h3 className="mt-5 text-2xl font-black text-gray-950">
                Restaurants around you
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                As Door-Step grows, your restaurant list and delivery options
                will be powered by your real location and backend data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MOBILE BOTTOM NAV
      ========================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-2 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 px-4 py-2 text-gray-500 transition hover:text-[#FF6B35]"
          >
            <FiMapPin className="text-lg" />
            <span className="text-[10px] font-bold">Home</span>
          </Link>

          <Link
            href="/restaurants"
            className="flex flex-col items-center gap-1 px-4 py-2 text-[#FF6B35]"
          >
            <FiSearch className="text-lg" />
            <span className="text-[10px] font-bold">Explore</span>
          </Link>

          <Link
            href="/cart"
            className="flex flex-col items-center gap-1 px-4 py-2 text-gray-500 transition hover:text-[#FF6B35]"
          >
            <span className="text-lg">🛒</span>
            <span className="text-[10px] font-bold">Cart</span>
          </Link>

          <Link
            href="/profile"
            className="flex flex-col items-center gap-1 px-4 py-2 text-gray-500 transition hover:text-[#FF6B35]"
          >
            <span className="text-lg">👤</span>
            <span className="text-[10px] font-bold">Account</span>
          </Link>
        </div>
      </div>

      <div className="h-16 lg:hidden" />
    </main>
  );
}
