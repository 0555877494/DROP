import { useState } from 'react';

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  size?: string;
}

interface ReviewsProps {
  productName: string;
  averageRating: number;
  totalReviews: number;
}

const reviews: Review[] = [
  {
    id: 1,
    user: 'SneakerKing99',
    avatar: '👑',
    rating: 5,
    date: '2 days ago',
    title: 'Absolutely fire!',
    comment: 'These are even better in person. The quality is insane and they\'re super comfortable. Got so many compliments already!',
    verified: true,
    helpful: 24,
    size: '10',
  },
  {
    id: 2,
    user: 'KicksCollector',
    avatar: '🔥',
    rating: 5,
    date: '1 week ago',
    title: 'Worth every penny',
    comment: 'Been wanting these for months. Finally pulled the trigger and so glad I did. Perfect condition, fast shipping.',
    verified: true,
    helpful: 18,
    size: '9.5',
  },
  {
    id: 3,
    user: 'StreetStyle',
    avatar: '✨',
    rating: 4,
    date: '2 weeks ago',
    title: 'Great but runs small',
    comment: 'Love the design and quality but they run about half a size small. I usually wear a 10 but had to exchange for 10.5.',
    verified: true,
    helpful: 31,
    size: '10.5',
  },
  {
    id: 4,
    user: 'HypeBeast',
    avatar: '💎',
    rating: 5,
    date: '3 weeks ago',
    title: 'Grail status',
    comment: 'These are a must-have. The colorway is perfect and they go with everything. Authentication was quick and smooth.',
    verified: true,
    helpful: 12,
    size: '11',
  },
];

export default function Reviews({ productName, averageRating, totalReviews }: ReviewsProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'highest' | 'lowest'>('helpful');
  const [helpfulClicked, setHelpfulClicked] = useState<number[]>([]);

  const ratingDistribution = [
    { stars: 5, count: 142, percentage: 71 },
    { stars: 4, count: 38, percentage: 19 },
    { stars: 3, count: 12, percentage: 6 },
    { stars: 2, count: 5, percentage: 2.5 },
    { stars: 1, count: 3, percentage: 1.5 },
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent': return 0; // Would sort by date in real app
      case 'helpful': return b.helpful - a.helpful;
      case 'highest': return b.rating - a.rating;
      case 'lowest': return a.rating - b.rating;
      default: return 0;
    }
  });

  const markHelpful = (reviewId: number) => {
    if (!helpfulClicked.includes(reviewId)) {
      setHelpfulClicked([...helpfulClicked, reviewId]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Rating Summary */}
      <div className="p-4 rounded-2xl glass">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-white">{averageRating}</p>
            <div className="flex items-center gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map(star => (
                <i
                  key={star}
                  className={`fa-solid fa-star text-xs ${
                    star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">{totalReviews} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {ratingDistribution.map(rating => (
              <div key={rating.stars} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-3">{rating.stars}</span>
                <i className="fa-solid fa-star text-yellow-400 text-[8px]" />
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${rating.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{rating.count}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-2.5 rounded-xl bg-violet-500 text-white text-sm font-bold active:scale-[0.98] transition-transform">
          <i className="fa-solid fa-pen mr-2" />
          Write a Review
        </button>
      </div>

      {/* Sort Options */}
      <div className="flex gap-2">
        {[
          { id: 'helpful' as const, label: 'Most Helpful' },
          { id: 'recent' as const, label: 'Recent' },
          { id: 'highest' as const, label: 'Highest' },
          { id: 'lowest' as const, label: 'Lowest' },
        ].map(option => (
          <button
            key={option.id}
            onClick={() => setSortBy(option.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              sortBy === option.id ? 'bg-violet-500 text-white' : 'glass text-gray-400'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {sortedReviews.map((review, i) => (
          <div
            key={review.id}
            className="p-4 rounded-2xl glass animate-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">{review.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{review.user}</p>
                  {review.verified && (
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full font-medium">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <i
                        key={star}
                        className={`fa-solid fa-star text-[10px] ${
                          star <= review.rating ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                  {review.size && (
                    <span className="text-xs text-gray-500">• Size {review.size}</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-white mb-1">{review.title}</p>
            <p className="text-xs text-gray-300 leading-relaxed">{review.comment}</p>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
              <button
                onClick={() => markHelpful(review.id)}
                className={`flex items-center gap-1.5 text-xs transition-all ${
                  helpfulClicked.includes(review.id) ? 'text-violet-400' : 'text-gray-400'
                }`}
              >
                <i className={`fa-${helpfulClicked.includes(review.id) ? 'solid' : 'regular'} fa-thumbs-up`} />
                <span>Helpful ({review.helpful + (helpfulClicked.includes(review.id) ? 1 : 0)})</span>
              </button>
              <button className="text-xs text-gray-400">
                <i className="fa-regular fa-comment mr-1" />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
