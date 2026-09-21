import { useState, useEffect } from 'react';
import { products } from '../data/products';
import { Product } from '../data/products';

interface FlashSalesProps {
  onProductSelect: (product: Product) => void;
}

interface FlashSale {
  product: Product;
  discount: number;
  originalPrice: number;
  salePrice: number;
  stock: number;
  sold: number;
  endTime: number;
}

const flashSales: FlashSale[] = [
  {
    product: products[0],
    discount: 25,
    originalPrice: products[0].price,
    salePrice: Math.round(products[0].price * 0.75),
    stock: 50,
    sold: 38,
    endTime: Date.now() + 3 * 60 * 60 * 1000,
  },
  {
    product: products[2],
    discount: 30,
    originalPrice: products[2].price,
    salePrice: Math.round(products[2].price * 0.70),
    stock: 100,
    sold: 67,
    endTime: Date.now() + 5 * 60 * 60 * 1000,
  },
  {
    product: products[4],
    discount: 20,
    originalPrice: products[4].price,
    salePrice: Math.round(products[4].price * 0.80),
    stock: 75,
    sold: 42,
    endTime: Date.now() + 2 * 60 * 60 * 1000,
  },
];

function CountdownTimer({ endTime }: { endTime: number }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, endTime - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="flex items-center gap-1 text-xs font-mono">
      <span className="bg-black/40 px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
      <span>:</span>
      <span className="bg-black/40 px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
      <span>:</span>
      <span className="bg-black/40 px-1.5 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>
  );
}

export default function FlashSales({ onProductSelect }: FlashSalesProps) {
  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <h1 className="text-2xl font-bold">Flash Sales</h1>
        </div>
        <p className="text-sm text-gray-400">Limited time deals - act fast!</p>
      </div>

      {/* Banner */}
      <div className="px-5 mb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
          <div className="relative z-10">
            <p className="text-xs text-white/80 font-medium mb-1">⚡ UP TO</p>
            <p className="text-4xl font-black text-white mb-1">30% OFF</p>
            <p className="text-xs text-white/80">On selected items • Ends soon!</p>
          </div>
        </div>
      </div>

      {/* Flash Sale Items */}
      <div className="px-5 pb-4 space-y-3">
        {flashSales.map((sale, i) => {
          const stockPercent = ((sale.stock - sale.sold) / sale.stock) * 100;
          const soldPercent = (sale.sold / sale.stock) * 100;

          return (
            <button
              key={i}
              onClick={() => onProductSelect(sale.product)}
              className="w-full p-4 rounded-2xl glass text-left active:scale-[0.98] transition-transform animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex gap-3 mb-3">
                <div className="w-24 h-24 rounded-xl bg-gray-800/50 overflow-hidden flex-shrink-0 relative">
                  <img src={sale.product.image} alt={sale.product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-1 left-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    -{sale.discount}%
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{sale.product.brand}</p>
                  <p className="text-sm font-medium text-white truncate">{sale.product.name}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{sale.product.colorway.split('/')[0].trim()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-red-400">${sale.salePrice}</span>
                    <span className="text-sm text-gray-500 line-through">${sale.originalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Ends in:</span>
                <CountdownTimer endTime={sale.endTime} />
              </div>

              {/* Stock Bar */}
              <div className="relative">
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-700"
                    style={{ width: `${soldPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-gray-500">{sale.sold} sold</span>
                  <span className="text-[10px] text-orange-400 font-medium">
                    {sale.stock - sale.sold} left
                  </span>
                </div>
              </div>

              {/* Urgency Badge */}
              {stockPercent < 30 && (
                <div className="mt-2 flex items-center gap-1 text-[10px] text-red-400 font-medium">
                  <i className="fa-solid fa-fire animate-pulse" />
                  <span>Selling fast!</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="px-5 pb-4">
        <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20">
          <div className="flex gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <p className="text-sm font-medium text-white mb-1">Flash Sale Rules</p>
              <p className="text-xs text-gray-300 leading-relaxed">
                Flash sales are limited-time offers with discounted prices. Items are first-come, first-served. Once sold out, deals end immediately!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
