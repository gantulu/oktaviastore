
import React, { useState } from 'react';
import { X, ChevronLeft, MapPin, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({ isOpen, onClose, items, onComplete }) => {
  const [step, setStep] = useState(1);
  const subtotal = items.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  const shipping = 25000;
  const total = subtotal + shipping;

  if (step === 3) {
    return (
      <div className={`fixed inset-0 z-[120] bg-white flex flex-col items-center justify-center p-8 transition-transform duration-500 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
          <CheckCircle2 size={60} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Order Success!</h2>
        <p className="text-gray-500 text-center mb-8">Your order has been placed and is being processed. Thank you for shopping with us!</p>
        <button 
          onClick={() => {
            onComplete();
            setStep(1);
          }}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl active:scale-95 transition-all shadow-lg shadow-indigo-100"
        >
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[110] bg-white transition-transform duration-500 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex flex-col h-full max-w-[500px] mx-auto">
        <header className="p-4 border-b border-gray-100 flex items-center gap-4">
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full"><ChevronLeft size={20}/></button>
          <h2 className="text-lg font-bold">Checkout</h2>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between px-4">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <span className="text-[10px] font-bold text-gray-500">Delivery</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-100'}`} />
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
              <span className="text-[10px] font-bold text-gray-500">Payment</span>
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <MapPin size={18} className="text-indigo-600"/> Shipping Address
                </h3>
                <div className="p-4 border-2 border-indigo-600 rounded-2xl bg-indigo-50/30">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-gray-900">Home Address</span>
                    <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">Default</span>
                  </div>
                  <p className="text-sm text-gray-600">Jane Doe | (+62) 812-3456-7890</p>
                  <p className="text-sm text-gray-500 mt-2">Jl. Senopati No. 123, Kebayoran Baru, Jakarta Selatan, 12190</p>
                </div>
                <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-400 flex items-center justify-center gap-2">
                  + Add New Address
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Order Summary</h3>
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img src={item.image} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.quantity}x • {item.selectedSize}, {item.selectedColor}</p>
                        <p className="text-sm font-black text-gray-900 mt-0.5">Rp {((item.discountPrice || item.price) * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard size={18} className="text-indigo-600"/> Payment Method
                </h3>
                <div className="space-y-3">
                  {['Bank Transfer', 'Credit Card', 'Oktavia Pay', 'COD'].map(method => (
                    <div key={method} className={`p-4 border-2 rounded-2xl flex items-center gap-3 cursor-pointer transition-all ${method === 'Oktavia Pay' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-indigo-200'}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'Oktavia Pay' ? 'border-indigo-600' : 'border-gray-300'}`}>
                        {method === 'Oktavia Pay' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                      </div>
                      <span className="font-bold text-gray-900">{method}</span>
                      {method === 'Oktavia Pay' && <span className="ml-auto text-sm font-bold text-indigo-600">Rp 1.500.000</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-gray-100 shadow-up">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-medium">Subtotal</span>
              <span className="text-gray-900 font-bold">Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-medium">Shipping</span>
              <span className="text-gray-900 font-bold">Rp {shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg pt-2 border-t">
              <span className="text-gray-900 font-black">Total Amount</span>
              <span className="text-indigo-600 font-black">Rp {total.toLocaleString()}</span>
            </div>
          </div>

          {step === 1 ? (
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
            >
              Continue to Payment
              <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={() => setStep(3)}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutDrawer;
