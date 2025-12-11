"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// 1. Ödül Ekle
export async function createWheelItem(restaurantId: string, formData: FormData) {
  const label = formData.get("label") as string;
  const percentage = parseInt(formData.get("percentage") as string);

  await prisma.wheelItem.create({
    data: {
      restaurantId,
      label,
      percentage: percentage || 10, // Varsayılan ağırlık
      color: "#" + Math.floor(Math.random()*16777215).toString(16) // Rastgele renk
    }
  });

  revalidatePath("/admin/marketing");
}

// 2. Ödül Sil
export async function deleteWheelItem(itemId: string) {
  await prisma.wheelItem.delete({ where: { id: itemId } });
  revalidatePath("/admin/marketing");
}

// 3. Ödülleri Getir (Client Component için)
export async function getWheelItems(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: { 
      wheelItems: {
        where: { isActive: true }
      } 
    }
  });
  
  return restaurant?.wheelItems || [];
}