import Header from "@/components/menu/Header";
import ProductCard from "@/components/menu/ProductCard";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function MenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // TypeScript hatası vermemesi için ': any' kullandık
  const restaurant: any = await prisma.restaurant.findUnique({
    where: { slug: slug },
    include: {
      categories: {
        orderBy: { createdAt: 'asc' }, // Kategoriler oluşturulma sırasına göre
        include: {
          products: {
            where: { isAvailable: true }, // Sadece aktif ürünler
            orderBy: { createdAt: 'desc' } // Yeni ürünler en üstte
          }
        }
      }
    }
  });

  // 1. Restoran yoksa 404
  if (!restaurant) {
    return notFound();
  }

  // 2. Restoran PASİF ise "Hizmet Dışı" ekranı göster
  if (!restaurant.isActive) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
          <p className="text-gray-600">
            Bu işletme şu anda hizmet vermemektedir veya menü erişime kapatılmıştır.
          </p>
        </div>
      </div>
    );
  }

  // 3. Her şey yolundaysa MENÜYÜ GÖSTER
  return (
    <main className="min-h-screen bg-gray-50 pb-10 max-w-md mx-auto shadow-2xl">
      <Header
        name={restaurant.name}
        logoUrl={restaurant.logoUrl}
        coverUrl={restaurant.coverUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&h=400&fit=crop"} 
      />

      <div className="space-y-6">
        {restaurant.categories.map((category: any) => (
          // Eğer kategoride ürün varsa göster
          category.products.length > 0 && (
            <section
              key={category.id}
              id={`category-${category.id}`}
              className="bg-white scroll-mt-20"
            >
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-4 py-3 border-b border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800">
                  {category.name}
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {category.products.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    description={product.description}
                    price={Number(product.price)}
                    imageUrl={product.imageUrl}
                  />
                ))}
              </div>
            </section>
          )
        ))}
        
        {/* Eğer restoranın hiç kategorisi yoksa */}
        {restaurant.categories.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            <p>Bu menü henüz hazırlanma aşamasında.</p>
          </div>
        )}
      </div>
    </main>
  );
}