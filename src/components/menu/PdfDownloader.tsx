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
      // @ts-ignore
      const html2pdf = (await import("html2pdf.js")).default;
      
      const element = document.getElementById(elementId);
      
      if (!element) {
        console.error("PDF oluşturulacak element bulunamadı.");
        setIsGenerating(false);
        return;
      }

      const opt = {
        margin:       [10, 10, 10, 10] as [number, number, number, number], 
        filename:     `${filename}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true, 
            scrollY: 0,
            backgroundColor: "#ffffff" // 👈 KRİTİK DÜZELTME: Arka planı beyaz yap
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
        pagebreak:    { mode: ['css', 'legacy'], avoid: '.avoid-break' } 
      };

      try {
        await html2pdf().set(opt).from(element).save();
      } catch (error) {
        console.error("PDF oluşturma hatası:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    // Görsellerin yüklenmesi için 1.5 saniye bekle
    const timer = setTimeout(generatePdf, 1500);

    return () => clearTimeout(timer);
  }, [elementId, filename]);

  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <h2 className="text-xl font-bold text-gray-800">Menü PDF Hazırlanıyor...</h2>
      <p className="text-gray-500">Lütfen bekleyin, düzenleniyor ve indiriliyor.</p>
    </div>
  );
}