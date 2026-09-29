import { useState } from 'react';
import { CartItem } from '../App';

interface CheckoutFlowProps {
  cart: CartItem[];
  onClose: () => void;
}

export default function CheckoutFlow({ cart, onClose }: CheckoutFlowProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal'>('card');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 12.99;
  const serviceFee = Math.round(subtotal * 0.03);
  const total = subtotal + shipping + serviceFee;

  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete order
      alert('Order placed successfully! 🎉');
      onClose();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      {/* Header */}
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-xmark text-gray-400 text-sm" />
          </button>
          <p className="text-sm font-medium text-white">Checkout</p>
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
              <h2 className="text-xl font-bold mb-1">Shipping Address</h2>
              <p className="text-sm text-gray-400">Where should we send your order?</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Full Name *</label>
              <input
                type="text"
                value={shippingAddress.fullName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Street Address *</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                placeholder="123 Main St"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">City *</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  placeholder="Los Angeles"
                  className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">State *</label>
                <input
                  type="text"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  placeholder="CA"
                  className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">ZIP Code *</label>
                <input
                  type="text"
                  value={shippingAddress.zip}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                  placeholder="90001"
                  className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Country</label>
                <select
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold mb-1">Payment Method</h2>
              <p className="text-sm text-gray-400">Choose how you want to pay</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-violet-500/10 border-violet-500/30'
                    : 'glass border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-credit-card text-xl text-violet-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Credit/Debit Card</p>
                    <p className="text-xs text-gray-400">Visa, Mastercard, Amex</p>
                  </div>
                  {paymentMethod === 'card' && (
                    <i className="fa-solid fa-circle-check text-violet-400" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('apple')}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  paymentMethod === 'apple'
                    ? 'bg-violet-500/10 border-violet-500/30'
                    : 'glass border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-brands fa-apple text-xl text-white" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Apple Pay</p>
                    <p className="text-xs text-gray-400">Fast & secure</p>
                  </div>
                  {paymentMethod === 'apple' && (
                    <i className="fa-solid fa-circle-check text-violet-400" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  paymentMethod === 'paypal'
                    ? 'bg-violet-500/10 border-violet-500/30'
                    : 'glass border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-brands fa-paypal text-xl text-blue-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">PayPal</p>
                    <p className="text-xs text-gray-400">Pay with your PayPal account</p>
                  </div>
                  {paymentMethod === 'paypal' && (
                    <i className="fa-solid fa-circle-check text-violet-400" />
                  )}
                </div>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 mt-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold mb-1">Order Summary</h2>
              <p className="text-sm text-gray-400">Review your order before placing</p>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {cart.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl glass">
                  <div className="w-14 h-14 rounded-xl bg-gray-800/50 overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-400">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-white">${item.product.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="p-4 rounded-2xl glass">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Service Fee</span>
                  <span className="text-white">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/5 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-white">Total</span>
                    <span className="text-lg font-bold text-white">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="p-4 rounded-2xl glass">
              <p className="text-xs text-gray-400 mb-1">Shipping to:</p>
              <p className="text-sm text-white">{shippingAddress.fullName || 'John Doe'}</p>
              <p className="text-xs text-gray-400">{shippingAddress.address || '123 Main St'}</p>
              <p className="text-xs text-gray-400">{shippingAddress.city || 'Los Angeles'}, {shippingAddress.state || 'CA'} {shippingAddress.zip || '90001'}</p>
            </div>

            {/* Payment Info */}
            <div className="p-4 rounded-2xl glass">
              <p className="text-xs text-gray-400 mb-1">Payment:</p>
              <p className="text-sm text-white flex items-center gap-2">
                {paymentMethod === 'card' && <><i className="fa-solid fa-credit-card text-violet-400" /> Credit Card ending in 4242</>}
                {paymentMethod === 'apple' && <><i className="fa-brands fa-apple text-white" /> Apple Pay</>}
                {paymentMethod === 'paypal' && <><i className="fa-brands fa-paypal text-blue-400" /> PayPal</>}
              </p>
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
            onClick={nextStep}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold active:scale-[0.98] transition-transform shadow-lg shadow-violet-500/20"
          >
            {step === totalSteps ? (
              <><i className="fa-solid fa-lock mr-2" />Place Order — ${total.toFixed(2)}</>
            ) : (
              <>Continue <i className="fa-solid fa-arrow-right ml-2" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
