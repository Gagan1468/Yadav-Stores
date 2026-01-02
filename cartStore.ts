type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  sku: string;
  quantity: number;
};

const STORAGE_KEY = "nexon_cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    console.error("Failed to save cart to localStorage");
  }
}

let cart: CartItem[] = [];

// Load from localStorage on init
if (typeof window !== "undefined") {
  cart = loadCart();
}

export function addToCart(item: CartItem) {
  const existing = cart.find((c) => c.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: Number(item.price) || 0,
      image: item.image,
      sku: item.sku,
      quantity: item.quantity || 1,
    });
  }
  saveCart(cart);
}

export function removeFromCart(id: string) {
  cart = cart.filter((c) => c.id !== id);
  saveCart(cart);
}

export function updateQuantity(id: string, quantity: number) {
  const item = cart.find((c) => c.id === id);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
}

export function getCart(): CartItem[] {
  return cart;
}

export function clearCart() {
  cart = [];
  saveCart(cart);
}

export function getCartTotal() {
  return cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);
}

export function getCartCount() {
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}
