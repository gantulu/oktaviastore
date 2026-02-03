
import React, { useState } from 'react';
import { X, ChevronLeft, Star, Share2, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

const ProductDetailDrawer: React.FC<ProductDetailDrawerProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart 
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes[0]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex flex-col h-full max-w-[500px] mx-auto bg-white">
        {/* FullDrawer Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white/80 backdrop-blur-md">
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full active:scale-90 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-100 rounded-full"><Share2 size={20} /></button>
            <button className="p-2 bg-gray-100 rounded-full"><Heart size={20} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-24">
          <div className="relative aspect-[4/5] bg-gray-50">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="px-6 py-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-xs">
                {product.category}
                <div className="flex items-center text-yellow-500 ml-auto gap-1">
                  <Star size={16} fill="currentColor" />
                  <span className="text-gray-900 text-sm font-bold">4.8</span>
                  <span className="text-gray-400 font-medium text-xs">(124 reviews)</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h2>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-indigo-600">
                  Rp {(product.discountPrice || product.price).toLocaleString()}
                </span>
                {product.discountPrice && (
                  <span className="text-gray-400 line-through font-medium">
                    Rp {product.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Choose Color</h4>
              <div className="flex gap-3">
                {product.variants.colors.map((color) => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${selectedColor === color ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-100 text-gray-400 hover:border-indigo-200'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Choose Size</h4>
              <div className="flex gap-3 flex-wrap">
                {product.variants.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl text-sm font-bold transition-all border-2 ${selectedSize === size ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' : 'border-gray-100 text-gray-400 hover:border-indigo-200'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-900">Description</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at varius enim. 
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Call to Action */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[500px] mx-auto p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex gap-4 z-20">
          <button 
            className="w-14 h-14 rounded-2xl border-2 border-indigo-600 flex items-center justify-center text-indigo-600 active:scale-90 transition-transform"
            onClick={() => onAddToCart(product, selectedColor, selectedSize)}
          >
            <ShoppingBag size={24} />
          </button>
          <button 
            onClick={() => onAddToCart(product, selectedColor, selectedSize)}
            className="flex-1 bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-indigo-100"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDrawer;
