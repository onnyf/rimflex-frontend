
"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiEdit3,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiRefreshCw,
  FiShoppingBag,
  FiTruck,
  FiUser,
  FiXCircle,
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

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  orderType: "Food Delivery" | "Send Package" | "Shop & Deliver";
  createdAt: string;

  customer: {
    name: string;
    phone: string;
    email: string;
  };

  restaurant: {
    name: string;
    address: string;
    phone: string;
  };

  rider: {
    name: string;
    phone: string;
    vehicle: string;
    plate: string;
  } | null;

  pickupAddress: string;
  deliveryAddress: string;

  items: OrderItem[];

  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  discount: number;
  total: number;
  commission: number;

  estimatedDelivery: string;
};

const demoOrders: Order[] = [
  {
    id: "ORD-10001",
    status: "Out for Delivery",
    paymentStatus: "Paid",
    orderType: "Food Delivery",
    createdAt: "Sep 19, 2026 • 10:15 AM",

    customer: {
      name: "John Adewale",
      phone: "+234 801 234 5678",
      email: "john.adewale@example.com",
    },

    restaurant: {
      name: "Chicken Republic",
      address: "12 Allen Avenue, Ikeja, Lagos",
      phone: "+234 802 111 2233",
    },

    rider: {
      name: "Michael Adeyemi",
      phone: "+234 803 456 7890",
      vehicle: "Honda CB125",
      plate: "LND-482-KJ",
    },

    pickupAddress: "Chicken Republic, 12 Allen Avenue, Ikeja, Lagos",

    deliveryAddress:
      "24 Admiralty Way, Lekki Phase 1, Lagos",

    items: [
      {
        name: "Chicken & Chips",
        quantity: 2,
        price: 8500,
      },
      {
        name: "Jollof Rice & Chicken",
        quantity: 1,
        price: 6500,
      },
      {
        name: "Soft Drink",
        quantity: 2,
        price: 1500,
      },
    ],

    subtotal: 26500,
    deliveryFee: 2500,
    serviceFee: 750,
    discount: 0,
    total: 29750,
    commission: 3975,

    estimatedDelivery: "11:05 AM",
  },

  {
    id: "ORD-10002",
    status: "Preparing",
    paymentStatus: "Paid",
    orderType: "Food Delivery",
    createdAt: "Sep 19, 2026 • 10:42 AM",

    customer: {
      name: "Sarah Johnson",
      phone: "+234 805 555 1234",
      email: "sarah.johnson@example.com",
    },

    restaurant: {
      name: "The Place",
      address: "22 Isaac John Street, Ikeja, Lagos",
      phone: "+234 803 222 3344",
    },

    rider: null,

    pickupAddress: "The Place, 22 Isaac John Street, Ikeja, Lagos",

    deliveryAddress:
      "15 Gbagada Expressway, Gbagada, Lagos",

    items: [
      {
        name: "Grilled Chicken",
        quantity: 1,
        price: 12000,
      },
      {
        name: "Fried Rice",
        quantity: 2,
        price: 4500,
      },
    ],

    subtotal: 21000,
    deliveryFee: 1800,
    serviceFee: 600,
    discount: 1000,
    total: 22400,
    commission: 3150,

    estimatedDelivery: "11:40 AM",
  },

  {
    id: "ORD-10003",
    status: "Delivered",
    paymentStatus: "Paid",
    orderType: "Food Delivery",
    createdAt: "Sep 18, 2026 • 6:20 PM",

    customer: {
      name: "David Okafor",
      phone: "+234 809 444 5566",
      email: "david.okafor@example.com",
    },

    restaurant: {
      name: "Kilimanjaro",
      address: "45 Admiralty Way, Lekki, Lagos",
      phone: "+234 804 333 4455",
    },

    rider: {
      name: "Daniel Okafor",
      phone: "+234 806 777 8899",
      vehicle: "TVS Raider",
      plate: "KJA-721-LG",
    },

    pickupAddress:
      "Kilimanjaro, 45 Admiralty Way, Lekki, Lagos",

    deliveryAddress:
      "8 Freedom Way, Lekki Phase 1, Lagos",

    items: [
      {
        name: "Peppered Chicken",
        quantity: 2,
        price: 7500,
      },
      {
        name: "Jollof Rice",
        quantity: 2,
        price: 4500,
      },
    ],

    subtotal: 24000,
    deliveryFee: 2200,
    serviceFee: 700,
    discount: 0,
    total: 26900,
    commission: 3600,

    estimatedDelivery: "7:15 PM",
  },

  {
    id: "ORD-10004",
    status: "Pending",
    paymentStatus: "Pending",
    orderType: "Send Package",
    createdAt: "Sep 19, 2026 • 11:05 AM",

    customer: {
      name: "Blessing Williams",
      phone: "+234 810 123 4567",
      email: "blessing@example.com",
    },

    restaurant: {
      name: "Package Delivery",
      address: "Ikeja Pickup Hub, Lagos",
      phone: "+234 801 555 6789",
    },

    rider: null,

    pickupAddress:
      "10 Obafemi Awolowo Way, Ikeja, Lagos",

    deliveryAddress:
      "32 Bode Thomas Street, Surulere, Lagos",

    items: [
      {
        name: "Small Package",
        quantity: 1,
        price: 5000,
      },
    ],

    subtotal: 5000,
    deliveryFee: 2500,
    serviceFee: 250,
    discount: 0,
    total: 7750,
    commission: 750,

    estimatedDelivery: "12:30 PM",
  },

  {
    id: "ORD-10005",
    status: "Confirmed",
    paymentStatus: "Paid",
    orderType: "Food Delivery",
    createdAt: "Sep 19, 2026 • 11:25 AM",

    customer: {
      name: "Michael Brown",
      phone: "+234 811 222 3334",
      email: "michael@example.com",
    },

    restaurant: {
      name: "Domino's Pizza",
      address: "14 Adeola Odeku Street, Victoria Island, Lagos",
      phone: "+234 802 444 5555",
    },

    rider: null,

    pickupAddress:
      "Domino's Pizza, 14 Adeola Odeku Street, Victoria Island",

    deliveryAddress:
      "20 Ozumba Mbadiwe Avenue, Victoria Island, Lagos",

    items: [
      {
        name: "Chicken Suya Pizza",
        quantity: 1,
        price: 18000,
      },
      {
        name: "Chicken Wings",
        quantity: 1,
        price: 7000,
      },
    ],

    subtotal: 25000,
    deliveryFee: 2000,
    serviceFee: 750,
    discount: 2000,
    total: 25750,
    commission: 3750,

    estimatedDelivery: "12:15 PM",
  },

  {
    id: "ORD-10006",
    status: "Ready for Pickup",
    paymentStatus: "Paid",
    orderType: "Food Delivery",
    createdAt: "Sep 19, 2026 • 11:40 AM",

    customer: {
      name: "Aisha Ibrahim",
      phone: "+234 812 333 4445",
      email: "aisha@example.com",
    },

    restaurant: {
      name: "Tastee Fried Chicken",
      address: "30 Allen Avenue, Ikeja, Lagos",
      phone: "+234 803 555 6666",
    },

    rider: {
      name: "Blessing Johnson",
      phone: "+234 813 444 5556",
      vehicle: "NIU NQi",
      plate: "E-SCOOT-091",
    },

    pickupAddress:
      "Tastee Fried Chicken, 30 Allen Avenue, Ikeja",

    deliveryAddress:
      "7 Acme Road, Ogba, Lagos",

    items: [
      {
        name: "Fried Chicken",
        quantity: 2,
        price: 6000,
      },
      {
        name: "French Fries",
        quantity: 1,
        price: 3500,
      },
    ],

    subtotal: 15500,
    deliveryFee: 1800,
    serviceFee: 450,
    discount: 0,
    total: 17750,
    commission: 2325,

    estimatedDelivery: "12:25 PM",
  },
];

