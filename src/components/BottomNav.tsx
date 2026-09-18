import { useState } from 'react';

type TabType = 'home' | 'explore' | 'cart' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount: number;
}

const tabs: { id: TabType; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'fa-house' },
  { id: 'explore', label: 'Explore', icon: 'fa-compass' },
  { id: 'cart', label: 'Cart', icon: 'fa-bag-shopping' },
  { id: 'profile', label: 'Profile', icon: 'fa-user' },
];

export default function BottomNav({ activeTab, onTabChange, cartCount }: BottomNavProps) {
  const [pressedTab, setPressedTab] = useState<TabType | null>(null);

  return (
    <nav className="shrink-0 bg-black/95 backdrop-blur-xl border-t border-white/5 px-2 pb-2 pt-1">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isPressed = pressedTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              onTouchStart={() => setPressedTab(tab.id)}
              onTouchEnd={() => setPressedTab(null)}
              className={`
                relative flex flex-col items-center justify-center py-2 px-5 rounded-2xl transition-all duration-200
                ${isActive ? 'text-white' : 'text-gray-500'}
                ${isPressed ? 'scale-90' : 'scale-100'}
              `}
            >
              <div className="relative">
                {isActive && (
                  <div className="absolute -inset-2 bg-violet-500/15 rounded-full blur-md" />
                )}
                <i className={`fa-solid ${tab.icon} text-lg relative z-10`} />
                {tab.id === 'cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-violet-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium transition-all ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-violet-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
