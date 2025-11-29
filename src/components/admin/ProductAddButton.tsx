"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductForm from "./ProductForm";

// categories prop'unu karşılıyoruz
export default function ProductAddButton({ categories }: { categories: any[] }) {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Yeni Ürün Ekle
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        className="overflow-y-auto" 
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Yeni Ürün Ekle</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {/* Listeyi Forma iletiyoruz */}
          <ProductForm categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  );
}