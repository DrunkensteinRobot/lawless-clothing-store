import Header from '@/components/Header';
import dynamic from 'next/dynamic';

const CheckoutClient = dynamic(() => import('@/components/CheckoutClient'), {
  ssr: false,
});

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20 flex-grow">
        <div className="mb-12">
          <h1 className="font-heading text-4xl md:text-6xl tracking-wide uppercase">Secure Checkout</h1>
          <div className="w-20 h-1 bg-[#C0392B] mt-4"></div>
        </div>
        
        <CheckoutClient />
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
