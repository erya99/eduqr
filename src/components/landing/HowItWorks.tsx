import { Mail, Package, QrCode, Printer } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            icon: Mail,
            title: "Mail ile Panele Girin",
            description: "Hızlıca kayıt olun ve yönetim panelinize giriş yapın. Hiçbir teknik bilgi gerekmez.",
            color: "blue"
        },
        {
            number: "02",
            icon: Package,
            title: "Ürünlerinizi Ekleyin",
            description: "Menü öğelerinizi, fiyatları ve iştah açıcı görselleri kolayca yükleyin.",
            color: "indigo"
        },
        {
            number: "03",
            icon: QrCode,
            title: "QR Kodunuzu Oluşturun",
            description: "Paneldeki 'QR Oluştur' butonuna tıklayın. QR kodunuz anında hazır! Menüde değişiklik yaptığınızda QR'ı değiştirmenize gerek yok, otomatik güncellenir.",
            color: "purple"
        },
        {
            number: "04",
            icon: Printer,
            title: "QR'ı Çıkarın ve Masaya Koyun",
            description: "QR kodunuzu yazdırın veya dijital olarak gösterin. Müşterileriniz tarayıp sipariş vermeye başlasın.",
            color: "blue"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F1C36]">
                        Nasıl <span className="text-blue-600">Çalışır?</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        4 basit adımda dijital menünüz hazır. Dakikalar içinde başlayın.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connection Lines (Desktop) */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 -z-10" />

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* Card */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 h-full border border-gray-100 hover:border-blue-200">
                                {/* Number Badge */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-${step.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-[#0F1C36] mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Arrow (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-24 -right-4 text-blue-300">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                </div>
            </div>
        </section>
    );
}
