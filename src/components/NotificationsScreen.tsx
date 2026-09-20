import { useState } from 'react';

interface Notification {
  id: number;
  type: 'price_drop' | 'new_drop' | 'order' | 'social' | 'reward';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  color: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'price_drop',
    title: 'Price Drop Alert!',
    message: 'Travis Scott x Jordan 1 Low dropped to $850',
    time: '2m ago',
    read: false,
    icon: 'fa-arrow-trend-down',
    color: 'text-green-400 bg-green-500/20',
  },
  {
    id: 2,
    type: 'order',
    title: 'Order Shipped',
    message: 'Your Nike Dunk Low is on the way!',
    time: '1h ago',
    read: false,
    icon: 'fa-truck',
    color: 'text-blue-400 bg-blue-500/20',
  },
  {
    id: 3,
    type: 'reward',
    title: 'Badge Unlocked!',
    message: 'You earned the "Sneakerhead" badge +250 pts',
    time: '3h ago',
    read: false,
    icon: 'fa-trophy',
    color: 'text-amber-400 bg-amber-500/20',
  },
  {
    id: 4,
    type: 'new_drop',
    title: 'New Drop Alert',
    message: 'Air Jordan 4 Retro just dropped!',
    time: '5h ago',
    read: true,
    icon: 'fa-fire',
    color: 'text-orange-400 bg-orange-500/20',
  },
  {
    id: 5,
    type: 'social',
    title: 'New Follower',
    message: '@kicksking started following you',
    time: '1d ago',
    read: true,
    icon: 'fa-user-plus',
    color: 'text-violet-400 bg-violet-500/20',
  },
  {
    id: 6,
    type: 'price_drop',
    title: 'Price Drop Alert!',
    message: 'Yeezy 350 V2 Zebra dropped to $300',
    time: '2d ago',
    read: true,
    icon: 'fa-arrow-trend-down',
    color: 'text-green-400 bg-green-500/20',
  },
];

export default function NotificationsScreen() {
  const [notifs, setNotifs] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = filter === 'all' ? notifs : notifs.filter(n => !n.read);
  const unreadCount = notifs.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-400">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-violet-400 text-sm font-medium"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'all' ? 'bg-violet-500 text-white' : 'glass text-gray-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'unread' ? 'bg-violet-500 text-white' : 'glass text-gray-400'
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-5 pb-4 space-y-2">
        {filteredNotifs.map((notif, i) => (
          <button
            key={notif.id}
            onClick={() => markAsRead(notif.id)}
            className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-all active:scale-[0.98] animate-slide-up ${
              notif.read
                ? 'bg-gray-900/40 border-white/5'
                : 'bg-gray-900/80 border-white/10'
            }`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color}`}>
              <i className={`fa-solid ${notif.icon} text-sm`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-sm font-medium ${notif.read ? 'text-gray-400' : 'text-white'}`}>
                  {notif.title}
                </p>
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-1.5" />
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{notif.message}</p>
              <p className="text-[10px] text-gray-500 mt-1">{notif.time}</p>
            </div>
          </button>
        ))}

        {filteredNotifs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-4xl mb-3">🔔</span>
            <p className="text-gray-400 text-sm">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
