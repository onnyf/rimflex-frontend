
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useState,
  useEffect,
  useMemo,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  FiArrowLeft,
  FiBell,
  FiCheck,
  FiChevronDown,
  FiEdit2,
  FiGrid,
  FiImage,
  FiMenu,
  FiPackage,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  preparationTime: string;
  image: string;
  available: boolean;
  popular: boolean;
};

const initialMenuItems: MenuItem[] = [
  {
    id: "food-001",
    name: "Jollof Rice & Chicken",
    category: "Rice",
    description:
      "Our signature Nigerian jollof rice served with grilled chicken and fresh vegetables.",
    price: 4500,
    preparationTime: "20 - 25 mins",
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80",
    available: true,
    popular: true,
  },
  {
    id: "food-002",
    name: "Fried Rice & Chicken",
    category: "Rice",
    description:
      "Special fried rice prepared with vegetables and served with juicy chicken.",
    price: 5000,
    preparationTime: "20 - 25 mins",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    available: true,
    popular: true,
  },
  {
    id: "food-003",
    name: "Pounded Yam & Egusi",
    category: "Swallow",
    description:
      "Soft pounded yam served with rich traditional egusi soup.",
    price: 5500,
    preparationTime: "25 - 30 mins",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
    available: true,
    popular: true,
  },
  {
    id: "food-004",
    name: "Pepper Soup",
    category: "Soups",
    description:
      "Hot and spicy Nigerian pepper soup prepared with aromatic spices.",
    price: 3500,
    preparationTime: "15 - 20 mins",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    available: true,
    popular: false,
  },
  {
    id: "food-005",
    name: "Fried Plantain",
    category: "Sides",
    description:
      "Sweet ripe plantains fried until golden and crispy.",
    price: 1800,
    preparationTime: "10 - 15 mins",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80",
    available: true,
    popular: false,
  },
  {
    id: "food-006",
    name: "Chapman",
    category: "Drinks",
    description:
      "Refreshing Nigerian Chapman cocktail with fruits and citrus flavours.",
    price: 2000,
    preparationTime: "5 - 10 mins",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
    available: false,
    popular: false,
  },
];



const emptyForm = {
  name: "",
  category: "Rice Meals",
  description: "",
  price: "",
  preparationTime: "15 - 20 mins",
  image: "",
  popular: false,
};

const RESTAURANT_API_URL =
  process.env.NEXT_PUBLIC_RESTAURANT_API_URL ||
  "http://localhost:3003";

const RESTAURANT_ID =
  "1d839972-b57c-4bf4-9f9c-9b915e5f7923";

type ApiMenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  preparationMinutes: number | null;
  imageUrl: string | null;
  status: "AVAILABLE" | "UNAVAILABLE" | "OUT_OF_STOCK";
  isFeatured: boolean;
  menuCategoryId: string;
};

