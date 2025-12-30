"use client";

import WishlistButton from "@/app/components/Wishlist/Wishlistbutton";
import { addToCart } from "@/app/utils/cart";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Yellow Floral Dress",
    price: 1200,
    image: "dress1.png",
    rating: 4.2,
    reviews: 92,
  },
  {
    id: 2,
    name: "Black Jacket",
    price: 4000,
    image: "dress2.png",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 3,
    name: "Pink Maxi",
    price: 1500,
    image: "dress3.png",
    rating: 4.0,
    reviews: 74,
  },
  {
    id: 4,
    name: "Bodycon Dress",
    price: 2500,
    image: "dress4.png",
    rating: 4.8,
    reviews: 40,
  },
];

export default function ProductClient({ productId }: { productId: string }) {
  const product = products.find((p) => p.id === Number(productId));
  const router = useRouter();

  if (!product) {
    return <h1>Product not found 😢</h1>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    router.push("/cart");
  };

  return (
    <div className="page-container">
      <div className="single-product">
        <div className="product-left">
          <img src={`/dress${product.id}.png`} alt={product.name} />
        </div>

        <div className="product-right">
          <h1>{product.name}</h1>
          <p className="description"></p>

          <div className="ratings">
            <img src="/Rating.png" alt="rating" className="stars" />
            <span className="rating-value">{product.rating}</span>
            <span className="review-count">({product.reviews} reviews)</span>
          </div>

          <div className="price-wishlist">
            <p className="price">₹{product.price}</p>
            <WishlistButton product={product} />
          </div>

          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
