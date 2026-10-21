
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiPackage,
  FiSearch,
  FiShoppingBag,
  FiStar,
  FiTruck,
} from "react-icons/fi";

const categories = [
  {
    name: "Fast Food",
    emoji: "🍔",
    description: "Burgers, fries & more",
  },
  {
    name: "Pizza",
    emoji: "🍕",
    description: "Hot & cheesy",
  },
  {
    name: "Chicken",
    emoji: "🍗",
    description: "Crispy & tasty",
  },
  {
    name: "African Food",
    emoji: "🍛",
    description: "Local favourites",
  },
  {
    name: "Drinks",
    emoji: "🥤",
    description: "Cold & refreshing",
  },
  {
    name: "Desserts",
    emoji: "🍰",
    description: "Sweet treats",
  },
];

const restaurants = [
  {
    id: "chicken-republic",
    name: "Chicken Republic",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    cuisine: "Chicken • Fast Food",
    rating: "4.8",
    time: "20–30 min",
    fee: "₦800 delivery",
    offer: "20% OFF",
  },
  {
    id: "bukka-hut",
    name: "Bukka Hut",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    cuisine: "African • Nigerian",
    rating: "4.7",
    time: "25–35 min",
    fee: "₦700 delivery",
    offer: "Free delivery",
  },
  {
    id: "the-place",
    name: "The Place",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
    cuisine: "African • Continental",
    rating: "4.6",
    time: "30–40 min",
    fee: "₦900 delivery",
    offer: "15% OFF",
  },
];

