"use client";

import { createProduct, updateProduct } from "@/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Plus, Trash2, X, Image as ImageIcon, Loader2, Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { toast } from "sonner"; // Bildirim için

export default function ProductForm({ product, categories = [] }: { product?: any, categories?: any[] }) {
  // Hangi fonksiyonun çalışacağını belirle
  const action = product ? updateProduct : createProduct;
  
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [variants, setVariants] = useState<{name: string, price: string}[]>(
    product?.variants?.map((v: any) => ({ name: v.name, price: v.price.toString() })) || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- VARYASYON FONKSİYONLARI ---
  const addVariant = () => setVariants([...variants, { name: "", price: "" }]);
  const removeVariant = (index: number) => setVariants(variants.filter((_, i) => i !== index));
  const updateVariant = (index: number, field: "name" | "price", value: string) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  // --- RESİM YÜKLEME ---
  const handleUpload = (result: any) => {
    if (result.info && result.info.secure_url) {
        setImageUrl(result.info.secure_url);
    }
  };

  return (
    <form 
      action={async (formData) => {
        setIsSubmitting(true);
        try {
            // Manuel state'leri forma ekle
            if (imageUrl) formData.set("image", imageUrl);
            if (variants.length > 0) formData.set("variants", JSON.stringify(variants));
            
            // Server Action'ı çağır
            await action(formData);
            
            toast.success(product ? "Ürün güncellendi" : "Ürün oluşturuldu");
            
            // Eğer yeni ürün ekleniyorsa formu temizlemek isteyebilirsiniz (opsiyonel)
            
        } catch (error) {
            console.error("Form Hatası:", error);
            toast.error("Bir hata oluştu. Lütfen tüm alanları kontrol edin.");
        } finally {
            setIsSubmitting(false);
        }
      }} 
      className="grid gap-4 py-4"
    >
      {product && <input type="hidden" name="id" value={product.id} />}

      {/* --- ÜRÜN ADI --- */}
      <div className="grid gap-2">
        <Label htmlFor="name" className="dark:text-gray-200">Ürün Adı</Label>
        <Input 
          id="name" 
          name="name" 
          defaultValue={product?.name} 
          placeholder="Örn: Cheese Burger" 
          required 
          className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* --- FİYAT --- */}
      <div className="grid gap-2">
        <Label htmlFor="price" className="dark:text-gray-200">Varsayılan Fiyat (₺)</Label>
        <Input 
          id="price" 
          name="price" 
          type="number" 
          step="0.01" 
          defaultValue={product ? Number(product.price) : ""}
          placeholder="0.00" 
          required 
          className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* --- KATEGORİ SEÇİMİ --- */}
      <div className="grid gap-2">
        <Label className="dark:text-gray-200">Kategori</Label>
        <Select name="category" required defaultValue={product?.category?.name}>
          <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700 dark:text-white">
            <SelectValue placeholder="Kategori seçin" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
            {categories.length === 0 ? (
                <div className="p-2 text-sm text-gray-500 text-center">Önce kategori ekleyin</div>
            ) : (
                categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name} className="dark:text-white dark:focus:bg-gray-800">
                      {cat.name}
                  </SelectItem>
                ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* --- ÜRÜN DURUMU (AKTİF/PASİF) --- */}
      <div className="grid gap-2">
        <Label className="dark:text-gray-200">Ürün Durumu</Label>
        <Select name="isAvailable" defaultValue={product?.isAvailable === false ? "false" : "true"}>
          <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700 dark:text-white">
            <SelectValue placeholder="Durum seçin" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
            <SelectItem value="true" className="dark:text-white dark:focus:bg-gray-800">Aktif (Satışta)</SelectItem>
            <SelectItem value="false" className="dark:text-white dark:focus:bg-gray-800">Pasif (Menüde Gizli)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- VARYASYONLAR --- */}
      <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700 space-y-3">
        <div className="flex justify-between items-center">
            <Label className="font-semibold dark:text-gray-200">Porsiyon / Seçenekler</Label>
            <Button type="button" size="sm" variant="outline" onClick={addVariant} className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                <Plus className="w-4 h-4 mr-1" /> Ekle
            </Button>
        </div>
        {variants.map((variant, index) => (
            <div key={index} className="flex gap-2 items-end">
                <Input 
                    placeholder="Örn: 1.5 Porsiyon" 
                    value={variant.name} 
                    onChange={(e) => updateVariant(index, "name", e.target.value)}
                    required
                    className="flex-1 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
                <Input 
                    type="number" 
                    placeholder="Fiyat" 
                    value={variant.price} 
                    onChange={(e) => updateVariant(index, "price", e.target.value)}
                    required
                    className="w-24 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(index)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        ))}
      </div>

      {/* --- AÇIKLAMA --- */}
      <div className="grid gap-2">
        <Label htmlFor="description" className="dark:text-gray-200">Açıklama</Label>
        <Textarea 
          id="description" 
          name="description" 
          defaultValue={product?.description || ""}
          className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* --- RESİM --- */}
      <div className="grid gap-2">
        <Label className="dark:text-gray-200">Ürün Resmi</Label>
        <div className="flex items-center gap-4">
            {imageUrl ? (
                <div className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 group">
                    <Image src={imageUrl} alt="Ürün" fill className="object-cover" />
                    <button type="button" onClick={() => setImageUrl("")} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                        <X size={20} />
                    </button>
                </div>
            ) : (
                <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={handleUpload}>
                    {({ open }) => (
                        <Button type="button" variant="secondary" onClick={() => open()} className="dark:bg-gray-800 dark:text-white">
                          <Upload className="w-4 h-4 mr-2" /> Resim Yükle
                        </Button>
                    )}
                </CldUploadWidget>
            )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
        {product ? "Güncellemeyi Kaydet" : "Ürünü Oluştur"}
      </Button>
    </form>
  );
}