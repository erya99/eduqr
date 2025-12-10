import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button"; // ARTIK GEREK YOK
// import { Trash2 } from "lucide-react"; // ARTIK GEREK YOK
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import CategoryAddForm from "@/components/admin/CategoryAddForm";
// import { deleteCategory } from "@/actions/category-actions"; // ARTIK GEREK YOK (Action içinde kullanılıyor)
import { redirect } from "next/navigation";
import Image from "next/image";
import CategoryActions from "@/components/admin/CategoryActions"; // YENİ EKLENDİ

const prisma = new PrismaClient();

export default async function AdminCategoriesPage() {
  const user = await currentUser();
  if (!user) return <div>Giriş yapınız.</div>;

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) return <div>Önce restoran oluşturun.</div>;

  const isSubscribed = 
    restaurant.isSubscribed && 
    restaurant.subscriptionEnds && 
    restaurant.subscriptionEnds > new Date();

  if (!isSubscribed) {
    redirect("/admin/subscription");
  }

  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id },
    include: {
        _count: {
            select: { products: true }
        }
    },
    orderBy: { createdAt: 'desc' }
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="flex flex-col justify-between overflow-hidden group">
            
            {/* Varsa Kategori Görselini Göster */}
            {category.imageUrl && (
                <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-800">
                    <Image 
                        src={category.imageUrl} 
                        alt={category.name} 
                        fill 
                        className="object-cover"
                    />
                </div>
            )}

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                {category.name}
              </CardTitle>

              {/* --- YENİ AKSİYON BİLEŞENİ (DÜZENLE & SİL) --- */}
              <CategoryActions category={category} />

            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {category._count.products} Ürün var
              </div>
            </CardContent>
          </Card>
        ))}

        {categories.length === 0 && (
            <div className="text-gray-500 col-span-full text-center py-10">
                Henüz kategori eklenmemiş.
            </div>
        )}
      </div>
    </div>
  );
}