import { PrismaClient } from "@prisma/client";
import { getRestaurantFromUser } from "@/actions/restaurant-actions";
import { createWheelItem, deleteWheelItem } from "@/actions/wheel-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, Gift } from "lucide-react";

const prisma = new PrismaClient();

export default async function MarketingPage() {
  const restaurant = await getRestaurantFromUser();
  if (!restaurant) return <div>Önce restoran oluşturun.</div>;

  const items = await prisma.wheelItem.findMany({
    where: { restaurantId: restaurant.id }
  });

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Gift className="text-purple-600" /> Şans Çarkı Yönetimi
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* --- EKLEME FORMU --- */}
        <Card>
          <CardHeader>
            <CardTitle>Yeni Ödül Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createWheelItem.bind(null, restaurant.id)} className="space-y-4">
              <div className="space-y-2">
                <Label>Ödül İsmi (Örn: %10 İndirim)</Label>
                <Input name="label" required placeholder="Müşterinin göreceği yazı" />
              </div>
              <div className="space-y-2">
                <Label>Kazanma Ağırlığı (1-100)</Label>
                <Input name="percentage" type="number" defaultValue="10" min="1" max="100" />
                <p className="text-xs text-muted-foreground">Sayı ne kadar yüksekse çıkma ihtimali o kadar artar.</p>
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Ekle</Button>
            </form>
          </CardContent>
        </Card>

        {/* --- LİSTE --- */}
        <Card>
          <CardHeader>
            <CardTitle>Aktif Dilimler</CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
                <p className="text-gray-500">Henüz ödül eklenmemiş.</p>
            ) : (
                <ul className="space-y-3">
                    {items.map(item => (
                        <li key={item.id} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div>
                                <div className="font-bold">{item.label}</div>
                                <div className="text-xs text-gray-500">Ağırlık: {item.percentage}</div>
                            </div>
                            <form action={deleteWheelItem.bind(null, item.id)}>
                                <Button size="icon" variant="ghost" className="text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </form>
                        </li>
                    ))}
                </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}