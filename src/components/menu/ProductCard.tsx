import { formatCurrency } from "@/lib/mock-data";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  description?: string | null;
  price: any; // Prisma decimal tipiyle uyum sorunu olmasın diye any/number geçici
  imageUrl?: string | null;
}

export default function ProductCard({ name, description, price, imageUrl }: ProductCardProps) {
  return (
    <div className="flex justify-between items-start gap-4 p-4 border-b border-gray-100 last:border-0 bg-white hover:bg-gray-50 transition-colors">
      {/* Sol taraf: Yazılar */}
      <div className="flex-1 space-y-2">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        {description && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        <div className="font-bold text-primary text-lg text-emerald-600">
          {formatCurrency(Number(price))}
        </div>
      </div>

      {/* Sağ taraf: Resim (Varsa) */}
      {imageUrl && (
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
          <Image 
            src={imageUrl} 
            alt={name} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100px, 100px"
          />
        </div>
      )}
    </div>
  );
}