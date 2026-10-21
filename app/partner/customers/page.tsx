
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
    FiArrowLeft,
    FiBell,
    FiCalendar,
    FiChevronDown,
    FiGrid,
    FiMail,
    FiMenu,
    FiPackage,
    FiPhone,
    FiSearch,
    FiShoppingBag,
    FiTrendingUp,
    FiUser,
    FiUsers,
    FiX,
} from "react-icons/fi";

type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    orders: number;
    totalSpent: number;
    lastOrder: string;
    status: "Active" | "Inactive";
    joined: string;
};

const initialCustomers: Customer[] = [
    {
        id: "CUS-001",
        name: "Chinedu Okafor",
        email: "chinedu@example.com",
        phone: "0803 456 7890",
        location: "Ikeja, Lagos",
        orders: 18,
        totalSpent: 142500,
        lastOrder: "Sep 19, 2026",
        status: "Active",
        joined: "Jan 12, 2026",
    },
    {
        id: "CUS-002",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "0812 345 6789",
        location: "Maryland, Lagos",
        orders: 12,
        totalSpent: 98600,
        lastOrder: "Sep 19, 2026",
        status: "Active",
        joined: "Feb 05, 2026",
    },
    {
        id: "CUS-003",
        name: "David Williams",
        email: "david@example.com",
        phone: "0809 234 5678",
        location: "Yaba, Lagos",
        orders: 9,
        totalSpent: 72500,
        lastOrder: "Sep 18, 2026",
        status: "Active",
        joined: "Mar 21, 2026",
    },
    {
        id: "CUS-004",
        name: "Blessing Adeyemi",
        email: "blessing@example.com",
        phone: "0816 567 8901",
        location: "Surulere, Lagos",
        orders: 7,
        totalSpent: 58400,
        lastOrder: "Sep 18, 2026",
        status: "Active",
        joined: "Apr 08, 2026",
    },
    {
        id: "CUS-005",
        name: "Michael James",
        email: "michael@example.com",
        phone: "0806 789 1234",
        location: "Gbagada, Lagos",
        orders: 5,
        totalSpent: 41600,
        lastOrder: "Sep 17, 2026",
        status: "Active",
        joined: "May 14, 2026",
    },
    {
        id: "CUS-006",
        name: "Grace Samuel",
        email: "grace@example.com",
        phone: "0814 678 2345",
        location: "Ojota, Lagos",
        orders: 3,
        totalSpent: 26700,
        lastOrder: "Sep 17, 2026",
        status: "Inactive",
        joined: "Jun 02, 2026",
    },
    {
        id: "CUS-007",
        name: "Tunde Balogun",
        email: "tunde@example.com",
        phone: "0802 123 4567",
        location: "Ogba, Lagos",
        orders: 15,
        totalSpent: 118900,
        lastOrder: "Sep 16, 2026",
        status: "Active",
        joined: "Jan 28, 2026",
    },
    {
        id: "CUS-008",
        name: "Aisha Bello",
        email: "aisha@example.com",
        phone: "0810 345 6789",
        location: "Lekki, Lagos",
        orders: 10,
        totalSpent: 91300,
        lastOrder: "Sep 15, 2026",
        status: "Active",
        joined: "Feb 19, 2026",
    },
];

const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

