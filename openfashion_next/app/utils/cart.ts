import toast from "react-hot-toast";
import { Product } from "@/app/utils/products";

export const SESSION_KEY = "sessionUser";
const LAST_USER_KEY = "lastUserEmail";

export type CartItem = Product & {
  quantity: number;
};

const getCurrentUserEmail = (): string | null => {
  if (typeof window === "undefined") return null;

  const session = localStorage.getItem(SESSION_KEY);
  if (session) {
    try {
      const parsed = JSON.parse(session);
      if (parsed?.email) {
        localStorage.setItem(LAST_USER_KEY, parsed.email);
        return parsed.email;
      }
    } catch {}
  }

  return localStorage.getItem(LAST_USER_KEY);
};

const getCartKey = (): string | null => {
  const email = getCurrentUserEmail();
  return email ? `cart_${email}` : null;
};

const notifyCartUpdate = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  const key = getCartKey();
  if (!key) return [];

  try {
    const cart = JSON.parse(localStorage.getItem(key) || "[]");

    return cart.map((item: any) => ({
      ...item,
      img:
        typeof item.img === "string" && item.img.startsWith("/")
          ? item.img
          : item.image || "/placeholder.png",
      quantity: Number(item.quantity) || 1,
    }));
  } catch {
    return [];
  }
};

export const addToCart = (product: Product): boolean => {
  if (typeof window === "undefined") return false;

  const key = getCartKey();
  if (!key) {
    toast.error("Please login to add items to cart");
    return false;
  }

  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(key, JSON.stringify(cart));
  notifyCartUpdate();
  return true;
};

export const removeFromCart = (id: number): void => {
  if (typeof window === "undefined") return;

  const key = getCartKey();
  if (!key) return;

  const cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(cart));
  notifyCartUpdate();
};

export const clearCart = (): void => {
  if (typeof window === "undefined") return;

  const key = getCartKey();
  if (!key) return;

  localStorage.removeItem(key);
  notifyCartUpdate();
};

export const updateCart = (updatedCart: CartItem[]): void => {
  if (typeof window === "undefined") return;

  const key = getCartKey();
  if (!key) return;

  localStorage.setItem(key, JSON.stringify(updatedCart));
  notifyCartUpdate();
};

export const getCartCount = (): number => {
  return getCart().length;
};
