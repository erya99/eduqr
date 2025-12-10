"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCategory } from "@/actions/category-actions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

export default function CategoryActions({ category }: { category: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-1">
      {/* --- DÜZENLEME BUTONU (SHEET) --- */}
      <Sheet open={open} onOpenChange={setOpen} modal={false}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <Pencil className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        
        <SheetContent 
            className="overflow-y-auto"
            onInteractOutside={(e) => e.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle>Kategoriyi Düzenle</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <CategoryForm category={category} onClose={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* --- SİLME BUTONU --- */}
      <form action={deleteCategory}>
        <input type="hidden" name="id" value={category.id} />
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
            <Trash2 className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}