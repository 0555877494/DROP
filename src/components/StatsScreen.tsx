import { useState } from 'react';

const weeklyData = [
  { day: 'Mon', value: 65, tasks: 5 },
  { day: 'Tue', value: 80, tasks: 7 },
  { day: 'Wed', value: 45, tasks: 3 },
  { day: 'Thu', value: 90, tasks: 8 },
  { day: 'Fri', value: 70, tasks: 6 },
  { day: 'Sat', value: 55, tasks: 4 },
  { day: 'Sun', value: 85, tasks: 7 },
];

const stats = [
  { label: 'Tasks Done', value: '147', change: '+12%', icon: 'fa-check-circle', color: 'text-green-400' },
  { label: 'Focus Time', value: '32h', change: '+8%', icon: 'fa-clock', color: 'text-blue-400' },
  { label: 'Streak', value: '21', change: '+3', icon: 'fa-fire', color: 'text-orange-400' },
  { label: 'Efficiency', value: '87%', change: '+5%', icon: 'fa-bolt', color: 'text-yellow-400' },
];

const achievements = [
  { title: 'Early Bird', desc: 'Complete 5 tasks before 9 AM', icon: '🌅', unlocked: true },
  { title: 'Week Warrior', desc: '7-day streak', icon: '⚔️', unlocked: true },
  { title: 'Deep Focus', desc: '4 hours of focus time', icon: '🎯', unlocked: true },
  { title: 'Century', desc: 'Complete 100 tasks', icon: '💯', unlocked: false },
  { title: 'Social', desc: 'Share progress with friends', icon: '🤝', unlocked: false },
];

type Period = 'week' | 'month' | 'year';

export default function StatsScreen() {
  const [period, setPeriod] = useState<Period>('week');
  const maxValue = Math.max(...weeklyData.map(d => d.value));

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-4 pb-4">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-white">Statistics</h1>
        <p className="text-gray-400 text-sm">Track your progress</p>
      </div>

      {/* Period Selector */}
      <div className="flex bg-gray-900/80 rounded-2xl p-1 mb-5 border border-white/5">
        {(['week', 'month', 'year'] as Period[]).map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              period === p
                ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25'
                : 'text-gray-400'
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-gray-900/80 border border-white/5 animate-scale-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <i className={`fa-solid ${stat.icon} ${stat.color} text-sm`} />
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-green-400 mt-1">{stat.change} this {period}</p>
          </div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="p-4 rounded-2xl bg-gray-900/80 border border-white/5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Productivity</h3>
          <span className="text-xs text-gray-400">This week</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-32">
          {weeklyData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col justify-end h-24">
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-violet-600 to-violet-400 transition-all duration-700 relative overflow-hidden"
                  style={{ height: `${(data.value / maxValue) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
                </div>
              </div>
              <span className="text-[10px] text-gray-500">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">Achievements</h3>
        <div className="space-y-2">
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                achievement.unlocked
                  ? 'bg-gray-900/80 border-white/5'
                  : 'bg-gray-900/40 border-white/5 opacity-50'
              }`}
            >
              <span className="text-2xl">{achievement.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{achievement.title}</p>
                <p className="text-xs text-gray-400">{achievement.desc}</p>
              </div>
              {achievement.unlocked ? (
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <i className="fa-solid fa-check text-green-400 text-xs" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-700/50 flex items-center justify-center">
                  <i className="fa-solid fa-lock text-gray-500 text-xs" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
