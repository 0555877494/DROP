import { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import TasksScreen from './components/TasksScreen';
import StatsScreen from './components/StatsScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';

type TabType = 'home' | 'tasks' | 'stats' | 'profile';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'tasks':
        return <TasksScreen />;
      case 'stats':
        return <StatsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="h-[100dvh] w-full max-w-[430px] mx-auto bg-gray-950 text-white overflow-hidden relative flex flex-col">
      {/* Status bar spacer */}
      <div className="safe-top bg-gray-950 shrink-0" />
      
      {/* Main content */}
      <main className={`flex-1 overflow-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div key={activeTab} className="h-full animate-fade-in">
          {renderScreen()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Safe area bottom */}
      <div className="safe-bottom bg-gray-950 shrink-0" />
    </div>
  );
}

export default App;
