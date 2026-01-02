"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  sku: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("nexon_cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      setItems(parsed);
      const newTotal = parsed.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
      setTotal(newTotal);
    }
  }, []);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      let updated;
      if (existing) {
        updated = prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        updated = [...prev, item];
      }
      localStorage.setItem("nexon_cart", JSON.stringify(updated));
      const newTotal = updated.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      setTotal(newTotal);
      return updated;
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    setItems((prev) => {
      let updated;
      if (qty <= 0) {
        updated = prev.filter((i) => i.id !== id);
      } else {
        updated = prev.map((i) =>
          i.id === id ? { ...i, quantity: qty } : i
        );
      }
      localStorage.setItem("nexon_cart", JSON.stringify(updated));
      const newTotal = updated.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      setTotal(newTotal);
      return updated;
    });
  };

  const removeItem = (id: string) => {
    updateQuantity(id, 0);
  };

  return (
    <CartContext.Provider value={{ items, total, addItem, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used in CartProvider");
  return ctx;
}
