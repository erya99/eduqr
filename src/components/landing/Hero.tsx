import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-6">
          🚀 Restoranlar için Dijital Dönüşüm
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
          Menünüzü <span className="text-blue-600">QR Kod</span> ile<br />
          Cebinize Taşıyın
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
          Dakikalar içinde restoranınız için dijital menü oluşturun. 
          Baskı maliyetlerinden kurtulun, fiyatları anında güncelleyin.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/sign-up">
            <Button size="lg" className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              Hemen Başla (Ücretsiz)
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="h-12 px-8 text-lg w-full sm:w-auto">
              Özellikleri İncele
            </Button>
          </Link>
        </div>

        {/* Görsel Temsili (Mockup) */}
        <div className="mt-16 relative w-full max-w-4xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-30"></div>
          <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 p-2 overflow-hidden">
             {/* Buraya admin panelinin ekran görüntüsü konabilir, şimdilik placeholder */}
             <div className="bg-gray-100 rounded-lg h-64 md:h-96 flex items-center justify-center text-gray-400">
                <div className="flex flex-col items-center gap-2">
                    <QrCode className="h-16 w-16" />
                    <span>Admin Paneli Önizlemesi</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}