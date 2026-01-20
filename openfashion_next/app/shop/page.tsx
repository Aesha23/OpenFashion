"use client";

import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { addToCart } from "../utils/cart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addToWishlist, isWishlisted } from "../utils/wishlist";
import { useEffect, useState } from "react";
import { getProducts, Product } from "../utils/products";

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleAddToWishlist = (product: Product) => {
    if (isWishlisted(product.id)) {
      toast.error("Already wishlisted ❤️");
      return;
    }

    const res = addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });

    if (!res.success) {
      toast.error(res.message || "Please login");
      return;
    }

    toast.success("Added to wishlist 🖤");
  };

  const handleAddToCart = (product: Product) => {
    const success = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });

    if (success) {
      toast.success("Added to cart 🛒");
    }
  };

  return (
    <section className="new-arrivals">
      <div className="new-arrivals-container">
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          ALL PRODUCTS
        </h2>

        <div className="new-arrivals-grid">
          {products.map((product) => (
            <div className="arrival-card" key={product.id}>
              <div className="arrival-image">
                <button
                  className="wishlist-btn"
                  onClick={() => handleAddToWishlist(product)}
                >
                  <FiHeart />
                </button>

                <Image
                  src={product.img || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="arrival-img"
                />
              </div>
              <h3>{product.name}</h3>
              <span className="product-price">₹{product.price}</span>
              <button
                className="add-cart-link"
                onClick={() => handleAddToCart(product)}
              >
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
