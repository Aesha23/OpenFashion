"use client";

import { useSyncExternalStore } from "react";
import { getWishlist } from "../utils/wishlist";
import { isLoggedIn } from "../utils/auth";

const subscribe = (callback: () => void) => {
  window.addEventListener("wishlistUpdated", callback);
  window.addEventListener("authChanged", callback);

  return () => {
    window.removeEventListener("wishlistUpdated", callback);
    window.removeEventListener("authChanged", callback);
  };
};

const getSnapshot = () => {
  if (!isLoggedIn()) return 0;

  return getWishlist().length;
};

export const useWishlist = (): number => {
  return useSyncExternalStore(subscribe, getSnapshot, () => 0);
};
