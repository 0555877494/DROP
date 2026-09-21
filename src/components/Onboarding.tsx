import { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    title: 'Welcome to DROP',
    subtitle: 'The ultimate sneaker & streetwear marketplace',
    description: 'Buy, sell, and track the hottest drops from top brands worldwide',
    icon: '👟',
    gradient: 'from-violet-600 to-purple-600',
  },
  {
    id: 2,
    title: 'Authentic Guaranteed',
    subtitle: 'Every item verified by experts',
    description: 'Our multi-step authentication process ensures you only get legit products',
    icon: '🛡️',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    id: 3,
    title: 'Track Prices',
    subtitle: 'Never miss a deal',
    description: 'Set price alerts and track market trends like a pro investor',
    icon: '📈',
    gradient: 'from-green-600 to-emerald-600',
  },
  {
    id: 4,
    title: 'Earn Rewards',
    subtitle: 'Get points for every action',
    description: 'Level up, unlock badges, and earn exclusive perks as you shop',
    icon: '🏆',
    gradient: 'from-amber-600 to-orange-600',
  },
  {
    id: 5,
    title: 'Join the Community',
    subtitle: 'Connect with collectors worldwide',
    description: 'Share your collection, follow sellers, and discover new drops',
    icon: '🌍',
    gradient: 'from-pink-600 to-rose-600',
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-[100dvh] w-full max-w-[430px] mx-auto bg-black text-white overflow-hidden relative flex flex-col">
      {/* Skip Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={skipOnboarding}
          className="text-sm text-gray-400 font-medium px-4 py-2"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-10 transition-all duration-500`} />

        {/* Icon */}
        <div className="relative mb-8 animate-scale-in">
          <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center shadow-2xl`}>
            <span className="text-6xl">{slide.icon}</span>
          </div>
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${slide.gradient} opacity-30 blur-2xl`} />
        </div>

        {/* Text Content */}
        <div className="text-center relative z-10 animate-slide-up">
          <h1 className="text-3xl font-black mb-2">{slide.title}</h1>
          <p className={`text-lg font-semibold bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent mb-3`}>
            {slide.subtitle}
          </p>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="shrink-0 px-8 pb-8">
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'w-8 bg-white'
                  : i < currentSlide
                  ? 'w-1.5 bg-white/50'
                  : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={nextSlide}
          className={`w-full py-4 rounded-2xl bg-gradient-to-r ${slide.gradient} text-white text-base font-bold active:scale-[0.98] transition-transform shadow-lg`}
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <i className={`fa-solid ${currentSlide === slides.length - 1 ? 'fa-rocket' : 'fa-arrow-right'} ml-2`} />
        </button>

        {/* Sign In Link */}
        {currentSlide === slides.length - 1 && (
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{' '}
            <button onClick={onComplete} className="text-violet-400 font-medium">
              Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
