import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 transition-all">
      {/* Navbar yüksekliği artırıldı - logo için daha fazla alan */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 md:h-28 flex items-center justify-between">
        
        {/* --- LOGO ALANI (DAHA BÜYÜK) --- */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="relative block">
            {/* 
              Logo boyutları önemli ölçüde artırıldı:
              - Mobilde: 200px genişlik, 70px yükseklik
              - PC'de: 260px genişlik, 90px yükseklik
            */}
            <div className="relative w-[200px] h-[70px] md:w-[260px] md:h-[90px]">
                <Image 
                  src="/eduqrlogo.png" 
                  alt="EduQR Logo" 
                  fill
                  className="object-contain object-left"
                  priority 
                  sizes="(max-width: 768px) 200px, 260px"
                />
            </div>
          </Link>
        </div>

        {/* SAĞ TARAF */}
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
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 rounded-full px-6">
                Panele Git
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}