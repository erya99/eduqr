import { PrismaClient } from "@prisma/client";
import { isSuperAdmin } from "@/lib/check-super-admin";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // Badge bileşeni yoksa span kullanırız veya yükleriz
import { Button } from "@/components/ui/button";
import { toggleRestaurantStatus } from "@/actions/super-admin-actions";

const prisma = new PrismaClient();

export default async function SuperAdminPage() {
  // Güvenlik Kontrolü
  if (!await isSuperAdmin()) {
    return (
        <div className="flex h-screen items-center justify-center text-red-600 font-bold">
            Bu sayfaya erişim yetkiniz yok! 🚫
        </div>
    );
  }

  // Tüm restoranları çek (Kullanıcı bilgisiyle beraber)
  const restaurants = await prisma.restaurant.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">👑 Super Admin Paneli</h1>
      
      <div className="border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restoran Adı</TableHead>
              <TableHead>Sahibi (Email)</TableHead>
              <TableHead>Kayıt Tarihi</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell className="font-medium">{restaurant.name}</TableCell>
                <TableCell>{restaurant.user.email}</TableCell>
                <TableCell>{restaurant.createdAt.toLocaleDateString('tr-TR')}</TableCell>
                <TableCell>
                  {restaurant.isActive ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        Aktif
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                        Pasif
                    </span>
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
                        {restaurant.isActive ? "Pasife Al" : "Aktifleştir"}
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