export interface FilterableProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  allergens?: string[];
  calories?: number | null;
  categoryName?: string;
  priceLabel?: string | null;
}

export interface FilterResult {
  products: FilterableProduct[];
  message: string;
}

const ALLERGEN_KEYWORDS: Record<string, { allergenId: string; exclude: boolean }> = {
  "glutensiz": { allergenId: "gluten", exclude: true },
  "gluten yok": { allergenId: "gluten", exclude: true },
  "gluten içermez": { allergenId: "gluten", exclude: true },
  "sütsüz": { allergenId: "dairy", exclude: true },
  "laktozsuz": { allergenId: "dairy", exclude: true },
  "vegan": { allergenId: "vegan", exclude: false },
  "vejetaryen": { allergenId: "vegan", exclude: false },
  "acısız": { allergenId: "spicy", exclude: true },
  "acı değil": { allergenId: "spicy", exclude: true },
  "acı yok": { allergenId: "spicy", exclude: true },
  "acılı": { allergenId: "spicy", exclude: false },
  "yumurtasız": { allergenId: "egg", exclude: true },
  "deniz ürünü": { allergenId: "sea", exclude: false },
  "balık": { allergenId: "sea", exclude: false },
  "fındıksız": { allergenId: "nuts", exclude: true },
  "kuruyemişsiz": { allergenId: "nuts", exclude: true },
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ıİ]/g, "i")
    .replace(/[ğĞ]/g, "g")
    .replace(/[üÜ]/g, "u")
    .replace(/[şŞ]/g, "s")
    .replace(/[öÖ]/g, "o")
    .replace(/[çÇ]/g, "c")
    .trim();
}

export function filterMenu(query: string, products: FilterableProduct[]): FilterResult {
  const q = normalize(query);

  // --- Fiyat aralığı ---
  const priceUnderMatch = q.match(/(\d+)\s*(tl|lira)?\s*(alt[iı]|alt|ucuz|den ucuz|'den ucuz)/);
  const priceOverMatch = q.match(/(\d+)\s*(tl|lira)?\s*(üst[uü]|üstü|fazla|üzer[i]?nde|pahal[iı])/);
  const priceBetweenMatch = q.match(/(\d+)\s*[-–]\s*(\d+)\s*(tl|lira)?/);

  if (priceBetweenMatch) {
    const min = parseInt(priceBetweenMatch[1]);
    const max = parseInt(priceBetweenMatch[2]);
    const filtered = products.filter((p) => p.price >= min && p.price <= max);
    return {
      products: filtered,
      message: filtered.length > 0
        ? `${min}₺ ile ${max}₺ arasında ${filtered.length} ürün buldum:`
        : `${min}₺ ile ${max}₺ arasında ürün bulunamadı.`,
    };
  }

  if (priceUnderMatch) {
    const limit = parseInt(priceUnderMatch[1]);
    const filtered = products.filter((p) => p.price <= limit);
    return {
      products: filtered,
      message: filtered.length > 0
        ? `${limit}₺ ve altında ${filtered.length} ürün var:`
        : `${limit}₺ altında ürün bulunamadı.`,
    };
  }

  if (priceOverMatch) {
    const limit = parseInt(priceOverMatch[1]);
    const filtered = products.filter((p) => p.price >= limit);
    return {
      products: filtered,
      message: filtered.length > 0
        ? `${limit}₺ ve üzerinde ${filtered.length} ürün var:`
        : `${limit}₺ üzerinde ürün bulunamadı.`,
    };
  }

  // --- En ucuz / en pahalı ---
  if (q.includes("en ucuz") || q.includes("en ekonomik") || q.includes("en az")) {
    const sorted = [...products].sort((a, b) => a.price - b.price).slice(0, 5);
    return { products: sorted, message: "En uygun fiyatlı ürünler:" };
  }

  if (q.includes("en pahali") || q.includes("en pahalı") || q.includes("en luks") || q.includes("en lüks")) {
    const sorted = [...products].sort((a, b) => b.price - a.price).slice(0, 5);
    return { products: sorted, message: "En pahalı ürünler:" };
  }

  // --- Kalori ---
  const calorieLowMatch = q.match(/(\d+)\s*(kalori|kcal)?\s*(alt[iı]|az|dusuk|düşük)/);
  if (calorieLowMatch || q.includes("dusuk kalori") || q.includes("düşük kalori") || q.includes("az kalori") || q.includes("hafif")) {
    const limit = calorieLowMatch ? parseInt(calorieLowMatch[1]) : 300;
    const filtered = products.filter((p) => p.calories && p.calories <= limit);
    return {
      products: filtered,
      message: filtered.length > 0
        ? `${limit} kcal altında ${filtered.length} ürün buldum:`
        : "Kalori bilgisi olan düşük kalorili ürün bulunamadı.",
    };
  }

  // --- Alerjen filtresi ---
  for (const [keyword, rule] of Object.entries(ALLERGEN_KEYWORDS)) {
    if (q.includes(normalize(keyword))) {
      const filtered = rule.exclude
        ? products.filter((p) => !p.allergens?.includes(rule.allergenId))
        : products.filter((p) => p.allergens?.includes(rule.allergenId));

      const label = rule.exclude ? `${keyword} ürünler` : `${keyword} ürünler`;
      return {
        products: filtered,
        message: filtered.length > 0
          ? `${filtered.length} tane ${label} var:`
          : `${label} bulunamadı.`,
      };
    }
  }

  // --- İsim / açıklama arama ---
  const qNorm = normalize(q);
  const filtered = products.filter((p) => {
    const name = normalize(p.name);
    const desc = normalize(p.description || "");
    const cat = normalize(p.categoryName || "");
    return name.includes(qNorm) || desc.includes(qNorm) || cat.includes(qNorm);
  });

  if (filtered.length > 0) {
    return {
      products: filtered,
      message: `"${query}" için ${filtered.length} sonuç buldum:`,
    };
  }

  return {
    products: [],
    message: "Aradığınızı bulamadım. Farklı bir kelimeyle deneyin — örneğin: \"glutensiz\", \"50 TL altı\", \"vegan\", \"tavuk\"",
  };
}
