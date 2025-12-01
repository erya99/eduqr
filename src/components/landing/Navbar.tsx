import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-28 flex items-center justify-between">
        
        {/* --- LOGO ALANI --- */}
        <div className="flex items-center flex-shrink-0 h-full py-2">
          <Link href="/" className="relative block h-full">
            <Image 
              src="/eduqrlogo.png" 
              alt="EduQR Logo" 
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-auto object-contain" 
              priority 
            />
          </Link>
        </div>

        {/* SAĞ TARAF (BUTONLAR) */}
        {/* Gap'i de artırdık: md:gap-8 */}
        <div className="flex items-center gap-3 md:gap-8">
          <SignedOut>
            
            {/* GİRİŞ YAP BUTONU */}
            <Link href="/sign-in">
              <Button 
                variant="ghost" 
                // Mobilde: text-sm, px-3
                // PC'de (md): text-lg (Büyük yazı), px-6 (Geniş), h-12 (Yüksek)
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium px-3 md:px-6 text-sm md:text-lg md:h-12"
              >
                <span className="md:hidden">Giriş</span>
                <span className="hidden md:inline">Giriş Yap</span>
              </Button>
            </Link>

            {/* ÜCRETSİZ DENE BUTONU */}
            <Link href="/sign-up">
              <Button 
                // Mobilde: h-10, px-5, text-sm
                // PC'de (md): h-14 (Daha yüksek), px-9 (Daha geniş), text-lg (Büyük yazı)
                className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-5 md:px-9 text-sm md:text-lg h-10 md:h-14 rounded-full shadow-md font-semibold transition-transform hover:scale-105"
              >
                <span className="md:hidden">Başla</span>
                <span className="hidden md:inline">Ücretsiz Dene</span>
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            {/* PANELE GİT BUTONU (Giriş Yapmışsa) */}
            <Link href="/admin">
              <Button 
                variant="outline" 
                // PC'de (md): h-14, px-8, text-lg
                className="text-gray-700 border-gray-300 hover:bg-gray-50 h-10 md:h-14 px-4 md:px-8 text-sm md:text-lg rounded-full font-medium"
              >
                Panele Git
              </Button>
            </Link>
            
            {/* User Avatarı PC'de biraz daha büyük */}
            <div className="scale-110 md:scale-125">
                <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}