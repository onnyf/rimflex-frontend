
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    FiBell,
    FiChevronDown,
    FiClock,
    FiDollarSign,
    FiGrid,
    FiLogOut,
    FiMenu,
    FiPackage,
    FiPercent,
    FiPlus,
    FiSettings,
    FiShoppingBag,
    FiTrendingUp,
    FiUser,
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

const stats = [
    {
        title: "Today's Sales",
        value: "₦284,500",
        change: "+18.5%",
        icon: <FiDollarSign />,
    },
    {
        title: "Total Orders",
        value: "86",
        change: "+12.4%",
        icon: <FiShoppingBag />,
    },
    {
        title: "Active Orders",
        value: "12",
        change: "6 preparing",
        icon: <FiClock />,
    },
    {
        title: "Completed Orders",
        value: "74",
        change: "+9.2%",
        icon: <FiPackage />,
    },
];

const recentOrders = [
    {
        id: "#DS-10842",
        customer: "Adewale Johnson",
        items: "Jollof Rice, Chicken & Plantain",
        amount: "₦8,300",
        status: "Preparing",
        time: "5 mins ago",
    },
    {
        id: "#DS-10839",
        customer: "Blessing Okafor",
        items: "Fried Rice & Chicken",
        amount: "₦6,500",
        status: "Ready",
        time: "12 mins ago",
    },
    {
        id: "#DS-10834",
        customer: "Daniel Williams",
        items: "Pounded Yam & Egusi",
        amount: "₦7,800",
        status: "Out for delivery",
        time: "21 mins ago",
    },
    {
        id: "#DS-10827",
        customer: "Sarah Ibrahim",
        items: "Jollof Rice & Beef",
        amount: "₦5,900",
        status: "Completed",
        time: "38 mins ago",
    },
    {
        id: "#DS-10819",
        customer: "Michael Adeyemi",
        items: "Pepper Soup & Plantain",
        amount: "₦5,200",
        status: "Completed",
        time: "52 mins ago",
    },
];

const popularItems = [
    {
        name: "Jollof Rice & Chicken",
        orders: 42,
        revenue: "₦189,000",
    },
    {
        name: "Fried Rice & Chicken",
        orders: 31,
        revenue: "₦155,000",
    },
    {
        name: "Pounded Yam & Egusi",
        orders: 24,
        revenue: "₦132,000",
    },
    {
        name: "Pepper Soup",
        orders: 19,
        revenue: "₦66,500",
    },
];

function statusStyle(status: string) {
    switch (status) {
        case "Preparing":
            return "bg-orange-50 text-orange-700";

        case "Ready":
            return "bg-blue-50 text-blue-700";

        case "Out for delivery":
            return "bg-purple-50 text-purple-700";

        case "Completed":
            return "bg-green-50 text-green-700";

        default:
            return "bg-gray-100 text-gray-600";
    }
}

