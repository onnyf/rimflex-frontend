
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    useMemo,
    useState,
    type ReactNode,
} from "react";
import {
    FiAlertTriangle,
    FiArrowLeft,
    FiCheckCircle,
    FiChevronRight,
    FiClock,
    FiEdit3,
    FiFileText,
    FiHelpCircle,
    FiLock,
    FiLogOut,
    FiMail,
    FiMapPin,
    FiPhone,
    FiSave,
    FiShield,
    FiTruck,
    FiUpload,
    FiUser,
    FiXCircle,
} from "react-icons/fi";

import RiderAuthGuard from "../RiderAuthGuard";

/* =========================================================
   TYPES
========================================================= */

type DocumentStatus =
    | "Valid"
    | "Expiring Soon"
    | "Expired"
    | "Missing"
    | "Under Review";

type ManualStatus = "Missing" | "Under Review";

type ComplianceDocument = {
    id: string;
    name: string;
    description: string;
    expiryDate?: string;
    required: boolean;

    /*
      Used when the document is missing or waiting
      for admin verification.
    */
    manualStatus?: ManualStatus;

    /*
      If a rider uploads a replacement for an already
      expired/missing document, they remain restricted
      until admin verification is completed.
    */
    reviewBlocksOperation?: boolean;
};

/* =========================================================
   DEMO DOCUMENTS
========================================================= */

const initialDocuments: ComplianceDocument[] = [
    {
        id: "government-id",
        name: "Government ID",
        description: "National identification document",
        expiryDate: "2028-12-18",
        required: true,
    },
    {
        id: "drivers-license",
        name: "Driver's Licence",
        description: "Valid driver's licence for motorcycle delivery",
        expiryDate: "2026-10-12",
        required: true,
    },
    {
        id: "vehicle-registration",
        name: "Vehicle Registration",
        description: "Current vehicle registration document",
        expiryDate: "2027-03-25",
        required: true,
    },
    {
        id: "profile-photo",
        name: "Profile Photo",
        description: "Current rider profile photograph",
        required: true,
    },
];

/* =========================================================
   HELPERS
========================================================= */

function getDaysUntilExpiry(expiryDate?: string) {
    if (!expiryDate) {
        return null;
    }

    const today = new Date();
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
    if (document.manualStatus === "Missing") {
        return "Missing";
    }

    if (document.manualStatus === "Under Review") {
        return "Under Review";
    }

    if (!document.expiryDate) {
        return "Valid";
    }

    const daysUntilExpiry = getDaysUntilExpiry(
        document.expiryDate
    );

    if (daysUntilExpiry === null) {
        return "Valid";
    }

    if (daysUntilExpiry < 0) {
        return "Expired";
    }

    if (daysUntilExpiry <= 30) {
        return "Expiring Soon";
    }

    return "Valid";
}

function formatDate(date?: string) {
    if (!date) {
        return "No expiry date";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );
}

function getExpiryText(
    document: ComplianceDocument,
    status: DocumentStatus
) {
    const days = getDaysUntilExpiry(
        document.expiryDate
    );

    if (!document.expiryDate) {
        return "No expiry required";
    }

    if (status === "Expired") {
        return `Expired on ${formatDate(
            document.expiryDate
        )}`;
    }

    if (status === "Expiring Soon") {
        if (days === 0) {
            return "Expires today";
        }

        if (days === 1) {
            return "Expires tomorrow";
        }

        return `${days} days remaining • Expires ${formatDate(
            document.expiryDate
        )}`;
    }

    if (status === "Under Review") {
        return `Submitted for verification • Expiry ${formatDate(
            document.expiryDate
        )}`;
    }

    return `Valid until ${formatDate(
        document.expiryDate
    )}`;
}

