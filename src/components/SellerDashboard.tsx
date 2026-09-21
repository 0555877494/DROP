interface Props { onClose: () => void; }
export default function SellerDashboard({ onClose }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Seller Dashboard</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-2xl glass text-center"><p className="text-xl font-bold text-white">24</p><p className="text-[10px] text-gray-400">Active Listings</p></div>
          <div className="p-3 rounded-2xl glass text-center"><p className="text-xl font-bold text-green-400">$4,280</p><p className="text-[10px] text-gray-400">Total Sales</p></div>
          <div className="p-3 rounded-2xl glass text-center"><p className="text-xl font-bold text-white">4.9</p><p className="text-[10px] text-gray-400">Rating</p></div>
          <div className="p-3 rounded-2xl glass text-center"><p className="text-xl font-bold text-violet-400">12</p><p className="text-[10px] text-gray-400">Pending Orders</p></div>
        </div>
        <button onClick={onClose} className="w-full py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold"><i className="fa-solid fa-plus mr-2" />List New Item</button>
      </div>
    </div>
  );
}
