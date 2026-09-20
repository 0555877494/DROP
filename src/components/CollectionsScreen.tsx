import { useState } from 'react';

interface Collection {
  id: number;
  name: string;
  description: string;
  icon: string;
  itemCount: number;
  totalValue: number;
  coverImage: string;
  isPublic: boolean;
}

const collections: Collection[] = [
  {
    id: 1,
    name: 'Grails',
    description: 'My most wanted sneakers',
    icon: '💎',
    itemCount: 5,
    totalValue: 4250,
    coverImage: 'https://image.qwenlm.ai/generated-images/cc740e4f-c482-4596-af5c-e03d914ae893/_result.png',
    isPublic: true,
  },
  {
    id: 2,
    name: 'Everyday Kicks',
    description: 'Comfortable daily wear',
    icon: '👟',
    itemCount: 8,
    totalValue: 1240,
    coverImage: 'https://image.qwenlm.ai/generated-images/05e2035b-703e-4a72-ab95-bb816dd22b4a/_result.png',
    isPublic: true,
  },
  {
    id: 3,
    name: 'Investment Pieces',
    description: 'High-value collectibles',
    icon: '📈',
    itemCount: 3,
    totalValue: 2890,
    coverImage: 'https://image.qwenlm.ai/generated-images/ec301c92-663d-4e89-8b05-31628857d284/_result.png',
    isPublic: false,
  },
  {
    id: 4,
    name: 'Streetwear',
    description: 'Hype clothing pieces',
    icon: '🔥',
    itemCount: 6,
    totalValue: 1850,
    coverImage: 'https://image.qwenlm.ai/generated-images/805c32f5-da9e-4d73-b195-e63d83a698de/_result.png',
    isPublic: true,
  },
];

export default function CollectionsScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  const totalItems = collections.reduce((sum, c) => sum + c.itemCount, 0);
  const totalValue = collections.reduce((sum, c) => sum + c.totalValue, 0);

  if (selectedCollection) {
    return (
      <div className="h-full overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="px-5 pt-4 pb-3">
          <button
            onClick={() => setSelectedCollection(null)}
            className="flex items-center gap-2 text-violet-400 text-sm font-medium mb-4"
          >
            <i className="fa-solid fa-arrow-left" />
            Back to Collections
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{selectedCollection.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{selectedCollection.name}</h1>
              <p className="text-sm text-gray-400">{selectedCollection.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <span className="text-sm text-gray-400">{selectedCollection.itemCount} items</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-white font-medium">${selectedCollection.totalValue.toLocaleString()}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedCollection.isPublic ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'
            }`}>
              {selectedCollection.isPublic ? '🌐 Public' : '🔒 Private'}
            </span>
          </div>
        </div>

        {/* Collection Items */}
        <div className="px-5 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: selectedCollection.itemCount }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl glass overflow-hidden animate-scale-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="h-32 bg-gradient-to-br from-gray-800/30 to-gray-900/30 flex items-center justify-center">
                  <span className="text-4xl">👟</span>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500">Brand</p>
                  <p className="text-sm font-medium text-white truncate">Product Name</p>
                  <p className="text-sm font-bold text-white mt-1">$250</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-4 space-y-2">
          <button className="w-full py-3 rounded-2xl bg-violet-500 text-white text-sm font-bold active:scale-[0.98] transition-transform">
            <i className="fa-solid fa-share-nodes mr-2" />
            Share Collection
          </button>
          <button className="w-full py-3 rounded-2xl glass text-gray-300 text-sm font-medium active:scale-[0.98] transition-transform">
            <i className="fa-solid fa-pen mr-2" />
            Edit Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Collections</h1>
            <p className="text-sm text-gray-400">{collections.length} collections • {totalItems} items</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center active:scale-95 transition-transform">
            <i className="fa-solid fa-plus text-white" />
          </button>
        </div>

        {/* Stats */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/20 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Total Collection Value</p>
              <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
              <i className="fa-solid fa-folder-open text-violet-400 text-xl" />
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              viewMode === 'grid' ? 'bg-violet-500 text-white' : 'glass text-gray-400'
            }`}
          >
            <i className="fa-solid fa-grid-2 mr-2" />
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              viewMode === 'list' ? 'bg-violet-500 text-white' : 'glass text-gray-400'
            }`}
          >
            <i className="fa-solid fa-list mr-2" />
            List
          </button>
        </div>
      </div>

      {/* Collections */}
      <div className="px-5 pb-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {collections.map((collection, i) => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection)}
                className="rounded-2xl glass overflow-hidden text-left active:scale-[0.97] transition-transform animate-scale-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="h-28 bg-gradient-to-br from-gray-800/30 to-gray-900/30 relative overflow-hidden">
                  <img
                    src={collection.coverImage}
                    alt={collection.name}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-2xl">{collection.icon}</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-white truncate">{collection.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{collection.itemCount} items</p>
                  <p className="text-sm font-bold text-white mt-1">${collection.totalValue.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {collections.map((collection, i) => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl glass text-left active:scale-[0.98] transition-transform animate-slide-right"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={collection.coverImage}
                    alt={collection.name}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <span className="absolute text-2xl">{collection.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{collection.name}</p>
                  <p className="text-xs text-gray-400">{collection.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{collection.itemCount} items</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-white font-medium">${collection.totalValue.toLocaleString()}</span>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-600 text-xs" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
