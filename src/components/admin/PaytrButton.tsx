"use client";

import { Button } from "@/components/ui/button";
import { startSubscription } from "@/actions/payment-actions";
import { useEffect, useState } from "react";

export default function PaytrButton() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const data = await startSubscription();
      
      // PayTR için form oluşturup post etmemiz lazım (Iframe açılması için)
      const form = document.createElement("form");
      form.action = "https://www.paytr.com/odeme/guvenli/" + data.paytr_token;
      form.method = "POST";
      form.target = "_self"; // Veya _blank yeni sekme

      // Gerekli alanları ekle
      for (const [key, value] of Object.entries(data)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      alert("Ödeme başlatılamadı.");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
      {loading ? "Yükleniyor..." : "Hemen Satın Al"}
    </Button>
  );
}