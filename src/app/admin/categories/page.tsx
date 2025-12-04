import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import CategoryAddForm from "@/components/admin/CategoryAddForm";
import { deleteCategory } from "@/actions/category-actions";
import { redirect } from "next/navigation"; // Yönlendirme için eklendi
import Image from "next/image"; // Görsel göstermek için eklendi

const prisma = new PrismaClient();

export default async function AdminCategoriesPage() {
  const user = await currentUser();
  if (!user) return <div>Giriş yapınız.</div>;

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) return <div>Önce restoran oluşturun.</div>;

  // --- ABONELİK KONTROLÜ (GATEKEEPER) ---
  const isSubscribed = 
    restaurant.isSubscribed && 
    restaurant.subscriptionEnds && 
    restaurant.subscriptionEnds > new Date();

  if (!isSubscribed) {
    redirect("/admin/subscription");
  }
  // --------------------------------------

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
          <Card key={category.id} className="flex flex-col justify-between overflow-hidden">
            
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
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={category.id} />
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 className="h-4 w-4" />
                </Button>
              </form>
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