import crypto from "crypto";

export function getPaytrToken(
  user_ip: string,
  merchant_oid: string,
  email: string,
  payment_amount: number,
  user_basket: any,
  no_installment: number,
  max_installment: number,
  currency: string,
  test_mode: number
) {
  const merchant_id = process.env.PAYTR_MERCHANT_ID!;
  const merchant_key = process.env.PAYTR_MERCHANT_KEY!;
  const merchant_salt = process.env.PAYTR_MERCHANT_SALT!;

  // --- DÜZELTME BAŞLANGICI ---
  // Eğer user_basket zaten string (Base64) ise aynen kullan, değilse JSON'a çevir.
  const basketStr = typeof user_basket === "string" ? user_basket : JSON.stringify(user_basket);
  // --- DÜZELTME BİTİŞİ ---

  const concatStr =
    merchant_id +
    user_ip +
    merchant_oid +
    email +
    payment_amount.toString() +
    basketStr +
    no_installment.toString() +
    max_installment.toString() +
    currency +
    test_mode.toString();

  const token = crypto
    .createHmac("sha256", merchant_key)
    .update(concatStr + merchant_salt)
    .digest("base64");

  return token;
}