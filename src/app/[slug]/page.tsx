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
import PdfDownloader from "@/components/menu/PdfDownloader";
import { getWheelItems } from "@/actions/wheel-actions";

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MenuPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const { cat } = sp;

  const isPdfMode = sp?.pdf === "true";

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

  if (!restaurant) return notFound();

  if (!restaurant.isActive) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
            <h1 className="text-2xl font-bold text-gray-800">Hizmet Dışı</h1>
            <p className="text-gray-600">Bu işletme şu an hizmet vermemektedir.</p>
        </div>
     )
  }

  const wheelItems = await getWheelItems(slug);
  const isModernDesign = restaurant.template === "modern";

  const activeCategory = cat 
    ? restaurant.categories.find((c: any) => c.id === cat)
    : null;

  const nonEmptyCategories = restaurant.categories.filter((c: any) => c.products.length > 0);

  return (
    <div 
      data-theme={restaurant.colorPalette || "blue"}
      className="min-h-screen relative text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-24 overflow-x-hidden bg-white dark:bg-black"
    >
      
      {isPdfMode && (
        <PdfDownloader elementId="menu-container" filename={`${restaurant.slug}-menu`} />
      )}

      {!isPdfMode && (
        <>
          <div className="fixed inset-0 z-[-1]">
            <div className="absolute inset-0 bg-gray-50 dark:bg-[#0a0a0a]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[100px] bg-[var(--brand-primary)] opacity-15 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-[120px] bg-[var(--brand-primary)] opacity-10 pointer-events-none" />
          </div>
          <ViewTracker restaurantId={restaurant.id} />
          <SpinWheel items={wheelItems} />
        </>
      )}

      {/* --- ANA MENÜ İÇERİĞİ --- */}
      <div 
        id="menu-container" 
        className={isPdfMode ? "bg-white text-black mx-auto" : ""}
        // DÜZELTME: PDF Modunda genişliği A4 boyutuna (yaklaşık 794px) sabitliyoruz.
        // Bu sayede görseller ekranı kaplamak için devasa boyutlara ulaşmıyor.
        style={isPdfMode ? { width: '794px', minHeight: '1123px', padding: '20px' } : {}}
      >
        
        {/* PDF Header */}
        {isPdfMode && (
          <div className="text-center mb-8 border-b-2 border-black pb-6 avoid-break">
            <h1 className="text-4xl font-bold text-black mb-2 uppercase tracking-wider">{restaurant.name}</h1>
            {restaurant.description && <p className="text-lg text-gray-600 italic">{restaurant.description}</p>}
          </div>
        )}

        {isModernDesign ? (
          <ModernMenu restaurant={restaurant} categories={restaurant.categories} />
        ) : (
          <>
            {/* Normal Header (PDF Modunda Gizli) */}
            {!isPdfMode && (
                <header className="relative">
                    <div className="relative h-56 md:h-80 w-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    {restaurant.coverUrl ? (
                        <Image src={restaurant.coverUrl} alt="Kapak" fill className="object-cover" priority />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-[var(--brand-primary)] to-slate-900 opacity-90" />
                    )}
                    <div className="absolute inset-0 bg-black/40" />
                    {activeCategory && (
                        <Link href={`/${slug}`} className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md p-2.5 rounded-full text-white border border-white/10">
                        <ArrowLeft className="w-6 h-6" />
                        </Link>
                    )}
                    </div>

                    <div className="container mx-auto px-4 relative -mt-20 z-10 text-center">
                        <div className="relative w-32 h-32 mx-auto rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white shadow-xl">
                            {restaurant.logoUrl ? (
                                <Image src={restaurant.logoUrl} alt="Logo" fill className="object-cover"/>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-4xl font-bold">
                                    {restaurant.name.substring(0,1).toUpperCase()}
                                </div>
                            )}
                        </div>
                        {!activeCategory && (
                        <div className="mt-4">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{restaurant.name}</h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm max-w-md mx-auto">{restaurant.description || "Hoş geldiniz!"}</p>
                        </div>
                        )}
                    </div>
                </header>
            )}

            <main className={!isPdfMode ? "container mx-auto px-4 mt-10" : "mt-4"}>
                {activeCategory ? (
                // 1. KATEGORİ İÇİ GÖRÜNÜM
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    {!isPdfMode && <span className="w-1 h-8 bg-[var(--brand-primary)] rounded-full inline-block"></span>}
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
                            allergens={product.allergens}
                        />
                    ))}
                    </div>
                </div>
                ) : (
                // 2. ANA SAYFA GÖRÜNÜMÜ
                <>
                    {!isPdfMode && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
                            {nonEmptyCategories.map((category: any) => {
                            const catImage = category.imageUrl || category.products[0]?.imageUrl;
                            return (
                                <Link href={`/${slug}?cat=${category.id}`} key={category.id} className="group relative h-40 md:h-56 rounded-2xl overflow-hidden shadow-sm border border-transparent dark:border-gray-800">
                                {catImage ? (
                                    <Image src={catImage} alt={category.name} fill className="object-cover"/>
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                                    <h2 className="text-white text-lg font-bold text-center">{category.name}</h2>
                                    <p className="text-white/70 text-xs text-center">{category.products.length} Ürün</p>
                                </div>
                                </Link>
                            )
                            })}
                        </div>
                    )}

                    {/* PDF (İndirme) Modu: A4 GENİŞLİĞİNDE DÜZENLİ LİSTE */}
                    {isPdfMode && (
                        <div className="space-y-6">
                            {nonEmptyCategories.map((category: any) => (
                                // 'avoid-break' sınıfı bu bloğun bütünlüğünü korumaya yardımcı olur
                                <div key={category.id} className="w-full avoid-break">
                                    
                                    <h2 className="text-xl font-bold border-b-2 border-black pb-1 mb-4 mt-2 text-black uppercase tracking-wider w-full">
                                        {category.name}
                                    </h2>

                                    {/* Grid yerine Flex Wrap kullanıyoruz, daha güvenli */}
                                    <div className="flex flex-wrap gap-4">
                                        {category.products.map((product: any) => (
                                            // Ürün Kartı: avoid-break ile bölünmeyi engelliyoruz
                                            <div 
                                                key={product.id} 
                                                className="w-[48%] flex flex-col border border-gray-300 rounded-lg p-3 bg-white shadow-sm avoid-break"
                                                style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
                                            >
                                                {/* Görsel: Sabit yükseklik ve genişlik */}
                                                {product.imageUrl && (
                                                    <div className="w-full h-40 mb-3 relative overflow-hidden rounded border border-gray-200">
                                                        <img 
                                                            src={product.imageUrl} 
                                                            alt={product.name} 
                                                            className="w-full h-full object-cover"
                                                            crossOrigin="anonymous" 
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-bold text-base text-black leading-tight pr-1">{product.name}</span>
                                                    <span className="font-bold text-lg text-black whitespace-nowrap">
                                                        ₺{Number(product.price)}
                                                    </span>
                                                </div>
                                                
                                                {product.description && (
                                                    <p className="text-xs text-gray-700 leading-snug mt-1 pt-1 border-t border-gray-100">
                                                        {product.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
                )}
            </main>
          </>
        )}
      </div>

      {!isPdfMode && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-6 py-3 z-50 safe-area-bottom">
            <div className="container mx-auto flex items-center justify-between max-w-md">
            <div className="flex gap-6 items-center">
                <Link href={`/${slug}`} className="flex flex-col items-center gap-1 text-gray-400 hover:text-[var(--brand-primary)] dark:hover:text-blue-400 transition">
                    <div className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-blue-900/20 transition">
                        <ShoppingBag size={20} />
                    </div>
                </Link>
                {restaurant.instagramUrl && <a href={restaurant.instagramUrl} target="_blank" className="text-gray-400 hover:text-pink-500"><Instagram size={20} /></a>}
                {restaurant.websiteUrl && <a href={restaurant.websiteUrl} target="_blank" className="text-gray-400 hover:text-green-500"><Globe size={20} /></a>}
            </div>

            <div className="flex items-center gap-4">
                <FeedbackButton restaurantId={restaurant.id} />
                <ThemeToggle />
            </div>
            </div>
        </footer>
      )}
    </div>
  );
}