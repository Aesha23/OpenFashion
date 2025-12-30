import { isLoggedIn } from "./auth";

export type WishlistProduct = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

const KEY = "wishlist";

export const getWishlist = (): WishlistProduct[] => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const isWishlisted = (id: number): boolean => {
  return getWishlist().some((item) => item.id === id);
};

export const toggleWishlist = (
  product: WishlistProduct
): { success: boolean; message?: string } => {
  if (!isLoggedIn()) {
    return {
      success: false,
      message: "Please login to use wishlist",
    };
  }

  if (!product?.id) {
    return { success: false };
  }

  let wishlist = getWishlist();
  const exists = wishlist.find((item) => item.id === product.id);

  if (exists) {
    wishlist = wishlist.filter((item) => item.id !== product.id);
  } else {
    wishlist.push(product);
  }

  localStorage.setItem(KEY, JSON.stringify(wishlist));
  return { success: true };
};
