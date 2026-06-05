'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { Search } from 'lucide-react';

export default function CollectionsFilterClient({ products, categories, initialCategory = null }: { products: any[], categories: any[], initialCategory?: string | null }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  // Sync state with prop if it changes (e.g., navigating back)
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const handleCategoryClick = (slug: string | null) => {
    setSelectedCategory(slug);
    if (slug) {
      router.push(`/collections/${slug}`, { scroll: false });
    } else {
      router.push(`/collections`, { scroll: false });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? product.categorySlug === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 pb-6 border-b border-[#2D2D2D] items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 font-sans text-sm tracking-wide transition-colors whitespace-nowrap border ${
              selectedCategory === null ? 'border-[#C0392B] bg-[#C0392B] text-white' : 'border-[#2D2D2D] text-[#9CA3AF] hover:text-white'
            }`}
          >
            ALL
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`px-4 py-2 font-sans text-sm tracking-wide transition-colors whitespace-nowrap border ${
                selectedCategory === cat.slug ? 'border-[#C0392B] bg-[#C0392B] text-white' : 'border-[#2D2D2D] text-[#9CA3AF] hover:text-white'
              }`}
            >
              {cat.title.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-2 pl-10 focus:outline-none focus:border-[#C0392B] transition-colors font-sans"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#9CA3AF]" />
        </div>
      </div>

      {/* Product Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={product.slug}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="w-full py-20 text-center text-[#9CA3AF] font-sans">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
}
