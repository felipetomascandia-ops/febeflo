'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    mainImage: string;
    hoverImage?: string;
    price: number;
    compareAtPrice?: number;
    isNew?: boolean;
    isSale?: boolean;
    stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const discount = product.compareAtPrice && product.price < product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const stockStatusText = {
    'in-stock': 'En stock',
    'low-stock': 'Últimas unidades',
    'out-of-stock': 'Agotado',
  };

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block" passHref>
      <div
        className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute right-2 top-2 flex flex-col space-y-2">
            {product.isNew && (
              <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">Nuevo</span>
            )}
            {product.isSale && discount > 0 && (
              <span className="rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">-{discount}%</span>
            )}
            {product.stockStatus === 'out-of-stock' && (
              <span className="rounded-full bg-stone-700 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">Agotado</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleFavoriteClick}
            className={`absolute bottom-2 right-2 rounded-full p-2 shadow-md transition-all duration-300 ${
              favorite
                ? 'bg-primary text-white'
                : 'bg-white text-primary opacity-0 group-hover:opacity-100 hover:text-accent'
            } ${favorite ? 'opacity-100' : 'translate-y-2 group-hover:translate-y-0'}`}
            aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="truncate text-lg font-semibold text-primary">{product.name}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-xl font-bold text-primary">${product.price.toLocaleString()}</p>
            {product.compareAtPrice && product.price < product.compareAtPrice && (
              <p className="ml-2 text-sm text-gray-500 line-through">${product.compareAtPrice.toLocaleString()}</p>
            )}
          </div>
          {product.stockStatus !== 'in-stock' && (
            <p className={`mt-1 text-sm ${product.stockStatus === 'low-stock' ? 'text-orange-500' : 'text-red-500'}`}>
              {stockStatusText[product.stockStatus]}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
