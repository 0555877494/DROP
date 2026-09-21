interface Props { onClose: () => void; }
export default function PersonalAnalytics({ onClose }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Your Analytics</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-2xl glass text-center"><p className="text-xl font-bold text-white">12</p><p className="text-[10px] text-gray-400">Items Bought</p></div>
          <div className="p-3 rounded-2xl glass text-center"><p className="text-xl font-bold text-green-400">+$420</p><p className="text-[10px] text-gray-400">Profit Made</p></div>
          <div className="p-3 rounded-2xl glass text-center"><p className="text-xl font-bold text-white">8</p><p className="text-[10px] text-gray-400">Brands Owned</p></div>
          <div className="p-3 rounded-2xl glass text-center"><p className="text-xl font-bold text-violet-400">$2.1K</p><p className="text-[10px] text-gray-400">Collection Value</p></div>
        </div>
        <div className="p-4 rounded-2xl glass">
          <p className="text-xs text-gray-400 mb-2">Favorite Brands</p>
          <div className="space-y-2">
            {[{ name: 'Jordan', pct: 45 }, { name: 'Nike', pct: 30 }, { name: 'adidas', pct: 15 }, { name: 'New Balance', pct: 10 }].map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-gray-300 w-20">{b.name}</span>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full"><div className="h-full bg-violet-500 rounded-full" style={{ width: `${b.pct}%` }} /></div>
                <span className="text-xs text-gray-400 w-8 text-right">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
