import { client } from '../../../sanity/lib/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: any;
}

async function getProduct(id: string): Promise<Product | null> {
  const product = await client.fetch('*[_type == "product" && _id == $id][0]', { id });
  return product;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <Image
              src={product.image?.asset?.url || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-heading mb-4">{product.name}</h1>
            <p className="text-2xl font-body text-muted mb-6">${product.price}</p>
            <button className="bg-primary text-light py-3 px-6 rounded font-body hover:bg-secondary transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}