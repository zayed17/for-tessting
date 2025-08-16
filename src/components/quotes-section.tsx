"use client";
import React, { useState, useEffect, useRef } from 'react';

// Card Components
const Card = ({ children, className = "", ...props }:any) => (
  <div className={`bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }:any) => (
  <div className={`p-8 flex flex-col ${className}`} {...props}>
    {children}
  </div>
);

// Beautiful Islamic Duas
const duas = [
  {
    text: "رَبِّ زِدْنِي عِلْمًا",
    translation: "My Lord, increase me in knowledge.",
    source: "Quran 20:114",
    icon: "📖",
    gradient: "from-blue-100/40 to-indigo-50/25",
    iconBg: "from-blue-200/70 to-blue-400/50",
    meaning: "A prayer for continuous learning and wisdom"
  },
  {
    text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً",
    translation: "Our Lord, give us good in this world and good in the Hereafter.",
    source: "Quran 2:201",
    icon: "🤲",
    gradient: "from-emerald-100/35 to-teal-50/25",
    iconBg: "from-emerald-300/60 to-emerald-400/50",
    meaning: "The most comprehensive prayer for success in both worlds"
  },
  {
    text: "اللَّهُمَّ اجعلني من التوابين واجعلني من المتطهرين",
    translation: "O Allah, make me among those who repent and purify themselves.",
    source: "Hadith",
    icon: "🕊️",
    gradient: "from-violet-100/40 to-purple-50/25",
    iconBg: "from-violet-300/60 to-purple-400/50",
    meaning: "A prayer for spiritual cleansing and constant repentance"
  },
  {
    text: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
    translation: "My Lord, inspire me to be grateful for Your favor upon me.",
    source: "Quran 27:19",
    icon: "💎",
    gradient: "from-rose-100/35 to-pink-50/25",
    iconBg: "from-rose-300/60 to-pink-400/50",
    meaning: "A prayer for gratitude and appreciation of Allah's blessings"
  },
  {
    text: "رَبِّ اجعلني مقيم الصلاة ومن ذريتي",
    translation: "My Lord, make me steadfast in prayer and also from my descendants.",
    source: "Quran 14:40",
    icon: "🌙",
    gradient: "from-amber-100/40 to-yellow-50/25",
    iconBg: "from-amber-300/60 to-yellow-400/50",
    meaning: "A prayer for maintaining devotion across generations"
  }
];

export function DuasCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null) as any

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        if (!isHovered) {
          setCurrentSlide(prev => (prev + 1) % duas.length);
        }
      }, 8000);
    };
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  const goToSlide = (index:any) => setCurrentSlide(index);

  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % duas.length;
      slides.push({ ...duas[index], originalIndex: index, position: i });
    }
    return slides;
  };

  return (
    <section className="relative py-7 sm:py-14 px-8 overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-[32rem] h-[32rem] rounded-full blur-3xl animate-pulse-slow`}
            style={{
              top: `${i*30}%`,
              left: `${i*25}%`,
              background: `radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)`,
              transform: `translate(${mousePosition.x * (0.1-i*0.02)}px, ${mousePosition.y * (0.1-i*0.02)}px)`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-neutral-300/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${2 + Math.random() * 6}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            ◦
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24 animate-fade-in-up">
          <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 bg-clip-text text-transparent mb-4">
            Sacred Duas
          </h2>
          <p className="text-2xl md:text-3xl text-neutral-500 font-light max-w-4xl mx-auto leading-relaxed">
            Beautiful supplications to guide your spiritual journey
          </p>
        </div>

        {/* Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {getVisibleSlides().map((dua, idx) => (
              <div key={`${dua.originalIndex}-${currentSlide}`} className={`animate-fade-in-up transition-all duration-700 ${idx === 1 ? 'lg:scale-105 lg:z-10' : 'lg:scale-95'}`}>
                <Card className={`relative overflow-hidden bg-gradient-to-br ${dua.gradient} cursor-pointer group hover:scale-[1.03] transition-transform duration-500 hover:shadow-2xl`}>
                  
                  <CardContent className="relative z-10 h-full flex flex-col p-10">
                    {/* Icon */}
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${dua.iconBg} shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <span className="text-3xl text-white drop-shadow-sm">{dua.icon}</span>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <p className="text-2xl md:text-3xl text-neutral-700 font-medium leading-relaxed mb-4 text-center" style={{ fontFamily: 'serif', direction: 'rtl', unicodeBidi: 'bidi-override' }}>
                      {dua.text}
                    </p>
                    <p className="text-lg md:text-xl text-neutral-600 font-light italic mb-4 text-center">{dua.translation}</p>

                    {/* Meaning Box */}
                    <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 mb-6 text-center">
                      <p className="text-sm text-neutral-600">{dua.meaning}</p>
                    </div>


                    {/* Source */}
                    <div className="text-center pt-6 border-t border-white/40 mt-4">
                      <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider inline-block bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full">{dua.source}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {duas.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`relative group transition-all duration-500 ${index === currentSlide ? 'scale-125' : 'hover:scale-110'}`}>
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-neutral-600 shadow-lg' : 'bg-neutral-300 group-hover:bg-neutral-400'}`} />
                {index === currentSlide && <div className="absolute inset-0 w-3 h-3 bg-neutral-400 rounded-full animate-ping opacity-75" />}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '1.3s' }}>
          <div className="flex items-center  justify-center gap-12">
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-neutral-200" />
            <div className="text-neutral-300 text-xs tracking-[0.4em] uppercase font-light">
              آمين يا رب العالمين
            </div>
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-neutral-200" />
          </div>
          <div className="text-neutral-400 text-xs mt-3 tracking-wider font-light">
            Ameen, O Lord of all the worlds
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity:0; transform:translateY(30px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse-slow {
          0%,100%{transform:scale(1);opacity:0.15;}50%{transform:scale(1.12);opacity:0.25;}
        }
        @keyframes float {
          0%,100%{transform:translateY(0px) rotate(0deg);opacity:0.2;}
          33%{transform:translateY(-8px) rotate(1deg);opacity:0.4;}
          66%{transform:translateY(4px) rotate(-1deg);opacity:0.3;}
        }
        .animate-fade-in-up{animation:fade-in-up 1s ease-out forwards;opacity:0;}
        .animate-pulse-slow{animation:pulse-slow 12s ease-in-out infinite;}
        .animate-float{animation:float 18s ease-in-out infinite;}
      `}</style>
    </section>
  );
}
