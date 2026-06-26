'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const imgUrl = "/hero-bg.jpg";
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Kart: scroll'da küçülür ve aşağı kayar
  const scale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 0.90]);
  const cardY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, 80]);
  // Arka plan görseli: kart'tan daha yavaş hareket eder → gerçek parallax derinliği
  const imgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -120]);

  return (
    <section ref={containerRef} className="relative pt-[72px] md:pt-[88px] pb-0 px-3 md:px-5 bg-[#F5F0E8]">
      {/* Yuvarlak kart — neredeyse tam genişlik */}
      <motion.div
        style={{ scale, y: cardY, height: "min(91vh, 860px)", minHeight: "560px" }}
        className="relative w-full mx-auto overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl"
      >
        {/* Görsel — parallax: karttan daha yavaş kayar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={imgUrl}
          alt="EduQR Hero"
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[115%] object-cover"
        />

        {/* Çok minimal overlay — metin okunabilirliği için sadece merkez hafif karartma */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 58%, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* İçerik */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Dijital Menü Platformu
          </motion.div>

          {/* Başlık */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-5 md:mb-6 max-w-4xl px-2"
          >
            Menünüz Artık
            <br />
            <span className="italic text-[#c8d8f0]">Sizin İçin Çalışıyor.</span>
          </motion.h1>

          {/* Alt yazı */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base md:text-xl text-white/80 max-w-2xl mb-8 md:mb-10 leading-relaxed px-2"
          >
            Fiyatlarınızı anında güncelleyin, yasal yükümlülüklerinizi otomatik karşılayın,
            müşteri deneyimini yükseltin. EduQR ile restoranınızı yönetmek değil,{" "}
            <em className="not-italic font-semibold text-white">büyütmek</em> için zaman ayırın.
          </motion.p>

          {/* Butonlar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="h-13 px-8 text-base rounded-full bg-white text-[#0F1C36] font-bold hover:bg-white/90 shadow-lg transition-colors"
                >
                  Ücretsiz Deneyin
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/ornekmenu1" target="_blank">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 px-8 text-base rounded-full border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                >
                  Demo İzleyin <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Güven satırı */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/60 font-medium"
          >
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Ticaret Bakanlığı Yönetmeliği&apos;ne tam uyumlu</span>
            <span className="hidden sm:block text-white/30">|</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Kurulum 10 dakika</span>
            <span className="hidden sm:block text-white/30">|</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Teknik bilgi gerekmez</span>
          </motion.div>
        </div>

        {/* Alt krem fade — card altını sayfayla birleştirir */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#F5F0E8] via-[#F5F0E8]/80 to-transparent" />
      </motion.div>
    </section>
  );
}
