"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, PartyPopper, Lock } from "lucide-react";
import { createCoupon } from "@/actions/wheel-actions";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const WHEEL_COLORS = [
  "#F59E0B", "#EC4899", "#8B5CF6", "#3B82F6", 
  "#10B981", "#EF4444", "#06B6D4", "#6366F1",
];

interface WheelItem {
  id: string;
  label: string;
  percentage: number;
  color?: string | null;
}

interface SpinWheelProps {
  items: WheelItem[];
  initialOpen?: boolean; // YENİ: Başlangıçta açık olsun mu?
  onClose?: () => void;  // YENİ: Kapanınca çalışacak fonksiyon
}

export default function SpinWheel({ items, initialOpen = false, onClose }: SpinWheelProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonItem, setWonItem] = useState<WheelItem | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  useEffect(() => {
    const spun = localStorage.getItem("wheel_spun");
    if (spun) setHasSpun(true);
  }, []);

  // initialOpen değişirse state'i güncelle (NewGenMenu'den tetiklemek için)
  useEffect(() => {
    if (initialOpen) setIsOpen(true);
  }, [initialOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleSpin = async () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);

    const totalProb = items.reduce((acc, item) => acc + item.percentage, 0);
    let random = Math.random() * totalProb;
    let selectedItem = items[items.length - 1];

    for (const item of items) {
      if (random < item.percentage) {
        selectedItem = item;
        break;
      }
      random -= item.percentage;
    }

    const sliceAngle = 360 / items.length;
    const itemIndex = items.findIndex((i) => i.id === selectedItem.id);
    const spinCount = 5;
    const targetRotation = rotation + (spinCount * 360) + (360 - (itemIndex * sliceAngle)) - (sliceAngle / 2);

    setRotation(targetRotation);

    setTimeout(async () => {
      setWonItem(selectedItem);
      setIsSpinning(false);
      setHasSpun(true);
      localStorage.setItem("wheel_spun", "true");
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      try {
        await createCoupon(selectedItem.id);
        toast.success("Tebrikler! Ödül kazandınız.");
      } catch (error) {
        console.error("Kupon oluşturulamadı", error);
      }
    }, 5000);
  };

  if (items.length === 0) return null;

  // Eğer zaten çevirdiyse ve modal açık DEĞİLSE, butonu gizle.
  // Ama modal açıksa (yani Fırsatlar'a basıldıysa) içeriği göster.
  if (hasSpun && !isOpen) return null;

  const sliceAngle = 360 / items.length;
  const gradientString = `conic-gradient(${items
    .map(
      (_, i) =>
        `${WHEEL_COLORS[i % WHEEL_COLORS.length]} ${i * sliceAngle}deg ${(i + 1) * sliceAngle}deg`
    )
    .join(", ")})`;

  return (
    <>
      {/* 1. Tetikleyici Buton (Sadece modal kapalıyken ve henüz çevrilmediyse) */}
      {!hasSpun && !isOpen && !initialOpen && (
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
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white animate-bounce">
            1
          </span>
        </motion.button>
      )}

      {/* 2. Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={!isSpinning ? handleClose : undefined}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl overflow-hidden text-center z-10"
            >
              {!isSpinning && (
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-20"
                >
                  <X size={24} />
                </button>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Şansını Dene!
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Çarkı çevir, sürpriz hediyeyi kap.
                </p>
              </div>

              {/* Çark Alanı */}
              <div className="relative w-72 h-72 mx-auto mb-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                   <div className="w-8 h-8 bg-white border-4 border-gray-800 rotate-45 transform translate-y-2 rounded-sm shadow-lg"></div>
                </div>

                <motion.div
                  className={`w-full h-full rounded-full relative border-[8px] border-white dark:border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.2)] ${hasSpun ? 'opacity-50 grayscale' : ''}`}
                  style={{ background: gradientString }}
                  animate={{ rotate: rotation }}
                  transition={{ duration: 5, ease: "circOut" }}
                >
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
                      <div className="pt-4 text-center">
                         <span 
                            className="block text-white font-bold text-xs uppercase tracking-wider drop-shadow-md" 
                            style={{ 
                                writingMode: 'vertical-rl',
                                textOrientation: 'mixed',
                                transform: 'rotate(180deg)',
                                maxHeight: '100px'
                            }}
                        >
                            {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                {/* Orta Buton */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || hasSpun}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-purple-100 z-10 active:scale-95 transition-transform disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {hasSpun ? (
                      <Lock className="text-gray-400" size={24} />
                  ) : (
                      <span className="font-bold text-purple-600 text-xs">
                        {isSpinning ? "..." : "ÇEVİR"}
                      </span>
                  )}
                </button>
              </div>

              {/* Mesaj Alanı */}
              {wonItem ? (
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
                </motion.div>
              ) : hasSpun && !isSpinning ? (
                  // Eğer daha önce çevirdiyse ve tekrar açtıysa bu mesajı göster
                  <div className="text-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        Günlük şansınızı zaten kullandınız.
                      </p>
                  </div>
              ) : null}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}