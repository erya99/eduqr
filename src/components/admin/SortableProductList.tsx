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

  // Veritabanından yeni veri geldiğinde state'i güncelle
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // 1. Arayüzü hemen güncelle (Hızlı hissettirir)
    setProducts(items);

    // 2. Arka planda sunucuya kaydet
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
              <TableHead className="w-[50px]"></TableHead> {/* Tutacak için boşluk */}
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
                        {/* --- SÜRÜKLEME TUTACAĞI BURADA --- */}
                        <TableCell>
                          <div 
                            {...provided.dragHandleProps} 
                            className="cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded w-fit"
                          >
                            <GripVertical className="h-5 w-5 text-gray-400" />
                          </div>
                        </TableCell>
                        {/* ---------------------------------- */}

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
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            Aktif
                          </span>
                        </TableCell>
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