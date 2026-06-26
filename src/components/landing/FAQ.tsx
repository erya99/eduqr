"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const faqs = [
    { q: "QR menü nasıl yapılır?", a: "Üye olduktan sonra menü ürünlerinizi, fiyatlarınızı ve varsa fotoğraflarını sisteme giriyorsunuz. Sistem size özel bir QR kod oluşturuyor. Bu kodu masalara yapıştırmanız yeterli." },
    { q: "Bakanlık denetimine uygun mu?", a: "Evet. Tarım ve Orman Bakanlığı'nın yeni menü etiketleme yönetmeliğine göre kalori ve 14 alerjen bildirimi zorunlu. EduQR bu bilgileri menünüze otomatik olarak entegre eder." },
    { q: "İnternetim çekmezse ne olur?", a: "EduQR bulut tabanlıdır ve düşük internet hızlarında da çalışacak şekilde optimize edilmiştir. Müşterilerinizin telefonunda internet bağlantısı olması yeterlidir." },
    { q: "Fiyatları değiştirmek zor mu?", a: "Telefonunuzdan yönetim paneline girip saniyeler içinde fiyat güncelleyebilirsiniz. Değişiklik anında menüye yansır." },
    { q: "Ücretlendirme nasıl çalışıyor?", a: "EduQR yıllık 2.500 TL + KDV abonelikle çalışır. İlk ayınız ücretsiz — kredi kartı gerekmez, istediğiniz zaman iptal edebilirsiniz." },
    { q: "Kaç ürün ekleyebilirim?", a: "Sınırsız. İstediğiniz kadar kategori ve ürün ekleyebilirsiniz." },
    { q: "Kurulum ne kadar sürer?", a: "Üye olduktan sonra menünüzü 15-30 dakika içinde hazırlayabilirsiniz. Teknik bilgiye gerek yok." },
];

export default function FAQ() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
    const cardY = useTransform(scrollYProgress, [0, 1], ["80px", "0px"]);

    return (
        <section ref={sectionRef} className="bg-[#F5F0E8] pb-10 px-3 md:px-5">
            <motion.div
                style={{ y: cardY }}
                className="rounded-[1.5rem] md:rounded-[2rem] bg-[#0F1C36] overflow-hidden py-24"
            >
                <div className="container mx-auto px-4 max-w-3xl relative z-10">
                    <motion.h2
                        className="font-serif text-3xl md:text-4xl font-bold text-left md:text-center text-white mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Aklınıza Takılanlar
                    </motion.h2>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                            >
                            <AccordionItem
                                value={`item-${i}`}
                                className="border border-white/10 rounded-[1.5rem] px-6 bg-white/5 hover:bg-white/10 transition-colors duration-200"
                            >
                                <AccordionTrigger className="text-lg font-semibold text-white hover:text-blue-300 hover:no-underline py-6">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-white/60 text-base pb-6 leading-relaxed">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>
            </motion.div>
        </section>
    );
}
