
"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiUserCheck,
  FiUserX,
  FiChevronDown,
  FiRefreshCw,
  FiPhone,
  FiMail,
  FiMoreVertical,
} from "react-icons/fi";

type CustomerStatus = "Active" | "Suspended" | "Inactive";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  totalOrders: number;
  totalSpent: number;
  joined: string;
  lastOrder: string;
  location: string;
};

const initialCustomers: Customer[] = [
  {
    id: "CUS-1001",
    name: "John Okafor",
    email: "john.okafor@example.com",
    phone: "+234 801 234 5678",
    status: "Active",
    totalOrders: 42,
    totalSpent: 485600,
    joined: "Jan 12, 2026",
    lastOrder: "Sep 19, 2026",
    location: "Lekki, Lagos",
  },
  {
    id: "CUS-1002",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+234 802 445 6789",
    status: "Active",
    totalOrders: 35,
    totalSpent: 376800,
    joined: "Feb 03, 2026",
    lastOrder: "Sep 19, 2026",
    location: "Ikeja, Lagos",
  },
  {
    id: "CUS-1003",
    name: "David Emmanuel",
    email: "david.emmanuel@example.com",
    phone: "+234 807 555 7788",
    status: "Active",
    totalOrders: 28,
    totalSpent: 295400,
    joined: "Mar 18, 2026",
    lastOrder: "Sep 18, 2026",
    location: "Ikoyi, Lagos",
  },
  {
    id: "CUS-1004",
    name: "Aisha Ibrahim",
    email: "aisha.ibrahim@example.com",
    phone: "+234 803 221 4455",
    status: "Active",
    totalOrders: 51,
    totalSpent: 624500,
    joined: "Dec 21, 2025",
    lastOrder: "Sep 17, 2026",
    location: "Victoria Island, Lagos",
  },
  {
    id: "CUS-1005",
    name: "Michael Adewale",
    email: "michael.adewale@example.com",
    phone: "+234 809 443 2211",
    status: "Inactive",
    totalOrders: 7,
    totalSpent: 58300,
    joined: "May 11, 2026",
    lastOrder: "Jul 28, 2026",
    location: "Yaba, Lagos",
  },
  {
    id: "CUS-1006",
    name: "Grace Johnson",
    email: "grace.johnson@example.com",
    phone: "+234 805 667 8899",
    status: "Active",
    totalOrders: 19,
    totalSpent: 218700,
    joined: "Apr 08, 2026",
    lastOrder: "Sep 15, 2026",
    location: "Surulere, Lagos",
  },
  {
    id: "CUS-1007",
    name: "Daniel Okafor",
    email: "daniel.okafor@example.com",
    phone: "+234 806 222 1111",
    status: "Suspended",
    totalOrders: 12,
    totalSpent: 145900,
    joined: "Jun 02, 2026",
    lastOrder: "Aug 30, 2026",
    location: "Maryland, Lagos",
  },
  {
    id: "CUS-1008",
    name: "Blessing Adeyemi",
    email: "blessing.adeyemi@example.com",
    phone: "+234 810 998 7766",
    status: "Active",
    totalOrders: 31,
    totalSpent: 342600,
    joined: "Jan 29, 2026",
    lastOrder: "Sep 16, 2026",
    location: "Gbagada, Lagos",
  },
  {
    id: "CUS-1009",
    name: "Samuel Williams",
    email: "samuel.williams@example.com",
    phone: "+234 811 334 5566",
    status: "Active",
    totalOrders: 24,
    totalSpent: 271800,
    joined: "Mar 06, 2026",
    lastOrder: "Sep 14, 2026",
    location: "Ajah, Lagos",
  },
  {
    id: "CUS-1010",
    name: "Esther Joseph",
    email: "esther.joseph@example.com",
    phone: "+234 804 778 9922",
    status: "Inactive",
    totalOrders: 5,
    totalSpent: 42600,
    joined: "Jul 12, 2026",
    lastOrder: "Aug 02, 2026",
    location: "Festac, Lagos",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClasses(status: CustomerStatus) {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-700 border-green-200";

    case "Suspended":
      return "bg-red-50 text-red-700 border-red-200";

    case "Inactive":
      return "bg-gray-100 text-gray-600 border-gray-200";

    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] =
    useState<Customer[]>(initialCustomers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<CustomerStatus | "All">("All");

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        customer.name.toLowerCase().includes(searchValue) ||
        customer.email.toLowerCase().includes(searchValue) ||
        customer.phone.toLowerCase().includes(searchValue) ||
        customer.id.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const suspendedCustomers = customers.filter(
    (customer) => customer.status === "Suspended"
  ).length;

  const totalRevenue = customers.reduce(
    (total, customer) => total + customer.totalSpent,
    0
  );

  function updateCustomerStatus(
    id: string,
    status: CustomerStatus
  ) {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status,
            }
          : customer
      )
    );

    setOpenMenu(null);
  }

  function refreshCustomers() {
    setCustomers(initialCustomers);
    setSearch("");
    setStatusFilter("All");
    setOpenMenu(null);
  }

  return (
    <div className="min-h-screen bg-[#f5f7f6]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Customer Management
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              Customers
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Manage Door-Step customers, monitor their activity,
              orders and account status.
            </p>
          </div>

          <button
            type="button"
            onClick={refreshCustomers}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
          >
            <FiRefreshCw />
            Refresh
          </button>
        </div>

        {/* STATS */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<FiUsers />}
            label="Total Customers"
            value={totalCustomers.toString()}
          />

          <StatCard
            icon={<FiUserCheck />}
            label="Active Customers"
            value={activeCustomers.toString()}
          />

          <StatCard
            icon={<FiUserX />}
            label="Suspended"
            value={suspendedCustomers.toString()}
          />

          <StatCard
            icon={<FiDollarSign />}
            label="Customer Spending"
            value={formatCurrency(totalRevenue)}
          />
        </div>

        {/* SEARCH + FILTER */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by customer name, ID, email or phone..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <FiFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as
                        | CustomerStatus
                        | "All"
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm font-semibold text-gray-700 outline-none transition focus:border-orange-500 sm:w-48"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>

                <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold">
              Showing {filteredCustomers.length}
            </span>

            <span>of</span>

            <span className="font-semibold">
              {customers.length}
            </span>

            <span>customers</span>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="mt-6 hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Orders
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Total Spent
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Joined
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-black text-orange-700">
                          {getInitials(customer.name)}
                        </div>

                        <div>
                          <p className="font-bold text-gray-900">
                            {customer.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {customer.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-700">
                        {customer.phone}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {customer.email}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <FiShoppingBag className="text-gray-400" />

                        <span className="text-sm font-bold text-gray-900">
                          {customer.totalOrders}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-gray-900">
                        {formatCurrency(customer.totalSpent)}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-600">
                        {customer.joined}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Last order: {customer.lastOrder}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                          customer.status
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
                        >
                          <FiEye />
                          View
                        </Link>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === customer.id
                                  ? null
                                  : customer.id
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:text-gray-900"
                          >
                            <FiMoreVertical />
                          </button>

                          {openMenu === customer.id && (
                            <CustomerMenu
                              customer={customer}
                              onUpdateStatus={
                                updateCustomerStatus
                              }
                            />
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <EmptyState />
          )}
        </div>

        {/* MOBILE CARDS */}
        <div className="mt-6 space-y-4 lg:hidden">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-black text-orange-700">
                    {getInitials(customer.name)}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-950">
                      {customer.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      {customer.id}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                    customer.status
                  )}`}
                >
                  {customer.status}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MobileInfo
                  icon={<FiPhone />}
                  label="Phone"
                  value={customer.phone}
                />

                <MobileInfo
                  icon={<FiMail />}
                  label="Email"
                  value={customer.email}
                />

                <MobileInfo
                  icon={<FiShoppingBag />}
                  label="Orders"
                  value={customer.totalOrders.toString()}
                />

                <MobileInfo
                  icon={<FiDollarSign />}
                  label="Total Spent"
                  value={formatCurrency(customer.totalSpent)}
                />
              </div>

              <div className="mt-5 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-gray-400">
                    Joined {customer.joined}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {customer.location}
                  </p>
                </div>

                <Link
                  href={`/admin/customers/${customer.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  <FiEye />
                  View Customer
                </Link>
              </div>
            </div>
          ))}

          {filteredCustomers.length === 0 && (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
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
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>

        <p className="text-sm font-medium text-gray-500">
          {label}
        </p>
      </div>

      <p className="mt-4 text-xl font-black text-gray-950">
        {value}
      </p>
    </div>
  );
}

function MobileInfo({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}

        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words text-sm font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
}

function CustomerMenu({
  customer,
  onUpdateStatus,
}: {
  customer: Customer;
  onUpdateStatus: (
    id: string,
    status: CustomerStatus
  ) => void;
}) {
  return (
    <div className="absolute right-0 top-11 z-30 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
      <Link
        href={`/admin/customers/${customer.id}`}
        className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        View Customer
      </Link>

      {customer.status !== "Active" && (
        <button
          type="button"
          onClick={() =>
            onUpdateStatus(customer.id, "Active")
          }
          className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-green-700 hover:bg-green-50"
        >
          Activate
        </button>
      )}

      {customer.status === "Active" && (
        <button
          type="button"
          onClick={() =>
            onUpdateStatus(customer.id, "Suspended")
          }
          className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          Suspend
        </button>
      )}

      {customer.status === "Suspended" && (
        <button
          type="button"
          onClick={() =>
            onUpdateStatus(customer.id, "Inactive")
          }
          className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-gray-600 hover:bg-gray-50"
        >
          Mark Inactive
        </button>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <FiUsers className="text-2xl" />
      </div>

      <h3 className="mt-4 font-bold text-gray-900">
        No customers found
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        Try changing your search or status filter.
      </p>
    </div>
  );
}
