"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowDownLeft,
  FiArrowLeft,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiGift,
  FiPlus,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";

type TransactionType =
  | "deposit"
  | "payment"
  | "refund"
  | "bonus";

type TransactionStatus =
  | "successful"
  | "pending"
  | "failed";

type WalletTransaction = {
  id: string;
  type: TransactionType;
  title: string;
  description: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  reference: string;
};

const WALLET_BALANCE_KEY = "doorstep_wallet_balance";
const WALLET_TRANSACTIONS_KEY = "doorstep_wallet_transactions";

const demoTransactions: WalletTransaction[] = [
  {
    id: "wallet-tx-1",
    type: "deposit",
    title: "Wallet top up",
    description: "Added money to Door-Step wallet",
    amount: 20000,
    status: "successful",
    createdAt: new Date(
      Date.now() - 2 * 60 * 60 * 1000
    ).toISOString(),
    reference: "DSTP-TOP-001",
  },
  {
    id: "wallet-tx-2",
    type: "payment",
    title: "Order payment",
    description: "Payment for Chicken Republic order",
    amount: -12500,
    status: "successful",
    createdAt: new Date(
      Date.now() - 5 * 60 * 60 * 1000
    ).toISOString(),
    reference: "DSTP-ORD-10240",
  },
  {
    id: "wallet-tx-3",
    type: "refund",
    title: "Order refund",
    description: "Refund for cancelled order",
    amount: 6500,
    status: "successful",
    createdAt: new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString(),
    reference: "DSTP-REF-0091",
  },
  {
    id: "wallet-tx-4",
    type: "bonus",
    title: "Welcome bonus",
    description: "Door-Step promotional wallet credit",
    amount: 2000,
    status: "successful",
    createdAt: new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000
    ).toISOString(),
    reference: "DSTP-BON-001",
  },
];

