
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiArrowRight,
  FiClock,
  FiHeart,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/ShoppingCartContext";

type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type Restaurant = {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: number;
  location: string;
  categories: string[];
  description: string;
  isOpen: boolean;
};

type ApiRestaurant = {
  id: string;
  name: string;
  description: string | null;
  coverImageUrl: string | null;
  logoUrl: string | null;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  isOpen: boolean;
  isActive: boolean;
  status: string;
  estimatedPrepMinutes: number | null;
};

type ApiMenuCategory = {
  id: string;
  restaurantId: string;
  name: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
};

type ApiMenuItem = {
  id: string;
  restaurantId: string;
  menuCategoryId: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: string | number;
  discountPrice: string | number | null;
  status: string;
  preparationMinutes: number | null;
};
const RESTAURANT_API_URL = (
  process.env.NEXT_PUBLIC_RESTAURANT_API_URL ||
  "http://localhost:3003"
).replace(/\/+$/, "");
const FAVOURITES_KEY = "doorstep_favourite_restaurants";

const restaurants: Restaurant[] = [
  {
    id: "chicken-republic",
    name: "Chicken Republic",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=500&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=80",
    rating: 4.6,
    reviews: 428,
    deliveryTime: "25–35 min",
    deliveryFee: 1000,
    location: "Ikeja, Lagos",
    categories: ["Chicken", "Fast Food", "Rice"],
    description:
      "Delicious chicken meals, rice dishes, sides and refreshing drinks.",
    isOpen: true,
  },
  {
    id: "bukka-hut",
    name: "Bukka Hut",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=80",
    rating: 4.5,
    reviews: 315,
    deliveryTime: "30–40 min",
    deliveryFee: 1200,
    location: "Yaba, Lagos",
    categories: ["Nigerian", "Rice", "Soups"],
    description:
      "Authentic Nigerian meals prepared fresh and served with rich local flavours.",
    isOpen: true,
  },
  {
    id: "the-place",
    name: "The Place",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    rating: 4.4,
    reviews: 521,
    deliveryTime: "20–30 min",
    deliveryFee: 900,
    location: "Lekki, Lagos",
    categories: ["Fast Food", "Burgers", "Chicken"],
    description:
      "A popular spot for burgers, chicken, fries, rice and other delicious meals.",
    isOpen: true,
  },
  {
    id: "dominos-pizza",
    name: "Domino's Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1600&q=80",
    rating: 4.7,
    reviews: 689,
    deliveryTime: "25–35 min",
    deliveryFee: 1000,
    location: "Victoria Island, Lagos",
    categories: ["Pizza", "Fast Food", "Drinks"],
    description:
      "Freshly baked pizzas, sides and drinks delivered straight to your door.",
    isOpen: true,
  },
  {
    id: "sweet-sensation",
    name: "Sweet Sensation",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=500&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
    rating: 4.3,
    reviews: 267,
    deliveryTime: "30–40 min",
    deliveryFee: 1100,
    location: "Surulere, Lagos",
    categories: ["Nigerian", "Fast Food", "Snacks"],
    description:
      "Tasty Nigerian dishes, snacks, pastries and refreshing beverages.",
    isOpen: true,
  },
  {
    id: "kilimanjaro",
    name: "Kilimanjaro",
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=500&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80",
    rating: 4.2,
    reviews: 198,
    deliveryTime: "35–45 min",
    deliveryFee: 1300,
    location: "Maryland, Lagos",
    categories: ["Nigerian", "Rice", "Chicken"],
    description:
      "Enjoy a wide variety of Nigerian and continental meals prepared with care.",
    isOpen: true,
  },
  {
    id: "shawarma-house",
    name: "Shawarma House",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=500&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=1600&q=80",
    rating: 4.5,
    reviews: 342,
    deliveryTime: "20–30 min",
    deliveryFee: 800,
    location: "Gbagada, Lagos",
    categories: ["Shawarma", "Chicken", "Fast Food"],
    description:
      "Loaded shawarmas, grilled chicken, fries and delicious sides.",
    isOpen: true,
  },
  {
    id: "lagos-grill",
    name: "Lagos Grill",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1600&q=80",
    rating: 4.6,
    reviews: 401,
    deliveryTime: "30–40 min",
    deliveryFee: 1200,
    location: "Ikoyi, Lagos",
    categories: ["Grills", "Chicken", "Beef"],
    description:
      "Grilled chicken, beef, fish and other delicious meals prepared fresh.",
    isOpen: true,
  },
];

