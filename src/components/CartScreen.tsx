import { CartItem } from '../App';

interface CartScreenProps {
  cart: CartItem[];
  onRemove: (productId: number, size: string) => void;
}

export default function CartScreen({ cart, onRemove }: CartScreenProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 12.99;
  const serviceFee = Math.round(subtotal * 0.03);
  const total = subtotal + shipping + serviceFee;

  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-5">
        <div className="text-6xl mb-4 animate-float">🛍️</div>
        <h2 className="text-xl font-bold text-white mb-2">Your bag is empty</h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Start adding some heat to your collection
        </p>
        <button className="bg-violet-500 text-white px-6 py-3 rounded-full text-sm font-bold active:scale-95 transition-transform">
          Explore Drops
        </button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Your Bag</h1>
          <p className="text-sm text-gray-400">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
            <i className="fa-solid fa-shield-halved text-green-400 mr-1" />
            Authenticated
          </span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 mb-5">
        {cart.map((item, i) => (
          <div
            key={`${item.product.id}-${item.size}`}
            className="flex gap-3 p-3 rounded-2xl glass animate-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="w-20 h-20 rounded-xl bg-gray-800/50 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">{item.product.image}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.product.brand}</p>
                  <p className="text-sm font-medium text-white truncate">{item.product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Size: {item.size}</p>
                </div>
                <button
                  onClick={() => onRemove(item.product.id, item.size)}
                  className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 ml-2"
                >
                  <i className="fa-solid fa-trash-can text-red-400 text-[10px]" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-base font-bold text-white">${item.product.price}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-500">Qty: {item.quantity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Promo code"
          className="flex-1 bg-gray-900/80 border border-white/5 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
        />
        <button className="bg-violet-500/20 text-violet-400 px-4 py-2.5 rounded-xl text-sm font-medium border border-violet-500/20">
          Apply
        </button>
      </div>

      {/* Order Summary */}
      <div className="p-4 rounded-2xl glass mb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Order Summary</h3>
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

      {/* Checkout Button */}
      <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-2xl text-sm font-bold active:scale-[0.98] transition-transform shadow-lg shadow-violet-500/20">
        <i className="fa-solid fa-lock mr-2 text-xs" />
        Checkout — ${total.toFixed(2)}
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-1 text-[10px] text-gray-500">
          <i className="fa-solid fa-shield-halved text-green-500" />
          <span>Buyer Protection</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-500">
          <i className="fa-solid fa-check-circle text-blue-500" />
          <span>Verified Sellers</span>
        </div>
      </div>
    </div>
  );
}
