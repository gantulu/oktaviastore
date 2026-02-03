
import React from 'react';
import { Settings, CreditCard, Package, MapPin, Bell, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';

const ProfileSection: React.FC = () => {
  const menuItems = [
    { icon: <Package size={20}/>, label: 'My Orders', color: 'bg-blue-50 text-blue-500' },
    { icon: <CreditCard size={20}/>, label: 'My Payments', color: 'bg-purple-50 text-purple-500' },
    { icon: <MapPin size={20}/>, label: 'Addresses', color: 'bg-orange-50 text-orange-500' },
    { icon: <Bell size={20}/>, label: 'Notifications', color: 'bg-yellow-50 text-yellow-500' },
    { icon: <ShieldCheck size={20}/>, label: 'Security', color: 'bg-green-50 text-green-500' },
    { icon: <Settings size={20}/>, label: 'Settings', color: 'bg-gray-50 text-gray-500' },
  ];

  return (
    <div className="p-4 space-y-8 animate-in slide-in-from-right duration-300">
      <div className="flex flex-col items-center text-center py-6 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] shadow-xl text-white">
        <div className="relative mb-4">
          <img 
            src="https://picsum.photos/seed/user/200/200" 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-4 border-white/20 object-cover shadow-lg"
          />
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full" />
        </div>
        <h2 className="text-xl font-black">Jane Doe</h2>
        <p className="text-indigo-200 text-sm font-medium">jane.doe@example.com</p>
        <div className="mt-4 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md text-xs font-bold border border-white/10">
          GOLD MEMBER
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-indigo-100 active:scale-[0.98] transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
              {item.icon}
            </div>
            <span className="font-bold text-gray-700 flex-1 text-left">{item.label}</span>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
          </button>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold border-2 border-red-50/50 rounded-2xl hover:bg-red-50 transition-colors">
        <LogOut size={20} />
        Log Out
      </button>
      
      <div className="text-center py-4">
        <p className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">OktaviaStore v2.4.0</p>
      </div>
    </div>
  );
};

export default ProfileSection;
