
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiActivity,
  FiBell,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiEye,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiPackage,
  FiPercent,
  FiSearch,
  FiSettings,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiUserCheck,
  FiUsers,
  FiX,
} from "react-icons/fi";

type RiderStatus =
  | "Active"
  | "Online"
  | "Pending"
  | "Suspended"
  | "Offline";

type KycStatus =
  | "Verified"
  | "Pending"
  | "Rejected";

type Rider = {
  id: string;
  fullName: string;
  email: string;
  phone: string;

  city: string;
  state: string;

  vehicleType: string;
  vehicleModel: string;
  vehiclePlateNumber?: string;

  status: RiderStatus;
  kycStatus: KycStatus;

  totalDeliveries: number;
  completedDeliveries: number;
  cancelledDeliveries: number;

  earnings: number;
  rating: number;
  distance: number;

  joinedAt: string;

  governmentIdName?: string;
  driversLicenseName?: string;
  profilePhotoName?: string;

  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

const demoRiders: Rider[] = [
  {
    id: "RIDER-1001",
    fullName: "Michael Adeyemi",
    email: "michael@example.com",
    phone: "+234 801 234 5678",
    city: "Maryland",
    state: "Lagos",
    vehicleType: "Motorcycle",
    vehicleModel: "Honda CB125",
    vehiclePlateNumber: "LND-482-KJ",
    status: "Active",
    kycStatus: "Verified",
    totalDeliveries: 428,
    completedDeliveries: 412,
    cancelledDeliveries: 16,
    earnings: 684500,
    rating: 4.9,
    distance: 1842,
    joinedAt: "2026-06-12",
    governmentIdName: "michael-id.pdf",
    driversLicenseName: "michael-license.pdf",
    profilePhotoName: "michael-photo.jpg",
    emergencyContactName: "Grace Adeyemi",
    emergencyContactPhone: "+234 802 111 2233",
  },

  {
    id: "RIDER-1002",
    fullName: "Daniel Okafor",
    email: "daniel@example.com",
    phone: "+234 802 345 6789",
    city: "Yaba",
    state: "Lagos",
    vehicleType: "Motorcycle",
    vehicleModel: "TVS Raider",
    vehiclePlateNumber: "KJA-721-LG",
    status: "Active",
    kycStatus: "Verified",
    totalDeliveries: 365,
    completedDeliveries: 349,
    cancelledDeliveries: 16,
    earnings: 574800,
    rating: 4.8,
    distance: 1598,
    joinedAt: "2026-05-20",
    governmentIdName: "daniel-id.pdf",
    driversLicenseName: "daniel-license.pdf",
    profilePhotoName: "daniel-photo.jpg",
    emergencyContactName: "Chioma Okafor",
    emergencyContactPhone: "+234 803 444 5566",
  },

  {
    id: "RIDER-1003",
    fullName: "Blessing Johnson",
    email: "blessing@example.com",
    phone: "+234 803 456 7890",
    city: "Ikeja",
    state: "Lagos",
    vehicleType: "Electric Scooter",
    vehicleModel: "NIU NQi",
    status: "Online",
    kycStatus: "Verified",
    totalDeliveries: 298,
    completedDeliveries: 287,
    cancelledDeliveries: 11,
    earnings: 462300,
    rating: 4.9,
    distance: 1286,
    joinedAt: "2026-07-02",
    governmentIdName: "blessing-id.pdf",
    profilePhotoName: "blessing-photo.jpg",
    emergencyContactName: "James Johnson",
    emergencyContactPhone: "+234 804 222 3344",
  },

  {
    id: "RIDER-1004",
    fullName: "Samuel Williams",
    email: "samuel@example.com",
    phone: "+234 804 567 8901",
    city: "Lekki",
    state: "Lagos",
    vehicleType: "Bicycle",
    vehicleModel: "Trek FX 2",
    status: "Offline",
    kycStatus: "Verified",
    totalDeliveries: 214,
    completedDeliveries: 205,
    cancelledDeliveries: 9,
    earnings: 286400,
    rating: 4.7,
    distance: 842,
    joinedAt: "2026-07-15",
    governmentIdName: "samuel-id.pdf",
    profilePhotoName: "samuel-photo.jpg",
    emergencyContactName: "Peter Williams",
    emergencyContactPhone: "+234 805 555 6677",
  },

  {
    id: "RIDER-1005",
    fullName: "Aisha Ibrahim",
    email: "aisha@example.com",
    phone: "+234 805 678 9012",
    city: "Victoria Island",
    state: "Lagos",
    vehicleType: "Motorcycle",
    vehicleModel: "Yamaha YBR",
    vehiclePlateNumber: "AAA-193-KD",
    status: "Pending",
    kycStatus: "Pending",
    totalDeliveries: 0,
    completedDeliveries: 0,
    cancelledDeliveries: 0,
    earnings: 0,
    rating: 0,
    distance: 0,
    joinedAt: "2026-09-18",
    governmentIdName: "aisha-id.pdf",
    driversLicenseName: "aisha-license.pdf",
    profilePhotoName: "aisha-photo.jpg",
    emergencyContactName: "Ibrahim Musa",
    emergencyContactPhone: "+234 806 777 8899",
  },

  {
    id: "RIDER-1006",
    fullName: "David Emmanuel",
    email: "david@example.com",
    phone: "+234 806 789 0123",
    city: "Surulere",
    state: "Lagos",
    vehicleType: "Motorcycle",
    vehicleModel: "Bajaj Boxer",
    vehiclePlateNumber: "APP-662-LA",
    status: "Suspended",
    kycStatus: "Rejected",
    totalDeliveries: 156,
    completedDeliveries: 138,
    cancelledDeliveries: 18,
    earnings: 198700,
    rating: 4.2,
    distance: 624,
    joinedAt: "2026-04-18",
    governmentIdName: "david-id.pdf",
    driversLicenseName: "david-license.pdf",
    profilePhotoName: "david-photo.jpg",
    emergencyContactName: "John Emmanuel",
    emergencyContactPhone: "+234 807 888 9900",
  },
];

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: FiGrid,
  },
  {
    label: "Restaurants",
    href: "/admin/restaurants",
    icon: FiShoppingBag,
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: FiFileText,
  },
  {
    label: "Riders",
    href: "/admin/riders",
    icon: FiTruck,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: FiUsers,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: FiPackage,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: FiDollarSign,
  },
  {
    label: "Promotions",
    href: "/admin/promotions",
    icon: FiPercent,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: FiSettings,
  },
];

