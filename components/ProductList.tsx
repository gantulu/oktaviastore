
import React from 'react';
import { Product } from '../types';
import { ProductSkeleton } from './Skeleton';

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  isLoading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick, isLoading }) => {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg font-bold text-gray-900">All Products</h2>
        <div className="flex gap-2">
          <button className="text-xs bg-gray-100 px-3 py-1.5 rounded-full font-medium text-gray-600">Popular</button>
          <button className="text-xs bg-indigo-600 px-3 py-1.5 rounded-full font-medium text-white">Latest</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
        ) : (
          products.map((product) => (
            <div 
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden active:scale-[0.98] transition-all cursor-pointer group"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-3">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{product.category}</span>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold text-gray-900">
                    Rp {(product.discountPrice || product.price).toLocaleString()}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <span className="text-lg font-bold">+</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductList;
