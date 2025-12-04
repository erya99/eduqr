import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AlertTriangle, Menu } from "lucide-react"; // Menu ikonu eklendi
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const prisma = new PrismaClient();

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  const isSubscribed = 
    restaurant?.isSubscribed && 
    restaurant?.subscriptionEnds && 
    restaurant.subscriptionEnds > new Date();

  // --- MENÜ İÇERİĞİ (Hem Mobil Hem Masaüstü İçin Ortak) ---
  const NavContent = () => (
    <div className="flex flex-col h-full">
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
        <Link href="/admin/subscription">
          <Button variant="ghost" className="w-full justify-start text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
            💳 Abonelik
          </Button>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <SignOutButton redirectUrl="/">
          <Button variant="outline" className="w-full border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-red-900/50">
            Çıkış Yap
          </Button>
        </SignOutButton>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      {/* --- MASAÜSTÜ SIDEBAR (md:flex) --- */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col transition-colors duration-300 fixed h-full z-10">
        <NavContent />
      </aside>

      {/* --- İÇERİK ALANI --- */}
      {/* md:ml-64 ekledik ki sidebar'ın altından çıkıp sağa kaysın */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        
        {/* --- MOBİL HEADER (Sadece Mobilde Görünür) --- */}
        <div className="md:hidden flex items-center justify-between mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <span className="font-bold text-lg dark:text-white">Yönetim Paneli</span>
            
            {/* MOBİL MENÜ TETİKLEYİCİSİ */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-6 h-6 dark:text-white" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
                    <NavContent />
                </SheetContent>
            </Sheet>
        </div>

        {/* ABONELİK UYARISI */}
        {!isSubscribed && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                 <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Ücretsiz Plan</h3>
                <p className="text-xs opacity-90">Tüm özelliklere erişmek için paketinizi yükseltin.</p>
              </div>
            </div>
            <Link href="/admin/subscription" className="w-full sm:w-auto">
              <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white border-0">
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