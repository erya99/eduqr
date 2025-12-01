import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";

export default function Hero() {
  return (
    // bg-white ve text-gray-900 ile temayı sabitledik
    <section className="relative py-16 lg:py-24 overflow-hidden bg-white text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* SOL TARAFI (YAZILAR) */}
          <div className="text-center lg:text-left space-y-8 animate-in slide-in-from-left-10 duration-700">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Kağıt Masraflarından Kurtulun, <br/>
              <span className="text-blue-600">Gelirinizi Arttırın!</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Restoranınız için saniyeler içinde dijital menü oluşturun. 
              Müşterileriniz uygulama indirmeden, sadece kamerayı açarak sipariş versin.
              Baskı maliyeti yok, anlık güncelleme var.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 border-0">
                  15 Gün Ücretsiz Dene
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              {/* GÜNCELLENEN BUTON */}
              <Link href="/ornekmenu1" target="_blank">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-gray-300 hover:bg-gray-50 text-gray-700 w-full sm:w-auto">
                    <Eye className="mr-2 h-5 w-5" />
                    Menüye Göz At
                </Button>
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">✓ Kredi Kartı Gerekmez</span>
              <span className="flex items-center gap-1">✓ 7/24 Destek</span>
            </div>
          </div>

          {/* SAĞ TARAF (GÖRSEL / MOCKUP) */}
          <div className="relative animate-in slide-in-from-right-10 duration-1000 delay-200 flex justify-center">
            {/* Arka plan süslemesi */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
            
            {/* YENİ GÖRSEL: anasayfatelefon.png */}
            <div className="relative w-[300px] md:w-[350px] aspect-[9/19]">
               <Image 
                 src="/anasayfatelefon.png" 
                 alt="Mobil Uygulama Görünümü"
                 width={350}
                 height={700}
                 className="object-contain drop-shadow-2xl"
                 priority
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}