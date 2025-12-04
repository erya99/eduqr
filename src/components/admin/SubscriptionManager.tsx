"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { manualSubscription } from "@/actions/super-admin-actions";
import { CalendarClock, Loader2 } from "lucide-react";

export default function SubscriptionManager({ restaurantId, currentEnd }: { restaurantId: string, currentEnd: Date | null }) {
  const [open, setOpen] = useState(false);
  const [months, setMonths] = useState("1");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await manualSubscription(restaurantId, parseInt(months));
    setLoading(false);
    setOpen(false);
  };

  // Kalan gün hesabı (Görsellik için)
  const now = new Date();
  const daysLeft = currentEnd && currentEnd > now 
    ? Math.ceil((currentEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarClock className="w-4 h-4" />
          {daysLeft > 0 ? `${daysLeft} Gün Kaldı` : "Süresi Bitti"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Abonelik Yönetimi</DialogTitle>
          <DialogDescription>
            Bu restorana manuel olarak süre ekleyebilirsiniz.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label>Eklenecek Süre</label>
            <Select onValueChange={setMonths} defaultValue="1">
              <SelectTrigger>
                <SelectValue placeholder="Süre seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Ay Ekle</SelectItem>
                <SelectItem value="3">3 Ay Ekle</SelectItem>
                <SelectItem value="6">6 Ay Ekle</SelectItem>
                <SelectItem value="12">1 Yıl Ekle</SelectItem>
                <SelectItem value="-1">Sınırsız (100 Yıl)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Süreyi Tanımla"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}