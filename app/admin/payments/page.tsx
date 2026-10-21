
"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  FiArrowDown,
  FiArrowUp,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiDollarSign,
  FiEye,
  FiFilter,
  FiRefreshCw,
  FiSearch,
  FiSmartphone,
  FiTruck,
  FiUser,
  FiXCircle,
} from "react-icons/fi";

type PaymentStatus =
  | "Successful"
  | "Pending"
  | "Failed"
  | "Refunded";

type PaymentMethod =
  | "Card"
  | "Bank Transfer"
  | "Wallet"
  | "Cash on Delivery";

type PaymentType =
  | "Food Delivery"
  | "Send Package"
  | "Shop & Deliver";

type Payment = {
  id: string;
  orderId: string;
  customerId: string;
  customer: string;
  restaurant: string;
  method: PaymentMethod;
  type: PaymentType;
  status: PaymentStatus;
  amount: number;
  deliveryFee: number;
  platformFee: number;
  commission: number;
  netSettlement: number;
  reference: string;
  date: string;
  time: string;
};

const initialPayments: Payment[] = [
  {
    id: "PAY-10001",
    orderId: "ORD-10001",
    customerId: "CUS-1001",
    customer: "John Okafor",
    restaurant: "Chicken Republic",
    method: "Card",
    type: "Food Delivery",
    status: "Successful",
    amount: 18500,
    deliveryFee: 1800,
    platformFee: 500,
    commission: 2775,
    netSettlement: 15225,
    reference: "DS-PAY-10001",
    date: "18 Sep 2026",
    time: "10:42 AM",
  },
  {
    id: "PAY-10002",
    orderId: "ORD-10002",
    customerId: "CUS-1002",
    customer: "Sarah Williams",
    restaurant: "Bukka Hut",
    method: "Bank Transfer",
    type: "Food Delivery",
    status: "Successful",
    amount: 12800,
    deliveryFee: 1500,
    platformFee: 400,
    commission: 1920,
    netSettlement: 10880,
    reference: "DS-PAY-10002",
    date: "18 Sep 2026",
    time: "10:15 AM",
  },
  {
    id: "PAY-10003",
    orderId: "ORD-10003",
    customerId: "CUS-1003",
    customer: "David Emmanuel",
    restaurant: "The Place",
    method: "Card",
    type: "Food Delivery",
    status: "Successful",
    amount: 22400,
    deliveryFee: 2000,
    platformFee: 600,
    commission: 3360,
    netSettlement: 19040,
    reference: "DS-PAY-10003",
    date: "18 Sep 2026",
    time: "09:52 AM",
  },
  {
    id: "PAY-10004",
    orderId: "ORD-10004",
    customerId: "CUS-1004",
    customer: "Aisha Ibrahim",
    restaurant: "Sweet Sensation",
    method: "Wallet",
    type: "Food Delivery",
    status: "Pending",
    amount: 9600,
    deliveryFee: 1200,
    platformFee: 300,
    commission: 1440,
    netSettlement: 8160,
    reference: "DS-PAY-10004",
    date: "18 Sep 2026",
    time: "09:28 AM",
  },
  {
    id: "PAY-10005",
    orderId: "ORD-10005",
    customerId: "CUS-1005",
    customer: "Michael Adewale",
    restaurant: "KFC",
    method: "Card",
    type: "Food Delivery",
    status: "Failed",
    amount: 15700,
    deliveryFee: 1700,
    platformFee: 450,
    commission: 2355,
    netSettlement: 13345,
    reference: "DS-PAY-10005",
    date: "17 Sep 2026",
    time: "06:41 PM",
  },
  {
    id: "PAY-10006",
    orderId: "ORD-10006",
    customerId: "CUS-1006",
    customer: "Grace Johnson",
    restaurant: "Domino's Pizza",
    method: "Bank Transfer",
    type: "Food Delivery",
    status: "Successful",
    amount: 19800,
    deliveryFee: 1600,
    platformFee: 500,
    commission: 2970,
    netSettlement: 16830,
    reference: "DS-PAY-10006",
    date: "17 Sep 2026",
    time: "05:22 PM",
  },
  {
    id: "PAY-10007",
    orderId: "ORD-10007",
    customerId: "CUS-1007",
    customer: "Daniel Okafor",
    restaurant: "Bamboo House",
    method: "Cash on Delivery",
    type: "Food Delivery",
    status: "Successful",
    amount: 11200,
    deliveryFee: 1400,
    platformFee: 350,
    commission: 1680,
    netSettlement: 9520,
    reference: "DS-PAY-10007",
    date: "17 Sep 2026",
    time: "03:47 PM",
  },
  {
    id: "PAY-10008",
    orderId: "ORD-10008",
    customerId: "CUS-1008",
    customer: "Blessing Adeyemi",
    restaurant: "Chicken Republic",
    method: "Card",
    type: "Send Package",
    status: "Successful",
    amount: 8500,
    deliveryFee: 2500,
    platformFee: 500,
    commission: 0,
    netSettlement: 6000,
    reference: "DS-PAY-10008",
    date: "17 Sep 2026",
    time: "02:18 PM",
  },
  {
    id: "PAY-10009",
    orderId: "ORD-10009",
    customerId: "CUS-1009",
    customer: "Samuel Williams",
    restaurant: "Shop & Deliver",
    method: "Wallet",
    type: "Shop & Deliver",
    status: "Refunded",
    amount: 14300,
    deliveryFee: 1800,
    platformFee: 400,
    commission: 0,
    netSettlement: 12100,
    reference: "DS-PAY-10009",
    date: "16 Sep 2026",
    time: "04:36 PM",
  },
  {
    id: "PAY-10010",
    orderId: "ORD-10010",
    customerId: "CUS-1010",
    customer: "Esther Joseph",
    restaurant: "The Place",
    method: "Bank Transfer",
    type: "Food Delivery",
    status: "Successful",
    amount: 17600,
    deliveryFee: 1600,
    platformFee: 450,
    commission: 2640,
    netSettlement: 14960,
    reference: "DS-PAY-10010",
    date: "16 Sep 2026",
    time: "01:05 PM",
  },
];

