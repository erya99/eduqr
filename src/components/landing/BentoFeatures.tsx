"use client";

import { motion } from "framer-motion";
import { Shield, QrCode, Heart } from "lucide-react";

export default function BentoFeatures() {
  return (
    <section className="bg-[#F5F0E8] py-4 px-3 md:px-5">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid grid-cols-6 gap-3">

          {/* Kart 1 — Büyük %100 */}
          <motion.div
            className="col-span-6 lg:col-span-2 bg-[#0F1C36] rounded-[1.5rem] overflow-hidden flex items-center justify-center p-8"
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 22 } }}
          >
            <div className="text-center">
              <div className="relative flex h-24 w-56 items-center justify-center mx-auto">
                <svg className="text-white/10 absolute inset-0 size-full" viewBox="0 0 254 104" fill="none">
                  <path d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z" fill="currentColor" />
                </svg>
                <span className="relative text-5xl font-bold text-white">%100</span>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-white">Baskı Tasarrufu</h2>
              <p className="mt-2 text-white/40 text-sm">Matbaa masrafı tamamen sıfır.</p>
            </div>
          </motion.div>

          {/* Kart 2 — 14 Alerjen */}
          <motion.div
            className="col-span-3 sm:col-span-3 lg:col-span-2 bg-[#0F1C36] rounded-[1.5rem] overflow-hidden p-4 md:p-8"
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 22 } }}
          >
            <div className="flex flex-col items-center text-center gap-4 md:gap-6">
              <div className="relative flex aspect-square size-20 md:size-28 rounded-full border border-white/10 items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
                <QrCode className="w-8 h-8 md:w-12 md:h-12 text-blue-400" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-semibold text-white">14 Zorunlu Alerjen</h2>
                <p className="mt-1 md:mt-2 text-white/40 text-xs md:text-sm">Otomatik gösterim, sıfır risk.<br />Müfettiş gelse bile hazırsınız.</p>
              </div>
            </div>
          </motion.div>

          {/* Kart 3 — Hız Grafiği */}
          <motion.div
            className="col-span-3 sm:col-span-3 lg:col-span-2 bg-[#0F1C36] rounded-[1.5rem] overflow-hidden p-4 md:p-8"
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 22 } }}
          >
            <div className="pt-1 md:pt-2 pb-2 md:pb-4">
              <div className="flex items-center justify-between text-[10px] text-white/30 font-semibold uppercase tracking-widest mb-2 md:mb-3">
                <span>Güncelleme</span>
                <span className="text-blue-400">10 saniye</span>
              </div>
              <svg className="w-full" viewBox="0 0 386 100" fill="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                    <stop stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#3b82f6" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M0 100V72L20 68L40 72L60 60L80 65L100 55L120 58L140 48L160 52L180 38L200 30L220 35L240 22L260 28L280 15L300 20L320 10L340 18L360 8L386 5V100Z"
                  fill="url(#chartGrad)" />
                <path d="M0 72L20 68L40 72L60 60L80 65L100 55L120 58L140 48L160 52L180 38L200 30L220 35L240 22L260 28L280 15L300 20L320 10L340 18L360 8L386 5"
                  stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-center mt-1 md:mt-2">
              <h2 className="text-base md:text-lg font-semibold text-white">Anlık Güncelleme</h2>
              <p className="mt-1 text-white/40 text-xs md:text-sm">Fiyat değişti mi? 10 saniyede yansır.</p>
            </div>
          </motion.div>

          {/* Kart 4 — Yasal Uyum */}
          <motion.div
            className="col-span-3 lg:col-span-3 bg-[#0F1C36] rounded-[1.5rem] overflow-hidden p-4 md:p-8"
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 22 } }}
          >
            <div className="grid sm:grid-cols-2 gap-8 h-full">
              <div className="flex flex-col justify-between gap-8">
                <div className="relative flex aspect-square size-12 rounded-full border border-white/10 items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
                  <Shield className="size-5 text-white/60" strokeWidth={1} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Ticaret Bakanlığı Uyumlu</h2>
                  <p className="mt-2 text-white/40 text-sm">Fiyat Etiketi Yönetmeliği&apos;ne %100 uygun. Denetimde eksiksiz, güncel.</p>
                </div>
              </div>
              <div className="hidden sm:flex rounded-xl border border-white/10 relative overflow-hidden items-end p-4">
                <div className="absolute left-3 top-2 flex gap-1">
                  <span className="block size-2 rounded-full bg-white/10" />
                  <span className="block size-2 rounded-full bg-white/10" />
                  <span className="block size-2 rounded-full bg-white/10" />
                </div>
                <svg className="w-full mt-4" viewBox="0 0 180 100" fill="none">
                  <defs>
                    <linearGradient id="legalGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                      <stop stopColor="#22c55e" stopOpacity="0.2" />
                      <stop offset="1" stopColor="#22c55e" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M0 100V85L20 80L40 75L60 65L80 55L100 40L120 30L140 20L160 12L180 5V100Z"
                    fill="url(#legalGrad)" />
                  <path d="M0 85L20 80L40 75L60 65L80 55L100 40L120 30L140 20L160 12L180 5"
                    stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Kart 5 — Darüşşafaka */}
          <motion.div
            className="col-span-3 lg:col-span-3 bg-[#0F1C36] rounded-[1.5rem] overflow-hidden p-4 md:p-8 relative"
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 22 } }}
          >
            {/* Arka plan kalp parıltısı */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full bg-rose-500/5 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full gap-8">
              {/* İkon */}
              <motion.div
                className="relative flex aspect-square size-12 rounded-full border border-rose-500/20 items-center justify-center bg-rose-500/10 before:absolute before:-inset-2 before:rounded-full before:border before:border-rose-500/10"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="size-5 text-rose-400 fill-rose-400" strokeWidth={0} />
              </motion.div>

              {/* Büyük metin */}
              <div>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-3">Sosyal Sorumluluk</p>
                <h2 className="text-sm md:text-2xl lg:text-3xl font-bold text-white leading-snug">
                  Her abonelikte bir öğrencinin eğitimine katkı sağlıyoruz.
                </h2>
              </div>

              {/* Alt bilgi */}
              <div className="flex items-center justify-between">
                <p className="text-white/30 text-xs md:text-sm max-w-[60%]">
                  Bağış makbuzunu WhatsApp&apos;tan iletiyoruz.
                </p>
                <div className="hidden sm:block bg-white/5 border border-white/10 rounded-xl px-2 md:px-4 py-2 text-center">
                  <p className="text-white font-bold text-sm md:text-lg leading-none">Darüşşafaka</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-wider mt-1">Cemiyeti</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
