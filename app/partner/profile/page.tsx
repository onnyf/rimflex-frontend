
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    FiArrowLeft,
    FiBell,
    FiCheck,
    FiClock,
    FiDollarSign,
    FiGrid,
    FiLogOut,
    FiMenu,
    FiPackage,
    FiPercent,
    FiSave,
    FiSettings,
    FiShoppingBag,
    FiUpload,
    FiUsers,
    FiX,
} from "react-icons/fi";

type ApplicationStatus =
    | "Pending Review"
    | "Under Review"
    | "Approved"
    | "Rejected"
    | "Action Required";

type PartnerApplication = {
    ownerName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    restaurantName?: string;
    category?: string;
    description?: string;
    address?: string;
    city?: string;
    state?: string;
    openingTime?: string;
    closingTime?: string;
    logoName?: string;
    coverName?: string;
    businessDocumentName?: string;
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    status?: ApplicationStatus;
};

const navItems = [
    {
        label: "Dashboard",
        href: "/partner/dashboard",
        icon: <FiGrid />,
    },
    {
        label: "Orders",
        href: "/partner/orders",
        icon: <FiShoppingBag />,
    },
    {
        label: "Menu",
        href: "/partner/menu",
        icon: <FiPackage />,
    },
    {
        label: "Earnings",
        href: "/partner/earnings",
        icon: <FiDollarSign />,
    },
    {
        label: "Customers",
        href: "/partner/customers",
        icon: <FiUsers />,
    },
    {
        label: "Promotions",
        href: "/partner/promotions",
        icon: <FiPercent />,
    },
    {
        label: "Restaurant Settings",
        href: "/partner/settings",
        icon: <FiSettings />,
    },
];

