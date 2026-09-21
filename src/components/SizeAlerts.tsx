interface Props { onClose: () => void; }
export default function SizeAlerts({ onClose }: Props) {
  const alerts = [
    { product: 'Jordan 1 Chicago', size: '10', targetPrice: 250, currentPrice: 285, active: true },
    { product: 'Yeezy 350 Zebra', size: '9.5', targetPrice: 300, currentPrice: 320, active: true },
    { product: 'Dunk Low Panda', size: '10', targetPrice: 130, currentPrice: 145, active: false },
  ];
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><i className="fa-solid fa-arrow-left text-gray-400 text-sm" /></button>
        <p className="text-sm font-medium text-white">Size Alerts</p><div className="w-8" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-3">
        {alerts.map((alert, i) => (
          <div key={i} className="p-4 rounded-2xl glass animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white">{alert.product}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${alert.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                {alert.active ? 'Active' : 'Paused'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Size: {alert.size}</span>
              <span className="text-gray-400">Target: ${alert.targetPrice}</span>
              <span className="text-white font-medium">Current: ${alert.currentPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
