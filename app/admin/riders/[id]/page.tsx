
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiEdit3,
  FiFileText,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiTruck,
  FiUser,
  FiX,
  FiXCircle,
} from "react-icons/fi";

type DocumentStatus =
  | "Valid"
  | "Expiring Soon"
  | "Expired"
  | "Missing"
  | "Under Review";

type RiderStatus = "Active" | "Suspended" | "Restricted" | "Pending Review";

type RiderDocument = {
  id: string;
  name: string;
  type: string;
  documentNumber: string;
  expiryDate: string;
  status: DocumentStatus;
  uploadedDate: string;
  verifiedDate?: string;
};

type Rider = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  joinedDate: string;
  status: RiderStatus;
  rating: number;
  completedDeliveries: number;
  cancelledDeliveries: number;
  totalEarnings: number;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  plateNumber: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  emergencyContact: string;
  emergencyPhone: string;
};

const riderData: Rider = {
  id: "RID-1001",
  firstName: "Michael",
  lastName: "Adeyemi",
  email: "michael.adeyemi@example.com",
  phone: "+234 803 456 7890",
  location: "Lekki Phase 1, Lagos",
  joinedDate: "August 12, 2025",
  status: "Active",
  rating: 4.8,
  completedDeliveries: 248,
  cancelledDeliveries: 6,
  totalEarnings: 428500,
  vehicleType: "Motorcycle",
  vehicleBrand: "Honda",
  vehicleModel: "CB125",
  vehicleYear: "2023",
  plateNumber: "KJA-482-LA",
  bankName: "GTBank",
  accountName: "Michael Adeyemi",
  accountNumber: "0123456789",
  emergencyContact: "David Adeyemi",
  emergencyPhone: "+234 809 123 4567",
};

const initialDocuments: RiderDocument[] = [
  {
    id: "DOC-1001",
    name: "Government ID",
    type: "National ID",
    documentNumber: "NIN ••••••••4821",
    expiryDate: "2029-08-15",
    status: "Valid",
    uploadedDate: "August 12, 2025",
    verifiedDate: "August 13, 2025",
  },
  {
    id: "DOC-1002",
    name: "Driver's Licence",
    type: "Driver Licence",
    documentNumber: "DL ••••••7291",
    expiryDate: "2026-10-12",
    status: "Expiring Soon",
    uploadedDate: "August 12, 2025",
    verifiedDate: "August 13, 2025",
  },
  {
    id: "DOC-1003",
    name: "Vehicle Registration",
    type: "Vehicle Registration",
    documentNumber: "REG ••••••9214",
    expiryDate: "2027-06-20",
    status: "Valid",
    uploadedDate: "August 12, 2025",
    verifiedDate: "August 13, 2025",
  },
  {
    id: "DOC-1004",
    name: "Profile Photo",
    type: "Identity Photo",
    documentNumber: "PHOTO-1001",
    expiryDate: "Not Applicable",
    status: "Valid",
    uploadedDate: "August 12, 2025",
    verifiedDate: "August 13, 2025",
  },
];

