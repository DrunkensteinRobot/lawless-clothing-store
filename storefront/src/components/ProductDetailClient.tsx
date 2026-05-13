'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetailClient({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(product.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Basic validation
    if (product.sizes?.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      alert('Please select a color');
      return;
    }

    addItem({
      id: `${product._id}-${selectedSize || 'none'}-${selectedColor || 'none'}`,
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      imageUrl: product.images?.[0]
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-12">
      {/* Left Column: Image Gallery */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="relative w-full aspect-[4/5] bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2D2D2D]">
          {selectedImage ? (
            <Image src={selectedImage} alt={product.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]">No Image Available</div>
          )}
        </div>
        
        {/* Thumbnails */}
        {product.images?.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-24 flex-shrink-0 bg-[#1A1A1A] rounded overflow-hidden border transition-all ${selectedImage === img ? 'border-[#C0392B] opacity-100' : 'border-[#2D2D2D] opacity-60 hover:opacity-100'}`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Details */}
      <div className="w-full md:w-1/2 flex flex-col space-y-8">
        <div>
          {/* Badges */}
          <div className="flex gap-2 mb-4">
            {product.isNewArrival && (
              <span className="px-3 py-1 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full">New Arrival</span>
            )}
            {product.isBestSeller && (
              <span className="px-3 py-1 bg-[#1A1A1A] text-white border border-[#2D2D2D] text-xs font-bold tracking-widest uppercase rounded-full">Best Seller</span>
            )}
          </div>
          <h1 className="font-heading text-4xl md:text-6xl uppercase tracking-wider mb-2">{product.name}</h1>
          <p className="font-sans text-2xl text-[#9CA3AF]">R {product.price.toFixed(2)}</p>
        </div>

        {/* Short Description */}
        <p className="font-sans text-white text-lg leading-relaxed">{product.shortDescription}</p>

        {/* Form Options */}
        <div className="space-y-6">
          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm">Size</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center border font-sans font-bold transition-all
                      ${selectedSize === size ? 'border-[#C0392B] bg-[#C0392B] text-white' : 'border-[#2D2D2D] text-[#9CA3AF] hover:border-white hover:text-white'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div>
              <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-2">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border font-sans font-bold transition-all uppercase text-sm tracking-wider
                      ${selectedColor === color ? 'border-[#C0392B] bg-[#C0392B] text-white' : 'border-[#2D2D2D] text-[#9CA3AF] hover:border-white hover:text-white'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Warning */}
          {typeof product.stock === 'number' && product.stock <= 5 && product.stock > 0 && (
            <p className="font-sans text-[#C0392B] text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C0392B] animate-pulse"></span>
              Low Stock: Only {product.stock} left!
            </p>
          )}

          {product.stock === 0 && (
            <p className="font-sans text-[#9CA3AF] text-sm font-bold">Out of Stock</p>
          )}
        </div>

        {/* Add to Cart Actions */}
        <div className="flex gap-4 pt-6 border-t border-[#2D2D2D]">
          {/* Quantity */}
          <div className="flex items-center border border-[#2D2D2D] h-14 px-4 bg-[#1A1A1A]">
            <button 
              onClick={() => quantity > 1 && setQuantity(q => q - 1)}
              className="text-[#9CA3AF] hover:text-white px-2"
            >
              -
            </button>
            <span className="font-sans font-bold w-8 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="text-[#9CA3AF] hover:text-white px-2"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-grow h-14 font-sans font-bold tracking-widest uppercase transition-colors
              ${product.stock === 0 
                ? 'bg-[#2D2D2D] text-[#9CA3AF] cursor-not-allowed' 
                : 'bg-white text-black hover:bg-[#C0392B] hover:text-white'}`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>

        {/* Full Details Portable Text */}
        {product.details && (
          <div className="pt-8 mt-8 border-t border-[#2D2D2D]">
            <h3 className="font-heading text-2xl tracking-widest mb-4">Product Details</h3>
            <div className="prose prose-invert prose-p:text-[#9CA3AF] prose-p:font-sans prose-p:leading-relaxed max-w-none">
              <PortableText value={product.details} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
