import { Button } from "@/components/ui/button";
import { Check, XSquare } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
    return (
        <section className="py-24 relative bg-transparent">
            {/* Global background handles the visuals now */}

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-extrabold text-[#0F1C36] mb-6">
                        Günde Sadece 1 Çay Parasına
                    </h2>
                    <p className="text-xl text-gray-500 mb-8">
                        Matbaa masraflarını unutun. Yıllık abonelik ile sınırsız özgürlüğe kavuşun.
                    </p>

                    <div className="inline-block bg-white rounded-full px-6 py-2 shadow-sm border border-blue-100 text-blue-600 font-semibold mb-8">
                        🔥 Yıllık Sadece 2.500 TL (Ayda ~208 TL)
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                    {/* Eski Yöntem (Matbaa) */}
                    <div className="bg-white/50 p-10 rounded-[2rem] border border-gray-200 opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">Klasik Matbaa Menü</h3>
                        <div className="text-4xl font-bold text-gray-300 mb-6">~10.000 TL<span className="text-lg font-normal text-gray-400">/yıl</span></div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-400">
                                <XSquare className="w-5 h-5 text-red-300" /> Her güncellemede baskı ücreti
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <XSquare className="w-5 h-5 text-red-300" /> Fiyat değişimi için bekleme süresi
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <XSquare className="w-5 h-5 text-red-300" /> Yıpranan menüleri yenileme derdi
                            </li>
                        </ul>
                    </div>

                    {/* Yeni Yöntem (EduQR) */}
                    <div className="bg-white p-10 rounded-[2rem] border-2 border-[#0F1C36] shadow-2xl shadow-blue-900/10 relative transform scale-105 z-10 hover:scale-[1.07] transition-transform duration-300">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0F1C36] text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                            🎓 EĞİTİM DESTEKLİ AVANTAJLI PAKET
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F1C36] mb-2">EduQR Dijital Menü</h3>
                        <div className="text-5xl font-bold text-blue-600 mb-2">2.500 TL<span className="text-lg font-normal text-gray-500">/yıl</span></div>

                        {/* Nudge: Scholarship Contribution */}
                        <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-3 text-center">
                            <p className="text-sm text-blue-800 font-medium">
                                "Hesabı İyilikle Ödeyin"
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                                Sizin adınıza Darüşşafaka'da bir öğrencinin eğitim bursuna katkıda bulunuyoruz.
                            </p>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-700 font-medium">
                                <Check className="w-6 h-6 text-green-500" /> Sınırsız fiyat & ürün güncelleme
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium">
                                <Check className="w-6 h-6 text-green-500" /> Matbaa ve kağıt masrafı YOK
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium">
                                <Check className="w-6 h-6 text-green-500" /> 7/24 Teknik Destek
                            </li>
                            {/* Feature: Tax Benefit with Leaf Icon */}
                            <li className="flex items-start gap-3 text-gray-700 font-medium bg-green-50/50 p-2 rounded-lg -mx-2">
                                <span className="text-xl leading-none">🌱</span>
                                <span className="text-sm">Şeffaf ve güvenilir. Bağış makbuzunuzu <span className="font-bold text-green-700">WhatsApp'tan iletiyoruz.</span></span>
                            </li>
                        </ul>

                        <Link href="/sign-up" className="block">
                            <Button size="lg" className="w-full text-lg h-14 bg-[#0F1C36] hover:bg-blue-900 text-white rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:shadow-blue-900/30">
                                Yıllık Avantajla Başla
                            </Button>
                        </Link>

                        {/* Trust Slogan */}
                        <div className="mt-4 text-center">
                            <p className="text-sm font-bold text-[#0F1C36]">
                                ✨ İşletmeniz artık tescilli bir "Eğitim Dostu Mekan".
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
