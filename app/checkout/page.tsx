
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/ShoppingCartContext";
import { useAuth } from "@/context/AuthContext";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiUser,
  FiCreditCard,
  FiShield,
  FiShoppingBag,
  FiHome,
  FiBriefcase,
  FiPlus,
  FiCheck,
  FiMoreHorizontal,
  FiTag,
  FiX,
} from "react-icons/fi";

const formatNaira = (amount: number) => {
  return `₦${amount.toLocaleString("en-NG")}`;
};

type PaymentMethod =
  | "card"
  | "transfer"
  | "wallet"
  | "cash";

type AddressType = "home" | "work" | "other";

type SavedAddress = {
  id: string;
  type: AddressType;
  label: string;
  address: string;
  landmark: string;
  phone: string;
  isDefault: boolean;
  createdAt: string;
};

type PromotionType =
  | "percentage"
  | "fixed"
  | "free_delivery";

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
};

const SAVED_ADDRESSES_KEY = "doorstep_saved_addresses";

const PROMOTIONS: Promotion[] = [
  {
    id: "welcome20",
    code: "WELCOME20",
    title: "20% Off Your Order",
    description:
      "Enjoy 20% off your food order.",
    type: "percentage",
    value: 20,
    minimumOrder: 5000,
    maximumDiscount: 5000,
    expiresAt: "2026-10-15",
  },
  {
    id: "food1500",
    code: "FOOD1500",
    title: "₦1,500 Off",
    description:
      "Get ₦1,500 off when you spend at least ₦10,000.",
    type: "fixed",
    value: 1500,
    minimumOrder: 10000,
    expiresAt: "2026-10-20",
  },
  {
    id: "freedelivery",
    code: "FREEDRIVE",
    title: "Free Delivery",
    description:
      "Enjoy free delivery on eligible orders.",
    type: "free_delivery",
    value: 0,
    minimumOrder: 7000,
    expiresAt: "2026-10-25",
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
  },
];

function getAddressIcon(type: AddressType) {
  if (type === "home") {
    return <FiHome />;
  }

  if (type === "work") {
    return <FiBriefcase />;
  }

  return <FiMoreHorizontal />;
}

function getTodayDate() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

