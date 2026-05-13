import Header from '@/components/Header';
import { client } from '@/sanity/lib/client';
import { allProductsQuery, categoriesQuery } from '@/sanity/lib/queries';
import CollectionsFilterClient from '@/components/CollectionsFilterClient';

export default async function CollectionsPage() {
  const products = await client.fetch(allProductsQuery);
  const categories = await client.fetch(categoriesQuery);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20 flex-grow">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8">
          <div>
            <h1 className="font-heading text-5xl md:text-7xl tracking-wide uppercase">All Collections</h1>
            <div className="w-24 h-1.5 bg-[#C0392B] mt-4"></div>
          </div>
          <p className="text-[#9CA3AF] font-sans max-w-sm mt-6 md:mt-0 text-right">
            Explore the full archive. From heavyweight essentials to limited midnight drops.
          </p>
        </div>

        <CollectionsFilterClient products={products} categories={categories} />
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
