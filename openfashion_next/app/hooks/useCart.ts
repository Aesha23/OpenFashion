"use client";

import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";

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

    window.addEventListener("cartUpdated", updateCartQty);
    window.addEventListener("storage", updateCartQty);

    return () => {
      window.removeEventListener("cartUpdated", updateCartQty);
      window.removeEventListener("storage", updateCartQty);
    };
  }, []);

  return cartQty;
};
