"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createReview(formData: FormData, restaurantId: string) {
  const rating = parseInt(formData.get("rating") as string);
  const comment = formData.get("comment") as string;
  const contactInfo = formData.get("contactInfo") as string;

  if (!rating || rating < 1 || rating > 5) {
    return { success: false, error: "Lütfen geçerli bir puan verin." };
  }

  try {
    await prisma.review.create({
      data: {
        restaurantId,
        rating,
        comment,
        contactInfo,
      },
    });

    // Admin paneli hemen güncellensin
    revalidatePath("/admin/reviews");
    
    return { success: true };
  } catch (error) {
    console.error("Yorum hatası:", error);
    return { success: false, error: "Bir hata oluştu." };
  }
}