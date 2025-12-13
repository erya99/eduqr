"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AutoPrint() {
  const searchParams = useSearchParams();
  const shouldPrint = searchParams.get("print") === "true";

  useEffect(() => {
    if (shouldPrint) {
      // Görsellerin yüklenmesi için kısa bir süre bekle
      const timer = setTimeout(() => {
        window.print();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [shouldPrint]);

  return null; // Görünür bir şey render etmez
}