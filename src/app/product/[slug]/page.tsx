'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import ProductGrid from '../../../components/ProductGrid';
import { useFavorites } from '../../../context/FavoritesContext';
import { makePlaceholderImage } from '../../../lib/demoImages';

interface ProductPageProps {
  params: { slug: string };
}

// Dummy data for a single product. In a real app, this would come from an API.
const dummyProductDetail = {
  id: '1',
  name: 'Polerón Oversize Black',
  slug: 'poleron-oversize-black',
  images: [
    makePlaceholderImage('Polerón 1', '#000000', '#FFFFFF', 600, 800),
    makePlaceholderImage('Polerón 2', '#333333', '#FFFFFF', 600, 800),
    makePlaceholderImage('Polerón 3', '#666666', '#FFFFFF', 600, 800),
  ],
  description: 'El polerón oversize Black combina estilo urbano y comodidad insuperable. Fabricado con algodón premium, es perfecto para cualquier ocasión. Disponible en varias tallas.',
  price: 49990,
  compareAtPrice: 59990,
  discount: 16,
  sizes: [
    { size: 'S', stock: 5, status: 'Disponible' },
    { size: 'M', stock: 12, status: 'Disponible' },
    { size: 'L', stock: 7, status: 'Últimas unidades' },
    { size: 'XL', stock: 0, status: 'Agotado' },
    { size: 'XXL', stock: 2, status: 'Disponible' },
  ],
  stockStatus: 'in-stock',
};

const dummyRelatedProducts = [
  {
    id: '2',
    name: 'Jeans Slim Fit Negro',
    slug: 'jeans-slim-fit-negro',
    mainImage: makePlaceholderImage('Producto 2', '#aaaaaa', '#ffffff', 400, 500),
    hoverImage: makePlaceholderImage('Producto 2', '#777777', '#ffffff', 400, 500),
    price: 45990,
    isNew: false,
    isSale: true,
    stockStatus: 'low-stock',
  },
  {
    id: '4',
    name: 'Vestido Verano Elegante',
    slug: 'vestido-verano-elegante',
    mainImage: makePlaceholderImage('Producto 4', '#bbbbbb', '#ffffff', 400, 500),
    price: 34990,
    isNew: false,
    isSale: false,
    stockStatus: 'in-stock',
  },
];

export default function ProductPage({ params }: ProductPageProps) {
  const product = dummyProductDetail; // In a real app, fetch product by slug
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const favorite = isFavorite(product.id);

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center">Producto no encontrado.</div>;
  }

  const availableSizes = product.sizes.filter(s => s.stock > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-[600px] lg:max-h-full">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                width={100}
                height={120}
                className={`cursor-pointer border-2 ${selectedImage === img ? 'border-primary' : 'border-transparent'} hover:border-gray-300`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="relative flex-grow h-[500px] lg:h-[600px] w-full">
            <Image
              src={selectedImage}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-primary mb-2">{product.name}</h1>
          <p className="text-xl font-bold text-primary mb-4">
            ${product.price.toLocaleString()}
            {product.compareAtPrice && product.price < product.compareAtPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${product.compareAtPrice.toLocaleString()}</span>
            )}
            {product.discount > 0 && (
              <span className="ml-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">-{product.discount}%</span>
            )}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">Tallas:</h3>
            <div className="flex gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  className={`px-4 py-2 border rounded-md text-sm font-medium
                    ${selectedSize === s.size ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-gray-300'}
                    ${s.stock === 0 ? 'opacity-50 cursor-not-allowed line-through' : 'hover:border-primary'}
                  `}
                  onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                  disabled={s.stock === 0}
                >
                  {s.size} ({s.status})
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-lg font-semibold text-primary">Cantidad:</h3>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 p-2 border rounded-md text-center"
            />
            <button
              className="bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
              disabled={!selectedSize || quantity === 0 || product.stockStatus === 'out-of-stock'}
            >
              Agregar al Carrito
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite({
                id: product.id,
                slug: product.slug,
                name: product.name,
                mainImage: product.images[0],
                price: product.price,
                compareAtPrice: product.compareAtPrice,
                isNew: true,
                isSale: product.discount > 0,
                stockStatus: product.stockStatus as 'in-stock' | 'low-stock' | 'out-of-stock',
              })}
              className={`rounded-full border p-3 transition-colors ${favorite ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white text-primary hover:bg-gray-100'}`}
              aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Heart size={24} fill={favorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Shipping and Returns Information */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-primary mb-2">Información Adicional:</h3>
            <p className="text-gray-700 mb-2">Envío rápido y seguro a todo el país.</p>
            <p className="text-gray-700">Cambios y devoluciones gratuitas dentro de 30 días.</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">Productos Relacionados</h2>
        <ProductGrid products={dummyRelatedProducts} />
      </section>
    </div>
  );
}
