"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { isSuperAdmin } from "@/lib/check-super-admin";

const prisma = new PrismaClient();

export async function toggleRestaurantStatus(id: string, currentStatus: boolean) {
  // Güvenlik: Sadece super admin yapabilir
  if (!await isSuperAdmin()) {
    throw new Error("Yetkisiz işlem!");
  }

  await prisma.restaurant.update({
    where: { id },
    data: { isActive: !currentStatus } // Tersi yap (Açıksa kapat, kapalıysa aç)
  });

  revalidatePath("/super-admin");
}