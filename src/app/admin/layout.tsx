import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AlertTriangle } from "lucide-react"; // İkon için (yoksa silebilirsin)

const prisma = new PrismaClient();

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Kullanıcıyı ve Restoranı Çek
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  // Eğer restoran yoksa onboarding'e yönlendir (Güvenlik)
  // Ancak bu layout onboarding sayfasını da kapsıyorsa bu satırı kaldırabilirsin.
  // Genelde onboarding /app/onboarding adresindedir ve bu layout'tan etkilenmez.
  if (!restaurant) {
     // redirect("/onboarding"); 
  }

  // 2. Abonelik Kontrolü
  // Abone mi? VE Süresi bitmemiş mi?
  const isSubscribed = 
    restaurant?.isSubscribed && 
    restaurant?.subscriptionEnds && 
    restaurant.subscriptionEnds > new Date();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      {/* --- SOL SIDEBAR --- */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col transition-colors duration-300">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">QR Admin</h2>
          <div className="scale-75 origin-right"> 
            <ThemeToggle />
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              📊 Panel
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              🍔 Ürünler
            </Button>
          </Link>
          <Link href="/admin/categories">
            <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              fyp Kategoriler
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              ⚙️ Ayarlar
            </Button>
          </Link>
          {/* Abonelik Sayfası Linki */}
          <Link href="/admin/subscription">
            <Button variant="ghost" className="w-full justify-start text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              💳 Abonelik
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <SignOutButton redirectUrl="/">
            <Button variant="outline" className="w-full border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-red-900/50">
              Çıkış Yap
            </Button>
          </SignOutButton>
        </div>
      </aside>

      {/* --- SAĞ İÇERİK ALANI --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* ABONELİK UYARISI (GATEKEEPER) */}
        {!isSubscribed && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm animate-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                 {/* İkon yoksa buraya ⚠️ koyabilirsin */}
                 <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Ücretsiz Plan Kullanıyorsunuz</h3>
                <p className="text-xs opacity-90">Tüm özelliklere erişmek ve limitleri kaldırmak için paketinizi yükseltin.</p>
              </div>
            </div>
            <Link href="/admin/subscription">
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white border-0 whitespace-nowrap">
                Hemen Abone Ol
              </Button>
            </Link>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}