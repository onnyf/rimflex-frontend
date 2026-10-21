"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";



import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiShoppingBag,
  FiTruck,
  FiUsers,
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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const contactOptions = [
    {
      icon: <FiMessageCircle />,
      title: "Customer Support",
      description:
        "Need help with an order, delivery, payment or your Door-Step account?",
      action: "Get Customer Support",
      href: "mailto:support@doorstep.ng",
    },
    {
      icon: <FiShoppingBag />,
      title: "Restaurant Partners",
      description:
        "Interested in listing your restaurant and reaching more customers?",
      action: "Become a Partner",
      href: "/partner/register",
    },
    {
      icon: <FiTruck />,
      title: "Rider Support",
      description:
        "Are you a rider looking for delivery opportunities or assistance?",
      action: "Rider Support",
      href: "/rider/login",
    },
    {
      icon: <FiUsers />,
      title: "Business Delivery",
      description:
        "Looking for reliable delivery solutions for your business?",
      action: "Talk to Us",
      href: "mailto:business@doorstep.ng",
    },
  ];

  const faqs = [
    {
      question: "How can I contact Door-Step about an order?",
      answer:
        "Use the contact form on this page or reach out to our customer support team with your order details.",
    },
    {
      question: "Can my restaurant join Door-Step?",
      answer:
        "Yes. Restaurants can register as Door-Step partners and manage their menu, orders and business profile through the partner platform.",
    },
    {
      question: "How can I become a Door-Step rider?",
      answer:
        "Riders can register through the rider registration page and provide the required personal and verification information.",
    },
    {
      question: "Can businesses use Door-Step for deliveries?",
      answer:
        "Yes. Door-Step is designed to support business deliveries in addition to customer food and package deliveries.",
    },
  ];

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <motion.div
            className="max-w-3xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-400">
              <FiMessageCircle />
              Contact Door-Step
            </div>

            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              We&apos;re here to
              <span className="block text-orange-400">
                help.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400 sm:text-xl">
              Have a question, need help with an order or want to work with
              Door-Step? Send us a message and our team will get back to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="bg-[#FFF8F3] py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          {/* CONTACT INFORMATION */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Get In Touch
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Let&apos;s talk.
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Whether you are a customer, restaurant, rider or business,
              we&apos;d love to hear from you.
            </p>

            <div className="mt-8 space-y-4">
              <motion.a
                href="mailto:support@doorstep.ng"
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-500">
                  <FiMail />
                </span>

                <span>
                  <span className="block font-bold text-gray-950">
                    Email
                  </span>

                  <span className="mt-1 block text-sm text-gray-600">
                    support@doorstep.ng
                  </span>
                </span>
              </motion.a>

              <motion.a
                href="tel:+2340000000000"
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-500">
                  <FiPhone />
                </span>

                <span>
                  <span className="block font-bold text-gray-950">
                    Phone
                  </span>

                  <span className="mt-1 block text-sm text-gray-600">
                    +234 000 000 0000
                  </span>
                </span>
              </motion.a>

              <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-500">
                  <FiMapPin />
                </span>

                <span>
                  <span className="block font-bold text-gray-950">
                    Location
                  </span>

                  <span className="mt-1 block text-sm leading-6 text-gray-600">
                    Lagos, Nigeria
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-500">
                  <FiClock />
                </span>

                <span>
                  <span className="block font-bold text-gray-950">
                    Support Hours
                  </span>

                  <span className="mt-1 block text-sm leading-6 text-gray-600">
                    Monday - Saturday
                    <br />
                    8:00 AM - 8:00 PM
                  </span>
                </span>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="mt-8 rounded-3xl bg-gray-950 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-orange-400">
                Quick Help
              </p>

              <div className="mt-5 space-y-3">
                <Link
                  href="/profile/orders"
                  className="flex items-center justify-between rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:bg-orange-500 hover:text-white"
                >
                  <span>My Orders</span>
                  <FiArrowRight />
                </Link>

                <Link
                  href="/restaurants"
                  className="flex items-center justify-between rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:bg-orange-500 hover:text-white"
                >
                  <span>Browse Restaurants</span>
                  <FiArrowRight />
                </Link>

                <Link
                  href="/send-package"
                  className="flex items-center justify-between rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:bg-orange-500 hover:text-white"
                >
                  <span>Send a Package</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.1 }}
          >
            <div className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-xl sm:p-9">
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-orange-500">
                  Send A Message
                </p>

                <h2 className="mt-2 text-2xl font-black text-gray-950 sm:text-3xl">
                  How can we help?
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Fill in the form below and tell us what you need help with.
                </p>
              </div>

              {submitted && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0 text-xl text-green-600" />

                  <div>
                    <p className="font-bold text-green-800">
                      Message received!
                    </p>

                    <p className="mt-1 text-sm leading-6 text-green-700">
                      Thank you for contacting Door-Step. We&apos;ll get back
                      to you as soon as possible.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-gray-800"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-gray-800"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-bold text-gray-800"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234..."
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-bold text-gray-800"
                    >
                      What can we help with?
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-950 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                    >
                      <option value="">Select a topic</option>
                      <option value="Order Support">
                        Order Support
                      </option>
                      <option value="Payment">
                        Payment Issue
                      </option>
                      <option value="Delivery">
                        Delivery Issue
                      </option>
                      <option value="Restaurant Partnership">
                        Restaurant Partnership
                      </option>
                      <option value="Rider Support">
                        Rider Support
                      </option>
                      <option value="Business Delivery">
                        Business Delivery
                      </option>
                      <option value="Account">
                        Account Help
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-bold text-gray-800"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    rows={7}
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm leading-6 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-400"
                >
                  Send Message
                  <FiSend />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Need Something Else?
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Choose the right Door-Step team.
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Select the option that best matches what you need.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {contactOptions.map((option) => (
              <motion.div
                key={option.title}
                variants={cardAnimation}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-500">
                  {option.icon}
                </div>

                <h3 className="mt-6 text-xl font-black text-gray-950">
                  {option.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                  {option.description}
                </p>

                <Link
                  href={option.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-500 transition hover:text-orange-600"
                >
                  {option.action}
                  <FiArrowRight />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Frequently Asked Questions
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Common questions
            </h2>
          </motion.div>

          <motion.div
            className="mt-10 space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faqs.map((faq) => (
              <motion.details
                key={faq.question}
                variants={cardAnimation}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <summary className="cursor-pointer list-none pr-8 font-bold text-gray-950 marker:hidden">
                  <div className="flex items-center justify-between gap-4">
                    <span>{faq.question}</span>

                    <span className="text-2xl font-normal text-orange-500 transition group-open:rotate-45">
                      +
                    </span>
                  </div>
                </summary>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gray-950 py-20 lg:py-24">
        <motion.div
          className="mx-auto max-w-4xl px-6 text-center lg:px-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <FiTruck className="mx-auto text-5xl text-orange-400" />

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Whatever you need.
            <span className="block text-orange-400">
              We deliver.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-400">
            Ready to order something or send a package? Get started with
            Door-Step today.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
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

            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

export default ContactPage;
