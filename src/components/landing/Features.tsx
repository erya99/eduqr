import { Smartphone, Zap, DollarSign } from "lucide-react";

const features = [
  {
    icon: <Smartphone className="h-8 w-8 text-blue-600" />,
    title: "Tamamen Mobil Uyumlu",
    desc: "Müşterileriniz uygulama indirmeden, sadece kamerayı açarak menünüze ulaşır.",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Anında Güncelleme",
    desc: "Fiyat değişti mi? Yeni ürün mü geldi? Admin panelinden değiştirin, anında yansısın.",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-blue-600" />,
    title: "Maliyet Dostu",
    desc: "Sürekli menü bastırma derdine son. Kağıt israfını önleyin ve tasarruf edin.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Neden QR Menü?</h2>
          <p className="mt-4 text-gray-600">İşletmenizi büyütmek için ihtiyacınız olan her şey.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="mb-4 bg-white w-14 h-14 rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}