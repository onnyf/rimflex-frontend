
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/ShoppingCartContext";

export const metadata: Metadata = {
  title: "Door-Step | Food, Packages & More Delivered",
  description:
    "Order food, send packages, shop for essentials or deliver your products with Door-Step.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
