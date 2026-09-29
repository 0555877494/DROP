import { useState, useEffect } from 'react';

interface Reward {
  id: number;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  icon: string;
  reward: number;
  progress: number;
  total: number;
  expires: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  level: number;
  isCurrentUser?: boolean;
}

const rewards: Reward[] = [
  { id: 1, title: 'First Drop', description: 'Make your first purchase', icon: '🛍️', points: 100, unlocked: true },
  { id: 2, title: 'Sneakerhead', description: 'Buy 5 pairs of sneakers', icon: '👟', points: 250, unlocked: true, progress: 5, maxProgress: 5 },
  { id: 3, title: 'Hype Beast', description: 'Buy a shoe that went up 20%+', icon: '📈', points: 500, unlocked: true },
  { id: 4, title: 'Collector', description: 'Own 10 different brands', icon: '🏆', points: 750, unlocked: false, progress: 6, maxProgress: 10 },
  { id: 5, title: 'Social Butterfly', description: 'Refer 5 friends', icon: '🦋', points: 300, unlocked: false, progress: 2, maxProgress: 5 },
  { id: 6, title: 'Diamond Hands', description: 'Hold items for 30+ days', icon: '💎', points: 1000, unlocked: false, progress: 18, maxProgress: 30 },
];

const challenges: Challenge[] = [
  { id: 1, title: 'Weekend Warrior', description: 'Make a purchase this weekend', icon: '⚡', reward: 150, progress: 0, total: 1, expires: '2d 14h' },
  { id: 2, title: 'Social Share', description: 'Share 3 items to your story', icon: '📱', reward: 100, progress: 1, total: 3, expires: '5d 8h' },
  { id: 3, title: 'Review Master', description: 'Leave 5 product reviews', icon: '⭐', reward: 200, progress: 3, total: 5, expires: '12d' },
];

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'SoleCollector', avatar: '👑', points: 12450, level: 24 },
  { rank: 2, name: 'KicksKing', avatar: '🔥', points: 11200, level: 22 },
  { rank: 3, name: 'HypeHunter', avatar: '💎', points: 9800, level: 20 },
  { rank: 4, name: 'Alex Johnson', avatar: '⭐', points: 8650, level: 18, isCurrentUser: true },
  { rank: 5, name: 'DripLord', avatar: '🌊', points: 7200, level: 16 },
  { rank: 6, name: 'SneakerFreak', avatar: '🎯', points: 6100, level: 14 },
  { rank: 7, name: 'StreetStyle', avatar: '✨', points: 5400, level: 12 },
];

