import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-primary py-10 text-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-[0.12em]">FEBEFLO</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-stone-300">Moda contemporánea desde Chile. Compra informada y atención transparente.</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-stone-300 sm:grid-cols-3" aria-label="Enlaces legales">
            <Link href="/terminos" className="transition hover:text-accent">Términos</Link>
            <Link href="/privacidad" className="transition hover:text-accent">Privacidad</Link>
            <Link href="/cookies" className="transition hover:text-accent">Cookies</Link>
            <Link href="/envios" className="transition hover:text-accent">Envíos</Link>
            <Link href="/cambios-y-devoluciones" className="transition hover:text-accent">Garantía</Link>
            <Link href="/aviso-legal" className="transition hover:text-accent">Aviso legal</Link>
          </nav>
        </div>
        <p className="pt-6 text-xs text-stone-400">© {new Date().getFullYear()} FEBEFLO · RUT 15.360.881-4 · Chile</p>
      </div>
    </footer>
  );
};

export default Footer;
