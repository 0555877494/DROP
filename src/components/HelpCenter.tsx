import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'How does authentication work?',
    answer: 'Every item goes through our multi-point authentication process. Our experts inspect stitching, materials, tags, and packaging to ensure 100% authenticity.',
    category: 'Authentication',
  },
  {
    id: 2,
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee. Free shipping on orders over $200.',
    category: 'Shipping',
  },
  {
    id: 3,
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all items in original condition. Items must be unworn with all tags attached. Return shipping is free.',
    category: 'Returns',
  },
  {
    id: 4,
    question: 'How do I sell on DROP?',
    answer: 'Click "Become a Seller" in your profile. Complete the application, and once approved, you can list items for sale. We handle authentication and shipping.',
    category: 'Selling',
  },
  {
    id: 5,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, Amex), Apple Pay, PayPal, and DROP gift cards. All transactions are secure and encrypted.',
    category: 'Payment',
  },
  {
    id: 6,
    question: 'How do price alerts work?',
    answer: 'Set a target price for any item, and we\'ll notify you via push notification when the price drops to or below your target. You can set multiple alerts.',
    category: 'Features',
  },
  {
    id: 7,
    question: 'Can I track my order?',
    answer: 'Yes! Go to "My Orders" in your profile to see real-time tracking information. You\'ll also receive email updates at each shipping milestone.',
    category: 'Orders',
  },
  {
    id: 8,
    question: 'What if I receive a fake item?',
    answer: 'This won\'t happen! All items are authenticated before shipping. If you somehow receive an inauthentic item, contact support immediately for a full refund.',
    category: 'Authentication',
  },
];

interface HelpCenterProps {
  onClose?: () => void;
}

export default function HelpCenter({ onClose }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category)))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">Help Center</h1>
        <p className="text-sm text-gray-400">Find answers to common questions</p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full bg-gray-900/80 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-violet-500 text-white' : 'glass text-gray-300'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="px-5 pb-4 space-y-2">
        {filteredFaqs.map((faq, i) => (
          <div
            key={faq.id}
            className="rounded-2xl glass overflow-hidden animate-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <button
              onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              className="w-full p-4 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-1">{faq.question}</p>
                  <span className="text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
                    {faq.category}
                  </span>
                </div>
                <i className={`fa-solid fa-chevron-down text-gray-400 text-xs transition-transform ${
                  expandedFaq === faq.id ? 'rotate-180' : ''
                }`} />
              </div>
            </button>
            {expandedFaq === faq.id && (
              <div className="px-4 pb-4 animate-fade-in">
                <p className="text-xs text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-gray-400 text-sm">No results found</p>
            <p className="text-gray-500 text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="px-5 pb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">💬</span>
            <div>
              <p className="text-sm font-medium text-white">Still need help?</p>
              <p className="text-xs text-gray-400">Our support team is here 24/7</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl bg-violet-500 text-white text-xs font-bold active:scale-95 transition-transform">
              <i className="fa-solid fa-comment mr-1" />
              Live Chat
            </button>
            <button className="flex-1 py-2.5 rounded-xl glass text-gray-300 text-xs font-bold active:scale-95 transition-transform">
              <i className="fa-solid fa-envelope mr-1" />
              Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
