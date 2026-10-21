
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
  FiTruck,
  FiUsers,
  FiX,
} from "react-icons/fi";
type ApplicationType = "Restaurant" | "Rider";

type ApplicationStatus =
  | "Pending Review"
  | "Under Review"
  | "Approved"
  | "Rejected"
  | "Action Required";

type Application = {
  id: string;
  type: ApplicationType;

  // Common
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  status: ApplicationStatus;
  submittedAt: string;

  // Restaurant
  restaurantName?: string;
  category?: string;
  description?: string;
  address?: string;
  openingTime?: string;
  closingTime?: string;
  logoName?: string;
  coverName?: string;
  businessDocumentName?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;

  // Rider
  vehicleType?: string;
  vehicleModel?: string;
  vehiclePlateNumber?: string;
  driversLicenseName?: string;
  governmentIdName?: string;
  profilePhotoName?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  requiresDriverLicense?: boolean;
};

const demoApplications: Application[] = [
  {
    id: "APP-1001",
    type: "Restaurant",
    fullName: "Adebayo Johnson",
    email: "adebayo@example.com",
    phone: "+234 801 234 5678",
    restaurantName: "Mama's Kitchen",
    category: "Nigerian",
    description: "Authentic Nigerian meals and local dishes.",
    address: "12 Allen Avenue",
    city: "Ikeja",
    state: "Lagos",
    openingTime: "08:00",
    closingTime: "22:00",
    bankName: "GTBank",
    accountName: "Mama's Kitchen",
    accountNumber: "1234567890",
    status: "Pending Review",
    submittedAt: "2026-09-18T09:20:00",
  },
  {
    id: "APP-1002",
    type: "Restaurant",
    fullName: "Chioma Okafor",
    email: "chioma@example.com",
    phone: "+234 802 345 6789",
    restaurantName: "Taste of Lagos",
    category: "African",
    description: "Traditional African dishes with a modern touch.",
    address: "25 Herbert Macaulay Way",
    city: "Yaba",
    state: "Lagos",
    openingTime: "09:00",
    closingTime: "23:00",
    bankName: "Access Bank",
    accountName: "Taste of Lagos",
    accountNumber: "9876543210",
    status: "Under Review",
    submittedAt: "2026-09-17T14:30:00",
  },
  {
    id: "APP-1003",
    type: "Restaurant",
    fullName: "Daniel Williams",
    email: "daniel@example.com",
    phone: "+234 803 456 7890",
    restaurantName: "Urban Bites",
    category: "Fast Food",
    description: "Fast meals, burgers, fries and more.",
    address: "15 Admiralty Way",
    city: "Lekki",
    state: "Lagos",
    openingTime: "10:00",
    closingTime: "00:00",
    bankName: "UBA",
    accountName: "Urban Bites",
    accountNumber: "1122334455",
    status: "Pending Review",
    submittedAt: "2026-09-16T11:15:00",
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

const statusOptions: Array<"All" | ApplicationStatus> = [
  "All",
  "Pending Review",
  "Under Review",
  "Approved",
  "Rejected",
  "Action Required",
];

function maskAccountNumber(accountNumber?: string) {
  if (!accountNumber) return "Not provided";

  const lastFour = accountNumber.slice(-4);

  return `••••••${lastFour}`;
}

function getStatusClasses(status: ApplicationStatus) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    case "Under Review":
      return "bg-blue-100 text-blue-700";

    case "Action Required":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
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

export default function AdminApplicationsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [applications, setApplications] =
    useState<Application[]>(demoApplications);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | ApplicationStatus>("All");

  const [typeFilter, setTypeFilter] =
    useState<"All" | ApplicationType>("All");

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [successMessage, setSuccessMessage] = useState("");

  const [adminEmail, setAdminEmail] = useState("Admin");

  // ------------------------------------------------------------
  // AUTH + LOAD APPLICATIONS
  // ------------------------------------------------------------

  useEffect(() => {
    const authenticated = localStorage.getItem(
      "doorstep_admin_authenticated"
    );

    if (authenticated !== "true") {
      router.replace("/admin/login");
      return;
    }

    const savedAdminEmail = localStorage.getItem(
      "doorstep_admin_email"
    );

    if (savedAdminEmail) {
      setAdminEmail(savedAdminEmail);
    }

    const savedApplications: Application[] = [];

    // ----------------------------------------------------------
    // RESTAURANT APPLICATION
    // ----------------------------------------------------------

    const savedRestaurant = localStorage.getItem(
      "doorstep_partner_application"
    );

    if (savedRestaurant) {
      try {
        const restaurant = JSON.parse(savedRestaurant);

        savedApplications.push({
          id: "APP-DOORSTEP-001",
          type: "Restaurant",

          fullName:
            restaurant.fullName ||
            restaurant.ownerName ||
            "Restaurant Owner",

          email: restaurant.email || "",
          phone: restaurant.phone || "",

          restaurantName:
            restaurant.restaurantName || "Unnamed Restaurant",

          category: restaurant.category || "Restaurant",

          description: restaurant.description || "",

          address: restaurant.address || "",

          city: restaurant.city || "",

          state: restaurant.state || "",

          openingTime: restaurant.openingTime || "",
          closingTime: restaurant.closingTime || "",

          logoName: restaurant.logoName || "",
          coverName: restaurant.coverName || "",

          businessDocumentName:
            restaurant.businessDocumentName || "",

          bankName: restaurant.bankName || "",
          accountName: restaurant.accountName || "",
          accountNumber: restaurant.accountNumber || "",

          status:
            restaurant.status || "Pending Review",

          submittedAt:
            restaurant.submittedAt ||
            new Date().toISOString(),
        });
      } catch (error) {
        console.error(
          "Could not read restaurant application:",
          error
        );
      }
    }

    // ----------------------------------------------------------
    // RIDER APPLICATION
    // ----------------------------------------------------------

    const savedRider = localStorage.getItem(
      "doorstep_rider_application"
    );

    if (savedRider) {
      try {
        const rider = JSON.parse(savedRider);

        savedApplications.push({
          id: rider.id || "RIDER-DOORSTEP-001",

          type: "Rider",

          fullName:
            rider.fullName ||
            rider.ownerName ||
            "Unnamed Rider",

          email: rider.email || "",
          phone: rider.phone || "",

          city: rider.city || "",
          state: rider.state || "",

          status:
            rider.status || "Pending Review",

          submittedAt:
            rider.submittedAt ||
            new Date().toISOString(),

          vehicleType: rider.vehicleType || "",
          vehicleModel: rider.vehicleModel || "",

          vehiclePlateNumber:
            rider.vehiclePlateNumber || "",

          driversLicenseName:
            rider.driversLicenseName || "",

          governmentIdName:
            rider.governmentIdName || "",

          profilePhotoName:
            rider.profilePhotoName || "",

          emergencyContactName:
            rider.emergencyContactName || "",

          emergencyContactPhone:
            rider.emergencyContactPhone || "",

          emergencyContactRelationship:
            rider.emergencyContactRelationship || "",

          requiresDriverLicense:
            rider.requiresDriverLicense || false,

          bankName: rider.bankName || "",
          accountName: rider.accountName || "",
          accountNumber: rider.accountNumber || "",
        });
      } catch (error) {
        console.error(
          "Could not read rider application:",
          error
        );
      }
    }

    // Demo applications + registered applications
    setApplications([
      ...savedApplications,
      ...demoApplications,
    ]);
  }, [router]);

  // ------------------------------------------------------------
  // FILTER APPLICATIONS
  // ------------------------------------------------------------

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        !search ||
        application.fullName
          .toLowerCase()
          .includes(searchValue) ||
        application.email
          .toLowerCase()
          .includes(searchValue) ||
        application.phone
          .toLowerCase()
          .includes(searchValue) ||
        application.restaurantName
          ?.toLowerCase()
          .includes(searchValue) ||
        application.vehicleType
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        application.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    applications,
    search,
    statusFilter,
    typeFilter,
  ]);

  // ------------------------------------------------------------
  // APPLICATION COUNTS
  // ------------------------------------------------------------

  const pendingCount = applications.filter(
    (application) =>
      application.status === "Pending Review"
  ).length;

  const riderCount = applications.filter(
    (application) =>
      application.type === "Rider"
  ).length;

  const restaurantCount = applications.filter(
    (application) =>
      application.type === "Restaurant"
  ).length;

  // ------------------------------------------------------------
  // UPDATE STATUS
  // ------------------------------------------------------------

  function updateApplicationStatus(
    application: Application,
    status: ApplicationStatus
  ) {
    const updatedApplications = applications.map((item) =>
      item.id === application.id
        ? {
            ...item,
            status,
          }
        : item
    );

    setApplications(updatedApplications);

    // ----------------------------------------------------------
    // UPDATE RESTAURANT LOCAL STORAGE
    // ----------------------------------------------------------

    if (
      application.type === "Restaurant" &&
      application.id === "APP-DOORSTEP-001"
    ) {
      const savedRestaurant = localStorage.getItem(
        "doorstep_partner_application"
      );

      if (savedRestaurant) {
        try {
          const restaurant = JSON.parse(savedRestaurant);

          restaurant.status = status;

          localStorage.setItem(
            "doorstep_partner_application",
            JSON.stringify(restaurant)
          );
        } catch (error) {
          console.error(
            "Could not update restaurant application:",
            error
          );
        }
      }
    }

    // ----------------------------------------------------------
    // UPDATE RIDER LOCAL STORAGE
    // ----------------------------------------------------------

    if (
      application.type === "Rider" &&
      application.id
    ) {
      const savedRider = localStorage.getItem(
        "doorstep_rider_application"
      );

      if (savedRider) {
        try {
          const rider = JSON.parse(savedRider);

          rider.status = status;

          localStorage.setItem(
            "doorstep_rider_application",
            JSON.stringify(rider)
          );
        } catch (error) {
          console.error(
            "Could not update rider application:",
            error
          );
        }
      }
    }

    setSelectedApplication({
      ...application,
      status,
    });

    setSuccessMessage(
      `${application.type} application ${status.toLowerCase()}.`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);

    if (status === "Approved") {
      setTimeout(() => {
        setSelectedApplication(null);
      }, 1200);
    }
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
          onClick={() => setSidebarOpen(false)}
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
            onClick={() => setSidebarOpen(false)}
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
                    "Applications" &&
                    pendingCount > 0 && (
                      <span className="ml-auto rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-black text-gray-900">
                        {pendingCount}
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
                Applications
              </h1>
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-xl border border-gray-200 p-3 hover:bg-gray-50"
            >
              <FiBell size={18} />

              {pendingCount > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B35]" />
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setProfileOpen(!profileOpen)
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
          {/* SUCCESS */}

          {successMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
              <FiCheck />

              {successMessage}
            </div>
          )}

          {/* PAGE INTRO */}

          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">
              Review Center
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
              Applications
            </h2>

            <p className="mt-2 max-w-2xl text-gray-500">
              Review and manage restaurants and riders
              applying to join the Door-Step platform.
            </p>
          </div>

          {/* SUMMARY CARDS */}

          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              icon={<FiFileText />}
              label="Total Applications"
              value={applications.length}
            />

            <SummaryCard
              icon={<FiClock />}
              label="Pending Review"
              value={pendingCount}
            />

            <SummaryCard
              icon={<FiShoppingBag />}
              label="Restaurant Applications"
              value={restaurantCount}
            />

            <SummaryCard
              icon={<FiTruck />}
              label="Rider Applications"
              value={riderCount}
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
                    setSearch(event.target.value)
                  }
                  placeholder="Search name, email, phone, restaurant..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(
                      event.target.value as
                        | "All"
                        | ApplicationType
                    )
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                >
                  <option value="All">
                    All Types
                  </option>
                  <option value="Restaurant">
                    Restaurants
                  </option>
                  <option value="Rider">
                    Riders
                  </option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as
                        | "All"
                        | ApplicationStatus
                    )
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF6B35]"
                >
                  {statusOptions.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status === "All"
                        ? "All Statuses"
                        : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* APPLICATION TABLE */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px]">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Applicant
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Type
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Business / Vehicle
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Location
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-gray-500">
                      Submitted
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredApplications.map(
                    (application) => (
                      <tr
                        key={application.id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-bold text-gray-950">
                              {application.fullName}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {application.email}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {application.phone}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                              application.type ===
                              "Rider"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {application.type ===
                            "Rider" ? (
                              <FiTruck />
                            ) : (
                              <FiShoppingBag />
                            )}

                            {application.type}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-semibold text-gray-900">
                            {application.type ===
                            "Restaurant"
                              ? application.restaurantName
                              : application.vehicleType}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {application.type ===
                            "Restaurant"
                              ? application.category
                              : application.vehicleModel}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm font-semibold text-gray-800">
                            {application.city ||
                              "Not provided"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {application.state ||
                              "Not provided"}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                              application.status
                            )}`}
                          >
                            {application.status}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-500">
                          {formatDate(
                            application.submittedAt
                          )}
                        </td>

                        <td className="px-6 py-5 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedApplication(
                                application
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#FF6B35]"
                          >
                            <FiEye />
                            Review
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {filteredApplications.length === 0 && (
              <div className="px-6 py-16 text-center">
                <FiFileText className="mx-auto text-4xl text-gray-300" />

                <h3 className="mt-4 text-lg font-black text-gray-900">
                  No applications found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          {/* MOBILE APPLICATION CARDS */}

          <div className="mt-6 grid gap-4 md:hidden">
            {filteredApplications.map(
              (application) => (
                <div
                  key={`mobile-${application.id}`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black text-gray-950">
                        {application.fullName}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {application.email}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {application.phone}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold ${getStatusClasses(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-gray-400">
                        Type
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {application.type}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-gray-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {application.city ||
                          "Not provided"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-gray-400">
                        Business / Vehicle
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {application.type ===
                        "Restaurant"
                          ? application.restaurantName
                          : application.vehicleType}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-[10px] font-bold uppercase text-gray-400">
                        Submitted
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {formatDate(
                          application.submittedAt
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedApplication(
                        application
                      )
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-bold text-white hover:bg-[#FF6B35]"
                  >
                    <FiEye />
                    Review Application
                  </button>
                </div>
              )
            )}
          </div>
        </main>
      </div>

      {/* REVIEW MODAL */}

      {selectedApplication && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5 md:px-8">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-black text-gray-950">
                    Review{" "}
                    {selectedApplication.type}{" "}
                    Application
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      selectedApplication.type ===
                      "Rider"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {selectedApplication.type}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Application ID:{" "}
                  {selectedApplication.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedApplication(null)
                }
                className="rounded-xl p-2 hover:bg-gray-100"
              >
                <FiX size={22} />
              </button>
            </div>

            <div className="space-y-6 p-6 md:p-8">
              {/* APPLICANT */}

              <section>
                <SectionTitle title="Applicant Information" />

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem
                    label="Full Name"
                    value={
                      selectedApplication.fullName
                    }
                  />

                  <InfoItem
                    label="Email"
                    value={
                      selectedApplication.email
                    }
                  />

                  <InfoItem
                    label="Phone"
                    value={
                      selectedApplication.phone
                    }
                  />

                  <InfoItem
                    label="City"
                    value={
                      selectedApplication.city
                    }
                  />

                  <InfoItem
                    label="State"
                    value={
                      selectedApplication.state
                    }
                  />

                  <InfoItem
                    label="Submitted"
                    value={formatDate(
                      selectedApplication.submittedAt
                    )}
                  />
                </div>
              </section>

              {/* RESTAURANT DETAILS */}

              {selectedApplication.type ===
                "Restaurant" && (
                <>
                  <section>
                    <SectionTitle title="Restaurant Information" />

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <InfoItem
                        label="Restaurant Name"
                        value={
                          selectedApplication.restaurantName
                        }
                      />

                      <InfoItem
                        label="Category"
                        value={
                          selectedApplication.category
                        }
                      />

                      <InfoItem
                        label="Address"
                        value={
                          selectedApplication.address
                        }
                      />

                      <InfoItem
                        label="Opening Time"
                        value={
                          selectedApplication.openingTime
                        }
                      />

                      <InfoItem
                        label="Closing Time"
                        value={
                          selectedApplication.closingTime
                        }
                      />

                      <InfoItem
                        label="Business Document"
                        value={
                          selectedApplication.businessDocumentName ||
                          "Not uploaded"
                        }
                      />
                    </div>

                    <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                        Description
                      </p>

                      <p className="mt-2 text-sm leading-7 text-gray-700">
                        {selectedApplication.description ||
                          "No description provided."}
                      </p>
                    </div>
                  </section>

                  <section>
                    <SectionTitle title="Bank & Payout" />

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <InfoItem
                        label="Bank"
                        value={
                          selectedApplication.bankName
                        }
                      />

                      <InfoItem
                        label="Account Name"
                        value={
                          selectedApplication.accountName
                        }
                      />

                      <InfoItem
                        label="Account Number"
                        value={maskAccountNumber(
                          selectedApplication.accountNumber
                        )}
                      />
                    </div>
                  </section>
                </>
              )}

              {/* RIDER DETAILS */}

              {selectedApplication.type ===
                "Rider" && (
                <>
                  <section>
                    <SectionTitle title="Rider & Vehicle Information" />

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <InfoItem
                        label="Vehicle Type"
                        value={
                          selectedApplication.vehicleType
                        }
                      />

                      <InfoItem
                        label="Vehicle Model"
                        value={
                          selectedApplication.vehicleModel
                        }
                      />

                      <InfoItem
                        label="Plate / Registration"
                        value={
                          selectedApplication.vehiclePlateNumber ||
                          "Not required"
                        }
                      />

                      <InfoItem
                        label="Driver's Licence"
                        value={
                          selectedApplication.driversLicenseName ||
                          (selectedApplication.requiresDriverLicense
                            ? "Not uploaded"
                            : "Not required")
                        }
                      />

                      <InfoItem
                        label="Government ID"
                        value={
                          selectedApplication.governmentIdName ||
                          "Not uploaded"
                        }
                      />

                      <InfoItem
                        label="Profile Photo"
                        value={
                          selectedApplication.profilePhotoName ||
                          "Not uploaded"
                        }
                      />
                    </div>
                  </section>

                  <section>
                    <SectionTitle title="Emergency Contact" />

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <InfoItem
                        label="Name"
                        value={
                          selectedApplication.emergencyContactName
                        }
                      />

                      <InfoItem
                        label="Phone"
                        value={
                          selectedApplication.emergencyContactPhone
                        }
                      />

                      <InfoItem
                        label="Relationship"
                        value={
                          selectedApplication.emergencyContactRelationship
                        }
                      />
                    </div>
                  </section>

                  <section>
                    <SectionTitle title="Bank & Payout" />

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <InfoItem
                        label="Bank"
                        value={
                          selectedApplication.bankName
                        }
                      />

                      <InfoItem
                        label="Account Name"
                        value={
                          selectedApplication.accountName
                        }
                      />

                      <InfoItem
                        label="Account Number"
                        value={maskAccountNumber(
                          selectedApplication.accountNumber
                        )}
                      />
                    </div>
                  </section>
                </>
              )}

              {/* CURRENT STATUS */}

              <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Current Status
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                        selectedApplication.status
                      )}`}
                    >
                      {selectedApplication.status}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500">
                    Review this application carefully
                    before approval.
                  </div>
                </div>
              </section>

              {/* ACTIONS */}

              <section>
                <SectionTitle title="Application Actions" />

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <button
                    type="button"
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication,
                        "Under Review"
                      )
                    }
                    className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
                  >
                    <FiClock className="mr-2 inline" />
                    Under Review
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication,
                        "Action Required"
                      )
                    }
                    className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-700 transition hover:bg-orange-100"
                  >
                    Request Changes
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication,
                        "Rejected"
                      )
                    }
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100"
                  >
                    Reject
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication,
                        "Approved"
                      )
                    }
                    className="rounded-xl bg-[#FF6B35] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#e85a28]"
                  >
                    <FiCheck className="mr-2 inline" />
                    Approve{" "}
                    {selectedApplication.type}
                  </button>
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

function SummaryCard({
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
