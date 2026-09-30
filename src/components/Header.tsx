'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { Search, User, Heart, ShoppingCart, Menu } from 'lucide-react';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfce] bg-[#fffaf1]/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="md:hidden">
          <button aria-label="Toggle Menu" type="button">
            <Menu className="h-6 w-6 text-primary" />
          </button>
        </div>

        <div className="flex-grow text-center md:flex-none md:text-left">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 md:flex">
          <Link href="/hombre" className="text-primary transition-colors hover:text-accent">
            Hombre
          </Link>
          <Link href="/mujer" className="text-primary transition-colors hover:text-accent">
            Mujer
          </Link>
          <Link href="/shop" className="text-primary transition-colors hover:text-accent">
            Shop
          </Link>
          <Link href="/favorites" className="text-primary transition-colors hover:text-accent">
            Ofertas
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/search?q=" aria-label="Search" className="inline-flex items-center">
            <Search className="h-6 w-6 text-primary transition-colors hover:text-accent" />
          </Link>

          <Link
            href={user ? '/account' : '/login'}
            aria-label="Account"
            className="hidden items-center md:inline-flex"
          >
            <User className="h-6 w-6 text-primary transition-colors hover:text-accent" />
          </Link>

          <Link href="/favorites" aria-label="Favorites" className="hidden items-center md:inline-flex">
            <Heart className="h-6 w-6 text-primary transition-colors hover:text-accent" />
          </Link>

          <button onClick={onCartClick} aria-label="Cart" type="button">
            <ShoppingCart className="h-6 w-6 text-primary transition-colors hover:text-accent" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
