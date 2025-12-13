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
import PdfDownloader from "@/components/menu/PdfDownloader"; // 👈 PDF İndirici Bileşeni
import { getWheelItems } from "@/actions/wheel-actions";

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MenuPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams; // searchParams'i await ediyoruz
  const { cat } = sp;

  // PDF Modu Kontrolü (?pdf=true ise)
  const isPdfMode = sp?.pdf === "true";

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

  if (!restaurant) return notFound();

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
      
      {/* --- PDF İNDİRME MODÜLÜ (Sadece PDF modunda çalışır) --- */}
      {isPdfMode && (
        <PdfDownloader elementId="menu-container" filename={`${restaurant.slug}-menu`} />
      )}

      {/* --- ARKA PLAN VE EKSTRALAR (PDF Modunda Gizli) --- */}
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
      {/* "menu-container" ID'si html2pdf'in yakalayacağı alandır */}
      <div id="menu-container" className={isPdfMode ? "p-8 bg-white text-black min-h-screen" : ""}>
        
        {/* PDF Header (Sadece PDF Çıktısında Görünür) */}
        {isPdfMode && (
          <div className="text-center mb-10 border-b-2 border-black pb-6">
            <h1 className="text-5xl font-bold text-black mb-3 tracking-tight">{restaurant.name}</h1>
            {restaurant.description && <p className="text-xl text-gray-600 italic">{restaurant.description}</p>}
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

            <main className="container mx-auto px-4 mt-10">
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
                    {/* WEB (Normal) Modu: Kategori Kartları */}
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

                    {/* PDF (İndirme) Modu: Tüm Kategoriler Alt Alta (Görselsiz Kategori, Görselli Ürün) */}
                    {isPdfMode && (
                        <div className="space-y-10">
                            {nonEmptyCategories.map((category: any) => (
                                <div key={category.id} className="break-inside-avoid">
                                    <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-6 mt-4 text-black uppercase tracking-wider">
                                        {category.name}
                                    </h2>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                        {category.products.map((product: any) => (
                                            <div key={product.id} className="flex flex-col border border-gray-200 rounded-lg p-3 bg-white shadow-sm break-inside-avoid">
                                                {product.imageUrl && (
                                                    <div className="h-40 w-full mb-3 rounded-md overflow-hidden bg-gray-100 relative">
                                                        {/* html2pdf için standart img etiketi daha kararlıdır */}
                                                        <img 
                                                            src={product.imageUrl} 
                                                            alt={product.name} 
                                                            className="object-cover w-full h-full"
                                                            crossOrigin="anonymous" 
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-bold text-lg text-black">{product.name}</span>
                                                    <span className="font-bold text-xl text-black whitespace-nowrap ml-2">₺{Number(product.price)}</span>
                                                </div>
                                                {product.description && (
                                                    <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
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

      {/* --- FOOTER (PDF Modunda Gizli) --- */}
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