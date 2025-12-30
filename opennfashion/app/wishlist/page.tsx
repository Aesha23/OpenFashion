"use client";

import { useEffect, useState } from "react";
import { getWishlist, toggleWishlist } from "../utils/wishlist";
import { addToCart } from "@/app/utils/cart";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoHeartDislikeSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleAddToCart = (item: Product) => {
    addToCart(item);
    toggleWishlist(item);
    setWishlist(getWishlist());
    router.push("/cart");
  };

  const handleRemove = (item: Product) => {
    toggleWishlist(item);
    setWishlist(getWishlist());
  };

  if (!wishlist.length) {
    return <h2 className="empty-wishlist">Wishlist is empty 🤍</h2>;
  }

  return (
    <div className="page-container">
      <h2>MY FAVORITES 🖤</h2>

      <div className="product-grid">
        {wishlist.map((item) => (
          <div key={item.id} className="product-wishlist">
            <div className="image-wrapper">
              <img src={`/dress${item.id}.png`} alt={item.name} />
            </div>

            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <div className="icons">
              <MdOutlineAddShoppingCart
                className="add-cart-icon"
                onClick={() => handleAddToCart(item)}
              />

              <IoHeartDislikeSharp
                className="r-w"
                onClick={() => handleRemove(item)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
