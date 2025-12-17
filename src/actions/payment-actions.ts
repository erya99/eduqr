"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { getPaytrToken } from "@/lib/paytr";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

// Parametre yapısını GÜNCELLİYORUZ:
// Hem fatura bilgilerini (billing) hem de plan türünü (planType) tek bir nesne içinde alıyoruz.
export async function startSubscription(data: {
  billing: {
    name: string;
    address: string;
    phone: string;
  },
  planType: "monthly" | "yearly"
}) {
  const user = await currentUser();
  if (!user) throw new Error("Giriş yapmalısınız.");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı.");

  // Gelen veriyi değişkenlere ayırıyoruz
  const { billing, planType } = data;

  // 1. Fiyat ve Sepet İsmini Belirle
  let priceAmount = 0;
  let basketName = "";

  if (planType === "yearly") {
    // Yıllık Plan: 2500 TL + %20 KDV = 3000 TL
    priceAmount = 3000;
    basketName = "1 Yıllık EduQR Kampanyalı Abonelik";
  } else {
    // Aylık Plan: 250 TL + %20 KDV = 300 TL
    priceAmount = 300;
    basketName = "1 Aylık EduQR Aboneliği";
  }

  // 2. Ödeme Parametrelerini Hazırla
  const merchant_id = process.env.PAYTR_MERCHANT_ID!;
  
  // PayTR kuruş cinsinden tutar ister (300 TL -> 30000)
  const price = priceAmount * 100; 
  
  const merchant_oid = "SIP" + uuidv4().replace(/-/g, "").substring(0, 10);
  const email = user.emailAddresses[0].emailAddress;
  
  // Canlı ortamda gerçek kullanıcı IP'si alınmalı, şimdilik sabit
  const user_ip = "85.85.85.85";
  
  const user_name = billing.name;
  const user_address = billing.address;
  const user_phone = billing.phone;
  
  const currency = "TL";
  const test_mode = "0"; // 0: Canlı Mod, 1: Test Modu
  const no_installment = "0";
  const max_installment = "0";
  const debug_on = "1";

  // --- SEPET HAZIRLIĞI ---
  const user_basket = [[basketName, priceAmount.toFixed(2), 1]];
  const user_basket_json = JSON.stringify(user_basket);
  const user_basket_base64 = Buffer.from(user_basket_json).toString("base64");

  // 3. Hash Hesapla (Base64 ile)
  const paytr_token = getPaytrToken(
    user_ip,
    merchant_oid,
    email,
    price,
    user_basket_base64,
    parseInt(no_installment),
    parseInt(max_installment),
    currency,
    parseInt(test_mode)
  );

  // 4. Veritabanına Ödeme Kaydını Oluştur
  await prisma.payment.create({
    data: {
      merchantOid: merchant_oid,
      amount: priceAmount, // Veritabanına 300 veya 3000 olarak kaydediyoruz
      status: "pending",
      restaurantId: restaurant.id
    }
  });

  // 5. PayTR API'sine İstek At
  const formData = new URLSearchParams();
  formData.append("merchant_id", merchant_id);
  formData.append("user_ip", user_ip);
  formData.append("merchant_oid", merchant_oid);
  formData.append("email", email);
  formData.append("payment_amount", price.toString());
  formData.append("paytr_token", paytr_token);
  formData.append("user_basket", user_basket_base64);
  formData.append("debug_on", debug_on);
  formData.append("no_installment", no_installment);
  formData.append("max_installment", max_installment);
  formData.append("user_name", user_name);
  formData.append("user_address", user_address);
  formData.append("user_phone", user_phone);
  
  // Başarılı ve Başarısız Dönüş URL'leri
  formData.append("merchant_ok_url", `${process.env.NEXT_PUBLIC_APP_URL}/admin/settings`);
  formData.append("merchant_fail_url", `${process.env.NEXT_PUBLIC_APP_URL}/admin/subscription`);
  
  formData.append("timeout_limit", "30");
  formData.append("currency", currency);
  formData.append("test_mode", test_mode);

  try {
    const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    const resultData = await response.json();

    if (resultData.status === "failed") {
      console.error("PAYTR HATASI:", resultData.reason);
      throw new Error("PayTR Token Alınamadı: " + resultData.reason);
    }

    return { iframe_token: resultData.token, status: 'success' };

  } catch (error) {
    console.error("PayTR İstek Hatası:", error);
    throw error;
  }
}