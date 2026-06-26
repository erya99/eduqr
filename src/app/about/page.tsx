"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#F5F0E8] overflow-hidden">
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#F5F0E8]" />

            <div className="relative z-10">
                <Navbar />

                {/* HERO */}
                <section className="pt-36 pb-16 lg:pt-44 lg:pb-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Hakkımızda</p>
                            <h1 className="font-serif text-4xl md:text-6xl font-extrabold text-[#0F1C36] mb-6 leading-[1.1]">
                                Teknoloji ile{" "}
                                <span className="italic text-blue-600">Geleceği Şekillendiriyoruz.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
                                Restoran ve kafe işletmelerini dijital dünyaya taşıyan, müşteri deneyimini yeniden tanımlayan bir teknoloji şirketiyiz.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* MİSYON & VİZYON — kutucuk kartlar */}
                <section className="pb-16 px-4">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
                        {[
                            {
                                icon: Target,
                                iconBg: "bg-blue-500/20",
                                iconColor: "text-blue-400",
                                title: "Misyonumuz",
                                desc: "Restoran ve kafe işletmelerinin dijital dönüşümünü kolaylaştırarak, müşteri memnuniyetini artırmak ve işletmelerin verimliliğini maksimize etmek. Her işletmenin bütçesine uygun, kullanımı kolay ve etkili çözümler sunmak.",
                                delay: 0
                            },
                            {
                                icon: Lightbulb,
                                iconBg: "bg-amber-500/20",
                                iconColor: "text-amber-400",
                                title: "Vizyonumuz",
                                desc: "Türkiye'nin en çok tercih edilen dijital menü ve restoran yönetim platformu olmak. Teknoloji ile gastronomi sektörünü birleştirerek, her masada unutulmaz bir deneyim yaratmak.",
                                delay: 0.1
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="bg-[#0F1C36] rounded-3xl p-7 md:p-10"
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className={`w-11 h-11 ${item.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                                </div>
                                <h2 className="font-serif text-2xl font-bold text-white mb-3">{item.title}</h2>
                                <p className="text-white/55 leading-relaxed text-sm md:text-base">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* NEDEN EDUQR */}
                <section className="pb-16 px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-8">
                            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Hikayemiz</p>
                            <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#0F1C36]">
                                Neden <span className="italic text-blue-600">eduQR?</span>
                            </h2>
                        </div>
                        <motion.div
                            className="bg-white rounded-3xl p-7 md:p-12 border border-gray-100 shadow-sm"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="space-y-5 text-base md:text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Türkiye'deki restoran ve kafe sahiplerinin büyük çoğunluğu hâlâ basılı menüyle çalışıyor. Her fiyat değişikliğinde matbaaya, her yasal güncelleme için yeniden baskıya para ödüyorlar.
                                </p>
                                <p>
                                    EduQR bu maliyeti sıfıra indiriyor. Menünüzü istediğiniz zaman güncelleyin, alerjen bilgilerini otomatik yönetin, müşteri deneyimini yükseltin — hepsi tek panelden, sözleşme olmadan.
                                </p>
                                <p>
                                    Buna ek olarak, yıllık abonelik gelirlerimizin bir kısmını Darüşşafaka Cemiyeti aracılığıyla eğitim bursuna aktarıyoruz. Dijital dönüşüm ile toplumsal katkıyı bir arada yürütmeyi doğru buluyoruz.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SOSYAL SORUMLULUK — tek büyük kart */}
                <section className="pb-16 px-4">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            className="bg-[#0F1C36] rounded-3xl p-7 md:p-12 overflow-hidden"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="grid lg:grid-cols-2 gap-10 items-start">
                                <div>
                                    <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4">❤️ Sosyal Sorumluluk</p>
                                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-5 leading-snug">
                                        Teknolojimizle İşletmeleri,{" "}
                                        <span className="italic text-blue-400">Kalbimizle Eğitimi</span> Destekliyoruz
                                    </h2>
                                    <p className="text-white/55 mb-4 leading-relaxed text-sm md:text-base">
                                        EduQR olarak sadece ticari büyüme hedeflemiyoruz. Bu yüzden <strong className="text-white">"Eğitim Dostu İşletme"</strong> hareketini başlattık.
                                    </p>
                                    <p className="text-white/55 mb-7 leading-relaxed text-sm md:text-base">
                                        Yıllık abonelik gelirlerimizin bir kısmını <strong className="text-white">Darüşşafaka Cemiyeti</strong>'ne bağışlayarak eğitimde fırsat eşitliğine katkıda bulunuyoruz.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                                            <div className="text-2xl mb-2">🌱</div>
                                            <div className="font-bold text-white text-sm">Düzenli Bağış</div>
                                            <div className="text-white/40 text-xs mt-0.5">Her yıl tekrarlanır</div>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                                            <Award className="w-6 h-6 text-amber-400 mb-2" />
                                            <div className="font-bold text-white text-sm">Resmi Belge</div>
                                            <div className="text-white/40 text-xs mt-0.5">Makbuz iletilir</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                                    <blockquote className="font-serif text-lg md:text-xl text-white/80 italic leading-relaxed mb-6">
                                        "Bir çocuğu eğitmek, o çocuğun tüm dünyasını ve geleceğini değiştirmektir."
                                    </blockquote>
                                    <div className="border-t border-white/10 pt-5">
                                        <div className="font-serif text-xl font-bold text-white">Darüşşafaka</div>
                                        <div className="text-white/40 text-xs uppercase tracking-widest mt-1">Eğitimde Fırsat Eşitliği</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* DEĞERLERİMİZ */}
                <section className="pb-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8">
                            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">İlkelerimiz</p>
                            <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#0F1C36]">Değerlerimiz</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Users, bg: "bg-blue-100", color: "text-blue-600", title: "Müşteri Odaklılık", desc: "Her geri bildirimi dinler, sürekli gelişiriz." },
                                { icon: Lightbulb, bg: "bg-green-100", color: "text-green-600", title: "İnovasyon", desc: "Yenilikçi çözümler geliştiririz." },
                                { icon: Award, bg: "bg-purple-100", color: "text-purple-600", title: "Kalite", desc: "Her detayda mükemmelliği hedefleriz." },
                                { icon: Target, bg: "bg-amber-100", color: "text-amber-600", title: "Şeffaflık", desc: "Net fiyatlandırma, açık iletişim." },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-3`}>
                                        <item.icon className={`w-5 h-5 ${item.color}`} />
                                    </div>
                                    <h3 className="font-serif text-sm md:text-base font-bold text-[#0F1C36] mb-1">{item.title}</h3>
                                    <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="pb-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            className="bg-[#0F1C36] rounded-3xl p-8 md:p-14 text-center"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-3">
                                Hemen Başlamaya{" "}
                                <span className="italic text-blue-400">Hazır mısınız?</span>
                            </h2>
                            <p className="text-white/50 mb-8 text-sm md:text-base">İlk ayınız ücretsiz. Kredi kartı gerekmez.</p>
                            <Link href="/sign-up">
                                <Button size="lg" className="h-12 md:h-14 px-8 text-sm md:text-base bg-white text-[#0F1C36] hover:bg-blue-50 font-bold rounded-xl shadow-lg">
                                    Ücretsiz Deneyin →
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        </main>
    );
}
