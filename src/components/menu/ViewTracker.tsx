"use client";

import { useEffect, useRef } from "react";
import { incrementRestaurantView } from "@/actions/stat-actions";

export default function ViewTracker({ restaurantId }: { restaurantId: string }) {
  // Strict mode'da (Localhost) 2 kere saymasını engellemek için useRef kullanıyoruz
  const hasCounted = useRef(false);

  useEffect(() => {
    if (!hasCounted.current) {
      incrementRestaurantView(restaurantId);
      hasCounted.current = true;
    }
  }, [restaurantId]);

  return null; // Görünmez bir bileşen
}