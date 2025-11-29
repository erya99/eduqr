// src/lib/mock-data.ts

export const mockRestaurantData = {
  name: "Kadıköy Burger Evi",
  slug: "kadikoy-burger",
  logoUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
  coverUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&h=400&fit=crop",
  categories: [
    {
      id: "cat_1",
      name: "Popüler Menüler",
      products: [
        {
          id: "prod_1",
          name: "Texas Smokehouse Burger",
          description: "180gr dana köfte, tütsülenmiş dana bacon, cheddar peyniri, karamelize soğan ve özel BBQ sos.",
          price: 320,
          imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=400&fit=crop"
        },
        {
          id: "prod_2",
          name: "Truffle Mushroom Burger",
          description: "Mantar sote, trüf mayonez, swiss peyniri.",
          price: 345,
          imageUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      id: "cat_2",
      name: "Atıştırmalıklar",
      products: [
        {
          id: "prod_3",
          name: "Çıtır Tavuk Parçaları",
          description: "6 parça panelenmiş tavuk göğsü, honey mustard sos ile.",
          price: 180,
          imageUrl: "https://images.unsplash.com/photo-1562967963-edec2604e6e4?w=400&h=400&fit=crop"
        },
        {
          id: "prod_4",
          name: "Baharatlı Patates",
          description: "Cajun baharatlı, ince kıyım kızarmış patates.",
          price: 90,
          imageUrl: null // Resmi olmayan ürün testi için
        }
      ]
    }
  ]
};

// Para birimini formatlamak için yardımcı fonksiyon
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(amount);
};