"use client"
import React, { useState, useEffect } from 'react';

// Islamic Pattern Component
const IslamicPattern = () => {
  return (
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="islamic-geo" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <g stroke="currentColor" strokeWidth="0.5" fill="none">
              <circle cx="60" cy="60" r="30" />
              <circle cx="60" cy="60" r="15" />
              <path d="M30,60 L90,60 M60,30 L60,90" />
              <path d="M38.79,38.79 L81.21,81.21 M81.21,38.79 L38.79,81.21" />
              <circle cx="60" cy="60" r="45" opacity="0.3" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-geo)" className="text-neutral-600" />
      </svg>
    </div>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleArray :any= [];
    for (let i = 0; i < 25; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15
      });
    }
    setParticles(particleArray);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle:any) => (
        <div
          key={particle.id}
          className="absolute text-neutral-300/40 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        >
          ◦
        </div>
      ))}
    </div>
  );
};

export function BirthdayHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center  overflow-hidden">
      <IslamicPattern />
      <FloatingParticles />

      {/* Ambient Light Orbs */}
      <div 
        className="absolute top-1/4 left-1/6 w-80 h-80 bg-gradient-radial from-rose-100/30 via-rose-50/20 to-transparent rounded-full blur-3xl animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
        }}
      />
      <div 
        className="absolute bottom-1/3 right-1/5 w-64 h-64 bg-gradient-radial from-amber-100/25 via-amber-50/15 to-transparent rounded-full blur-2xl animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * -0.08}px, ${mousePosition.y * -0.08}px)`,
          animationDelay: '2s'
        }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-radial from-violet-100/20 via-violet-50/10 to-transparent rounded-full blur-xl animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 0.12}px, ${mousePosition.y * 0.12}px)`,
          animationDelay: '4s'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
            {/* Decorative Top Element */}
            <div className="flex items-center justify-center gap-6 mb-12">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-rose-300/60 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-1.5 h-1.5 bg-violet-300/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent via-neutral-300 to-transparent" />
          </div>
        {/* Header Section */}
        <div className="mb-16 animate-fade-in-up">

        <div className="text-center mb-8">
    <p className="text-xl md:text-2xl lg:text-3xlfont-semibold tracking-wide">
      السلام عليكم ورحمة الله وبركاته
    </p>
    <p className="text-neutral-500 font-light mt-2 text-sm md:text-base">
      Peace and blessings be upon you
    </p>
  </div>
      

          {/* Main Title */}
          <h1 className="font-serif text-7xl md:text-9xl lg:text-[10rem] font-light bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 bg-clip-text text-transparent mb-8 leading-none tracking-[-0.02em] select-none">
          BarakAllahu Lika
          </h1>

          {/* Subtitle */}
          <div className="relative">
            <p className="text-2xl md:text-3xl lg:text-4xl text-neutral-500 font-light leading-relaxed tracking-wide mb-4">
              May this special day bring you endless
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-rose-400 via-amber-400 to-violet-400 bg-clip-text text-transparent font-medium tracking-wide">
              joy and blessings
            </p>
          </div>

          {/* Vertical Separator */}
          <div className="w-px h-20 bg-gradient-to-b from-neutral-300 via-neutral-200 to-transparent mx-auto mt-12" />
        </div>

        {/* Quote Card */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="group relative backdrop-blur-xl bg-white/60 border border-white/80 rounded-[2.5rem] p-12 md:p-16 lg:p-20 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-700 transform hover:scale-[1.01]">
            
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-rose-200/30 via-transparent to-violet-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Quote Icon */}
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200/50 rounded-2xl mb-8 shadow-inner">
                <svg className="w-8 h-8 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              {/* Quote Text */}
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-neutral-700 leading-relaxed mb-10 font-light tracking-wide max-w-4xl mx-auto">
                "The best of people are those who benefit others, and the most beloved to Allah are those who are most beneficial to His creation."
              </blockquote>

              {/* Attribution */}
              <div className="relative">
                <div className="w-16 h-px bg-gradient-to-r from-rose-300 to-amber-300 mx-auto mb-4" />
                <cite className="text-neutral-500 font-medium text-lg tracking-wide">
                  Prophet Muhammad (PBUH)
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3;
          }
          33% { 
            transform: translateY(-10px) rotate(1deg); 
            opacity: 0.6;
          }
          66% { 
            transform: translateY(5px) rotate(-1deg); 
            opacity: 0.4;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}