export default function CustomersPage() {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedCustomer, setSelectedCustomer] =
        useState<Customer | null>(null);

    const filteredCustomers = useMemo(() => {
        const query = search.toLowerCase().trim();

        return initialCustomers.filter((customer) => {
            const matchesSearch =
                !query ||
                customer.name.toLowerCase().includes(query) ||
                customer.email.toLowerCase().includes(query) ||
                customer.phone.toLowerCase().includes(query) ||
                customer.location.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "All" || customer.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter]);

    const totalCustomers = initialCustomers.length;

    const activeCustomers = initialCustomers.filter(
        (customer) => customer.status === "Active"
    ).length;

    const totalOrders = initialCustomers.reduce(
        (total, customer) => total + customer.orders,
        0
    );

    const totalRevenue = initialCustomers.reduce(
        (total, customer) => total + customer.totalSpent,
        0
    );

    return (
        <div className="min-h-screen bg-[#F5F7F6] text-[#151515]">
            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col bg-[#151515] text-white transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
                    <div>
                        <p className="text-xl font-black tracking-tight">
                            Door<span className="text-[#FF6B35]">-Step</span>
                        </p>

                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                            Restaurant Partner
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
                    >
                        <FiX />
                    </button>
                </div>

                <div className="px-4 py-6">
                    <div className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                        Main Menu
                    </div>

                    <nav className="space-y-1">
                        <Link
                            href="/partner/dashboard"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <FiGrid className="text-lg" />
                            Dashboard
                        </Link>

                        <Link
                            href="/partner/orders"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <FiPackage className="text-lg" />
                            Orders
                        </Link>

                        <Link
                            href="/partner/menu"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <FiShoppingBag className="text-lg" />
                            Menu
                        </Link>

                        <Link
                            href="/partner/earnings"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <FiTrendingUp className="text-lg" />
                            Earnings
                        </Link>


                        <Link
                            href="/partner/customers"
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${pathname === "/partner/customers"
                                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            Customers
                        </Link>



                        <Link
                            href="/partner/promotions"
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <FiTrendingUp className="text-lg" />
                            Promotions
                        </Link>
                    </nav>
                </div>

                <div className="mt-auto border-t border-white/10 p-4">
                    <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <FiUser className="text-lg" />
                        Settings
                    </button>

                    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35] font-bold">
                            MK
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-white">
                                Mama&apos;s Kitchen
                            </p>

                            <p className="truncate text-xs text-gray-500">
                                Restaurant Partner
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <div className="lg:ml-[270px]">
                {/* HEADER */}
                <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur sm:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-xl border border-gray-200 p-2.5 text-gray-700 hover:bg-gray-50 lg:hidden"
                        >
                            <FiMenu />
                        </button>

                        <div>
                            <h1 className="text-xl font-black text-gray-950 sm:text-2xl">
                                Customers
                            </h1>

                            <p className="hidden text-sm text-gray-500 sm:block">
                                Understand and manage your restaurant customers.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="relative rounded-xl border border-gray-200 p-3 text-gray-600 transition hover:bg-gray-50"
                    >
                        <FiBell className="text-lg" />

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B35]" />
                    </button>
                </header>

                <main className="p-5 sm:p-8">
                    {/* PAGE INTRO */}
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <Link
                                href="/partner/dashboard"
                                className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#FF6B35]"
                            >
                                <FiArrowLeft />
                                Back to Dashboard
                            </Link>

                            <h2 className="text-2xl font-black text-gray-950 sm:text-3xl">
                                Customer Overview
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                View customer activity, order history and spending.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600">
                            <FiCalendar className="text-[#FF6B35]" />
                            September 2026
                            <FiChevronDown className="text-gray-400" />
                        </div>
                    </div>

                    {/* STAT CARDS */}
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Total Customers
                                    </p>

                                    <p className="mt-2 text-3xl font-black text-gray-950">
                                        {totalCustomers}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF6B35]">
                                    <FiUsers className="text-xl" />
                                </div>
                            </div>

                            <p className="mt-4 text-xs font-semibold text-green-600">
                                +8 this month
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Active Customers
                                    </p>

                                    <p className="mt-2 text-3xl font-black text-gray-950">
                                        {activeCustomers}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                    <FiUser className="text-xl" />
                                </div>
                            </div>

                            <p className="mt-4 text-xs font-medium text-gray-400">
                                Customers who ordered recently
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Total Orders
                                    </p>

                                    <p className="mt-2 text-3xl font-black text-gray-950">
                                        {totalOrders}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <FiPackage className="text-xl" />
                                </div>
                            </div>

                            <p className="mt-4 text-xs font-medium text-gray-400">
                                Orders from listed customers
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Customer Revenue
                                    </p>

                                    <p className="mt-2 text-2xl font-black text-gray-950">
                                        {formatCurrency(totalRevenue)}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                    <FiTrendingUp className="text-xl" />
                                </div>
                            </div>

                            <p className="mt-4 text-xs font-semibold text-green-600">
                                +14.2% vs last month
                            </p>
                        </div>
                    </div>

                    {/* SEARCH + FILTER */}
                    <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="relative w-full lg:max-w-md">
                                <FiSearch className="absolute left-4 top-3.5 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search customers..."
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {["All", "Active", "Inactive"].map((status) => (
                                    <button
                                        key={status}
                                        type="button"
                                        onClick={() => setStatusFilter(status)}
                                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${statusFilter === status
                                            ? "bg-[#FF6B35] text-white"
                                            : "border border-gray-200 bg-white text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35]"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CUSTOMER TABLE */}
                    <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-100 p-6">
                            <div>
                                <h3 className="text-lg font-black text-gray-950">
                                    Customer List
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {filteredCustomers.length} customers found
                                </p>
                            </div>
                        </div>

                        {/* DESKTOP */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full min-w-[950px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50 text-left">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Customer
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Contact
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Orders
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Total Spent
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Last Order
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredCustomers.map((customer) => (
                                        <tr
                                            key={customer.id}
                                            className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-[#FF6B35]">
                                                        {customer.name
                                                            .split(" ")
                                                            .map((part) => part[0])
                                                            .join("")
                                                            .slice(0, 2)}
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-bold text-gray-950">
                                                            {customer.name}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {customer.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <p className="text-sm font-medium text-gray-700">
                                                    {customer.phone}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    {customer.email}
                                                </p>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-bold text-gray-700">
                                                    {customer.orders}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5 text-sm font-black text-gray-950">
                                                {formatCurrency(customer.totalSpent)}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-gray-500">
                                                {customer.lastOrder}
                                            </td>

                                            <td className="px-6 py-5">
                                                <span
                                                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${customer.status === "Active"
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-gray-100 text-gray-500"
                                                        }`}
                                                >
                                                    {customer.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedCustomer(customer)}
                                                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* MOBILE */}
                        <div className="divide-y divide-gray-100 md:hidden">
                            {filteredCustomers.map((customer) => (
                                <div key={customer.id} className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-bold text-[#FF6B35]">
                                                {customer.name
                                                    .split(" ")
                                                    .map((part) => part[0])
                                                    .join("")
                                                    .slice(0, 2)}
                                            </div>

                                            <div>
                                                <p className="font-bold text-gray-950">
                                                    {customer.name}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    {customer.location}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${customer.status === "Active"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            {customer.status}
                                        </span>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-400">Orders</p>
                                            <p className="mt-1 font-black text-gray-950">
                                                {customer.orders}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400">Total spent</p>
                                            <p className="mt-1 font-black text-gray-950">
                                                {formatCurrency(customer.totalSpent)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400">Last order</p>
                                            <p className="mt-1 text-sm font-medium text-gray-600">
                                                {customer.lastOrder}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400">Joined</p>
                                            <p className="mt-1 text-sm font-medium text-gray-600">
                                                {customer.joined}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setSelectedCustomer(customer)}
                                        className="mt-5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                                    >
                                        View Customer
                                    </button>
                                </div>
                            ))}
                        </div>

                        {filteredCustomers.length === 0 && (
                            <div className="p-12 text-center">
                                <FiUsers className="mx-auto text-4xl text-gray-300" />

                                <p className="mt-4 font-bold text-gray-700">
                                    No customers found
                                </p>

                                <p className="mt-1 text-sm text-gray-400">
                                    Try changing your search or filter.
                                </p>
                            </div>
                        )}
                    </section>
                </main>
            </div>

            {/* CUSTOMER DETAILS MODAL */}
            {selectedCustomer && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-gray-100 p-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FF6B35]">
                                    Customer Profile
                                </p>

                                <h3 className="mt-1 text-2xl font-black text-gray-950">
                                    {selectedCustomer.name}
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedCustomer(null)}
                                className="rounded-xl bg-gray-100 p-2.5 text-gray-500 transition hover:bg-gray-200"
                            >
                                <FiX />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* PROFILE */}
                            <div className="flex flex-col gap-5 rounded-2xl bg-gray-50 p-5 sm:flex-row sm:items-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-2xl font-black text-[#FF6B35]">
                                    {selectedCustomer.name
                                        .split(" ")
                                        .map((part) => part[0])
                                        .join("")
                                        .slice(0, 2)}
                                </div>

                                <div>
                                    <h4 className="text-xl font-black text-gray-950">
                                        {selectedCustomer.name}
                                    </h4>

                                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                                        <p className="flex items-center gap-2">
                                            <FiMail />
                                            {selectedCustomer.email}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <FiPhone />
                                            {selectedCustomer.phone}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <FiUser />
                                            {selectedCustomer.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* STATS */}
                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-gray-200 p-5">
                                    <p className="text-xs font-medium text-gray-400">
                                        Total Orders
                                    </p>

                                    <p className="mt-2 text-2xl font-black text-gray-950">
                                        {selectedCustomer.orders}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-200 p-5">
                                    <p className="text-xs font-medium text-gray-400">
                                        Total Spent
                                    </p>

                                    <p className="mt-2 text-2xl font-black text-gray-950">
                                        {formatCurrency(selectedCustomer.totalSpent)}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-200 p-5">
                                    <p className="text-xs font-medium text-gray-400">
                                        Customer Since
                                    </p>

                                    <p className="mt-2 text-lg font-black text-gray-950">
                                        {selectedCustomer.joined}
                                    </p>
                                </div>
                            </div>

                            {/* ORDER HISTORY */}
                            <div className="mt-6">
                                <h4 className="text-lg font-black text-gray-950">
                                    Recent Order History
                                </h4>

                                <div className="mt-4 space-y-3">
                                    {[
                                        {
                                            id: "DS-10245",
                                            date: "Sep 19, 2026",
                                            amount: 18500,
                                            status: "Completed",
                                        },
                                        {
                                            id: "DS-10198",
                                            date: "Sep 12, 2026",
                                            amount: 9200,
                                            status: "Completed",
                                        },
                                        {
                                            id: "DS-10140",
                                            date: "Sep 05, 2026",
                                            amount: 14500,
                                            status: "Completed",
                                        },
                                    ].map((order) => (
                                        <div
                                            key={order.id}
                                            className="flex flex-col gap-3 rounded-2xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div>
                                                <p className="font-bold text-gray-950">{order.id}</p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    {order.date}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between gap-5 sm:justify-end">
                                                <p className="font-black text-gray-950">
                                                    {formatCurrency(order.amount)}
                                                </p>

                                                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href={`tel:${selectedCustomer.phone.replace(/\s/g, "")}`}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#151515] px-5 py-3 font-bold text-white transition hover:bg-[#FF6B35]"
                                >
                                    <FiPhone />
                                    Call Customer
                                </a>

                                <a
                                    href={`mailto:${selectedCustomer.email}`}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-bold text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                                >
                                    <FiMail />
                                    Email Customer
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
