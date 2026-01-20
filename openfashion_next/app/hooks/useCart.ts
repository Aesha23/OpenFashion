"use client";

import { useSyncExternalStore } from "react";
import { getCart } from "../utils/cart";
import { isLoggedIn } from "../utils/auth";

const subscribe = (callback: () => void) => {
  window.addEventListener("cartUpdated", callback);
  window.addEventListener("authChanged", callback);

  return () => {
    window.removeEventListener("cartUpdated", callback);
    window.removeEventListener("authChanged", callback);
  };
};

const getSnapshot = () => {
  if (!isLoggedIn()) return 0;

  return getCart().length;
};

export const useCart = (): number => {
  return useSyncExternalStore(subscribe, getSnapshot, () => 0);
};