const statusOrder: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Ready for Pickup",
  "Out for Delivery",
  "Delivered",
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

function getStatusClasses(status: OrderStatus) {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Confirmed":
      return "bg-blue-100 text-blue-700";

    case "Preparing":
      return "bg-orange-100 text-orange-700";

    case "Ready for Pickup":
      return "bg-purple-100 text-purple-700";

    case "Out for Delivery":
      return "bg-indigo-100 text-indigo-700";

    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getPaymentClasses(status: PaymentStatus) {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Failed":
      return "bg-red-100 text-red-700";

    case "Refunded":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
        {icon}
        {label}
      </div>

      <div className="mt-2 text-sm font-semibold text-gray-900">
        {children}
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
        {icon}
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-950">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
}

export default function OrderDetailsPage() {
  const params = useParams();

  const orderId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const originalOrder = useMemo(
    () => demoOrders.find((order) => order.id === orderId),
    [orderId]
  );

  const [order, setOrder] = useState<Order | null>(
    originalOrder ?? null
  );

  const [actionMessage, setActionMessage] = useState("");

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            <FiArrowLeft />
            Back to Orders
          </Link>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiXCircle className="text-3xl" />
            </div>

            <h1 className="mt-5 text-2xl font-black text-gray-950">
              Order Not Found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              The order you are looking for does not exist or may have
              been removed.
            </p>

            <Link
              href="/admin/orders"
              className="mt-7 inline-flex rounded-xl bg-gray-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentStatusIndex = statusOrder.indexOf(order.status);

  const updateStatus = (newStatus: OrderStatus) => {
    setOrder((current) =>
      current
        ? {
            ...current,
            status: newStatus,
          }
        : current
    );

    setActionMessage(`Order ${order.id} is now ${newStatus}.`);

    setTimeout(() => {
      setActionMessage("");
    }, 3000);
  };

  const handleRefresh = () => {
    const refreshedOrder = demoOrders.find(
      (item) => item.id === order.id
    );

    if (refreshedOrder) {
      setOrder(refreshedOrder);
      setActionMessage("Order information refreshed.");

      setTimeout(() => {
        setActionMessage("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* BACK + TOP ACTIONS */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <Link
            href="/admin/orders"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            <FiArrowLeft />
            Back to Orders
          </Link>

          <button
            onClick={handleRefresh}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
          >
            <FiRefreshCw />
            Refresh Order
          </button>
        </div>

        {/* SUCCESS / ACTION MESSAGE */}
        {actionMessage && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            <FiCheckCircle />
            {actionMessage}
          </div>
        )}

        {/* HEADER */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black text-gray-950 sm:text-3xl">
                  {order.id}
                </h1>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClasses(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${getPaymentClasses(
                    order.paymentStatus
                  )}`}
                >
                  Payment: {order.paymentStatus}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Placed on {order.createdAt}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {order.status !== "Delivered" &&
                order.status !== "Cancelled" && (
                  <>
                    {order.status === "Pending" && (
                      <button
                        onClick={() => updateStatus("Confirmed")}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                      >
                        <FiCheckCircle />
                        Confirm Order
                      </button>
                    )}

                    {order.status === "Confirmed" && (
                      <button
                        onClick={() => updateStatus("Preparing")}
                        className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-700"
                      >
                        <FiPackage />
                        Start Preparing
                      </button>
                    )}

                    {order.status === "Preparing" && (
                      <button
                        onClick={() =>
                          updateStatus("Ready for Pickup")
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-purple-700"
                      >
                        <FiCheckCircle />
                        Ready for Pickup
                      </button>
                    )}

                    {order.status === "Ready for Pickup" && (
                      <button
                        onClick={() =>
                          updateStatus("Out for Delivery")
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                      >
                        <FiTruck />
                        Start Delivery
                      </button>
                    )}

                    {order.status === "Out for Delivery" && (
                      <button
                        onClick={() => updateStatus("Delivered")}
                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
                      >
                        <FiCheckCircle />
                        Mark Delivered
                      </button>
                    )}

                    <button
                      onClick={() => updateStatus("Cancelled")}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      <FiXCircle />
                      Cancel
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<FiDollarSign />}
            label="Order Total"
            value={formatCurrency(order.total)}
          />

          <SummaryCard
            icon={<FiShoppingBag />}
            label="Order Type"
            value={order.orderType}
          />

          <SummaryCard
            icon={<FiClock />}
            label="Estimated Delivery"
            value={order.estimatedDelivery}
          />

          <SummaryCard
            icon={<FiDollarSign />}
            label="Platform Commission"
            value={formatCurrency(order.commission)}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* LEFT / MAIN */}
          <div className="space-y-6 lg:col-span-2">
            {/* CUSTOMER */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<FiUser />}
                title="Customer Information"
                description="Customer who placed this order."
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <InfoItem icon={<FiUser />} label="Name">
                  {order.customer.name}
                </InfoItem>

                <InfoItem icon={<FiPhone />} label="Phone">
                  <a
                    href={`tel:${order.customer.phone}`}
                    className="transition hover:text-orange-600"
                  >
                    {order.customer.phone}
                  </a>
                </InfoItem>

                <InfoItem icon={<FiUser />} label="Email">
                  {order.customer.email}
                </InfoItem>

                <InfoItem icon={<FiShoppingBag />} label="Order Type">
                  {order.orderType}
                </InfoItem>
              </div>
            </section>

            {/* RESTAURANT */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<FiShoppingBag />}
                title="Restaurant / Pickup Partner"
                description="Business responsible for preparing the order."
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <InfoItem icon={<FiShoppingBag />} label="Business">
                  {order.restaurant.name}
                </InfoItem>

                <InfoItem icon={<FiPhone />} label="Phone">
                  <a
                    href={`tel:${order.restaurant.phone}`}
                    className="transition hover:text-orange-600"
                  >
                    {order.restaurant.phone}
                  </a>
                </InfoItem>

                <div className="sm:col-span-2">
                  <InfoItem icon={<FiMapPin />} label="Address">
                    {order.restaurant.address}
                  </InfoItem>
                </div>
              </div>
            </section>

            {/* RIDER */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<FiTruck />}
                title="Rider Information"
                description="Rider assigned to this delivery."
              />

              {order.rider ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  <InfoItem icon={<FiUser />} label="Rider">
                    {order.rider.name}
                  </InfoItem>

                  <InfoItem icon={<FiPhone />} label="Phone">
                    <a
                      href={`tel:${order.rider.phone}`}
                      className="transition hover:text-orange-600"
                    >
                      {order.rider.phone}
                    </a>
                  </InfoItem>

                  <InfoItem icon={<FiTruck />} label="Vehicle">
                    {order.rider.vehicle}
                  </InfoItem>

                  <InfoItem icon={<FiTruck />} label="Plate Number">
                    {order.rider.plate}
                  </InfoItem>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-orange-200 bg-orange-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-orange-600">
                      <FiTruck />
                    </div>

                    <div>
                      <p className="font-bold text-gray-900">
                        No rider assigned
                      </p>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        This order is currently waiting for a rider
                        assignment.
                      </p>

                      <button
                        onClick={() =>
                          setActionMessage(
                            "Rider assignment will be connected to the dispatch system later."
                          )
                        }
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700"
                      >
                        <FiTruck />
                        Assign Rider
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* DELIVERY LOCATIONS */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<FiMapPin />}
                title="Delivery Information"
                description="Pickup and destination locations."
              />

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <FiMapPin />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Pickup Location
                    </p>

                    <p className="mt-1 text-sm font-semibold leading-6 text-gray-900">
                      {order.pickupAddress}
                    </p>
                  </div>
                </div>

                <div className="ml-5 h-8 border-l-2 border-dashed border-gray-200" />

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FiMapPin />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Delivery Location
                    </p>

                    <p className="mt-1 text-sm font-semibold leading-6 text-gray-900">
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* MAP PLACEHOLDER */}
              <div className="mt-6 flex h-52 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                <div className="text-center">
                  <FiMapPin className="mx-auto text-3xl text-orange-500" />

                  <p className="mt-3 font-bold text-gray-700">
                    Delivery Map
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Live map integration will be connected later.
                  </p>
                </div>
              </div>
            </section>

            {/* ITEMS */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<FiPackage />}
                title="Order Items"
                description="Items included in this order."
              />

              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                      <th className="pb-4">Item</th>
                      <th className="pb-4 text-center">Qty</th>
                      <th className="pb-4 text-right">Unit Price</th>
                      <th className="pb-4 text-right">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.items.map((item) => (
                      <tr
                        key={`${item.name}-${item.quantity}`}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="py-4">
                          <p className="font-semibold text-gray-900">
                            {item.name}
                          </p>
                        </td>

                        <td className="py-4 text-center text-sm font-semibold text-gray-600">
                          {item.quantity}
                        </td>

                        <td className="py-4 text-right text-sm text-gray-600">
                          {formatCurrency(item.price)}
                        </td>

                        <td className="py-4 text-right text-sm font-bold text-gray-900">
                          {formatCurrency(
                            item.price * item.quantity
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ORDER TIMELINE */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<FiClock />}
                title="Order Timeline"
                description="Current progress of this order."
              />

              <div className="space-y-0">
                {statusOrder.map((status, index) => {
                  const completed =
                    index <= currentStatusIndex;

                  const current =
                    index === currentStatusIndex;

                  return (
                    <div
                      key={status}
                      className="relative flex gap-4"
                    >
                      {index < statusOrder.length - 1 && (
                        <div
                          className={`absolute left-4 top-9 h-12 w-0.5 ${
                            index < currentStatusIndex
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {completed ? (
                          <FiCheckCircle />
                        ) : (
                          <FiClock />
                        )}
                      </div>

                      <div className="pb-8">
                        <p
                          className={`text-sm font-bold ${
                            current
                              ? "text-orange-600"
                              : completed
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {status}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {current
                            ? "Current order status"
                            : completed
                            ? "Completed"
                            : "Waiting"}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {order.status === "Cancelled" && (
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                      <FiXCircle />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-red-600">
                        Order Cancelled
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        This order has been cancelled.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* PAYMENT */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<FiDollarSign />}
                title="Payment Summary"
              />

              <div className="space-y-4">
                <PriceRow
                  label="Subtotal"
                  value={formatCurrency(order.subtotal)}
                />

                <PriceRow
                  label="Delivery Fee"
                  value={formatCurrency(order.deliveryFee)}
                />

                <PriceRow
                  label="Service Fee"
                  value={formatCurrency(order.serviceFee)}
                />

                <PriceRow
                  label="Discount"
                  value={`-${formatCurrency(order.discount)}`}
                />

                <div className="border-t border-gray-100 pt-4">
                  <PriceRow
                    label="Total"
                    value={formatCurrency(order.total)}
                    bold
                  />
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Payment Status
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getPaymentClasses(
                      order.paymentStatus
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </section>

            {/* PLATFORM REVENUE */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<FiDollarSign />}
                title="Platform Revenue"
                description="Door-Step earnings from this order."
              />

              <div className="rounded-xl bg-green-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-green-700">
                  Commission
                </p>

                <p className="mt-2 text-2xl font-black text-green-700">
                  {formatCurrency(order.commission)}
                </p>

                <p className="mt-2 text-xs leading-5 text-green-700/70">
                  Platform commission generated from this order.
                </p>
              </div>
            </section>

            {/* QUICK ACTIONS */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<FiEdit3 />}
                title="Quick Actions"
              />

              <div className="space-y-3">
                <button
                  onClick={() =>
                    setActionMessage(
                      "Refund action will be connected to the payment gateway later."
                    )
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                >
                  <FiRefreshCw />
                  Refund Order
                </button>

                <button
                  onClick={() =>
                    setActionMessage(
                      "Rider reassignment will be connected to the dispatch system later."
                    )
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                >
                  <FiTruck />
                  Reassign Rider
                </button>

                <button
                  onClick={() =>
                    setActionMessage(
                      "Customer communication will be connected later."
                    )
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                >
                  <FiPhone />
                  Contact Customer
                </button>
              </div>
            </section>

            {/* ORDER ID */}
            <section className="rounded-2xl bg-gray-950 p-6 text-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <FiPackage className="text-orange-400" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Order Reference
                  </p>

                  <p className="mt-1 font-black">{order.id}</p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-xs leading-5 text-gray-400">
                  This order is currently using demo data. The backend,
                  real-time dispatch, payment gateway and live tracking
                  will be connected later.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
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
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            {label}
          </p>

          <p className="mt-2 text-lg font-black text-gray-950">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

function PriceRow({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={
          bold
            ? "text-sm font-black text-gray-950"
            : "text-sm text-gray-500"
        }
      >
        {label}
      </span>

      <span
        className={
          bold
            ? "text-lg font-black text-gray-950"
            : "text-sm font-semibold text-gray-900"
        }
      >
        {value}
      </span>
    </div>
  );
}
