import { useState, useRef } from 'react';
import { products, categories } from '../data/products';
import { Product } from '../data/products';
import CountdownSection from './CountdownSection';
import ForYouSection from './ForYouSection';

interface HomeScreenProps {
  onProductSelect: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
}

export default function HomeScreen({ onProductSelect, wishlist, onToggleWishlist }: HomeScreenProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const hotItems = products.filter(p => p.isHot);
  const newItems = products.filter(p => p.isNew);
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            <span className="gradient-text">DROP</span>
          </h1>
          <p className="text-[11px] text-gray-500 -mt-0.5">Sneakers & Streetwear</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full glass flex items-center justify-center active:scale-95 transition-transform">
            <i className="fa-solid fa-magnifying-glass text-sm text-gray-300" />
          </button>
          <button className="w-9 h-9 rounded-full glass flex items-center justify-center active:scale-95 transition-transform">
            <i className="fa-solid fa-bell text-sm text-gray-300" />
          </button>
        </div>
      </div>

      {/* Live Ticker */}
      <div className="overflow-hidden bg-violet-500/10 border-y border-violet-500/10 py-2 mb-4">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {[...hotItems, ...hotItems].map((item, i) => (
            <span key={i} className="text-xs text-violet-300 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {item.name} — <span className="font-bold">${item.price}</span>
              <span className={item.change && item.change > 0 ? 'text-green-400' : 'text-red-400'}>
                {item.change && item.change > 0 ? '↑' : '↓'}{Math.abs(item.change || 0)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-white text-black'
                  : 'glass text-gray-300'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Drop */}
      <div className="px-5 mb-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/50 via-purple-900/30 to-pink-900/30 border border-white/5">
          <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 rounded-full -translate-y-12 translate-x-12 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full translate-y-12 -translate-x-12 blur-2xl" />
          <div className="flex">
            <div className="relative z-10 flex-1 p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                <span className="text-xs text-gray-400">Featured Drop</span>
              </div>
              <h2 className="text-xl font-bold mb-1">Travis Scott x Jordan 1 Low</h2>
              <p className="text-sm text-gray-400 mb-3">Reverse Mocha • Last Sale: $880</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onProductSelect(products[7])}
                  className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold active:scale-95 transition-transform"
                >
                  Buy Now — $890
                </button>
                <button
                  onClick={() => onToggleWishlist(8)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    wishlist.includes(8) ? 'bg-pink-500/20 border-pink-500/30' : 'border-white/10'
                  }`}
                >
                  <i className={`fa-${wishlist.includes(8) ? 'solid' : 'regular'} fa-heart ${wishlist.includes(8) ? 'text-pink-400' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>
            <div className="w-32 h-40 relative overflow-hidden">
              <img 
                src={products[7].image}
                alt="Travis Scott x Jordan 1 Low"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Drops */}
      <CountdownSection />

      {/* AI For You */}
      <ForYouSection
        onProductSelect={onProductSelect}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
      />

      {/* Hot Right Now */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            🔥 Hot Right Now
          </h2>
          <button className="text-violet-400 text-sm font-medium">See All</button>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2"
        >
          {hotItems.map((product, i) => (
            <button
              key={product.id}
              onClick={() => onProductSelect(product)}
              className="flex-shrink-0 w-40 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative rounded-2xl bg-gray-900/80 border border-white/5 overflow-hidden">
                <div className="h-36 flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{product.brand}</p>
                  <p className="text-xs font-medium text-white truncate mt-0.5">{product.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-white">${product.price}</span>
                    {product.change && (
                      <span className={`text-[10px] font-medium ${product.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {product.change > 0 ? '↑' : '↓'}{Math.abs(product.change)}%
                      </span>
                    )}
                  </div>
                </div>
                {product.isHot && (
                  <div className="absolute top-2 left-2 bg-orange-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                    HOT
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* New Drops */}
      {newItems.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between px-5 mb-3">
            <h2 className="text-lg font-bold flex items-center gap-2">
              ✨ New Drops
            </h2>
          </div>
          <div className="px-5 space-y-2">
            {newItems.map((product, i) => (
              <button
                key={product.id}
                onClick={() => onProductSelect(product)}
                className="flex items-center gap-3 p-3 rounded-2xl glass w-full text-left active:scale-[0.98] transition-transform animate-slide-right"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gray-800/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{product.brand}</p>
                  <p className="text-sm font-medium text-white truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.colorway.split('/')[0].trim()}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-white">${product.price}</p>
                  <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full font-medium">NEW</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Browse All */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Browse All</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product, i) => (
            <button
              key={product.id}
              onClick={() => onProductSelect(product)}
              className="rounded-2xl bg-gray-900/80 border border-white/5 overflow-hidden active:scale-[0.97] transition-transform animate-scale-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="h-28 flex items-center justify-center bg-gradient-to-br from-gray-800/30 to-gray-900/30 relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center"
                >
                  <i className={`fa-${wishlist.includes(product.id) ? 'solid' : 'regular'} fa-heart text-xs ${
                    wishlist.includes(product.id) ? 'text-pink-400' : 'text-gray-400'
                  }`} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{product.brand}</p>
                <p className="text-xs font-medium text-white truncate mt-0.5">{product.name}</p>
                <p className="text-sm font-bold text-white mt-1">${product.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
