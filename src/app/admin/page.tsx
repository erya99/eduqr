import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";
import QRCodeCard from "@/components/admin/QRCodeCard";
import { currentUser } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation";
import { Eye, TrendingUp } from "lucide-react"; // İkonlar eklendi

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const user = await currentUser();

  if (!user) return <div>Giriş yapmalısınız.</div>;

  let dbUser = await prisma.user.findUnique({
    where: { email: user.emailAddresses[0].emailAddress }
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        id: user.id, 
        role: "RESTAURANT_OWNER",
        password: "" 
      }
    });
  }

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: dbUser.id }
  });

  if (!restaurant) {
    redirect("/onboarding"); 
  }

  const productCount = await prisma.product.count({
    where: { category: { restaurantId: restaurant.id } } 
  });
  
  const categoryCount = await prisma.category.count({
    where: { restaurantId: restaurant.id } 
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Hoş Geldin, {restaurant.name} 👋
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* --- 1. GÖRÜNTÜLENME KARTI (YENİ) --- */}
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Toplam Görüntülenme
            </CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {restaurant.viewCount}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500"/>
              Menü ziyaret sayısı
            </p>
          </CardContent>
        </Card>

        {/* --- 2. ÜRÜN KARTI --- */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCount}</div>
            <p className="text-xs text-muted-foreground">Aktif ürün sayısı</p>
          </CardContent>
        </Card>

        {/* --- 3. KATEGORİ KARTI --- */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kategoriler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryCount}</div>
            <p className="text-xs text-muted-foreground">Aktif kategori sayısı</p>
          </CardContent>
        </Card>

        {/* --- 4. QR KOD KARTI --- */}
        <div className="md:col-span-2 lg:col-span-1">
            <QRCodeCard slug={restaurant.slug} />
        </div>
      </div>
    </div>
  );
}