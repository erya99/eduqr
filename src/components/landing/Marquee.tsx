const items = [
  "QR Kod Menü",
  "Anlık Fiyat Güncelleme",
  "Alerjen Bildirimi",
  "Yasal Uyum",
  "Çark Çevirme Modülü",
  "Dijital İtibar Kalkanı",
  "7/24 Destek",
  "Sınırsız Ürün",
  "Bakanlık Onaylı",
  "Mobil Öncelikli",
  "Bulut Tabanlı",
  "Anlık Güncelleme",
];

const dots = "·";

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-[#0F1C36] border-y border-white/10 py-4 select-none">
      <div className="flex animate-marquee gap-0 w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 text-sm font-semibold text-white/50 uppercase tracking-widest whitespace-nowrap"
          >
            <span className="text-blue-400 text-xs">{dots}</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
