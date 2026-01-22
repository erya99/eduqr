"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Restaurant } from "@prisma/client"; // Prisma client generate edildikten sonra tip güncellenir
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { updateRestaurant } from "@/actions/restaurant-actions";
import { Loader2, Upload, ImageIcon, X, LayoutGrid, List, Smartphone } from "lucide-react";

// Renk Paletleri Tanımları
const COLOR_PALETTES = [
  { id: "blue", label: "Okyanus Mavisi", color: "bg-blue-600" },
  { id: "red", label: "Ateş Kırmızı", color: "bg-red-600" },
  { id: "orange", label: "Gün Batımı", color: "bg-orange-600" },
  { id: "green", label: "Doğa Yeşili", color: "bg-green-600" },
  { id: "purple", label: "Asil Mor", color: "bg-purple-600" },
  { id: "black", label: "Gri", color: "bg-neutral-900 border border-gray-600" },
  { id: "monochrome", label: "Klasik Siyah (Renksiz)", color: "bg-white border-2 border-black" },
];

interface SettingsFormProps {
  restaurant: Restaurant;
}

export default function SettingsForm({ restaurant }: SettingsFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State tanımları
  const [formData, setFormData] = useState({
    name: restaurant.name,
    slug: restaurant.slug,
    logoUrl: restaurant.logoUrl || "",
    coverUrl: restaurant.coverUrl || "",
    landingImageUrl: (restaurant as any).landingImageUrl || "", // 👈 YENİ: Dikey Görsel
    instagramUrl: restaurant.instagramUrl || "",
    facebookUrl: restaurant.facebookUrl || "",
    twitterUrl: restaurant.twitterUrl || "",
    websiteUrl: restaurant.websiteUrl || "",
    googlePlaceUrl: restaurant.googlePlaceUrl || "",
    colorPalette: restaurant.colorPalette || "blue",
    template: restaurant.template || "classic",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = (result: any, field: "logoUrl" | "coverUrl" | "landingImageUrl") => {
    if (result.info && result.info.secure_url) {
        setFormData(prev => ({ ...prev, [field]: result.info.secure_url }));
    }
  };

  const handleRemoveImage = (field: "logoUrl" | "coverUrl" | "landingImageUrl") => {
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

      {/* --- TEMA RENGİ SEÇİMİ --- */}
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

      {/* --- MENÜ TASARIMI SEÇİMİ --- */}
      <div className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Menü Tasarımı</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Klasik Tasarım Seçeneği */}
          <div 
            onClick={() => setFormData({ ...formData, template: 'classic' })}
            className={`
              relative cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-3 text-center transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50
              ${formData.template === 'classic' || !formData.template
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-500' 
                : 'border-gray-200 dark:border-gray-700'
              }
            `}
          >
            <div className={`
              h-12 w-12 rounded-lg flex items-center justify-center
              ${formData.template === 'classic' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}
            `}>
              <LayoutGrid size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Klasik</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Görsel ağırlıklı kartlar.</p>
            </div>
            {formData.template === 'classic' && (
              <div className="absolute top-3 right-3 h-2.5 w-2.5 bg-blue-600 rounded-full animate-pulse" />
            )}
          </div>

          {/* Modern (Görselsiz) Tasarım Seçeneği */}
          <div 
            onClick={() => setFormData({ ...formData, template: 'modern' })}
            className={`
              relative cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-3 text-center transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50
              ${formData.template === 'modern' 
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-500' 
                : 'border-gray-200 dark:border-gray-700'
              }
            `}
          >
            <div className={`
              h-12 w-12 rounded-lg flex items-center justify-center
              ${formData.template === 'modern' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}
            `}>
              <List size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Modern</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sade liste görünümü.</p>
            </div>
            {formData.template === 'modern' && (
              <div className="absolute top-3 right-3 h-2.5 w-2.5 bg-blue-600 rounded-full animate-pulse" />
            )}
          </div>

          {/* 👈 YENİ: Yeni Nesil (Landing Page) Tasarımı */}
          <div 
            onClick={() => setFormData({ ...formData, template: 'new-gen' })}
            className={`
              relative cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-3 text-center transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50
              ${formData.template === 'new-gen' 
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-500' 
                : 'border-gray-200 dark:border-gray-700'
              }
            `}
          >
            <div className={`
              h-12 w-12 rounded-lg flex items-center justify-center
              ${formData.template === 'new-gen' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}
            `}>
              <Smartphone size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Yeni Nesil</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Açılış ekranlı (Landing).</p>
            </div>
            {formData.template === 'new-gen' && (
              <div className="absolute top-3 right-3 h-2.5 w-2.5 bg-blue-600 rounded-full animate-pulse" />
            )}
          </div>

        </div>
      </div>

      {/* --- Görseller --- */}
      <div className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Görseller</h3>
        
        {/* Görsel Grid Yapısı */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {/* 1. Logo Yükleme */}
          <div className="space-y-2">
            <Label>Restoran Logosu</Label>
            <div className="flex flex-col items-center gap-3 border border-gray-100 dark:border-gray-700 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-900/50">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-black shrink-0 group shadow-sm">
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
              
              <div className="w-full">
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
                 <p className="text-xs text-gray-500 text-center mt-1">Kare (1:1)</p>
              </div>
            </div>
          </div>

          {/* 2. Kapak Görseli (Yatay) */}
          <div className="space-y-2">
            <Label>Kapak Görseli (Yatay)</Label>
             <div className="flex flex-col gap-3 border border-gray-100 dark:border-gray-700 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 h-full justify-between">
              <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-black group">
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
              
              <div>
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
                <p className="text-xs text-gray-500 text-center mt-1">Menü üst kısmı için.</p>
              </div>
            </div>
          </div>

          {/* 3. 👈 YENİ: Dikey Açılış Görseli */}
          <div className="space-y-2">
            <Label className={formData.template === 'new-gen' ? "text-blue-600 font-bold" : ""}>
                Dikey Açılış Görseli
                {formData.template === 'new-gen' && <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">GEREKLİ</span>}
            </Label>
             <div className={`flex flex-col gap-3 border p-4 rounded-lg h-full justify-between ${formData.template === 'new-gen' ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/50'}`}>
              <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-black group">
                {/* Dikey görüntüleme simülasyonu için object-contain veya cover kullanılabilir */}
                {formData.landingImageUrl ? (
                  <>
                    <Image src={formData.landingImageUrl} alt="Landing" fill className="object-cover" />
                    <button 
                        type="button"
                        onClick={() => handleRemoveImage("landingImageUrl")}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    >
                        <X size={24} />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-1">
                      <Smartphone className="w-6 h-6 opacity-50" />
                      <span className="text-[10px]">Dikey (9:16)</span>
                  </div>
                )}
              </div>
              
              <div>
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={(result) => handleUpload(result, "landingImageUrl")}
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
                        {formData.landingImageUrl ? "Görseli Değiştir" : "Görsel Yükle"}
                        </Button>
                    )}
                </CldUploadWidget>
                <p className="text-xs text-gray-500 text-center mt-1">1080x1920 px önerilir.</p>
              </div>
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

        {/* Google Yorum Linki Alanı */}
        <div className="space-y-2 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 rounded-lg mt-4">
            <Label className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            Google Haritalar / Yorum Linki
            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold tracking-wide">ÖNERİLEN</span>
            </Label>
            <Input 
                name="googlePlaceUrl" 
                placeholder="https://g.page/r/..." 
                value={formData.googlePlaceUrl} 
                onChange={handleChange} 
                className="dark:bg-gray-900 dark:border-gray-600 border-blue-200 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Google İşletme profilinizdeki "Yorum iste" butonundan aldığınız kısa linki buraya yapıştırın. Bu link, menünüzde müşterileri Google'da yorum yapmaya teşvik eden şık bir kart olarak görünecektir.
            </p>
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