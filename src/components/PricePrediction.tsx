interface Props { onClose: () => void; }
export default function PricePrediction({ onClose }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Price Prediction</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-4">
          <p className="text-xs text-gray-400 mb-1">AI Prediction (6 months)</p>
          <p className="text-2xl font-bold text-green-400">$342</p>
          <p className="text-xs text-green-400 mt-1"><i className="fa-solid fa-arrow-trend-up mr-1" />+20% expected growth</p>
        </div>
        <div className="p-4 rounded-2xl glass mb-4">
          <p className="text-xs text-gray-400 mb-2">Confidence Level</p>
          <div className="w-full h-2 bg-gray-800 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }} /></div>
          <p className="text-xs text-gray-400 mt-1">78% confidence based on market data</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-xs text-gray-400"><i className="fa-solid fa-lightbulb text-amber-400 mr-1" />Recommendation: Hold for maximum profit</p>
        </div>
      </div>
    </div>
  );
}
