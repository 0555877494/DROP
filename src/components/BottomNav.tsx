import { useState } from 'react';

type TabType = 'home' | 'tasks' | 'stats' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'fa-house' },
  { id: 'tasks', label: 'Tasks', icon: 'fa-check-circle' },
  { id: 'stats', label: 'Stats', icon: 'fa-chart-line' },
  { id: 'profile', label: 'Profile', icon: 'fa-user' },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [pressedTab, setPressedTab] = useState<TabType | null>(null);

  return (
    <nav className="shrink-0 bg-gray-950/95 backdrop-blur-xl border-t border-white/5 px-2 pb-2 pt-1">
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
                flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-200
                ${isActive ? 'text-violet-400' : 'text-gray-500'}
                ${isPressed ? 'scale-90' : 'scale-100'}
              `}
            >
              <div className={`relative transition-all duration-200 ${isActive ? 'scale-110' : ''}`}>
                {isActive && (
                  <div className="absolute inset-0 bg-violet-400/20 rounded-full blur-md" />
                )}
                <i className={`fa-solid ${tab.icon} text-lg relative z-10`} />
              </div>
              <span className={`text-[10px] mt-1 font-medium transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
