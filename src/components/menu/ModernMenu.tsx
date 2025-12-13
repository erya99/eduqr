"use client";

import { useState, useEffect } from "react";
import { Category, Product, Restaurant } from "@prisma/client";
import { Playfair_Display, Lato } from "next/font/google";

// 1. Şık ve Zarif Fontları Yüklüyoruz
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  variable: "--font-playfair"
});

const lato = Lato({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700"],
  variable: "--font-lato"
});

interface ModernMenuProps {
  restaurant: Restaurant;
  categories: (Category & { products: Product[] })[];
}

export default function ModernMenu({ restaurant, categories }: ModernMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "");

  // Scroll olayını dinleyip aktif kategoriyi güncellemek için (Opsiyonel ama şık durur)
  useEffect(() => {
    const handleScroll = () => {
      // Basit bir scroll takibi mantığı
      const sections = categories.map(c => document.getElementById(`category-${c.id}`));
      const scrollPosition = window.scrollY + 150; // Biraz offset veriyoruz

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
      const offset = 80; // Header yüksekliği kadar pay bırak
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
    <div className={`${playfair.variable} ${lato.variable} min-h-screen bg-[#0c0c0c] text-[#e5e5e5]`}>
      
      {/* --- BACKGROUND DEKORASYON (Hafif doku) --- */}
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
            
            {/* Kategori Başlığı - Şık ve Ortada */}
            <div className="flex items-center justify-center mb-12 gap-4">
              <span className="h-[1px] w-8 md:w-16 bg-[#d4af37]/40"></span> {/* Dekoratif Çizgi */}
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

                  {/* Fiyat (Ayrı vurgu) */}
                  <div className="font-sans text-[#d4af37] font-bold text-lg mb-3">
                    {formatPrice(Number(product.price))}
                  </div>

                  {/* Açıklama */}
                  {product.description && (
                    <p className="font-sans text-[#999] font-light text-sm leading-relaxed max-w-sm mx-auto mb-3">
                      {product.description}
                    </p>
                  )}

                  {/* ALERJENLER (Yeni Eklenen Kısım) */}
                  {product.allergens && product.allergens.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-1">
                      {product.allergens.map((allergen, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-[2px] border border-[#d4af37]/30 rounded text-[10px] text-[#bbb] font-sans uppercase tracking-wider bg-[#d4af37]/5"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Altına ince bir ayırıcı nokta koyalım (Son ürün hariç) */}
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

      {/* --- FOOTER DEKORASYONU --- */}
      <div className="text-center py-10 opacity-20 pb-20">
        <span className="font-serif text-4xl text-[#d4af37]">~</span>
      </div>

      {/* --- CSS: Scrollbar Gizleme (Tailwind 'no-scrollbar' yoksa diye) --- */}
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