import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-all">
      {/* DÜZELTME 1: Navbar yüksekliği ayarlandı.
         h-20 (80px) -> Mobil için ideal
         md:h-24 (96px) -> PC için daha ferah ve büyük
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
        
        {/* --- LOGO ALANI (MOBİL VE PC İÇİN ÖZEL AYARLANDI) --- */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="relative">
            {/* ATOM BOMBASI YÖNTEMİ: Kapsayıcı Kutu
                Burada logoya kesin boyutlar veriyoruz.
                
                Mobilde: w-48 (192px genişlik), h-14 (56px yükseklik)
                PC'de (md:): w-72 (288px genişlik!), h-20 (80px yükseklik!)
            */}
            <div className="relative w-48 h-14 md:w-72 md:h-20 transition-all">
                <Image 
                  src="/eduqrlogo2.png" 
                  alt="EduQR Logo" 
                  fill // Kutuyu tamamen doldur
                  // object-contain: Resmin orantısını bozmadan kutuya sığdır (Kutu zaten büyük olduğu için logo da büyüyecek)
                  // object-left: Logoyu sola yasla
                  className="object-contain object-left"
                  priority 
                />
            </div>
          </Link>
        </div>

        {/* SAĞ TARAF (Giriş Butonları) */}
        {/* Mobilde butonlar çok sıkışmasın diye gap-2, PC'de gap-4 */}
        <div className="flex items-center gap-2 md:gap-4">
          <SignedOut>
            <Link href="/sign-in">
              {/* Mobilde "Giriş", PC'de "Giriş Yap" yazsın diye ufak bir trick */}
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-2 md:px-4">
                <span className="md:hidden">Giriş</span>
                <span className="hidden md:inline">Giriş Yap</span>
              </Button>
            </Link>
            <Link href="/sign-up">
               {/* Mobilde "Dene", PC'de "Ücretsiz Dene" */}
              <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-3 md:px-4">
                <span className="md:hidden">Dene</span>
                <span className="hidden md:inline">Ücretsiz Dene</span>
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/admin">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">Panele Git</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}