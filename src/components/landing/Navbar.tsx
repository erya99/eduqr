import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 transition-all">
      {/* Navbar yüksekliğini h-20 (80px) olarak sabitledik. Hem mobil hem PC için ideal. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* --- LOGO ALANI (GARANTİLİ YÖNTEM) --- */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="relative block">
            {/* Kapsayıcı Kutuya SABİT boyut veriyoruz.
                Mobilde: 150px genişlik, 50px yükseklik
                PC'de: 180px genişlik, 60px yükseklik
                Bu sayede logo asla küçülmeyecek.
            */}
            <div className="relative w-[150px] h-[50px] md:w-[180px] md:h-[60px]">
                <Image 
                  src="/eduqrlogo.png" 
                  alt="EduQR Logo" 
                  fill
                  // object-contain: Resmin orantısını bozmadan kutuya sığdır.
                  // object-left: Sola yasla.
                  className="object-contain object-left"
                  priority 
                  sizes="(max-width: 768px) 150px, 180px"
                />
            </div>
          </Link>
        </div>

        {/* SAĞ TARAF (Butonlar biraz daha kibarlaştırıldı) */}
        <div className="flex items-center gap-3 md:gap-4">
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium">
                Giriş Yap
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-full shadow-sm font-semibold px-6">
                Ücretsiz Dene
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/admin">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 rounded-full px-6">Panele Git</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}