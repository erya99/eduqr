"use client";

import { useState } from "react";
import { MessageCircleQuestion, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createReview } from "@/actions/review-actions";

export default function FeedbackButton({ restaurantId }: { restaurantId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    formData.append("rating", rating.toString());
    
    const res = await createReview(formData, restaurantId);
    
    setLoading(false);
    if (res.success) {
      toast.success("Değerlendirmeniz iletildi. Teşekkürler!");
      setIsOpen(false);
      setRating(0);
    } else {
      toast.error("Bir hata oluştu.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* DÜZELTME: Fixed pozisyon kaldırıldı. Footer uyumlu sade buton yapıldı. */}
        <button className="text-gray-400 hover:text-[var(--brand-primary)] dark:hover:text-blue-400 transition p-1">
            <MessageCircleQuestion size={20} />
            <span className="sr-only">Görüş Bildir</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md z-[70] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <MessageCircleQuestion className="w-6 h-6 text-primary" />
            Görüşleriniz Değerli
          </DialogTitle>
          <DialogDescription>
            Hizmet kalitemizi artırmak için deneyiminizi puanlayın.
          </DialogDescription>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-5 mt-4">
          <div className="flex justify-center gap-3 mb-6 bg-gray-50 dark:bg-gray-800/50 py-4 rounded-2xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none transition-all duration-200 hover:scale-125 active:scale-95"
              >
                <Star
                  className={`w-9 h-9 transition-colors ${
                    star <= rating 
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" 
                        : "text-gray-300 dark:text-gray-600 hover:text-yellow-200"
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea 
            name="comment" 
            placeholder="Deneyiminizi bizimle paylaşın..." 
            required 
            className="min-h-[120px] resize-none text-base rounded-xl border-gray-200 dark:border-gray-700 focus-visible:ring-primary"
          />
          
          <Input 
            name="contactInfo" 
            placeholder="İsim veya Telefon (İsteğe bağlı)"
            className="h-12 rounded-xl border-gray-200 dark:border-gray-700 focus-visible:ring-primary"
          />

          <Button type="submit" className="w-full h-12 text-base rounded-xl font-semibold bg-gradient-to-r from-primary to-violet-600 hover:opacity-90 transition-opacity" disabled={loading || rating === 0}>
            {loading ? "Gönderiliyor..." : "Yöneticiye İlet"} <Send className="w-5 h-5 ml-2" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}