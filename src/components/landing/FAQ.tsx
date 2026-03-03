import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
    return (
        <section className="py-24 relative overflow-hidden bg-transparent">
            {/* Global background handles the visuals now */}

            <div className="container mx-auto px-4 max-w-3xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F1C36] mb-12">
                    Aklınıza Takılanlar
                </h2>

                <Accordion type="single" collapsible className="w-full space-y-4">

                    <AccordionItem value="item-1" className="border border-gray-100 rounded-[1.5rem] px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <AccordionTrigger className="text-lg font-semibold text-[#0F1C36] hover:text-blue-600 hover:no-underline py-6">
                            QR menü nasıl yapılır?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-500 text-base pb-6 leading-relaxed">
                            Çok basit! Üye olduktan sonra menü ürünlerinizi, fiyatlarını ve varsa fotoğraflarını sisteme giriyorsunuz. Sistem size özel bir QR kod oluşturuyor. Bu kodu masalara yapıştırmanız yeterli. Müşterileriniz kamerayı okutarak menünüze ulaşıyor.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border border-gray-100 rounded-[1.5rem] px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <AccordionTrigger className="text-lg font-semibold text-[#0F1C36] hover:text-blue-600 hover:no-underline py-6">
                            Bakanlık denetimine uygun mu?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-500 text-base pb-6 leading-relaxed">
                            Kesinlikle! Ticaret Bakanlığı'nın Fiyat Etiketi Yönetmeliği'ne göre dijital menü kullanımı yasaldır ve geçerlidir. Önemli olan fiyatların tüketici tarafından kolayca görülebilir olmasıdır. EduQR ile fiyatlarınız her zaman güncel ve erişilebilir olur.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border border-gray-100 rounded-[1.5rem] px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <AccordionTrigger className="text-lg font-semibold text-[#0F1C36] hover:text-blue-600 hover:no-underline py-6">
                            İnternetim çekmezse ne olur?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-500 text-base pb-6 leading-relaxed">
                            EduQR bulut tabanlı bir sistemdir ve çok düşük internet hızlarında bile hızlıca açılacak şekilde optimize edilmiştir. Müşterilerinizin telefonunda internet olması yeterlidir.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border border-gray-100 rounded-[1.5rem] px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <AccordionTrigger className="text-lg font-semibold text-[#0F1C36] hover:text-blue-600 hover:no-underline py-6">
                            Fiyatları değiştirmek zor mu?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-500 text-base pb-6 leading-relaxed">
                            Hayır, WhatsApp'tan mesaj atar gibi kolaydır. Telefonunuzdan yönetim paneline girip saniyeler içinde fiyatı güncelleyebilirsiniz. Anında menüye yansır.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="border border-gray-100 rounded-[1.5rem] px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <AccordionTrigger className="text-lg font-semibold text-[#0F1C36] hover:text-blue-600 hover:no-underline py-6">
                            Aylık ücret var mı?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-500 text-base pb-6 leading-relaxed">
                            Evet, eduQR abonelik bazlı çalışır. Farklı paketlerimiz var ve ihtiyacınıza göre seçim yapabilirsiniz. Detaylı fiyatlandırma için Fiyatlandırma sayfamızı ziyaret edebilir veya bizimle iletişime geçebilirsiniz.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6" className="border border-gray-100 rounded-[1.5rem] px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <AccordionTrigger className="text-lg font-semibold text-[#0F1C36] hover:text-blue-600 hover:no-underline py-6">
                            Kaç ürün ekleyebilirim?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-500 text-base pb-6 leading-relaxed">
                            Sınırsız! İstediğiniz kadar kategori ve ürün ekleyebilirsiniz. Küçük bir kafeden büyük bir restorana kadar her işletme boyutuna uygun çözümlerimiz var.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7" className="border border-gray-100 rounded-[1.5rem] px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <AccordionTrigger className="text-lg font-semibold text-[#0F1C36] hover:text-blue-600 hover:no-underline py-6">
                            Kurulum ne kadar sürer?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-500 text-base pb-6 leading-relaxed">
                            Çok hızlı! Üye olduktan sonra menünüzü 15-30 dakika içinde hazırlayabilir ve QR kodunuzu oluşturabilirsiniz. Aynı gün kullanmaya başlayabilirsiniz. Teknik bilgiye gerek yok, her şey kullanıcı dostu arayüzümüzle çok basit.
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </section>
    );
}

