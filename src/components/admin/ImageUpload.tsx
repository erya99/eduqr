"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  // Hydration hatasını önlemek için mounted kontrolü
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    // Cloudinary'den dönen URL'i alıyoruz
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      {/* Eğer resim varsa göster */}
      <div className="mb-4 flex items-center gap-4">
        {value && (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(value)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={value} />
          </div>
        )}
      </div>

      {/* Cloudinary Widget Butonu */}
      <CldUploadWidget 
        onSuccess={onUpload} 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} // .env'den alıyor
      >
        {({ open }) => {
          return (
            <Button
              type="button"
              variant="secondary"
              onClick={() => open()}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Resim Yükle
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}