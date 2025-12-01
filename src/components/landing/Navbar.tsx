import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image"; // Image bileşenini ekledik

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* --- LOGO ALANI (GÜNCELLENDİ) --- */}
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src="/eduqrlogo2.png" 
              alt="EduQR Logo" 
              width={150} // Genişliği logonun oranına göre artırıp azaltabilirsin
              height={50} 
              className="object-contain h-18 w-18" // Yüksekliği navbar'a sığdırır, genişlik otomatik ayarlanır
              priority // Sayfa açılır açılmaz yüklensin
            />
          </Link>
        </div>

        {/* SAĞ TARAF (Giriş Butonları) */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">Giriş Yap</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0">Ücretsiz Dene</Button>
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