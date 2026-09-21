interface Props { onClose: () => void; }
export default function HelpCenter({ onClose }: Props) {
  const topics = [
    { title: 'How to Buy', icon: 'fa-bag-shopping', color: 'text-violet-400' },
    { title: 'How to Sell', icon: 'fa-tag', color: 'text-green-400' },
    { title: 'Authentication', icon: 'fa-shield-halved', color: 'text-blue-400' },
    { title: 'Shipping', icon: 'fa-truck', color: 'text-orange-400' },
    { title: 'Payments', icon: 'fa-credit-card', color: 'text-cyan-400' },
    { title: 'Returns', icon: 'fa-rotate-left', color: 'text-yellow-400' },
  ];
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Help Center</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <div className="relative mb-4">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
          <input type="text" placeholder="Search help articles..." className="w-full bg-gray-900/80 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {topics.map((topic, i) => (
            <button key={i} className="p-4 rounded-2xl glass text-left active:scale-95 transition-transform animate-scale-in" style={{ animationDelay: `${i * 60}ms` }}>
              <i className={`fa-solid ${topic.icon} ${topic.color} text-xl mb-2`} />
              <p className="text-xs font-medium text-white">{topic.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
