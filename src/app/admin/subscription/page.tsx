import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import PaytrButton from "@/components/admin/PaytrButton"; 
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export default async function SubscriptionPage() {
  const user = await currentUser();
  const restaurant = await prisma.restaurant.findFirst({ where: { userId: user?.id } });

  const isSubscribed = restaurant?.isSubscribed && restaurant.subscriptionEnds && restaurant.subscriptionEnds > new Date();

  // YENİLENEN ÖZELLİK LİSTESİ
  const features = [
    "Sınırsız Ürün & Kategori",
    "Gelişmiş Tema Seçenekleri",    // Yeni
    "Çark Menü Modülü",             // Yeni
    "Menüyü Görsel Olarak İndirme", // Yeni
    "QR Kod Oluşturucu",
    "Görsel Yükleme (Cloudinary)",
    "7/24 Teknik Destek"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Abonelik Seçenekleri</h1>
        <p className="text-muted-foreground">İşletmenize en uygun planı seçin, hemen başlayın.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full px-4">
        
        {/* 1. AYLIK PLAN (MEVCUT) */}
        <Card className="border-2 shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Aylık Paket</CardTitle>
            <CardDescription>Esnek ödeme, taahhüt yok.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold">250 ₺</span>
              <span className="text-muted-foreground mb-1">+ KDV / Ay</span>
            </div>
            <ul className="space-y-2 text-sm pt-4">
              {features.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> {item}
                  </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {isSubscribed ? (
                <Button className="w-full bg-green-600" disabled>Aktif</Button>
            ) : (
                <PaytrButton 
                  restaurantId={restaurant?.id} 
                  planType="monthly" 
                  price={300} 
                  label="Aylık Satın Al" 
                />
            )}
          </CardFooter>
        </Card>

        {/* 2. YILLIK PLAN (YENİ KAMPANYALI) */}
        <Card className="border-2 border-blue-600 shadow-xl relative flex flex-col transform md:scale-105">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg font-bold flex items-center gap-1">
             <Star className="w-3 h-3 fill-white" /> KAMPANYA
          </div>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Yıllık Paket</CardTitle>
            <CardDescription>1 Yıl ödeyin, avantajlı çıkın.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold">2.500 ₺</span>
              <span className="text-muted-foreground mb-1">+ KDV / Yıl</span>
            </div>
            <p className="text-xs text-blue-600 font-medium bg-blue-50 p-2 rounded-md inline-block">
              Normalde 3.000₺ yerine 2.500₺! (500₺ Kazanç)
            </p>
            <ul className="space-y-2 text-sm pt-4">
              {features.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-600" /> {item}
                  </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {isSubscribed ? (
                <Button className="w-full bg-green-600" disabled>Aktif</Button>
            ) : (
                <PaytrButton 
                  restaurantId={restaurant?.id} 
                  planType="yearly" 
                  price={3000} 
                  label="Yıllık Avantajlı Al" 
                />
            )}
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}