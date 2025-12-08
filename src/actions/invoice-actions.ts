"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { isSuperAdmin } from "@/lib/check-super-admin"; 

const prisma = new PrismaClient();

// 1. KULLANICI: Fatura Talebi Oluşturur (Ödeme öncesi çalışır)
// DÜZELTME: Artık FormData yerine direkt Obje alıyor
export async function createInvoiceRequest(data: {
  restaurantId: string;
  legalName: string;
  taxNumber: string;
  taxOffice?: string;
  address: string;
  amount: number;
}) {
  await prisma.tempInvoiceRequest.create({
    data: {
      restaurantId: data.restaurantId,
      legalName: data.legalName,
      taxNumber: data.taxNumber,
      taxOffice: data.taxOffice || "", // Boşsa boş string yap
      address: data.address,
      amount: data.amount,
    }
  });
}

// 2. ADMIN: Faturayı Kestiğini Onaylar (Veri silinir ve loglanır)
export async function markInvoiceAsProcessed(requestId: string) {
  // Güvenlik kontrolü
  if (!await isSuperAdmin()) throw new Error("Yetkisiz işlem");

  const tempRequest = await prisma.tempInvoiceRequest.findUnique({
    where: { id: requestId }
  });

  if (!tempRequest) throw new Error("Talep bulunamadı.");

  // Maskeleme Fonksiyonu (Ahmet Yılmaz -> Ah*** Yıl***)
  const mask = (str: string) => str.substring(0, 2) + "*".repeat(Math.max(0, str.length - 2));

  // TRANSACTION: Biri başarısız olursa hepsi iptal olur.
  await prisma.$transaction([
    // A) Kalıcı Log Oluştur (Anonim)
    prisma.invoiceLog.create({
      data: {
        restaurantId: tempRequest.restaurantId,
        amount: tempRequest.amount,
        maskedName: mask(tempRequest.legalName),
        maskedTaxNo: mask(tempRequest.taxNumber),
      }
    }),

    // B) Hassas Veriyi Kökten Sil (Hard Delete)
    prisma.tempInvoiceRequest.delete({
      where: { id: requestId }
    })
  ]);

  revalidatePath("/super-admin/invoices");
  return { success: true };
}