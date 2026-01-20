"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  img: string;
}

export default function CollectionSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return null; 
  }

  return (
    <section className="collection-wrapper">
      <section className="collection-slider">
        {products.slice(0, 3).map((product) => (
          <div className="collection-item" key={product._id}>
            <div className="collection-image">
              <Image
                src={product.img || "/placeholder.png"}
                alt={product.name}
                fill
                className="collection-img"
              />
            </div>

            <h2>{product.name}</h2>
            <p>
              The most trending collection of 2026. Pick your favourite style &
              elevate your wardrobe.
            </p>

            <a href="/shop" className="discover">
              TOP PICKED
            </a>
          </div>
        ))}
      </section>
    </section>
  );
}
