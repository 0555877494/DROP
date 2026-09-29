import { products } from '../data/products';
import { Product } from '../data/products';

interface RecentlyViewedProps {
  onProductSelect: (product: Product) => void;
}

// Simulate recently viewed products (in real app, this would be stored in state/localStorage)
const recentlyViewed = products.slice(0, 8);

export default function RecentlyViewed({ onProductSelect }: RecentlyViewedProps) {
  if (recentlyViewed.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-5">
        <div className="w-24 h-24 mb-4 rounded-full bg-gray-900/80 flex items-center justify-center">
          <i className="fa-solid fa-clock-rotate-left text-gray-600 text-3xl" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No recently viewed items</h2>
        <p className="text-sm text-gray-400 text-center">
          Items you view will appear here for easy access
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">Recently Viewed</h1>
            <p className="text-sm text-gray-400">{recentlyViewed.length} items</p>
          </div>
          <button className="text-violet-400 text-sm font-medium">Clear All</button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {recentlyViewed.map((product, i) => (
            <button
              key={product.id}
              onClick={() => onProductSelect(product)}
              className="rounded-2xl glass overflow-hidden text-left active:scale-[0.97] transition-transform animate-scale-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="h-32 bg-gradient-to-br from-gray-800/30 to-gray-900/30 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.isHot && (
                  <div className="absolute top-2 left-2 bg-orange-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                    🔥 HOT
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{product.brand}</p>
                <p className="text-xs font-medium text-white truncate mt-0.5">{product.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{product.colorway.split('/')[0].trim()}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-white">${product.price}</span>
                  {product.change !== undefined && (
                    <span className={`text-[10px] font-medium ${product.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {product.change > 0 ? '↑' : '↓'}{Math.abs(product.change)}%
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="px-5 pb-4">
        <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20">
          <div className="flex gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="text-sm font-medium text-white mb-1">Pro Tip</p>
              <p className="text-xs text-gray-300 leading-relaxed">
                Items stay in your recently viewed for 7 days. Set price alerts to get notified when prices drop!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
