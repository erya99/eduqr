import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductActions from "@/components/admin/ProductActions"; 
import ProductAddButton from "@/components/admin/ProductAddButton"; 
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function AdminProductsPage() {
  const user = await currentUser();
  if (!user) return <div>Giriş yapınız...</div>;

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
  // -------------------------

  // 1. KATEGORİLERİ ÇEK
  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { name: 'asc' }
  });

  // 2. ÜRÜNLERİ ÇEK (Varyasyonları ile)
  const rawProducts = await prisma.product.findMany({
    where: {
        category: { restaurantId: restaurant.id }
    },
    include: { 
        category: true,
        variants: true 
    },
    orderBy: { id: 'desc' }
  });

  // 3. FİYATLARI DÖNÜŞTÜR (Decimal -> Number)
  const products = rawProducts.map((product) => ({
    ...product,
    price: Number(product.price),
    // HATA ÇÖZÜMÜ BURADA: (v: any) ekledik 👇
    variants: product.variants.map((v: any) => ({
        ...v,
        price: Number(v.price)
    }))
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Ürünler ({products.length})</h1>
        
        <ProductAddButton categories={categories} />
      </div>

      <div className="rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ürün Adı</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Fiyat</TableHead>
              <TableHead>Varyasyon</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  Henüz hiç ürün eklenmemiş.
                </TableCell>
              </TableRow>
            )}

            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.price} ₺</TableCell>
                
                {/* Varyasyon Bilgisi */}
                <TableCell>
                    {product.variants.length > 0 ? (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {product.variants.length} Seçenek
                        </span>
                    ) : (
                        <span className="text-xs text-gray-400">-</span>
                    )}
                </TableCell>

                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Aktif
                  </span>
                </TableCell>
                
                <TableCell className="text-right">
                  <ProductActions product={product} categories={categories} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}