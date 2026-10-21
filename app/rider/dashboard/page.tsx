
"use client";

import RiderAuthGuard from "../RiderAuthGuard";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiPackage,
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

type RiderAccountStatus =
  | "Active"
  | "Suspended";

type DeliveryStatus =
  | "Available"
  | "Active"
  | "Heading to Pickup"
  | "Picked Up"
  | "Heading to Customer"
  | "Completed";

type ComplianceDocument = {
  id: string;
  name: string;
  expiryDate: string;
  status: DocumentStatus;
};

type Delivery = {
  id: string;
  restaurant: string;
  customer: string;
  pickup: string;
  dropoff: string;
  amount: number;
  earning: number;
  status: DeliveryStatus;
};

type ComplianceLevel =
  | "valid"
  | "warning"
  | "review"
  | "restricted"
  | "suspended";

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
    restaurant: "Chicken Republic",
    customer: "John Okafor",
    pickup: "Admiralty Way, Lekki",
    dropoff: "Lekki Phase 1",
    amount: 8500,
    earning: 1500,
    status: "Active",
  },
  {
    id: "ORD-10002",
    restaurant: "Bukka Hut",
    customer: "Sarah Williams",
    pickup: "Ikeja City Mall",
    dropoff: "Allen Avenue, Ikeja",
    amount: 7200,
    earning: 1300,
    status: "Available",
  },
  {
    id: "ORD-10003",
    restaurant: "The Place",
    customer: "David Emmanuel",
    pickup: "Lekki Phase 1",
    dropoff: "Ikoyi",
    amount: 12400,
    earning: 1800,
    status: "Completed",
  },
];

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function getDaysUntilExpiry(expiryDate: string) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const expiry = new Date(`${expiryDate}T23:59:59`);

  const difference =
    expiry.getTime() - today.getTime();

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
}

function getAutomaticDocumentStatus(
  document: ComplianceDocument
): DocumentStatus {
  /*
   * Missing and Under Review are controlled by the
   * verification process and should not be replaced
   * by date calculations.
   */
  if (
    document.status === "Missing" ||
    document.status === "Under Review"
  ) {
    return document.status;
  }

  const daysRemaining =
    getDaysUntilExpiry(document.expiryDate);

  if (daysRemaining < 0) {
    return "Expired";
  }

  if (daysRemaining <= 30) {
    return "Expiring Soon";
  }

  return "Valid";
}

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl text-orange-600">
        {icon}
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black text-gray-950">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>
    </div>
  );
}

