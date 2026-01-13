"use client";

import { addToCart } from "@/app/utils/cart";
import { protectedNavigate } from "@/app/utils/protectedNavigate";
import { toggleWishlist } from "@/app/utils/wishlist";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";

type Product = {
  id: number;
  name: string;
  price: string;
  img: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "CROP SWEATER",
    price: "950.00",
    img: "/New1.png",
  },
  {
    id: 2,
    name: "BAGGY JEANS",
    price: "1055.00",
    img: "/New2.png",
  },
  {
    id: 3,
    name: "WHITE T-SHIRT",
    price: "650.00",
    img: "/New3.png",
  },
  {
    id: 4,
    name: "CROP TOP",
    price: "800.00",
    img: "/New4.png",
  },
];

export default function NewArrivals() {
  const router = useRouter();
  const handleAddToCart = (product: Product) => {
    const success = addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price.replace("$", "")),
      image: product.img,
    });

    if (!success) {
      router.push("/login");
      return;
    }

    toast.success("Added to cart 🛒");
  };
  const handleAddToWishlist = (product: any) => {
    const result = toggleWishlist({
      id: product.id,
      name: product.name,
      price: Number(product.price.replace("$", "")),
      image: product.img,
    });
    if (!result.success) {
      toast.error(result.message || "Something went wrong");
      router.push("/login");
      return;
    }

    toast.success("Added to wishlist");
    window.dispatchEvent(new Event("wishlistUpdated", { bubbles: true }));
  };
  return (
    <section className="new-arrivals">
      <div className="new-arrivals-container">
        <div className="new-arrivals-header">
          <h2>OUR NEW ARRIVALS</h2>
          <span
            onClick={() => protectedNavigate(router, "/shop")}
            className="view-all"
          >
            VIEW ALL PRODUCTS
          </span>
        </div>

        <div className="new-arrivals-grid">
          {products.map((product, index) => (
            <div className="arrival-card" key={index}>
              <div className="arrival-image">
                <button
                  className="wishlist-btn"
                  onClick={() => handleAddToWishlist(product)}
                >
                  <FiHeart />
                </button>

                <Image
                  src={product.img}
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
