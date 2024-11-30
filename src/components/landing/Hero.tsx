import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#9945FF] via-[#14F195] to-[#00C2FF]">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-28">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Left Column - Content */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Discover Expert-Led Courses in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] via-[#00C2FF] to-[#14F195] animate-gradient">
                  Web3
                </span>
              </h1>
              <p className="text-xl text-gray-100 max-w-2xl">
                Learn from the best creators in blockchain, Web3, and more. Join our community of innovators and build the future together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <button 
                  className="inline-flex items-center px-6 py-3 rounded-full bg-[#14F195] text-gray-900 font-semibold shadow-lg hover:bg-[#00C2FF] hover:text-white transition-all duration-200 group"
                  onClick={() => window.location.href = '/get-started'}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  className="inline-flex items-center px-6 py-3 rounded-full text-white border-2 border-[#14F195]/20 hover:border-[#14F195]/40 hover:bg-white/10 transition-all duration-200"
                  onClick={() => window.location.href = '/courses'}
                >
                  Explore Courses
                </button>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative hidden md:block">
              <div className="absolute -inset-4 bg-[#14F195]/10 rounded-2xl backdrop-blur-lg transform rotate-6" />
              <div className="relative bg-gradient-to-br from-black/80 to-black/60 rounded-xl p-6 shadow-2xl border border-[#14F195]/20">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black/50">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                    alt="Learning Platform"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isLoaded ? 'opacity-90 hover:scale-105' : 'opacity-0 scale-95'
                    }`}
                    onLoad={() => setIsLoaded(true)}
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-24 rounded-lg bg-gradient-to-br from-[#14F195]/20 to-[#00C2FF]/20 animate-pulse transition-opacity duration-500 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 