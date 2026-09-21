import { useState } from 'react';

export default function PersonalAnalytics() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const stats = {
    totalSpent: 4280,
    totalSaved: 320,
    itemsPurchased: 12,
    favoriteCategory: 'Sneakers',
    avgOrderValue: 356,
    shoppingStreak: 21,
  };

  const spendingByCategory = [
    { category: 'Sneakers', amount: 2850, percentage: 67, color: 'bg-violet-500' },
    { category: 'Streetwear', amount: 980, percentage: 23, color: 'bg-pink-500' },
    { category: 'Accessories', amount: 450, percentage: 10, color: 'bg-blue-500' },
  ];

  const monthlySpending = [
    { month: 'Jul', amount: 280 },
    { month: 'Aug', amount: 450 },
    { month: 'Sep', amount: 320 },
    { month: 'Oct', amount: 680 },
    { month: 'Nov', amount: 520 },
    { month: 'Dec', amount: 890 },
  ];

  const topBrands = [
    { brand: 'Jordan', purchases: 5, spent: 1425 },
    { brand: 'Nike', purchases: 4, spent: 890 },
    { brand: 'adidas', purchases: 2, spent: 640 },
    { brand: 'New Balance', purchases: 1, spent: 120 },
  ];

  const achievements = [
    { title: 'Sneakerhead', desc: 'Bought 5+ pairs', icon: '👟', unlocked: true },
    { title: 'Big Spender', desc: 'Spent $4000+', icon: '💰', unlocked: true },
    { title: 'Brand Loyal', desc: '5+ from same brand', icon: '⭐', unlocked: true },
    { title: 'Collector', desc: 'Own 10+ items', icon: '🏆', unlocked: false, progress: 12, total: 10 },
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">My Analytics</h1>
        <p className="text-sm text-gray-400">Your shopping insights</p>
      </div>

      {/* Timeframe Selector */}
      <div className="px-5 mb-4">
        <div className="flex bg-gray-900/80 rounded-2xl p-1 border border-white/5">
          {(['7d', '30d', '90d', '1y'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                timeframe === tf ? 'bg-violet-500 text-white' : 'text-gray-400'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl glass animate-scale-in">
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-dollar-sign text-green-400" />
              <span className="text-xs text-gray-400">Total Spent</span>
            </div>
            <p className="text-2xl font-bold text-white">${stats.totalSpent.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-2xl glass animate-scale-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-piggy-bank text-violet-400" />
              <span className="text-xs text-gray-400">Total Saved</span>
            </div>
            <p className="text-2xl font-bold text-green-400">${stats.totalSaved}</p>
          </div>
          <div className="p-4 rounded-2xl glass animate-scale-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-bag-shopping text-blue-400" />
              <span className="text-xs text-gray-400">Items Bought</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.itemsPurchased}</p>
          </div>
          <div className="p-4 rounded-2xl glass animate-scale-in" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-fire text-orange-400" />
              <span className="text-xs text-gray-400">Streak</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.shoppingStreak} days</p>
          </div>
        </div>
      </div>

      {/* Spending by Category */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl glass">
          <h3 className="text-sm font-semibold text-white mb-3">Spending by Category</h3>
          <div className="space-y-3">
            {spendingByCategory.map((cat, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-300">{cat.category}</span>
                  <span className="text-xs text-white font-bold">${cat.amount}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full transition-all duration-700`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Spending Chart */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl glass">
          <h3 className="text-sm font-semibold text-white mb-3">Monthly Spending</h3>
          <div className="h-32 flex items-end justify-between gap-2">
            {monthlySpending.map((month, i) => {
              const maxAmount = Math.max(...monthlySpending.map(m => m.amount));
              const height = (month.amount / maxAmount) * 100;
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end h-24">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-violet-600 to-violet-400 transition-all duration-700"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500">{month.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Brands */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl glass">
          <h3 className="text-sm font-semibold text-white mb-3">Top Brands</h3>
          <div className="space-y-2">
            {topBrands.map((brand, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold w-6 ${
                    i === 0 ? 'text-amber-400' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-gray-500'
                  }`}>
                    #{i + 1}
                  </span>
                  <span className="text-sm text-white">{brand.brand}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">${brand.spent}</p>
                  <p className="text-[10px] text-gray-400">{brand.purchases} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shopping Achievements */}
      <div className="px-5 pb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Shopping Achievements</h3>
        <div className="grid grid-cols-2 gap-2">
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl border transition-all animate-scale-in ${
                achievement.unlocked
                  ? 'glass border-amber-500/20'
                  : 'bg-gray-900/40 border-white/5 opacity-60'
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-2xl mb-2 block">{achievement.icon}</span>
              <p className="text-xs font-medium text-white">{achievement.title}</p>
              <p className="text-[10px] text-gray-400">{achievement.desc}</p>
              {achievement.unlocked ? (
                <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-1" />
              ) : (
                <div className="mt-1">
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${(achievement.progress! / achievement.total!) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
