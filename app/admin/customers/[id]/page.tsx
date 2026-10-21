
"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiDollarSign,
  FiEdit3,
  FiEye,
  FiHome,
  FiMail,
  FiMapPin,
  FiPhone,
  FiRefreshCw,
  FiShoppingBag,
  FiUser,
  FiUserCheck,
  FiUserX,
  FiXCircle,
} from "react-icons/fi";

type CustomerStatus = "Active" | "Suspended" | "Inactive";

type CustomerOrder = {
  id: string;
  restaurant: string;
  type: string;
  status: string;
  paymentStatus: string;
  total: number;
  date: string;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  joined: string;
  lastOrder: string;
  location: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  orders: CustomerOrder[];
};

const demoCustomers: Customer[] = [
  {
    id: "CUS-1001",
    name: "John Okafor",
    email: "john.okafor@example.com",
    phone: "+234 801 234 5678",
    status: "Active",
    joined: "Jan 12, 2026",
    lastOrder: "Sep 19, 2026",
    location: "Lekki, Lagos",
    address: "24 Admiralty Way, Lekki Phase 1, Lagos",
    totalOrders: 42,
    totalSpent: 485600,
    orders: [
      {
        id: "ORD-10001",
        restaurant: "Chicken Republic",
        type: "Food Delivery",
        status: "Out for Delivery",
        paymentStatus: "Paid",
        total: 28800,
        date: "Sep 19, 2026 • 10:24 AM",
      },
      {
        id: "ORD-09982",
        restaurant: "The Place",
        type: "Food Delivery",
        status: "Delivered",
        paymentStatus: "Paid",
        total: 17400,
        date: "Sep 16, 2026 • 7:42 PM",
      },
      {
        id: "ORD-09941",
        restaurant: "Bukka Hut",
        type: "Food Delivery",
        status: "Delivered",
        paymentStatus: "Paid",
        total: 12500,
        date: "Sep 12, 2026 • 1:18 PM",
      },
      {
        id: "ORD-09887",
        restaurant: "Door-Step Market",
        type: "Shop & Deliver",
        status: "Delivered",
        paymentStatus: "Paid",
        total: 35600,
        date: "Sep 07, 2026 • 5:32 PM",
      },
      {
        id: "ORD-09764",
        restaurant: "Package Delivery",
        type: "Send Package",
        status: "Delivered",
        paymentStatus: "Paid",
        total: 6800,
        date: "Aug 28, 2026 • 11:06 AM",
      },
    ],
  },

  {
    id: "CUS-1002",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+234 802 445 6789",
    status: "Active",
    joined: "Feb 03, 2026",
    lastOrder: "Sep 19, 2026",
    location: "Ikeja, Lagos",
    address: "8 Toyin Street, Ikeja, Lagos",
    totalOrders: 35,
    totalSpent: 376800,
    orders: [
      {
        id: "ORD-10002",
        restaurant: "Bukka Hut",
        type: "Food Delivery",
        status: "Preparing",
        paymentStatus: "Paid",
        total: 12800,
        date: "Sep 19, 2026 • 10:05 AM",
      },
      {
        id: "ORD-09971",
        restaurant: "Chicken Republic",
        type: "Food Delivery",
        status: "Delivered",
        paymentStatus: "Paid",
        total: 15600,
        date: "Sep 15, 2026 • 6:15 PM",
      },
    ],
  },

  {
    id: "CUS-1003",
    name: "David Emmanuel",
    email: "david.emmanuel@example.com",
    phone: "+234 807 555 7788",
    status: "Active",
    joined: "Mar 18, 2026",
    lastOrder: "Sep 18, 2026",
    location: "Ikoyi, Lagos",
    address: "17 Bourdillon Road, Ikoyi, Lagos",
    totalOrders: 28,
    totalSpent: 295400,
    orders: [
      {
        id: "ORD-10003",
        restaurant: "The Place",
        type: "Food Delivery",
        status: "Delivered",
        paymentStatus: "Paid",
        total: 16600,
        date: "Sep 18, 2026 • 7:35 PM",
      },
    ],
  },

  {
    id: "CUS-1004",
    name: "Aisha Ibrahim",
    email: "aisha.ibrahim@example.com",
    phone: "+234 803 221 4455",
    status: "Active",
    joined: "Dec 21, 2025",
    lastOrder: "Sep 17, 2026",
    location: "Victoria Island, Lagos",
    address: "12 Adeola Odeku Street, Victoria Island, Lagos",
    totalOrders: 51,
    totalSpent: 624500,
    orders: [
      {
        id: "ORD-09991",
        restaurant: "KFC",
        type: "Food Delivery",
        status: "Delivered",
        paymentStatus: "Paid",
        total: 22400,
        date: "Sep 17, 2026 • 8:12 PM",
      },
    ],
  },

  {
    id: "CUS-1005",
    name: "Michael Adewale",
    email: "michael.adewale@example.com",
    phone: "+234 809 443 2211",
    status: "Inactive",
    joined: "May 11, 2026",
    lastOrder: "Jul 28, 2026",
    location: "Yaba, Lagos",
    address: "14 Herbert Macaulay Way, Yaba, Lagos",
    totalOrders: 7,
    totalSpent: 58300,
    orders: [],
  },

  {
    id: "CUS-1006",
    name: "Grace Johnson",
    email: "grace.johnson@example.com",
    phone: "+234 805 667 8899",
    status: "Active",
    joined: "Apr 08, 2026",
    lastOrder: "Sep 15, 2026",
    location: "Surulere, Lagos",
    address: "31 Adeniran Ogunsanya Street, Surulere, Lagos",
    totalOrders: 19,
    totalSpent: 218700,
    orders: [],
  },

  {
    id: "CUS-1007",
    name: "Daniel Okafor",
    email: "daniel.okafor@example.com",
    phone: "+234 806 222 1111",
    status: "Suspended",
    joined: "Jun 02, 2026",
    lastOrder: "Aug 30, 2026",
    location: "Maryland, Lagos",
    address: "5 Mobolaji Bank Anthony Way, Maryland, Lagos",
    totalOrders: 12,
    totalSpent: 145900,
    orders: [],
  },

  {
    id: "CUS-1008",
    name: "Blessing Adeyemi",
    email: "blessing.adeyemi@example.com",
    phone: "+234 810 998 7766",
    status: "Active",
    joined: "Jan 29, 2026",
    lastOrder: "Sep 16, 2026",
    location: "Gbagada, Lagos",
    address: "18 Ifeanyi Okoye Street, Gbagada, Lagos",
    totalOrders: 31,
    totalSpent: 342600,
    orders: [],
  },

  {
    id: "CUS-1009",
    name: "Samuel Williams",
    email: "samuel.williams@example.com",
    phone: "+234 811 334 5566",
    status: "Active",
    joined: "Mar 06, 2026",
    lastOrder: "Sep 14, 2026",
    location: "Ajah, Lagos",
    address: "9 Abraham Adesanya Estate, Ajah, Lagos",
    totalOrders: 24,
    totalSpent: 271800,
    orders: [],
  },

  {
    id: "CUS-1010",
    name: "Esther Joseph",
    email: "esther.joseph@example.com",
    phone: "+234 804 778 9922",
    status: "Inactive",
    joined: "Jul 12, 2026",
    lastOrder: "Aug 02, 2026",
    location: "Festac, Lagos",
    address: "22 2nd Avenue, Festac Town, Lagos",
    totalOrders: 5,
    totalSpent: 42600,
    orders: [],
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
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

function getOrderStatusClasses(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-green-50 text-green-700 border-green-200";

    case "Out for Delivery":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";

    case "Preparing":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

function SectionCard({
  title,
  icon,
  children,
  action,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            {icon}
          </div>

          <h2 className="font-bold text-gray-950">{title}</h2>
        </div>

        {action}
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}

function InfoBlock({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}

        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words text-sm font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function QuickStat({
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

function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getOrderStatusClasses(
        status
      )}`}
    >
      {status}
    </span>
  );
}

export default function CustomerDetailsPage() {
  const params = useParams();

  const customerId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundCustomer = demoCustomers.find(
        (item) =>
          item.id.toLowerCase() === customerId.toLowerCase()
      );

      setCustomer(foundCustomer ?? null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [customerId]);

  const averageOrderValue = useMemo(() => {
    if (!customer || customer.totalOrders === 0) {
      return 0;
    }

    return customer.totalSpent / customer.totalOrders;
  }, [customer]);

  function updateStatus(status: CustomerStatus) {
    setCustomer((current) =>
      current
        ? {
            ...current,
            status,
          }
        : current
    );
  }

  function refreshCustomer() {
    setLoading(true);

    setTimeout(() => {
      const foundCustomer = demoCustomers.find(
        (item) =>
          item.id.toLowerCase() === customerId.toLowerCase()
      );

      setCustomer(foundCustomer ?? null);
      setLoading(false);
    }, 500);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7f6] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-5 w-32 rounded bg-gray-200" />

          <div className="mt-5 h-36 rounded-2xl bg-gray-200" />

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="h-72 rounded-2xl bg-gray-200 lg:col-span-2" />

            <div className="h-72 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f5f7f6] px-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <FiXCircle className="text-3xl" />
          </div>

          <h1 className="mt-5 text-2xl font-black text-gray-950">
            Customer Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            We could not find a customer with the ID{" "}
            <span className="font-semibold text-gray-800">
              {customerId}
            </span>
            .
          </p>

          <Link
            href="/admin/customers"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <FiArrowLeft />
            Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7f6]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/admin/customers"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-orange-600"
            >
              <FiArrowLeft />
              Back to Customers
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                {customer.name}
              </h1>

              <span
                className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                  customer.status
                )}`}
              >
                {customer.status}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {customer.id} • Customer since {customer.joined}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={refreshCustomer}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
            >
              <FiRefreshCw />
              Refresh
            </button>

            {customer.status === "Active" ? (
              <button
                type="button"
                onClick={() => updateStatus("Suspended")}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                <FiUserX />
                Suspend
              </button>
            ) : (
              <button
                type="button"
                onClick={() => updateStatus("Active")}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700"
              >
                <FiUserCheck />
                Activate
              </button>
            )}
          </div>
        </div>

        {/* PROFILE HEADER */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-orange-100 text-2xl font-black text-orange-700">
                {getInitials(customer.name)}
              </div>

              <div>
                <h2 className="text-xl font-black text-gray-950">
                  {customer.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {customer.email}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {customer.phone}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <MiniProfileStat
                label="Orders"
                value={customer.totalOrders.toString()}
              />

              <MiniProfileStat
                label="Spent"
                value={formatCurrency(customer.totalSpent)}
              />

              <MiniProfileStat
                label="Avg. Order"
                value={formatCurrency(averageOrderValue)}
              />
            </div>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <QuickStat
            icon={<FiShoppingBag />}
            label="Total Orders"
            value={customer.totalOrders.toString()}
          />

          <QuickStat
            icon={<FiDollarSign />}
            label="Total Spent"
            value={formatCurrency(customer.totalSpent)}
          />

          <QuickStat
            icon={<FiDollarSign />}
            label="Average Order"
            value={formatCurrency(averageOrderValue)}
          />

          <QuickStat
            icon={<FiClock />}
            label="Last Order"
            value={customer.lastOrder}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <div className="space-y-6">
            {/* CUSTOMER INFORMATION */}
            <SectionCard
              title="Customer Information"
              icon={<FiUser />}
              action={
                <span className="text-xs font-semibold text-gray-400">
                  {customer.id}
                </span>
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <InfoBlock
                  icon={<FiUser />}
                  label="Full Name"
                  value={customer.name}
                />

                <InfoBlock
                  icon={<FiMail />}
                  label="Email Address"
                  value={customer.email}
                />

                <InfoBlock
                  icon={<FiPhone />}
                  label="Phone Number"
                  value={customer.phone}
                />

                <InfoBlock
                  icon={<FiMapPin />}
                  label="Location"
                  value={customer.location}
                />

                <div className="md:col-span-2">
                  <InfoBlock
                    icon={<FiHome />}
                    label="Default Address"
                    value={customer.address}
                  />
                </div>
              </div>
            </SectionCard>

            {/* ORDER HISTORY */}
            <SectionCard
              title="Order History"
              icon={<FiShoppingBag />}
              action={
                <span className="text-xs font-semibold text-gray-400">
                  {customer.orders.length} recent orders
                </span>
              }
            >
              {customer.orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-400">
                        <th className="pb-3 font-bold">
                          Order
                        </th>

                        <th className="pb-3 font-bold">
                          Restaurant
                        </th>

                        <th className="pb-3 font-bold">
                          Status
                        </th>

                        <th className="pb-3 font-bold">
                          Payment
                        </th>

                        <th className="pb-3 text-right font-bold">
                          Total
                        </th>

                        <th className="pb-3 text-right font-bold">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {customer.orders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="py-4">
                            <p className="text-sm font-bold text-gray-900">
                              {order.id}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {order.date}
                            </p>
                          </td>

                          <td className="py-4">
                            <p className="text-sm font-semibold text-gray-800">
                              {order.restaurant}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {order.type}
                            </p>
                          </td>

                          <td className="py-4">
                            <OrderStatusBadge
                              status={order.status}
                            />
                          </td>

                          <td className="py-4">
                            <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                              {order.paymentStatus}
                            </span>
                          </td>

                          <td className="py-4 text-right text-sm font-black text-gray-900">
                            {formatCurrency(order.total)}
                          </td>

                          <td className="py-4 text-right">
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
                            >
                              <FiEye />
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-xl bg-gray-50 px-6 py-12 text-center">
                  <FiShoppingBag className="mx-auto text-3xl text-gray-300" />

                  <h3 className="mt-4 font-bold text-gray-900">
                    No Recent Orders
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    This customer has no recent orders available
                    in the demo data.
                  </p>
                </div>
              )}
            </SectionCard>

            {/* CUSTOMER ACTIVITY */}
            <SectionCard
              title="Recent Activity"
              icon={<FiClock />}
            >
              <div className="space-y-5">
                <ActivityItem
                  icon={<FiShoppingBag />}
                  title="Order placed"
                  description={`Customer placed an order worth ${
                    customer.orders[0]
                      ? formatCurrency(customer.orders[0].total)
                      : "₦0"
                  }.`}
                  time={customer.lastOrder}
                />

                <ActivityItem
                  icon={<FiUserCheck />}
                  title="Account active"
                  description="Customer account is currently active on Door-Step."
                  time={`Joined ${customer.joined}`}
                />

                <ActivityItem
                  icon={<FiMapPin />}
                  title="Default location"
                  description={customer.address}
                  time={customer.location}
                />
              </div>
            </SectionCard>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* ACCOUNT STATUS */}
            <SectionCard
              title="Account Status"
              icon={<FiUserCheck />}
            >
              <div
                className={`rounded-xl border p-5 ${
                  customer.status === "Active"
                    ? "border-green-200 bg-green-50"
                    : customer.status === "Suspended"
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {customer.status === "Active" ? (
                    <FiCheckCircle className="text-2xl text-green-600" />
                  ) : (
                    <FiXCircle className="text-2xl text-red-600" />
                  )}

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Account {customer.status}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {customer.status === "Active"
                        ? "Customer can place orders normally."
                        : customer.status === "Suspended"
                          ? "Customer cannot place new orders."
                          : "Customer is currently inactive."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {customer.status !== "Active" && (
                  <button
                    type="button"
                    onClick={() => updateStatus("Active")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    <FiUserCheck />
                    Activate Customer
                  </button>
                )}

                {customer.status === "Active" && (
                  <button
                    type="button"
                    onClick={() => updateStatus("Suspended")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                  >
                    <FiUserX />
                    Suspend Customer
                  </button>
                )}
              </div>
            </SectionCard>

            {/* CONTACT */}
            <SectionCard
              title="Contact Customer"
              icon={<FiPhone />}
            >
              <div className="space-y-3">
                <a
                  href={`tel:${customer.phone}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <FiPhone />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {customer.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${customer.email}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FiMail />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-gray-900">
                      {customer.email}
                    </p>
                  </div>
                </a>
              </div>
            </SectionCard>

            {/* CUSTOMER SUMMARY */}
            <SectionCard
              title="Customer Summary"
              icon={<FiCreditCard />}
            >
              <div>
                <SummaryRow
                  label="Customer ID"
                  value={customer.id}
                />

                <SummaryRow
                  label="Joined"
                  value={customer.joined}
                />

                <SummaryRow
                  label="Total Orders"
                  value={customer.totalOrders.toString()}
                />

                <SummaryRow
                  label="Total Spent"
                  value={formatCurrency(customer.totalSpent)}
                />

                <SummaryRow
                  label="Average Order"
                  value={formatCurrency(averageOrderValue)}
                />

                <SummaryRow
                  label="Last Order"
                  value={customer.lastOrder}
                />
              </div>
            </SectionCard>

            {/* ADDRESS */}
            <SectionCard
              title="Default Delivery Address"
              icon={<FiMapPin />}
            >
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <FiHome />
                </div>

                <p className="mt-4 text-sm font-bold leading-6 text-gray-900">
                  {customer.address}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {customer.location}
                </p>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniProfileStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-[90px] rounded-xl bg-gray-50 px-4 py-3 text-center">
      <p className="text-xs font-medium text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-gray-950">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>

      <span className="text-right text-sm font-bold text-gray-900">
        {value}
      </span>
    </div>
  );
}

function ActivityItem({
  icon,
  title,
  description,
  time,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
          <h3 className="text-sm font-bold text-gray-900">
            {title}
          </h3>

          <span className="text-xs text-gray-400">
            {time}
          </span>
        </div>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
