import { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../data/products';

interface PriceComparison {
  platform: string;
  price: number;
  condition: string;
  shipping: string;
  seller: string;
  rating: number;
  logo: string;
}

interface PriceCompareProps {
  onClose?: () => void;
}

export default function PriceCompare({ onClose }: PriceCompareProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [comparisons] = useState<Record<number, PriceComparison[]>>({
    1: [
      { platform: 'DROP', price: 285, condition: 'New', shipping: 'Free', seller: 'KicksVault', rating: 4.9, logo: '🟣' },
      { platform: 'StockX', price: 295, condition: 'New', shipping: '$15', seller: 'Verified', rating: 4.8, logo: '🟢' },
      { platform: 'GOAT', price: 290, condition: 'New', shipping: '$12', seller: 'Verified', rating: 4.7, logo: '🔵' },
      { platform: 'eBay', price: 275, condition: 'New', shipping: '$10', seller: 'TopRated', rating: 4.6, logo: '🟡' },
      { platform: 'Stadium Goods', price: 310, condition: 'New', shipping: 'Free', seller: 'Official', rating: 5.0, logo: '🔴' },
    ],
  });

  const currentComparisons = comparisons[selectedProduct.id] || [];
  const bestPrice = Math.min(...currentComparisons.map(c => c.price));
  const worstPrice = Math.max(...currentComparisons.map(c => c.price));
  const savings = worstPrice - bestPrice;

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">Price Compare</h1>
        <p className="text-sm text-gray-400">Find the best deal across platforms</p>
      </div>

      {/* Product Selector */}
      <div className="px-5 mb-4">
        <select
          value={selectedProduct.id}
          onChange={(e) => setSelectedProduct(products.find(p => p.id === Number(e.target.value)) || products[0])}
          className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50"
        >
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Selected Product */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl glass">
          <div className="flex gap-3">
            <div className="w-20 h-20 rounded-xl bg-gray-800/50 overflow-hidden flex-shrink-0">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">{selectedProduct.brand}</p>
              <p className="text-sm font-medium text-white truncate">{selectedProduct.name}</p>
              <p className="text-xs text-gray-400 mt-1">{selectedProduct.colorway.split('/')[0].trim()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Banner */}
      {savings > 0 && (
        <div className="px-5 mb-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">You can save up to</p>
                <p className="text-2xl font-bold text-green-400">${savings}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Best price</p>
                <p className="text-lg font-bold text-white">${bestPrice}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison List */}
      <div className="px-5 pb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Available Prices</h3>
        <div className="space-y-2">
          {currentComparisons
            .sort((a, b) => a.price - b.price)
            .map((comp, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border transition-all animate-slide-up ${
                  comp.price === bestPrice
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'glass border-white/5'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{comp.logo}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white">{comp.platform}</p>
                      {comp.price === bestPrice && (
                        <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                          BEST
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <i className="fa-solid fa-star text-yellow-400 text-[8px]" />
                      <span className="text-xs text-gray-400">{comp.rating}</span>
                      <span className="text-xs text-gray-500">• {comp.seller}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">${comp.price}</p>
                    <p className="text-[10px] text-gray-400">
                      {comp.shipping === 'Free' ? (
                        <span className="text-green-400">Free shipping</span>
                      ) : (
                        `+${comp.shipping} shipping`
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-xs text-gray-400">{comp.condition}</span>
                  <button className="text-xs text-violet-400 font-medium">
                    View on {comp.platform} →
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="px-5 pb-4">
        <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20">
          <div className="flex gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="text-sm font-medium text-white mb-1">Price Match Guarantee</p>
              <p className="text-xs text-gray-300 leading-relaxed">
                Found a lower price? We'll match it! Contact support with proof of the lower price within 24 hours of purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
