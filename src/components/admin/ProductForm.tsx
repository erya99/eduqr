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
import ImageUpload from "./ImageUpload";
import { useState } from "react";

// Form artık dışarıdan "categories" listesini de bekliyor
export default function ProductForm({ 
  product, 
  categories = [] // Varsayılan boş dizi
}: { 
  product?: any, 
  categories?: any[] 
}) {
  const action = product ? updateProduct : createProduct;
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");

  return (
    <form action={action} className="grid gap-4 py-4">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid gap-2">
        <Label htmlFor="name">Ürün Adı</Label>
        <Input 
          id="name" 
          name="name" 
          defaultValue={product?.name} 
          placeholder="Örn: Cheese Burger" 
          required 
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="price">Fiyat (₺)</Label>
        <Input 
          id="price" 
          name="price" 
          type="number" 
          step="0.01" 
          defaultValue={product ? Number(product.price) : ""}
          placeholder="0.00" 
          required 
        />
      </div>

      {/* --- DİNAMİK KATEGORİ SEÇİMİ --- */}
      <div className="grid gap-2">
        <Label htmlFor="category">Kategori</Label>
        <Select name="category" required defaultValue={product?.category?.name || product?.categoryName}>
          <SelectTrigger>
            <SelectValue placeholder="Kategori seçin" />
          </SelectTrigger>
          <SelectContent>
            {categories.length === 0 ? (
              <div className="p-2 text-sm text-gray-500 text-center">
                Önce kategori ekleyin
              </div>
            ) : (
              categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      {/* -------------------------------- */}

      <div className="grid gap-2">
        <Label htmlFor="description">Açıklama</Label>
        <Textarea 
          id="description" 
          name="description" 
          defaultValue={product?.description || ""}
          placeholder="Ürün içeriği hakkında bilgi..." 
        />
      </div>

      <div className="grid gap-2">
        <Label>Ürün Resmi</Label>
        <ImageUpload 
            value={imageUrl} 
            onChange={(url) => setImageUrl(url)}
            onRemove={() => setImageUrl("")}
        />
        <input type="hidden" name="image" value={imageUrl} />
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        {product ? "Güncellemeyi Kaydet" : "Veritabanına Kaydet"}
      </Button>
    </form>
  );
}