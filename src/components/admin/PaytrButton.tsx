"use client";

import { Button } from "@/components/ui/button";
import { startSubscription } from "@/actions/payment-actions";
import { useState } from "react";

export default function PaytrButton() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Server action'ı çağır
      const result = await startSubscription();
      
      if (result.status === 'success' && result.iframe_token) {
        // İframe açmak veya sayfaya yönlendirmek için form oluştur
        const form = document.createElement("form");
        // URL'ye dikkat: Token artık doğrulandı ve buraya eklenmeye hazır.
        form.action = "https://www.paytr.com/odeme/guvenli/" + result.iframe_token;
        form.method = "POST";
        form.target = "_self"; // Aynı sayfada açılsın

        document.body.appendChild(form);
        form.submit();
      } else {
        alert("Ödeme başlatılamadı: Token alınamadı.");
      }

    } catch (error) {
      alert("Bir hata oluştu. Lütfen konsolu kontrol edin.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
      {loading ? "Yükleniyor..." : "Hemen Satın Al"}
    </Button>
  );
}