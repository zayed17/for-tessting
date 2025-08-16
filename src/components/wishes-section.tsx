"use client"
import React, { useState, useEffect } from 'react';

// Card Components
const Card = ({ children, className = "", ...props }:any) => (
  <div className={`bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }:any) => (
  <div className={`p-8 ${className}`} {...props}>
    {children}
  </div>
);

const topWishes = [
  {
    icon: "🤲",
    title: "Strong Faith",
    description:
      "May Allah strengthen your Iman, keep your heart firm in prayer, and guide you on the straight path.",
    gradient: "from-rose-100/40 to-pink-50/30",
    iconBg: "from-rose-200/60 to-rose-300/50",
  },
  {
    icon: "📖",
    title: "Love for Knowledge",
    description:
      "May you seek beneficial knowledge, understand the Quran, and apply it in your daily life.",
    gradient: "from-amber-100/35 to-yellow-50/25",
    iconBg: "from-amber-200/60 to-amber-300/50",
  },
  {
    icon: "🕊️",
    title: "Peace & Patience",
    description:
      "May Allah fill your days with patience, calmness, and gratitude, even during challenges.",
    gradient: "from-emerald-100/40 to-teal-50/30",
    iconBg: "from-emerald-200/60 to-emerald-300/50",
  },
];

export function WishesSection() {
  const [activeWish, setActiveWish] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative pt-7 sm:pt-14 px-8 overflow-hidden">
      
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/6 right-1/5 w-96 h-96 bg-gradient-radial from-rose-100/15 via-rose-50/8 to-transparent rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`
          }}
        />
        <div 
          className="absolute bottom-1/5 left-1/4 w-80 h-80 bg-gradient-radial from-amber-100/12 via-amber-50/6 to-transparent rounded-full blur-2xl animate-pulse-slow"
          style={{
            transform: `translate(${mousePosition.x * -0.06}px, ${mousePosition.y * -0.06}px)`,
            animationDelay: '4s'
          }}
        />
        <div 
          className="absolute top-2/3 right-1/3 w-64 h-64 bg-gradient-radial from-violet-100/10 via-violet-50/5 to-transparent rounded-full blur-xl animate-pulse-slow"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.008] pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="wish-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.5" fill="currentColor" />
              <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wish-pattern)" className="text-neutral-700" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        


        {/* Main Wishes Card */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Card className="relative group hover:scale-[1.01] transition-all duration-700 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] bg-gradient-to-br from-white/70 to-white/50 overflow-hidden">
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 group-hover:animate-shimmer" />
            
            <CardContent className="p-16 md:p-20 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200/60 rounded-3xl mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <span className="text-3xl">🤲</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-light text-neutral-700 mb-8 tracking-wide">
                  May Allah Grant You
                </h3>
                <div className="w-24 h-px bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300 mx-auto" />
              </div>

              {/* Wishes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topWishes.slice(0, 3).map((wish:any, index:any) => (
                  <div
                    key={index}
                    className="group/item text-center p-8 rounded-2xl transition-all duration-500 hover:bg-white/60 hover:scale-105 cursor-pointer"
                    onMouseEnter={() => setActiveWish(index)}
                    onMouseLeave={() => setActiveWish(null)}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${wish.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-500 group-hover/item:scale-110 group-hover/item:rotate-6`}>
                      <span className="text-xl text-white">{wish.icon}</span>
                    </div>
                    <h4 className="text-xl font-medium text-neutral-800 mb-4 tracking-wide">
                      {wish.title}
                    </h4>
                    <p className="text-neutral-600 leading-relaxed font-light">
                      {wish.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>




        {/* Bottom Decorative */}
       
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.15;
          }
          50% { 
            transform: scale(1.15);
            opacity: 0.3;
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-out;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}