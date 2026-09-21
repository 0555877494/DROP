interface Props { onClose: () => void; }
export default function StyleBuilder({ onClose }: Props) {
  const outfits = [
    { name: 'Street Casual', items: ['Dunk Low Panda', 'Stüssy Tee', 'Cargo Pants'], emoji: '👟' },
    { name: 'Hype Beast', items: ['Jordan 1 Chicago', 'Supreme Hoodie', 'Chrome Hearts'], emoji: '🔥' },
    { name: 'Minimal Clean', items: ['NB 550', 'Basic White Tee', 'Slim Jeans'], emoji: '✨' },
    { name: 'Retro Vibes', items: ['Air Max 1', 'Vintage Jacket', 'Baggy Jeans'], emoji: '🌊' },
  ];
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Style Builder</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-3">
        <p className="text-xs text-gray-400">Curated outfit inspiration</p>
        {outfits.map((outfit, i) => (
          <div key={i} className="p-4 rounded-2xl glass animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{outfit.emoji}</span>
              <p className="text-sm font-bold text-white">{outfit.name}</p>
            </div>
            <div className="flex gap-2">
              {outfit.items.map((item, j) => (
                <div key={j} className="flex-1 p-2 rounded-xl bg-gray-800/50 text-center">
                  <p className="text-[10px] text-gray-300 truncate">{item}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 py-2 rounded-xl bg-violet-500/20 text-violet-400 text-xs font-bold">Shop This Look</button>
          </div>
        ))}
      </div>
    </div>
  );
}
