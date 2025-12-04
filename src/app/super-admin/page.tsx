import { PrismaClient } from "@prisma/client";
import { isSuperAdmin } from "@/lib/check-super-admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toggleRestaurantStatus } from "@/actions/super-admin-actions";
import SubscriptionManager from "@/components/admin/SubscriptionManager"; // YENİ BİLEŞEN

const prisma = new PrismaClient();

export default async function SuperAdminPage() {
  if (!await isSuperAdmin()) {
    return <div className="p-10 text-red-600 font-bold">Yetkisiz Erişim! 🚫</div>;
  }

  // --- OTOMATİK KONTROL MEKANİZMASI ---
  // Sayfa her açıldığında süresi bitmiş olanları bul ve pasife çek
  const now = new Date();
  await prisma.restaurant.updateMany({
    where: {
      subscriptionEnds: { lt: now }, // Süresi geçmiş olanlar
      isActive: true, // Ama hala aktif görünenler
    },
    data: {
      isActive: false,
      isSubscribed: false
    }
  });
  // ------------------------------------

  const restaurants = await prisma.restaurant.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">👑 Super Admin Paneli</h1>
      
      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restoran Adı</TableHead>
              <TableHead>Sahibi</TableHead>
              <TableHead>Abonelik Durumu</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell className="font-medium">{restaurant.name}</TableCell>
                <TableCell className="text-xs text-gray-500">{restaurant.user.email}</TableCell>
                
                {/* ABONELİK YÖNETİMİ SÜTUNU */}
                <TableCell>
                    <SubscriptionManager 
                        restaurantId={restaurant.id} 
                        currentEnd={restaurant.subscriptionEnds} 
                    />
                </TableCell>

                <TableCell>
                  {restaurant.isActive ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Aktif</span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Pasif</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <form action={async () => {
                    "use server";
                    await toggleRestaurantStatus(restaurant.id, restaurant.isActive);
                  }}>
                    <Button 
                        size="sm" 
                        variant={restaurant.isActive ? "destructive" : "default"}
                    >
                        {restaurant.isActive ? "Kapat" : "Aç"}
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}