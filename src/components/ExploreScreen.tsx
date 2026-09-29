import { useState } from 'react';
import { products, brands } from '../data/products';
import { Product } from '../data/products';

interface ExploreScreenProps {
  onProductSelect: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
}

type SortOption = 'popular' | 'price-low' | 'price-high' | 'newest';

export default function ExploreScreen({ onProductSelect, wishlist, onToggleWishlist }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBrand, setActiveBrand] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);

  let filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.colorway.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = activeBrand === 'All' || p.brand === activeBrand;
    return matchesSearch && matchesBrand;
  });

  filtered = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'newest': return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      default: return (b.lastSale || 0) - (a.lastSale || 0);
    }
  });

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-3">Explore</h1>
        
        {/* Search Bar */}
        <div className="relative mb-3">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
          <input
            type="text"
            placeholder="Search sneakers, brands, colorways..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900/80 border border-white/5 rounded-2xl py-3 pl-11 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              showFilters ? 'bg-violet-500 text-white' : 'glass text-gray-300'
            }`}
          >
            <i className="fa-solid fa-sliders text-[10px]" />
            Filters
          </button>
          <div className="flex-1 overflow-x-auto no-scrollbar flex gap-2">
            {brands.slice(0, 6).map(brand => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeBrand === brand
                    ? 'bg-white text-black'
                    : 'glass text-gray-400'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-3 p-3 rounded-2xl glass animate-slide-up">
            <p className="text-xs text-gray-400 mb-2 font-medium">Sort By</p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'popular' as SortOption, label: 'Popular' },
                { id: 'price-low' as SortOption, label: 'Price: Low' },
                { id: 'price-high' as SortOption, label: 'Price: High' },
                { id: 'newest' as SortOption, label: 'Newest' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    sortBy === opt.id ? 'bg-violet-500 text-white' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="px-5 mb-3">
        <p className="text-xs text-gray-500">{filtered.length} results</p>
      </div>

      {/* Product Grid */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product, i) => (
            <button
              key={product.id}
              onClick={() => onProductSelect(product)}
              className="rounded-2xl bg-gray-900/80 border border-white/5 overflow-hidden active:scale-[0.97] transition-transform animate-scale-in text-left"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="h-32 flex items-center justify-center bg-gradient-to-br from-gray-800/30 to-gray-900/30 relative overflow-hidden">
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
                {product.isHot && (
                  <div className="absolute top-2 left-2 bg-orange-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                    🔥 HOT
                  </div>
                )}
                {product.isNew && !product.isHot && (
                  <div className="absolute top-2 left-2 bg-green-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                    NEW
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{product.brand}</p>
                <p className="text-xs font-medium text-white truncate mt-0.5">{product.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{product.colorway.split('/')[0].trim()}</p>
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

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-gray-400 text-sm">No results found</p>
            <p className="text-gray-600 text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
