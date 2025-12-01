import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle"; // Tema değiştirme butonunu buraya da ekleyelim

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Ana kapsayıcı: Aydınlıkta gri, karanlıkta koyu gri
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      {/* SOL SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col transition-colors duration-300">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">QR Admin</h2>
          {/* Admin panelinde de tema değiştirebilmek için: */}
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
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <SignOutButton redirectUrl="/">
            <Button variant="outline" className="w-full border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-red-900/50">
              Çıkış Yap
            </Button>
          </SignOutButton>
        </div>
      </aside>

      {/* SAĞ İÇERİK ALANI */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}