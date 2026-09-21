import { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../data/products';

interface SizeAlert {
  id: number;
  product: Product;
  size: string;
  targetPrice?: number;
  active: boolean;
  createdAt: string;
}

interface SizeAlertsProps {
  onClose?: () => void;
}

export default function SizeAlerts({ onClose }: SizeAlertsProps) {
  const [alerts, setAlerts] = useState<SizeAlert[]>([
    {
      id: 1,
      product: products[0],
      size: '10',
      targetPrice: 250,
      active: true,
      createdAt: '2 days ago',
    },
    {
      id: 2,
      product: products[7],
      size: '9.5',
      active: true,
      createdAt: '5 days ago',
    },
  ]);

  const [showAddAlert, setShowAddAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [targetPrice, setTargetPrice] = useState('');

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const addAlert = () => {
    if (selectedProduct && selectedSize) {
      const newAlert: SizeAlert = {
        id: Date.now(),
        product: selectedProduct,
        size: selectedSize,
        targetPrice: targetPrice ? parseFloat(targetPrice) : undefined,
        active: true,
        createdAt: 'Just now',
      };
      setAlerts([...alerts, newAlert]);
      setShowAddAlert(false);
      setSelectedProduct(null);
      setSelectedSize('');
      setTargetPrice('');
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">Size Alerts</h1>
            <p className="text-sm text-gray-400">{alerts.length} active alerts</p>
          </div>
          <button
            onClick={() => setShowAddAlert(!showAddAlert)}
            className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center active:scale-95 transition-transform"
          >
            <i className="fa-solid fa-plus text-white" />
          </button>
        </div>
      </div>

      {/* Add Alert Form */}
      {showAddAlert && (
        <div className="px-5 mb-4 p-4 rounded-2xl glass animate-slide-up">
          <h3 className="text-sm font-semibold text-white mb-3">Create New Alert</h3>
          
          {/* Product Selection */}
          <div className="mb-3">
            <label className="text-xs text-gray-400 mb-1.5 block">Product</label>
            <select
              value={selectedProduct?.id || ''}
              onChange={(e) => setSelectedProduct(products.find(p => p.id === Number(e.target.value)) || null)}
              className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50"
            >
              <option value="">Select a product</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Size Selection */}
          {selectedProduct && selectedProduct.sizes && (
            <div className="mb-3">
              <label className="text-xs text-gray-400 mb-1.5 block">Size</label>
              <div className="grid grid-cols-4 gap-2">
                {selectedProduct.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-violet-500 text-white'
                        : 'bg-gray-800/80 text-gray-300 border border-white/5'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Target Price */}
          <div className="mb-3">
            <label className="text-xs text-gray-400 mb-1.5 block">Target Price (Optional)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="Get notified at this price"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl pl-8 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>
          </div>

          <button
            onClick={addAlert}
            disabled={!selectedProduct || !selectedSize}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
              selectedProduct && selectedSize
                ? 'bg-violet-500 text-white active:scale-95'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            Create Alert
          </button>
        </div>
      )}

      {/* Alerts List */}
      <div className="px-5 pb-4 space-y-3">
        {alerts.map((alert, i) => (
          <div
            key={alert.id}
            className={`p-4 rounded-2xl border transition-all animate-slide-up ${
              alert.active
                ? 'glass border-white/5'
                : 'bg-gray-900/40 border-white/5 opacity-60'
            }`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex gap-3 mb-3">
              <div className="w-16 h-16 rounded-xl bg-gray-800/50 overflow-hidden flex-shrink-0">
                <img src={alert.product.image} alt={alert.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">{alert.product.brand}</p>
                <p className="text-sm font-medium text-white truncate">{alert.product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">
                    Size {alert.size}
                  </span>
                  {alert.targetPrice && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                      ≤ ${alert.targetPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-xs text-gray-500">{alert.createdAt}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    alert.active
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {alert.active ? 'Active' : 'Paused'}
                </button>
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"
                >
                  <i className="fa-solid fa-trash-can text-red-400 text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-4xl mb-3">🔔</span>
            <p className="text-gray-400 text-sm">No size alerts</p>
            <p className="text-gray-500 text-xs mt-1">Create alerts to get notified</p>
          </div>
        )}
      </div>
    </div>
  );
}
