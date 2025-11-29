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

const prisma = new PrismaClient();

export default async function AdminProductsPage() {
  const user = await currentUser();
  if (!user) return <div>Giriş yapınız...</div>;

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) return <div>Önce restoran oluşturun.</div>;

  // 1. KATEGORİLERİ ÇEK (Yeni eklenen kısım)
  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { name: 'asc' }
  });

  const rawProducts = await prisma.product.findMany({
    where: {
        category: { restaurantId: restaurant.id }
    },
    include: { category: true },
    orderBy: { id: 'desc' }
  });

  const products = rawProducts.map((product) => ({
    ...product,
    price: Number(product.price)
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Ürünler ({products.length})</h1>
        
        {/* Kategorileri buraya gönderiyoruz */}
        <ProductAddButton categories={categories} />

      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ürün Adı</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Fiyat</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                  Henüz hiç ürün eklenmemiş.
                </TableCell>
              </TableRow>
            )}

            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.price} ₺</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    Aktif
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {/* Kategorileri buraya da gönderiyoruz (Düzenleme için) */}
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