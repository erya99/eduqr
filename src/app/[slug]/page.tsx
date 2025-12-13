import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Instagram, Facebook, Twitter, Globe, ArrowLeft, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/menu/ProductCard";
import ViewTracker from "@/components/menu/ViewTracker";
import SpinWheel from "@/components/menu/SpinWheel";
import ModernMenu from "@/components/menu/ModernMenu";
import FeedbackButton from "@/components/menu/FeedbackButton";
import AutoPrint from "@/components/menu/AutoPrint"; // 👈 1. AutoPrint Eklendi
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

  // Çark verilerini çekiyoruz
  const wheelItems = await getWheelItems(slug);

  // Tasarım Kontrolü: Modern mi Klasik mi?
  const isModernDesign = restaurant.template === "modern";

  // Klasik Tasarım için Veri Hazırlığı
  const activeCategory = cat 
    ? restaurant.categories.find((c: any) => c.id === cat)
    : null;

  const nonEmptyCategories = restaurant.categories.filter((c: any) => c.products.length > 0);

  return (
    // data-theme ile renk paletini sayfaya giydiriyoruz
    <div 
      data-theme={restaurant.colorPalette || "blue"}
      className="min-h-screen relative text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-24 overflow-x-hidden bg-white dark:bg-black"
    >
      
      {/* 2. OTOMATİK YAZDIRMA (Sadece ?print=true varsa çalışır) */}
      <AutoPrint />

      {/* DİNAMİK ARKA PLAN KATMANLARI (Glow Efekti) - PRINT'TE GİZLİ */}
      <div className="fixed inset-0 z-[-1] print:hidden">
        {/* 1. Katman: Ana Zemin Rengi */}
        <div className="absolute inset-0 bg-gray-50 dark:bg-[#0a0a0a]" />
        
        {/* 2. Katman: Tema Rengi Işıltısı (Üstten vuran ışık) */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-opacity duration-500"
          style={{ 
            backgroundColor: 'var(--brand-primary)',
            opacity: 'var(--bg-glow-opacity, 0.15)' 
          }}
        />

        {/* 3. Katman: Alt kısımdan vuran hafif ışık */}
        <div 
          className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500"
          style={{ 
            backgroundColor: 'var(--brand-primary)',
            opacity: 'var(--bg-glow-opacity, 0.10)' 
          }}
        />
      </div>

      {/* --- SAYAÇ & ÇARKIFELEK (PRINT'TE GİZLİ) --- */}
      <div className="print:hidden">
        <ViewTracker restaurantId={restaurant.id} />
        <SpinWheel items={wheelItems} />
      </div>
      
      {/* --- PRINT HEADER (Sadece PDF/Yazıcı modunda görünür) --- */}
      <div className="hidden print:block text-center mb-8 pt-4 border-b pb-4">
         <h1 className="text-3xl font-bold text-black">{restaurant.name}</h1>
         {restaurant.description && <p className="text-gray-600 mt-2">{restaurant.description}</p>}
      </div>

      {/* --- İÇERİK ALANI --- */}
      {isModernDesign ? (
        // ==========================================
        // SEÇENEK A: MODERN GÖRSELSİZ TASARIM
        // ==========================================
        <ModernMenu restaurant={restaurant} categories={restaurant.categories} />
      ) : (
        // ==========================================
        // SEÇENEK B: KLASİK GÖRSEL AĞIRLIKLI TASARIM
        // ==========================================
        <>
          {/* --- HEADER (PRINT'TE GİZLİ) --- */}
          <header className="relative print:hidden">
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
                 <div className="w-full h-full bg-gradient-to-r from-[var(--brand-primary)] to-slate-900 opacity-90" />
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
                    {restaurant.description && (
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm max-w-md mx-auto">
                            {restaurant.description}
                        </p>
                    )}
                    {!restaurant.description && (
                         <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm max-w-md mx-auto">
                           Hoş geldiniz! Lezzetli menümüzü aşağıdan inceleyebilirsiniz.
                         </p>
                    )}
                  </div>
                )}
            </div>
          </header>

          {/* --- ANA İÇERİK --- */}
          <main className="container mx-auto px-4 mt-10">
            {activeCategory ? (
              // --- TEK KATEGORİ GÖRÜNÜMÜ ---
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-black print:text-black">
                  <span className="w-1 h-8 bg-[var(--brand-primary)] rounded-full inline-block print:hidden"></span>
                  {activeCategory.name}
                </h2>
                {/* Print modunda grid yapısını koru ama sayfa bölünmesini yönet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
                  {activeCategory.products.map((product: any) => (
                    <div key={product.id} className="break-inside-avoid">
                        <ProductCard
                          name={product.name}
                          description={product.description}
                          price={Number(product.price)}
                          imageUrl={product.imageUrl}
                          variants={product.variants}
                          allergens={product.allergens}
                        />
                    </div>
                  ))}
                </div>
              </div>

            ) : (
              // --- ANA SAYFA (KATEGORİ LİSTESİ) ---
              <>
                  {/* WEB GÖRÜNÜMÜ: Sadece Kategori Kartları */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500 print:hidden">
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

                  {/* PRINT GÖRÜNÜMÜ: Tüm Menü Listesi (Kategori Görselsiz, Ürün Görselli) */}
                  <div className="hidden print:block space-y-8">
                        {nonEmptyCategories.map((category: any) => (
                            <div key={category.id} className="break-inside-avoid">
                                <h2 className="text-xl font-bold border-b border-black pb-2 mb-4 mt-6 text-black">
                                    {category.name}
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {category.products.map((product: any) => (
                                        <div key={product.id} className="break-inside-avoid border rounded-lg p-2 border-gray-300">
                                            {product.imageUrl && (
                                                <div className="relative h-32 w-full mb-2 overflow-hidden rounded-md">
                                                    {/* Next/Image printte bazen sorun çıkarabilir, standart img daha güvenli */}
                                                    <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                                                </div>
                                            )}
                                            <div className="font-bold text-black">{product.name}</div>
                                            <div className="text-sm text-gray-600">{product.description}</div>
                                            <div className="text-right font-bold mt-1 text-black">
                                                ₺{Number(product.price)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                  </div>
              </>
            )}
          </main>
        </>
      )}

      {/* --- FOOTER (PRINT'TE GİZLİ) --- */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-6 py-3 z-50 safe-area-bottom print:hidden">
        <div className="container mx-auto flex items-center justify-between max-w-md">
          
          <div className="flex gap-6 items-center">
             <Link href={`/${slug}`} className="flex flex-col items-center gap-1 text-gray-400 hover:text-[var(--brand-primary)] dark:hover:text-blue-400 transition group">
                <div className="p-1 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-blue-900/20 transition">
                    <ShoppingBag size={20} />
                </div>
             </Link>

             {/* SOSYAL MEDYA İKONLARI */}
             {restaurant.instagramUrl && (
                 <a href={restaurant.instagramUrl} target="_blank" className="text-gray-400 hover:text-pink-500 transition">
                    <Instagram size={20} />
                 </a>
             )}
             {restaurant.facebookUrl && (
                 <a href={restaurant.facebookUrl} target="_blank" className="text-gray-400 hover:text-[var(--brand-primary)] transition">
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

          <div className="flex items-center gap-4">
             {/* FeedbackButton ve ThemeToggle yanyana */}
             <FeedbackButton restaurantId={restaurant.id} />
             <ThemeToggle />
          </div>

        </div>
      </footer>
    </div>
  );
}