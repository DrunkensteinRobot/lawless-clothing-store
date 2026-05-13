'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import CartDrawer from './CartDrawer';
import MobileMenu from './MobileMenu';
import { useEffect, useState } from 'react';

export default function Header() {
  const { toggleCart, items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent hydration mismatch on the cart count
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate total items in cart
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#0D0D0D]/80 backdrop-blur-md border-b border-[#2D2D2D]">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-wider text-white relative group flex-shrink-0">
            LAWLESS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C0392B] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-sm tracking-wide text-[#9CA3AF]">
            <Link href="/new-arrivals" className="hover:text-white transition-colors relative group py-2">
              NEW ARRIVALS
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C0392B] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/collections" className="hover:text-white transition-colors relative group py-2">
              COLLECTIONS
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C0392B] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/instagram" className="hover:text-white transition-colors relative group py-2">
              INSTAGRAM
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C0392B] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="hover:text-white transition-colors relative group py-2">
              ABOUT
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C0392B] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-[#9CA3AF] hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            
            <button className="text-[#9CA3AF] hover:text-white transition-colors hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>

            <button onClick={toggleCart} className="relative text-white group">
              <motion.div whileTap={{ scale: 0.9 }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-[#C0392B] transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </motion.div>
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#C0392B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-1"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
      </header>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />
    </>
  );
}