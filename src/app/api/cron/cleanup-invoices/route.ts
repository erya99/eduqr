import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Bu endpoint'i günde 1 kez çağıran bir servis kurabilirsin (Vercel Cron veya harici bir cron)
export async function GET(req: Request) {
  // Güvenlik: Sadece yetkili servis çağırabilsin (Header kontrolü vs. eklenebilir)
  
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // 24 saatten eski ve hala işlenmemiş kayıtları sil
  // (Dikkat: Bu durumda fatura kesilmemiş olur ama KVKK riski kalkar)
  const deleted = await prisma.tempInvoiceRequest.deleteMany({
    where: {
      createdAt: {
        lt: twentyFourHoursAgo
      }
    }
  });

  return NextResponse.json({ 
    message: "Eski fatura talepleri temizlendi.", 
    deletedCount: deleted.count 
  });
}