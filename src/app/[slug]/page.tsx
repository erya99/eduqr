import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Instagram, Facebook, Twitter, Globe, ArrowLeft, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/menu/ProductCard";

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MenuPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { cat } = await searchParams;

  const restaurant: any = await prisma.restaurant.findUnique({
    where: { slug: slug, isActive: true },
    include: {
      categories: {
        orderBy: { createdAt: 'asc' },
        include: {
          products: {
            where: { isAvailable: true },
            orderBy: { createdAt: 'desc' }
          }
        }
      }
    }
  });

  if (!restaurant) return notFound();

  const activeCategory = cat 
    ? restaurant.categories.find((c: any) => c.id === cat)
    : null;

  const nonEmptyCategories = restaurant.categories.filter((c: any) => c.products.length > 0);

  return (
    // Arka plan rengini düzelttik: Dark modda tam siyah değil, çok koyu gri (daha modern)
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-24">
      
      {/* HEADER */}
      <header className="relative">
        <div className="relative h-48 md:h-64 w-full bg-gray-200 dark:bg-gray-900 overflow-hidden rounded-b-[2.5rem] shadow-sm z-10">
          {restaurant.coverUrl ? (
            <Image src={restaurant.coverUrl} alt="Kapak" fill className="object-cover" priority />
          ) : (
             <div className="w-full h-full bg-gradient-to-r from-slate-900 to-slate-800" />
          )}
          <div className="absolute inset-0 bg-black/30" />
          
          {activeCategory && (
            <Link 
              href={`/${slug}`} 
              className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white/20 transition border border-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
          )}
        </div>

        {/* Logo */}
        <div className="relative -mt-14 z-20 text-center px-4">
             <div className="relative w-28 h-28 mx-auto rounded-3xl border-4 border-white dark:border-[#0a0a0a] overflow-hidden bg-white shadow-2xl">
                {restaurant.logoUrl ? (
                    <Image src={restaurant.logoUrl} alt="Logo" fill className="object-cover"/>
                ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-4xl font-bold">
                        {restaurant.name.substring(0,1)}
                     </div>
                )}
            </div>
            {!activeCategory && (
              <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold tracking-tight">{restaurant.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">Hoş geldiniz 👋</p>
              </div>
            )}
        </div>
      </header>

      {/* İÇERİK */}
      <main className="container mx-auto px-4 mt-8">
        
        {activeCategory ? (
          // --- ÜRÜN LİSTESİ ---
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-blue-600 rounded-full inline-block"></span>
              {activeCategory.name}
            </h2>
            {/* Ürünler arası boşluk ve grid yapısı */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCategory.products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={Number(product.price)}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>
          </div>

        ) : (
          // --- KATEGORİ LİSTESİ ---
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
            {nonEmptyCategories.map((category: any) => {
              // MANTIK DÜZELTİLDİ:
              // 1. Önce kategori resmine bak.
              // 2. Yoksa ilk ürünün resmine bak.
              // 3. O da yoksa boş.
              const catImage = category.imageUrl && category.imageUrl !== "" 
                ? category.imageUrl 
                : category.products[0]?.imageUrl;

              return (
                <Link 
                  href={`/${slug}?cat=${category.id}`} 
                  key={category.id}
                  className="group relative h-36 sm:h-44 rounded-3xl overflow-hidden shadow-sm active:scale-95 transition-all duration-300 hover:shadow-lg border border-transparent dark:border-gray-800"
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
                  
                  {/* Modern Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <h2 className="text-white text-lg font-bold leading-tight">{category.name}</h2>
                    <p className="text-white/70 text-xs mt-1">{category.products.length} Ürün</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-6 py-3 z-50">
        <div className="container mx-auto flex items-center justify-between max-w-md">
          <div className="flex gap-6 items-center">
             {/* Ana Sayfa Butonu */}
             <Link href={`/${slug}`} className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                <ShoppingBag size={20} />
             </Link>

             {/* Sosyal Medya */}
             {restaurant.instagramUrl && (
                 <a href={restaurant.instagramUrl} target="_blank" className="text-gray-400 hover:text-pink-500 transition">
                    <Instagram size={20} />
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