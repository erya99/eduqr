"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { startSubscription } from "@/actions/payment-actions";
import { createInvoiceRequest } from "@/actions/invoice-actions";
import { Loader2 } from "lucide-react";

// restaurantId prop olarak alınmalı
export default function PaytrButton({ restaurantId }: { restaurantId?: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    legalName: "",
    taxNumber: "",
    taxOffice: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantId) return alert("Restoran ID bulunamadı");
    
    setLoading(true);
    try {
      // 1. ÖNCE: Fatura bilgilerini veritabanına kaydet
      await createInvoiceRequest({
        restaurantId,
        legalName: formData.legalName,
        taxNumber: formData.taxNumber,
        taxOffice: formData.taxOffice,
        address: formData.address,
        amount: 300 // Paket tutarı
      });

      // 2. SONRA: PayTR işlemini başlat (Form verilerini göndererek)
      const result = await startSubscription({
        name: formData.legalName,
        address: formData.address,
        phone: formData.phone
      });
      
      if (result.status === 'success' && result.iframe_token) {
        const form = document.createElement("form");
        form.action = "https://www.paytr.com/odeme/guvenli/" + result.iframe_token;
        form.method = "POST";
        form.target = "_self";
        document.body.appendChild(form);
        form.submit();
      } else {
        alert("Ödeme başlatılamadı.");
      }

    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Hemen Satın Al (250₺ + KDV)
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fatura Bilgileri</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handlePayment} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Ad Soyad / Şirket Ünvanı</Label>
            <Input name="legalName" required onChange={handleChange} placeholder="Örn: Ahmet Yılmaz" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>TC / Vergi No</Label>
              <Input name="taxNumber" required onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label>Vergi Dairesi</Label>
              <Input name="taxOffice" placeholder="Opsiyonel" onChange={handleChange} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Telefon</Label>
            <Input name="phone" required onChange={handleChange} placeholder="0555..." />
          </div>

          <div className="grid gap-2">
            <Label>Fatura Adresi</Label>
            <Textarea name="address" required onChange={handleChange} placeholder="Mahalle, Sokak, No..." />
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? <Loader2 className="animate-spin" /> : "Ödemeye Geç ->"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}