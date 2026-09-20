import { useState } from 'react';

interface Order {
  id: string;
  productName: string;
  productImage: string;
  brand: string;
  price: number;
  size: string;
  status: 'processing' | 'authenticated' | 'shipped' | 'delivered';
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  seller: string;
}

const orders: Order[] = [
  {
    id: 'DRP-2024-001',
    productName: 'Nike Dunk Low',
    productImage: 'https://image.qwenlm.ai/generated-images/05e2035b-703e-4a72-ab95-bb816dd22b4a/_result.png',
    brand: 'Nike',
    price: 145,
    size: '10',
    status: 'shipped',
    orderDate: 'Dec 10, 2024',
    estimatedDelivery: 'Dec 15, 2024',
    trackingNumber: '1Z999AA10123456784',
    seller: 'StreetHeat',
  },
  {
    id: 'DRP-2024-002',
    productName: 'Air Jordan 1 Retro High OG',
    productImage: 'https://image.qwenlm.ai/generated-images/5ed618f2-16e0-497d-b52c-295c1b46604f/_result.png',
    brand: 'Jordan',
    price: 285,
    size: '9.5',
    status: 'authenticated',
    orderDate: 'Dec 12, 2024',
    estimatedDelivery: 'Dec 18, 2024',
    seller: 'KicksVault',
  },
  {
    id: 'DRP-2024-003',
    productName: 'New Balance 550',
    productImage: 'https://image.qwenlm.ai/generated-images/e06b5b19-90a3-4959-a370-2332b151c9ea/_result.png',
    brand: 'New Balance',
    price: 120,
    size: '10.5',
    status: 'delivered',
    orderDate: 'Dec 5, 2024',
    estimatedDelivery: 'Dec 10, 2024',
    trackingNumber: '1Z999AA10123456785',
    seller: 'ClassicSoles',
  },
];

const statusSteps = [
  { id: 'processing', label: 'Processing', icon: 'fa-clock' },
  { id: 'authenticated', label: 'Authenticated', icon: 'fa-shield-halved' },
  { id: 'shipped', label: 'Shipped', icon: 'fa-truck' },
  { id: 'delivered', label: 'Delivered', icon: 'fa-check' },
];

export default function OrdersScreen() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-yellow-400 bg-yellow-500/20';
      case 'authenticated': return 'text-blue-400 bg-blue-500/20';
      case 'shipped': return 'text-violet-400 bg-violet-500/20';
      case 'delivered': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(s => s.id === status);
  };

  if (selectedOrder) {
    return (
      <div className="h-full overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="px-5 pt-4 pb-3">
          <button
            onClick={() => setSelectedOrder(null)}
            className="flex items-center gap-2 text-violet-400 text-sm font-medium mb-4"
          >
            <i className="fa-solid fa-arrow-left" />
            Back to Orders
          </button>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-sm text-gray-400">{selectedOrder.id}</p>
        </div>

        {/* Product Card */}
        <div className="px-5 mb-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl glass">
            <div className="w-20 h-20 rounded-xl bg-gray-800/50 overflow-hidden flex-shrink-0">
              <img src={selectedOrder.productImage} alt={selectedOrder.productName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">{selectedOrder.brand}</p>
              <p className="text-sm font-medium text-white truncate">{selectedOrder.productName}</p>
              <p className="text-xs text-gray-400 mt-1">Size: {selectedOrder.size}</p>
              <p className="text-base font-bold text-white mt-1">${selectedOrder.price}</p>
            </div>
          </div>
        </div>

        {/* Tracking Progress */}
        <div className="px-5 mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tracking</h2>
          <div className="p-4 rounded-2xl glass">
            <div className="flex items-center justify-between mb-4">
              {statusSteps.map((step, i) => {
                const currentIndex = getStatusIndex(selectedOrder.status);
                const isActive = i <= currentIndex;
                
                return (
                  <div key={step.id} className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isActive ? 'bg-violet-500 text-white' : 'bg-gray-800 text-gray-500'
                    }`}>
                      <i className={`fa-solid ${step.icon} text-sm`} />
                    </div>
                    <p className={`text-[10px] text-center ${isActive ? 'text-white' : 'text-gray-500'}`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
            
            {/* Progress Line */}
            <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-700"
                style={{ width: `${((getStatusIndex(selectedOrder.status) + 1) / statusSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="px-5 mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Order Info</h2>
          <div className="rounded-2xl glass overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5 flex justify-between">
              <span className="text-sm text-gray-400">Order Date</span>
              <span className="text-sm text-white">{selectedOrder.orderDate}</span>
            </div>
            <div className="px-4 py-3 border-b border-white/5 flex justify-between">
              <span className="text-sm text-gray-400">Est. Delivery</span>
              <span className="text-sm text-white">{selectedOrder.estimatedDelivery}</span>
            </div>
            {selectedOrder.trackingNumber && (
              <div className="px-4 py-3 border-b border-white/5 flex justify-between">
                <span className="text-sm text-gray-400">Tracking #</span>
                <span className="text-sm text-white font-mono text-xs">{selectedOrder.trackingNumber}</span>
              </div>
            )}
            <div className="px-4 py-3 flex justify-between">
              <span className="text-sm text-gray-400">Seller</span>
              <span className="text-sm text-white">{selectedOrder.seller}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-4 space-y-2">
          {selectedOrder.status === 'shipped' && (
            <button className="w-full py-3 rounded-2xl bg-violet-500 text-white text-sm font-bold active:scale-[0.98] transition-transform">
              <i className="fa-solid fa-map-location-dot mr-2" />
              Track Package
            </button>
          )}
          {selectedOrder.status === 'delivered' && (
            <button className="w-full py-3 rounded-2xl bg-green-500 text-white text-sm font-bold active:scale-[0.98] transition-transform">
              <i className="fa-solid fa-star mr-2" />
              Leave Review
            </button>
          )}
          <button className="w-full py-3 rounded-2xl glass text-gray-300 text-sm font-medium active:scale-[0.98] transition-transform">
            <i className="fa-solid fa-circle-question mr-2" />
            Need Help?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-gray-400">{orders.length} orders</p>
      </div>

      {/* Orders List */}
      <div className="px-5 pb-4 space-y-3">
        {orders.map((order, i) => (
          <button
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="w-full p-4 rounded-2xl glass text-left active:scale-[0.98] transition-transform animate-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 rounded-xl bg-gray-800/50 overflow-hidden flex-shrink-0">
                <img src={order.productImage} alt={order.productName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">{order.brand}</p>
                <p className="text-sm font-medium text-white truncate">{order.productName}</p>
                <p className="text-xs text-gray-400 mt-0.5">Size: {order.size}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-white">${order.price}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-xs text-gray-500">{order.id}</span>
              <span className="text-xs text-gray-400">{order.orderDate}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
