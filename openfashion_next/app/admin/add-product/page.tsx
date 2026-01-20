"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !img) {
      toast.error("All fields are required");
      return;
    }

    if (!img.startsWith("/")) {
      toast.error("Image path must start with / (example: /New1.png)");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          price: Number(price),
          img: img.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      toast.success("Product added successfully ✅");

      setName("");
      setPrice("");
      setImg("");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          type="number"
          min="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Image path (e.g. /New1.png)"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
