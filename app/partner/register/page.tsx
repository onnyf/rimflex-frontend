
"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiFileText,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiUploadCloud,
  FiUser,
} from "react-icons/fi";

type FormData = {
  ownerName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

  restaurantName: string;
  category: string;
  description: string;

  address: string;
  city: string;
  state: string;

  openingTime: string;
  closingTime: string;

  logoName: string;
  coverName: string;
  documentName: string;

  bankName: string;
  accountName: string;
  accountNumber: string;
};

const initialFormData: FormData = {
  ownerName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",

  restaurantName: "",
  category: "",
  description: "",

  address: "",
  city: "",
  state: "",

  openingTime: "08:00",
  closingTime: "22:00",

  logoName: "",
  coverName: "",
  documentName: "",

  bankName: "",
  accountName: "",
  accountNumber: "",
};

const steps = [
  {
    number: 1,
    title: "Account",
    description: "Owner information",
  },
  {
    number: 2,
    title: "Business",
    description: "Restaurant details",
  },
  {
    number: 3,
    title: "Location",
    description: "Restaurant location",
  },
  {
    number: 4,
    title: "Documents",
    description: "Business verification",
  },
  {
    number: 5,
    title: "Payout",
    description: "Bank information",
  },
  {
    number: 6,
    title: "Review",
    description: "Submit application",
  },
];

