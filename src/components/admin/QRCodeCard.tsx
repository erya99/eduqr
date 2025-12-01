"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function QRCodeCard({ slug }: { slug: string }) {
  const qrRef = useRef<HTMLDivElement>(null);
  
  // URL'i state içinde tutuyoruz ki hydration hatası olmasın
  const [menuUrl, setMenuUrl] = useState("");

  useEffect(() => {
    // Tarayıcıdaki güncel ana domaini al (https://eduqr.tr veya localhost:3000)
    // ve sonuna restoranın slug'ını ekle.
    setMenuUrl(`${window.location.origin}/${slug}`);
  }, [slug]);

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        
        const downloadLink = document.createElement("a");
        downloadLink.download = `${slug}-qr-code.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Menü QR Kodu</CardTitle>
        <Download className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-black" onClick={downloadQRCode}/>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-6 space-y-4">
        
        {/* QR Kodun Kendisi */}
        <div ref={qrRef} className="p-4 bg-white border rounded-lg shadow-sm">
          {menuUrl ? (
            <QRCodeSVG 
              value={menuUrl} 
              size={150}
              level="H"
              includeMargin={true}
            />
          ) : (
            <div className="w-[150px] h-[150px] bg-gray-100 animate-pulse rounded" />
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Bu kodu indirip masalara yapıştırabilirsiniz.
          </p>
          <p className="text-[10px] text-gray-400 break-all px-4">
            {menuUrl}
          </p>
          <Button variant="outline" size="sm" onClick={downloadQRCode}>
            <Download className="mr-2 h-4 w-4" /> PNG İndir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}