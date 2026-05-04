"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProducts,
  fetchCategories,
  placeOrder,
} from "@/store/slices/shopSlice";

const UPLOADS_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace("/api", "");

function productImageSrc(image?: string | null): string {
  if (!image) return "/product-1.png";
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads/")) return `${UPLOADS_BASE}${image}`;
  return image;
}

export function ShopProductsSection() {
  const dispatch = useAppDispatch();
  const { products, categories, loading, error } = useAppSelector(
    (s) => s.shop,
  );
  const { user } = useAppSelector((s) => s.auth);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [orderMsg, setOrderMsg] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [pendingProductId, setPendingProductId] = useState<number | null>(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());

    // Poll for stock updates every 30 seconds
    const interval = setInterval(() => {
      dispatch(fetchProducts());
    }, 30_000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Sync quantities when products load
  useEffect(() => {
    if (products.length > 0) {
      setQuantities((prev) => {
        const next: Record<number, number> = {};
        products.forEach((p) => {
          next[p.id] = prev[p.id] ?? 1;
        });
        return next;
      });
    }
  }, [products]);

  const updateQty = (id: number, delta: number) => {
    const product = products.find((p) => p.id === id);
    const max = product?.stock ?? 1;
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min(max, Math.max(1, (prev[id] ?? 1) + delta)),
    }));
  };

  const handlePickNow = (productId: number) => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    setPendingProductId(productId);
  };

  const handleConfirmOrder = async () => {
    if (pendingProductId === null) return;
    const qty = quantities[pendingProductId] ?? 1;
    await dispatch(
      placeOrder([{ productId: pendingProductId, quantity: qty }]),
    );
    setPendingProductId(null);
    setOrderMsg("Order placed! Pending admin approval.");
    setTimeout(() => setOrderMsg(null), 4000);
    // Re-fetch products so stock is fresh
    dispatch(fetchProducts());
  };

  const handleCancelOrder = () => {
    setPendingProductId(null);
  };

  // Filter by active category ("All" shows everything)
  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Build tab list: use backend categories, fallback to "All" if empty
  const tabs = categories.length > 0 ? categories.map((c) => c.name) : ["All"];

  const pendingProduct =
    pendingProductId !== null
      ? products.find((p) => p.id === pendingProductId)
      : null;

  return (
    <section className="py-12 bg-transparent">
      {/* Login Alert Dialog */}
      {showLoginAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLoginAlert(false)}
          />
          <div
            className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 p-8 flex flex-col gap-5"
            style={{ background: "#0d0014cc" }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-1">
              <Image
                src="/gym-logo.png"
                alt="Sentinators"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-wide text-center">
              LOGIN REQUIRED
            </h3>
            <div
              className="w-full h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #7C3AED88, transparent)",
              }}
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Please log in first to place an order.
            </p>
            <button
              onClick={() => setShowLoginAlert(false)}
              className="w-full py-2.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10 font-semibold text-sm transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {pendingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCancelOrder}
          />
          {/* Modal */}
          <div
            className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 p-8 flex flex-col gap-5"
            style={{ background: "#0d0014cc" }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-1">
              <Image
                src="/gym-logo.png"
                alt="Sentinators"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-wide text-center">
              CONFIRM ORDER
            </h3>
            {/* Divider glow */}
            <div
              className="w-full h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #7C3AED88, transparent)",
              }}
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Add{" "}
              <span className="text-white font-semibold">
                {quantities[pendingProduct.id] ?? 1}× {pendingProduct.name}
              </span>{" "}
              ({pendingProduct.currency} {pendingProduct.price}) to your order?
            </p>
            <div className="flex gap-3 mt-1">
              <button
                onClick={handleConfirmOrder}
                className="flex-1 py-2.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                }}
              >
                Confirm
              </button>
              <button
                onClick={handleCancelOrder}
                className="flex-1 py-2.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10 font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toasts */}
        {orderMsg && (
          <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-lg">
            {orderMsg}
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Category Tabs */}
        {/* Responsive Category Tabs (no horizontal scroll, always wraps) */}
        <div
          className="flex gap-2 mb-10 p-2 rounded-xl flex-wrap"
          style={{
            background: "#0300044D",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {tabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading && products.length === 0 ? (
          <p className="text-white/40 text-center py-12">Loading products…</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-white/10 overflow-hidden flex flex-col"
                style={{ background: "#0300044D" }}
              >
                {/* Product Image */}
                <div className="relative w-full aspect-4/3 bg-black/30">
                  <Image
                    src={productImageSrc(product.image)}
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
                  {product.features && product.features.length > 0 && (
                    <ul className="text-white/60 text-xs space-y-1">
                      {product.features.map((f, i) => (
                        <li key={i}>– {f}</li>
                      ))}
                    </ul>
                  )}

                  {/* Price + Qty */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-white font-bold text-lg">
                        {product.currency} {product.price}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          product.stock === 0
                            ? "text-red-400"
                            : product.stock <= 3
                              ? "text-yellow-400"
                              : "text-white/40"
                        }`}
                      >
                        {product.stock === 0
                          ? "Out of stock"
                          : `${product.stock} in stock`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 border border-white/20 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(product.id, -1)}
                        disabled={product.stock === 0}
                        className="px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                      <span className="px-3 text-white text-sm">
                        {quantities[product.id] ?? 1}
                      </span>
                      <button
                        onClick={() => updateQty(product.id, 1)}
                        disabled={
                          product.stock === 0 ||
                          (quantities[product.id] ?? 1) >= product.stock
                        }
                        className="px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Pick Now Button */}
                  <Button
                    onClick={() => handlePickNow(product.id)}
                    disabled={product.stock === 0}
                    className="btn-gradient text-white font-semibold w-fit px-6 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {product.stock === 0 ? "Out of Stock" : "Pick Now"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
