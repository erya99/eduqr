"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

const stats = [
  { value: 14,   suffix: "",    label: "Zorunlu Alerjen" },
  { value: 100,  suffix: "%",   label: "Baskı Tasarrufu" },
  { value: 10,   suffix: "sn",  label: "Fiyat Güncelleme" },
  { value: 7,    suffix: "/24", label: "Kesintisiz Hizmet" },
];

function StatItem({ value, suffix, label, delay, inView }: {
  value: number; suffix: string; label: string; delay: number; inView: boolean;
}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);
  const count = useCountUp(value, 1600, active);

  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <p className="text-4xl md:text-5xl font-bold text-white tabular-nums tracking-tight">
        {count}{suffix}
      </p>
      <p className="text-sm text-white/35 font-semibold uppercase tracking-widest">
        {label}
      </p>
    </motion.div>
  );
}

export default function SocialProof() {
  const sectionRef = useRef(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], ["80px", "0px"]);

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8] pb-10 px-3 md:px-5">
      <motion.div
        style={{ y: cardY }}
        className="rounded-[1.5rem] md:rounded-[2rem] bg-[#0F1C36] overflow-hidden relative"
      >
        {/* İçerik */}
        <div className="relative z-10 px-5 md:px-16 lg:px-20 pt-12 md:pt-20 pb-0">
          {/* Başlık */}
          <motion.div
            className="max-w-4xl mb-8 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold leading-snug">
              <span className="text-white">Restoranlar EduQR ile büyüyor.</span>{" "}
              <span className="hidden md:inline text-white/30">
                Menü maliyetini sıfırlayan, denetimden çekinmeyen, müşterisini kaybetmeyen işletmeler EduQR seçiyor.
              </span>
            </h2>
          </motion.div>

          {/* Sayılar */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 pb-12 md:pb-20"
          >
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} delay={i * 150} inView={inView} />
            ))}
          </div>
        </div>

        {/* Yükselen mavi çizgi */}
        <div className="relative w-full h-40 md:h-56 overflow-hidden">
          <svg
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Dolgu alanı */}
            <motion.path
              d="M0,220 L1440,40 L1440,220 Z"
              fill="url(#lineGrad)"
              fillOpacity="0.07"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            {/* Ana çizgi */}
            <motion.line
              x1="0" y1="218" x2="1440" y2="38"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
            {/* Parlayan nokta (sağ üst) */}
            <motion.circle
              cx="1430" cy="42" r="5"
              fill="#60a5fa"
              filter="url(#glow)"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.4 }}
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
