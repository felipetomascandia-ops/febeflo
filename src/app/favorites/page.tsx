'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="bg-stone-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500">Wishlist</p>
            <h1 className="mt-2 text-4xl font-semibold text-primary">Favoritos</h1>
          </div>
          <p className="text-sm text-stone-600">{favorites.length} prendas guardadas</p>
        </header>

        {favorites.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-stone-300 bg-white p-10 text-center shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
            <Heart className="mx-auto h-10 w-10 text-stone-400" />
            <h2 className="mt-5 text-2xl font-semibold text-primary">No tienes favoritos todavía.</h2>
            <p className="mt-2 text-sm text-stone-600">Guarda las prendas que te gusten para volver más tarde.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              Explorar colección
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((product) => (
              <div key={product.id} className="overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
                <div className="relative h-80 w-full overflow-hidden">
                  <Image src={product.mainImage} alt={product.name} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product)}
                    className="absolute right-3 top-3 rounded-full bg-white p-2 text-primary shadow-md transition hover:text-accent"
                    aria-label={`Quitar ${product.name} de favoritos`}
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-primary">{product.name}</h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-primary">${product.price.toLocaleString()}</span>
                    {product.compareAtPrice && product.price < product.compareAtPrice && (
                      <span className="text-sm text-stone-500 line-through">${product.compareAtPrice.toLocaleString()}</span>
                    )}
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/product/${product.slug}`}
                      className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-stone-800"
                    >
                      Ver producto
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(product)}
                      className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-stone-50 px-3 text-stone-700 transition hover:border-stone-400"
                      aria-label={`Quitar ${product.name} de favoritos`}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
