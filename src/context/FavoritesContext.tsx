'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type FavoriteProduct = {
  id: string;
  slug: string;
  name: string;
  mainImage: string;
  hoverImage?: string;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
  stockStatus?: 'in-stock' | 'low-stock' | 'out-of-stock';
};

interface FavoritesContextType {
  favorites: FavoriteProduct[];
  favoritesCount: number;
  isFavorite: (productId: string) => boolean;
  addFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: FavoriteProduct) => boolean;
  clearFavorites: () => void;
}

const FAVORITES_STORAGE_KEY = 'febeflo_favorites';
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (productId: string) => favorites.some((item) => item.id === productId);

  const addFavorite = (product: FavoriteProduct) => {
    setFavorites((current) => {
      if (current.some((item) => item.id === product.id)) {
        return current;
      }

      return [product, ...current];
    });
  };

  const removeFavorite = (productId: string) => {
    setFavorites((current) => current.filter((item) => item.id !== productId));
  };

  const toggleFavorite = (product: FavoriteProduct) => {
    const isCurrentlyFavorite = isFavorite(product.id);

    if (isCurrentlyFavorite) {
      removeFavorite(product.id);
      return false;
    }

    addFavorite(product);
    return true;
  };

  const clearFavorites = () => setFavorites([]);

  const value = useMemo<FavoritesContextType>(
    () => ({
      favorites,
      favoritesCount: favorites.length,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
