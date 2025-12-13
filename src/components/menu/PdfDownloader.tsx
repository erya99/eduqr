"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import html2canvas from "html2canvas";

export default function PdfDownloader({ 
  elementId, 
  filename 
}: { 
  elementId: string; 
  filename: string;
}) {
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generateImage = async () => {
      const element = document.getElementById(elementId);
      
      if (!element) {
        console.error("Görüntü alınacak element bulunamadı.");
        setIsGenerating(false);
        return;
      }

      try {
        // html2canvas ile elementin fotoğrafını çekiyoruz
        const canvas = await html2canvas(element, {
          scale: 2, // Retina kalitesi (2x)
          useCORS: true, // Dış kaynaklı görselleri yükle
          backgroundColor: "#ffffff", // Arka planı beyaz yap
          scrollY: 0, // Sayfanın tepesinden başla
          logging: false,
        });

        // Canvas'ı resim verisine (DataURL) çevir
        const image = canvas.toDataURL("image/png", 1.0);

        // İndirme linki oluştur ve tıkla
        const link = document.createElement("a");
        link.download = `${filename}.png`;
        link.href = image;
        link.click();

      } catch (error) {
        console.error("Görsel oluşturma hatası:", error);
      } finally {
        setIsGenerating(false);
        // İndirme bitince istersen pencereyi kapatabilirsin:
        // window.close();
      }
    };

    // Görsellerin tam yüklenmesi için 1.5 saniye bekle
    const timer = setTimeout(generateImage, 1500);

    return () => clearTimeout(timer);
  }, [elementId, filename]);

  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <h2 className="text-xl font-bold text-gray-800">Menü Görseli Hazırlanıyor...</h2>
      <p className="text-gray-500">Lütfen bekleyin, yüksek kaliteli PNG olarak indiriliyor.</p>
    </div>
  );
}