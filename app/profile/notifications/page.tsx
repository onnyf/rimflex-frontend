"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiBell,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiGift,
  FiPackage,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

type NotificationType =
  | "order"
  | "delivery"
  | "payment"
  | "promotion"
  | "system";

type DoorStepNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  createdAt: string;
  read: boolean;
  orderNumber?: string;
  href?: string;
};

const NOTIFICATIONS_KEY = "doorstep_notifications";

const demoNotifications: DoorStepNotification[] = [
  {
    id: "notification-1",
    type: "order",
    title: "Order confirmed",
    message:
      "Your order #DS-10245 has been confirmed by Chicken Republic.",
    time: "5 min ago",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    orderNumber: "DS-10245",
    href: "/order-tracking?id=DS-10245",
  },
  {
    id: "notification-2",
    type: "delivery",
    title: "Rider assigned",
    message:
      "A Door-Step rider has been assigned to your order and is heading to the restaurant.",
    time: "12 min ago",
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    read: false,
    orderNumber: "DS-10245",
    href: "/order-tracking?id=DS-10245",
  },
  {
    id: "notification-3",
    type: "delivery",
    title: "Order picked up",
    message:
      "Your rider has picked up your order. Your food is on the way.",
    time: "25 min ago",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    read: true,
    orderNumber: "DS-10240",
    href: "/order-tracking?id=DS-10240",
  },
  {
    id: "notification-4",
    type: "payment",
    title: "Payment successful",
    message:
      "Your payment of ₦12,500 for order #DS-10240 was successful.",
    time: "35 min ago",
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    read: true,
    orderNumber: "DS-10240",
    href: "/profile/orders",
  },
  {
    id: "notification-5",
    type: "promotion",
    title: "Special offer for you",
    message:
      "Enjoy discounted delivery fees on selected restaurants today.",
    time: "1 hour ago",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read: false,
    href: "/restaurants",
  },
  {
    id: "notification-6",
    type: "system",
    title: "Welcome to Door-Step",
    message:
      "Your Door-Step account is ready. Start discovering restaurants around you.",
    time: "Yesterday",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    href: "/restaurants",
  },
];

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "order":
      return <FiShoppingBag />;

    case "delivery":
      return <FiTruck />;

    case "payment":
      return <FiCreditCard />;

    case "promotion":
      return <FiGift />;

    default:
      return <FiBell />;
  }
}

