"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function PdfDownloader({ 
  elementId, 
  filename 
}: { 
  elementId: string; 
  filename: string;
}) {
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generatePdf = async () => {
      // Kütüphaneyi dinamik olarak import ediyoruz
      // @ts-ignore
      const html2pdf = (await import("html2pdf.js")).default;
      
      const element = document.getElementById(elementId);
      
      if (!element) {
        console.error("PDF oluşturulacak element bulunamadı.");
        setIsGenerating(false);
        return;
      }

      const opt = {
        margin:       [0, 0, 0, 0] as [number, number, number, number],
        filename:     `${filename}.pdf`,
        // DÜZELTME BURADA: 'jpeg' as const eklendi
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' as const }
      };

      try {
        await html2pdf().set(opt).from(element).save();
      } catch (error) {
        console.error("PDF oluşturma hatası:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    // Görsellerin tam yüklenmesi için 1 saniye bekleyip işlemi başlatıyoruz
    const timer = setTimeout(generatePdf, 1000);

    return () => clearTimeout(timer);
  }, [elementId, filename]);

  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <h2 className="text-xl font-bold text-gray-800">Menü PDF Olarak Hazırlanıyor...</h2>
      <p className="text-gray-500">Lütfen bekleyin, indirme işlemi otomatik başlayacaktır.</p>
    </div>
  );
}