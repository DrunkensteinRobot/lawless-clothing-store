import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { client } from '@/sanity/lib/client';
import { newArrivalsQuery } from '@/sanity/lib/queries';

export const revalidate = 0;

export default async function NewArrivalsPage() {
  const products = await client.fetch(newArrivalsQuery);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20 flex-grow">
        <div className="mb-12">
          <h1 className="font-heading text-5xl md:text-7xl tracking-wide uppercase">New Arrivals</h1>
          <div className="w-24 h-1.5 bg-[#C0392B] mt-4"></div>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-[#9CA3AF] py-10">No new arrivals at the moment. Check back soon!</p>
        )}
      </main>
      <Footer />
    </>
  );
}
