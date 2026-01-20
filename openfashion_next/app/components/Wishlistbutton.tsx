"use client";

import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";
import { addToWishlist, isWishlisted } from "@/app/utils/wishlist";

type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
};

export default function WishlistButton({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isWishlisted(product.id));

    const sync = () => setLiked(isWishlisted(product.id));
    window.addEventListener("wishlistUpdated", sync);

    return () => window.removeEventListener("wishlistUpdated", sync);
  }, [product.id]);

  const handleClick = () => {
    const res = addToWishlist(product);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    setLiked(true);
    toast.success("Added to wishlist 🖤");
  };

  return (
    <button className="wishlist-heart" onClick={handleClick}>
      <FiHeart className={liked ? "heart liked" : "heart"} />
    </button>
  );
}
