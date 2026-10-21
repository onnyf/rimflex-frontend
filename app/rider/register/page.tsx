
"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
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
  FiTruck,
  FiUser,
  FiUpload,
} from "react-icons/fi";

type VehicleType = "Motorcycle" | "Electric Scooter" | "Bicycle";

type RiderForm = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;

  dateOfBirth: string;
  address: string;
  city: string;
  state: string;

  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;

  vehicleType: VehicleType;
  vehicleModel: string;
  vehiclePlateNumber: string;

  governmentIdName: string;
  driversLicenseName: string;
  profilePhotoName: string;

  bankName: string;
  accountName: string;
  accountNumber: string;

  termsAccepted: boolean;
};

const initialForm: RiderForm = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",

  dateOfBirth: "",
  address: "",
  city: "",
  state: "",

  emergencyName: "",
  emergencyPhone: "",
  emergencyRelationship: "",

  vehicleType: "Motorcycle",
  vehicleModel: "",
  vehiclePlateNumber: "",

  governmentIdName: "",
  driversLicenseName: "",
  profilePhotoName: "",

  bankName: "",
  accountName: "",
  accountNumber: "",

  termsAccepted: false,
};

const steps = [
  {
    number: 1,
    title: "Account",
    description: "Your login details",
  },
  {
    number: 2,
    title: "Personal",
    description: "Your personal details",
  },
  {
    number: 3,
    title: "Vehicle",
    description: "Your delivery vehicle",
  },
  {
    number: 4,
    title: "Documents",
    description: "Verification documents",
  },
  {
    number: 5,
    title: "Payout",
    description: "Your bank details",
  },
  {
    number: 6,
    title: "Review",
    description: "Review application",
  },
];

