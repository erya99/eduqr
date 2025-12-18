import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  
  // Ortak Özellik Listesi
  const features = [
    "Sınırsız Ürün & Kategori",
    "Gelişmiş Tema Seçenekleri",     // Yeni
    "Çark Menü Modülü",              // Yeni
    "Menüyü Görsel Olarak İndirme",  // Yeni
    "QR Kod Oluşturucu",
    "Görsel Yükleme (Cloudinary)",
    "7/24 Teknik Destek",
    "Anlık Güncelleme"
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Basit ve Şeffaf Fiyatlandırma
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Gizli ücret yok. Taahhüt yok. İster aylık ister yıllık ödeyin.
          </p>
        </div>

        {/* FİYAT KARTLARI GRID */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          
          {/* 1. AYLIK PAKET */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border-2 border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-full">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="flex justify-center">
                <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  Aylık Plan
                </span>
              </div>
              <div className="mt-4 flex justify-center items-baseline text-6xl font-extrabold text-gray-900 dark:text-white">
                250 <span className="ml-1 text-2xl font-medium text-gray-500">₺</span>
              </div>
              <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                + KDV / Ay
              </p>
            </div>

            <div className="px-6 pt-6 pb-8 sm:p-10 sm:pt-6 flex-1 flex flex-col">
              <ul className="space-y-4 flex-1">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" aria-hidden="true" />
                    </div>
                    <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link href="/sign-up" className="block w-full">
                  {/* GÜNCELLEME BURADA: Buton rengi mavi yapıldı */}
                  <Button className="w-full h-12 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                    Aylık Başla
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* 2. YILLIK PAKET (KAMPANYALI) */}
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-blue-600 overflow-hidden transform md:scale-105 transition-transform duration-300 flex flex-col h-full">
            
            {/* Kampanya Etiketi */}
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-4 py-1.5 rounded-bl-xl font-bold flex items-center gap-1 z-10">
               <Star className="w-3 h-3 fill-white" /> KAMPANYA
            </div>

            <div className="px-6 py-8 sm:p-10 sm:pb-6 relative">
              <div className="flex justify-center">
                <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  Yıllık Avantaj
                </span>
              </div>
              <div className="mt-4 flex justify-center items-baseline text-6xl font-extrabold text-gray-900 dark:text-white">
                2.500 <span className="ml-1 text-2xl font-medium text-gray-500">₺</span>
              </div>
              <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                + KDV / Yıl
              </p>
              
              <div className="mt-4 text-center">
                 <span className="inline-block bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-lg dark:bg-green-900/30 dark:text-green-400">
                    Avantajlı Paket!
                 </span>
              </div>
            </div>

            <div className="px-6 pt-6 pb-8 sm:p-10 sm:pt-6 flex-1 flex flex-col">
              <ul className="space-y-4 flex-1">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <p className="ml-3 text-base text-gray-700 dark:text-gray-300 font-medium">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link href="/sign-up" className="block w-full">
                  <Button className="w-full h-12 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20">
                    Yıllık Avantajla Başla
                  </Button>
                </Link>
                <p className="mt-4 text-xs text-center text-gray-500">
                  Tüm ödemeler PayTR güvencesi altındadır.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}