import { Star } from "lucide-react";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Pala Usta",
            business: "Meşhur Kokoreçci Pala",
            role: "İşletme Sahibi",
            quote: "Gece yoğunluğunda garsonlarımız menü dağıtmaya yetişemiyordu. EduQR sayesinde müşteriler oturur oturmaz siparişini seçiyor, servis hızımız %30 arttı.",
            rating: 5,
            avatar: "PU"
        },
        {
            name: "İşletme Sahibi",
            business: "Y Meze Evi",
            role: "Kurucu",
            quote: "Meze fiyatlarımız haftalık değişiyor. Eskiden sürekli etiket yapıştırırdık, menü kirlenirdi. Şimdi telefonumdan saniyede fiyatı değiştiriyorum, matbaa masrafım bitti.",
            rating: 5,
            avatar: "YM"
        },
        {
            name: "Restoran Yöneticisi",
            business: "Lokanta & Cafe",
            role: "Genel Müdür",
            quote: "Müşterilerimiz görselli menüyü çok beğeniyor. Sipariş vermeden önce yemeği görmeleri satışlarımızı artırdı. Artık her ürünün fotoğrafını ekleyebiliyoruz.",
            rating: 5,
            avatar: "LC"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F1C36]">
                        Müşterilerimiz <span className="text-blue-600">Ne Diyor?</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Binlerce işletme EduQR ile dijital dönüşümü tamamladı.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 leading-relaxed mb-6 italic">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {testimonial.avatar}
                                </div>

                                {/* Info */}
                                <div>
                                    <p className="font-bold text-[#0F1C36]">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    <p className="text-sm text-blue-600 font-medium">{testimonial.business}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                </div>
            </div>
        </section>
    );
}
