import ProductGrid from "../../components/ProductGrid";
import { makePlaceholderImage } from '../../lib/demoImages';

const dummyWomenProducts = [
  {
    id: '4',
    name: 'Vestido Verano Elegante',
    slug: 'vestido-verano-elegante',
    mainImage: makePlaceholderImage('Mujer 1', '#bbbbbb', '#FFFFFF', 400, 500),
    price: 34990,
    isNew: false,
    isSale: false,
    stockStatus: 'in-stock',
  },
  {
    id: '5',
    name: 'Blusa Seda Premium',
    slug: 'blusa-seda-premium',
    mainImage: makePlaceholderImage('Mujer 2', '#cccccc', '#FFFFFF', 400, 500),
    hoverImage: makePlaceholderImage('Mujer 2', '#999999', '#FFFFFF', 400, 500),
    price: 28990,
    isNew: true,
    isSale: false,
    stockStatus: 'in-stock',
  },
  {
    id: '6',
    name: 'Falda Midi Floreada',
    slug: 'falda-midi-floreada',
    mainImage: makePlaceholderImage('Mujer 3', '#dddddd', '#FFFFFF', 400, 500),
    price: 21990,
    isNew: false,
    isSale: true,
    stockStatus: 'low-stock',
  },
];

export default function MujerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">Colección Mujer</h1>
      <ProductGrid products={dummyWomenProducts} />
    </div>
  );
}
