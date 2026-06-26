import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
    const blogPosts = [
        {
            title: "QR Menü Nedir? Restoranlar İçin Kapsamlı Rehber",
            excerpt: "QR menü sistemi, restoranların dijital dönüşümünde önemli bir adım. Müşterileriniz telefonlarıyla QR kodu taratarak menünüze anında ulaşabilir. Kağıt menü maliyetlerinden kurtulun, fiyat değişikliklerini saniyeler içinde yapın.",
            date: "1 Şubat 2026",
            author: "eduQR Ekibi",
            category: "Dijital Menü",
            slug: "qr-menu-nedir"
        },
        {
            title: "Restoran İşletmecileri İçin Dijitalleşme Rehberi",
            excerpt: "2026'da restoran işletmeciliği sadece lezzetli yemek yapmaktan ibaret değil. Dijital çözümlerle müşteri deneyimini geliştirin, operasyonel verimliliği artırın ve rakiplerinizin önüne geçin.",
            date: "28 Ocak 2026",
            author: "eduQR Ekibi",
            category: "Dijital Dönüşüm",
            slug: "restoran-dijitallesme"
        },
        {
            title: "QR Menü ile Müşteri Deneyimini Nasıl İyileştirebilirsiniz?",
            excerpt: "Müşterileriniz artık hızlı, kolay ve hijyenik bir menü deneyimi bekliyor. QR menü ile bekleme sürelerini azaltın, görsel zengin menüler sunun ve müşteri memnuniyetini artırın.",
            date: "25 Ocak 2026",
            author: "eduQR Ekibi",
            category: "Müşteri Deneyimi",
            slug: "musteri-deneyimi"
        },
        {
            title: "Restoran Menü Maliyetlerini %80 Azaltmanın Yolu",
            excerpt: "Kağıt menü baskı maliyetleri, sürekli değişen fiyatlar ve yıpranma... Tüm bunlar geride kaldı. QR menü ile tek seferlik yatırım yapın, sınırsız güncelleme yapın.",
            date: "22 Ocak 2026",
            author: "eduQR Ekibi",
            category: "Maliyet Tasarrufu",
            slug: "maliyet-tasarrufu"
        },
        {
            title: "2026'da Restoran Trendleri: Dijital Menüler",
            excerpt: "Pandemi sonrası dönemde dijital menüler artık bir lüks değil, zorunluluk. Müşteriler temassız, hijyenik ve modern çözümler arıyor. Sektörün geleceğini keşfedin.",
            date: "18 Ocak 2026",
            author: "eduQR Ekibi",
            category: "Sektör Trendleri",
            slug: "2026-trendleri"
        },
        {
            title: "QR Menü SEO: Google'da Üst Sıralara Çıkmanın Sırları",
            excerpt: "QR menünüz sadece müşterileriniz için değil, Google için de optimize edilmeli. Doğru SEO stratejileriyle yerel aramalarda öne çıkın, daha fazla müşteri çekin.",
            date: "15 Ocak 2026",
            author: "eduQR Ekibi",
            category: "SEO & Pazarlama",
            slug: "qr-menu-seo"
        }
    ];

    return (
        <main className="min-h-screen relative overflow-hidden bg-[#F8FAFC]">
            {/* GLOBAL BACKGROUND MESH */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[900px] h-[900px] bg-[#0F1C36]/30 rounded-full blur-[120px]" />
                <div className="absolute top-[30%] left-[-10%] w-[700px] h-[700px] bg-[#D4A373]/35 rounded-full blur-[100px] mix-blend-multiply" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-100/60 rounded-full blur-[120px]" />
                <div className="absolute top-[60%] right-[20%] w-[500px] h-[500px] bg-[#0F1C36]/25 rounded-full blur-[100px]" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-[#0F1C36] mb-6">
                            Blog & Kaynaklar
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Restoran dijitalleşmesi, QR menü sistemleri ve sektör trendleri hakkında en güncel içerikler.
                        </p>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="py-16 bg-transparent">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post, index) => (
                                <article
                                    key={index}
                                    className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                                >
                                    {/* Category Badge */}
                                    <div className="p-6 pb-0">
                                        <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full">
                                            {post.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-[#0F1C36] mb-3 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                <span>{post.author}</span>
                                            </div>
                                        </div>

                                        {/* Read More Link */}
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                                        >
                                            Devamını Oku
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-transparent">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="bg-gradient-to-r from-[#0F1C36] to-blue-900 rounded-3xl p-12 text-center text-white shadow-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Restoranınızı Dijitale Taşımaya Hazır mısınız?
                            </h2>
                            <p className="text-xl mb-8 opacity-90">
                                Ücretsiz demo için hemen iletişime geçin, size özel çözümler sunalım.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block bg-white text-[#0F1C36] font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                Hemen Başlayın
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </main>
    );
}
