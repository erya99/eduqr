"use client";

import { Category, Product, Restaurant } from "@prisma/client";

// Framer-motion kullanılmıyordu, kaldırdık.

interface ModernMenuProps {
  restaurant: Restaurant;
  categories: (Category & { products: Product[] })[];
}

// 1. DÜZELTME: Veritabanındaki "blue", "red" gibi değerleri Tailwind sınıflarına eşleştirelim
const PALETTE_STYLES: Record<string, { text: string; border: string; bg: string }> = {
  blue: { text: "text-blue-600", border: "border-blue-600", bg: "bg-blue-600" },
  red: { text: "text-red-600", border: "border-red-600", bg: "bg-red-600" },
  orange: { text: "text-orange-600", border: "border-orange-600", bg: "bg-orange-600" },
  green: { text: "text-green-600", border: "border-green-600", bg: "bg-green-600" },
  purple: { text: "text-purple-600", border: "border-purple-600", bg: "bg-purple-600" },
  black: { text: "text-gray-900", border: "border-gray-900", bg: "bg-gray-900" },
  monochrome: { text: "text-black", border: "border-black", bg: "bg-black" },
};

export default function ModernMenu({ restaurant, categories }: ModernMenuProps) {
  // Eğer renk seçilmemişse varsayılan olarak maviyi al
  const theme = PALETTE_STYLES[restaurant.colorPalette || "blue"] || PALETTE_STYLES.blue;

  return (
    <div className="pb-20 bg-background min-h-screen font-sans">
      {/* Header - Görsel Yok, Sadece Logo/İsim */}
      <div 
        className={`pt-12 pb-6 px-6 text-center shadow-sm sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b-2 ${theme.border}`}
      >
        <h1 className={`text-3xl font-bold tracking-tight mb-2 ${theme.text}`}>
          {restaurant.name}
        </h1>
        {restaurant.description && (
          <p className="text-muted-foreground text-sm max-w-md mx-auto">{restaurant.description}</p>
        )}
      </div>

      <div className="max-w-md mx-auto px-6 mt-8 space-y-12">
        {categories.map((category) => (
          <div key={category.id} id={`category-${category.id}`} className="scroll-mt-32">
            {/* Kategori Başlığı */}
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span 
                className={`w-1.5 h-6 rounded-full ${theme.bg}`}
              />
              {category.name}
            </h2>

            {/* Ürün Listesi */}
            <div className="space-y-6">
              {category.products.filter(p => p.isAvailable).map((product) => (
                <div key={product.id} className="group flex flex-col w-full">
                  <div className="flex items-baseline justify-between w-full">
                    <h3 className={`font-medium text-lg leading-none transition-colors group-hover:${theme.text}`}>
                      {product.name}
                    </h3>
                    
                    {/* Fiyat ve Çizgi Efekti */}
                    <div className="flex-1 mx-3 border-b border-dotted border-gray-300 relative top-[-4px] hidden sm:block opacity-50" />
                    
                    {/* 2. DÜZELTME: Fiyatı Number() içine aldık */}
                    <span className={`font-bold text-lg whitespace-nowrap ${theme.text}`}>
                      {Number(product.price)} ₺
                    </span>
                  </div>
                  
                  {product.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}