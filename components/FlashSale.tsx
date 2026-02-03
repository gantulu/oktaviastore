
import React from 'react';
import { Product } from '../types';
import { Timer } from 'lucide-react';

interface FlashSaleProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  isLoading: boolean;
}

const FlashSale: React.FC<FlashSaleProps> = ({ products, onProductClick, isLoading }) => {
  const flashProducts = products.filter(p => p.discountPrice);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between px-1 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-red-500 text-white p-1.5 rounded-lg">
            <Timer size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Flash Sale</h2>
          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded border border-red-200">
            01:24:59
          </span>
        </div>
        <button className="text-sm font-semibold text-indigo-600">See All</button>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 px-1">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="min-w-[160px] h-60 bg-gray-100 animate-pulse rounded-xl"></div>
          ))
        ) : (
          flashProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => onProductClick(product)}
              className="min-w-[160px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 active:scale-95 transition-transform cursor-pointer"
            >
              <div className="relative aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
                  {Math.round((1 - (product.discountPrice || 0) / product.price) * 100)}% OFF
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 truncate mb-1">{product.name}</h3>
                <p className="text-xs text-gray-400 line-through">Rp {product.price.toLocaleString()}</p>
                <p className="text-sm font-bold text-indigo-600">Rp {product.discountPrice?.toLocaleString()}</p>
                <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full w-[70%]"></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">70% Sold</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default FlashSale;
