"use client"; // State kullanacağımız için Client Component yaptık

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // İkonlar

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-28 flex items-center justify-between">
        
        {/* --- SOL TARAF (Logo + PC Menü) --- */}
        <div className="flex items-center h-full">
          
          {/* Logo */}
          <Link href="/" className="relative block h-full flex-shrink-0 mr-8 md:mr-12">
            <Image 
              src="/eduqrlogo3.png" 
              alt="EduQR Logo" 
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-auto object-contain py-2" 
              priority 
            />
          </Link>

          {/* PC MENÜ (Mobilde Gizli) */}
          <div className="hidden md:flex items-center gap-8 h-full">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium text-lg transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-600">
                Ana Sayfa
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium text-lg transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-600">
                Fiyatlandırma
            </Link>
          </div>

        </div>

        {/* --- SAĞ TARAF (Butonlar + Mobil Menü İkonu) --- */}
        <div className="flex items-center gap-3 md:gap-8">
          
          {/* PC BUTONLARI (Mobilde Gizli) */}
          <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium text-lg h-12 px-6">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-9 text-lg h-14 rounded-full shadow-md font-semibold transition-transform hover:scale-105">
                  Hemen Dene
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/admin">
                <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 h-14 px-8 text-lg rounded-full font-medium">
                  Panele Git
                </Button>
              </Link>
              <div className="scale-125"><UserButton /></div>
            </SignedIn>
          </div>

          {/* MOBİL MENÜ BUTONU (Sadece Mobilde Görünür) */}
          <button 
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* --- MOBİL MENÜ İÇERİĞİ (Açılır/Kapanır) --- */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            <Link href="/" className="text-gray-700 font-medium text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                Ana Sayfa
            </Link>
            <Link href="/pricing" className="text-gray-700 font-medium text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                Fiyatlandırma
            </Link>
            
            <div className="flex flex-col gap-3 mt-2">
                <SignedOut>
                    <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-center h-12 text-base">Giriş Yap</Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white h-12 text-base">Hemen Dene</Button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <Link href="/admin" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-center h-12 text-base">Panele Git</Button>
                    </Link>
                    <div className="flex justify-center py-2">
                        <UserButton />
                    </div>
                </SignedIn>
            </div>
        </div>
      )}
    </nav>
  );
}