function getStatusStyles(status: DocumentStatus) {
    switch (status) {
        case "Valid":
            return {
                wrapper:
                    "border-green-200 bg-green-50",
                badge:
                    "bg-green-100 text-green-700",
                icon:
                    "text-green-600",
            };

        case "Expiring Soon":
            return {
                wrapper:
                    "border-yellow-200 bg-yellow-50",
                badge:
                    "bg-yellow-100 text-yellow-700",
                icon:
                    "text-yellow-600",
            };

        case "Expired":
            return {
                wrapper:
                    "border-red-200 bg-red-50",
                badge:
                    "bg-red-100 text-red-700",
                icon:
                    "text-red-600",
            };

        case "Missing":
            return {
                wrapper:
                    "border-red-200 bg-red-50",
                badge:
                    "bg-red-100 text-red-700",
                icon:
                    "text-red-600",
            };

        case "Under Review":
            return {
                wrapper:
                    "border-blue-200 bg-blue-50",
                badge:
                    "bg-blue-100 text-blue-700",
                icon:
                    "text-blue-600",
            };

        default:
            return {
                wrapper:
                    "border-gray-200 bg-gray-50",
                badge:
                    "bg-gray-100 text-gray-700",
                icon:
                    "text-gray-600",
            };
    }
}

function StatusIcon({
    status,
}: {
    status: DocumentStatus;
}) {
    if (status === "Valid") {
        return <FiCheckCircle />;
    }

    if (status === "Expiring Soon") {
        return <FiClock />;
    }

    if (status === "Under Review") {
        return <FiClock />;
    }

    return <FiXCircle />;
}

/* =========================================================
   SECTION CARD
========================================================= */

