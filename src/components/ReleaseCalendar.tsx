interface Props { onClose: () => void; }
export default function ReleaseCalendar({ onClose }: Props) {
  const releases = [
    { date: 'Dec 15', name: 'Jordan 4 Military Black', brand: 'Jordan', price: 210, image: '🔵' },
    { date: 'Dec 18', name: 'Nike SB Dunk Orange Lobster', brand: 'Nike', price: 150, image: '🟠' },
    { date: 'Dec 22', name: 'Yeezy Slide Onyx', brand: 'adidas', price: 70, image: '⚫' },
    { date: 'Dec 25', name: 'Jordan 1 Lost & Found', brand: 'Jordan', price: 180, image: '🔴' },
    { date: 'Jan 2', name: 'New Balance 2002R', brand: 'New Balance', price: 150, image: '🟤' },
  ];

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
          <i className="fa-solid fa-arrow-left text-gray-400 text-sm" />
        </button>
        <p className="text-sm font-medium text-white">Release Calendar</p>
        <div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-3">
        {releases.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl glass animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="w-14 h-14 rounded-xl bg-gray-800/50 flex items-center justify-center text-2xl">{item.image}</div>
            <div className="flex-1">
              <p className="text-xs text-violet-400 font-medium">{item.date}</p>
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="text-xs text-gray-400">{item.brand} • ${item.price}</p>
            </div>
            <button className="bg-violet-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
              <i className="fa-regular fa-bell mr-1" />Remind
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
