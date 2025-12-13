import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, Download, ExternalLink, Gift, Trash2, Eye, EyeOff, Printer } from "lucide-react"; // İkonlar güncellendi
import QRCodeCard from "@/components/admin/QRCodeCard";
import { createWheelItem, deleteWheelItem, toggleWheelItemStatus } from "@/actions/wheel-actions";

const prisma = new PrismaClient();

export default async function MarketingPage() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id },
    include: {
      wheelItems: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!restaurant) return <div>Önce restoran oluşturun.</div>;

  const items = restaurant.wheelItems;

  return (
    <div className="space-y-8 p-4 animate-in fade-in duration-500">
      
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pazarlama Araçları</h2>
        <p className="text-muted-foreground">
          Müşterilerinize ulaşmak için QR kodlar, menü çıktıları ve kampanyalar oluşturun.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 1. KART: QR KOD */}
        <QRCodeCard slug={restaurant.slug} />

        {/* 2. KART: MENÜ GÖRSELİ İNDİRME */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Menü Görsel Çıktısı
            </CardTitle>
            <CardDescription>
              Menünüzü yüksek kaliteli resim (PNG) olarak indirin ve paylaşın.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                <p>💡 <strong>Bilgi:</strong> Butona tıkladığınızda menünüz tek parça, uzun bir görsel (PNG) olarak indirilecektir.</p>
             </div>

             <div className="flex flex-col gap-3">
                 <Button asChild className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700" variant="default">
                    {/* Link aynı kalıyor (?pdf=true), ama artık arka planda PNG indirici çalışacak */}
                    <Link href={`/${restaurant.slug}?pdf=true`} target="_blank">
                        <Download className="mr-2 h-5 w-5" />
                        PNG Olarak İndir
                    </Link>
                 </Button>

                 <Button asChild variant="outline" className="w-full">
                    <Link href={`/${restaurant.slug}`} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Menüyü Görüntüle (Normal)
                    </Link>
                 </Button>
             </div>
          </CardContent>
        </Card>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* --- ALT KISIM: ÇARKIFELEK YÖNETİMİ --- */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-white mb-6">
            <Gift className="text-purple-600 w-8 h-8" /> Şans Çarkı Yönetimi
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-fit">
            <CardHeader>
                <CardTitle>Yeni Kampanya/Ödül Ekle</CardTitle>
                <CardDescription>Müşterilerin çarkı çevirdiğinde kazanabileceği ödülleri tanımlayın.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={createWheelItem.bind(null, restaurant.id)} className="space-y-4">
                <div className="space-y-2">
                    <Label>Ödül İsmi (Örn: %10 İndirim)</Label>
                    <Input name="label" required placeholder="Müşterinin göreceği yazı" />
                </div>
                <div className="space-y-2">
                    <Label>Kazanma İhtimali (Ağırlık: 1-100)</Label>
                    <Input name="percentage" type="number" defaultValue="10" min="1" max="100" />
                    <p className="text-xs text-muted-foreground">Yüksek sayı = Daha yüksek çıkma şansı.</p>
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Gift className="w-4 h-4 mr-2" /> Ekle
                </Button>
                </form>
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle>Tanımlı Ödüller ({items.length})</CardTitle>
                <CardDescription>Aktif ödüller çarkta görünür, pasifler gizlenir.</CardDescription>
            </CardHeader>
            <CardContent>
                {items.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed rounded-xl bg-gray-50 dark:bg-gray-900/50">
                        <Gift className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">Henüz ödül eklenmemiş.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {items.map((item) => (
                            <li 
                                key={item.id} 
                                className={`flex justify-between items-center p-3 border rounded-lg transition-all ${
                                item.isActive 
                                    ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm" 
                                    : "bg-gray-50 dark:bg-gray-900 border-dashed border-gray-300 opacity-60"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full ${item.isActive ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-400"}`} />
                                    <div>
                                        <div className={`font-semibold ${item.isActive ? "text-gray-900 dark:text-white" : "text-gray-500 line-through"}`}>
                                            {item.label}
                                        </div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                            <span>Şans Ağırlığı:</span>
                                            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-[10px]">{item.percentage}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-1">
                                    <form action={toggleWheelItemStatus.bind(null, item.id, item.isActive)}>
                                        <Button size="icon" variant="ghost" className="h-8 w-8" title={item.isActive ? "Pasife Al" : "Aktifleştir"}>
                                            {item.isActive ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-500" />}
                                        </Button>
                                    </form>

                                    <form action={deleteWheelItem.bind(null, item.id)}>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}