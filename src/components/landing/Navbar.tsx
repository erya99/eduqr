import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  return (
    // dark:bg-white ile arka planı sabitliyoruz
    <nav className="border-b border-gray-200 bg-white/90 dark:bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src="/eduqrlogo3.png" 
              alt="EduQR Logo" 
              width={200}
              height={70} 
              className="object-contain h-16 w-auto"
              priority 
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <Link href="/sign-in">
              {/* dark:text-gray-700 ekledik */}
              <Button variant="ghost" className="text-gray-700 dark:text-gray-700 hover:text-gray-900 hover:bg-gray-100">Giriş Yap</Button>
            </Link>
            <Link href="/sign-up">
              {/* dark:text-white ekledik */}
              <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:text-white border-0">Ücretsiz Dene</Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/admin">
              <Button variant="outline" className="text-gray-700 dark:text-gray-700 border-gray-300 hover:bg-gray-50">Panele Git</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}