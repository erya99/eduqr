"use client";

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
  
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(price);

  return (
    <div className={`${playfair.variable} ${lato.variable} min-h-screen bg-[#0c0c0c] text-[#e5e5e5]`}>
      
      {/* --- BACKGROUND DEKORASYON (Hafif doku) --- */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}>
      </div>

      {/* --- RESTORAN BAŞLIĞI (Borcelle Tarzı) --- */}
      <header className="relative pt-16 pb-12 px-6 text-center z-10">
        <div className="inline-block border-b-2 border-[#d4af37]/30 pb-4 mb-2"> {/* Altın Çizgi */}
          <h1 className="font-serif text-5xl tracking-wider text-[#fcfcfc]">
            {restaurant.name}
          </h1>
        </div>
        {restaurant.description && (
          <p className="font-sans text-[#a3a3a3] mt-4 font-light text-sm tracking-widest uppercase">
            {restaurant.description}
          </p>
        )}
      </header>

      {/* --- MENÜ İÇERİĞİ --- */}
      <div className="max-w-2xl mx-auto px-6 pb-24 relative z-10">
        {categories.map((category) => (
          <section key={category.id} className="mb-16">
            
            {/* Kategori Başlığı - Şık ve Ortada */}
            <div className="flex items-center justify-center mb-10 gap-4">
              <span className="h-[1px] w-12 bg-[#d4af37]/40"></span> {/* Dekoratif Çizgi */}
              <h2 className="font-serif text-3xl text-[#d4af37] tracking-wide italic">
                {category.name}
              </h2>
              <span className="h-[1px] w-12 bg-[#d4af37]/40"></span>
            </div>

            {/* Ürün Listesi */}
            <div className="grid gap-y-10">
              {category.products.filter(p => p.isAvailable).map((product) => (
                <div key={product.id} className="group flex flex-col items-center text-center">
                  
                  {/* Ürün Adı */}
                  <h3 className="font-serif text-xl text-white tracking-wide mb-1 group-hover:text-[#d4af37] transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Fiyat (Ayrı vurgu) */}
                  <div className="font-sans text-[#d4af37] font-bold text-lg mb-2">
                    {formatPrice(Number(product.price))}
                  </div>

                  {/* Açıklama (İnce ve zarif) */}
                  {product.description && (
                    <p className="font-sans text-[#888] font-light text-sm leading-relaxed max-w-sm mx-auto">
                      {product.description}
                    </p>
                  )}
                  
                  {/* Altına ince bir ayırıcı nokta koyalım (Son ürün hariç) */}
                  <div className="w-1 h-1 bg-[#333] rounded-full mt-6 opacity-50 group-last:hidden"></div>
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
      <div className="text-center py-8 opacity-20">
        <span className="font-serif text-4xl text-[#d4af37]">~</span>
      </div>
    </div>
  );
}