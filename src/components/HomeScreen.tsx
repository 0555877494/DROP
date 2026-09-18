import { useState, useEffect } from 'react';

const quickActions = [
  { icon: '🧘', label: 'Meditate', color: 'from-purple-500/20 to-purple-600/10' },
  { icon: '💧', label: 'Hydrate', color: 'from-blue-500/20 to-blue-600/10' },
  { icon: '🏃', label: 'Exercise', color: 'from-green-500/20 to-green-600/10' },
  { icon: '📖', label: 'Read', color: 'from-orange-500/20 to-orange-600/10' },
];

const habits = [
  { name: 'Morning Routine', streak: 12, emoji: '🌅', progress: 80 },
  { name: 'Workout', streak: 7, emoji: '💪', progress: 60 },
  { name: 'Reading', streak: 21, emoji: '📚', progress: 90 },
  { name: 'Journaling', streak: 5, emoji: '✍️', progress: 40 },
];

const reminders = [
  { time: '09:00', title: 'Team Standup', type: 'meeting' },
  { time: '12:30', title: 'Lunch Break', type: 'break' },
  { time: '15:00', title: 'Design Review', type: 'meeting' },
  { time: '18:00', title: 'Evening Walk', type: 'health' },
];

export default function HomeScreen() {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-400 text-sm">{greeting}</p>
          <h1 className="text-2xl font-bold text-white">Alex</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <i className="fa-solid fa-bell text-sm" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-sm font-bold">
            A
          </div>
        </div>
      </div>

      {/* Focus Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-5 mb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
            <span className="text-xs text-white/70 font-medium">FOCUS MODE</span>
          </div>
          <p className="text-3xl font-bold mb-1">{currentTime}</p>
          <p className="text-white/70 text-sm mb-4">You've completed 3 of 5 tasks today</p>
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div className="bg-white rounded-full h-2 w-3/5 transition-all duration-1000" />
          </div>
          <p className="text-xs text-white/60">60% daily progress</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl bg-gradient-to-b ${action.color} border border-white/5 active:scale-95 transition-transform duration-150`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-[10px] text-gray-300 font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Habits */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Daily Habits</h2>
          <button className="text-violet-400 text-sm font-medium">See All</button>
        </div>
        <div className="space-y-3">
          {habits.map((habit, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-2xl bg-gray-900/80 border border-white/5 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-2xl">{habit.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-white truncate">{habit.name}</p>
                  <span className="text-xs text-orange-400 font-medium">🔥 {habit.streak}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-full h-1.5 transition-all duration-1000"
                    style={{ width: `${habit.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Today's Schedule</h2>
          <button className="text-violet-400 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-2">
          {reminders.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-2xl bg-gray-900/60 border border-white/5"
            >
              <div className="text-center min-w-[44px]">
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
              <div className={`w-1 h-8 rounded-full ${
                item.type === 'meeting' ? 'bg-blue-400' : 
                item.type === 'break' ? 'bg-green-400' : 'bg-purple-400'
              }`} />
              <p className="text-sm font-medium text-white">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