export default function RestaurantDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(true);

    const [restaurant, setRestaurant] =
        useState<PartnerApplication | null>(null);

    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const authenticated =
            localStorage.getItem(
                "doorstep_partner_authenticated"
            );

        if (authenticated !== "true") {
            router.push("/partner/login");
            return;
        }

        const savedApplication =
            localStorage.getItem(
                "doorstep_partner_application"
            );

        if (savedApplication) {
            try {
                const parsed: PartnerApplication =
                    JSON.parse(savedApplication);

                setRestaurant(parsed);
            } catch (error) {
                console.error(
                    "Unable to load restaurant information:",
                    error
                );
            }
        }
    }, [router]);

    /*
     * Close profile dropdown when clicking outside.
     */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target as Node
                )
            ) {
                setProfileOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /*
     * Get owner's name from registration.
     */
    const ownerName =
        restaurant?.ownerName ||
        restaurant?.fullName ||
        "Restaurant Partner";

    /*
     * Get restaurant name from registration.
     */
    const restaurantName =
        restaurant?.restaurantName ||
        "Your Restaurant";

    /*
     * Get location from registration.
     */
    const restaurantLocation =
        restaurant?.city && restaurant?.state
            ? `${restaurant.city}, ${restaurant.state}`
            : restaurant?.city ||
              restaurant?.state ||
              "Location not provided";

    /*
     * First letter for restaurant avatar.
     */
    const restaurantInitial =
        restaurantName
            .charAt(0)
            .toUpperCase() || "R";

    /*
     * Sign out function.
     */
    const handleLogout = () => {
        localStorage.removeItem(
            "doorstep_partner_authenticated"
        );

        localStorage.removeItem(
            "doorstep_partner_email"
        );

        setProfileOpen(false);

        router.push("/partner/login");
    };

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
                                <p className="text-lg font-black tracking-tight">
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

                    {/* RESTAURANT */}
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
                                    {restaurantLocation}
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
                            {/* DASHBOARD */}
                            <Link
                                href="/partner/dashboard"
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                    pathname ===
                                    "/partner/dashboard"
                                        ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                        : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <FiGrid />
                                Dashboard
                            </Link>

                            {/* ORDERS */}
                            <Link
                                href="/partner/orders"
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                                    pathname ===
                                    "/partner/orders"
                                        ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                        : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <span className="flex items-center gap-3">
                                    <FiShoppingBag />
                                    Orders
                                </span>

                                <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                        pathname ===
                                        "/partner/orders"
                                            ? "bg-white/20 text-white"
                                            : "bg-[#FF6B35] text-white"
                                    }`}
                                >
                                    12
                                </span>
                            </Link>

                            {/* MENU */}
                            <Link
                                href="/partner/menu"
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                    pathname ===
                                    "/partner/menu"
                                        ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                        : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <FiPackage />
                                Menu
                            </Link>

                            {/* EARNINGS */}
                            <Link
                                href="/partner/earnings"
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                    pathname ===
                                    "/partner/earnings"
                                        ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                        : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <FiDollarSign />
                                Earnings
                            </Link>
                        </div>

                        <p className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                            Manage
                        </p>

                        <div className="space-y-1">
                            {/* CUSTOMERS */}
                            <Link
                                href="/partner/customers"
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                    pathname ===
                                    "/partner/customers"
                                        ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                        : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <FiUsers />
                                Customers
                            </Link>

                            {/* PROMOTIONS */}
                            <Link
                                href="/partner/promotions"
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                    pathname ===
                                    "/partner/promotions"
                                        ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                        : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <FiPercent />
                                Promotions
                            </Link>

                            {/* SETTINGS */}
                            <Link
                                href="/partner/settings"
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                    pathname ===
                                    "/partner/settings"
                                        ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                        : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <FiSettings />
                                Restaurant Settings
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
                                Welcome back,{" "}
                                <span className="font-semibold text-gray-800">
                                    {ownerName}
                                </span>
                            </p>

                            <h1 className="text-xl font-black md:text-2xl">
                                Restaurant Dashboard
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* ONLINE STATUS */}
                        <button
                            onClick={() =>
                                setIsOnline(!isOnline)
                            }
                            className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition sm:flex ${
                                isOnline
                                    ? "border-green-200 bg-green-50 text-green-700"
                                    : "border-gray-200 bg-gray-50 text-gray-500"
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
                                ? "Restaurant Online"
                                : "Restaurant Offline"}
                        </button>

                        {/* NOTIFICATION */}
                        <button className="relative rounded-xl border border-gray-200 p-3 transition hover:border-[#FF6B35] hover:text-[#FF6B35]">
                            <FiBell />

                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B35]" />
                        </button>

                        {/* PROFILE DROPDOWN */}
                        <div
                            ref={profileRef}
                            className="relative hidden md:block"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setProfileOpen(
                                        !profileOpen
                                    )
                                }
                                aria-expanded={
                                    profileOpen
                                }
                                aria-haspopup="menu"
                                className={`flex items-center gap-3 rounded-xl border px-3 py-2 transition ${
                                    profileOpen
                                        ? "border-[#FF6B35] bg-[#FFF8F3]"
                                        : "border-gray-200 bg-white hover:border-[#FF6B35]"
                                }`}
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0E9] font-bold text-[#FF6B35]">
                                    {restaurantInitial}
                                </div>

                                <div className="text-left">
                                    <p className="max-w-[160px] truncate text-xs font-bold">
                                        {restaurantName}
                                    </p>

                                    <p className="text-[11px] text-gray-500">
                                        Restaurant
                                    </p>
                                </div>

                                <FiChevronDown
                                    className={`text-gray-400 transition-transform duration-200 ${
                                        profileOpen
                                            ? "rotate-180 text-[#FF6B35]"
                                            : ""
                                    }`}
                                />
                            </button>

                            {/* DROPDOWN MENU */}
                            {profileOpen && (
                                <div
                                    role="menu"
                                    className="absolute right-0 top-[calc(100%+10px)] z-50 w-[280px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10"
                                >
                                    {/* PROFILE HEADER */}
                                    <div className="border-b border-gray-100 bg-[#FFF8F3] p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B35] text-lg font-black text-white">
                                                {
                                                    restaurantInitial
                                                }
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-black text-gray-900">
                                                    {
                                                        restaurantName
                                                    }
                                                </p>

                                                <p className="truncate text-xs text-gray-500">
                                                    {
                                                        restaurant?.email ||
                                                        "Restaurant Partner"
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DROPDOWN LINKS */}
                                    <div className="p-2">
                                        <Link
                                            href="/partner/profile"
                                            onClick={() =>
                                                setProfileOpen(
                                                    false
                                                )
                                            }
                                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                                                <FiUser />
                                            </span>

                                            <span>
                                                Restaurant Profile
                                            </span>
                                        </Link>

                                        <Link
                                            href="/partner/settings"
                                            onClick={() =>
                                                setProfileOpen(
                                                    false
                                                )
                                            }
                                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                                                <FiSettings />
                                            </span>

                                            <span>
                                                Restaurant Settings
                                            </span>
                                        </Link>

                                        {/* ONLINE STATUS */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsOnline(
                                                    !isOnline
                                                )
                                            }
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-gray-700 transition hover:bg-[#FFF8F3] hover:text-[#FF6B35]"
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${
                                                        isOnline
                                                            ? "bg-green-500"
                                                            : "bg-gray-400"
                                                    }`}
                                                />
                                            </span>

                                            <span className="flex-1">
                                                {isOnline
                                                    ? "Restaurant Online"
                                                    : "Restaurant Offline"}
                                            </span>
                                        </button>
                                    </div>

                                    {/* SIGN OUT */}
                                    <div className="border-t border-gray-100 p-2">
                                        <button
                                            type="button"
                                            onClick={
                                                handleLogout
                                            }
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                                                <FiLogOut />
                                            </span>

                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* CONTENT */}
                <main className="px-5 py-7 md:px-8 md:py-9">
                    {/* MOBILE ONLINE STATUS */}
                    <button
                        onClick={() =>
                            setIsOnline(!isOnline)
                        }
                        className={`mb-6 flex w-full items-center justify-between rounded-2xl border p-4 sm:hidden ${
                            isOnline
                                ? "border-green-200 bg-green-50"
                                : "border-gray-200 bg-white"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={`h-3 w-3 rounded-full ${
                                    isOnline
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                }`}
                            />

                            <div className="text-left">
                                <p className="text-sm font-bold">
                                    {isOnline
                                        ? "Restaurant is online"
                                        : "Restaurant is offline"}
                                </p>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    {isOnline
                                        ? "Customers can place orders"
                                        : "Customers cannot place new orders"}
                                </p>
                            </div>
                        </div>

                        <span className="text-sm font-bold text-[#FF6B35]">
                            {isOnline
                                ? "Go Offline"
                                : "Go Online"}
                        </span>
                    </button>

                    {/* TOP ACTIONS */}
                    <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <p className="text-sm text-gray-500">
                                Here&apos;s what&apos;s happening with{" "}
                                <span className="font-semibold text-gray-800">
                                    {restaurantName}
                                </span>{" "}
                                today.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/partner/menu"
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                            >
                                <FiPlus />
                                Add Menu Item
                            </Link>

                            <Link
                                href="/partner/orders"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#e85c2c]"
                            >
                                <FiShoppingBag />
                                View Orders
                            </Link>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E9] text-xl text-[#FF6B35]">
                                        {stat.icon}
                                    </div>

                                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700">
                                        {stat.change}
                                    </span>
                                </div>

                                <p className="mt-5 text-sm font-medium text-gray-500">
                                    {stat.title}
                                </p>

                                <p className="mt-1 text-2xl font-black tracking-tight">
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* SALES + ORDER SUMMARY */}
                    <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                        {/* SALES CARD */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <p className="text-sm font-bold text-gray-500">
                                        Revenue Overview
                                    </p>

                                    <h2 className="mt-1 text-2xl font-black">
                                        ₦1,842,500
                                    </h2>

                                    <p className="mt-1 text-sm text-green-600">
                                        +18.5% compared with last month
                                    </p>
                                </div>

                                <select className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#FF6B35]">
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                    <option>This year</option>
                                </select>
                            </div>

                            {/* SIMPLE CHART */}
                            <div className="mt-8">
                                <div className="flex h-[230px] items-end gap-3 border-b border-gray-100 px-2">
                                    {[42, 55, 38, 72, 58, 82, 94].map(
                                        (height, index) => (
                                            <div
                                                key={index}
                                                className="group flex h-full flex-1 items-end justify-center"
                                            >
                                                <div
                                                    className="relative w-full max-w-[45px] rounded-t-lg bg-[#FF6B35] transition group-hover:bg-[#e85c2c]"
                                                    style={{
                                                        height: `${height}%`,
                                                    }}
                                                >
                                                    <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[#151515] px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                                                        ₦
                                                        {Math.round(
                                                            height * 3200
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="mt-3 grid grid-cols-7 text-center text-xs text-gray-400">
                                    <span>Mon</span>
                                    <span>Tue</span>
                                    <span>Wed</span>
                                    <span>Thu</span>
                                    <span>Fri</span>
                                    <span>Sat</span>
                                    <span>Sun</span>
                                </div>
                            </div>
                        </div>

                        {/* ORDER SUMMARY */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-gray-500">
                                        Order Summary
                                    </p>

                                    <h2 className="mt-1 text-xl font-black">
                                        Today&apos;s Orders
                                    </h2>
                                </div>

                                <FiTrendingUp className="text-2xl text-[#FF6B35]" />
                            </div>

                            <div className="mt-7 space-y-5">
                                <div>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Completed
                                        </span>

                                        <span className="font-bold">
                                            74
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-green-500"
                                            style={{ width: "86%" }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Preparing
                                        </span>

                                        <span className="font-bold">
                                            6
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-[#FF6B35]"
                                            style={{ width: "45%" }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Ready
                                        </span>

                                        <span className="font-bold">
                                            3
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-blue-500"
                                            style={{ width: "25%" }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Out for delivery
                                        </span>

                                        <span className="font-bold">
                                            3
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-purple-500"
                                            style={{ width: "25%" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/partner/orders"
                                className="mt-8 flex items-center justify-center rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold transition hover:bg-[#FFF0E9] hover:text-[#FF6B35]"
                            >
                                View all orders
                            </Link>
                        </div>
                    </div>

                    {/* RECENT ORDERS + POPULAR ITEMS */}
                    <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                        {/* RECENT ORDERS */}
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-100 p-6">
                                <div>
                                    <p className="text-sm font-bold text-gray-500">
                                        Order Management
                                    </p>

                                    <h2 className="mt-1 text-xl font-black">
                                        Recent Orders
                                    </h2>
                                </div>

                                <Link
                                    href="/partner/orders"
                                    className="text-sm font-bold text-[#FF6B35] hover:underline"
                                >
                                    View all
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                                            <th className="px-6 py-4">
                                                Order
                                            </th>

                                            <th className="px-6 py-4">
                                                Customer
                                            </th>

                                            <th className="px-6 py-4">
                                                Amount
                                            </th>

                                            <th className="px-6 py-4">
                                                Status
                                            </th>

                                            <th className="px-6 py-4">
                                                Time
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentOrders.map(
                                            (order) => (
                                                <tr
                                                    key={
                                                        order.id
                                                    }
                                                    className="border-b border-gray-100 last:border-0"
                                                >
                                                    <td className="px-6 py-5">
                                                        <p className="text-sm font-black">
                                                            {
                                                                order.id
                                                            }
                                                        </p>

                                                        <p className="mt-1 max-w-[180px] truncate text-xs text-gray-400">
                                                            {
                                                                order.items
                                                            }
                                                        </p>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <p className="text-sm font-semibold">
                                                            {
                                                                order.customer
                                                            }
                                                        </p>
                                                    </td>

                                                    <td className="px-6 py-5 text-sm font-black">
                                                        {
                                                            order.amount
                                                        }
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span
                                                            className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${statusStyle(
                                                                order.status
                                                            )}`}
                                                        >
                                                            {
                                                                order.status
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5 text-xs text-gray-400">
                                                        {
                                                            order.time
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* POPULAR ITEMS */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-gray-500">
                                        Menu Performance
                                    </p>

                                    <h2 className="mt-1 text-xl font-black">
                                        Popular Items
                                    </h2>
                                </div>

                                <Link
                                    href="/partner/menu"
                                    className="text-sm font-bold text-[#FF6B35] hover:underline"
                                >
                                    Manage
                                </Link>
                            </div>

                            <div className="mt-6 space-y-5">
                                {popularItems.map(
                                    (item, index) => (
                                        <div
                                            key={
                                                item.name
                                            }
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9] text-sm font-black text-[#FF6B35]">
                                                {index +
                                                    1}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-bold">
                                                    {
                                                        item.name
                                                    }
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    {
                                                        item.orders
                                                    }{" "}
                                                    orders
                                                </p>
                                            </div>

                                            <p className="text-sm font-black">
                                                {
                                                    item.revenue
                                                }
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="mt-7 rounded-xl bg-gray-50 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                        <FiTrendingUp />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold">
                                            Sales are growing
                                        </p>

                                        <p className="mt-0.5 text-xs text-gray-500">
                                            Your top item is
                                            performing 18%
                                            better this week.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM CTA */}
                    <div className="mt-6 overflow-hidden rounded-2xl bg-[#151515] p-6 text-white md:p-8">
                        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                            <div>
                                <p className="text-sm font-bold text-[#FF6B35]">
                                    Grow your restaurant with Door-Step
                                </p>

                                <h2 className="mt-2 text-2xl font-black">
                                    Keep your menu fresh and your customers
                                    happy.
                                </h2>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                                    Add new meals, create promotions and manage
                                    your restaurant operations from one place.
                                </p>
                            </div>

                            <Link
                                href="/partner/menu"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3.5 text-sm font-bold transition hover:bg-[#e85c2c]"
                            >
                                Manage Menu
                                <FiChevronDown className="rotate-[-90deg]" />
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
