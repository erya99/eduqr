import { AlertTriangle, TrendingUp, Banknote, Zap } from "lucide-react";

export default function PainPoints() {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Global background handles visuals */}

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F1C36]">
            Neden <span className="text-blue-600">EduQR?</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            İşletmenizi modernleştiren, maliyetleri düşüren teknoloji.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

          {/* Kart 1: Geniş - Banknote */}
          <div className="md:col-span-4 group relative overflow-hidden p-10 rounded-[2rem] bg-white border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
              <Banknote className="w-48 h-48 text-blue-900 rotate-12" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <Banknote className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0F1C36] mb-3">Sürekli Artan Maliyetlere Son</h3>
                <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                  Her fiyat değişikliğinde matbaaya binlerce lira ödemeyin. Dijital menü ile maliyetlerinizi kalıcı olarak sıfırlayın.
                </p>
              </div>
            </div>
          </div>

          {/* Kart 2: Dar - Ceza Riski - ÖNE ÇIKARILDI */}
          <div className="md:col-span-2 group relative overflow-hidden p-10 rounded-[2rem] bg-gradient-to-br from-white to-orange-50 border-2 border-orange-200 shadow-xl shadow-orange-500/10 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:-translate-y-1">
            <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              ZORUNLU
            </div>

            <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle className="w-32 h-32 text-orange-500" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F1C36] mb-3">Yasal Uyum & Alerjen</h3>
                <p className="text-gray-600 text-lg">
                  Fiyat Etiketi ve <span className="font-bold text-orange-600">Alerjen Bildirimi</span> yönetmeliklerine %100 uyumlu. <span className="font-bold text-[#0F1C36] underline decoration-orange-400 decoration-2 underline-offset-2">Cezalardan korunun.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Kart 3: Tam Genişlik - Prestij */}
          <div className="md:col-span-6 group relative overflow-hidden p-10 rounded-[2rem] bg-[#0F1C36] text-white shadow-xl shadow-blue-900/20 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-center gap-12">
            {/* Background Gradient for Dark Card */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex-1 space-y-4 text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-sm font-medium border border-white/10">
                <Zap className="w-4 h-4" />
                <span>Premium Deneyim</span>
              </div>
              <h3 className="text-3xl font-bold text-white">Prestijinizi Koruyun</h3>
              <p className="text-blue-100/70 text-lg leading-relaxed max-w-2xl">
                Üst üste yapıştırılmış etiketler ve karalanmış fiyatlar müşterilerinizin gözünde mekanınızın kalitesini düşürür. EduQR ile her zaman pırıl pırıl, güncel ve profesyonel görünün.
              </p>
            </div>

            {/* Dekoratif Görsel Temsili */}
            <div className="flex-1 w-full flex justify-center items-center relative z-10">
              <div className="relative w-full max-w-sm h-48 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-2" />
                  <span className="text-white/60 font-mono text-sm">Müşteri Deneyimi Grafiği</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
