"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function incrementRestaurantView(restaurantId: string) {
  try {
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        viewCount: {
          increment: 1 // Mevcut sayıyı 1 artırır (Atomic işlem)
        }
      }
    });
  } catch (error) {
    console.error("Sayaç artırma hatası:", error);
    // Hata olsa bile kullanıcıya hissettirme, sessizce devam et
  }
}