
"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type RiderAuthGuardProps = {
  children: ReactNode;
};

export default function RiderAuthGuard({
  children,
}: RiderAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const authenticated = localStorage.getItem(
      "doorstep_rider_authenticated"
    );

    const riderId = localStorage.getItem("doorstep_rider_id");

    if (!authenticated || authenticated !== "true" || !riderId) {
      router.replace(
        `/rider/login?redirect=${encodeURIComponent(pathname)}`
      );
      return;
    }

    setChecking(false);
  }, [pathname, router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F3] px-6">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-[#FF6B35]" />

          <p className="mt-4 text-sm font-semibold text-gray-600">
            Checking rider account...
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
