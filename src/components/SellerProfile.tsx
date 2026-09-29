import { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../data/products';

interface SellerProfileProps {
  sellerName: string;
  rating: number;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
}

export default function SellerProfile({ sellerName, rating, onClose, onProductSelect }: SellerProfileProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews' | 'about'>('listings');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock seller data
  const seller = {
    name: sellerName,
    avatar: sellerName[0],
    rating: rating,
    totalSales: 247,
    responseTime: '< 1 hour',
    joinDate: 'Jan 2023',
    location: 'Los Angeles, CA',
    verified: true,
    bio: 'Authenticated sneaker reseller specializing in Jordan and Yeezy. All items 100% legit with proof of purchase.',
    listings: products.slice(0, 6),
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      {/* Header */}
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-arrow-left text-gray-400 text-sm" />
          </button>
          <p className="text-sm font-medium text-white">Seller Profile</p>
          <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-ellipsis-vertical text-gray-400 text-sm" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Profile Header */}
        <div className="px-5 pt-4 pb-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">{seller.avatar}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white">{seller.name}</h2>
                {seller.verified && (
                  <i className="fa-solid fa-circle-check text-blue-400" />
                )}
              </div>
              <p className="text-xs text-gray-400 mb-2">Member since {seller.joinDate}</p>
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-star text-yellow-400 text-xs" />
                <span className="text-sm font-medium text-white">{seller.rating}</span>
                <span className="text-xs text-gray-400">({seller.totalSales} sales)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isFollowing
                  ? 'bg-gray-800 text-gray-300 border border-white/10'
                  : 'bg-violet-500 text-white'
              }`}
            >
              {isFollowing ? (
                <><i className="fa-solid fa-check mr-2" />Following</>
              ) : (
                <><i className="fa-solid fa-plus mr-2" />Follow</>
              )}
            </button>
            <button className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-300 text-sm font-bold border border-white/10">
              <i className="fa-regular fa-comment mr-2" />
              Message
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="p-3 rounded-xl glass text-center">
              <p className="text-lg font-bold text-white">{seller.totalSales}</p>
              <p className="text-[10px] text-gray-400">Sales</p>
            </div>
            <div className="p-3 rounded-xl glass text-center">
              <p className="text-lg font-bold text-white">{seller.responseTime}</p>
              <p className="text-[10px] text-gray-400">Response</p>
            </div>
            <div className="p-3 rounded-xl glass text-center">
              <p className="text-lg font-bold text-white">{seller.rating}</p>
              <p className="text-[10px] text-gray-400">Rating</p>
            </div>
          </div>

          {/* Bio */}
          <div className="p-3 rounded-xl glass mb-4">
            <p className="text-xs text-gray-300 leading-relaxed">{seller.bio}</p>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
              <i className="fa-solid fa-location-dot text-gray-500 text-xs" />
              <span className="text-xs text-gray-400">{seller.location}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-white/5 mb-4">
            <button
              onClick={() => setActiveTab('listings')}
              className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'listings' ? 'text-white border-violet-500' : 'text-gray-500 border-transparent'
              }`}
            >
              Listings ({seller.listings.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'reviews' ? 'text-white border-violet-500' : 'text-gray-500 border-transparent'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'about' ? 'text-white border-violet-500' : 'text-gray-500 border-transparent'
              }`}
            >
              About
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-5 pb-4">
          {activeTab === 'listings' && (
            <div className="grid grid-cols-2 gap-3">
              {seller.listings.map((product, i) => (
                <button
                  key={product.id}
                  onClick={() => onProductSelect(product)}
                  className="rounded-2xl glass overflow-hidden text-left active:scale-[0.97] transition-transform animate-scale-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="h-28 bg-gradient-to-br from-gray-800/30 to-gray-900/30 relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{product.brand}</p>
                    <p className="text-xs font-medium text-white truncate mt-0.5">{product.name}</p>
                    <p className="text-sm font-bold text-white mt-1">${product.price}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-3 rounded-2xl glass">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-white">User {i + 1}</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <i key={star} className="fa-solid fa-star text-yellow-400 text-[8px]" />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500">{i + 1}w ago</span>
                  </div>
                  <p className="text-xs text-gray-300">Great seller! Fast shipping and item as described. Would buy again.</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl glass">
                <p className="text-xs font-medium text-gray-400 mb-1">Authentication</p>
                <p className="text-sm text-white flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-green-400" />
                  Verified Seller
                </p>
              </div>
              <div className="p-3 rounded-2xl glass">
                <p className="text-xs font-medium text-gray-400 mb-1">Shipping</p>
                <p className="text-sm text-white">Free shipping on orders over $200</p>
              </div>
              <div className="p-3 rounded-2xl glass">
                <p className="text-xs font-medium text-gray-400 mb-1">Returns</p>
                <p className="text-sm text-white">30-day return policy</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
