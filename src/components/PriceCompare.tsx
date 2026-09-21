interface Props { onClose: () => void; }
export default function PriceCompare({ onClose }: Props) {
  const platforms = [
    { name: 'DROP', price: 285, shipping: 'Free', best: true },
    { name: 'StockX', price: 295, shipping: '$15', best: false },
    { name: 'GOAT', price: 290, shipping: '$12', best: false },
    { name: 'eBay', price: 275, shipping: '$10', best: false },
  ];
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Price Comparison</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <p className="text-xs text-gray-400 mb-3">Jordan 1 Chicago - Size 10</p>
        <div className="space-y-2">
          {platforms.map((p, i) => (
            <div key={i} className={`p-4 rounded-2xl border animate-slide-up ${p.best ? 'bg-violet-500/10 border-violet-500/20' : 'glass'}`} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white flex items-center gap-2">{p.name}{p.best && <span className="text-[10px] bg-violet-500 text-white px-1.5 py-0.5 rounded-full">BEST</span>}</p>
                  <p className="text-xs text-gray-400">Shipping: {p.shipping}</p>
                </div>
                <p className="text-lg font-bold text-white">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
