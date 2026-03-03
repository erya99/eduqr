export default function FeaturedFeatures() {
    const features = [
        {
            emoji: "🛡️",
            title: "Kötü Yorumlar Önce Size Gelsin",
            description: "Müşteri memnun değilse, Google'a yazmadan önce size haber versin. Sorunu masada çözün, puanınız düşmesin.",
            isPro: true,
            color: "blue"
        },
        {
            emoji: "👮",
            title: "Denetimlere Her Zaman Hazır Olun",
            description: "Kasada 100 TL, menüde 80 TL mi? Bu riskle yaşamayın. Fiyatı değiştirdiğiniz an her yerde güncellenir. Sürpriz cezalara ve müşteri tartışmalarına son.",
            isPro: false,
            color: "pink"
        },
        {
            emoji: "🎡",
            title: "Çark Çevir Modülü",
            description: "Müşteri kararsızsa çark çevirsin. İstediğiniz ürünleri veya ikramları çarka koyun, eğlenceli olsun.",
            isPro: true,
            color: "purple"
        },
        {
            emoji: "💰",
            title: "Fiyatları Telefondan Değiştirin",
            description: "Domates fiyatı arttı mı? Telefondan 10 saniyede fiyatı güncelleyin. Bilgisayara gerek yok.",
            isPro: false,
            color: "green"
        },
        {
            emoji: "⚡",
            title: "Hızlı Açılan Menü",
            description: "Yavaş internet olsa bile menü hızlı açılıyor. PDF indirme yok, zoom yapmaya gerek yok.",
            isPro: false,
            color: "yellow"
        },
        {
            emoji: "🥗",
            title: "Zorunlu Alerjen Bildirimi",
            description: "Türk Gıda Kodeksi'ne uygun 14 temel alerjen uyarısı. Müşterileriniz içerikleri görsün, yasal zorunluluğu yerine getirin.",
            isPro: true,
            color: "indigo"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F1C36]">
                        Öne Çıkan <span className="text-blue-600">Özellikler</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Rakiplerinizden sıyrılmanızı sağlayan özellikler.
                    </p>
                </div>

                {/* Features Grid - 3 columns x 2 rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group hover:-translate-y-[5px]"
                        >
                            {/* Emoji Icon */}
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                {feature.emoji}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
