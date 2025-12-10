"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// --- 1. KATEGORİ SIRALAMA GÜNCELLEME (YENİ) ---
export async function reorderCategories(items: { id: string; order: number }[]) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  // Transaction ile hepsini aynı anda güvenli şekilde güncelle
  const transaction = items.map((item) =>
    prisma.category.update({
      where: { id: item.id },
      data: { order: item.order },
    })
  );

  await prisma.$transaction(transaction);
  revalidatePath("/admin/categories");
}

// --- 2. KATEGORİ EKLEME (Resim ve Sıra Destekli) ---
export async function createCategory(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı");

  const name = formData.get("name") as string;
  const imageUrl = formData.get("image") as string; // Resim URL'ini al

  // Mevcut en yüksek sırayı bul (Yeni ekleneni en sona koymak için)
  const lastCategory = await prisma.category.findFirst({
    where: { restaurantId: restaurant.id },
    orderBy: { order: 'desc' }
  });

  const newOrder = lastCategory ? lastCategory.order + 1 : 1;

  await prisma.category.create({
    data: {
      name,
      imageUrl,
      restaurantId: restaurant.id,
      order: newOrder // Otomatik hesaplanan sıra numarası
    }
  });

  revalidatePath("/admin/categories");
}

// --- 3. KATEGORİ GÜNCELLEME (İsim ve Resim) ---
export async function updateCategory(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const imageUrl = formData.get("image") as string;

  await prisma.category.update({
    where: { id },
    data: {
      name,
      imageUrl
    }
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products"); // Ürünlerde de kategori ismi değiştiği için
}

// --- 4. KATEGORİ SİLME ---
export async function deleteCategory(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  const categoryId = formData.get("id") as string;

  await prisma.category.delete({
    where: { id: categoryId }
  });

  revalidatePath("/admin/categories");
}

// --- 5. KATEGORİLERİ GETİRME ---
export async function getCategories() {
  const user = await currentUser();
  if (!user) return [];

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) return [];

  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { order: 'asc' } // Sıralamaya göre getir (YENİ)
  });

  return categories;
}