// Dosya: src/components/menu/FloatingReviewBtn.tsx

"use client";
import { Star } from "lucide-react";

export default function FloatingReviewBtn({ url }: { url: string | null }) {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-[40] group flex items-center justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500"
    >
      {/* Arkadaki Hareketli Işıltı Efekti (Pulse) */}
      <span className="absolute inset-0 rounded-full bg-yellow-400 opacity-40 group-hover:animate-ping duration-[2000ms]"></span>
      
      {/* Butonun Kendisi */}
      <div className="relative flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-1 pr-4 py-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-yellow-400/30 transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/20 backdrop-blur-sm">
        
        {/* Google Logosu / Yıldız İkonu */}
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-full shadow-sm text-white">
            <Star className="w-5 h-5 fill-white" />
        </div>

        {/* Metin Alanı */}
        <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mb-0.5">Memnun musun?</span>
            <span className="font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Bizi Değerlendir
            </span>
        </div>
      </div>
    </a>
  );
}