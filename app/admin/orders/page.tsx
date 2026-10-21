
"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiXCircle,
  FiDollarSign,
  FiChevronDown,
  FiRefreshCw,
} from "react-icons/fi";

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "Ready for Pickup"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";

type OrderType = "Food Delivery" | "Send Package" | "Shop & Deliver";

type Order = {
  id: string;
  customer: string;
  customerPhone: string;
  restaurant: string;
  rider: string;
  orderType: OrderType;
  items: number;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  commission: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  date: string;
  time: string;
};

const demoOrders: Order[] = [
  {
    id: "ORD-10001",
    customer: "John Adewale",
    customerPhone: "+234 801 234 5678",
    restaurant: "Chicken Republic",
    rider: "Michael Adeyemi",
    orderType: "Food Delivery",
    items: 3,
    subtotal: 18500,
    deliveryFee: 1800,
    serviceFee: 500,
    total: 20800,
    commission: 2775,
    paymentStatus: "Paid",
    status: "Delivered",
    date: "September 21, 2026",
    time: "08:45 AM",
  },
  {
    id: "ORD-10002",
    customer: "Sarah Williams",
    customerPhone: "+234 802 345 6789",
    restaurant: "The Place",
    rider: "Daniel Okafor",
    orderType: "Food Delivery",
    items: 2,
    subtotal: 12400,
    deliveryFee: 1500,
    serviceFee: 350,
    total: 14250,
    commission: 1860,
    paymentStatus: "Paid",
    status: "Out for Delivery",
    date: "September 21, 2026",
    time: "09:10 AM",
  },
  {
    id: "ORD-10003",
    customer: "David Okoro",
    customerPhone: "+234 803 456 7890",
    restaurant: "KFC",
    rider: "Blessing Johnson",
    orderType: "Food Delivery",
    items: 4,
    subtotal: 24600,
    deliveryFee: 2000,
    serviceFee: 600,
    total: 27200,
    commission: 3690,
    paymentStatus: "Paid",
    status: "Preparing",
    date: "September 21, 2026",
    time: "09:25 AM",
  },
  {
    id: "ORD-10004",
    customer: "Aisha Ibrahim",
    customerPhone: "+234 804 567 8901",
    restaurant: "Domino's Pizza",
    rider: "Samuel Williams",
    orderType: "Food Delivery",
    items: 2,
    subtotal: 15800,
    deliveryFee: 1700,
    serviceFee: 450,
    total: 17950,
    commission: 2370,
    paymentStatus: "Paid",
    status: "Confirmed",
    date: "September 21, 2026",
    time: "09:42 AM",
  },
  {
    id: "ORD-10005",
    customer: "Michael Johnson",
    customerPhone: "+234 805 678 9012",
    restaurant: "Bukka Hut",
    rider: "Aisha Ibrahim",
    orderType: "Food Delivery",
    items: 5,
    subtotal: 22400,
    deliveryFee: 1600,
    serviceFee: 550,
    total: 24550,
    commission: 3360,
    paymentStatus: "Pending",
    status: "Pending",
    date: "September 21, 2026",
    time: "10:05 AM",
  },
  {
    id: "ORD-10006",
    customer: "Peter Emmanuel",
    customerPhone: "+234 806 789 0123",
    restaurant: "Shoprite",
    rider: "David Emmanuel",
    orderType: "Shop & Deliver",
    items: 8,
    subtotal: 35800,
    deliveryFee: 2500,
    serviceFee: 800,
    total: 39100,
    commission: 0,
    paymentStatus: "Paid",
    status: "Out for Delivery",
    date: "September 21, 2026",
    time: "10:20 AM",
  },
  {
    id: "ORD-10007",
    customer: "Grace Adekunle",
    customerPhone: "+234 807 890 1234",
    restaurant: "Mama's Kitchen",
    rider: "Michael Adeyemi",
    orderType: "Food Delivery",
    items: 3,
    subtotal: 11200,
    deliveryFee: 1400,
    serviceFee: 300,
    total: 12900,
    commission: 1680,
    paymentStatus: "Paid",
    status: "Ready for Pickup",
    date: "September 21, 2026",
    time: "10:35 AM",
  },
  {
    id: "ORD-10008",
    customer: "Daniel James",
    customerPhone: "+234 808 901 2345",
    restaurant: "Chicken Republic",
    rider: "Daniel Okafor",
    orderType: "Food Delivery",
    items: 2,
    subtotal: 9800,
    deliveryFee: 1300,
    serviceFee: 250,
    total: 11350,
    commission: 1470,
    paymentStatus: "Failed",
    status: "Cancelled",
    date: "September 21, 2026",
    time: "10:50 AM",
  },
  {
    id: "ORD-10009",
    customer: "Blessing Okafor",
    customerPhone: "+234 809 012 3456",
    restaurant: "No Restaurant",
    rider: "Blessing Johnson",
    orderType: "Send Package",
    items: 1,
    subtotal: 0,
    deliveryFee: 3500,
    serviceFee: 500,
    total: 4000,
    commission: 0,
    paymentStatus: "Paid",
    status: "Out for Delivery",
    date: "September 21, 2026",
    time: "11:15 AM",
  },
  {
    id: "ORD-10010",
    customer: "Samuel Ade",
    customerPhone: "+234 810 123 4567",
    restaurant: "The Place",
    rider: "Aisha Ibrahim",
    orderType: "Food Delivery",
    items: 3,
    subtotal: 17600,
    deliveryFee: 1600,
    serviceFee: 400,
    total: 19600,
    commission: 2640,
    paymentStatus: "Paid",
    status: "Delivered",
    date: "September 20, 2026",
    time: "06:30 PM",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusStyle(status: OrderStatus) {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Out for Delivery":
      return "bg-blue-100 text-blue-700";

    case "Ready for Pickup":
      return "bg-purple-100 text-purple-700";

    case "Preparing":
      return "bg-orange-100 text-orange-700";

    case "Confirmed":
      return "bg-emerald-100 text-emerald-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getPaymentStyle(status: PaymentStatus) {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Failed":
      return "bg-red-100 text-red-700";

    case "Refunded":
      return "bg-purple-100 text-purple-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getOrderIcon(status: OrderStatus) {
  switch (status) {
    case "Delivered":
      return <FiCheckCircle />;

    case "Out for Delivery":
      return <FiTruck />;

    case "Cancelled":
      return <FiXCircle />;

    case "Preparing":
      return <FiPackage />;

    default:
      return <FiClock />;
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(demoOrders);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchValue) ||
        order.customer.toLowerCase().includes(searchValue) ||
        order.restaurant.toLowerCase().includes(searchValue) ||
        order.rider.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        order.paymentStatus === paymentFilter;

      const matchesType =
        typeFilter === "All" ||
        order.orderType === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment &&
        matchesType
      );
    });
  }, [
    orders,
    search,
    statusFilter,
    paymentFilter,
    typeFilter,
  ]);

  const statistics = useMemo(() => {
    const totalOrders = orders.length;

    const activeOrders = orders.filter(
      (order) =>
        order.status !== "Delivered" &&
        order.status !== "Cancelled"
    ).length;

    const deliveredOrders = orders.filter(
      (order) => order.status === "Delivered"
    ).length;

    const cancelledOrders = orders.filter(
      (order) => order.status === "Cancelled"
    ).length;

    const totalRevenue = orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((sum, order) => sum + order.total, 0);

    const totalCommission = orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((sum, order) => sum + order.commission, 0);

    return {
      totalOrders,
      activeOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      totalCommission,
    };
  }, [orders]);

  const updateOrderStatus = (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
      )
    );
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPaymentFilter("All");
    setTypeFilter("All");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-6 py-7 lg:px-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                Admin Management
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
                Order Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Monitor customer orders, payments, restaurants,
                riders and delivery progress from one place.
              </p>
            </div>

            <button
              onClick={() => setOrders(demoOrders)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
            >
              <FiRefreshCw />
              Refresh Orders
            </button>
          </div>
        </div>
      </div>

      <main className="px-6 py-8 lg:px-8">
        {/* STATISTICS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <StatCard
            icon={<FiPackage />}
            label="Total Orders"
            value={statistics.totalOrders.toString()}
          />

          <StatCard
            icon={<FiActivityIcon />}
            label="Active Orders"
            value={statistics.activeOrders.toString()}
          />

          <StatCard
            icon={<FiCheckCircle />}
            label="Delivered"
            value={statistics.deliveredOrders.toString()}
          />

          <StatCard
            icon={<FiXCircle />}
            label="Cancelled"
            value={statistics.cancelledOrders.toString()}
          />

          <StatCard
            icon={<FiDollarSign />}
            label="Revenue"
            value={formatCurrency(statistics.totalRevenue)}
          />

          <StatCard
            icon={<FiDollarSign />}
            label="Commission"
            value={formatCurrency(statistics.totalCommission)}
          />
        </section>

        {/* FILTERS */}
        <section className="mt-7 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            {/* SEARCH */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search order ID, customer, restaurant or rider..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {/* STATUS */}
              <FilterSelect
                icon={<FiFilter />}
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  "All",
                  "Pending",
                  "Confirmed",
                  "Preparing",
                  "Ready for Pickup",
                  "Out for Delivery",
                  "Delivered",
                  "Cancelled",
                ]}
              />

              {/* PAYMENT */}
              <FilterSelect
                icon={<FiDollarSign />}
                value={paymentFilter}
                onChange={setPaymentFilter}
                options={[
                  "All",
                  "Paid",
                  "Pending",
                  "Failed",
                  "Refunded",
                ]}
              />

              {/* TYPE */}
              <FilterSelect
                icon={<FiPackage />}
                value={typeFilter}
                onChange={setTypeFilter}
                options={[
                  "All",
                  "Food Delivery",
                  "Send Package",
                  "Shop & Deliver",
                ]}
              />

              <button
                onClick={resetFilters}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="mt-6 rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-gray-950">
                Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Showing {filteredOrders.length} of {orders.length}{" "}
                orders
              </p>
            </div>

            <div className="rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-orange-700">
              {statistics.activeOrders} active
            </div>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                    Restaurant
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                    Rider
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                    Total
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-bold text-gray-950">
                          {order.id}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {order.date} • {order.time}
                        </p>

                        <span className="mt-2 inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600">
                          {order.orderType}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-gray-900">
                        {order.customer}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {order.customerPhone}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-gray-900">
                        {order.restaurant}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {order.items} item
                        {order.items !== 1 ? "s" : ""}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-gray-900">
                        {order.rider}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-gray-950">
                        {formatCurrency(order.total)}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Fee: {formatCurrency(order.deliveryFee)}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${getPaymentStyle(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="relative inline-flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getOrderIcon(order.status)}
                          {order.status}
                        </span>

                        <select
                          value={order.status}
                          onChange={(event) =>
                            updateOrderStatus(
                              order.id,
                              event.target.value as OrderStatus
                            )
                          }
                          className="absolute inset-0 cursor-pointer opacity-0"
                          aria-label={`Change status for ${order.id}`}
                        >
                          <option value="Pending">
                            Pending
                          </option>
                          <option value="Confirmed">
                            Confirmed
                          </option>
                          <option value="Preparing">
                            Preparing
                          </option>
                          <option value="Ready for Pickup">
                            Ready for Pickup
                          </option>
                          <option value="Out for Delivery">
                            Out for Delivery
                          </option>
                          <option value="Delivered">
                            Delivered
                          </option>
                          <option value="Cancelled">
                            Cancelled
                          </option>
                        </select>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                        title="View order"
                      >
                        <FiEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="divide-y divide-gray-100 lg:hidden">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-black text-gray-950">
                      {order.id}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {order.date} • {order.time}
                    </p>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <MobileInfo
                    label="Customer"
                    value={order.customer}
                  />

                  <MobileInfo
                    label="Restaurant"
                    value={order.restaurant}
                  />

                  <MobileInfo
                    label="Rider"
                    value={order.rider}
                  />

                  <MobileInfo
                    label="Order Type"
                    value={order.orderType}
                  />

                  <MobileInfo
                    label="Payment"
                    value={order.paymentStatus}
                  />

                  <MobileInfo
                    label="Total"
                    value={formatCurrency(order.total)}
                  />
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
                  >
                    <FiEye />
                    View Order
                  </Link>

                  <select
                    value={order.status}
                    onChange={(event) =>
                      updateOrderStatus(
                        order.id,
                        event.target.value as OrderStatus
                      )
                    }
                    className="rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready for Pickup">
                      Ready for Pickup
                    </option>
                    <option value="Out for Delivery">
                      Out for Delivery
                    </option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredOrders.length === 0 && (
            <div className="px-6 py-16 text-center">
              <FiPackage className="mx-auto text-5xl text-gray-200" />

              <h3 className="mt-5 text-lg font-black text-gray-950">
                No orders found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-500">
            {label}
          </p>

          <p className="mt-1 truncate text-lg font-black text-gray-950">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  icon,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400">
        {icon}
      </div>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-10 text-sm font-semibold text-gray-700 outline-none transition focus:border-orange-400 focus:bg-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

function MobileInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function FiActivityIcon() {
  return <FiTruck />;
}
