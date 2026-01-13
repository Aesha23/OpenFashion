import { isLoggedIn } from "./auth";

export type WishlistProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const KEY = "wishlist";

const notifyWishlistUpdate = () => {
  console.log("📢 Dispatching wishlistUpdated event");
  const event = new Event("wishlistUpdated", { bubbles: true });
  window.dispatchEvent(event);
  console.log("✅ Event dispatched successfully");
};

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
  console.log("❤️ toggleWishlist called with:", product);

  if (!isLoggedIn()) {
    console.log("❌ Not logged in");
    return {
      success: false,
      message: "Please login to use wishlist",
    };
  }

  if (!product?.id) {
    console.log("❌ No product ID");
    return { success: false };
  }

  let wishlist = getWishlist();
  console.log("📦 Current wishlist:", wishlist);

  const exists = wishlist.find((item) => item.id === product.id);

  if (exists) {
    wishlist = wishlist.filter((item) => item.id !== product.id);
    console.log("🗑️ Removed from wishlist");
  } else {
    wishlist.push(product);
    console.log("✅ Added to wishlist");
  }

  localStorage.setItem(KEY, JSON.stringify(wishlist));
  console.log("💾 Saved to localStorage:", wishlist);
  notifyWishlistUpdate();
  return { success: true };
};