const popularMeals = [
  {
    id: "jollof-rice",
    name: "Jollof Rice & Chicken",
    restaurant: "Bukka Hut",
    price: "₦4,500",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "burger",
    name: "Classic Chicken Burger",
    restaurant: "Chicken Republic",
    price: "₦3,800",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fried-chicken",
    name: "Crispy Fried Chicken",
    restaurant: "Chicken Republic",
    price: "₦3,200",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shawarma",
    name: "Chicken Shawarma",
    restaurant: "The Place",
    price: "₦3,500",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-gray-900">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#151515]">
        {/* Decorative shapes */}
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#FF6B35]/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
          {/* Location */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8 flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <FiMapPin className="text-[#FF6B35]" />
            </div>

            <div>
              <p className="text-xs text-gray-400">Delivering to</p>

              <button className="flex items-center gap-1 text-sm font-bold text-white">
                Lagos, Nigeria
                <FiChevronRight className="text-gray-400" />
              </button>
            </div>
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero content */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B35]/30 bg-[#FF6B35]/10 px-4 py-2 text-sm font-semibold text-orange-300">
                <span>⚡</span>
                Fast delivery, right to your door
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Whatever you need.
                <span className="block text-[#FF6B35]">
                  We deliver.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
                Order delicious food from your favourite restaurants and get
                it delivered quickly and safely to your doorstep.
              </p>

              {/* Search */}
              <div className="mt-8 rounded-2xl bg-white p-2 shadow-2xl sm:flex sm:items-center">
                <div className="flex flex-1 items-center gap-3 px-3 py-3">
                  <FiSearch className="text-xl text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search for food or restaurants..."
                    className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>

                <Link
                  href="/restaurants"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  Search
                  <FiArrowRight />
                </Link>
              </div>

              {/* Quick actions */}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/restaurants"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <FiShoppingBag className="text-[#FF6B35]" />
                  Order Food
                </Link>

                <Link
                  href="/send-package"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <FiPackage className="text-[#FF6B35]" />
                  Send a Package
                </Link>
              </div>
            </motion.div>

            {/* Hero visual */}
            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-6 rounded-[3rem] bg-[#FF6B35]/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=85"
                  alt="Door-Step food delivery rider"
                  className="h-[440px] w-full rounded-[2rem] object-cover"
                />

                {/* Floating delivery card */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 left-8 rounded-2xl bg-white p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                      <FiTruck className="text-xl text-green-600" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Your order
                      </p>

                      <p className="text-sm font-bold text-gray-900">
                        Arriving soon
                      </p>
                    </div>

                    <span className="ml-2 h-2.5 w-2.5 rounded-full bg-green-500" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK SERVICES
      ========================================================= */}
      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: <FiShoppingBag />,
                title: "Food Delivery",
                description: "Order from restaurants",
                href: "/restaurants",
              },
              {
                icon: <FiPackage />,
                title: "Send a Package",
                description: "Send items across town",
                href: "/send-package",
              },
              {
                icon: <FiTruck />,
                title: "Track Delivery",
                description: "Follow your order",
                href: "/order-tracking",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:-translate-y-1 hover:border-orange-200 hover:bg-orange-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-[#FF6B35]">
                  {item.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-900">
                    {item.title}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>

                <FiChevronRight className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#FF6B35]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================= */}
      <motion.section
        className="bg-white py-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
                What are you craving?
              </h2>
            </div>

            <Link
              href="/restaurants"
              className="hidden items-center gap-1 text-sm font-bold text-[#FF6B35] sm:flex"
            >
              See all
              <FiArrowRight />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                className="cursor-pointer rounded-2xl border border-gray-100 bg-[#FFF8F3] p-5 text-center transition hover:border-orange-200 hover:shadow-lg"
              >
                <div className="text-4xl">{category.emoji}</div>

                <h3 className="mt-4 text-sm font-black text-gray-900">
                  {category.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* =========================================================
          PROMO
      ========================================================= */}
      <section className="bg-[#FFF8F3] py-4 sm:py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] bg-[#FF6B35] px-6 py-10 sm:px-10 lg:px-14"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-28 right-32 h-64 w-64 rounded-full bg-white/10" />

            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-100">
                  Door-Step Special
                </p>

                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  Get 20% off your first order
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-orange-50 sm:text-base">
                  New to Door-Step? Place your first food order and enjoy a
                  special discount on us.
                </p>
              </div>

              <Link
                href="/restaurants"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#FF6B35] transition hover:bg-orange-50"
              >
                Order Now
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FEATURED RESTAURANTS
      ========================================================= */}
      <motion.section
        className="bg-[#FFF8F3] py-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                Nearby
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
                Featured restaurants
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Popular places delivering around you.
              </p>
            </div>

            <Link
              href="/restaurants"
              className="hidden items-center gap-1 text-sm font-bold text-[#FF6B35] sm:flex"
            >
              View all
              <FiArrowRight />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {restaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                }}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl"
              >
                <Link href={`/restaurants/${restaurant.id}`}>
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-[#FF6B35] px-3 py-1.5 text-xs font-black text-white">
                      {restaurant.offer}
                    </span>
                  </div>

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

                      <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                        <FiStar className="fill-current" />
                        {restaurant.rating}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FiClock />
                        {restaurant.time}
                      </span>

                      <span>{restaurant.fee}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* =========================================================
          POPULAR MEALS
      ========================================================= */}
      <motion.section
        className="bg-white py-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
              Customer favourites
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
              Popular meals
            </h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {popularMeals.map((meal) => (
              <motion.div
                key={meal.id}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                }}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg"
              >
                <Link href="/restaurants">
                  <div className="overflow-hidden">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="h-40 w-full object-cover transition duration-500 hover:scale-105 sm:h-48"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                      <FiStar className="fill-current" />
                      {meal.rating}
                    </div>

                    <h3 className="mt-2 line-clamp-2 text-sm font-black text-gray-900">
                      {meal.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {meal.restaurant}
                    </p>

                    <p className="mt-3 font-black text-[#FF6B35]">
                      {meal.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* =========================================================
          WHY DOOR-STEP
      ========================================================= */}
      <section className="bg-[#151515] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
              Why Door-Step?
            </p>

            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Delivery made simple.
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              From your favourite meal to an important package, Door-Step
              connects you with the people and businesses you need.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: <FiClock />,
                title: "Fast delivery",
                description:
                  "Get your orders delivered quickly by nearby riders.",
              },
              {
                icon: <FiTruck />,
                title: "Reliable riders",
                description:
                  "Our delivery network is designed around safe and dependable delivery.",
              },
              {
                icon: <FiShoppingBag />,
                title: "More than food",
                description:
                  "Order food, send packages and access more delivery services.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B35]/10 text-xl text-[#FF6B35]">
                  {item.icon}
                </div>

                <h3 className="mt-5 font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PARTNER CTA
      ========================================================= */}
      <section className="bg-[#FFF8F3] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white p-7 shadow-sm sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                Grow with Door-Step
              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-950">
                Own a restaurant?
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Join Door-Step and reach more customers while our delivery
                network takes care of getting orders to their doorstep.
              </p>
            </div>

            <Link
              href="/partner/register"
              className="mt-7 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#151515] px-7 py-4 font-bold text-white transition hover:bg-[#FF6B35] lg:mt-0"
            >
              Become a Partner
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          MOBILE BOTTOM NAV
      ========================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-2 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around">
          {[
            {
              href: "/",
              icon: <FiShoppingBag />,
              label: "Home",
            },
            {
              href: "/restaurants",
              icon: <FiSearch />,
              label: "Explore",
            },
            {
              href: "/cart",
              icon: <FiShoppingBag />,
              label: "Cart",
            },
            {
              href: "/profile",
              icon: <FiPackage />,
              label: "Orders",
            },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-2 text-gray-500 transition hover:text-[#FF6B35]"
            >
              <span className="text-lg">{item.icon}</span>

              <span className="text-[10px] font-bold">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom-nav spacing on mobile */}
      <div className="h-16 lg:hidden" />
    </main>
  );
}
