"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Globe, MessageCircle, Star, ArrowRight, ChevronLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import SpinWheel from "./SpinWheel";

interface NewGenMenuProps {
  restaurant: any;
  categories: any[];
  wheelItems: any[];
}

export default function NewGenMenu({ restaurant, categories, wheelItems }: NewGenMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const cat of categories) {
        const element = document.getElementById(`cat-${cat.id}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen, categories]);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const element = document.getElementById(`cat-${catId}`);
    if (element) {
        const offset = 140; 
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] font-sans relative transition-colors duration-300">
      
      {/* --- AÇILIŞ EKRANI (LANDING) --- */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ y: -50, opacity: 0, transition: { duration: 0.4 } }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30" />
            </div>

            {/* Üst İkonlar */}
            <div className="absolute top-6 right-6 z-20 flex gap-4">
                 {restaurant.websiteUrl && (
                    <a href={restaurant.websiteUrl} target="_blank" className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-black transition-all border border-white/10">
                        <Globe size={24} />
                    </a>
                 )}
            </div>

            {/* İçerik */}
            <div className="relative z-10 p-8 pb-16 w-full max-w-md mx-auto flex flex-col gap-6">
                <div className="text-center mb-2">
                     <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide drop-shadow-lg">
                        {restaurant.name}
                     </h1>
                     {restaurant.description && (
                         <p className="text-gray-300 text-lg font-light leading-relaxed drop-shadow">
                            {restaurant.description}
                         </p>
                     )}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-2">
                    {/* Fırsatlar */}
                    <button 
                        onClick={() => setShowWheel(true)}
                        className="flex flex-col items-center justify-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl text-white hover:bg-[var(--brand-primary)] hover:border-transparent active:scale-95 transition-all"
                    >
                        <div className="p-2 bg-white/10 rounded-full">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        </div>
                        <span className="text-xs font-medium tracking-wide">Fırsatlar</span>
                    </button>

                    {/* Yorumlar */}
                    {restaurant.googlePlaceUrl && (
                        <a 
                            href={restaurant.googlePlaceUrl} 
                            target="_blank"
                            className="flex flex-col items-center justify-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl text-white hover:bg-blue-600 hover:border-transparent active:scale-95 transition-all"
                        >
                             <div className="p-2 bg-white/10 rounded-full">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium tracking-wide">Bizi Değerlendir</span>
                        </a>
                    )}

                    {/* Instagram */}
                    {restaurant.instagramUrl && (
                        <a 
                            href={restaurant.instagramUrl}
                            target="_blank" 
                            className="flex flex-col items-center justify-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl text-white hover:bg-pink-600 hover:border-transparent active:scale-95 transition-all"
                        >
                             <div className="p-2 bg-white/10 rounded-full">
                                <Instagram className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium tracking-wide">Instagram</span>
                        </a>
                    )}
                </div>

                <button 
                    onClick={handleOpenMenu}
                    className="group w-full bg-[var(--brand-primary)] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[var(--brand-primary)]/30 hover:shadow-[var(--brand-primary)]/50 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    <span>MENÜYÜ İNCELE</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ANA MENÜ İÇERİĞİ --- */}
      {isMenuOpen && (
        <div className="animate-in fade-in slide-in-from-bottom-20 duration-500">
            <div className="relative h-40 md:h-64 w-full overflow-hidden">
                {restaurant.coverUrl ? (
                    <Image src={restaurant.coverUrl} fill className="object-cover" alt="Cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-[var(--brand-primary)] to-gray-900" />
                )}
                <div className="absolute inset-0 bg-black/40" />
                <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-4 left-4 bg-black/30 hover:bg-black/50 text-white p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-all z-20"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                     <h2 className="text-2xl font-bold text-white drop-shadow-md">{restaurant.name}</h2>
                </div>
            </div>

            <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-gray-800 py-3 px-2 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 min-w-max px-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => scrollToCategory(cat.id)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                                activeCategory === cat.id 
                                ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-md shadow-[var(--brand-primary)]/20" 
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-2xl pb-32">
                {categories.map((cat) => (
                    <div key={cat.id} id={`cat-${cat.id}`} className="mb-12 scroll-mt-36">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-8 rounded-full bg-[var(--brand-primary)]"></div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{cat.name}</h3>
                        </div>

                        {cat.imageUrl && (
                            <div className="relative w-full h-40 md:h-52 rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-100 dark:border-gray-800">
                                <Image 
                                    src={cat.imageUrl} 
                                    alt={cat.name} 
                                    fill 
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                        )}
                        
                        <div className="grid grid-cols-1 gap-4">
                            {cat.products.map((product: any) => (
                                <div key={product.id} className="bg-white dark:bg-[#121212] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                                     <ProductCard {...product} price={Number(product.price)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- ÇARK MODALI (DÜZELTİLDİ) --- */}
      {showWheel && (
         <SpinWheel 
            items={wheelItems} 
            initialOpen={true} // <-- Otomatik aç
            onClose={() => setShowWheel(false)} // <-- Kapatınca state'i güncelle
         />
      )}

    </div>
  );
}