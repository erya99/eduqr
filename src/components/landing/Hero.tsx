import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
      {/* Background Blobs (Navy/Blue Soft Gradients) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-[#0F1C36]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* TEXT CONTENT */}
          <div className="lg:col-span-7 space-y-8 animate-in slide-in-from-left-10 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm font-medium text-blue-800">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Dakikalar İçinde Hazır, Riskten Uzak
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#0F1C36] leading-[1.1]">
              T.C. Ticaret Bakanlığı Uyumlu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#0F1C36]">
                Dijital Menü Sistemi.
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              Menünüzü dakikalar içinde oluşturun, fiyatlarınızı anında güncelleyin. Mevzuata %100 uyumlu altyapı ile hem hız kazanın hem de işletmenizi koruyun.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#0F1C36] hover:bg-blue-900 text-white font-bold shadow-lg shadow-blue-900/10 transition-transform hover:scale-105 active:scale-95">
                  Hemen Başla
                </Button>
              </Link>

              <Link href="/ornekmenu1" target="_blank">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg rounded-full border border-gray-200 bg-white text-[#0F1C36] hover:bg-gray-50 transition-transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  Canlı Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* TRUST BADGE for Legal Compliance */}
            <div className="pt-2 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/50 rounded-lg border border-blue-100 w-fit">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                <span className="text-sm font-semibold text-blue-900">1 Ocak 2024 Fiyat Etiketi Yönetmeliği ile Tam Uyumludur</span>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500 font-medium pl-1">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Ceza Riski Yok</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Anında Kurulum</span>
              </div>
            </div>
          </div>

          {/* IMAGE CONTENT */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-200">
            <div className="relative w-[300px] md:w-[350px] lg:w-[800px] h-[600px] md:h-[700px] lg:h-[850px] lg:-mr-32">
              {/* Gold/Bronze Glow behind phone (The "Brownness") */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#D4A373]/20 blur-[90px] rounded-full -z-10" />

              <Image
                src="/anasayfatelefon.png"
                alt="EduQR Mobil Uygulama Arayüzü"
                fill
                style={{ objectFit: 'contain' }}
                priority
                className="drop-shadow-2xl animate-float"
              />

              {/* Floating Badge 1 (Cost) */}
              <div className="absolute top-20 left-0 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl animate-bounce delay-1000 border border-white/50 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">₺</div>
                  <div>
                    <p className="text-xs text-gray-500">Matbaa Masrafı</p>
                    <p className="text-sm font-bold text-[#0F1C36]">Yok</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 (Satisfaction) */}
              <div className="absolute bottom-40 right-10 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl animate-pulse delay-700 border border-white/50 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">★</div>
                  <div>
                    <p className="text-xs text-gray-500">Müşteri Memnuniyeti</p>
                    <p className="text-sm font-bold text-[#0F1C36]">%100 Artış</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organic Wave Separator (Bottom of Hero) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,2.97V0H0V0.58C0,0.58,0,0.58,0,0.58A602.4,602.4,0,0,0,321.39,56.44Z" fill="transparent"></path>
          <path d="M985.66,92.83C906.67,72,823.78,31,433.89,8c-301.69-17.92-334.4,40.48-433.89,0V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#F8FAFC" opacity="0.4"></path>
        </svg>
      </div>
    </section>
  );
}