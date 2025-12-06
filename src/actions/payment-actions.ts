"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { getPaytrToken } from "@/lib/paytr"; // Bu fonksiyon sadece hash hesaplar, bunu kullanacağız
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function startSubscription() {
  const user = await currentUser();
  if (!user) throw new Error("Giriş yapmalısınız.");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı.");

  // 1. Ödeme Parametrelerini Hazırla
  const merchant_id = process.env.PAYTR_MERCHANT_ID!;
  const merchant_key = process.env.PAYTR_MERCHANT_KEY!;
  const merchant_salt = process.env.PAYTR_MERCHANT_SALT!;
  
  const price = 300 * 100; // 300 TL (Kuruş cinsinden)
  const merchant_oid = "SIP" + uuidv4().replace(/-/g, "").substring(0, 10);
  const email = user.emailAddresses[0].emailAddress;
  const user_ip = "85.85.85.85"; // Test için sabit IP
  const user_name = user.firstName || "Kullanıcı";
  const user_address = "Dijital Teslimat";
  const user_phone = "05555555555";
  const currency = "TL";
  const test_mode = "1"; // Canlıya geçerken 0 yapın
  const no_installment = "0";
  const max_installment = "0";
  const debug_on = "1";

  // Sepet (Dikkat: Fiyat string formatında olmalı "300.00")
  const user_basket = [["1 Aylık EduQR Aboneliği", "300.00", 1]];
  const user_basket_json = JSON.stringify(user_basket);

  // 2. Hash (PayTR Token) Hesapla
  // src/lib/paytr.ts dosyanızdaki fonksiyonu kullanıyoruz
  const paytr_token = getPaytrToken(
    user_ip,
    merchant_oid,
    email,
    price,
    user_basket,
    parseInt(no_installment),
    parseInt(max_installment),
    currency,
    parseInt(test_mode)
  );

  // 3. Veritabanına "Bekliyor" Olarak Kaydet
  await prisma.payment.create({
    data: {
      merchantOid: merchant_oid,
      amount: 300,
      status: "pending",
      restaurantId: restaurant.id
    }
  });

  // 4. PayTR API'sine İstek At (Token Almak İçin)
  // Bu kısım eksikti.
  const formData = new URLSearchParams();
  formData.append("merchant_id", merchant_id);
  formData.append("user_ip", user_ip);
  formData.append("merchant_oid", merchant_oid);
  formData.append("email", email);
  formData.append("payment_amount", price.toString());
  formData.append("paytr_token", paytr_token); // Hesapladığımız hash'i gönderiyoruz
  formData.append("user_basket", user_basket_json);
  formData.append("debug_on", debug_on);
  formData.append("no_installment", no_installment);
  formData.append("max_installment", max_installment);
  formData.append("user_name", user_name);
  formData.append("user_address", user_address);
  formData.append("user_phone", user_phone);
  // Callback URL'lerinizin doğru olduğundan emin olun (.env dosyasındaki NEXT_PUBLIC_APP_URL)
  formData.append("merchant_ok_url", `${process.env.NEXT_PUBLIC_APP_URL}/admin/settings`); 
  formData.append("merchant_fail_url", `${process.env.NEXT_PUBLIC_APP_URL}/admin/subscription`);
  formData.append("timeout_limit", "30");
  formData.append("currency", currency);
  formData.append("test_mode", test_mode);

  try {
    const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await response.json();

    if (data.status === "failed") {
      console.error("PAYTR HATASI:", data.reason);
      throw new Error("PayTR Token Alınamadı: " + data.reason);
    }

    // Başarılı! PayTR'dan gelen iframe token'ı döndürüyoruz.
    return {
      iframe_token: data.token, 
      status: 'success'
    };

  } catch (error) {
    console.error("PayTR İstek Hatası:", error);
    throw error;
  }
}