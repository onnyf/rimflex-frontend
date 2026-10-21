
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiTruck,
  FiUsers,
  FiHeart,
  FiShield,
} from "react-icons/fi";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardAnimation = {
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

const services = [
  {
    icon: <FiShoppingBag />,
    title: "Food Delivery",
    description:
      "Order meals, snacks and drinks from restaurants around you and have them delivered to your doorstep.",
  },
  {
    icon: <FiPackage />,
    title: "Send a Package",
    description:
      "Send documents, parcels, gifts and other items from one location to another with Door-Step.",
  },
  {
    icon: <FiTruck />,
    title: "Shop & Deliver",
    description:
      "Need something from a store? Door-Step can help you get what you need and bring it to you.",
  },
  {
    icon: <FiUsers />,
    title: "Business Delivery",
    description:
      "Businesses can use Door-Step to handle deliveries to customers, offices and other locations.",
  },
];

const values = [
  {
    icon: <FiClock />,
    title: "Convenience",
    description:
      "We make everyday deliveries easier by bringing food, packages and useful services closer to you.",
  },
  {
    icon: <FiShield />,
    title: "Trust & Safety",
    description:
      "We are building a platform where customers, restaurants, businesses and riders can interact with confidence.",
  },
  {
    icon: <FiHeart />,
    title: "Customer First",
    description:
      "Every part of the Door-Step experience is designed around making delivery simple and useful for customers.",
  },
  {
    icon: <FiMapPin />,
    title: "Local Connection",
    description:
      "We connect customers with restaurants, stores, businesses and riders within their communities.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose what you need",
    description:
      "Order food, send a package, shop for an item or arrange a business delivery.",
  },
  {
    number: "02",
    title: "Provide the details",
    description:
      "Enter your delivery address, order information and any instructions required.",
  },
  {
    number: "03",
    title: "We connect the right people",
    description:
      "Door-Step connects your request with a restaurant, business or available rider.",
  },
  {
    number: "04",
    title: "Track your delivery",
    description:
      "Follow the progress of your order or delivery until it reaches its destination.",
  },
];

function AboutPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div
            className="max-w-4xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-400">
              <FiTruck />
              About Door-Step
            </div>

            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Whatever you need.
              <span className="block text-orange-400">
                We deliver.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl">
              Door-Step is a delivery platform designed to make everyday
              deliveries simple, convenient and accessible. From your
              favourite meal to a package that needs to reach someone,
              we connect customers with the people and businesses that
              can get it done.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/restaurants"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-400"
              >
                Order Food
                <FiArrowRight />
              </Link>

              <Link
                href="/send-package"
                className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-7 py-4 font-bold text-white transition hover:border-orange-400 hover:text-orange-400"
              >
                Send a Package
                <FiPackage />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              More than just food delivery.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Door-Step is being built as a multi-service delivery platform
              that brings customers, restaurants, businesses and riders
              together in one connected ecosystem.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              Whether you want to order lunch from a nearby restaurant, send
              a package across town, get something from a store or arrange
              deliveries for your business, Door-Step is designed to make
              the process easier.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              Our goal is to remove unnecessary stress from everyday
              deliveries while creating opportunities for restaurants,
              businesses and riders to grow.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-orange-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] bg-gray-950 p-8 shadow-2xl sm:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-3xl text-white">
                <FiTruck />
              </div>

              <h3 className="mt-8 text-3xl font-black text-white">
                One platform.
                <span className="block text-orange-400">
                  Multiple possibilities.
                </span>
              </h3>

              <p className="mt-5 leading-7 text-gray-400">
                Door-Step is designed to grow beyond a traditional food
                delivery service and become a useful everyday delivery
                platform.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Customers",
                  "Restaurants",
                  "Riders",
                  "Businesses",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <FiCheckCircle className="shrink-0 text-orange-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#FFF8F3] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Delivery for everyday life
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Door-Step brings different delivery needs together in one
              simple platform.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service) => (
              <motion.article
                key={service.title}
                variants={cardAnimation}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-500">
                  {service.icon}
                </div>

                <h3 className="mt-6 text-xl font-black text-gray-950">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {service.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="max-w-2xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Simple from start to finish.
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              We are building Door-Step around a straightforward delivery
              experience.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={cardAnimation}
                className="relative rounded-3xl border border-gray-200 bg-gray-50 p-7"
              >
                <span className="text-5xl font-black text-orange-100">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-black text-gray-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-gray-950 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="max-w-2xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              What Matters To Us
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Built around people and convenience.
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              The Door-Step experience is guided by a few principles that
              shape how the platform is designed.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {values.map((value) => (
              <motion.article
                key={value.title}
                variants={cardAnimation}
                whileHover={{ y: -7 }}
                className="rounded-3xl border border-gray-800 bg-gray-900 p-7"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl text-orange-400">
                  {value.icon}
                </div>

                <h3 className="mt-6 text-xl font-black text-white">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {value.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              One Connected Ecosystem
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Everyone has a place on Door-Step.
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Door-Step is designed to create value across the delivery
              ecosystem.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                icon: <FiUsers />,
                title: "For Customers",
                description:
                  "Discover restaurants, order what you need, send packages and keep track of your deliveries.",
              },
              {
                icon: <FiShoppingBag />,
                title: "For Restaurants",
                description:
                  "Reach more customers, manage your menu, receive orders and grow your delivery business.",
              },
              {
                icon: <FiTruck />,
                title: "For Riders",
                description:
                  "Access delivery opportunities, manage jobs and build a reliable income through deliveries.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={cardAnimation}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-500">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-2xl font-black text-gray-950">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFF8F3] py-20 lg:py-24">
        <motion.div
          className="mx-auto max-w-4xl px-6 text-center lg:px-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-3xl text-white shadow-lg">
            <FiTruck />
          </div>

          <h2 className="mt-7 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
            Ready to use Door-Step?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
            Whether you are ordering your next meal, sending a package or
            looking for a delivery partner for your business, Door-Step is
            being built to make it easier.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/restaurants"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-400"
            >
              Explore Restaurants
              <FiArrowRight />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-4 font-bold text-gray-950 transition hover:border-orange-400 hover:text-orange-500"
            >
              Contact Us
              <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

export default AboutPage;
