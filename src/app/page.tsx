import Image from "next/image";
import ProductGrid from "../components/ProductGrid";
import Link from 'next/link';
import { makePlaceholderImage } from '../lib/demoImages';
import hombreCardImage from '../imagenes/hombre-card.png';
import mujerCardImage from '../imagenes/mujer-card.png';

const dummyProducts = [
  {
    id: '1',
    name: 'Polera Oversize Esencial',
    slug: 'polera-oversize-esencial',
    mainImage: makePlaceholderImage('Producto 1', '#cccccc', '#ffffff', 400, 500),
    hoverImage: makePlaceholderImage('Producto 1', '#999999', '#ffffff', 400, 500),
    price: 29990,
    compareAtPrice: 39990,
    isNew: true,
    isSale: true,
    stockStatus: 'in-stock',
  },
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
    id: '3',
    name: 'Chaqueta Bomber Premium',
    slug: 'chaqueta-bomber-premium',
    mainImage: makePlaceholderImage('Producto 3', '#888888', '#ffffff', 400, 500),
    price: 79990,
    isNew: true,
    isSale: false,
    stockStatus: 'out-of-stock',
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

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        <Image
          src={makePlaceholderImage('', '#26364d', '#fff8e9', 1920, 800)}
          alt="Hero Visual"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#182438]/45 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Descubre el Estilo FEBEFLO
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-md">
            Moda premium que redefine tu presencia. Exclusividad en cada detalle.
          </p>
          <Link href="/shop" className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg">
            Explorar Colección
          </Link>
        </div>
      </section>

      {/* CTA Principal */}
      <section className="container mx-auto my-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Viste la diferencia. Siente la exclusividad.</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">Cada prenda FEBEFLO es una declaración de estilo y calidad. Sumérgete en nuestra colección.</p>
        <Link href="/shop" className="bg-primary hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-md">
          Comprar Ahora
        </Link>
      </section>

      {/* Categorías Hombre / Mujer */}
      <section className="container mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">Nuestras Colecciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg group">
            <Image
              src={hombreCardImage}
              alt="Colección Hombre"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
              <Link href="/hombre" className="text-white text-3xl font-bold uppercase tracking-wider group-hover:text-accent transition-colors">
                Hombre
              </Link>
            </div>
          </div>
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg group">
            <Image
              src={mujerCardImage}
              alt="Colección Mujer"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
              <Link href="/mujer" className="text-white text-3xl font-bold uppercase tracking-wider group-hover:text-accent transition-colors">
                Mujer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="container mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">Productos Destacados</h2>
        <ProductGrid products={dummyProducts} />
      </section>

      {/* Nuevos Productos */}
      <section className="container mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">Nuevos Lanzamientos</h2>
        <ProductGrid products={dummyProducts.filter(p => p.isNew)} />
      </section>

      {/* Sección Promocional */}
      <section className="relative w-full h-96 bg-gray-900 my-16 overflow-hidden">
        <Image
          src={makePlaceholderImage('Promoción', '#1a1a1a', '#ffffff', 1920, 400)}
          alt="Promoción Especial"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Ofertas Exclusivas</h2>
          <p className="text-lg text-white mb-8 max-w-xl drop-shadow-md">No te pierdas nuestras promociones por tiempo limitado. ¡Renueva tu estilo hoy!</p>
          <Link href="/ofertas" className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg">
            Ver Ofertas
          </Link>
        </div>
      </section>

      {/* Productos Recomendados (using the same dummy products for now) */}
      <section className="container mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">También te podría gustar</h2>
        <ProductGrid products={dummyProducts} />
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-100 py-16 my-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Únete a la Comunidad FEBEFLO</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">Recibe las últimas noticias, ofertas exclusivas y novedades de nuestra colección directamente en tu bandeja de entrada.</p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button type="submit" className="bg-primary hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-r-lg transition-all duration-300">
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
