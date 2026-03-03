import { ShieldCheck, Clock, Zap } from "lucide-react";

export default function SocialProof() {
    return (
        <section className="py-24 relative bg-transparent">
            {/* Global background handles the visuals now */}

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[#0F1C36]">
                        Neden Bize <span className="text-blue-600">Güvenmelisiniz?</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">

                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-10 rounded-[2rem] bg-white border border-gray-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Zap className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F1C36] mb-4">Işık Hızında</h3>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Bulut tabanlı altyapımız sayesinde menünüz her zaman yayında. QR kodlarınız milisaniyeler içinde açılır.
                        </p>
                    </div>

                    <div className="p-10 rounded-[2rem] bg-white border border-gray-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto text-green-600 mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Clock className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F1C36] mb-4">7/24 Destek</h3>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Teknolojiyle aranız iyi olmayabilir. Sorun değil! WhatsApp destek hattımızdan bize her an ulaşabilirsiniz.
                        </p>
                    </div>

                    <div className="p-10 rounded-[2rem] bg-white border border-gray-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-500">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F1C36] mb-4">%100 Yasal</h3>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Sistemimiz Ticaret Bakanlığı'nın Fiyat Etiketi Yönetmeliği'ne tam uyumludur. Gönül rahatlığıyla kullanın.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
