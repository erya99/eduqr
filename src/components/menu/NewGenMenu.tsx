"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // Animasyon için (yoksa npm install framer-motion yapabilirsin veya düz div kullanabilirsin)
import { Instagram, Globe, MessageCircle, Star, ArrowRight, X } from "lucide-react";
import ProductCard from "./ProductCard";
import SpinWheel from "./SpinWheel"; // Mevcut çark bileşenin

interface NewGenMenuProps {
  restaurant: any;
  categories: any[];
  wheelItems: any[];
}

export default function NewGenMenu({ restaurant, categories, wheelItems }: NewGenMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);

  // Marka rengi (default blue)
  const brandColor = "var(--brand-primary)"; 

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
    // Menü açılınca sayfanın tepesine kaydır
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll işlemi
  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const element = document.getElementById(`cat-${catId}`);
    if (element) {
        // Sticky header payı bırakarak kaydır
        const offset = 180; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      
      {/* --- AÇILIŞ EKRANI (LANDING) --- */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ y: -1000, opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-50 flex flex-col justify-end"
          >
            {/* Arka Plan Görseli */}
            <div className="absolute inset-0 z-0">
                {restaurant.landingImageUrl ? (
                    <Image 
                        src={restaurant.landingImageUrl} 
                        alt="Welcome" 
                        fill 
                        className="object-cover" 
                        priority 
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black" />
                )}
                {/* Karartma Gradyanı */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Üst Kısım İkonlar */}
            <div className="absolute top-6 right-6 z-20 flex gap-4">
                 {/* Dil Yeri -> Web Sitesi */}
                 {restaurant.websiteUrl && (
                    <a href={restaurant.websiteUrl} target="_blank" className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-black transition-all">
                        <Globe size={24} />
                    </a>
                 )}
            </div>

            {/* Alt Kısım İçerik */}
            <div className="relative z-10 p-8 pb-12 w-full max-w-md mx-auto flex flex-col gap-6">
                
                {/* Logo ve İsim */}
                <div className="text-center mb-4">
                     <h1 className="text-4xl font-bold text-white mb-2 tracking-wide drop-shadow-lg">
                        {restaurant.name}
                     </h1>
                     <p className="text-gray-200 text-lg font-light">
                        {restaurant.description}
                     </p>
                </div>

                {/* Butonlar Grid'i */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* Çark / Kampanyalar */}
                    <button 
                        onClick={() => setShowWheel(true)}
                        className="flex flex-col items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white hover:bg-[var(--brand-primary)] hover:border-transparent transition-all group"
                    >
                        <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/20">
                            <Star className="w-6 h-6 text-yellow-400" />
                        </div>
                        <span className="text-xs font-medium">Fırsatlar</span>
                    </button>

                    {/* Google Yorumlar */}
                    {restaurant.googlePlaceUrl && (
                        <a 
                            href={restaurant.googlePlaceUrl} 
                            target="_blank"
                            className="flex flex-col items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white hover:bg-blue-600 hover:border-transparent transition-all"
                        >
                             <div className="p-2 bg-white/20 rounded-full">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium">Yorumlar</span>
                        </a>
                    )}

                    {/* Instagram */}
                    {restaurant.instagramUrl && (
                        <a 
                            href={restaurant.instagramUrl}
                            target="_blank" 
                            className="flex flex-col items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white hover:bg-pink-600 hover:border-transparent transition-all"
                        >
                             <div className="p-2 bg-white/20 rounded-full">
                                <Instagram className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium">Instagram</span>
                        </a>
                    )}
                </div>

                {/* MENÜYÜ İNCELE BUTONU (Büyük CTA) */}
                <button 
                    onClick={handleOpenMenu}
                    className="w-full bg-[var(--brand-primary)] text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-[var(--brand-primary)]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 animate-pulse-slow"
                >
                    MENÜYÜ İNCELE
                    <ArrowRight size={20} />
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ANA MENÜ İÇERİĞİ --- */}
      {isMenuOpen && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-500">
            
            {/* Banner Alanı */}
            <div className="relative h-48 w-full overflow-hidden">
                {restaurant.coverUrl ? (
                    <Image src={restaurant.coverUrl} fill className="object-cover" alt="Cover" />
                ) : (
                    <div className="w-full h-full bg-gray-200" />
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h2 className="text-3xl font-bold">{restaurant.name}</h2>
                    </div>
                </div>
                {/* Geri Dön (Landing'e) */}
                <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm z-20"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Sticky Kategori Barı */}
            <div className="sticky top-0 z-40 bg-white shadow-sm py-3 px-2 overflow-x-auto no-scrollbar border-b border-gray-100">
                <div className="flex gap-2 min-w-max px-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => scrollToCategory(cat.id)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                                activeCategory === cat.id 
                                ? "bg-[var(--brand-primary)] text-white shadow-md shadow-[var(--brand-primary)]/30 scale-105" 
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ürün Listesi */}
            <div className="container mx-auto px-4 py-6 max-w-2xl pb-32">
                {categories.map((cat) => (
                    <div key={cat.id} id={`cat-${cat.id}`} className="mb-10 scroll-mt-32">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-1 h-8 rounded-full bg-[var(--brand-primary)]"></div>
                            <h3 className="text-2xl font-bold text-gray-800">{cat.name}</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {cat.products.map((product: any) => (
                                <ProductCard key={product.id} {...product} price={Number(product.price)} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Çark Modalı (Landing'den tetiklenen) */}
      {showWheel && (
         <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
             <div className="relative w-full max-w-md">
                 <button 
                    onClick={() => setShowWheel(false)}
                    className="absolute -top-12 right-0 text-white p-2"
                 >
                    <X size={32} />
                 </button>
                 <SpinWheel items={wheelItems} />
             </div>
         </div>
      )}

    </div>
  );
}