const statusStyles: Record<PaymentStatus, string> = {
  Successful:
    "bg-green-50 text-green-700 border-green-200",
  Pending:
    "bg-yellow-50 text-yellow-700 border-yellow-200",
  Failed:
    "bg-red-50 text-red-700 border-red-200",
  Refunded:
    "bg-purple-50 text-purple-700 border-purple-200",
};

function formatCurrency(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function StatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  const icons: Record<PaymentStatus, ReactNode> = {
    Successful: <FiCheckCircle />,
    Pending: <FiClock />,
    Failed: <FiXCircle />,
    Refunded: <FiRefreshCw />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

function PaymentTypeIcon({
  type,
}: {
  type: PaymentType;
}) {
  if (type === "Send Package") {
    return <FiTruck />;
  }

  if (type === "Shop & Deliver") {
    return <FiSmartphone />;
  }

  return <FiCreditCard />;
}

export default function PaymentsPage() {
  const [payments, setPayments] =
    useState<Payment[]>(initialPayments);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | PaymentStatus>("All");
  const [methodFilter, setMethodFilter] =
    useState<"All" | PaymentMethod>("All");
  const [typeFilter, setTypeFilter] =
    useState<"All" | PaymentType>("All");

  const filteredPayments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return payments.filter((payment) => {
      const matchesSearch =
        !query ||
        payment.id.toLowerCase().includes(query) ||
        payment.orderId.toLowerCase().includes(query) ||
        payment.customer.toLowerCase().includes(query) ||
        payment.restaurant.toLowerCase().includes(query) ||
        payment.reference.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" ||
        payment.method === methodFilter;

      const matchesType =
        typeFilter === "All" ||
        payment.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        matchesType
      );
    });
  }, [
    payments,
    search,
    statusFilter,
    methodFilter,
    typeFilter,
  ]);

  const totalPayments = payments.length;

  const successfulPayments = payments.filter(
    (payment) => payment.status === "Successful"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  const failedPayments = payments.filter(
    (payment) =>
      payment.status === "Failed" ||
      payment.status === "Refunded"
  ).length;

  const successfulVolume = payments
    .filter((payment) => payment.status === "Successful")
    .reduce((total, payment) => total + payment.amount, 0);

  const platformRevenue = payments
    .filter((payment) => payment.status === "Successful")
    .reduce(
      (total, payment) =>
        total +
        payment.platformFee +
        payment.commission,
      0
    );

  const refundPayment = (paymentId: string) => {
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              status: "Refunded",
            }
          : payment
      )
    );
  };

  const resetDemoPayments = () => {
    setPayments(initialPayments);
    setSearch("");
    setStatusFilter("All");
    setMethodFilter("All");
    setTypeFilter("All");
  };

  return (
    <div className="min-h-screen bg-[#EEF2F1] p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#003A2B]">
            Finance
          </p>

          <h1 className="mt-2 text-3xl font-black text-gray-950">
            Payments
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Monitor customer payments, platform fees,
            commissions and settlements.
          </p>
        </div>

        <button
          onClick={resetDemoPayments}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#003A2B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#00513D]"
        >
          <FiRefreshCw />
          Refresh Payments
        </button>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <FiCreditCard className="text-xl" />
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600">
              <FiArrowUp />
              12.4%
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-gray-500">
            Total Payments
          </p>

          <p className="mt-1 text-2xl font-black text-gray-950">
            {totalPayments}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <FiCheckCircle className="text-xl" />
            </div>

            <span className="text-xs font-bold text-green-600">
              {successfulPayments} successful
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-gray-500">
            Successful
          </p>

          <p className="mt-1 text-2xl font-black text-gray-950">
            {successfulPayments}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-yellow-50 p-3 text-yellow-600">
              <FiClock className="text-xl" />
            </div>

            <span className="text-xs font-bold text-yellow-600">
              Requires attention
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-gray-500">
            Pending
          </p>

          <p className="mt-1 text-2xl font-black text-gray-950">
            {pendingPayments}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <FiDollarSign className="text-xl" />
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600">
              <FiArrowUp />
              Revenue
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-gray-500">
            Successful Volume
          </p>

          <p className="mt-1 text-2xl font-black text-gray-950">
            {formatCurrency(successfulVolume)}
          </p>
        </div>
      </div>

      {/* REVENUE SUMMARY */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Platform Revenue
          </p>

          <p className="mt-2 text-2xl font-black text-gray-950">
            {formatCurrency(platformRevenue)}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Platform fees + restaurant commissions
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Failed / Refunded
          </p>

          <p className="mt-2 text-2xl font-black text-gray-950">
            {failedPayments}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Payments requiring review
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Showing Results
          </p>

          <p className="mt-2 text-2xl font-black text-gray-950">
            {filteredPayments.length}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Matching current filters
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <FiFilter className="text-[#003A2B]" />

          <h2 className="font-black text-gray-950">
            Payment Filters
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search payments..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#003A2B] focus:bg-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | "All"
                  | PaymentStatus
              )
            }
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-[#003A2B]"
          >
            <option value="All">All Statuses</option>
            <option value="Successful">Successful</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>

          <select
            value={methodFilter}
            onChange={(event) =>
              setMethodFilter(
                event.target.value as
                  | "All"
                  | PaymentMethod
              )
            }
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-[#003A2B]"
          >
            <option value="All">All Methods</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">
              Bank Transfer
            </option>
            <option value="Wallet">Wallet</option>
            <option value="Cash on Delivery">
              Cash on Delivery
            </option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value as
                  | "All"
                  | PaymentType
              )
            }
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-[#003A2B]"
          >
            <option value="All">All Types</option>
            <option value="Food Delivery">
              Food Delivery
            </option>
            <option value="Send Package">
              Send Package
            </option>
            <option value="Shop & Deliver">
              Shop & Deliver
            </option>
          </select>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm xl:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                  Payment
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                  Type
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                  Method
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                  Amount
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                  Revenue
                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-5 py-5">
                    <div>
                      <p className="font-black text-gray-950">
                        {payment.id}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {payment.orderId}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {payment.reference}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003A2B] text-white">
                        <FiUser />
                      </div>

                      <div>
                        <p className="font-bold text-gray-950">
                          {payment.customer}
                        </p>

                        <p className="text-xs text-gray-500">
                          {payment.customerId}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <span className="text-[#003A2B]">
                        <PaymentTypeIcon
                          type={payment.type}
                        />
                      </span>

                      {payment.type}
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <p className="text-sm font-semibold text-gray-700">
                      {payment.method}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {payment.date} · {payment.time}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <p className="font-black text-gray-950">
                      {formatCurrency(payment.amount)}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Fee: {formatCurrency(payment.deliveryFee)}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <p className="font-bold text-[#003A2B]">
                      {formatCurrency(
                        payment.platformFee +
                          payment.commission
                      )}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Platform + commission
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <StatusBadge status={payment.status} />
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/payments/${payment.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-[#003A2B] hover:text-[#003A2B]"
                      >
                        <FiEye />
                        View
                      </Link>

                      {payment.status === "Successful" && (
                        <button
                          onClick={() =>
                            refundPayment(payment.id)
                          }
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
                        >
                          Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE / TABLET CARDS */}
      <div className="mt-6 grid gap-4 xl:hidden">
        {filteredPayments.map((payment) => (
          <div
            key={payment.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-black text-gray-950">
                  {payment.id}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {payment.orderId}
                </p>
              </div>

              <StatusBadge status={payment.status} />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Customer
                </p>

                <p className="mt-1 font-bold text-gray-900">
                  {payment.customer}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Restaurant
                </p>

                <p className="mt-1 font-bold text-gray-900">
                  {payment.restaurant}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Payment Method
                </p>

                <p className="mt-1 font-bold text-gray-900">
                  {payment.method}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Type
                </p>

                <p className="mt-1 flex items-center gap-2 font-bold text-gray-900">
                  <PaymentTypeIcon type={payment.type} />
                  {payment.type}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Amount
                </p>

                <p className="mt-1 text-lg font-black text-gray-950">
                  {formatCurrency(payment.amount)}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Platform Revenue
                </p>

                <p className="mt-1 text-lg font-black text-[#003A2B]">
                  {formatCurrency(
                    payment.platformFee +
                      payment.commission
                  )}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={`/admin/payments/${payment.id}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#003A2B] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#00513D]"
              >
                <FiEye />
                View Payment
              </Link>

              {payment.status === "Successful" && (
                <button
                  onClick={() =>
                    refundPayment(payment.id)
                  }
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                >
                  Refund
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredPayments.length === 0 && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <FiSearch className="mx-auto text-4xl text-gray-300" />

          <h3 className="mt-4 text-xl font-black text-gray-950">
            No payments found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* DEMO NOTICE */}
      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
        <p className="text-sm font-bold text-orange-800">
          Demo payment data
        </p>

        <p className="mt-1 text-sm leading-6 text-orange-700">
          These payment records are currently stored in
          component state for demonstration. In production,
          payment status, refunds, settlements and transaction
          references should come from your backend/payment
          provider.
        </p>
      </div>
    </div>
  );
}
