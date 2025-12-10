import ProductAddButton from "@/components/admin/ProductAddButton"; 
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SortableProductList from "@/components/admin/SortableProductList"; // <-- BU İMPORT ÖNEMLİ

const prisma = new PrismaClient();

export default async function AdminProductsPage() {
  const user = await currentUser();
  if (!user) return <div>Giriş yapınız...</div>;

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

  // 1. Kategorileri çek (Ürün eklerken/düzenlerken lazım)
  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { order: 'asc' } 
  });

  // 2. Ürünleri çek (Sıralamaya göre: ORDER ASC)
  const rawProducts = await prisma.product.findMany({
    where: {
        category: { restaurantId: restaurant.id }
    },
    include: { 
        category: true,
        variants: true 
    },
    orderBy: { order: 'asc' } // <-- ÖNEMLİ: order'a göre sırala
  });

  // 3. Veriyi düzenle (Decimal -> Number çevrimi)
  const products = rawProducts.map((product) => ({
    ...product,
    price: Number(product.price),
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

      {/* ESKİ <Table> KODLARINI SİLDİK VE BUNU EKLEDİK: */}
      <SortableProductList products={products} categories={categories} />
      
    </div>
  );
}