export default function PartnerRegisterPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: "logoName" | "coverName" | "documentName"
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    updateField(field, file.name);
  };

  const validateStep = () => {
    setError("");

    if (currentStep === 1) {
      if (
        !formData.ownerName ||
        !formData.email ||
        !formData.phone ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please complete all required account fields.");
        return false;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (
        !formData.restaurantName ||
        !formData.category ||
        !formData.description
      ) {
        setError("Please complete all required business fields.");
        return false;
      }
    }

    if (currentStep === 3) {
      if (
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.openingTime ||
        !formData.closingTime
      ) {
        setError("Please complete the restaurant location and hours.");
        return false;
      }
    }

    if (currentStep === 4) {
      if (!formData.logoName || !formData.coverName) {
        setError("Please upload your restaurant logo and cover image.");
        return false;
      }
    }

    if (currentStep === 5) {
      if (
        !formData.bankName ||
        !formData.accountName ||
        !formData.accountNumber
      ) {
        setError("Please complete your payout information.");
        return false;
      }

      if (formData.accountNumber.length < 10) {
        setError("Please enter a valid account number.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < steps.length) {
      setCurrentStep((previous) => previous + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleBack = () => {
    setError("");

    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateStep()) return;

    const application = {
      ...formData,
      status: "Pending Review",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "doorstep_partner_application",
      JSON.stringify(application)
    );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#FFF8F3] px-6 py-12">
        <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl bg-white p-8 text-center shadow-xl shadow-orange-900/5 sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <FiCheck className="text-4xl text-green-600" />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
              Application Submitted
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Welcome to Door-Step Partners
            </h1>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-600">
              Your restaurant application has been submitted successfully.
              Our team will review your information and contact you once your
              restaurant is approved.
            </p>

            <div className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-2xl bg-orange-50 p-5 text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35] text-white">
                <FiClock className="text-xl" />
              </div>

              <div>
                <p className="font-bold text-gray-950">
                  Status: Pending Review
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  You will be notified when your application status changes.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => router.push("/partner/login")}
                className="rounded-full bg-[#FF6B35] px-7 py-3.5 font-bold text-white transition hover:bg-orange-600"
              >
                Go to Partner Login
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="rounded-full border border-gray-200 px-7 py-3.5 font-bold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Back to Door-Step
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      {/* TOP BAR */}
      <header className="border-b border-orange-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-xl font-black text-white">
              D
            </div>

            <span className="text-xl font-black tracking-tight text-gray-950">
              Door<span className="text-[#FF6B35]">-Step</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/partner/login")}
            className="text-sm font-bold text-gray-600 transition hover:text-[#FF6B35]"
          >
            Already a partner?{" "}
            <span className="text-[#FF6B35]">Sign in</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* LEFT SIDEBAR */}
          <aside>
            <div className="sticky top-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                  Restaurant Partner
                </p>

                <h1 className="mt-3 text-3xl font-black leading-tight text-gray-950">
                  Grow your restaurant with Door-Step.
                </h1>

                <p className="mt-4 text-sm leading-6 text-gray-500">
                  Complete your registration and start reaching more customers
                  through Door-Step.
                </p>
              </div>

              <div className="mt-8 space-y-2">
                {steps.map((step) => {
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;

                  return (
                    <div
                      key={step.number}
                      className={`flex items-center gap-3 rounded-2xl p-3 transition ${
                        isActive
                          ? "bg-white shadow-sm"
                          : "bg-transparent"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          isCompleted
                            ? "bg-green-100 text-green-600"
                            : isActive
                            ? "bg-[#FF6B35] text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <FiCheck />
                        ) : (
                          step.number
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-sm font-bold ${
                            isActive
                              ? "text-gray-950"
                              : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </p>

                        <p className="text-xs text-gray-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl bg-gray-950 p-5 text-white">
                <FiShoppingBag className="text-2xl text-[#FF6B35]" />

                <p className="mt-4 font-bold">
                  Why partner with Door-Step?
                </p>

                <ul className="mt-4 space-y-3 text-sm leading-5 text-gray-400">
                  <li>• Reach more customers</li>
                  <li>• Manage orders easily</li>
                  <li>• Track your earnings</li>
                  <li>• Promote your restaurant</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* FORM AREA */}
          <section>
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-orange-900/5 sm:p-9 lg:p-10">
              {/* HEADER */}
              <div className="border-b border-gray-100 pb-7">
                <p className="text-sm font-bold text-[#FF6B35]">
                  Step {currentStep} of {steps.length}
                </p>

                <h2 className="mt-2 text-2xl font-black text-gray-950 sm:text-3xl">
                  {steps[currentStep - 1].title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {steps[currentStep - 1].description}
                </p>
              </div>

              {/* PROGRESS */}
              <div className="mt-7 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#FF6B35] transition-all duration-500"
                  style={{
                    width: `${(currentStep / steps.length) * 100}%`,
                  }}
                />
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8"
              >
                {/* STEP 1 */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-800">
                        Owner Full Name
                      </label>

                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                          type="text"
                          value={formData.ownerName}
                          onChange={(event) =>
                            updateField(
                              "ownerName",
                              event.target.value
                            )
                          }
                          placeholder="Enter your full name"
                          className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-800">
                          Email Address
                        </label>

                        <div className="relative">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            type="email"
                            value={formData.email}
                            onChange={(event) =>
                              updateField(
                                "email",
                                event.target.value
                              )
                            }
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-800">
                          Phone Number
                        </label>

                        <div className="relative">
                          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(event) =>
                              updateField(
                                "phone",
                                event.target.value
                              )
                            }
                            placeholder="08012345678"
                            className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-800">
                          Password
                        </label>

                        <div className="relative">
                          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            type="password"
                            value={formData.password}
                            onChange={(event) =>
                              updateField(
                                "password",
                                event.target.value
                              )
                            }
                            placeholder="Minimum 6 characters"
                            className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-800">
                          Confirm Password
                        </label>

                        <div className="relative">
                          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(event) =>
                              updateField(
                                "confirmPassword",
                                event.target.value
                              )
                            }
                            placeholder="Repeat your password"
                            className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-800">
                        Restaurant Name
                      </label>

                      <input
                        type="text"
                        value={formData.restaurantName}
                        onChange={(event) =>
                          updateField(
                            "restaurantName",
                            event.target.value
                          )
                        }
                        placeholder="e.g. Mama's Kitchen"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-800">
                        Restaurant Category
                      </label>

                      <select
                        value={formData.category}
                        onChange={(event) =>
                          updateField(
                            "category",
                            event.target.value
                          )
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                      >
                        <option value="">
                          Select a category
                        </option>
                        <option value="Nigerian">
                          Nigerian
                        </option>
                        <option value="Fast Food">
                          Fast Food
                        </option>
                        <option value="African">
                          African
                        </option>
                        <option value="Chinese">
                          Chinese
                        </option>
                        <option value="Continental">
                          Continental
                        </option>
                        <option value="Bakery">
                          Bakery
                        </option>
                        <option value="Drinks">
                          Drinks & Beverages
                        </option>
                        <option value="Desserts">
                          Desserts
                        </option>
                        <option value="Other">
                          Other
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-800">
                        Restaurant Description
                      </label>

                      <textarea
                        value={formData.description}
                        onChange={(event) =>
                          updateField(
                            "description",
                            event.target.value
                          )
                        }
                        placeholder="Tell customers what your restaurant offers..."
                        rows={5}
                        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-800">
                        Restaurant Address
                      </label>

                      <div className="relative">
                        <FiMapPin className="absolute left-4 top-4 text-gray-400" />

                        <textarea
                          value={formData.address}
                          onChange={(event) =>
                            updateField(
                              "address",
                              event.target.value
                            )
                          }
                          placeholder="Enter your full restaurant address"
                          rows={3}
                          className="w-full resize-none rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-800">
                          City
                        </label>

                        <input
                          type="text"
                          value={formData.city}
                          onChange={(event) =>
                            updateField(
                              "city",
                              event.target.value
                            )
                          }
                          placeholder="e.g. Lagos"
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-800">
                          State
                        </label>

                        <select
                          value={formData.state}
                          onChange={(event) =>
                            updateField(
                              "state",
                              event.target.value
                            )
                          }
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                        >
                          <option value="">
                            Select state
                          </option>
                          <option value="Lagos">Lagos</option>
                          <option value="Ogun">Ogun</option>
                          <option value="Oyo">Oyo</option>
                          <option value="Abuja">FCT Abuja</option>
                          <option value="Rivers">Rivers</option>
                          <option value="Delta">Delta</option>
                          <option value="Edo">Edo</option>
                          <option value="Enugu">Enugu</option>
                          <option value="Kano">Kano</option>
                          <option value="Kaduna">Kaduna</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <FiClock className="text-[#FF6B35]" />

                        <p className="text-sm font-bold text-gray-800">
                          Business Hours
                        </p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-gray-500">
                            Opening Time
                          </label>

                          <input
                            type="time"
                            value={formData.openingTime}
                            onChange={(event) =>
                              updateField(
                                "openingTime",
                                event.target.value
                              )
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-semibold text-gray-500">
                            Closing Time
                          </label>

                          <input
                            type="time"
                            value={formData.closingTime}
                            onChange={(event) =>
                              updateField(
                                "closingTime",
                                event.target.value
                              )
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="rounded-2xl bg-orange-50 p-5">
                      <div className="flex gap-3">
                        <FiFileText className="mt-0.5 shrink-0 text-xl text-[#FF6B35]" />

                        <div>
                          <p className="font-bold text-gray-950">
                            Business verification
                          </p>

                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Upload the requested restaurant information.
                            Actual document verification will be handled
                            securely by the Door-Step backend during production
                            integration.
                          </p>
                        </div>
                      </div>
                    </div>

                    <FileUpload
                      title="Restaurant Logo"
                      description="PNG, JPG or WEBP"
                      fileName={formData.logoName}
                      onChange={(event) =>
                        handleFileChange(event, "logoName")
                      }
                    />

                    <FileUpload
                      title="Restaurant Cover Image"
                      description="A wide image that represents your restaurant"
                      fileName={formData.coverName}
                      onChange={(event) =>
                        handleFileChange(event, "coverName")
                      }
                    />

                    <FileUpload
                      title="Business Document"
                      description="Optional for demo. Required for production verification."
                      fileName={formData.documentName}
                      onChange={(event) =>
                        handleFileChange(event, "documentName")
                      }
                    />
                  </div>
                )}

                {/* STEP 5 */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="rounded-2xl bg-gray-50 p-5">
                      <div className="flex gap-3">
                        <FiCreditCard className="mt-0.5 text-xl text-[#FF6B35]" />

                        <div>
                          <p className="font-bold text-gray-950">
                            Restaurant payouts
                          </p>

                          <p className="mt-1 text-sm leading-6 text-gray-500">
                            Your approved restaurant earnings will be paid
                            into this account. In production, these details
                            should be securely stored and validated on the
                            backend.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-800">
                        Bank Name
                      </label>

                      <select
                        value={formData.bankName}
                        onChange={(event) =>
                          updateField(
                            "bankName",
                            event.target.value
                          )
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                      >
                        <option value="">
                          Select your bank
                        </option>
                        <option value="Access Bank">
                          Access Bank
                        </option>
                        <option value="GTBank">
                          GTBank
                        </option>
                        <option value="First Bank">
                          First Bank
                        </option>
                        <option value="UBA">
                          UBA
                        </option>
                        <option value="Zenith Bank">
                          Zenith Bank
                        </option>
                        <option value="Opay">
                          Opay
                        </option>
                        <option value="Kuda">
                          Kuda
                        </option>
                        <option value="Moniepoint">
                          Moniepoint
                        </option>
                        <option value="Other">
                          Other
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-800">
                        Account Name
                      </label>

                      <input
                        type="text"
                        value={formData.accountName}
                        onChange={(event) =>
                          updateField(
                            "accountName",
                            event.target.value
                          )
                        }
                        placeholder="Account holder name"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-800">
                        Account Number
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        value={formData.accountNumber}
                        onChange={(event) =>
                          updateField(
                            "accountNumber",
                            event.target.value.replace(/\D/g, "")
                          )
                        }
                        placeholder="10-digit account number"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 6 */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="rounded-2xl bg-green-50 p-5">
                      <div className="flex gap-3">
                        <FiCheck className="mt-0.5 text-xl text-green-600" />

                        <div>
                          <p className="font-bold text-gray-950">
                            Review your application
                          </p>

                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Please confirm that the information below is
                            correct before submitting your restaurant
                            application.
                          </p>
                        </div>
                      </div>
                    </div>

                    <ReviewSection
                      title="Account"
                      items={[
                        ["Owner", formData.ownerName],
                        ["Email", formData.email],
                        ["Phone", formData.phone],
                      ]}
                    />

                    <ReviewSection
                      title="Restaurant"
                      items={[
                        ["Restaurant", formData.restaurantName],
                        ["Category", formData.category],
                        ["Description", formData.description],
                      ]}
                    />

                    <ReviewSection
                      title="Location & Hours"
                      items={[
                        ["Address", formData.address],
                        ["City", formData.city],
                        ["State", formData.state],
                        [
                          "Hours",
                          `${formData.openingTime} - ${formData.closingTime}`,
                        ],
                      ]}
                    />

                    <ReviewSection
                      title="Documents"
                      items={[
                        ["Logo", formData.logoName || "Not uploaded"],
                        [
                          "Cover",
                          formData.coverName || "Not uploaded",
                        ],
                        [
                          "Business document",
                          formData.documentName || "Not uploaded",
                        ],
                      ]}
                    />

                    <ReviewSection
                      title="Payout"
                      items={[
                        ["Bank", formData.bankName],
                        ["Account name", formData.accountName],
                        ["Account number", `••••••${formData.accountNumber.slice(-4)}`],
                      ]}
                    />

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 p-4">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 accent-[#FF6B35]"
                      />

                      <span className="text-sm leading-6 text-gray-600">
                        I confirm that the information provided is accurate
                        and I agree to Door-Step&apos;s partner terms and
                        policies.
                      </span>
                    </label>
                  </div>
                )}

                {/* ERROR */}
                {error && (
                  <div className="mt-7 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {error}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="mt-9 flex flex-col-reverse gap-3 border-t border-gray-100 pt-7 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold transition ${
                      currentStep === 1
                        ? "cursor-not-allowed text-gray-300"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                    }`}
                  >
                    <FiArrowLeft />
                    Back
                  </button>

                  {currentStep < steps.length ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                    >
                      Continue
                      <FiArrowRight />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                    >
                      Submit Application
                      <FiCheck />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function FileUpload({
  title,
  description,
  fileName,
  onChange,
}: {
  title: string;
  description: string;
  fileName: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 p-6 transition hover:border-[#FF6B35] hover:bg-orange-50/40">
      <input
        type="file"
        accept="image/*,.pdf"
        onChange={onChange}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-[#FF6B35]">
          <FiUploadCloud />
        </div>

        <p className="mt-4 font-bold text-gray-950">
          {title}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {fileName || description}
        </p>

        <span className="mt-4 rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-gray-600">
          Choose File
        </span>
      </div>
    </label>
  );
}

function ReviewSection({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100">
      <div className="bg-gray-50 px-5 py-3">
        <p className="text-sm font-black text-gray-950">
          {title}
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="grid gap-1 px-5 py-4 sm:grid-cols-[150px_1fr]"
          >
            <p className="text-sm font-semibold text-gray-500">
              {label}
            </p>

            <p className="break-words text-sm font-semibold text-gray-900">
              {value || "Not provided"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
