
import Link from "next/link";
import {
  FiArrowUpRight,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const services = [
  { name: "Order Food", href: "/#restaurants" },
  { name: "Send a Package", href: "/#send-package" },
  { name: "Shop & Deliver", href: "/#shop-deliver" },
  { name: "Business Delivery", href: "/#business-delivery" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Become a Rider", href: "/rider" },
  { name: "Partner with Us", href: "/partner" },
];

export default function Footer() {
  return (
    <footer className="bg-[#151515] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-3xl font-extrabold tracking-tight"
            >
              Door<span className="text-[#FF6B35]">-Step</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              Whatever you need. We deliver it. Order food, send packages,
              shop for essentials, or grow your business with Door-Step.
            </p>

            {/* Socials */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#FF6B35] hover:bg-[#FF6B35]"
              >
                <FiFacebook size={17} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#FF6B35] hover:bg-[#FF6B35]"
              >
                <FiInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#FF6B35] hover:bg-[#FF6B35]"
              >
                <FiTwitter size={17} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Services
            </h3>

            <ul className="mt-5 space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group flex items-center gap-1 text-sm text-white/60 transition hover:text-[#FF6B35]"
                  >
                    {service.name}
                    <FiArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-4">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1 text-sm text-white/60 transition hover:text-[#FF6B35]"
                  >
                    {item.name}
                    <FiArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in touch
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#FF6B35]"
                />

                <p className="text-sm leading-6 text-white/60">
                  Lagos, Nigeria
                </p>
              </div>

              <a
                href="tel:+2340000000000"
                className="flex items-center gap-3 text-sm text-white/60 transition hover:text-[#FF6B35]"
              >
                <FiPhone size={17} className="text-[#FF6B35]" />
                +234 000 000 0000
              </a>

              <a
                href="mailto:hello@door-step.com"
                className="flex items-center gap-3 text-sm text-white/60 transition hover:text-[#FF6B35]"
              >
                <FiMail size={17} className="text-[#FF6B35]" />
                hello@door-step.com
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter / CTA */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold">
                Ready to get things moving?
              </h3>

              <p className="mt-2 text-sm text-white/50">
                From dinner to doorstep deliveries, Door-Step has you covered.
              </p>
            </div>

            <Link
              href="/#services"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#151515]"
            >
              Get Started
              <FiArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Door-Step. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
