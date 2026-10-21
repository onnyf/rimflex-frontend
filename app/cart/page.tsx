
"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/ShoppingCartContext";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiMapPin,
  FiShield,
} from "react-icons/fi";

const formatNaira = (amount: number) => {
  return `₦${amount.toLocaleString("en-NG")}`;
};

export default function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    serviceFee,
    total,
  } = useCart();

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      <Navbar />

      {/* Header */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/restaurants"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Continue shopping
          </Link>

          <h1 className="text-3xl font-black tracking-tight text-[#151515] sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your items before proceeding to checkout.
          </p>
        </div>
      </section>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <section className="flex min-h-[55vh] items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0E9]">
              <FiShoppingBag
                size={34}
                className="text-[#FF6B35]"
              />
            </div>

            <h2 className="mt-6 text-2xl font-black text-[#151515]">
              Your cart is empty
            </h2>

            <p className="mt-3 leading-7 text-gray-500">
              You haven't added anything to your cart yet. Explore
              restaurants and find something delicious.
            </p>

            <Link
              href="/restaurants"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3.5 font-bold text-white transition hover:bg-[#e95b2b]"
            >
              Explore Restaurants
              <FiArrowRight />
            </Link>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
            {/* Cart Items */}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#151515]">
                    Cart Items
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {cartItems.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}{" "}
                    item
                    {cartItems.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    ) !== 1
                      ? "s"
                      : ""}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.restaurantId}-${item.id}`}
                    className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="truncate text-base font-extrabold text-[#151515] sm:text-lg">
                              {item.name}
                            </h3>

                            <p className="mt-1 text-sm font-medium text-[#FF6B35]">
                              {item.restaurantName}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>

                        {item.description && (
                          <p className="mt-2 hidden max-w-xl text-sm leading-6 text-gray-500 sm:block">
                            {item.description}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-base font-black text-[#151515]">
                            {formatNaira(item.price)}
                          </p>

                          {/* Quantity */}
                          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              aria-label={`Decrease ${item.name} quantity`}
                              className="flex h-9 w-9 items-center justify-center rounded-l-xl text-gray-600 transition hover:bg-gray-200"
                            >
                              <FiMinus size={15} />
                            </button>

                            <span className="flex h-9 min-w-9 items-center justify-center px-2 text-sm font-bold text-[#151515]">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              aria-label={`Increase ${item.name} quantity`}
                              className="flex h-9 w-9 items-center justify-center rounded-r-xl text-gray-600 transition hover:bg-gray-200"
                            >
                              <FiPlus size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                    <FiMapPin size={20} />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#151515]">
                      Delivery location
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Your delivery address can be confirmed during
                      checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
                <h2 className="text-xl font-black text-[#151515]">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-[#151515]">
                      {formatNaira(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Delivery fee
                    </span>
                    <span className="font-semibold text-[#151515]">
                      {formatNaira(deliveryFee)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Service fee
                    </span>
                    <span className="font-semibold text-[#151515]">
                      {formatNaira(serviceFee)}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#151515]">
                        Total
                      </span>

                      <span className="text-2xl font-black text-[#FF6B35]">
                        {formatNaira(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-4 font-bold text-white transition hover:bg-[#e95b2b]"
                >
                  Continue to Checkout
                  <FiArrowRight />
                </Link>

                <Link
                  href="/restaurants"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-bold text-[#151515] transition hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>

                {/* Security */}
                <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#F7F8F8] p-4">
                  <FiShield
                    className="mt-0.5 flex-shrink-0 text-green-600"
                    size={18}
                  />

                  <p className="text-xs leading-5 text-gray-500">
                    Your order information is protected. Payment
                    details will be securely processed during checkout.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
