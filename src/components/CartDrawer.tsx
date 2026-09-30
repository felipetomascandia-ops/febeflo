import React, { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, cartCount } = useCart();

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-primary">Tu Carrito ({cartCount})</h2>
          <button onClick={onClose} aria-label="Close cart" className="text-gray-500 hover:text-primary transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
              <p className="text-lg mb-4">Tu carrito está vacío.</p>
              <Link href="/shop" onClick={onClose} className="bg-primary text-white font-bold py-2 px-4 rounded-full hover:bg-gray-800 transition-colors">
                EXPLORAR COLECCIÓN
              </Link>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <CartItem key={`${item.id}-${item.size}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between text-lg font-semibold text-primary mb-2">
              <span>Subtotal:</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-primary mb-4">
              <span>Total:</span>
              <span>${cartTotal.toLocaleString()}</span> {/* Assuming no shipping/taxes for now */}
            </div>
            <Link href="/checkout" onClick={onClose} className="block w-full bg-accent text-white font-bold py-3 text-center rounded-full hover:bg-accent-dark transition-colors">
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
