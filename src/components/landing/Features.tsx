import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 space-y-32">

      {/* BAŞLIK ALANI */}
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0F1C36] mb-6">
          Teknoloji Değil, <span className="text-blue-600">Konfor ve Kazanç</span> Satıyoruz
        </h2>
        <p className="text-xl text-gray-500">
          İşletmenizi yönetirken boğulmayın. EduQR size zaman kazandırır, müşterinize keyifli bir deneyim sunar.
        </p>
      </div>

      {/* --- BÖLÜM 1: PANEL GÖRSELİ (Müşteri için kolaylık) --- */}
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div className="space-y-8 lg:order-1 order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm">
            🔥 Kolay Yönetim
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0F1C36]">
            Fiyatı Telefonundan Mesaj Atar Gibi Değiştir
          </h3>
          <p className="text-xl text-gray-500 leading-relaxed">
            Bilgisayar başına geçmene gerek yok. Pazara gittin, domatesin fiyatı mı artmış?
            Hemen cebinden panelini aç, fiyatı güncelle. Saniyeler içinde tüm masalardaki menün değişsin.
          </p>
          <ul className="space-y-4">
            {["Anlık Güncelleme", "Her Yerden Erişim", "Kod Bilgisi Gerekmez"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[#0F1C36] font-medium text-lg">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:order-2 order-1">
          {/* Decorative Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10" />

          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-100 bg-white p-2">
            <Image
              src="/anasayfapanel_optimized.jpg"
              alt="Kolay Yönetim Paneli"
              width={600}
              height={900}
              className="w-full h-auto rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* --- BÖLÜM 2: MEKAN GÖRSELİ (Satış Odaklı) --- */}
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        <div className="relative order-1">
          {/* Decorative Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-100/50 rounded-full blur-3xl -z-10" />

          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-100 bg-white p-2">
            <Image
              src="/anasayfamekan_optimized.jpg"
              alt="İştah Kabartan Görseller"
              width={800}
              height={600}
              className="w-full h-auto rounded-3xl"
            />
          </div>
        </div>

        <div className="space-y-8 order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 font-semibold text-sm">
            🚀 Satışları Arttır
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0F1C36]">
            İştah Kabartan Görsellerle Siparişleri %30 Artır
          </h3>
          <p className="text-xl text-gray-500 leading-relaxed">
            İnsanlar gördükleri yemeği canı çeker. Menünüze profesyonel, iştah açıcı fotoğraflar yükleyin.
            Müşteriniz "Adana Kebap" yazısını okuyup geçmesin, cızırdayan kebabı görüp sipariş versin.
          </p>
          <ul className="space-y-4">
            {["Görsel Menü Desteği", "Sınırsız Fotoğraf Yükleme", "Kategori Bazlı Gösterim"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[#0F1C36] font-medium text-lg">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Organic Wave Separator (Bottom of Features) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 opacity-30">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,433.89,8c-301.69-17.92-334.4,40.48-433.89,0V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#D4A373" opacity="0.1"></path>
        </svg>
      </div>
    </section>
  );
}