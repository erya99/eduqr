"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";
import ProductActions from "@/components/admin/ProductActions";
import { reorderProducts } from "@/actions/product-actions";
import { toast } from "sonner";

interface SortableProductListProps {
  products: any[];
  categories: any[];
}

export default function SortableProductList({ products: initialProducts, categories }: SortableProductListProps) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts(items);

    const bulkUpdateData = items.map((product, index) => ({
      id: product.id,
      order: index + 1,
    }));

    try {
      await reorderProducts(bulkUpdateData);
      toast.success("Sıralama güncellendi");
    } catch (error) {
      toast.error("Sıralama kaydedilemedi");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Ürün Adı</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Fiyat</TableHead>
              <TableHead>Varyasyon</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          
          <Droppable droppableId="products-list">
            {(provided) => (
              <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      Henüz hiç ürün eklenmemiş.
                    </TableCell>
                  </TableRow>
                )}
                
                {products.map((product, index) => (
                  <Draggable key={product.id} draggableId={product.id} index={index}>
                    {(provided) => (
                      <TableRow 
                        ref={provided.innerRef} 
                        {...provided.draggableProps}
                        className="bg-white dark:bg-gray-800"
                      >
                        <TableCell>
                          <div 
                            {...provided.dragHandleProps} 
                            className="cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded w-fit"
                          >
                            <GripVertical className="h-5 w-5 text-gray-400" />
                          </div>
                        </TableCell>

                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category.name}</TableCell>
                        <TableCell>{product.price} ₺</TableCell>
                        <TableCell>
                            {product.variants.length > 0 ? (
                                <Badge variant="secondary" className="text-xs">
                                    {product.variants.length} Seçenek
                                </Badge>
                            ) : (
                                <span className="text-xs text-gray-400">-</span>
                            )}
                        </TableCell>
                        
                        {/* --- DÜZELTME BURADA: Dinamik Badge --- */}
                        <TableCell>
                          {product.isAvailable ? (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                              Aktif
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
                              Pasif
                            </span>
                          )}
                        </TableCell>
                        {/* -------------------------------------- */}

                        <TableCell className="text-right">
                          <ProductActions product={product} categories={categories} />
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </div>
    </DragDropContext>
  );
}