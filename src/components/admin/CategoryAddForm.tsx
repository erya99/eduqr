"use client";

import { createCategory } from "@/actions/category-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { CldUploadWidget } from "next-cloudinary"; // DİKKAT: CldUploadButton yerine Widget kullanıyoruz
import Image from "next/image";

export default function CategoryAddForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = (result: any) => {
    // Yükleme başarılıysa URL'i al
    if (result.info && result.info.secure_url) {
        setImageUrl(result.info.secure_url);
    }
  };

  return (
    <form 
      action={async (formData) => {
        setIsSubmitting(true);
        // Eğer state'deki imageUrl doluysa form'a ekle (otomatik eklenmeyebilir)
        if (imageUrl) {
            formData.set("image", imageUrl); 
        }
        await createCategory(formData);
        
        // Temizlik
        ref.current?.reset();
        setImageUrl("");
        setIsSubmitting(false);
      }} 
      ref={ref}
      className="space-y-4"
    >
      <div className="flex gap-4 items-end">
        
        {/* --- RESİM YÜKLEME ALANI --- */}
        <div className="flex-shrink-0">
            {imageUrl ? (
                <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                    <Image src={imageUrl} alt="Kategori" fill className="object-cover" />
                    <button 
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-bl shadow-sm hover:bg-red-700 transition"
                    >
                        <X size={12} />
                    </button>
                </div>
            ) : (
                <CldUploadWidget 
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={handleUpload}
                >
                    {({ open }) => {
                        return (
                            <button 
                                type="button"
                                onClick={() => open()}
                                className="w-16 h-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:border-gray-400 transition"
                            >
                                <ImageIcon size={20} />
                                <span className="text-[9px] mt-1">Görsel</span>
                            </button>
                        );
                    }}
                </CldUploadWidget>
            )}
            
            {/* Server Action'ın okuması için Gizli Input */}
            <input type="hidden" name="image" value={imageUrl} />
        </div>

        {/* --- İSİM ALANI --- */}
        <div className="grid w-full gap-1.5">
            <Input 
                type="text" 
                name="name" 
                placeholder="Kategori Adı (Örn: Tatlılar)" 
                required 
                className="h-16 text-lg"
            />
        </div>
        
        {/* --- KAYDET BUTONU --- */}
        <Button type="submit" disabled={isSubmitting} className="h-16 px-6">
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Plus className="mr-2 h-5 w-5" />}
            Ekle
        </Button>
      </div>
    </form>
  );
}