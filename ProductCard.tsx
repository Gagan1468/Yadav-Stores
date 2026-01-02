"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/useCartContext";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  sku: string;
};

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);

    try {
      const item = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        sku: product.sku,
        quantity: 1,
      };

      console.log("Adding to cart:", item);

      // Add to localStorage via context
      addItem(item);

      // Also call backend (for persistence if needed later)
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (res.ok) {
        alert("Added to cart!");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Error adding to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          borderRadius: 18,
          overflow: "hidden",
          background:
            "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.96))",
          border: "1px solid rgba(148,163,184,0.15)",
          boxShadow:
            "0 18px 35px rgba(15,23,42,0.9), 0 0 0 1px rgba(15,23,42,0.75)",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition:
            "transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease, background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-4px) scale(1.01)";
          el.style.boxShadow =
            "0 26px 45px rgba(15,23,42,1), 0 0 0 1px rgba(56,189,248,0.35)";
          el.style.border = "1px solid rgba(56,189,248,0.45)";
          el.style.background =
            "linear-gradient(145deg, rgba(15,23,42,1), rgba(15,23,42,0.98))";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "none";
          el.style.boxShadow =
            "0 18px 35px rgba(15,23,42,0.9), 0 0 0 1px rgba(15,23,42,0.75)";
          el.style.border = "1px solid rgba(148,163,184,0.15)";
          el.style.background =
            "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.96))";
        }}
      >
        <div
          style={{
            position: "relative",
            paddingTop: "76%",
            background:
              "radial-gradient(circle at top, #020617 0, #020617 45%, #020617 100%)",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "10px",
              borderRadius: 16,
              border: "1px solid rgba(15,23,42,0.8)",
              boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.9)",
            }}
          />
        </div>

        <div style={{ padding: "12px 12px 10px" }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.25,
              marginBottom: 6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#9ca3af",
              marginBottom: 10,
            }}
          >
            SKU: {product.sku}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 650,
                  color: "#f9fafb",
                }}
              >
                ${typeof product.price === "number" ? product.price.toFixed(2) : "0.00"}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#9ca3af",
                }}
              >
                Free global shipping*
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={adding}
              style={{
                padding: "7px 14px",
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(135deg, #f97316, #facc15, #22c55e)",
                color: "#020617",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0.3,
                textTransform: "uppercase",
                boxShadow: "0 8px 18px rgba(248,250,252,0.18)",
                opacity: adding ? 0.7 : 1,
                cursor: "pointer",
              }}
            >
              {adding ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
