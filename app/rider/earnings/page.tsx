
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUp,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiDownload,
  FiLogOut,
  FiPackage,
  FiPlus,
  FiRefreshCw,
  FiTruck,
  FiTrendingUp,
} from "react-icons/fi";

import RiderAuthGuard from "../RiderAuthGuard";

type TransactionType =
  | "Delivery"
  | "Bonus"
  | "Tip"
  | "Withdrawal"
  | "Adjustment";

type TransactionStatus =
  | "Completed"
  | "Pending"
  | "Failed";

type Transaction = {
  id: string;
  type: TransactionType;
  description: string;
  reference: string;
  amount: number;
  status: TransactionStatus;
  daysAgo: number;
  dateLabel: string;
  time: string;
};

type Period = "Today" | "This Week" | "This Month";

const initialTransactions: Transaction[] = [
  {
    id: "TRX-10001",
    type: "Delivery",
    description: "Delivery - ORD-10003",
    reference: "EARN-10003",
    amount: 1800,
    status: "Completed",
    daysAgo: 0,
    dateLabel: "Today",
    time: "9:32 AM",
  },
  {
    id: "TRX-10002",
    type: "Tip",
    description: "Customer Tip",
    reference: "TIP-10002",
    amount: 500,
    status: "Completed",
    daysAgo: 0,
    dateLabel: "Today",
    time: "9:35 AM",
  },
  {
    id: "TRX-10003",
    type: "Delivery",
    description: "Delivery - ORD-10004",
    reference: "EARN-10004",
    amount: 1400,
    status: "Completed",
    daysAgo: 0,
    dateLabel: "Today",
    time: "8:26 AM",
  },
  {
    id: "TRX-10004",
    type: "Bonus",
    description: "Weekend Delivery Bonus",
    reference: "BONUS-10001",
    amount: 2500,
    status: "Completed",
    daysAgo: 1,
    dateLabel: "Yesterday",
    time: "8:00 PM",
  },
  {
    id: "TRX-10005",
    type: "Delivery",
    description: "Delivery - ORD-09991",
    reference: "EARN-09991",
    amount: 1600,
    status: "Completed",
    daysAgo: 1,
    dateLabel: "Yesterday",
    time: "5:42 PM",
  },
  {
    id: "TRX-10006",
    type: "Delivery",
    description: "Delivery - ORD-09982",
    reference: "EARN-09982",
    amount: 1500,
    status: "Completed",
    daysAgo: 1,
    dateLabel: "Yesterday",
    time: "2:15 PM",
  },
  {
    id: "TRX-10007",
    type: "Withdrawal",
    description: "Withdrawal to Bank",
    reference: "WD-10001",
    amount: -5000,
    status: "Completed",
    daysAgo: 2,
    dateLabel: "Sep 17",
    time: "4:20 PM",
  },
  {
    id: "TRX-10008",
    type: "Delivery",
    description: "Delivery - ORD-09941",
    reference: "EARN-09941",
    amount: 1700,
    status: "Completed",
    daysAgo: 2,
    dateLabel: "Sep 17",
    time: "1:05 PM",
  },
  {
    id: "TRX-10009",
    type: "Tip",
    description: "Customer Tip",
    reference: "TIP-09990",
    amount: 300,
    status: "Completed",
    daysAgo: 3,
    dateLabel: "Sep 16",
    time: "6:10 PM",
  },
  {
    id: "TRX-10010",
    type: "Delivery",
    description: "Delivery Payment",
    reference: "EARN-09980",
    amount: 1550,
    status: "Pending",
    daysAgo: 3,
    dateLabel: "Sep 16",
    time: "5:45 PM",
  },
];

