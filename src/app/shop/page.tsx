"use client";

import { useMemo, useState } from 'react';
import ProductGrid from "../../components/ProductGrid";
import { makePlaceholderImage } from '../../lib/demoImages';

const dummyProducts = [
  {
    id: '1',
    name: 'Polera Oversize Esencial',
    slug: 'polera-oversize-esencial',
    mainImage: makePlaceholderImage('Shop 1', '#cccccc', '#ffffff', 400, 500),
    hoverImage: makePlaceholderImage('Shop 1', '#999999', '#ffffff', 400, 500),
    price: 29990,
    compareAtPrice: 39990,
    isNew: true,
    isSale: true,
    stockStatus: 'in-stock',
    category: 'hombre',
  },
  {
    id: '2',
    name: 'Jeans Slim Fit Negro',
    slug: 'jeans-slim-fit-negro',
    mainImage: makePlaceholderImage('Shop 2', '#aaaaaa', '#ffffff', 400, 500),
    hoverImage: makePlaceholderImage('Shop 2', '#777777', '#ffffff', 400, 500),
    price: 45990,
    isNew: false,
    isSale: true,
    stockStatus: 'low-stock',
    category: 'hombre',
  },
  {
    id: '3',
    name: 'Chaqueta Bomber Premium',
    slug: 'chaqueta-bomber-premium',
    mainImage: makePlaceholderImage('Shop 3', '#888888', '#ffffff', 400, 500),
    price: 79990,
    isNew: true,
    isSale: false,
    stockStatus: 'out-of-stock',
    category: 'mujer',
  },
  {
    id: '4',
    name: 'Vestido Verano Elegante',
    slug: 'vestido-verano-elegante',
    mainImage: makePlaceholderImage('Shop 4', '#bbbbbb', '#ffffff', 400, 500),
    price: 34990,
    isNew: false,
    isSale: false,
    stockStatus: 'in-stock',
    category: 'mujer',
  },
  {
    id: '5',
    name: 'Polera Básica Blanca',
    slug: 'polera-basica-blanca',
    mainImage: makePlaceholderImage('Shop 5', '#eeeeee', '#333333', 400, 500),
    price: 15990,
    isNew: false,
    isSale: false,
    stockStatus: 'in-stock',
    category: 'hombre',
  },
  {
    id: '6',
    name: 'Pantalón Deportivo',
    slug: 'pantalon-deportivo',
    mainImage: makePlaceholderImage('Shop 6', '#dddddd', '#333333', 400, 500),
    price: 32990,
    isNew: true,
    isSale: false,
    stockStatus: 'in-stock',
    category: 'mujer',
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hombre' | 'mujer'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  const filteredProducts = useMemo(() => {
    const categoryFiltered =
      selectedCategory === 'all'
        ? dummyProducts
        : dummyProducts.filter((product) => product.category === selectedCategory);

    const sorted = [...categoryFiltered];

    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => Number(b.isSale) - Number(a.isSale) || Number(b.isNew) - Number(a.isNew));
        break;
    }

    return sorted;
  }, [selectedCategory, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-6">
        <div className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Colección</p>
          <h1 className="text-4xl font-bold text-primary">Nuestra Colección</h1>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Todo', value: 'all' },
              { label: 'Hombre', value: 'hombre' },
              { label: 'Mujer', value: 'mujer' },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setSelectedCategory(filter.value as 'all' | 'hombre' | 'mujer')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === filter.value
                    ? 'bg-primary text-white'
                    : 'border border-stone-200 bg-white text-primary hover:border-stone-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 text-sm text-stone-600">
            <span className="font-medium">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as 'featured' | 'price-asc' | 'price-desc' | 'newest')}
              className="rounded-full border border-stone-200 bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent"
            >
              <option value="featured">Destacados</option>
              <option value="newest">Novedades</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mb-6 text-sm text-stone-500">
        Mostrando <span className="font-semibold text-primary">{filteredProducts.length}</span> artículos
      </div>

      <ProductGrid products={filteredProducts} />
    </div>
  );
}
