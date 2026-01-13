"use client";

import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";

const CART_UPDATED_EVENT = "cartUpdated";
const STORAGE_EVENT = "storage";

type CartItem = {
  id: number;
  quantity: number;
};

export const useCart = (): number => {
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    const updateCartQty = () => {
      const cart: CartItem[] = getCart();
      const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartQty(totalQty);
    };

    updateCartQty();

    window.addEventListener(CART_UPDATED_EVENT, updateCartQty);
    window.addEventListener(STORAGE_EVENT, updateCartQty);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCartQty);
      window.removeEventListener(STORAGE_EVENT, updateCartQty);
    };
  }, []);

  return cartQty;
};
