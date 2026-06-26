"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#F5F0E8]" />

      <div className="relative z-10">
        <Navbar />

        <div className="pt-36 pb-20 lg:pt-44 lg:pb-24 px-4">
          <div className="max-w-6xl mx-auto">

            {/* Başlık */}
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">İletişim</p>
              <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-[#0F1C36] mb-4">
                Bizimle{" "}
                <span className="italic text-blue-600">İletişime Geçin.</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">

              {/* SOL: İletişim Bilgileri */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {[
                  { icon: Mail, label: "E-posta", value: "eduxpertsqr@gmail.com", href: "mailto:eduxpertsqr@gmail.com" },
                  { icon: Phone, label: "Telefon", value: "+90 555 021 05 03", href: "tel:+905550210503" },
                  { icon: MapPin, label: "Ofis", value: "Efeler, Aydın / Türkiye", href: null },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0F1C36] rounded-2xl p-6 flex items-center gap-5">
                    <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white font-medium hover:text-blue-400 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* WhatsApp Kısayolu */}
                <a
                  href="https://wa.me/905550210503?text=Merhaba, EduQR hakkında bilgi almak istiyorum."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 bg-[#25D366] rounded-2xl p-6 hover:bg-[#20bd5a] transition-colors group"
                >
                  <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 4C9.373 4 4 9.373 4 16c0 2.126.55 4.12 1.514 5.866l-1.586 5.792 5.938-1.558C11.666 27.272 13.754 28 16 28c6.627 0 12-5.373 12-12S22.627 4 16 4zm0 21.888v-.024c-1.982 0-3.928-.528-5.62-1.538l-.408-.24-4.178 1.096 1.116-4.068-.252-.408C5.808 18.97 5.2 17.514 5.2 16c.084-5.388 4.478-9.782 9.876-9.888 5.344-.108 9.782 4.214 9.888 9.612.11 5.38-4.214 9.782-9.612 9.782z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs uppercase tracking-wider mb-0.5">Hızlı Destek</p>
                    <p className="text-white font-medium group-hover:underline">WhatsApp'tan Yazın</p>
                  </div>
                </a>
              </motion.div>

              {/* SAĞ: Form */}
              <motion.div
                className="bg-white rounded-3xl p-7 md:p-10 border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Adınız</label>
                      <Input placeholder="Ahmet" className="bg-gray-50 border-gray-200" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Soyadınız</label>
                      <Input placeholder="Yılmaz" className="bg-gray-50 border-gray-200" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">E-posta</label>
                    <Input type="email" placeholder="ornek@sirket.com" className="bg-gray-50 border-gray-200" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Mesajınız</label>
                    <Textarea placeholder="Size nasıl yardımcı olabiliriz?" className="min-h-[130px] bg-gray-50 border-gray-200" />
                  </div>

                  <Button className="w-full h-12 text-base bg-[#0F1C36] hover:bg-blue-900 text-white rounded-xl font-bold">
                    Mesaj Gönder →
                  </Button>
                </form>
              </motion.div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
