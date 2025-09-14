"use client";
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

interface Hadith {
  text: string;
  header: string;
  chapter: string;
  book: string;
  refno: string;
}


export default function RandomHadith() {
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(false);
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

  const fetchHadith = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://random-hadith-generator.vercel.app/bukhari/");
      const data = await res.json();
      const h = data.data;
      setHadith({
        text: h.hadith_english,
        header: h.header,
        chapter: h.chapterName,
        book: h.book,
        refno: h.refno,
      });
    } catch (err) {
      console.error(err);
      setHadith({
        text: "Unable to fetch Hadith at the moment. Please try again.",
        header: "Connection Error",
        chapter: "",
        book: "",
        refno: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHadith();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-14">
     

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
      <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-neutral-700 mb-4">
          Random Hadith

          </h2>
          <p className="text-lg text-neutral-500 font-light">
          Gain knowledge and guidance from authentic Hadiths of the Prophet ﷺ

          </p>
        </div>

       
        {/* Hadith Card */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center gap-4 text-neutral-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                <span className="text-2xl font-light tracking-wide">Loading wisdom...</span>
              </div>
            </div>
          ) : hadith ? (
            <div className="group relative backdrop-blur-xl bg-white/60 border border-white/80 rounded-[2.5rem] p-12 md:p-16 lg:p-20 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-700 transform hover:scale-[1.01]">
              
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-emerald-200/30 via-transparent to-green-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Hadith Header */}
                {hadith.header && (
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200/50 rounded-2xl mb-6 shadow-inner">
                      <svg className="w-8 h-8 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                      </svg>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl text-emerald-700 font-medium leading-relaxed tracking-wide mb-8">
                      {hadith.header}
                    </h2>
                  </div>
                )}

                {/* Main Hadith Text */}
                <blockquote className="text-2xl md:text-3xl lg:text-4xl text-neutral-700 leading-relaxed mb-10 font-light tracking-wide max-w-5xl mx-auto">
                  "{hadith.text}"
                </blockquote>

                {/* Source Information */}
                <div className="relative mb-8">
                  <div className="w-16 h-px bg-gradient-to-r from-emerald-300 to-teal-300 mx-auto mb-6" />
                  
                  <div className="space-y-2 text-neutral-500">
                    <p className="font-medium text-lg tracking-wide">
                      {hadith.book}
                    </p>
                    {hadith.chapter && (
                      <p className="text-base font-light">
                        {hadith.chapter}
                      </p>
                    )}
                    {hadith.refno && (
                      <p className="text-sm font-mono text-neutral-400">
                        Reference: {hadith.refno}
                      </p>
                    )}
                  </div>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={fetchHadith}
                  disabled={loading}
                  className="group/btn inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 hover:from-emerald-600 hover:to-teal-600 disabled:from-neutral-400 disabled:to-neutral-500 text-white font-medium rounded-2xl shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl active:scale-95 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-sm border border-white/20"
                >
                  <RefreshCw className={`w-6 h-6 transition-transform duration-500 ${loading ? 'animate-spin' : 'group-hover/btn:rotate-180'}`} />
                  <span className="text-lg tracking-wide">
                    {loading ? 'Receiving wisdom...' : 'New Hadith'}
                  </span>
                </button>
              </div>
            </div>
          ) : null}
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