export default function PartnerProfilePage() {
    const pathname = usePathname();
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [restaurant, setRestaurant] =
        useState<PartnerApplication | null>(null);

    const [saved, setSaved] = useState(false);

    const [form, setForm] = useState<PartnerApplication>({
        ownerName: "",
        restaurantName: "",
        email: "",
        phone: "",
        category: "",
        description: "",
        address: "",
        city: "",
        state: "",
        openingTime: "",
        closingTime: "",
        logoName: "",
        coverName: "",
        bankName: "",
        accountName: "",
        accountNumber: "",
        status: "Pending Review",
    });

    useEffect(() => {
        const authenticated = localStorage.getItem(
            "doorstep_partner_authenticated"
        );

        if (authenticated !== "true") {
            router.push("/partner/login");
            return;
        }

        const savedApplication = localStorage.getItem(
            "doorstep_partner_application"
        );

        if (savedApplication) {
            try {
                const parsed: PartnerApplication =
                    JSON.parse(savedApplication);

                setRestaurant(parsed);

                setForm({
                    ownerName:
                        parsed.ownerName ||
                        parsed.fullName ||
                        "",
                    fullName: parsed.fullName || "",
                    email: parsed.email || "",
                    phone: parsed.phone || "",
                    restaurantName:
                        parsed.restaurantName || "",
                    category: parsed.category || "",
                    description:
                        parsed.description || "",
                    address: parsed.address || "",
                    city: parsed.city || "",
                    state: parsed.state || "",
                    openingTime:
                        parsed.openingTime || "",
                    closingTime:
                        parsed.closingTime || "",
                    logoName:
                        parsed.logoName || "",
                    coverName:
                        parsed.coverName || "",
                    businessDocumentName:
                        parsed.businessDocumentName || "",
                    bankName:
                        parsed.bankName || "",
                    accountName:
                        parsed.accountName || "",
                    accountNumber:
                        parsed.accountNumber || "",
                    status:
                        parsed.status ||
                        "Pending Review",
                });
            } catch (error) {
                console.error(
                    "Unable to load partner profile:",
                    error
                );
            }
        }
    }, [router]);

    const handleChange = (
        field: keyof PartnerApplication,
        value: string
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));

        setSaved(false);
    };

    const handleSave = () => {
        const updatedApplication: PartnerApplication = {
            ...restaurant,
            ...form,
            ownerName:
                form.ownerName ||
                form.fullName ||
                "",
        };

        localStorage.setItem(
            "doorstep_partner_application",
            JSON.stringify(updatedApplication)
        );

        setRestaurant(updatedApplication);
        setForm(updatedApplication);

        setSaved(true);

        window.setTimeout(() => {
            setSaved(false);
        }, 3000);
    };

    const handleLogout = () => {
        localStorage.removeItem(
            "doorstep_partner_authenticated"
        );

        localStorage.removeItem(
            "doorstep_partner_email"
        );

        router.push("/partner/login");
    };

    const restaurantName =
        form.restaurantName ||
        "Your Restaurant";

    const restaurantInitial =
        restaurantName
            .charAt(0)
            .toUpperCase() || "R";

    return (
        <div className="min-h-screen bg-[#F7F8F7] text-[#151515]">
            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <button
                    aria-label="Close menu"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-[270px] transform bg-[#151515] text-white transition-transform duration-300 lg:translate-x-0 ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* LOGO */}
                    <div className="flex h-[82px] items-center justify-between border-b border-white/10 px-6">
                        <Link
                            href="/partner/dashboard"
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-xl font-black">
                                D
                            </div>

                            <div>
                                <p className="text-lg font-black">
                                    Door-Step
                                </p>

                                <p className="text-[11px] text-gray-400">
                                    Restaurant Partner
                                </p>
                            </div>
                        </Link>

                        <button
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
                        >
                            <FiX />
                        </button>
                    </div>

                    {/* RESTAURANT INFO */}
                    <div className="border-b border-white/10 px-5 py-5">
                        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6B35] font-black">
                                {restaurantInitial}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold">
                                    {restaurantName}
                                </p>

                                <p className="truncate text-xs text-gray-400">
                                    {form.city ||
                                        "Location not provided"}
                                    {form.state
                                        ? `, ${form.state}`
                                        : ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* NAVIGATION */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6">
                        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                            Overview
                        </p>

                        <div className="space-y-1">
                            {navItems
                                .slice(0, 4)
                                .map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() =>
                                            setSidebarOpen(
                                                false
                                            )
                                        }
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                            pathname ===
                                            item.href
                                                ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                                : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                ))}
                        </div>

                        <p className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                            Manage
                        </p>

                        <div className="space-y-1">
                            {navItems
                                .slice(4)
                                .map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() =>
                                            setSidebarOpen(
                                                false
                                            )
                                        }
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                            pathname ===
                                            item.href
                                                ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                                : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                ))}

                            {/* PROFILE */}
                            <Link
                                href="/partner/profile"
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                    pathname ===
                                    "/partner/profile"
                                        ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                        : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <FiUsers />
                                Restaurant Profile
                            </Link>
                        </div>
                    </nav>

                    {/* ACCOUNT */}
                    <div className="border-t border-white/10 p-4">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                        >
                            <FiLogOut />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <div className="lg:pl-[270px]">
                {/* HEADER */}
                <header className="sticky top-0 z-30 flex h-[82px] items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur md:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                            className="rounded-xl border border-gray-200 p-2.5 lg:hidden"
                        >
                            <FiMenu />
                        </button>

                        <div>
                            <p className="text-sm text-gray-500">
                                Restaurant Profile
                            </p>

                            <h1 className="text-xl font-black md:text-2xl">
                                {restaurantName}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative rounded-xl border border-gray-200 p-3 transition hover:border-[#FF6B35] hover:text-[#FF6B35]">
                            <FiBell />

                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B35]" />
                        </button>

                        <Link
                            href="/partner/dashboard"
                            className="hidden items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold transition hover:border-[#FF6B35] hover:text-[#FF6B35] sm:flex"
                        >
                            <FiArrowLeft />
                            Dashboard
                        </Link>
                    </div>
                </header>

                {/* CONTENT */}
                <main className="px-5 py-7 md:px-8 md:py-9">
                    {/* PAGE INTRO */}
                    <div className="mb-7">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">
                            Account Management
                        </p>

                        <h2 className="mt-2 text-3xl font-black tracking-tight">
                            Manage your restaurant profile
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                            Update your restaurant information,
                            business details and payout information.
                            These details are used across your
                            Door-Step partner account.
                        </p>
                    </div>

                    {/* SUCCESS MESSAGE */}
                    {saved && (
                        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                <FiCheck />
                            </div>

                            Your restaurant profile has been
                            updated successfully.
                        </div>
                    )}

                    {/* PROFILE HEADER CARD */}
                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FF6B35] text-3xl font-black text-white">
                                    {restaurantInitial}
                                </div>

                                <div>
                                    <h3 className="text-xl font-black">
                                        {restaurantName}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {form.category ||
                                            "Restaurant"}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        {form.city ||
                                            "Location not provided"}
                                        {form.state
                                            ? `, ${form.state}`
                                            : ""}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <span
                                    className={`inline-flex rounded-full px-4 py-2 text-xs font-bold ${
                                        form.status ===
                                        "Approved"
                                            ? "bg-green-50 text-green-700"
                                            : form.status ===
                                                "Rejected"
                                              ? "bg-red-50 text-red-700"
                                              : "bg-yellow-50 text-yellow-700"
                                    }`}
                                >
                                    {form.status ||
                                        "Pending Review"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* BASIC INFORMATION */}
                    <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-xl font-black">
                                Basic Information
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Keep your restaurant and owner
                                information up to date.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <FormField
                                label="Restaurant Name"
                                value={
                                    form.restaurantName || ""
                                }
                                onChange={(value) =>
                                    handleChange(
                                        "restaurantName",
                                        value
                                    )
                                }
                                placeholder="Motrust Restaurant"
                            />

                            <FormField
                                label="Owner Full Name"
                                value={
                                    form.ownerName ||
                                    form.fullName ||
                                    ""
                                }
                                onChange={(value) =>
                                    handleChange(
                                        "ownerName",
                                        value
                                    )
                                }
                                placeholder="Owner name"
                            />

                            <FormField
                                label="Email Address"
                                type="email"
                                value={form.email || ""}
                                onChange={(value) =>
                                    handleChange(
                                        "email",
                                        value
                                    )
                                }
                                placeholder="restaurant@example.com"
                            />

                            <FormField
                                label="Phone Number"
                                value={form.phone || ""}
                                onChange={(value) =>
                                    handleChange(
                                        "phone",
                                        value
                                    )
                                }
                                placeholder="+234..."
                            />

                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Restaurant Category
                                </label>

                                <select
                                    value={
                                        form.category || ""
                                    }
                                    onChange={(event) =>
                                        handleChange(
                                            "category",
                                            event.target
                                                .value
                                        )
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                                >
                                    <option value="">
                                        Select category
                                    </option>
                                    <option>
                                        African
                                    </option>
                                    <option>
                                        Fast Food
                                    </option>
                                    <option>
                                        Nigerian
                                    </option>
                                    <option>
                                        Continental
                                    </option>
                                    <option>
                                        Bakery
                                    </option>
                                    <option>
                                        Drinks & Beverages
                                    </option>
                                    <option>
                                        Desserts
                                    </option>
                                    <option>
                                        Other
                                    </option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Restaurant Description
                                </label>

                                <textarea
                                    rows={4}
                                    value={
                                        form.description ||
                                        ""
                                    }
                                    onChange={(event) =>
                                        handleChange(
                                            "description",
                                            event.target
                                                .value
                                        )
                                    }
                                    placeholder="Tell customers about your restaurant..."
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                                />
                            </div>
                        </div>
                    </section>

                    {/* LOCATION */}
                    <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-xl font-black">
                                Restaurant Location
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                This is where customers and riders
                                can find your restaurant.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <FormField
                                    label="Street Address"
                                    value={
                                        form.address || ""
                                    }
                                    onChange={(value) =>
                                        handleChange(
                                            "address",
                                            value
                                        )
                                    }
                                    placeholder="Enter restaurant address"
                                />
                            </div>

                            <FormField
                                label="City"
                                value={form.city || ""}
                                onChange={(value) =>
                                    handleChange(
                                        "city",
                                        value
                                    )
                                }
                                placeholder="Ikeja"
                            />

                            <FormField
                                label="State"
                                value={form.state || ""}
                                onChange={(value) =>
                                    handleChange(
                                        "state",
                                        value
                                    )
                                }
                                placeholder="Lagos"
                            />
                        </div>
                    </section>

                    {/* BUSINESS HOURS */}
                    <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-xl font-black">
                                Business Hours
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Let customers know when your
                                restaurant is available.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Opening Time
                                </label>

                                <div className="relative">
                                    <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="time"
                                        value={
                                            form.openingTime ||
                                            ""
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                "openingTime",
                                                event.target
                                                    .value
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Closing Time
                                </label>

                                <div className="relative">
                                    <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="time"
                                        value={
                                            form.closingTime ||
                                            ""
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                "closingTime",
                                                event.target
                                                    .value
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* BRANDING */}
                    <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-xl font-black">
                                Restaurant Branding
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Add your restaurant logo and cover
                                image.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <FileUploadBox
                                label="Restaurant Logo"
                                currentFile={
                                    form.logoName
                                }
                                onChange={(fileName) =>
                                    handleChange(
                                        "logoName",
                                        fileName
                                    )
                                }
                            />

                            <FileUploadBox
                                label="Restaurant Cover Image"
                                currentFile={
                                    form.coverName
                                }
                                onChange={(fileName) =>
                                    handleChange(
                                        "coverName",
                                        fileName
                                    )
                                }
                            />
                        </div>
                    </section>

                    {/* PAYOUT */}
                    <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-xl font-black">
                                Bank & Payout Information
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage the account used for your
                                restaurant payouts.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <FormField
                                label="Bank Name"
                                value={
                                    form.bankName || ""
                                }
                                onChange={(value) =>
                                    handleChange(
                                        "bankName",
                                        value
                                    )
                                }
                                placeholder="Enter bank name"
                            />

                            <FormField
                                label="Account Name"
                                value={
                                    form.accountName || ""
                                }
                                onChange={(value) =>
                                    handleChange(
                                        "accountName",
                                        value
                                    )
                                }
                                placeholder="Account holder name"
                            />

                            <FormField
                                label="Account Number"
                                value={
                                    form.accountNumber ||
                                    ""
                                }
                                onChange={(value) =>
                                    handleChange(
                                        "accountNumber",
                                        value
                                    )
                                }
                                placeholder="10 digit account number"
                            />
                        </div>
                    </section>

                    {/* SAVE */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/partner/dashboard"
                            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold transition hover:border-gray-300"
                        >
                            Cancel
                        </Link>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#e85c2c]"
                        >
                            <FiSave />
                            Save Changes
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

/* -------------------------------------------------------
   FORM FIELD
------------------------------------------------------- */

function FormField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100"
            />
        </div>
    );
}

/* -------------------------------------------------------
   FILE UPLOAD
------------------------------------------------------- */

function FileUploadBox({
    label,
    currentFile,
    onChange,
}: {
    label: string;
    currentFile?: string;
    onChange: (fileName: string) => void;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
                {label}
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center transition hover:border-[#FF6B35] hover:bg-[#FFF8F3]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0E9] text-xl text-[#FF6B35]">
                    <FiUpload />
                </div>

                <p className="mt-3 text-sm font-bold text-gray-700">
                    {currentFile
                        ? currentFile
                        : "Click to upload"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG or JPEG
                </p>

                <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={(event) => {
                        const file =
                            event.target.files?.[0];

                        if (file) {
                            onChange(file.name);
                        }
                    }}
                />
            </label>
        </div>
    );
}
