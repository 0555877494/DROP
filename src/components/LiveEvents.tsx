import { useState, useEffect } from 'react';

interface LiveEvent {
  id: number;
  title: string;
  host: string;
  hostAvatar: string;
  image: string;
  viewers: number;
  isLive: boolean;
  startTime: string;
  products: number;
}

const liveEvents: LiveEvent[] = [
  {
    id: 1,
    title: 'Jordan 1 Chicago Restock',
    host: 'KicksVault',
    hostAvatar: '👑',
    image: 'https://image.qwenlm.ai/generated-images/5ed618f2-16e0-497d-b52c-295c1b46604f/_result.png',
    viewers: 1247,
    isLive: true,
    startTime: 'Started 15 min ago',
    products: 12,
  },
  {
    id: 2,
    title: 'Yeezy Drop Party',
    host: 'SoleKing',
    hostAvatar: '🔥',
    image: 'https://image.qwenlm.ai/generated-images/957f1d67-a6e0-4466-b056-2e8a50790544/_result.png',
    viewers: 892,
    isLive: true,
    startTime: 'Started 5 min ago',
    products: 8,
  },
  {
    id: 3,
    title: 'Upcoming: Travis Scott Collection',
    host: 'CactusJack',
    hostAvatar: '🌵',
    image: 'https://image.qwenlm.ai/generated-images/cc740e4f-c482-4596-af5c-e03d914ae893/_result.png',
    viewers: 0,
    isLive: false,
    startTime: 'Starts in 2h 34m',
    products: 15,
  },
];

export default function LiveEvents() {
  const [events, setEvents] = useState(liveEvents);
  const [selectedEvent, setSelectedEvent] = useState<LiveEvent | null>(null);

  // Simulate viewer count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prev => prev.map(event => 
        event.isLive 
          ? { ...event, viewers: event.viewers + Math.floor(Math.random() * 10) - 3 }
          : event
      ));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (selectedEvent) {
    return (
      <div className="h-full flex flex-col bg-black">
        {/* Live Video Area */}
        <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-full object-cover opacity-40"
          />
          
          {/* Live Badge */}
          {selectedEvent.isLive && (
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </span>
              <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <i className="fa-solid fa-eye mr-1" />
                {selectedEvent.viewers.toLocaleString()}
              </span>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={() => setSelectedEvent(null)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark text-white text-sm" />
          </button>

          {/* Host Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center border-2 border-white">
                <span className="text-xl">{selectedEvent.hostAvatar}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{selectedEvent.host}</p>
                <p className="text-xs text-gray-300">{selectedEvent.startTime}</p>
              </div>
              <button className="bg-violet-500 text-white px-4 py-2 rounded-full text-xs font-bold">
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
          <h2 className="text-xl font-bold text-white mb-2">{selectedEvent.title}</h2>
          <p className="text-sm text-gray-400 mb-4">
            {selectedEvent.products} products available • {selectedEvent.isLive ? 'Shopping now' : 'Starting soon'}
          </p>

          {/* Products in Stream */}
          <div className="space-y-2 mb-4">
            {Array.from({ length: Math.min(selectedEvent.products, 5) }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl glass">
                <div className="w-14 h-14 rounded-xl bg-gray-800/50 flex items-center justify-center">
                  <span className="text-2xl">👟</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Product {i + 1}</p>
                  <p className="text-xs text-gray-400">Brand Name</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">$250</p>
                  {selectedEvent.isLive && (
                    <button className="text-xs text-violet-400 font-medium">Buy Now</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          {selectedEvent.isLive ? (
            <button className="w-full py-3 rounded-2xl bg-red-500 text-white text-sm font-bold active:scale-[0.98] transition-transform">
              <i className="fa-solid fa-bag-shopping mr-2" />
              Shop Live
            </button>
          ) : (
            <button className="w-full py-3 rounded-2xl bg-violet-500 text-white text-sm font-bold active:scale-[0.98] transition-transform">
              <i className="fa-regular fa-bell mr-2" />
              Set Reminder
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">Live Events</h1>
        <p className="text-sm text-gray-400">Shop drops in real-time</p>
      </div>

      {/* Live Now */}
      {events.filter(e => e.isLive).length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 px-5 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-lg font-bold">Live Now</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
            {events.filter(e => e.isLive).map((event, i) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="flex-shrink-0 w-48 rounded-2xl overflow-hidden border border-white/5 animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    <i className="fa-solid fa-eye mr-0.5" />
                    {event.viewers}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs font-medium text-white truncate">{event.title}</p>
                    <p className="text-[10px] text-gray-300">{event.host}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming */}
      {events.filter(e => !e.isLive).length > 0 && (
        <div className="px-5 pb-4">
          <h2 className="text-lg font-bold mb-3">Upcoming</h2>
          <div className="space-y-3">
            {events.filter(e => !e.isLive).map((event, i) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl glass text-left active:scale-[0.98] transition-transform animate-slide-right"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-16 h-16 rounded-xl bg-gray-800/50 overflow-hidden flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{event.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{event.host}</p>
                  <p className="text-xs text-violet-400 mt-1">{event.startTime}</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <i className="fa-regular fa-bell text-violet-400 text-xs" />
                </button>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
