import "./ProductList.css";
import WishlistButton from "../WishListButton/WishlistButton";
import { PRODUCTS } from "../../constants/appConstants";
import { isLoggedIn } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate = useNavigate();

  const handleViewProduct = (id) => {
    if (isLoggedIn()) {
      navigate(`/product/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <h2 className="section-title">OUR PRODUCTS 🛍️</h2>
        <div className="section-divider"></div>
        <p className="section-tagline">
          Fashion that celebrates your mood, your moments, your style.
        </p>
      </div>

      <div className="product-grid">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
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

            <button className="view-btn" onClick={() => handleViewProduct(product.id)}>
              View Product
            </button>

            <WishlistButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
