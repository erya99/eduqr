"use client";

import React, { useRef, useEffect, useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";

const cards = [
  {
    category: "Operasyon",
    title: "Fiyat Değişti.\nMenü de Değişti.",
    desc: "Telefondan 10 saniyede güncelleme — tüm masalara anında yansır.",
    src: "/café_manager.jpeg",
    gradient: "from-black/70 via-black/20 to-transparent",
  },
  {
    category: "Yasal Uyum",
    title: "Denetim Günü\nSürpriz Yok.",
    desc: "14 temel alerjen otomatik, yasa değişince tek tıkla güncellenir.",
    src: "/anasayfamekan_optimized.jpg",
    gradient: "from-black/70 via-black/20 to-transparent",
  },
  {
    category: "Yapay Zeka",
    title: "Müşteri İstedi,\nAI Buldu.",
    desc: "\"Hafif bir şeyler istiyorum\" — chatbot menüden anında önerir.",
    src: "/aı_chatbot.jpeg",
    gradient: "from-black/80 via-black/30 to-transparent",
  },
  {
    category: "Erişilebilirlik",
    title: "Yabancı Misafir\nKaybolmasın.",
    desc: "Çoklu dil desteği — müşteri kendi dilini seçer, yanlış sipariş sıfır.",
    src: "/Two_friends.jpeg",
    gradient: "from-black/70 via-black/20 to-transparent",
  },
];

function MobileStackCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progresses, setProgresses] = useState<number[]>(cards.map(() => 0));

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = Math.max(0, Math.min(1, -rect.top / scrollable));

      // Card 0 is always visible (p=1). Cards 1-3 slide up in sequence.
      const numTransitions = cards.length - 1; // 3 transitions for 4 cards
      const newProgresses = cards.map((_, i) => {
        if (i === 0) return 1;
        const start = (i - 1) / numTransitions;
        const end = start + 0.8 / numTransitions;
        if (raw <= start) return 0;
        if (raw >= end) return 1;
        return (raw - start) / (end - start);
      });
      setProgresses(newProgresses);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: `${cards.length * 85}vh`, position: "relative" }}
    >
      <div style={{ position: "sticky", top: 72, height: "78vh", overflow: "hidden", borderRadius: "1.5rem" }}>
        {cards.map((card, i) => {
          const p = progresses[i]; // 0→1: bu kart yukarı çıkar
          const nextP = progresses[i + 1] ?? 0; // sonraki kart geliyor

          const translateY = `${(1 - p) * 100}%`;
          const scale = 1 - nextP * 0.06;
          const opacity = 1 - nextP * 0.3;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: 4,
                right: 4,
                height: "100%",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)",
                zIndex: i + 1,
                transform: `translateY(${translateY}) scale(${scale})`,
                opacity,
                willChange: "transform, opacity",
                transition: "transform 0.05s linear, opacity 0.05s linear",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.src}
                alt={card.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{ position: "absolute", inset: 0 }}
                className={`bg-gradient-to-b ${card.gradient}`}
              />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "1.5rem" }}>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{card.category}</p>
                <h3 className="text-white text-2xl font-bold leading-snug whitespace-pre-line">{card.title}</h3>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15">
                  <p className="text-white/90 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
              <div
                style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <span className="text-white text-xs font-bold">{i + 1}/{cards.length}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FeatureCards() {
  return (
    <section id="features" className="bg-[#F5F0E8] pt-8 pb-12 md:py-20 px-4 md:px-8">
      {/* Başlık */}
      <motion.div
        className="max-w-7xl mx-auto mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F1C36]/40 mb-3">
          Öne Çıkan Özellikler
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0F1C36] leading-tight">
          Rekabette öne geçiren{" "}
          <span className="italic">4 fark.</span>
        </h2>
      </motion.div>

      {/* MOBİL: Sticky yığılma efekti */}
      <div className="sm:hidden -mx-4">
        <MobileStackCards />
      </div>

      {/* DESKTOP: 4 eşit kart */}
      <div className="hidden sm:grid max-w-7xl mx-auto grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <CardContainer containerClassName="py-4 w-full" className="w-full">
              <CardBody className="w-full h-[520px] rounded-[1.5rem] overflow-hidden relative cursor-pointer">
                <CardItem translateZ={0} className="absolute inset-0 w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </CardItem>
                <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} z-[1]`} />
                <CardItem translateZ={80} className="absolute top-0 left-0 right-0 p-6 z-10 w-full">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                    {card.category}
                  </p>
                  <h3 className="text-white text-xl font-bold leading-snug whitespace-pre-line">
                    {card.title}
                  </h3>
                </CardItem>
                <CardItem translateZ={50} className="absolute bottom-0 left-0 right-0 p-6 z-10 w-full">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 h-[80px] flex items-center overflow-hidden">
                    <p className="text-white/85 text-sm leading-relaxed line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
