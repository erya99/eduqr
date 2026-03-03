"use client"; // State kullanacağımız için Client Component yaptık

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"; // Clerk iptal
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // İkonlar

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-2 shadow-sm" : "bg-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

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
              className="h-full w-auto object-contain py-2" // Removed brightness-0 invert
              priority
            />
          </Link>

          {/* PC MENÜ (Mobilde Gizli) */}
          <div className="hidden md:flex items-center gap-8 h-full">
            <Link href="/" className="text-gray-600 hover:text-[#0F1C36] font-medium text-lg transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-600">
              Ana Sayfa
            </Link>
            <Link href="/features" className="text-gray-600 hover:text-[#0F1C36] font-medium text-lg transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-600">
              Özellikler
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-[#0F1C36] font-medium text-lg transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-600">
              Fiyatlandırma
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-[#0F1C36] font-medium text-lg transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-600">
              Hakkımızda
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-[#0F1C36] font-medium text-lg transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-600">
              İletişim
            </Link>
          </div>

        </div>

        {/* --- SAĞ TARAF (Butonlar + Mobil Menü İkonu) --- */}
        <div className="flex items-center gap-3 md:gap-8">

          {/* PC BUTONLARI (Mobilde Gizli) */}
          <div className="hidden md:flex items-center gap-4">
            {/* SignedOut Durumu (Varsayılan) */}
            <Link href="/sign-in">
              <Button variant="ghost" className="text-gray-600 hover:text-[#0F1C36] hover:bg-gray-50 font-medium text-lg h-12 px-6">
                Giriş Yap
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-[#0F1C36] hover:bg-blue-900 text-white border-0 px-9 text-lg h-14 rounded-full shadow-lg font-bold transition-transform hover:scale-105">
                Hemen Dene
              </Button>
            </Link>
          </div>

          {/* MOBİL MENÜ BUTONU (Sadece Mobilde Görünür) */}
          <button
            className="md:hidden text-gray-800 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* --- MOBİL MENÜ İÇERİĞİ (Açılır/Kapanır) --- */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <Link href="/" className="text-gray-700 font-medium text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
            Ana Sayfa
          </Link>
          <Link href="/features" className="text-gray-700 font-medium text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
            Özellikler
          </Link>
          <Link href="/pricing" className="text-gray-700 font-medium text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
            Fiyatlandırma
          </Link>
          <Link href="/about" className="text-gray-700 font-medium text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
            Hakkımızda
          </Link>
          <Link href="/contact" className="text-gray-700 font-medium text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
            İletişim
          </Link>

          <div className="flex flex-col gap-3 mt-2">
            <Link href="/sign-in" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-center h-12 text-base border-gray-300 text-gray-700 hover:bg-gray-50">Giriş Yap</Button>
            </Link>
            <Link href="/sign-up" onClick={() => setIsOpen(false)}>
              <Button className="w-full justify-center bg-[#0F1C36] hover:bg-blue-900 text-white h-12 text-base font-bold">Hemen Dene</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}