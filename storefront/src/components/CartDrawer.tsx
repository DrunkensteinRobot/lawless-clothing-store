'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
  const { isOpen, items, toggleCart, removeItem, updateQuantity, getCartTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0D0D0D] border-l border-[#2D2D2D] z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2D2D2D]">
              <h2 className="font-heading text-2xl tracking-wider text-white">YOUR CART</h2>
              <button
                onClick={toggleCart}
                className="text-[#9CA3AF] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[#9CA3AF] space-y-4">
                  <ShoppingBag className="w-12 h-12 opacity-50" />
                  <p className="font-sans">Your cart is currently empty.</p>
                  <button
                    onClick={toggleCart}
                    className="mt-4 px-6 py-3 bg-[#C0392B] text-white font-sans font-bold hover:bg-[#E74C3C] transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-[#1A1A1A] rounded-lg border border-[#2D2D2D]">
                    <div className="relative w-24 h-24 flex-shrink-0 bg-black overflow-hidden rounded">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#2D2D2D]"></div>
                      )}
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-sans font-semibold text-white line-clamp-1">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#9CA3AF] hover:text-[#C0392B] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-sm text-[#9CA3AF] mt-1">
                          {item.size && <span className="mr-3">Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#2D2D2D] rounded">
                          <button
                            onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-[#9CA3AF] hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 font-sans text-sm text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-[#9CA3AF] hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="font-sans font-bold text-white">
                          R {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#2D2D2D] bg-[#1A1A1A]">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-[#9CA3AF]">Subtotal</span>
                  <span className="font-heading text-2xl text-white">
                    R {getCartTotal().toFixed(2)}
                  </span>
                </div>
                <a 
                  href="/checkout"
                  onClick={toggleCart}
                  className="w-full py-4 bg-[#C0392B] hover:bg-[#E74C3C] text-white font-sans font-bold tracking-widest transition-colors flex justify-center items-center gap-2 text-center"
                >
                  SECURE CHECKOUT
                </a>
                <p className="text-xs text-center text-[#9CA3AF] mt-4 font-sans">
                  Shipping & taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
