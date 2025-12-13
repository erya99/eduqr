"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// 1. Yorum Oluşturma (Müşteri Tarafı)
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

// 2. Yorum Silme (Admin Tarafı) - YENİ EKLENDİ
export async function deleteReview(reviewId: string) {
  try {
    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    // Silme işleminden sonra listeyi yenile
    revalidatePath("/admin/reviews");
    
    return { success: true };
  } catch (error) {
    console.error("Silme hatası:", error);
    return { success: false, error: "Silinirken bir hata oluştu." };
  }
}