
"use client";

import RiderAuthGuard from "../RiderAuthGuard";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiLogOut,
  FiMapPin,
  FiPackage,
  FiSearch,
  FiShield,
  FiTruck,
  FiUser,
  FiXCircle,
} from "react-icons/fi";

type DocumentStatus =
  | "Valid"
  | "Expiring Soon"
  | "Expired"
  | "Missing"
  | "Under Review";

type RiderAccountStatus = "Active" | "Suspended";

type DeliveryStatus =
  | "Available"
  | "Active"
  | "Completed"
  | "Cancelled";

type DeliveryType =
  | "Food Delivery"
  | "Send Package"
  | "Shop & Deliver";

type ComplianceLevel =
  | "valid"
  | "warning"
  | "review"
  | "restricted"
  | "suspended";

type ComplianceDocument = {
  id: string;
  name: string;
  expiryDate: string;
  status: DocumentStatus;
};

type Delivery = {
  id: string;
  type: DeliveryType;
  restaurant: string;
  pickupAddress: string;
  customer: string;
  dropoffAddress: string;
  distance: string;
  estimatedTime: string;
  earnings: number;
  status: DeliveryStatus;
  items: number;
  createdAt: string;
};

const initialDocuments: ComplianceDocument[] = [
  {
    id: "DOC-1001",
    name: "Government ID",
    expiryDate: "2029-08-15",
    status: "Valid",
  },
  {
    id: "DOC-1002",
    name: "Driver's Licence",
    expiryDate: "2026-10-12",
    status: "Expiring Soon",
  },
  {
    id: "DOC-1003",
    name: "Vehicle Registration",
    expiryDate: "2027-06-20",
    status: "Valid",
  },
];

const initialDeliveries: Delivery[] = [
  {
    id: "ORD-10001",
    type: "Food Delivery",
    restaurant: "Chicken Republic",
    pickupAddress: "Admiralty Way, Lekki",
    customer: "John Okafor",
    dropoffAddress: "Lekki Phase 1",
    distance: "6.4 km",
    estimatedTime: "25 mins",
    earnings: 1500,
    status: "Active",
    items: 3,
    createdAt: "Today, 10:42 AM",
  },
  {
    id: "ORD-10002",
    type: "Food Delivery",
    restaurant: "Bukka Hut",
    pickupAddress: "Ikeja City Mall",
    customer: "Sarah Williams",
    dropoffAddress: "Allen Avenue, Ikeja",
    distance: "4.8 km",
    estimatedTime: "18 mins",
    earnings: 1300,
    status: "Available",
    items: 2,
    createdAt: "Today, 11:18 AM",
  },
  {
    id: "ORD-10003",
    type: "Food Delivery",
    restaurant: "The Place",
    pickupAddress: "Lekki Phase 1",
    customer: "David Emmanuel",
    dropoffAddress: "Ikoyi",
    distance: "8.2 km",
    estimatedTime: "30 mins",
    earnings: 1800,
    status: "Completed",
    items: 4,
    createdAt: "Today, 9:10 AM",
  },
  {
    id: "ORD-10004",
    type: "Food Delivery",
    restaurant: "Kilimanjaro",
    pickupAddress: "Victoria Island",
    customer: "Aisha Ibrahim",
    dropoffAddress: "Oniru",
    distance: "5.6 km",
    estimatedTime: "22 mins",
    earnings: 1400,
    status: "Completed",
    items: 2,
    createdAt: "Yesterday, 6:32 PM",
  },
  {
    id: "ORD-10005",
    type: "Send Package",
    restaurant: "Package Pickup - Yaba",
    pickupAddress: "Yaba, Lagos",
    customer: "Michael Adewale",
    dropoffAddress: "Surulere, Lagos",
    distance: "7.1 km",
    estimatedTime: "27 mins",
    earnings: 2200,
    status: "Cancelled",
    items: 1,
    createdAt: "Yesterday, 2:15 PM",
  },
  {
    id: "ORD-10006",
    type: "Shop & Deliver",
    restaurant: "Shoprite Ikeja",
    pickupAddress: "Shoprite Ikeja",
    customer: "Grace Johnson",
    dropoffAddress: "GRA Ikeja",
    distance: "3.9 km",
    estimatedTime: "15 mins",
    earnings: 1200,
    status: "Available",
    items: 6,
    createdAt: "Today, 11:34 AM",
  },
];

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function getDaysUntilExpiry(expiryDate: string) {
  const today = new Date();

  const expiry = new Date(`${expiryDate}T23:59:59`);

  const difference =
    expiry.getTime() - today.getTime();

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
}

