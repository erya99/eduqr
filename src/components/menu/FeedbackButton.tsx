"use client";

import { useState } from "react";
import { MessageSquarePlus, Star, Send } from "lucide-react";
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
        <Button
          className="fixed bottom-4 right-4 z-50 rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 animate-in fade-in zoom-in duration-300"
          size="icon"
        >
          <MessageSquarePlus className="h-6 w-6 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Görüşleriniz Bizim İçin Değerli</DialogTitle>
          <DialogDescription>
            Hizmet kalitemizi artırmak için lütfen deneyiminizi puanlayın. Bu mesaj doğrudan işletme sahibine iletilecektir.
          </DialogDescription>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-4 mt-2">
          {/* Yıldızlar */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea 
            name="comment" 
            placeholder="Düşüncelerinizi buraya yazın..." 
            required 
            className="min-h-[100px]"
          />
          
          <Input 
            name="contactInfo" 
            placeholder="Adınız veya Telefonunuz (İsteğe bağlı)" 
          />

          <Button type="submit" className="w-full" disabled={loading || rating === 0}>
            {loading ? "Gönderiliyor..." : "Yöneticiye İlet"} <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}