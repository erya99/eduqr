import { PrismaClient } from "@prisma/client";
import { getRestaurantFromUser } from "@/actions/restaurant-actions";
import { createWheelItem, deleteWheelItem, toggleWheelItemStatus } from "@/actions/wheel-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, Gift, Eye, EyeOff } from "lucide-react";

const prisma = new PrismaClient();

export default async function MarketingPage() {
  const restaurant = await getRestaurantFromUser();
  if (!restaurant) return <div>Önce restoran oluşturun.</div>;

  // Tüm öğeleri getiriyoruz (Aktif + Pasif)
  const items = await prisma.wheelItem.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
        <Gift className="text-purple-600" /> Şans Çarkı Yönetimi
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* --- EKLEME FORMU --- */}
        <Card>
          <CardHeader>
            <CardTitle>Yeni Kampanya/Ödül Ekle</CardTitle>
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
                <p className="text-xs text-muted-foreground">Yüksek sayı = Daha yüksek kazanma şansı.</p>
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Ekle</Button>
            </form>
          </CardContent>
        </Card>

        {/* --- YÖNETİM LİSTESİ --- */}
        <Card>
          <CardHeader>
            <CardTitle>Tanımlı Ödüller ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Henüz ödül eklenmemiş.</p>
            ) : (
                <ul className="space-y-3">
                    {items.map((item: any) => (
                        <li 
                          key={item.id} 
                          className={`flex justify-between items-center p-3 border rounded-lg transition-colors ${
                            item.isActive 
                              ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                              : "bg-gray-100 dark:bg-gray-900 border-dashed border-gray-300 opacity-70"
                          }`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Durum İkonu */}
                                <div className={`w-2 h-2 rounded-full ${item.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                                
                                <div>
                                    <div className={`font-bold ${item.isActive ? "text-gray-900 dark:text-white" : "text-gray-500 line-through"}`}>
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Ağırlık: {item.percentage}</div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {/* AKTİF/PASİF BUTONU */}
                                <form action={toggleWheelItemStatus.bind(null, item.id, item.isActive)}>
                                    <Button size="icon" variant="outline" title={item.isActive ? "Pasife Al" : "Aktifleştir"}>
                                        {item.isActive ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-500" />}
                                    </Button>
                                </form>

                                {/* SİLME BUTONU */}
                                <form action={deleteWheelItem.bind(null, item.id)}>
                                    <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
  );
}