import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 0;

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl tracking-wide uppercase mb-8 text-center">About Lawless</h1>
          <div className="w-24 h-1.5 bg-[#C0392B] mx-auto mb-12"></div>
          
          <div className="space-y-8 text-[#9CA3AF] font-sans leading-relaxed text-lg">
            <p>
              Born from the raw energy of street culture, <strong className="text-white font-bold">LAWLESS</strong> isn't just a clothing brand. It's a statement of defiance. A uniform for the fearless.
            </p>
            <p>
              We believe that true style isn't dictated by the masses; it's forged by those who dare to break the rules. Every piece in our collection is meticulously crafted with premium materials, designed to withstand the grit of the city while maintaining an uncompromising aesthetic.
            </p>
            <p>
              From our heavyweight hoodies to our precision-cut tees, Lawless is built for those who lead, not follow. We drop limited collections, ensuring that when you wear our brand, you stand out from the crowd.
            </p>
            <div className="mt-12 text-center pt-8 border-t border-[#2D2D2D]">
              <p className="font-heading text-3xl text-white tracking-widest uppercase">Be Fearless. Be Lawless.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