const menuItems: Record<string, FoodItem[]> = {
  "chicken-republic": [
    {
      id: "cr-001",
      name: "Chicken & Chips",
      description: "Crispy fried chicken served with golden fries.",
      price: 6500,
      image:
        "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=700&q=80",
      category: "Chicken",
    },
    {
      id: "cr-002",
      name: "Chicken & Rice",
      description: "Tender chicken served with delicious seasoned rice.",
      price: 5500,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80",
      category: "Rice",
    },
    {
      id: "cr-003",
      name: "Chicken Burger",
      description: "Crispy chicken fillet, vegetables and special sauce.",
      price: 6000,
      image:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=700&q=80",
      category: "Fast Food",
    },
    {
      id: "cr-004",
      name: "Spicy Chicken",
      description: "Juicy spicy chicken with a delicious Nigerian twist.",
      price: 7000,
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=700&q=80",
      category: "Chicken",
    },
  ],

  "bukka-hut": [
    {
      id: "bh-001",
      name: "Jollof Rice & Chicken",
      description: "Smoky Nigerian jollof rice served with grilled chicken.",
      price: 5500,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80",
      category: "Rice",
    },
    {
      id: "bh-002",
      name: "Pounded Yam & Egusi",
      description: "Soft pounded yam served with rich egusi soup.",
      price: 6500,
      image:
        "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=700&q=80",
      category: "Soups",
    },
    {
      id: "bh-003",
      name: "Fried Rice & Beef",
      description: "Seasoned fried rice with tender beef.",
      price: 6000,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80",
      category: "Rice",
    },
  ],

  "the-place": [
    {
      id: "tp-001",
      name: "Classic Burger",
      description: "Juicy beef burger with cheese, lettuce and special sauce.",
      price: 6500,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
      category: "Burgers",
    },
    {
      id: "tp-002",
      name: "Chicken & Chips",
      description: "Crispy chicken served with seasoned fries.",
      price: 7000,
      image:
        "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=700&q=80",
      category: "Chicken",
    },
    {
      id: "tp-003",
      name: "Jollof Rice",
      description:
        "Rich Nigerian jollof rice served with your choice of protein.",
      price: 5500,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80",
      category: "Fast Food",
    },
  ],

  "dominos-pizza": [
    {
      id: "dp-001",
      name: "Chicken Suya Pizza",
      description: "Pizza topped with chicken suya, peppers and cheese.",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80",
      category: "Pizza",
    },
    {
      id: "dp-002",
      name: "Pepperoni Pizza",
      description: "Classic pepperoni pizza with mozzarella cheese.",
      price: 11000,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80",
      category: "Pizza",
    },
    {
      id: "dp-003",
      name: "Chicken Wings",
      description:
        "Crispy chicken wings served with your favourite sauce.",
      price: 7500,
      image:
        "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=80",
      category: "Fast Food",
    },
  ],

  "sweet-sensation": [
    {
      id: "ss-001",
      name: "Chicken & Chips",
      description: "Crispy chicken served with golden fries.",
      price: 6000,
      image:
        "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=700&q=80",
      category: "Fast Food",
    },
    {
      id: "ss-002",
      name: "Meat Pie",
      description: "Freshly baked Nigerian meat pie.",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
      category: "Snacks",
    },
    {
      id: "ss-003",
      name: "Jollof Rice",
      description: "Delicious Nigerian jollof rice with chicken.",
      price: 5500,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80",
      category: "Nigerian",
    },
  ],

  kilimanjaro: [
    {
      id: "km-001",
      name: "Jollof Rice & Chicken",
      description: "Classic Nigerian jollof rice with grilled chicken.",
      price: 5500,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80",
      category: "Rice",
    },
    {
      id: "km-002",
      name: "Fried Rice & Chicken",
      description: "Seasoned fried rice served with chicken.",
      price: 6000,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80",
      category: "Rice",
    },
    {
      id: "km-003",
      name: "Grilled Chicken",
      description: "Juicy grilled chicken served with a tasty side.",
      price: 7000,
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=700&q=80",
      category: "Chicken",
    },
  ],

  "shawarma-house": [
    {
      id: "sh-001",
      name: "Chicken Shawarma",
      description:
        "Loaded chicken shawarma with vegetables and creamy sauce.",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=80",
      category: "Shawarma",
    },
    {
      id: "sh-002",
      name: "Beef Shawarma",
      description:
        "Tender beef wrapped with fresh vegetables and sauce.",
      price: 5500,
      image:
        "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=700&q=80",
      category: "Shawarma",
    },
    {
      id: "sh-003",
      name: "Chicken & Fries",
      description: "Grilled chicken served with crispy fries.",
      price: 6500,
      image:
        "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=700&q=80",
      category: "Chicken",
    },
  ],

  "lagos-grill": [
    {
      id: "lg-001",
      name: "Grilled Chicken",
      description: "Juicy grilled chicken with a smoky flavour.",
      price: 7500,
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=700&q=80",
      category: "Chicken",
    },
    {
      id: "lg-002",
      name: "Grilled Beef",
      description:
        "Tender grilled beef prepared with special seasoning.",
      price: 8500,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
      category: "Beef",
    },
    {
      id: "lg-003",
      name: "Grilled Fish",
      description: "Fresh grilled fish served with tasty sides.",
      price: 9000,
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80",
      category: "Grills",
    },
  ],
};

