import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const merchant_oid = formData.get("merchant_oid") as string;
    const status = formData.get("status") as string;
    const total_amount = formData.get("total_amount") as string;
    const hash = formData.get("hash") as string;

    // HASH KONTROLÜ (Güvenlik için şart)
    const merchant_key = process.env.PAYTR_MERCHANT_KEY!;
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT!;
    const params = merchant_oid + merchant_salt + status + total_amount;
    const computedHash = crypto
      .createHmac("sha256", merchant_key)
      .update(params)
      .digest("base64");

    if (hash !== computedHash) {
      return new NextResponse("PAYTR notification failed: bad hash", { status: 400 });
    }

    if (status === "success") {
      // 1. Ödeme kaydını güncelle
      const payment = await prisma.payment.update({
        where: { merchantOid: merchant_oid },
        data: { status: "success" },
        include: { restaurant: true }
      });

      // 2. Restoranın aboneliğini 30 gün uzat
      const now = new Date();
      const currentEnd = payment.restaurant.subscriptionEnds || now;
      // Eğer süresi bitmişse bugünden başla, bitmemişse üstüne ekle
      const startDate = currentEnd < now ? now : currentEnd;
      
      const newEndDate = new Date(startDate);
      newEndDate.setDate(newEndDate.getDate() + 30); // +30 Gün

      await prisma.restaurant.update({
        where: { id: payment.restaurantId },
        data: {
          isSubscribed: true,
          subscriptionEnds: newEndDate
        }
      });
    } else {
      // Ödeme başarısız
      await prisma.payment.update({
        where: { merchantOid: merchant_oid },
        data: { status: "failed" }
      });
    }

    return new NextResponse("OK");
  } catch (error) {
    console.error("Payment callback error:", error);
    return new NextResponse("Error", { status: 500 });
  }
}