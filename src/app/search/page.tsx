'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, Sparkles } from 'lucide-react';
import ProductGrid from '../../components/ProductGrid';

const allProducts = [
  {
    id: '1',
    name: 'Polera Oversize Esencial',
    slug: 'polera-oversize-esencial',
    mainImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    price: 39990,
    compareAtPrice: 49990,
    isNew: true,
    isSale: true,
    stockStatus: 'in-stock' as const,
    category: 'hombre',
    tags: ['basica', 'oversize', 'algodon', 'minimal'],
    description: 'Polera de algodón premium con corte relaxed y gran suavidad.',
  },
  {
    id: '2',
    name: 'Jeans Slim Fit Negro',
    slug: 'jeans-slim-fit-negro',
    mainImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    price: 59990,
    compareAtPrice: 69990,
    isNew: false,
    isSale: true,
    stockStatus: 'low-stock' as const,
    category: 'hombre',
    tags: ['jeans', 'negro', 'casual', 'fit'],
    description: 'Jean de corte slim y textura premium para looks diarios.',
  },
  {
    id: '3',
    name: 'Chaqueta Bomber Premium',
    slug: 'chaqueta-bomber-premium',
    mainImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    price: 89990,
    compareAtPrice: 109990,
    isNew: true,
    isSale: true,
    stockStatus: 'in-stock' as const,
    category: 'mujer',
    tags: ['chaqueta', 'bomber', 'premium', 'outerwear'],
    description: 'Chaqueta ligera ideal para transiciones de temporada.',
  },
  {
    id: '4',
    name: 'Vestido Verano Elegante',
    slug: 'vestido-verano-elegante',
    mainImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    price: 74990,
    compareAtPrice: 99990,
    isNew: false,
    isSale: true,
    stockStatus: 'in-stock' as const,
    category: 'mujer',
    tags: ['vestido', 'verano', 'elegante', 'flores'],
    description: 'Vestido fluidos y fresco para días de sol y eventos.',
  },
  {
    id: '5',
    name: 'Polera Básica Blanca',
    slug: 'polera-basica-blanca',
    mainImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    price: 32990,
    compareAtPrice: 42990,
    isNew: false,
    isSale: true,
    stockStatus: 'in-stock' as const,
    category: 'hombre',
    tags: ['blanco', 'basica', 'algodon', 'fina'],
    description: 'Referencia esencial en algodón con caída limpia.',
  },
  {
    id: '6',
    name: 'Pantalón Deportivo',
    slug: 'pantalon-deportivo',
    mainImage: 'https://images.unsplash.com/photo-1506629905607-ef5143a40005?auto=format&fit=crop&w=900&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    price: 54990,
    compareAtPrice: 64990,
    isNew: true,
    isSale: true,
    stockStatus: 'low-stock' as const,
    category: 'hombre',
    tags: ['deportivo', 'sport', 'comodo', 'running'],
    description: 'Pantalón cómodo con tejido técnico para movimiento.',
  },
  {
    id: '7',
    name: 'Blusa Seda Premium',
    slug: 'blusa-seda-premium',
    mainImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    price: 68990,
    compareAtPrice: 83990,
    isNew: true,
    isSale: true,
    stockStatus: 'in-stock' as const,
    category: 'mujer',
    tags: ['seda', 'blusa', 'premium', 'femenina'],
    description: 'Blusa premium con brillo suave y cortes modernos.',
  },
  {
    id: '8',
    name: 'Falda Midi Floreada',
    slug: 'falda-midi-floreada',
    mainImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    price: 62990,
    compareAtPrice: 79990,
    isNew: false,
    isSale: true,
    stockStatus: 'out-of-stock' as const,
    category: 'mujer',
    tags: ['falda', 'floral', 'midi', 'estilo'],
    description: 'Falda midi con estampado floral para un look romántico.',
  },
  {
    id: '9',
    name: 'Polerón Hombre Urbano',
    slug: 'polera-hombre-urbana',
    mainImage: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    price: 45990,
    compareAtPrice: 56990,
    isNew: true,
    isSale: true,
    stockStatus: 'in-stock' as const,
    category: 'hombre',
    tags: ['polerón', 'urbano', 'hombre', 'abrigo'],
    description: 'Polerón relajado con un acabado elegante y sobrio.',
  },
];

const normalize = (value: string) => value.toLowerCase().trim();

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const results = useMemo(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) {
      return [];
    }

    const terms = normalizedQuery.split(/\s+/).filter(Boolean);

    return allProducts.filter((product) => {
      const haystack = [
        product.name,
        product.category,
        product.description,
        product.tags?.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return terms.every((term) => haystack.includes(term));
    });
  }, [query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setError('Escribe una palabra clave para buscar.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      setIsSubmitting(false);
    }, 250);
  };

  const clearSearch = () => {
    setQuery('');
    setError('');
    router.push('/search?q=');
  };

  const hasSearch = Boolean(initialQuery.trim());

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Búsqueda inteligente
          </p>
          <h1 className="text-4xl font-bold text-primary">Buscar productos</h1>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busca por nombre, categoría o estilo"
              className="w-full rounded-full border border-stone-200 bg-white py-3 pl-12 pr-12 text-base text-primary shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 transition hover:bg-stone-100 hover:text-primary"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!hasSearch && !error && (
          <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 p-8 text-center text-stone-500">
            Escribe algo para descubrir prendas que coincidan con tu estilo.
          </div>
        )}

        {hasSearch && !isSubmitting && results.length === 0 && !error && (
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
            <p className="text-xl font-semibold text-primary">No encontramos resultados</p>
            <p className="mt-2 text-stone-500">
              Intenta con otra palabra clave como “polera”, “mujer”, “premium” o “flores”.
            </p>
          </div>
        )}

        {hasSearch && results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-500">
                Mostrando <span className="font-semibold text-primary">{results.length}</span> resultados para “{initialQuery}”
              </p>
            </div>
            <ProductGrid products={results} />
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center text-stone-500">
              Cargando búsqueda...
            </div>
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
