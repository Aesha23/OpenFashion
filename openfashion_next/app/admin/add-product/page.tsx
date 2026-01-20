"use client";

import { useState } from "react";
import { addProduct } from "@/app/utils/products";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !img) {
      toast.error("All fields are required");
      return;
    }

    if (!img.startsWith("/")) {
      toast.error("Image path must start with / (example: /New1.png)");
      return;
    }

    addProduct({
      id: Date.now(),
      name: name.trim(),
      price: Number(price),
      img: img.trim(),
    });

    toast.success("Product added successfully ✅");

    setName("");
    setPrice("");
    setImg("");
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

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
