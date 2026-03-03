import Image from "next/image";
import { Infinity, Palette, Cloud, Headphones, Zap, Download, Instagram, Heart } from "lucide-react";

export default function DetailedFeatures() {
    const detailedFeatures = [
        {
            title: "Farklı Boy ve Seçeneklerle Esnek Ürün Yönetimi",
            description: "Sıfırdan ürünlerinizin farklı boy, seçenek ve fiyat alternatiflerini oluşturmanıza sağlayan ürün varyasyonları sistemi. Müşterileriniz doğru ürünü seçebilir, siz de her bir varyasyon için ayrı fiyat belirleyebilirsiniz. QR menünüzü özelleştirin, küçük, orta ve büyük gibi seçeneklerle kolayca yönetin.",
            image: "/feature-kebap.png",
            imageAlt: "Kebap porsiyon seçenekleri",
            reverse: false
        },
        {
            title: "Aktif/Pasif Ürün Yönetimi",
            description: "Stokta kalmayan ürünü silmeyin, pasif yapın. Stok gelince tek tıkla aktif edin. Sezonluk ürünlerinizi kolayca yönetin, menüyü karmaşıklaştırmadan geçici olarak ürünleri gizleyin. Toggle ile saniyeler içinde ürünlerinizi aktif veya pasif hale getirin.",
            image: "/feature-toggle.png",
            imageAlt: "Aktif pasif toggle",
            reverse: true
        },
        {
            title: "QR Kod Oluşturucu",
            description: "Paneldeki 'QR Oluştur' butonuna tıklayın. QR kodunuz anında hazır! Menüde değişiklik yaptığınızda QR'ı değiştirmenize gerek yok, otomatik güncellenir. Tek bir QR kod, sınırsız güncelleme. Yazdırın, masalara koyun, müşterileriniz anında menünüze ulaşsın.",
            image: "/feature-qr.png",
            imageAlt: "QR kod oluşturucu",
            reverse: false
        },
        {
            title: "Çark Çevir Modülü",
            description: "Müşteri kararsızsa çark çevirsin. İstediğiniz ürünleri veya ikramları çarka koyun, eğlenceli olsun. Kampanyalarınızı oyunlaştırın, müşteri deneyimini farklılaştırın. İndirim, bedava içecek veya tatlı ikramı gibi ödüller ekleyin.",
            image: "/feature-wheel.png",
            imageAlt: "Çark çevir modülü",
            reverse: true,
            isPro: true
        },
        {
            title: "Anlık Fiyat Güncelleme",
            description: "Domates fiyatı arttı mı? Telefondan 10 saniyede fiyatı güncelleyin. Bilgisayara gerek yok. Yaptığınız değişiklikler anında tüm masalardaki QR menülere yansır. Müşteriler her zaman güncel fiyatları görür.",
            image: "/feature-price.png",
            imageAlt: "Anlık fiyat güncelleme",
            reverse: false
        },
        {
            title: "Dijital İtibar Kalkanı (Gizli Şikayet Kutusu)",
            description: "Müşteri memnun değilse, Google'a yazmadan önce size haber versin. 'İşletmeye Gizli Not' özelliği ile şikayetler panelinize düşsün, sorunu masada çözün, Google puanınızı koruyun. Kötü yorumları önleyin, müşteri memnuniyetini artırın.",
            image: "/feature-feedback.png",
            imageAlt: "Dijital itibar kalkanı",
            reverse: true,
            isPro: true
        },
        {
            title: "Yasal Uyum & Alerjen Bildirimi",
            description: "1 Ocak 2024 tarihli Ticaret Bakanlığı Fiyat Etiketi Yönetmeliği'ne ve Türk Gıda Kodeksi'ne tam uyumludur. Denetimlerde sürpriz cezalarla karşılaşmayın. Sistem, zorunlu olan 14 temel alerjen bilgisini ve fiyat geçmişini otomatik olarak sunarak işletmenizi hukuki koruma altına alır.",
            image: "/feature-legal.png",
            imageAlt: "Yasal uyum ve alerjen bildirimi",
            reverse: false,
            isPro: true
        }
    ];

    const additionalFeatures = [
        {
            icon: Infinity,
            title: "Sınırsız Ürün & Kategori",
            description: "İstediğiniz kadar ürün ve kategori ekleyin. Hiçbir limit yok.",
            color: "blue"
        },
        {
            icon: Palette,
            title: "Gelişmiş Tema Seçenekleri",
            description: "Markanıza uygun renkler ve tasarımlar. Tamamen özelleştirilebilir.",
            color: "purple"
        },
        {
            icon: Download,
            title: "Menüyü Görsel Olarak İndirme",
            description: "Menünüzü PDF veya görsel olarak indirip paylaşın.",
            color: "green"
        },
        {
            icon: Cloud,
            title: "Görsel Yükleme (Cloudinary)",
            description: "Profesyonel bulut altyapısı ile hızlı ve güvenli görsel yönetimi.",
            color: "cyan"
        },
        {
            icon: Headphones,
            title: "7/24 Teknik Destek",
            description: "Her an yanınızdayız. Sorularınız için 7/24 destek ekibimiz hazır.",
            color: "orange"
        },
        {
            icon: Zap,
            title: "Hızlı Yükleme",
            description: "En yavaş internette bile menü anında açılır. Müşteri beklemez.",
            color: "yellow"
        },
        {
            icon: Instagram,
            title: "Sosyal Medya Entegrasyonu",
            description: "Instagram ve Google yorum butonları ile takipçi ve yorum sayınızı artırın.",
            color: "pink"
        },
        {
            icon: Heart,
            title: "Eğitim Bursu Desteği",
            description: "Her yıllık üyelikte Darüşşafaka'ya bağış yapıyor, eğitime destek oluyoruz.",
            color: "red"
        }
    ];

    return (
        <section className="py-24 bg-transparent">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Detailed Features with Images */}
                <div className="space-y-32 mb-32">
                    {detailedFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${feature.reverse ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Text Content */}
                            <div className={`space-y-6 ${feature.reverse ? "lg:order-2" : "lg:order-1"}`}>
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-4xl font-bold text-[#0F1C36] leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <div className="text-sm text-gray-400">
                                        eduqr.tr
                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            <div className={`relative ${feature.reverse ? "lg:order-1" : "lg:order-2"}`}>
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={feature.image}
                                        alt={feature.imageAlt}
                                        width={600}
                                        height={400}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Features Grid */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-3xl md:text-4xl font-bold text-[#0F1C36] mb-4">
                            Ve Daha Fazlası...
                        </h3>
                        <p className="text-lg text-gray-600">
                            İşinizi kolaylaştıran tüm özellikler bir arada.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {additionalFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group hover:-translate-y-1"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                                </div>

                                <h4 className="text-lg font-bold text-gray-900 mb-2">
                                    {feature.title}
                                </h4>

                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
