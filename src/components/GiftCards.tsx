interface Props { onClose: () => void; }
export default function GiftCards({ onClose }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Gift Cards</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 mb-4">
          <p className="text-xs text-white/70 mb-1">Gift Card Balance</p>
          <p className="text-3xl font-bold text-white">$150.00</p>
          <p className="text-xs text-white/70 mt-2">Expires: Dec 31, 2025</p>
        </div>
        <button className="w-full py-3 rounded-2xl bg-violet-500 text-white text-sm font-bold mb-3"><i className="fa-solid fa-gift mr-2" />Buy Gift Card</button>
        <button className="w-full py-3 rounded-2xl glass text-gray-300 text-sm font-medium"><i className="fa-solid fa-paper-plane mr-2" />Send to Friend</button>
      </div>
    </div>
  );
}
