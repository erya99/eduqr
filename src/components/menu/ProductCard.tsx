import { formatCurrency } from "@/lib/mock-data"; // Veya kendi format fonksiyonun
import Image from "next/image";

interface ProductCardProps {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
}

export default function ProductCard({ name, description, price, imageUrl }: ProductCardProps) {
  // Para birimi formatlayıcı (Eğer lib/mock-data yoksa buraya manuel yazabilirsin)
  const formattedPrice = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <div className="group flex gap-4 p-4 bg-white dark:bg-gray-900/60 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Sol Taraf: Görsel */}
      {/* Görsel varsa göster, yoksa baş harfini göster */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100px, 120px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Sağ Taraf: Bilgiler */}
      <div className="flex flex-col justify-between flex-1 py-1">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight mb-1">
            {name}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {formattedPrice}
          </span>
          
          {/* Ekle Butonu (Görsel Amaçlı - İlerde sepet yapılabilir) */}
          <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}