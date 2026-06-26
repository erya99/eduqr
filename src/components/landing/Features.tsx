'use client';

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Smartphone, Printer, Scale, ShoppingCart, Share2, ShieldAlert, Globe, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    id: 1,
    label: "Anlık Fiyat Güncelleme",
    description: "Hammadde maliyetleri değiştiğinde menünüzü güncellemek için matbaayı aramanıza gerek yok. Yönetim panelinden yaptığınız değişiklik, tüm masalardaki QR kodlarına anında yansır.",
    icon: Smartphone,
    image: "/feature-price.png",
  },
  {
    id: 2,
    label: "Baskı Maliyeti Yok",
    description: "Yıllık ortalama 8.000–12.000 TL'ye mal olan menü baskı ve güncelleme masrafları tamamen ortadan kalkar. EduQR, tek seferlik kurulumla süresiz olarak çalışır.",
    icon: Printer,
    image: "/feature-toggle.png",
  },
  {
    id: 3,
    label: "Yasal Uyum & Alerjen",
    description: "Fiyat Etiketi Yönetmeliği ve Türk Gıda Kodeksi'nin gerektirdiği 14 temel alerjen bildirimi sisteme entegre edilmiştir. Müfettiş geldiğinde gösterecek her şey hazır, eksiksiz ve güncel.",
    icon: Scale,
    image: "/feature-legal.png",
  },
  {
    id: 4,
    label: "Çapraz Satış Modülü",
    description: "Ürün sayfalarına tamamlayıcı öneri ekleyin. Müşteri siparişini oluştururken sistem doğal bir şekilde ek ürün önerir. Ortalama sepet değerini artırmanın en kolay yolu.",
    icon: ShoppingCart,
    image: "/feature-kebap.png",
  },
  {
    id: 5,
    label: "Sosyal Medya Görünürlüğü",
    description: "Her menü sayfası paylaşılabilir bir link ile gelir. Müşterileriniz menünüzü Instagram hikayelerine, WhatsApp gruplarına ekleyebilir. Siz hiçbir şey yapmadan organik görünürlük elde edersiniz.",
    icon: Share2,
    image: "/feature-qr.png",
  },
  {
    id: 6,
    label: "Kötü Yorum Kalkanı",
    description: "Memnun olmayan müşteri yorum yazmadan önce size bildirim gönderir. Sorunu yerinde ve anında çözersiniz. Google puanınız korunur, sadakat artar.",
    icon: ShieldAlert,
    image: "/feature-feedback.png",
  },
  {
    id: 7,
    label: "Dil Desteği",
    description: "Menünüzü birden fazla dilde sunun. Turist yoğunluğu olan bölgelerde müşteri deneyimini ve sipariş doğruluğunu doğrudan etkiler.",
    icon: Globe,
    image: "/feature-wheel.png",
  },
  {
    id: 8,
    label: "Görsel Menü",
    description: "Profesyonel ürün görselleri sipariş kararını hızlandırır. Fotoğraflı menülerde ortalama sipariş değerinin %20–30 arttığı gözlemlenmektedir.",
    icon: ImageIcon,
    image: "/feature-kebap.png",
  },
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 80;

// Simple wrap function for the circular logic
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function Features() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [step, setStep] = useState(0);

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], ["80px", "0px"]);

  // Sync step with currentIndex logic
  useEffect(() => {
    setCurrentIndex(((step % FEATURES.length) + FEATURES.length) % FEATURES.length);
  }, [step]);

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8] pb-10 px-3 md:px-5">
      <motion.div
        ref={cardRef}
        style={{ y: cardY }}
        className="rounded-[1.5rem] md:rounded-[2rem] bg-[#0F1C36] overflow-hidden pb-10 md:pb-24 space-y-8 md:space-y-12"
      >
      {/* BAŞLIK ALANI */}
      <motion.div
        className="container mx-auto px-4 text-center max-w-3xl relative z-10 pt-10 md:pt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-sm font-semibold text-blue-300 uppercase tracking-widest mb-3">Tüm Özellikler</p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          İşletmenizin İhtiyaç Duyduğu Her Şey,{" "}
          <span className="italic text-blue-300">Tek Platformda.</span>
        </h2>
        <p className="text-xl text-white/60">
          Maliyet düşürün, gelir artırın, denetimlerden çekinmeyin.
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      >
        <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-[21/9] border border-gray-200 shadow-xl bg-white">
          
          {/* LEFT PANEL (Navigation) */}
          <div className="w-full lg:w-[40%] min-h-[300px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-4 md:px-16 lg:pl-16 bg-[#0F1C36]">
            <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-[#0F1C36] via-[#0F1C36]/80 to-transparent z-40 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-[#0F1C36] via-[#0F1C36]/80 to-transparent z-40 pointer-events-none" />
            
            <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
              {FEATURES.map((feature, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(
                  -(FEATURES.length / 2),
                  FEATURES.length / 2,
                  distance
                );

                return (
                  <motion.div
                    key={feature.id}
                    style={{
                      height: ITEM_HEIGHT,
                      width: "fit-content",
                    }}
                    animate={{
                      y: wrappedDistance * ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 22,
                      mass: 1,
                    }}
                    className="absolute flex items-center justify-start"
                  >
                    <button
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className={cn(
                        "relative flex items-center gap-3 md:gap-4 px-4 md:px-10 lg:px-8 py-3 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border",
                        isActive
                          ? "bg-white text-[#0F1C36] border-white z-10 shadow-lg"
                          : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center transition-colors duration-500",
                          isActive ? "text-blue-600" : "text-white/40"
                        )}
                      >
                        <feature.icon size={20} strokeWidth={2} />
                      </div>

                      <span className="font-semibold text-xs md:text-[15px] tracking-tight whitespace-nowrap">
                        {feature.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL (Image Display) */}
          <div className="flex-1 min-h-[300px] md:min-h-[500px] lg:h-full relative bg-[#0a1628] flex items-center justify-center py-6 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
            <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
              {FEATURES.map((feature, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={feature.id}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-white bg-white shadow-2xl origin-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={feature.image}
                      alt={feature.label}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700",
                        isActive
                          ? "grayscale-0 blur-0"
                          : "grayscale blur-[2px] brightness-75"
                      )}
                    />

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-4 md:p-10 pt-16 md:pt-32 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end pointer-events-none"
                        >
                          <div className="bg-white text-[#0F1C36] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] w-fit shadow-lg mb-2 md:mb-3">
                            {index + 1} / {FEATURES.length}
                          </div>
                          <p className="text-white font-medium text-xs md:text-base leading-relaxed drop-shadow-md line-clamp-3">
                            {feature.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      className={cn(
                        "absolute top-3 left-3 md:top-6 md:left-6 flex items-center gap-2 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse" />
                      <span className="text-white text-xs font-bold uppercase tracking-wider drop-shadow-md">
                        Aktif
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </motion.div>
      </motion.div>
    </section>
  );
}