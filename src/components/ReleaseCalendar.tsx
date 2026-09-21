import { useState } from 'react';

interface Release {
  id: number;
  name: string;
  brand: string;
  image: string;
  releaseDate: string;
  retailPrice: number;
  colorway: string;
  status: 'upcoming' | 'today' | 'past';
}

const releases: Release[] = [
  {
    id: 1,
    name: 'Air Jordan 4 "Military Black"',
    brand: 'Jordan',
    image: 'https://image.qwenlm.ai/generated-images/5ed618f2-16e0-497d-b52c-295c1b46604f/_result.png',
    releaseDate: '2024-12-20',
    retailPrice: 210,
    colorway: 'Military Black',
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'Nike Dunk Low "Championship"',
    brand: 'Nike',
    image: 'https://image.qwenlm.ai/generated-images/05e2035b-703e-4a72-ab95-bb816dd22b4a/_result.png',
    releaseDate: '2024-12-18',
    retailPrice: 110,
    colorway: 'Championship Navy',
    status: 'today',
  },
  {
    id: 3,
    name: 'Yeezy Slide "Bone"',
    brand: 'adidas',
    image: 'https://image.qwenlm.ai/generated-images/957f1d67-a6e0-4466-b056-2e8a50790544/_result.png',
    releaseDate: '2024-12-15',
    retailPrice: 70,
    colorway: 'Bone',
    status: 'past',
  },
  {
    id: 4,
    name: 'New Balance 990v6',
    brand: 'New Balance',
    image: 'https://image.qwenlm.ai/generated-images/e06b5b19-90a3-4959-a370-2332b151c9ea/_result.png',
    releaseDate: '2024-12-22',
    retailPrice: 200,
    colorway: 'Grey',
    status: 'upcoming',
  },
  {
    id: 5,
    name: 'Travis Scott x Jordan 1 Low',
    brand: 'Jordan',
    image: 'https://image.qwenlm.ai/generated-images/cc740e4f-c482-4596-af5c-e03d914ae893/_result.png',
    releaseDate: '2024-12-25',
    retailPrice: 150,
    colorway: 'Reverse Mocha',
    status: 'upcoming',
  },
];

interface ReleaseCalendarProps {
  onClose?: () => void;
}

export default function ReleaseCalendar({ onClose }: ReleaseCalendarProps) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'today' | 'past'>('all');
  const [notified, setNotified] = useState<number[]>([]);

  const filteredReleases = filter === 'all' 
    ? releases 
    : releases.filter(r => r.status === filter);

  const toggleNotify = (id: number) => {
    setNotified(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'today':
        return <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse">TODAY</span>;
      case 'upcoming':
        return <span className="bg-violet-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">UPCOMING</span>;
      case 'past':
        return <span className="bg-gray-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">RELEASED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">Release Calendar</h1>
        <p className="text-sm text-gray-400">Never miss a drop</p>
      </div>

      {/* Filter Tabs */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All', count: releases.length },
            { id: 'today', label: 'Today', count: releases.filter(r => r.status === 'today').length },
            { id: 'upcoming', label: 'Upcoming', count: releases.filter(r => r.status === 'upcoming').length },
            { id: 'past', label: 'Past', count: releases.filter(r => r.status === 'past').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === tab.id ? 'bg-violet-500 text-white' : 'glass text-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  filter === tab.id ? 'bg-white/20' : 'bg-gray-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Releases List */}
      <div className="px-5 pb-4 space-y-3">
        {filteredReleases.map((release, i) => (
          <div
            key={release.id}
            className="p-4 rounded-2xl glass animate-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex gap-3 mb-3">
              <div className="w-20 h-20 rounded-xl bg-gray-800/50 overflow-hidden flex-shrink-0">
                <img src={release.image} alt={release.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-xs text-gray-500">{release.brand}</p>
                  {getStatusBadge(release.status)}
                </div>
                <p className="text-sm font-medium text-white truncate">{release.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{release.colorway}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-base font-bold text-white">${release.retailPrice}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(release.releaseDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => toggleNotify(release.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  notified.includes(release.id)
                    ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                    : 'bg-violet-500 text-white'
                }`}
              >
                <i className={`fa-${notified.includes(release.id) ? 'solid' : 'regular'} fa-bell mr-1`} />
                {notified.includes(release.id) ? 'Notified' : 'Notify Me'}
              </button>
              <button className="flex-1 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-bold border border-white/5">
                <i className="fa-regular fa-calendar mr-1" />
                Add to Calendar
              </button>
            </div>
          </div>
        ))}

        {filteredReleases.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-4xl mb-3">📅</span>
            <p className="text-gray-400 text-sm">No releases found</p>
          </div>
        )}
      </div>
    </div>
  );
}
