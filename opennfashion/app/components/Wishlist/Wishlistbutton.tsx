"use client";

import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { isWishlisted, toggleWishlist } from "@/app/utils/wishlist";

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

export default function WishlistButton({ product }: { product: Product }) {
  const [liked, setLiked] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    if (product?.id) {
      setLiked(isWishlisted(product.id));
    }
  }, [product]);

  const handleClick = () => {
    if (!product) return;

    const result = toggleWishlist(product);

    if (!result.success) {
      alert(result.message);
      return;
    }

    setLiked(isWishlisted(product.id));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  if (!product) return null;

  return (
    <div className="wishlist-wrapper">
      {liked ? (
        <FaHeart className="wishlist-heart liked" onClick={handleClick} />
      ) : (
        <FaRegHeart className="wishlist-heart" onClick={handleClick} />
      )}

      {showToast && (
        <div className="wishlist-toast">
          {liked ? "Added to Wishlist" : "Removed From Wishlist"}
        </div>
      )}
    </div>
  );
}
