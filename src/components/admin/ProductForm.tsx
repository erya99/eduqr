"use client";

import { createProduct, updateProduct } from "@/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function ProductForm({ product, categories = [] }: { product?: any, categories?: any[] }) {
  const action = product ? updateProduct : createProduct;
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  
  // Varyasyon State'i
  const [variants, setVariants] = useState<{name: string, price: string}[]>(
    product?.variants?.map((v: any) => ({ name: v.name, price: v.price.toString() })) || []
  );

  const addVariant = () => {
    setVariants([...variants, { name: "", price: "" }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: "name" | "price", value: string) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  return (
    <form action={action} className="grid gap-4 py-4">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid gap-2">
        <Label>Ürün Adı</Label>
        <Input name="name" defaultValue={product?.name} required />
      </div>

      <div className="grid gap-2">
        <Label>Varsayılan Fiyat (₺)</Label>
        <Input name="price" type="number" step="0.01" defaultValue={product ? Number(product.price) : ""} required />
        <p className="text-xs text-gray-500">Varyasyon yoksa bu fiyat geçerlidir.</p>
      </div>

      {/* --- VARYASYON YÖNETİMİ --- */}
      <div className="border p-4 rounded-lg bg-gray-50 space-y-3">
        <div className="flex justify-between items-center">
            <Label className="font-semibold">Porsiyon / Seçenekler (İsteğe Bağlı)</Label>
            <Button type="button" size="sm" variant="outline" onClick={addVariant}>
                <Plus className="w-4 h-4 mr-1" /> Ekle
            </Button>
        </div>
        
        {variants.map((variant, index) => (
            <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                    <Input 
                        placeholder="Örn: 1.5 Porsiyon" 
                        value={variant.name} 
                        onChange={(e) => updateVariant(index, "name", e.target.value)}
                        required
                    />
                </div>
                <div className="w-24">
                    <Input 
                        type="number" 
                        placeholder="Fiyat" 
                        value={variant.price} 
                        onChange={(e) => updateVariant(index, "price", e.target.value)}
                        required
                    />
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(index)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>
        ))}
        {/* Varyasyonları JSON string olarak gizli gönderiyoruz */}
        <input type="hidden" name="variants" value={JSON.stringify(variants)} />
      </div>
      {/* --------------------------- */}

      {!product && (
        <div className="grid gap-2">
          <Label>Kategori</Label>
          <Select name="category" required defaultValue={product?.category?.name}>
            <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid gap-2">
        <Label>Açıklama</Label>
        <Textarea name="description" defaultValue={product?.description || ""} />
      </div>

      <div className="grid gap-2">
        <Label>Resim</Label>
        <ImageUpload value={imageUrl} onChange={setImageUrl} onRemove={() => setImageUrl("")} />
        <input type="hidden" name="image" value={imageUrl} />
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Kaydet</Button>
    </form>
  );
}