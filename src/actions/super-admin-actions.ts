"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { isSuperAdmin } from "@/lib/check-super-admin";

const prisma = new PrismaClient();

// RESTORAN DURUMUNU DEĞİŞTİR (Aktif/Pasif)
export async function toggleRestaurantStatus(id: string, currentStatus: boolean) {
  if (!await isSuperAdmin()) throw new Error("Yetkisiz işlem!");

  await prisma.restaurant.update({
    where: { id },
    data: { isActive: !currentStatus }
  });

  revalidatePath("/super-admin");
}

// YENİ: ELLE ABONELİK VERME / SÜRE UZATMA
export async function manualSubscription(restaurantId: string, months: number) {
  if (!await isSuperAdmin()) throw new Error("Yetkisiz işlem!");

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı");

  // Mevcut bitiş tarihini al, yoksa şu anı al
  const now = new Date();
  // Eğer süresi zaten varsa ve bitmemişse, onun üzerine ekle. Yoksa bugünden başla.
  const currentEnd = restaurant.subscriptionEnds && restaurant.subscriptionEnds > now 
    ? restaurant.subscriptionEnds 
    : now;

  const newEndDate = new Date(currentEnd);
  
  if (months === -1) {
    // -1 geldiyse SINIRSIZ yap (Örn: 100 yıl ver)
    newEndDate.setFullYear(newEndDate.getFullYear() + 100);
  } else {
    // Ay ekle
    newEndDate.setMonth(newEndDate.getMonth() + months);
  }

  await prisma.restaurant.update({
    where: { id: restaurantId },
    data: {
      isSubscribed: true,
      isActive: true, // Abone yapınca otomatik aktif de olsun
      subscriptionEnds: newEndDate
    }
  });

  revalidatePath("/super-admin");
}