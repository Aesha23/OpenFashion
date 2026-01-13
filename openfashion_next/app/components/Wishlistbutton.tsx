"use client";

import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";
import { isWishlisted, toggleWishlist } from "@/app/utils/wishlist";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function WishlistButton({ product }: { product: Product }) {
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (product?.id) {
      setLiked(isWishlisted(product.id));
    }
  }, [product]);

  if (!product) return null;

  const handleToggle = () => {
    const result = toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    if (!result.success) {
      toast.error(result.message || "Please login to use wishlist");
      return;
    }

    const nowWishlisted = isWishlisted(product.id);
    setLiked(nowWishlisted);
    toast.success(nowWishlisted ? "Added to wishlist" : "Removed from wishlist");
  };

  return (
    <div className="wishlist-wrapper">
      <button className="wishlist-heart" onClick={handleToggle} aria-pressed={liked}>
        <FiHeart style={{ color: liked ? "#c0392b" : undefined }} />
      </button>
    </div>
  );
}