const statusOptions: Array<"All" | RiderStatus> = [
  "All",
  "Active",
  "Online",
  "Offline",
  "Pending",
  "Suspended",
];

const kycOptions: Array<"All" | KycStatus> = [
  "All",
  "Verified",
  "Pending",
  "Rejected",
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date: string) {
  const formatted = new Date(date);

  if (Number.isNaN(formatted.getTime())) {
    return date;
  }

  return formatted.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusClasses(status: RiderStatus) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";

    case "Online":
      return "bg-emerald-100 text-emerald-700";

    case "Offline":
      return "bg-gray-100 text-gray-600";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Suspended":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getKycClasses(status: KycStatus) {
  switch (status) {
    case "Verified":
      return "bg-green-100 text-green-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

export default function AdminRidersPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [riders, setRiders] =
    useState<Rider[]>(demoRiders);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<"All" | RiderStatus>("All");

  const [kycFilter, setKycFilter] =
    useState<"All" | KycStatus>("All");

  const [selectedRider, setSelectedRider] =
    useState<Rider | null>(null);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [adminEmail, setAdminEmail] =
    useState("Admin");

  // ------------------------------------------------------------
  // AUTH + LOAD REGISTERED RIDER
  // ------------------------------------------------------------

  useEffect(() => {
    const authenticated = localStorage.getItem(
      "doorstep_admin_authenticated"
    );

    if (authenticated !== "true") {
      router.replace("/admin/login");
      return;
    }

    const savedEmail = localStorage.getItem(
      "doorstep_admin_email"
    );

    if (savedEmail) {
      setAdminEmail(savedEmail);
    }

    const savedRider = localStorage.getItem(
      "doorstep_rider_application"
    );

    if (!savedRider) {
      return;
    }

    try {
      const rider = JSON.parse(savedRider);

      const riderStatus: RiderStatus =
        rider.status === "Approved"
          ? "Active"
          : rider.status === "Rejected"
          ? "Suspended"
          : "Pending";

      const registeredRider: Rider = {
        id: rider.id || "RIDER-DOORSTEP-001",

        fullName:
          rider.fullName || "Door-Step Rider",

        email: rider.email || "",
        phone: rider.phone || "",

        city: rider.city || "",
        state: rider.state || "",

        vehicleType:
          rider.vehicleType || "Not provided",

        vehicleModel:
          rider.vehicleModel || "Not provided",

        vehiclePlateNumber:
          rider.vehiclePlateNumber || "",

        status: riderStatus,

        kycStatus:
          rider.status === "Approved"
            ? "Verified"
            : rider.status === "Rejected"
            ? "Rejected"
            : "Pending",

        totalDeliveries: 0,
        completedDeliveries: 0,
        cancelledDeliveries: 0,

        earnings: 0,
        rating: 0,
        distance: 0,

        joinedAt:
          rider.submittedAt ||
          new Date().toISOString(),

        governmentIdName:
          rider.governmentIdName || "",

        driversLicenseName:
          rider.driversLicenseName || "",

        profilePhotoName:
          rider.profilePhotoName || "",

        emergencyContactName:
          rider.emergencyContactName || "",

        emergencyContactPhone:
          rider.emergencyContactPhone || "",
      };

      setRiders((current) => {
        const exists = current.some(
          (item) =>
            item.id === registeredRider.id
        );

        if (exists) {
          return current.map((item) =>
            item.id === registeredRider.id
              ? {
                  ...item,
                  ...registeredRider,
                }
              : item
          );
        }

        return [
          registeredRider,
          ...current,
        ];
      });
    } catch (error) {
      console.error(
        "Could not load rider application:",
        error
      );
    }
  }, [router]);

  // ------------------------------------------------------------
  // FILTER RIDERS
  // ------------------------------------------------------------

  const filteredRiders = useMemo(() => {
    return riders.filter((rider) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        !search ||
        rider.fullName
          .toLowerCase()
          .includes(searchValue) ||
        rider.email
          .toLowerCase()
          .includes(searchValue) ||
        rider.phone
          .toLowerCase()
          .includes(searchValue) ||
        rider.vehicleType
          .toLowerCase()
          .includes(searchValue) ||
        rider.vehicleModel
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        rider.status === statusFilter;

      const matchesKyc =
        kycFilter === "All" ||
        rider.kycStatus === kycFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesKyc
      );
    });
  }, [
    riders,
    search,
    statusFilter,
    kycFilter,
  ]);

  // ------------------------------------------------------------
  // STATS
  // ------------------------------------------------------------

  const totalRiders = riders.length;

  const onlineRiders = riders.filter(
    (rider) => rider.status === "Online"
  ).length;

  const activeRiders = riders.filter(
    (rider) => rider.status === "Active"
  ).length;

  const pendingRiders = riders.filter(
    (rider) => rider.status === "Pending"
  ).length;

  const suspendedRiders = riders.filter(
    (rider) => rider.status === "Suspended"
  ).length;

  // ------------------------------------------------------------
  // STATUS UPDATE
  // ------------------------------------------------------------

  function updateRiderStatus(
    rider: Rider,
    status: RiderStatus
  ) {
    setRiders((current) =>
      current.map((item) =>
        item.id === rider.id
          ? {
              ...item,
              status,
            }
          : item
      )
    );

    // Keep registered rider application synchronized.
    const savedRider = localStorage.getItem(
      "doorstep_rider_application"
    );

    if (savedRider) {
      try {
        const application =
          JSON.parse(savedRider);

        if (application.id === rider.id) {
          if (status === "Active") {
            application.status = "Approved";
          }

          if (status === "Suspended") {
            application.status = "Suspended";
          }

          if (status === "Pending") {
            application.status =
              "Pending Review";
          }

          localStorage.setItem(
            "doorstep_rider_application",
            JSON.stringify(application)
          );
        }
      } catch (error) {
        console.error(
          "Could not update rider application:",
          error
        );
      }
    }

    setSelectedRider({
      ...rider,
      status,
    });

    setSuccessMessage(
      `${rider.fullName} is now ${status}.`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  }

  // ------------------------------------------------------------
  // LOGOUT
  // ------------------------------------------------------------

  function handleLogout() {
    localStorage.removeItem(
      "doorstep_admin_authenticated"
    );

    localStorage.removeItem(
      "doorstep_admin_email"
    );

    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F5F7F6] text-gray-900">
      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-[#003A2B] text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/admin/dashboard"
            className="text-2xl font-black tracking-tight"
          >
            Door<span className="text-[#FF6B35]">-</span>Step
          </Link>

          <button
            type="button"
            className="lg:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-white/40">
            Platform
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#FF6B35] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />

                  {item.label}

                  {item.label ===
                    "Riders" &&
                    pendingRiders > 0 && (
                      <span className="ml-auto rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-black text-gray-900">
                        {pendingRiders}
                      </span>
                    )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-red-500/20 hover:text-white"
          >
            <FiLogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <div className="lg:pl-[270px]">
        {/* HEADER */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <FiMenu size={22} />
            </button>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Platform Management
              </p>

              <h1 className="text-xl font-black text-gray-950">
                Riders
              </h1>
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-xl border border-gray-200 p-3 hover:bg-gray-50"
            >
              <FiBell size={18} />

              {pendingRiders > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B35]" />
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setProfileOpen(
                  !profileOpen
                )
              }
              className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B35] font-black text-white">
                A
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-bold text-gray-900">
                  Admin
                </p>

                <p className="max-w-[180px] truncate text-xs text-gray-500">
                  {adminEmail}
                </p>
              </div>

              <FiChevronDown size={16} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 w-52 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-gray-50"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                >
                  <FiSettings />
                  Settings
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <FiLogOut />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* CONTENT */}

        <main className="p-4 md:p-8">
          {successMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
              <FiCheck />
              {successMessage}
            </div>
          )}

          {/* INTRO */}

          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">
              Delivery Network
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
              Rider Management
            </h2>

            <p className="mt-2 max-w-2xl text-gray-500">
              Manage Door-Step riders, verify KYC,
              monitor performance and control rider
              access to the platform.
            </p>
          </div>

          {/* STATS */}

          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard
              icon={<FiUsers />}
              label="Total Riders"
              value={totalRiders}
            />

            <StatCard
              icon={<FiActivity />}
              label="Online"
              value={onlineRiders}
            />

            <StatCard
              icon={<FiUserCheck />}
              label="Active"
              value={activeRiders}
            />

            <StatCard
              icon={<FiClock />}
              label="Pending"
              value={pendingRiders}
            />

            <StatCard
              icon={<FiX />}
              label="Suspended"
              value={suspendedRiders}
            />
          </div>

          {/* FILTERS */}

          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative flex-1 xl:max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search rider, phone, email or vehicle..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as
                        | "All"
                        | RiderStatus
                    )
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                >
                  {statusOptions.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status === "All"
                          ? "All Statuses"
                          : status}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={kycFilter}
                  onChange={(event) =>
                    setKycFilter(
                      event.target.value as
                        | "All"
                        | KycStatus
                    )
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                >
                  {kycOptions.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status === "All"
                          ? "All KYC"
                          : status}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* RIDER TABLE */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Rider
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Vehicle
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      KYC
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Deliveries
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Earnings
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Rating
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredRiders.map(
                    (rider) => (
                      <tr
                        key={rider.id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 font-black text-[#FF6B35]">
                              {rider.fullName
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <p className="font-bold text-gray-950">
                                {rider.fullName}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {rider.phone}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                {rider.city},{" "}
                                {rider.state}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-semibold text-gray-900">
                            {rider.vehicleType}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {rider.vehicleModel}
                          </p>

                          {rider.vehiclePlateNumber && (
                            <p className="mt-1 text-xs font-semibold text-gray-400">
                              {rider.vehiclePlateNumber}
                            </p>
                          )}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                              rider.status
                            )}`}
                          >
                            {rider.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${getKycClasses(
                              rider.kycStatus
                            )}`}
                          >
                            {rider.kycStatus}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-bold text-gray-900">
                            {rider.totalDeliveries}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {rider.completedDeliveries}{" "}
                            completed
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-bold text-gray-900">
                            {formatMoney(
                              rider.earnings
                            )}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1">
                            <FiStar className="fill-yellow-400 text-yellow-400" />

                            <span className="font-bold">
                              {rider.rating
                                ? rider.rating.toFixed(
                                    1
                                  )
                                : "—"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedRider(
                                rider
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#FF6B35]"
                          >
                            <FiEye />
                            Manage
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {filteredRiders.length === 0 && (
              <div className="px-6 py-16 text-center">
                <FiTruck className="mx-auto text-4xl text-gray-300" />

                <h3 className="mt-4 text-lg font-black text-gray-900">
                  No riders found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          {/* MOBILE CARDS */}

          <div className="mt-6 grid gap-4 md:hidden">
            {filteredRiders.map(
              (rider) => (
                <div
                  key={`mobile-${rider.id}`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-black text-[#FF6B35]">
                        {rider.fullName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-black text-gray-950">
                          {rider.fullName}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {rider.phone}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold ${getStatusClasses(
                        rider.status
                      )}`}
                    >
                      {rider.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-gray-400">
                        Vehicle
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {rider.vehicleType}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-gray-400">
                        KYC
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {rider.kycStatus}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-gray-400">
                        Deliveries
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {rider.totalDeliveries}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-gray-400">
                        Earnings
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {formatMoney(
                          rider.earnings
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedRider(
                        rider
                      )
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-bold text-white hover:bg-[#FF6B35]"
                  >
                    <FiEye />
                    Manage Rider
                  </button>
                </div>
              )
            )}
          </div>
        </main>
      </div>

      {/* RIDER MANAGEMENT MODAL */}

      {selectedRider && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5 md:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-lg font-black text-[#FF6B35]">
                  {selectedRider.fullName
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h3 className="text-xl font-black text-gray-950">
                    {selectedRider.fullName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {selectedRider.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedRider(null)
                }
                className="rounded-xl p-2 hover:bg-gray-100"
              >
                <FiX size={22} />
              </button>
            </div>

            <div className="space-y-6 p-6 md:p-8">
              {/* STATUS */}

              <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Rider Status
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                          selectedRider.status
                        )}`}
                      >
                        {selectedRider.status}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${getKycClasses(
                          selectedRider.kycStatus
                        )}`}
                      >
                        KYC:{" "}
                        {selectedRider.kycStatus}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedRider.status !==
                      "Active" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateRiderStatus(
                            selectedRider,
                            "Active"
                          )
                        }
                        className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-green-700"
                      >
                        <FiCheck className="mr-2 inline" />
                        Activate
                      </button>
                    )}

                    {selectedRider.status !==
                      "Suspended" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateRiderStatus(
                            selectedRider,
                            "Suspended"
                          )
                        }
                        className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700"
                      >
                        Suspend
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* PERSONAL INFORMATION */}

              <section>
                <SectionTitle title="Personal Information" />

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem
                    label="Full Name"
                    value={
                      selectedRider.fullName
                    }
                  />

                  <InfoItem
                    label="Phone"
                    value={
                      selectedRider.phone
                    }
                  />

                  <InfoItem
                    label="Email"
                    value={
                      selectedRider.email
                    }
                  />

                  <InfoItem
                    label="City"
                    value={
                      selectedRider.city
                    }
                  />

                  <InfoItem
                    label="State"
                    value={
                      selectedRider.state
                    }
                  />

                  <InfoItem
                    label="Joined"
                    value={formatDate(
                      selectedRider.joinedAt
                    )}
                  />
                </div>
              </section>

              {/* VEHICLE */}

              <section>
                <SectionTitle title="Vehicle Information" />

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem
                    label="Vehicle Type"
                    value={
                      selectedRider.vehicleType
                    }
                  />

                  <InfoItem
                    label="Vehicle Model"
                    value={
                      selectedRider.vehicleModel
                    }
                  />

                  <InfoItem
                    label="Plate / Registration"
                    value={
                      selectedRider.vehiclePlateNumber ||
                      "Not required"
                    }
                  />
                </div>
              </section>

              {/* KYC */}

              <section>
                <SectionTitle title="KYC & Verification" />

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <DocumentCard
                    title="Government ID"
                    file={
                      selectedRider.governmentIdName
                    }
                  />

                  <DocumentCard
                    title="Driver's Licence"
                    file={
                      selectedRider.driversLicenseName
                    }
                  />

                  <DocumentCard
                    title="Profile Photo"
                    file={
                      selectedRider.profilePhotoName
                    }
                  />
                </div>
              </section>

              {/* PERFORMANCE */}

              <section>
                <SectionTitle title="Performance" />

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <PerformanceCard
                    label="Deliveries"
                    value={
                      selectedRider.totalDeliveries
                    }
                    icon={<FiTruck />}
                  />

                  <PerformanceCard
                    label="Completed"
                    value={
                      selectedRider.completedDeliveries
                    }
                    icon={<FiCheck />}
                  />

                  <PerformanceCard
                    label="Earnings"
                    value={formatMoney(
                      selectedRider.earnings
                    )}
                    icon={<FiDollarSign />}
                  />

                  <PerformanceCard
                    label="Rating"
                    value={
                      selectedRider.rating
                        ? selectedRider.rating.toFixed(
                            1
                          )
                        : "—"
                    }
                    icon={<FiStar />}
                  />
                </div>
              </section>

              {/* EMERGENCY */}

              <section>
                <SectionTitle title="Emergency Contact" />

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <InfoItem
                    label="Name"
                    value={
                      selectedRider.emergencyContactName
                    }
                  />

                  <InfoItem
                    label="Phone"
                    value={
                      selectedRider.emergencyContactPhone
                    }
                  />

                  <InfoItem
                    label="Relationship"
                    value="Emergency Contact"
                  />
                </div>
              </section>

              {/* ACTIONS */}

              <section className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <p className="text-sm font-black text-red-800">
                  Rider Access Control
                </p>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  Suspending a rider should prevent the
                  rider from accepting new Door-Step
                  delivery jobs.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {selectedRider.status !==
                    "Suspended" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateRiderStatus(
                          selectedRider,
                          "Suspended"
                        )
                      }
                      className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
                    >
                      Suspend Rider
                    </button>
                  )}

                  {selectedRider.status ===
                    "Suspended" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateRiderStatus(
                          selectedRider,
                          "Active"
                        )
                      }
                      className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700"
                    >
                      Reactivate Rider
                    </button>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------
// COMPONENTS
// ------------------------------------------------------------

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF6B35]">
          {icon}
        </div>

        <FiActivity className="text-gray-300" />
      </div>

      <p className="mt-5 text-sm font-semibold text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-3xl font-black text-gray-950">
        {value}
      </p>
    </div>
  );
}

function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <h4 className="border-b border-gray-100 pb-3 text-sm font-black uppercase tracking-[0.15em] text-gray-950">
      {title}
    </h4>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-bold text-gray-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function DocumentCard({
  title,
  file,
}: {
  title: string;
  file?: string;
}) {
  const uploaded = Boolean(file);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-gray-900">
            {title}
          </p>

          <p className="mt-1 break-all text-xs text-gray-500">
            {file || "Not uploaded"}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
            uploaded
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {uploaded
            ? "Uploaded"
            : "Missing"}
        </span>
      </div>
    </div>
  );
}

function PerformanceCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <div className="text-[#FF6B35]">
        {icon}
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-gray-950">
        {value}
      </p>
    </div>
  );
}