const weeklyData = [
  {
    day: "Mon",
    amount: 4200,
  },
  {
    day: "Tue",
    amount: 6800,
  },
  {
    day: "Wed",
    amount: 5300,
  },
  {
    day: "Thu",
    amount: 7600,
  },
  {
    day: "Fri",
    amount: 9100,
  },
  {
    day: "Sat",
    amount: 12400,
  },
  {
    day: "Sun",
    amount: 8200,
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

function getTransactionIcon(type: TransactionType) {
  switch (type) {
    case "Delivery":
      return <FiTruck />;

    case "Bonus":
      return <FiPlus />;

    case "Tip":
      return <FiDollarSign />;

    case "Withdrawal":
      return <FiArrowDown />;

    case "Adjustment":
      return <FiRefreshCw />;

    default:
      return <FiDollarSign />;
  }
}

function getTransactionIconStyle(type: TransactionType) {
  switch (type) {
    case "Delivery":
      return "bg-orange-100 text-[#FF6B35]";

    case "Bonus":
      return "bg-emerald-100 text-emerald-700";

    case "Tip":
      return "bg-blue-100 text-blue-700";

    case "Withdrawal":
      return "bg-red-100 text-red-600";

    case "Adjustment":
      return "bg-purple-100 text-purple-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getStatusStyle(status: TransactionStatus) {
  switch (status) {
    case "Completed":
      return "bg-emerald-100 text-emerald-700";

    case "Pending":
      return "bg-amber-100 text-amber-700";

    case "Failed":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-black text-gray-950">
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl text-[#FF6B35]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function EarningsContent() {
  const router = useRouter();

  const [period, setPeriod] =
    useState<Period>("This Week");

  const [transactionList, setTransactionList] =
    useState<Transaction[]>(initialTransactions);

  const [withdrawAmount, setWithdrawAmount] =
    useState("");

  const [withdrawMessage, setWithdrawMessage] =
    useState("");

  const [refreshMessage, setRefreshMessage] =
    useState("");

  const [isWithdrawing, setIsWithdrawing] =
    useState(false);

  const getPeriodDays = (selectedPeriod: Period) => {
    if (selectedPeriod === "Today") {
      return 0;
    }

    if (selectedPeriod === "This Week") {
      return 6;
    }

    return 30;
  };

  const filteredTransactions = useMemo(() => {
    const maxDays = getPeriodDays(period);

    return transactionList.filter(
      (transaction) =>
        transaction.daysAgo <= maxDays
    );
  }, [period, transactionList]);

  const completedTransactions = useMemo(() => {
    return transactionList.filter(
      (transaction) =>
        transaction.status === "Completed"
    );
  }, [transactionList]);

  const filteredCompletedTransactions = useMemo(() => {
    return filteredTransactions.filter(
      (transaction) =>
        transaction.status === "Completed"
    );
  }, [filteredTransactions]);

  const deliveryEarnings = useMemo(() => {
    return filteredCompletedTransactions
      .filter(
        (transaction) =>
          transaction.type === "Delivery"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [filteredCompletedTransactions]);

  const bonuses = useMemo(() => {
    return filteredCompletedTransactions
      .filter(
        (transaction) =>
          transaction.type === "Bonus"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [filteredCompletedTransactions]);

  const tips = useMemo(() => {
    return filteredCompletedTransactions
      .filter(
        (transaction) =>
          transaction.type === "Tip"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [filteredCompletedTransactions]);

  const periodEarnings =
    deliveryEarnings + bonuses + tips;

  const periodWithdrawals = useMemo(() => {
    return filteredCompletedTransactions
      .filter(
        (transaction) =>
          transaction.type === "Withdrawal"
      )
      .reduce(
        (total, transaction) =>
          total + Math.abs(transaction.amount),
        0
      );
  }, [filteredCompletedTransactions]);

  const totalDeliveryEarnings = useMemo(() => {
    return completedTransactions
      .filter(
        (transaction) =>
          transaction.type === "Delivery"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [completedTransactions]);

  const totalBonuses = useMemo(() => {
    return completedTransactions
      .filter(
        (transaction) =>
          transaction.type === "Bonus"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [completedTransactions]);

  const totalTips = useMemo(() => {
    return completedTransactions
      .filter(
        (transaction) =>
          transaction.type === "Tip"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [completedTransactions]);

  const totalWithdrawals = useMemo(() => {
    return completedTransactions
      .filter(
        (transaction) =>
          transaction.type === "Withdrawal"
      )
      .reduce(
        (total, transaction) =>
          total + Math.abs(transaction.amount),
        0
      );
  }, [completedTransactions]);

  const totalEarned =
    totalDeliveryEarnings +
    totalBonuses +
    totalTips;

  const availableBalance =
    totalEarned - totalWithdrawals;

  const periodDeliveryCount =
    filteredCompletedTransactions.filter(
      (transaction) =>
        transaction.type === "Delivery"
    ).length;

  const periodBonusTotal = bonuses;

  const periodTipTotal = tips;

  const weeklyPerformanceTotal =
    weeklyData.reduce(
      (total, item) => total + item.amount,
      0
    );

  const weeklyMaximum = Math.max(
    ...weeklyData.map((item) => item.amount)
  );

  const deliveryPercentage =
    periodEarnings > 0
      ? Math.round(
          (deliveryEarnings / periodEarnings) *
            100
        )
      : 0;

  const bonusPercentage =
    periodEarnings > 0
      ? Math.round(
          (bonuses / periodEarnings) * 100
        )
      : 0;

  const tipPercentage =
    periodEarnings > 0
      ? Math.round(
          (tips / periodEarnings) * 100
        )
      : 0;

  const handleWithdraw = () => {
    setWithdrawMessage("");

    const amount = Number(withdrawAmount);

    if (!withdrawAmount.trim()) {
      setWithdrawMessage(
        "Please enter the amount you want to withdraw."
      );
      return;
    }

    if (!Number.isFinite(amount)) {
      setWithdrawMessage(
        "Please enter a valid withdrawal amount."
      );
      return;
    }

    if (amount < 1000) {
      setWithdrawMessage(
        "Minimum withdrawal amount is ₦1,000."
      );
      return;
    }

    if (amount > availableBalance) {
      setWithdrawMessage(
        `Insufficient balance. Your available balance is ${formatCurrency(
          availableBalance
        )}.`
      );
      return;
    }

    setIsWithdrawing(true);

    setTimeout(() => {
      const newTransaction: Transaction = {
        id: `TRX-${Date.now()}`,
        type: "Withdrawal",
        description: "Withdrawal to Bank",
        reference: `WD-${Date.now()
          .toString()
          .slice(-6)}`,
        amount: -amount,
        status: "Completed",
        daysAgo: 0,
        dateLabel: "Today",
        time: new Date().toLocaleTimeString(
          "en-NG",
          {
            hour: "numeric",
            minute: "2-digit",
          }
        ),
      };

      setTransactionList((current) => [
        newTransaction,
        ...current,
      ]);

      setWithdrawAmount("");

      setWithdrawMessage(
        `${formatCurrency(
          amount
        )} withdrawal submitted successfully.`
      );

      setIsWithdrawing(false);
    }, 700);
  };

  const handleRefresh = () => {
    setRefreshMessage(
      "Earnings refreshed successfully."
    );

    setTimeout(() => {
      setRefreshMessage("");
    }, 2500);
  };

  const handleExport = () => {
    setRefreshMessage(
      "Earnings report export is available when the backend is connected."
    );

    setTimeout(() => {
      setRefreshMessage("");
    }, 3500);
  };

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
      "/rider/login?redirect=/rider/earnings"
    );
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/rider/dashboard"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
              aria-label="Back to dashboard"
            >
              <FiArrowLeft />
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                Rider Portal
              </p>

              <h1 className="mt-1 text-2xl font-black text-gray-950">
                Earnings
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* TOP ACTIONS */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-950">
              Your Earnings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track your delivery income, bonuses and
              withdrawals.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
            >
              <FiRefreshCw />
              Refresh Earnings
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#FF6B35]"
            >
              <FiDownload />
              Export Report
            </button>
          </div>
        </div>

        {/* MESSAGE */}
        {(refreshMessage || withdrawMessage) && (
          <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 text-sm font-medium text-orange-800">
            {withdrawMessage || refreshMessage}
          </div>
        )}

        {/* PERIOD SELECTOR */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(
            [
              "Today",
              "This Week",
              "This Month",
            ] as Period[]
          ).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                period === item
                  ? "bg-gray-950 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* MAIN EARNINGS CARD */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-gray-950 shadow-xl">
          <div className="grid gap-8 p-7 md:p-9 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B35] text-2xl text-white">
                  <FiDollarSign />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400">
                    {period} Earnings
                  </p>

                  <p className="text-xs text-gray-500">
                    Completed earnings only
                  </p>
                </div>
              </div>

              <p className="mt-7 text-4xl font-black text-white sm:text-5xl">
                {formatCurrency(periodEarnings)}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                  <FiTrendingUp />
                  Earnings tracked
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-400">
                  <FiPackage />
                  {periodDeliveryCount} deliveries
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold text-gray-500">
                  Deliveries
                </p>

                <p className="mt-2 text-2xl font-black text-white">
                  {formatCurrency(deliveryEarnings)}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold text-gray-500">
                  Bonuses
                </p>

                <p className="mt-2 text-2xl font-black text-white">
                  {formatCurrency(periodBonusTotal)}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold text-gray-500">
                  Tips
                </p>

                <p className="mt-2 text-2xl font-black text-white">
                  {formatCurrency(periodTipTotal)}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold text-gray-500">
                  Withdrawals
                </p>

                <p className="mt-2 text-2xl font-black text-white">
                  {formatCurrency(periodWithdrawals)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Delivery Fees"
            value={formatCurrency(deliveryEarnings)}
            icon={<FiTruck />}
            description={`${periodDeliveryCount} completed deliveries`}
          />

          <StatCard
            title="Bonuses"
            value={formatCurrency(bonuses)}
            icon={<FiPlus />}
            description="Completed bonuses"
          />

          <StatCard
            title="Tips"
            value={formatCurrency(tips)}
            icon={<FiDollarSign />}
            description="Customer tips received"
          />

          <StatCard
            title="Available Balance"
            value={formatCurrency(availableBalance)}
            icon={<FiArrowUp />}
            description="Available for withdrawal"
          />
        </section>

        {/* WEEKLY PERFORMANCE + WITHDRAW */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* WEEKLY PERFORMANCE */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-lg font-black text-gray-950">
                  Weekly Performance
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Demo weekly delivery performance
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 px-4 py-2 text-right">
                <p className="text-xs font-semibold text-gray-500">
                  Weekly Total
                </p>

                <p className="text-sm font-black text-[#FF6B35]">
                  {formatCurrency(
                    weeklyPerformanceTotal
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8 flex h-64 items-end gap-3 border-b border-gray-100">
              {weeklyData.map((item) => {
                const height =
                  (item.amount / weeklyMaximum) *
                  100;

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    <div className="group relative flex h-full items-end">
                      <div
                        className="w-full rounded-t-xl bg-[#FF6B35] transition-all duration-300 group-hover:bg-gray-950"
                        style={{
                          height: `${height}%`,
                          minHeight: "12px",
                        }}
                      >
                        <div className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-950 px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                          {formatCurrency(
                            item.amount
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-center text-xs font-semibold text-gray-500">
                      {item.day}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WITHDRAW */}
          <div className="rounded-3xl bg-gray-950 p-6 text-white shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-black">
                  Withdraw Earnings
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Transfer available earnings to your
                  payout account.
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF6B35] text-xl">
                <FiArrowDown />
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-white/5 p-4">
              <p className="text-xs font-semibold text-gray-500">
                Available Balance
              </p>

              <p className="mt-1 text-2xl font-black">
                {formatCurrency(availableBalance)}
              </p>
            </div>

            <div className="mt-5">
              <label
                htmlFor="withdrawAmount"
                className="text-sm font-semibold text-gray-300"
              >
                Withdrawal Amount
              </label>

              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">
                  ₦
                </span>

                <input
                  id="withdrawAmount"
                  type="number"
                  min="1000"
                  step="100"
                  value={withdrawAmount}
                  onChange={(event) =>
                    setWithdrawAmount(
                      event.target.value
                    )
                  }
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-9 pr-4 text-white outline-none placeholder:text-gray-600 focus:border-[#FF6B35]"
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Minimum withdrawal: ₦1,000
              </p>
            </div>

            <button
              type="button"
              onClick={handleWithdraw}
              disabled={
                isWithdrawing ||
                availableBalance < 1000
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isWithdrawing ? (
                <>
                  <FiRefreshCw className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FiArrowDown />
                  Withdraw Earnings
                </>
              )}
            </button>
          </div>
        </section>

        {/* EARNINGS BREAKDOWN */}
        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-lg font-black text-gray-950">
              Earnings Breakdown
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Breakdown of your completed earnings for{" "}
              {period.toLowerCase()}.
            </p>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-600">
                  Delivery Fees
                </span>

                <span className="font-black text-gray-950">
                  {deliveryPercentage}%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#FF6B35]"
                  style={{
                    width: `${deliveryPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                {formatCurrency(deliveryEarnings)}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-600">
                  Bonuses
                </span>

                <span className="font-black text-gray-950">
                  {bonusPercentage}%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${bonusPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                {formatCurrency(bonuses)}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-600">
                  Customer Tips
                </span>

                <span className="font-black text-gray-950">
                  {tipPercentage}%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${tipPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                {formatCurrency(tips)}
              </p>
            </div>
          </div>
        </section>

        {/* TRANSACTION HISTORY */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-lg font-black text-gray-950">
                Transaction History
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Your recent earnings and withdrawals.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FiCalendar />
              {period}
            </div>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                  <th className="px-6 py-4">
                    Transaction
                  </th>

                  <th className="px-6 py-4">
                    Reference
                  </th>

                  <th className="px-6 py-4">
                    Date
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map(
                  (transaction) => {
                    const isNegative =
                      transaction.amount < 0;

                    return (
                      <tr
                        key={transaction.id}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${getTransactionIconStyle(
                                transaction.type
                              )}`}
                            >
                              {getTransactionIcon(
                                transaction.type
                              )}
                            </div>

                            <div>
                              <p className="font-bold text-gray-950">
                                {
                                  transaction.description
                                }
                              </p>

                              <p className="mt-0.5 text-xs text-gray-500">
                                {
                                  transaction.type
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {transaction.reference}
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-gray-700">
                            {
                              transaction.dateLabel
                            }
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            {transaction.time}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                              transaction.status
                            )}`}
                          >
                            {
                              transaction.status
                            }
                          </span>
                        </td>

                        <td
                          className={`px-6 py-4 text-right text-sm font-black ${
                            isNegative
                              ? "text-red-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {isNegative
                            ? "-"
                            : "+"}
                          {formatCurrency(
                            transaction.amount
                          )}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE LIST */}
          <div className="divide-y divide-gray-100 md:hidden">
            {filteredTransactions.map(
              (transaction) => {
                const isNegative =
                  transaction.amount < 0;

                return (
                  <div
                    key={transaction.id}
                    className="p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${getTransactionIconStyle(
                          transaction.type
                        )}`}
                      >
                        {getTransactionIcon(
                          transaction.type
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold text-gray-950">
                              {
                                transaction.description
                              }
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {
                                transaction.reference
                              }
                            </p>
                          </div>

                          <p
                            className={`whitespace-nowrap text-sm font-black ${
                              isNegative
                                ? "text-red-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {isNegative
                              ? "-"
                              : "+"}
                            {formatCurrency(
                              transaction.amount
                            )}
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${getStatusStyle(
                              transaction.status
                            )}`}
                          >
                            {
                              transaction.status
                            }
                          </span>

                          <span className="text-xs text-gray-500">
                            {
                              transaction.dateLabel
                            }{" "}
                            •{" "}
                            {
                              transaction.time
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="px-6 py-12 text-center">
              <FiClock className="mx-auto text-3xl text-gray-300" />

              <p className="mt-3 font-bold text-gray-700">
                No transactions found
              </p>

              <p className="mt-1 text-sm text-gray-500">
                There are no transactions for this
                period.
              </p>
            </div>
          )}
        </section>

        {/* PAYOUT ACCOUNT */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-black text-gray-950">
                  Payout Account
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Your current withdrawal account.
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl text-[#FF6B35]">
                <FiDollarSign />
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <p className="text-sm font-black text-gray-950">
                Access Bank
              </p>

              <p className="mt-1 text-sm text-gray-500">
                **** **** 4821
              </p>

              <p className="mt-3 text-xs font-semibold text-gray-500">
                Account Name
              </p>

              <p className="mt-1 text-sm font-bold text-gray-800">
                Michael Adeyemi
              </p>
            </div>

            <Link
              href="/rider/profile"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#FF6B35] transition hover:text-gray-950"
            >
              Manage payout account
              <FiArrowRight />
            </Link>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-lg font-black text-gray-950">
              Payout Information
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Minimum withdrawal
                </span>

                <span className="text-sm font-black text-gray-950">
                  ₦1,000
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Standard payout
                </span>

                <span className="text-sm font-black text-gray-950">
                  Same day
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Withdrawal status
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  <FiCheckCircle />
                  Available
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO NOTICE */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex gap-3">
            <FiClock className="mt-0.5 shrink-0 text-amber-600" />

            <div>
              <p className="font-bold text-amber-900">
                Demo Earnings System
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                This page currently uses demo transaction
                data. Withdrawals update the local
                interface only. When the Door-Step backend
                is connected, earnings, transactions,
                balances, payout accounts and withdrawal
                processing will come from the server.
              </p>
            </div>
          </div>
        </div>

        {/* BACK TO DASHBOARD */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/rider/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to Rider Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function RiderEarningsPage() {
  return (
    <RiderAuthGuard>
      <EarningsContent />
    </RiderAuthGuard>
  );
}
