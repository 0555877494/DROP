import { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import ExploreScreen from './components/ExploreScreen';
import CartScreen from './components/CartScreen';
import RewardsScreen from './components/RewardsScreen';
import ProfileScreen from './components/ProfileScreen';
import ProductDetail from './components/ProductDetail';
import BottomNav from './components/BottomNav';
import NotificationsScreen from './components/NotificationsScreen';
import OrdersScreen from './components/OrdersScreen';
import WishlistScreen from './components/WishlistScreen';
import ReleaseCalendar from './components/ReleaseCalendar';
import MarketTrends from './components/MarketTrends';
import StyleBuilder from './components/StyleBuilder';
import SellerDashboard from './components/SellerDashboard';
import GiftCards from './components/GiftCards';
import SizeAlerts from './components/SizeAlerts';
import PriceCompare from './components/PriceCompare';
import PricePrediction from './components/PricePrediction';
import ReferralTracking from './components/ReferralTracking';
import AuthenticationCenter from './components/AuthenticationCenter';
import HelpCenter from './components/HelpCenter';
import SupportChat from './components/SupportChat';
import PersonalAnalytics from './components/PersonalAnalytics';
import { Product } from './data/products';

type TabType = 'home' | 'explore' | 'cart' | 'rewards' | 'profile';
type ModalType = 'notifications' | 'orders' | 'wishlist' | 'calendar' | 'trends' | 'style' | 'seller' | 'gifts' | 'alerts' | 'compare' | 'prediction' | 'referrals' | 'auth' | 'help' | 'support' | 'analytics' | null;

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setSelectedProduct(null);
  };

  const removeFromCart = (productId: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onProductSelect={setSelectedProduct}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
          />
        );
      case 'explore':
        return (
          <ExploreScreen
            onProductSelect={setSelectedProduct}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
          />
        );
      case 'cart':
        return (
          <CartScreen
            cart={cart}
            onRemove={removeFromCart}
          />
        );
      case 'rewards':
        return <RewardsScreen />;
      case 'profile':
        return (
          <ProfileScreen 
            wishlistCount={wishlist.length} 
            onNavigate={(screen) => setActiveModal(screen as ModalType)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[100dvh] w-full max-w-[430px] mx-auto bg-black text-white overflow-hidden relative flex flex-col">
      <div className="safe-top bg-black shrink-0" />

      <main className={`flex-1 overflow-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div key={activeTab} className="h-full animate-fade-in">
          {renderScreen()}
        </div>
      </main>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={() => toggleWishlist(selectedProduct.id)}
        />
      )}

      {activeModal === 'notifications' && (
        <NotificationsScreen onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'orders' && (
        <OrdersScreen onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'wishlist' && (
        <WishlistScreen
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onProductSelect={setSelectedProduct}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'calendar' && (
        <ReleaseCalendar onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'trends' && (
        <MarketTrends onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'style' && (
        <StyleBuilder onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'seller' && (
        <SellerDashboard onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'gifts' && (
        <GiftCards onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'alerts' && (
        <SizeAlerts onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'compare' && (
        <PriceCompare onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'prediction' && (
        <PricePrediction onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'referrals' && (
        <ReferralTracking onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'auth' && (
        <AuthenticationCenter onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'help' && (
        <HelpCenter onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'support' && (
        <SupportChat onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'analytics' && (
        <PersonalAnalytics onClose={() => setActiveModal(null)} />
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} cartCount={cartCount} />
      <div className="safe-bottom bg-black shrink-0" />
    </div>
  );
}

export default App;
