"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// Yardımcı Tip
type VariantInput = { name: string; price: number };

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
  
  // Varyasyonları JSON string olarak alıyoruz (Form'dan öyle gelecek)
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

  // Ürünü ve varyasyonlarını aynı anda oluştur
  await prisma.product.create({
    data: {
      name,
      price, // Ana fiyat (varsayılan)
      description,
      imageUrl,
      categoryId: category.id,
      isAvailable: true,
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

  // Güncelleme mantığı: Önce eski varyasyonları sil, sonra yenileri ekle (En temiz yöntem)
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

// Silme fonksiyonu aynı kalabilir (Cascade silme olduğu için varyasyonlar da otomatik silinir)
export async function deleteProduct(formData: FormData) {
    // ... eski kod aynen kalabilir
    const productId = formData.get("id") as string;
    await prisma.product.delete({ where: { id: productId } });
    revalidatePath("/admin/products");
}