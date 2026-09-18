interface ProfileScreenProps {
  wishlistCount: number;
}

const menuItems = [
  { icon: 'fa-bag-shopping', label: 'My Orders', value: '12', color: 'text-violet-400' },
  { icon: 'fa-dollar-sign', label: 'Selling', value: '3 active', color: 'text-green-400' },
  { icon: 'fa-heart', label: 'Wishlist', color: 'text-pink-400' },
  { icon: 'fa-clock-rotate-left', label: 'Recently Viewed', color: 'text-blue-400' },
  { icon: 'fa-location-dot', label: 'Shipping Addresses', color: 'text-orange-400' },
  { icon: 'fa-credit-card', label: 'Payment Methods', color: 'text-cyan-400' },
  { icon: 'fa-bell', label: 'Notifications', badge: '5', color: 'text-yellow-400' },
  { icon: 'fa-shield-halved', label: 'Privacy & Security', color: 'text-gray-400' },
  { icon: 'fa-circle-question', label: 'Help & Support', color: 'text-gray-400' },
];

export default function ProfileScreen({ wishlistCount }: ProfileScreenProps) {
  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-4 pb-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 p-0.5">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-black flex items-center justify-center">
            <i className="fa-solid fa-check text-[8px] text-white" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-white">Alex Johnson</h2>
        <p className="text-sm text-gray-400">@alexdrips</p>
        <div className="flex items-center gap-1 mt-1">
          <i className="fa-solid fa-crown text-yellow-400 text-xs" />
          <span className="text-xs text-yellow-400 font-medium">Pro Member</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-3 rounded-2xl glass text-center">
          <p className="text-xl font-bold text-white">12</p>
          <p className="text-[10px] text-gray-400">Purchases</p>
        </div>
        <div className="p-3 rounded-2xl glass text-center">
          <p className="text-xl font-bold text-white">8</p>
          <p className="text-[10px] text-gray-400">Sales</p>
        </div>
        <div className="p-3 rounded-2xl glass text-center">
          <p className="text-xl font-bold text-white">{wishlistCount}</p>
          <p className="text-[10px] text-gray-400">Wishlist</p>
        </div>
      </div>

      {/* Collection Value */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/20 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Collection Value</p>
            <p className="text-2xl font-bold text-white mt-0.5">$4,280</p>
            <p className="text-xs text-green-400 mt-1">
              <i className="fa-solid fa-arrow-trend-up mr-1" />
              +$320 this month
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-violet-500/20 flex items-center justify-center">
            <i className="fa-solid fa-chart-pie text-violet-400 text-xl" />
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="rounded-2xl glass overflow-hidden mb-5">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className={`flex items-center gap-3 px-4 py-3.5 w-full text-left active:bg-white/5 transition-colors ${
              i < menuItems.length - 1 ? 'border-b border-white/5' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center`}>
              <i className={`fa-solid ${item.icon} ${item.color} text-sm`} />
            </div>
            <span className="text-sm text-white flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
            )}
            {item.value && (
              <span className="text-xs text-gray-400">{item.value}</span>
            )}
            {i === 2 && wishlistCount > 0 && (
              <span className="text-xs text-pink-400">{wishlistCount}</span>
            )}
            <i className="fa-solid fa-chevron-right text-gray-600 text-xs" />
          </button>
        ))}
      </div>

      {/* Referral Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎁</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Refer & Earn</p>
            <p className="text-xs text-gray-400">Get $20 for each friend who signs up</p>
          </div>
          <button className="bg-amber-500 text-black px-3 py-1.5 rounded-full text-xs font-bold">
            Invite
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <button className="w-full py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium active:scale-[0.98] transition-transform mb-3">
        Sign Out
      </button>

      <p className="text-center text-xs text-gray-600">DROP v1.0.0</p>
    </div>
  );
}