export default function RewardsScreen() {
  const [activeTab, setActiveTab] = useState<'rewards' | 'challenges' | 'leaderboard'>('rewards');
  const [userPoints] = useState(8650);
  const [userLevel] = useState(18);
  const [streak] = useState(21);
  const [xpProgress, setXpProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setXpProgress(72), 300);
  }, []);

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header with Stats */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-4">Rewards</h1>
        
        {/* Points Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-yellow-500/20 border border-amber-500/20 p-5 mb-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -translate-y-12 translate-x-12 blur-xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-amber-300/70 uppercase tracking-wider font-medium">Your Balance</p>
                <p className="text-3xl font-black text-white mt-1">{userPoints.toLocaleString()}</p>
                <p className="text-xs text-amber-300/50">DROP Points</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <span className="text-xl font-black text-black">{userLevel}</span>
                </div>
                <p className="text-[10px] text-amber-300/70 mt-1">Level {userLevel}</p>
              </div>
            </div>
            {/* XP Progress */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-amber-300/60 mb-1">
                <span>Level {userLevel}</span>
                <span>Level {userLevel + 1}</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-full h-2 transition-all duration-1000"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <p className="text-[10px] text-amber-300/50 mt-1">{Math.round(1350 * xpProgress / 100)} / 1,350 XP to next level</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="p-3 rounded-2xl glass text-center">
            <span className="text-lg">🔥</span>
            <p className="text-lg font-bold text-white mt-1">{streak}</p>
            <p className="text-[10px] text-gray-400">Day Streak</p>
          </div>
          <div className="p-3 rounded-2xl glass text-center">
            <span className="text-lg">🏅</span>
            <p className="text-lg font-bold text-white mt-1">3</p>
            <p className="text-[10px] text-gray-400">Badges</p>
          </div>
          <div className="p-3 rounded-2xl glass text-center">
            <span className="text-lg">📊</span>
            <p className="text-lg font-bold text-white mt-1">#4</p>
            <p className="text-[10px] text-gray-400">Rank</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-gray-900/80 rounded-2xl p-1 border border-white/5">
          {[
            { id: 'rewards' as const, label: 'Badges', icon: '🏅' },
            { id: 'challenges' as const, label: 'Challenges', icon: '⚡' },
            { id: 'leaderboard' as const, label: 'Ranks', icon: '🏆' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
                activeTab === tab.id
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                  : 'text-gray-400'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-5 pb-4">
        {activeTab === 'rewards' && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-xs text-gray-500 mb-2">Unlock badges by completing activities</p>
            {rewards.map((reward, i) => (
              <div
                key={reward.id}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all animate-slide-up ${
                  reward.unlocked
                    ? 'glass border-amber-500/20'
                    : 'bg-gray-900/40 border-white/5 opacity-60'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  reward.unlocked ? 'bg-amber-500/10' : 'bg-gray-800/50'
                }`}>
                  {reward.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{reward.title}</p>
                    {reward.unlocked && (
                      <i className="fa-solid fa-circle-check text-amber-400 text-xs" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{reward.description}</p>
                  {reward.progress !== undefined && reward.maxProgress !== undefined && (
                    <div className="mt-1.5">
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`rounded-full h-1.5 transition-all duration-700 ${
                            reward.unlocked ? 'bg-amber-400' : 'bg-gray-600'
                          }`}
                          style={{ width: `${(reward.progress / reward.maxProgress) * 100}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">{reward.progress}/{reward.maxProgress}</p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-amber-400">+{reward.points}</p>
                  <p className="text-[10px] text-gray-500">pts</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-xs text-gray-500 mb-2">Complete challenges to earn bonus points</p>
            {challenges.map((challenge, i) => (
              <div
                key={challenge.id}
                className="p-4 rounded-2xl glass animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{challenge.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{challenge.title}</p>
                    <p className="text-xs text-gray-400">{challenge.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-400">+{challenge.reward}</p>
                    <p className="text-[10px] text-gray-500">pts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-full h-2 transition-all duration-700"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{challenge.progress}/{challenge.total}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-gray-500">
                    <i className="fa-regular fa-clock mr-1" />
                    Expires in {challenge.expires}
                  </span>
                  {challenge.progress < challenge.total && (
                    <button className="text-[10px] text-amber-400 font-medium">
                      Continue →
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Daily Bonus */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 mt-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎁</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Daily Login Bonus</p>
                  <p className="text-xs text-gray-400">Claim your daily reward!</p>
                </div>
                <button className="bg-violet-500 text-white px-4 py-2 rounded-full text-xs font-bold active:scale-95 transition-transform">
                  Claim +50
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-2 animate-fade-in">
            <p className="text-xs text-gray-500 mb-2">Top collectors this month</p>
            
            {/* Top 3 Podium */}
            <div className="flex items-end justify-center gap-3 mb-4 pt-4">
              {[leaderboard[1], leaderboard[0], leaderboard[2]].map((entry, i) => {
                const heights = ['h-20', 'h-28', 'h-16'];
                const positions = ['2nd', '1st', '3rd'];
                const colors = ['from-gray-400 to-gray-500', 'from-amber-400 to-yellow-500', 'from-orange-600 to-orange-700'];
                
                return (
                  <div key={entry.rank} className="flex flex-col items-center">
                    <span className="text-2xl mb-1">{entry.avatar}</span>
                    <p className="text-xs font-medium text-white truncate max-w-[60px]">{entry.name}</p>
                    <p className="text-[10px] text-gray-400">{entry.points.toLocaleString()}</p>
                    <div className={`w-16 ${heights[i]} rounded-t-xl bg-gradient-to-t ${colors[i]} mt-2 flex items-center justify-center`}>
                      <span className="text-xs font-bold text-white/80">{positions[i]}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full List */}
            {leaderboard.map((entry, i) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all animate-slide-up ${
                  entry.isCurrentUser
                    ? 'bg-amber-500/10 border-amber-500/20'
                    : 'glass'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className={`text-sm font-bold w-6 text-center ${
                  entry.rank <= 3 ? 'text-amber-400' : 'text-gray-500'
                }`}>
                  #{entry.rank}
                </span>
                <span className="text-xl">{entry.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${entry.isCurrentUser ? 'text-amber-400' : 'text-white'}`}>
                    {entry.name}
                    {entry.isCurrentUser && ' (You)'}
                  </p>
                  <p className="text-xs text-gray-400">Level {entry.level}</p>
                </div>
                <p className="text-sm font-bold text-white">{entry.points.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
