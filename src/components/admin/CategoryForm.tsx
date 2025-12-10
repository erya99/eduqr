"use client";

import { updateCategory } from "@/actions/category-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2, Image as ImageIcon, X, Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

export default function CategoryForm({ category, onClose }: { category: any, onClose: () => void }) {
  const [imageUrl, setImageUrl] = useState(category.imageUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = (result: any) => {
    if (result.info && result.info.secure_url) {
        setImageUrl(result.info.secure_url);
    }
  };

  return (
    <form 
      action={async (formData) => {
        setIsSubmitting(true);
        if (imageUrl) formData.set("image", imageUrl);
        await updateCategory(formData);
        setIsSubmitting(false);
        onClose(); // Formu kapat
      }} 
      className="grid gap-4 py-4"
    >
      <input type="hidden" name="id" value={category.id} />

      {/* --- KATEGORİ ADI --- */}
      <div className="grid gap-2">
        <Label htmlFor="name" className="dark:text-gray-200">Kategori Adı</Label>
        <Input 
          id="name" 
          name="name" 
          defaultValue={category.name} 
          required 
          className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* --- GÖRSEL YÜKLEME --- */}
      <div className="grid gap-2">
        <Label className="dark:text-gray-200">Kategori Görseli</Label>
        
        <div className="flex flex-col gap-3">
            {imageUrl ? (
                <div className="relative w-full h-40 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 group">
                    <Image src={imageUrl} alt="Kategori" fill className="object-cover" />
                    <button 
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    >
                        <X size={32} />
                    </button>
                </div>
            ) : (
                <div className="w-full h-40 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="w-10 h-10 mb-2" />
                    <span className="text-xs">Görsel Yok</span>
                </div>
            )}

            <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUpload}
            >
                {({ open }) => (
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={() => open()}
                      className="w-full dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {imageUrl ? "Görseli Değiştir" : "Görsel Yükle"}
                    </Button>
                )}
            </CldUploadWidget>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
        {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
        Güncellemeyi Kaydet
      </Button>
    </form>
  );
}