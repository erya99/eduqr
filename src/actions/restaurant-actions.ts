"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// 1. Kullanıcının Restoranını Getir (Admin Paneli için)
export async function getRestaurantFromUser() {
  const user = await currentUser();
  if (!user) return null;

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  return restaurant;
}

// 2. Slug ile Restoran Getir (Müşteri Menüsü için)
export async function getRestaurantBySlug(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: slug },
  });
  return restaurant;
}

// 3. Restoran Bilgilerini Güncelle
export async function updateRestaurant(
  restaurantId: string,
  data: {
    name: string;
    slug: string;
    logoUrl: string;
    coverUrl: string;
    landingImageUrl?: string | null; // 👈 YENİ: Dikey Görsel Linki
    instagramUrl?: string | null;
    facebookUrl?: string | null;
    twitterUrl?: string | null;
    websiteUrl?: string | null;
    googlePlaceUrl?: string | null;
    colorPalette?: string;
    template?: string; 
  }
) {
  const user = await currentUser();
  if (!user) return { success: false, error: "Oturum açmalısınız." };

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant || restaurant.userId !== user.id) {
      return { success: false, error: "Yetkisiz işlem." };
    }

    // Slug değişiyorsa, yeni slug'ın kullanımda olup olmadığını kontrol et
    if (data.slug !== restaurant.slug) {
      const existingSlug = await prisma.restaurant.findUnique({
        where: { slug: data.slug },
      });
      if (existingSlug) {
        return { success: false, error: "Bu restoran bağlantısı (slug) zaten kullanılıyor." };
      }
    }

    // Güncelleme İşlemi
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        name: data.name,
        slug: data.slug,
        logoUrl: data.logoUrl,
        coverUrl: data.coverUrl,
        landingImageUrl: data.landingImageUrl || null, // 👈 YENİ: Veritabanına kaydet
        instagramUrl: data.instagramUrl || null,
        facebookUrl: data.facebookUrl || null,
        twitterUrl: data.twitterUrl || null,
        websiteUrl: data.websiteUrl || null,
        googlePlaceUrl: data.googlePlaceUrl || null,
        colorPalette: data.colorPalette || "blue",
        template: data.template || "classic",
      },
    });

    // Cache temizleme
    revalidatePath("/admin/settings");
    revalidatePath(`/${restaurant.slug}`);
    if (data.slug !== restaurant.slug) {
        revalidatePath(`/${data.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Güncelleme hatası:", error);
    return { success: false, error: "Bir hata oluştu." };
  }
}