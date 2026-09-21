import { useState } from 'react';

interface SellerDashboardProps {
  onClose?: () => void;
}

export default function SellerDashboard({ onClose }: SellerDashboardProps) {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  const stats = {
    totalSales: 47,
    revenue: 12450,
    activeListings: 23,
    views: 8934,
    conversionRate: 5.2,
    averagePrice: 265,
  };

  const recentSales = [
    { id: 1, product: 'Nike Dunk Low Panda', buyer: 'User***24', price: 145, date: '2h ago', status: 'shipped' },
    { id: 2, product: 'Jordan 1 Chicago', buyer: 'User***89', price: 285, date: '5h ago', status: 'processing' },
    { id: 3, product: 'Yeezy 350 Zebra', buyer: 'User***12', price: 320, date: '1d ago', status: 'delivered' },
    { id: 4, product: 'NB 550 Green', buyer: 'User***67', price: 120, date: '2d ago', status: 'delivered' },
  ];

  const topPerformers = [
    { product: 'Jordan 1 Chicago', views: 1247, sales: 8, revenue: 2280 },
    { product: 'Yeezy 350 Zebra', views: 982, sales: 6, revenue: 1920 },
    { product: 'Nike Dunk Panda', views: 856, sales: 12, revenue: 1740 },
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Seller Dashboard</h1>
            <p className="text-sm text-gray-400">Track your performance</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center active:scale-95 transition-transform">
            <i className="fa-solid fa-plus text-white" />
          </button>
        </div>

        {/* Timeframe Selector */}
        <div className="flex bg-gray-900/80 rounded-2xl p-1 border border-white/5">
          {(['7d', '30d', '90d'] as const).map(tf => (
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
              <span className="text-xs text-gray-400">Revenue</span>
            </div>
            <p className="text-2xl font-bold text-white">${stats.revenue.toLocaleString()}</p>
            <p className="text-xs text-green-400 mt-1">↑ 12% vs last period</p>
          </div>
          <div className="p-4 rounded-2xl glass animate-scale-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-bag-shopping text-blue-400" />
              <span className="text-xs text-gray-400">Sales</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalSales}</p>
            <p className="text-xs text-green-400 mt-1">↑ 8% vs last period</p>
          </div>
          <div className="p-4 rounded-2xl glass animate-scale-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-eye text-violet-400" />
              <span className="text-xs text-gray-400">Views</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.views.toLocaleString()}</p>
            <p className="text-xs text-green-400 mt-1">↑ 23% vs last period</p>
          </div>
          <div className="p-4 rounded-2xl glass animate-scale-in" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-chart-line text-amber-400" />
              <span className="text-xs text-gray-400">Conversion</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.conversionRate}%</p>
            <p className="text-xs text-green-400 mt-1">↑ 2.1% vs last period</p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl glass">
          <h3 className="text-sm font-semibold text-white mb-3">Revenue Trend</h3>
          <div className="h-32 flex items-end justify-between gap-1">
            {Array.from({ length: 14 }).map((_, i) => {
              const height = Math.random() * 80 + 20;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-violet-600 to-violet-400 transition-all duration-700"
                    style={{ height: `${height}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-gray-500">
            <span>2 weeks ago</span>
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Recent Sales</h3>
        <div className="space-y-2">
          {recentSales.map((sale, i) => (
            <div
              key={sale.id}
              className="flex items-center gap-3 p-3 rounded-2xl glass animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center">
                <span className="text-xl">👟</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{sale.product}</p>
                <p className="text-xs text-gray-400">{sale.buyer} • {sale.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-400">+${sale.price}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  sale.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                  sale.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {sale.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="px-5 pb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Top Performers</h3>
        <div className="space-y-2">
          {topPerformers.map((item, i) => (
            <div
              key={i}
              className="p-3 rounded-2xl glass animate-slide-right"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white">{item.product}</p>
                <span className="text-sm font-bold text-green-400">${item.revenue}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span><i className="fa-solid fa-eye mr-1" />{item.views}</span>
                <span><i className="fa-solid fa-bag-shopping mr-1" />{item.sales} sold</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
