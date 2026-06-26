import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F1C36] text-white">
      <div className="container mx-auto px-4 py-10 md:py-14">

        {/* Mobil: 2 sütun grid / Desktop: 4 sütun */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-8">

          {/* Logo */}
          <div>
            <h3 className="text-lg font-bold mb-1.5">EduQR</h3>
            <p className="text-white/45 text-xs leading-relaxed mb-3 hidden sm:block">
              Restoran ve kafeleri dijital dünyaya taşıyan QR menü platformu.
            </p>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/eduqr.tr?igsh=MWM3a3JxbjZnOWI2Mw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.linkedin.com/company/110583473/" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Sayfalar */}
          <div>
            <h4 className="text-xs font-semibold text-white/35 uppercase tracking-wider mb-2.5">Sayfalar</h4>
            <ul className="space-y-1.5">
              {[
                { label: "Ana Sayfa", href: "/" },
                { label: "Özellikler", href: "/features" },
                { label: "Fiyatlandırma", href: "/pricing" },
                { label: "Hakkımızda", href: "/about" },
                { label: "İletişim", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/55 hover:text-white transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h4 className="text-xs font-semibold text-white/35 uppercase tracking-wider mb-2.5">Yasal</h4>
            <ul className="space-y-1.5">
              {[
                { label: "Gizlilik", href: "/legal/privacy" },
                { label: "Kullanım Şartları", href: "/legal/terms" },
                { label: "KVKK", href: "/legal/privacy" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/55 hover:text-white transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-xs font-semibold text-white/35 uppercase tracking-wider mb-2.5">İletişim</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-white/35 flex-shrink-0" />
                <a href="mailto:eduxpertsqr@gmail.com" className="text-white/55 hover:text-white transition-colors text-xs break-all">
                  eduxpertsqr@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-white/35 flex-shrink-0" />
                <a href="tel:+905550210503" className="text-white/55 hover:text-white transition-colors text-xs">
                  +90 555 021 05 03
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-white/35 flex-shrink-0" />
                <span className="text-white/55 text-xs">Efeler, Aydın</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt çizgi */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-1.5 text-xs text-white/25">
          <p>© {new Date().getFullYear()} EduQR. eduXperts bünyesinde bir hizmettir.</p>
          <p>Made with ❤️ in Turkey</p>
        </div>
      </div>
    </footer>
  );
}
