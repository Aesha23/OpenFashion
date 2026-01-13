import { useEffect, useState } from "react";
import { getWishlist, toggleWishlist } from "../utils/wishlist";
import { addToCart } from "../utils/cart";
import toast from "react-hot-toast";
import "./Wishlist.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoHeartDislikeSharp } from "react-icons/io5";
import { WISHLIST_MESSAGES, TOAST_DURATION } from "../constants/appConstants";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    toggleWishlist(item);
    setWishlist(getWishlist());

    toast.success(WISHLIST_MESSAGES.ADDED_TO_CART, {
      duration: TOAST_DURATION,
    });
  };

  const handleRemoveClick = (item) => {
    setSelectedItem(item);
  };

  const confirmRemove = () => {
    toggleWishlist(selectedItem);
    setWishlist(getWishlist());
    setSelectedItem(null);

    toast.error(WISHLIST_MESSAGES.REMOVED, {
      duration: TOAST_DURATION,
    });
  };

  if (!wishlist.length) {
    return <h2 className="empty-wishlist">Wishlist is empty 🤍</h2>;
  }

  return (
    <>
      <div className="page-container">
        <h2
          style={{ textAlign: "center", fontSize: "32px", marginTop: "20px" }}
        >
          MY FAVORITES🖤
        </h2>

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
                  onClick={() => handleRemoveClick(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        open={!!selectedItem}
        title={WISHLIST_MESSAGES.CONFIRM_TITLE}
        description={WISHLIST_MESSAGES.CONFIRM_DESC}
        onCancel={() => setSelectedItem(null)}
        onConfirm={confirmRemove}
      />
    </>
  );
}
