
import React from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
  isProfileActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onProfileClick, isProfileActive }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">O</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Oktavia<span className="text-indigo-600">Store</span></h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-indigo-600 transition-colors">
          <Search size={24} />
        </button>
        <button 
          onClick={onCartClick}
          className="relative text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button 
          onClick={onProfileClick}
          className={`p-1 rounded-full transition-colors ${isProfileActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
        >
          <User size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
