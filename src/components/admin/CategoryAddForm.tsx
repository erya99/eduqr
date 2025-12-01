"use client";

import { createCategory } from "@/actions/category-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Image as ImageIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { CldUploadButton } from "next-cloudinary"; // Cloudinary
import Image from "next/image";

export default function CategoryAddForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = (result: any) => {
    setImageUrl(result.info.secure_url);
  };

  return (
    <form 
      action={async (formData) => {
        await createCategory(formData);
        ref.current?.reset();
        setImageUrl(""); // Form gönderilince resmi sıfırla
      }} 
      ref={ref}
      className="space-y-4"
    >
      <div className="flex gap-4 items-end">
        {/* Resim Yükleme Alanı */}
        <div className="flex-shrink-0">
            {imageUrl ? (
                <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                    <Image src={imageUrl} alt="Kategori" fill className="object-cover" />
                    <button 
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl"
                    >
                        <X size={12} />
                    </button>
                </div>
            ) : (
                <CldUploadButton
                    onUpload={handleUpload}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    className="w-16 h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-200 transition"
                >
                    <ImageIcon className="text-gray-400" />
                </CldUploadButton>
            )}
            {/* Gizli input ile URL'i server action'a yolluyoruz */}
            <input type="hidden" name="image" value={imageUrl} />
        </div>

        <div className="grid w-full gap-1.5">
            <Input 
                type="text" 
                name="name" 
                placeholder="Kategori Adı (Örn: Tatlılar)" 
                required 
            />
        </div>
        
        <Button type="submit">
            <Plus className="mr-2 h-4 w-4" /> Ekle
        </Button>
      </div>
    </form>
  );
}