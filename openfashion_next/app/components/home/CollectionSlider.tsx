"use client";

import { getProducts, Product } from "@/app/utils/products";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CollectionSlider() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <section className="collection-wrapper">
      <section className="collection-slider">
        {products.slice(9, 12).map((product) => (
          <div className="collection-item" key={product.id}>
            <div className="collection-image">
              <Image
                src={
                  product.img.startsWith("/") ? product.img : "/placeholder.png"
                }
                alt={product.name}
                fill
                className="collection-img"
              />
            </div>

            <h2>{product.name}</h2>
            <p>
              The most trending collection of 2026. Pick your favourite
              style & elevate your wardrobe.
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
