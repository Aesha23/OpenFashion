import toast from "react-hot-toast";

export const SESSION_KEY = "sessionUser";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const getCurrentUserEmail = (): string | null => {
  if (typeof window === "undefined") return null;

  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return null;

  try {
    const parsed = JSON.parse(session);
    return parsed?.email || null;
  } catch {
    return null;
  }
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

  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToCart = (product: Product): boolean => {
  if (typeof window === "undefined") return false;

  const key = getCartKey();
  if (!key) {
    toast.error("Please login to add items to cart");
    notifyCartUpdate();
    return false;
  }

  const cart: CartItem[] = getCart();
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
  return getCart().reduce((total, item) => total + item.quantity, 0);
};
