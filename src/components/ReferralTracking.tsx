interface Props { onClose: () => void; }
export default function ReferralTracking({ onClose }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Referral Program</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 mb-4 text-center">
          <p className="text-4xl font-bold text-white mb-1">$60</p>
          <p className="text-sm text-gray-300">Earned from referrals</p>
          <p className="text-xs text-amber-400 mt-2">3 friends joined</p>
        </div>
        <div className="p-4 rounded-2xl glass mb-4">
          <p className="text-xs text-gray-400 mb-2">Your Referral Code</p>
          <div className="flex items-center gap-2">
            <p className="flex-1 text-lg font-mono font-bold text-white">ALEX2024</p>
            <button className="bg-violet-500 text-white px-4 py-2 rounded-xl text-xs font-bold">Copy</button>
          </div>
        </div>
        <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold"><i className="fa-solid fa-share-nodes mr-2" />Share & Earn $20</button>
      </div>
    </div>
  );
}