function getStatusClasses(status: DeliveryStatus) {
  switch (status) {
    case "Available":
      return "bg-green-50 text-green-700";

    case "Active":
      return "bg-orange-50 text-orange-700";

    case "Completed":
      return "bg-blue-50 text-blue-700";

    case "Cancelled":
      return "bg-red-50 text-red-700";

    default:
      return "bg-gray-50 text-gray-700";
  }
}

function getTypeClasses(type: DeliveryType) {
  switch (type) {
    case "Food Delivery":
      return "bg-orange-50 text-orange-700";

    case "Send Package":
      return "bg-purple-50 text-purple-700";

    case "Shop & Deliver":
      return "bg-blue-50 text-blue-700";

    default:
      return "bg-gray-50 text-gray-700";
  }
}

function RiderDeliveriesPage() {
  const [documents] =
    useState<ComplianceDocument[]>(
      initialDocuments
    );

  const [deliveries, setDeliveries] =
    useState<Delivery[]>(initialDeliveries);

  const [accountStatus] =
    useState<RiderAccountStatus>("Active");

  /*
   * ONLINE / OFFLINE STATE
   *
   * This page uses the same localStorage key that
   * the Rider Dashboard should use:
   *
   * doorstep_rider_online
   *
   * Existing active deliveries are allowed to
   * continue while offline.
   *
   * New deliveries require the rider to be online.
   */
  const [isOnline, setIsOnline] =
    useState(true);

  useEffect(() => {
    const savedOnlineState =
      localStorage.getItem(
        "doorstep_rider_online"
      );

    if (savedOnlineState === "false") {
      setIsOnline(false);
    } else if (savedOnlineState === "true") {
      setIsOnline(true);
    }

    const handleStorageChange = () => {
      const currentState =
        localStorage.getItem(
          "doorstep_rider_online"
        );

      setIsOnline(
        currentState !== "false"
      );
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  const [activeTab, setActiveTab] =
    useState<DeliveryStatus | "All">("All");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [actionMessage, setActionMessage] =
    useState("");

  /*
   * COMPLIANCE ENGINE
   *
   * Compliance only controls NEW delivery
   * acceptance and NEW assignments.
   *
   * It does NOT cancel or interrupt an
   * already-active delivery.
   */
  const compliance = useMemo(() => {
    if (accountStatus === "Suspended") {
      return {
        canAcceptDeliveries: false,
        canReceiveAssignments: false,
        level: "suspended" as ComplianceLevel,
        title: "Rider Account Suspended",
        message:
          "Your rider account is currently suspended. You cannot accept new deliveries.",
        document: null,
      };
    }

    const expiredDocument = documents.find(
      (document) => {
        if (
          document.status === "Expired"
        ) {
          return true;
        }

        if (!document.expiryDate) {
          return false;
        }

        return (
          getDaysUntilExpiry(
            document.expiryDate
          ) < 0
        );
      }
    );

    if (expiredDocument) {
      return {
        canAcceptDeliveries: false,
        canReceiveAssignments: false,
        level: "restricted" as ComplianceLevel,
        title: "Delivery Access Restricted",
        message:
          `${expiredDocument.name} has expired. Update the document and wait for admin verification before accepting new deliveries.`,
        document: expiredDocument,
      };
    }

    const missingDocument = documents.find(
      (document) =>
        document.status === "Missing"
    );

    if (missingDocument) {
      return {
        canAcceptDeliveries: false,
        canReceiveAssignments: false,
        level: "restricted" as ComplianceLevel,
        title: "Required Document Missing",
        message:
          `${missingDocument.name} is missing. Upload the required document before accepting new deliveries.`,
        document: missingDocument,
      };
    }

    const underReviewDocument =
      documents.find(
        (document) =>
          document.status === "Under Review"
      );

    if (underReviewDocument) {
      return {
        canAcceptDeliveries: false,
        canReceiveAssignments: false,
        level: "review" as ComplianceLevel,
        title: "Verification in Progress",
        message:
          `${underReviewDocument.name} is under admin review. New delivery acceptance is temporarily disabled.`,
        document: underReviewDocument,
      };
    }

    const expiringDocument =
      documents.find(
        (document) => {
          if (
            document.status ===
            "Expiring Soon"
          ) {
            return true;
          }

          if (!document.expiryDate) {
            return false;
          }

          const daysRemaining =
            getDaysUntilExpiry(
              document.expiryDate
            );

          return (
            daysRemaining >= 0 &&
            daysRemaining <= 30
          );
        }
      );

    if (expiringDocument) {
      const daysRemaining =
        getDaysUntilExpiry(
          expiringDocument.expiryDate
        );

      return {
        canAcceptDeliveries: true,
        canReceiveAssignments: true,
        level: "warning" as ComplianceLevel,
        title: "Document Expiring Soon",
        message:
          daysRemaining <= 7
            ? `${expiringDocument.name} expires in ${Math.max(
                daysRemaining,
                0
              )} day${
                Math.max(
                  daysRemaining,
                  0
                ) === 1
                  ? ""
                  : "s"
              }. Please renew it immediately.`
            : `${expiringDocument.name} expires on ${expiringDocument.expiryDate}. You can still work, but please renew it before expiry.`,
        document: expiringDocument,
      };
    }

    return {
      canAcceptDeliveries: true,
      canReceiveAssignments: true,
      level: "valid" as ComplianceLevel,
      title: "Compliance Verified",
      message:
        "All required rider documents are currently valid.",
      document: null,
    };
  }, [accountStatus, documents]);

  /*
   * FIND ACTIVE DELIVERY
   *
   * A rider cannot accept another delivery
   * while already working on one.
   */
  const activeDelivery = deliveries.find(
    (delivery) =>
      delivery.status === "Active"
  );

  const hasActiveDelivery =
    Boolean(activeDelivery);

  /*
   * ACCEPT DELIVERY
   *
   * IMPORTANT:
   * - Rider must be online.
   * - Rider must be compliant.
   * - Rider must not already have an
   *   active delivery.
   */
  const handleAcceptDelivery = (
    deliveryId: string
  ) => {
    if (accountStatus !== "Active") {
      setActionMessage(
        "Your rider account is not active. You cannot accept a delivery."
      );

      return;
    }

    if (!isOnline) {
      setActionMessage(
        "You are currently offline. Go online before accepting a new delivery."
      );

      return;
    }

    if (!compliance.canAcceptDeliveries) {
      setActionMessage(
        "You cannot accept a new delivery until your compliance status is restored."
      );

      return;
    }

    if (hasActiveDelivery) {
      setActionMessage(
        "You already have an active delivery. Complete it before accepting another delivery."
      );

      return;
    }

    setDeliveries((current) =>
      current.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              status: "Active",
            }
          : delivery
      )
    );

    setActionMessage(
      "Delivery accepted successfully. You can now continue to pickup."
    );
  };

  /*
   * CONTINUE ACTIVE DELIVERY
   *
   * This deliberately does NOT change the
   * delivery status.
   *
   * It only navigates to the delivery details
   * page.
   *
   * This means:
   *
   * Active + Offline
   *      ↓
   * Continue Delivery
   *      ↓
   * Delivery Details
   *
   * The detail page decides the next action.
   */
  const handleContinueDelivery = (
    deliveryId: string
  ) => {
    routerPush(
      `/rider/deliveries/${deliveryId}`
    );
  };

  /*
   * Small navigation helper.
   */
  const routerPush = (path: string) => {
    window.location.href = path;
  };

  /*
   * LOGOUT
   *
   * Preserve rider application information
   * so the rider can still log in later.
   */
  const handleLogout = () => {
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

    window.location.href =
      `/rider/login?redirect=${encodeURIComponent(
        "/rider/deliveries"
      )}`;
  };

  /*
   * FILTER
   */
  const filteredDeliveries =
    useMemo(() => {
      const normalizedSearch =
        searchQuery
          .trim()
          .toLowerCase();

      return deliveries.filter(
        (delivery) => {
          const matchesTab =
            activeTab === "All" ||
            delivery.status === activeTab;

          const matchesSearch =
            !normalizedSearch ||
            delivery.id
              .toLowerCase()
              .includes(normalizedSearch) ||
            delivery.restaurant
              .toLowerCase()
              .includes(normalizedSearch) ||
            delivery.customer
              .toLowerCase()
              .includes(normalizedSearch) ||
            delivery.pickupAddress
              .toLowerCase()
              .includes(normalizedSearch) ||
            delivery.dropoffAddress
              .toLowerCase()
              .includes(normalizedSearch);

          return (
            matchesTab &&
            matchesSearch
          );
        }
      );
    }, [
      activeTab,
      deliveries,
      searchQuery,
    ]);

  const stats = {
    total: deliveries.length,

    available: deliveries.filter(
      (delivery) =>
        delivery.status === "Available"
    ).length,

    active: deliveries.filter(
      (delivery) =>
        delivery.status === "Active"
    ).length,

    completed: deliveries.filter(
      (delivery) =>
        delivery.status === "Completed"
    ).length,
  };

  const complianceStyles = {
    valid: {
      container:
        "border-green-200 bg-green-50",
      icon:
        "bg-green-100 text-green-600",
      title:
        "text-green-900",
      text:
        "text-green-800",
    },

    warning: {
      container:
        "border-yellow-200 bg-yellow-50",
      icon:
        "bg-yellow-100 text-yellow-600",
      title:
        "text-yellow-900",
      text:
        "text-yellow-800",
    },

    review: {
      container:
        "border-blue-200 bg-blue-50",
      icon:
        "bg-blue-100 text-blue-600",
      title:
        "text-blue-900",
      text:
        "text-blue-800",
    },

    restricted: {
      container:
        "border-red-200 bg-red-50",
      icon:
        "bg-red-100 text-red-600",
      title:
        "text-red-900",
      text:
        "text-red-800",
    },

    suspended: {
      container:
        "border-red-300 bg-red-100",
      icon:
        "bg-red-200 text-red-700",
      title:
        "text-red-950",
      text:
        "text-red-900",
    },
  };

  const complianceStyle =
    complianceStyles[
      compliance.level
    ];

  return (
    <RiderAuthGuard>
      <div className="min-h-screen bg-[#f7f7f5]">
        {/* HEADER */}
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <FiTruck className="text-xl" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                    Door-Step
                  </p>

                  <h1 className="text-xl font-black text-gray-950">
                    My Deliveries
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/rider/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-500 hover:text-orange-600"
                >
                  <FiTruck />
                  Dashboard
                </Link>

                <Link
                  href="/rider/earnings"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-500 hover:text-orange-600"
                >
                  <FiDollarSign />
                  Earnings
                </Link>

                <Link
                  href="/rider/profile"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-500 hover:text-orange-600"
                >
                  <FiUser />
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* PAGE INTRO */}
          <section>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
              Rider Operations
            </p>

            <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                  Your Deliveries
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  View available requests, manage active deliveries and
                  review your delivery history.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                    isOnline
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isOnline
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  />

                  {isOnline
                    ? "Online"
                    : "Offline"}
                </div>

                <div
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                    compliance.canAcceptDeliveries
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      compliance.canAcceptDeliveries
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />

                  {compliance.canAcceptDeliveries
                    ? "Compliance Active"
                    : "Delivery Access Restricted"}
                </div>
              </div>
            </div>
          </section>

          {/* ACTION MESSAGE */}
          {actionMessage && (
            <div className="mt-6 flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-start gap-2 text-sm font-semibold text-gray-700">
                <FiCheckCircle className="mt-0.5 shrink-0 text-green-500" />

                <span>{actionMessage}</span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActionMessage("")
                }
                className="text-xs font-bold text-gray-400 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          )}

          {/* OFFLINE NOTICE */}
          {!isOnline && (
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                  <FiTruck />
                </div>

                <div>
                  <h2 className="font-black text-gray-950">
                    You are offline
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    You cannot accept new delivery requests while offline.
                    If you already have an active delivery, you can continue
                    that delivery normally.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* COMPLIANCE BANNER */}
          <section
            className={`mt-6 rounded-2xl border p-5 ${complianceStyle.container}`}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${complianceStyle.icon}`}
                >
                  {compliance.level === "valid" && (
                    <FiCheckCircle />
                  )}

                  {compliance.level === "warning" && (
                    <FiAlertTriangle />
                  )}

                  {compliance.level === "review" && (
                    <FiClock />
                  )}

                  {compliance.level === "restricted" && (
                    <FiXCircle />
                  )}

                  {compliance.level === "suspended" && (
                    <FiShield />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2
                      className={`text-lg font-black ${complianceStyle.title}`}
                    >
                      {compliance.title}
                    </h2>

                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-gray-700">
                      {compliance.canAcceptDeliveries
                        ? "Accepting Enabled"
                        : "Accepting Disabled"}
                    </span>
                  </div>

                  <p
                    className={`mt-1 max-w-3xl text-sm leading-6 ${complianceStyle.text}`}
                  >
                    {compliance.message}
                  </p>

                  {compliance.document && (
                    <p
                      className={`mt-2 text-xs font-bold ${complianceStyle.text}`}
                    >
                      Document:{" "}
                      {compliance.document.name}
                    </p>
                  )}
                </div>
              </div>

              {!compliance.canAcceptDeliveries && (
                <Link
                  href="/rider/profile#documents"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-gray-800 shadow-sm transition hover:text-orange-600"
                >
                  Manage Documents
                  <FiArrowRight />
                </Link>
              )}
            </div>
          </section>

          {/* ACTIVE DELIVERY NOTICE */}
          {activeDelivery && (
            <section className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <FiTruck />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                        Active Delivery
                      </p>

                      <h2 className="mt-1 text-lg font-black text-gray-950">
                        {activeDelivery.restaurant}
                      </h2>

                      <p className="mt-1 text-sm text-gray-600">
                        {activeDelivery.id} •{" "}
                        {activeDelivery.customer}
                      </p>
                    </div>

                    <Link
                      href={`/rider/deliveries/${activeDelivery.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                    >
                      Continue Delivery
                      <FiArrowRight />
                    </Link>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-orange-200 bg-white/70 p-4">
                    <FiShield className="mt-0.5 shrink-0 text-orange-600" />

                    <p className="text-xs leading-5 text-orange-900">
                      This delivery is already assigned to you. You may
                      continue it even if you are currently offline. You must
                      complete it before accepting another delivery.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* STATS */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl text-gray-700">
                <FiPackage />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                Total
              </p>

              <p className="mt-1 text-2xl font-black text-gray-950">
                {stats.total}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Delivery records
              </p>
            </div>

            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl text-green-600">
                <FiCheckCircle />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-green-700">
                Available
              </p>

              <p className="mt-1 text-2xl font-black text-green-900">
                {stats.available}
              </p>

              <p className="mt-1 text-xs text-green-700">
                Requests waiting
              </p>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600">
                <FiTruck />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-orange-700">
                Active
              </p>

              <p className="mt-1 text-2xl font-black text-orange-900">
                {stats.active}
              </p>

              <p className="mt-1 text-xs text-orange-700">
                Currently delivering
              </p>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600">
                <FiCheckCircle />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-blue-700">
                Completed
              </p>

              <p className="mt-1 text-2xl font-black text-blue-900">
                {stats.completed}
              </p>

              <p className="mt-1 text-xs text-blue-700">
                Successfully delivered
              </p>
            </div>
          </section>

          {/* SEARCH */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <label
                  htmlFor="delivery-search"
                  className="text-xs font-bold uppercase tracking-wide text-gray-400"
                >
                  Search Deliveries
                </label>

                <div className="mt-2">
                  <input
                    id="delivery-search"
                    type="text"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(
                        event.target.value
                      )
                    }
                    placeholder="Search order, restaurant, customer or address..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>
            </div>

            {/* TABS */}
            <div className="mt-5 flex flex-wrap gap-2">
              {(
                [
                  "All",
                  "Available",
                  "Active",
                  "Completed",
                  "Cancelled",
                ] as const
              ).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab)
                  }
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    activeTab === tab
                      ? "bg-gray-950 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </section>

          {/* DELIVERY LIST */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-950">
                  Delivery Requests
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredDeliveries.length} delivery
                  {filteredDeliveries.length === 1
                    ? ""
                    : "ies"}{" "}
                  found.
                </p>
              </div>

              {!compliance.canAcceptDeliveries && (
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                  <FiShield />
                  New Deliveries Restricted
                </span>
              )}
            </div>

            <div className="mt-6 space-y-4">
              {filteredDeliveries.length === 0 ? (
                <div className="rounded-2xl bg-gray-50 p-10 text-center">
                  <FiPackage className="mx-auto text-4xl text-gray-300" />

                  <p className="mt-4 text-sm font-black text-gray-600">
                    No deliveries found
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Try another search or delivery filter.
                  </p>
                </div>
              ) : (
                filteredDeliveries.map(
                  (delivery) => {
                    const isAvailable =
                      delivery.status ===
                      "Available";

                    const isCurrentActive =
                      delivery.status ===
                      "Active";

                    /*
                     * NEW DELIVERY ACCEPTANCE
                     *
                     * Must be:
                     * 1. Available
                     * 2. Rider online
                     * 3. Compliance valid
                     * 4. Account active
                     * 5. No other active delivery
                     */
                    const canAccept =
                      isAvailable &&
                      isOnline &&
                      compliance.canAcceptDeliveries &&
                      !hasActiveDelivery &&
                      accountStatus === "Active";

                    return (
                      <article
                        key={delivery.id}
                        className="rounded-2xl border border-gray-200 p-5 transition hover:border-orange-200 hover:shadow-sm"
                      >
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${getTypeClasses(
                                  delivery.type
                                )}`}
                              >
                                {delivery.type}
                              </span>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClasses(
                                  delivery.status
                                )}`}
                              >
                                {delivery.status}
                              </span>

                              <span className="text-xs font-bold text-gray-400">
                                {delivery.id}
                              </span>
                            </div>

                            <div className="mt-4">
                              <h3 className="text-lg font-black text-gray-950">
                                {delivery.restaurant}
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                {delivery.createdAt}
                              </p>
                            </div>

                            <div className="mt-5 grid gap-4 md:grid-cols-2">
                              <div className="rounded-xl bg-gray-50 p-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                  <FiMapPin />

                                  <p className="text-[10px] font-bold uppercase tracking-wide">
                                    Pickup
                                  </p>
                                </div>

                                <p className="mt-2 text-sm font-bold text-gray-800">
                                  {delivery.pickupAddress}
                                </p>
                              </div>

                              <div className="rounded-xl bg-gray-50 p-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                  <FiMapPin />

                                  <p className="text-[10px] font-bold uppercase tracking-wide">
                                    Drop-off
                                  </p>
                                </div>

                                <p className="mt-2 text-sm font-bold text-gray-800">
                                  {delivery.dropoffAddress}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-gray-500">
                              <span>
                                {delivery.distance}
                              </span>

                              <span>
                                {delivery.estimatedTime}
                              </span>

                              <span>
                                {delivery.items} item
                                {delivery.items === 1
                                  ? ""
                                  : "s"}
                              </span>

                              <span className="inline-flex items-center gap-1">
                                <FiUser />
                                {delivery.customer}
                              </span>
                            </div>
                          </div>

                          <div className="flex shrink-0 flex-col gap-3 xl:w-48">
                            <div className="rounded-xl bg-green-50 p-4">
                              <p className="text-[10px] font-bold uppercase tracking-wide text-green-600">
                                Your Earnings
                              </p>

                              <p className="mt-1 text-xl font-black text-green-700">
                                {formatCurrency(
                                  delivery.earnings
                                )}
                              </p>
                            </div>

                            {/* AVAILABLE DELIVERY */}
                            {isAvailable && (
                              <>
                                <button
                                  type="button"
                                  disabled={!canAccept}
                                  onClick={() =>
                                    handleAcceptDelivery(
                                      delivery.id
                                    )
                                  }
                                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                                    canAccept
                                      ? "bg-gray-950 text-white hover:bg-orange-600"
                                      : "cursor-not-allowed bg-gray-200 text-gray-400"
                                  }`}
                                >
                                  {!isOnline
                                    ? "Go Online"
                                    : !compliance.canAcceptDeliveries
                                      ? "Restricted"
                                      : hasActiveDelivery
                                        ? "Active Delivery"
                                        : "Accept Delivery"}

                                  <FiArrowRight />
                                </button>

                                {!isOnline && (
                                  <p className="text-center text-xs font-semibold text-gray-400">
                                    You must be online to accept
                                    a new delivery.
                                  </p>
                                )}

                                {isOnline &&
                                  !compliance.canAcceptDeliveries && (
                                    <Link
                                      href="/rider/profile#documents"
                                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-700 transition hover:bg-red-100"
                                    >
                                      Fix Compliance
                                      <FiArrowRight />
                                    </Link>
                                  )}
                              </>
                            )}

                            {/* ACTIVE DELIVERY */}
                            {isCurrentActive && (
                              <Link
                                href={`/rider/deliveries/${delivery.id}`}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                              >
                                Continue Delivery
                                <FiArrowRight />
                              </Link>
                            )}

                            {/* COMPLETED */}
                            {delivery.status ===
                              "Completed" && (
                              <Link
                                href={`/rider/deliveries/${delivery.id}`}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-500 hover:text-orange-600"
                              >
                                View Details
                                <FiArrowRight />
                              </Link>
                            )}

                            {/* CANCELLED */}
                            {delivery.status ===
                              "Cancelled" && (
                              <Link
                                href={`/rider/deliveries/${delivery.id}`}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-500 transition hover:border-gray-400 hover:text-gray-700"
                              >
                                View Details
                                <FiArrowRight />
                              </Link>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  }
                )
              )}
            </div>
          </section>

          {/* COMPLIANCE DOCUMENTS */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                  Account Compliance
                </p>

                <h2 className="mt-1 text-xl font-black text-gray-950">
                  Document Status
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Keep your documents current to continue receiving delivery
                  opportunities.
                </p>
              </div>

              <Link
                href="/rider/profile#documents"
                className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700"
              >
                Manage Documents
                <FiArrowRight />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {documents.map(
                (document) => (
                  <div
                    key={document.id}
                    className={`rounded-xl border p-4 ${
                      document.status ===
                      "Valid"
                        ? "border-green-200 bg-green-50"
                        : document.status ===
                            "Expiring Soon"
                          ? "border-yellow-200 bg-yellow-50"
                          : document.status ===
                              "Under Review"
                            ? "border-blue-200 bg-blue-50"
                            : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-black text-gray-900">
                        {document.name}
                      </p>

                      {document.status ===
                        "Valid" && (
                        <FiCheckCircle className="text-green-600" />
                      )}

                      {document.status ===
                        "Expiring Soon" && (
                        <FiAlertTriangle className="text-yellow-600" />
                      )}

                      {document.status ===
                        "Under Review" && (
                        <FiClock className="text-blue-600" />
                      )}

                      {(document.status ===
                        "Expired" ||
                        document.status ===
                          "Missing") && (
                        <FiXCircle className="text-red-600" />
                      )}
                    </div>

                    <p className="mt-2 text-xs font-bold text-gray-500">
                      {document.status}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Expiry:{" "}
                      {document.expiryDate}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>

          {/* OPERATIONAL POLICY */}
          <section className="mt-6 rounded-2xl bg-gray-950 p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
                <FiShield />
              </div>

              <div>
                <h2 className="font-black">
                  Rider Delivery Policy
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
                  Door-Step checks rider compliance before allowing new
                  deliveries. Riders with expired, missing or under-review
                  documents cannot accept new delivery requests. Riders with
                  documents that are expiring soon may continue working while
                  renewing their documents. Going offline does not cancel an
                  already-active delivery.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">
                  Online
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Can receive and accept eligible new deliveries.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">
                  Offline
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Cannot accept new deliveries, but active deliveries continue.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">
                  Expiring Soon
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Continue working and renew documents.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">
                  Restricted
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  New deliveries disabled until compliance is restored.
                </p>
              </div>
            </div>
          </section>

          {/* DEMO NOTICE */}
          <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
            <p className="text-xs leading-5 text-orange-800">
              <strong>Demo mode:</strong> Rider compliance, online status and
              delivery permissions currently live in this page&apos;s React
              state/localStorage. In production, the backend must be the source
              of truth and prevent restricted or offline riders from receiving
              new delivery assignments.
            </p>
          </div>
        </main>
      </div>
    </RiderAuthGuard>
  );
}

export default RiderDeliveriesPage;
