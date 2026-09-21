interface Props { onClose: () => void; }
export default function MarketTrends({ onClose }: Props) {
  const trends = [
    { name: 'Jordan 1', change: 12.4, volume: '$2.1M', direction: 'up' },
    { name: 'Yeezy 350', change: -3.2, volume: '$1.8M', direction: 'down' },
    { name: 'Nike Dunk', change: 5.7, volume: '$1.2M', direction: 'up' },
    { name: 'New Balance', change: 8.1, volume: '$890K', direction: 'up' },
    { name: 'Supreme', change: 15.3, volume: '$650K', direction: 'up' },
  ];
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Market Trends</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-4">
          <p className="text-xs text-gray-400">Total Market Value</p>
          <p className="text-2xl font-bold text-white">$14.2B</p>
          <p className="text-xs text-green-400 mt-1"><i className="fa-solid fa-arrow-trend-up mr-1" />+8.3% this month</p>
        </div>
        <div className="space-y-2">
          {trends.map((t, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl glass animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-gray-400">Volume: {t.volume}</p>
              </div>
              <span className={`text-sm font-bold ${t.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {t.direction === 'up' ? '↑' : '↓'}{Math.abs(t.change)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
