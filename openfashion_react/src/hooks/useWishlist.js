import { useCallback, useState } from "react";
import { isWishlisted, toggleWishlist } from "../utils/wishlist";
import { TOAST_DURATION } from "../constants/appConstants";

export const useWishlist = (product) => {
  const [liked, setLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToggleWishlist = useCallback(() => {
    if (!product) return;

    toggleWishlist(product);
    setLiked(isWishlisted(product.id));
    setShowToast(true);
    setTimeout(() => setShowToast(false), TOAST_DURATION);
  }, [product]);

  return { liked, showToast, handleToggleWishlist };
};
