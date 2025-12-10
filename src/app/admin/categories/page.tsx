import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import CategoryAddForm from "@/components/admin/CategoryAddForm";
import { redirect } from "next/navigation";
import SortableCategoryList from "@/components/admin/SortableCategoryList"; // Yeni sürüklenebilir liste bileşeni

const prisma = new PrismaClient();

export default async function AdminCategoriesPage() {
  const user = await currentUser();
  if (!user) return <div>Giriş yapınız.</div>;

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) return <div>Önce restoran oluşturun.</div>;

  // --- ABONELİK KONTROLÜ ---
  const isSubscribed = 
    restaurant.isSubscribed && 
    restaurant.subscriptionEnds && 
    restaurant.subscriptionEnds > new Date();

  if (!isSubscribed) {
    redirect("/admin/subscription");
  }

  // 1. KATEGORİLERİ ÇEK
  // ÖNEMLİ: Sıralama 'order' alanına göre 'asc' (artan) olmalı
  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id },
    include: {
        _count: {
            select: { products: true }
        }
    },
    orderBy: { order: 'asc' } 
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Kategoriler</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Yeni Kategori Oluştur</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryAddForm />
        </CardContent>
      </Card>

      {/* 2. SÜRÜKLENEBİLİR LİSTE BİLEŞENİ */}
      {/* Kartların render edilmesi ve sürükle-bırak mantığı bu bileşenin içinde */}
      <SortableCategoryList initialCategories={categories} />

      {categories.length === 0 && (
          <div className="text-gray-500 col-span-full text-center py-10">
              Henüz kategori eklenmemiş.
          </div>
      )}
    </div>
  );
}