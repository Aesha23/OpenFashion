import { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "../utils/cart";
import "./cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  }, [cart]);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleQuantityChange = (id, delta) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const handlePayment = () => {
    if (isPaying) return;
    setIsPaying(true);

    const isSuccess = Math.random() > 0.3;
    if (isSuccess) {
      setMessage("Payment Successful");

      setTimeout(() => {
        clearCart();
        setCart([]);
        setMessage("");
        setIsPaying(false);
      }, 3000);
    } else {
      setMessage("Payment Failed Try again.");

      setTimeout(() => {
        setMessage("");
        setIsPaying(false);
      }, 3000);
    }
  };

  const discount = total > 100 ? total * 0.1 : 0;
  const totalAfterDiscount = total - discount;

  return (
    <div className="page-container">
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          marginTop: "20px",
          letterSpacing: "2px",
        }}
      >
        CART🛒
      </h2>
      <div className="cart-page">
        {message && (
          <div
            className={`payment-toast ${
              message.includes("Failed") ? "failure" : "success"
            }`}
          >
            {message}
          </div>
        )}

        {cart.length > 0 ? (
          <div className="cart-container">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={`/dress${item.id}.png`} alt={item.name} />
                <div className="text">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="cart-price">₹{item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-summary">
              <div className="summary-products">
                <h4>Order Summary</h4>
                {cart.map((item) => (
                  <p key={item.id}>
                    {item.name} x {item.quantity} = ₹
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                ))}
              </div>

              <p>Total: ₹{total.toFixed(2)}</p>
              {discount > 0 && (
                <p className="discount-text">
                  Discount: ₹{discount.toFixed(2)}
                </p>
              )}
              <h3>Payable: ₹{totalAfterDiscount.toFixed(2)}</h3>
              <button
                className="pay-btn"
                onClick={handlePayment}
                disabled={isPaying}
              >
                {isPaying ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <h2>Cart is empty 🛒</h2>
          </div>
        )}
      </div>
    </div>
  );
}
