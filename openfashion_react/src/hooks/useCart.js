import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";

export const useCart = () => {
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    const updateCartQty = () => {
      const cart = getCart();
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

  return { cartQty };
};
