import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* SOL TARAF: BİLGİLER */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Bizimle İletişime Geçin</h1>
              <p className="text-lg text-gray-600">
                Sorularınız mı var? Ekibimiz size yardımcı olmak için burada. Aşağıdaki formu doldurun veya doğrudan bize ulaşın.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">E-posta</h3>
                  <p className="text-gray-600">eduxpertsqr@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Telefon</h3>
                  <p className="text-gray-600">+90 555 021 05 03</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ofis</h3>
                  <p className="text-gray-600">Efeler, Aydın / Türkiye</p>
                </div>
              </div>
            </div>
          </div>

          {/* SAĞ TARAF: FORM (Görsel Amaçlı) */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Adınız</label>
                  <Input placeholder="Ahmet" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Soyadınız</label>
                  <Input placeholder="Yılmaz" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">E-posta</label>
                <Input type="email" placeholder="ornek@sirket.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Mesajınız</label>
                <Textarea placeholder="Size nasıl yardımcı olabiliriz?" className="min-h-[120px]" />
              </div>

              <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                Mesaj Gönder
              </Button>
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}