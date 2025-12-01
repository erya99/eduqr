import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle"; // Birazdan oluşturacağız
import { Instagram, Facebook, Twitter, Globe } from "lucide-react";

const prisma = new PrismaClient();

export default async function MenuPage({ params }: { params: { slug: string } }) {
  const { slug } = await params; // Next.js 15 için await eklendi

  // 1. Veritabanından restoranı çek
  // Hata almamak için :any kullanıyoruz veya düzgün type tanımı yapıyoruz.
  // Prisma generate yaptıysan tip tanımlarına gerek kalmayabilir.a
  const restaurant: any = await prisma.restaurant.findUnique({
    where: { 
      slug: slug,
      isActive: true 
    },
    include: {
      categories: {
        include: {
          products: {
            where: { isAvailable: true }, 
            orderBy: { createdAt: 'desc' }
          }
        },
        orderBy: { order: 'asc' } 
      }
    }
  });

  if (!restaurant) {
    return notFound();
  }

  // İçinde ürün olmayan kategorileri filtrele (Boş kutu göstermemek için)
  const nonEmptyCategories = restaurant.categories.filter((c: any) => c.products.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-24">
      
      {/* --- HEADER (Kapak & Logo) --- */}
      <header className="relative">
        <div className="relative h-56 md:h-80 w-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
          {restaurant.coverUrl ? (
            <Image
              src={restaurant.coverUrl}
              alt="Kapak Görseli"
              fill
              className="object-cover"
              priority
            />
          ) : (
             <div className="w-full h-full bg-gradient-to-r from-blue-900 to-slate-900 opacity-90" />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-4 relative -mt-20 z-10 text-center">
             <div className="relative w-32 h-32 mx-auto rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white shadow-xl">
                {restaurant.logoUrl ? (
                    <Image src={restaurant.logoUrl} alt="Logo" fill className="object-cover"/>
                ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 font-bold text-4xl">
                        {restaurant.name.substring(0,1).toUpperCase()}
                     </div>
                )}
            </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">{restaurant.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm max-w-md mx-auto">
            Hoş geldiniz! Lezzetli menümüzü aşağıdan inceleyebilirsiniz.
          </p>
        </div>
      </header>

      {/* --- KATEGORİLER (Grid) --- */}
      <main className="container mx-auto px-4 mt-10">
        {nonEmptyCategories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nonEmptyCategories.map((category: any) => {
              // Kategorinin kapağı olarak içindeki ilk ürünün resmini kullanıyoruz
              const coverImage = category.products[0]?.imageUrl;

              return (
                // Bu linki ileride kategori detay sayfasına yönlendirebilirsin (şimdilik #)
                <Link 
                  href={`#`} 
                  key={category.id}
                  className="group relative h-40 md:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
                >
                  {coverImage ? (
                     <Image
                       src={coverImage}
                       alt={category.name}
                       fill
                       className="object-cover group-hover:scale-110 transition-transform duration-700"
                     />
                  ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-slate-700 dark:to-slate-800" />
                  )}
                  
                  {/* Yazı Alanı (Karartmalı) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="absolute bottom-0 left-0 p-4 w-full text-center">
                      <h2 className="text-white text-lg md:text-xl font-bold truncate">{category.name}</h2>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
           <div className="text-center py-20 text-gray-500">
             <p>Menü hazırlanıyor...</p>
           </div>
        )}
      </main>

      {/* --- FOOTER (Sabit Alt Menü) --- */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 px-6 py-3 z-50">
        <div className="container mx-auto flex items-center justify-between">
          
          {/* Sosyal Medya İkonları */}
          <div className="flex items-center space-x-6">
            {restaurant.instagramUrl && (
              <a href={restaurant.instagramUrl} target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            )}
             {restaurant.facebookUrl && (
              <a href={restaurant.facebookUrl} target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            )}
             {restaurant.twitterUrl && (
              <a href={restaurant.twitterUrl} target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            )}
             {restaurant.websiteUrl && (
              <a href={restaurant.websiteUrl} target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors">
                <Globe className="w-6 h-6" />
              </a>
            )}
          </div>

          {/* Tema Değiştirme */}
          <div>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}