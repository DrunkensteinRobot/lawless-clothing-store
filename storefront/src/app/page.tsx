import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlideshow from '@/components/HeroSlideshow';
import ProductCard from '@/components/ProductCard';
import { client } from '@/sanity/lib/client';
import { heroBannerQuery, newArrivalsQuery } from '@/sanity/lib/queries';

export default async function Home() {
  const slides = await client.fetch(heroBannerQuery);
  const products = await client.fetch(newArrivalsQuery);

  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSlideshow slides={slides} />
        
        <section className="container mx-auto px-4 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl tracking-wide uppercase">New Arrivals</h2>
              <div className="w-20 h-1 bg-[#C0392B] mt-2"></div>
            </div>
            <a href="/new-arrivals" className="font-sans font-semibold text-[#9CA3AF] hover:text-white transition-colors underline-offset-4 hover:underline">
              View All
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
