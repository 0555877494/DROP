import { useState } from 'react';

interface AuthItem {
  id: number;
  productName: string;
  productImage: string;
  brand: string;
  status: 'pending' | 'authenticated' | 'failed' | 'shipped';
  submittedDate: string;
  completedDate?: string;
  orderId: string;
}

interface AuthenticationCenterProps {
  onClose?: () => void;
}

export default function AuthenticationCenter({ onClose }: AuthenticationCenterProps) {
  const [items] = useState<AuthItem[]>([
    {
      id: 1,
      productName: 'Air Jordan 1 Chicago',
      productImage: 'https://image.qwenlm.ai/generated-images/5ed618f2-16e0-497d-b52c-295c1b46604f/_result.png',
      brand: 'Jordan',
      status: 'authenticated',
      submittedDate: 'Dec 10, 2024',
      completedDate: 'Dec 11, 2024',
      orderId: 'DRP-2024-001',
    },
    {
      id: 2,
      productName: 'Yeezy 350 V2 Zebra',
      productImage: 'https://image.qwenlm.ai/generated-images/957f1d67-a6e0-4466-b056-2e8a50790544/_result.png',
      brand: 'adidas',
      status: 'pending',
      submittedDate: 'Dec 12, 2024',
      orderId: 'DRP-2024-002',
    },
    {
      id: 3,
      productName: 'Nike Dunk Low Panda',
      productImage: 'https://image.qwenlm.ai/generated-images/05e2035b-703e-4a72-ab95-bb816dd22b4a/_result.png',
      brand: 'Nike',
      status: 'shipped',
      submittedDate: 'Dec 8, 2024',
      completedDate: 'Dec 9, 2024',
      orderId: 'DRP-2024-003',
    },
  ]);

  const pendingCount = items.filter(i => i.status === 'pending').length;
  const authenticatedCount = items.filter(i => i.status === 'authenticated' || i.status === 'shipped').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'authenticated': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'shipped': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return 'fa-clock';
      case 'authenticated': return 'fa-shield-halved';
      case 'failed': return 'fa-xmark';
      case 'shipped': return 'fa-truck';
      default: return 'fa-question';
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold mb-1">Authentication Center</h1>
        <p className="text-sm text-gray-400">Track your item verification status</p>
      </div>

      {/* Stats */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl glass text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-2">
              <i className="fa-solid fa-clock text-yellow-400 text-xl" />
            </div>
            <p className="text-2xl font-bold text-white">{pendingCount}</p>
            <p className="text-xs text-gray-400">Pending</p>
          </div>
          <div className="p-4 rounded-2xl glass text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
              <i className="fa-solid fa-check text-green-400 text-xl" />
            </div>
            <p className="text-2xl font-bold text-white">{authenticatedCount}</p>
            <p className="text-xs text-gray-400">Verified</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/20">
          <h3 className="text-sm font-semibold text-white mb-2">Our Authentication Process</h3>
          <div className="flex items-center justify-between">
            {['Received', 'Inspected', 'Verified', 'Shipped'].map((step, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  i < 3 ? 'bg-violet-500' : 'bg-gray-700'
                }`}>
                  <span className="text-xs font-bold text-white">{i + 1}</span>
                </div>
                <p className="text-[10px] text-gray-400 text-center">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="px-5 pb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Your Items</h3>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl glass animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex gap-3 mb-3">
                <div className="w-16 h-16 rounded-xl bg-gray-800/50 overflow-hidden flex-shrink-0">
                  <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{item.brand}</p>
                  <p className="text-sm font-medium text-white truncate">{item.productName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Order: {item.orderId}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
                  <i className={`fa-solid ${getStatusIcon(item.status)} text-sm`} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div>
                  <p className="text-xs text-gray-500">Submitted</p>
                  <p className="text-xs text-white">{item.submittedDate}</p>
                </div>
                {item.completedDate && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="text-xs text-white">{item.completedDate}</p>
                  </div>
                )}
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>

              {item.status === 'pending' && (
                <div className="mt-3 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-xs text-yellow-300">
                    <i className="fa-solid fa-info-circle mr-1" />
                    Estimated completion: 24-48 hours
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="px-5 pb-4">
        <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
          <div className="flex gap-3">
            <span className="text-xl">🛡️</span>
            <div>
              <p className="text-sm font-medium text-white mb-1">100% Authenticity Guarantee</p>
              <p className="text-xs text-gray-300 leading-relaxed">
                Every item goes through our multi-point authentication process. If we can't verify it, you get a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
