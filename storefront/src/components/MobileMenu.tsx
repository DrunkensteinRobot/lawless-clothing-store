'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const menuItems = [
    { label: 'NEW ARRIVALS', href: '/new-arrivals' },
    { label: 'COLLECTIONS', href: '/collections' },
    { label: 'INSTAGRAM', href: '/instagram' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '#' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0D0D0D] border-b border-[#2D2D2D]"
    >
      <nav className="flex flex-col divide-y divide-[#2D2D2D]">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="px-4 py-3 text-sm font-sans text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
