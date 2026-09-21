interface Props { onClose: () => void; }
export default function AuthenticationCenter({ onClose }: Props) {
  const items = [
    { name: 'Jordan 1 Chicago', status: 'Authenticated', date: 'Dec 10', icon: 'fa-check', color: 'text-green-400' },
    { name: 'Yeezy 350 Zebra', status: 'In Progress', date: 'Dec 12', icon: 'fa-clock', color: 'text-yellow-400' },
    { name: 'Dunk Low Panda', status: 'Pending', date: 'Dec 13', icon: 'fa-hourglass', color: 'text-blue-400' },
  ];
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Authentication Center</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-2xl glass animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center ${item.color}`}><i className={`fa-solid ${item.icon}`} /></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="text-xs text-gray-400">{item.status} • {item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
