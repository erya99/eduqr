import Image from "next/image";
import { Infinity, Palette, Cloud, Headphones, Zap, Download, Instagram, Heart } from "lucide-react";

export default function DetailedFeatures() {
    const detailedFeatures = [
        {
            title: "Esnek Ürün ve Kategori Yönetimi",
            description: "Sıfırdan ürünlerinizin farklı boy, seçenek ve fiyat alternatiflerini oluşturmanıza sağlayan gelişmiş varyasyon sistemi. Müşterileriniz doğru ürünü seçebilir, siz de her bir varyasyon için ayrı fiyat belirleyebilirsiniz.",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1974",
            imageAlt: "Esnek menü yönetimi",
            reverse: false
        },
        {
            title: "Müşterileri Eğlendiren Çark Çevir Modülü",
            description: "Müşteri kararsızsa çark çevirsin. İstediğiniz ürünleri veya ikramları çarka koyun, sipariş vermeyi eğlenceli bir oyuna dönüştürün. Kampanyalarınızı oyunlaştırarak sadakati artırın.",
            image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=1920",
            imageAlt: "Oyunlaştırma modülü",
            reverse: true,
            isPro: true
        },
        {
            title: "Gizli Şikayet Kutusu (İtibar Kalkanı)",
            description: "Müşteri memnun değilse, sinirle Google'a yazmadan önce sadece size haber versin. 'İşletmeye Gizli Not' özelliği ile şikayetler doğrudan panelinize düşer. Sorunu müşteri masadan kalkmadan çözün, puanınızı koruyun.",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1920",
            imageAlt: "Dijital itibar yönetimi",
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
            title: "Anlık Güncelleme",
            description: "Fiyat veya ürün değişiklikleriniz anında yayına girer.",
            color: "yellow"
        },
        {
            icon: Instagram,
            title: "Sosyal Medya Entegrasyonu",
            description: "Instagram ve diğer sosyal medya hesaplarınızı menünüze bağlayın.",
            color: "pink"
        },
        {
            icon: Heart,
            title: "Müşteri Sadakati",
            description: "Favori ürün ve öneriler ile müşteri bağlılığını artırın.",
            color: "red"
        }
    ];

    const colorMap: Record<string, string> = {
        blue: "bg-blue-100 text-blue-600",
        purple: "bg-purple-100 text-purple-600",
        green: "bg-green-100 text-green-600",
        cyan: "bg-cyan-100 text-cyan-600",
        orange: "bg-orange-100 text-orange-600",
        yellow: "bg-yellow-100 text-yellow-600",
        pink: "bg-pink-100 text-pink-600",
        red: "bg-red-100 text-red-600",
    };

    return (
        <section className="pb-24">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Detaylı Özellikler */}
                <div className="space-y-24 mb-24">
                    {detailedFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
                        >
                            <div className="flex-1">
                                {feature.isPro && (
                                    <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                                        Pro Özellik
                                    </span>
                                )}
                                <h3 className="text-2xl md:text-3xl font-bold text-[#0F1C36] mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                            <div className="flex-1 w-full">
                                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={feature.image}
                                        alt={feature.imageAlt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ek Özellikler Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {additionalFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[feature.color]}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-[#0F1C36] mb-2">{feature.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
