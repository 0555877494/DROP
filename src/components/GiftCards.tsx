import { useState } from 'react';

interface GiftCard {
  id: number;
  amount: number;
  code: string;
  used: boolean;
  expiryDate: string;
}

interface GiftCardsProps {
  onClose?: () => void;
}

export default function GiftCards({ onClose }: GiftCardsProps) {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [myCards] = useState<GiftCard[]>([
    { id: 1, amount: 100, code: 'DROP-ABC-123-XYZ', used: false, expiryDate: '2025-12-31' },
    { id: 2, amount: 50, code: 'DROP-DEF-456-UVW', used: true, expiryDate: '2025-06-30' },
  ]);

  const amounts = [25, 50, 100, 200, 500];

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">Gift Cards</h1>
        <p className="text-sm text-gray-400">Give the gift of heat</p>
      </div>

      {/* My Gift Cards */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-semibold text-white mb-3">My Gift Cards</h3>
        <div className="space-y-2">
          {myCards.map((card, i) => (
            <div
              key={card.id}
              className={`p-4 rounded-2xl border transition-all animate-slide-up ${
                card.used
                  ? 'bg-gray-900/40 border-white/5 opacity-60'
                  : 'bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-500/20'
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-gift text-violet-400" />
                  <span className="text-lg font-bold text-white">${card.amount}</span>
                </div>
                {card.used ? (
                  <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">Used</span>
                ) : (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Available</span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-mono mb-1">{card.code}</p>
              <p className="text-[10px] text-gray-500">Expires: {card.expiryDate}</p>
              {!card.used && (
                <button className="mt-2 w-full py-2 rounded-xl bg-violet-500 text-white text-xs font-bold active:scale-95 transition-transform">
                  Redeem
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Buy Gift Card */}
      <div className="px-5 pb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Buy a Gift Card</h3>
        
        {/* Amount Selection */}
        <div className="mb-4">
          <label className="text-xs text-gray-400 mb-2 block">Select Amount</label>
          <div className="grid grid-cols-3 gap-2">
            {amounts.map(amount => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`py-3 rounded-xl text-sm font-bold transition-all ${
                  selectedAmount === amount
                    ? 'bg-violet-500 text-white'
                    : 'glass text-gray-300'
                }`}
              >
                ${amount}
              </button>
            ))}
            <button
              onClick={() => setSelectedAmount(0)}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${
                selectedAmount === 0
                  ? 'bg-violet-500 text-white'
                  : 'glass text-gray-300'
              }`}
            >
              Custom
            </button>
          </div>
        </div>

        {selectedAmount === 0 && (
          <div className="mb-4">
            <label className="text-xs text-gray-400 mb-1.5 block">Custom Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full bg-gray-900/80 border border-white/5 rounded-xl pl-8 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>
          </div>
        )}

        {/* Recipient Email */}
        <div className="mb-4">
          <label className="text-xs text-gray-400 mb-1.5 block">Recipient Email</label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="friend@example.com"
            className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
          />
        </div>

        {/* Personal Message */}
        <div className="mb-4">
          <label className="text-xs text-gray-400 mb-1.5 block">Personal Message (Optional)</label>
          <textarea
            placeholder="Add a personal message..."
            rows={3}
            className="w-full bg-gray-900/80 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 resize-none"
          />
        </div>

        {/* Buy Button */}
        <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold active:scale-[0.98] transition-transform shadow-lg shadow-violet-500/20">
          <i className="fa-solid fa-gift mr-2" />
          Buy Gift Card — ${selectedAmount || 0}
        </button>
      </div>
    </div>
  );
}
