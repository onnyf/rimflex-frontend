
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function PaymentDetailsPage() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-[#EEF2F1] p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
          Payment Details
        </p>

        <h1 className="mt-3 text-3xl font-black text-gray-950">
          Payment: {params.id}
        </h1>

        <p className="mt-4 text-gray-500">
          The dynamic payment route is working correctly.
        </p>

        <Link
          href="/admin/payments"
          className="mt-6 inline-flex rounded-xl bg-[#003A2B] px-5 py-3 font-bold text-white"
        >
          Back to Payments
        </Link>
      </div>
    </div>
  );
}
