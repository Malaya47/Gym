"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const categories = ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"];

const products = [
  {
    id: 1,
    name: "Stoffwechsel Diät Paket",
    price: "110.000",
    image: "/product-1.png",
  },
  {
    id: 2,
    name: "Stoffwechsel Diät Paket",
    price: "110.000",
    image: "/product-2.png",
  },
  {
    id: 3,
    name: "Stoffwechsel Diät Paket",
    price: "110.000",
    image: "/product-3.png",
  },
  {
    id: 4,
    name: "Stoffwechsel Diät Paket",
    price: "110.000",
    image: "/product-4.png",
  },
  {
    id: 5,
    name: "Stoffwechsel Diät Paket",
    price: "110.000",
    image: "/product-5.png",
  },
  {
    id: 6,
    name: "Stoffwechsel Diät Paket",
    price: "110.000",
    image: "/product-6.png",
  },
];

const features = [
  "500g Hy-Pro Protein",
  "120 Kapseln Lipodex",
  "1000ml L-Carnitin Pro",
];

export function ShopProductsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(products.map((p) => [p.id, 1])),
  );

  const updateQty = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  };

  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div
          className="flex gap-2 flex-wrap mb-10 p-2 rounded-xl"
          style={{
            background: "#0300044D",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === i
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-white/10 overflow-hidden flex flex-col"
              style={{ background: "#0300044D" }}
            >
              {/* Product Image */}
              <div className="relative w-full aspect-[4/3] bg-black/30">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                <h3 className="text-white font-semibold text-base">
                  {product.name}
                </h3>
                <ul className="text-white/60 text-xs space-y-1">
                  {features.map((f, i) => (
                    <li key={i}>– {f}</li>
                  ))}
                </ul>

                {/* Price + Qty */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-white font-bold text-lg">
                    {product.price}
                  </span>
                  <div className="flex items-center gap-1 border border-white/20 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(product.id, -1)}
                      className="px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="px-3 text-white text-sm">
                      {quantities[product.id]}
                    </span>
                    <button
                      onClick={() => updateQty(product.id, 1)}
                      className="px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pick Now Button */}
                <Button className="btn-gradient text-white font-semibold w-fit px-6 mt-1">
                  Pick Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