function SectionCard({
    title,
    description,
    icon,
    children,
    action,
}: {
    title: string;
    description?: string;
    icon: ReactNode;
    children: ReactNode;
    action?: ReactNode;
}) {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#FF6B35]">
                        {icon}
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-gray-950">
                            {title}
                        </h2>

                        {description && (
                            <p className="mt-1 text-sm text-gray-500">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {action}
            </div>

            <div className="p-6">
                {children}
            </div>
        </section>
    );
}

/* =========================================================
   PAGE
========================================================= */

function RiderProfilePage() {
    const router = useRouter();

    /* =======================================================
       EDIT STATES
    ======================================================= */

    const [editingPersonal, setEditingPersonal] =
        useState(false);

    const [editingVehicle, setEditingVehicle] =
        useState(false);

    const [editingPayout, setEditingPayout] =
        useState(false);

    /* =======================================================
       PERSONAL INFORMATION
    ======================================================= */

    const [name, setName] =
        useState("Michael Adeyemi");

    const [email, setEmail] =
        useState("michael.adeyemi@example.com");

    const [phone, setPhone] =
        useState("08012345678");

    const [address, setAddress] =
        useState("Yaba, Lagos");

    /* =======================================================
       VEHICLE INFORMATION
    ======================================================= */

    const [vehicleType, setVehicleType] =
        useState("Motorcycle");

    const [vehicleModel, setVehicleModel] =
        useState("Honda CG 125");

    const [vehiclePlate, setVehiclePlate] =
        useState("LAG-123-XY");

    /* =======================================================
       PAYOUT INFORMATION
    ======================================================= */

    const [bankName, setBankName] =
        useState("Access Bank");

    const [accountNumber, setAccountNumber] =
        useState("0123456789");

    const [accountName, setAccountName] =
        useState("Michael Adeyemi");

    /* =======================================================
       DOCUMENTS
    ======================================================= */

    const [documents, setDocuments] =
        useState<ComplianceDocument[]>(
            initialDocuments
        );

    const [message, setMessage] =
        useState("");

    /* =======================================================
       COMPUTED DOCUMENT STATUS
    ======================================================= */

    const documentStatuses = useMemo(() => {
        return documents.map((document) => ({
            ...document,
            status: getAutomaticDocumentStatus(document),
        }));
    }, [documents]);

    /*
      IMPORTANT:

      Expiring Soon does NOT restrict the rider.

      Under Review only restricts the rider if the document
      was already Expired or Missing before the replacement
      was uploaded.
    */

    const restrictedDocuments = useMemo(() => {
        return documentStatuses.filter((document) => {
            if (
                document.status === "Expired" ||
                document.status === "Missing"
            ) {
                return true;
            }

            if (
                document.status === "Under Review" &&
                document.reviewBlocksOperation
            ) {
                return true;
            }

            return false;
        });
    }, [documentStatuses]);

    const expiringDocuments = useMemo(() => {
        return documentStatuses.filter(
            (document) =>
                document.status === "Expiring Soon"
        );
    }, [documentStatuses]);

    const documentsUnderReview = useMemo(() => {
        return documentStatuses.filter(
            (document) =>
                document.status === "Under Review"
        );
    }, [documentStatuses]);

    const validDocuments = useMemo(() => {
        return documentStatuses.filter(
            (document) =>
                document.status === "Valid"
        );
    }, [documentStatuses]);

    const canOperate =
        restrictedDocuments.length === 0;

    /* =======================================================
       ACCOUNT STATUS
    ======================================================= */

    const accountStatus = canOperate
        ? "Active"
        : "Restricted";

    /* =======================================================
       SAVE HANDLERS
    ======================================================= */

    const savePersonalInformation = () => {
        setEditingPersonal(false);

        setMessage(
            "Personal information updated successfully."
        );

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const saveVehicleInformation = () => {
        setEditingVehicle(false);

        setMessage(
            "Vehicle information updated successfully."
        );

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const savePayoutInformation = () => {
        setEditingPayout(false);

        setMessage(
            "Payout account updated successfully."
        );

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    /* =======================================================
       DOCUMENT UPLOAD
    ======================================================= */

    const handleDocumentUpload = (
        documentId: string
    ) => {
        const document = documents.find(
            (item) => item.id === documentId
        );

        if (!document) {
            return;
        }

        const previousStatus =
            getAutomaticDocumentStatus(document);

        const replacementBlocksOperation =
            previousStatus === "Expired" ||
            previousStatus === "Missing";

        setDocuments((currentDocuments) =>
            currentDocuments.map((item) =>
                item.id === documentId
                    ? {
                        ...item,
                        manualStatus: "Under Review",
                        reviewBlocksOperation:
                            replacementBlocksOperation,
                    }
                    : item
            )
        );

        setMessage(
            replacementBlocksOperation
                ? `${document.name} has been submitted. Your account will remain restricted until Admin verifies the new document.`
                : `${document.name} has been submitted for Admin verification. You can continue operating while verification is pending.`
        );

        setTimeout(() => {
            setMessage("");
        }, 5000);
    };

    /* =======================================================
       LOGOUT
    ======================================================= */

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

        localStorage.setItem(
            "doorstep_rider_online",
            "false"
        );

        router.replace(
            `/rider/login?redirect=${encodeURIComponent(
                "/rider/profile"
            )}`
        );
    };

    return (
        <RiderAuthGuard>
            <main className="min-h-screen bg-[#FFF8F3]">
                {/* =================================================
            HEADER
        ================================================= */}

                <div className="border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <Link
                                    href="/rider/dashboard"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#FF6B35]"
                                >
                                    <FiArrowLeft />
                                    Back to Dashboard
                                </Link>

                                <div className="mt-4 flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl font-black text-[#FF6B35]">
                                        {name.charAt(0)}
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-black text-gray-950">
                                            Rider Profile
                                        </h1>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Manage your account, vehicle,
                                            payout and compliance documents.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                            >
                                <FiLogOut />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* =================================================
            MAIN CONTENT
        ================================================= */}

                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                    {/* SUCCESS / INFO MESSAGE */}

                    {message && (
                        <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
                            <div className="flex items-start gap-3">
                                <FiCheckCircle className="mt-0.5 shrink-0" />
                                <p>{message}</p>
                            </div>
                        </div>
                    )}

                    {/* =================================================
              RESTRICTED BANNER
          ================================================= */}

                    {!canOperate && (
                        <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-xl text-red-600">
                                    <FiShield />
                                </div>

                                <div>
                                    <h2 className="font-black text-red-900">
                                        Account Restricted
                                    </h2>

                                    <p className="mt-1 max-w-3xl text-sm leading-6 text-red-700">
                                        You currently cannot go online,
                                        accept new deliveries or receive
                                        new delivery assignments because
                                        one or more required compliance
                                        documents are invalid or missing.
                                    </p>

                                    <p className="mt-3 text-sm font-bold text-red-800">
                                        Upload the required document and
                                        wait for Admin verification to restore
                                        your account.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* =================================================
              EXPIRING SOON
          ================================================= */}

                    {canOperate &&
                        expiringDocuments.length > 0 && (
                            <div className="mb-6 rounded-3xl border border-yellow-200 bg-yellow-50 p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-xl text-yellow-600">
                                        <FiAlertTriangle />
                                    </div>

                                    <div>
                                        <h2 className="font-black text-yellow-900">
                                            Document Expiring Soon
                                        </h2>

                                        <p className="mt-1 text-sm leading-6 text-yellow-800">
                                            Your account is currently active,
                                            but you should renew the document
                                            below before it expires.
                                        </p>

                                        <div className="mt-3 space-y-1">
                                            {expiringDocuments.map(
                                                (document) => (
                                                    <p
                                                        key={document.id}
                                                        className="text-sm font-bold text-yellow-900"
                                                    >
                                                        • {document.name}:{" "}
                                                        {getExpiryText(
                                                            document,
                                                            "Expiring Soon"
                                                        )}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                        {/* =================================================
                LEFT COLUMN
            ================================================= */}

                        <div className="space-y-6">
                            {/* =============================================
                  PERSONAL INFORMATION
              ============================================= */}

                            <SectionCard
                                title="Personal Information"
                                description="Your basic rider account information."
                                icon={<FiUser />}
                                action={
                                    !editingPersonal ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setEditingPersonal(true)
                                            }
                                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-[#FF6B35]"
                                        >
                                            <FiEdit3 />
                                            Edit
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={
                                                savePersonalInformation
                                            }
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
                                        >
                                            <FiSave />
                                            Save
                                        </button>
                                    )
                                }
                            >
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Full Name
                                        </label>

                                        {editingPersonal ? (
                                            <input
                                                value={name}
                                                onChange={(event) =>
                                                    setName(
                                                        event.target.value
                                                    )
                                                }
                                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                                            />
                                        ) : (
                                            <p className="mt-2 font-bold text-gray-900">
                                                {name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Email Address
                                        </label>

                                        {editingPersonal ? (
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(event) =>
                                                    setEmail(
                                                        event.target.value
                                                    )
                                                }
                                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                                            />
                                        ) : (
                                            <p className="mt-2 font-bold text-gray-900">
                                                {email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Phone Number
                                        </label>

                                        {editingPersonal ? (
                                            <input
                                                value={phone}
                                                onChange={(event) =>
                                                    setPhone(
                                                        event.target.value
                                                    )
                                                }
                                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                                            />
                                        ) : (
                                            <p className="mt-2 font-bold text-gray-900">
                                                {phone}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Address
                                        </label>

                                        {editingPersonal ? (
                                            <input
                                                value={address}
                                                onChange={(event) =>
                                                    setAddress(
                                                        event.target.value
                                                    )
                                                }
                                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                                            />
                                        ) : (
                                            <p className="mt-2 font-bold text-gray-900">
                                                {address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </SectionCard>

                            {/* =============================================
                  VEHICLE INFORMATION
              ============================================= */}

                            <SectionCard
                                title="Vehicle Information"
                                description="Vehicle currently registered for deliveries."
                                icon={<FiTruck />}
                                action={
                                    !editingVehicle ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setEditingVehicle(true)
                                            }
                                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-[#FF6B35]"
                                        >
                                            <FiEdit3 />
                                            Edit
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={saveVehicleInformation}
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
                                        >
                                            <FiSave />
                                            Save
                                        </button>
                                    )
                                }
                            >
                                <div className="grid gap-5 md:grid-cols-3">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Vehicle Type
                                        </label>

                                        {editingVehicle ? (
                                            <select
                                                value={vehicleType}
                                                onChange={(event) =>
                                                    setVehicleType(
                                                        event.target.value
                                                    )
                                                }
                                                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                                            >
                                                <option>
                                                    Motorcycle
                                                </option>
                                                <option>
                                                    Electric Scooter
                                                </option>
                                                <option>
                                                    Bicycle
                                                </option>
                                            </select>
                                        ) : (
                                            <p className="mt-2 font-bold text-gray-900">
                                                {vehicleType}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Vehicle Model
                                        </label>

                                        {editingVehicle ? (
                                            <input
                                                value={vehicleModel}
                                                onChange={(event) =>
                                                    setVehicleModel(
                                                        event.target.value
                                                    )
                                                }
                                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                                            />
                                        ) : (
                                            <p className="mt-2 font-bold text-gray-900">
                                                {vehicleModel}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Plate Number
                                        </label>

                                        {editingVehicle ? (
                                            <input
                                                value={vehiclePlate}
                                                onChange={(event) =>
                                                    setVehiclePlate(
                                                        event.target.value
                                                    )
                                                }
                                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold uppercase outline-none focus:border-[#FF6B35]"
                                            />
                                        ) : (
                                            <p className="mt-2 font-bold uppercase text-gray-900">
                                                {vehiclePlate}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </SectionCard>

                            {/* =============================================
                  PAYOUT ACCOUNT
              ============================================= */}

                            <SectionCard
                                title="Payout Account"
                                description="Bank account used for rider earnings."
                                icon={
                                    <span className="text-xl font-black">
                                        ₦
                                    </span>
                                }
                                action={
                                    !editingPayout ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setEditingPayout(true)
                                            }
                                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-[#FF6B35]"
                                        >
                                            <FiEdit3 />
                                            Edit
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={savePayoutInformation}
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
                                        >
                                            <FiSave />
                                            Save
                                        </button>
                                    )
                                }
                            >
                                <div className="grid gap-5 md:grid-cols-3">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Bank
                                        </label>

                                        {editingPayout ? (
                                            <input
                                                value={bankName}
                                                onChange={(event) =>
                                                    setBankName(
                                                        event.target.value
                                                    )
                                                }
                                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                                            />
                                        ) : (
                                            <p className="mt-2 font-bold text-gray-900">
                                                {bankName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Account Number
                                        </label>

                                        {editingPayout ? (
                                            <input
                                                value={accountNumber}
                                                onChange={(event) =>
                                                    setAccountNumber(
                                                        event.target.value
                                                    )
                                                }
                                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                                            />
                                        ) : (
                                            <p className="mt-2 font-bold text-gray-900">
                                                ****
                                                {accountNumber.slice(-4)}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Account Name
                                        </label>

                                        {editingPayout ? (
                                            <input
                                                value={accountName}
                                                onChange={(event) =>
                                                    setAccountName(
                                                        event.target.value
                                                    )
                                                }
                                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                                            />
                                        ) : (
                                            <p className="mt-2 font-bold text-gray-900">
                                                {accountName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </SectionCard>

                            {/* =============================================
                  COMPLIANCE DOCUMENTS
              ============================================= */}

                            <SectionCard
                                title="Compliance Documents"
                                description="Keep your rider documents current to continue receiving deliveries."
                                icon={<FiFileText />}
                                action={
                                    <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                                        {validDocuments.length}/
                                        {documents.length} valid
                                    </div>
                                }
                            >
                                <div
                                    id="documents"
                                    className="space-y-4"
                                >
                                    {documentStatuses.map(
                                        (document) => {
                                            const status =
                                                document.status;

                                            const styles =
                                                getStatusStyles(status);

                                            const expiryText =
                                                getExpiryText(
                                                    document,
                                                    status
                                                );

                                            const daysUntilExpiry =
                                                getDaysUntilExpiry(
                                                    document.expiryDate
                                                );

                                            return (
                                                <div
                                                    key={document.id}
                                                    className={`rounded-2xl border p-5 ${styles.wrapper}`}
                                                >
                                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                                        <div className="flex items-start gap-4">
                                                            <div
                                                                className={`mt-1 text-xl ${styles.icon}`}
                                                            >
                                                                <StatusIcon
                                                                    status={status}
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <h3 className="font-black text-gray-950">
                                                                        {document.name}
                                                                    </h3>

                                                                    {document.required && (
                                                                        <span className="text-xs font-bold text-gray-400">
                                                                            Required
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                <p className="mt-1 text-sm text-gray-600">
                                                                    {
                                                                        document.description
                                                                    }
                                                                </p>

                                                                <p className="mt-2 text-xs font-bold text-gray-500">
                                                                    {expiryText}
                                                                </p>

                                                                {status ===
                                                                    "Expiring Soon" &&
                                                                    daysUntilExpiry !==
                                                                    null && (
                                                                        <p className="mt-1 text-xs font-bold text-yellow-700">
                                                                            Please renew this
                                                                            document before
                                                                            the expiry date.
                                                                        </p>
                                                                    )}

                                                                {status ===
                                                                    "Under Review" && (
                                                                        <p className="mt-1 text-xs font-bold text-blue-700">
                                                                            Pending Admin
                                                                            verification.
                                                                        </p>
                                                                    )}

                                                                {status ===
                                                                    "Expired" && (
                                                                        <p className="mt-1 text-xs font-bold text-red-700">
                                                                            This document must
                                                                            be renewed before
                                                                            you can continue
                                                                            receiving new
                                                                            delivery assignments.
                                                                        </p>
                                                                    )}

                                                                {status ===
                                                                    "Missing" && (
                                                                        <p className="mt-1 text-xs font-bold text-red-700">
                                                                            Upload this required
                                                                            document to restore
                                                                            your account.
                                                                        </p>
                                                                    )}
                                                            </div>
                                                        </div>

                                                        <div className="flex shrink-0 items-center gap-3">
                                                            <span
                                                                className={`rounded-full px-3 py-1.5 text-xs font-black ${styles.badge}`}
                                                            >
                                                                {status}
                                                            </span>

                                                            {(status ===
                                                                "Expired" ||
                                                                status ===
                                                                "Missing" ||
                                                                status ===
                                                                "Expiring Soon") && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleDocumentUpload(
                                                                                document.id
                                                                            )
                                                                        }
                                                                        className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-4 py-2.5 text-xs font-black text-white transition hover:bg-orange-600"
                                                                    >
                                                                        <FiUpload />
                                                                        {status ===
                                                                            "Expiring Soon"
                                                                            ? "Renew"
                                                                            : "Upload"}
                                                                    </button>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>

                                {/* DOCUMENT POLICY */}

                                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                                    <div className="flex items-start gap-3">
                                        <FiShield className="mt-0.5 shrink-0 text-[#FF6B35]" />

                                        <div>
                                            <h3 className="text-sm font-black text-gray-900">
                                                Compliance Policy
                                            </h3>

                                            <ul className="mt-2 space-y-1 text-xs leading-5 text-gray-600">
                                                <li>
                                                    • Documents are monitored
                                                    automatically based on their
                                                    expiry dates.
                                                </li>

                                                <li>
                                                    • Riders receive an expiry
                                                    warning before a document
                                                    becomes invalid.
                                                </li>

                                                <li>
                                                    • Expiring Soon documents do
                                                    not immediately restrict the
                                                    rider.
                                                </li>

                                                <li>
                                                    • Expired or missing required
                                                    documents restrict new
                                                    delivery operations.
                                                </li>

                                                <li>
                                                    • Replacement documents go
                                                    through Admin verification.
                                                </li>

                                                <li>
                                                    • If a document was already
                                                    expired or missing, the rider
                                                    remains restricted until the
                                                    replacement is approved.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </SectionCard>
                        </div>

                        {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

                        <aside className="space-y-6">
                            {/* ACCOUNT STATUS */}

                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                                    Account Status
                                </p>

                                <div className="mt-5 flex items-center gap-3">
                                    <div
                                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${canOperate
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {canOperate ? (
                                            <FiCheckCircle />
                                        ) : (
                                            <FiXCircle />
                                        )}
                                    </div>

                                    <div>
                                        <p className="font-black text-gray-950">
                                            {accountStatus}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {canOperate
                                                ? "You can receive delivery assignments."
                                                : "Some delivery operations are restricted."}
                                        </p>
                                    </div>
                                </div>

                                {canOperate &&
                                    expiringDocuments.length >
                                    0 && (
                                        <div className="mt-5 rounded-2xl bg-yellow-50 p-4">
                                            <div className="flex items-start gap-2">
                                                <FiAlertTriangle className="mt-0.5 shrink-0 text-yellow-600" />

                                                <p className="text-xs font-semibold leading-5 text-yellow-800">
                                                    You have{" "}
                                                    {
                                                        expiringDocuments.length
                                                    }{" "}
                                                    document
                                                    {expiringDocuments.length >
                                                        1
                                                        ? "s"
                                                        : ""}{" "}
                                                    approaching expiry.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                {documentsUnderReview.length >
                                    0 && (
                                        <div className="mt-5 rounded-2xl bg-blue-50 p-4">
                                            <div className="flex items-start gap-2">
                                                <FiClock className="mt-0.5 shrink-0 text-blue-600" />

                                                <p className="text-xs font-semibold leading-5 text-blue-800">
                                                    {
                                                        documentsUnderReview.length
                                                    }{" "}
                                                    document
                                                    {documentsUnderReview.length >
                                                        1
                                                        ? "s are"
                                                        : " is"}{" "}
                                                    currently awaiting Admin
                                                    verification.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                            </div>

                            {/* QUICK LINKS */}

                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="font-black text-gray-950">
                                    Quick Links
                                </h2>

                                <div className="mt-4 divide-y divide-gray-100">
                                    <Link
                                        href="/rider/dashboard"
                                        className="flex items-center justify-between py-4 text-sm font-bold text-gray-700 transition hover:text-[#FF6B35]"
                                    >
                                        <span className="flex items-center gap-3">
                                            <FiTruck />
                                            Dashboard
                                        </span>

                                        <FiChevronRight />
                                    </Link>

                                    <Link
                                        href="/rider/deliveries"
                                        className="flex items-center justify-between py-4 text-sm font-bold text-gray-700 transition hover:text-[#FF6B35]"
                                    >
                                        <span className="flex items-center gap-3">
                                            <FiFileText />
                                            Deliveries
                                        </span>

                                        <FiChevronRight />
                                    </Link>

                                    <Link
                                        href="/rider/earnings"
                                        className="flex items-center justify-between py-4 text-sm font-bold text-gray-700 transition hover:text-[#FF6B35]"
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className="text-lg font-black">₦</span>
                                            Earnings
                                        </span>

                                        <FiChevronRight />
                                    </Link>

                                    <a
                                        href="#documents"
                                        className="flex items-center justify-between py-4 text-sm font-bold text-gray-700 transition hover:text-[#FF6B35]"
                                    >
                                        <span className="flex items-center gap-3">
                                            <FiShield />
                                            Compliance
                                        </span>

                                        <FiChevronRight />
                                    </a>
                                </div>
                            </div>

                            {/* SECURITY */}

                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                                        <FiLock />
                                    </div>

                                    <div>
                                        <h2 className="font-black text-gray-950">
                                            Account Security
                                        </h2>

                                        <p className="mt-2 text-xs leading-5 text-gray-500">
                                            Your personal and payout
                                            information should only be updated
                                            by you. Production authentication
                                            and identity verification will be
                                            enforced by the backend.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SUPPORT */}

                            <div className="rounded-3xl bg-gray-950 p-6 text-white">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl text-orange-400">
                                    <FiHelpCircle />
                                </div>

                                <h2 className="mt-5 font-black">
                                    Need Help?
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    Contact Door-Step support if you
                                    believe your compliance status is
                                    incorrect or you need help with document
                                    verification.
                                </p>

                                <a
                                    href="mailto:support@doorstep.ng"
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-400 transition hover:text-orange-300"
                                >
                                    <FiMail />
                                    Contact Support
                                </a>
                            </div>
                        </aside>
                    </div>

                    {/* =================================================
              DEMO NOTICE
          ================================================= */}

                    <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-5">
                        <div className="flex items-start gap-3">
                            <FiAlertTriangle className="mt-0.5 shrink-0 text-[#FF6B35]" />

                            <div>
                                <p className="text-sm font-black text-orange-900">
                                    Demo Mode
                                </p>

                                <p className="mt-1 text-xs leading-5 text-orange-800">
                                    Profile changes and document uploads
                                    currently use local React state only.
                                    In production, document uploads,
                                    compliance status, Admin verification,
                                    account restrictions and identity
                                    validation must be enforced by the
                                    Door-Step backend.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </RiderAuthGuard>
    );
}

export default RiderProfilePage;
