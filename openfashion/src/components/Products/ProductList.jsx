import { Link } from "react-router-dom";
import "./ProductList.css";
import WishlistButton from "../WishList/WishlistButton";

const products = [
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
    rating: 4,
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

export default function ProductList() {
  return (
    <div className="page-container">
      <div className="section-header">
        <h2 className="section-title">OUR PRODCUTS🛍️</h2>
        <div className="section-divider"></div>
        <p className="section-tagline">
          Fashion that celebrates your mood, your moments, your style.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={products.id} className="product-card">
            <div className="image-wrapper">
              <img src={`/dress${product.id}.png`} alt={product.name} />
            </div>

            <h3>{product.name}</h3>
            <div className="rating">
              <img src="Rating.png" alt="rating" className="stars" />
              <span className="rating-value">{product.rating}</span>
              <span className="review-count">({product.reviews} reviews)</span>
            </div>

            <p className="price">₹{product.price}</p>

            <Link to={`/product/${product.id}`} className="view-btn">
              View Product
            </Link>

            <WishlistButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
