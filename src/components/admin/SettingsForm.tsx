// components/admin/SettingsForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Restaurant } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { updateRestaurant } from "@/lib/actions/restaurant-actions";
import { toast } from "sonner";
import { Loader2, Upload, Instagram, Facebook, Twitter, Globe, Image as ImageIcon } from "lucide-react";

interface SettingsFormProps {
  restaurant: Restaurant;
}

export default function SettingsForm({ restaurant }: SettingsFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: restaurant.name,
    slug: restaurant.slug,
    logoUrl: restaurant.logoUrl || "",
    coverUrl: restaurant.coverUrl || "", // YENİ
    instagramUrl: restaurant.instagramUrl || "", // YENİ
    facebookUrl: restaurant.facebookUrl || "", // YENİ
    twitterUrl: restaurant.twitterUrl || "", // YENİ
    websiteUrl: restaurant.websiteUrl || "", // YENİ
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = (result: any, field: "logoUrl" | "coverUrl") => {
    setFormData({ ...formData, [field]: result.info.secure_url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(formData.slug)) {
      toast.error("Restoran bağlantısı sadece küçük harf, rakam ve tire (-) içerebilir.");
      setIsLoading(false);
      return;
    }

    const result = await updateRestaurant(restaurant.id, formData);

    if (result.success) {
      toast.success("Ayarlar başarıyla kaydedildi.");
      router.refresh();
    } else {
      toast.error(result.error || "Bir hata oluştu.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border">
      {/* --- Temel Bilgiler --- */}
      <div className="space-y-4 pb-4 border-b">
        <h3 className="text-lg font-semibold">Temel Bilgiler</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Restoran Adı</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Restoran Bağlantısı (Slug)</Label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm bg-gray-100 p-2 rounded-l-md border border-r-0">eduqr.tr/</span>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="rounded-l-none"
              />
            </div>
            <p className="text-xs text-gray-500">Menünüzün ulaşılacağı web adresi.</p>
          </div>
        </div>
      </div>

      {/* --- Görseller (Logo ve Kapak) --- */}
      <div className="space-y-4 pb-4 border-b">
        <h3 className="text-lg font-semibold">Görseller</h3>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Logo Yükleme */}
          <div className="space-y-2">
            <Label>Restoran Logosu</Label>
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 shrink-0">
                {formData.logoUrl ? (
                  <Image
                    src={formData.logoUrl}
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Upload className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                 <CldUploadButton
                    onUpload={(result) => handleUpload(result, "logoUrl")}
                    uploadPreset="qrmenu"
                    className="w-full"
                  >
                    <Button type="button" variant="outline" size="sm" className="w-full">
                      <Upload className="w-4 h-4 mr-2"/> {formData.logoUrl ? "Logoyu Değiştir" : "Logo Yükle"}
                    </Button>
                  </CldUploadButton>
                  <p className="text-xs text-gray-500">Kare (1:1) formatta yüklemeniz önerilir.</p>
              </div>
            </div>
          </div>

          {/* YENİ: Kapak Görseli Yükleme */}
          <div className="space-y-2">
            <Label>Kapak Görseli (Opsiyonel)</Label>
             <div className="flex flex-col gap-3">
              <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                {formData.coverUrl ? (
                  <Image
                    src={formData.coverUrl}
                    alt="Kapak Görseli"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <ImageIcon className="w-10 h-10 opacity-50" />
                  </div>
                )}
              </div>
              <CldUploadButton
                onUpload={(result) => handleUpload(result, "coverUrl")}
                uploadPreset="qrmenu"
                 className="w-full sm:w-auto"
              >
                 <Button type="button" variant="outline" size="sm" className="w-full">
                  <Upload className="w-4 h-4 mr-2"/> {formData.coverUrl ? "Kapak Görselini Değiştir" : "Kapak Görseli Yükle"}
                </Button>
              </CldUploadButton>
            </div>
            <p className="text-xs text-gray-500">Menü sayfasının en üstünde geniş bir şekilde görünecek.</p>
          </div>
        </div>
      </div>

      {/* --- YENİ: Sosyal Medya ve İletişim --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sosyal Medya ve İletişim</h3>
        <p className="text-sm text-gray-500">Menünüzün alt kısmında görünecek linkler.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="instagramUrl" className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-600" /> Instagram Linki
            </Label>
            <Input
              id="instagramUrl"
              name="instagramUrl"
              placeholder="https://instagram.com/kullaniciadi"
              value={formData.instagramUrl}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebookUrl" className="flex items-center gap-2">
              <Facebook className="w-4 h-4 text-blue-600" /> Facebook Linki
            </Label>
            <Input
              id="facebookUrl"
              name="facebookUrl"
              placeholder="https://facebook.com/sayfaadi"
              value={formData.facebookUrl}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitterUrl" className="flex items-center gap-2">
              <Twitter className="w-4 h-4 text-black" /> Twitter (X) Linki
            </Label>
            <Input
              id="twitterUrl"
              name="twitterUrl"
              placeholder="https://twitter.com/kullaniciadi"
              value={formData.twitterUrl}
              onChange={handleChange}
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="websiteUrl" className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-green-600" /> Web Sitesi
            </Label>
            <Input
              id="websiteUrl"
              name="websiteUrl"
              placeholder="https://web-siteniz.com"
              value={formData.websiteUrl}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" disabled={isLoading} className="min-w-[150px]">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            "Ayarları Kaydet"
          )}
        </Button>
      </div>
    </form>
  );
}