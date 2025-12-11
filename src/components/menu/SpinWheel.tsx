"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import confetti from "canvas-confetti"; // npm install canvas-confetti @types/canvas-confetti

interface WheelItem {
  id: string;
  label: string;
  percentage: number;
  color: string;
}

export default function SpinWheel({ items }: { items: any[] }) {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Renk paleti (Eğer DB'den gelmezse diye)
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F"];

  useEffect(() => {
    // Daha önce çevirdi mi kontrol et (LocalStorage)
    const stored = localStorage.getItem("eduqr_wheel_spun");
    if (stored) setHasSpun(true);
  }, []);

  const handleSpin = () => {
    if (spinning || hasSpun || items.length === 0) return;

    setSpinning(true);
    
    // 1. Rastgele Sonuç Belirleme (Ağırlıklı)
    const totalWeight = items.reduce((sum, item) => sum + item.percentage, 0);
    let random = Math.random() * totalWeight;
    let selectedIndex = 0;
    
    for (let i = 0; i < items.length; i++) {
        random -= items[i].percentage;
        if (random <= 0) {
            selectedIndex = i;
            break;
        }
    }

    // 2. Dönüş Açısını Hesaplama
    // Çarkın en az 5 tur atmasını istiyoruz (360 * 5)
    // Seçilen dilimin açısını ekliyoruz.
    const segmentAngle = 360 / items.length;
    // Hedeflenen dilimi merkeze (ok işaretine) getirmek için sapma hesaplaması
    // Not: CSS conic-gradient 0 dereceden başlar (üst nokta).
    const stopAngle = 360 * 5 + (360 - (selectedIndex * segmentAngle) - (segmentAngle / 2)); 

    if (wheelRef.current) {
        wheelRef.current.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
        wheelRef.current.style.transform = `rotate(${stopAngle}deg)`;
    }

    // 3. Sonuç İşlemleri
    setTimeout(() => {
        setResult(items[selectedIndex].label);
        setSpinning(false);
        setHasSpun(true);
        localStorage.setItem("eduqr_wheel_spun", "true");
        
        // Konfeti Patlat
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

    }, 4000); // 4 saniye animasyon süresi
  };

  // Çark Dilimlerini CSS Gradient olarak oluştur
  const gradient = items.map((item, index) => {
      const start = (index * 100) / items.length;
      const end = ((index + 1) * 100) / items.length;
      const color = item.color || colors[index % colors.length];
      return `${color} ${start}% ${end}%`;
  }).join(", ");

  if (items.length === 0) return null;

  return (
    <>
      {/* Yüzen Hediye Butonu (Sağ Alt) */}
      {!hasSpun && (
          <div className="fixed bottom-24 right-4 z-40 animate-bounce">
            <Button 
                onClick={() => setOpen(true)} 
                className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg border-2 border-white"
            >
                <Gift className="w-8 h-8 text-white" />
            </Button>
          </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {result ? "Tebrikler! 🎉" : "Şansını Dene!"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-6 relative">
            
            {/* Çark Ok İşareti */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-gray-800 drop-shadow-md"></div>

            {/* Çark Gövdesi */}
            <div 
                ref={wheelRef}
                className="w-64 h-64 rounded-full border-4 border-white shadow-2xl relative overflow-hidden"
                style={{
                    background: `conic-gradient(${gradient})`,
                    transform: `rotate(0deg)` // Başlangıç
                }}
            >
                {/* Yazılar (Biraz karmaşık CSS gerektirir, basitlik için ortada sadece renkleri tutuyoruz) */}
                {items.map((item, index) => {
                    const angle = (360 / items.length) * index + (360 / items.length) / 2;
                    return (
                        <div 
                            key={item.id}
                            className="absolute top-1/2 left-1/2 w-full h-4 -translate-y-1/2 origin-left text-white text-xs font-bold text-right pr-4 drop-shadow-md"
                            style={{ transform: `rotate(${angle - 90}deg)` }} // -90 offset
                        >
                           <span className="inline-block" style={{ transform: "rotate(90deg)" }}>
                             {items.length <= 6 ? item.label : "🎁"}
                           </span>
                        </div>
                    )
                })}
            </div>

            {/* Buton ve Sonuç */}
            <div className="mt-8 text-center w-full">
                {result ? (
                    <div className="space-y-4 animate-in zoom-in">
                        <div className="p-4 bg-green-100 text-green-800 rounded-xl font-bold text-xl border border-green-200">
                            {result} Kazandınız!
                        </div>
                        <p className="text-sm text-gray-500">Sipariş verirken garsona bu ekranı gösterin.</p>
                        <Button onClick={() => setOpen(false)} variant="outline">Kapat</Button>
                    </div>
                ) : (
                    <Button 
                        size="lg" 
                        onClick={handleSpin} 
                        disabled={spinning}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg h-12 shadow-lg transition-all active:scale-95"
                    >
                        {spinning ? "Dönüyor..." : "ÇEVİR KAZAN"}
                    </Button>
                )}
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}