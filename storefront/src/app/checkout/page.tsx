'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutClient from '@/components/CheckoutClient';
import Script from 'next/script';

export default function CheckoutPage() {
  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20 flex-grow">
        <div className="mb-12">
          <h1 className="font-heading text-4xl md:text-6xl tracking-wide uppercase">Secure Checkout</h1>
          <div className="w-20 h-1 bg-[#C0392B] mt-4"></div>
        </div>
        
        <CheckoutClient />
      </main>
      <Footer />
    </>
  );
}
