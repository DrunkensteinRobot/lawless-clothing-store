import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/sanity/lib/client';
import { allProductsQuery, categoriesQuery } from '@/sanity/lib/queries';
import CollectionsFilterClient from '@/components/CollectionsFilterClient';

export const revalidate = 0;

export default async function CollectionCategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const products = await client.fetch(allProductsQuery);
  const categories = await client.fetch(categoriesQuery);
  
  const currentCategory = categories.find((c: any) => c.slug === slug);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20 flex-grow">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8">
          <div>
            <h1 className="font-heading text-5xl md:text-7xl tracking-wide uppercase">
              {currentCategory ? currentCategory.title : slug.replace('-', ' ')}
            </h1>
            <div className="w-24 h-1.5 bg-[#C0392B] mt-4"></div>
          </div>
          <p className="text-[#9CA3AF] font-sans max-w-sm mt-6 md:mt-0 text-right">
            Explore the full archive. From heavyweight essentials to limited midnight drops.
          </p>
        </div>

        <CollectionsFilterClient products={products} categories={categories} initialCategory={slug} />
      </main>
      <Footer />
    </>
  );
}
