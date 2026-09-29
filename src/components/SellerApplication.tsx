import { useState } from 'react';

interface SellerApplicationProps {
  onClose: () => void;
}

export default function SellerApplication({ onClose }: SellerApplicationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    experience: '',
    categories: [] as string[],
    monthlyVolume: '',
    authentication: '',
    agreeTerms: false,
  });

  const totalSteps = 3;

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const submitApplication = () => {
    // Simulate submission
    alert('Application submitted! We\'ll review and get back to you within 48 hours.');
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      {/* Header */}
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-xmark text-gray-400 text-sm" />
          </button>
          <p className="text-sm font-medium text-white">Become a Seller</p>
          <div className="w-8" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="shrink-0 px-5 py-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Step {step} of {totalSteps}</span>
          <span className="text-xs text-violet-400 font-medium">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold mb-1">Personal Information</h2>
              <p className="text-sm text-gray-400">Tell us about yourself</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                placeholder="John Doe"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Business Name (Optional)</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => updateField('businessName', e.target.value)}
                placeholder="Your Store Name"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold mb-1">Selling Experience</h2>
              <p className="text-sm text-gray-400">Help us understand your background</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Years of Experience *</label>
              <select
                value={formData.experience}
                onChange={(e) => updateField('experience', e.target.value)}
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50"
              >
                <option value="">Select experience</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block">Categories You Want to Sell *</label>
              <div className="grid grid-cols-2 gap-2">
                {['Sneakers', 'Streetwear', 'Accessories', 'Collectibles', 'Electronics', 'Other'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                      formData.categories.includes(cat)
                        ? 'bg-violet-500 text-white'
                        : 'bg-gray-800/80 text-gray-300 border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Expected Monthly Volume *</label>
              <select
                value={formData.monthlyVolume}
                onChange={(e) => updateField('monthlyVolume', e.target.value)}
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50"
              >
                <option value="">Select volume</option>
                <option value="1-10">1-10 items</option>
                <option value="10-50">10-50 items</option>
                <option value="50-100">50-100 items</option>
                <option value="100+">100+ items</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold mb-1">Authentication & Terms</h2>
              <p className="text-sm text-gray-400">Final steps to become a seller</p>
            </div>

            <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20">
              <div className="flex gap-3">
                <i className="fa-solid fa-shield-halved text-violet-400 text-xl mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Authentication Required</p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    All items must be authenticated before sale. We'll provide you with authentication kits and training materials.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Authentication Experience *</label>
              <select
                value={formData.authentication}
                onChange={(e) => updateField('authentication', e.target.value)}
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50"
              >
                <option value="">Select experience</option>
                <option value="none">No experience (will learn)</option>
                <option value="some">Some experience</option>
                <option value="expert">Expert level</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl glass">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateField('agreeTerms', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-600 text-violet-500 focus:ring-violet-500"
                />
                <span className="text-xs text-gray-300 leading-relaxed">
                  I agree to the <span className="text-violet-400">Seller Terms of Service</span>, <span className="text-violet-400">Authentication Guidelines</span>, and <span className="text-violet-400">Community Standards</span>. I understand that all items must be authentic and meet quality standards.
                </span>
              </label>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="text-sm font-medium text-white mb-1">What's Next?</p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    After submission, our team will review your application within 48 hours. You'll receive an email with next steps and onboarding materials.
                  </p>
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
              onClick={prevStep}
              className="flex-1 py-3 rounded-2xl glass text-gray-300 text-sm font-medium active:scale-[0.98] transition-transform"
            >
              <i className="fa-solid fa-arrow-left mr-2" />
              Back
            </button>
          )}
          <button
            onClick={step === totalSteps ? submitApplication : nextStep}
            disabled={step === totalSteps && !formData.agreeTerms}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold active:scale-[0.98] transition-transform ${
              step === totalSteps && !formData.agreeTerms
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20'
            }`}
          >
            {step === totalSteps ? (
              <>Submit Application <i className="fa-solid fa-paper-plane ml-2" /></>
            ) : (
              <>Continue <i className="fa-solid fa-arrow-right ml-2" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
