import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 bg-white text-gray-900 space-y-24 lg:space-y-32">
      
      {/* BAŞLIK ALANI */}
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Dijital Menü & QR Kod Sistemi
        </h2>
        <p className="text-lg text-gray-600">
          İşletmenize maliyet ve zaman tasarrufu sağlarken, aynı zamanda daha esnek ve güncel bir menü sunmanızı sağlar.
        </p>
      </div>

      {/* --- BÖLÜM 1: MEKAN GÖRSELİ (Sağda) --- */}
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900">
            Müşterilerinizi Memnun Ederek Gelirinizi Arttırın
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Dijital menü kullanımı, işletmenizin esnekliğini ve hızını artırır. 
            Örneğin, yeni bir ürün eklemek veya mevcut bir ürünün fiyatını değiştirmek istediğinizde, 
            hemen yönetim paneline girerek bu değişiklikleri yapabilirsiniz.
          </p>
          <ul className="space-y-3">
            {["Anında Fiyat Güncelleme", "Ürün Fotoğrafları Ekleme", "Kategori Yönetimi"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle2 className="text-green-500 w-5 h-5" /> {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* DÜZELTME 1: Mekan görseli için sabit yükseklik kaldırıldı. */}
        {/* 'w-full h-auto' ile resim kendi orantısında büyüyüp küçülecek, kesilmeyecek. */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
           <Image 
             src="/anasayfamekan.png" 
             alt="Mekan Atmosferi"
             width={800}  // Next.js'in en boy oranını anlaması için temsili değerler
             height={600} 
             className="w-full h-auto" // Kritik kısım burası: Genişliğe uyar, yüksekliği otomatik ayarlar.
           />
        </div>
      </div>

      {/* --- BÖLÜM 2: PANEL GÖRSELİ (Solda - Esas Sorunlu Kısım) --- */}
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* DÜZELTME 2: Panel görseli için sabit yükseklik kaldırıldı. */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50 order-2 lg:order-1 flex items-center justify-center p-2">
           {/* Bu görsel uzun olduğu için height değerini width'ten büyük vererek orantıyı belirttik */}
           <Image 
             src="/anasayfapanel.png" 
             alt="Yönetim Paneli"
             width={600}
             height={900} // Uzun bir görsel olduğunu belirttik
             // 'w-full h-auto' sayesinde görselin tamamı gösterilecek, asla kesilmeyecek.
             className="w-full h-auto drop-shadow-lg rounded-xl" 
           />
        </div>
        
        <div className="space-y-6 order-1 lg:order-2">
          <h3 className="text-3xl font-bold text-gray-900">
            EduQR Dijital Menü ile Hizmetleriniz Kusursuz Olsun
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            EduQR yönetim panelinde, ürünlerinizi kolaylıkla düzenleyebilirsiniz. 
            Menünüzdeki ürünleri ekleyebilir, çıkarabilir, fiyatlarını güncelleyebilir 
            ve görsellerini değiştirebilirsiniz.
          </p>
          <ul className="space-y-3">
            {["Mobil Uyumlu Tasarım", "QR Kod Oluşturucu", "Karanlık Mod Desteği"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle2 className="text-blue-500 w-5 h-5" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}