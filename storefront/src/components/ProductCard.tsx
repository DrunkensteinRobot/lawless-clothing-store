'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: {
    name: string;
    slug: string;
    price: number;
    shortDescription: string;
    imageUrl: string;
    isNewArrival?: boolean;
    isBestSeller?: boolean;
    stock?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group flex flex-col"
    >
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] bg-[#1A1A1A] overflow-hidden mb-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#C0392B] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Best Seller
            </span>
          )}
        </div>
        
        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#2D2D2D]">
              No Image
            </div>
          )}
        </motion.div>
        
        {/* Add to Cart Quick Action (Desktop Hover + Mobile Visible) */}
        <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button className="w-full bg-[#0D0D0D] text-white py-2 sm:py-3 text-xs sm:text-sm font-bold tracking-wider hover:bg-[#C0392B] transition-colors active:scale-95">
            QUICK ADD
          </button>
        </div>
        
        {/* Mobile visible add to cart button */}
        <div className="md:hidden absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
          <button className="w-full bg-[#C0392B] text-white py-2 text-xs font-bold tracking-wider hover:bg-[#E74C3C] transition-colors active:scale-95">
            ADD TO CART
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2 sm:gap-4">
          <Link href={`/products/${product.slug}`} className="font-sans font-semibold text-base sm:text-lg text-white hover:text-[#C0392B] transition-colors line-clamp-1 flex-1">
            {product.name}
          </Link>
          <span className="font-accent font-medium text-white text-sm sm:text-base whitespace-nowrap">
            R {product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-sm text-[#9CA3AF] line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-[#C0392B] font-bold mt-2 uppercase tracking-wide">
            Only {product.stock} left
          </p>
        )}
      </div>
    </motion.div>
  );
}