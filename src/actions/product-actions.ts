"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// ÜRÜN OLUŞTURMA
export async function createProduct(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Kullanıcı oturumu bulunamadı!");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı!");

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryName = formData.get("category") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("image") as string;

  let category = await prisma.category.findFirst({
    where: { name: categoryName, restaurantId: restaurant.id }
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: categoryName, restaurantId: restaurant.id }
    });
  }

  await prisma.product.create({
    data: {
      name,
      price,
      description,
      imageUrl,
      categoryId: category.id,
      isAvailable: true,
    },
  });

  revalidatePath("/admin/products");
}

// ÜRÜN SİLME
export async function deleteProduct(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  const productId = formData.get("id") as string;

  await prisma.product.delete({
    where: { id: productId },
  });

  revalidatePath("/admin/products");
}

// ÜRÜN GÜNCELLEME
export async function updateProduct(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const imageUrl = formData.get("image") as string;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      description,
      imageUrl,
    },
  });

  revalidatePath("/admin/products");
}