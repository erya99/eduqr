import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            Q
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">QR Menü</span>
        </div>

        {/* SAĞ TARAF (Giriş Butonları) */}
        <div className="flex items-center gap-4">
          <SignedOut>
            {/* Giriş yapmamışsa bunları göster */}
            <Link href="/sign-in">
              <Button variant="ghost">Giriş Yap</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-blue-600 hover:bg-blue-700">Ücretsiz Dene</Button>
            </Link>
          </SignedOut>

          <SignedIn>
            {/* Zaten giriş yapmışsa Panele Git butonu göster */}
            <Link href="/admin">
              <Button variant="outline">Panele Git</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}