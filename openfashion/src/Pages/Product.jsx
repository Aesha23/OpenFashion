import { useNavigate, useParams } from "react-router-dom";
import "./Product.css";
import WishlistButton from "../components/WishList/WishlistButton";
import { addToCart } from "../utils/cart";

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

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        Product not found 😢
      </h1>
    );
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
              <span className="review-count">
                ({product.reviews} reviews)
              </span>
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
