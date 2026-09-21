import { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../data/products';

interface WishlistScreenProps {
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  onProductSelect: (product: Product) => void;
  onClose?: () => void;
}

export default function WishlistScreen({ wishlist, onToggleWishlist, onProductSelect, onClose }: WishlistScreenProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'price-low' | 'price-high'>('recent');

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const sortedProducts = [...wishlistProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      default: return b.id - a.id;
    }
  });

  const totalValue = wishlistProducts.reduce((sum, p) => sum + p.price, 0);

  if (wishlistProducts.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-5">
        <div className="w-24 h-24 mb-4 rounded-full bg-pink-500/10 flex items-center justify-center">
          <i className="fa-regular fa-heart text-pink-400 text-3xl" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Save items you love to buy them later
        </p>
        <button className="bg-violet-500 text-white px-6 py-3 rounded-full text-sm font-bold active:scale-95 transition-transform">
          Explore Drops
        </button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Wishlist</h1>
            <p className="text-sm text-gray-400">{wishlistProducts.length} items</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Total Value</p>
            <p className="text-lg font-bold text-white">${totalValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('recent')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              sortBy === 'recent' ? 'bg-violet-500 text-white' : 'glass text-gray-400'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setSortBy('price-low')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              sortBy === 'price-low' ? 'bg-violet-500 text-white' : 'glass text-gray-400'
            }`}
          >
            Price: Low
          </button>
          <button
            onClick={() => setSortBy('price-high')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              sortBy === 'price-high' ? 'bg-violet-500 text-white' : 'glass text-gray-400'
            }`}
          >
            Price: High
          </button>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="px-5 pb-4 space-y-3">
        {sortedProducts.map((product, i) => (
          <div
            key={product.id}
            className="flex items-center gap-3 p-3 rounded-2xl glass animate-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <button
              onClick={() => onProductSelect(product)}
              className="w-20 h-20 rounded-xl bg-gray-800/50 overflow-hidden flex-shrink-0"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">{product.brand}</p>
              <p className="text-sm font-medium text-white truncate">{product.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{product.colorway.split('/')[0].trim()}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-base font-bold text-white">${product.price}</p>
                {product.change !== undefined && (
                  <span className={`text-[10px] font-medium ${product.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {product.change > 0 ? '↑' : '↓'}{Math.abs(product.change)}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onToggleWishlist(product.id)}
                className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center active:scale-90 transition-transform"
              >
                <i className="fa-solid fa-heart text-pink-400 text-xs" />
              </button>
              <button
                onClick={() => onProductSelect(product)}
                className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center active:scale-90 transition-transform"
              >
                <i className="fa-solid fa-bag-shopping text-white text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-5 pb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Price Alert Active</p>
              <p className="text-xs text-gray-400">We'll notify you when prices drop</p>
            </div>
            <button className="bg-violet-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
