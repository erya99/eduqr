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
import { toast } from "sonner";

// Alerjen Seçenekleri Sabiti
const ALLERGEN_OPTIONS = [
  { id: "gluten", label: "Gluten", icon: "🌾" },
  { id: "dairy", label: "Süt/Laktoz", icon: "🥛" },
  { id: "egg", label: "Yumurta", icon: "🥚" },
  { id: "nuts", label: "Kuruyemiş", icon: "🥜" },
  { id: "spicy", label: "Acı", icon: "🌶️" },
  { id: "vegan", label: "Vegan", icon: "🌱" },
  { id: "sea", label: "Deniz Ürünü", icon: "🐟" },
];

export default function ProductForm({ product, categories = [] }: { product?: any, categories?: any[] }) {
  const action = product ? updateProduct : createProduct;
  
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [variants, setVariants] = useState<{name: string, price: string}[]>(
    product?.variants?.map((v: any) => ({ name: v.name, price: v.price.toString() })) || []
  );
  
  // --- Durum için State ---
  const [isAvailable, setIsAvailable] = useState(product?.isAvailable === false ? "false" : "true");
  
  // --- Alerjenler için State ---
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(product?.allergens || []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- VARYASYON FONKSİYONLARI ---
  const addVariant = () => setVariants([...variants, { name: "", price: "" }]);
  const removeVariant = (index: number) => setVariants(variants.filter((_, i) => i !== index));
  const updateVariant = (index: number, field: "name" | "price", value: string) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  // --- ALERJEN SEÇİM FONKSİYONU ---
  const toggleAllergen = (id: string) => {
    if (selectedAllergens.includes(id)) {
      setSelectedAllergens(selectedAllergens.filter(a => a !== id));
    } else {
      setSelectedAllergens([...selectedAllergens, id]);
    }
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
            
            // formData inputlardan gelen verileri zaten içeriyor (name, price, priceLabel vb.)
            
            await action(formData);
            toast.success(product ? "Ürün güncellendi" : "Ürün oluşturuldu");
        } catch (error) {
            console.error("Form Hatası:", error);
            toast.error("Bir hata oluştu.");
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
          required 
          className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* --- FİYAT VE PORSİYON ADI (GÜNCELLENEN KISIM) --- */}
      <div className="grid grid-cols-2 gap-4">
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

          <div className="grid gap-2">
            <Label htmlFor="priceLabel" className="dark:text-gray-200">Porsiyon Adı</Label>
            <Input
              id="priceLabel"
              name="priceLabel"
              type="text"
              placeholder="Örn: Çeyrek Ekmek"
              defaultValue={product?.priceLabel || ""}
              className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Boş bırakılırsa "Standart" yazar.</p>
          </div>
      </div>

      {/* --- KATEGORİ --- */}
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

      {/* --- ÜRÜN DURUMU --- */}
      <div className="grid gap-2">
        <Label className="dark:text-gray-200">Ürün Durumu</Label>
        
        {/* State'i hidden input ile forma gömüyoruz */}
        <input type="hidden" name="isAvailable" value={isAvailable} />
        
        <Select 
            value={isAvailable} 
            onValueChange={setIsAvailable}
        >
          <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700 dark:text-white">
            <SelectValue placeholder="Durum seçin" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
            <SelectItem value="true" className="dark:text-white dark:focus:bg-gray-800">Aktif (Satışta)</SelectItem>
            <SelectItem value="false" className="dark:text-white dark:focus:bg-gray-800">Pasif (Menüde Gizli)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- ALERJEN SEÇİMİ --- */}
      <div className="grid gap-2 pt-2">
        <Label className="dark:text-gray-200">Alerjenler & Etiketler</Label>
        <div className="flex flex-wrap gap-2">
          {ALLERGEN_OPTIONS.map((item) => {
            const isSelected = selectedAllergens.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleAllergen(item.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-all ${
                  isSelected 
                    ? "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-500" 
                    : "bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
        <input type="hidden" name="allergens" value={JSON.stringify(selectedAllergens)} />
      </div>

      {/* --- VARYASYONLAR --- */}
      <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700 space-y-3 mt-2">
        <div className="flex justify-between items-center">
            <Label className="font-semibold dark:text-gray-200">Diğer Seçenekler (Opsiyonel)</Label>
            <Button type="button" size="sm" variant="outline" onClick={addVariant} className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                <Plus className="w-4 h-4 mr-1" /> Ekle
            </Button>
        </div>
        {variants.length === 0 && (
            <p className="text-xs text-gray-500 italic">Ekstra porsiyon veya seçenek eklemek için 'Ekle' butonuna basın.</p>
        )}
        {variants.map((variant, index) => (
            <div key={index} className="flex gap-2 items-end">
                <Input 
                    placeholder="Örn: 1.5 Porsiyon / Yarım Ekmek" 
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