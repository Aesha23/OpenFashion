"use client";

import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { addToCart } from "../utils/cart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toggleWishlist } from "../utils/wishlist";

const products = [
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
  {
    id: 5,
    name: "CROP TOP",
    price: "800.00",
    img: "/New5.png",
  },
  {
    id: 6,
    name: "BLACK T-SHIRT",
    price: "1155.00",
    img: "/New6.png",
  },
  {
    id: 7,
    name: "HANDMADE SWEATER",
    price: "1000.00",
    img: "/New7.png",
  },
  {
    id: 8,
    name: "FLORAL ONEPIECE",
    price: "950.00",
    img: "/New8.png",
  },
  {
    id: 9,
    name: "OFF-WHITE SHIRT",
    price: "500.00",
    img: "/New9.png",
  },
  {
    id: 10,
    name: "BROWN T-SHIRT",
    price: "450.00",
    img: "/New10.png",
  },
  {
    id: 11,
    name: "SOFT LEATHER JACKETS",
    price: "1500.00",
    img: "/New11.png",
  },
  {
    id: 12,
    name: "MAXI DRESS",
    price: "750.00",
    img: "/New12.png",
  },
];

export default function ShopPage() {
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
    // Force event to ensure Navbar updates
    window.dispatchEvent(new Event("wishlistUpdated", { bubbles: true }));
  };
  const router = useRouter();
  const handleAddToCart = (product: any) => {
    const success = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
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
