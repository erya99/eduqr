import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-28 flex items-center justify-between">
        
        {/* --- SOL TARAF (Logo + Menü Linkleri) --- */}
        <div className="flex items-center h-full">
          
          {/* Logo Alanı */}
          <Link href="/" className="relative block h-full flex-shrink-0 mr-8 md:mr-12">
            <Image 
              src="/eduqrlogo3.png" 
              alt="EduQR Logo" 
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-auto object-contain py-2" // Logoya biraz üst/alt boşluk verdik
              priority 
            />
          </Link>

          {/* Orta Menü (Sadece PC'de görünür) */}
          <div className="hidden md:flex items-center gap-8 h-full">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium text-lg transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-600">
                Ana Sayfa
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium text-lg transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-600">
                Fiyatlandırma
            </Link>
          </div>

        </div>

        {/* --- SAĞ TARAF (Butonlar) --- */}
        <div className="flex items-center gap-3 md:gap-8">
          <SignedOut>
            <Link href="/sign-in">
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium px-3 md:px-6 text-sm md:text-lg md:h-12"
              >
                <span className="md:hidden">Giriş</span>
                <span className="hidden md:inline">Giriş Yap</span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-5 md:px-9 text-sm md:text-lg h-10 md:h-14 rounded-full shadow-md font-semibold transition-transform hover:scale-105"
              >
                <span className="md:hidden">Başla</span>
                <span className="hidden md:inline">Ücretsiz Dene</span>
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            {/* PANELE GİT BUTONU (DÜZELTİLDİ) */}
            <Link href="/admin">
              <Button 
                variant="outline" 
                // BURASI KRİTİK: 'dark:' sınıfları ile rengi zorla BEYAZ/GRİ yaptık.
                // Artık karanlık modda siyahlaşıp kaybolmayacak.
                className="
                  text-gray-700 border-gray-300 hover:bg-gray-50 
                  dark:bg-white dark:text-gray-700 dark:border-gray-300 dark:hover:bg-gray-50
                  h-10 md:h-14 px-4 md:px-8 text-sm md:text-lg rounded-full font-medium"
              >
                Panele Git
              </Button>
            </Link>
            <div className="scale-110 md:scale-125">
                <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}