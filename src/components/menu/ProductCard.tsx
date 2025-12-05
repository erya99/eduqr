"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"; // shadcn drawer bileşeni (yüklemediysen 'npx shadcn@latest add drawer' yap)
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductCardProps {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  variants?: { name: string; price: number }[]; // YENİ: Varyasyonlar
}

export default function ProductCard({ name, description, price, imageUrl, variants = [] }: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const hasVariants = variants && variants.length > 0;

  // Para birimi formatlayıcı
  const fmt = (p: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(p);

  return (
    <>
      <div 
        onClick={() => hasVariants && setOpen(true)} // Varyasyon varsa tıklanabilir yap
        className="group flex gap-4 p-4 bg-white dark:bg-gray-900/60 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
      >
        {/* Görsel Alanı (Aynı kalıyor) */}
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
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {hasVariants ? `${fmt(price)}'den Başlayan` : fmt(price)}
            </span>
            
            {/* Buton: Varyasyon varsa 'Seç', yoksa '+' */}
            <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
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
                {/* Varsayılan seçenek (Standart) */}
                <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <span className="font-medium">Standart Porsiyon</span>
                    <span className="font-bold text-blue-600">{fmt(price)}</span>
                </div>

                {/* Eklenen Varyasyonlar */}
                {variants.map((variant, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
                        <span className="font-medium">{variant.name}</span>
                        <span className="font-bold text-blue-600">{fmt(Number(variant.price))}</span>
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