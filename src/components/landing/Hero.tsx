import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";

export default function Hero() {
  return (
    // dark:bg-white -> Karanlık modda bile arka plan beyaz olsun
    // dark:text-gray-900 -> Karanlık modda bile genel yazı rengi siyah olsun
    <section className="relative py-16 lg:py-24 overflow-hidden bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* SOL TARAFI (YAZILAR) */}
          {/* motion-reduce:animate-none -> Eğer telefonda animasyon kapalıysa, animasyonu iptal et ve direkt göster */}
          {/* motion-reduce:opacity-100 -> Görünürlüğü %100 yap */}
          <div className="text-center lg:text-left space-y-8 animate-in slide-in-from-left-10 duration-700 motion-reduce:animate-none motion-reduce:opacity-100">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-900 leading-[1.1]">
              Kağıt Masraflarından Kurtulun, <br/>
              {/* Mavi yazı rengini de dark mod için zorluyoruz */}
              <span className="text-blue-600 dark:text-blue-600">Gelirinizi Arttırın!</span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Restoranınız için saniyeler içinde dijital menü oluşturun. 
              Müşterileriniz uygulama indirmeden, sadece kamerayı açarak sipariş versin.
              Baskı maliyeti yok, anlık güncelleme var.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/sign-up">
                {/* Buton yazılarını da zorluyoruz */}
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:text-white shadow-lg shadow-blue-200 border-0">
                  Hemen Abone Ol
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/ornekmenu1" target="_blank">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 px-8 text-lg rounded-full w-full sm:w-auto border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:bg-white dark:text-gray-700 dark:border-gray-300 dark:hover:bg-gray-50"
                >
                    <Eye className="mr-2 h-5 w-5" />
                    Menüye Göz At
                </Button>
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 dark:text-gray-500">
              <span className="flex items-center gap-1">✓ Kolay Yönetim</span>
              <span className="flex items-center gap-1">✓ 7/24 Destek</span>
            </div>
          </div>

          {/* SAĞ TARAF (GÖRSEL) */}
          <div className="relative animate-in slide-in-from-right-10 duration-1000 delay-200 flex justify-center motion-reduce:animate-none motion-reduce:opacity-100">
            {/* Arka plan süslemesi */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
            
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