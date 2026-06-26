'use client';

import { Shield, Smartphone, Users, Info } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

const Card = ({
  children,
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    custom={index}
    className={`relative rounded-3xl border border-[#0F1C36]/8 bg-white p-6 overflow-hidden group hover:shadow-lg transition-all duration-500 ${className}`}
  >
    {children}
  </motion.div>
);

const IconBadge = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="flex aspect-square size-11 rounded-2xl border border-[#0F1C36]/15 bg-[#0F1C36]/6 items-center justify-center mb-5">
    <Icon className="size-5 text-[#0F1C36]" strokeWidth={1.5} />
  </div>
);

export default function FeaturedFeatures() {
  return (
    <section className="pt-4 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="mx-auto max-w-6xl flex flex-col gap-12 md:gap-16">

          {/* Başlık */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-2xl text-center md:text-left mx-auto md:mx-0"
          >
            <p className="text-sm font-semibold text-[#0F1C36]/50 uppercase tracking-widest mb-3">Öne Çıkan</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#0F1C36]">
              İşletmenizi Koruyan{" "}
              <em className="not-italic text-[#0F1C36]/50">Özellikler</em>
            </h2>
            <p className="mt-4 text-lg text-[#0F1C36]/60">
              Rakiplerinizden sıyrılmanızı sağlayan, işletmenizi koruyan ve müşterilerinizi mutlu eden çözümler.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            <Card className="col-span-full lg:col-span-2" index={0}>
              <IconBadge icon={Shield} />
              <h3 className="text-lg font-bold text-[#0F1C36] mb-2">Kötü Yorumlar Önce Size Gelsin</h3>
              <p className="text-[#0F1C36]/60 leading-relaxed text-sm">
                Müşteri memnun değilse, Google'a yazmadan önce size haber versin. Sorunu masada çözün, puanınız düşmesin.
              </p>
            </Card>

            <Card className="col-span-full lg:col-span-3" index={1}>
              <div className="flex flex-col sm:flex-row h-full gap-6">
                <div className="flex flex-col justify-between">
                  <IconBadge icon={Smartphone} />
                  <div>
                    <h3 className="text-lg font-bold text-[#0F1C36] mb-2">Saniyeler İçinde Fiyat Güncelleme</h3>
                    <p className="text-[#0F1C36]/60 leading-relaxed text-sm max-w-xs">
                      Kasada 100 TL, menüde 80 TL riskine son. Fiyatları telefondan güncelleyin, her yerde anında değişsin.
                    </p>
                  </div>
                </div>
                <div className="relative flex-1 min-h-[180px] rounded-2xl overflow-hidden border border-[#0F1C36]/8">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
                    alt="Dashboard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>

            <Card className="col-span-full lg:col-span-3" index={2}>
              <div className="grid sm:grid-cols-2 gap-6 h-full">
                <div className="flex flex-col justify-between">
                  <IconBadge icon={Users} />
                  <div>
                    <h3 className="text-lg font-bold text-[#0F1C36] mb-2">Müşterileriniz Uygulamaya Bayılacak</h3>
                    <p className="text-[#0F1C36]/60 leading-relaxed text-sm">
                      Hızlı açılan menü ve eğlenceli Çark Çevir modülüyle müşterilerinize eşsiz bir deneyim sunun.
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col justify-center space-y-4 pl-4 border-l border-[#0F1C36]/8">
                  {[
                    { label: "Kahve Dükkanı", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=60&h=60&fit=crop" },
                    { label: "Fine Dining", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=60&h=60&fit=crop" },
                    { label: "Fast Food", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=60&h=60&fit=crop" },
                  ].map((item, i) => (
                    <div key={item.label} className={`flex items-center gap-2 ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                      <span className="px-2 py-1 rounded-lg border border-[#0F1C36]/10 bg-[#F5F0E8] text-xs text-[#0F1C36] font-medium">{item.label}</span>
                      <div className="size-8 rounded-full overflow-hidden ring-2 ring-[#0F1C36]/10">
                        <img src={item.img} alt={item.label} className="size-full object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="col-span-full lg:col-span-2" index={3}>
              <IconBadge icon={Info} />
              <h3 className="text-lg font-bold text-[#0F1C36] mb-2">Yasal Zorunluluklar Cepte</h3>
              <p className="text-[#0F1C36]/60 leading-relaxed text-sm mb-4">
                Alerjen bildirimlerini kolayca yapın. Müşterileriniz içerikleri görsün, işletmeniz güvende kalsın.
              </p>
              <div className="relative h-36 -mx-6 -mb-6 overflow-hidden rounded-b-3xl">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
                  className="w-full h-full object-cover"
                  alt="Restaurant POS"
                />
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}
