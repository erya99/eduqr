"use client";

import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryActions from "@/components/admin/CategoryActions";
import { GripVertical } from "lucide-react";
import Image from "next/image";
import { reorderCategories } from "@/actions/category-actions";
import { toast } from "sonner"; // Bildirim için (opsiyonel)

interface SortableCategoryListProps {
  initialCategories: (Category & { _count: { products: number } })[];
}

export default function SortableCategoryList({ initialCategories }: SortableCategoryListProps) {
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Optimistic Update (Hemen arayüzde göster)
    setCategories(items);

    // Arka planda sunucuyu güncelle
    const bulkUpdateData = items.map((category, index) => ({
      id: category.id,
      order: index + 1,
    }));

    try {
      await reorderCategories(bulkUpdateData);
      toast.success("Sıralama güncellendi");
    } catch (error) {
      toast.error("Sıralama kaydedilemedi");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="categories" direction="horizontal"> 
        {/* Mobilde alt alta olması için direction'ı responsive ayarlamak zor olabilir, 
            genelde grid yerine flex-wrap kullanılır ama şimdilik grid yapınızı korumaya çalışalım */}
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {categories.map((category, index) => (
              <Draggable key={category.id} draggableId={category.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="h-full" // Kartın yüksekliğini koruması için
                  >
                    <Card className="flex flex-col justify-between overflow-hidden group h-full relative">
                      
                      {/* Sürükleme Tutacağı */}
                      <div 
                        {...provided.dragHandleProps}
                        className="absolute top-2 left-2 z-10 p-1 bg-white/80 rounded-md cursor-grab active:cursor-grabbing hover:bg-white text-gray-500"
                      >
                        <GripVertical size={20} />
                      </div>

                      {/* Görsel */}
                      {category.imageUrl && (
                        <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-800">
                          <Image src={category.imageUrl} alt={category.name} fill className="object-cover" />
                        </div>
                      )}

                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium pl-2">{category.name}</CardTitle>
                        <CategoryActions category={category} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground">
                          {category._count.products} Ürün var
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}