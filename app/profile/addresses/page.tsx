"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiEdit2,
  FiHome,
  FiMapPin,
  FiMoreHorizontal,
  FiPhone,
  FiPlus,
  FiTrash2,
  FiBriefcase,
  FiCheck,
  FiX,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type AddressType = "home" | "work" | "other";

type SavedAddress = {
  id: string;
  type: AddressType;
  label: string;
  address: string;
  landmark: string;
  phone: string;
  isDefault: boolean;
  createdAt: string;
};

const STORAGE_KEY = "doorstep_saved_addresses";

const emptyForm = {
  type: "home" as AddressType,
  label: "Home",
  address: "",
  landmark: "",
  phone: "",
};

function getIcon(type: AddressType) {
  if (type === "home") return <FiHome />;
  if (type === "work") return <FiBriefcase />;
  return <FiMapPin />;
}

function getLabel(type: AddressType) {
  if (type === "home") return "Home";
  if (type === "work") return "Work";
  return "Other";
}

function AddressesPage() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        setAddresses(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load saved addresses:", error);
    }
  }, []);

  const saveAddresses = (updatedAddresses: SavedAddress[]) => {
    setAddresses(updatedAddresses);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedAddresses)
    );
  };

  const handleTypeChange = (type: AddressType) => {
    setForm((previous) => ({
      ...previous,
      type,
      label: getLabel(type),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (editingId) {
      const updated = addresses.map((address) =>
        address.id === editingId
          ? {
              ...address,
              type: form.type,
              label: form.label.trim() || getLabel(form.type),
              address: form.address.trim(),
              landmark: form.landmark.trim(),
              phone: form.phone.trim(),
            }
          : address
      );

      saveAddresses(updated);
    } else {
      const newAddress: SavedAddress = {
        id: `address-${Date.now()}`,
        type: form.type,
        label: form.label.trim() || getLabel(form.type),
        address: form.address.trim(),
        landmark: form.landmark.trim(),
        phone: form.phone.trim(),
        isDefault: addresses.length === 0,
        createdAt: new Date().toISOString(),
      };

      saveAddresses([...addresses, newAddress]);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (address: SavedAddress) => {
    setForm({
      type: address.type,
      label: address.label,
      address: address.address,
      landmark: address.landmark,
      phone: address.phone,
    });

    setEditingId(address.id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id: string) => {
    const addressToDelete = addresses.find(
      (address) => address.id === id
    );

    if (!addressToDelete) return;

    const confirmed = window.confirm(
      `Delete "${addressToDelete.label}" address?`
    );

    if (!confirmed) return;

    let updated = addresses.filter(
      (address) => address.id !== id
    );

    // If the default address was deleted,
    // make the first remaining address default.
    if (
      addressToDelete.isDefault &&
      updated.length > 0
    ) {
      updated = updated.map((address, index) => ({
        ...address,
        isDefault: index === 0,
      }));
    }

    saveAddresses(updated);
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map((address) => ({
      ...address,
      isDefault: address.id === id,
    }));

    saveAddresses(updated);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] text-gray-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8">
          <Link
            href="/profile"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#FF6B35]"
          >
            <FiArrowLeft />
            Back to Profile
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                Delivery Information
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                Saved Addresses
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Save your frequently used delivery addresses so you
                can check out faster.
              </p>
            </div>

            {!showForm && (
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setEditingId(null);
                  setShowForm(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-orange-600"
              >
                <FiPlus />
                Add Address
              </button>
            )}
          </div>
        </div>

        {/* ADD / EDIT FORM */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -15,
              }}
              className="mb-8 overflow-hidden"
            >
              <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-gray-950">
                      {editingId
                        ? "Edit Address"
                        : "Add New Address"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Enter the details for your delivery location.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* ADDRESS TYPE */}
                  <div>
                    <label className="mb-3 block text-sm font-bold text-gray-800">
                      Address Type
                    </label>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {(
                        [
                          ["home", "Home", <FiHome />],
                          [
                            "work",
                            "Work",
                            <FiBriefcase />,
                          ],
                          [
                            "other",
                            "Other",
                            <FiMoreHorizontal />,
                          ],
                        ] as const
                      ).map(([type, label, icon]) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            handleTypeChange(type)
                          }
                          className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-left transition ${
                            form.type === type
                              ? "border-[#FF6B35] bg-orange-50 text-[#FF6B35]"
                              : "border-gray-200 bg-white text-gray-600 hover:border-orange-200"
                          }`}
                        >
                          <span className="text-xl">
                            {icon}
                          </span>

                          <span className="font-bold">
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CUSTOM LABEL */}
                  <div>
                    <label
                      htmlFor="address-label"
                      className="mb-2 block text-sm font-bold text-gray-800"
                    >
                      Address Label
                    </label>

                    <input
                      id="address-label"
                      type="text"
                      value={form.label}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          label: event.target.value,
                        })
                      }
                      placeholder="e.g. Home, Office, Mum's House"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-[#FF6B35] focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  {/* ADDRESS */}
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-bold text-gray-800"
                    >
                      Delivery Address
                    </label>

                    <textarea
                      id="address"
                      rows={3}
                      value={form.address}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          address: event.target.value,
                        })
                      }
                      placeholder="Enter your full delivery address"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-[#FF6B35] focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  {/* LANDMARK + PHONE */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="landmark"
                        className="mb-2 block text-sm font-bold text-gray-800"
                      >
                        Landmark
                        <span className="ml-1 font-normal text-gray-400">
                          (Optional)
                        </span>
                      </label>

                      <input
                        id="landmark"
                        type="text"
                        value={form.landmark}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            landmark: event.target.value,
                          })
                        }
                        placeholder="e.g. Near the filling station"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-[#FF6B35] focus:bg-white focus:ring-2 focus:ring-orange-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-bold text-gray-800"
                      >
                        Phone Number
                      </label>

                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(event) =>
                            setForm({
                              ...form,
                              phone: event.target.value,
                            })
                          }
                          placeholder="08012345678"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#FF6B35] focus:bg-white focus:ring-2 focus:ring-orange-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-xl border border-gray-200 px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3 font-bold text-white transition hover:bg-orange-600"
                    >
                      <FiCheck />
                      {editingId
                        ? "Save Changes"
                        : "Save Address"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ADDRESSES */}
        {addresses.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-[#FF6B35]">
              <FiMapPin className="text-3xl" />
            </div>

            <h2 className="mt-6 text-2xl font-black text-gray-950">
              No saved addresses yet
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
              Add your home, work or other frequently used
              delivery address to make your next order faster.
            </p>

            {!showForm && (
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setShowForm(true);
                }}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                <FiPlus />
                Add Your First Address
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {addresses.map((address, index) => (
              <motion.div
                key={address.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -4,
                }}
                className={`relative rounded-3xl border bg-white p-6 shadow-sm transition ${
                  address.isDefault
                    ? "border-[#FF6B35] shadow-orange-100"
                    : "border-gray-200"
                }`}
              >
                {/* DEFAULT BADGE */}
                {address.isDefault && (
                  <div className="absolute right-5 top-5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#FF6B35]">
                    Default
                  </div>
                )}

                {/* ICON + TITLE */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                      address.isDefault
                        ? "bg-[#FF6B35] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span className="text-xl">
                      {getIcon(address.type)}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate pr-20 text-lg font-black text-gray-950">
                      {address.label}
                    </h3>

                    <p className="text-sm capitalize text-gray-500">
                      {address.type} address
                    </p>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="mt-6 space-y-4">
                  <div className="flex gap-3">
                    <FiMapPin className="mt-1 shrink-0 text-[#FF6B35]" />

                    <p className="text-sm leading-6 text-gray-600">
                      {address.address}
                    </p>
                  </div>

                  {address.landmark && (
                    <div className="flex gap-3">
                      <FiMapPin className="mt-1 shrink-0 text-gray-400" />

                      <p className="text-sm leading-6 text-gray-500">
                        {address.landmark}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <FiPhone className="mt-1 shrink-0 text-gray-400" />

                    <p className="text-sm text-gray-600">
                      {address.phone}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-5">
                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() =>
                        handleSetDefault(address.id)
                      }
                      className="rounded-lg px-3 py-2 text-xs font-bold text-[#FF6B35] transition hover:bg-orange-50"
                    >
                      Set as Default
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleEdit(address)}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                  >
                    <FiEdit2 />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(address.id)
                    }
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* FOOTER NOTE */}
        <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50 p-5">
          <div className="flex gap-3">
            <FiMapPin className="mt-1 shrink-0 text-[#FF6B35]" />

            <div>
              <p className="font-bold text-gray-900">
                Faster checkout
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Your saved addresses will be available for quick
                selection during checkout.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AddressesPage;
