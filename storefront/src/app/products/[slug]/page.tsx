import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/sanity/lib/client';
import { productBySlugQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const product = await client.fetch(productBySlugQuery, { slug });

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20 flex-grow">
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </>
  );
}
