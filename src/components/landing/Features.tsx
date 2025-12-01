import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function Features() {
  return (
    // bg-white ve text-gray-900 ile temayı sabitledik
    <section className="py-24 bg-white text-gray-900 space-y-24 lg:space-y-32">
      
      {/* BAŞLIK ALANI */}
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Dijital Menü & QR Kod Sistemi
        </h2>
        <p className="text-lg text-gray-600">
          İşletmenize maliyet ve zaman tasarrufu sağlarken, aynı zamanda daha esnek ve güncel bir menü sunmanızı sağlar. Rekabet gücünüzü artırın.
        </p>
      </div>

      {/* --- ÖZELLİK 1: PANEL GÖRSELİ --- */}
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
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
            {[
              "Anında Fiyat Güncelleme", 
              "Ürün Fotoğrafları Ekleme", 
              "Kategori Yönetimi"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle2 className="text-green-500 w-5 h-5" /> {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* YENİ GÖRSEL: anasayfapanel.png */}
        <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 flex items-center justify-center">
           <Image 
             src="/anasayfamekan.png" 
             alt="Yönetim Paneli"
             fill
             className="object-contain p-4"
           />
        </div>
      </div>

      {/* --- ÖZELLİK 2: MEKAN GÖRSELİ --- */}
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* YENİ GÖRSEL: anasayfamekan.png */}
        <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 order-2 lg:order-1 flex items-center justify-center">
           <Image 
             src="/anasayfapanel.png" 
             alt="Mekan ve QR Kullanımı"
             fill
             className="object-cover"
           />
        </div>
        
        <div className="space-y-6 order-1 lg:order-2">
          {/* Adisyo yerine EduQR yazıldı */}
          <h3 className="text-3xl font-bold text-gray-900">
            EduQR Dijital Menü ile Hizmetleriniz Kusursuz Olsun
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            EduQR yönetim panelinde, ürünlerinizi kolaylıkla düzenleyebilirsiniz. 
            Menünüzdeki ürünleri ekleyebilir, çıkarabilir, fiyatlarını güncelleyebilir 
            ve görsellerini değiştirebilirsiniz. Bu işlemi yapmak için sadece birkaç dakikanızı ayırmanız yeterli olacaktır.
          </p>
          <ul className="space-y-3">
            {[
              "Mobil Uyumlu Tasarım", 
              "QR Kod Oluşturucu", 
              "Karanlık Mod Desteği"
            ].map((item, i) => (
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