function formatNaira(amount: number) {
  return `₦${Math.abs(amount).toLocaleString("en-NG")}`;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getTransactionIcon(type: TransactionType) {
  switch (type) {
    case "deposit":
      return <FiArrowDownLeft />;

    case "payment":
      return <FiArrowUpRight />;

    case "refund":
      return <FiRefreshCw />;

    case "bonus":
      return <FiGift />;

    default:
      return <FiCreditCard />;
  }
}

function getTransactionIconStyle(type: TransactionType) {
  switch (type) {
    case "deposit":
      return "bg-green-100 text-green-600";

    case "payment":
      return "bg-orange-100 text-[#FF6B35]";

    case "refund":
      return "bg-blue-100 text-blue-600";

    case "bonus":
      return "bg-purple-100 text-purple-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getStatusStyle(status: TransactionStatus) {
  switch (status) {
    case "successful":
      return "bg-green-50 text-green-700";

    case "pending":
      return "bg-yellow-50 text-yellow-700";

    case "failed":
      return "bg-red-50 text-red-700";

    default:
      return "bg-gray-50 text-gray-600";
  }
}

function formatTimeAgo(createdAt: string) {
  const difference = Math.max(
    0,
    Date.now() - new Date(createdAt).getTime()
  );

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

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<
    WalletTransaction[]
  >([]);
  const [amount, setAmount] = useState("");
  const [showTopUp, setShowTopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "credit" | "debit"
  >("all");

  useEffect(() => {
    try {
      const savedBalance = localStorage.getItem(
        WALLET_BALANCE_KEY
      );

      const savedTransactions = localStorage.getItem(
        WALLET_TRANSACTIONS_KEY
      );

      if (savedBalance) {
        setBalance(Number(savedBalance));
      } else {
        const demoBalance = 16000;

        setBalance(demoBalance);

        localStorage.setItem(
          WALLET_BALANCE_KEY,
          demoBalance.toString()
        );
      }

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        setTransactions(demoTransactions);

        localStorage.setItem(
          WALLET_TRANSACTIONS_KEY,
          JSON.stringify(demoTransactions)
        );
      }
    } catch (error) {
      console.error("Failed to load wallet:", error);

      setBalance(16000);
      setTransactions(demoTransactions);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredTransactions = useMemo(() => {
    if (activeFilter === "credit") {
      return transactions.filter(
        (transaction) => transaction.amount > 0
      );
    }

    if (activeFilter === "debit") {
      return transactions.filter(
        (transaction) => transaction.amount < 0
      );
    }

    return transactions;
  }, [transactions, activeFilter]);

  const totalCredits = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.amount > 0)
        .reduce(
          (total, transaction) => total + transaction.amount,
          0
        ),
    [transactions]
  );

  const totalDebits = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce(
          (total, transaction) =>
            total + Math.abs(transaction.amount),
          0
        ),
    [transactions]
  );

  const saveWallet = (
    newBalance: number,
    newTransactions: WalletTransaction[]
  ) => {
    setBalance(newBalance);
    setTransactions(newTransactions);

    localStorage.setItem(
      WALLET_BALANCE_KEY,
      newBalance.toString()
    );

    localStorage.setItem(
      WALLET_TRANSACTIONS_KEY,
      JSON.stringify(newTransactions)
    );
  };

  const handleTopUp = () => {
    const topUpAmount = Number(amount);

    if (!topUpAmount || topUpAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (topUpAmount < 500) {
      alert("Minimum wallet top-up is ₦500.");
      return;
    }

    const newTransaction: WalletTransaction = {
      id: `wallet-${Date.now()}`,
      type: "deposit",
      title: "Wallet top up",
      description: "Added money to Door-Step wallet",
      amount: topUpAmount,
      status: "successful",
      createdAt: new Date().toISOString(),
      reference: `DSTP-TOP-${Date.now()}`,
    };

    const newBalance = balance + topUpAmount;

    saveWallet(
      newBalance,
      [newTransaction, ...transactions]
    );

    setAmount("");
    setShowTopUp(false);
  };

  const clearTransactions = () => {
    const confirmed = window.confirm(
      "Clear your wallet transaction history?"
    );

    if (!confirmed) {
      return;
    }

    saveWallet(balance, []);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      {/* HEADER */}
      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to Profile
          </Link>

          <div className="mt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#FF6B35]">
               <FiCreditCard className="text-xl" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
                  Door-Step
                </p>

                <h1 className="text-3xl font-black text-gray-950 sm:text-4xl">
                  My Wallet
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-gray-600">
              Manage your Door-Step wallet balance and view your
              transaction history.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-3xl bg-gray-200" />

            <div className="h-24 animate-pulse rounded-3xl bg-gray-200" />

            <div className="h-80 animate-pulse rounded-3xl bg-gray-200" />
          </div>
        ) : (
          <>
            {/* WALLET BALANCE */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-[2rem] bg-gray-950 p-6 text-white shadow-xl sm:p-8"
            >
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
                    <FiCreditCard />
                    Available Balance
                  </div>

                  <p className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                    ₦{balance.toLocaleString("en-NG")}
                  </p>

                  <p className="mt-3 text-sm text-gray-400">
                    Available for Door-Step orders and eligible
                    wallet transactions.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTopUp(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3.5 font-bold text-white transition hover:bg-orange-500"
                >
                  <FiPlus />
                  Add Money
                </button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs font-semibold text-gray-500">
                    Total Credits
                  </p>

                  <p className="mt-2 text-lg font-black text-green-400">
                    +₦{totalCredits.toLocaleString("en-NG")}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs font-semibold text-gray-500">
                    Total Spent
                  </p>

                  <p className="mt-2 text-lg font-black text-orange-400">
                    -₦{totalDebits.toLocaleString("en-NG")}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs font-semibold text-gray-500">
                    Transactions
                  </p>

                  <p className="mt-2 text-lg font-black">
                    {transactions.length}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* WALLET BENEFITS */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: <FiShield />,
                  title: "Secure",
                  text: "Your wallet is protected.",
                },
                {
                  icon: <FiCreditCard />,
                  title: "Easy payments",
                  text: "Pay for eligible orders quickly.",
                },
                {
                  icon: <FiRefreshCw />,
                  title: "Refunds",
                  text: "Eligible refunds can return to your wallet.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#FF6B35]">
                    {item.icon}
                  </div>

                  <h2 className="mt-4 font-black text-gray-950">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* TRANSACTIONS */}
            <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-black text-gray-950">
                    Transaction History
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your recent wallet activity.
                  </p>
                </div>

                {transactions.length > 0 && (
                  <button
                    type="button"
                    onClick={clearTransactions}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-red-500"
                  >
                    <FiTrash2 />
                    Clear history
                  </button>
                )}
              </div>

              {/* FILTER */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  {
                    id: "all",
                    label: "All",
                  },
                  {
                    id: "credit",
                    label: "Credits",
                  },
                  {
                    id: "debit",
                    label: "Payments",
                  },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() =>
                      setActiveFilter(
                        filter.id as "all" | "credit" | "debit"
                      )
                    }
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      activeFilter === filter.id
                        ? "bg-gray-950 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-[#FF6B35]"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {filteredTransactions.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <FiCreditCard className="text-2xl" />
                  </div>

                  <h3 className="mt-5 font-black text-gray-950">
                    No transactions found
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Your wallet transactions will appear here.
                  </p>
                </div>
              ) : (
                <div className="mt-6 divide-y divide-gray-100">
                  {filteredTransactions.map(
                    (transaction, index) => (
                      <motion.div
                        key={transaction.id}
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.04,
                        }}
                        className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg ${getTransactionIconStyle(
                            transaction.type
                          )}`}
                        >
                          {getTransactionIcon(
                            transaction.type
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col justify-between gap-2 sm:flex-row">
                            <div>
                              <h3 className="font-black text-gray-950">
                                {transaction.title}
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                {transaction.description}
                              </p>
                            </div>

                            <div className="text-left sm:text-right">
                              <p
                                className={`text-lg font-black ${
                                  transaction.amount > 0
                                    ? "text-green-600"
                                    : "text-gray-950"
                                }`}
                              >
                                {transaction.amount > 0
                                  ? "+"
                                  : "-"}
                                {formatNaira(
                                  transaction.amount
                                )}
                              </p>

                              <span
                                className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${getStatusStyle(
                                  transaction.status
                                )}`}
                              >
                                {transaction.status}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                            <span>
                              {formatTimeAgo(
                                transaction.createdAt
                              )}
                            </span>

                            <span>
                              {formatDate(
                                transaction.createdAt
                              )}
                            </span>

                            <span>
                              Ref: {transaction.reference}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              )}
            </section>

            {/* PAYMENT INFO */}
            <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-5">
              <div className="flex gap-3">
                <FiCreditCard className="mt-0.5 shrink-0 text-[#FF6B35]" />

                <div>
                  <p className="font-bold text-gray-900">
                    Wallet payments
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Wallet payments are currently prepared for
                    the frontend experience. Real wallet funding,
                    payment authorization, refunds and balance
                    verification will be connected when we build
                    the Door-Step backend.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* TOP UP MODAL */}
      {showTopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
                  Door-Step Wallet
                </p>

                <h2 className="mt-1 text-2xl font-black text-gray-950">
                  Add Money
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowTopUp(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                aria-label="Close"
              >
                <FiXCircle />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Enter the amount you want to add to your
              Door-Step wallet.
            </p>

            <label className="mt-6 block">
              <span className="text-sm font-bold text-gray-700">
                Amount
              </span>

              <div className="mt-2 flex items-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 focus-within:border-[#FF6B35]">
                <span className="px-4 font-black text-gray-500">
                  ₦
                </span>

                <input
                  type="number"
                  min="500"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value)
                  }
                  placeholder="5,000"
                  className="w-full bg-transparent px-2 py-4 outline-none"
                />
              </div>
            </label>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[1000, 5000, 10000].map(
                (quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() =>
                      setAmount(quickAmount.toString())
                    }
                    className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-bold text-gray-600 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  >
                    ₦{quickAmount.toLocaleString("en-NG")}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={handleTopUp}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3.5 font-bold text-white transition hover:bg-orange-600"
            >
              <FiPlus />
              Add ₦
              {amount
                ? Number(amount).toLocaleString("en-NG")
                : "Money"}
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Demo wallet top-up for the current frontend
              version.
            </p>
          </motion.div>
        </div>
      )}
    </main>
  );
}
