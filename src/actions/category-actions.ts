"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// --- 1. KATEGORİ EKLEME ---
export async function createCategory(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı");

  const name = formData.get("name") as string;

  await prisma.category.create({
    data: {
      name,
      restaurantId: restaurant.id,
      order: 0 
    }
  });

  revalidatePath("/admin/categories");
}

// --- 2. KATEGORİ SİLME ---
export async function deleteCategory(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  const categoryId = formData.get("id") as string;

  await prisma.category.delete({
    where: { id: categoryId }
  });

  revalidatePath("/admin/categories");
}

// --- 3. KATEGORİLERİ GETİRME (Ürün Ekleme Formu İçin) ---
export async function getCategories() {
  const user = await currentUser();
  if (!user) return [];

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) return [];

  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { createdAt: 'desc' } // En son eklenen en üstte gelsin
  });

  return categories;
}