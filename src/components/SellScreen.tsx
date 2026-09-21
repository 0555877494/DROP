import { useState } from 'react';

interface SellScreenProps {
  onClose: () => void;
}

const categories = ['Sneakers', 'Streetwear', 'Accessories', 'Collectibles', 'Electronics'];
const conditions = ['Brand New (DS)', 'VNDS (Very Near Deadstock)', 'Used - Excellent', 'Used - Good', 'Used - Fair'];
const brands = ['Nike', 'Jordan', 'adidas', 'New Balance', 'Supreme', 'Stüssy', 'Chrome Hearts', 'Other'];

export default function SellScreen({ onClose }: SellScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    photos: [] as string[],
    title: '',
    brand: '',
    category: '',
    size: '',
    condition: '',
    colorway: '',
    description: '',
    price: '',
    retailPrice: '',
    shipping: 'free',
    authentication: true,
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const totalSteps = 4;

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      {/* Header */}
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-xmark text-gray-400 text-sm" />
          </button>
          <p className="text-sm font-medium text-white">Sell an Item</p>
          <span className="text-xs text-gray-400">{step}/{totalSteps}</span>
        </div>
        {/* Progress */}
        <div className="mt-2 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold mb-1">Add Photos</h2>
              <p className="text-sm text-gray-400">Take clear photos of your item</p>
            </div>

            {/* Photo Upload */}
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-xl bg-gray-800/50 border-2 border-dashed border-violet-500/30 flex flex-col items-center justify-center">
                <i className="fa-solid fa-camera text-violet-400 text-xl mb-1" />
                <span className="text-[10px] text-gray-400">Camera</span>
              </div>
              <div className="aspect-square rounded-xl bg-gray-800/50 border border-white/5 flex flex-col items-center justify-center">
                <i className="fa-solid fa-image text-gray-500 text-xl mb-1" />
                <span className="text-[10px] text-gray-400">Gallery</span>
              </div>
              <div className="aspect-square rounded-xl bg-gray-800/50 border border-white/5 flex flex-col items-center justify-center">
                <i className="fa-solid fa-box text-gray-500 text-xl mb-1" />
                <span className="text-[10px] text-gray-400">Box</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex gap-2">
                <i className="fa-solid fa-lightbulb text-blue-400 mt-0.5" />
                <p className="text-xs text-gray-300">
                  <span className="text-blue-400 font-medium">Photo Tips:</span> Include all angles, any defects, box, and authentication cards for faster sales.
                </p>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g., Air Jordan 1 Retro High OG"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Brand *</label>
              <div className="flex flex-wrap gap-2">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => updateField('brand', brand)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      formData.brand === brand
                        ? 'bg-violet-500 text-white'
                        : 'bg-gray-800/80 text-gray-300 border border-white/5'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold mb-1">Item Details</h2>
              <p className="text-sm text-gray-400">Help buyers find your item</p>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Category *</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateField('category', cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      formData.category === cat
                        ? 'bg-violet-500 text-white'
                        : 'bg-gray-800/80 text-gray-300 border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Size *</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => updateField('size', e.target.value)}
                placeholder="e.g., 10, M, One Size"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Condition *</label>
              <div className="space-y-2">
                {conditions.map(cond => (
                  <button
                    key={cond}
                    onClick={() => updateField('condition', cond)}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium text-left transition-all ${
                      formData.condition === cond
                        ? 'bg-violet-500 text-white'
                        : 'bg-gray-800/80 text-gray-300 border border-white/5'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Colorway */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Colorway</label>
              <input
                type="text"
                value={formData.colorway}
                onChange={(e) => updateField('colorway', e.target.value)}
                placeholder="e.g., Chicago, Panda, Zebra"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold mb-1">Pricing</h2>
              <p className="text-sm text-gray-400">Set your price competitively</p>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Your Price *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-900/80 border border-white/5 rounded-xl pl-8 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                />
              </div>
            </div>

            {/* Retail Price */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Original Retail Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={formData.retailPrice}
                  onChange={(e) => updateField('retailPrice', e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-900/80 border border-white/5 rounded-xl pl-8 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                />
              </div>
            </div>

            {/* Shipping */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Shipping</label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateField('shipping', 'free')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    formData.shipping === 'free'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                      : 'bg-gray-800/80 text-gray-300 border border-white/5'
                  }`}
                >
                  Free Shipping
                </button>
                <button
                  onClick={() => updateField('shipping', 'buyer')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    formData.shipping === 'buyer'
                      ? 'bg-violet-500 text-white'
                      : 'bg-gray-800/80 text-gray-300 border border-white/5'
                  }`}
                >
                  Buyer Pays
                </button>
              </div>
            </div>

            {/* Fee Breakdown */}
            {formData.price && (
              <div className="p-4 rounded-2xl glass">
                <p className="text-xs text-gray-400 mb-2">Fee Breakdown</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Your Price</span>
                    <span className="text-white">${formData.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Platform Fee (5%)</span>
                    <span className="text-red-400">-${(parseFloat(formData.price) * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Payment Processing (3%)</span>
                    <span className="text-red-400">-${(parseFloat(formData.price) * 0.03).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/5 pt-1.5 flex justify-between text-sm">
                    <span className="text-white font-medium">You'll Receive</span>
                    <span className="text-green-400 font-bold">
                      ${(parseFloat(formData.price) * 0.92).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold mb-1">Review & List</h2>
              <p className="text-sm text-gray-400">Confirm your listing details</p>
            </div>

            {/* Listing Preview */}
            <div className="p-4 rounded-2xl glass">
              <div className="flex gap-3 mb-3">
                <div className="w-20 h-20 rounded-xl bg-gray-800/50 flex items-center justify-center">
                  <i className="fa-solid fa-image text-gray-600 text-2xl" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{formData.brand || 'Brand'}</p>
                  <p className="text-sm font-medium text-white">{formData.title || 'Item Title'}</p>
                  <p className="text-xs text-gray-400">{formData.size || 'Size'} • {formData.condition || 'Condition'}</p>
                  <p className="text-base font-bold text-green-400 mt-1">${formData.price || '0'}</p>
                </div>
              </div>
            </div>

            {/* Authentication */}
            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
              <div className="flex gap-3">
                <i className="fa-solid fa-shield-halved text-green-400 text-xl" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Authentication Included</p>
                  <p className="text-xs text-gray-300">
                    Your item will be verified by our experts before shipping to the buyer. This builds trust and increases sales.
                  </p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Selling Tips</p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Price competitively for faster sales</li>
                    <li>• Respond to messages within 1 hour</li>
                    <li>• Ship within 2 business days</li>
                    <li>• Items authenticate in 1-2 days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="shrink-0 bg-gray-950 border-t border-white/5 px-5 py-4">
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-2xl glass text-gray-300 text-sm font-medium active:scale-[0.98] transition-transform"
            >
              Back
            </button>
          )}
          <button
            onClick={() => step < totalSteps ? setStep(step + 1) : onClose()}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold active:scale-[0.98] transition-transform shadow-lg shadow-green-500/20"
          >
            {step === totalSteps ? (
              <><i className="fa-solid fa-tag mr-2" />List for Sale</>
            ) : (
              <>Continue <i className="fa-solid fa-arrow-right ml-2" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
