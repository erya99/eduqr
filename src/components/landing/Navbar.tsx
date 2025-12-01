import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  return (
    // Navbar yüksekliğini artırdık: Mobilde h-24 (96px), PC'de h-28 (112px)
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 md:h-28 flex items-center justify-between">
        
        {/* --- LOGO ALANI (DEVASA MOD) --- */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="relative block">
            {/* KAPSAYICI KUTU BOYUTLARI:
               Mobil: w-[200px] genişlik, h-[60px] yükseklik
               PC: w-[300px] genişlik, h-[80px] yükseklik
               
               Eğer hala küçük gelirse buradaki [300px] değerini [400px] yapabilirsin.
            */}
            <div className="relative w-[200px] h-[60px] md:w-[300px] md:h-[80px]">
                <Image 
                  src="/eduqrlogo.png" 
                  alt="EduQR Logo" 
                  fill
                  // object-contain: Resmi kutuya sığdırır ama kesmez.
                  // object-left: Resmi sola yaslar.
                  className="object-contain object-left"
                  priority 
                  sizes="(max-width: 768px) 200px, 300px"
                />
            </div>
          </Link>
        </div>

        {/* SAĞ TARAF (Giriş Butonları) */}
        <div className="flex items-center gap-2 md:gap-4">
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 md:px-5 text-sm md:text-base">
                <span className="md:hidden">Giriş</span>
                <span className="hidden md:inline">Giriş Yap</span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-4 md:px-6 text-sm md:text-base h-10 md:h-12 rounded-lg shadow-md">
                <span className="md:hidden">Başla</span>
                <span className="hidden md:inline">Ücretsiz Dene</span>
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/admin">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 h-10 md:h-12">Panele Git</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}