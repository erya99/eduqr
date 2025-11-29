"use client";

import { createCategory } from "@/actions/category-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRef } from "react";

export default function CategoryAddForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form 
      action={async (formData) => {
        await createCategory(formData);
        ref.current?.reset(); // Eklendikten sonra kutuyu temizle
      }} 
      ref={ref}
      className="flex gap-2 items-end"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input 
            type="text" 
            name="name" 
            placeholder="Yeni Kategori Adı (Örn: Tatlılar)" 
            required 
        />
      </div>
      <Button type="submit">
        <Plus className="mr-2 h-4 w-4" /> Ekle
      </Button>
    </form>
  );
}