export default function RiderRegisterPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<RiderForm>(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedVehicle = form.vehicleType;

  const requiresDriverLicense = selectedVehicle === "Motorcycle";

  const vehicleDescription = useMemo(() => {
    if (selectedVehicle === "Bicycle") {
      return "Bicycle riders do not need a driver's licence or plate number.";
    }

    if (selectedVehicle === "Electric Scooter") {
      return "Electric scooter riders do not need a driver's licence. Vehicle details are still required.";
    }

    return "Motorcycle riders must provide a valid driver's licence and motorcycle information.";
  }, [selectedVehicle]);

  const updateField = <K extends keyof RiderForm>(
    field: K,
    value: RiderForm[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const validateCurrentStep = () => {
    setError("");

    if (currentStep === 1) {
      if (!form.fullName.trim()) {
        setError("Please enter your full name.");
        return false;
      }

      if (!form.phone.trim()) {
        setError("Please enter your phone number.");
        return false;
      }

      if (!form.email.trim()) {
        setError("Please enter your email address.");
        return false;
      }

      if (!form.password) {
        setError("Please create a password.");
        return false;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return false;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (!form.dateOfBirth) {
        setError("Please enter your date of birth.");
        return false;
      }

      if (!form.address.trim()) {
        setError("Please enter your residential address.");
        return false;
      }

      if (!form.city.trim()) {
        setError("Please enter your city.");
        return false;
      }

      if (!form.state.trim()) {
        setError("Please enter your state.");
        return false;
      }

      if (!form.emergencyName.trim()) {
        setError("Please enter your emergency contact name.");
        return false;
      }

      if (!form.emergencyPhone.trim()) {
        setError("Please enter your emergency contact phone.");
        return false;
      }

      if (!form.emergencyRelationship.trim()) {
        setError("Please enter your relationship with the emergency contact.");
        return false;
      }
    }

    if (currentStep === 3) {
      if (!form.vehicleModel.trim()) {
        setError("Please enter your vehicle model or description.");
        return false;
      }

      if (
        selectedVehicle !== "Bicycle" &&
        !form.vehiclePlateNumber.trim()
      ) {
        setError("Please enter your vehicle plate/registration number.");
        return false;
      }
    }

    if (currentStep === 4) {
      if (!form.governmentIdName) {
        setError("Please upload your government ID.");
        return false;
      }

      if (!form.profilePhotoName) {
        setError("Please upload your profile photo.");
        return false;
      }

      if (requiresDriverLicense && !form.driversLicenseName) {
        setError(
          "A valid driver's licence is required for motorcycle riders."
        );
        return false;
      }
    }

    if (currentStep === 5) {
      if (!form.bankName.trim()) {
        setError("Please enter your bank name.");
        return false;
      }

      if (!form.accountName.trim()) {
        setError("Please enter your account name.");
        return false;
      }

      if (!form.accountNumber.trim()) {
        setError("Please enter your account number.");
        return false;
      }
    }

    if (currentStep === 6) {
      if (!form.termsAccepted) {
        setError(
          "Please accept the Door-Step Rider Terms & Conditions to continue."
        );
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setCurrentStep((previous) => Math.min(previous + 1, 6));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    setError("");

    setCurrentStep((previous) => Math.max(previous - 1, 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    const application = {
      ...form,

      id: `RIDER-${Date.now()}`,

      status: "Pending Review",

      submittedAt: new Date().toISOString(),

      source: "registered",

      // Helpful for admin review.
      requiresDriverLicense,

      // Keep registration method available for future OTP/email verification.
      loginMethods: ["phone", "email"],
    };

    localStorage.setItem(
      "doorstep_rider_application",
      JSON.stringify(application)
    );

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#FFF8F3] px-6 py-12">
        <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-xl sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <FiCheck className="text-4xl text-green-600" />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
              Application Submitted
            </p>

            <h1 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
              Welcome to Door-Step
            </h1>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-600">
              Your rider application has been successfully submitted. Our team
              will review your information and documents before approving your
              account.
            </p>

            <div className="mt-8 rounded-2xl bg-orange-50 p-5 text-left">
              <div className="flex gap-4">
                <div className="mt-1">
                  <FiClock className="text-xl text-[#FF6B35]" />
                </div>

                <div>
                  <p className="font-bold text-gray-950">
                    Application status
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    <span className="font-semibold text-orange-600">
                      Pending Review
                    </span>
                    {" — "}
                    You will be able to log in after your rider account has
                    been approved.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href="/rider/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3.5 font-bold text-white transition hover:bg-orange-600"
              >
                Go to Rider Login
                <FiArrowRight />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3.5 font-bold text-gray-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
              >
                Back to Door-Step
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F3]">
      {/* Header */}
      <header className="border-b border-orange-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Door<span className="text-[#FF6B35]">-Step</span>
          </Link>

          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-gray-500 sm:block">
              Already a rider?
            </span>

            <Link
              href="/rider/login"
              className="font-bold text-[#FF6B35] hover:text-orange-700"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
            Become a Door-Step Rider
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-5xl">
            Deliver with Door-Step
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Join our rider network and earn by delivering food, packages,
            shopping orders and business deliveries to customers.
          </p>
        </div>

        {/* Progress */}
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="hidden items-start justify-between md:flex">
            {steps.map((step, index) => {
              const active = currentStep >= step.number;

              return (
                <div
                  key={step.number}
                  className="relative flex flex-1 flex-col items-center"
                >
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-5 h-0.5 w-full ${
                        currentStep > step.number
                          ? "bg-[#FF6B35]"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${
                      active
                        ? "border-[#FF6B35] bg-[#FF6B35] text-white"
                        : "border-gray-200 bg-white text-gray-400"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <FiCheck />
                    ) : (
                      step.number
                    )}
                  </div>

                  <p
                    className={`mt-3 text-sm font-bold ${
                      active ? "text-gray-950" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>

                  <p className="mt-1 hidden text-center text-xs text-gray-400 lg:block">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="md:hidden">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-950">
                Step {currentStep} of {steps.length}
              </p>

              <p className="text-sm font-semibold text-[#FF6B35]">
                {steps[currentStep - 1].title}
              </p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#FF6B35] transition-all"
                style={{
                  width: `${(currentStep / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-5xl"
        >
          <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl">
            <div className="p-6 sm:p-8 lg:p-10">
              {/* STEP 1 */}
              {currentStep === 1 && (
                <section>
                  <StepHeading
                    icon={<FiUser />}
                    title="Create your rider account"
                    description="We'll use your phone number and email address for account access and important Door-Step updates."
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <InputField
                      label="Full Name"
                      required
                      value={form.fullName}
                      onChange={(value) =>
                        updateField("fullName", value)
                      }
                      placeholder="Enter your full name"
                    />

                    <InputField
                      label="Phone Number"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(value) =>
                        updateField("phone", value)
                      }
                      placeholder="+234 801 234 5678"
                      icon={<FiPhone />}
                    />

                    <InputField
                      label="Email Address"
                      required
                      type="email"
                      value={form.email}
                      onChange={(value) =>
                        updateField("email", value)
                      }
                      placeholder="rider@example.com"
                      icon={<FiMail />}
                    />

                    <InputField
                      label="Password"
                      required
                      type="password"
                      value={form.password}
                      onChange={(value) =>
                        updateField("password", value)
                      }
                      placeholder="At least 6 characters"
                      icon={<FiLock />}
                    />

                    <div className="md:col-span-2">
                      <InputField
                        label="Confirm Password"
                        required
                        type="password"
                        value={form.confirmPassword}
                        onChange={(value) =>
                          updateField("confirmPassword", value)
                        }
                        placeholder="Re-enter your password"
                        icon={<FiLock />}
                      />
                    </div>
                  </div>

                  <InfoBox>
                    Your phone number will be your primary login option. You
                    will also be able to log in using your email address.
                  </InfoBox>
                </section>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <section>
                  <StepHeading
                    icon={<FiUser />}
                    title="Personal information"
                    description="Tell us a little more about yourself and provide an emergency contact."
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <InputField
                      label="Date of Birth"
                      required
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(value) =>
                        updateField("dateOfBirth", value)
                      }
                    />

                    <InputField
                      label="State"
                      required
                      value={form.state}
                      onChange={(value) =>
                        updateField("state", value)
                      }
                      placeholder="e.g. Lagos"
                    />

                    <InputField
                      label="City"
                      required
                      value={form.city}
                      onChange={(value) =>
                        updateField("city", value)
                      }
                      placeholder="e.g. Ikeja"
                      icon={<FiMapPin />}
                    />

                    <div className="md:col-span-2">
                      <InputField
                        label="Residential Address"
                        required
                        value={form.address}
                        onChange={(value) =>
                          updateField("address", value)
                        }
                        placeholder="Enter your full residential address"
                        icon={<FiMapPin />}
                      />
                    </div>
                  </div>

                  <div className="mt-10 border-t border-gray-100 pt-8">
                    <h3 className="text-lg font-black text-gray-950">
                      Emergency Contact
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Someone we can contact in case of an emergency.
                    </p>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      <InputField
                        label="Full Name"
                        required
                        value={form.emergencyName}
                        onChange={(value) =>
                          updateField("emergencyName", value)
                        }
                        placeholder="Emergency contact name"
                      />

                      <InputField
                        label="Phone Number"
                        required
                        type="tel"
                        value={form.emergencyPhone}
                        onChange={(value) =>
                          updateField("emergencyPhone", value)
                        }
                        placeholder="+234 801 234 5678"
                        icon={<FiPhone />}
                      />

                      <div className="md:col-span-2">
                        <InputField
                          label="Relationship"
                          required
                          value={form.emergencyRelationship}
                          onChange={(value) =>
                            updateField(
                              "emergencyRelationship",
                              value
                            )
                          }
                          placeholder="e.g. Brother, Sister, Spouse"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <section>
                  <StepHeading
                    icon={<FiTruck />}
                    title="Choose your delivery vehicle"
                    description="Select the vehicle you will use for Door-Step deliveries."
                  />

                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        type: "Motorcycle" as VehicleType,
                        emoji: "🏍️",
                        description: "Fast delivery across the city.",
                      },
                      {
                        type: "Electric Scooter" as VehicleType,
                        emoji: "🛵",
                        description: "Efficient urban deliveries.",
                      },
                      {
                        type: "Bicycle" as VehicleType,
                        emoji: "🚲",
                        description: "Great for short-distance delivery.",
                      },
                    ].map((vehicle) => {
                      const selected =
                        form.vehicleType === vehicle.type;

                      return (
                        <button
                          key={vehicle.type}
                          type="button"
                          onClick={() =>
                            updateField("vehicleType", vehicle.type)
                          }
                          className={`rounded-2xl border-2 p-6 text-left transition ${
                            selected
                              ? "border-[#FF6B35] bg-orange-50"
                              : "border-gray-200 hover:border-orange-200"
                          }`}
                        >
                          <div className="text-4xl">
                            {vehicle.emoji}
                          </div>

                          <h3 className="mt-4 font-black text-gray-950">
                            {vehicle.type}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-gray-500">
                            {vehicle.description}
                          </p>

                          {selected && (
                            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#FF6B35]">
                              <FiCheck />
                              Selected
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                    <p className="text-sm font-semibold leading-6 text-gray-600">
                      {vehicleDescription}
                    </p>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <InputField
                      label={
                        selectedVehicle === "Bicycle"
                          ? "Bicycle Model / Description"
                          : "Vehicle Model"
                      }
                      required
                      value={form.vehicleModel}
                      onChange={(value) =>
                        updateField("vehicleModel", value)
                      }
                      placeholder={
                        selectedVehicle === "Bicycle"
                          ? "e.g. Mountain Bike"
                          : "e.g. Honda CG 125"
                      }
                    />

                    {selectedVehicle !== "Bicycle" && (
                      <InputField
                        label="Plate / Registration Number"
                        required
                        value={form.vehiclePlateNumber}
                        onChange={(value) =>
                          updateField(
                            "vehiclePlateNumber",
                            value
                          )
                        }
                        placeholder="e.g. KSF-123-AB"
                      />
                    )}
                  </div>
                </section>
              )}

              {/* STEP 4 */}
              {currentStep === 4 && (
                <section>
                  <StepHeading
                    icon={<FiFileText />}
                    title="Verification documents"
                    description="Upload the documents required to verify your rider account."
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FileField
                      label="Government ID"
                      required
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(fileName) =>
                        updateField("governmentIdName", fileName)
                      }
                      currentFile={form.governmentIdName}
                      description="National ID, International Passport, Voter's Card or other accepted government ID."
                    />

                    <FileField
                      label="Profile Photo"
                      required
                      accept=".jpg,.jpeg,.png"
                      onChange={(fileName) =>
                        updateField("profilePhotoName", fileName)
                      }
                      currentFile={form.profilePhotoName}
                      description="Use a clear recent photo of yourself."
                    />

                    {requiresDriverLicense && (
                      <div className="md:col-span-2">
                        <FileField
                          label="Driver's Licence"
                          required
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(fileName) =>
                            updateField(
                              "driversLicenseName",
                              fileName
                            )
                          }
                          currentFile={form.driversLicenseName}
                          description="Required for motorcycle riders."
                        />
                      </div>
                    )}
                  </div>

                  {!requiresDriverLicense && (
                    <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
                      <div className="flex gap-3">
                        <FiCheck className="mt-0.5 shrink-0 text-lg text-green-600" />

                        <div>
                          <p className="font-bold text-green-900">
                            Driver's licence not required
                          </p>

                          <p className="mt-1 text-sm leading-6 text-green-800">
                            Based on your selected vehicle, you do not need
                            to provide a driver's licence during registration.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* STEP 5 */}
              {currentStep === 5 && (
                <section>
                  <StepHeading
                    icon={<FiCreditCard />}
                    title="Payout information"
                    description="Tell us where you want your Door-Step rider earnings to be paid."
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <InputField
                      label="Bank Name"
                      required
                      value={form.bankName}
                      onChange={(value) =>
                        updateField("bankName", value)
                      }
                      placeholder="e.g. Access Bank"
                    />

                    <InputField
                      label="Account Name"
                      required
                      value={form.accountName}
                      onChange={(value) =>
                        updateField("accountName", value)
                      }
                      placeholder="Name on bank account"
                    />

                    <div className="md:col-span-2">
                      <InputField
                        label="Account Number"
                        required
                        type="text"
                        inputMode="numeric"
                        value={form.accountNumber}
                        onChange={(value) =>
                          updateField("accountNumber", value)
                        }
                        placeholder="Enter your 10-digit account number"
                      />
                    </div>
                  </div>

                  <InfoBox>
                    Your payout information will be used for rider earnings.
                    In the production version, banking information will be
                    securely handled by the Door-Step backend.
                  </InfoBox>
                </section>
              )}

              {/* STEP 6 */}
              {currentStep === 6 && (
                <section>
                  <StepHeading
                    icon={<FiCheck />}
                    title="Review your application"
                    description="Please check your information carefully before submitting."
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <ReviewItem
                      label="Full Name"
                      value={form.fullName}
                    />

                    <ReviewItem
                      label="Phone"
                      value={form.phone}
                    />

                    <ReviewItem
                      label="Email"
                      value={form.email}
                    />

                    <ReviewItem
                      label="Vehicle"
                      value={form.vehicleType}
                    />

                    <ReviewItem
                      label="Vehicle Details"
                      value={form.vehicleModel}
                    />

                    {form.vehiclePlateNumber && (
                      <ReviewItem
                        label="Plate / Registration"
                        value={form.vehiclePlateNumber}
                      />
                    )}

                    <ReviewItem
                      label="Location"
                      value={`${form.city}, ${form.state}`}
                    />

                    <ReviewItem
                      label="Government ID"
                      value={form.governmentIdName}
                    />

                    <ReviewItem
                      label="Driver's Licence"
                      value={
                        requiresDriverLicense
                          ? form.driversLicenseName
                          : "Not required"
                      }
                    />

                    <ReviewItem
                      label="Bank"
                      value={form.bankName}
                    />

                    <ReviewItem
                      label="Account Name"
                      value={form.accountName}
                    />

                    <ReviewItem
                      label="Account Number"
                      value={form.accountNumber}
                    />
                  </div>

                  <label className="mt-8 flex cursor-pointer gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <input
                      type="checkbox"
                      checked={form.termsAccepted}
                      onChange={(event) =>
                        updateField(
                          "termsAccepted",
                          event.target.checked
                        )
                      }
                      className="mt-1 h-5 w-5 accent-[#FF6B35]"
                    />

                    <span className="text-sm leading-6 text-gray-600">
                      I confirm that the information provided is accurate and
                      I agree to the Door-Step Rider Terms & Conditions,
                      Privacy Policy and Rider Guidelines.
                    </span>
                  </label>
                </section>
              )}

              {/* Error */}
              {error && (
                <div className="mt-8 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-bold text-gray-700 transition hover:border-gray-300 hover:bg-gray-100"
                >
                  <FiArrowLeft />
                  Back
                </button>
              ) : (
                <Link
                  href="/rider/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-bold text-gray-700 transition hover:border-gray-300 hover:bg-gray-100"
                >
                  <FiArrowLeft />
                  Rider Login
                </Link>
              )}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-7 py-3.5 font-bold text-white transition hover:bg-orange-600"
                >
                  Continue
                  <FiArrowRight />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-7 py-3.5 font-bold text-white transition hover:bg-orange-600"
                >
                  Submit Application
                  <FiCheck />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

/* ----------------------------- */
/* Reusable Components            */
/* ----------------------------- */

function StepHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-[#FF6B35]">
          {icon}
        </div>

        <div>
          <h2 className="text-2xl font-black text-gray-950">
            {title}
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  icon?: React.ReactNode;
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email";
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-800">
        {label}
        {required && <span className="ml-1 text-[#FF6B35]">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          inputMode={inputMode}
          className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100 ${
            icon ? "pl-11" : ""
          }`}
        />
      </div>
    </div>
  );
}

function FileField({
  label,
  required,
  accept,
  onChange,
  currentFile,
  description,
}: {
  label: string;
  required?: boolean;
  accept?: string;
  onChange: (fileName: string) => void;
  currentFile: string;
  description: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-800">
        {label}
        {required && <span className="ml-1 text-[#FF6B35]">*</span>}
      </label>

      <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center transition hover:border-orange-300 hover:bg-orange-50">
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              onChange(file.name);
            }
          }}
        />

        <FiUpload className="mx-auto text-2xl text-[#FF6B35]" />

        <p className="mt-3 text-sm font-bold text-gray-800">
          {currentFile || "Click to upload"}
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>
      </label>
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50 p-5">
      <p className="text-sm leading-6 text-orange-900">{children}</p>
    </div>
  );
}

function ReviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-bold text-gray-900">
        {value || "Not provided"}
      </p>
    </div>
  );
}
