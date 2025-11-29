import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";
import QRCodeCard from "@/components/admin/QRCodeCard";
import { currentUser } from "@clerk/nextjs/server"; // Giriş yapan kullanıcıyı al
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  // 1. Clerk'ten giriş yapmış kullanıcının bilgilerini al
  const user = await currentUser();

  if (!user) return <div>Giriş yapmalısınız.</div>;

  // 2. Bu kullanıcının veritabanımızda restoranı var mı?
  // (Burada email'e göre değil, Clerk ID'sine göre eşleşme yapmak en doğrusudur ama
  // şimdilik User tablosundaki kayda bakacağız)
  
  // Önce User tablosunda kaydı var mı diye bakalım (Sync işlemi)
  // NOT: Normalde bunu Webhook ile yaparız ama basit olsun diye burada "On-the-fly" yapıyoruz.
  let dbUser = await prisma.user.findUnique({
    where: { email: user.emailAddresses[0].emailAddress }
  });

  // Kullanıcı bizde kayıtlı değilse kaydedelim
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        id: user.id, // Clerk ID'sini bizim ID olarak kullanalım
        role: "RESTAURANT_OWNER",
        password: "" // Clerk kullandığımız için şifre boş kalabilir
      }
    });
  }

  // Şimdi restoranını bulalım
  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: dbUser.id }
  });

  // EĞER RESTORANI YOKSA -> KURULUM SAYFASINA AT
  if (!restaurant) {
    redirect("/onboarding"); // Bu sayfayı birazdan yapacağız
  }

  // --- Buradan sonrası eski dashboard kodları ---
  // Sadece bu restoranın verilerini getirecek şekilde filtreliyoruz
  const productCount = await prisma.product.count({
    where: { category: { restaurantId: restaurant.id } } // Sadece benim ürünlerim
  });
  
  const categoryCount = await prisma.category.count({
    where: { restaurantId: restaurant.id } // Sadece benim kategorilerim
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Hoş Geldin, {restaurant.name} 👋
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCount}</div>
            <p className="text-xs text-muted-foreground">Aktif ürün sayısı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kategoriler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryCount}</div>
            <p className="text-xs text-muted-foreground">Aktif kategori sayısı</p>
          </CardContent>
        </Card>

        <div className="md:col-span-2 lg:col-span-1">
            <QRCodeCard slug={restaurant.slug} />
        </div>
      </div>
    </div>
  );
}