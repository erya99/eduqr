"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { getPaytrToken } from "@/lib/paytr";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function startSubscription() {
  const user = await currentUser();
  if (!user) throw new Error("Giriş yapmalısınız.");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı.");

  const price = 300 * 100;
  const merchant_oid = "SIP_" + uuidv4().replace(/-/g, "").substring(0, 10);

  const email = user.emailAddresses[0].emailAddress;
  
  // --- DEĞİŞİKLİK 1: IP Adresini Rastgele Bir Gerçek IP Yapalım ---
  // (PayTR localhost IP'sini bazen reddeder, test için bunu kullan)
  const user_ip = "85.85.85.85"; 
  
  const user_name = user.firstName || "Kullanıcı";
  const user_address = "Dijital Teslimat";
  const user_phone = "05555555555";

  const user_basket = [["1 Aylık EduQR Aboneliği", "300.00", 1]];

  // --- DEBUG İÇİN LOGLAMA (PM2 loglarında göreceğiz) ---
  console.log("PAYTR DEBUG BAŞLIYOR:");
  console.log("ID:", process.env.PAYTR_MERCHANT_ID);
  console.log("KEY (ilk 3 hane):", process.env.PAYTR_MERCHANT_KEY?.substring(0,3));
  console.log("SALT (ilk 3 hane):", process.env.PAYTR_MERCHANT_SALT?.substring(0,3));
  console.log("IP:", user_ip);
  console.log("OID:", merchant_oid);
  console.log("Sepet:", JSON.stringify(user_basket));
  console.log("Fiyat:", price);
  // -----------------------------------------------------

  const token = getPaytrToken(
    user_ip,
    merchant_oid,
    email,
    price,
    user_basket,
    0,
    0,
    "TL",
    1 // Test Modu: 1
  );

  await prisma.payment.create({
    data: {
      merchantOid: merchant_oid,
      amount: 300,
      status: "pending",
      restaurantId: restaurant.id
    }
  });

  return {
    merchant_id: process.env.PAYTR_MERCHANT_ID,
    user_ip,
    merchant_oid,
    email,
    payment_amount: price,
    paytr_token: token,
    user_basket: JSON.stringify(user_basket),
    debug_on: 1,
    no_installment: 0,
    max_installment: 0,
    user_name,
    user_address,
    user_phone,
    merchant_ok_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`,
    merchant_fail_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/payment/fail`,
    timeout_limit: 30,
    currency: "TL",
    test_mode: 1
  };
}