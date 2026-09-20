import { useState } from 'react';

interface PriceHistoryProps {
  currentPrice: number;
  retailPrice: number;
  productName: string;
}

interface PricePoint {
  date: string;
  price: number;
  volume: number;
}

export default function PriceHistory({ currentPrice, retailPrice, productName }: PriceHistoryProps) {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Generate mock price history data
  const generatePriceHistory = (): PricePoint[] => {
    const points: PricePoint[] = [];
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 365;
    const basePrice = currentPrice * 0.85;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate price fluctuations
      const volatility = 0.05;
      const randomChange = (Math.random() - 0.5) * 2 * volatility;
      const price = basePrice * (1 + randomChange) * (1 + (days - i) / days * 0.15);
      
      points.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: Math.round(price),
        volume: Math.floor(Math.random() * 100) + 20,
      });
    }
    
    return points;
  };

  const priceHistory = generatePriceHistory();
  const minPrice = Math.min(...priceHistory.map(p => p.price));
  const maxPrice = Math.max(...priceHistory.map(p => p.price));
  const priceRange = maxPrice - minPrice;

  const priceChange = currentPrice - priceHistory[0].price;
  const priceChangePercent = ((priceChange / priceHistory[0].price) * 100).toFixed(1);

  return (
    <div className="p-4 rounded-2xl glass">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-400">Price History</p>
          <p className="text-lg font-bold text-white">${currentPrice}</p>
          <p className={`text-xs font-medium ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {priceChange >= 0 ? '↑' : '↓'} ${Math.abs(priceChange)} ({priceChangePercent}%)
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Retail</p>
          <p className="text-sm text-gray-300">${retailPrice}</p>
          <p className="text-xs text-green-400">
            +{(((currentPrice - retailPrice) / retailPrice) * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-1 mb-4 bg-gray-900/50 rounded-lg p-1">
        {(['7d', '30d', '90d', '1y'] as const).map(tf => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`flex-1 py-1.5 rounded text-xs font-medium transition-all ${
              timeframe === tf ? 'bg-violet-500 text-white' : 'text-gray-400'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative h-32 mb-2">
        <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="300"
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Price Line */}
          <polyline
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            points={priceHistory.map((point, i) => {
              const x = (i / (priceHistory.length - 1)) * 300;
              const y = 100 - ((point.price - minPrice) / priceRange) * 100;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Gradient Fill */}
          <polygon
            fill="url(#gradientFill)"
            points={`0,100 ${priceHistory.map((point, i) => {
              const x = (i / (priceHistory.length - 1)) * 300;
              const y = 100 - ((point.price - minPrice) / priceRange) * 100;
              return `${x},${y}`;
            }).join(' ')} 300,100`}
          />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Chart Labels */}
      <div className="flex justify-between text-[10px] text-gray-500">
        <span>{priceHistory[0].date}</span>
        <span>{priceHistory[Math.floor(priceHistory.length / 2)].date}</span>
        <span>{priceHistory[priceHistory.length - 1].date}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
        <div className="text-center">
          <p className="text-xs text-gray-400">Low</p>
          <p className="text-sm font-bold text-white">${minPrice}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400">Avg</p>
          <p className="text-sm font-bold text-white">
            ${Math.round(priceHistory.reduce((sum, p) => sum + p.price, 0) / priceHistory.length)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400">High</p>
          <p className="text-sm font-bold text-white">${maxPrice}</p>
        </div>
      </div>
    </div>
  );
}
