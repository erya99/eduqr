"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { getPaytrToken } from "@/lib/paytr";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

// Parametre olarak fatura bilgilerini alıyoruz
export async function startSubscription(billingData: {
  name: string;
  address: string;
  phone: string;
}) {
  const user = await currentUser();
  if (!user) throw new Error("Giriş yapmalısınız.");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) throw new Error("Restoran bulunamadı.");

  // 1. Ödeme Parametrelerini Hazırla
  const merchant_id = process.env.PAYTR_MERCHANT_ID!;
  const price = 300 * 100; 
  const merchant_oid = "SIP" + uuidv4().replace(/-/g, "").substring(0, 10);
  const email = user.emailAddresses[0].emailAddress;
  const user_ip = "85.85.85.85";
  
  // Gelen gerçek verileri kullanıyoruz
  const user_name = billingData.name;
  const user_address = billingData.address;
  const user_phone = billingData.phone;
  
  const currency = "TL";
  const test_mode = "0"; // Canlı moddasın
  const no_installment = "0";
  const max_installment = "0";
  const debug_on = "1";

  // --- SEPET HAZIRLIĞI ---
  const user_basket = [["1 Aylık EduQR Aboneliği", "300.00", 1]];
  const user_basket_json = JSON.stringify(user_basket);
  const user_basket_base64 = Buffer.from(user_basket_json).toString("base64");

  // 2. Hash Hesapla (Base64 ile)
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

  // 3. Veritabanına Kaydet
  await prisma.payment.create({
    data: {
      merchantOid: merchant_oid,
      amount: 300,
      status: "pending",
      restaurantId: restaurant.id
    }
  });

  // 4. PayTR API'sine İstek At
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

    const data = await response.json();

    if (data.status === "failed") {
      console.error("PAYTR HATASI:", data.reason);
      throw new Error("PayTR Token Alınamadı: " + data.reason);
    }

    return { iframe_token: data.token, status: 'success' };

  } catch (error) {
    console.error("PayTR İstek Hatası:", error);
    throw error;
  }
}