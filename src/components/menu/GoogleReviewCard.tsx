// src/components/menu/GoogleReviewCard.tsx
import { Star } from "lucide-react";

export default function GoogleReviewCard({ url }: { url: string | null }) {
  if (!url) return null;
  
  return (
    <div className="w-full px-4 py-8 flex justify-center">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative w-full max-w-sm rounded-2xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-100 dark:border-gray-700"
      >
        {/* Dekoratif Renkli Çizgi (Google Renkleri) */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]"></div>
        
        <div className="p-5 flex items-center gap-5">
          {/* Google Logo Alanı */}
          <div className="flex-shrink-0 relative">
             <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 relative z-10 group-hover:rotate-12 transition-transform duration-500">
                {/* Google "G" SVG İkonu */}
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.29.81-.55z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
             </div>
             {/* Arkadaki Hareketli Blur */}
             <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
          </div>

          {/* Metin Alanı */}
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1">
               Memnun Kaldınız mı?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Google'da bize 5 yıldız verin, desteğinizi gösterin! 🚀
            </p>
            
            {/* Yıldızlar */}
            <div className="flex gap-1">
                {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                ))}
            </div>
          </div>
        </div>
        
        {/* "Yorum Yap" Butonu Görünümü */}
        <div className="bg-gray-50 dark:bg-gray-900/50 px-5 py-2 flex justify-between items-center text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
            <span>Yorum yazmak için dokunun</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </a>
    </div>
  )
}