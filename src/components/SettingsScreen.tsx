import { useState } from 'react';

interface SettingsScreenProps {
  onClose: () => void;
}

export default function SettingsScreen({ onClose }: SettingsScreenProps) {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    priceAlerts: true,
    newDrops: true,
    orderUpdates: true,
    communityUpdates: false,
    darkMode: true,
    hapticFeedback: true,
    autoPlay: false,
    language: 'English',
    currency: 'USD',
    region: 'United States',
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      {/* Header */}
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-arrow-left text-gray-400 text-sm" />
          </button>
          <p className="text-sm font-medium text-white">Settings</p>
          <div className="w-8" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-5">
        {/* Notifications */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Notifications</h3>
          <div className="rounded-2xl glass overflow-hidden">
            {[
              { key: 'pushNotifications', label: 'Push Notifications', icon: 'fa-bell', color: 'text-blue-400' },
              { key: 'emailNotifications', label: 'Email Notifications', icon: 'fa-envelope', color: 'text-green-400' },
              { key: 'priceAlerts', label: 'Price Alerts', icon: 'fa-tag', color: 'text-yellow-400' },
              { key: 'newDrops', label: 'New Drop Alerts', icon: 'fa-fire', color: 'text-orange-400' },
              { key: 'orderUpdates', label: 'Order Updates', icon: 'fa-truck', color: 'text-violet-400' },
              { key: 'communityUpdates', label: 'Community Updates', icon: 'fa-users', color: 'text-pink-400' },
            ].map((item, i) => (
              <div
                key={item.key}
                className={`flex items-center justify-between px-4 py-3.5 ${
                  i < 5 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`fa-solid ${item.icon} ${item.color} w-5 text-center`} />
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <button
                  onClick={() => toggleSetting(item.key)}
                  className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                    settings[item.key as keyof typeof settings] ? 'bg-violet-500' : 'bg-gray-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md ${
                    settings[item.key as keyof typeof settings] ? 'left-[22px]' : 'left-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Appearance</h3>
          <div className="rounded-2xl glass overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-moon text-violet-400 w-5 text-center" />
                <span className="text-sm text-white">Dark Mode</span>
              </div>
              <button
                onClick={() => toggleSetting('darkMode')}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                  settings.darkMode ? 'bg-violet-500' : 'bg-gray-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md ${
                  settings.darkMode ? 'left-[22px]' : 'left-0.5'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-mobile-screen text-blue-400 w-5 text-center" />
                <span className="text-sm text-white">Haptic Feedback</span>
              </div>
              <button
                onClick={() => toggleSetting('hapticFeedback')}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                  settings.hapticFeedback ? 'bg-violet-500' : 'bg-gray-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md ${
                  settings.hapticFeedback ? 'left-[22px]' : 'left-0.5'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-play text-green-400 w-5 text-center" />
                <span className="text-sm text-white">Auto-Play Videos</span>
              </div>
              <button
                onClick={() => toggleSetting('autoPlay')}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                  settings.autoPlay ? 'bg-violet-500' : 'bg-gray-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md ${
                  settings.autoPlay ? 'left-[22px]' : 'left-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Regional */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Regional</h3>
          <div className="rounded-2xl glass overflow-hidden">
            {[
              { key: 'language', label: 'Language', value: settings.language, icon: 'fa-language', color: 'text-cyan-400' },
              { key: 'currency', label: 'Currency', value: settings.currency, icon: 'fa-dollar-sign', color: 'text-green-400' },
              { key: 'region', label: 'Region', value: settings.region, icon: 'fa-globe', color: 'text-blue-400' },
            ].map((item, i) => (
              <button
                key={item.key}
                className={`flex items-center justify-between px-4 py-3.5 w-full text-left active:bg-white/5 transition-colors ${
                  i < 2 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`fa-solid ${item.icon} ${item.color} w-5 text-center`} />
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{item.value}</span>
                  <i className="fa-solid fa-chevron-right text-gray-600 text-xs" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Account</h3>
          <div className="rounded-2xl glass overflow-hidden">
            {[
              { label: 'Privacy & Security', icon: 'fa-shield-halved', color: 'text-green-400' },
              { label: 'Payment Methods', icon: 'fa-credit-card', color: 'text-blue-400' },
              { label: 'Shipping Addresses', icon: 'fa-location-dot', color: 'text-orange-400' },
              { label: 'Connected Accounts', icon: 'fa-link', color: 'text-violet-400' },
            ].map((item, i) => (
              <button
                key={i}
                className={`flex items-center justify-between px-4 py-3.5 w-full text-left active:bg-white/5 transition-colors ${
                  i < 3 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`fa-solid ${item.icon} ${item.color} w-5 text-center`} />
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-600 text-xs" />
              </button>
            ))}
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Support</h3>
          <div className="rounded-2xl glass overflow-hidden">
            {[
              { label: 'Help Center', icon: 'fa-circle-question', color: 'text-gray-400' },
              { label: 'Contact Us', icon: 'fa-envelope', color: 'text-gray-400' },
              { label: 'Terms of Service', icon: 'fa-file-contract', color: 'text-gray-400' },
              { label: 'Privacy Policy', icon: 'fa-user-shield', color: 'text-gray-400' },
            ].map((item, i) => (
              <button
                key={i}
                className={`flex items-center justify-between px-4 py-3.5 w-full text-left active:bg-white/5 transition-colors ${
                  i < 3 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`fa-solid ${item.icon} ${item.color} w-5 text-center`} />
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-600 text-xs" />
              </button>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-600">DROP v1.0.0</p>
          <p className="text-xs text-gray-600 mt-1">Made with ❤️ for sneakerheads</p>
        </div>
      </div>
    </div>
  );
}
