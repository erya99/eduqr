import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Basit ve Şeffaf Fiyatlandırma
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Gizli ücret yok. Taahhüt yok. İstediğiniz zaman iptal edin.
          </p>
        </div>

        {/* FİYAT KARTI */}
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl border-2 border-blue-600 overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
              <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                Profesyonel Paket
              </span>
            </div>
            <div className="mt-4 flex justify-center items-baseline text-6xl font-extrabold text-gray-900 dark:text-white">
              250 <span className="ml-1 text-2xl font-medium text-gray-500">₺</span>
            </div>
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              + KDV / Ay
            </p>
          </div>

          <div className="px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
            <ul className="space-y-4">
              {[
                "Sınırsız Ürün Ekleme",
                "Sınırsız Kategori",
                "QR Kod Oluşturucu",
                "Görsel Yükleme (Cloudinary)",
                "7/24 Teknik Destek",
                "Anlık Güncelleme",
                "Karanlık Mod Desteği"
              ].map((feature) => (
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
                <Button className="w-full h-12 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                  15 Gün Ücretsiz Dene
                </Button>
              </Link>
              <p className="mt-4 text-xs text-center text-gray-500">
                Deneme süresi boyunca kredi kartı gerekmez.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}