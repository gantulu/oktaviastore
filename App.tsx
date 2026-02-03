
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import FlashSale from './components/FlashSale';
import ProductList from './components/ProductList';
import ProfileSection from './components/ProfileSection';
import CartDrawer from './components/CartDrawer';
import ProductDetailDrawer from './components/ProductDetailDrawer';
import CheckoutDrawer from './components/CheckoutDrawer';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'main' | 'profile'>('main');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const addToCart = (product: Product, color: string, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === color && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedColor === color && item.selectedSize === size) 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColor: color, selectedSize: size }];
    });
    setIsDetailOpen(false);
    // Visual feedback
    setTimeout(() => setIsCartOpen(true), 300);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const completeOrder = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveSection('main');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => setActiveSection(prev => prev === 'main' ? 'profile' : 'main')}
        isProfileActive={activeSection === 'profile'}
      />

      <main className="flex-1 overflow-y-auto bg-gray-50">
        {activeSection === 'main' ? (
          <div className="p-4">
            <BannerSlider />
            <FlashSale 
              products={PRODUCTS} 
              onProductClick={handleProductClick} 
              isLoading={isLoading} 
            />
            <ProductList 
              products={PRODUCTS} 
              onProductClick={handleProductClick} 
              isLoading={isLoading} 
            />
          </div>
        ) : (
          <ProfileSection />
        )}
      </main>

      {/* Drawers */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <ProductDetailDrawer 
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        onAddToCart={addToCart}
      />

      <CheckoutDrawer 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onComplete={completeOrder}
      />

      {/* Persistent Bottom Nav (Simplified for mobile feel) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[500px] mx-auto bg-white/80 backdrop-blur-xl border-t border-gray-100 h-16 flex items-center justify-around px-6 z-30">
        <button 
          onClick={() => setActiveSection('main')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeSection === 'main' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <div className={`w-1 h-1 rounded-full mb-1 ${activeSection === 'main' ? 'bg-indigo-600' : 'bg-transparent'}`} />
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button 
          className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-200 -mt-8 border-4 border-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button 
          onClick={() => setActiveSection('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeSection === 'profile' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <div className={`w-1 h-1 rounded-full mb-1 ${activeSection === 'profile' ? 'bg-indigo-600' : 'bg-transparent'}`} />
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default App;
