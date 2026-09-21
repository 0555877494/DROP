import { useState } from 'react';
import { products } from '../data/products';

interface OutfitItem {
  id: number;
  category: 'top' | 'bottom' | 'shoes' | 'accessories';
  product: typeof products[0];
}

interface StyleBuilderProps {
  onClose?: () => void;
}

export default function StyleBuilder({ onClose }: StyleBuilderProps) {
  const [outfit, setOutfit] = useState<OutfitItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'top' | 'bottom' | 'shoes' | 'accessories'>('shoes');

  const categories = [
    { id: 'shoes' as const, label: 'Shoes', icon: '👟', items: products.filter(p => p.category === 'sneakers') },
    { id: 'top' as const, label: 'Tops', icon: '👕', items: products.filter(p => p.category === 'streetwear') },
    { id: 'bottom' as const, label: 'Bottoms', icon: '👖', items: products.filter(p => p.category === 'streetwear') },
    { id: 'accessories' as const, label: 'Accessories', icon: '⌚', items: products.slice(0, 3) },
  ];

  const addToOutfit = (product: typeof products[0]) => {
    const newItem: OutfitItem = {
      id: Date.now(),
      category: selectedCategory,
      product,
    };
    setOutfit([...outfit, newItem]);
  };

  const removeFromOutfit = (id: number) => {
    setOutfit(outfit.filter(item => item.id !== id));
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);
  const totalValue = outfit.reduce((sum, item) => sum + item.product.price, 0);

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">Style Builder</h1>
        <p className="text-sm text-gray-400">Create your perfect outfit</p>
      </div>

      {/* Outfit Preview */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl glass">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Your Outfit</h3>
            <span className="text-sm font-bold text-violet-400">${totalValue}</span>
          </div>
          
          {outfit.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-2 block">👔</span>
              <p className="text-sm text-gray-400">Start building your outfit</p>
              <p className="text-xs text-gray-500 mt-1">Select items from categories below</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {outfit.map((item) => (
                <div key={item.id} className="relative group">
                  <div className="h-24 rounded-xl bg-gray-800/50 overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => removeFromOutfit(item.id)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <i className="fa-solid fa-xmark text-white text-xs" />
                  </button>
                  <div className="absolute bottom-1 left-1 right-1 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                    <p className="text-[10px] text-white truncate">{item.product.name}</p>
                    <p className="text-[10px] text-violet-400 font-bold">${item.product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {outfit.length > 0 && (
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-xl bg-violet-500 text-white text-xs font-bold active:scale-95 transition-transform">
                <i className="fa-solid fa-share-nodes mr-1" />
                Share Look
              </button>
              <button className="flex-1 py-2 rounded-xl glass text-gray-300 text-xs font-bold active:scale-95 transition-transform">
                <i className="fa-solid fa-bag-shopping mr-1" />
                Buy All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Selector */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id ? 'bg-violet-500 text-white' : 'glass text-gray-300'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="px-5 pb-4">
        <h3 className="text-sm font-semibold text-white mb-3">
          {currentCategory?.label} ({currentCategory?.items.length})
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {currentCategory?.items.map((product, i) => (
            <button
              key={product.id}
              onClick={() => addToOutfit(product)}
              className="rounded-2xl glass overflow-hidden text-left active:scale-[0.97] transition-transform animate-scale-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="h-28 bg-gradient-to-br from-gray-800/30 to-gray-900/30 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-violet-500 flex items-center justify-center">
                  <i className="fa-solid fa-plus text-white text-xs" />
                </div>
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
    </div>
  );
}
