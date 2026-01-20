"use client";

import { SESSION_KEY } from "@/app/utils/auth";
import { addToCart } from "@/app/utils/cart";
import { protectedNavigate } from "@/app/utils/protectedNavigate";
import { addToWishlist, isWishlisted } from "@/app/utils/wishlist";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/app/utils/products";

export default function NewArrivals() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleAddToCart = (product: Product) => {
    const success = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });

    if (!success) {
      router.push("/login");
      return;
    }

    toast.success("Added to cart 🛒");
  };

  const handleProtectedView = () => {
    if (!localStorage.getItem(SESSION_KEY)) {
      toast.error("Login to View Products!");
      router.push("/login");
      return;
    }
    protectedNavigate(router, "/shop");
  };

  const handleAddToWishlist = (product: Product) => {
    if (isWishlisted(product.id)) {
      toast.error("Already wishlisted ❤️");
      return;
    }

    const result = addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });

    if (!result.success) {
      toast.error(result.message || "Please login");
      router.push("/login");
      return;
    }

    toast.success("Added to wishlist 🖤");
  };

  return (
    <section className="new-arrivals">
      <div className="new-arrivals-container">
        <div className="new-arrivals-header">
          <h2>OUR NEW ARRIVALS</h2>
          <span onClick={handleProtectedView} className="view-all">
            VIEW ALL PRODUCTS
          </span>
        </div>

        <div className="new-arrivals-grid">
          {products.slice(0, 4).map((product) => (
            <div className="arrival-card" key={product.id}>
              <div className="arrival-image">
                <button
                  className="wishlist-btn"
                  onClick={() => handleAddToWishlist(product)}
                >
                  <FiHeart
                    className={
                      isWishlisted(product.id) ? "heart liked" : "heart"
                    }
                  />
                </button>

                <Image
                  src={
                    product.img.startsWith("/")
                      ? product.img
                      : "/placeholder.png"
                  }
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
