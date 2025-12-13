"use client";

import { Category, Product, Restaurant } from "@prisma/client";

// Renk paleti haritası
const PALETTE_STYLES: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  blue:   { text: "text-blue-500", bg: "bg-blue-600", border: "border-blue-500", glow: "shadow-blue-500/20" },
  red:    { text: "text-red-500", bg: "bg-red-600", border: "border-red-500", glow: "shadow-red-500/20" },
  orange: { text: "text-orange-500", bg: "bg-orange-600", border: "border-orange-500", glow: "shadow-orange-500/20" },
  green:  { text: "text-emerald-500", bg: "bg-emerald-600", border: "border-emerald-500", glow: "shadow-emerald-500/20" },
  purple: { text: "text-purple-500", bg: "bg-purple-600", border: "border-purple-500", glow: "shadow-purple-500/20" },
  black:  { text: "text-white", bg: "bg-white", border: "border-white", glow: "shadow-white/10" },
  monochrome: { text: "text-white", bg: "bg-white", border: "border-white", glow: "shadow-none" },
};

interface ModernMenuProps {
  restaurant: Restaurant;
  categories: (Category & { products: Product[] })[];
}

export default function ModernMenu({ restaurant, categories }: ModernMenuProps) {
  // Tema rengini belirle (Varsayılan: Mavi)
  const themeKey = restaurant.colorPalette || "blue";
  const theme = PALETTE_STYLES[themeKey] || PALETTE_STYLES.blue;

  // Para birimi formatlayıcı
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 pb-24">
      
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-md mx-auto px-6 py-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
              {restaurant.name}
            </h1>
            {restaurant.description && (
              <p className="text-sm text-gray-400 font-light max-w-xs mx-auto leading-relaxed">
                {restaurant.description}
              </p>
            )}
        </div>
      </div>

      {/* --- MENÜ İÇERİĞİ --- */}
      <div className="max-w-md mx-auto px-6 mt-8 space-y-16">
        {categories.map((category) => (
          <div key={category.id} id={`category-${category.id}`} className="scroll-mt-32">
            
            {/* Kategori Başlığı */}
            <div className="flex items-center gap-4 mb-6 sticky top-[100px] py-2 bg-[#0a0a0a] z-30">
              <span className={`h-8 w-1 rounded-full ${theme.bg} shadow-[0_0_15px_rgba(0,0,0,0.5)] ${theme.glow}`} />
              <h2 className="text-xl font-bold text-white tracking-wide">
                {category.name}
              </h2>
            </div>

            {/* Ürün Listesi */}
            <div className="space-y-8">
              {category.products.filter(p => p.isAvailable).map((product) => (
                <div key={product.id} className="group relative">
                  
                  {/* İsim - Çizgi - Fiyat Satırı */}
                  <div className="flex items-baseline justify-between w-full relative z-10">
                    <h3 className="text-[17px] font-medium text-gray-100 pr-2 bg-[#0a0a0a]">
                      {product.name}
                    </h3>

                    {/* Noktalı Çizgi */}
                    <div className="flex-grow mx-1 border-b border-dotted border-gray-700/60 relative -top-1.5 opacity-50" />

                    <div className="pl-2 bg-[#0a0a0a]">
                       <span className={`font-bold text-[17px] tracking-tight ${theme.text}`}>
                         {formatPrice(Number(product.price))}
                       </span>
                    </div>
                  </div>
                  
                  {/* Açıklama */}
                  {product.description && (
                    <div className="mt-1.5 pr-12">
                      <p className="text-sm text-gray-500 font-light leading-relaxed line-clamp-2 group-hover:text-gray-400 transition-colors">
                        {product.description}
                      </p>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        ))}

        {categories.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                Menü içeriği henüz eklenmemiş.
            </div>
        )}
      </div>
    </div>
  );
}