"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"; 
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// İkon ve İsim Haritası
const ALLERGEN_MAP: Record<string, { label: string, icon: string }> = {
  gluten: { label: "Gluten", icon: "🌾" },
  dairy: { label: "Süt", icon: "🥛" },
  egg: { label: "Yumurta", icon: "🥚" },
  nuts: { label: "Kuruyemiş", icon: "🥜" },
  spicy: { label: "Acı", icon: "🌶️" },
  vegan: { label: "Vegan", icon: "🌱" },
  sea: { label: "Deniz Ürünü", icon: "🐟" },
};

// Mobilde Tıklayınca Açılan Alerjen Rozeti
const AllergenBadge = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const info = ALLERGEN_MAP[id];

  if (!info) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // Kartın tıklanmasını ve Drawer'ın açılmasını engeller
        setIsOpen(!isOpen);  // Aç/Kapa yap
      }}
      title={info.label} // Masaüstü için hover desteği
      className={`
        inline-flex items-center justify-center h-6 rounded-full border border-orange-100 
        text-xs cursor-pointer select-none transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? "px-2 bg-orange-100 w-auto" : "w-6 bg-orange-50"}
        dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-100
      `}
    >
      <span className="text-base leading-none">{info.icon}</span>
      
      {/* Açıldığında görünen metin */}
      <span 
        className={`ml-1 whitespace-nowrap overflow-hidden transition-all duration-300 ${
          isOpen ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        {info.label}
      </span>
    </div>
  );
};

interface ProductCardProps {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  variants?: { name: string; price: number }[];
  allergens?: string[];
}

export default function ProductCard({ 
  name, 
  description, 
  price, 
  imageUrl, 
  variants = [], 
  allergens = [] 
}: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const hasVariants = variants && variants.length > 0;

  // Para birimi formatlayıcı
  const fmt = (p: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(p);

  return (
    <>
      <div 
        onClick={() => hasVariants && setOpen(true)}
        className="group flex gap-4 p-4 bg-white dark:bg-gray-900/60 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
      >
        {/* Görsel Alanı */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          {imageUrl ? (
            <Image src={imageUrl} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">Image</div>
          )}
        </div>

        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight mb-1">{name}</h3>
            {description && <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{description}</p>}

            {/* Alerjen İkonları */}
            {allergens && allergens.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {allergens.map((alg) => (
                  <AllergenBadge key={alg} id={alg} />
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-2">
            {/* TEMA RENGİ UYGULANDI: text-[var(--brand-primary)] */}
            <span className="text-lg font-bold text-[var(--brand-primary)]">
              {hasVariants ? `${fmt(price)}'den Başlayan` : fmt(price)}
            </span>
            
            {/* TEMA RENGİ UYGULANDI: hover:bg-[var(--brand-primary)] */}
            <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 hover:bg-[var(--brand-primary)] hover:text-white transition-colors">
               <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- VARYASYON SEÇİM PENCERESİ (DRAWER) --- */}
      {hasVariants && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm pb-8 px-4">
              <DrawerHeader>
                <DrawerTitle className="text-2xl font-bold text-center">{name}</DrawerTitle>
                <p className="text-center text-gray-500 text-sm">Lütfen bir seçenek belirleyin</p>
              </DrawerHeader>
              
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <span className="font-medium">Standart Porsiyon</span>
                    {/* TEMA RENGİ UYGULANDI */}
                    <span className="font-bold text-[var(--brand-primary)]">{fmt(price)}</span>
                </div>

                {variants.map((variant, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-[var(--brand-primary)] transition-colors cursor-pointer">
                        <span className="font-medium">{variant.name}</span>
                        {/* TEMA RENGİ UYGULANDI */}
                        <span className="font-bold text-[var(--brand-primary)]">{fmt(Number(variant.price))}</span>
                    </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button className="w-full h-12 text-lg" onClick={() => setOpen(false)}>Kapat</Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}