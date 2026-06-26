"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Pricing() {
    return (
        <section className="py-8 md:py-24 relative bg-[#F5F0E8]">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Fiyatlandırma</p>
                    <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#0F1C36] mb-4">
                        Yıllık 2.500 TL.{" "}
                        <span className="italic text-blue-600">Matbaaya Verdiğinizin Çeyreği.</span>
                    </h2>
                    <p className="text-base md:text-xl text-gray-500">
                        Karşılaştırın, sonra karar verin.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
                    {/* Basılı Menü */}
                    <motion.div
                        className="bg-white/50 p-6 md:p-10 rounded-[2rem] border border-gray-200 flex flex-col min-w-0"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                    >
                        <h3 className="text-xl font-bold text-gray-400 mb-1">Basılı Menü</h3>
                        <p className="text-sm text-gray-400 mb-4">Tahmini Yıllık Maliyet</p>
                        <div className="text-2xl md:text-4xl font-bold text-gray-300 mb-6 md:mb-8">8.000 – 12.000 TL<span className="text-base font-normal text-gray-400">/yıl</span></div>
                        <ul className="space-y-3 md:space-y-4 flex-1">
                            <li className="flex items-start gap-3 text-gray-400 text-sm"><X className="w-4 h-4 text-red-300 mt-0.5 shrink-0" /> İlk baskı ücreti</li>
                            <li className="flex items-start gap-3 text-gray-400 text-sm"><X className="w-4 h-4 text-red-300 mt-0.5 shrink-0" /> Her güncellemede yeniden baskı</li>
                            <li className="flex items-start gap-3 text-gray-400 text-sm"><X className="w-4 h-4 text-red-300 mt-0.5 shrink-0" /> Yıpranma ve yenileme maliyeti</li>
                            <li className="flex items-start gap-3 text-gray-400 text-sm"><X className="w-4 h-4 text-red-300 mt-0.5 shrink-0" /> Alerjen güncellemesi için ek baskı</li>
                            <li className="flex items-start gap-3 text-gray-400 text-sm"><X className="w-4 h-4 text-red-300 mt-0.5 shrink-0" /> Yasal değişikliklerde tüm menü yenilenir</li>
                        </ul>
                    </motion.div>

                    {/* EduQR */}
                    <motion.div
                        className="bg-white p-6 md:p-10 rounded-[2rem] border-2 border-[#0F1C36] shadow-2xl shadow-blue-900/10 relative flex flex-col min-w-0"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 280, damping: 20 } }}
                    >
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0F1C36] text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg whitespace-nowrap">
                            ÖNERİLEN
                        </div>
                        <h3 className="text-xl font-bold text-[#0F1C36] mb-1">EduQR Dijital Menü</h3>
                        <p className="text-sm text-gray-400 mb-4">Yıllık ödeme</p>
                        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-1">2.500 TL<span className="text-lg font-normal text-gray-500">/yıl</span></div>
                        <p className="text-sm text-gray-400 mb-6 md:mb-8">Ayda ~208 TL</p>
                        <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-1">
                            <li className="flex items-start gap-3 text-gray-700 text-sm"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Sınırsız fiyat ve ürün güncelleme</li>
                            <li className="flex items-start gap-3 text-gray-700 text-sm"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Alerjen ve kalori bildirimi dahil</li>
                            <li className="flex items-start gap-3 text-gray-700 text-sm"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Çapraz satış modülü dahil</li>
                            <li className="flex items-start gap-3 text-gray-700 text-sm"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> 7/24 WhatsApp destek</li>
                            <li className="flex items-start gap-3 text-green-700 text-sm font-medium bg-green-50 px-3 py-2 rounded-lg"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Darüşşafaka burs katkısı dahil ✓</li>
                        </ul>
                        <Link href="/sign-up" className="block">
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Button size="lg" className="w-full text-base h-14 bg-[#0F1C36] hover:bg-blue-900 text-white rounded-xl shadow-lg transition-all hover:shadow-blue-900/30">
                                    Hemen Başlayın — İlk Ay Ücretsiz →
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>

                {/* Alt not */}
                <p className="text-center text-sm text-gray-400 mt-8 max-w-xl mx-auto">
                    Her aboneliğinizde Darüşşafaka Cemiyeti&apos;ndeki bir öğrencinin eğitimine katkıda bulunuyoruz. Bağış makbuzunu WhatsApp üzerinden iletiyoruz.
                </p>
            </div>
        </section>
    );
}
