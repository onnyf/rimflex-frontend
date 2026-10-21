
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiExternalLink,
  FiLogOut,
  FiMapPin,
  FiNavigation,
  FiPackage,
  FiPhone,
  FiShield,
  FiTruck,
  FiUser,
} from "react-icons/fi";

import RiderAuthGuard from "../../RiderAuthGuard";

type DeliveryStatus =
  | "Available"
  | "Accepted"
  | "Heading to Pickup"
  | "Arrived at Pickup"
  | "Picked Up"
  | "Heading to Customer"
  | "Arrived at Customer"
  | "Delivered"
  | "Cancelled";

type Delivery = {
  id: string;
  type: string;
  restaurant: string;
  pickupAddress: string;
  pickupPhone: string;
  customer: string;
  customerPhone: string;
  dropoffAddress: string;
  distance: string;
  estimatedTime: string;
  earnings: number;
  orderAmount: number;
  items: string[];
  status: DeliveryStatus;
  paymentMethod: string;
  deliveryPin: string;
  createdAt: string;
};

const deliveries: Record<string, Delivery> = {
  "ORD-10001": {
    id: "ORD-10001",
    type: "Food Delivery",
    restaurant: "Chicken Republic",
    pickupAddress: "Admiralty Way, Lekki Phase 1, Lagos",
    pickupPhone: "0803 111 2222",
    customer: "John Okafor",
    customerPhone: "0803 555 7890",
    dropoffAddress: "Lekki Phase 1, Lagos",
    distance: "6.4 km",
    estimatedTime: "25 min",
    earnings: 1500,
    orderAmount: 18500,
    items: [
      "Chicken Meal",
      "Jollof Rice",
      "Chips",
    ],

    /*
     * Important:
     * The rider has already accepted this delivery.
     *
     * It must NOT automatically start navigation.
     */
    status: "Accepted",

    paymentMethod: "Paid Online",
    deliveryPin: "4826",
    createdAt: "Today, 10:15 AM",
  },

  "ORD-10002": {
    id: "ORD-10002",
    type: "Food Delivery",
    restaurant: "Bukka Hut",
    pickupAddress: "Allen Avenue, Ikeja, Lagos",
    pickupPhone: "0806 222 3333",
    customer: "Sarah Williams",
    customerPhone: "0812 444 6789",
    dropoffAddress: "Opebi, Ikeja, Lagos",
    distance: "4.8 km",
    estimatedTime: "18 min",
    earnings: 1300,
    orderAmount: 12500,
    items: [
      "Jollof Rice",
      "Beef",
    ],
    status: "Available",
    paymentMethod: "Paid Online",
    deliveryPin: "7314",
    createdAt: "Today, 10:32 AM",
  },

  "ORD-10003": {
    id: "ORD-10003",
    type: "Food Delivery",
    restaurant: "The Place",
    pickupAddress: "Lekki-Epe Expressway, Lagos",
    pickupPhone: "0807 333 4444",
    customer: "David Emmanuel",
    customerPhone: "0809 555 6677",
    dropoffAddress: "Ikoyi, Lagos",
    distance: "8.2 km",
    estimatedTime: "30 min",
    earnings: 1800,
    orderAmount: 22000,
    items: [
      "Chicken & Chips",
      "Burger",
      "Soft Drink",
      "Fries",
    ],
    status: "Delivered",
    paymentMethod: "Paid Online",
    deliveryPin: "9142",
    createdAt: "Today, 8:45 AM",
  },
};

const fallbackDelivery: Delivery = {
  id: "ORD-10001",
  type: "Food Delivery",
  restaurant: "Chicken Republic",
  pickupAddress: "Admiralty Way, Lekki Phase 1, Lagos",
  pickupPhone: "0803 111 2222",
  customer: "John Okafor",
  customerPhone: "0803 555 7890",
  dropoffAddress: "Lekki Phase 1, Lagos",
  distance: "6.4 km",
  estimatedTime: "25 min",
  earnings: 1500,
  orderAmount: 18500,
  items: [
    "Chicken Meal",
    "Jollof Rice",
    "Chips",
  ],
  status: "Accepted",
  paymentMethod: "Paid Online",
  deliveryPin: "4826",
  createdAt: "Today, 10:15 AM",
};

