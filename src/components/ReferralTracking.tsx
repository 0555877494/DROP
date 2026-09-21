import { useState } from 'react';

interface Referral {
  id: number;
  name: string;
  email: string;
  date: string;
  reward: number;
  status: 'completed' | 'pending' | 'active';
  purchases: number;
}

interface ReferralTrackingProps {
  onClose?: () => void;
}

export default function ReferralTracking({ onClose }: ReferralTrackingProps) {
  const [referrals] = useState<Referral[]>([
    { id: 1, name: 'John D.', email: 'j***@email.com', date: '2 days ago', reward: 20, status: 'completed', purchases: 3 },
    { id: 2, name: 'Sarah M.', email: 's***@email.com', date: '5 days ago', reward: 20, status: 'completed', purchases: 1 },
    { id: 3, name: 'Mike R.', email: 'm***@email.com', date: '1 week ago', reward: 0, status: 'active', purchases: 0 },
    { id: 4, name: 'Emma L.', email: 'e***@email.com', date: '2 weeks ago', reward: 20, status: 'pending', purchases: 1 },
  ]);

  const totalEarned = referrals.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.reward, 0);
  const pendingRewards = referrals.filter(r => r.status === 'pending').reduce((sum, r) => sum + r.reward, 0);
  const activeReferrals = referrals.filter(r => r.status === 'active').length;
  const myCode = 'ALEX2024';

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">Referrals</h1>
        <p className="text-sm text-gray-400">Earn $20 for each friend who joins</p>
      </div>

      {/* Stats */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-2xl glass text-center">
            <p className="text-xl font-bold text-green-400">${totalEarned}</p>
            <p className="text-[10px] text-gray-400">Earned</p>
          </div>
          <div className="p-3 rounded-2xl glass text-center">
            <p className="text-xl font-bold text-yellow-400">${pendingRewards}</p>
            <p className="text-[10px] text-gray-400">Pending</p>
          </div>
          <div className="p-3 rounded-2xl glass text-center">
            <p className="text-xl font-bold text-violet-400">{activeReferrals}</p>
            <p className="text-[10px] text-gray-400">Active</p>
          </div>
        </div>
      </div>

      {/* Referral Code */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/20">
          <p className="text-xs text-gray-400 mb-2">Your Referral Code</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-black/30 rounded-xl px-4 py-3 font-mono text-lg font-bold text-white">
              {myCode}
            </div>
            <button className="w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center active:scale-95 transition-transform">
              <i className="fa-solid fa-copy text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Share this code with friends to earn rewards</p>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Share Via</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: 'fa-brands fa-whatsapp', label: 'WhatsApp', color: 'bg-green-500' },
            { icon: 'fa-brands fa-telegram', label: 'Telegram', color: 'bg-blue-500' },
            { icon: 'fa-brands fa-twitter', label: 'Twitter', color: 'bg-sky-500' },
            { icon: 'fa-solid fa-envelope', label: 'Email', color: 'bg-gray-600' },
          ].map((social, i) => (
            <button
              key={i}
              className={`p-3 rounded-xl ${social.color} flex flex-col items-center gap-1 active:scale-95 transition-transform`}
            >
              <i className={`${social.icon} text-white text-lg`} />
              <span className="text-[10px] text-white">{social.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Referral List */}
      <div className="px-5 pb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Your Referrals ({referrals.length})</h3>
        <div className="space-y-2">
          {referrals.map((referral, i) => (
            <div
              key={referral.id}
              className="p-4 rounded-2xl glass animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{referral.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{referral.name}</p>
                  <p className="text-xs text-gray-400">{referral.email}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${
                    referral.status === 'completed' ? 'text-green-400' :
                    referral.status === 'pending' ? 'text-yellow-400' : 'text-gray-400'
                  }`}>
                    {referral.reward > 0 ? `+$${referral.reward}` : 'Pending'}
                  </p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    referral.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    referral.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-700 text-gray-400'
                  }`}>
                    {referral.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-xs text-gray-500">{referral.date}</span>
                <span className="text-xs text-gray-400">{referral.purchases} purchase{referral.purchases !== 1 ? 's' : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="px-5 pb-4">
        <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20">
          <h3 className="text-sm font-medium text-white mb-2">How It Works</h3>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-white">1</span>
              </div>
              <p className="text-xs text-gray-300">Share your referral code with friends</p>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-white">2</span>
              </div>
              <p className="text-xs text-gray-300">They sign up and make their first purchase</p>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-white">3</span>
              </div>
              <p className="text-xs text-gray-300">You earn $20 automatically!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
