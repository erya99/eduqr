import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs"; // Eklendi

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SOL SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">QR Menu Admin</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">
              📊 Panel (Dashboard)
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="ghost" className="w-full justify-start">
              🍔 Ürünler
            </Button>
          </Link>
          <Link href="/admin/categories">
            <Button variant="ghost" className="w-full justify-start">
              fyp Kategoriler
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start">
              ⚙️ Restoran Ayarları
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          {/* Clerk Çıkış Bileşeni */}
          <SignOutButton redirectUrl="/">
            <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
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