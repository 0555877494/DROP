import { useState } from 'react';
import { Product } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export default function ProductDetail({ product, onClose, onAddToCart, isWishlisted, onToggleWishlist }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'sales'>('details');
  const [priceAlertSet, setPriceAlertSet] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [showPriceAlert, setShowPriceAlert] = useState(false);

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product, selectedSize);
    }
  };

  const profit = product.price - product.retailPrice;
  const profitPercent = ((profit / product.retailPrice) * 100).toFixed(0);

  return (
    <div className="absolute inset-0 z-50 flex flex-col animate-slide-up">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Content */}
      <div className="relative mt-auto bg-gray-950 rounded-t-3xl max-h-[92%] flex flex-col overflow-hidden border-t border-white/5">
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-700" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center z-10"
        >
          <i className="fa-solid fa-xmark text-gray-400 text-sm" />
        </button>

        <div className="overflow-y-auto no-scrollbar flex-1">
          {/* Product Image */}
          <div className="h-52 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 relative">
            <span className="text-7xl animate-float">{product.image}</span>
            {product.isHot && (
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                🔥 HOT
              </div>
            )}
            <button
              onClick={onToggleWishlist}
              className={`absolute top-4 right-14 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isWishlisted ? 'bg-pink-500/20 border border-pink-500/30' : 'bg-gray-800/80'
              }`}
            >
              <i className={`fa-${isWishlisted ? 'solid' : 'regular'} fa-heart ${isWishlisted ? 'text-pink-400' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Product Info */}
          <div className="px-5 pt-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">{product.brand}</p>
            <h2 className="text-xl font-bold text-white mt-1">{product.name}</h2>
            <p className="text-sm text-gray-400 mt-1">{product.colorway}</p>

            {/* Price Section */}
            <div className="flex items-center gap-4 mt-4">
              <div>
                <p className="text-2xl font-bold text-white">${product.price}</p>
                <p className="text-xs text-gray-500">Last Sale: ${product.lastSale}</p>
              </div>
              <div className="h-10 w-px bg-gray-800" />
              <div>
                <p className="text-sm text-gray-400">Retail</p>
                <p className="text-sm text-gray-300">${product.retailPrice}</p>
              </div>
              <div className="h-10 w-px bg-gray-800" />
              <div>
                <p className="text-sm text-gray-400">Premium</p>
                <p className={`text-sm font-medium ${profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  +{profitPercent}%
                </p>
              </div>
            </div>

            {/* Change Badge */}
            {product.change !== undefined && (
              <div className={`inline-flex items-center gap-1 mt-3 px-3 py-1.5 rounded-full text-xs font-medium ${
                product.change > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                <i className={`fa-solid fa-arrow-trend-${product.change > 0 ? 'up' : 'down'} text-[10px]`} />
                {Math.abs(product.change)}% this week
              </div>
            )}

            {/* Price Alert */}
            <div className="mt-3">
              {!showPriceAlert ? (
                <button
                  onClick={() => setShowPriceAlert(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium active:scale-95 transition-transform w-full justify-center"
                >
                  <i className={`fa-${priceAlertSet ? 'solid' : 'regular'} fa-bell`} />
                  {priceAlertSet ? 'Price Alert Set ✓' : 'Set Price Alert'}
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 animate-scale-in">
                  <p className="text-xs text-blue-300 mb-2">Get notified when price drops to:</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input
                        type="number"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(e.target.value)}
                        placeholder={String(Math.round(product.price * 0.85))}
                        className="w-full bg-black/30 border border-white/10 rounded-lg py-2 pl-7 pr-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                    <button
                      onClick={() => { setPriceAlertSet(true); setShowPriceAlert(false); }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold active:scale-95 transition-transform"
                    >
                      Set
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mt-5 border-b border-white/5">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === 'details' ? 'text-white border-violet-500' : 'text-gray-500 border-transparent'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === 'sales' ? 'text-white border-violet-500' : 'text-gray-500 border-transparent'
                }`}
              >
                Sales History
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'details' ? (
              <div className="py-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-white">{new Date(product.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Style</span>
                  <span className="text-white">{product.category === 'sneakers' ? 'Sneakers' : 'Streetwear'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Seller</span>
                  <span className="text-white flex items-center gap-1">
                    {product.seller}
                    <i className="fa-solid fa-circle-check text-blue-400 text-xs" />
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rating</span>
                  <span className="text-white flex items-center gap-1">
                    <i className="fa-solid fa-star text-yellow-400 text-xs" />
                    {product.sellerRating}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Condition</span>
                  <span className="text-green-400 font-medium">Brand New</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Authentication</span>
                  <span className="text-white flex items-center gap-1">
                    <i className="fa-solid fa-shield-halved text-green-400 text-xs" />
                    Verified
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-4">
                <div className="space-y-2">
                  {[
                    { date: 'Today', price: product.lastSale || product.price, size: '10' },
                    { date: 'Yesterday', price: (product.lastSale || product.price) - 5, size: '9.5' },
                    { date: '2 days ago', price: (product.lastSale || product.price) - 12, size: '10.5' },
                    { date: '3 days ago', price: (product.lastSale || product.price) + 8, size: '9' },
                    { date: '4 days ago', price: (product.lastSale || product.price) - 3, size: '11' },
                  ].map((sale, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-gray-400">{sale.date}</span>
                      <span className="text-xs text-gray-500">Size {sale.size}</span>
                      <span className="text-sm font-medium text-white">${sale.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && (
              <div className="pb-4">
                <p className="text-sm font-medium text-white mb-3">Select Size</p>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
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
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="shrink-0 px-5 py-4 bg-gray-950 border-t border-white/5">
          <div className="flex gap-3">
            <button
              onClick={onToggleWishlist}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                isWishlisted ? 'bg-pink-500/20 border-pink-500/30' : 'border-white/10'
              }`}
            >
              <i className={`fa-${isWishlisted ? 'solid' : 'regular'} fa-heart ${isWishlisted ? 'text-pink-400' : 'text-gray-400'} text-lg`} />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`flex-1 py-4 rounded-2xl text-sm font-bold transition-all ${
                selectedSize
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white active:scale-[0.98] shadow-lg shadow-violet-500/20'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedSize ? `Add to Bag — $${product.price}` : 'Select a Size'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
