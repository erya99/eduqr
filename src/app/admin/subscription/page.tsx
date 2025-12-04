import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import PaytrButton from "@/components/admin/PaytrButton"; // Birazdan yapacağız
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export default async function SubscriptionPage() {
  const user = await currentUser();
  const restaurant = await prisma.restaurant.findFirst({ where: { userId: user?.id } });

  const isSubscribed = restaurant?.isSubscribed && restaurant.subscriptionEnds && restaurant.subscriptionEnds > new Date();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Abonelik Planı</h1>
        <p className="text-muted-foreground">İşletmenizi büyütmek için profesyonel pakete geçin.</p>
      </div>

      <Card className="w-[380px] border-2 border-blue-600 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg">
            ÖNERİLEN
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Profesyonel</CardTitle>
          <CardDescription>Her şey dahil tek paket.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold">250 ₺</span>
            <span className="text-muted-foreground mb-1">+ KDV / Ay</span>
          </div>
          
          <ul className="space-y-2 text-sm">
            {["Sınırsız Ürün Ekleme", "Sınırsız Kategori", "QR Kod Oluşturucu", "Görsel Yükleme", "7/24 Destek"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" /> {item}
                </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
            {isSubscribed ? (
                <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                    Aboneliğiniz Aktif (Bitiş: {restaurant?.subscriptionEnds?.toLocaleDateString()})
                </Button>
            ) : (
                // Ödeme Butonu Bileşeni
                <PaytrButton />
            )}
        </CardFooter>
      </Card>
    </div>
  );
}