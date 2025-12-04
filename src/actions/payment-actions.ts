"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { getPaytrToken } from "@/lib/paytr";
import { v4 as uuidv4 } from "uuid"; // npm install uuid @types/uuid yapmalısın

const prisma = new PrismaClient();

export async function startSubscription() {
  const user = await currentUser();
  if (!user) throw new Error("Giriş yapmalısınız.");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı.");

  // FİYATLANDIRMA: 250 TL + %20 KDV = 300 TL
  // PayTR kuruş cinsinden ister: 300 * 100 = 30000
  const price = 300 * 100; 
  const merchant_oid = "SIP_" + uuidv4().replace(/-/g, "").substring(0, 10); // Benzersiz Sipariş ID

  // Kullanıcı bilgileri
  const email = user.emailAddresses[0].emailAddress;
  const user_ip = "127.0.0.1"; // Canlıda request ip alınmalı ama PayTR genelde bunu kabul eder
  const user_name = user.firstName || "Kullanıcı";
  const user_address = "Dijital Teslimat";
  const user_phone = "05555555555"; // Zorunlu alan, kullanıcıdan alabilirsin

  // Sepet (Tek ürün: Abonelik)
  const user_basket = [["1 Aylık EduQR Aboneliği", "300.00", 1]];

  const token = getPaytrToken(
    user_ip,
    merchant_oid,
    email,
    price,
    user_basket,
    0, // Taksit yok
    0, // Max taksit
    "TL",
    0 // 0 = Canlı Mod, 1 = Test Modu (Test ederken 1 yap)
  );

  // Veritabanına "Ödeme Bekleniyor" diye kayıt atalım (Webhook gelince güncelleyeceğiz)
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
    merchant_ok_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/payment/success`,
    merchant_fail_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/payment/fail`,
    timeout_limit: 30,
    currency: "TL",
    test_mode: 0 // Test ederken 1
  };
}