function RiderDashboard() {
  const [documents] =
    useState<ComplianceDocument[]>(initialDocuments);

  const [deliveries, setDeliveries] =
    useState<Delivery[]>(initialDeliveries);

  /*
   * DEMO ACCOUNT STATUS
   *
   * Production:
   * This must come from the authenticated backend.
   */
  const [accountStatus] =
    useState<RiderAccountStatus>("Active");

  const [isOnline, setIsOnline] =
    useState(false);

  const [actionMessage, setActionMessage] =
    useState("");

  /*
   * ACTIVE DELIVERY
   *
   * Once a delivery has started, the rider is allowed
   * to finish it even if compliance becomes restricted.
   */
  const activeDelivery = deliveries.find(
    (delivery) =>
      delivery.status === "Active" ||
      delivery.status === "Heading to Pickup" ||
      delivery.status === "Picked Up" ||
      delivery.status === "Heading to Customer"
  );

  const hasActiveDelivery =
    Boolean(activeDelivery);

  /*
   * AUTOMATIC DOCUMENT STATUS
   *
   * The expiry date is now checked automatically.
   *
   * 31+ days = Valid
   * 30 days or less = Expiring Soon
   * Less than 0 days = Expired
   *
   * Missing / Under Review remain controlled manually
   * by the verification process.
   */
  const evaluatedDocuments =
    useMemo(() => {
      return documents.map((document) => ({
        ...document,
        status: getAutomaticDocumentStatus(
          document
        ),
      }));
    }, [documents]);

  /*
   * COMPLIANCE ENGINE
   */
  const compliance = useMemo(() => {
    /*
     * SUSPENDED ACCOUNT
     */
    if (accountStatus === "Suspended") {
      return {
        canGoOnline: false,
        canAcceptDeliveries: false,
        canReceiveAssignments: false,
        canStartNewDelivery: false,
        level: "suspended" as ComplianceLevel,
        title: "Rider Account Suspended",
        message:
          "Your Door-Step rider account is currently suspended. Contact Door-Step support for assistance.",
        document: null,
        daysRemaining: null,
      };
    }

    /*
     * EXPIRED DOCUMENT
     */
    const expiredDocument =
      evaluatedDocuments.find(
        (document) =>
          document.status === "Expired"
      );

    if (expiredDocument) {
      return {
        canGoOnline: false,
        canAcceptDeliveries: false,
        canReceiveAssignments: false,
        canStartNewDelivery: false,
        level: "restricted" as ComplianceLevel,
        title: "Rider Access Restricted",
        message: `${expiredDocument.name} has expired. Upload a valid document and wait for admin verification before accepting new deliveries.`,
        document: expiredDocument,
        daysRemaining: getDaysUntilExpiry(
          expiredDocument.expiryDate
        ),
      };
    }

    /*
     * MISSING DOCUMENT
     */
    const missingDocument =
      evaluatedDocuments.find(
        (document) =>
          document.status === "Missing"
      );

    if (missingDocument) {
      return {
        canGoOnline: false,
        canAcceptDeliveries: false,
        canReceiveAssignments: false,
        canStartNewDelivery: false,
        level: "restricted" as ComplianceLevel,
        title: "Required Document Missing",
        message: `${missingDocument.name} is missing. Upload the required document before going online.`,
        document: missingDocument,
        daysRemaining: null,
      };
    }

    /*
     * UNDER REVIEW
     */
    const underReviewDocument =
      evaluatedDocuments.find(
        (document) =>
          document.status === "Under Review"
      );

    if (underReviewDocument) {
      return {
        canGoOnline: false,
        canAcceptDeliveries: false,
        canReceiveAssignments: false,
        canStartNewDelivery: false,
        level: "review" as ComplianceLevel,
        title: "Verification in Progress",
        message: `${underReviewDocument.name} is currently being reviewed by the Door-Step admin team.`,
        document: underReviewDocument,
        daysRemaining: null,
      };
    }

    /*
     * EXPIRING DOCUMENT
     */
    const expiringDocument =
      evaluatedDocuments.find(
        (document) =>
          document.status === "Expiring Soon"
      );

    if (expiringDocument) {
      const daysRemaining =
        getDaysUntilExpiry(
          expiringDocument.expiryDate
        );

      return {
        canGoOnline: true,
        canAcceptDeliveries: true,
        canReceiveAssignments: true,
        canStartNewDelivery: true,
        level: "warning" as ComplianceLevel,
        title:
          daysRemaining <= 7
            ? "Urgent Document Renewal"
            : "Document Expiring Soon",
        message:
          daysRemaining <= 7
            ? `${expiringDocument.name} expires in ${Math.max(
                daysRemaining,
                0
              )} day${
                Math.max(daysRemaining, 0) === 1
                  ? ""
                  : "s"
              }. Please renew it immediately.`
            : `${expiringDocument.name} expires on ${expiringDocument.expiryDate}. Please renew it before the expiry date.`,
        document: expiringDocument,
        daysRemaining,
      };
    }

    /*
     * EVERYTHING VALID
     */
    return {
      canGoOnline: true,
      canAcceptDeliveries: true,
      canReceiveAssignments: true,
      canStartNewDelivery: true,
      level: "valid" as ComplianceLevel,
      title: "Compliance Verified",
      message:
        "All required rider documents are currently valid.",
      document: null,
      daysRemaining: null,
    };
  }, [
    accountStatus,
    evaluatedDocuments,
  ]);

  /*
   * OPERATIONAL STATUS
   *
   * Important:
   *
   * A rider can finish an active delivery even after
   * becoming restricted.
   *
   * But the rider cannot:
   * - go online
   * - accept a new delivery
   * - receive a new assignment
   * - start another delivery
   */
  const operationalStatus = useMemo(() => {
    const restricted =
      !compliance.canAcceptDeliveries;

    return {
      isRestricted: restricted,

      canContinueActiveDelivery:
        hasActiveDelivery &&
        accountStatus === "Active",

      canAcceptNewDelivery:
        compliance.canAcceptDeliveries &&
        accountStatus === "Active" &&
        !hasActiveDelivery,

      canReceiveNewAssignment:
        compliance.canReceiveAssignments &&
        accountStatus === "Active",

      canGoOnline:
        compliance.canGoOnline &&
        accountStatus === "Active",
    };
  }, [
    accountStatus,
    compliance,
    hasActiveDelivery,
  ]);

  /*
   * FORCE OFFLINE WHEN RESTRICTED
   *
   * A restricted rider must not remain online.
   */
  useMemo(() => {
    if (!operationalStatus.canGoOnline && isOnline) {
      setIsOnline(false);
    }
  }, [
    operationalStatus.canGoOnline,
    isOnline,
  ]);

  /*
   * ONLINE TOGGLE
   */
  const handleOnlineToggle = () => {
    if (!operationalStatus.canGoOnline) {
      /*
       * The active delivery remains protected.
       */
      if (
        operationalStatus.canContinueActiveDelivery
      ) {
        setActionMessage(
          "Your compliance status requires attention. You can finish your current delivery, but new deliveries are disabled."
        );

        return;
      }

      setIsOnline(false);

      setActionMessage(
        "You cannot go online because your rider account or compliance documents require attention."
      );

      return;
    }

    if (isOnline) {
      setIsOnline(false);

      setActionMessage(
        "You are now offline."
      );

      return;
    }

    setIsOnline(true);

    setActionMessage(
      "You are now online and available for deliveries."
    );
  };

  /*
   * ACCEPT DELIVERY
   */
  const handleAcceptDelivery = (
    deliveryId: string
  ) => {
    /*
     * Rider must be online.
     */
    if (!isOnline) {
      setActionMessage(
        "You must be online before accepting a delivery."
      );

      return;
    }

    /*
     * Compliance check.
     */
    if (
      !operationalStatus.canAcceptNewDelivery
    ) {
      setActionMessage(
        "You cannot accept a new delivery until your compliance status is restored."
      );

      return;
    }

    /*
     * Prevent multiple active deliveries.
     */
    if (hasActiveDelivery) {
      setActionMessage(
        "You already have an active delivery. Complete it before accepting another delivery."
      );

      return;
    }

    setDeliveries((currentDeliveries) =>
      currentDeliveries.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              status: "Active",
            }
          : delivery
      )
    );

    setActionMessage(
      "Delivery accepted successfully. Your delivery is now active."
    );
  };

  const availableDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status === "Available"
    );

  const completedDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status === "Completed"
    );

  /*
   * COMPLIANCE STYLES
   */
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
    complianceStyles[compliance.level];

  return (
    <RiderAuthGuard>
      <div className="min-h-screen bg-[#f7f7f5]">
        {/* HEADER */}
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <FiTruck className="text-xl" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                    Door-Step
                  </p>

                  <h1 className="text-xl font-black text-gray-950">
                    Rider Dashboard
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/rider/deliveries"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-500 hover:text-orange-600"
                >
                  <FiPackage />
                  Deliveries
                </Link>

                <Link
                  href="/rider/profile"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-500 hover:text-orange-600"
                >
                  <FiUser />
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* WELCOME */}
          <section className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                Good day, Michael
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                Ready to deliver?
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Manage your availability, deliveries and earnings from here.
              </p>
            </div>

            {/* ONLINE TOGGLE */}
            <div
              className={`rounded-2xl border p-4 ${
                operationalStatus.canGoOnline
                  ? "border-gray-200 bg-white"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Availability
                  </p>

                  <p
                    className={`mt-1 text-sm font-black ${
                      isOnline
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    {isOnline
                      ? "You are Online"
                      : "You are Offline"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOnlineToggle}
                  disabled={
                    !operationalStatus.canGoOnline
                  }
                  className={`relative h-8 w-14 rounded-full transition ${
                    !operationalStatus.canGoOnline
                      ? "cursor-not-allowed bg-gray-300"
                      : isOnline
                        ? "bg-green-500"
                        : "bg-gray-300"
                  }`}
                  aria-label="Toggle rider availability"
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                      isOnline
                        ? "left-7"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>

              {!operationalStatus.canGoOnline && (
                <p className="mt-3 max-w-xs text-xs leading-5 text-red-700">
                  {operationalStatus.canContinueActiveDelivery
                    ? "You can finish your active delivery, but new delivery activity is restricted."
                    : "Your account is restricted because a compliance requirement needs attention."}
                </p>
              )}
            </div>
          </section>

          {/* ACTION MESSAGE */}
          {actionMessage && (
            <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FiCheckCircle className="text-green-500" />

                {actionMessage}
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

          {/* COMPLIANCE */}
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
                      {compliance.canGoOnline
                        ? "Access Available"
                        : "Access Restricted"}
                    </span>
                  </div>

                  <p
                    className={`mt-1 max-w-3xl text-sm leading-6 ${complianceStyle.text}`}
                  >
                    {compliance.message}
                  </p>

                  {compliance.daysRemaining !==
                    null &&
                    compliance.daysRemaining >= 0 && (
                      <p
                        className={`mt-3 text-xs font-black ${complianceStyle.text}`}
                      >
                        {compliance.daysRemaining ===
                        0
                          ? "Expires today."
                          : `${compliance.daysRemaining} day${
                              compliance.daysRemaining ===
                              1
                                ? ""
                                : "s"
                            } remaining.`}
                      </p>
                    )}

                  {/* ACTIVE DELIVERY PROTECTION */}
                  {operationalStatus.canContinueActiveDelivery &&
                    compliance.level !== "valid" &&
                    compliance.level !== "warning" && (
                      <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start gap-3">
                          <FiShield className="mt-0.5 shrink-0 text-blue-600" />

                          <div>
                            <p className="text-sm font-black text-blue-900">
                              Active Delivery Protected
                            </p>

                            <p className="mt-1 text-xs leading-5 text-blue-800">
                              You can finish your current delivery. Once it
                              is completed, you will not be able to accept
                              another delivery until your compliance status
                              is restored.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <Link
                href="/rider/profile#documents"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-gray-800 shadow-sm transition hover:text-orange-600"
              >
                Manage Documents
                <FiChevronRight />
              </Link>
            </div>
          </section>

          {/* ACTION REQUIRED */}
          {compliance.level !== "valid" && (
            <section className="mt-6 rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <FiAlertTriangle />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                    Action Required
                  </p>

                  <h2 className="mt-1 text-xl font-black text-gray-950">
                    {compliance.level === "warning"
                      ? compliance.daysRemaining !==
                          null &&
                        compliance.daysRemaining <= 7
                        ? "Renew your document immediately"
                        : "Renew your document soon"
                      : "Resolve your compliance issue"}
                  </h2>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                    {compliance.document
                      ? `${compliance.document.name} currently has a status of "${compliance.document.status}".`
                      : "Your rider account requires attention before normal delivery operations can continue."}
                  </p>

                  <Link
                    href="/rider/profile#documents"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                  >
                    Review Documents
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* RESTRICTED ACTIONS */}
          {!operationalStatus.canAcceptNewDelivery &&
            accountStatus !== "Suspended" && (
              <section className="mt-6 rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <FiShield />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-black text-gray-950">
                      New Deliveries Temporarily Disabled
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                      You cannot accept new delivery requests or receive new
                      delivery assignments while your compliance status is
                      under restriction.
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl bg-red-50 p-4">
                        <p className="text-xs font-bold text-red-700">
                          Go Online
                        </p>

                        <p className="mt-1 text-sm font-black text-red-900">
                          Disabled
                        </p>
                      </div>

                      <div className="rounded-xl bg-red-50 p-4">
                        <p className="text-xs font-bold text-red-700">
                          Accept Delivery
                        </p>

                        <p className="mt-1 text-sm font-black text-red-900">
                          Disabled
                        </p>
                      </div>

                      <div className="rounded-xl bg-red-50 p-4">
                        <p className="text-xs font-bold text-red-700">
                          New Assignment
                        </p>

                        <p className="mt-1 text-sm font-black text-red-900">
                          Disabled
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

          {/* SUSPENDED ACCOUNT */}
          {accountStatus === "Suspended" && (
            <section className="mt-6 rounded-2xl border border-red-300 bg-red-50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-200 text-red-700">
                  <FiXCircle />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700">
                    Account Suspended
                  </p>

                  <h2 className="mt-1 text-xl font-black text-red-950">
                    Rider operations are disabled
                  </h2>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-red-900">
                    Your rider account has been suspended. You cannot go
                    online, accept deliveries, receive assignments or start
                    new deliveries until the suspension is lifted by the
                    Door-Step administration team.
                  </p>

                  <Link
                    href="/rider/profile"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-800"
                  >
                    View Account
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* STATS */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<FiPackage />}
              label="Today's Deliveries"
              value="12"
              description="Completed today"
            />

            <StatCard
              icon={<FiDollarSign />}
              label="Today's Earnings"
              value="₦18,500"
              description="Before withdrawals"
            />

            <StatCard
              icon={<FiClock />}
              label="Online Time"
              value="6h 24m"
              description="Today's active time"
            />

            <StatCard
              icon={<FiCheckCircle />}
              label="Success Rate"
              value="98.4%"
              description="Delivery completion"
            />
          </section>

          {/* ACTIVE DELIVERY */}
          {activeDelivery && (
            <section className="mt-6 rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                      Active Delivery
                    </span>

                    <span className="text-xs font-bold text-gray-400">
                      {activeDelivery.id}
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl font-black text-gray-950">
                    {activeDelivery.restaurant}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Delivering to {activeDelivery.customer}
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

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FiMapPin />

                    <span className="text-xs font-bold uppercase tracking-wide">
                      Pickup
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-bold text-gray-900">
                    {activeDelivery.pickup}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FiMapPin />

                    <span className="text-xs font-bold uppercase tracking-wide">
                      Drop-off
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-bold text-gray-900">
                    {activeDelivery.dropoff}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FiDollarSign />

                    <span className="text-xs font-bold uppercase tracking-wide">
                      Your Earnings
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-black text-green-600">
                    {formatCurrency(
                      activeDelivery.earning
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <FiShield className="mt-0.5 shrink-0 text-blue-600" />

                  <p className="text-xs leading-5 text-blue-800">
                    <strong>
                      Active delivery protection:
                    </strong>{" "}
                    if a required document expires while you are already
                    completing this delivery, you can finish the current
                    delivery. New deliveries will remain disabled until your
                    compliance status is restored.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* AVAILABLE DELIVERIES */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-950">
                  Available Deliveries
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Nearby delivery requests available for you.
                </p>
              </div>

              <Link
                href="/rider/deliveries"
                className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700"
              >
                View All
                <FiChevronRight />
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {availableDeliveries.length === 0 ? (
                <div className="rounded-xl bg-gray-50 p-8 text-center">
                  <FiPackage className="mx-auto text-3xl text-gray-300" />

                  <p className="mt-3 text-sm font-bold text-gray-600">
                    No available deliveries
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    New delivery requests will appear here.
                  </p>
                </div>
              ) : (
                availableDeliveries.map(
                  (delivery) => (
                    <div
                      key={delivery.id}
                      className="rounded-2xl border border-gray-200 p-5"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-black text-gray-950">
                              {delivery.restaurant}
                            </h3>

                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                              Available
                            </span>
                          </div>

                          <p className="mt-1 text-xs font-bold text-gray-400">
                            {delivery.id}
                          </p>

                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                Pickup
                              </p>

                              <p className="mt-1 text-sm font-semibold text-gray-700">
                                {delivery.pickup}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                Drop-off
                              </p>

                              <p className="mt-1 text-sm font-semibold text-gray-700">
                                {delivery.dropoff}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                          <div className="rounded-xl bg-green-50 px-5 py-3">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-green-600">
                              Your Earnings
                            </p>

                            <p className="mt-1 text-lg font-black text-green-700">
                              {formatCurrency(
                                delivery.earning
                              )}
                            </p>
                          </div>

                          <button
                            type="button"
                            disabled={
                              !operationalStatus.canAcceptNewDelivery ||
                              !isOnline ||
                              hasActiveDelivery
                            }
                            onClick={() =>
                              handleAcceptDelivery(
                                delivery.id
                              )
                            }
                            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                              operationalStatus.canAcceptNewDelivery &&
                              isOnline &&
                              !hasActiveDelivery
                                ? "bg-gray-950 text-white hover:bg-orange-600"
                                : "cursor-not-allowed bg-gray-200 text-gray-400"
                            }`}
                          >
                            {hasActiveDelivery
                              ? "Complete Current Delivery"
                              : !isOnline
                                ? "Go Online First"
                                : operationalStatus.canAcceptNewDelivery
                                  ? "Accept Delivery"
                                  : "Restricted"}

                            <FiArrowRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </section>

          {/* RECENT DELIVERIES */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-950">
                  Recent Deliveries
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your latest delivery activity.
                </p>
              </div>

              <Link
                href="/rider/deliveries"
                className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700"
              >
                View All
                <FiChevronRight />
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {completedDeliveries.map(
                (delivery) => (
                  <Link
                    key={delivery.id}
                    href={`/rider/deliveries/${delivery.id}`}
                    className="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-orange-200 hover:bg-orange-50/30 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                        <FiCheckCircle />
                      </div>

                      <div>
                        <p className="text-sm font-black text-gray-900">
                          {delivery.restaurant}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {delivery.id} •{" "}
                          {delivery.customer}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div>
                        <p className="text-xs text-gray-400">
                          Earned
                        </p>

                        <p className="mt-1 text-sm font-black text-green-600">
                          {formatCurrency(
                            delivery.earning
                          )}
                        </p>
                      </div>

                      <FiChevronRight className="text-gray-400" />
                    </div>
                  </Link>
                )
              )}
            </div>
          </section>

          {/* COMPLIANCE DOCUMENTS */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-950">
                  Document Status
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Current status of your rider compliance documents.
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
              {evaluatedDocuments.map(
                (document) => {
                  const daysRemaining =
                    getDaysUntilExpiry(
                      document.expiryDate
                    );

                  return (
                    <div
                      key={document.id}
                      className={`rounded-xl border p-4 ${
                        document.status === "Valid"
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

                      {document.status ===
                        "Expiring Soon" &&
                        daysRemaining >= 0 && (
                          <p
                            className={`mt-3 text-xs font-black ${
                              daysRemaining <= 7
                                ? "text-red-600"
                                : "text-yellow-700"
                            }`}
                          >
                            {daysRemaining === 0
                              ? "Expires today"
                              : `${daysRemaining} day${
                                  daysRemaining ===
                                  1
                                    ? ""
                                    : "s"
                                } remaining`}
                          </p>
                        )}

                      {document.status ===
                        "Expired" && (
                        <p className="mt-3 text-xs font-black text-red-700">
                          Document expired. Upload a current document.
                        </p>
                      )}

                      {document.status ===
                        "Under Review" && (
                        <p className="mt-3 text-xs font-black text-blue-700">
                          Waiting for admin verification.
                        </p>
                      )}

                      {document.status ===
                        "Missing" && (
                        <p className="mt-3 text-xs font-black text-red-700">
                          Required document must be uploaded.
                        </p>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {/* FOOTER POLICY */}
          <section className="mt-6 rounded-2xl bg-gray-950 p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
                <FiShield />
              </div>

              <div>
                <h2 className="font-black">
                  Rider Compliance
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
                  Door-Step continuously checks rider compliance. Required
                  documents receive an expiry warning 30 days before expiry
                  and an urgent warning within 7 days. Once a required
                  document expires, new delivery activity is restricted. If
                  you are already completing a delivery, you may finish that
                  delivery before the restriction takes effect.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">
                  30 Days
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Expiry warning begins.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">
                  7 Days
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Urgent renewal warning.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">
                  Expired
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  New deliveries restricted.
                </p>
              </div>
            </div>
          </section>

          {/* DEMO NOTICE */}
          <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
            <p className="text-xs leading-5 text-orange-800">
              <strong>Demo mode:</strong> Compliance status currently lives
              in this page&apos;s React state. In production, the backend
              must be the source of truth and enforce all rider restrictions
              server-side.
            </p>
          </div>
        </main>
      </div>
    </RiderAuthGuard>
  );
}

export default RiderDashboard;
