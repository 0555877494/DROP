import { useState } from 'react';

interface Post {
  id: number;
  user: string;
  avatar: string;
  time: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  liked: boolean;
  tags: string[];
}

const posts: Post[] = [
  {
    id: 1,
    user: 'SneakerKing99',
    avatar: '👑',
    time: '2h ago',
    content: 'Just copped these Jordan 1 Chicagos! Been hunting for months. What do you think? 🔥',
    images: ['https://image.qwenlm.ai/generated-images/5ed618f2-16e0-497d-b52c-295c1b46604f/_result.png'],
    likes: 234,
    comments: 42,
    liked: false,
    tags: ['Jordan 1', 'Chicago', 'Grail'],
  },
  {
    id: 2,
    user: 'StreetStyle',
    avatar: '✨',
    time: '5h ago',
    content: 'Rocking the Panda Dunks with a clean fit today. Sometimes simple is best! 🐼',
    images: ['https://image.qwenlm.ai/generated-images/05e2035b-703e-4a72-ab95-bb816dd22b4a/_result.png'],
    likes: 189,
    comments: 28,
    liked: true,
    tags: ['Dunk Low', 'Panda', 'OOTD'],
  },
  {
    id: 3,
    user: 'KicksCollector',
    avatar: '🔥',
    time: '1d ago',
    content: 'Collection update! Finally got the Travis Scotts. This has been my grail for years! 🌵',
    images: ['https://image.qwenlm.ai/generated-images/cc740e4f-c482-4596-af5c-e03d914ae893/_result.png'],
    likes: 567,
    comments: 89,
    liked: false,
    tags: ['Travis Scott', 'Jordan 1', 'Grail'],
  },
];

export default function CommunityFeed() {
  const [feedPosts, setFeedPosts] = useState(posts);
  const [activeFilter, setActiveFilter] = useState<'all' | 'following' | 'trending'>('all');

  const toggleLike = (postId: number) => {
    setFeedPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-3">Community</h1>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'all' as const, label: 'All Posts', icon: 'fa-globe' },
            { id: 'following' as const, label: 'Following', icon: 'fa-user-group' },
            { id: 'trending' as const, label: 'Trending', icon: 'fa-fire' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === tab.id ? 'bg-violet-500 text-white' : 'glass text-gray-400'
              }`}
            >
              <i className={`fa-solid ${tab.icon} text-xs`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Post */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl glass">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm font-bold">A</span>
            </div>
            <input
              type="text"
              placeholder="Share your latest drop..."
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
            />
            <button className="w-9 h-9 rounded-full bg-violet-500 flex items-center justify-center">
              <i className="fa-solid fa-camera text-white text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="px-5 pb-4 space-y-4">
        {feedPosts.map((post, i) => (
          <div
            key={post.id}
            className="rounded-2xl glass overflow-hidden animate-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Post Header */}
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-lg">{post.avatar}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{post.user}</p>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                <i className="fa-solid fa-ellipsis text-gray-400 text-sm" />
              </button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
              <p className="text-sm text-gray-200 leading-relaxed">{post.content}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Post Images */}
            {post.images.length > 0 && (
              <div className="relative">
                <img
                  src={post.images[0]}
                  alt="Post"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="p-4 flex items-center justify-between border-t border-white/5">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 transition-all ${
                  post.liked ? 'text-pink-400' : 'text-gray-400'
                }`}
              >
                <i className={`fa-${post.liked ? 'solid' : 'regular'} fa-heart`} />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-400">
                <i className="fa-regular fa-comment" />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-400">
                <i className="fa-regular fa-paper-plane" />
                <span className="text-sm">Share</span>
              </button>
              <button className="text-gray-400">
                <i className="fa-regular fa-bookmark" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
