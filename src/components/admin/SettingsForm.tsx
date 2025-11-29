"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "./ImageUpload"; // Hazır bileşenimiz
import { updateRestaurantSettings } from "@/actions/restaurant-actions";
import { useState } from "react";

export default function SettingsForm({ restaurant }: { restaurant: any }) {
  // State'ler (Anlık önizleme için)
  const [logo, setLogo] = useState(restaurant.logoUrl || "");
  const [cover, setCover] = useState(restaurant.coverUrl || "");

  return (
    <form action={updateRestaurantSettings} className="space-y-8">
      
      {/* İŞLETME BİLGİLERİ */}
      <Card>
        <CardHeader>
          <CardTitle>Genel Bilgiler</CardTitle>
          <CardDescription>İşletmenizin adı ve temel bilgileri.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>İşletme Adı</Label>
            <Input name="name" defaultValue={restaurant.name} required />
          </div>
        </CardContent>
      </Card>

      {/* GÖRSELLER */}
      <Card>
        <CardHeader>
          <CardTitle>Görseller</CardTitle>
          <CardDescription>Menünüzde görünecek logo ve kapak fotoğrafı.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Logo Yükleme */}
          <div className="grid gap-2">
            <Label>Logo</Label>
            <div className="text-sm text-gray-500 mb-2">Kare format (Örn: 500x500) önerilir.</div>
            <ImageUpload 
                value={logo} 
                onChange={(url) => setLogo(url)}
                onRemove={() => setLogo("")}
            />
            <input type="hidden" name="logoUrl" value={logo} />
          </div>

          <div className="border-t border-gray-100 my-4"></div>

          {/* Kapak Resmi Yükleme */}
          <div className="grid gap-2">
            <Label>Kapak Fotoğrafı</Label>
            <div className="text-sm text-gray-500 mb-2">Yatay format (Örn: 1200x400) önerilir.</div>
            <ImageUpload 
                value={cover} 
                onChange={(url) => setCover(url)}
                onRemove={() => setCover("")}
            />
            <input type="hidden" name="coverUrl" value={cover} />
          </div>

        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="bg-green-600 hover:bg-green-700">
          Değişiklikleri Kaydet
        </Button>
      </div>
    </form>
  );
}