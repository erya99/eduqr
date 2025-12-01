import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-white">
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
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                  15 Gün Ücretsiz Dene
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-gray-300 hover:bg-gray-50 text-gray-700">
                <Phone className="mr-2 h-5 w-5" />
                Sizi Arayalım
              </Button>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">✓ Kredi Kartı Gerekmez</span>
              <span className="flex items-center gap-1">✓ 7/24 Destek</span>
            </div>
          </div>

          {/* SAĞ TARAF (GÖRSEL / MOCKUP) */}
          <div className="relative animate-in slide-in-from-right-10 duration-1000 delay-200">
            {/* Arka plan süslemesi (Gradient Blob) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
            
            {/* TELEFON GÖRSELİ */}
            {/* NOT: Buraya kendi 'phone-mockup.png' görselini koymalısın. Şimdilik Unsplash koyuyorum. */}
            <div className="relative mx-auto w-[300px] md:w-[350px] aspect-[9/19] bg-gray-900 rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden ring-1 ring-gray-900/10">
               <Image 
                 src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80" 
                 alt="Mobil Uygulama Görünümü"
                 fill
                 className="object-cover"
               />
               
               {/* Ekranda sanki QR okutulmuş gibi duran bir UI parçası */}
               <div className="absolute bottom-6 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        QR
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">Menü Açıldı</div>
                        <div className="text-xs text-gray-500">Masa No: 5</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}