const deliveryHistory = [
  {
    id: "ORD-10001",
    customer: "John Okafor",
    restaurant: "Chicken Republic",
    status: "Delivered",
    amount: 8500,
    earning: 1500,
    date: "Sep 18, 2026",
  },
  {
    id: "ORD-10003",
    customer: "David Emmanuel",
    restaurant: "The Place",
    status: "Delivered",
    amount: 12400,
    earning: 1800,
    date: "Sep 17, 2026",
  },
  {
    id: "ORD-09982",
    customer: "Sarah Williams",
    restaurant: "Bukka Hut",
    status: "Delivered",
    amount: 7200,
    earning: 1300,
    date: "Sep 16, 2026",
  },
  {
    id: "ORD-09941",
    customer: "Aisha Ibrahim",
    restaurant: "Kilimanjaro",
    status: "Delivered",
    amount: 9100,
    earning: 1400,
    date: "Sep 15, 2026",
  },
];

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function StatusBadge({ status }: { status: RiderStatus }) {
  const styles: Record<RiderStatus, string> = {
    Active: "bg-green-50 text-green-700 border-green-200",
    Suspended: "bg-red-50 text-red-700 border-red-200",
    Restricted: "bg-orange-50 text-orange-700 border-orange-200",
    "Pending Review": "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function DocumentStatusBadge({
  status,
}: {
  status: DocumentStatus;
}) {
  const styles: Record<DocumentStatus, string> = {
    Valid: "bg-green-50 text-green-700 border-green-200",
    "Expiring Soon": "bg-yellow-50 text-yellow-700 border-yellow-200",
    Expired: "bg-red-50 text-red-700 border-red-200",
    Missing: "bg-gray-100 text-gray-600 border-gray-200",
    "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black text-gray-950">{value}</p>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-orange-500">{icon}</div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function AdminRiderDetails() {
  const params = useParams();
  const riderId = params.id as string;

  const [rider, setRider] = useState<Rider>({
    ...riderData,
    id: riderId || riderData.id,
  });

  const [documents, setDocuments] =
    useState<RiderDocument[]>(initialDocuments);

  const [selectedDocument, setSelectedDocument] =
    useState<RiderDocument | null>(null);

  const [actionMessage, setActionMessage] = useState("");

  const compliance = useMemo(() => {
    const hasExpired = documents.some(
      (document) => document.status === "Expired"
    );

    const hasMissing = documents.some(
      (document) => document.status === "Missing"
    );

    const hasReview = documents.some(
      (document) => document.status === "Under Review"
    );

    const hasExpiring = documents.some(
      (document) => document.status === "Expiring Soon"
    );

    if (hasExpired || hasMissing) {
      return {
        label: "Non-Compliant",
        description:
          "One or more required documents require attention.",
        className: "bg-red-50 text-red-700 border-red-200",
        icon: <FiXCircle />,
      };
    }

    if (hasReview) {
      return {
        label: "Under Review",
        description:
          "A document is waiting for administrator verification.",
        className: "bg-blue-50 text-blue-700 border-blue-200",
        icon: <FiClock />,
      };
    }

    if (hasExpiring) {
      return {
        label: "Expiring Soon",
        description:
          "One or more documents will expire soon.",
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
        icon: <FiAlertTriangle />,
      };
    }

    return {
      label: "Compliant",
      description:
        "All required rider documents are currently valid.",
      className: "bg-green-50 text-green-700 border-green-200",
      icon: <FiCheckCircle />,
    };
  }, [documents]);

  const handleDocumentAction = (
    documentId: string,
    action: "approve" | "reject" | "review"
  ) => {
    setDocuments((currentDocuments) =>
      currentDocuments.map((document) => {
        if (document.id !== documentId) {
          return document;
        }

        if (action === "approve") {
          return {
            ...document,
            status: "Valid",
            verifiedDate: "September 19, 2026",
          };
        }

        if (action === "reject") {
          return {
            ...document,
            status: "Missing",
            verifiedDate: undefined,
          };
        }

        return {
          ...document,
          status: "Under Review",
        };
      })
    );

    const document = documents.find((item) => item.id === documentId);

    if (document) {
      if (action === "approve") {
        setActionMessage(`${document.name} approved successfully.`);
      }

      if (action === "reject") {
        setActionMessage(
          `${document.name} rejected. Rider must upload a new document.`
        );
      }

      if (action === "review") {
        setActionMessage(`${document.name} moved to Under Review.`);
      }
    }

    setSelectedDocument(null);
  };

  const handleRestrict = () => {
    setRider((current) => ({
      ...current,
      status:
        current.status === "Restricted" ? "Active" : "Restricted",
    }));

    setActionMessage(
      rider.status === "Restricted"
        ? "Rider access restored."
        : "Rider has been restricted from receiving new deliveries."
    );
  };

  const handleSuspend = () => {
    setRider((current) => ({
      ...current,
      status:
        current.status === "Suspended" ? "Active" : "Suspended",
    }));

    setActionMessage(
      rider.status === "Suspended"
        ? "Rider account activated."
        : "Rider account suspended."
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6]">
      {/* HEADER */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/admin/riders"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-600"
            >
              <FiArrowLeft />
              Back to Riders
            </Link>

            <div className="text-xs font-semibold text-gray-400">
              Admin / Riders / {rider.id}
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ACTION MESSAGE */}
        {actionMessage && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            <div className="flex items-center gap-2">
              <FiCheckCircle />
              {actionMessage}
            </div>

            <button
              type="button"
              onClick={() => setActionMessage("")}
              className="text-green-500 hover:text-green-800"
            >
              <FiX />
            </button>
          </div>
        )}

        {/* RIDER HERO */}
        <section className="rounded-3xl bg-gray-950 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-orange-500 text-4xl font-black">
                {rider.firstName.charAt(0)}
                {rider.lastName.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-black">
                    {rider.firstName} {rider.lastName}
                  </h1>

                  <StatusBadge status={rider.status} />
                </div>

                <p className="mt-2 text-sm text-gray-400">
                  {rider.id} • Rider since {rider.joinedDate}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
                  <span className="inline-flex items-center gap-2">
                    <FiPhone className="text-orange-400" />
                    {rider.phone}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <FiMail className="text-orange-400" />
                    {rider.email}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <FiMapPin className="text-orange-400" />
                    {rider.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${rider.phone}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <FiPhone />
                Call Rider
              </a>

              <a
                href={`mailto:${rider.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <FiMail />
                Email
              </a>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<FiTruck />}
            label="Completed Deliveries"
            value={rider.completedDeliveries.toLocaleString()}
          />

          <StatCard
            icon={<FiCheckCircle />}
            label="Rider Rating"
            value={`${rider.rating}/5`}
          />

          <StatCard
            icon={<FiCreditCard />}
            label="Total Earnings"
            value={formatCurrency(rider.totalEarnings)}
          />

          <StatCard
            icon={<FiXCircle />}
            label="Cancelled Deliveries"
            value={rider.cancelledDeliveries.toString()}
          />
        </section>

        {/* COMPLIANCE SUMMARY */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-black text-gray-950">
                  Compliance Status
                </h2>

                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${compliance.className}`}
                >
                  {compliance.icon}
                  {compliance.label}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                {compliance.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleRestrict}
                className="inline-flex items-center gap-2 rounded-xl border border-orange-200 px-4 py-3 text-sm font-bold text-orange-700 transition hover:bg-orange-50"
              >
                <FiShield />
                {rider.status === "Restricted"
                  ? "Restore Access"
                  : "Restrict Rider"}
              </button>

              <button
                type="button"
                onClick={handleSuspend}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition ${
                  rider.status === "Suspended"
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-red-600 hover:bg-red-500"
                }`}
              >
                {rider.status === "Suspended" ? (
                  <>
                    <FiCheck />
                    Activate Rider
                  </>
                ) : (
                  <>
                    <FiXCircle />
                    Suspend Rider
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              {
                label: "Valid",
                value: documents.filter(
                  (document) => document.status === "Valid"
                ).length,
                className: "bg-green-50 text-green-700",
              },
              {
                label: "Expiring Soon",
                value: documents.filter(
                  (document) => document.status === "Expiring Soon"
                ).length,
                className: "bg-yellow-50 text-yellow-700",
              },
              {
                label: "Under Review",
                value: documents.filter(
                  (document) => document.status === "Under Review"
                ).length,
                className: "bg-blue-50 text-blue-700",
              },
              {
                label: "Expired / Missing",
                value: documents.filter(
                  (document) =>
                    document.status === "Expired" ||
                    document.status === "Missing"
                ).length,
                className: "bg-red-50 text-red-700",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl p-4 ${item.className}`}
              >
                <p className="text-xs font-bold uppercase tracking-wide">
                  {item.label}
                </p>

                <p className="mt-1 text-2xl font-black">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DOCUMENTS */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-950">
                Rider Documents
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Review and verify the documents submitted by this rider.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
              <FiFileText />
              {documents.length} Documents
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {documents.map((document) => (
              <div
                key={document.id}
                className="rounded-2xl border border-gray-200 p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl text-orange-500">
                      <FiFileText />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-black text-gray-950">
                          {document.name}
                        </h3>

                        <DocumentStatusBadge status={document.status} />
                      </div>

                      <p className="mt-1 text-xs font-semibold text-gray-400">
                        {document.type}
                      </p>

                      <p className="mt-3 text-sm font-bold text-gray-700">
                        {document.documentNumber}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <FiCalendar />
                          Expires: {document.expiryDate}
                        </span>

                        <span>
                          Uploaded: {document.uploadedDate}
                        </span>

                        {document.verifiedDate && (
                          <span>
                            Verified: {document.verifiedDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDocument(document)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-500 hover:text-orange-600"
                    >
                      <FiFileText />
                      Review
                    </button>

                    {document.status !== "Valid" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleDocumentAction(document.id, "approve")
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-500"
                      >
                        <FiCheck />
                        Approve
                      </button>
                    )}
                  </div>
                </div>

                {document.status === "Expiring Soon" && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-yellow-50 p-4 text-xs leading-5 text-yellow-800">
                    <FiAlertTriangle className="mt-0.5 shrink-0 text-yellow-600" />

                    <p>
                      This document is approaching expiry. The rider should
                      provide an updated document before the expiry date.
                    </p>
                  </div>
                )}

                {document.status === "Expired" && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-xs leading-5 text-red-800">
                    <FiXCircle className="mt-0.5 shrink-0 text-red-600" />

                    <p>
                      This document has expired. The rider should be
                      restricted from receiving new delivery assignments until
                      a valid replacement is verified.
                    </p>
                  </div>
                )}

                {document.status === "Under Review" && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-xs leading-5 text-blue-800">
                    <FiClock className="mt-0.5 shrink-0 text-blue-600" />

                    <p>
                      This document is waiting for administrator verification.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* RIDER INFORMATION */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-gray-950">
              Personal Information
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <InfoItem
                icon={<FiUser />}
                label="Full Name"
                value={`${rider.firstName} ${rider.lastName}`}
              />

              <InfoItem
                icon={<FiMail />}
                label="Email"
                value={rider.email}
              />

              <InfoItem
                icon={<FiPhone />}
                label="Phone"
                value={rider.phone}
              />

              <InfoItem
                icon={<FiMapPin />}
                label="Location"
                value={rider.location}
              />

              <InfoItem
                icon={<FiUser />}
                label="Emergency Contact"
                value={rider.emergencyContact}
              />

              <InfoItem
                icon={<FiPhone />}
                label="Emergency Phone"
                value={rider.emergencyPhone}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-gray-950">
              Vehicle Information
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <InfoItem
                icon={<FiTruck />}
                label="Vehicle Type"
                value={rider.vehicleType}
              />

              <InfoItem
                icon={<FiTruck />}
                label="Vehicle"
                value={`${rider.vehicleBrand} ${rider.vehicleModel}`}
              />

              <InfoItem
                icon={<FiCalendar />}
                label="Vehicle Year"
                value={rider.vehicleYear}
              />

              <InfoItem
                icon={<FiFileText />}
                label="Plate Number"
                value={rider.plateNumber}
              />
            </div>
          </div>
        </section>

        {/* PAYOUT */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <FiCreditCard className="text-xl text-orange-500" />

            <div>
              <h2 className="text-xl font-black text-gray-950">
                Payout Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Bank account linked to this rider.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <InfoItem
              icon={<FiCreditCard />}
              label="Bank"
              value={rider.bankName}
            />

            <InfoItem
              icon={<FiUser />}
              label="Account Name"
              value={rider.accountName}
            />

            <InfoItem
              icon={<FiCreditCard />}
              label="Account Number"
              value={`•••• •••• ${rider.accountNumber.slice(-4)}`}
            />
          </div>
        </section>

        {/* DELIVERY HISTORY */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-950">
                Recent Deliveries
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Recent delivery activity for this rider.
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="hidden items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700 sm:inline-flex"
            >
              View Orders
              <FiChevronRight />
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="pb-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Order
                  </th>

                  <th className="pb-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Customer
                  </th>

                  <th className="pb-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Restaurant
                  </th>

                  <th className="pb-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Amount
                  </th>

                  <th className="pb-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Rider Earnings
                  </th>

                  <th className="pb-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {deliveryHistory.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-4">
                      <Link
                        href={`/admin/orders/${delivery.id}`}
                        className="font-bold text-orange-600 hover:text-orange-700"
                      >
                        {delivery.id}
                      </Link>
                    </td>

                    <td className="py-4 text-sm font-semibold text-gray-700">
                      {delivery.customer}
                    </td>

                    <td className="py-4 text-sm text-gray-600">
                      {delivery.restaurant}
                    </td>

                    <td className="py-4 text-sm font-bold text-gray-900">
                      {formatCurrency(delivery.amount)}
                    </td>

                    <td className="py-4 text-sm font-bold text-green-600">
                      {formatCurrency(delivery.earning)}
                    </td>

                    <td className="py-4 text-sm text-gray-500">
                      {delivery.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* COMPLIANCE POLICY */}
        <section className="mt-6 rounded-2xl bg-gray-950 p-6 text-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
              <FiShield />
            </div>

            <div>
              <h2 className="font-black">Compliance Enforcement</h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
                When a required rider document expires, the production backend
                should automatically prevent the rider from going online,
                accepting a new delivery, receiving a new assignment or
                starting another delivery.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="font-black">30 Days</p>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                Warning notification and dashboard reminder.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="font-black">7 Days</p>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                Urgent warning and repeated notification.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="font-black">Expired</p>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                Restrict new delivery activity until a replacement document is
                verified.
              </p>
            </div>
          </div>
        </section>

        {/* DEMO NOTICE */}
        <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
          <p className="text-xs leading-5 text-orange-800">
            <strong>Demo mode:</strong> Document approval, rejection,
            restriction and suspension currently use local React state. In
            production, these actions must be protected by admin
            authentication and enforced by the Door-Step backend.
          </p>
        </div>
      </main>

      {/* DOCUMENT REVIEW MODAL */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                  Document Review
                </p>

                <h2 className="mt-2 text-2xl font-black text-gray-950">
                  {selectedDocument.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedDocument.type}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDocument(null)}
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <FiX />
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoItem
                  icon={<FiFileText />}
                  label="Document Number"
                  value={selectedDocument.documentNumber}
                />

                <InfoItem
                  icon={<FiCalendar />}
                  label="Expiry Date"
                  value={selectedDocument.expiryDate}
                />

                <InfoItem
                  icon={<FiClock />}
                  label="Uploaded"
                  value={selectedDocument.uploadedDate}
                />

                <InfoItem
                  icon={<FiShield />}
                  label="Status"
                  value={selectedDocument.status}
                />
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <FiFileText className="mx-auto text-3xl text-gray-400" />

              <p className="mt-3 text-sm font-bold text-gray-700">
                Document Preview
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Production version will display the securely stored document
                here.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() =>
                  handleDocumentAction(selectedDocument.id, "approve")
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-500"
              >
                <FiCheck />
                Approve
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDocumentAction(selectedDocument.id, "review")
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                <FiClock />
                Review
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDocumentAction(selectedDocument.id, "reject")
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-500"
              >
                <FiX />
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRiderDetails;