export default function CheckoutPage() {
  const router = useRouter();

  const { user, isAuthenticated, isLoading } = useAuth();

  const {
    cartItems,
    subtotal,
    deliveryFee,
    serviceFee,
    total,
  } = useCart();

  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  const [savedAddresses, setSavedAddresses] = useState<
    SavedAddress[]
  >([]);

  const [selectedAddressId, setSelectedAddressId] =
    useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("card");

  const [isPlacingOrder, setIsPlacingOrder] =
    useState(false);

  /* PROMOTION STATE */
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromotion, setAppliedPromotion] =
    useState<Promotion | null>(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  /*
   * Keep the phone number synchronized with
   * the authenticated user's profile.
   */
  useEffect(() => {
    if (user?.phone && !phone) {
      setPhone(user.phone);
    }
  }, [user, phone]);

  /*
   * Load saved addresses.
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        SAVED_ADDRESSES_KEY
      );

      if (!saved) {
        return;
      }

      const parsed: SavedAddress[] = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return;
      }

      setSavedAddresses(parsed);

      /*
       * Automatically select the saved default address.
       */
      const defaultAddress = parsed.find(
        (item) => item.isDefault
      );

      if (defaultAddress) {
        applySavedAddress(defaultAddress);
      }
    } catch (error) {
      console.error(
        "Failed to load saved addresses:",
        error
      );
    }
  }, []);

  /*
   * Apply a saved address to checkout.
   */
  const applySavedAddress = (
    savedAddress: SavedAddress
  ) => {
    setSelectedAddressId(savedAddress.id);

    setAddress(savedAddress.address);

    setLandmark(savedAddress.landmark || "");

    if (savedAddress.phone) {
      setPhone(savedAddress.phone);
    }
  };

  /*
   * Clear the selected saved address when the
   * customer manually changes the address.
   */
  const handleAddressChange = (
    value: string
  ) => {
    setAddress(value);

    setSelectedAddressId(null);
  };

  /*
   * Calculate promotion discount.
   */
  const getPromotionDiscount = (
    promotion: Promotion
  ) => {
    if (subtotal < promotion.minimumOrder) {
      return 0;
    }

    if (promotion.type === "percentage") {
      const percentageDiscount =
        (subtotal * promotion.value) / 100;

      if (promotion.maximumDiscount) {
        return Math.min(
          percentageDiscount,
          promotion.maximumDiscount
        );
      }

      return percentageDiscount;
    }

    if (promotion.type === "fixed") {
      return Math.min(
        promotion.value,
        subtotal
      );
    }

    /*
     * free_delivery
     *
     * value = 0 means completely free delivery.
     * value > 0 means a fixed amount is removed
     * from the delivery fee.
     */
    if (promotion.value === 0) {
      return deliveryFee;
    }

    return Math.min(
      promotion.value,
      deliveryFee
    );
  };

  /*
   * Apply promotion code.
   */
  const handleApplyPromo = () => {
    setPromoError("");
    setPromoSuccess("");

    const normalizedCode = promoCode
      .trim()
      .toUpperCase();

    if (!normalizedCode) {
      setPromoError(
        "Please enter a promo code."
      );

      return;
    }

    const promotion = PROMOTIONS.find(
      (item) =>
        item.code.toUpperCase() ===
        normalizedCode
    );

    if (!promotion) {
      setPromoError(
        "Invalid promo code. Please check the code and try again."
      );

      return;
    }

    /*
     * Check expiry.
     */
    const today = getTodayDate();

    const expiryDate = new Date(
      promotion.expiresAt
    );

    expiryDate.setHours(23, 59, 59, 999);

    if (expiryDate < today) {
      setPromoError(
        "This promo code has expired."
      );

      return;
    }

    /*
     * Check minimum order.
     */
    if (subtotal < promotion.minimumOrder) {
      setPromoError(
        `Minimum order for ${promotion.code} is ${formatNaira(
          promotion.minimumOrder
        )}.`
      );

      return;
    }

    const discount =
      getPromotionDiscount(promotion);

    if (discount <= 0) {
      setPromoError(
        "This promotion cannot be applied to your current order."
      );

      return;
    }

    setAppliedPromotion(promotion);

    setPromoSuccess(
      `${promotion.code} applied successfully. You saved ${formatNaira(
        discount
      )}.`
    );
  };

  /*
   * Remove applied promotion.
   */
  const handleRemovePromo = () => {
    setAppliedPromotion(null);
    setPromoCode("");
    setPromoError("");
    setPromoSuccess("");
  };

  /*
   * Current promotion discount.
   */
  const promoDiscount = appliedPromotion
    ? getPromotionDiscount(appliedPromotion)
    : 0;

  /*
   * Final order total after promotion.
   *
   * We calculate this from the original
   * subtotal + delivery + service fee instead
   * of changing the ShoppingCartContext.
   */
  const finalTotal = Math.max(
    0,
    subtotal +
      deliveryFee +
      serviceFee -
      promoDiscount
  );

  /*
   * Place Order
   */
  const handlePlaceOrder = async () => {
    if (isPlacingOrder) {
      return;
    }

    if (!user || !isAuthenticated) {
      alert("Please log in before placing your order.");
      return;
    }

    if (!address.trim()) {
      alert(
        "Please enter your delivery address."
      );

      return;
    }

    if (!phone.trim()) {
      alert(
        "Please enter your phone number."
      );

      return;
    }

    /*
     * Make sure the promotion is still valid
     * immediately before placing the order.
     */
    if (appliedPromotion) {
      const today = getTodayDate();

      const expiryDate = new Date(
        appliedPromotion.expiresAt
      );

      expiryDate.setHours(
        23,
        59,
        59,
        999
      );

      if (
        expiryDate < today ||
        subtotal <
          appliedPromotion.minimumOrder
      ) {
        setAppliedPromotion(null);
        setPromoError(
          "The applied promotion is no longer valid for this order."
        );

        return;
      }
    }

    setIsPlacingOrder(true);

    try {
      /*
       * Demo processing delay.
       *
       * Later this will be replaced with:
       * - Payment gateway
       * - Backend order creation
       * - Payment verification
       */
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      /*
       * Generate a Door-Step order number.
       */
      const orderNumber = `DS-${new Date().getFullYear()}-${Math.floor(
        10000 + Math.random() * 90000
      )}`;

      /*
       * Create the order.
       */
      const order = {
        orderNumber,

        customer: {
          name: user.fullName,
          email: user.email,
          phone,
        },

        items: cartItems,

        subtotal,
        deliveryFee,
        serviceFee,

        /*
         * Promotion information.
         */
        promotion: appliedPromotion
          ? {
              code: appliedPromotion.code,
              title: appliedPromotion.title,
              type: appliedPromotion.type,
              discount: promoDiscount,
            }
          : null,

        promoDiscount,

        /*
         * Final amount after promotion.
         */
        total: finalTotal,

        delivery: {
          address,
          landmark,
          note: deliveryNote,
        },

        paymentMethod,

        status: "confirmed" as const,

        createdAt: new Date().toISOString(),

        estimatedDelivery:
          "25 – 35 minutes",
      };

      /*
       * Save current order.
       *
       * Order Success and Order Tracking
       * will read this information.
       */
      localStorage.setItem(
        "doorstep_current_order",
        JSON.stringify(order)
      );

      /*
       * Save order into a simple local order history.
       *
       * This will later be replaced by the backend.
       */
      const existingOrders =
        localStorage.getItem(
          "doorstep_orders"
        );

      const previousOrders = existingOrders
        ? JSON.parse(existingOrders)
        : [];

      localStorage.setItem(
        "doorstep_orders",
        JSON.stringify([
          order,
          ...previousOrders,
        ])
      );

      /*
       * Go to Order Success.
       */
      router.push("/order-success");
    } catch (error) {
      console.error(
        "Failed to place order:",
        error
      );

      alert(
        "Something went wrong while placing your order. Please try again."
      );

      setIsPlacingOrder(false);
    }
  };

  /*
   * Protect checkout while authentication
   * information is loading.
   */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FFF8F3]">
        <Navbar />

        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#FF6B35]/20 border-t-[#FF6B35]" />

            <p className="mt-4 text-sm font-medium text-gray-500">
              Loading checkout...
            </p>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  /*
   * Require login.
   */
  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-screen bg-[#FFF8F3]">
        <Navbar />

        <section className="flex min-h-[65vh] items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0E9]">
              <FiUser
                size={32}
                className="text-[#FF6B35]"
              />
            </div>

            <h1 className="mt-6 text-2xl font-black text-[#151515]">
              Login required
            </h1>

            <p className="mt-3 leading-7 text-gray-500">
              Please login to your Door-Step account before
              continuing with your order.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3.5 font-bold text-white transition hover:bg-[#e95b2b]"
            >
              Login to Continue
              <FiArrowRight />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /*
   * Prevent checkout when cart is empty.
   */
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF8F3]">
        <Navbar />

        <section className="flex min-h-[65vh] items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0E9]">
              <FiShoppingBag
                size={32}
                className="text-[#FF6B35]"
              />
            </div>

            <h1 className="mt-6 text-2xl font-black text-[#151515]">
              Your cart is empty
            </h1>

            <p className="mt-3 leading-7 text-gray-500">
              Add some items to your cart before continuing
              to checkout.
            </p>

            <Link
              href="/restaurants"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3.5 font-bold text-white transition hover:bg-[#e95b2b]"
            >
              Browse Restaurants
              <FiArrowRight />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to Cart
          </Link>

          <div className="mt-5">
            <h1 className="text-3xl font-black tracking-tight text-[#151515] sm:text-4xl">
              Checkout
            </h1>

            <p className="mt-2 text-gray-500">
              Confirm your delivery details and payment method.
            </p>
          </div>
        </div>
      </section>

      {/* CHECKOUT */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_390px]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* DELIVERY ADDRESS */}
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                  <FiMapPin size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-[#151515]">
                    Delivery Address
                  </h2>

                  <p className="text-sm text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              {/* SAVED ADDRESSES */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-[#151515]">
                    Saved addresses
                  </p>

                  <Link
                    href="/profile/addresses"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6B35] transition hover:text-[#e95b2b]"
                  >
                    <FiPlus />
                    Manage Addresses
                  </Link>
                </div>

                {savedAddresses.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {savedAddresses.map(
                      (savedAddress) => (
                        <button
                          key={savedAddress.id}
                          type="button"
                          onClick={() =>
                            applySavedAddress(
                              savedAddress
                            )
                          }
                          className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                            selectedAddressId ===
                            savedAddress.id
                              ? "border-[#FF6B35] bg-[#FFF8F3] ring-1 ring-[#FF6B35]"
                              : "border-gray-200 hover:border-[#FF6B35] hover:bg-[#FFF8F3]"
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              selectedAddressId ===
                              savedAddress.id
                                ? "bg-[#FF6B35] text-white"
                                : "bg-[#FFF0E9] text-[#FF6B35]"
                            }`}
                          >
                            {getAddressIcon(
                              savedAddress.type
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-sm font-bold text-[#151515]">
                                {savedAddress.label}
                              </p>

                              {savedAddress.isDefault && (
                                <span className="shrink-0 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-[#FF6B35]">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                              {savedAddress.address}
                            </p>

                            {savedAddress.landmark && (
                              <p className="mt-1 line-clamp-1 text-[11px] text-gray-400">
                                {savedAddress.landmark}
                              </p>
                            )}
                          </div>

                          {selectedAddressId ===
                            savedAddress.id && (
                            <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B35] text-white">
                              <FiCheck size={12} />
                            </div>
                          )}
                        </button>
                      )
                    )}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5">
                    <div className="flex items-start gap-3">
                      <FiMapPin className="mt-0.5 shrink-0 text-[#FF6B35]" />

                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#151515]">
                          No saved addresses
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Save your Home, Work or Other address
                          for faster checkout next time.
                        </p>

                        <Link
                          href="/profile/addresses"
                          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#FF6B35]"
                        >
                          <FiPlus />
                          Add an Address
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* FULL ADDRESS */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-bold text-[#151515]">
                  Full delivery address
                </label>

                <textarea
                  value={address}
                  onChange={(event) =>
                    handleAddressChange(
                      event.target.value
                    )
                  }
                  placeholder="House number, street, area, city..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10"
                />
              </div>

              {/* LANDMARK */}
              <div className="mt-4">
                <label className="mb-2 block text-sm font-bold text-[#151515]">
                  Landmark
                  <span className="ml-1 font-normal text-gray-400">
                    (optional)
                  </span>
                </label>

                <input
                  type="text"
                  value={landmark}
                  onChange={(event) =>
                    setLandmark(event.target.value)
                  }
                  placeholder="E.g. beside a filling station"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10"
                />
              </div>
            </div>

            {/* CONTACT */}
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                  <FiPhone size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-[#151515]">
                    Contact Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    The rider may call you during delivery.
                  </p>
                </div>
              </div>

              <input
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="0800 000 0000"
                autoComplete="tel"
                className="mt-6 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-[#151515] outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10"
              />

              <div className="mt-4 rounded-xl bg-[#F7F8F8] p-4">
                <div className="flex items-start gap-3">
                  <FiUser className="mt-0.5 text-gray-500" />

                  <div>
                    <p className="text-sm font-bold text-[#151515]">
                      {user.fullName}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DELIVERY INSTRUCTIONS */}
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-lg font-black text-[#151515]">
                Delivery Instructions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add anything that can help the rider find you.
              </p>

              <textarea
                value={deliveryNote}
                onChange={(event) =>
                  setDeliveryNote(event.target.value)
                }
                placeholder="E.g. Call me when you arrive..."
                rows={4}
                className="mt-5 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10"
              />
            </div>

            {/* PAYMENT */}
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-[#FF6B35]">
                  <FiCreditCard size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-[#151515]">
                    Payment Method
                  </h2>

                  <p className="text-sm text-gray-500">
                    Select how you want to pay.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  {
                    id: "card" as PaymentMethod,
                    title: "Card",
                    description:
                      "Pay securely with your debit or credit card.",
                  },
                  {
                    id: "transfer" as PaymentMethod,
                    title: "Bank Transfer",
                    description:
                      "Pay directly from your bank account.",
                  },
                  {
                    id: "wallet" as PaymentMethod,
                    title: "Door-Step Wallet",
                    description:
                      "Use your Door-Step wallet balance.",
                  },
                  {
                    id: "cash" as PaymentMethod,
                    title: "Cash on Delivery",
                    description:
                      "Pay the rider when your order arrives.",
                  },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() =>
                      setPaymentMethod(method.id)
                    }
                    className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition ${
                      paymentMethod === method.id
                        ? "border-[#FF6B35] bg-[#FFF8F3]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        paymentMethod === method.id
                          ? "border-[#FF6B35]"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === method.id && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#FF6B35]" />
                      )}
                    </div>

                    <div>
                      <p className="font-bold text-[#151515]">
                        {method.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {method.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-green-50 p-4">
                <FiShield
                  className="mt-0.5 flex-shrink-0 text-green-600"
                  size={18}
                />

                <p className="text-xs leading-5 text-green-800">
                  Door-Step uses secure payment processing to
                  help protect your payment information.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-xl font-black text-[#151515]">
                Your Order
              </h2>

              {/* ITEMS */}
              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.restaurantId}-${item.id}`}
                    className="flex gap-3"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#151515]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-[#151515]">
                      {formatNaira(
                        item.price * item.quantity
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-dashed border-gray-200" />

              {/* PROMO CODE */}
              <div>
                <div className="flex items-center gap-2">
                  <FiTag className="text-[#FF6B35]" />

                  <h3 className="text-sm font-black text-[#151515]">
                    Promo Code
                  </h3>
                </div>

                {!appliedPromotion ? (
                  <>
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(event) => {
                          setPromoCode(
                            event.target.value.toUpperCase()
                          );

                          setPromoError("");
                          setPromoSuccess("");
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleApplyPromo();
                          }
                        }}
                        placeholder="Enter coupon code"
                        className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold uppercase outline-none transition placeholder:normal-case placeholder:font-normal placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10"
                      />

                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="rounded-xl bg-[#151515] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#FF6B35]"
                      >
                        Apply
                      </button>
                    </div>

                    {promoError && (
                      <p className="mt-2 text-xs font-semibold text-red-500">
                        {promoError}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="mt-3 rounded-2xl border border-green-200 bg-green-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                          <FiCheck />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-black text-green-800">
                            {appliedPromotion.code}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-green-700">
                            {appliedPromotion.title}
                          </p>

                          <p className="mt-1 text-xs font-bold text-green-700">
                            You saved{" "}
                            {formatNaira(
                              promoDiscount
                            )}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="rounded-lg p-2 text-green-700 transition hover:bg-green-100"
                        aria-label="Remove promotion"
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>
                )}

                {promoSuccess &&
                  appliedPromotion && (
                    <p className="mt-2 text-xs font-semibold text-green-600">
                      {promoSuccess}
                    </p>
                  )}
              </div>

              <div className="my-6 border-t border-dashed border-gray-200" />

              {/* TOTALS */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    {formatNaira(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Delivery fee
                  </span>

                  <span className="font-semibold">
                    {formatNaira(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Service fee
                  </span>

                  <span className="font-semibold">
                    {formatNaira(serviceFee)}
                  </span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 font-semibold text-green-600">
                      <FiTag />
                      Promo discount
                    </span>

                    <span className="font-bold text-green-600">
                      -{formatNaira(promoDiscount)}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#151515]">
                      Total
                    </span>

                    <span className="text-2xl font-black text-[#FF6B35]">
                      {formatNaira(finalTotal)}
                    </span>
                  </div>

                  {promoDiscount > 0 && (
                    <p className="mt-2 text-right text-xs font-semibold text-green-600">
                      You saved{" "}
                      {formatNaira(promoDiscount)}
                    </p>
                  )}
                </div>
              </div>

              {/* PLACE ORDER */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-4 font-bold text-white transition hover:bg-[#e95b2b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPlacingOrder ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <FiArrowRight />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                By placing your order, you agree to Door-Step's
                terms and delivery policies.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
