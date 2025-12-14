"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, PartyPopper } from "lucide-react";
import { createCoupon } from "@/actions/wheel-actions";
import { toast } from "sonner";
import confetti from "canvas-confetti";

// 🎨 Modern ve Canlı Renk Paleti (Sırayla döner)
const WHEEL_COLORS = [
  "#F59E0B", // Amber (Turuncu)
  "#EC4899", // Pink (Pembe)
  "#8B5CF6", // Violet (Mor)
  "#3B82F6", // Blue (Mavi)
  "#10B981", // Emerald (Yeşil)
  "#EF4444", // Red (Kırmızı)
  "#06B6D4", // Cyan (Turkuaz)
  "#6366F1", // Indigo
];

// DÜZELTME: Veritabanı modeliyle uyumlu hale getirildi (percentage eklendi)
interface WheelItem {
  id: string;
  label: string;
  percentage: number; // probability -> percentage olarak değiştirildi
  color?: string | null;
}

export default function SpinWheel({ items }: { items: WheelItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonItem, setWonItem] = useState<WheelItem | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  // Yerel depolamadan kullanıcının daha önce çevirip çevirmediğini kontrol et
  useEffect(() => {
    const spun = localStorage.getItem("wheel_spun");
    if (spun) setHasSpun(true);
  }, []);

  // Çark çevrildiğinde çalışacak fonksiyon
  const handleSpin = async () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);

    // DÜZELTME: percentage kullanılıyor
    const totalProb = items.reduce((acc, item) => acc + item.percentage, 0);
    let random = Math.random() * totalProb;
    let selectedItem = items[items.length - 1];

    for (const item of items) {
      if (random < item.percentage) { // DÜZELTME: probability -> percentage
        selectedItem = item;
        break;
      }
      random -= item.percentage; // DÜZELTME: probability -> percentage
    }

    // 2. Dönüş açısını hesapla
    // Her dilimin açısı
    const sliceAngle = 360 / items.length;
    const itemIndex = items.findIndex((i) => i.id === selectedItem.id);
    
    // Çarkın duracağı nokta: (Tur sayısı * 360) + (İlgili dilimin ters açısı)
    // Biraz rastgelelik ekleyerek (sliceAngle / 2) dilimin tam ortasına gelmesini sağla
    const spinCount = 5; // En az 5 tam tur
    const targetRotation = rotation + (spinCount * 360) + (360 - (itemIndex * sliceAngle)) - (sliceAngle / 2); // -sliceAngle/2 ortalar

    setRotation(targetRotation);

    // 3. Dönüş süresi kadar bekle (5 saniye)
    setTimeout(async () => {
      setWonItem(selectedItem);
      setIsSpinning(false);
      setHasSpun(true);
      localStorage.setItem("wheel_spun", "true");
      
      // Konfetileri patlat
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Veritabanına kaydet
      try {
        await createCoupon(selectedItem.id);
        toast.success("Tebrikler! Ödül kazandınız.");
      } catch (error) {
        console.error("Kupon oluşturulamadı", error);
      }
    }, 5000);
  };

  if (items.length === 0 || hasSpun && !isOpen) {
    // Eğer ödül yoksa veya zaten çevrilmişse ve modal kapalıysa sadece minik butonu göster (veya gizle)
     if(hasSpun) return null; // Zaten çevirdiyse hiç gösterme
  }

  // Çark Dilimlerinin Arka Planı (Conic Gradient)
  const sliceAngle = 360 / items.length;
  const gradientString = `conic-gradient(${items
    .map(
      (_, i) =>
        `${WHEEL_COLORS[i % WHEEL_COLORS.length]} ${i * sliceAngle}deg ${(i + 1) * sliceAngle}deg`
    )
    .join(", ")})`;

  return (
    <>
      {/* 1. Tetikleyici Buton (Hediye Paketi) - Sağ Altta Zıplayan */}
      {!hasSpun && !isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full shadow-2xl text-white cursor-pointer group"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
          >
            <Gift size={32} strokeWidth={1.5} />
          </motion.div>
          
          {/* Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white animate-bounce">
            1
          </span>
        </motion.button>
      )}

      {/* 2. Modal (Çark Ekranı) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Arka Plan Karartma */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSpinning && setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal İçeriği */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl overflow-hidden text-center"
            >
              {/* Kapat Butonu */}
              {!isSpinning && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              )}

              {/* Başlık */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Şansını Dene!
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Çarkı çevir, sürpriz hediyeyi kap.
                </p>
              </div>

              {/* --- ÇARK ALANI --- */}
              <div className="relative w-72 h-72 mx-auto mb-8">
                
                {/* Gösterge (Pointer) - En Üstte */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                   <div className="w-8 h-8 bg-white border-4 border-gray-800 rotate-45 transform translate-y-2 rounded-sm shadow-lg"></div>
                </div>

                {/* Dönen Kısım */}
                <motion.div
                  className="w-full h-full rounded-full relative border-[8px] border-white dark:border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                  style={{
                    background: gradientString, // CSS Gradient ile dilimler
                  }}
                  animate={{ rotate: rotation }}
                  transition={{ duration: 5, ease: "circOut" }}
                >
                  {/* Dilim Yazıları */}
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="absolute top-0 left-1/2 w-1 h-[50%] origin-bottom"
                      style={{
                        transform: `translateX(-50%) rotate(${
                          index * sliceAngle + sliceAngle / 2
                        }deg)`,
                      }}
                    >
                      {/* Yazıyı Dışarı Doğru İtmek İçin */}
                      <div className="pt-4 text-center">
                         <span 
                            className="block text-white font-bold text-xs uppercase tracking-wider drop-shadow-md" 
                            style={{ 
                                writingMode: 'vertical-rl', // Yazıyı dikey yap
                                textOrientation: 'mixed',
                                transform: 'rotate(180deg)', // Okunabilir yön
                                maxHeight: '100px'
                            }}
                        >
                            {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                {/* Orta Buton (Spin) */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || hasSpun}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-purple-100 z-10 active:scale-95 transition-transform"
                >
                  <span className="font-bold text-purple-600 text-xs">
                    {isSpinning ? "..." : "ÇEVİR"}
                  </span>
                </button>
              </div>

              {/* Kazandıktan Sonraki Mesaj */}
              {wonItem && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-bold mb-1">
                    <PartyPopper size={20} />
                    <span>Tebrikler!</span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    "{wonItem.label}" kazandınız!
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Garsona bu ekranı göstererek ödülünüzü alabilirsiniz.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}