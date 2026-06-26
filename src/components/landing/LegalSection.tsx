"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LegalSection() {
  return (
    <section className="bg-[#F5F0E8] py-8 md:py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl overflow-hidden shadow-[0_8px_60px_rgba(15,28,54,0.10)] border border-[#0F1C36]/10"
        >
          {/* ── HEADER ── */}
          <div className="bg-[#0F1C36] px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="w-3 h-3 rounded-full bg-white/10" />
            </div>
            <p className="font-serif text-white/90 font-bold text-sm tracking-widest">Resmî Gazete</p>
            <p className="font-serif text-white/30 text-[10px] tracking-wider hidden sm:block">Pazartesi, Mart 2026</p>
          </div>

          {/* ── NAV ── */}
          <div className="bg-[#1a2942] px-6 py-2 flex items-center gap-6 overflow-x-auto">
            {["Anasayfa", "Yönetmelikler", "Gıda Kodeksi", "Denetimler", "Duyurular"].map((item, i) => (
              <span key={i} className={`text-[11px] font-semibold whitespace-nowrap ${i === 2 ? "text-yellow-200/80" : "text-white/35"}`}>
                {item}
              </span>
            ))}
          </div>

          {/* ── BREAKING NEWS ── */}
          <div className="bg-yellow-100 flex items-center overflow-hidden">
            <span className="bg-[#0F1C36] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 shrink-0">
              Son Dakika
            </span>
            <div className="overflow-hidden flex-1">
              <motion.p
                className="text-[11px] font-semibold text-[#0F1C36]/65 whitespace-nowrap px-4 py-1.5"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                Tarım ve Orman Bakanlığı gıda etiketleme kılavuzunu güncelledi · Restoran ve kafelerde kalori ve içerik bildirimi zorunlu hale geliyor · QR kod ile bilgilendirme yasal olarak kabul edildi ·
              </motion.p>
            </div>
          </div>

          {/* ── GAZETE GÖVDE ── */}
          <div className="bg-[#FAF6EE] px-5 md:px-7 py-6">

            {/* Künye */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-[#0F1C36]/12" />
              <p className="font-serif text-[9px] uppercase tracking-[0.22em] text-[#0F1C36]/28 whitespace-nowrap">
                Türk Gıda Kodeksi · Gıda Etiketleme ve Tüketicileri Bilgilendirme Yönetmeliği
              </p>
              <div className="flex-1 h-px bg-[#0F1C36]/12" />
            </div>

            {/* ── 3 KOLON LAYOUT ── */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-0 md:divide-x divide-[#0F1C36]/10">

              {/* SOL — Zorunlu bilgiler + takvim */}
              <div className="hidden md:block pb-5 md:pb-0 md:pr-5 border-b md:border-b-0 border-[#0F1C36]/10 space-y-5">
                <h3 className="font-serif text-[10px] font-black uppercase tracking-widest text-[#0F1C36]/40 pb-2 border-b border-[#0F1C36]/10">
                  Sunulması Zorunlu Bilgiler
                </h3>

                {[
                  { label: "Bileşenler", text: "Ürünün tüm içerikleri açıkça listelenmeli." },
                  { label: "Enerji Değeri", text: "Kalori bilgisi tüketicinin görebileceği şekilde sunulmalı." },
                  { label: "Alerjen İçerikler", text: "Gluten, yumurta, fıstık, süt dahil tüm alerjenler belirtilmeli." },
                  { label: "Alkol / Domuz", text: "Alkol veya domuz kaynaklı bileşen varsa ayrıca bildirilmeli." },
                ].map((item, i) => (
                  <div key={i} className="space-y-0.5">
                    <p className="font-serif text-[10px] font-black uppercase tracking-widest text-[#0F1C36]/30">{item.label}</p>
                    <p className="font-serif text-sm text-[#0F1C36]/65 leading-relaxed">{item.text}</p>
                    {i < 3 && <div className="pt-3 border-b border-[#0F1C36]/8" />}
                  </div>
                ))}

                <div className="bg-yellow-50 border border-yellow-200/60 rounded-lg p-3 space-y-2">
                  <p className="font-serif text-[10px] font-black uppercase tracking-widest text-[#0F1C36]/40">Uygulama Takvimi</p>
                  <p className="font-serif text-xs text-[#0F1C36]/60 leading-relaxed">
                    <span className="font-bold text-[#0F1C36]/80">1 Temmuz 2026</span> — Ulusal zincir restoranlar
                  </p>
                  <p className="font-serif text-xs text-[#0F1C36]/60 leading-relaxed">
                    <span className="font-bold text-[#0F1C36]/80">31 Ara 2026</span> — 3+ şubeli işletmeler
                  </p>
                  <p className="font-serif text-xs text-[#0F1C36]/60 leading-relaxed">
                    <span className="font-bold text-[#0F1C36]/80">31 Ara 2027</span> — Diğer tüm işletmeler
                  </p>
                </div>
              </div>

              {/* ORTA — Ana haber */}
              <div className="py-5 md:py-0 md:px-5 space-y-4">
                <div className="overflow-hidden rounded-sm border border-[#0F1C36]/8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/tablette_gazete.png"
                    alt="Kafe sahibi yönetmeliği okuyor"
                    className="w-full object-cover"
                  />
                </div>
                <p className="font-serif text-[10px] text-[#0F1C36]/30 italic">
                  Bir işletme sahibi yeni yönetmeliği dijital ortamda incelerken. — İstanbul, 2026
                </p>

                <h2 className="font-serif text-xl md:text-2xl font-black text-[#0F1C36] leading-tight">
                  Menünüzdeki Sessizlik Bitiyor: Kalori ve İçerik Bildirimi Zorunlu Hale Geliyor
                </h2>

                <p className="font-serif text-sm text-[#0F1C36]/62 leading-relaxed">
                  Tarım ve Orman Bakanlığı tarafından güncellenen gıda etiketleme kılavuzuna göre restoran ve kafelerde servis edilen yiyecek-içeceklerin <mark className="bg-yellow-100 text-[#0F1C36] px-0.5">içerik ve kalori bilgileri</mark> tüketici tarafından açıkça görülebilecek şekilde sunulacak.
                </p>

                <p className="font-serif text-sm text-[#0F1C36]/62 leading-relaxed">
                  Yeni düzenleme kapsamında bilgilendirme; menüler, yazı tahtaları, broşürler, dijital ekranlar ve <mark className="bg-yellow-100 text-[#0F1C36] px-0.5">QR kod aracılığıyla</mark> yapılabilecek. QR kod kullanılması durumunda tüketicilere bilgilere nasıl ulaşabilecekleri açık şekilde belirtilecek.
                </p>

                <p className="font-serif text-sm text-[#0F1C36]/62 leading-relaxed">
                  Ayrıntılı menü zorunluluğu <mark className="bg-yellow-100 text-[#0F1C36] px-0.5">3 ay sonra uygulanmaya başlanacak.</mark> Uyum için işletme büyüklüğüne göre farklı geçiş süreleri tanındı.
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#0F1C36]/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#0F1C36]/8 flex items-center justify-center">
                      <span className="text-[9px] font-black text-[#0F1C36]/35">TC</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#0F1C36]/45">Resmî Gazete</p>
                      <p className="text-[10px] text-[#0F1C36]/28">Mart 2026</p>
                    </div>
                  </div>
                  <Link href="/sign-up">
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-1.5 bg-[#0F1C36] text-white text-[11px] font-bold px-4 py-2 rounded-full cursor-pointer"
                    >
                      Uyumu Sağla <ArrowRight className="w-3 h-3" />
                    </motion.span>
                  </Link>
                </div>
              </div>

              {/* SAĞ — İki haber kartı */}
              <div className="hidden md:block pt-5 md:pt-0 md:pl-5 border-t md:border-t-0 border-[#0F1C36]/10 space-y-5">

                <div className="space-y-2">
                  <div className="overflow-hidden rounded-sm border border-[#0F1C36]/8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/A_comparison_flat.png" alt="Basılı vs dijital menü" className="w-full object-cover" />
                  </div>
                  <h4 className="font-serif text-sm font-black text-[#0F1C36]/85 leading-snug">
                    Basılı Menü Çağı Kapanıyor
                  </h4>
                  <p className="font-serif text-xs text-[#0F1C36]/50 leading-relaxed">
                    Yıllık binlerce TL baskı maliyeti ve her güncellemede tekrarlanan masraf. Yeni yönetmelik bu döngüyü tamamen sona erdiriyor.
                  </p>
                  <p className="text-[10px] text-[#0F1C36]/28">Şubat 2026</p>
                </div>

                <div className="h-px bg-[#0F1C36]/8" />

                <div className="space-y-2">
                  <div className="overflow-hidden rounded-sm border border-[#0F1C36]/8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/Yasal Mevzuatlara Tam Uyum.jpg" alt="Yasal uyum" className="w-full object-cover" />
                  </div>
                  <h4 className="font-serif text-sm font-black text-[#0F1C36]/85 leading-snug">
                    EduQR ile Denetimde Tam Güvence
                  </h4>
                  <p className="font-serif text-xs text-[#0F1C36]/50 leading-relaxed">
                    Türk Gıda Kodeksi'nin tüm zorunluluklarına otomatik uyum. Müfettiş geldiğinde eksiksiz, güncel, hazır.
                  </p>
                  <p className="text-[10px] text-[#0F1C36]/28">Ocak 2026</p>
                </div>

              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
