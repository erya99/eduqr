"use client";

import { QrCode, Zap, Printer, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ----------- CountUp Hook -----------
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

// ----------- Stat Card -----------
function StatCard({
  icon: Icon,
  iconColor,
  bgColor,
  numericValue,
  suffix,
  label,
  delay,
  inView,
}: {
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  numericValue: number;
  suffix: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  const count = useCountUp(numericValue, 1400, active);

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center gap-3 py-8 px-4 relative cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 320, damping: 22 } }}
    >
      <motion.div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor} ${iconColor} mb-1`}
        whileHover={{ scale: 1.18, rotate: 8, transition: { type: "spring", stiffness: 400, damping: 15 } }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      <div className="text-3xl md:text-4xl font-bold text-[#0F1C36] tracking-tight tabular-nums">
        {count}{suffix}
      </div>
      <p className="text-[10px] sm:text-xs text-[#0F1C36]/50 text-center font-semibold uppercase tracking-wider leading-tight whitespace-pre-line">
        {label}
      </p>
    </motion.div>
  );
}

const statItems = [
  { icon: Printer, iconColor: "text-blue-600",   bgColor: "bg-blue-50",   numericValue: 100, suffix: "%",   label: "Baskı Maliyeti\nTasarrufu" },
  { icon: Zap,     iconColor: "text-orange-500",  bgColor: "bg-orange-50", numericValue: 14,  suffix: "",    label: "Zorunlu Alerjen\nBildirimi" },
  { icon: Clock,   iconColor: "text-green-600",   bgColor: "bg-green-50",  numericValue: 10,  suffix: " Sn", label: "Fiyat Güncelleme\nSüresi" },
  { icon: QrCode,  iconColor: "text-purple-600",  bgColor: "bg-purple-50", numericValue: 7,   suffix: "/24", label: "Kesintisiz\nHizmet" },
];

export default function Testimonials() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F5F0E8] py-8 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="bg-white border border-[#0F1C36]/10 text-blue-600 px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold shadow-sm">
            VİZYONUMUZ
          </div>
        </motion.div>

        {/* Main heading with expandable profile images */}
        <motion.div
          className="text-center max-w-screen-xl mx-auto relative text-[#0F1C36]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight md:leading-tight">
            Amacımız, işletmelerin dijitalleşmesini{" "}
            <br className="hidden md:block" />
            hızlandırmak ve
          </h1>

          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight md:leading-tight mt-2 md:mt-4">
            misafirlerin restoran <br className="hidden md:block" /> deneyimini
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-blue-600 leading-tight md:leading-tight mt-2 md:mt-4">
            kusursuzlaştırmaktır.
          </h1>
        </motion.div>

        {/* Animated Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 bg-white mt-16 w-full max-w-4xl mx-auto rounded-[2rem] border border-[#0F1C36]/8 shadow-lg overflow-hidden"
        >
          {statItems.map((s, i) => (
            <div key={s.label} className={`relative ${i > 0 ? "border-l border-[#0F1C36]/8" : ""} ${i >= 2 ? "border-t sm:border-t-0 border-[#0F1C36]/8" : ""}`}>
              <StatCard {...s} delay={i * 150} inView={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
