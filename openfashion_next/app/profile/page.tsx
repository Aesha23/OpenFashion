"use client";

import { useEffect, useState } from "react";
import { getOrders } from "../utils/orders";
import { getCurrentUser } from "../utils/auth";

export default function ProfilePage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    setMounted(true);
    setOrders(getOrders());
    setUser(getCurrentUser());
  }, []);
  
  if (!orders.length) {
    return <p className="no-orders">No orders yet :(</p>;
  }

  if (!mounted) return null;

  return (
    <div className="profile-orders">
      <h2>Hi{user?.name ? `, ${user.name}` : ""} 👋</h2>
      <h2>Your Orders Summary :</h2>

      {orders.map((order) => (
        <div key={order.orderId} className="order-card">
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Date:</strong> {order.date}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.total}
          </p>

          <div className="order-items">
            {order.items.map((item: any) => (
              <div key={item.id}>
                {item.name} . {item.quantity}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