function getNotificationIconStyle(type: NotificationType) {
  switch (type) {
    case "order":
      return "bg-orange-100 text-[#FF6B35]";

    case "delivery":
      return "bg-blue-100 text-blue-600";

    case "payment":
      return "bg-green-100 text-green-600";

    case "promotion":
      return "bg-purple-100 text-purple-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function formatNotificationTime(createdAt: string) {
  const created = new Date(createdAt).getTime();
  const now = Date.now();

  const difference = Math.max(0, now - created);

  const minutes = Math.floor(difference / (1000 * 60));

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "Yesterday";
  }

  return `${days} days ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<
    DoorStepNotification[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "unread"
  >("all");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_KEY);

      if (saved) {
        const parsed: DoorStepNotification[] = JSON.parse(saved);

        setNotifications(parsed);
      } else {
        localStorage.setItem(
          NOTIFICATIONS_KEY,
          JSON.stringify(demoNotifications)
        );

        setNotifications(demoNotifications);
      }
    } catch (error) {
      console.error("Failed to load notifications:", error);

      setNotifications(demoNotifications);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  const visibleNotifications = useMemo(() => {
    if (activeFilter === "unread") {
      return notifications.filter(
        (notification) => !notification.read
      );
    }

    return notifications;
  }, [notifications, activeFilter]);

  const saveNotifications = (
    updatedNotifications: DoorStepNotification[]
  ) => {
    setNotifications(updatedNotifications);

    try {
      localStorage.setItem(
        NOTIFICATIONS_KEY,
        JSON.stringify(updatedNotifications)
      );
    } catch (error) {
      console.error("Failed to save notifications:", error);
    }
  };

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(
      (notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification
    );

    saveNotifications(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(
      (notification) => ({
        ...notification,
        read: true,
      })
    );

    saveNotifications(updatedNotifications);
  };

  const deleteNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== notificationId
    );

    saveNotifications(updatedNotifications);
  };

  const clearAllNotifications = () => {
    saveNotifications([]);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      {/* HEADER */}
      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to Profile
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#FF6B35]">
                  <FiBell className="text-xl" />

                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
                    Door-Step
                  </p>

                  <h1 className="text-3xl font-black text-gray-950 sm:text-4xl">
                    Notifications
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-gray-600">
                Stay updated about your orders, deliveries, payments and
                Door-Step offers.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
              >
                <FiCheckCircle />
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* FILTERS */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex rounded-full bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                activeFilter === "all"
                  ? "bg-gray-950 text-white"
                  : "text-gray-500 hover:text-gray-950"
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("unread")}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                activeFilter === "unread"
                  ? "bg-[#FF6B35] text-white"
                  : "text-gray-500 hover:text-gray-950"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-2">
                  ({unreadCount})
                </span>
              )}
            </button>
          </div>

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearAllNotifications}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-red-500"
            >
              <FiTrash2 />
              Clear all
            </button>
          )}
        </div>

        {/* LOADING */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse gap-4 rounded-3xl border border-gray-200 bg-white p-5"
              >
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-gray-200" />

                <div className="flex-1 space-y-3">
                  <div className="h-4 w-1/3 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-3 w-1/4 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : visibleNotifications.length === 0 ? (
          /* EMPTY STATE */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-orange-100 bg-white px-6 py-16 text-center shadow-sm"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-[#FF6B35]">
              {activeFilter === "unread" ? (
                <FiCheck className="text-3xl" />
              ) : (
                <FiBell className="text-3xl" />
              )}
            </div>

            <h2 className="mt-6 text-2xl font-black text-gray-950">
              {activeFilter === "unread"
                ? "You're all caught up"
                : "No notifications yet"}
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
              {activeFilter === "unread"
                ? "You have read all your Door-Step notifications."
                : "Your order, payment and delivery updates will appear here."}
            </p>

            <Link
              href="/restaurants"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 font-bold text-white transition hover:bg-orange-600"
            >
              <FiShoppingBag />
              Explore Restaurants
            </Link>
          </motion.div>
        ) : (
          /* NOTIFICATION LIST */
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            }}
          >
            {visibleNotifications.map((notification) => (
              <motion.article
                key={notification.id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 15,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                className={`group relative overflow-hidden rounded-3xl border bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6 ${
                  notification.read
                    ? "border-gray-200"
                    : "border-orange-200 bg-orange-50/40"
                }`}
              >
                {!notification.read && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-[#FF6B35]" />
                )}

                <div className="flex gap-4">
                  {/* ICON */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg ${getNotificationIconStyle(
                      notification.type
                    )}`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-black text-gray-950">
                            {notification.title}
                          </h2>

                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-[#FF6B35]" />
                          )}
                        </div>

                        <p className="mt-2 leading-6 text-gray-600">
                          {notification.message}
                        </p>
                      </div>

                      <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-gray-400">
                        <FiClock />
                        {formatNotificationTime(
                          notification.createdAt
                        )}
                      </span>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {notification.href && (
                        <Link
                          href={notification.href}
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-[#FF6B35]"
                        >
                          {notification.orderNumber
                            ? "Track Order"
                            : notification.type === "promotion"
                            ? "View Offer"
                            : "View"}
                        </Link>
                      )}

                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                        >
                          <FiCheck />
                          Mark as read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          deleteNotification(notification.id)
                        }
                        aria-label={`Delete ${notification.title}`}
                        className="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* FUTURE BACKEND NOTE */}
        <div className="mt-8 rounded-2xl border border-dashed border-orange-200 bg-white/60 p-5">
          <div className="flex gap-3">
            <FiPackage className="mt-0.5 shrink-0 text-[#FF6B35]" />

            <div>
              <p className="text-sm font-bold text-gray-900">
                Door-Step notification system
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                These notifications are currently stored locally for the
                frontend. When we build the backend, they can be replaced
                with real-time order, rider, payment and promotion updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
