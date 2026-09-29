interface Props { onClose: () => void; }
export default function SupportChat({ onClose }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Support Chat</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
            <i className="fa-solid fa-headset text-violet-400 text-2xl" />
          </div>
          <p className="text-sm font-medium text-white mb-1">Support Team</p>
          <p className="text-xs text-green-400 mb-4"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-1" />Online</p>
          <p className="text-xs text-gray-400 text-center mb-6">Average response time: &lt; 5 minutes</p>
          <button className="bg-violet-500 text-white px-6 py-3 rounded-full text-sm font-bold"><i className="fa-regular fa-comment mr-2" />Start Chat</button>
        </div>
      </div>
    </div>
  );
}
