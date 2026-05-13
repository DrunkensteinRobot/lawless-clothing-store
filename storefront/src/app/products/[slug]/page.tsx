import Header from '@/components/Header';
import { client } from '@/sanity/lib/client';
import { productBySlugQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

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
      
      <footer className="bg-[#1A1A1A] py-12 border-t border-[#2D2D2D] mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl tracking-widest text-[#2D2D2D] mb-4">LAWLESS</h2>
          <p className="text-[#9CA3AF] text-sm font-sans">© 2026 Lawless Clothing. Be Fearless. Be Lawless.</p>
        </div>
      </footer>
    </>
  );
}
