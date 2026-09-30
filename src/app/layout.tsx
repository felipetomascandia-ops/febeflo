'use client';

import type { Metadata } from "next"; // Metadata is still server-side
import { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import "./globals.css";

// Metadata should ideally be defined in a Server Component or at the top of a Client Component file
// For simplicity and immediate functionality, we'll keep it here for now.
// In a real app, you might define metadata in a separate server component or a layout.ts (server component)
// and then import client components into it.
// export const metadata: Metadata = {
//   title: "FEBEFLO - Tienda de Ropa Premium",
//   description: "Tienda online de ropa premium para hombre y mujer: moda, calidad, exclusividad y estilo urbano.",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Header onCartClick={toggleCart} />
                <main className="flex-grow">{children}</main>
                <Footer />
                <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
              </div>
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
