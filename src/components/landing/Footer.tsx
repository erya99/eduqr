import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    // bg-gray-50 ve text-gray-900 ile temayı sabitledik
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-900">
      
      {/* CTA Bölümü */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">İşletmenizi Dijitale Taşıyın</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Binlerce restoranın tercih ettiği QR menü sistemine hemen ücretsiz katılın.
        </p>
        <Link href="/sign-up">
            <Button size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-full border-0">
                Ücretsiz Hesap Oluştur
            </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        {/* YENİ TEXT */}
        <p>© 2024 EduQr. EduXperts bünyesinde bir hizmettir. Tüm Hakları Saklıdır</p>
        
        <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/legal/privacy" className="hover:text-gray-900">Gizlilik Politikası</Link>
            <Link href="/legal/terms" className="hover:text-gray-900">Kullanım Şartları</Link>
            <Link href="/contact" className="hover:text-gray-900">İletişim</Link>
        </div>
      </div>
    </footer>
  );
}