import React from 'react';
import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../types/cart';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(item.id, item.size);
    } else {
      updateQuantity(item.id, item.size, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 border-b border-stone-200 py-4 last:border-b-0">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image src={item.image} alt={item.name} fill className="rounded-md object-cover" />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-primary">{item.name}</h3>
        <p className="text-sm text-gray-600">Talla: {item.size}</p>
        <p className="text-sm font-medium text-primary mt-1">${item.price.toLocaleString()}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleUpdateQuantity(item.quantity - 1)}
          className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="text-lg font-medium w-6 text-center">{item.quantity}</span>
        <button
          onClick={() => handleUpdateQuantity(item.quantity + 1)}
          className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
      <button
        onClick={() => removeFromCart(item.id, item.size)}
        className="p-1 text-gray-500 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CartItem;
