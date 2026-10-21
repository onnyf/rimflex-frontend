
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiHeart,
  FiMapPin,
  FiClock,
  FiStar,
  FiTruck,
  FiTrash2,
  FiShoppingBag,
} from "react-icons/fi";

type FavouriteRestaurant = {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  isOpen: boolean;
};

const FAVOURITES_KEY = "doorstep_favourite_restaurants";

const demoRestaurants: FavouriteRestaurant[] = [
  {
    id: "chicken-republic",
    name: "Chicken Republic",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80",
    category: "Fast Food",
    rating: 4.6,
    deliveryTime: "25–35 min",
    deliveryFee: 1000,
    isOpen: true,
  },
  {
    id: "bukka-hut",
    name: "Bukka Hut",
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80",
    category: "Nigerian",
    rating: 4.5,
    deliveryTime: "30–40 min",
    deliveryFee: 1200,
    isOpen: true,
  },
  {
    id: "the-place",
    name: "The Place",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    category: "Restaurant",
    rating: 4.7,
    deliveryTime: "25–40 min",
    deliveryFee: 1000,
    isOpen: true,
  },
  {
    id: "dominos-pizza",
    name: "Domino's Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
    category: "Pizza",
    rating: 4.7,
    deliveryTime: "20–30 min",
    deliveryFee: 800,
    isOpen: true,
  },
  {
    id: "sweet-sensation",
    name: "Sweet Sensation",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    category: "Fast Food",
    rating: 4.4,
    deliveryTime: "30–40 min",
    deliveryFee: 1000,
    isOpen: true,
  },
  {
    id: "kilimanjaro",
    name: "Kilimanjaro",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    category: "Nigerian",
    rating: 4.3,
    deliveryTime: "35–45 min",
    deliveryFee: 1300,
    isOpen: false,
  },
  {
    id: "shawarma-house",
    name: "Shawarma House",
    image:
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=900&q=80",
    category: "Shawarma",
    rating: 4.5,
    deliveryTime: "20–30 min",
    deliveryFee: 700,
    isOpen: true,
  },
  {
    id: "lagos-grill",
    name: "Lagos Grill",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    category: "Grill",
    rating: 4.6,
    deliveryTime: "30–40 min",
    deliveryFee: 1100,
    isOpen: true,
  },
];

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<FavouriteRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVOURITES_KEY);

      if (saved) {
        const savedIds: string[] = JSON.parse(saved);

        const matchedRestaurants = savedIds
          .map((id) => demoRestaurants.find((restaurant) => restaurant.id === id))
          .filter(
            (restaurant): restaurant is FavouriteRestaurant =>
              Boolean(restaurant)
          );

        setFavourites(matchedRestaurants);
      }
    } catch (error) {
      console.error("Failed to load favourite restaurants:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFavourite = (restaurantId: string) => {
    setFavourites((current) => {
      const updated = current.filter(
        (restaurant) => restaurant.id !== restaurantId
      );

      try {
        const savedIds = updated.map((restaurant) => restaurant.id);
        localStorage.setItem(FAVOURITES_KEY, JSON.stringify(savedIds));
      } catch (error) {
        console.error("Failed to update favourites:", error);
      }

      return updated;
    });
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      {/* HEADER */}
      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to Profile
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#FF6B35]">
                  <FiHeart className="text-xl" />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
                    Door-Step
                  </p>

                  <h1 className="text-3xl font-black text-gray-950 sm:text-4xl">
                    Favourite Restaurants
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-gray-600">
                Your favourite restaurants are saved here so you can quickly
                order your favourite meals again.
              </p>
            </div>

            <Link
              href="/restaurants"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              <FiShoppingBag />
              Explore Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white"
              >
                <div className="h-52 animate-pulse bg-gray-200" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : favourites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-orange-100 bg-white px-6 py-16 text-center shadow-sm"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-[#FF6B35]">
              <FiHeart className="text-3xl" />
            </div>

            <h2 className="mt-6 text-2xl font-black text-gray-950">
              No favourite restaurants yet
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
              When you find a restaurant you love, tap the heart icon to save
              it here for faster ordering.
            </p>

            <Link
              href="/restaurants"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 font-bold text-white transition hover:bg-orange-600"
            >
              <FiShoppingBag />
              Find a Restaurant
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-950">
                  Saved Restaurants
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {favourites.length}{" "}
                  {favourites.length === 1 ? "restaurant" : "restaurants"}{" "}
                  saved
                </p>
              </div>
            </div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
              {favourites.map((restaurant) => (
                <motion.article
                  key={restaurant.id}
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
                    y: -7,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-xl"
                >
                  {/* IMAGE */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                          restaurant.isOpen
                            ? "bg-green-500 text-white"
                            : "bg-gray-900/80 text-white"
                        }`}
                      >
                        {restaurant.isOpen ? "Open Now" : "Closed"}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeFavourite(restaurant.id)}
                        aria-label={`Remove ${restaurant.name} from favourites`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-lg transition hover:bg-red-500 hover:text-white"
                      >
                        <FiHeart className="fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black text-gray-950">
                          {restaurant.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {restaurant.category}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-bold text-yellow-700">
                        <FiStar className="fill-current" />
                        {restaurant.rating}
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FiClock className="text-[#FF6B35]" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FiTruck className="text-[#FF6B35]" />
                        <span>
                          Delivery {formatNaira(restaurant.deliveryFee)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-[#FF6B35]" />
                        <span>Lagos</span>
                      </div>
                    </div>

                    <Link
                      href={`/restaurants/${restaurant.id}`}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gray-950 px-5 py-3 font-bold text-white transition hover:bg-[#FF6B35]"
                    >
                      View Restaurant
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </>
        )}
      </section>
    </main>
  );
}
