import { useState } from 'react';

interface MarketData {
  category: string;
  totalVolume: number;
  avgPrice: number;
  change: number;
  topItem: string;
}

const marketData: MarketData[] = [
  { category: 'Jordan', totalVolume: 1247, avgPrice: 285, change: 5.2, topItem: 'Jordan 1 Chicago' },
  { category: 'Nike', totalVolume: 2156, avgPrice: 165, change: 3.8, topItem: 'Dunk Low Panda' },
  { category: 'Yeezy', totalVolume: 892, avgPrice: 320, change: -2.1, topItem: '350 V2 Zebra' },
  { category: 'New Balance', totalVolume: 634, avgPrice: 145, change: 8.4, topItem: '550 White Green' },
  { category: 'Supreme', totalVolume: 423, avgPrice: 450, change: 12.3, topItem: 'Box Logo Hoodie' },
];

const trendingItems = [
  { name: 'Jordan 1 Chicago', searches: 12453, change: 23 },
  { name: 'Travis Scott Jordan 1', searches: 9821, change: 18 },
  { name: 'Yeezy 350 Zebra', searches: 8234, change: -5 },
  { name: 'Nike Dunk Panda', searches: 7892, change: 12 },
  { name: 'Off-White AF1', searches: 6543, change: 31 },
];

interface MarketTrendsProps {
  onClose?: () => void;
}

export default function MarketTrends({ onClose }: MarketTrendsProps) {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('7d');

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">Market Trends</h1>
        <p className="text-sm text-gray-400">Real-time market insights</p>
      </div>

      {/* Timeframe Selector */}
      <div className="px-5 mb-4">
        <div className="flex bg-gray-900/80 rounded-2xl p-1 border border-white/5">
          {(['24h', '7d', '30d'] as const).map(tf => (
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

      {/* Market Overview */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400">Total Market Volume</p>
              <p className="text-2xl font-bold text-white">$4.2M</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">24h Change</p>
              <p className="text-lg font-bold text-green-400">↑ 8.3%</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span><i className="fa-solid fa-chart-line mr-1" />5,352 trades</span>
            <span><i className="fa-solid fa-users mr-1" />12,453 active users</span>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Category Performance</h3>
        <div className="space-y-2">
          {marketData.map((data, i) => (
            <div
              key={i}
              className="p-3 rounded-2xl glass animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">{data.category}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    data.change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {data.change > 0 ? '↑' : '↓'}{Math.abs(data.change)}%
                  </span>
                </div>
                <span className="text-sm font-bold text-white">${data.avgPrice}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{data.totalVolume} trades</span>
                <span className="truncate ml-2">Top: {data.topItem}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Searches */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Trending Searches</h3>
        <div className="space-y-2">
          {trendingItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-2xl glass animate-slide-right"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className={`text-lg font-bold w-6 ${
                i === 0 ? 'text-amber-400' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-gray-500'
              }`}>
                #{i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.name}</p>
                <p className="text-xs text-gray-400">{item.searches.toLocaleString()} searches</p>
              </div>
              <span className={`text-xs font-medium ${
                item.change > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {item.change > 0 ? '↑' : '↓'}{Math.abs(item.change)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      <div className="px-5 pb-4">
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="text-sm font-medium text-white mb-1">Market Insight</p>
              <p className="text-xs text-gray-300 leading-relaxed">
                Jordan brand showing strong momentum with 5.2% growth. Supreme items up 12.3% - consider selling now for maximum profit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
