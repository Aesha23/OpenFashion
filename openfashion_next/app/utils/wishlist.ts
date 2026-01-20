import { isLoggedIn, SESSION_KEY } from "./auth";

export type WishlistProduct = {
  id: string; 
  name: string;
  price: number;
  img: string;
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

const getWishlistKey = (): string | null => {
  const email = getCurrentUserEmail();
  return email ? `wishlist_${email}` : null;
};

export const getWishlist = (): WishlistProduct[] => {
  if (typeof window === "undefined") return [];

  const key = getWishlistKey();
  if (!key) return [];

  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const isWishlisted = (id: string): boolean => {
  if (typeof window === "undefined") return false;

  const key = getWishlistKey();
  if (!key) return false;

  const wishlist: WishlistProduct[] = JSON.parse(
    localStorage.getItem(key) || "[]",
  );

  return wishlist.some((item) => item.id === id);
};

export const addToWishlist = (
  product: WishlistProduct,
): { success: boolean; message?: string } => {
  if (!isLoggedIn()) {
    return { success: false, message: "Please login to use wishlist" };
  }

  const key = getWishlistKey();
  if (!key) {
    return { success: false, message: "Please login to use wishlist" };
  }

  const wishlist = getWishlist();

  if (wishlist.some((item) => item.id === product.id)) {
    return { success: false, message: "Already wishlisted" };
  }

  localStorage.setItem(key, JSON.stringify([...wishlist, product]));
  window.dispatchEvent(new Event("wishlistUpdated"));

  return { success: true };
};

export const removeFromWishlist = (id: string): void => {
  const key = getWishlistKey();
  if (!key) return;

  const wishlist = getWishlist().filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(wishlist));
  window.dispatchEvent(new Event("wishlistUpdated"));
};
