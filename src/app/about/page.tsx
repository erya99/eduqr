import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Target, Users, Lightbulb, Award } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-[#F8FAFC]">
            {/* GLOBAL BACKGROUND MESH */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
                {/* Top Right Blob (Blue/Navy) */}
                <div className="absolute top-[-10%] right-[-10%] w-[900px] h-[900px] bg-[#0F1C36]/30 rounded-full blur-[120px]" />

                {/* Middle Left Blob (Warm Gold/Bronze) */}
                <div className="absolute top-[30%] left-[-10%] w-[700px] h-[700px] bg-[#D4A373]/35 rounded-full blur-[100px] mix-blend-multiply" />

                {/* Bottom Right Blob (Blue) */}
                <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-100/60 rounded-full blur-[120px]" />

                {/* Additional Navy Accent */}
                <div className="absolute top-[60%] right-[20%] w-[500px] h-[500px] bg-[#0F1C36]/25 rounded-full blur-[100px]" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-[#0F1C36] mb-6">
                            Hakkımızda
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Restoran ve kafe işletmelerini dijital dünyaya taşıyan, müşteri deneyimini yeniden tanımlayan bir teknoloji şirketiyiz.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-16 bg-transparent">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Mission */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                    <Target className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-[#0F1C36] mb-4">Misyonumuz</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Restoran ve kafe işletmelerinin dijital dönüşümünü kolaylaştırarak, müşteri memnuniyetini artırmak ve işletmelerin verimliliğini maksimize etmek. Her işletmenin bütçesine uygun, kullanımı kolay ve etkili çözümler sunmak.
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                                    <Lightbulb className="w-8 h-8 text-amber-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-[#0F1C36] mb-4">Vizyonumuz</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Türkiye'nin en çok tercih edilen dijital menü ve restoran yönetim platformu olmak. Teknoloji ile gastronomi sektörünü birleştirerek, her masada unutulmaz bir deneyim yaratmak.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-16 bg-transparent">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
                            <h2 className="text-4xl font-bold text-[#0F1C36] mb-8 text-center">Neden eduQR?</h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Restoran ve kafe sahiplerinin karşılaştığı gerçek sorunları çözmek için yola çıktık. Sürekli değişen fiyatlar, menü baskı maliyetleri, müşterilerin modern deneyim beklentisi... Tüm bunlar işletme sahiplerini zorluyor.
                                </p>
                                <p>
                                    Teknoloji ve gastronomi sektörü deneyimini birleştirerek, sadece QR menü değil, işletmelerin tüm dijital ihtiyaçlarını karşılayan yeni nesil bir platform geliştirdik. Kullanımı kolay, uygun fiyatlı ve gerçekten işe yarayan çözümler sunuyoruz.
                                </p>
                                <p>
                                    Amacımız net: Her işletme sahibinin bütçesine uygun, dakikalar içinde kurulabilen, müşteri memnuniyetini artıran ve maliyetleri düşüren profesyonel bir dijital menü sistemini herkesin kullanımına sunmak.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Responsibility Section - NEW */}
                <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 border-y border-blue-100 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

                    <div className="container mx-auto px-4 max-w-6xl relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-blue-600 text-sm font-bold shadow-sm mb-6 border border-white/20">
                                    <span className="text-lg">❤️</span> Sosyal Sorumluluk
                                </div>
                                <h2 className="text-4xl font-bold text-[#0F1C36] mb-6">
                                    Teknolojimizle İşletmeleri, <br />
                                    <span className="text-blue-600">Kalbimizle Eğitimi</span> Destekliyoruz
                                </h2>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    EduQR olarak sadece ticari bir büyüme hedeflemiyoruz; toplumsal faydayı da işimizin merkezine koyuyoruz. Bu yüzden <strong>"Eğitim Dostu İşletme"</strong> hareketini başlattık.
                                </p>
                                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                    Yıllık abonelik gelirlerimizin bir kısmını, ülkemizin köklü eğitim kurumlarından <strong>Darüşşafaka Cemiyeti</strong>'ne bağışlayarak, eğitimde fırsat eşitliğine katkıda bulunuyoruz. EduQR kullanan her işletme, aslında bir çocuğun geleceğine ışık tutuyor.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="bg-white/40 p-4 rounded-2xl border border-white/20 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100/80 rounded-full flex items-center justify-center text-green-600">
                                            <span className="text-xl">🌱</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">Düzenli Bağış</div>
                                            <div className="text-sm text-gray-500">Her yıl tekrarlanır</div>
                                        </div>
                                    </div>
                                    <div className="bg-white/40 p-4 rounded-2xl border border-white/20 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-100/80 rounded-full flex items-center justify-center text-amber-600">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">Resmi Belge</div>
                                            <div className="text-sm text-gray-500">Bağış makbuzu iletilir</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visual/Quote */}
                            <div className="relative">
                                {/* Removed white card background wrapper */}
                                <div className="p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500 relative">
                                    {/* Keeping visual elements but without the heavy white box */}
                                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white z-20">
                                        <Target className="w-10 h-10" />
                                    </div>

                                    <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/40 shadow-lg">
                                        <blockquote className="text-xl font-medium text-gray-800 text-center italic mt-4 mb-6">
                                            "Bir çocuğu eğitmek, o çocuğun tüm dünyasını ve geleceğini değiştirmektir."
                                        </blockquote>

                                        <div className="h-px w-full bg-gray-200/50 mb-6" />

                                        <div className="flex items-center justify-center gap-4">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-blue-600">Darüşşafaka</div>
                                                <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mt-1">Eğitimde Fırsat Eşitliği</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Background Blob for Visual - reduced opacity */}
                                <div className="absolute inset-0 bg-blue-600/5 rounded-[2.5rem] transform -rotate-3 z-[-1] blur-xl" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 bg-transparent">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <h2 className="text-4xl font-bold text-[#0F1C36] mb-12 text-center">Değerlerimiz</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Value 1 */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-[#0F1C36] mb-3">Müşteri Odaklılık</h3>
                                <p className="text-gray-600">
                                    Müşterilerimizin başarısı bizim başarımızdır. Her geri bildirimi dinler, sürekli gelişiriz.
                                </p>
                            </div>

                            {/* Value 2 */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <Lightbulb className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-[#0F1C36] mb-3">İnovasyon</h3>
                                <p className="text-gray-600">
                                    Sektörün ihtiyaçlarını öngörür, yenilikçi çözümler geliştiririz.
                                </p>
                            </div>

                            {/* Value 3 */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <Award className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-[#0F1C36] mb-3">Kalite</h3>
                                <p className="text-gray-600">
                                    Her detayda mükemmelliği hedefler, güvenilir ve profesyonel hizmet sunarız.
                                </p>
                            </div>

                            {/* Value 4 */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                    <Target className="w-6 h-6 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-bold text-[#0F1C36] mb-3">Şeffaflık</h3>
                                <p className="text-gray-600">
                                    Açık iletişim, net fiyatlandırma ve dürüst iş ilişkileri kurarız.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                <Footer />
            </div >
        </main >
    );
}
