"use client";

import { useEffect, useState } from "react";
import { getWishlist } from "../utils/wishlist";

export const useWishlist = (): number => {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      const count = getWishlist().length;
      setWishlistCount(count);
    };

    updateWishlistCount();

    window.addEventListener("wishlistUpdated", updateWishlistCount);
    window.addEventListener("storage", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
      window.removeEventListener("storage", updateWishlistCount);
    };
  }, []);

  return wishlistCount;
};
