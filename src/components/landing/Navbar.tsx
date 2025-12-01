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
              src="/eduqrlogo2.png" 
              alt="EduQR Logo" 
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-auto object-contain" 
              priority 
            />
          </Link>
        </div>

        {/* SAĞ TARAF (Giriş Butonları) */}
        <div className="flex items-center gap-3 md:gap-6">
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 md:px-5 text-sm md:text-base font-medium">
                <span className="md:hidden">Giriş</span>
                <span className="hidden md:inline">Giriş Yap</span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-5 md:px-7 text-sm md:text-base h-10 md:h-12 rounded-full shadow-md font-semibold transition-transform hover:scale-105">
                <span className="md:hidden">Başla</span>
                <span className="hidden md:inline">Ücretsiz Dene</span>
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/admin">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 h-10 md:h-12 px-6 rounded-full">Panele Git</Button>
            </Link>
            <div className="scale-110">
                <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}