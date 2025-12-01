import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Instagram, Facebook, Twitter, Globe, ArrowLeft, ShoppingBag, Phone } from "lucide-react";
import ProductCard from "@/components/menu/ProductCard";

const prisma = new PrismaClient();

// searchParams özelliği ile URL'deki ?cat=... bilgisini alıyoruz
export default async function MenuPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params;
  const { cat } = await searchParams; // Seçili kategori ID'si (varsa)

  // Restoranı çek
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

  // Aktif kategoriyi bul (Eğer URL'de cat=... varsa)
  const activeCategory = cat 
    ? restaurant.categories.find((c: any) => c.id === cat)
    : null;

  // Sadece ürün içeren kategorileri filtrele
  const nonEmptyCategories = restaurant.categories.filter((c: any) => c.products.length > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-24">
      
      {/* --- HEADER --- */}
      <header className="relative">
        {/* Kapak Resmi */}
        <div className="relative h-48 md:h-64 w-full bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-b-[2rem] shadow-md z-10">
          {restaurant.coverUrl ? (
            <Image src={restaurant.coverUrl} alt="Kapak" fill className="object-cover" priority />
          ) : (
             <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Eğer bir kategori içindeysek Geri Butonu Göster */}
          {activeCategory && (
            <Link 
              href={`/${slug}`} 
              className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
          )}
        </div>

        {/* Logo ve İsim */}
        <div className="relative -mt-16 z-20 text-center px-4">
             <div className="relative w-28 h-28 mx-auto rounded-2xl border-4 border-white dark:border-gray-950 overflow-hidden bg-white shadow-xl">
                {restaurant.logoUrl ? (
                    <Image src={restaurant.logoUrl} alt="Logo" fill className="object-cover"/>
                ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-4xl font-bold">
                        {restaurant.name.substring(0,1)}
                     </div>
                )}
            </div>
            {!activeCategory && (
              <div className="mt-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Hoş geldiniz, lezzetleri keşfedin.</p>
              </div>
            )}
        </div>
      </header>

      {/* --- İÇERİK ALANI --- */}
      <main className="container mx-auto px-4 mt-8">
        
        {activeCategory ? (
          // --- DURUM 1: KATEGORİ SEÇİLMİŞSE (ÜRÜNLERİ GÖSTER) ---
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-800">
              {activeCategory.name}
            </h2>
            <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800">
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
          // --- DURUM 2: ANA SAYFA (KATEGORİLERİ GÖSTER) ---
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
            {nonEmptyCategories.map((category: any) => {
              // Kategorinin resmi varsa onu kullan, yoksa içindeki ilk ürünün resmini, o da yoksa varsayılan
              const catImage = category.imageUrl || category.products[0]?.imageUrl;

              return (
                <Link 
                  href={`/${slug}?cat=${category.id}`} 
                  key={category.id}
                  className="group relative h-40 rounded-2xl overflow-hidden shadow-sm active:scale-95 transition-all duration-200"
                >
                  {catImage ? (
                     <Image
                       src={catImage}
                       alt={category.name}
                       fill
                       className="object-cover group-hover:scale-110 transition-transform duration-700"
                     />
                  ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <h2 className="text-white text-lg font-bold text-center px-2">{category.name}</h2>
                  </div>
                </Link>
              )
            })}
            
            {nonEmptyCategories.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">
                    Menü hazırlanıyor...
                </div>
            )}
          </div>
        )}
      </main>

      {/* --- ALT MENÜ (SABİT) --- */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 px-6 py-3 z-50">
        <div className="container mx-auto flex items-center justify-between max-w-md">
          
          {/* Sosyal Medya Butonu (Açılır Menü Gibi Davranabilir veya Direkt Link) */}
          <div className="flex gap-4">
             {restaurant.instagramUrl && (
                 <a href={restaurant.instagramUrl} target="_blank" className="flex flex-col items-center gap-1 text-gray-500 hover:text-pink-500 transition">
                    <Instagram size={20} />
                    <span className="text-[10px]">Sosyal</span>
                 </a>
             )}
             
             {/* Ana Sayfa Butonu (Kategorilere döner) */}
             <Link href={`/${slug}`} className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full -mt-6 border-4 border-white dark:border-gray-950">
                    <ShoppingBag size={24} />
                </div>
                <span className="text-[10px] font-semibold">Menü</span>
             </Link>

             {/* İletişim / Web */}
             {restaurant.websiteUrl && (
                 <a href={restaurant.websiteUrl} target="_blank" className="flex flex-col items-center gap-1 text-gray-500 hover:text-green-500 transition">
                    <Globe size={20} />
                    <span className="text-[10px]">Web</span>
                 </a>
             )}
          </div>

          {/* Tema */}
          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
}