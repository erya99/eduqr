import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Instagram, Facebook, Twitter, Globe, ArrowLeft, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/menu/ProductCard";
import ViewTracker from "@/components/menu/ViewTracker";
// 👇 YENİ: Çark Bileşeni ve Aksiyonu import edildi
import SpinWheel from "@/components/menu/SpinWheel";
import { getWheelItems } from "@/actions/wheel-actions";

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MenuPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { cat } = await searchParams;

  // 1. Veritabanından restoranı çek
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
            orderBy: { order: 'asc' }, 
            include: { variants: true } 
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!restaurant) {
    return notFound();
  }

  // Hizmet dışı kontrolü
  if (!restaurant.isActive) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
            <h1 className="text-2xl font-bold text-gray-800">Hizmet Dışı</h1>
            <p className="text-gray-600">Bu işletme şu an hizmet vermemektedir.</p>
        </div>
     )
  }

  // 👇 YENİ: Çark verilerini çekiyoruz
  const wheelItems = await getWheelItems(slug);

  // Aktif kategoriyi bul
  const activeCategory = cat 
    ? restaurant.categories.find((c: any) => c.id === cat)
    : null;

  // İçinde ürün olmayan kategorileri filtrele
  const nonEmptyCategories = restaurant.categories.filter((c: any) => c.products.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-24">
      
      {/* --- SAYAÇ --- */}
      <ViewTracker restaurantId={restaurant.id} />

      {/* 👇 YENİ: Çarkıfelek Bileşeni (Sabit Buton Olarak Görünür) */}
      <SpinWheel items={wheelItems} />

      {/* --- HEADER --- */}
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
          
          {activeCategory && (
             <Link 
               href={`/${slug}`} 
               className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white/20 transition border border-white/10"
             >
               <ArrowLeft className="w-6 h-6" />
             </Link>
          )}
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
            
            {!activeCategory && (
              <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{restaurant.name}</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm max-w-md mx-auto">
                  Hoş geldiniz! Lezzetli menümüzü aşağıdan inceleyebilirsiniz.
                </p>
              </div>
            )}
        </div>
      </header>

      {/* --- ANA İÇERİK --- */}
      <main className="container mx-auto px-4 mt-10">
        
        {activeCategory ? (
          // --- ÜRÜN LİSTESİ ---
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-blue-600 rounded-full inline-block"></span>
              {activeCategory.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCategory.products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={Number(product.price)}
                  imageUrl={product.imageUrl}
                  variants={product.variants}
                  allergens={product.allergens} // 👈 YENİ: Alerjen verisini gönderiyoruz
                />
              ))}
            </div>
          </div>

        ) : (
          // --- KATEGORİ LİSTESİ ---
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
            {nonEmptyCategories.map((category: any) => {
              const catImage = category.imageUrl && category.imageUrl !== "" 
                ? category.imageUrl 
                : category.products[0]?.imageUrl;

              return (
                <Link 
                  href={`/${slug}?cat=${category.id}`} 
                  key={category.id}
                  className="group relative h-40 md:h-56 rounded-2xl overflow-hidden shadow-sm active:scale-95 transition-all duration-300 hover:shadow-xl border border-transparent dark:border-gray-800"
                >
                  {catImage ? (
                     <Image
                       src={catImage}
                       alt={category.name}
                       fill
                       className="object-cover group-hover:scale-110 transition-transform duration-700"
                     />
                  ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <h2 className="text-white text-lg md:text-xl font-bold leading-tight text-center">{category.name}</h2>
                    <p className="text-white/70 text-xs mt-1 text-center">{category.products.length} Ürün</p>
                  </div>
                </Link>
              )
            })}
            
            {nonEmptyCategories.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-500">
                    Menü henüz hazırlanmamış.
                </div>
            )}
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-6 py-3 z-50 safe-area-bottom">
        <div className="container mx-auto flex items-center justify-between max-w-md">
          
          <div className="flex gap-6 items-center">
             <Link href={`/${slug}`} className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition group">
                <div className="p-1 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition">
                    <ShoppingBag size={20} />
                </div>
             </Link>

             {restaurant.instagramUrl && (
                 <a href={restaurant.instagramUrl} target="_blank" className="text-gray-400 hover:text-pink-500 transition">
                    <Instagram size={20} />
                 </a>
             )}
             {restaurant.facebookUrl && (
                 <a href={restaurant.facebookUrl} target="_blank" className="text-gray-400 hover:text-blue-600 transition">
                    <Facebook size={20} />
                 </a>
             )}
             {restaurant.twitterUrl && (
                 <a href={restaurant.twitterUrl} target="_blank" className="text-gray-400 hover:text-black dark:hover:text-white transition">
                    <Twitter size={20} />
                 </a>
             )}
             {restaurant.websiteUrl && (
                 <a href={restaurant.websiteUrl} target="_blank" className="text-gray-400 hover:text-green-500 transition">
                    <Globe size={20} />
                 </a>
             )}
          </div>

          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
}