function mapApiRestaurant(api: ApiRestaurant): Restaurant {
  return {
    id: api.id,
    name: api.name,
    image: api.logoUrl || "/placeholder-food.svg",
    coverImage: api.coverImageUrl || "/placeholder-food.svg",
    rating: 0,
    reviews: 0,
    deliveryTime: "",
    deliveryFee: 0,
    location: [
      api.streetAddress,
      api.city,
      api.state,
    ].filter(Boolean).join(", "),
    categories: [],
    description: api.description || "",
    isOpen: api.isOpen && api.isActive && api.status === "APPROVED",
  };
}
function mapApiMenuItems(
  apiItems: ApiMenuItem[],
  apiCategories: ApiMenuCategory[]
): FoodItem[] {
  const categoryNames = new Map(
    apiCategories
      .filter((category) => category.isActive)
      .map((category) => [category.id, category.name])
  );

  return apiItems
    .filter(
      (item) =>
        item.status === "AVAILABLE" &&
        categoryNames.has(item.menuCategoryId)
    )
    .map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      price: Number(item.price),
      image: item.imageUrl || "/placeholder-food.svg",
      category: categoryNames.get(item.menuCategoryId) || "Other",
    }))
    .filter(
      (item) =>
        Number.isFinite(item.price) &&
        item.price > 0
    );
}
export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();

  const restaurantId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const demoRestaurant = restaurants.find(
    (item) => item.id === restaurantId
  );
  const [liveRestaurant, setLiveRestaurant] =
    useState<ApiRestaurant | null>(null);

  const [liveCategories, setLiveCategories] =
    useState<ApiMenuCategory[]>([]);

  const [liveMenuItems, setLiveMenuItems] =
    useState<ApiMenuItem[]>([]);

  const [liveLoading, setLiveLoading] = useState(true);
  const [loadedRestaurantId, setLoadedRestaurantId] = useState<string | null>(null);

  const [liveError, setLiveError] = useState<string | null>(null);
  const [liveMenuError, setLiveMenuError] = useState<string | null>(null);
  const [liveMenuLoading, setLiveMenuLoading] = useState(true);
  const [liveMenuRestaurantId, setLiveMenuRestaurantId] = useState<string | null>(null);
  const [completedMenuRestaurantId, setCompletedMenuRestaurantId] = useState<string | null>(null);
  const currentLiveRestaurant =
    liveRestaurant?.id === restaurantId ? liveRestaurant : null;

  const restaurant: Restaurant | undefined =
    demoRestaurant ||
    (currentLiveRestaurant
      ? mapApiRestaurant(currentLiveRestaurant)
      : undefined);
  useEffect(() => {
    if (!restaurantId) {
      setLiveCategories([]);
      setLiveMenuItems([]);
      return;
    }

    const controller = new AbortController();

    async function fetchLiveMenu() {
      setLiveMenuLoading(true);
      setCompletedMenuRestaurantId(null);
      setLiveMenuRestaurantId(null);
      setLiveMenuError(null);
      setLiveCategories([]);
      setLiveMenuItems([]);
      if (!restaurantId) return;

      try {
        const encodedId = encodeURIComponent(restaurantId);

        const [categoriesResponse, itemsResponse] = await Promise.all([
          fetch(
            `${RESTAURANT_API_URL}/restaurants/${encodedId}/public-menu-categories`,
            { signal: controller.signal }
          ),
          fetch(
            `${RESTAURANT_API_URL}/restaurants/${encodedId}/public-menu-items`,
            { signal: controller.signal }
          ),
        ]);

        if (!categoriesResponse.ok || !itemsResponse.ok) {
          throw new Error("Unable to load restaurant menu.");
        }

        const categories: ApiMenuCategory[] =
          await categoriesResponse.json();

        const items: ApiMenuItem[] =
          await itemsResponse.json();

        if (!controller.signal.aborted) {
          setLiveCategories(categories);
          setLiveMenuItems(items);
          setLiveMenuRestaurantId(restaurantId);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setLiveCategories([]);
          setLiveMenuItems([]);
          setLiveMenuError(
            error instanceof Error
              ? error.message
              : "Unable to load restaurant menu."
          );
        }
        } finally {
          if (!controller.signal.aborted) {
            setCompletedMenuRestaurantId(restaurantId);
            setLiveMenuLoading(false);
          }
        }
      }

void fetchLiveMenu();

    return () => controller.abort();
  }, [restaurantId]);
  useEffect(() => {
    if (!restaurantId) {
      setLiveLoading(false);
      setLiveError("Restaurant ID is missing.");
      return;
    }

    const controller = new AbortController();

    async function fetchLiveRestaurant() {
      if (!restaurantId) return;

      setLiveLoading(true);
      setLoadedRestaurantId(null);
      setLiveError(null);
      setLiveRestaurant(null);

      try {
        const response = await fetch(
          `${RESTAURANT_API_URL}/restaurants/public/${encodeURIComponent(restaurantId)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Restaurant not found or not yet approved.");
          }

          throw new Error("Unable to load restaurant details.");
        }

        const data: ApiRestaurant = await response.json();

        if (!controller.signal.aborted) {
          setLiveRestaurant(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setLiveError(
            error instanceof Error
              ? error.message
              : "Unable to load restaurant details."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadedRestaurantId(restaurantId);
          setLiveLoading(false);
        }
      }
    }

    void fetchLiveRestaurant();

    return () => controller.abort();
  }, [restaurantId]);

  const {
    addToCart,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
  } = useCart();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorite, setFavorite] = useState(false);

  /*
   * Load the current restaurant's favourite status.
   */
  useEffect(() => {
    if (!restaurant) return;

    try {
      const saved = localStorage.getItem(FAVOURITES_KEY);

      if (!saved) {
        setFavorite(false);
        return;
      }

      const savedIds: string[] = JSON.parse(saved);

      setFavorite(savedIds.includes(restaurant.id));
    } catch (error) {
      console.error(
        "Failed to load favourite restaurant:",
        error
      );

      setFavorite(false);
    }
  }, [restaurant]);

  /*
   * Add/remove restaurant from favourites.
   */
  const toggleFavourite = () => {
    if (!restaurant) return;

    try {
      const saved = localStorage.getItem(FAVOURITES_KEY);

      const savedIds: string[] = saved
        ? JSON.parse(saved)
        : [];

      let updatedIds: string[];

      if (savedIds.includes(restaurant.id)) {
        updatedIds = savedIds.filter(
          (id) => id !== restaurant.id
        );

        setFavorite(false);
      } else {
        updatedIds = [...savedIds, restaurant.id];

        setFavorite(true);
      }

      localStorage.setItem(
        FAVOURITES_KEY,
        JSON.stringify(updatedIds)
      );
    } catch (error) {
      console.error(
        "Failed to update favourite restaurant:",
        error
      );
    }
  };

  const items = demoRestaurant
    ? menuItems[demoRestaurant.id] || []
    : currentLiveRestaurant &&
        !liveMenuLoading &&
        liveMenuRestaurantId === restaurantId
      ? mapApiMenuItems(liveMenuItems, liveCategories)
      : [];

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(items.map((item) => item.category))
      ),
    ];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, selectedCategory]);

  const getQuantity = (foodId: string) => {
    const item = cartItems.find(
      (cartItem: any) =>
        cartItem.id === foodId &&
        cartItem.restaurantId === restaurant?.id
    );

    return item?.quantity || 0;
  };

  const handleAddToCart = (item: FoodItem) => {
    if (!restaurant || !restaurant.isOpen) return;

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      description: item.description,
    });
  };

  /*
   * Restaurant not found.
   */
  if (!demoRestaurant && (liveLoading || loadedRestaurantId !== restaurantId)) {
    return (
      <div className="min-h-screen bg-[#FFF8F3]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="max-w-md text-center" role="status" aria-live="polite">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-[#FF6B35]" />

            <h1 className="mt-6 text-2xl font-black text-gray-950">
              Loading restaurant details...
            </h1>

            <p className="mt-3 text-gray-600">
              Please wait while we fetch the restaurant information.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
  if (
    !demoRestaurant &&
    !liveLoading &&
    liveError &&
    liveError !== "Restaurant not found or not yet approved."
  ) {
    return (
      <div className="min-h-screen bg-[#FFF8F3]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="max-w-md text-center" role="alert">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
              Connection Problem
            </p>

            <h1 className="mt-3 text-3xl font-black text-gray-950">
              Unable to load this restaurant right now.
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              Please check your connection and try again shortly.
            </p>

            <button
              type="button"
              onClick={() => router.push("/restaurants")}
              className="mt-7 rounded-full bg-[#FF6B35] px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Back to Restaurants
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
  if (!restaurant) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center bg-[#FFF8F3] px-6">
          <div className="max-w-md text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
              Restaurant Not Found
            </p>

            <h1 className="mt-3 text-4xl font-black text-gray-950">
              We couldn't find this restaurant.
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              The restaurant may have been removed or the link may
              be incorrect.
            </p>

            <button
              type="button"
              onClick={() => router.push("/restaurants")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              <FiArrowLeft />
              Back to Restaurants
            </button>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="relative h-[260px] sm:h-[320px]">
            <img
              src={restaurant.coverImage}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

            {/* BACK BUTTON */}
            <motion.button
              type="button"
              onClick={() => router.back()}
              whileTap={{ scale: 0.9 }}
              className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-lg transition hover:bg-white"
              aria-label="Go back"
            >
              <FiArrowLeft />
            </motion.button>

            {/* FAVOURITE BUTTON */}
            <motion.button
              type="button"
              onClick={toggleFavourite}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.05 }}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:bg-white"
              aria-label={
                favorite
                  ? `Remove ${restaurant.name} from favourites`
                  : `Add ${restaurant.name} to favourites`
              }
              aria-pressed={favorite}
            >
              <FiHeart
                className={`text-xl transition ${
                  favorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-900"
                }`}
              />
            </motion.button>

            {/* HERO DETAILS */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="mx-auto max-w-7xl px-5 pb-7 lg:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-3 py-1.5 text-xs font-bold text-white">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          restaurant.isOpen
                            ? "bg-green-300"
                            : "bg-red-300"
                        }`}
                      />

                      {restaurant.isOpen
                        ? "Open Now"
                        : "Closed"}
                    </div>

                    <h1 className="text-3xl font-black text-white sm:text-4xl">
                      {restaurant.name}
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm text-gray-200 sm:text-base">
                      {restaurant.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm text-white">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-2 backdrop-blur">
                      <FiStar className="fill-yellow-400 text-yellow-400" />
                      {restaurant.rating}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-2 backdrop-blur">
                      <FiClock />
                      {restaurant.deliveryTime}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-2 backdrop-blur">
                      <FiMapPin />
                      {restaurant.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESTAURANT INFO */}
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-5 px-5 py-5 text-sm text-gray-600 lg:px-8">
            <span className="inline-flex items-center gap-2">
              <FiStar className="text-yellow-500" />

              <strong className="text-gray-900">
                {restaurant.rating}
              </strong>

              ({restaurant.reviews} reviews)
            </span>

            <span className="h-4 w-px bg-gray-200" />

            <span className="inline-flex items-center gap-2">
              <FiClock />
              {restaurant.deliveryTime}
            </span>

            <span className="h-4 w-px bg-gray-200" />

            <span>
              Delivery from{" "}
              <strong className="text-gray-900">
                ₦{restaurant.deliveryFee.toLocaleString()}
              </strong>
            </span>
          </div>
        </section>

        {/* MENU */}
        <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                Menu
              </p>

              <h2 className="mt-2 text-3xl font-black text-gray-950">
                What would you like?
              </h2>
            </div>

            <div className="relative w-full md:max-w-sm">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search menu..."
                className="w-full rounded-full border border-gray-200 bg-white py-3.5 pl-11 pr-5 text-sm outline-none transition focus:border-[#FF6B35]"
              />
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  selectedCategory === category
                    ? "bg-[#FF6B35] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-orange-50 hover:text-[#FF6B35]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {!demoRestaurant && completedMenuRestaurantId === restaurantId && liveMenuError && (
            <div
              role="alert"
              className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6"
            >
              <h3 className="text-lg font-black text-gray-950">
                We're having trouble loading this menu.
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Please try again shortly. The restaurant information is still
                available above.
              </p>
            </div>
          )}
          {!demoRestaurant && (completedMenuRestaurantId !== restaurantId || liveMenuLoading) && (
            <div
              className="mt-8 rounded-3xl bg-white px-6 py-14 text-center shadow-sm"
              role="status"
              aria-live="polite"
            >
              <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-orange-100 border-t-[#FF6B35]" />
              <h3 className="mt-5 text-xl font-black text-gray-950">
                Loading menu...
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                We're fetching the available meals for you.
              </p>
            </div>
          )}
          {/* FOOD GRID */}
          {!demoRestaurant && (completedMenuRestaurantId !== restaurantId || liveMenuLoading || liveMenuError) ? null : filteredItems.length > 0 ? (
            <motion.div
              className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {filteredItems.map((item) => {
                const quantity = getQuantity(item.id);

                return (
                  <motion.article
                    key={item.id}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 25,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-xl"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />

                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-black text-gray-950">
                        {item.name}
                      </h3>

                      <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                        {item.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <p className="text-lg font-black text-gray-950">
                          ₦{item.price.toLocaleString()}
                        </p>

                        {quantity === 0 ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleAddToCart(item)
                            }
                            disabled={!restaurant.isOpen}
                            className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
                          >
                            <FiPlus />
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-3 rounded-full bg-orange-50 p-1">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm transition hover:bg-gray-100"
                              aria-label={`Remove one ${item.name}`}
                            >
                              <FiMinus />
                            </button>

                            <span className="min-w-[20px] text-center font-black text-gray-900">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                if (restaurant.isOpen) {
                                  increaseQuantity(item.id);
                                }
                              }}
                              disabled={!restaurant.isOpen}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B35] text-white shadow-sm transition hover:bg-orange-600"
                              aria-label={`Add another ${item.name}`}
                            >
                              <FiPlus />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : (
            <div className="mt-10 rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
              <FiSearch className="mx-auto text-4xl text-gray-300" />

              <h3 className="mt-4 text-xl font-black text-gray-950">
                No meals found
              </h3>

              <p className="mt-2 text-gray-500">
                Try another search or select a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-5 rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* FLOATING CART */}
      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-32px)] max-w-lg -translate-x-1/2"
        >
          <Link
            href="/cart"
            className="flex items-center justify-between rounded-2xl bg-gray-950 px-5 py-4 text-white shadow-2xl transition hover:bg-gray-900"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6B35]">
                <FiShoppingBag className="text-xl" />

                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-black text-gray-950">
                  {totalItems}
                </span>
              </div>

              <div>
                <p className="text-sm font-bold">
                  {totalItems} item
                  {totalItems !== 1 ? "s" : ""} in cart
                </p>

                <p className="text-xs text-gray-400">
                  Ready to checkout
                </p>
              </div>
            </div>

            <span className="flex items-center gap-2 text-sm font-bold">
              View Cart
              <FiArrowRight />
            </span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
