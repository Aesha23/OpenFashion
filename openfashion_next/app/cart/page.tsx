"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getCart, removeFromCart, clearCart, updateCart } from "../utils/cart";
import { useRouter } from "next/navigation";
import { saveOrder } from "../utils/orders";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const syncCart = () => {
      setCart(getCart());
    };

    syncCart();
    setMounted(true);

    window.addEventListener("cartUpdated", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
    };
  }, []);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  }, [cart]);

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleQuantityChange = (id: number, delta: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });

    updateCart(updatedCart);
    setCart(updatedCart);
  };

  const handlePayment = () => {
    if (isPaying) return;
    setIsPaying(true);

    const success = Math.random() > 0.3;

    if (success) {
      setMessage("Payment Successful");

      const order = {
        orderId: `ORD-${Date.now()}`,
        date: new Date().toLocaleString(),
        total: totalAfterDiscount,
        items: cart,
      };

      saveOrder(order);

      setTimeout(() => {
        clearCart();
        setCart([]);
        setMessage("");
        setIsPaying(false);
      }, 3000);
    } else {
      setMessage("Payment Failed. Try again.");

      setTimeout(() => {
        setMessage("");
        setIsPaying(false);
      }, 3000);
    }
  };

  const discount = total > 100 ? total * 0.1 : 0;
  const totalAfterDiscount = total - discount;

  if (!mounted) return null;

  return (
    <section className="cart-page">
      {cart.length > 0 && <h1 className="cart-title">SHOPPING CART</h1>}

      {message && (
        <div
          className={`cart-toast ${
            message.includes("Failed") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      {cart.length > 0 ? (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`cart-${item.id}`} className="cart-item">
                <div className="cart-img-wrapper">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="cart-img"
                  />
                </div>

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p className="price">₹{item.price}</p>

                  <div className="qty-row">
                    <div className="qty">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>
                        +
                      </button>
                    </div>

                    <button
                      className="remove"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>ORDER SUMMARY</h3>

            {cart.map((item) => (
              <div key={`summary-${item.id}`} className="summary-row">
                <span>
                  {item.name} . {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span>₹{totalAfterDiscount.toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={handlePayment}
              disabled={isPaying}
            >
              {isPaying ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven’t added anything yet.</p>
          <button
            className="start-shopping-btn"
            onClick={() => router.push("/shop")}
          >
            Start Shopping
          </button>
        </div>
      )}
    </section>
  );
}
