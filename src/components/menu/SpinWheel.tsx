"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import confetti from "canvas-confetti"; 

// Veritabanından gelen veri tipi
interface WheelItem {
  id: string;
  label: string;
  percentage: number;
  color?: string | null;
}

export default function SpinWheel({ items }: { items: WheelItem[] }) {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState(true); 
  const wheelRef = useRef<HTMLDivElement>(null);

  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F"];

  useEffect(() => {
    const lastSpinTime = localStorage.getItem("eduqr_last_spin_time");
    
    if (lastSpinTime) {
      const now = new Date().getTime();
      const hoursPassed = (now - parseInt(lastSpinTime)) / (1000 * 60 * 60);
      
      if (hoursPassed < 24) {
        setHasSpun(true);
      } else {
        localStorage.removeItem("eduqr_last_spin_time");
        setHasSpun(false);
      }
    } else {
      setHasSpun(false);
    }
  }, []);

  const handleSpin = () => {
    if (spinning || hasSpun || items.length === 0) return;

    setSpinning(true);
    
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

    const segmentAngle = 360 / items.length;
    const stopAngle = 360 * 5 + (360 - (selectedIndex * segmentAngle) - (segmentAngle / 2)); 

    if (wheelRef.current) {
        wheelRef.current.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
        wheelRef.current.style.transform = `rotate(${stopAngle}deg)`;
    }

    setTimeout(() => {
        setResult(items[selectedIndex].label);
        setSpinning(false);
        setHasSpun(true); // Artık bu satır bileşeni yok etmeyecek, sadece butonu gizleyecek
        
        localStorage.setItem("eduqr_last_spin_time", new Date().getTime().toString());
        
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#FF6B6B', '#4ECDC4', '#F7DC6F']
        });

    }, 4000); 
  };

  const gradient = items.map((item, index) => {
      const start = (index * 100) / items.length;
      const end = ((index + 1) * 100) / items.length;
      const color = item.color || colors[index % colors.length];
      return `${color} ${start}% ${end}%`;
  }).join(", ");

  // DÜZELTME 1: hasSpun kontrolünü buradan kaldırdık. Sadece item yoksa null dönüyoruz.
  if (items.length === 0) return null;

  return (
    <>
      {/* DÜZELTME 2: Butonu sadece hasSpun false ise gösteriyoruz */}
      {!hasSpun && (
        <div className="fixed bottom-24 right-4 z-40 animate-bounce">
            <Button 
                onClick={() => setOpen(true)} 
                className="rounded-full w-16 h-16 bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 shadow-xl border-4 border-white hover:scale-110 transition-transform p-0"
            >
                <Gift className="w-8 h-8 text-white" />
            </Button>
        </div>
      )}

      {/* Pop-up her zaman render ediliyor, açılıp kapanması 'open' state'ine bağlı */}
      <Dialog open={open} onOpenChange={(val) => {
          if (!spinning) setOpen(val);
      }}>
        <DialogContent className="sm:max-w-md overflow-hidden bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent py-2">
                {result ? "Tebrikler! 🎉" : "Şansını Dene!"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-6 relative">
            
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 drop-shadow-lg">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[35px] border-t-gray-800"></div>
            </div>

            <div className="relative p-2 rounded-full border-4 border-gray-100 shadow-inner bg-white">
                <div 
                    ref={wheelRef}
                    className="w-72 h-72 rounded-full border-8 border-white shadow-2xl relative overflow-hidden"
                    style={{
                        background: `conic-gradient(${gradient})`,
                        transform: `rotate(0deg)` 
                    }}
                >
                    {items.map((item, index) => {
                        const angle = (360 / items.length) * index + (360 / items.length) / 2;
                        return (
                            <div 
                                key={item.id}
                                className="absolute top-1/2 left-1/2 w-full h-0 -translate-y-1/2 origin-left pl-8 z-10"
                                style={{ transform: `rotate(${angle - 90}deg)` }} 
                            >
                               <div className="text-white font-bold text-sm drop-shadow-md whitespace-nowrap w-24 text-right transform rotate-90 origin-bottom-right translate-x-8">
                                 {item.label.length > 15 ? item.label.substring(0, 12) + "..." : item.label}
                               </div>
                            </div>
                        )
                    })}
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md z-20"></div>
            </div>

            <div className="mt-8 text-center w-full px-4 min-h-[80px] flex items-center justify-center">
                {result ? (
                    <div className="space-y-4 animate-in zoom-in w-full">
                        <div className="p-4 bg-green-50 text-green-700 rounded-xl font-bold text-lg border border-green-200 shadow-sm flex flex-col gap-1">
                            <span>🎁 Kazandığın Ödül:</span>
                            <span className="text-2xl text-green-800">{result}</span>
                        </div>
                        <p className="text-xs text-gray-400">Ekran görüntüsü alarak garsona gösterebilirsin.</p>
                        <Button onClick={() => setOpen(false)} variant="secondary" className="w-full">
                            Kapat
                        </Button>
                    </div>
                ) : (
                    <Button 
                        size="lg" 
                        onClick={handleSpin} 
                        disabled={spinning}
                        className="w-full bg-gray-900 hover:bg-black text-white font-bold text-lg h-14 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {spinning ? "Bol Şans..." : "ÇEVİR KAZAN"}
                    </Button>
                )}
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}