import { useState } from 'react';

const menuItems = [
  { icon: 'fa-bell', label: 'Notifications', badge: '3', color: 'text-blue-400' },
  { icon: 'fa-shield-halved', label: 'Privacy & Security', color: 'text-green-400' },
  { icon: 'fa-palette', label: 'Appearance', color: 'text-purple-400' },
  { icon: 'fa-language', label: 'Language', value: 'English', color: 'text-yellow-400' },
  { icon: 'fa-cloud', label: 'Cloud Sync', color: 'text-cyan-400' },
  { icon: 'fa-question-circle', label: 'Help & Support', color: 'text-gray-400' },
];

const settings = [
  { label: 'Push Notifications', enabled: true },
  { label: 'Dark Mode', enabled: true },
  { label: 'Haptic Feedback', enabled: true },
  { label: 'Auto-sync Data', enabled: false },
];

export default function ProfileScreen() {
  const [localSettings, setLocalSettings] = useState(settings);

  const toggleSetting = (index: number) => {
    setLocalSettings(prev => prev.map((s, i) => i === index ? { ...s, enabled: !s.enabled } : s));
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-4 pb-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 p-0.5">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-gray-950 flex items-center justify-center">
            <i className="fa-solid fa-check text-[8px] text-white" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-white">Alex Johnson</h2>
        <p className="text-sm text-gray-400">@alexjohnson</p>
        
        {/* Stats Row */}
        <div className="flex items-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold text-white">147</p>
            <p className="text-[10px] text-gray-400">Tasks Done</p>
          </div>
          <div className="w-px h-8 bg-gray-800" />
          <div className="text-center">
            <p className="text-lg font-bold text-white">21</p>
            <p className="text-[10px] text-gray-400">Day Streak</p>
          </div>
          <div className="w-px h-8 bg-gray-800" />
          <div className="text-center">
            <p className="text-lg font-bold text-white">87%</p>
            <p className="text-[10px] text-gray-400">Efficiency</p>
          </div>
        </div>
      </div>

      {/* Level Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/20 mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span className="text-sm font-semibold text-white">Level 12</span>
          </div>
          <span className="text-xs text-violet-300">2,450 / 3,000 XP</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div className="bg-gradient-to-r from-violet-500 to-purple-400 rounded-full h-2 w-[82%] transition-all duration-1000" />
        </div>
        <p className="text-xs text-gray-400 mt-2">550 XP to Level 13</p>
      </div>

      {/* Quick Settings */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Preferences</h3>
        <div className="rounded-2xl bg-gray-900/80 border border-white/5 overflow-hidden">
          {localSettings.map((setting, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-3.5 ${
                i < localSettings.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <span className="text-sm text-white">{setting.label}</span>
              <button
                onClick={() => toggleSetting(i)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                  setting.enabled ? 'bg-violet-500' : 'bg-gray-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md ${
                  setting.enabled ? 'left-[22px]' : 'left-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Settings</h3>
        <div className="rounded-2xl bg-gray-900/80 border border-white/5 overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className={`flex items-center gap-3 px-4 py-3.5 w-full text-left active:bg-white/5 transition-colors ${
                i < menuItems.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <i className={`fa-solid ${item.icon} ${item.color} w-5 text-center`} />
              <span className="text-sm text-white flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
              )}
              {item.value && (
                <span className="text-xs text-gray-400">{item.value}</span>
              )}
              <i className="fa-solid fa-chevron-right text-gray-600 text-xs" />
            </button>
          ))}
        </div>
      </div>

      {/* Sign Out */}
      <button className="w-full py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium active:scale-[0.98] transition-transform">
        Sign Out
      </button>

      <p className="text-center text-xs text-gray-600 mt-4">Pulse v2.1.0</p>
    </div>
  );
}
