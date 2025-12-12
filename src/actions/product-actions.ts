"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// Yardımcı Tip
type VariantInput = { name: string; price: number };

// --- 1. ÜRÜN SIRALAMA GÜNCELLEME ---
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

// --- 2. ÜRÜN OLUŞTURMA ---
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
  
  // Varsayılan olarak aktif (true), eğer formdan 'false' gelirse pasif olur
  const isAvailable = formData.get("isAvailable") ? (formData.get("isAvailable") === "true") : true;

  const variantsJson = formData.get("variants") as string;
  const variants: VariantInput[] = variantsJson ? JSON.parse(variantsJson) : [];

  // 👇 YENİ: Alerjen verisini al ve parse et
  const allergensJson = formData.get("allergens") as string;
  const allergens: string[] = allergensJson ? JSON.parse(allergensJson) : [];

  let category = await prisma.category.findFirst({
    where: { name: categoryName, restaurantId: restaurant.id }
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: categoryName, restaurantId: restaurant.id }
    });
  }

  // Yeni ürün için sıra numarasını hesapla (Listenin sonuna ekle)
  const lastProduct = await prisma.product.findFirst({
    where: { categoryId: category.id },
    orderBy: { order: 'desc' }
  });
  
  const newOrder = lastProduct ? lastProduct.order + 1 : 1;

  await prisma.product.create({
    data: {
      name,
      price, 
      description,
      imageUrl,
      categoryId: category.id,
      isAvailable: isAvailable, // Durum bilgisi
      allergens: allergens,     // 👈 YENİ: Veritabanına kaydet
      order: newOrder,
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

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });
  if (!restaurant) throw new Error("Restoran bulunamadı");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const imageUrl = formData.get("image") as string;
  
  const categoryName = formData.get("category") as string; // Yeni kategori adı
  const isAvailable = formData.get("isAvailable") === "true"; // Yeni durum

  const variantsJson = formData.get("variants") as string;
  const variants: VariantInput[] = variantsJson ? JSON.parse(variantsJson) : [];

  // 👇 YENİ: Alerjen verisini al ve parse et
  const allergensJson = formData.get("allergens") as string;
  const allergens: string[] = allergensJson ? JSON.parse(allergensJson) : [];

  // Kategoriyi bul (Değiştirilmişse yeni kategoriyi bulur)
  let category = await prisma.category.findFirst({
    where: { name: categoryName, restaurantId: restaurant.id }
  });

  if (!category) {
    // Eğer kategori yoksa oluştur
    category = await prisma.category.create({
        data: { name: categoryName, restaurantId: restaurant.id }
    });
  }

  // Transaction ile güncelleme (Eski varyasyonları sil, yenileri ekle)
  await prisma.$transaction([
    prisma.productVariant.deleteMany({ where: { productId: id } }),
    prisma.product.update({
        where: { id },
        data: {
          name,
          price,
          description,
          imageUrl,
          categoryId: category.id, // Kategori güncellemesi
          isAvailable: isAvailable, // Durum güncellemesi
          allergens: allergens,     // 👈 YENİ: Alerjenleri güncelle
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