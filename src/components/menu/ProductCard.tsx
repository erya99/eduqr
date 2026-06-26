"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const ALLERGEN_MAP: Record<string, { label: string; icon: string }> = {
  gluten: { label: "Gluten", icon: "🌾" },
  dairy: { label: "Süt Ürünleri", icon: "🥛" },
  egg: { label: "Yumurta", icon: "🥚" },
  nuts: { label: "Kuruyemiş", icon: "🥜" },
  spicy: { label: "Acı", icon: "🌶️" },
  vegan: { label: "Vegan", icon: "🌱" },
  sea: { label: "Deniz Ürünü", icon: "🐟" },
};

interface CrossSellProduct {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
}

interface ProductCardProps {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  variants?: { name: string; price: number }[];
  allergens?: string[];
  priceLabel?: string | null;
  calories?: number | null;
  crossSellIds?: string[];
  allProducts?: CrossSellProduct[];
}

export default function ProductCard({
  name,
  description,
  price,
  imageUrl,
  variants = [],
  allergens = [],
  priceLabel,
  calories,
  crossSellIds = [],
  allProducts = [],
}: ProductCardProps) {
  const crossSellProducts = allProducts.filter((p) => crossSellIds.includes(p.id));
  const [open, setOpen] = useState(false);
  const hasVariants = variants && variants.length > 0;

  const fmt = (p: number) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(p);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group flex gap-4 p-4
          bg-white/80 dark:bg-gray-900/40 backdrop-blur-md
          rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer
          border border-gray-200/50 dark:border-gray-700/50
          hover:border-[var(--brand-primary)]"
      >
        {/* Görsel */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl">
              🍽️
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight mb-1">
              {name}
            </h3>
            {description && (
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {description}
              </p>
            )}

            {/* Kalori + Alerjen */}
            {(allergens.length > 0 || calories) && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {calories && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 border border-gray-200 dark:border-gray-700">
                    🔥 {calories} kcal
                  </span>
                )}
                {allergens.map((alg) => {
                  const info = ALLERGEN_MAP[alg];
                  if (!info) return null;
                  return (
                    <span
                      key={alg}
                      title={info.label}
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-50 border border-orange-100 text-sm dark:bg-orange-900/20 dark:border-orange-800"
                    >
                      {info.icon}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-[var(--brand-primary)]">
              {hasVariants ? `${fmt(price)}'den Başlayan` : fmt(price)}
            </span>
            <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 hover:bg-[var(--brand-primary)] hover:text-white transition-colors">
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- DETAY DRAWER --- */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm pb-8">
            {/* Ürün Görseli */}
            {imageUrl && (
              <div className="relative w-full h-52 overflow-hidden rounded-t-2xl">
                <Image src={imageUrl} alt={name} fill className="object-cover" />
              </div>
            )}

            <div className="px-4 pt-4">
              <DrawerHeader className="px-0 pt-0">
                <DrawerTitle className="text-2xl font-bold">{name}</DrawerTitle>
              </DrawerHeader>

              {/* Kalori + Alerjenler */}
              {(calories || allergens.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {calories && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
                      🔥 {calories} kcal
                    </span>
                  )}
                  {allergens.map((alg) => {
                    const info = ALLERGEN_MAP[alg];
                    if (!info) return null;
                    return (
                      <span
                        key={alg}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-sm text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                      >
                        {info.icon} {info.label}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Açıklama */}
              {description && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {description}
                </p>
              )}

              {/* Fiyat / Varyasyonlar */}
              <div className="space-y-2 mt-2">
                {!hasVariants ? (
                  <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <span className="font-medium">{priceLabel || "Standart"}</span>
                    <span className="font-bold text-[var(--brand-primary)] text-lg">
                      {fmt(price)}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <span className="font-medium">{priceLabel || "Standart"}</span>
                      <span className="font-bold text-[var(--brand-primary)]">
                        {fmt(price)}
                      </span>
                    </div>
                    {variants.map((variant, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                      >
                        <span className="font-medium">{variant.name}</span>
                        <span className="font-bold text-[var(--brand-primary)]">
                          {fmt(Number(variant.price))}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Çapraz Satış */}
              {crossSellProducts.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Bununla İyi Gider
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {crossSellProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex-shrink-0 w-24 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                      >
                        {p.imageUrl ? (
                          <div className="relative w-full h-20">
                            <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-20 flex items-center justify-center text-2xl bg-gray-100 dark:bg-gray-700">
                            🍽️
                          </div>
                        )}
                        <div className="p-1.5">
                          <p className="text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{p.name}</p>
                          <p className="text-xs text-[var(--brand-primary)] font-bold">
                            {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(p.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setOpen(false)}
                className="w-full mt-6 h-12 rounded-xl bg-[var(--brand-primary)] text-white font-bold text-base hover:opacity-90 transition-opacity"
              >
                Kapat
              </button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
