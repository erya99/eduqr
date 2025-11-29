"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/product-actions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductForm from "./ProductForm";
import { useState } from "react";

// categories prop'unu karşılıyoruz
export default function ProductActions({ product, categories }: { product: any, categories: any[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-end gap-2">
      <Sheet open={open} onOpenChange={setOpen} modal={false}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4 text-blue-600" />
          </Button>
        </SheetTrigger>
        
        <SheetContent 
            className="overflow-y-auto"
            onInteractOutside={(e) => e.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle>Ürünü Düzenle</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
             {/* Listeyi Forma iletiyoruz */}
            <ProductForm product={product} categories={categories} />
          </div>
        </SheetContent>
      </Sheet>

      <form action={deleteProduct}>
        <input type="hidden" name="id" value={product.id} />
        <Button variant="outline" size="icon" type="submit">
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </form>
    </div>
  );
}