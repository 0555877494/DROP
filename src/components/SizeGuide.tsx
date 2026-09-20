import { useState } from 'react';

interface SizeGuideProps {
  onClose: () => void;
}

const sizeData = {
  us: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
  uk: ['5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
  eu: ['38.5', '39', '40', '40.5', '41', '42', '42.5', '43', '44', '44.5', '45', '45.5', '46', '47.5'],
  cm: ['24', '24.5', '25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30', '31'],
};

export default function SizeGuide({ onClose }: SizeGuideProps) {
  const [selectedUS, setSelectedUS] = useState('10');
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  const getIndex = () => sizeData.us.indexOf(selectedUS);

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black animate-slide-up">
      {/* Header */}
      <div className="shrink-0 bg-gray-950 border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Size Guide</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <i className="fa-solid fa-xmark text-gray-400 text-sm" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        {/* US Size Selector */}
        <div className="mb-6">
          <p className="text-sm font-medium text-white mb-3">Your US Size</p>
          <div className="grid grid-cols-4 gap-2">
            {sizeData.us.map(size => (
              <button
                key={size}
                onClick={() => setSelectedUS(size)}
                className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedUS === size
                    ? 'bg-violet-500 text-white'
                    : 'bg-gray-800/80 text-gray-300 border border-white/5'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="mb-4">
          <p className="text-sm font-medium text-white mb-3">Measurement Unit</p>
          <div className="flex gap-2">
            <button
              onClick={() => setUnit('in')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                unit === 'in' ? 'bg-violet-500 text-white' : 'bg-gray-800/80 text-gray-300'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                unit === 'cm' ? 'bg-violet-500 text-white' : 'bg-gray-800/80 text-gray-300'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Size Conversion Table */}
        <div className="rounded-2xl glass overflow-hidden mb-6">
          <div className="grid grid-cols-4 bg-gray-900/80 border-b border-white/5">
            <div className="p-3 text-xs font-semibold text-gray-400 text-center">US</div>
            <div className="p-3 text-xs font-semibold text-gray-400 text-center">UK</div>
            <div className="p-3 text-xs font-semibold text-gray-400 text-center">EU</div>
            <div className="p-3 text-xs font-semibold text-gray-400 text-center">{unit === 'in' ? 'IN' : 'CM'}</div>
          </div>
          
          <div className="max-h-64 overflow-y-auto no-scrollbar">
            {sizeData.us.map((usSize, i) => {
              const cmValue = parseFloat(sizeData.cm[i]);
              const inValue = (cmValue / 2.54).toFixed(1);
              
              return (
                <div
                  key={i}
                  className={`grid grid-cols-4 border-b border-white/5 last:border-0 ${
                    i === getIndex() ? 'bg-violet-500/10' : ''
                  }`}
                >
                  <div className={`p-3 text-sm text-center ${i === getIndex() ? 'text-violet-400 font-bold' : 'text-white'}`}>
                    {usSize}
                  </div>
                  <div className="p-3 text-sm text-gray-300 text-center">{sizeData.uk[i]}</div>
                  <div className="p-3 text-sm text-gray-300 text-center">{sizeData.eu[i]}</div>
                  <div className="p-3 text-sm text-gray-300 text-center">
                    {unit === 'in' ? inValue : sizeData.cm[i]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Measure */}
        <div className="rounded-2xl glass p-4 mb-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <i className="fa-solid fa-ruler text-violet-400" />
            How to Measure
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-violet-400">1</span>
              </div>
              <p className="text-xs text-gray-300">Place your foot on a piece of paper with your heel against a wall</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-violet-400">2</span>
              </div>
              <p className="text-xs text-gray-300">Mark the longest point of your toe on the paper</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-violet-400">3</span>
              </div>
              <p className="text-xs text-gray-300">Measure the distance from the wall to the mark</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-violet-400">4</span>
              </div>
              <p className="text-xs text-gray-300">Use the chart above to find your size</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4">
          <div className="flex gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="text-sm font-medium text-white mb-1">Pro Tip</p>
              <p className="text-xs text-gray-300">
                Measure your feet at the end of the day when they're slightly swollen for the most accurate fit. 
                If you're between sizes, go up half a size for sneakers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
