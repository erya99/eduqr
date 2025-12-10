"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// Yardımcı Tip
type VariantInput = { name: string; price: number };

// --- 1. ÜRÜN SIRALAMA GÜNCELLEME (YENİ) ---
export async function reorderProducts(items: { id: string; order: number }[]) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  const transaction = items.map((item) =>
    prisma.product.update({
      where: { id: item.id },
      data: { order: item.order },
    })
  );

  await prisma.$transaction(transaction);
  revalidatePath("/admin/products");
}

// --- 2. ÜRÜN OLUŞTURME (Sıra Numarası Destekli) ---
export async function createProduct(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı");

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryName = formData.get("category") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("image") as string;
  
  // Varyasyonları JSON string olarak alıyoruz
  const variantsJson = formData.get("variants") as string;
  const variants: VariantInput[] = variantsJson ? JSON.parse(variantsJson) : [];

  let category = await prisma.category.findFirst({
    where: { name: categoryName, restaurantId: restaurant.id }
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: categoryName, restaurantId: restaurant.id }
    });
  }

  // --- YENİ: Otomatik Sıra Numarası Hesaplama ---
  // Bu kategorideki en son ürünün sırasını bulup 1 artırıyoruz
  const lastProduct = await prisma.product.findFirst({
    where: { categoryId: category.id },
    orderBy: { order: 'desc' }
  });
  
  const newOrder = lastProduct ? lastProduct.order + 1 : 1;

  // Ürünü ve varyasyonlarını oluştur
  await prisma.product.create({
    data: {
      name,
      price, 
      description,
      imageUrl,
      categoryId: category.id,
      isAvailable: true,
      order: newOrder, // <-- Yeni sıra numarası
      variants: {
        create: variants.map(v => ({
            name: v.name,
            price: v.price
        }))
      }
    },
  });

  revalidatePath("/admin/products");
}

// --- 3. ÜRÜN GÜNCELLEME ---
export async function updateProduct(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const imageUrl = formData.get("image") as string;
  
  const variantsJson = formData.get("variants") as string;
  const variants: VariantInput[] = variantsJson ? JSON.parse(variantsJson) : [];

  // Güncelleme mantığı: Önce eski varyasyonları sil, sonra yenileri ekle
  await prisma.$transaction([
    prisma.productVariant.deleteMany({ where: { productId: id } }),
    prisma.product.update({
        where: { id },
        data: {
          name,
          price,
          description,
          imageUrl,
          variants: {
            create: variants.map(v => ({
                name: v.name,
                price: v.price
            }))
          }
        },
    })
  ]);

  revalidatePath("/admin/products");
}

// --- 4. ÜRÜN SİLME ---
export async function deleteProduct(formData: FormData) {
    const productId = formData.get("id") as string;
    await prisma.product.delete({ where: { id: productId } });
    revalidatePath("/admin/products");
}