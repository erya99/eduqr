"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// 1. Ödül Ekle
export async function createWheelItem(restaurantId: string, formData: FormData) {
  const label = formData.get("label") as string;
  const percentage = parseInt(formData.get("percentage") as string);

  await prisma.wheelItem.create({
    data: {
      restaurantId,
      label,
      percentage: percentage || 10,
      color: "#" + Math.floor(Math.random()*16777215).toString(16),
      isActive: true // Varsayılan olarak aktif
    }
  });

  revalidatePath("/admin/marketing");
}

// 2. Ödül Sil (Tamamen Kaldırır)
export async function deleteWheelItem(itemId: string) {
  await prisma.wheelItem.delete({ where: { id: itemId } });
  revalidatePath("/admin/marketing");
}

// 3. Durum Değiştir (YENİ ÖZELLİK: Aktif/Pasif Yapma)
export async function toggleWheelItemStatus(itemId: string, currentStatus: boolean) {
  await prisma.wheelItem.update({
    where: { id: itemId },
    data: { isActive: !currentStatus }
  });
  revalidatePath("/admin/marketing");
}

// 4. Müşteri İçin Ödülleri Getir
export async function getWheelItems(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: { 
      wheelItems: {
        where: { isActive: true }, // Sadece AKTİF olanları getir
        orderBy: { percentage: 'asc' }
      } 
    }
  });
  
  return restaurant?.wheelItems || [];
}