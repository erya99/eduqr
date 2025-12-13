import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ListChecks, 
  Settings, 
  CreditCard, 
  Gift, 
  LogOut,
  Menu,
  QrCode,
  Store
} from "lucide-react";
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

  const sidebarLinks = [
    { href: "/admin", label: "Panel", icon: LayoutDashboard },
    { href: "/admin/products", label: "Ürünler", icon: UtensilsCrossed },
    { href: "/admin/categories", label: "Kategoriler", icon: ListChecks },
    { href: "/admin/marketing", label: "Kampanyalar (Çark)", icon: Gift, highlight: true },
    { href: "/admin/subscription", label: "Abonelik", icon: CreditCard },
    { href: "/admin/settings", label: "Ayarlar", icon: Settings },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full bg-muted/40 dark:bg-gray-900/50 border-r border-border">
      <div className="h-16 px-6 border-b border-border flex items-center justify-between bg-background/50 backdrop-blur-sm">
        <Link href="/admin" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
             <QrCode className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg tracking-tight text-foreground">EduQR Yönetici</span>
        </Link>
        <div className="scale-90"> 
          <ThemeToggle />
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button 
              variant="ghost" 
              className={`w-full justify-start mb-1 h-10 px-3
                ${link.highlight 
                  ? "text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                }
              `}
            >
              <link.icon className={`mr-3 h-4 w-4 ${link.highlight ? "animate-pulse" : ""}`} />
              {link.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border mt-auto bg-background/30">
        <SignOutButton redirectUrl="/">
          <Button variant="outline" className="w-full justify-start gap-2 border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 dark:border-red-900/30 dark:bg-transparent">
            <LogOut className="h-4 w-4" />
            <span>Çıkış Yap</span>
          </Button>
        </SignOutButton>
      </div>
    </div>
  );

  return (
    // DÜZELTME BURADA: 'grid' kaldırıldı, sadece flex yapısı kullanıldı.
    <div className="flex min-h-screen w-full bg-muted/10 dark:bg-black">
      
      {/* --- MASAÜSTÜ SIDEBAR (SABİT) --- */}
      <aside className="hidden md:block fixed top-0 left-0 h-full w-[240px] z-30">
        <NavContent />
      </aside>

      {/* --- İÇERİK ALANI --- */}
      {/* 'ml-[240px]' ile içerik sidebar'ın sağından başlar */}
      <div className="flex flex-col flex-1 w-full md:ml-[240px] transition-all duration-300"> 
        
        {/* MOBİL HEADER */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[240px]">
              <NavContent />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2 font-semibold">
             <Store className="h-5 w-5 text-primary" />
             <span>Yönetim Paneli</span>
          </div>
        </header>

        {/* ANA İÇERİK */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          
          {/* ABONELİK UYARISI */}
          {!isSubscribed && (
            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-200 shadow-sm">
              <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                 <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full shrink-0 hidden sm:block">
                    <Gift className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                 </div>
                 <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Ücretsiz Plan Kullanıyorsunuz</p>
                    <p className="text-sm opacity-90">Sınırsız ürün ekleme ve yapay zeka özellikleri için paketinizi yükseltin.</p>
                 </div>
                 <Link href="/admin/subscription" className="w-full sm:w-auto">
                    <Button size="sm" className="w-full sm:w-auto bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-500">
                      Yükselt
                    </Button>
                 </Link>
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}