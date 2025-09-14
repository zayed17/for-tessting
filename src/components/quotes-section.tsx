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
// Beautiful & Powerful Islamic Duas
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
  },
  {
    text: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",
    translation: "My Lord, forgive me and my parents.",
    source: "Quran 71:28",
    icon: "❤️",
    gradient: "from-red-100/40 to-pink-50/25",
    iconBg: "from-red-300/60 to-pink-400/50",
    meaning: "A dua for forgiveness for oneself and parents"
  },
  {
    text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ هَمِّ الْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ",
    translation: "O Allah, I seek refuge in You from anxiety, grief, helplessness, and laziness.",
    source: "Hadith",
    icon: "🛡️",
    gradient: "from-slate-100/40 to-gray-50/25",
    iconBg: "from-slate-300/60 to-gray-400/50",
    meaning: "A protection against negative emotions and weakness"
  },
  {
    text: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً",
    translation: "My Lord, grant me from Yourself a good offspring.",
    source: "Quran 3:38",
    icon: "👶",
    gradient: "from-orange-100/40 to-amber-50/25",
    iconBg: "from-orange-300/60 to-amber-400/50",
    meaning: "A dua for righteous children and family blessings"
  },
  {
    text: "اللَّهُمَّ اجعل القرآن ربيع قلبي ونور صدري",
    translation: "O Allah, make the Qur’an the spring of my heart and the light of my chest.",
    source: "Hadith",
    icon: "✨",
    gradient: "from-green-100/40 to-lime-50/25",
    iconBg: "from-green-300/60 to-lime-400/50",
    meaning: "A dua for peace, guidance, and healing through the Qur’an"
  },
  {
    text: "رَّبِّ نَجِّنِي وَأَهْلِي مِمَّا يَعْمَلُونَ",
    translation: "My Lord, save me and my family from what they do.",
    source: "Quran 26:169",
    icon: "🏠",
    gradient: "from-indigo-100/40 to-blue-50/25",
    iconBg: "from-indigo-300/60 to-blue-400/50",
    meaning: "A dua for family protection from sin and harm"
  },
  {
    text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
    translation: "O Allah, I ask You for Paradise and seek refuge in You from the Fire.",
    source: "Hadith",
    icon: "🌸",
    gradient: "from-fuchsia-100/40 to-pink-50/25",
    iconBg: "from-fuchsia-300/60 to-pink-400/50",
    meaning: "The most direct and powerful dua for eternal success"
  },
  {
    text: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    translation: "My Lord, expand my chest and ease my task.",
    source: "Quran 20:25-26",
    icon: "🌤️",
    gradient: "from-cyan-100/40 to-sky-50/25",
    iconBg: "from-cyan-300/60 to-sky-400/50",
    meaning: "A dua for confidence, ease, and clarity in difficulties"
  }
];



export function DuasCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % duas.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);

  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % duas.length;
      slides.push({ ...duas[index], originalIndex: index });
    }
    return slides;
  };

  return (
    <section className="py-12 px-6 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-neutral-700 mb-4">
            Sacred Duas
          </h2>
          <p className="text-lg text-neutral-500 font-light">
            Beautiful supplications to guide your spiritual journey
          </p>
        </div>

        {/* Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getVisibleSlides().map((dua) => (
            <Card
              key={dua.originalIndex}
              className={`bg-white shadow-md border border-neutral-100 rounded-2xl transition-transform duration-500 hover:scale-[1.02]`}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-5">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${dua.iconBg}`}
                  >
                    <span className="text-2xl text-white">{dua.icon}</span>
                  </div>
                </div>

                {/* Arabic Text */}
                <p
                  className="text-xl md:text-2xl text-neutral-800 font-medium leading-relaxed mb-3"
                  style={{
                    fontFamily: "serif",
                    direction: "rtl",
                    unicodeBidi: "bidi-override",
                  }}
                >
                  {dua.text}
                </p>

                {/* Translation */}
                <p className="text-base text-neutral-600 italic mb-3">
                  {dua.translation}
                </p>

                {/* Meaning */}
                <p className="text-sm text-neutral-500 bg-neutral-50 px-3 py-2 rounded-lg mb-4">
                  {dua.meaning}
                </p>

                {/* Source */}
                <p className="text-xs text-neutral-400 uppercase tracking-wider">
                  {dua.source}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {duas.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-neutral-700 scale-110"
                  : "bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

        {/* Ameen */}
        <div className="text-center mt-10">
          <p className="text-neutral-400 text-sm font-light">
            آمين يا رب العالمين — Ameen, O Lord of all the worlds
          </p>
        </div>
      </div>
    </section>
  );
}