type ApiMenuCategory = {
  id: string;
  name: string;
};
export default function RestaurantMenuPage() {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

 const [menuItems, setMenuItems] =
  useState<MenuItem[]>([]);

const [loadingMenu, setLoadingMenu] = useState(true);
const [menuError, setMenuError] = useState("");

  const [categories, setCategories] = useState<string[]>(["All"]);
  const [menuCategories, setMenuCategories] =
    useState<ApiMenuCategory[]>([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedImageFile, setSelectedImageFile] =
    useState<File | null>(null);

  const [editingItem, setEditingItem] =
    useState<MenuItem | null>(null);

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
  let cancelled = false;

  async function loadMenu() {
    try {
      setLoadingMenu(true);
      setMenuError("");

      const [itemsResponse, categoriesResponse] =
        await Promise.all([
          fetch(
            `${RESTAURANT_API_URL}/restaurants/${RESTAURANT_ID}/menu-items`
          ),
          fetch(
            `${RESTAURANT_API_URL}/restaurants/${RESTAURANT_ID}/menu-categories`
          ),
        ]);

      if (!itemsResponse.ok || !categoriesResponse.ok) {
        throw new Error("Failed to load restaurant menu");
      }

      const apiItems: ApiMenuItem[] =
        await itemsResponse.json();

      const apiCategories: ApiMenuCategory[] =
        await categoriesResponse.json();

      const convertedItems: MenuItem[] = apiItems.map(
        (item) => {
          const category = apiCategories.find(
            (category) => category.id === item.menuCategoryId
          );

          return {
            id: item.id,
            name: item.name,
            category: category?.name || "Other",
            description: item.description || "",
            price: Number(item.price),
            preparationTime:
              item.preparationMinutes !== null
                ? `${item.preparationMinutes} mins`
                : "Not specified",
            image: item.imageUrl || "",
            available: item.status === "AVAILABLE",
            popular: item.isFeatured,
          };
        }
      );

      if (!cancelled) {
        setMenuItems(convertedItems);
        setCategories(["All", ...apiCategories.map((category) => category.name)]);
        setMenuCategories(apiCategories);
      }
    } catch (error) {
      if (!cancelled) {
        setMenuError(
          error instanceof Error
            ? error.message
            : "Unable to load menu"
        );
      }
    } finally {
      if (!cancelled) {
        setLoadingMenu(false);
      }
    }
  }

  loadMenu();

  return () => {
    cancelled = true;
  };
}, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        item.category === activeCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, search]);

  const openAddModal = () => {
    setSelectedImageFile(null);
    setEditingItem(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (item: MenuItem) => {
    setSelectedImageFile(null);
    setEditingItem(item);

    setForm({
      name: item.name,
      category: item.category,
      description: item.description,
      price: String(item.price),
      preparationTime: item.preparationTime,
      image: item.image,
      popular: item.popular,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImageFile(null);
    setShowModal(false);
    setEditingItem(null);
    setForm(emptyForm);
  };

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxImageSize = 5 * 1024 * 1024;

    if (!allowedImageTypes.includes(file.type)) {
      window.alert("Please select a JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > maxImageSize) {
      window.alert("Food image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setSelectedImageFile(file);

    const imageUrl = URL.createObjectURL(file);

    setForm((current) => ({
      ...current,
      image: imageUrl,
    }));
  };

  const uploadFoodImage = async (itemId: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `${RESTAURANT_API_URL}/restaurants/${RESTAURANT_ID}/menu-items/${itemId}/image`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload food image");
    }

    const result: { success: boolean; imageUrl: string } =
      await response.json();

    if (!result.success || !result.imageUrl) {
      throw new Error("Image upload returned an invalid response");
    }

    return result.imageUrl;
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.price.trim()) {
      return;
    }

    if (editingItem) {
      try {
        const response = await fetch(
          `${RESTAURANT_API_URL}/restaurants/${RESTAURANT_ID}/menu-items/${editingItem.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.name.trim(),
              description: form.description.trim(),
              price: Number(form.price),
              preparationMinutes: Number(
                form.preparationTime.match(/\d+/g)?.at(-1) || 20
              ),
              isFeatured: form.popular,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update menu item");
        }

        const updatedItem: ApiMenuItem = await response.json();

        let savedImageUrl = updatedItem.imageUrl || editingItem.image;

        let imageUploadFailed = false;

        if (selectedImageFile) {
          try {
            savedImageUrl = await uploadFoodImage(
              editingItem.id,
              selectedImageFile
            );
          } catch (uploadError) {
            console.error("Edit food image upload error:", uploadError);
            imageUploadFailed = true;
          }
        }

        if (imageUploadFailed) {
          window.alert(
            "Food details were saved successfully, but the image upload failed. Please use Edit Food to retry the image."
          );
        }

        setMenuItems((currentItems) =>
          currentItems.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  image: savedImageUrl,
                  name: updatedItem.name,
                  description: updatedItem.description || "",
                  price: Number(updatedItem.price),
                  preparationTime:
                    updatedItem.preparationMinutes !== null
                      ? `${updatedItem.preparationMinutes} mins`
                      : "Not specified",
                  popular: updatedItem.isFeatured,
                }
              : item
          )
        );
      } catch (error) {
        console.error("Update menu item error:", error);
        window.alert("Unable to update menu item. Please try again.");
        return;
      }
    } else {
      const selectedCategory = menuCategories.find(
        (category) => category.name === form.category
      );

      if (!selectedCategory) {
        window.alert("Please select a valid menu category.");
        return;
      }

      try {
        const response = await fetch(
          `${RESTAURANT_API_URL}/restaurants/${RESTAURANT_ID}/menu-items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.name.trim(),
              description: form.description.trim(),
              price: Number(form.price),
              preparationMinutes: Number(
                form.preparationTime.match(/\d+/g)?.at(-1) || 20
              ),
              isFeatured: form.popular,
              menuCategoryId: selectedCategory.id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add menu item");
        }

        const createdItem: ApiMenuItem = await response.json();

        let createdImageUrl = createdItem.imageUrl || "";
        let imageUploadFailed = false;

        if (selectedImageFile) {
          try {
            createdImageUrl = await uploadFoodImage(
              createdItem.id,
              selectedImageFile
            );
          } catch (uploadError) {
            console.error("Food image upload error:", uploadError);
            imageUploadFailed = true;
          }
        }

        setMenuItems((currentItems) => [
          {
            id: createdItem.id,
            name: createdItem.name,
            category: selectedCategory.name,
            description: createdItem.description || "",
            price: Number(createdItem.price),
            preparationTime:
              createdItem.preparationMinutes !== null
                ? `${createdItem.preparationMinutes} mins`
                : "Not specified",
            image: createdImageUrl,
            available: createdItem.status === "AVAILABLE",
            popular: createdItem.isFeatured,
          },
          ...currentItems,
        ]);

        if (imageUploadFailed) {
          window.alert(
            "Food item was created successfully, but the image upload failed. Please use Edit Food to retry the image. Do not add the food again."
          );
        }
      } catch (error) {
        console.error("Add menu item error:", error);
        window.alert("Unable to add menu item. Please try again.");
        return;
      }
    }

    closeModal();
  };

  const toggleAvailability = async (id: string) => {
    const item = menuItems.find((menuItem) => menuItem.id === id);

    if (!item) return;

    const newStatus = item.available
      ? "UNAVAILABLE"
      : "AVAILABLE";

    try {
      const response = await fetch(
        `${RESTAURANT_API_URL}/restaurants/${RESTAURANT_ID}/menu-items/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update availability");
      }

      const updatedItem: ApiMenuItem = await response.json();

      setMenuItems((currentItems) =>
        currentItems.map((menuItem) =>
          menuItem.id === id
            ? {
                ...menuItem,
                available: updatedItem.status === "AVAILABLE",
              }
            : menuItem
        )
      );
    } catch (error) {
      console.error("Availability update error:", error);
      window.alert(
        "Unable to update food availability. Please try again."
      );
    }
  };

  const deleteItem = async (id: string) => {
    const item = menuItems.find(
      (menuItem) => menuItem.id === id
    );

    if (!item) return;

    const confirmed = window.confirm(
      `Delete "${item.name}" from your menu?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${RESTAURANT_API_URL}/restaurants/${RESTAURANT_ID}/menu-items/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete menu item");
      }

      setMenuItems((currentItems) =>
        currentItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Delete menu item error:", error);
      window.alert("Unable to delete menu item. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F7] text-[#151515]">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[270px] transform bg-[#151515] text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* LOGO */}
          <div className="flex h-[82px] items-center justify-between border-b border-white/10 px-6">
            <Link
              href="/partner/dashboard"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-xl font-black">
                D
              </div>

              <div>
                <p className="text-lg font-black">
                  Door-Step
                </p>

                <p className="text-[11px] text-gray-400">
                  Restaurant Partner
                </p>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
            >
              <FiX />
            </button>
          </div>

          {/* RESTAURANT */}
          <div className="border-b border-white/10 px-5 py-5">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6B35] font-black">
                M
              </div>

              <div>
                <p className="text-sm font-bold">
                  Mama&apos;s Kitchen
                </p>

                <p className="text-xs text-gray-400">
                  Ikeja, Lagos
                </p>
              </div>
            </div>
          </div>

          {/* NAV */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
              Overview
            </p>

            <div className="space-y-1">
              {/* DASHBOARD */}
              <Link
                href="/partner/dashboard"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  pathname === "/partner/dashboard"
                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                    : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FiGrid />
                Dashboard
              </Link>

              {/* ORDERS */}
              <Link
                href="/partner/orders"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  pathname === "/partner/orders"
                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                    : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FiPackage />
                Orders
              </Link>

              {/* MENU */}
              <Link
                href="/partner/menu"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  pathname === "/partner/menu"
                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                    : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FiPackage />
                Menu
              </Link>

              {/* EARNINGS */}
              <Link
                href="/partner/earnings"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  pathname === "/partner/earnings"
                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                    : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="font-bold">â‚¦</span>
                Earnings
              </Link>
            </div>

            <p className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
              Manage
            </p>

            <div className="space-y-1">
              {/* CUSTOMERS */}
              <Link
                href="/partner/customers"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  pathname === "/partner/customers"
                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Customers
              </Link>

              {/* PROMOTIONS */}
              <Link
                href="/partner/promotions"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  pathname === "/partner/promotions"
                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Promotions
              </Link>

              {/* SETTINGS */}
              <Link
                href="/partner/settings"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  pathname === "/partner/settings"
                    ? "bg-[#FF6B35] font-semibold text-white shadow-lg shadow-orange-500/10"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Settings
              </Link>
            </div>
          </nav>

          <div className="border-t border-white/10 p-4">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-300 hover:bg-white/5">
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:pl-[270px]">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-[82px] items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-gray-200 p-2.5 lg:hidden"
            >
              <FiMenu />
            </button>

            <div>
              <p className="text-sm text-gray-500">
                Restaurant Partner
              </p>

              <h1 className="text-xl font-black md:text-2xl">
                Menu Management
              </h1>
            </div>
          </div>

          <button className="relative rounded-xl border border-gray-200 p-3">
            <FiBell />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B35]" />
          </button>
        </header>

        {/* CONTENT */}
        <main className="px-5 py-7 md:px-8 md:py-9">
          {/* PAGE HEADER */}
          <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Link
                href="/partner/dashboard"
                className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#FF6B35]"
              >
                <FiArrowLeft />
                Back to Dashboard
              </Link>

              <h2 className="text-3xl font-black tracking-tight">
                Your Menu
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Manage your meals, prices, availability and
                menu categories.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#e85c2c]"
            >
              <FiPlus />
              Add Menu Item
            </button>
          </div>

          {/* SUMMARY */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Total Items
                </p>

                <div className="rounded-xl bg-[#FFF0E9] p-2.5 text-[#FF6B35]">
                  <FiGrid />
                </div>
              </div>

              <p className="mt-4 text-3xl font-black">
                {menuItems.length}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Menu items
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Available
                </p>

                <div className="rounded-xl bg-green-50 p-2.5 text-green-600">
                  <FiCheck />
                </div>
              </div>

              <p className="mt-4 text-3xl font-black">
                {
                  menuItems.filter(
                    (item) => item.available
                  ).length
                }
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Currently available
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Unavailable
                </p>

                <div className="rounded-xl bg-red-50 p-2.5 text-red-500">
                  <FiX />
                </div>
              </div>

              <p className="mt-4 text-3xl font-black">
                {
                  menuItems.filter(
                    (item) => !item.available
                  ).length
                }
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Hidden from customers
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Popular Items
                </p>

                <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600">
                  â˜…
                </div>
              </div>

              <p className="mt-4 text-3xl font-black">
                {
                  menuItems.filter(
                    (item) => item.popular
                  ).length
                }
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Featured menu items
              </p>
            </div>
          </div>

          {/* SEARCH + CATEGORIES */}
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="relative w-full">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search menu items..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setActiveCategory(category)
                    }
                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      activeCategory === category
                        ? "bg-[#151515] text-white"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={async () => {
                    const name = window.prompt(
                      "Enter a new menu category name:"
                    )?.trim();

                    if (!name) return;

                    if (
                      menuCategories.some(
                        (category) =>
                          category.name.toLowerCase() === name.toLowerCase()
                      )
                    ) {
                      window.alert("This category already exists.");
                      return;
                    }

                    try {
                      const response = await fetch(
                        `${RESTAURANT_API_URL}/restaurants/${RESTAURANT_ID}/menu-categories`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ name }),
                        }
                      );

                      if (!response.ok) {
                        throw new Error("Failed to create category");
                      }

                      const createdCategory: ApiMenuCategory =
                        await response.json();

                      setMenuCategories((current) => [
                        ...current,
                        createdCategory,
                      ]);

                      setCategories((current) => [
                        ...current,
                        createdCategory.name,
                      ]);

                      window.alert(
                        `Category "${createdCategory.name}" created successfully!`
                      );
                    } catch (error) {
                      console.error("Create category error:", error);
                      window.alert(
                        "Unable to create category. Please try again."
                      );
                    }
                  }}
                  className="shrink-0 rounded-xl border border-[#FF6B35] px-4 py-2 text-sm font-bold text-[#FF6B35] transition hover:bg-orange-50"
                >
                  + Create Category
                </button>
              </div>
            </div>
          </div>

          {/* MENU GRID */}
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <FiSearch className="text-2xl" />
              </div>

              <h3 className="mt-5 text-xl font-black">
                No menu items found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another search or category.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                    item.available
                      ? "border-gray-200"
                      : "border-red-100"
                  }`}
                >
                  {/* IMAGE */}
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`h-full w-full object-cover transition duration-300 hover:scale-105 ${
                          !item.available
                            ? "grayscale"
                            : ""
                        }`}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-300">
                        <FiImage className="text-4xl" />
                      </div>
                    )}

                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-gray-700 shadow-sm">
                        {item.category}
                      </span>

                      {item.popular && (
                        <span className="rounded-full bg-[#FF6B35] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm">
                          Popular
                        </span>
                      )}
                    </div>

                    {!item.available && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-red-600">
                          Currently Unavailable
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          Preparation:{" "}
                          {item.preparationTime}
                        </p>
                      </div>

                      <p className="whitespace-nowrap text-lg font-black text-[#FF6B35]">
                        â‚¦{item.price.toLocaleString()}
                      </p>
                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                      {item.description}
                    </p>

                    {/* AVAILABILITY */}
                    <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 p-3">
                      <div>
                        <p className="text-xs font-bold">
                          Availability
                        </p>

                        <p
                          className={`mt-0.5 text-[11px] ${
                            item.available
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {item.available
                            ? "Customers can order"
                            : "Hidden from customers"}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          toggleAvailability(item.id)
                        }
                        className={`relative h-6 w-11 rounded-full transition ${
                          item.available
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                        aria-label={`Toggle ${item.name} availability`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                            item.available
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() =>
                          openEditModal(item)
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                      >
                        <FiEdit2 />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteItem(item.id)
                        }
                        className="rounded-xl border border-red-100 px-4 py-2.5 text-red-500 transition hover:bg-red-50"
                        aria-label={`Delete ${item.name}`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Menu Management
                </p>

                <h2 className="mt-1 text-xl font-black">
                  {editingItem
                    ? "Edit Menu Item"
                    : "Add Menu Item"}
                </h2>
              </div>

              <button
                onClick={closeModal}
                className="rounded-xl bg-gray-100 p-2.5 transition hover:bg-gray-200"
              >
                <FiX />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >
              {/* IMAGE */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Food Image
                </label>

                <div className="overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
                  {form.image ? (
                    <div className="relative h-52">
                      <img
                        src={form.image}
                        alt="Food preview"
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            image: "",
                          }))
                        }
                        className="absolute right-3 top-3 rounded-xl bg-white p-2 text-red-500 shadow"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center justify-center px-6 py-10 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#FF6B35] shadow-sm">
                        <FiImage className="text-2xl" />
                      </div>

                      <p className="mt-4 text-sm font-bold">
                        Upload food image
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        PNG, JPG or WEBP
                      </p>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* NAME + CATEGORY */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Item Name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Jollof Rice & Chicken"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Category
                  </label>

                  <div className="relative">
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35]"
                    >
                      {categories
                        .filter(
                          (category) => category !== "All"
                        )
                        .map((category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        ))}
                    </select>

                    <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* PRICE + PREPARATION */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Price
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">
                      â‚¦
                    </span>

                    <input
                      name="price"
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={handleInputChange}
                      placeholder="4500"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-4 text-sm outline-none transition focus:border-[#FF6B35]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Preparation Time
                  </label>

                  <div className="relative">
                    <select
                      name="preparationTime"
                      value={form.preparationTime}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35]"
                    >
                      <option>5 - 10 mins</option>
                      <option>10 - 15 mins</option>
                      <option>15 - 20 mins</option>
                      <option>20 - 25 mins</option>
                      <option>25 - 30 mins</option>
                      <option>30 - 45 mins</option>
                      <option>45 - 60 mins</option>
                    </select>

                    <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe the meal..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35]"
                />
              </div>

              {/* POPULAR */}
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  checked={form.popular}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      popular: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#FF6B35]"
                />

                <div>
                  <p className="text-sm font-bold">
                    Mark as popular
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Popular items can receive additional visibility
                    in your restaurant menu.
                  </p>
                </div>
              </label>

              {/* ACTIONS */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e85c2c]"
                >
                  <FiCheck />
                  {editingItem
                    ? "Save Changes"
                    : "Add Menu Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
