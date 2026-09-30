import ProductGrid from "../../components/ProductGrid";
import { makePlaceholderImage } from '../../lib/demoImages';

const dummyMenProducts = [
  {
    id: '1',
    name: 'Polera Hombre Urbana',
    slug: 'polera-hombre-urbana',
    mainImage: makePlaceholderImage('Hombre 1', '#333333', '#FFFFFF', 400, 500),
    hoverImage: makePlaceholderImage('Hombre 1', '#666666', '#FFFFFF', 400, 500),
    price: 25990,
    compareAtPrice: 30000,
    isNew: true,
    isSale: true,
    stockStatus: 'in-stock',
  },
  {
    id: '2',
    name: 'Pantalón Cargo Hombre',
    slug: 'pantalon-cargo-hombre',
    mainImage: makePlaceholderImage('Hombre 2', '#444444', '#FFFFFF', 400, 500),
    price: 49990,
    isNew: false,
    isSale: false,
    stockStatus: 'low-stock',
  },
  {
    id: '3',
    name: 'Chaqueta Denim Hombre',
    slug: 'chaqueta-denim-hombre',
    mainImage: makePlaceholderImage('Hombre 3', '#555555', '#FFFFFF', 400, 500),
    price: 69990,
    isNew: true,
    isSale: false,
    stockStatus: 'out-of-stock',
  },
];

export default function HombrePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">Colección Hombre</h1>
      <ProductGrid products={dummyMenProducts} />
    </div>
  );
}
