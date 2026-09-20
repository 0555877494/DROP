import { useState } from 'react';

interface ARTryOnProps {
  productImage: string;
  productName: string;
  onClose: () => void;
}

export default function ARTryOn({ productImage, productName, onClose }: ARTryOnProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [angle, setAngle] = useState(0);

  const startCapture = () => {
    setIsCapturing(true);
    setShowGuide(false);
    // Simulate AR processing
    setTimeout(() => {
      setIsCapturing(false);
    }, 2000);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      {/* Header */}
      <div className="shrink-0 bg-gray-950/95 backdrop-blur-xl border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <i className="fa-solid fa-xmark text-gray-400 text-sm" />
            </button>
            <div>
              <p className="text-sm font-medium text-white">AR Try-On</p>
              <p className="text-xs text-gray-400">{productName}</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-info-circle text-gray-400 text-sm" />
          </button>
        </div>
      </div>

      {/* AR View */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Simulated Camera View */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Foot Outline Guide */}
          {showGuide && (
            <div className="relative">
              <div className="w-48 h-64 border-2 border-dashed border-violet-400/50 rounded-3xl flex items-center justify-center animate-pulse">
                <div className="text-center">
                  <i className="fa-solid fa-shoe-prints text-violet-400 text-4xl mb-2" />
                  <p className="text-sm text-violet-300">Position your foot here</p>
                </div>
              </div>
            </div>
          )}

          {/* Product Overlay */}
          {!showGuide && (
            <div className="relative">
              <div
                className="transition-transform duration-500"
                style={{ transform: `rotate(${angle}deg) scale(1.2)` }}
              >
                <img
                  src={productImage}
                  alt={productName}
                  className="w-64 h-64 object-contain drop-shadow-2xl"
                />
              </div>
              
              {/* AR Effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-2 border-violet-400/30 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-violet-400/20 rounded-full" />
              </div>
            </div>
          )}

          {/* Loading State */}
          {isCapturing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-white">Processing AR...</p>
              </div>
            </div>
          )}
        </div>

        {/* Corner Markers */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-violet-400" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-violet-400" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-violet-400" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-violet-400" />
      </div>

      {/* Controls */}
      <div className="shrink-0 bg-gray-950 border-t border-white/5 px-4 py-4">
        {/* Angle Selector */}
        {!showGuide && (
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => setAngle(angle - 15)}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center active:scale-90 transition-transform"
            >
              <i className="fa-solid fa-rotate-left text-gray-400" />
            </button>
            <div className="flex-1 flex items-center gap-2">
              <span className="text-xs text-gray-400">Side</span>
              <input
                type="range"
                min="-45"
                max="45"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="flex-1 h-1 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500"
              />
              <span className="text-xs text-gray-400">Angle</span>
            </div>
            <button
              onClick={() => setAngle(angle + 15)}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center active:scale-90 transition-transform"
            >
              <i className="fa-solid fa-rotate-right text-gray-400" />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          {showGuide ? (
            <button
              onClick={startCapture}
              className="px-8 py-3 rounded-full bg-violet-500 text-white text-sm font-bold active:scale-95 transition-transform shadow-lg shadow-violet-500/30"
            >
              <i className="fa-solid fa-camera mr-2" />
              Start AR
            </button>
          ) : (
            <>
              <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                <i className="fa-solid fa-rotate text-gray-400" />
              </button>
              <button
                onClick={() => setShowGuide(true)}
                className="px-6 py-3 rounded-full bg-violet-500 text-white text-sm font-bold active:scale-95 transition-transform"
              >
                <i className="fa-solid fa-camera mr-2" />
                Capture
              </button>
              <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                <i className="fa-solid fa-share-nodes text-gray-400" />
              </button>
            </>
          )}
        </div>

        {/* Info */}
        <p className="text-center text-xs text-gray-500 mt-3">
          {showGuide ? 'Point camera at your foot to try on virtually' : 'Rotate and adjust to see different angles'}
        </p>
      </div>
    </div>
  );
}
