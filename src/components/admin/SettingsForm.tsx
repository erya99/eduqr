"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Restaurant } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { updateRestaurant } from "@/actions/restaurant-actions";
import { Loader2, Upload, ImageIcon, X } from "lucide-react";

// Renk Paletleri Tanımları
const COLOR_PALETTES = [
  { id: "blue", label: "Okyanus Mavisi", color: "bg-blue-600" },
  { id: "red", label: "Ateş Kırmızı", color: "bg-red-600" },
  { id: "orange", label: "Gün Batımı", color: "bg-orange-600" },
  { id: "green", label: "Doğa Yeşili", color: "bg-green-600" },
  { id: "purple", label: "Asil Mor", color: "bg-purple-600" },
];

interface SettingsFormProps {
  restaurant: Restaurant;
}

export default function SettingsForm({ restaurant }: SettingsFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State tanımları (colorPalette eklendi)
  const [formData, setFormData] = useState({
    name: restaurant.name,
    slug: restaurant.slug,
    logoUrl: restaurant.logoUrl || "",
    coverUrl: restaurant.coverUrl || "",
    instagramUrl: restaurant.instagramUrl || "",
    facebookUrl: restaurant.facebookUrl || "",
    twitterUrl: restaurant.twitterUrl || "",
    websiteUrl: restaurant.websiteUrl || "",
    colorPalette: restaurant.colorPalette || "blue", // 👈 YENİ: Varsayılan mavi
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = (result: any, field: "logoUrl" | "coverUrl") => {
    if (result.info && result.info.secure_url) {
        setFormData(prev => ({ ...prev, [field]: result.info.secure_url }));
    }
  };

  const handleRemoveImage = (field: "logoUrl" | "coverUrl") => {
    setFormData(prev => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(formData.slug)) {
      alert("Hata: Restoran bağlantısı sadece küçük harf, rakam ve tire (-) içerebilir.");
      setIsLoading(false);
      return;
    }

    // formData içinde colorPalette olduğu için updateRestaurant fonksiyonuna otomatik gidecek
    // (Ancak src/actions/restaurant-actions.ts dosyasını güncellediğinizden emin olun)
    const result = await updateRestaurant(restaurant.id, formData);

    if (result.success) {
      alert("Başarılı: Ayarlar kaydedildi.");
      router.refresh();
    } else {
      alert(`Hata: ${result.error}`);
    }

    setIsLoading(false);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors"
    >
      
      {/* --- Temel Bilgiler --- */}
      <div className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Temel Bilgiler</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Restoran Adı</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="dark:bg-gray-900 dark:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <Label>Restoran Bağlantısı (Link)</Label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-300 p-2 rounded-l-md border border-r-0 dark:border-gray-600">/</span>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="rounded-l-none dark:bg-gray-900 dark:border-gray-600"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Örn: kahve-dunyasi</p>
          </div>
        </div>
      </div>

      {/* --- TEMA RENGİ SEÇİMİ (YENİ BÖLÜM) --- */}
      <div className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Menü Teması</h3>
        <div className="grid gap-2">
            <Label>Ana Renk Seçimi</Label>
            <div className="flex flex-wrap gap-3">
            {COLOR_PALETTES.map((palette) => (
                <button
                key={palette.id}
                type="button"
                onClick={() => setFormData({ ...formData, colorPalette: palette.id })}
                className={`
                    flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all
                    ${formData.colorPalette === palette.id 
                    ? "border-gray-900 dark:border-white ring-2 ring-offset-2 ring-gray-300 dark:ring-gray-600" 
                    : "border-transparent bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                `}
                >
                <div className={`w-4 h-4 rounded-full ${palette.color}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{palette.label}</span>
                </button>
            ))}
            </div>
        </div>
      </div>

      {/* --- Görseller --- */}
      <div className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Görseller</h3>
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Logo Yükleme */}
          <div className="space-y-2">
            <Label>Restoran Logosu</Label>
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 shrink-0 group">
                {formData.logoUrl ? (
                  <>
                    <Image src={formData.logoUrl} alt="Logo" fill className="object-cover" />
                    <button 
                        type="button"
                        onClick={() => handleRemoveImage("logoUrl")}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    >
                        <X size={20} />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon /></div>
                )}
              </div>
              
              <div className="flex flex-col gap-2 w-full">
                 <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={(result) => handleUpload(result, "logoUrl")}
                 >
                    {({ open }) => (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="w-full dark:bg-gray-900 dark:hover:bg-gray-700 dark:border-gray-600"
                          onClick={() => open()}
                        >
                          <Upload className="w-4 h-4 mr-2"/> 
                          {formData.logoUrl ? "Logoyu Değiştir" : "Logo Yükle"}
                        </Button>
                    )}
                 </CldUploadWidget>
                 <p className="text-xs text-gray-500 dark:text-gray-400">Kare (1:1) format önerilir.</p>
              </div>
            </div>
          </div>

          {/* Kapak Görseli */}
          <div className="space-y-2">
            <Label>Kapak Görseli</Label>
             <div className="flex flex-col gap-3">
              <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 group">
                {formData.coverUrl ? (
                  <>
                    <Image src={formData.coverUrl} alt="Kapak" fill className="object-cover" />
                    <button 
                        type="button"
                        onClick={() => handleRemoveImage("coverUrl")}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    >
                        <X size={24} />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon className="w-8 h-8" /></div>
                )}
              </div>
              
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result) => handleUpload(result, "coverUrl")}
              >
                {({ open }) => (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="w-full dark:bg-gray-900 dark:hover:bg-gray-700 dark:border-gray-600"
                      onClick={() => open()}
                    >
                      <Upload className="w-4 h-4 mr-2"/> 
                      {formData.coverUrl ? "Kapağı Değiştir" : "Kapak Yükle"}
                    </Button>
                )}
              </CldUploadWidget>
            </div>
          </div>
        </div>
      </div>

      {/* --- Sosyal Medya --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sosyal Medya</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input name="instagramUrl" placeholder="https://instagram.com/..." value={formData.instagramUrl} onChange={handleChange} className="dark:bg-gray-900 dark:border-gray-600"/>
          </div>
          <div className="space-y-2">
            <Label>Facebook</Label>
            <Input name="facebookUrl" placeholder="https://facebook.com/..." value={formData.facebookUrl} onChange={handleChange} className="dark:bg-gray-900 dark:border-gray-600"/>
          </div>
          <div className="space-y-2">
            <Label>Twitter (X)</Label>
            <Input name="twitterUrl" placeholder="https://twitter.com/..." value={formData.twitterUrl} onChange={handleChange} className="dark:bg-gray-900 dark:border-gray-600"/>
          </div>
           <div className="space-y-2">
            <Label>Web Sitesi</Label>
            <Input name="websiteUrl" placeholder="https://siteniz.com" value={formData.websiteUrl} onChange={handleChange} className="dark:bg-gray-900 dark:border-gray-600"/>
          </div>
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 p-4 -mx-6 -mb-6 shadow-t z-10">
        <Button type="submit" disabled={isLoading} className="min-w-[150px]">
          {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Kaydediliyor...</> : "Ayarları Kaydet"}
        </Button>
      </div>
    </form>
  );
}