import { Infinity, Palette, Disc, Download, QrCode, Cloud, Headphones, Zap } from "lucide-react";

export default function AllFeatures() {
    const features = [
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
            icon: Disc,
            title: "Çark Menü Modülü",
            description: "Eğlenceli çark menü ile müşterilerinize farklı bir deneyim sunun.",
            color: "indigo"
        },
        {
            icon: Download,
            title: "Menüyü Görsel Olarak İndirme",
            description: "Menünüzü PDF veya görsel olarak indirip paylaşın.",
            color: "green"
        },
        {
            icon: QrCode,
            title: "QR Kod Oluşturucu",
            description: "Tek tıkla QR kodunuzu oluşturun. Menü değişse bile QR kod aynı kalır.",
            color: "blue"
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
            title: "Anlık Güncelleme",
            description: "Yaptığınız değişiklikler anında menüye yansır. Saniyeler içinde!",
            color: "yellow"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F1C36]">
                        Tüm <span className="text-blue-600">Özellikler</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        İşletmenizi güçlendirecek her şey, tek bir platformda.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-xl bg-${feature.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-[#0F1C36] mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-600">
                        Ve daha fazlası! <span className="font-bold text-blue-600">14 gün ücretsiz</span> deneyin.
                    </p>
                </div>
            </div>
        </section>
    );
}
