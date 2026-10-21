
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
  description?: string;
};

type AddToCartItem = Omit<CartItem, "quantity">;

type ShoppingCartContextType = {
  cartItems: CartItem[];

  addToCart: (item: AddToCartItem) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;

  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
};

const ShoppingCartContext = createContext<
  ShoppingCartContextType | undefined
>(undefined);

const CART_KEY = "doorstep_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /*
   * Load saved cart
   */
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("Unable to load Door-Step cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /*
   * Save cart whenever it changes
   */
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Unable to save Door-Step cart:", error);
    }
  }, [cartItems, isLoaded]);

  /*
   * Add product to cart
   */
  const addToCart = (item: AddToCartItem) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.restaurantId === item.restaurantId
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.restaurantId === item.restaurantId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  /*
   * Remove product completely
   */
  const removeFromCart = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  /*
   * Increase product quantity
   */
  const increaseQuantity = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  /*
   * Decrease product quantity
   */
  const decreaseQuantity = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /*
   * Empty the entire cart
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /*
   * Total number of products
   */
  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  /*
   * Product subtotal
   */
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  /*
   * Delivery fee
   *
   * This is currently a demo fee.
   * Later we will calculate it using:
   * - Distance
   * - Vehicle type
   * - Restaurant location
   * - Customer location
   */
  const deliveryFee = useMemo(() => {
    if (cartItems.length === 0) {
      return 0;
    }

    return 1200;
  }, [cartItems]);

  /*
   * Door-Step service fee
   *
   * Current demo:
   * 5% of subtotal
   */
  const serviceFee = useMemo(() => {
    if (cartItems.length === 0) {
      return 0;
    }

    return Math.round(subtotal * 0.05);
  }, [subtotal, cartItems.length]);

  /*
   * Final amount
   */
  const total = useMemo(() => {
    return subtotal + deliveryFee + serviceFee;
  }, [subtotal, deliveryFee, serviceFee]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,

        totalItems,
        subtotal,
        deliveryFee,
        serviceFee,
        total,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

/*
 * Custom hook
 */
export function useCart() {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
