'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';

export default function CartPage() {
  const { cartItems, cartTotal, cartCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">Tu Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
          <p className="text-xl mb-6">Tu carrito está vacío.</p>
          <Link href="/shop" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors">
            EXPLORAR COLECCIÓN
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              {cartItems.map((item) => (
                <CartItem key={`${item.id}-${item.size}`} item={item} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-28">
              <h2 className="text-2xl font-bold text-primary mb-4">Resumen de Compra</h2>
              <div className="flex justify-between text-lg text-primary mb-2">
                <span>Subtotal ({cartCount} productos):</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              {/* Placeholder for shipping cost */}
              <div className="flex justify-between text-lg text-primary mb-4">
                <span>Envío:</span>
                <span>$0</span> {/* Free shipping for now */}
              </div>
              <div className="flex justify-between text-xl font-bold text-primary border-t border-gray-200 pt-4 mt-4">
                <span>Total:</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <Link href="/checkout" className="mt-6 block w-full bg-accent text-white font-bold py-3 text-center rounded-full hover:bg-accent-dark transition-colors">
                Finalizar Compra
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
