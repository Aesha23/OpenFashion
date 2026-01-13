import { useEffect, useState } from "react";
import { isWishlisted, toggleWishlist } from "../../utils/wishlist";
import "./WishlistButton.css";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { TOAST_DURATION } from "../../constants/appConstants";

export default function WishlistButton({ product }) {
  const [liked, setLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (product?.id) {
      setLiked(isWishlisted(product.id));
    }
  }, [product]);

  const handleClick = () => {
    if (!product) return;

    toggleWishlist(product);

    setLiked(isWishlisted(product.id));

    setShowToast(true);
    setTimeout(() => setShowToast(false), TOAST_DURATION);
  };

  if (!product) return null;

  return (
    <div className="wishlist-wrapper" onClick={handleClick}>
      {liked ? (
        <FaHeart className="wishlist-heart liked" />
      ) : (
        <FaRegHeart className="wishlist-heart" />
      )}

      {showToast && (
        <div className="wishlist-toast">
          {liked ? "Added to Wishlist" : "Removed From Wishlist"}
        </div>
      )}
    </div>
  );
}
