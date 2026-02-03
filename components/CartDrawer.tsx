
import React from 'react';
// Added ShoppingCart to the import list from lucide-react
import { X, Trash2, ChevronRight, Plus, Minus, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}) => {
  const total = items.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-white z-[70] shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {items.length} items
              </span>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="text-gray-400" size={40} />
                </div>
                <h3 className="text-gray-900 font-bold mb-1">Your cart is empty</h3>
                <p className="text-gray-500 text-sm">Looks like you haven't added anything to your cart yet.</p>
                <button 
                  onClick={onClose}
                  className="mt-6 px-6 py-2 bg-indigo-600 text-white font-bold rounded-full shadow-lg"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 border border-gray-100 rounded-2xl shadow-sm bg-gray-50/50">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-white shadow-inner" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500 mb-2">
                      {item.selectedColor}, {item.selectedSize}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-indigo-600">
                        Rp {((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                      </span>
                      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-1">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-0.5"><Minus size={14}/></button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-0.5"><Plus size={14}/></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-xl font-black text-gray-900">Rp {total.toLocaleString()}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-95"
              >
                Go to Checkout
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
