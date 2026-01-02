import type { ReactNode } from "react";
import { UserProvider } from "@/lib/userContext";
import { CartProvider } from "@/lib/useCartContext";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
