
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiShoppingBag,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const router = useRouter();

  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      setIsProfileOpen(false);
      setIsMenuOpen(false);

      router.push("/login");
    } catch (error) {
      console.error("Logout failed. Please try again.", error);
      window.alert("Logout failed. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-xl">
            ðŸš´
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#151515]">
              Door<span className="text-[#FF6B35]">-Step</span>
            </h1>

            <p className="hidden text-[10px] font-medium text-gray-400 sm:block">
              Whatever you need. We deliver.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-[#FF6B35]"
          >
            Home
          </Link>

          <Link
            href="/#restaurants"
            className="text-sm font-medium text-gray-700 transition hover:text-[#FF6B35]"
          >
            Restaurants
          </Link>

          <Link
            href="/#services"
            className="text-sm font-medium text-gray-700 transition hover:text-[#FF6B35]"
          >
            Services
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 transition hover:text-[#FF6B35]"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-gray-700 transition hover:text-[#FF6B35]"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-[#151515] transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
            aria-label="Shopping cart"
          >
            <FiShoppingBag size={19} />
          </Link>

          {!isLoading && isAuthenticated && user ? (
            /* Logged In */
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pl-1.5 pr-3 transition hover:border-[#FF6B35]"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B35] text-sm font-bold text-white">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>

                <span className="max-w-[110px] truncate text-sm font-semibold text-[#151515]">
                  {user.fullName.split(" ")[0]}
                </span>

                <FiChevronDown
                  size={15}
                  className={`transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">

                  {/* User Info */}
                  <div className="border-b border-gray-100 bg-[#FFF8F3] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6B35] font-bold text-white">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#151515]">
                          {user.fullName}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu */}
                  <div className="p-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
                    >
                      <FiUser size={17} />
                      My Profile
                    </Link>

                    <Link
                      href="/profile#orders"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
                    >
                      <FiShoppingBag size={17} />
                      My Orders
                    </Link>

                    <Link
                      href="/profile#settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
                    >
                      âš™ï¸
                      Settings
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <FiLogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out */
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#151515] transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e85b2b]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 lg:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={21} /> : <FiMenu size={21} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
            >
              Home
            </Link>

            <Link
              href="/#restaurants"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
            >
              Restaurants
            </Link>

            <Link
              href="/#services"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
            >
              Services
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
            >
              Contact
            </Link>

            <div className="my-2 border-t border-gray-100" />

            {/* Mobile Cart */}
            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
            >
              <FiShoppingBag size={18} />
              Cart
            </Link>

            {!isLoading && isAuthenticated && user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#FF6B35] hover:bg-[#FFF8F3]"
                >
                  <FiUser size={18} />
                  {user.fullName}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#151515] hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl bg-[#FF6B35] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Create Account
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
