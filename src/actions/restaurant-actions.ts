"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function updateRestaurantSettings(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Yetkisiz işlem");

  // Kullanıcının restoranını bul
  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı");

  // Form verilerini al
  const name = formData.get("name") as string;
  const logoUrl = formData.get("logoUrl") as string;
  const coverUrl = formData.get("coverUrl") as string;

  // Güncelle
  await prisma.restaurant.update({
    where: { id: restaurant.id },
    data: {
      name,
      logoUrl,
      coverUrl
    }
  });

  // Hem admin panelini hem de müşteri menüsünü yenile
  revalidatePath("/admin/settings");
  revalidatePath(`/${restaurant.slug}`);
}