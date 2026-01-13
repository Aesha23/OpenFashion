import { useNavigate, useParams } from "react-router-dom";
import "./Product.css";
import WishlistButton from "../components/WishListButton/WishlistButton";
import { addToCart } from "../utils/cart";
import { PRODUCTS } from "../constants/appConstants";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return <h1 style={{ textAlign: "center", marginTop: "50px" }}>Product not found 😢</h1>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="page-container">
      <div className="single-product">
        <div className="product-left">
          <img src={`/dress${product.id}.png`} alt={product.name} />
        </div>

        <div className="product-right">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <div className="price-row">
            <div className="ratings">
              <img src="/Rating.png" alt="rating" className="stars" />
              <span className="rating-value">{product.rating}</span>
              <span className="review-count">({product.reviews} reviews)</span>
            </div>

            <div className="price-wishlist">
              <p className="price">₹{product.price}</p>
              <WishlistButton product={product} />
            </div>
          </div>

          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
