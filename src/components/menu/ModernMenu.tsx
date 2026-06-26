"use client";

import { useState, useEffect } from "react";
import { Category, Product, Restaurant } from "@prisma/client";
// --- 1. ALERJEN HARİTASI (Verdiğin Liste) ---
const ALLERGEN_MAP: Record<string, { label: string; icon: string }> = {
  gluten: { label: "Gluten", icon: "🌾" },
  dairy: { label: "Süt Ürünleri", icon: "🥛" },
  egg: { label: "Yumurta", icon: "🥚" },
  nuts: { label: "Kuruyemiş", icon: "🥜" },
  spicy: { label: "Acı", icon: "🌶️" },
  vegan: { label: "Vegan", icon: "🌱" },
  sea: { label: "Deniz Ürünü", icon: "🐟" },
  // Veritabanından gelebilecek farklı yazımlar için (Opsiyonel)
  lac: { label: "Laktoz", icon: "🥛" }, 
};

interface ModernMenuProps {
  restaurant: Restaurant;
  categories: (Category & { products: Product[] })[];
}

export default function ModernMenu({ restaurant, categories }: ModernMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "");

  // --- SCROLL TAKİBİ ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(c => document.getElementById(`category-${c.id}`));
      const scrollPosition = window.scrollY + 150; 

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
            setActiveCategory(section.id.replace('category-', ''));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(`category-${id}`);
    if (element) {
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveCategory(id);
    }
  };

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#e5e5e5]">
      
      {/* --- BACKGROUND DEKORASYON --- */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}>
      </div>

      {/* --- RESTORAN BAŞLIĞI --- */}
      <header className="relative pt-12 pb-6 px-6 text-center z-10">
        <div className="inline-block border-b-2 border-[#d4af37]/30 pb-4 mb-2">
          <h1 className="font-serif text-4xl md:text-5xl tracking-wider text-[#fcfcfc]">
            {restaurant.name}
          </h1>
        </div>
        {restaurant.description && (
          <p className="font-sans text-[#a3a3a3] mt-2 font-light text-xs md:text-sm tracking-widest uppercase">
            {restaurant.description}
          </p>
        )}
      </header>

      {/* --- STICKY KATEGORİ BARI --- */}
      <div className="sticky top-0 z-50 bg-[#0c0c0c]/95 backdrop-blur-md border-b border-[#333] shadow-lg">
        <div className="flex overflow-x-auto py-4 px-4 gap-6 no-scrollbar justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`whitespace-nowrap font-serif text-lg tracking-wide transition-colors duration-300 ${
                activeCategory === cat.id 
                  ? "text-[#d4af37] border-b border-[#d4af37]" 
                  : "text-[#888] hover:text-[#bbb]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* --- MENÜ İÇERİĞİ --- */}
      <div className="max-w-2xl mx-auto px-6 py-12 relative z-10">
        {categories.map((category) => (
          <section key={category.id} id={`category-${category.id}`} className="mb-20 scroll-mt-32">
            
            {/* Kategori Başlığı */}
            <div className="flex items-center justify-center mb-12 gap-4">
              <span className="h-[1px] w-8 md:w-16 bg-[#d4af37]/40"></span>
              <h2 className="font-serif text-3xl text-[#d4af37] tracking-wide italic text-center">
                {category.name}
              </h2>
              <span className="h-[1px] w-8 md:w-16 bg-[#d4af37]/40"></span>
            </div>

            {/* Ürün Listesi */}
            <div className="grid gap-y-12">
              {category.products.filter(p => p.isAvailable).map((product) => (
                <div key={product.id} className="group flex flex-col items-center text-center">
                  
                  {/* Ürün Adı */}
                  <h3 className="font-serif text-xl md:text-2xl text-white tracking-wide mb-2 group-hover:text-[#d4af37] transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Fiyat */}
                  <div className="font-sans text-[#d4af37] font-bold text-lg mb-3">
                    {formatPrice(Number(product.price))}
                  </div>

                  {/* Açıklama */}
                  {product.description && (
                    <p className="font-sans text-[#999] font-light text-sm leading-relaxed max-w-sm mx-auto mb-3">
                      {product.description}
                    </p>
                  )}

                  {/* --- DÜZELTİLEN KISIM: ALERJENLER --- */}
                  {product.allergens && product.allergens.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {product.allergens.map((allergenKey, index) => {
                        // Veritabanından "Dairy", "dairy" veya "DAIRY" gelebilir, küçültüp bakıyoruz.
                        const mapData = ALLERGEN_MAP[allergenKey.toLowerCase()];
                        
                        // Eğer map'te varsa ikonlu hali, yoksa raw hali
                        return (
                          <span 
                            key={index} 
                            className="inline-flex items-center gap-1 px-3 py-1 border border-[#d4af37]/20 rounded-full text-[11px] text-[#ccc] font-sans font-medium tracking-wide bg-[#d4af37]/5 hover:bg-[#d4af37]/10 transition-colors cursor-default"
                            title="Alerjen Uyarısı"
                          >
                            {mapData ? (
                              <>
                                <span className="text-base leading-none opacity-80">{mapData.icon}</span>
                                <span>{mapData.label}</span>
                              </>
                            ) : (
                              // Map'te karşılığı yoksa olduğu gibi yazsın ama stil korunsun
                              allergenKey.toUpperCase()
                            )}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Ayırıcı Nokta */}
                  <div className="w-1 h-1 bg-[#333] rounded-full mt-8 opacity-50 group-last:hidden"></div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {categories.length === 0 && (
            <div className="text-center py-20 font-serif text-[#666] italic">
                Menü hazırlanıyor...
            </div>
        )}
      </div>

      {/* --- FOOTER --- */}
      <div className="text-center py-10 opacity-20 pb-20">
        <span className="font-serif text-4xl text-[#d4af37]">~</span>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}