const statusSteps: DeliveryStatus[] = [
  "Accepted",
  "Heading to Pickup",
  "Arrived at Pickup",
  "Picked Up",
  "Heading to Customer",
  "Arrived at Customer",
  "Delivered",
];

function getStepIndex(status: DeliveryStatus) {
  return statusSteps.indexOf(status);
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function statusStyle(status: DeliveryStatus) {
  switch (status) {
    case "Available":
      return "border-orange-200 bg-orange-50 text-orange-700";

    case "Delivered":
      return "border-green-200 bg-green-50 text-green-700";

    case "Cancelled":
      return "border-red-200 bg-red-50 text-red-700";

    case "Accepted":
      return "border-blue-200 bg-blue-50 text-blue-700";

    default:
      return "border-orange-200 bg-orange-50 text-orange-700";
  }
}

function getNextStatus(
  status: DeliveryStatus
): DeliveryStatus | null {
  switch (status) {
    case "Available":
      return "Accepted";

    case "Accepted":
      return "Heading to Pickup";

    case "Heading to Pickup":
      return "Arrived at Pickup";

    case "Arrived at Pickup":
      return "Picked Up";

    case "Picked Up":
      return "Heading to Customer";

    case "Heading to Customer":
      return "Arrived at Customer";

    case "Arrived at Customer":
      return "Delivered";

    default:
      return null;
  }
}

function getActionLabel(status: DeliveryStatus) {
  switch (status) {
    case "Available":
      return "Accept Delivery";

    case "Accepted":
      return "Start Navigation to Pickup";

    case "Heading to Pickup":
      return "I've Arrived at Pickup";

    case "Arrived at Pickup":
      return "Confirm Pickup";

    case "Picked Up":
      return "Start Delivery";

    case "Heading to Customer":
      return "I've Arrived at Customer";

    case "Arrived at Customer":
      return "Confirm Delivery";

    default:
      return "Completed";
  }
}

export default function RiderDeliveryDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const delivery =
    deliveries[id ?? ""] || fallbackDelivery;

  const [status, setStatus] =
    useState<DeliveryStatus>(
      delivery.status
    );

  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [copied, setCopied] = useState(false);

  const [isOnline, setIsOnline] = useState(true);

  /*
   * Read the rider's shared online/offline state.
   */
  useEffect(() => {
    const storedOnlineState =
      localStorage.getItem(
        "doorstep_rider_online"
      );

    if (storedOnlineState !== null) {
      setIsOnline(
        storedOnlineState === "true"
      );
    }
  }, []);

  const stepIndex = getStepIndex(status);
  const nextStatus = getNextStatus(status);

  /*
   * Any status after Available means
   * the rider already has this delivery.
   */
  const isActiveDelivery =
    status !== "Available" &&
    status !== "Delivered" &&
    status !== "Cancelled";

  const handleLogout = () => {
    const shouldLogout = window.confirm(
      "Are you sure you want to logout from your rider account?"
    );

    if (!shouldLogout) {
      return;
    }

    localStorage.removeItem(
      "doorstep_rider_authenticated"
    );

    localStorage.removeItem(
      "doorstep_rider_id"
    );

    localStorage.removeItem(
      "doorstep_rider_name"
    );

    localStorage.removeItem(
      "doorstep_rider_email"
    );

    localStorage.removeItem(
      "doorstep_rider_phone"
    );

    localStorage.removeItem(
      "doorstep_rider_online"
    );

    router.replace(
      `/rider/login?redirect=${encodeURIComponent(
        `/rider/deliveries/${delivery.id}`
      )}`
    );
  };

  const handleAction = () => {
    setPinError("");

    /*
     * A NEW delivery can only be accepted
     * while the rider is online.
     */
    if (status === "Available") {
      if (!isOnline) {
        setPinError(
          "You are offline. Go online before accepting a new delivery."
        );

        return;
      }

      setStatus("Accepted");
      return;
    }

    /*
     * Delivery PIN is required before
     * completing the delivery.
     */
    if (status === "Arrived at Customer") {
      if (pin !== delivery.deliveryPin) {
        setPinError(
          "Incorrect delivery PIN. Ask the customer for the correct PIN."
        );

        return;
      }
    }

    /*
     * IMPORTANT:
     *
     * We do NOT check isOnline here.
     *
     * Once a rider has accepted a delivery,
     * the rider must be allowed to finish it
     * even if they later go offline.
     */
    if (nextStatus) {
      setStatus(nextStatus);
      setPin("");
    }
  };

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(
        delivery.id
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  };

  /*
   * Google Maps navigation URLs.
   */
  const pickupMapUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      delivery.pickupAddress
    )}`;

  const dropoffMapUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      delivery.dropoffAddress
    )}`;

  return (
    <RiderAuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          {/* TOP NAVIGATION */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/rider/deliveries"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-600"
            >
              <FiArrowLeft />
              Back to Deliveries
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-50"
            >
              <FiLogOut />
              Logout
            </button>
          </div>

          {/* ONLINE / OFFLINE NOTICE */}
          {isActiveDelivery && (
            <div
              className={`mt-5 rounded-2xl border px-5 py-4 ${
                isOnline
                  ? "border-green-200 bg-green-50"
                  : "border-orange-200 bg-orange-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    isOnline
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  <FiTruck />
                </div>

                <div>
                  <p
                    className={`font-bold ${
                      isOnline
                        ? "text-green-900"
                        : "text-orange-900"
                    }`}
                  >
                    {isOnline
                      ? "You are online"
                      : "You are currently offline"}
                  </p>

                  <p
                    className={`mt-1 text-sm leading-6 ${
                      isOnline
                        ? "text-green-800"
                        : "text-orange-800"
                    }`}
                  >
                    {isOnline
                      ? "You can continue your current delivery and receive new delivery requests."
                      : "Your current delivery can continue. Going offline does not cancel or stop an active delivery."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* HEADER */}
          <div className="mt-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                    Delivery
                  </p>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyle(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-black text-gray-950">
                    {delivery.id}
                  </h1>

                  <button
                    type="button"
                    onClick={copyOrderId}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    title="Copy order ID"
                  >
                    {copied ? (
                      <FiCheck />
                    ) : (
                      <FiCopy />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {delivery.type} •{" "}
                  {delivery.createdAt}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-950 px-6 py-4 text-white">
                <p className="text-xs font-medium text-gray-400">
                  Your Earnings
                </p>

                <p className="mt-1 text-2xl font-black">
                  {formatCurrency(
                    delivery.earnings
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-gray-950">
                  Delivery Progress
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Follow each step until the order
                  is successfully delivered.
                </p>
              </div>

              <FiTruck className="text-2xl text-orange-600" />
            </div>

            <div className="mt-8 overflow-x-auto pb-2">
              <div className="flex min-w-[720px] items-start">
                {statusSteps.map(
                  (step, index) => {
                    const completed =
                      stepIndex >= 0 &&
                      index <= stepIndex;

                    const current =
                      step === status;

                    return (
                      <div
                        key={step}
                        className="relative flex flex-1 flex-col items-center text-center"
                      >
                        {index !== 0 && (
                          <div
                            className={`absolute right-1/2 top-4 h-0.5 w-full ${
                              completed
                                ? "bg-orange-500"
                                : "bg-gray-200"
                            }`}
                          />
                        )}

                        <div
                          className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                            completed
                              ? "border-orange-600 bg-orange-600 text-white"
                              : "border-gray-200 bg-white text-gray-400"
                          } ${
                            current
                              ? "ring-4 ring-orange-100"
                              : ""
                          }`}
                        >
                          {completed ? (
                            <FiCheck className="text-sm" />
                          ) : (
                            <span className="text-xs font-bold">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        <p
                          className={`mt-3 max-w-[110px] text-xs font-semibold ${
                            current
                              ? "text-orange-700"
                              : completed
                                ? "text-gray-800"
                                : "text-gray-400"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* LEFT CONTENT */}
            <div className="space-y-6 lg:col-span-2">

              {/* PICKUP */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-600">
                      Pickup
                    </p>

                    <h2 className="mt-2 text-xl font-black text-gray-950">
                      {delivery.restaurant}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl text-orange-600">
                    <FiMapPin />
                  </div>
                </div>

                <p className="mt-4 leading-6 text-gray-600">
                  {delivery.pickupAddress}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`tel:${delivery.pickupPhone}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
                  >
                    <FiPhone />
                    Call Restaurant
                  </a>

                  <a
                    href={pickupMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
                  >
                    <FiNavigation />
                    Navigate
                    <FiExternalLink className="text-xs" />
                  </a>
                </div>
              </div>

              {/* CUSTOMER */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-600">
                      Drop-off
                    </p>

                    <h2 className="mt-2 text-xl font-black text-gray-950">
                      {delivery.customer}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl text-green-600">
                    <FiUser />
                  </div>
                </div>

                <p className="mt-4 leading-6 text-gray-600">
                  {delivery.dropoffAddress}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`tel:${delivery.customerPhone}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-green-300 hover:text-green-600"
                  >
                    <FiPhone />
                    Call Customer
                  </a>

                  <a
                    href={dropoffMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-green-300 hover:text-green-600"
                  >
                    <FiNavigation />
                    Navigate
                    <FiExternalLink className="text-xs" />
                  </a>
                </div>
              </div>

              {/* ITEMS */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                    <FiPackage />
                  </div>

                  <div>
                    <h2 className="font-black text-gray-950">
                      Order Items
                    </h2>

                    <p className="text-sm text-gray-500">
                      {delivery.items.length} item
                      {delivery.items.length !== 1
                        ? "s"
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="mt-5 divide-y divide-gray-100">
                  {delivery.items.map(
                    (item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="flex items-center justify-between py-3"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {item}
                        </span>

                        <FiCheckCircle className="text-green-500" />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* DELIVERY PIN */}
              {status ===
                "Arrived at Customer" && (
                <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700">
                      <FiShield />
                    </div>

                    <div className="flex-1">
                      <h2 className="font-black text-orange-950">
                        Delivery Confirmation PIN
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-orange-800">
                        Ask the customer for their
                        4-digit delivery PIN before
                        confirming the order as
                        delivered.
                      </p>

                      <div className="mt-4">
                        <input
                          value={pin}
                          onChange={(event) => {
                            setPin(
                              event.target.value
                                .replace(/\D/g, "")
                                .slice(0, 4)
                            );

                            setPinError("");
                          }}
                          inputMode="numeric"
                          maxLength={4}
                          placeholder="Enter 4-digit PIN"
                          className="w-full max-w-xs rounded-xl border border-orange-200 bg-white px-4 py-3 text-center text-xl font-black tracking-[0.5em] text-gray-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        />
                      </div>

                      {pinError && (
                        <p className="mt-2 text-sm font-semibold text-red-600">
                          {pinError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION */}
              {status !== "Delivered" &&
                status !== "Cancelled" && (
                  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Next action
                        </p>

                        <h2 className="mt-1 text-lg font-black text-gray-950">
                          {getActionLabel(status)}
                        </h2>

                        {status === "Available" &&
                          !isOnline && (
                            <p className="mt-1 text-sm font-semibold text-orange-600">
                              You must be online before
                              accepting this delivery.
                            </p>
                          )}

                        {isActiveDelivery &&
                          !isOnline && (
                            <p className="mt-1 text-sm font-semibold text-green-600">
                              You can continue this
                              delivery while offline.
                            </p>
                          )}
                      </div>

                      <button
                        type="button"
                        onClick={handleAction}
                        disabled={
                          (status === "Available" &&
                            !isOnline) ||
                          (status ===
                            "Arrived at Customer" &&
                            pin.length !== 4)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                      >
                        {getActionLabel(status)}
                        <FiArrowRight />
                      </button>
                    </div>

                    {status === "Available" &&
                      !isOnline && (
                        <Link
                          href="/rider/dashboard"
                          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700"
                        >
                          Go to Dashboard to go online
                          <FiArrowRight />
                        </Link>
                      )}
                  </div>
                )}

              {/* COMPLETED */}
              {status === "Delivered" && (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-2xl text-white">
                      <FiCheck />
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-green-950">
                        Delivery Completed
                      </h2>

                      <p className="mt-1 text-sm text-green-800">
                        This order has been
                        successfully delivered.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">

              {/* DELIVERY SUMMARY */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="font-black text-gray-950">
                  Delivery Summary
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Distance
                    </span>

                    <span className="font-bold text-gray-900">
                      {delivery.distance}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Estimated time
                    </span>

                    <span className="font-bold text-gray-900">
                      {delivery.estimatedTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Payment
                    </span>

                    <span className="font-bold text-green-600">
                      {delivery.paymentMethod}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Order value
                      </span>

                      <span className="font-bold text-gray-900">
                        {formatCurrency(
                          delivery.orderAmount
                        )}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Your earnings
                      </span>

                      <span className="text-lg font-black text-orange-600">
                        {formatCurrency(
                          delivery.earnings
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SAFETY */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FiShield />
                  </div>

                  <h2 className="font-black text-gray-950">
                    Rider Safety
                  </h2>
                </div>

                <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                  <li className="flex gap-2">
                    <FiCheckCircle className="mt-1 shrink-0 text-green-500" />
                    Keep your phone charged while
                    delivering.
                  </li>

                  <li className="flex gap-2">
                    <FiCheckCircle className="mt-1 shrink-0 text-green-500" />
                    Confirm the pickup before leaving
                    the restaurant.
                  </li>

                  <li className="flex gap-2">
                    <FiCheckCircle className="mt-1 shrink-0 text-green-500" />
                    Never share customer information
                    with others.
                  </li>

                  <li className="flex gap-2">
                    <FiCheckCircle className="mt-1 shrink-0 text-green-500" />
                    Use the delivery PIN to confirm
                    handover.
                  </li>
                </ul>
              </div>

              {/* SUPPORT */}
              <div className="rounded-3xl bg-gray-950 p-6 text-white">
                <FiPhone className="text-2xl text-orange-400" />

                <h2 className="mt-4 font-black">
                  Need Help?
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Contact Door-Step support if there
                  is an issue with the restaurant,
                  customer or delivery.
                </p>

                <a
                  href="tel:+2348000000000"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-gray-950 transition hover:bg-orange-500 hover:text-white"
                >
                  Contact Support
                  <FiArrowRight />
                </a>
              </div>

              {/* DEMO NOTICE */}
              <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
                <div className="flex gap-3">
                  <FiClock className="mt-0.5 shrink-0 text-orange-600" />

                  <div>
                    <p className="font-bold text-orange-900">
                      Demo workflow
                    </p>

                    <p className="mt-1 text-sm leading-6 text-orange-800">
                      Delivery status changes are
                      currently stored in frontend
                      state. Real dispatch, GPS
                      tracking, PIN verification and
                      proof of delivery will be connected
                      to the Door-Step backend later.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </RiderAuthGuard>
  );
}
