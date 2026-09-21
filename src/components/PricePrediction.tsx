import { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../data/products';

interface Prediction {
  product: Product;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  trend: 'up' | 'down' | 'stable';
}

interface PricePredictionProps {
  onClose?: () => void;
}

export default function PricePrediction({ onClose }: PricePredictionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [timeframe, setTimeframe] = useState<'30d' | '90d' | '6m' | '1y'>('90d');

  const predictions: Record<number, Prediction> = {
    1: {
      product: products[0],
      currentPrice: 285,
      predictedPrice: 320,
      confidence: 78,
      timeframe: '90 days',
      trend: 'up',
    },
    2: {
      product: products[1],
      currentPrice: 320,
      predictedPrice: 295,
      confidence: 65,
      timeframe: '90 days',
      trend: 'down',
    },
    3: {
      product: products[2],
      currentPrice: 145,
      predictedPrice: 155,
      confidence: 82,
      timeframe: '90 days',
      trend: 'up',
    },
    8: {
      product: products[7],
      currentPrice: 890,
      predictedPrice: 1050,
      confidence: 71,
      timeframe: '90 days',
      trend: 'up',
    },
  };

  const currentPrediction = predictions[selectedProduct.id] || {
    product: selectedProduct,
    currentPrice: selectedProduct.price,
    predictedPrice: Math.round(selectedProduct.price * 1.1),
    confidence: 70,
    timeframe: '90 days',
    trend: 'up' as const,
  };

  const priceChange = currentPrediction.predictedPrice - currentPrediction.currentPrice;
  const priceChangePercent = ((priceChange / currentPrediction.currentPrice) * 100).toFixed(1);

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">Price Prediction</h1>
        <p className="text-sm text-gray-400">AI-powered price forecasting</p>
      </div>

      {/* Product Selector */}
      <div className="px-5 mb-4">
        <select
          value={selectedProduct.id}
          onChange={(e) => setSelectedProduct(products.find(p => p.id === Number(e.target.value)) || products[0])}
          className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50"
        >
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Timeframe Selector */}
      <div className="px-5 mb-4">
        <div className="flex bg-gray-900/80 rounded-2xl p-1 border border-white/5">
          {(['30d', '90d', '6m', '1y'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                timeframe === tf ? 'bg-violet-500 text-white' : 'text-gray-400'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Prediction Card */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl glass">
          <div className="flex gap-3 mb-4">
            <div className="w-20 h-20 rounded-xl bg-gray-800/50 overflow-hidden flex-shrink-0">
              <img src={currentPrediction.product.image} alt={currentPrediction.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">{currentPrediction.product.brand}</p>
              <p className="text-sm font-medium text-white truncate">{currentPrediction.product.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-white">${currentPrediction.currentPrice}</span>
                <span className="text-xs text-gray-400">Current</span>
              </div>
            </div>
          </div>

          {/* Prediction */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/20 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-400">Predicted Price ({currentPrediction.timeframe})</p>
                <p className="text-2xl font-bold text-white">${currentPrediction.predictedPrice}</p>
              </div>
              <div className="text-right">
                <div className={`flex items-center gap-1 text-sm font-bold ${
                  currentPrediction.trend === 'up' ? 'text-green-400' : 
                  currentPrediction.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  <i className={`fa-solid fa-arrow-trend-${currentPrediction.trend}`} />
                  <span>{priceChangePercent}%</span>
                </div>
                <p className="text-xs text-gray-400">
                  {currentPrediction.trend === 'up' ? '+' : ''}${priceChange}
                </p>
              </div>
            </div>

            {/* Confidence Bar */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Confidence</span>
                <span className="text-xs font-bold text-white">{currentPrediction.confidence}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    currentPrediction.confidence >= 80 ? 'bg-green-500' :
                    currentPrediction.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${currentPrediction.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Factors */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Key Factors</p>
            <div className="flex items-center gap-2 text-xs">
              <i className="fa-solid fa-fire text-orange-400" />
              <span className="text-gray-300">High demand trend</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <i className="fa-solid fa-chart-line text-green-400" />
              <span className="text-gray-300">Historical price growth</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <i className="fa-solid fa-users text-blue-400" />
              <span className="text-gray-300">Increasing search volume</span>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Recommendation */}
      <div className="px-5 pb-4">
        <div className={`p-4 rounded-2xl border ${
          currentPrediction.trend === 'up' 
            ? 'bg-green-500/10 border-green-500/20' 
            : 'bg-red-500/10 border-red-500/20'
        }`}>
          <div className="flex gap-3">
            <span className="text-2xl">
              {currentPrediction.trend === 'up' ? '📈' : '📉'}
            </span>
            <div>
              <p className="text-sm font-medium text-white mb-1">
                {currentPrediction.trend === 'up' ? 'Buy Recommendation' : 'Hold/Sell Recommendation'}
              </p>
              <p className="text-xs text-gray-300 leading-relaxed">
                {currentPrediction.trend === 'up' 
                  ? 'Based on our analysis, this item is expected to increase in value. Consider buying now for potential profit.'
                  : 'Based on our analysis, this item may decrease in value. Consider holding or selling if you own it.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-5 pb-4">
        <p className="text-[10px] text-gray-600 text-center">
          Predictions are based on historical data and market trends. Actual prices may vary. Not financial advice.
        </p>
      </div>
    </div>
  );
}
