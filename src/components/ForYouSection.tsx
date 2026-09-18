import { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../data/products';

interface ForYouProps {
  onProductSelect: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
}

export default function ForYouSection({ onProductSelect, wishlist, onToggleWishlist }: ForYouProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiped, setSwiped] = useState<number[]>([]);

  // Simulated AI-matched products (shuffled based on "preferences")
  const aiProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 5);
  const currentProduct = aiProducts[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && currentProduct) {
      onToggleWishlist(currentProduct.id);
    }
    setSwiped([...swiped, currentIndex]);
    setCurrentIndex(prev => (prev + 1) % aiProducts.length);
  };

  if (!currentProduct) return null;

  return (
    <div className="mb-5 px-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="bg-gradient-to-r from-violet-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">AI</span>
          For You
        </h2>
        <button className="text-violet-400 text-sm font-medium">Refresh</button>
      </div>

      {/* Swipe Card */}
      <div className="relative h-56 rounded-3xl overflow-hidden border border-white/5 animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl animate-float">{currentProduct.image}</span>
        </div>
        
        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">{currentProduct.brand}</p>
          <p className="text-sm font-medium text-white truncate">{currentProduct.name}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-base font-bold text-white">${currentProduct.price}</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded-full">
                98% match
              </span>
            </div>
          </div>
        </div>

        {/* AI Match Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-violet-500 to-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
          ✨ AI Pick
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-6 mt-3">
        <button
          onClick={() => handleSwipe('left')}
          className="w-12 h-12 rounded-full bg-gray-800 border border-white/5 flex items-center justify-center active:scale-90 transition-transform"
        >
          <i className="fa-solid fa-xmark text-gray-400 text-lg" />
        </button>
        <button
          onClick={() => onProductSelect(currentProduct)}
          className="w-14 h-14 rounded-full bg-violet-500 flex items-center justify-center active:scale-90 transition-transform shadow-lg shadow-violet-500/30"
        >
          <i className="fa-solid fa-eye text-white text-lg" />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/20 flex items-center justify-center active:scale-90 transition-transform"
        >
          <i className="fa-solid fa-heart text-pink-400 text-lg" />
        </button>
      </div>

      <p className="text-center text-[10px] text-gray-600 mt-2">Swipe left to skip, right to wishlist</p>
    </div>
  );
}
