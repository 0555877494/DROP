import { useState, useEffect } from 'react';

interface DropItem {
  id: number;
  name: string;
  brand: string;
  image: string;
  retailPrice: number;
  dropTime: number; // timestamp
  interested: number;
}

const upcomingDrops: DropItem[] = [
  {
    id: 1,
    name: 'Air Jordan 4 Retro',
    brand: 'Jordan',
    image: '🔵',
    retailPrice: 210,
    dropTime: Date.now() + 2 * 60 * 60 * 1000 + 34 * 60 * 1000,
    interested: 12453,
  },
  {
    id: 2,
    name: 'Nike SB Dunk Low',
    brand: 'Nike',
    image: '🟣',
    retailPrice: 125,
    dropTime: Date.now() + 8 * 60 * 60 * 1000 + 15 * 60 * 1000,
    interested: 8921,
  },
  {
    id: 3,
    name: 'Yeezy Slide',
    brand: 'adidas',
    image: '🟤',
    retailPrice: 70,
    dropTime: Date.now() + 26 * 60 * 60 * 1000,
    interested: 15672,
  },
];

function CountdownTimer({ targetTime }: { targetTime: number }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, targetTime - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className="flex items-center gap-1">
      {[
        { val: timeLeft.hours, label: 'H' },
        { val: timeLeft.minutes, label: 'M' },
        { val: timeLeft.seconds, label: 'S' },
      ].map((unit, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="bg-black/40 rounded-lg px-2 py-1 min-w-[32px] text-center">
            <span className="text-sm font-mono font-bold text-white">
              {String(unit.val).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[9px] text-white/50">{unit.label}</span>
          {i < 2 && <span className="text-white/30 text-xs mx-0.5">:</span>}
        </div>
      ))}
    </div>
  );
}

export default function CountdownSection() {
  const [notified, setNotified] = useState<number[]>([]);

  const toggleNotify = (id: number) => {
    setNotified(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between px-5 mb-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Upcoming Drops
        </h2>
        <button className="text-violet-400 text-sm font-medium">Calendar</button>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
        {upcomingDrops.map((drop, i) => (
          <div
            key={drop.id}
            className="flex-shrink-0 w-64 rounded-2xl overflow-hidden border border-white/5 animate-slide-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Gradient Background */}
            <div className="relative h-28 bg-gradient-to-br from-violet-900/40 via-purple-900/30 to-indigo-900/40 flex items-center justify-center">
              <span className="text-5xl animate-float" style={{ animationDelay: `${i * 300}ms` }}>
                {drop.image}
              </span>
              <div className="absolute top-2 left-2">
                <span className="bg-red-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  UPCOMING
                </span>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <CountdownTimer targetTime={drop.dropTime} />
              </div>
            </div>

            <div className="p-3 bg-gray-900/80">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{drop.brand}</p>
              <p className="text-xs font-medium text-white truncate">{drop.name}</p>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-sm font-bold text-white">${drop.retailPrice}</p>
                  <p className="text-[10px] text-gray-500">{drop.interested.toLocaleString()} interested</p>
                </div>
                <button
                  onClick={() => toggleNotify(drop.id)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all active:scale-95 ${
                    notified.includes(drop.id)
                      ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                      : 'bg-violet-500 text-white'
                  }`}
                >
                  {notified.includes(drop.id) ? (
                    <><i className="fa-solid fa-bell mr-1" />Set</>
                  ) : (
                    <><i className="fa-regular fa-bell mr-1" />Notify</>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
