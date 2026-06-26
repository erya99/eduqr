"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Home, Star, CreditCard, Info, Phone } from "lucide-react";
import { LimelightNav } from "@/components/ui/limelight-nav";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", icon: <Home />, label: "Ana Sayfa", href: "/" },
    { id: "features", icon: <Star />, label: "Özellikler", href: "/#features" },
    { id: "pricing", icon: <CreditCard />, label: "Fiyatlandırma", href: "/pricing" },
    { id: "about", icon: <Info />, label: "Hakkımızda", href: "/about" },
    { id: "contact", icon: <Phone />, label: "İletişim", href: "/contact" },
  ];

  const activeIndex = navItems.findIndex((i) => i.href === pathname);
  const defaultIndex = activeIndex === -1 ? 0 : activeIndex;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F5F0E8]/90 backdrop-blur-md border-b border-[#0F1C36]/8 py-2 shadow-sm"
          : "bg-[#F5F0E8] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Sol: Logo + Menü */}
        <div className="flex items-center gap-12 h-full flex-1">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/eduqrlogo3.png"
              alt="EduQR Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>
          <div className="hidden lg:flex items-center h-full">
            <LimelightNav
              items={navItems}
              defaultActiveIndex={defaultIndex}
              className="h-14 border-none shadow-none bg-transparent"
              iconContainerClassName="px-4 hover:bg-[#0F1C36]/5 text-[#0F1C36]"
            />
          </div>
        </div>

        {/* Sağ: Butonlar */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-3">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="text-[#0F1C36] hover:text-[#0F1C36] hover:bg-[#0F1C36]/8 font-medium text-base h-11 px-5 rounded-full"
              >
                Giriş Yap
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-[#0F1C36] hover:bg-[#1a2d52] text-[#F5F0E8] font-bold text-base h-11 px-7 rounded-full shadow-md transition-all hover:scale-105">
                Hemen Dene
              </Button>
            </Link>
          </div>
          <button
            className="md:hidden text-[#0F1C36] p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F5F0E8] border-b border-[#0F1C36]/10 shadow-lg py-4 px-4 flex flex-col gap-3 animate-in slide-in-from-top-5">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-[#0F1C36] font-medium text-base py-2 border-b border-[#0F1C36]/10"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-2">
            <Link href="/sign-in" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full h-11 border-[#0F1C36]/20 text-[#0F1C36]">Giriş Yap</Button>
            </Link>
            <Link href="/sign-up" onClick={() => setIsOpen(false)}>
              <Button className="w-full h-11 bg-[#0F1C36] text-[#F5F0E8] font-bold">Hemen Dene</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
