"use client";

import { useEffect, useState } from "react";
import {
  getWishlist,
  removeFromWishlist,
  WishlistProduct,
} from "../utils/wishlist";
import { addToCart } from "@/app/utils/cart";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoHeartDislikeSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);

  useEffect(() => {
    setMounted(true);
    setWishlist(getWishlist());
  }, []);

  const handleAddToCart = (product: WishlistProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });

    removeFromWishlist(product.id);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    toast.success("Added to cart");
  };

  const handleRemove = (product: WishlistProduct) => {
    removeFromWishlist(product.id);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    toast.error("Removed From Wishlist!");
  };

  if (!mounted) return null;

  if (!wishlist.length) {
    return <h2 className="empty-wishlist">Wishlist is empty 🤍</h2>;
  }

  return (
    <div className="page-container">
      <h2>MY FAVORITES 🖤</h2>

      <div className="product-grid">
        {wishlist.map((product) => (
          <div key={product.id} className="product-wishlist">
            <div className="image-wrapper">
              <img src={product.img} alt={product.name} />
            </div>

            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <div className="icons">
              <MdOutlineAddShoppingCart
                className="add-cart-icon"
                onClick={() => handleAddToCart(product)}
              />

              <IoHeartDislikeSharp
                className="r-w"
                onClick={() => handleRemove(product)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
